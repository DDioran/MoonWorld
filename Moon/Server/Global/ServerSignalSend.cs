using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;

namespace Moon
{
  public partial class MoonServer
  {
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
    /// <summary>
    /// Отсулаем все объекты игроку
    /// </summary>
    /// <param name="ClientId"></param>
    public void DownloadAllObjects(Guid ClientId)
    {
      MoonPlayer player = MoonPlayers.FirstOrDefault(p => p.ClientId == ClientId);
      player.ResetTimeout();
      List<MoonMob> listInfo = player.Map.MobGroupList.SelectMany(g => g.MobList).ToList();
      listInfo.AddRange(MoonPlayers.Where(p =>p.Map.MapId == player.Map.MapId && p.State != MoonMobState.Await));
      listInfo.AddRange(player.Map.NpcList.Where(p => p.Map.MapId == player.Map.MapId));
      listInfo.ForEach(i => PushToClient(player, i));
    }
    /// <summary>
    /// Отсылаем команду об открытии диалога с НПС
    /// </summary>
    public void SendNpcTalk(MoonPlayer Player, MoonNpc Npc)
    {
      MoonApplication.Hub.Client(Player.ConnectionId).SendAsync("SendNpcTalk", Npc.CreateNpcTalkInfo(Player));
    }

  }

}
