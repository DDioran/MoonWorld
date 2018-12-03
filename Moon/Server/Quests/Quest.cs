using System;
using System.Collections.Generic;
using System.Linq;

namespace Moon
{
  public enum QuestType
  {
    Common,   // обычный
    Story,    // сюжетный
    Daily,    // ежедневный
    Repeat,   // повторяемый
    Social    // социальный
  }
  public enum QuestTermType
  {
    PlayerLevelGE,
    PlayerLevelLE,
    QuestPass,
    KillMob,
    InventoryItems
  }
  public class QuestTermItem
  {
    public string ItemCode;
    public int Quantity;
  }
  public class QuestTerm
  {
    public QuestTermType Type;
    public int? Level;
    public List<string> QuestList;
    public List<QuestTermItem> ItemList;
  }
  public class QuestTerms
  {
    public List<QuestTerm> Terms; // условия (по и)
  }
  public class Quest
  {
    public string ItemCode; // Id квеста в базе
    public QuestType QuestType;
    public string NpcCode; // Персонаж выдающий квест
    public List<QuestTerms> Terms; // условия выдачи (по или)
    public List<QuestTerms> Conds; // условия выполнения (по или)
    public string Title;
    public string Description;
    public string CompleteDescription;
    public decimal Experience;
    public decimal Coins;
    public List<QuestTermItem> AwardItemList;

    public Quest()
    {
    }
    public static void LoadDbItems()
    {
      MoonApplication.Server.QuestList.Clear();
      // Тут надо грузить из json фалика инфу о всех квестах
      MoonApplication.Server.QuestList["test-quest-1"] = new Quest
      {
        QuestType = QuestType.Common,
        NpcCode = "test-npc",
        ItemCode = "test-quest-1",
        Title = "Мечи для мастера",
        Description = "Для начала, убейте 10 скелетов мечников и принесите мне их мечи. Трёх будет достаточно. Да! И не смейте приходитть ко мне пока вы не достигнете 7-го уровня!",
        CompleteDescription = "Нда... качество оставляет желать лучшего, но ничего, на переплавку сгодятся.",
        Terms = new List<QuestTerms>()
        {
          new QuestTerms {
            Terms = new List<QuestTerm>{
              new QuestTerm
              {
                Type = QuestTermType.PlayerLevelGE,
                Level = 6
              }
            }
          }
        },
        Conds = new List<QuestTerms>()
        {
          new QuestTerms {
            Terms = new List<QuestTerm>{
              new QuestTerm
              {
                Type = QuestTermType.PlayerLevelGE,
                Level = 7
              },
              new QuestTerm
              {
                Type = QuestTermType.KillMob,
                ItemList = new List<QuestTermItem>
                {
                  new QuestTermItem
                  {
                    ItemCode = "sword-skel-2",
                    Quantity = 10
                  }
                }
              },
              new QuestTerm
              {
                Type = QuestTermType.InventoryItems,
                ItemList = new List<QuestTermItem>
                {
                  new QuestTermItem
                  {
                    ItemCode = "sword-skel-2-sword",
                    Quantity = 3
                  }
                }
              }
            }
          }
        },
        Experience = 100,
        Coins = 100
      };
      MoonApplication.Server.QuestList["test-quest-2"] = new Quest
      {
        QuestType = QuestType.Common,
        NpcCode = "test-npc",
        ItemCode = "test-quest-2",
        Title = "Поход за черепами",
        Description = "Вы славно потрудились в прошлый раз, и раз уже знаете дорогу, не принесете ли вы мне 10 черепов тех самых скелетов, конечно не безвозмездно",
        CompleteDescription = "Замечательно! Будет теперь из чего сделать пугала для огорода!",
        Terms = new List<QuestTerms>()
        {
          new QuestTerms {
            Terms = new List<QuestTerm>{
              new QuestTerm
              {
                Type = QuestTermType.PlayerLevelGE,
                Level = 7
              },
              new QuestTerm
              {
                Type = QuestTermType.QuestPass,
                QuestList = new List<string>{ "test-quest-1" }
              }
            }
          }
        },
        Conds = new List<QuestTerms>()
        {
          new QuestTerms {
            Terms = new List<QuestTerm>{
              new QuestTerm
              {
                Type = QuestTermType.InventoryItems,
                ItemList = new List<QuestTermItem>
                {
                  new QuestTermItem
                  {
                    ItemCode = "sword-skel-2-skull",
                    Quantity = 10
                  }
                }
              }
            }
          }
        },
        Experience = 200,
        Coins = 200
      };
    }
    public static Quest GetQuestByCode(string code)
    {
      if (!MoonApplication.Server.QuestList.ContainsKey(code)) return null;
      return MoonApplication.Server.QuestList[code];
    }
    public static List<Quest> GetOfferQuestList(MoonPlayer player, MoonNpc npc)
    {
      return MoonApplication.Server.QuestList.Where(q => q.Value.NpcCode == npc.ItemCode &&
        q.Value.Terms.Any(tor => tor.Terms.All(t =>
        {
          switch (t.Type)
          {
            case QuestTermType.PlayerLevelGE:
              return player.Level >= t.Level;
            case QuestTermType.PlayerLevelLE:
              return player.Level <= t.Level;
            case QuestTermType.QuestPass:
              return t.QuestList.All(ql => player.Quest.PassQuest.Any(pq => pq.ItemCode == ql));
          }
          return false;
        }))).Select(q => q.Value).ToList();
    }
    public static List<Quest> GetCompleteQuestList(MoonPlayer player, MoonNpc npc)
    {
      return MoonApplication.Server.QuestList
        .Where(q => !player.Quest.PassQuest.Any(pq => pq.ItemCode == q.Value.ItemCode))
        .Where(q => q.Value.NpcCode == npc.ItemCode &&
        q.Value.Conds.Any(tor => tor.Terms.All(t =>
        {
          switch (t.Type)
          {
            case QuestTermType.PlayerLevelGE:
              return player.Level >= t.Level;
            case QuestTermType.PlayerLevelLE:
              return player.Level <= t.Level;
            case QuestTermType.KillMob:
              return false;
            case QuestTermType.InventoryItems:
              return false;
          }
          return false;
        }))).Select(q => q.Value).ToList();
    }
  }

