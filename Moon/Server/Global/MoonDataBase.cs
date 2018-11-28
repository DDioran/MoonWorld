using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Moon.System.Authorization;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using UTToolzDb;

namespace Moon
{
  public class MoonBaseResponse
  {
    public int ErrorCode { get; set; } = 0;
    public string ErrorMessage { get; set; }
    public bool HasError() { return ErrorCode != 0; }
  }
  public class MoonCharListResult : MoonBaseResponse
  {
    public List<MoonChar> Chars { get; set; } = null;
  }
  public class MoonCharResult : MoonBaseResponse
  {
    public MoonChar Char { get; set; } = null;
  }
  public class MoonCharGuidResult : MoonBaseResponse
  {
    public Guid CharGuid { get; set; }
  }
  public class MoonChar
  {
    public Guid MoonCharacterGuid { get; set; }
    public Guid UserGuid { get; set; }
    public string Name { get; set; }
    public int Class { get; set; }
    public int Level { get; set; }
    public string Data { get; set; }
    public DateTime AccessDate { get; set; }
  }
  public class UserItem
  {
    public Guid UserGuid { get; set; }
    public string Login { get; set; }
    public int Active { get; set; }
    public int Allow { get; set; }
    public string NickName { get; set; }
    public string LastName { get; set; }
    public string FirstName { get; set; }
    public string MiddleName { get; set; }
    public string Email { get; set; }
    public string Phone { get; set; }
    public string Profile { get; set; }
    public DateTime? LastLoginDate { get; set; }
  }
  public class UserEditResult : MoonBaseResponse
  {
    public UserItem User { get; set; }
  }
  public class LogOnData
  {
    public string Login { get; set; }
    public string Password { get; set; }
  }
  public class JsonResourceResult : MoonBaseResponse
  {
    public string Jsresx { get; set; }
    public int Version { get; set; }
  }
  public class JsXResInput
  {
    public string JsonName;
    public int JsonVersion;
  }
  public class JsPack
  {
    public int ver;
  }

  public class MoonDataBase
  {
    private IgsfecClient _client;
    private bool process = false;
    public MoonDataBase()
    {
      _client = new IgsfecClient();
    }
    public async Task<UserEditResult> LogOn(IHttpContextAccessor _contextAccessor, ISignInManager _signInManager, LogOnData logOnData)
    {
      UserEditResult result = new UserEditResult();
      try
      {
        GameUserResponse res = await _client.CheckUserCredentialAsync(logOnData.Login, logOnData.Password);
        if (SetException(result, res)) return result;
        GameUser user = res.User;
        result.User = new UserItem
        {
          UserGuid = user.UserGuid,
          NickName = user.NickName,
          Profile = user.Profile,
          Allow = user.Allow ?? 0
        };
        //await _signInManager.SignInAsync(result.User);
      }
      catch (Exception ex)
      {
        SetException(result, ex);
      }
      return result;
    }
    public async Task<MoonCharListResult> GetMoonCharacterList(Guid UserGuid)
    {
      MoonCharListResult result = new MoonCharListResult();
      try
      {
        MoonCharacterListResponse res = await _client.GetMoonCharacterListAsync(UserGuid);
        if (SetException(result, res)) return result;
        result.Chars = res.CharacterList.Select(c => new MoonChar
        {
          MoonCharacterGuid = c.MoonCharacterGUID,
          UserGuid = c.UserGUID,
          Name = c.Name,
          Class = c.Class,
          Level = c.Level,
          Data = c.Data,
          AccessDate = c.AccessDate
        }).ToList();
      }
      catch (Exception ex)
      {
        SetException(result, ex);
      }
      return result;
    }
    public async Task<MoonCharResult> GetMoonCharacter(Guid MoonCharacterGuid)
    {
      MoonCharResult result = new MoonCharResult();
      try
      {
        MoonCharacterResponse res = await _client.GetMoonCharacterAsync(MoonCharacterGuid);
        if (SetException(result, res)) return result;
        result.Char = new MoonChar
        {
          MoonCharacterGuid = res.Character.MoonCharacterGUID,
          UserGuid = res.Character.UserGUID,
          Name = res.Character.Name,
          Class = res.Character.Class,
          Level = res.Character.Level,
          Data = res.Character.Data,
          AccessDate = res.Character.AccessDate
        };
      }
      catch (Exception ex)
      {
        SetException(result, ex);
      }
      return result;
    }
    public async Task<MoonCharGuidResult> InsertMoonCharacter(MoonChar MoonChar)
    {
      MoonCharGuidResult result = new MoonCharGuidResult();
      result.CharGuid = Guid.NewGuid();
      try
      {
        UTToolzDb.BaseResponse res = await _client.InsertUpdateMoonCharacterAsync(new MoonCharacter
        {
          MoonCharacterGUID = result.CharGuid,
          UserGUID = MoonChar.UserGuid,
          Name = MoonChar.Name,
          Class = MoonChar.Class,
          Level = MoonChar.Level,
          Data = MoonChar.Data
        }, true);
        if (SetException(result, res)) return result;
      }
      catch (Exception ex)
      {
        SetException(result, ex);
      }
      return result;
    }
    public async Task<MoonBaseResponse> UpdateMoonCharacter(MoonChar MoonChar)
    {
      MoonBaseResponse result = new MoonBaseResponse();
      try
      {
        BaseResponse res = await _client.InsertUpdateMoonCharacterAsync(new MoonCharacter
        {
          MoonCharacterGUID = MoonChar.MoonCharacterGuid,
          UserGUID = MoonChar.UserGuid,
          Name = MoonChar.Name,
          Class = MoonChar.Class,
          Level = MoonChar.Level,
          Data = MoonChar.Data
        }, true);
        if (SetException(result, res)) return result;
      }
      catch (Exception ex)
      {
        SetException(result, ex);
      }
      return result;
    }
    public async Task<MoonBaseResponse> DeleteMoonCharacter(Guid UserGuid)
    {
      MoonBaseResponse result = new MoonBaseResponse();
      try
      {
        UTToolzDb.BaseResponse res = await _client.DeleteMoonCharacterAsync(UserGuid);
        if (SetException(result, res)) return result;
      }
      catch (Exception ex)
      {
        SetException(result, ex);
      }
      return result;
    }

