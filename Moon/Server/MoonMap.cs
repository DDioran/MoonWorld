using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Moon
{
  public class MoonMap
  {
    public int MapId;
    public string MapTitle;
    public const int CellSize = 40;
    public int MapCellWidth;
    public int MapCellHeight;
    public int MapWidth;
    public int MapHeight;
    public List<MoonMobGroup> MobGroupList;
    public List<MoonNpc> NpcList;
    public MoonMap(int MapId, string MapTitle)
    {
      this.MapId = MapId;
      this.MapTitle = MapTitle;
      MobGroupList = new List<MoonMobGroup>();
      NpcList = new List<MoonNpc>();
      InitializeMap();
    }

    public void InitializeMap()
    {
      if (MapId == 1)
      {
        MapCellWidth = 150;
        MapCellHeight = 225;
      }
      MapWidth = MapCellWidth * CellSize;
      MapHeight = MapCellHeight * CellSize;
      if (MapId == 1)
      {
        //MobGroupList.Add(new MoonMobGroup(new MMGT_Map1_TEST(), this));
        MobGroupList.Add(new MoonMobGroup(new MMGT_Map1_SceletonUpLeft(), this));
        MobGroupList.Add(new MoonMobGroup(new MMGT_Map1_SceletonUpLeft2(), this));
        MobGroupList.Add(new MoonMobGroup(new MMGT_Map1_SceletonUpRight(), this));
        MobGroupList.Add(new MoonMobGroup(new MMGT_Map1_SceletonMiddle(), this));
        MobGroupList.Add(new MoonMobGroup(new MMGT_Map1_SceletonMiddle2(), this));
        MobGroupList.Add(new MoonMobGroup(new MMGT_Map1_SceletonDownLeft(), this));
        MobGroupList.Add(new MoonMobGroup(new MMGT_Map1_ZombieBossLeft(), this));

        MoonNpc npc;
        // ------------------------------------
        npc = new MoonNpc(this, "test-npc", 1300, 5500);
        npc.Name = "Отшельник";
        npc.Title = "Поручик лейб-гвардии преображенского полка";
        npc.Description = "Стою тут всегда. Всегда на страже. А ты кто такой?";
        npc.Level = 50;
        npc.Sprite.SpriteName = "green-knight";
        npc.Sprite.SpriteOY = 30;
        npc.Sprite.IdleAniSpeed = 5.0;
        npc.Skills = new MoonSkillTableKnight(npc);
        npc.MaxHP = 5000;
        npc.HP = npc.MaxHP;
        npc.WalkSpeed = 2.0;
        npc.RunSpeed = 4.0;
        npc.Radius = 32;
        npc.State = MoonMobState.Alive;
        NpcList.Add(npc);
        // ------------------------------------
      }
    }

    public void Dispatch()
    {
      MobGroupList.ForEach(g => g.Dispatch());
      NpcList.ForEach(g => g.Dispatch());
    }

    public MoonMob GetMapMob(int MobId)
    {
      MoonMob mmob = MobGroupList.SelectMany(g => g.MobList).FirstOrDefault(m => m.MobId == MobId);
      if (mmob != null)
        return mmob;
      else
      {
        MoonPlayer mpl = MoonApplication.Server.MoonPlayers.FirstOrDefault(p => p.Map.MapId == this.MapId && p.MobId == MobId);
        if (mpl != null)
          return mpl;
      }
      return null;
    }

    public MoonMob FindMob(int MobId)
    {
      return MobGroupList.SelectMany(g => g.MobList).FirstOrDefault(m => m.MobId == MobId);
    }

    public MoonNpc FindNpc(int NpcId)
    {
      return NpcList.FirstOrDefault(npc => npc.MobId == NpcId);
    }

  }

}
