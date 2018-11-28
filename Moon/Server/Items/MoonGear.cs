using System;
using System.Collections.Generic;
using System.Linq;

namespace Moon
{
  public class MoonItemGear : MoonItem
  {
    public int GearScore;
    public MoonItemGear(): base()
    {
      ItemType = MoonItemType.Gear;
      GearScore = 100;
    }
  }


}
