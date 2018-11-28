using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Threading.Tasks;

namespace Moon
{
  public enum SkillState
  {
    Await,
    Charge,
    Run
  }

  public enum MoonSkillType
  {
    // General
    None,
    // Mage
    MageAttack,
    MageFireBall,
    MageFreeze,
    // Knight
    KnightAttack,
    KnightSwordStrike,
    KnightDash,
    // Archer
    ArcherAttack,
    ArcherTripleShot,
    ArcherSlowShot,
    // Priest
    PriestAttack,
    PriestHeal,
    PriestRoot,
    // Mobs
    SkelBowAttack,
    WeakSkelBowAttack,
    TerribleSkelBowAttack,
    SkelAttack,
    SwordSkelAttack,
    PinkZombieAttack
  }

  public abstract class MoonTypeSkill
  {
    public MoonSkillType SkillType; // Тип скила
    public int MinDistance; // Расстояние на которое объект подходит автоматически для атаки
    public int MaxDistance; // Максимально возможное расстояние для атаки
    public double CooldownTime; // Откат скила, сек
    public double ChargeTime; // Зарядка (каст) скила, сек (скорость каста)
    public double AnimateTime; // Анимация скила (размах, полёт снаряда, удар топора), сек (скорость атаки)
    public double Power; // Сила скила
    public double PowerByLevel; // Сила скила возрастает за уровень игрока
    public bool IsEffect; // Есть ли отображение двумерного эффекта на анимации скила (полёт fireball и т.д.)
    public bool IsHeal; // Хилящий скилл
    public string EffectSpriteName; // Спрайт для отображения двумерного эффекта (эффект после анимации скила)
    public double EffectSpeed; // Скорость отображения анимации
    public string PostEffectSpriteName; // Спрайт для отображения двумерного эффекта (эффект взаимодействия скила с объектом)
    public double PostEffectSpeed; // Скорость отображения анимации
    public string AnimateName; // Имя группы спрайты анимации скила
    public bool AutoAttack; // Скилл является автоатакой
    public double AniSpeed; // Скорость анимации скила (визуальный эффект)
    public bool Physical; // Физический или магический скилл
    // -------------------------------------------------
    public double EffectPercent;
    public double DurationForHit;
    // -------------------------------------------------
    public MoonAnimateSkill ASkill;
    public bool EffectFired;
    public bool IsExtendedTime;
    public double ExtendedTime;
    // -------------------------------------------------
    public bool BasicHit;
    // -------------------------------------------------
    public MoonTypeSkill()
    {
      AutoAttack = false;
      IsHeal = false;
      EffectPercent = 0.6;
      DurationForHit = 0.3;
      AniSpeed = 1.0;
    }

