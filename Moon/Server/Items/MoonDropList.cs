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
      MoonApplication.Server.MoonDropList[1] = new MoonDrop
      {
        Items = new List<MoonDropItem>
        {
          new MoonDropItem
          {
            Item = MoonItem.GetItemById(1)
          }
        }
      };
      MoonApplication.Server.MoonDropList[2] = new MoonDrop
      {
        Items = new List<MoonDropItem>
        {
          new MoonDropItem
          {
            Item = MoonItem.GetItemById(1)
          }
        }
      };
      MoonApplication.Server.MoonDropList[3] = new MoonDrop
      {
        Items = new List<MoonDropItem>
        {
          new MoonDropItem
          {
            Item = MoonItem.GetItemById(1)
          }
        }
      };
      MoonApplication.Server.MoonDropList[4] = new MoonDrop
      {
        Items = new List<MoonDropItem>
        {
          new MoonDropItem
          {
            Item = MoonItem.GetItemById(1)
          }
        }
      };
      MoonApplication.Server.MoonDropList[5] = new MoonDrop
      {
        Items = new List<MoonDropItem>
        {
          new MoonDropItem
          {
            Item = MoonItem.GetItemById(1)
          }
        }
      };
      MoonApplication.Server.MoonDropList[6] = new MoonDrop
      {
        Items = new List<MoonDropItem>
        {
          new MoonDropItem
          {
            Item = MoonItem.GetItemById(1)
          }
        }
      };
    }
    public static MoonDrop GetItemListById(int id)
    {
      if (!MoonApplication.Server.MoonDropList.ContainsKey(id)) return null;
      return MoonApplication.Server.MoonDropList[id];
    }
  }

}
