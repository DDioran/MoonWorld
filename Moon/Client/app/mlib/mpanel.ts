import { MControl } from "./mcontrol";
import { Color, Rectangle, Gpx } from "./mgfx";
import { MBorder } from "./mborder";
import { JsPack, JsXImage } from "../global/resx";

export class MPanel extends MBorder {
  protected sprite: JsPack;
  constructor() {
    super();
  }
  public OnInit() {
    super.OnInit();
  }
  protected OnLayerPaint() {
    let img: JsXImage = this.sprite.ii.n[this.PackHolderNames[8]];
    for (var j = 0; j < this.height; j += img.h)
      for (var i = 0; i < this.width; i += img.w) {
        var w = img.w, h = img.h;
        if (i + w > this.width) w = this.width - i;
        if (j + h > this.height) h = this.height - j;
        Gpx.DrawImageExact(img.img, this.gx + i, this.gy + j, w, h);
      }
    super.OnLayerPaint();
  }
}