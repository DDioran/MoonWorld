using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Threading.Tasks;

namespace Moon
{
  public class MoonMob : IMoonTarget, IMoonOpponent
  {
    public string Name;
    public int MobId;
    public string ItemCode; // Идентификатор моба по базе (фиксированный тип объекта)
    public IMoonTarget Target;
    public MoonMobGroupType GroupType;
    public MoonMobState State;
    public SkillState SkillState;
    public MoonDebuffTable Debuffs;
    public bool WasEffect;
    public MoonPoint RespMob;
    public MoonPoint PointMob;
    public MoonPoint DeltaMob;
    public MoonPoint StoreMob;
    public MoonPoint DistMob;
    public bool StoreRunMode;
    public MoonMobGroup Group;
    public double Speed;
    public double WalkSpeed;
    public double RunSpeed;
    public double Radius;
    public double MaxHP;
    public double HP;
    public double AgroRadius;

    public MoonSkillTable Skills;
    public MoonSkill currentSkill;

    public MoonInfluence Influence;

    public string[] Program;
    public int PIndex;
    public string PInstruction;
    public double PInstructionTime;
    public double PInstructionAllTime;
    public string PParam1;
    public double PParam2;
    public double PParam3;
    public int DirectionView;

    public int QueueCode = -1;
    public double[] QueueCoords = null;
    public IMoonTarget QueueTarget = null;

    public ClientSprite Sprite;

    public double GroupAwaitTime;
    public double AwaitTime;

    public int Level;
    public double GainExp;

    public string AnimateName;

    public int CurrentSkillIndex;
    public MoonSkillType CurrentSkillType;

    public bool debuffsChanged;

    private static int MobIdCounter = 1;
    private static object LockMobObject = new object();

    public double X => PointMob.X;
    public double Y => PointMob.Y;
    public int ObjectId => MobId;
    public bool IsAlive => State == MoonMobState.Alive;
    int IMoonOpponent.Level => Level;
    public MoonObjectType ObjectType => GetObjectType();

    protected virtual MoonObjectType GetObjectType()
    {
      return MoonObjectType.Mob;
    }

