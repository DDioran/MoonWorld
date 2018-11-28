using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;

namespace Moon
{
  public class MoonApplication
  {
    public static MoonServer Server;
    public static MoonCommandList Command;
    public static Random Random;
    public static IHubCallerClients Hub;
    public MoonApplication()
    {
      Random = new Random((int)DateTime.Now.Ticks);
      Server = new MoonServer();
      Command = new MoonCommandList();
      Server.Initialize();
    }
  }

  public enum MoonCommandType
  {
    RegisterClient,
    DownloadAllObjects,
    MoveTo,
    SelectTo,
    KeyOperation,
    MessageChat,
    InviteGroup,
    InviteGroupResponse,
    LeaveGroup,
    RemoveFromGroup,
    SetLeaderGroup
  }
  public class MoonCommandList
  {
    private readonly object itemLock = new object();
    public List<MoonCommand> Items;
    public MoonCommandList()
    {
      Items = new List<MoonCommand>();
    }
    private void Add(MoonCommand command)
    {
      lock (itemLock)
      {
        Items.Add(command);
      }
    }
    public void Add_RegisterClient(Guid clientId, Guid characterId, string connectionId)
    {
      Add(new MoonCommand()
      {
        CommandType = MoonCommandType.RegisterClient,
        ClientId = clientId,
        CharacterId = characterId,
        ConnectionId = connectionId
      });
    }
    public void Add_DownloadAllObjects(Guid clientId)
    {
      Add(new MoonCommand()
      {
        CommandType = MoonCommandType.DownloadAllObjects,
        ClientId = clientId
      });
    }
    public void Add_PlayerMoveTo(Guid clientId, double x, double y, int button)
    {
      Add(new MoonCommand()
      {
        CommandType = MoonCommandType.MoveTo,
        ClientId = clientId,
        X = x,
        Y = y,
        Button = button
      });
    }
    public void Add_PlayerSelectTo(Guid clientId, MoonObjectType objectType, int objectId, int button)
    {
      Add(new MoonCommand()
      {
        CommandType = MoonCommandType.SelectTo,
        ClientId = clientId,
        ObjectType = objectType,
        ObjectId = objectId,
        Button = button
      });
    }
    public void Add_KeyOperation(Guid clientId, int keyCode, bool downKey)
    {
      Add(new MoonCommand()
      {
        CommandType = MoonCommandType.KeyOperation,
        ClientId = clientId,
        KeyCode = keyCode,
        DownKey = downKey
      });
    }
    public void Add_MessageChat(Guid clientId, ChatType chatType, string message)
    {
      Add(new MoonCommand()
      {
        CommandType = MoonCommandType.MessageChat,
        ClientId = clientId,
        ChatType = chatType,
        Message = message
      });
    }
    public void Add_InviteGroup(Guid clientId, Guid MemberId)
    {
      Add(new MoonCommand()
      {
        CommandType = MoonCommandType.InviteGroup,
        ClientId = clientId,
        MemberId = MemberId
      });
    }
    public void Add_InviteGroupResponse(Guid clientId, Guid MemberId, MessageBoxButton Button)
    {
      Add(new MoonCommand()
      {
        CommandType = MoonCommandType.InviteGroupResponse,
        ClientId = clientId,
        MemberId = MemberId,
        MsgButton = Button
      });
    }
    public void Add_LeaveGroup(Guid clientId)
    {
      Add(new MoonCommand()
      {
        CommandType = MoonCommandType.LeaveGroup,
        ClientId = clientId
      });
    }
    public void Add_RemoveFromGroup(Guid clientId, Guid MemberId)
    {
      Add(new MoonCommand()
      {
        CommandType = MoonCommandType.RemoveFromGroup,
        ClientId = clientId,
        MemberId = MemberId
      });
    }
    public void Add_SetLeaderGroup(Guid clientId, Guid MemberId)
    {
      Add(new MoonCommand()
      {
        CommandType = MoonCommandType.SetLeaderGroup,
        ClientId = clientId,
        MemberId = MemberId
      });
    }
    public List<MoonCommand> Receive()
    {
      lock (itemLock)
      {
        List<MoonCommand> returnValue = Items.ToList();
        Items.Clear();
        return returnValue;
      }
    }
  }
  public class MoonCommand
  {
    public MoonCommandType CommandType;
    public MessageBoxButton MsgButton;
    public ChatType ChatType;
    public string ConnectionId;
    public string Message;
    public Guid CharacterId;
    public Guid ClientId;
    public Guid MemberId;
    public MoonObjectType ObjectType;
    public int ObjectId;
    public double X;
    public double Y;
    public int KeyCode;
    public bool DownKey;
    public int Button;
  }

