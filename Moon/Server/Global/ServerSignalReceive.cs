using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;

namespace Moon
{
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

  public partial class MoonServer
  {
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
    /// <summary>
    /// Получение сообщение чата от игрока
    /// </summary>
    /// <param name="clientId"></param>
    /// <param name="chatType"></param>
    /// <param name="message"></param>
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
    /// <summary>
    /// Запрос принятия в группу
    /// </summary>
    /// <param name="clientId"></param>
    /// <param name="memberId"></param>
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
    /// <summary>
    /// Реакция на запрос принятия в группу
    /// </summary>
    /// <param name="clientId"></param>
    /// <param name="memberId"></param>
    /// <param name="Button"></param>
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
    /// <summary>
    /// Выход из группы
    /// </summary>
    /// <param name="clientId"></param>
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
    /// <summary>
    /// Удаление игрока из группы
    /// </summary>
    /// <param name="clientId"></param>
    /// <param name="memberId"></param>
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
    /// <summary>
    /// Смена лидера группы
    /// </summary>
    /// <param name="clientId"></param>
    /// <param name="memberId"></param>
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

  }

}
