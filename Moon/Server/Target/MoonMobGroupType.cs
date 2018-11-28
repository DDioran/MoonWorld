using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Threading.Tasks;

namespace Moon
{
  public enum MoonMobRespawnType
  {
    Exact = 0,
    Points = 1,
    Area = 2
  }

  public class MoonMobGroupType
  {
    public int ItemId;
    public string Name;
    public string SpriteName;
    public double SpriteOX = 0;
    public double SpriteOY = 0;
    public double IdleAniSpeed = 3.5;
    public double WalkAniSpeed = 2.0;
    public double RunAniSpeed = 1.0;
    public double DeathAniSpeed = 1.5;
    public MoonMobRespawnType RespawnType;
    public Point PointResp;
    public List<Point> PointsResp;
    public Rectangle RectangleResp;
    public double AwaitTime;
    public int Count;
    public double WalkSpeed;
    public double RunSpeed;
    public double Radius;
    public double HP;
    public double AgroRadius;
    public int Level;
    public double Exp;
    public MoonSkillTable Skills;
    public MoonMobGroupType()
    {
      Skills = new MoonSkillTable();
    }
  }

  public class MMGT_Map1_TEST : MoonMobGroupType
  {
    public MMGT_Map1_TEST() : base()
    {
      ItemId = 123456;
      Name = "Тестовый моб";
      SpriteName = "skel";
      RespawnType = MoonMobRespawnType.Exact;
      PointResp = new Point(100, 100);
      AwaitTime = 30;
      Count = 1;
      WalkSpeed = 0.6;
      RunSpeed = 1.9;
      Radius = 32;
      HP = 60;
      AgroRadius = 280;
      Level = 1;
      Exp = 50;
      Skills.Items.Add(new MoonSkill(MoonSkillType.SkelAttack));
    }
  }

  public class MMGT_Map1_SceletonUpLeft : MoonMobGroupType
  {
    public MMGT_Map1_SceletonUpLeft() : base()
    {
      ItemId = 1;
      Name = "Слабый скелет лучник";
      SpriteName = "bow-skel";
      RespawnType = MoonMobRespawnType.Area;
      RectangleResp = new Rectangle(0, 0, 1999, 2999);
      AwaitTime = 30;
      Count = 10;
      WalkSpeed = 0.6;
      RunSpeed = 1.9;
      Radius = 32;
      HP = 60;
      AgroRadius = 280;
      Level = 1;
      Exp = 50;
      Skills.Items.Add(new MoonSkill(MoonSkillType.WeakSkelBowAttack));
    }
  }
  public class MMGT_Map1_SceletonUpLeft2 : MoonMobGroupType
  {
    public MMGT_Map1_SceletonUpLeft2() : base()
    {
      ItemId = 2;
      Name = "Слабый скелет";
      SpriteName = "skel";
      RespawnType = MoonMobRespawnType.Area;
      RectangleResp = new Rectangle(0, 0, 1999, 2999);
      AwaitTime = 30;
      Count = 10;
      WalkSpeed = 0.6;
      RunSpeed = 1.9;
      Radius = 32;
      HP = 80;
      AgroRadius = 280;
      Level = 1;
      Exp = 30;
      Skills.Items.Add(new MoonSkill(MoonSkillType.SkelAttack));
    }
  }

  public class MMGT_Map1_SceletonUpRight : MoonMobGroupType
  {
    public MMGT_Map1_SceletonUpRight() : base()
    {
      ItemId = 3;
      Name = "Скелет лучник";
      SpriteName = "bow-skel";
      RespawnType = MoonMobRespawnType.Area;
      RectangleResp = new Rectangle(3000, 0, 2999, 2999);
      AwaitTime = 30;
      Count = 20;
      WalkSpeed = 0.7;
      RunSpeed = 2.1;
      Radius = 32;
      HP = 100;
      AgroRadius = 310;
      Level = 2;
      Exp = 50;
      Skills.Items.Add(new MoonSkill(MoonSkillType.SkelBowAttack));
    }
  }
  public class MMGT_Map1_SceletonMiddle : MoonMobGroupType
  {
    public MMGT_Map1_SceletonMiddle() : base()
    {
      ItemId = 4;
      Name = "Скелет лучник";
      SpriteName = "bow-skel";
      RespawnType = MoonMobRespawnType.Area;
      RectangleResp = new Rectangle(2000, 3000, 1999, 1999);
      AwaitTime = 30;
      Count = 10;
      WalkSpeed = 0.7;
      RunSpeed = 2.1;
      Radius = 32;
      HP = 100;
      AgroRadius = 310;
      Level = 2;
      Exp = 50;
      Skills.Items.Add(new MoonSkill(MoonSkillType.SkelBowAttack));
    }
  }
  public class MMGT_Map1_SceletonMiddle2 : MoonMobGroupType
  {
    public MMGT_Map1_SceletonMiddle2() : base()
    {
      ItemId = 5;
      Name = "Скелет мечник";
      SpriteName = "sword-skel";
      RespawnType = MoonMobRespawnType.Area;
      RectangleResp = new Rectangle(2000, 3000, 1999, 1999);
      AwaitTime = 30;
      Count = 10;
      WalkSpeed = 0.7;
      RunSpeed = 2.1;
      Radius = 32;
      HP = 100;
      AgroRadius = 310;
      Level = 2;
      Exp = 80;
      Skills.Items.Add(new MoonSkill(MoonSkillType.SkelAttack));
    }
  }
  public class MMGT_Map1_SceletonDownLeft : MoonMobGroupType
  {
    public MMGT_Map1_SceletonDownLeft() : base()
    {
      ItemId = 6;
      Name = "Ужасный скелет лучник";
      SpriteName = "bow-skel";
      RespawnType = MoonMobRespawnType.Area;
      RectangleResp = new Rectangle(0, 7000, 999, 1999);
      AwaitTime = 30;
      Count = 7;
      WalkSpeed = 0.9;
      RunSpeed = 2.6;
      Radius = 32;
      HP = 200;
      AgroRadius = 410;
      Level = 3;
      Exp = 130;
      Skills.Items.Add(new MoonSkill(MoonSkillType.TerribleSkelBowAttack));
    }
  }

  public class MMGT_Map1_ZombieBossLeft : MoonMobGroupType
  {
    public MMGT_Map1_ZombieBossLeft() : base()
    {
      ItemId = 7;
      Name = "Восставший ЗОМБИ";
      SpriteName = "pink-zombie";
      RespawnType = MoonMobRespawnType.Exact;
      PointResp = new Point(300, 300);
      AwaitTime = 30;
      Count = 1;
      WalkSpeed = 1.5;
      RunSpeed = 3.8;
      Radius = 32;
      HP = 1000;
      AgroRadius = 490;
      Level = 5;
      Exp = 1500;
      Skills.Items.Add(new MoonSkill(MoonSkillType.PinkZombieAttack));
    }
  }

}
