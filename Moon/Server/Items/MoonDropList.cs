using System;
using System.Collections.Generic;
using System.Linq;

namespace Moon
{
  public class MoonDropItem
  {
    public double Chance;
    public MoonItem Item;
    public int MinQuantity;
    public int MaxQuantity;
    public MoonDropItem()
    {
      Chance = 1;
      MinQuantity = 1;
      MinQuantity = 3;
    }
  }

  public class MoonDrop
  {
    public List<MoonDropItem> Items;
    public MoonDrop()
    {
      Items = new List<MoonDropItem>();
    }
    public static void LoadDbItems()
    {
      MoonApplication.Server.MoonDropList.Clear();
      // Тут надо грузить из json фалика инфу о дроп листах
      MoonApplication.Server.MoonDropList["mob-test-1"] = new MoonDrop
      {
        Items = new List<MoonDropItem>
        {
          new MoonDropItem
          {
            Item = MoonItem.GetItemByCode("test-drop")
          }
        }
      };
      MoonApplication.Server.MoonDropList["bow-skel-1"] = new MoonDrop
      {
        Items = new List<MoonDropItem>
        {
          new MoonDropItem
          {
            Item = MoonItem.GetItemByCode("test-drop")
          }
        }
      };
      MoonApplication.Server.MoonDropList["skel-1"] = new MoonDrop
      {
        Items = new List<MoonDropItem>
        {
          new MoonDropItem
          {
            Item = MoonItem.GetItemByCode("test-drop")
          }
        }
      };
      MoonApplication.Server.MoonDropList["bow-skel-2-1"] = new MoonDrop
      {
        Items = new List<MoonDropItem>
        {
          new MoonDropItem
          {
            Item = MoonItem.GetItemByCode("test-drop")
          }
        }
      };
      MoonApplication.Server.MoonDropList["bow-skel-2-2"] = new MoonDrop
      {
        Items = new List<MoonDropItem>
        {
          new MoonDropItem
          {
            Item = MoonItem.GetItemByCode("test-drop")
          }
        }
      };
      MoonApplication.Server.MoonDropList["sword-skel-2"] = new MoonDrop
      {
        Items = new List<MoonDropItem>
        {
          new MoonDropItem
          {
            Item = MoonItem.GetItemByCode("test-drop")
          }
        }
      };
    }
    public static MoonDrop GetItemListByCode(string code)
    {
      if (!MoonApplication.Server.MoonDropList.ContainsKey(code)) return null;
      return MoonApplication.Server.MoonDropList[code];
    }
  }

}
