using Autofac;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Moon.System.Authorization;

namespace Moon.System
{
  public class AutofacModule : Module
  {
    public IConfigurationRoot Configuration { get; set; }

    protected override void Load(ContainerBuilder builder)
    {
      builder
        .RegisterType<SignInManager>()
        .As<ISignInManager>()
        .SingleInstance();
      /*builder
        .RegisterType<GameUserRepository>()
        .As<IGameUserRepository>()
        .InstancePerLifetimeScope();
      builder
        .RegisterType<ResourceService>()
        .As<IResourceService>()
        .InstancePerLifetimeScope();*/
    }
  }

}