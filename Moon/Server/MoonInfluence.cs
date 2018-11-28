using System;
using System.Collections.Generic;
using System.Linq;

namespace Moon
{
  public enum InfluenceType
  {
    Damage,
    Healing
  }
  public class InfluenceItem
  {
    public InfluenceType Type;
    public double Power;
    public InfluenceItem(double Power, InfluenceType Type)
    {
      this.Power = Power;
      this.Type = Type;
    }
  }
  public class MoonInfluenceItem
  {
    public MoonMob Mob;
    public double FullInfluence;
    public double DamageInfluence;
    public List<InfluenceItem> Items;
    public MoonInfluenceItem(MoonMob Mob)
    {
      this.Mob = Mob;
      Items = new List<InfluenceItem>();
    }
    public void Incoming(double Power, InfluenceType Type)
    {
      Items.Add(new InfluenceItem(Power, Type));
      FullInfluence = Items.Sum(i => i.Power);
      DamageInfluence = Items.Where(i => i.Type == InfluenceType.Damage).Sum(i => i.Power);
    }
  }
  public class MoonInfluence
  {
    public MoonMob Mob;
    public List<MoonInfluenceItem> Items;
    public int Count
    {
      get
      {
        Items = Items.Where(i => i.Mob.State == MoonMobState.Alive).ToList();
        return Items.Count;
      }
    }
    public MoonInfluence(MoonMob Mob)
    {
      this.Mob = Mob;
      Items = new List<MoonInfluenceItem>();
    }
    private MoonInfluenceItem GetInfluenceItem(MoonMob Mob)
    {
      return Items.FirstOrDefault(i => i.Mob == Mob);
    }
    public void Clear()
    {
      Items.Clear();
    }
    public void Incoming(MoonMob Mob, double Power, InfluenceType Type)
    {
      MoonInfluenceItem item = GetInfluenceItem(Mob);
      if (item == null)
      {
        item = new MoonInfluenceItem(Mob);
        Items.Add(item);
      }
      item.Incoming(Power, Type);
    }
    public MoonMob GetMostEvilMob()
    {
      Items = Items.Where(i => i.Mob.State == MoonMobState.Alive).ToList();
      if (Items.Count == 0) return null;
      MoonMob MaximalInfluenceMob = Items[0].Mob;
      double max = -1;
      Items.ForEach(i =>
      {
        if (i.FullInfluence > max)
        {
          max = i.FullInfluence;
          MaximalInfluenceMob = i.Mob;
        }
      });
      return MaximalInfluenceMob;
    }
    public List<MoonPlayer> GetMostDamagePlayers()
    {
      Dictionary<MoonParty, double> parties = new Dictionary<MoonParty, double>();
      Dictionary<MoonPlayer, double> players = new Dictionary<MoonPlayer, double>();
      List<MoonInfluenceItem> items = Items.Where(i => i.Mob is MoonPlayer).ToList();
      if (items.Count == 0) return new List<MoonPlayer>();
      items.ForEach(i =>
      {
        if ((i.Mob as MoonPlayer).Party == null)
          players[i.Mob as MoonPlayer] = i.DamageInfluence;
        else
          if (!parties.ContainsKey((i.Mob as MoonPlayer).Party))
            parties[(i.Mob as MoonPlayer).Party] = i.DamageInfluence;
          else
            parties[(i.Mob as MoonPlayer).Party] = parties[(i.Mob as MoonPlayer).Party] + i.DamageInfluence;
      });
      double mplayer = -1, mparty = -1;
      MoonPlayer player = null;
      MoonParty party = null;
      foreach (KeyValuePair<MoonPlayer, double> entry in players)
        if (entry.Value > mplayer)
        {
          player = entry.Key;
          mplayer = entry.Value;
        }
      foreach (KeyValuePair<MoonParty, double> entry in parties)
        if (entry.Value > mplayer)
        {
          party = entry.Key;
          mparty = entry.Value;
        }
      if (mplayer > mparty)
        return player == null ? new List<MoonPlayer>() : new List<MoonPlayer> { player };
      return party == null ? new List<MoonPlayer>() : party.Items
        .Where(i => MoonPlayer.FindPlayer(i).Active) // тут ещё вставить проверку на удалённость от моба
        .Select(i => MoonPlayer.FindPlayer(i))
        .ToList();
    }

  }

}
