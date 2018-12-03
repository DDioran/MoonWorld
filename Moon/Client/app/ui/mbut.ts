import { MPanel } from "../mlib/mpanel";
import { Gpx } from "../mlib/mgfx";
import { JsPack } from "../global/resx";

export class MBut extends MPanel {
  protected sprite: JsPack;
  constructor() {
    super();
    this.text = "but";
    this.font = "24px CoreRhino-Bold";
  }
  public OnInit() {
    super.OnInit();
    this.PackHolderNames = ["but_ul", "but_u", "but_ur", "but_dl", "but_d", "but_dr", "but_l", "but_r", "but_m"];
  }
  protected OnLayerPaint() {
    super.OnLayerPaint();
    Gpx.TText2("#C0A383", "#675748", this.text, this.gx + 32, this.gy + 32, this.font);
  }
}