    public static MoonTypeSkill CreateSkill(MoonSkillType skillType)
    {
      switch (skillType)
      {
        case MoonSkillType.MageAttack:
          return new MoonTypeMageAA();
        case MoonSkillType.MageFireBall:
          return new MoonTypeMageFB();
        case MoonSkillType.MageFreeze:
          return new MoonTypeMageFZ();
        case MoonSkillType.KnightAttack:
          return new MoonTypeKnightAA();
        case MoonSkillType.KnightSwordStrike:
          return new MoonTypeKnightSS();
        case MoonSkillType.KnightDash:
          return new MoonTypeKnightDS();
        case MoonSkillType.ArcherAttack:
          return new MoonTypeArcherAA();
        case MoonSkillType.ArcherTripleShot:
          return new MoonTypeArcherTS();
        case MoonSkillType.ArcherSlowShot:
          return new MoonTypeArcherSS();
        case MoonSkillType.PriestAttack:
          return new MoonTypePriestAA();
        case MoonSkillType.PriestHeal:
          return new MoonTypePriestHL();
        case MoonSkillType.PriestRoot:
          return new MoonTypePriestRT();
        case MoonSkillType.SkelBowAttack:
          return new MoonTypeSkelBowAA();
        case MoonSkillType.WeakSkelBowAttack:
          return new MoonTypeWeakSkelBowAA();
        case MoonSkillType.TerribleSkelBowAttack:
          return new MoonTypeTerribleSkelBowAA();
        case MoonSkillType.SkelAttack:
          return new MoonTypeSkelAA();
        case MoonSkillType.SwordSkelAttack:
          return new MoonTypeSwordSkelAA();
        case MoonSkillType.PinkZombieAttack:
          return new MoonTypePinkZombieAA();
      }
      return null;
    }
    public virtual void StartCharge(MoonMob mob, MoonSkill skill)
    {
    }
    public virtual void DoCharge(MoonMob mob, MoonSkill skill)
    {
    }
    public virtual void StartAnimate(MoonMob mob, MoonMob mobTarget, MoonSkill skill)
    {
      EffectFired = false;
      IsExtendedTime = false;
      ASkill = new MoonAnimateSkill();
      ASkill.skill = skill;
      ASkill.mob = mob;
      ASkill.mobTarget = mobTarget;
    }
    public virtual void InitAnimateExtended()
    {
      IsExtendedTime = true;
      ExtendedTime = 0;
      BasicHit = false;
    }
    public virtual void DoHit()
    {

    }
    public virtual void DoAnimateExtended()
    {
      if (!BasicHit && ExtendedTime >= DurationForHit)
      {
        BasicHit = true;
        ASkill.mob.HitSkill(ASkill.skill, ASkill.mobTarget);
        DoHit();
        IsExtendedTime = false;
        ASkill.deleted = true;
      }
    }
    public virtual void DoClientEffect()
    {
      if (ASkill.mobTarget != null)
        MoonApplication.Server.DoLineEffectAll(ASkill.skill.EffectSpriteName, ASkill.skill.EffectSpeed,
          ASkill.mob.PointMob.X, ASkill.mob.PointMob.Y, ASkill.mobTarget.PointMob.X, ASkill.mobTarget.PointMob.Y);
    }
    public virtual void DoAnimate()
    {
      if (IsExtendedTime)
      {
        ExtendedTime += MoonApplication.Server.DeltaTime;
        DoAnimateExtended();
      }
      if (!EffectFired && (ASkill.skill.AnimateTimeLeft / ASkill.skill.AnimateTime > EffectPercent))
      {
        EffectFired = true;
        if (ASkill.skill.IsEffect)
        {
          DoClientEffect();
          InitAnimateExtended();
        }
        else
        {
          ASkill.mob.HitSkill(ASkill.skill, ASkill.mobTarget);
          DoHit();
        }
      }
    }
  }
  public class MoonAnimateSkill : MoonObject
  {
    public MoonSkill skill;
    public MoonMob mob;
    public MoonMob mobTarget;
    public override void Dispatcher()
    {
      base.Dispatcher();
      skill.TypeSkill.DoAnimate();
    }
  }
  public class MoonSkillPanelItem
  {
    public MoonSkill Skill = null;
    public int KeyCode;
  }
  public class MoonSkillTable
  {
    public MoonSkillPanelItem[] Panel;
    public List<MoonSkill> Items;
    public MoonSkillTable()
    {
      Panel = new MoonSkillPanelItem[8];
      for (int i = 0; i < Panel.Length; i++)
        Panel[i] = new MoonSkillPanelItem();
      Items = new List<MoonSkill>();
    }
    public MoonSkillTable CopySkillTable(IMoonOpponent Opponent)
    {
      MoonSkillTable mst = new MoonSkillTable();
      mst.Items = Items.Select(i =>
      {
        MoonSkill skill = i.Copy();
        skill.Opponent = Opponent;
        return skill;
      }).ToList();
      return mst;
    }
    public MoonSkill GetSkill(MoonSkillType SkillType)
    {
      return Items.FirstOrDefault(i => i.SkillType == SkillType);
    }
    public MoonSkill GetAASkill()
    {
      return Items.FirstOrDefault(i => i.AutoAttack);
    }
    public int GetIndexBySkill(MoonSkillType SkillType)
    {
      for (int i = 0; i < Panel.Length; i++)
        if (Panel[i].Skill != null && Panel[i].Skill.SkillType == SkillType)
          return i;
      return -1;
    }
    public void ProcessCooldown()
    {
      Items.ForEach(s =>
      {
        if (s.AnimateTimeLeft < s.AnimateTime) s.AnimateTimeLeft += MoonApplication.Server.DeltaTime;
        if (s.ChargeTimeLeft < s.ChargeTime) s.ChargeTimeLeft += MoonApplication.Server.DeltaTime;
        if (s.CooldownTimeLeft < s.CooldownTime) s.CooldownTimeLeft += MoonApplication.Server.DeltaTime;
      });
    }
    public int GetIndexSkillByKeyCode(int KeyCode)
    {
      for (int i = 0; i < Panel.Length; i++)
        if (Panel[i].Skill != null && Panel[i].KeyCode == KeyCode)
          return i;
      return -1;
    }
    public MoonSkill AddSkill(MoonSkillType SkillType, IMoonOpponent Opponent, int index, int KeyCode)
    {
      MoonSkill skill = new MoonSkill(SkillType, Opponent);
      Items.Add(skill);
      if (index >= 0)
      {
        Panel[index].Skill = skill;
        Panel[index].KeyCode = KeyCode;
      }
      return skill;
    }
  }

