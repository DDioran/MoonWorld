using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Moon
{
  public enum PlayerClassType
  {
    Mage,
    Knight,
    Archer,
    Priest
  }
  public class MoonCharacterInfo
  {
    public PlayerClassType ClassType;
    public string Name;
    public int Level;
    public int SpawnX;
    public int SpawnY;
    public double Exp;
    public double MaxExp;
    public double HP;
    public double MaxHP;
    public double WalkSpeed;
    public double RunSpeed;
    public double Radius;
  }
  public class MoonPlayer : MoonMob, IMoonPlayer
  {
    public MoonParameters Params;
    public MoonCharacteristic Characts;
    public double Timeout;
    public Guid UserId;
    public Guid ClientId;
    public MoonChar DbChar;
    public MoonCharacterInfo Info;
    public MoonMap Map;
    public string ConnectionId;
    public MoonParty Party;
    public bool Active;
    MoonParty IMoonPlayer.Party => null;
    public MoonPlayer(MoonMap Map, Guid UserId, Guid ClientId, string ConnectionId)
      : base()
    {
      this.Timeout = 0;
      this.UserId = UserId;
      this.ClientId = ClientId;
      this.ConnectionId = ConnectionId;
      this.Party = null;
      this.Active = true;
      Params = new MoonParameters();
      Characts = new MoonCharacteristic();
      LoadCharacter();
      MoonApplication.Server.MoonPlayers.Add(this);
      SpawnPlayer(Map);
    }
    public void LoadCharacter()
    {
      MoonCharResult mc = Task.Run(async () => await MoonApplication.Server.Db.GetMoonCharacter(ClientId)).Result;
      if (mc.ErrorCode != 0) throw new Exception("Ошибка инициализации персонажа");
      DbChar = mc.Char;
      Name = DbChar.Name;
      switch ((PlayerClassType)DbChar.Class)
      {
        case PlayerClassType.Knight:
          //SpriteName = "green-knight";
          Sprite.SpriteName = "iknight";
          Sprite.SpriteOY = 30;
          Sprite.IdleAniSpeed = 5.0;
          Skills = new MoonSkillTableKnight(this);
          MaxHP = 600;
          break;
        case PlayerClassType.Mage:
          Sprite.SpriteName = "white-mag";
          Skills = new MoonSkillTableMage(this);
          MaxHP = 250;
          break;
        case PlayerClassType.Archer:
          Sprite.SpriteName = "red-archer";
          Skills = new MoonSkillTableArcher(this);
          MaxHP = 350;
          break;
        case PlayerClassType.Priest:
          Sprite.SpriteName = "priest";
          Skills = new MoonSkillTablePriest(this);
          MaxHP = 400;
          break;
      }
      HP = MaxHP;
      WalkSpeed = 1.4;
      RunSpeed = 2.8;
      Radius = 32;
      Level = 1;
      if (string.IsNullOrWhiteSpace(DbChar.Data))
      {
        Info = new MoonCharacterInfo();
        Info.Name = DbChar.Name;
        Info.ClassType = (PlayerClassType)DbChar.Class;
        Info.Level = DbChar.Level;
        Info.SpawnX = 0;
        Info.SpawnY = 0;
        Info.MaxExp = 500;
        Info.Exp = 0;
      }
      else
      {
        Info = JsonConvert.DeserializeObject<MoonCharacterInfo>(DbChar.Data);
        HP = Info.HP;
        MaxHP = Info.MaxHP;
        WalkSpeed = Info.WalkSpeed;
        RunSpeed = Info.RunSpeed;
        Radius = Info.Radius;
        Level = Info.Level;
      }
      Characts.Calculate(Params);
    }

    public static MoonPlayer FindPlayer(Guid clientGuid)
    {
      return MoonApplication.Server.MoonPlayers.FirstOrDefault(mp => mp.ClientId == clientGuid);
    }

    public void SpawnPlayer(MoonMap Map)
    {
      this.Map = Map;
      State = MoonMobState.Await;
    }
    public void ResetTimeout()
    {
      Timeout = 0;
    }
    public override void OnBeforeDispatch()
    {
      base.OnBeforeDispatch();
      Timeout += MoonApplication.Server.DeltaTime;
    }
    public void Initialize()
    {
      State = MoonMobState.Alive;
      PointMob = new MoonPoint((int)(MoonApplication.Random.NextDouble() * Map.MapWidth), (int)(MoonApplication.Random.NextDouble() * Map.MapHeight));
      PInstruction = "p";
      PInstructionTime = 0;
      PInstructionAllTime = 1;
      WalkSpeed = 1.4;
      RunSpeed = 2.8;
      Radius = 32;
      MaxHP = 300;
      HP = MaxHP;
      CurrentSkillType = MoonSkillType.None;
      CurrentSkillIndex = -1;
      QueueCode = -1;
      QueueTarget = null;
      QueueCoords = null;
      Program = new string[] { };
    }
    public override void PushToMap()
    {
      MoonApplication.Server.PushToMap(Map.MapId, this);
    }
    public ClientInfo CreatePlayerInfo(PlayerInfo info)
    {
      CreateMobInfo(info);
      info.PlayerId = ClientId;
      info.Active = Active;
      info.ClassType = Info.ClassType;
      info.Exp = Info.Exp;
      info.MaxExp = Info.MaxExp;
      if (Party != null)
      {
        info.Party = new PartyInfo();
        info.Party.Leader = Party.LeaderId;
        info.Party.Items = Party.Items.ToList();
      }
      return info;
    }

    public bool PlayerMoveTo(double x, double y)
    {
      x -= PointMob.X;
      y -= PointMob.Y;
      if (PInstruction == "s" && SkillState == SkillState.Run)
      {
        QueueCode = -1;
        QueueTarget = null;
        QueueCoords = new double[] { x, y };
        return false;
      }
      ProgramStart($"m.r.{(int)x}.{(int)y}");
      PushToMap();
      return true;
    }
    public void PlayerMoveTo(IMoonTarget target)
    {
      MobMoveTo(target, target?.X ?? 0, target?.Y ?? 0);
    }
    public override bool InitiateSkill(int index)
    {
      if (Skills.Panel[index] == null) return false;
      if (!Skills.Panel[index].Skill.IsHeal && Target == null) return false;
      if (PInstruction == "s" && SkillState == SkillState.Run)
      {
        QueueCode = index;
        QueueTarget = null;
        QueueCoords = null;
        return false;
      }
      if (Target is MoonChest || Target is MoonNpc)
      {
        PlayerMoveTo(Target);
        return false;
      }
      // Нельзя применять боевые скилы на немобов
      if (!Skills.Panel[index].Skill.IsHeal && Target != null && !(Target is MoonMob)) return false;
      // Нельзя применять боевые скилы на игроков своей группы
      if (Target is MoonPlayer && !Skills.Panel[index].Skill.IsHeal && Party == (Target as IMoonPlayer).Party) return false;
      CurrentSkillIndex = index;
      CurrentSkillType = Skills.Panel[index].Skill.SkillType;
      QueueCode = -1;
      QueueTarget = null;
      QueueCoords = null;
      IMoonTarget mobTarget = null;
      // Применяем боевой скил только к игрокам несвоей группы или хилящий к игрокам своей
      if (!Skills.Panel[index].Skill.IsHeal || Skills.Panel[index].Skill.IsHeal && Target is MoonPlayer && Party == (Target as IMoonPlayer).Party)
        mobTarget = Target;
      PlayerMoveTo(mobTarget);
      // Если скилл применён на моба или игрока осылаем об этом инфу на клиент
      if (mobTarget is MoonMob)
        MoonApplication.Server.PushToClient(this, (IMoonOpponent)mobTarget);
      return true;
    }
    public override bool InitiateMove(double[] xy)
    {
      ProgramStart($"m.r.{(int)xy[0]}.{(int)xy[1]}");
      PushToMap();
      MoonApplication.Server.DoPointEffect(this, "moon-click", 1, xy[0], xy[1]);
      return true;
    }
    public override bool InitiateAtack(IMoonTarget target)
    {
      if (target != null)
      {
        CurrentSkillType = Skills.GetAASkill().SkillType;
        CurrentSkillIndex = Skills.GetIndexBySkill(CurrentSkillType);
        PlayerMoveTo(target);
        MoonApplication.Server.PushToClient(this, (IMoonOpponent)target);
        return true;
      }
      return false;
    }


  }

}
