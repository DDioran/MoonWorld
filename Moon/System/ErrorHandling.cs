using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System;
using System.Net;
using System.Security.Authentication;
using System.Threading.Tasks;

namespace Moon.System
{
  public class ErrorHandlingMiddleware
  {
    private readonly RequestDelegate next;

    public ErrorHandlingMiddleware(RequestDelegate next)
    {
      this.next = next;
    }

    public Task Invoke(HttpContext context /* other dependencies */)
    {
      try
      {
        return next(context);
      }
      catch (Exception ex)
      {
        return HandleExceptionAsync(context, ex);
      }
    }

    private static Task HandleExceptionAsync(HttpContext context, Exception exception)
    {
      var code = HttpStatusCode.InternalServerError; // 500 if unexpected
      var message = exception.Message;

      if (exception is AuthenticationException) code = HttpStatusCode.BadRequest;
      else if (exception is UnauthorizedAccessException) code = HttpStatusCode.Unauthorized;

      var result = "error";// JsonConvert.SerializeObject(new BaseResponse { ErrorCode = (int)code, ErrorMessage = message });
      context.Response.ContentType = "application/json";
      context.Response.StatusCode = (int)code;
      return context.Response.WriteAsync(result);
    }
  }
}
