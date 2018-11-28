using System;
using System.Collections.Generic;
using System.Linq;

namespace Moon
{
  public class MoonNpc : MoonMob
  {
    public MoonMap Map;
    public MoonNpc(MoonMap Map, string NpcCode, double X, double Y) : base()
    {
      this.Map = Map;
      ItemCode = NpcCode;
      PointMob = new MoonPoint(X, Y);
    }
    protected override MoonObjectType GetObjectType()
    {
      return MoonObjectType.Npc;
    }
    public override void PushToMap()
    {
      MoonApplication.Server.PushToMap(Map.MapId, this);
    }
    public ClientInfo CreateNpcInfo(NpcInfo info)
    {
      CreateMobInfo(info);
      return info;
    }

  }
}