  public class MoonSkillTableMage : MoonSkillTable
  {
    public MoonSkillTableMage(IMoonOpponent Opponent) : base()
    {
      AddSkill(MoonSkillType.MageAttack, Opponent, 0, 49);
      AddSkill(MoonSkillType.MageFireBall, Opponent, 1, 50);
      AddSkill(MoonSkillType.MageFreeze, Opponent, 2, 51);
    }
  }
  public class MoonSkillTableArcher : MoonSkillTable
  {
    public MoonSkillTableArcher(IMoonOpponent Opponent) : base()
    {
      AddSkill(MoonSkillType.ArcherAttack, Opponent, 0, 49);
      AddSkill(MoonSkillType.ArcherTripleShot, Opponent, 1, 50);
      AddSkill(MoonSkillType.ArcherSlowShot, Opponent, 2, 51);
    }
  }
  public class MoonSkillTableKnight : MoonSkillTable
  {
    public MoonSkillTableKnight(IMoonOpponent Opponent) : base()
    {
      AddSkill(MoonSkillType.KnightAttack, Opponent, 0, 49);
      AddSkill(MoonSkillType.KnightSwordStrike, Opponent, 1, 50);
      AddSkill(MoonSkillType.KnightDash, Opponent, 2, 51);
    }
  }
  public class MoonSkillTablePriest : MoonSkillTable
  {
    public MoonSkillTablePriest(IMoonOpponent Opponent) : base()
    {
      AddSkill(MoonSkillType.PriestAttack, Opponent, 0, 49);
      AddSkill(MoonSkillType.PriestHeal, Opponent, 1, 50);
      AddSkill(MoonSkillType.PriestRoot, Opponent, 2, 51);
    }
  }

  public class MoonTypeMageAA : MoonTypeSkill
  {
    public MoonTypeMageAA() : base()
    {
      SkillType = MoonSkillType.MageAttack;
      MinDistance = 330;
      MaxDistance = 370;
      CooldownTime = 2.0;
      ChargeTime = 0;
      AnimateTime = 0.4;
      Power = 60;
      IsEffect = true;
      EffectSpriteName = "magic-arrow";
      EffectSpeed = 1;
      PostEffectSpriteName = "magic-arrow-explosive";
      PostEffectSpeed = 3;
      AnimateName = "attack";
      AutoAttack = true;
      AniSpeed = 0.4;
      Physical = false;
    }

  }

  public class MoonTypeMageFB : MoonTypeSkill
  {
    public MoonTypeMageFB() : base()
    {
      SkillType = MoonSkillType.MageFireBall;
      MinDistance = 330;
      MaxDistance = 370;
      CooldownTime = 0.5;
      ChargeTime = 1.5;
      AnimateTime = 0.7;
      Power = 160;
      PowerByLevel = 10;
      IsEffect = true;
      EffectSpriteName = "fireball";
      EffectSpeed = 1;
      PostEffectSpriteName = "fireball-expl";
      PostEffectSpeed = 3;
      AnimateName = "spelling";
      AniSpeed = 0.7;
      Physical = false;
    }

  }

