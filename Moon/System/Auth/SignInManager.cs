using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.Extensions.Configuration;

namespace Moon.System.Authorization
{
  public class SignInManager : ISignInManager
  {
    private const string Issuer = "Moon";
    private readonly IHttpContextAccessor _httpContextAccessor;

    public SignInManager(IHttpContextAccessor httpContextAccessor)
    {
      _httpContextAccessor = httpContextAccessor;
    }

    public async Task SignInAsync(UserItem user)
    {
      if (user == null)
        return;

      var claims = new List<Claim>
                {new Claim(ClaimTypes.Name, user.NickName, ClaimValueTypes.String, Issuer),
                 new Claim(ClaimTypes.NameIdentifier, user.UserGuid.ToString(), ClaimValueTypes.String, Issuer),
                 new Claim(ClaimTypes.Thumbprint, user.Allow.ToString(), ClaimValueTypes.String, Issuer)};

      var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);

      await _httpContextAccessor.HttpContext.SignInAsync(
          CookieAuthenticationDefaults.AuthenticationScheme,
          new ClaimsPrincipal(claimsIdentity),
          new AuthenticationProperties
          {
            ExpiresUtc = DateTime.UtcNow.AddMinutes(20),
            IsPersistent = false,
            AllowRefresh = true
          });
    }

    public async Task SignOutAsync()
    {
      if (_httpContextAccessor.HttpContext.User.Identity.IsAuthenticated)
        await _httpContextAccessor.HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
    }
  }
}