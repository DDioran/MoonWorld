using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.SignalR;
using Moon.System.Authorization;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace Moon
{
  public class MoonHub : Hub
  {
    private readonly IHttpContextAccessor _contextAccessor;
    private readonly IHostingEnvironment _enviroment;
    private ISignInManager _signInManager;
    public MoonHub(IHttpContextAccessor contextAccessor, 
      IHostingEnvironment enviroment,
      ISignInManager signInManager)
    {
      _enviroment = enviroment;
      _contextAccessor = contextAccessor;
      _signInManager = signInManager;
    }
    public async void Method_InsertMoonCharacter(int id, MoonChar moonChar)
    {
      MoonApplication.Hub = Clients;
      MoonCharGuidResult result = await MoonApplication.Server.Db.InsertMoonCharacter(moonChar);
      await MoonApplication.Hub.Caller.SendAsync("Method_Response", id, result);
    }
    public async void Method_GetMoonCharacterList(int id, Guid UserGuid)
    {
      MoonApplication.Hub = Clients;
      MoonCharListResult result = await MoonApplication.Server.Db.GetMoonCharacterList(UserGuid);
      await MoonApplication.Hub.Caller.SendAsync("Method_Response", id, result);
    }
    public async void Method_JsonPackResource(int id, JsXResInput Json)
    {
      MoonApplication.Hub = Clients;
      JsonResourceResult result = await MoonApplication.Server.Db.GetJsonPackResourceByName(_enviroment, Json);
      await MoonApplication.Hub.Caller.SendAsync("Method_Response", id, result);
    }
    public void RegisterClient(Guid clientId, Guid characterId)
    {
      MoonApplication.Hub = Clients;
      string connectionId = Context.ConnectionId;
      MoonApplication.Command.Execute(() =>
      {
        MoonApplication.Server.RegisterClient(clientId, characterId, connectionId);
        MoonPlayer player = MoonApplication.Server.MoonPlayers.FirstOrDefault(p => p.ClientId == characterId);
        player.Initialize();
        MoonApplication.Hub.Client(connectionId).SendAsync("PlayerRegistered", player.CreatePlayerInfo(new PlayerInfo()));
      });
    }
    public void DownloadAllObjects(Guid clientId)
    {
      MoonApplication.Command.Execute(() => MoonApplication.Server.DownloadAllObjects(clientId));
    }
    public void PlayerMoveTo(Guid clientId, double x, double y, int button)
    {
      MoonApplication.Command.Execute(() => MoonApplication.Server.PlayerMoveTo(clientId, x, y, button));
    }
    public void PlayerSelectTo(Guid clientId, MoonObjectType objectType, int objectId, int button)
    {
      MoonApplication.Command.Execute(() => MoonApplication.Server.PlayerSelectTo(clientId, objectType, objectId, button));
    }
    public void KeyOperation(Guid clientId, int keyCode, bool downKey)
    {
      MoonApplication.Command.Execute(() => MoonApplication.Server.KeyOperation(clientId, keyCode, downKey));
    }
    public void MessageChat(Guid clientId, ChatType chatType, string message)
    {
      MoonApplication.Command.Execute(() => MoonApplication.Server.MessageChat(clientId, chatType, message));
    }
    public void InviteGroup(Guid clientId, Guid memberId)
    {
      MoonApplication.Command.Execute(() => MoonApplication.Server.InviteGroup(clientId, memberId));
    }
    public void InviteGroupResponse(Guid clientId, Guid memberId, MessageBoxButton Button)
    {
      MoonApplication.Command.Execute(() => MoonApplication.Server.InviteGroupResponse(clientId, memberId, Button));
    }
    public void LeaveGroup(Guid clientId)
    {
      MoonApplication.Command.Execute(() => MoonApplication.Server.LeaveGroup(clientId));
    }
    public void RemoveFromGroup(Guid clientId, Guid memberId)
    {
      MoonApplication.Command.Execute(() => MoonApplication.Server.RemoveFromGroup(clientId, memberId));
    }
    public void SetLeaderGroup(Guid clientId, Guid memberId)
    {
      MoonApplication.Command.Execute(() => MoonApplication.Server.SetLeaderGroup(clientId, memberId));
    }

  }
}