  public class MoonTypeMageFZ : MoonTypeSkill
  {
    public MoonTypeMageFZ() : base()
    {
      SkillType = MoonSkillType.MageFreeze;
      MinDistance = 350;
      MaxDistance = 390;
      CooldownTime = 10.0;
      ChargeTime = 0.0;
      AnimateTime = 0.7;
      Power = 60;
      PowerByLevel = 4;
      IsEffect = false;
      PostEffectSpriteName = "magic-arrow-explosive";
      PostEffectSpeed = 3;
      AnimateName = "spelling";
      AniSpeed = 0.7;
      Physical = false;
    }
    public override void DoHit()
    {
      MoonDebuffFreeze.Add(ASkill.mobTarget, 1);
    }

  }

  public class MoonTypeKnightAA : MoonTypeSkill
  {
    public MoonTypeKnightAA() : base()
    {
      SkillType = MoonSkillType.KnightAttack;
      MinDistance = 50;
      MaxDistance = 100;
      CooldownTime = 1.2;
      ChargeTime = 0;
      AnimateTime = 0.8;
      Power = 40;
      IsEffect = false;
      EffectSpriteName = "";
      EffectSpeed = 1;
      PostEffectSpriteName = "knight-aa-strike";
      PostEffectSpeed = 1;
      AnimateName = "attack";
      AutoAttack = true;
      AniSpeed = 0.8;
      Physical = true;
    }

  }

  public class MoonTypeKnightSS : MoonTypeSkill
  {
    public MoonTypeKnightSS() : base()
    {
      SkillType = MoonSkillType.KnightSwordStrike;
      MinDistance = 70;
      MaxDistance = 120;
      CooldownTime = 3.0;
      ChargeTime = 0;
      AnimateTime = 1.3;
      Power = 130;
      PowerByLevel = 8;
      IsEffect = false;
      EffectSpriteName = "";
      EffectSpeed = 1;
      PostEffectSpriteName = "sword-strike";
      PostEffectSpeed = 1;
      AnimateName = "spelling";
      AniSpeed = 1.3;
      Physical = true;
    }

  }
  public class MoonTypeKnightDS : MoonTypeSkill
  {
    private double DashClose;
    private double StoreX;
    private double StoreY;
    public MoonTypeKnightDS() : base()
    {
      SkillType = MoonSkillType.KnightDash;
      MinDistance = 270;
      MaxDistance = 280;
      DashClose = 50;
      CooldownTime = 5.0;
      ChargeTime = 0;
      AnimateTime = 0.22;
      DurationForHit = 0.2;
      EffectPercent = 0;
      Power = 40;
      PowerByLevel = 2;
      IsEffect = true;
      PostEffectSpriteName = "sword-strike";
      PostEffectSpeed = 1;
      AnimateName = "attack";
      AniSpeed = 1.0;
      Physical = true;
    }
    public override void DoHit()
    {
      MoonDebuffStun.Add(ASkill.mobTarget);
      ASkill.mob.PointMob = new MoonPoint(StoreX, StoreY);
      ASkill.mob.MobMoveTo(ASkill.mob);
    }
    public override void DoClientEffect()
    {
      double mx = ASkill.mobTarget.PointMob.X;
      double my = ASkill.mobTarget.PointMob.Y;
      StoreX = ASkill.mob.PointMob.X;
      StoreY = ASkill.mob.PointMob.Y;
      for (int i = 0; i < 1000; i++)
      {
        if (Math.Sqrt((StoreX - mx) * (StoreX - mx) + (StoreY - my) * (StoreY - my)) < DashClose) break;
        StoreX += 10 * Math.Sign(mx - StoreX);
        StoreY += 10 * Math.Sign(my - StoreY);
      }
      MoonApplication.Server.DoDashEffectAll(ASkill.mob.MobId, StoreX, StoreY);
    }
  }


  public class MoonTypeArcherAA : MoonTypeSkill
  {
    public MoonTypeArcherAA() : base()
    {
      SkillType = MoonSkillType.ArcherAttack;
      MinDistance = 350;
      MaxDistance = 390;
      CooldownTime = 0.5;
      ChargeTime = 0;
      AnimateTime = 0.5;
      Power = 20;
      IsEffect = true;
      EffectSpriteName = "bow-arrow";
      EffectSpeed = 1;
      PostEffectSpriteName = "magic-arrow-explosive";
      PostEffectSpeed = 3;
      AnimateName = "attack";
      AutoAttack = true;
      AniSpeed = 0.5;
      Physical = true;
    }

  }

