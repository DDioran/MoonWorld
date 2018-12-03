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
    public string ItemCode; // Id вещи в базе
    public MoonGradeType GradeType;
    public MoonItemType ItemType;
    public decimal? Cost;
    public string Name;
    public string Description;
    public bool Stackable;
    public int StackSize;
    public int Quantity;
    public bool Quest;
    public MoonItem()
    {
      GradeType = MoonGradeType.Common;
    }
    public static void LoadDbItems()
    {
      MoonApplication.Server.MoonItemList.Clear();
      // Тут надо грузить из json фалика инфу о всех предметах
      MoonApplication.Server.MoonItemList["test-drop"] = new MoonItemCommon
      {
        ItemCode = "test-drop",
        Name = "Хрень всякая",
        Description = "Кусок всяческой хрени. Ещё свежий.",
        Cost = 100,
        Stackable = true,
        StackSize = 100        
      };
      MoonApplication.Server.MoonItemList["sword-skel-2-broken-sword"] = new MoonItemCommon
      {
        ItemCode = "sword-skel-2-broken-sword",
        Name = "Прогнивший меч скелета мечника",
        Description = "Ещё недавно это мог быть отличный меч.",
        Cost = 100,
        Stackable = true,
        StackSize = 100
      };
      MoonApplication.Server.MoonItemList["sword-skel-2-sword"] = new MoonItemCommon
      {
        ItemCode = "sword-skel-2-sword",
        Name = "Меч скелета мечника",
        Description = "Чудом сохранившийся меч.",
        Stackable = true,
        StackSize = 100
      };
      MoonApplication.Server.MoonItemList["sword-skel-2-skull"] = new MoonItemCommon
      {
        ItemCode = "sword-skel-2-sword",
        Name = "Череп скелета мечника",
        Description = "Череп как череп...",
        Stackable = true,
        StackSize = 100
      };
    }
    public static MoonItem GetItemByCode(string code)
    {
      if (!MoonApplication.Server.MoonItemList.ContainsKey(code)) return null;
      return MoonApplication.Server.MoonItemList[code];
    }
    public MoonItem ShallowCopy()
    {
      return (MoonItem)this.MemberwiseClone();
    }
  }


}