    public MoonMob()
    {
      RespMob = new MoonPoint(0, 0);
      PointMob = new MoonPoint(0, 0);
      DeltaMob = new MoonPoint(0, 0);
      StoreMob = new MoonPoint(0, 0);
      Skills = null;
      Target = null;
      DirectionView = 5;
      SkillState = SkillState.Await;
      CurrentSkillType = MoonSkillType.None;
      Debuffs = new MoonDebuffTable(this);
      Sprite = new ClientSprite();
      debuffsChanged = false;
      Influence = new MoonInfluence(this);
      lock (LockMobObject)
        MobId = ++MobIdCounter;
    }
    public MoonMob(MoonMobGroupType GroupType, MoonMobGroup Group) : this()
    {
      this.GroupType = GroupType;
      this.Group = Group;
      ItemCode = this.GroupType.ItemCode;
      Name = this.GroupType.Name;
      WalkSpeed = this.GroupType.WalkSpeed;
      RunSpeed = this.GroupType.RunSpeed;
      Sprite.SpriteName = this.GroupType.SpriteName;
      Sprite.SpriteOX = this.GroupType.SpriteOX;
      Sprite.SpriteOY = this.GroupType.SpriteOY;
      Sprite.IdleAniSpeed = this.GroupType.IdleAniSpeed;
      Sprite.WalkAniSpeed = this.GroupType.WalkAniSpeed;
      Sprite.RunAniSpeed = this.GroupType.RunAniSpeed;
      Sprite.DeathAniSpeed = this.GroupType.DeathAniSpeed;
      GroupAwaitTime = this.GroupType.AwaitTime;
      Radius = this.GroupType.Radius;
      MaxHP = this.GroupType.HP;
      AgroRadius = this.GroupType.AgroRadius;
      Level = this.GroupType.Level;
      GainExp = this.GroupType.Exp;
      Skills = this.GroupType.Skills.CopySkillTable(this);
      Respawn();
    }
    public void Respawn()
    {
      if (State != MoonMobState.Alive)
      {
        State = MoonMobState.Alive;
        switch (GroupType.RespawnType)
        {
          case MoonMobRespawnType.Exact:
            RespMob = new MoonPoint(GroupType.PointResp.X, GroupType.PointResp.Y);
            break;
          case MoonMobRespawnType.Points:
            Point p = GroupType.PointsResp[(int)(MoonApplication.Random.NextDouble() * GroupType.PointsResp.Count)];
            RespMob = new MoonPoint(p.X, p.Y);
            break;
          case MoonMobRespawnType.Area:
            RespMob = new MoonPoint((int)(MoonApplication.Random.NextDouble() * GroupType.RectangleResp.Width + GroupType.RectangleResp.X),
              (int)(MoonApplication.Random.NextDouble() * GroupType.RectangleResp.Height + GroupType.RectangleResp.Y));
            break;
        }
        PointMob = new MoonPoint(RespMob.X, RespMob.Y);
      }
      HP = MaxHP;
      Influence.Clear();
      SelectRespawnProgram();
    }
    public void SelectRespawnProgram()
    {
      CurrentSkillType = MoonSkillType.None;
      ProgramRespawnStart("p.1,p.1,p.1,m.w.-200.0,p.1,p.1,p.1,p.1,p.1,m.w.r,p.1,p.1,p.1,m.w.200.-200,p.1,p.1,p.1,p.1,p.1,m.r.0.200,m.w.r,p.1,p.1,p.1,m.w.0.200,p.1,p.1,p.1,p.1,p.1,p.1,m.w.-200.-400,p.1,p.1,p.1,p.1,p.1,m.w.r,p.1,p.1,p.1,m.r.0.200,p.1,p.1,p.1,p.1,p.1,p.1,m.w.r");
    }
    public void ProgramRespawnStart(string Program)
    {
      this.Program = Program.Split(',');
      List<int> a = new List<int>() { -1 };
      int idx = 0;
      this.Program.ToList().ForEach(p =>
      {
        string[] s = p.Split('.');
        if (s.Length > 2 && s[0] == "m" && s[2] == "r")
          a.Add(idx);
        idx++;
        int i = idx;
        while (i < this.Program.Length)
        {
          string[] x = this.Program[i].Split('.');
          if (s[0] != "p") break;
          a.Add(i);
          i++;
        }
      });
      PIndex = a[(int)(MoonApplication.Random.NextDouble() * a.Count)];
      NextInstruction();
    }

    public void ProgramStart(string Program)
    {
      this.Program = Program.Split(',');
      PIndex = -1;
      //if (this is MoonPlayer) MoonApplication.Server.DoLog($"start: {Program.Length}, {PIndex}");
      NextInstruction();
    }

    public void SetIdle()
    {
      //if (this is MoonPlayer) MoonApplication.Server.DoLog($"set idle: {PInstruction}");
      if (PInstruction != "p")
      {
        PInstruction = "p";
        PInstructionTime = 0;
        PInstructionAllTime = 1;
        PushToMap();
      }
    }

