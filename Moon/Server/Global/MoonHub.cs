using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.SignalR;
using Moon.System.Authorization;
using System;
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
    public async void Method_LogOn(int id, LogOnData logOnData)
    {
      /*MoonApplication.Hub = Clients;
      UserEditResult result = await MoonApplication.Server.Db.LogOn(_contextAccessor, _signInManager, logOnData);
      await MoonApplication.Hub.Caller.SendAsync("Method_Response", id, result);*/
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
      MoonApplication.Command.Add_RegisterClient(clientId, characterId, Context.ConnectionId);
    }
    public void DownloadAllObjects(Guid clientId)
    {
      MoonApplication.Command.Add_DownloadAllObjects(clientId);
    }
    public void PlayerMoveTo(Guid clientId, double x, double y, int button)
    {
      MoonApplication.Command.Add_PlayerMoveTo(clientId, x, y, button);
    }
    public void PlayerSelectTo(Guid clientId, MoonObjectType objectType, int objectId, int button)
    {
      MoonApplication.Command.Add_PlayerSelectTo(clientId, objectType, objectId, button);
    }
    public void KeyOperation(Guid clientId, int keyCode, bool downKey)
    {
      MoonApplication.Command.Add_KeyOperation(clientId, keyCode, downKey);
    }
    public void MessageChat(Guid clientId, ChatType chatType, string message)
    {
      MoonApplication.Command.Add_MessageChat(clientId, chatType, message);
    }
    public void InviteGroup(Guid clientId, Guid memberId)
    {
      MoonApplication.Command.Add_InviteGroup(clientId, memberId);
    }
    public void InviteGroupResponse(Guid clientId, Guid memberId, MessageBoxButton Button)
    {
      MoonApplication.Command.Add_InviteGroupResponse(clientId, memberId, Button);
    }
    public void LeaveGroup(Guid clientId)
    {
      MoonApplication.Command.Add_LeaveGroup(clientId);
    }
    public void RemoveFromGroup(Guid clientId, Guid memberId)
    {
      MoonApplication.Command.Add_RemoveFromGroup(clientId, memberId);
    }
    public void SetLeaderGroup(Guid clientId, Guid memberId)
    {
      MoonApplication.Command.Add_SetLeaderGroup(clientId, memberId);
    }

  }
}
