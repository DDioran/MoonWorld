import { MPlaceHolderPanel } from "../mlib/mphpanel";
import { App } from "../global/app";
import { JsPack, JsXImage } from "../global/resx";
import { Gpx } from "../mlib/mgfx";

export class MFixButton extends MPlaceHolderPanel {
  public PackName: string;
  protected sprite: JsPack;
  protected packHolderNames: Array<string>;

  public set PackHolderNames(value: Array<string>) {
    this.packHolderNames = value;
    this.Ajustment();
  }
  constructor() {
    super();
    this.sprite = App.Resx.GetPackResource(this.PackName);
    this.transparent = true;
    this.BorderVisible = false;
    this.text = "but";
    this.font = "24px Roboto-Bold";
    this.Ajustment();
    this.canmousecapture = true;
  }
  public OnInit() {
    super.OnInit();
    this.PackName = "buttons";
    this.packHolderNames = ["sel_button_green", "sel_button_green_hover", "sel_button_green_push"];
  }
  protected Ajustment() {
    this.width = this.sprite.ii.n[this.packHolderNames[0]].w;
    this.height = this.sprite.ii.n[this.packHolderNames[0]].h;
  }
  protected OnLayerPaint() {
    super.OnLayerPaint();
    var idx = 0, ofs = 0;
    if (this.enabled) {
      if (this.Selected)
        idx = 3;
      else if (this.mouseHover || this.mouseDown) {
        idx = 1;
        if (this.mouseHover && this.mouseDown) {
          idx = 2;
          ofs = 1;
        }
      }
    }

    let img: JsXImage = this.sprite.ii.n[this.packHolderNames[idx]];
    Gpx.DrawImageExact(img.img, this.gx, this.gy, img.w, img.h);

    var wt = Gpx.MeasureText(this.text, this.font).width;
    var ht = parseInt(this.font) * 1.4;

    Gpx.TText2(this.color, this.ShadowColor, this.text,
      this.gx + (this.width - wt) / 2 + this.TextMarginLeft + ofs,
      this.gy + (this.height - ht) / 2 + this.TextMarginTop + ofs,
      this.font);
  }
}