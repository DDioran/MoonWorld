using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Threading.Tasks;

namespace Moon
{
  public class MoonMobGroup
  {
    public MoonMobGroupType GroupType;
    public List<MoonMob> MobList;
    public MoonMap Map;
    public MoonMobGroup(MoonMobGroupType GroupType, MoonMap Map)
    {
      this.Map = Map;
      MobList = new List<MoonMob>();
      this.GroupType = GroupType;
      CreateMobs();
    }
    public void CreateMobs()
    {
      for (int i = 0; i < GroupType.Count; i++)
        MobList.Add(new MoonMob(GroupType, this));
    }
    public void Dispatch()
    {
      MobList.ForEach(m => m.Dispatch());
    }

  }
}
