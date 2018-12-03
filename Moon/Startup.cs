using System;
using System.IO.Compression;
using Autofac;
using Autofac.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.ResponseCompression;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Moon.System;

namespace Moon
{
  public class Startup
  {
    public IContainer ApplicationContainer { get; private set; }
    public IConfigurationRoot Configuration { get; }
    private readonly IHostingEnvironment _hostingEnvironment;
    public Startup(IHostingEnvironment env)
    {
      _hostingEnvironment = env;
      var builder = new ConfigurationBuilder()
          .SetBasePath(env.ContentRootPath)
          .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
          .AddEnvironmentVariables();
      Configuration = builder.Build();
      new MoonApplication();
    }
    public IServiceProvider ConfigureServices(IServiceCollection services)
    {
      services.AddSignalR();
      services.TryAddSingleton<IHttpContextAccessor, HttpContextAccessor>();
      services.AddSingleton<IConfigurationRoot>(provider => Configuration);
      services.AddSession(options =>
      {
        options.Cookie.HttpOnly = true;
        options.Cookie.Name = ".ASPNetCoreSession";
        options.Cookie.Path = "/";
        //options.IdleTimeout = TimeSpan.FromMinutes(int.Parse(Configuration["SessionTimeout"]));
      });
      services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
          .AddCookie(options =>
          {
            options.LoginPath = new PathString(Configuration["LoginPath"]);
            options.AccessDeniedPath = new PathString(Configuration["Http403Path"]);
          });
      services.AddMvc();
      services.AddResponseCompression();
      services.Configure<GzipCompressionProviderOptions>(options =>
      {
        options.Level = CompressionLevel.Optimal;
      });
      ContainerBuilder builder = new ContainerBuilder();
      builder.RegisterModule(new AutofacModule()
      {
        Configuration = Configuration
      });
      builder.Populate(services);
      ApplicationContainer = builder.Build();
      IServiceProvider serviceProvider = new AutofacServiceProvider(ApplicationContainer);
      return serviceProvider;
    }

    public void Configure(IApplicationBuilder app, IHostingEnvironment env, IApplicationLifetime appLifetime)
    {
      app.UseSignalR(options =>
      {
        options.MapHub<MoonHub>("/moonhub");
      });

      //app.UseSession();

      if (env.IsDevelopment())
      {
        app.UseDeveloperExceptionPage();
        /*app.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions
        {
          HotModuleReplacement = true
        });*/
      }
      else
      {
        app.UseExceptionHandler("/Home/Error");
      }

      app.UseDefaultFiles();
      app.UseStaticFiles();

      app.UseAuthentication();

      app.UseResponseCompression();

      app.UseMiddleware(typeof(ErrorHandlingMiddleware));

      app.UseMvc(routes =>
      {
        routes.MapRoute(
                  name: "default",
                  template: "{controller=Home}/{action=Index}");
      });
      appLifetime.ApplicationStopped.Register(() => ApplicationContainer.Dispose());
    }
  }
}