  public class MoonServer
  {
    public List<MoonMap> MoonMaps;
    public List<MoonPlayer> MoonPlayers;
    public MoonObjectList MoonObjects;
    public List<ClientInfo> TriggerList;
    public Dictionary<int, MoonItem> MoonItemList;
    public Dictionary<int, MoonDrop> MoonDropList;
    public MoonDataBase Db;
    private Timer loopTimer;
    private DateTime lastTime;
    private double deltaTime;
    private double saveTime;
    private bool process = false;
    private object TriggerListLock = new object();
    public double DeltaTime
    {
      get
      {
        return deltaTime;
      }
    }
    public MoonServer()
    {
      MoonMaps = new List<MoonMap>();
      MoonPlayers = new List<MoonPlayer>();
      MoonObjects = new MoonObjectList();
      MoonItemList = new Dictionary<int, MoonItem>();
      MoonDropList = new Dictionary<int, MoonDrop>();
      Db = new MoonDataBase();
    }

    public void Initialize()
    {
      MoonItem.LoadDbItems();
      MoonDrop.LoadDbItems();
      MoonMap map = new MoonMap(1, "Долина");
      MoonMaps.Add(map);

      InitializeTimer();
    }

    public void InitializeTimer()
    {
      saveTime = 0;
      lastTime = DateTime.Now;
      loopTimer = new Timer(func => { Loop(); }, null, 0, 16);
    }

