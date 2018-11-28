import { MPlaceHolderPanel } from "./mphpanel";
import { JsPack, JsXImage } from "../global/resx";
import { Gpx } from "./mgfx";
import { App } from "../global/app";

export class MBorder extends MPlaceHolderPanel {
  public PackName: string;
  public PackHolderNames: Array<string>
  protected sprite: JsPack;
  constructor() {
    super();
    this.sprite = App.Resx.GetPackResource(this.PackName);
    this.transparent = true;
    this.BorderVisible = false;
  }
  public OnInit() {
    super.OnInit();
    this.PackName = "window";
    this.PackHolderNames = ["pan_ul", "pan_u", "pan_ur", "pan_dl", "pan_d", "pan_dr", "pan_l", "pan_r", "win_m"];
  }
  protected OnLayerPaint() {
    super.OnLayerPaint();
    let img_ul: JsXImage = this.sprite.ii.n[this.PackHolderNames[0]];
    var img_ul_w = img_ul.w;
    if (img_ul_w > this.width) img_ul_w = this.width;
    Gpx.DrawImageExact(img_ul.img, this.gx, this.gy, img_ul_w, img_ul.h);
    if (img_ul.w < this.width) {
      let img_u: JsXImage = this.sprite.ii.n[this.PackHolderNames[1]];
      Gpx.DrawImageExactW(img_u.img, this.gx + img_ul_w, this.gy, img_u.w, img_u.h, this.width - img_ul.w);
    };
    let img_ur: JsXImage = this.sprite.ii.n[this.PackHolderNames[2]];
    Gpx.DrawImageExact(img_ur.img, this.gx + this.width - img_ur.w, this.gy, img_ur.w, img_ur.h);

    let img_dl: JsXImage = this.sprite.ii.n[this.PackHolderNames[3]];
    Gpx.DrawImageExact(img_dl.img, this.gx, this.gy + this.height - img_dl.h, img_ul_w, img_ul.h);
    if (img_ul.w < this.width) {
      let img_d: JsXImage = this.sprite.ii.n[this.PackHolderNames[4]];
      Gpx.DrawImageExactW(img_d.img, this.gx + img_ul_w, this.gy + this.height - img_dl.h, img_d.w, img_d.h, this.width - img_ul.w);
    }
    let img_dr: JsXImage = this.sprite.ii.n[this.PackHolderNames[5]];
    Gpx.DrawImageExact(img_dr.img, this.gx + this.width - img_ur.w, this.gy + this.height - img_dl.h, img_dr.w, img_dr.h);

    let img_l: JsXImage = this.sprite.ii.n[this.PackHolderNames[6]];
    Gpx.DrawImageExactH(img_l.img, this.gx, this.gy + img_ul.h, img_l.w, img_l.h, this.height - img_ur.h - img_dr.h);
    let img_r: JsXImage = this.sprite.ii.n[this.PackHolderNames[7]];
    Gpx.DrawImageExactH(img_r.img, this.gx + this.width - img_r.w, this.gy + img_ul.h, img_r.w, img_r.h, this.height - img_ur.h - img_dr.h); }
}