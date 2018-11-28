import { MPlaceHolderPanel } from "./mphpanel";
import { MAlign, MVAlign } from "./mcontrol";
import { Gpx } from "./mgfx";

export class MLabel extends MPlaceHolderPanel {
  public TextAlign: MAlign;
  public TextVAlign: MVAlign;
  constructor() {
    super();
    this.transparent = true;
    this.BorderVisible = false;
    this.TextAlign = MAlign.None;
    this.TextVAlign = MVAlign.None;
    this.text = "Label";
  }
  protected OnPaint(): void {
    super.OnPaint();
    var wt = Gpx.MeasureText(this.text, this.font).width;
    var ht = Gpx.MeasureText("M", this.font).width;
    var x = 0, y = 0;
    if (this.TextAlign == MAlign.Right) x = this.width - wt;
    if (this.TextAlign == MAlign.Center) x = (this.width - wt) / 2;
    if (this.TextVAlign == MVAlign.Bottom) y = this.height - ht;
    if (this.TextVAlign == MVAlign.Middle) y = (this.height - ht) / 2;
    Gpx.TText2(this.Color, this.ShadowColor, this.text,
      this.gx + x + this.TextMarginLeft,
      this.gy + y + this.TextMarginTop,
      this.font);
  }
}