    private void Loop()
    {
      if (process) return;
      process = true;
      DispatchCommand();
      DateTime now = DateTime.Now;
      deltaTime = (now - lastTime).TotalMilliseconds / 1000.0;
      lastTime = now;
      MoonMaps.ForEach(m => m.Dispatch());
      MoonPlayers.ForEach(m => m.Dispatch());
      MoonObjects.Dispatcher();
      saveTime += deltaTime;
      if (saveTime > 10)
      {
        SaveCharacters();
        saveTime = 0;
      }
      DisconnectCharacters();
      process = false;
    }
    public void DispatchCommand()
    {
      List<MoonCommand> items = MoonApplication.Command.Receive();
      items.ForEach(i =>
      {
        switch (i.CommandType)
        {
          case MoonCommandType.RegisterClient:
            RegisterClient(i.ClientId, i.CharacterId, i.ConnectionId);
            MoonPlayer player = MoonPlayers.FirstOrDefault(p => p.ClientId == i.CharacterId);
            player.Initialize();
            MoonApplication.Hub.Client(i.ConnectionId).SendAsync("PlayerRegistered", player.CreatePlayerInfo(new PlayerInfo()));
            break;
          case MoonCommandType.DownloadAllObjects:
            DownloadAllObjects(i.ClientId);
            break;
          case MoonCommandType.MoveTo:
            PlayerMoveTo(i.ClientId, i.X, i.Y, i.Button);
            break;
          case MoonCommandType.SelectTo:
            PlayerSelectTo(i.ClientId, i.ObjectType, i.ObjectId, i.Button);
            break;
          case MoonCommandType.KeyOperation:
            KeyOperation(i.ClientId, i.KeyCode, i.DownKey);
            break;
          case MoonCommandType.MessageChat:
            MessageChat(i.ClientId, i.ChatType, i.Message);
            break;
          case MoonCommandType.InviteGroup:
            InviteGroup(i.ClientId, i.MemberId);
            break;
          case MoonCommandType.InviteGroupResponse:
            InviteGroupResponse(i.ClientId, i.MemberId, i.MsgButton);
            break;
          case MoonCommandType.LeaveGroup:
            LeaveGroup(i.ClientId);
            break;
          case MoonCommandType.RemoveFromGroup:
            RemoveFromGroup(i.ClientId, i.MemberId);
            break;
          case MoonCommandType.SetLeaderGroup:
            SetLeaderGroup(i.ClientId, i.MemberId);
            break;
        }
      });
    }
    // Регистрация нового клиента
    public void RegisterClient(Guid UserId, Guid ClientId, string ConnectionId)
    {
      List<MoonPlayer> delPlayers = MoonPlayers.Where(p => p.UserId == UserId).ToList();
      //MoonPlayers = MoonPlayers.Where(p => p.UserId != UserId).ToList();
      DisconnectCharacters(delPlayers);
      MoonPlayer Player = MoonPlayers.FirstOrDefault(p => p.ClientId == ClientId);
      if (Player == null)
      {
        MoonMap map = MoonApplication.Server.MoonMaps.First(m => m.MapId == 1);
        new MoonPlayer(map, UserId, ClientId, ConnectionId);
      }
      else
      {
        Player.Active = true;
        Player.Target = null;
        Player.ConnectionId = ConnectionId;
      }
    }
    protected ClientInfo GetClientInfo(IMoonOpponent Target)
    {
      ClientInfo info = null;
      if (Target is MoonMob)
        info = (Target as MoonMob).CreateMobInfo(new ClientInfo());
      if (Target is MoonPlayer)
        info = (Target as MoonPlayer).CreatePlayerInfo(new PlayerInfo());
      if (Target is MoonNpc)
        info = (Target as MoonNpc).CreateNpcInfo(new NpcInfo());
      return info;
    }
    // Отправка информации об объекте типа Opponents игроку
    public void PushToClient(MoonPlayer Player, IMoonOpponent Target)
    {
      if (Player == null || Target == null) return;
      ClientInfo info = GetClientInfo(Target);
      MoonApplication.Hub.Client(Player.ConnectionId).SendAsync("DoClienfInfo", info);
    }
    // Отправка информации об объекте типа Opponents всем игрокам
    public void PushToClient(IMoonOpponent Target)
    {
      ClientInfo info = GetClientInfo(Target);
      MoonApplication.Hub.All.SendAsync("DoClienfInfo", info);
    }
    // Отсылка информации об объекте всем активным пользователям 
    public void PushToMap(int MapId, IMoonOpponent Target)
    {
      MoonPlayers.Where(p => p.Active && p.State != MoonMobState.Await && p.Map.MapId == MapId)
        .ToList()
        .ForEach(p => PushToClient(p, Target));
    }
    // Логгируем информацию
    public void DoLog(MoonPlayer CallerPlayer, string Text)
    {
      MoonApplication.Hub.Client(CallerPlayer.ConnectionId).SendAsync("DoLog", Text);
    }
    public void DoLog(string Text)
    {
      if (MoonApplication.Hub != null)
        MoonApplication.Hub.All.SendAsync("DoLog", Text);
    }
    // Отсылаем информацию об эффекте, необходимому клиенту
    public void DoPointEffect(MoonPlayer CallerPlayer, string SpriteName, double Speed, double X, double Y)
    {
      MoonApplication.Hub.Client(CallerPlayer.ConnectionId).SendAsync("DoPointEffect", SpriteName, Speed, X, Y);
    }
    // Отсылаем информацию об эффекте, всем клиентам
    public void DoPointEffectAll(string SpriteName, double Speed, double X, double Y)
    {
      MoonApplication.Hub.All.SendAsync("DoPointEffect", SpriteName, Speed, X, Y);
    }
    public void DoHitEffectAll(double X, double Y, double hit, int crit, int mobid)
    {
      MoonApplication.Hub.All.SendAsync("DoHitEffect", X, Y, hit, crit, mobid);
    }

    // Отсылаем информацию об двумерном эффекте, всем клиентам
    public void DoLineEffectAll(string SpriteName, double Speed, double X1, double Y1, double X2, double Y2)
    {
      MoonApplication.Hub.All.SendAsync("DoLineEffect", SpriteName, Speed, X1, Y1, X2, Y2);
    }
    public void DoDashEffectAll(int MobId, double X2, double Y2)
    {
      MoonApplication.Hub.All.SendAsync("DoDashEffect", MobId, X2, Y2);
    }

