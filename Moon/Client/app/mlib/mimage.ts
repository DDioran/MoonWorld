import { MControl } from "./mcontrol";
import { Color, Gpx } from "./mgfx";
import { MPlaceHolderPanel } from "./mphpanel";
import { App } from "../global/app";
import { JsPack, JsXImage } from "../global/resx";

export class MImage extends MPlaceHolderPanel {
  private packName: string;
  private imageName: string;
  public set PackName(value: string) {
    this.packName = value;
    this.Ajustment();
  }
  public set ImageName(value: string) {
    this.imageName = value;
    this.Ajustment();
  }
  protected sprite: JsPack;
  constructor() {
    super();
    this.transparent = true;
    this.BorderVisible = false;
    this.sprite = null;
  }
  protected Ajustment() {
    this.sprite = null;
    if (this.packName) {
      this.sprite = App.Resx.GetPackResource(this.packName);
      if (this.imageName) {
        let img: JsXImage = this.sprite.ii.n[this.imageName];
        this.width = img.w;
        this.height = img.h;
        this.AjustmentPosition();
      }
    }
  }
  protected OnLayerPaint() {
    if (this.imageName) {
      let img: JsXImage = this.sprite.ii.n[this.imageName];
      Gpx.DrawImageExact(img.img, this.gx, this.gy, this.width, this.height);
    }
  }
}