    public void NextInstruction()
    {
      //if (this is MoonPlayer) MoonApplication.Server.DoLog($"next1: {Program.Length}, {PIndex}");
      if (Program.Length == 0)
      {
        SetIdle();
        return;
      }
      PIndex++;
      //if (this is MoonPlayer) MoonApplication.Server.DoLog($"next2: {Program.Length}, {PIndex}");
      if (PIndex >= Program.Length)
      {
        PIndex = 0;
        if (this is MoonPlayer)
        {
          Program = new string[] { };
          SetIdle();
          return;
        }
      }
      //if (this is MoonPlayer) MoonApplication.Server.DoLog($"next3: {Program[PIndex]}");
      var instr = Program[PIndex].Split(".");
      PInstruction = instr[0];
      PInstructionTime = 0;
      int tmpInt;
      //if (this is MoonPlayer) MoonApplication.Server.DoLog($"next4: {PInstruction}");
      if (PInstruction == "rs")
      {
        PInstruction = "p";
        SelectRespawnProgram();
        PushToMap();
        return;
      }
      if (PInstruction == "p")
      {
        int.TryParse(instr[1], out tmpInt);
        PParam2 = tmpInt;
        PInstructionAllTime = PParam2;
      }
      if (PInstruction == "m")
      {
        PParam1 = instr[1];
        if (instr[2] == "r")
        {
          PParam2 = RespMob.X - PointMob.X;
          PParam3 = RespMob.Y - PointMob.Y;
        }
        else
        {
          int.TryParse(instr[2], out tmpInt);
          PParam2 = tmpInt;
          int.TryParse(instr[3], out tmpInt);
          PParam3 = tmpInt;
        }
        DistMob = new MoonPoint(PParam2, PParam3);
        StoreRunMode = PParam1 == "r";
        CalculateMoveStates();
        CalcDirectionView(PParam2, PParam3);
      }
      if (PInstruction == "s")
      {
        SkillState = SkillState.Await;
        currentSkill = Skills.GetSkill(CurrentSkillType);
        //if (!currentSkill.IsHeal/* || TargetId > 0*/)
        if (Target is MoonMob)
        {
          PParam2 = Target.X - PointMob.X;
          PParam3 = Target.Y - PointMob.Y;
          CalcDirectionView(PParam2, PParam3);
        }
      }
      PushToMap();
    }
    // Изменение характеристик в зависимости от бафов/дебафов
    public void CalculateMoveStates()
    {
      Speed = StoreRunMode ? RunSpeed : WalkSpeed;
      if (Debuffs.Items.Count > 0)
        Speed *= Debuffs.Items.Min(i => i.Speed);
      PInstructionTime = 0;
      PInstructionAllTime = Math.Sqrt(DistMob.X * DistMob.X + DistMob.Y * DistMob.Y) * 0.016 / this.Speed;
      DeltaMob = new MoonPoint(DistMob.X / PInstructionAllTime, DistMob.Y / PInstructionAllTime);
      StoreMob = new MoonPoint(PointMob.X, PointMob.Y);
      debuffsChanged = false;
    }
    public virtual void OnBeforeDispatch()
    {
    }
    public virtual void OnDispatch()
    {
      // Подкручиваем кулдауны скилов
      Skills.ProcessCooldown();
      // Подкручиваем кулдауны дебафов
      Debuffs.ProcessCooldown();
      // ----------------------------
      if (State == MoonMobState.Await && !(this is MoonPlayer) && !(this is MoonNpc))
      {
        AwaitTime += MoonApplication.Server.DeltaTime;
        if (AwaitTime >= GroupAwaitTime)
        {
          Respawn();
          PushToMap();
          return;
        }
      }
      if (State == MoonMobState.Alive)
      {
        // Проверка на нахождение рядом игроков
        if (!(this is MoonPlayer) && Target == null)
        {
          var rads = MoonApplication.Server.MoonPlayers
          .Where(p => p.State == MoonMobState.Alive)
          .Select(p => new { m = p, r = Math.Sqrt(Math.Pow(PointMob.X - p.PointMob.X, 2) + Math.Pow(PointMob.Y - p.PointMob.Y, 2)) })
          .OrderBy(p => p.r).ToList();
          if (rads.Count > 0 && rads.First().r <= AgroRadius)
          {
            Target = rads.First().m;
            CurrentSkillIndex = -1;
            CurrentSkillType = Skills.GetAASkill().SkillType;
            Influence.Incoming(Target as MoonMob, 0.01, InfluenceType.Damage);
            MobMoveTo(Target);
            return;
          }
        }
        // Выполнение программы или реакция на окружение
        PInstructionTime += MoonApplication.Server.DeltaTime;
        // Стоим n времени
        if (PInstruction == "p")
        {
          if (PInstructionTime >= PInstructionAllTime)
            NextInstruction();
          return;
        }
        // Движемся в координаты
        if (PInstruction == "m")
        {
          PointMob = new MoonPoint(StoreMob.X + DeltaMob.X * PInstructionTime, StoreMob.Y + DeltaMob.Y * PInstructionTime);
          // --------------------------------
          if (debuffsChanged)
          {
            PParam2 = DistMob.X - DeltaMob.X * PInstructionTime;
            PParam3 = DistMob.Y - DeltaMob.Y * PInstructionTime;
            DistMob = new MoonPoint(PParam2, PParam3);
            CalculateMoveStates();
            PushToMap();
          }
          // --------------------------------
          if (CurrentSkillType != MoonSkillType.None && (PInstructionTime > 0.5 || PInstructionTime >= PInstructionAllTime))
          {
            // Цель пропала
            if (Target == null || !Target.IsAlive)
              if (this is MoonPlayer || Influence.Count == 0)
              {
                CurrentSkillType = MoonSkillType.None;
                ProgramStart($"p.1");
                return;
              }
              else
                Target = Influence.GetMostEvilMob();
            // Подбегаем к мобу, проверим координаты
            MobMoveTo(Target);
            return;
          }
          if (PInstructionTime >= PInstructionAllTime)
          {
            PointMob = new MoonPoint(StoreMob.X + PParam2, StoreMob.Y + PParam3);
            NextInstruction();
            // Подбежали к сундуку, расчет взятия дропа
            if (this is MoonPlayer && Target is MoonChest)
              (Target as MoonChest).ShiftItems(this as MoonPlayer);
            // Подбежали к нпс - вступаем в разговор
            if (this is MoonPlayer && Target is MoonNpc)
              MoonApplication.Server.SendNpcTalk(this as MoonPlayer, Target as MoonNpc);
            return;
          }
          return;
        }
        // Скилл
        if (PInstruction == "s")
        {
          // Цель пропала
          if ((Target == null || !Target.IsAlive) && !currentSkill.IsHeal)
          {
            if (this is MoonPlayer || Influence.Count == 0)
            {
              CurrentSkillType = MoonSkillType.None;
              ProgramStart($"p.1");
            }
            else
            {
              Target = Influence.GetMostEvilMob();
              MobMoveTo(Target);
            }
            return;
          }
          if (!currentSkill.IsHeal && Target == null) return;
          MoonSkill skill = currentSkill;
          switch (SkillState)
          {
            case SkillState.Await: // Скилл в ожидании применения
                                   // Проверка можем ли мы применить скилл на этом расстоянии
              if (Distance(Target as MoonMob) < skill.MaxDistance || skill.IsHeal && ((Target as MoonPlayer) == null || MoonParty.IsSameParty(this, Target as MoonMob)))
              {
                // Не стрелять в мёртвого моба
                if (!skill.IsHeal && !Target.IsAlive) return;
                if (Debuffs.IsStun())
                  return;
                // Не выполнять скилл если он в откате
                if (skill.CooldownTimeLeft < skill.CooldownTime)
                  return;
                WasEffect = false;
                PInstructionTime = 0;
                if (skill.ChargeTime > 0)
                {
                  SkillState = SkillState.Charge;
                  PInstructionAllTime = skill.ChargeTime;
                  skill.ChargeTimeLeft = 0;
                  skill.StartCharge(this);
                }
                else
                {
                  SkillState = SkillState.Run;
                  PInstructionAllTime = skill.AnimateTime;
                  skill.AnimateTimeLeft = 0;
                  skill.CooldownTimeLeft = 0;
                  AnimateName = skill.AnimateName;
                  /*if (SpriteName == "red-archer")
                    AnimateName = "shooting";*/
                  skill.StartAnimate(this);
                }
                PushToMap();
                return;
              }
              else
              {
                MobMoveTo(Target);
                return;
              }
            case SkillState.Charge:
              // Зарядка скила завершена
              if (skill.ChargeTimeLeft >= skill.ChargeTime)
              {
                SkillState = SkillState.Run;
                PInstructionTime = 0;
                PInstructionAllTime = skill.AnimateTime;
                skill.AnimateTimeLeft = 0;
                skill.CooldownTimeLeft = 0;
                AnimateName = skill.AnimateName;
                /*if (SpriteName == "red-archer")
                  AnimateName = "shooting";
                if (SpriteName == "green-knight")
                  AnimateName = "greeting";*/
                skill.StartAnimate(this);
                PushToMap();
                return;
              }
              break;
            case SkillState.Run:
              // Эффект на части выполнения скила
              // Выполнение скила завершено
              if (skill.AnimateTimeLeft >= skill.AnimateTime)
              {
                // Если было что то нажато в момент действия скила - вызвать новый скилл из очереди
                if (this is MoonPlayer)
                {
                  SkillState = SkillState.Await;
                  if (QueueCode >= 0)
                    if (InitiateSkill(QueueCode))
                      return;
                  if (QueueCoords != null)
                    if (InitiateMove(QueueCoords))
                      return;
                  if (QueueTarget!=null)
                    if (InitiateAtack(QueueTarget))
                      return;
                }
                if (Target == null || skill.IsHeal)
                {
                  ProgramStart($"p.1");
                  return;
                }
                // Дальнейшая атака автоатакой
                CurrentSkillType = Skills.GetAASkill().SkillType;
                CurrentSkillIndex = Skills.GetIndexBySkill(CurrentSkillType);
                MobMoveTo(Target);
                return;
              }
              break;
          }
        }
        return;
      }
      if (State == MoonMobState.Dead)
      {
        AwaitTime += MoonApplication.Server.DeltaTime;
        if (!(this is MoonPlayer))
        {
          if (AwaitTime > 4.0)
          {
            State = MoonMobState.Await;
            AwaitTime = 0;
            PushToMap();
            ResetFromPlayerTarget(this);
            return;
          }
        }
        return;
      }
    }
    public virtual bool InitiateSkill(int code)
    {
      return false;
    }
    public virtual bool InitiateMove(double[] xy)
    {
      return false;
    }
    public virtual bool InitiateAtack(IMoonTarget target)
    {
      return false;
    }
    public virtual void OnAfterDispatch()
    {
    }
    public void Dispatch()
    {
      OnBeforeDispatch();
      OnDispatch();
      OnAfterDispatch();
    }

