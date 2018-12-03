import { MPlaceHolderPanel } from "../mlib/mphpanel";
import { MChatType } from "./chat";
import { Gpx } from "../mlib/mgfx";
import { MouseArgs } from "../mlib/events";

export class MChatTab extends MPlaceHolderPanel {
  public ChatType: MChatType;
  constructor(x: number, y: number, width: number, height: number, text: string, type: MChatType ) {
    super(x, y, width, height, text);
    this.ChatType = type;
    this.transparent = true;
    this.BorderVisible = false;
  }

  public AfterPaint() {
    if (this.Selected)
      Gpx.FillRect("rgba(255,255,255,0.4)", this.gx, this.gy, this.width, this.height);
    if (this.mouseHover && !this.Selected)
      Gpx.FillRect("rgba(255,255,255,0.2)", this.gx, this.gy, this.width, this.height);
    Gpx.DrawRect("rgba(255,255,200,0.6)", this.gx, this.gy, this.width, this.height);
    var width = Gpx.MeasureText(this.text, "16px CoreRhino-Regular").width;
    Gpx.TText("Yellow", this.text, this.gx + (this.width - width) / 2, this.gy + 2, "15px CoreRhino-Regular");
  }

  protected OnPropagateMouseDown(Event: MouseArgs): void {
    Event.Propagate = false;
  }
  protected OnPropagateMouseUp(Event: MouseArgs): void {
    Event.Propagate = false;
  }
  protected OnPropagateMouseClick(Event: MouseArgs): void {
    Event.Propagate = false;
  }


}