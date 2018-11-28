using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Threading.Tasks;

namespace Moon
{
  public class MoonTimer : MoonObject
  {
    protected double Time;
    protected double TimeLeft;
    protected Action Callback;
    public MoonTimer(double time, Action callback) : base()
    {
      Time = time;
      TimeLeft = 0;
      Callback = callback;
    }
    public override void Dispatcher()
    {
      TimeLeft += MoonApplication.Server.DeltaTime;
      if(TimeLeft >= Time)
      {
        deleted = true;
        Callback();
      }
    }
  }
  public class MoonObject
  {
    public bool deleted;
    public MoonObject()
    {
      deleted = false;
      MoonApplication.Server.MoonObjects.Add(this);
    }
    public virtual void Dispatcher()
    {
    }
    public virtual void Remove()
    {
      deleted = true;
    }
  }

  public class MoonObjectList
  {
    protected List<MoonObject> items;
    protected List<MoonObject> deletedItems;
    protected List<MoonObject> addedItems;
    public MoonObjectList()
    {
      items = new List<MoonObject>();
      deletedItems = new List<MoonObject>();
      addedItems = new List<MoonObject>();
    }
    public List<MoonObject> Items
    {
      get
      {
        return items;
      }
    }
    public void Add(MoonObject item)
    {
      addedItems.Add(item);
    }
    public void Dispatcher()
    {
      items.AddRange(addedItems);
      addedItems.Clear();
      items.ForEach(item => item.Dispatcher());
      deletedItems.Clear();
      if (items.Any(item => item.deleted))
      {
        List<MoonObject> newitems = new List<MoonObject>();
        items.ForEach(item =>
        {
          if (!item.deleted)
            newitems.Add(item);
          else
            deletedItems.Add(item);
        });
        items = newitems;
      }
    }
  }
}