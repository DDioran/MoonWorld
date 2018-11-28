using System;
using System.Collections.Generic;
using System.Linq;

namespace Moon
{
  public enum ChestState
  {
    Await,
    Appearance,
    Restricted,
    Available,
    Disappearance,
    Destroy
  }
  public class ChestInfo
  {
    public int ChestId;
    public double X;
    public double Y;
    public int Radius;
    public MoonGradeType Grade;
    public ChestState State;
    public List<Guid> Players;
  }
  public class MoonChestSlot
  {
    public MoonItem Item;
    public MoonPlayer Player;
  }
  public class MoonChest : MoonObject, IMoonTarget
  {
    public int ChestId;
    public MoonGradeType Grade;
    public List<MoonChestSlot> Items;
    public double X;
    public double Y;
    public int Radius;
    protected ChestState State;
    protected double TimeLeft;
    private static int ChestIdCounter = 1;
    private static object LockChestObject = new object();
    double IMoonTarget.X => X;
    double IMoonTarget.Y => Y;
    public bool IsAlive => !deleted && State != ChestState.Destroy;
    public int ObjectId => ChestId;
    public MoonObjectType ObjectType => MoonObjectType.Chest;
    public MoonChest(double X, double Y, List<MoonItem> Items) : base()
    {
      this.X = X;
      this.Y = Y;
      this.Radius = 32;
      this.Items = Items.Select(i => new MoonChestSlot { Item = i, Player = null }).ToList();
      Grade = MoonGradeType.Common;
      State = ChestState.Await;
      TimeLeft = 0;
      lock (LockChestObject)
        ChestId = ++ChestIdCounter;
    }
    public override void Dispatcher()
    {
      TimeLeft += MoonApplication.Server.DeltaTime;
      switch (State)
      {
        case ChestState.Await:
          if (TimeLeft >= 1.0)
          {
            State = ChestState.Appearance;
            TimeLeft = 0;
            Push2Map();
          }
          break;
        case ChestState.Appearance:
          if (TimeLeft >= 1.0)
          {
            State = ChestState.Restricted;
            TimeLeft = 0;
            Push2Map();
          }
          break;
        case ChestState.Restricted:
          if (TimeLeft >= 30.0)
          {
            State = ChestState.Available;
            TimeLeft = 0;
            Push2Map();
          }
          break;
        case ChestState.Available:
          if (TimeLeft >= 60.0)
            Disappearance();
          break;
        case ChestState.Disappearance:
          if (TimeLeft >= 3.0)
          {
            deleted = true;
            State = ChestState.Destroy;
            Push2Map();
          }
          break;
      }
    }
    public void Done()
    {
      State = ChestState.Disappearance;
      TimeLeft = 0;
    }
    // Появление сундука в зависимости от кучи условий
    public static void Appearance(MoonMob Mob)
    {
      // Тут надо сделать выпадение пвп наград из игроков
      MoonDrop drop = MoonDrop.GetItemListByCode(Mob.ItemCode);
      if (drop == null) return;
      List<MoonItem> items = drop.Items
        .Where(i => i.Chance > MoonApplication.Random.NextDouble())
        .Select(i =>
        {
          MoonItem item = i.Item.ShallowCopy();
          item.Quantity = (int)((i.MaxQuantity - i.MinQuantity) * MoonApplication.Random.NextDouble()) + i.MinQuantity;
          return item;
        })
        .ToList();
      if (items.Count == 0) return;
      List<MoonPlayer> players = Mob.Influence.GetMostDamagePlayers();
      if (players.Count == 0) return;
      MoonChest chest = new MoonChest(Mob.PointMob.X, Mob.PointMob.Y, items);
      chest.Items.ForEach(i => i.Player = players[MoonApplication.Random.Next(players.Count)]);
      chest.Push2Map();
    }
    public static List<MoonChest> ChestList
    {
      get
      {
        return MoonApplication.Server.MoonObjects.Items
          .Where(i => !i.deleted && i is MoonChest)
          .Select(i => (MoonChest)i)
          .ToList();
      }
    }

    public static MoonChest FindChest(int ChestId)
    {
      return ChestList.FirstOrDefault(c => c.ChestId == ChestId);
    }
    public ChestInfo GetChestInfo()
    {
      return new ChestInfo
      {
        ChestId = ChestId,
        X = X,
        Y = Y,
        Radius = Radius,
        Grade = Grade,
        State = State,
        Players = Items.Select(i => i.Player.ClientId).ToList()
      };
    }
    public void Push2Map()
    {
      MoonApplication.Server.PushChest2Client(this);
    }
    public void Push2Map(MoonPlayer Player)
    {
      MoonApplication.Server.PushChest2Client(Player, this);
    }
    public void ResetFromPlayerTarget()
    {
      MoonApplication.Server.MoonPlayers
        .Where(p => p.Target == this)
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
    public void Disappearance()
    {
      State = ChestState.Disappearance;
      TimeLeft = 0;
      Push2Map();
      ResetFromPlayerTarget();
    }
    public void ShiftItems(MoonPlayer player)
    {
      List<MoonChestSlot> Slots;
      if (!Items.Any(i=>i.Player == player))
      {
        // Переложить все вещи игроку
        Slots = ShiftItems(player, Items);
        Items = Items.Where(i => !Slots.Contains(i)).ToList();
        if (Items.Count == 0)
          Disappearance();
        player.PushToMap();
        return;
      }
      // Переложить свои вещи игроку
      Slots = ShiftItems(player, Items.Where(i => i.Player == player).ToList());
      Items = Items.Where(i => !Slots.Contains(i)).ToList();
      if(Items.Count == 0)
        Disappearance();
      player.PushToMap();
    }
    private List<MoonChestSlot> ShiftItems(MoonPlayer player, List<MoonChestSlot> Slots)
    {
      List<MoonChestSlot> newSlots = new List<MoonChestSlot>();
      Slots.ForEach(i => {
        // ...
        if (true)
        {
          MoonApplication.Server.DoTextChat(player, new List<ChatType> { ChatType.TabAll }, null, "#67C8E2", $@"вы подобрали предмет - {i.Item.Name}");
          newSlots.Add(i);
        }
      });
      return newSlots;
    }

  }
}