    public void HitSkill(MoonSkill skill, MoonMob mobTarget)
    {
      if (mobTarget != null)
        MoonApplication.Server.DoPointEffectAll(skill.PostEffectSpriteName, skill.PostEffectSpeed, mobTarget.PointMob.X, mobTarget.PointMob.Y);
      double hx = MoonApplication.Random.NextDouble() * 100 - 50;
      double hy = -MoonApplication.Random.NextDouble() * 64 - 50;
      //if (mobTarget != null && (!skill.IsHeal || skill.IsHeal && MoonParty.IsSameParty(this, mobTarget)))
      //  MoonApplication.Server.DoHitEffectAll(hx, hy, skill.Power, false, mobTarget.MobId);

      if (skill.IsHeal)
      {
        if (mobTarget == null || mobTarget.State == MoonMobState.Alive)
        {
          double power = skill.Power;
          if (MoonParty.IsSameParty(this, mobTarget))
          {
            mobTarget.HP += power;
            if (mobTarget.HP > MaxHP)
            {
              power = mobTarget.HP - MaxHP;
              mobTarget.HP = MaxHP;
            }
            mobTarget.PushToMap();
          }
          else
          {
            HP += power;
            if (HP > MaxHP)
            {
              power = HP - MaxHP;
              HP = MaxHP;
            }
            PushToMap();
          }
          MoonApplication.Server.DoChatHeal(this, mobTarget, power);
          if (mobTarget != null)
            mobTarget.Influence.Incoming(this, power, InfluenceType.Healing);
        }
        return;
      }
      else
      {
        if (mobTarget.State == MoonMobState.Alive)
        {
          MoonCharacteristicResult atk = MoonCharacteristic.Attack(this, mobTarget, skill);
          if (!atk.AttackSuccess)
          {
            MoonApplication.Server.DoHitEffectAll(hx, hy, 0, -1, mobTarget.MobId);
            MoonApplication.Server.DoChatDamage(this, mobTarget, atk.Damage, -1);
          }
          else
          {
            double power = atk.Damage;
            mobTarget.HP -= power;
            if (mobTarget.HP < 0)
            {
              power += mobTarget.HP;
              mobTarget.HP = 0;
            }
            MoonApplication.Server.DoChatDamage(this, mobTarget, atk.Damage, atk.CritSuccess ? 1 : 0);
            mobTarget.Influence.Incoming(this, power, InfluenceType.Damage);
            MoonApplication.Server.DoHitEffectAll(hx, hy, atk.Damage, atk.CritSuccess ? 1 : 0, mobTarget.MobId);
          }
        }
      }
      if (mobTarget == null) return;
      if (mobTarget.HP == 0)
      {
        if (mobTarget.State == MoonMobState.Alive)
        {
          MoonApplication.Server.DoChatDeath(this, mobTarget);
          mobTarget.State = MoonMobState.Dead;
          mobTarget.AwaitTime = 0;
          ResetFromMobTarget(mobTarget);
          MoonChest.Appearance(mobTarget);
          MoonParty.GainExperience(this as MoonPlayer, mobTarget);
          if (!(mobTarget is MoonPlayer))
          {
            // Очищаем таргет убитого моба
            mobTarget.CurrentSkillType = MoonSkillType.None;
            mobTarget.CurrentSkillIndex = -1;
            mobTarget.QueueCode = -1;
            mobTarget.QueueTarget = null;
            mobTarget.QueueCoords = null;
            mobTarget.Target = null;
          }
          if (!(this is MoonPlayer))
          {
            if (Influence.Count > 0)
            {
              Target = Influence.GetMostEvilMob();
              MobMoveTo(Target);
            }
          }
        }
      }
      else
      {
        if ((!(mobTarget is MoonPlayer)) && mobTarget.Target == null)
        {
          mobTarget.Target = this;
          mobTarget.CurrentSkillType = mobTarget.Skills.GetAASkill().SkillType;
          mobTarget.CurrentSkillIndex = mobTarget.Skills.GetIndexBySkill(mobTarget.CurrentSkillType);
          mobTarget.MobMoveTo(this);
          return;
        }
        if ((mobTarget is MoonPlayer) && mobTarget.Target == null)
          mobTarget.Target = this;
      }
      mobTarget.PushToMap();
    }

