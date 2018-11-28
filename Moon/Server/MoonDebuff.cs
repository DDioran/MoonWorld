using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Threading.Tasks;

namespace Moon
{
  public enum DebuffType
  {
    Slow,
    Freeze,
    Stun,
    Root
  }

  public abstract class MoonDebuff
  {
    public DebuffType DebuffType;
    public string DebuffText;
    public int Level;
    public double Speed;
    public bool IsStun;
    public double DebuffTime;
    public double DebuffTimeLeft;
    public bool Stackable;
    public bool deleted;
    public MoonDebuff(int Level)
    {
      this.Level = Level;
      IsStun = false;
    }
    public virtual void Dispatch()
    {
      DebuffTimeLeft += MoonApplication.Server.DeltaTime;
      if (DebuffTimeLeft >= DebuffTime)
        deleted = true;
    }
  }

  public class MoonDebuffSlow : MoonDebuff
  {
    public static DebuffType OwnDebuffType = DebuffType.Slow;
    public static bool OwnStackable = false;
    public MoonDebuffSlow(int Level) : base(Level)
    {
      DebuffText = "Замедление";
      DebuffType = MoonDebuffSlow.OwnDebuffType;
      DebuffTime = 5;
      DebuffTimeLeft = 0;
      Speed = 0.3;
      Stackable = OwnStackable;
      deleted = false;
    }
    public static void Add(MoonMob mob, int Level)
    {
      if (mob.State != MoonMobState.Alive) return;
      mob.Debuffs.Items.Add(new MoonDebuffSlow(Level));
      mob.debuffsChanged = true;
    }
  }

  public class MoonDebuffFreeze : MoonDebuff
  {
    public static DebuffType OwnDebuffType = DebuffType.Freeze;
    public static bool OwnStackable = false;
    public MoonDebuffFreeze(int Level) : base(Level)
    {
      DebuffText = "Заморозка";
      DebuffType = MoonDebuffFreeze.OwnDebuffType;
      DebuffTime = 6;
      DebuffTimeLeft = 0;
      Speed = 0;
      Stackable = OwnStackable;
      deleted = false;
    }
    public static void Add(MoonMob mob, int Level)
    {
      if (mob.State != MoonMobState.Alive) return;
      mob.Debuffs.Items.Add(new MoonDebuffFreeze(Level));
      mob.debuffsChanged = true;
    }
    public override void Dispatch()
    {
      base.Dispatch();
      if (DebuffTimeLeft > 2)
        Speed = 0.2;
    }
  }

  public class MoonDebuffStun : MoonDebuff
  {
    public static DebuffType OwnDebuffType = DebuffType.Stun;
    public static bool OwnStackable = false;
    public MoonDebuffStun() : base(1)
    {
      DebuffText = "Оглушение";
      DebuffType = MoonDebuffStun.OwnDebuffType;
      DebuffTime = 4;
      DebuffTimeLeft = 0;
      Speed = 0;
      IsStun = true;
      Stackable = OwnStackable;
      deleted = false;
    }
    public static void Add(MoonMob mob)
    {
      if (mob.State != MoonMobState.Alive) return;
      mob.Debuffs.Items.Add(new MoonDebuffStun());
      mob.debuffsChanged = true;
    }
  }

  public class MoonDebuffRoot : MoonDebuff
  {
    public static DebuffType OwnDebuffType = DebuffType.Root;
    public static bool OwnStackable = false;
    public MoonDebuffRoot(int Level) : base(Level)
    {
      DebuffText = "Корни";
      DebuffType = MoonDebuffSlow.OwnDebuffType;
      DebuffTime = 8;
      DebuffTimeLeft = 0;
      Speed = 0;
      Stackable = OwnStackable;
      deleted = false;
    }
    public static void Add(MoonMob mob, int Level)
    {
      if (mob.State != MoonMobState.Alive) return;
      mob.Debuffs.Items.Add(new MoonDebuffRoot(Level));
      mob.debuffsChanged = true;
    }
  }
  public class MoonDebuffTable
  {
    internal MoonMob Mob;
    public List<MoonDebuff> Items;
    public MoonDebuffTable(MoonMob Mob)
    {
      this.Mob = Mob;
      Items = new List<MoonDebuff>();
    }
    public bool IsStun()
    {
      return Items.Any(i => i.IsStun);
    }
    public void ProcessCooldown()
    {
      bool needDelete = false;
      Items.ForEach(s =>
      {
        s.Dispatch();
        if(s.deleted)
          needDelete = true;
      });
      if (needDelete)
      {
        Items = Items.Where(i => !i.deleted).ToList();
        Mob.debuffsChanged = true;
      }
    }

  }


}
