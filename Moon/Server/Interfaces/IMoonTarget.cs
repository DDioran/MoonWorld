using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Threading.Tasks;

namespace Moon
{
  public interface IMoonTarget
  {
    double X { get; }
    double Y { get; }
    bool IsAlive { get; }
    int ObjectId { get; }
    MoonObjectType ObjectType { get; }
  }

  public interface IMoonOpponent
  {
    int Level { get; }
  }

  public interface IMoonPlayer
  {
    MoonParty Party { get; }
  }

}