    public double Distance(MoonMob mobTarget)
    {
      if (mobTarget == null) return 999999;
      return Math.Sqrt((PointMob.X - mobTarget.PointMob.X) * (PointMob.X - mobTarget.PointMob.X) + (PointMob.Y - mobTarget.PointMob.Y) * (PointMob.Y - mobTarget.PointMob.Y));
    }

    public virtual void PushToMap()
    {
      MoonApplication.Server.PushToMap(Group.Map.MapId, this);
    }
    public ClientInfo CreateMobInfo(ClientInfo info)
    {
      info.Name = Name;
      info.MobId = MobId;
      info.ItemCode = ItemCode;
      if (Target != null) {
        info.TargetId = Target.ObjectId;
        info.TargetType = Target.ObjectType;
      }
      info.State = State;
      info.AwaitTime = AwaitTime;
      info.Sprite = new ClientSprite();
      info.Sprite.SpriteName = Sprite.SpriteName;
      info.Sprite.SpriteOX = Sprite.SpriteOX;
      info.Sprite.SpriteOY = Sprite.SpriteOY;
      info.Sprite.IdleAniSpeed = Sprite.IdleAniSpeed;
      info.Sprite.WalkAniSpeed = Sprite.WalkAniSpeed;
      info.Sprite.RunAniSpeed = Sprite.RunAniSpeed;
      info.Sprite.DeathAniSpeed = Sprite.DeathAniSpeed;
      info.DirectionView = DirectionView;
      info.RespMobX = RespMob.X;
      info.RespMobY = RespMob.Y;
      info.PointMobX = PointMob.X;
      info.PointMobY = PointMob.Y;
      info.DeltaMobX = DeltaMob.X;
      info.DeltaMobY = DeltaMob.Y;
      info.StoreMobX = StoreMob.X;
      info.StoreMobY = StoreMob.Y;
      info.RunSpeed = RunSpeed;
      info.WalkSpeed = WalkSpeed;
      info.Speed = Speed;
      info.Radius = Radius;
      info.MaxHP = MaxHP;
      info.HP = HP;
      info.PInstruction = PInstruction;
      info.PInstructionTime = PInstructionTime;
      info.PInstructionAllTime = PInstructionAllTime;
      info.PParam1 = PParam1;
      info.PParam2 = PParam2;
      info.PParam3 = PParam3;
      info.Skills = Skills.Items.Select(s => s.Copy()).ToList();
      info.SkillState = SkillState;
      info.Level = Level;
      info.ChargeTime = 0;
      info.ChargeLeft = 0;
      info.CurrentSkillType = CurrentSkillType;
      info.CurrentSkillIndex = CurrentSkillIndex;
      if (currentSkill != null)
      {
        info.Sprite.SkillAniSpeed = currentSkill.AniSpeed;
        if (currentSkill.ChargeTime > 0 && SkillState == SkillState.Charge)
        {
          info.ChargeTime = currentSkill.ChargeTime;
          info.ChargeLeft = currentSkill.ChargeTimeLeft;
        }
      }
      info.AnimateName = AnimateName;
      info.Debuffs = Debuffs;
      return info;
    }

