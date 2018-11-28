import { MoonMob } from "./mob";
import { SObjectXY, SObjectList } from "../mlib/sobject";
import { JsPack, JsXSprite } from "../global/resx";
import { MCounter } from "../mlib/mcounter";
import { App } from "../global/app";
import { Gpx, Rectangle } from "../mlib/mgfx";

export enum MoonEffectState {
  Await,
  Alive,
  Done
}

export class MoonPointEffect extends SObjectXY {
  public Speed: number;
  protected sprite: JsPack;
  protected spriteName: string;
  public State: MoonEffectState;
  public CounterView: MCounter;

  constructor(SpriteName: string, Speed: number, X: number, Y: number) {
    super(X, Y);
    this.Speed = Speed;
    this.spriteName = SpriteName;
    App.Field.MoonEffectList.ItemList.push(this);
    this.State = MoonEffectState.Await;
  }

  public Dispatcher(): void {
    if (this.State == MoonEffectState.Await) {
      this.sprite = App.Resx.GetPackResource(this.spriteName);
      this.CounterView = new MCounter(this.sprite.ss.s.length, this.Speed, false);
      this.State = MoonEffectState.Alive;
    } else if (this.State == MoonEffectState.Alive) {
      var idx = this.CounterView.GetIndex(App.DeltaTime);
      if (idx < 0) {
        this.State = MoonEffectState.Done;
        this.Deleted = true;
      }
    }
  }

  public Paint(): void {
    if (this.State == MoonEffectState.Alive) {
      var idx = this.CounterView.GetCurrentIndex();
      if (idx < 0) return;
      let spr: JsXSprite = this.sprite.ss.s[idx];
      Gpx.DrawImage(spr.img, Math.floor(- App.Field.playerx + App.Field.cx + this.X - spr.cx), Math.floor(- App.Field.playery + App.Field.cy + this.Y - spr.cy));
    }
  }
}

export class MoonLineEffect extends SObjectXY {
  public Speed: number;
  public TimeLeft: number;
  public Time: number;
  protected sprite: JsPack;
  protected spriteName: string;
  public State: MoonEffectState;
  public CounterView: MCounter;
  private dX: number;
  private dY: number;
  private angle: number;

  constructor(SpriteName: string, Speed: number, X1: number, Y1: number, X2: number, Y2: number) {
    super(X1, Y1);
    this.Time = 0.3;
    this.dX = (X2 - X1) / this.Time;
    this.dY = (Y2 - Y1) / this.Time;
    this.angle = Math.atan2(Y2 - Y1, X2 - X1) + Math.PI / 2;
    if (this.angle > Math.PI * 2) this.angle -= Math.PI * 2;

    this.Speed = Speed;
    this.spriteName = SpriteName;
    App.Field.MoonEffectList.ItemList.push(this);
    this.State = MoonEffectState.Await;
  }

  public Dispatcher(): void {
    if (this.State == MoonEffectState.Await) {
      this.sprite = App.Resx.GetPackResource(this.spriteName);
      this.CounterView = new MCounter(this.sprite.ss.s.length, this.Speed, true);
      this.State = MoonEffectState.Alive;
      this.TimeLeft = 0;
    } else
      if (this.State == MoonEffectState.Alive) {
        this.CounterView.GetIndex(App.DeltaTime);
        this.TimeLeft += App.DeltaTime;
        if (this.Time < this.TimeLeft) {
          this.State = MoonEffectState.Done;
          this.Deleted = true;
        }
      }
  }

  public Paint(): void {
    if (this.State == MoonEffectState.Alive) {
      var idx = this.CounterView.GetCurrentIndex();
      let spr: JsXSprite = this.sprite.ss.s[idx];
      //var gx = - App.Field.playerx + App.Field.cx - spr.cx + this.X + this.dX * this.TimeLeft;
      //var gy = - App.Field.playery + App.Field.cy - spr.cy + this.Y + this.dY * this.TimeLeft;
      var gx = - App.Field.playerx + App.Field.cx + this.X + this.dX * this.TimeLeft;
      var gy = - App.Field.playery + App.Field.cy + this.Y + this.dY * this.TimeLeft;


      //Gpx.DrawImage(spr.img, gx, gy);
      Gpx.DrawImageCenterRotate(spr.img, gx, gy, spr.cx, spr.cy, new Rectangle(0, 0, spr.img.width, spr.img.height), this.angle);
    }
  }
}