  public class PlayerQuestItem
  {
    public MoonNpc Npc;
    public List<Quest> OfferQuestList;
    public List<Quest> CompleteQuestList;
  }
  public class QuestNpcInfo
  {
    public string Npc;
    public bool Offer;
    public bool Complete;
  }
  public class PlayerQuest
  {
    public MoonPlayer Player;
    public List<Quest> PassQuest; // Выполненные и сданные квесты
    public List<Quest> ActiveQuest; // Испоняемые квеста
    public List<PlayerQuestItem> ItemQuest; // Предлагаемые квесты и завершенные (которые необходимо сдать)
    public PlayerQuest(MoonPlayer Player)
    {
      this.Player = Player;
      PassQuest = new List<Quest>();
      ActiveQuest = new List<Quest>();
      ItemQuest = new List<PlayerQuestItem>();
    }
    /// <summary>
    /// Пересчет статусов всех квестов игрока
    /// вызывается при илюбом изменении статуса любого квеста
    /// </summary>
    public void RecalcQuestsInfo()
    {
      ItemQuest = Player.Map.NpcList.Select(npc => new PlayerQuestItem
      {
        Npc = npc,
        OfferQuestList = Quest.GetOfferQuestList(Player, npc),
        CompleteQuestList = Quest.GetCompleteQuestList(Player, npc)
      }).ToList();
    }
    /// <summary>
    /// Создаём мини-карту квестов для игрока
    /// </summary>
    /// <returns></returns>
    public List<QuestNpcInfo> CreateNpcQuestInfo()
    {
      return ItemQuest.Select(iq => new QuestNpcInfo
      {
        Npc = iq.Npc.ItemCode,
        Offer = iq.OfferQuestList.Count > 0,
        Complete = iq.CompleteQuestList.Count > 0
      }).ToList();
    }
    /// <summary>
    /// Получение квестов, которые НПС готов выдать игроку или принять
    /// </summary>
    public PlayerQuestItem GetPlayerNpcQuest(MoonNpc npc)
    {
      return ItemQuest.FirstOrDefault(iq => iq.Npc == npc);
    }
  }


}