  public class MoonTypeArcherTS : MoonTypeSkill
  {
    public bool Arrow1Hit;
    public bool Arrow2Hit;
    public MoonTypeArcherTS() : base()
    {
      SkillType = MoonSkillType.ArcherTripleShot;
      MinDistance = 360;
      MaxDistance = 400;
      CooldownTime = 5.0;
      ChargeTime = 0;
      AnimateTime = 0.5;
      Power = 200;
      PowerByLevel = 12;
      IsEffect = true;
      EffectSpriteName = "bow-arrow";
      EffectSpeed = 1;
      PostEffectSpriteName = "magic-arrow-explosive";
      PostEffectSpeed = 3;
      AnimateName = "shooting";
      AniSpeed = 0.5;
      Physical = true;
    }
    public override void InitAnimateExtended()
    {
      base.InitAnimateExtended();
      Arrow1Hit = false;
      Arrow2Hit = false;
    }
    public override void DoAnimateExtended()
    {
      base.DoAnimateExtended();
      if (!Arrow1Hit && ExtendedTime >= 0.1)
      {
        Arrow1Hit = true;
        MoonApplication.Server.DoLineEffectAll(ASkill.skill.EffectSpriteName, ASkill.skill.EffectSpeed,
          ASkill.mob.PointMob.X, ASkill.mob.PointMob.Y, ASkill.mobTarget.PointMob.X, ASkill.mobTarget.PointMob.Y);
      }
      if (!Arrow2Hit && ExtendedTime >= 0.2)
      {
        Arrow2Hit = true;
        MoonApplication.Server.DoLineEffectAll(ASkill.skill.EffectSpriteName, ASkill.skill.EffectSpeed,
          ASkill.mob.PointMob.X, ASkill.mob.PointMob.Y, ASkill.mobTarget.PointMob.X, ASkill.mobTarget.PointMob.Y);
      }
    }
  }

  public class MoonTypeArcherSS : MoonTypeSkill
  {
    public MoonTypeArcherSS() : base()
    {
      SkillType = MoonSkillType.ArcherSlowShot;
      MinDistance = 380;
      MaxDistance = 420;
      CooldownTime = 8.0;
      ChargeTime = 0;
      AnimateTime = 0.5;
      Power = 40;
      PowerByLevel = 2;
      IsEffect = true;
      EffectSpriteName = "bow-arrow";
      EffectSpeed = 1;
      PostEffectSpriteName = "magic-arrow-explosive";
      PostEffectSpeed = 3;
      AnimateName = "shooting";
      AniSpeed = 0.5;
      Physical = true;
    }
    public override void DoHit()
    {
      MoonDebuffSlow.Add(ASkill.mobTarget, 1);
    }
  }

  public class MoonTypePriestAA : MoonTypeSkill
  {
    public MoonTypePriestAA() : base()
    {
      SkillType = MoonSkillType.PriestAttack;
      MinDistance = 400;
      MaxDistance = 440;
      CooldownTime = 0.6;
      ChargeTime = 0;
      AnimateTime = 0.3;
      Power = 12;
      IsEffect = true;
      EffectSpriteName = "magic-arrow";
      EffectSpeed = 1;
      PostEffectSpriteName = "magic-arrow-explosive";
      PostEffectSpeed = 3;
      AnimateName = "attack";
      AutoAttack = true;
      AniSpeed = 0.3;
      Physical = false;
    }

  }

  public class MoonTypePriestHL : MoonTypeSkill
  {
    public MoonTypePriestHL() : base()
    {
      SkillType = MoonSkillType.PriestHeal;
      MinDistance = 400;
      MaxDistance = 440;
      CooldownTime = 5.0;
      ChargeTime = 1.2;
      AnimateTime = 0.7;
      Power = 200;
      PowerByLevel = 12;
      IsHeal = true;
      IsEffect = false;
      PostEffectSpriteName = "magic-arrow-explosive";
      PostEffectSpeed = 3;
      AnimateName = "spelling";
      AniSpeed = 0.7;
      Physical = false;
    }
  }