    // Отсылаем сообщение, необходимому клиенту
    public void DoTextChat(MoonPlayer Player, List<ChatType> ChatTypes, int? Id, string Color, string Message)
    {
      MoonApplication.Hub.Client(Player.ConnectionId).SendAsync("DoTextChat", ChatTypes, Id, Color, Message);
    }
    public void DoTextChat(List<MoonPlayer> Players, List<ChatType> ChatTypes, int? Id, string Color, string Message)
    {
      if (Players != null)
        Players.ForEach(p => MoonApplication.Hub.Client(p.ConnectionId).SendAsync("DoTextChat", ChatTypes, Id, Color, Message));
    }
    public void DoTextChat(MoonParty Party, List<ChatType> ChatTypes, int? Id, string Color, string Message)
    {
      if (Party != null)
        Party.Items.ForEach(i => MoonApplication.Hub.Client(MoonPlayer.FindPlayer(i).ConnectionId).SendAsync("DoTextChat", ChatTypes, Id, Color, Message));
    }
    // Отсылаем сообщение всем клиентам
    public void DoTextChatAll(List<ChatType> ChatTypes, int? Id, string Color, string Message)
    {
      MoonApplication.Hub.All.SendAsync("DoTextChat", ChatTypes, Id, Color, Message);
    }
    // Приглашение пользователя в группу
    public void DoInviteGroup(MoonPlayer CallerPlayer, Guid PlayerId)
    {
      MoonApplication.Hub.Client(CallerPlayer.ConnectionId).SendAsync("DoInviteGroup", PlayerId);
    }
    // Отсылка информации о сундуке всем клиентам
    public void PushChest2Client(MoonChest Chest)
    {
      MoonApplication.Hub.All.SendAsync("DoChestInfo", Chest.GetChestInfo());
    }
    // Отсылка информации о сундуке текущему клиенту
    public void PushChest2Client(MoonPlayer CallerPlayer, MoonChest Chest)
    {
      MoonApplication.Hub.Client(CallerPlayer.ConnectionId).SendAsync("DoChestInfo", Chest.GetChestInfo());
    }




    public void DoChatDamage(MoonMob Mob, MoonMob Target, double power, int crit)
    {
      if (crit == -1)
      {
        if (Mob is MoonPlayer)
          DoTextChat(Mob as MoonPlayer, new List<ChatType>() { ChatType.TabAll, ChatType.TabFight }, null, "#FFFF40", $@"вы промахнулись по противнику {Target.Name}");
        if (Target is MoonPlayer)
          DoTextChat(Target as MoonPlayer, new List<ChatType>() { ChatType.TabAll, ChatType.TabFight }, null, "#FFA040", $@"{Mob.Name} промахнулся по вам");
      }
      else {
        if (Mob is MoonPlayer)
          DoTextChat(Mob as MoonPlayer, new List<ChatType>() { ChatType.TabAll, ChatType.TabFight }, null, "#FFFF40", $@"{(crit == 1?"Крит! ":"")}вы нанесли {(int)power} единиц урона противнику {Target.Name}");
        if (Target is MoonPlayer)
          DoTextChat(Target as MoonPlayer, new List<ChatType>() { ChatType.TabAll, ChatType.TabFight }, null, "#FFA040", $@"{(crit == 1 ? "Крит! " : "")}{Mob.Name} нанёс вам {(int)power} единиц урона");
      }
    }

