import { SObjectXY, SObjectList } from "../mlib/sobject";
import { App } from "../global/app";
import { Gpx } from "../mlib/mgfx";

export enum MoonGradeType {
  Common,   // обычный     - белый
  Uncommon, // необычный   - зеленый
  Rary,     // редкий      - синий
  Legendary // легендарный - желтый
}

export enum ChestState {
  Await,
  Appearance,
  Restricted,
  Available,
  Disappearance,
  Destroy
}

export class ChestInfo {
  public chestId: number;
  public x: number;
  public y: number;
  public radius: number;
  public grade: MoonGradeType;
  public state: ChestState;
  public players: Array<string>;
}

export class MoonChest extends SObjectXY {
  public Info: ChestInfo;
  public State: ChestState;
  constructor() {
    super(0, 0);
    App.Field.MoonChestList.ItemList.push(this);
    this.State = ChestState.Await;
  }

  public SetInfo(ChestInfo: ChestInfo) {
    this.X = ChestInfo.x;
    this.Y = ChestInfo.y;
    this.Info = ChestInfo;
    if (this.State != this.Info.state) {
      this.State = this.Info.state;
      if (this.State == ChestState.Destroy)
        this.Deleted = true;
    }
  }

  public Dispatcher(): void {
    
  }

  public Paint(): void {
    var misc = App.Resx.GetPackResource("misc");
    var px = Math.floor(- App.Field.playerx + App.Field.cx + this.X);
    var py = Math.floor(- App.Field.playery + App.Field.cy + this.Y);

    if (this.State == ChestState.Restricted || this.State == ChestState.Available) {
      var font = "11px CoreRhino-Regular";
      var width = Gpx.MeasureText("Сундук", font).width;
      Gpx.Text("Yellow", "Сундук", px - width / 2 + 4, py - 16, font);
    }
    if (this.State == ChestState.Restricted && this.Info.players.filter(p => p == App.PlayerGuid).length == 0) {
      Gpx.DrawImage(misc.ii.n.chest_closed.img, px - 16, py - 12);
      return;
    }
    if (this.State == ChestState.Available || this.State == ChestState.Restricted) {
      Gpx.DrawImage(misc.ii.n.chest_opened.img, px - 16, py - 12);
      return;
    }
  }
}


export class MoonChestList extends SObjectList {
  constructor() {
    super();
  }

  public Dispatcher(): void {
    super.Dispatcher();
  }

  public static FindChest(ChestId: number): MoonChest {
    return App.Field.MoonChestList.ItemList.find(m => (m as MoonChest).Info.chestId == ChestId) as MoonChest;
  }

}