export class MoonHitEffect extends SObjectXY {
  public Hit: number;
  public Crit: number;
  public MobId: number;
  public State: MoonEffectState;
  public CounterView: MCounter;

  constructor(X: number, Y: number, Hit: number, Crit: number, MobId: number) {
    super(X, Y);
    this.Hit = Hit;
    this.Crit = Crit;
    this.MobId = MobId;
    App.Field.MoonEffectList.ItemList.push(this);
    this.State = MoonEffectState.Await;
  }

  public Dispatcher(): void {
    if (this.State == MoonEffectState.Await) {
      this.CounterView = new MCounter(200, 0.5, false);
      this.State = MoonEffectState.Alive;
    } else if (this.State == MoonEffectState.Alive) {
      var idx = this.CounterView.GetIndex(App.DeltaTime);
      if (idx < 0) {
        this.State = MoonEffectState.Done;
        this.Deleted = true;
      }
    }
  }

  public Paint(): void {
    if (this.State == MoonEffectState.Alive) {
      var idx = this.CounterView.GetCurrentIndex();
      if (idx < 0) return;
      var a = 1;
      var ofy = 0;
      if (idx > 100) {
        a = (200 - idx) / 100;
        ofy = 10 - (200 - idx) / 10;
      }
      var col1 = "rgba(255, 0, 0, " + a + ")";
      var col2 = "rgba(255, 255, 0, " + a + ")";
      var font = "20px Roboto-Bold";
      if (App.Field.MoonPlayer.MobId == this.MobId) {
        col1 = "rgba(0, 128, 255, " + a + ")";
      }
      var msg = this.Hit.toFixed(0);
      if (this.Crit == 1) msg = "КРИТ! " + msg;
      if (this.Crit == -1) msg = "Промах";
      let mob: MoonMob = App.Field.MoonMobList.ItemList.filter(m => this.MobId == (m as MoonMob).MobId)[0] as MoonMob;
      Gpx.Text2(col1, col2, msg, Math.floor(- App.Field.playerx + App.Field.cx + mob.X + this.X), Math.floor(- App.Field.playery + App.Field.cy + mob.Y + this.Y - ofy), font);
    }
  }
}

export class MoonDashEffect extends SObjectXY {
  public TimeLeft: number;
  public Time: number;
  public State: MoonEffectState;
  public CounterView: MCounter;
  private Mob: MoonMob;
  private dX: number;
  private dY: number;
  private startX: number;
  private startY: number;
  private destX: number;
  private destY: number;

  constructor(Mob: MoonMob, X2: number, Y2: number) {
    super(Mob.X, Mob.Y);
    this.Mob = Mob;
    this.Time = 0.2;
    this.startX = Mob.X;
    this.startY = Mob.Y;
    this.destX = X2;
    this.destY = Y2;
    this.dX = (this.destX - this.startX) / this.Time;
    this.dY = (this.destY - this.startY) / this.Time;
    App.Field.MoonEffectList.ItemList.push(this);
    this.State = MoonEffectState.Await;
  }

  public Dispatcher(): void {
    if (this.State == MoonEffectState.Await) {
      this.State = MoonEffectState.Alive;
      this.TimeLeft = 0;
    } else
      if (this.State == MoonEffectState.Alive) {
        this.TimeLeft += App.DeltaTime;
        this.Mob.X = this.startX + this.dX * this.TimeLeft;
        this.Mob.Y = this.startY + this.dY * this.TimeLeft;
        if (this.Time < this.TimeLeft) {
          this.State = MoonEffectState.Done;
          this.Deleted = true;
          this.Mob.X = this.destX;
          this.Mob.Y = this.destY;
        }
      }
  }
}

export class MoonEffectList extends SObjectList {
  public counter: MCounter;
  constructor() {
    super();
    this.counter = new MCounter(60, 1, false);
  }

  public Dispatcher(): void {
    super.Dispatcher();
  }


}