  public class MoonTypePriestRT : MoonTypeSkill
  {
    public MoonTypePriestRT() : base()
    {
      SkillType = MoonSkillType.ArcherSlowShot;
      MinDistance = 400;
      MaxDistance = 440;
      CooldownTime = 10.0;
      ChargeTime = 0;
      AnimateTime = 0.7;
      Power = 0;
      IsEffect = false;
      PostEffectSpriteName = "magic-arrow-explosive";
      PostEffectSpeed = 3;
      AnimateName = "spelling";
      AniSpeed = 0.7;
      Physical = false;
    }
    public override void DoHit()
    {
      MoonDebuffRoot.Add(ASkill.mobTarget, 1);
    }
  }

  public class MoonTypeSkelBowAA : MoonTypeSkill
  {
    public MoonTypeSkelBowAA() : base()
    {
      SkillType = MoonSkillType.SkelBowAttack;
      MinDistance = 290;
      MaxDistance = 320;
      CooldownTime = 1.5;
      ChargeTime = 0;
      AnimateTime = 0.5;
      Power = 30;
      IsEffect = true;
      EffectSpriteName = "bow-arrow";
      EffectSpeed = 1;
      PostEffectSpriteName = "magic-arrow-explosive";
      PostEffectSpeed = 3;
      AnimateName = "attack";
      AutoAttack = true;
      Physical = true;
    }

  }

  public class MoonTypeWeakSkelBowAA : MoonTypeSkill
  {
    public MoonTypeWeakSkelBowAA() : base()
    {
      SkillType = MoonSkillType.WeakSkelBowAttack;
      MinDistance = 260;
      MaxDistance = 290;
      CooldownTime = 2.0;
      ChargeTime = 0;
      AnimateTime = 0.5;
      Power = 20;
      IsEffect = true;
      EffectSpriteName = "bow-arrow";
      EffectSpeed = 1;
      PostEffectSpriteName = "magic-arrow-explosive";
      PostEffectSpeed = 3;
      AnimateName = "attack";
      AutoAttack = true;
      Physical = true;
    }

  }


  public class MoonTypeTerribleSkelBowAA : MoonTypeSkill
  {
    public MoonTypeTerribleSkelBowAA() : base()
    {
      SkillType = MoonSkillType.TerribleSkelBowAttack;
      MinDistance = 380;
      MaxDistance = 410;
      CooldownTime = 1.0;
      ChargeTime = 0;
      AnimateTime = 0.5;
      Power = 40;
      IsEffect = true;
      EffectSpriteName = "bow-arrow";
      EffectSpeed = 1;
      PostEffectSpriteName = "magic-arrow-explosive";
      PostEffectSpeed = 3;
      AnimateName = "attack";
      AutoAttack = true;
      Physical = true;
    }

  }

  public class MoonTypeSkelAA : MoonTypeSkill
  {
    public MoonTypeSkelAA() : base()
    {
      SkillType = MoonSkillType.SkelAttack;
      MinDistance = 50;
      MaxDistance = 100;
      CooldownTime = 2.0;
      ChargeTime = 0;
      AnimateTime = 0.5;
      Power = 20;
      IsEffect = false;
      EffectSpriteName = "";
      EffectSpeed = 1;
      PostEffectSpriteName = "knight-aa-strike";
      PostEffectSpeed = 3;
      AnimateName = "attack";
      AutoAttack = true;
      Physical = true;
    }

  }

  public class MoonTypeSwordSkelAA : MoonTypeSkill
  {
    public MoonTypeSwordSkelAA() : base()
    {
      SkillType = MoonSkillType.SwordSkelAttack;
      MinDistance = 50;
      MaxDistance = 100;
      CooldownTime = 1.5;
      ChargeTime = 0;
      AnimateTime = 0.5;
      Power = 30;
      IsEffect = false;
      EffectSpriteName = "";
      EffectSpeed = 1;
      PostEffectSpriteName = "knight-aa-strike";
      PostEffectSpeed = 3;
      AnimateName = "attack";
      AutoAttack = true;
      Physical = true;
    }

  }

