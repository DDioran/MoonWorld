using System;
using System.Collections.Generic;
using System.Linq;

namespace Moon
{
  public class MoonParty
  {
    public static int MaxMembers = 5;
    public List<Guid> Items;
    public Guid LeaderId;

    public MoonParty(MoonPlayer Leader, MoonPlayer Member)
    {
      LeaderId = Leader.ClientId;
      Items = new List<Guid>
      {
        Leader.ClientId,
        Member.ClientId
      };
      Leader.Party = this;
      Member.Party = this;
    }

    public bool AddMember(MoonPlayer Member)
    {
      if (Items.Count >= MaxMembers || Member.Party != null) return false;
      Items.Add(Member.ClientId);
      Member.Party = this;
      return true;
    }

    public bool RemoveMember(MoonPlayer Member)
    {
      if (Member.Party != this) return false;
      Member.Party = null;
      Items.Remove(Member.ClientId);
      if (Items.Count < 2)
      {
        Items.ForEach(item => MoonPlayer.FindPlayer(item).Party = null);
        Items.Clear();
      }
      else
      {
        MoonPlayer first = MoonPlayer.FindPlayer(Items[0]);
        if (first.Party.LeaderId == Member.ClientId)
          first.Party.LeaderId = first.ClientId;
      }
      return true;
    }

    public bool SetLeader(MoonPlayer Member)
    {
      if (Member.Party != this) return false;
      LeaderId = Member.ClientId;
      return true;
    }

    public void PushToMap()
    {
      Items.ForEach(item => MoonPlayer.FindPlayer(item).PushToMap());
    }

    public static bool IsSameParty(MoonMob Player, MoonMob Target)
    {
      if ((Player as MoonPlayer) == null) return false;
      if ((Target as MoonPlayer) == null) return false;
      return (Player as MoonPlayer).Party == (Target as MoonPlayer).Party;
    }

    public List<MoonPlayer> GetActiveMembers()
    {
      return Items.Select(i => MoonPlayer.FindPlayer(i)).Where(i => i.Active).ToList();
    }

    public static void GainExperience(MoonPlayer Player, MoonMob Target)
    {
      if (Player == null) return;
      double experience = 0;
      if (Target is MoonPlayer)
        experience = 100;
      else
        experience = Target.GainExp;
      // Добавляем опыт игроку
      List<MoonPlayer> players = new List<MoonPlayer>();
      if (Player.Party == null)
        players.Add(Player);
      else
        players = Player.Party.GetActiveMembers();
      // тут надо вычислить понижение опыта в зависимости от уровня членов группы и уровня моба
      if (players.Min(p => p.Level) < Target.Level - 10 || players.Max(p => p.Level) > Target.Level + 10)
        experience = 0;
      experience /= players.Count();
      players.ForEach(p =>
      {
        p.Info.Exp += experience;
        MoonApplication.Server.DoTextChat(p, new List<ChatType> { ChatType.TabAll }, null, "#FFC127", $@"вы получили {experience} опыта от цели {Target.Name}");
        if (p.Info.Exp >= p.Info.MaxExp)
        {
          // LEVEL UP!!!
          p.MaxHP *= 1.2;
          p.HP = p.MaxHP;
          p.Info.MaxExp *= 2;
          p.Info.Exp = 0;
          p.Level++; //!!!
          MoonApplication.Server.DoTextChat(p, new List<ChatType> { ChatType.TabAll }, null, "#FFC127", $@"вы получили новый уровень");
        }
        p.PushToMap();
      });
    }

  }

}