    public void DoChatHeal(MoonMob Mob, MoonMob Target, double power)
    {
      if (Mob is MoonPlayer && !MoonParty.IsSameParty(Mob, Target))
      {
        DoTextChat(Mob as MoonPlayer, new List<ChatType>() { ChatType.TabAll, ChatType.TabFight }, null, "#40FF40", $@"вы восстановили себе {(int)power} единиц здоровья");
        return;
      }
      if (Mob is MoonPlayer)
        DoTextChat(Mob as MoonPlayer, new List<ChatType>() { ChatType.TabAll, ChatType.TabFight }, null, "#40FF40", $@"вы восстановили {(int)power} единиц здоровья цели {Target.Name}");
      if (Target is MoonPlayer)
        DoTextChat(Target as MoonPlayer, new List<ChatType>() { ChatType.TabAll, ChatType.TabFight }, null, "#40FF40", $@"{Mob.Name} восстановил вам {(int)power} единиц здоровья");
    }
    public void DoChatDeath(MoonMob Mob, MoonMob Target)
    {
      if (Mob is MoonPlayer && Target == null)
      {
        DoTextChat(Mob as MoonPlayer, new List<ChatType>() { ChatType.TabAll, ChatType.TabFight }, null, "#FF3030", $@"вы погибли</span>");
        return;
      }
      if (Mob is MoonPlayer && Mob.State == MoonMobState.Alive)
        DoTextChat(Mob as MoonPlayer, new List<ChatType>() { ChatType.TabAll, ChatType.TabFight }, null, "#FF3030", $@"вы убиваете противника {Target.Name}");
      if (Target is MoonPlayer && Mob.State == MoonMobState.Alive)
        DoTextChat(Target as MoonPlayer, new List<ChatType>() { ChatType.TabAll, ChatType.TabFight }, null, "#FF3030", $@"{Mob.Name} убивает вас");
    }

