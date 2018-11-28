using System;
using System.Collections.Generic;
using System.Linq;

namespace Moon
{
  public enum MoonGradeType
  {
    Common,   // обычный     - белый
    Uncommon, // необычный   - зеленый
    Rary,     // редкий      - синий
    Legendary // легендарный - желтый
  }
  public enum MoonItemType
  {
    Common, // ненужный лут
    Gear    // одеваемая шмотка
  }
  public abstract class MoonItem
  {
    public int ItemId; // Id вещи в базе
    public MoonGradeType GradeType;
    public MoonItemType ItemType;
    public decimal Cost;
    public string Name;
    public string Description;
    public bool Stackable;
    public int StackSize;
    public int Quantity;
    public MoonItem()
    {
      GradeType = MoonGradeType.Common;
    }
    public static void LoadDbItems()
    {
      MoonApplication.Server.MoonItemList.Clear();
      // Тут надо грузить из json фалика инфу о всех предметах
      MoonApplication.Server.MoonItemList[1] = new MoonItemCommon
      {
        ItemId = 1,
        Name = "Хрень всякая",
        Description = "Кусок всяческой хрени. Ещё свежий.",
        Cost = 100,
        Stackable = true,
        StackSize = 100        
      };
    }
    public static MoonItem GetItemById(int id)
    {
      if (!MoonApplication.Server.MoonItemList.ContainsKey(id)) return null;
      return MoonApplication.Server.MoonItemList[id];
    }
    public MoonItem ShallowCopy()
    {
      return (MoonItem)this.MemberwiseClone();
    }
  }


}
