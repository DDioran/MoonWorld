using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Threading.Tasks;

namespace Moon
{
  public enum MoonMobState
  {
    Await = 0,
    Alive = 1,    
    Dead = 2 
  }

  public enum ChatType  
  {
    TabAll, 
    TabCommon,
    TabFight,
    TabGroup
  }
  public enum ClientInfoType
  {
    MobInfo,
    PlayerInfo,
    NpcInfo
  }
  public enum MessageBoxButton
  {
    mbOk,
    mbCancel
  }

  public enum MoonObjectType
  {
    Mob,
    Chest,
    Npc
  }

  public class MoonPoint
  {
    public double X, Y;
    public MoonPoint(double X, double Y)
    {
      this.X = X;
      this.Y = Y;
    }
  }

  public class ClientSprite
  {
    public string SpriteName;
    public double SpriteOX = 0;
    public double SpriteOY = 0;
    public double IdleAniSpeed = 3.5;
    public double WalkAniSpeed = 1.6;
    public double RunAniSpeed = 0.8;
    public double SkillAniSpeed = 0.8;
    public double DeathAniSpeed = 1.5;
  }
  public class ClientInfo
  {
    public ClientInfoType InfoType;
    public MoonMobState State;
    public ClientSprite Sprite;
    public double AwaitTime;
    public string Name;
    public int MobId;
    public string ItemCode;
    public int TargetId;
    public MoonObjectType TargetType;
    public double RespMobX;
    public double RespMobY;
    public double PointMobX;
    public double PointMobY;
    public double DeltaMobX;
    public double DeltaMobY;
    public double StoreMobX;
    public double StoreMobY;
    public double RunSpeed;
    public double WalkSpeed;
    public double Speed;
    public double Radius;
    public double MaxHP;
    public double HP;
    public string PInstruction;
    public double PInstructionTime;
    public double PInstructionAllTime;
    public string PParam1;
    public double PParam2;
    public double PParam3;
    public int DirectionView;
    public List<MoonSkill> Skills;
    public SkillState SkillState;
    public int Level;
    public double ChargeTime;
    public double ChargeLeft;
    public MoonSkillType CurrentSkillType;
    public int CurrentSkillIndex;
    public string AnimateName;
    public MoonDebuffTable Debuffs;
    public PartyInfo Party;
    public List<QuestNpcInfo> QuestNpcInfo;

    public ClientInfo()
    {
      InfoType = ClientInfoType.MobInfo;
      Skills = new List<MoonSkill>();
      Sprite = new ClientSprite();
    }
  }

  public class PlayerInfo : ClientInfo
  {
    public Guid PlayerId;
    public bool Active;
    public PlayerClassType ClassType;
    public double Exp;
    public double MaxExp;
    public PlayerInfo()
    {
      InfoType = ClientInfoType.PlayerInfo;
    }
  }

  public class NpcInfo : ClientInfo
  {
    public NpcInfo()
    {
      InfoType = ClientInfoType.NpcInfo;
    }
  }

  public class SkillInfo
  {
    public MoonSkillType SkillType;
    public int MinDistance;
    public int MaxDistance;
    public double CooldownTime;
    public double ChargeTime;
    public double AnimateTime;
    public double Power;
  }

  public class PartyInfo
  {
    public Guid Leader;
    public List<Guid> Items;
  }


}