  public class MoonTypePinkZombieAA : MoonTypeSkill
  {
    public MoonTypePinkZombieAA() : base()
    {
      SkillType = MoonSkillType.PinkZombieAttack;
      MinDistance = 50;
      MaxDistance = 100;
      CooldownTime = 0.5;
      ChargeTime = 0;
      AnimateTime = 0.5;
      Power = 90;
      IsEffect = false;
      EffectSpriteName = "";
      EffectSpeed = 1;
      PostEffectSpriteName = "knight-aa-strike";
      PostEffectSpeed = 3;
      AnimateName = "attack";
      AutoAttack = true;
      Physical = true;
    }

  }

  public class MoonSkill
  {
    public MoonSkillType SkillType;
    public int MinDistance;
    public int MaxDistance;
    public double CooldownTime;
    public double CooldownTimeLeft;
    public double ChargeTime;
    public double ChargeTimeLeft;
    public double AnimateTime;
    public double AnimateTimeLeft;
    public double powerBase;
    public double powerByLevel;
    public bool IsEffect;
    public string EffectSpriteName;
    public double EffectSpeed;
    public string PostEffectSpriteName;
    public double PostEffectSpeed;
    public string AnimateName;
    public double AniSpeed;
    public bool AutoAttack;
    public bool IsHeal;
    public MoonTypeSkill TypeSkill;
    internal IMoonOpponent Opponent;
    public double Power
    {
      get
      {
        return powerBase + powerByLevel * Opponent?.Level??0;
      }
    }
    public MoonSkill(MoonSkillType SkillType): this(SkillType, null)
    {
    }
    public MoonSkill(MoonSkillType SkillType, IMoonOpponent Opponent)
    {
      this.Opponent = Opponent;
      this.SkillType = SkillType;
      TypeSkill = MoonTypeSkill.CreateSkill(SkillType);
      MinDistance = TypeSkill.MinDistance;
      MaxDistance = TypeSkill.MaxDistance;
      CooldownTime = TypeSkill.CooldownTime;
      CooldownTimeLeft = TypeSkill.CooldownTime;
      ChargeTime = TypeSkill.ChargeTime;
      AnimateTime = TypeSkill.AnimateTime;
      AniSpeed = TypeSkill.AniSpeed;
      powerBase = TypeSkill.Power;
      powerByLevel = TypeSkill.PowerByLevel;
      IsEffect = TypeSkill.IsEffect;
      EffectSpriteName = TypeSkill.EffectSpriteName;
      EffectSpeed = TypeSkill.EffectSpeed;
      PostEffectSpriteName = TypeSkill.PostEffectSpriteName;
      PostEffectSpeed = TypeSkill.PostEffectSpeed;
      AnimateName = TypeSkill.AnimateName;
      AutoAttack = TypeSkill.AutoAttack;
      IsHeal = TypeSkill.IsHeal;
    }
    public MoonSkill Copy()
    {
      MoonSkill skill = new MoonSkill(SkillType, Opponent);
      skill.SkillType = SkillType;
      skill.MinDistance = MinDistance;
      skill.MaxDistance = MaxDistance;
      skill.CooldownTime = CooldownTime;
      skill.CooldownTimeLeft = CooldownTimeLeft;
      skill.ChargeTime = ChargeTime;
      skill.AnimateTime = AnimateTime;
      skill.AniSpeed = AniSpeed;
      skill.powerBase = powerBase;
      skill.powerByLevel = powerByLevel;
      skill.IsEffect = IsEffect;
      skill.EffectSpriteName = EffectSpriteName;
      skill.EffectSpeed = EffectSpeed;
      skill.PostEffectSpriteName = PostEffectSpriteName;
      skill.PostEffectSpeed = PostEffectSpeed;
      skill.AnimateName = AnimateName;
      skill.AutoAttack = AutoAttack;
      skill.IsHeal = IsHeal;
      return skill;
    }
    public void StartCharge(MoonMob mob)
    {
      TypeSkill.StartCharge(mob, this);
    }
    public void StartAnimate(MoonMob mob)
    {
      if (mob.Target != null)
        TypeSkill.StartAnimate(mob, mob.GetCurrentMap().GetMapMob(mob.Target.ObjectId), this);
    }
  }

}
