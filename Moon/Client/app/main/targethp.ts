import { MPlaceHolderPanel } from "../mlib/mphpanel";
import { MoonMob, MoonMobList } from "../objs/mob";
import { MoonChestList, MoonChest } from "../objs/chest";
import { Gpx } from "../mlib/mgfx";
import { MoonObjectType } from "../service/moon-info";
import { App } from "../global/app";
import { MouseArgs } from "../mlib/events";

export class MTargetHP extends MPlaceHolderPanel {
  public PackName: string;
  public PackHolderNames: Array<string>
  constructor() {
    super();
    this.transparent = true;
    this.BorderVisible = false;
  }
  public OnInit() {
    super.OnInit();
  }
  public AfterPaint() {
    var player = App.Field.MoonPlayer;
    if (player && player.TargetId > 0) {
      if (player.TargetType == MoonObjectType.Mob) {
        let mob: MoonMob = MoonMobList.FindMob(player.TargetId);
        var text = mob.Level.toFixed(0);
        var width = Gpx.MeasureText(text, "22px Roboto").width;
        Gpx.TText2("Yellow", "Black", text, this.gx + (32 - width) / 2, this.gy + 1, "21px Roboto-Bold");
        Gpx.DrawCircle("Yellow", this.gx + 15, this.gy + 16, 13);
        Gpx.TText("Yellow", mob.Name, this.gx + 36, this.gy, "24px Roboto-Bold");
        var hpLen = (this.width - 4) * mob.HP / mob.MaxHP;
        Gpx.FillRect("rgba(21, 17, 17, 0.2)", this.gx, this.gy + 30, this.width, 32);
        Gpx.DrawRect("#394750", this.gx, this.gy + 30, this.width, 32);
        Gpx.DrawRect("#363D45", this.gx + 1, this.gy + 30 + 1, this.width - 2, 30);
        Gpx.FillRect("#EE1B22", this.gx + 2, this.gy + 30 + 2, hpLen, 16);
        Gpx.FillRect("#B10B0F", this.gx + 2, this.gy + 30 + 2 + 16, hpLen, 12);
        var text = mob.HP.toFixed(0) + "/" + mob.MaxHP.toFixed(0);
        var width = Gpx.MeasureText(text, "24px Roboto").width;
        Gpx.TText2("Yellow", "Black", text, this.gx + (this.width - width) / 2, this.gy + 30, "23px Roboto-Bold");
      }
      if (player.TargetType == MoonObjectType.Chest) {
        let chest: MoonChest = MoonChestList.FindChest(player.TargetId);
        Gpx.TText("Yellow", "Сундук с сокровищами", this.gx, this.gy, "24px Roboto-Bold");        
        Gpx.FillRect("rgba(21, 17, 17, 0.2)", this.gx, this.gy + 30, this.width, 32);
        Gpx.DrawRect("#394750", this.gx, this.gy + 30, this.width, 32);
        Gpx.DrawRect("#363D45", this.gx + 1, this.gy + 30 + 1, this.width - 2, 30);
        Gpx.FillRect("#4B7AB7", this.gx + 2, this.gy + 30 + 2, this.width - 4, 16);
        Gpx.FillRect("#3E6599", this.gx + 2, this.gy + 30 + 2 + 16, this.width - 4, 12);
      }
      if (player.TargetType == MoonObjectType.Npc) {
        let npc: MoonMob = MoonMobList.FindMob(player.TargetId);
        Gpx.TText("Yellow", npc.Name, this.gx, this.gy, "24px Roboto-Bold");
        Gpx.FillRect("rgba(21, 17, 17, 0.2)", this.gx, this.gy + 30, this.width, 32);
        Gpx.DrawRect("#395047", this.gx, this.gy + 30, this.width, 32);
        Gpx.DrawRect("#36453D", this.gx + 1, this.gy + 30 + 1, this.width - 2, 30);
        Gpx.FillRect("#4BB77A", this.gx + 2, this.gy + 30 + 2, this.width - 4, 16);
        Gpx.FillRect("#3E9965", this.gx + 2, this.gy + 30 + 2 + 16, this.width - 4, 12);
      }
    }
  }
  protected OnPropagateMouseDown(Event: MouseArgs): void {
    if (Event.Button == 2) Event.Propagate = false;
  }
  protected OnPropagateMouseUp(Event: MouseArgs): void {
    if (Event.Button == 2) Event.Propagate = false;
  }
  protected OnPropagateMouseClick(Event: MouseArgs): void {
    if (Event.Button == 2) {
      Event.Propagate = false;
      App.Field.ContextMenuTargetHP(Event.X, Event.Y);
    }
  }
}