    // Получение всех объектов для игрока
    public void DownloadAllObjects(Guid ClientId)
    {
      MoonPlayer player = MoonPlayers.FirstOrDefault(p => p.ClientId == ClientId);
      player.ResetTimeout();
      List<MoonMob> listInfo = player.Map.MobGroupList.SelectMany(g => g.MobList).ToList();
      listInfo.AddRange(MoonPlayers.Where(p =>p.Map.MapId == player.Map.MapId && p.State != MoonMobState.Await));
      listInfo.AddRange(player.Map.NpcList.Where(p => p.Map.MapId == player.Map.MapId));
      listInfo.ForEach(i => PushToClient(player, i));
    }
    // Игрок ткнул в местность
    public void PlayerMoveTo(Guid ClientId, double x, double y, int Button)
    {
      MoonPlayer player = MoonPlayers.FirstOrDefault(p => p.ClientId == ClientId);
      player.ResetTimeout();
      if (player.State == MoonMobState.Dead)
      {
        if (player.AwaitTime >= 2.0)
        {
          player.Target = null;
          player.ResetFromPlayerTarget(player);
          player.Initialize();
          player.PushToMap();
        }
        return;
      }
      player.CurrentSkillType = MoonSkillType.None;
      player.CurrentSkillIndex = -1;
      player.QueueCode = -1;
      player.QueueTarget = null;
      player.QueueCoords = null;
      if (Button == 2)
        player.Target = null;
      // Если бежать можно - вперед
      if (player.PlayerMoveTo(x, y))
        MoonApplication.Server.DoPointEffect(player, "moon-click", 1, x, y);
    }
    // Игрок ткнул в моба или другого игрока
    public void PlayerSelectTo(Guid ClientId, MoonObjectType ObjectType, int ObjectId, int Button)
    {
      MoonPlayer player = MoonPlayers.FirstOrDefault(p => p.ClientId == ClientId);
      player.ResetTimeout();
      if (player.State == MoonMobState.Dead)
      {
        if (player.AwaitTime >= 2.0)
        {
          player.Target = null;
          player.ResetFromPlayerTarget(player);
          player.Initialize();
          player.PushToMap();
        }
        return;
      }
      player.QueueCoords = null;
      if (ObjectType == MoonObjectType.Mob)
      {
        MoonPlayer playerTarget = MoonPlayers.FirstOrDefault(p => p.MobId == ObjectId);
        if (playerTarget != null)
        {
          // Выбран игрок
          player.Target = playerTarget;
          if (Button == 0)
          {
            if (player.PInstruction == "s" && player.SkillState == SkillState.Run)
            {
              player.QueueCode = -1;
              player.QueueCoords = null;
              player.QueueTarget = playerTarget;
              return;
            }
            player.CurrentSkillType = player.Skills.GetAASkill().SkillType;
            player.CurrentSkillIndex = player.Skills.GetIndexBySkill(player.CurrentSkillType);
            player.PlayerMoveTo(playerTarget);
          }
          else
            PushToClient(player, player); // Обновляем информация об игроке
          PushToClient(player, playerTarget); // Обновляем информация игорку об игроке
        }
        else
        {
          MoonMob mobTarget = player.Map.FindMob(ObjectId);
          MoonMob npcTarget = player.Map.FindNpc(ObjectId);
          if (mobTarget != null)
          {
            // Выбран моб
            player.Target = mobTarget;
            if (Button == 0)
            {
              if (player.PInstruction == "s" && player.SkillState == SkillState.Run)
              {
                player.QueueCode = -1;
                player.QueueCoords = null;
                player.QueueTarget = mobTarget;
                return;
              }
              player.CurrentSkillType = player.Skills.GetAASkill().SkillType;
              player.CurrentSkillIndex = player.Skills.GetIndexBySkill(player.CurrentSkillType);
              player.PlayerMoveTo(mobTarget);
            }
            else
              PushToClient(player, player); // Обновляем информация об игроке
            PushToClient(player, mobTarget); // Обновляем информация игроку о мобе
          }
          if (npcTarget != null)
          {
            // Выбран нпс, на данном этапе их атаковать нельзя
            player.Target = npcTarget;
            if (Button == 0)
            {
              if (player.PInstruction == "s" && player.SkillState == SkillState.Run)
              {
                player.QueueCode = -1;
                player.QueueCoords = null;
                player.QueueTarget = npcTarget;
                return;
              }
              player.CurrentSkillType = MoonSkillType.None;
              player.CurrentSkillIndex = -1;
              player.PlayerMoveTo(npcTarget);
            }
            else
              PushToClient(player, player); // Обновляем информация об игроке
            PushToClient(player, npcTarget); // Обновляем информация игроку о мобе
          }
        }
      }
      if(ObjectType == MoonObjectType.Chest)
      {
        MoonChest chestTarget = MoonChest.FindChest(ObjectId);
        if(chestTarget != null)
        {
          // Выбран сундук
          player.Target = chestTarget;
          if (Button == 0)
          {
            if (player.PInstruction == "s" && player.SkillState == SkillState.Run)
            {
              player.QueueCode = -1;
              player.QueueCoords = null;
              player.QueueTarget = chestTarget;
              return;
            }
            player.CurrentSkillType = MoonSkillType.None;
            player.CurrentSkillIndex = -1;
            player.PlayerMoveTo(chestTarget);
          }
          else
            PushToClient(player, player); // Обновляем информация об игроке
          PushChest2Client(player, chestTarget); // Обновляем информация игроку о сундук
        }
      }
    }
    public void KeyOperation(Guid clientId, int keyCode, bool downKey)
    {
      MoonPlayer player = MoonPlayers.FirstOrDefault(p => p.ClientId == clientId);
      player.ResetTimeout();
      if (player.State != MoonMobState.Alive) return; 
      if (downKey)
      {
        int idx = player.Skills.GetIndexSkillByKeyCode(keyCode);
        if (idx >= 0)
          player.InitiateSkill(idx);
      }
    }
    public void MessageChat(Guid clientId, ChatType chatType, string message)
    {
      MoonPlayer player = MoonPlayers.FirstOrDefault(p => p.ClientId == clientId);
      player.ResetTimeout();
      var color = "#FFFF40";
      if (chatType == ChatType.TabGroup) color = "#40FF80";
      DoTextChatAll(new List<ChatType>() { ChatType.TabAll, ChatType.TabCommon }, player.MobId, color, message);
      if (chatType == ChatType.TabGroup)
        if (player.Party != null)
          DoTextChat(player.Party, new List<ChatType>() { ChatType.TabGroup }, player.MobId, color, message);
        else
          DoTextChat(player, new List<ChatType>() { ChatType.TabGroup }, player.MobId, color, message);
    }

