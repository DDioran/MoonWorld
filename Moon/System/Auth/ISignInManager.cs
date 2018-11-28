using System.Threading.Tasks;

namespace Moon.System.Authorization
{
  public interface ISignInManager
  {
    Task SignInAsync(UserItem user);
    Task SignOutAsync();
  }
}