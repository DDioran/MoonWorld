using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Moon.System.Authorization;

namespace Moon.System
{
  public class ApiMoonController
  {
    protected readonly IHttpContextAccessor _httpContextAccessor;
    protected readonly ISignInManager _signInManager;
    public ApiMoonController(IHttpContextAccessor httpContextAccessor, ISignInManager signInManager)
    {
      _signInManager = signInManager;
      _httpContextAccessor = httpContextAccessor;
    }
    public AuthResult GetAuthInfo()
    {
      return MoonApplication.Server.Db.GetAuthInfo(_httpContextAccessor);
    }
    public async Task<UserEditResult> LogOn([FromBody]LogOnData logOnData)
    {
      return await MoonApplication.Server.Db.LogOn(_signInManager, logOnData);
    }
  }
}