    public void InviteGroup(Guid clientId, Guid memberId)
    {
      MoonPlayer player = MoonPlayers.FirstOrDefault(p => p.ClientId == clientId);
      player.ResetTimeout();
      if (clientId == memberId)
      {
        DoTextChat(player, new List<ChatType>() { ChatType.TabAll }, null, "#FFA0A0", "Невозможно добавить в группу самого себя");
        return;
      }
      MoonPlayer member = MoonPlayers.FirstOrDefault(p => p.ClientId == memberId);
      if (member == null)
      {
        DoTextChat(player, new List<ChatType>() { ChatType.TabAll }, null, "#FFA0A0", "Пользователь не найден");
        return;
      }
      if (member.Party != null)
      {
        DoTextChat(player, new List<ChatType>() { ChatType.TabAll }, null, "#FFA0A0", "Пользователь уже находится в другой группе");
        return;
      }
      DoInviteGroup(member, player.ClientId);
    }
    public void InviteGroupResponse(Guid clientId, Guid memberId, MessageBoxButton Button)
    {
      MoonPlayer player = MoonPlayers.FirstOrDefault(p => p.ClientId == clientId);
      player.ResetTimeout();
      MoonPlayer member = MoonPlayers.FirstOrDefault(p => p.ClientId == memberId);
      if (member == null)
        return;
      if (Button == MessageBoxButton.mbCancel)
      {
        DoTextChat(member, new List<ChatType>() { ChatType.TabAll }, null, "#FFA0A0", "Пользователь отклонил предложение");
        return;
      }
      if (Button == MessageBoxButton.mbOk)
      {
        if (member.Party != null && member.Party.Items.Count >= MoonParty.MaxMembers)
        {
          DoTextChat(new List<MoonPlayer> { player, member }, new List<ChatType>() { ChatType.TabAll }, null, "#FFA0A0", "Превышено количество пользователей в группе");
          return;
        }
        DoTextChat(member, new List<ChatType>() { ChatType.TabAll }, null, "#A0FFA0", "Пользователь принял предложение");
        if (member.Party == null)
          new MoonParty(member, player);
        else
          member.Party.AddMember(player);
        member.Party.PushToMap();
        return;
      }
    }
    public void LeaveGroup(Guid clientId)
    {
      MoonPlayer player = MoonPlayers.FirstOrDefault(p => p.ClientId == clientId);
      player.ResetTimeout();
      if (player.Party == null) return;
      List<Guid> pls = player.Party.Items.ToList();
      player.Party.RemoveMember(player);
      pls.ForEach(p => MoonPlayer.FindPlayer(p).PushToMap());
      DoTextChat(player, new List<ChatType>() { ChatType.TabAll }, null, "#FFFFA0", "Вы покинули группу");
    }
    public void RemoveFromGroup(Guid clientId, Guid memberId)
    {
      MoonPlayer player = MoonPlayers.FirstOrDefault(p => p.ClientId == clientId);
      player.ResetTimeout();
      if (clientId == memberId) return;
      if (player.Party == null) return;
      List<Guid> pls = player.Party.Items.ToList();
      MoonPlayer member = MoonPlayer.FindPlayer(memberId);
      if (player.Party.RemoveMember(member))
      {
        pls.ForEach(p => MoonPlayer.FindPlayer(p).PushToMap());
        DoTextChat(member, new List<ChatType>() { ChatType.TabAll }, null, "#FFA0A0", "Вы исключены из группы");
        DoTextChat(player, new List<ChatType>() { ChatType.TabAll }, null, "#FFA0A0", "Вы исключили из группы игрока " + member.Name);
      }
    }
    public void SetLeaderGroup(Guid clientId, Guid memberId)
    {
      MoonPlayer player = MoonPlayers.FirstOrDefault(p => p.ClientId == clientId);
      player.ResetTimeout();
      MoonPlayer member = MoonPlayer.FindPlayer(memberId);
      if (player.Party == null || player.Party.LeaderId != player.ClientId || player.Party != member.Party) return;
      player.Party.SetLeader(member);
      member.Party.PushToMap();
      DoTextChat(member, new List<ChatType>() { ChatType.TabAll }, null, "#A0FFA0", "Вы стали новым лидером группы");
    }

    public void SaveCharacters()
    {
      Db.SaveAllCharacters(); // Асинхронный вызов сохранений
    }
    public void DisconnectCharacters()
    {
      //List<MoonPlayer> delPlayers = MoonPlayers.Where(p => p.Timeout >= 180).ToList();
      //MoonPlayers = MoonPlayers.Where(p => p.Timeout < 180).ToList();
      //DisconnectCharacters(delPlayers);
    }
    public void DisconnectCharacters(List<MoonPlayer> delPlayers)
    {
      delPlayers.ForEach(p =>
      {
        p.Active = false;
        // Здесь необходимо отключить пользователей от игры
      });
    }
  }

}
