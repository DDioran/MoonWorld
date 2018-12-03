using System;
using System.Collections.Generic;
using System.Linq;

namespace Moon
{
  public class NpcTalkQuestInfo
  {
    public string ItemCode;
    public string Title;
    public string Description;
    public decimal Experience = 100;
    public decimal Coins = 100;
  }
  public class NpcTalkInfo
  {
    public string ItemCode;
    public string Name;
    public string Title;
    public string Description;
    public List<NpcTalkQuestInfo> QuestOfferList;
    public List<NpcTalkQuestInfo> QuestCompleteList;
  }
  public class MoonNpc : MoonMob
  {
    public MoonMap Map;
    public string Title;
    public string Description;
    public MoonNpc(MoonMap Map, string NpcCode, double X, double Y) : base()
    {
      this.Map = Map;
      ItemCode = NpcCode;
      PointMob = new MoonPoint(X, Y);
    }
    protected override MoonObjectType GetObjectType()
    {
      return MoonObjectType.Npc;
    }
    public override void PushToMap()
    {
      MoonApplication.Server.PushToMap(Map.MapId, this);
    }
    public ClientInfo CreateNpcInfo(NpcInfo info)
    {
      CreateMobInfo(info);
      return info;
    }

    public NpcTalkInfo CreateNpcTalkInfo(MoonPlayer player)
    {
      PlayerQuestItem item = player.Quest.GetPlayerNpcQuest(this);
      return new NpcTalkInfo
      {
        ItemCode = ItemCode,
        Name = Name,
        Title = Title,
        Description = Description,
        QuestOfferList = item.OfferQuestList.Select(q => new NpcTalkQuestInfo
        {
          ItemCode = q.ItemCode,
          Title = q.Title,
          Description = q.Description,
          Experience = q.Experience,
          Coins = q.Coins
        }).ToList() ?? new List<NpcTalkQuestInfo>(),
        QuestCompleteList = item.CompleteQuestList.Select(q => new NpcTalkQuestInfo
        {
          ItemCode = q.ItemCode,
          Title = q.Title,
          Description = q.CompleteDescription,
          Experience = q.Experience,
          Coins = q.Coins
        }).ToList() ?? new List<NpcTalkQuestInfo>()
      };
    }


  }
}