    public async Task<JsonResourceResult> GetJsonPackResourceByName(IHostingEnvironment enviroment, JsXResInput Json)
    {
      var result = new JsonResourceResult();
      try
      {
        result.Jsresx = await File.ReadAllTextAsync($@"{enviroment.WebRootPath}/json/{Json.JsonName}.json");
        JsPack pack = JsonConvert.DeserializeObject<JsPack>(result.Jsresx);
        result.Version = pack.ver;
        if (pack.ver == Json.JsonVersion)
          result.Jsresx = "";
      }
      catch (Exception ex)
      {
        SetException(result, ex);
      }
      return result;
    }

    public bool SetException(MoonBaseResponse result, Exception ex)
    {
      result.ErrorCode = 1;
      result.ErrorMessage = ex.Message;
      return true;
    }
    public bool SetException(MoonBaseResponse result, BaseResponse response)
    {
      if (response.ErrorCode != 0)
      {
        result.ErrorCode = response.ErrorCode;
        result.ErrorMessage = response.ErrorMessage;
        return true;
      }
      return false;
    }

    public async Task SaveAllCharacters()
    {
      if (process) return;
      process = true;
      List<MoonChar> chars = MoonApplication.Server.MoonPlayers.Select(pm =>
      {
        MoonChar mc = new MoonChar();
        pm.Info.MaxHP = pm.MaxHP;
        pm.Info.WalkSpeed = pm.WalkSpeed;
        pm.Info.RunSpeed = pm.RunSpeed;
        pm.Info.Radius = pm.Radius;
        pm.Info.Level = pm.Level;
        mc.Data = JsonConvert.SerializeObject(pm.Info);
        mc.Level = pm.Level;
        mc.Class = (int)pm.Info.ClassType;
        mc.MoonCharacterGuid = pm.ClientId;
        return mc;
      }).ToList();
      for (int i = 0; i < chars.Count; i++)
        try
        {
          await UpdateMoonCharacter(chars[i]);
        }
        catch { }
      process = false;
    }

  }

}