    public MoonMap GetCurrentMap()
    {
      if (Group != null)
        return Group.Map;
      return (this as MoonPlayer).Map;
    }
    public void MobMoveTo(IMoonTarget target)
    {
      if (!(this is MoonPlayer)) target = Influence.GetMostEvilMob();
      if (target == null || !target.IsAlive)
      {
        ProgramStart($"p.1");
        return;
      }
      MobMoveTo(target, target.X, target.Y);
    }
    public void MobMoveTo(IMoonTarget target, double x, double y)
    {
      x -= PointMob.X;
      y -= PointMob.Y;
      CalcDirectionView(x, y);
      if (target is MoonChest || target is MoonNpc)
      {
        // Бежим до сундука или npc
        double cr = Math.Sqrt(x * x + y * y);
        if(cr > 40)
        {
          x *= 1 - 40 / cr;
          y *= 1 - 40 / cr;
        }
        ProgramStart($"m.r.{(int)x}.{(int)y}");
        return;
      }
      MoonSkill skill = Skills.GetSkill(CurrentSkillType);
      if (skill == null)
      {
        PushToMap();
        return;
      }
      double r = Math.Sqrt(x * x + y * y);
      // Находимся ли мы в зоне действия скила?
      if (r < skill.MaxDistance || skill.IsHeal)
      {
        ProgramStart($"s");
      }
      else
      {
        x *= 1 - skill.MinDistance / r;
        y *= 1 - skill.MinDistance / r;
        ProgramStart($"m.r.{(int)x}.{(int)y}");
      }
    }
    protected void CalcDirectionView(double x, double y) {
      double px = Math.Abs(x), py = Math.Abs(y);
      double ppx = px / py, ppy = py / px;
      if (x < 0 && y < 0) if (px > py) this.DirectionView = (ppx) > 2 ? 6 : 7; else this.DirectionView = (ppy) > 2 ? 0 : 7;
      if (x >= 0 && y < 0) if (px > py) this.DirectionView = (ppx) > 2 ? 2 : 1; else this.DirectionView = (ppy) > 2 ? 0 : 1;
      if (x >= 0 && y >= 0) if (px > py) this.DirectionView = (ppx) > 2 ? 2 : 3; else this.DirectionView = (ppy) > 2 ? 4 : 3;
      if (x < 0 && y >= 0) if (px > py) this.DirectionView = (ppx) > 2 ? 6 : 5; else this.DirectionView = (ppy) > 2 ? 4 : 5;
    }

    public void ResetFromMobTarget(MoonMob Mob)
    {
      GetCurrentMap().MobGroupList.SelectMany(g => g.MobList)
        .Where(m => m.Target == Mob)
        .ToList().ForEach(m =>
        {
          m.Target = null;
          m.CurrentSkillType = MoonSkillType.None;
          m.CurrentSkillIndex = -1;
          m.QueueCode = -1;
          m.QueueTarget = null;
          m.QueueCoords = null;
          m.ProgramStart("p.5,m.w.r,rs");
        });
    }

    public void ResetFromPlayerTarget(MoonMob Mob)
    {
      MoonApplication.Server.MoonPlayers
        .Where(p => p.Target == Mob)
        .ToList().ForEach(m =>
        {
          m.Target = null;
          m.CurrentSkillType = MoonSkillType.None;
          m.CurrentSkillIndex = -1;
          m.QueueCode = -1;
          m.QueueTarget = null;
          m.QueueCoords = null;
          m.PushToMap();
        });
    }

  }
}
