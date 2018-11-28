import { Color, Gpx } from "./mgfx";
import { MPanel } from "./mpanel";
import { JsPack } from "../global/resx";

export class MWindow extends MPanel {
  protected sprite: JsPack;
  constructor() {
    super();
  }
  public OnInit() {
    super.OnInit();
    this.PackHolderNames = ["win_ul", "win_u", "win_ur", "win_dl", "win_d", "win_dr", "win_l", "win_r", "win_m"];
  }
  protected OnLayerPaint() {
    super.OnLayerPaint();
    Gpx.TText2("#C0A383", "#675748", this.text, this.gx + 24, this.gy + 12, this.font);
  }
}