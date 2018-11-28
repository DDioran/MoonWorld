import { MFixButton } from "./mfixbutton";
import { Gpx } from "../mlib/mgfx";
import { JsXImage } from "../global/resx";
import { PlayerClassType } from "../service/moon-info";

export class MMedalButton extends MFixButton {
  public ClassType: PlayerClassType;
  constructor() {
    super();
    this.text = "";
    this.font = "24px Roboto-Bold";
    this.ClassType = PlayerClassType.Knight;
  }
  public OnInit() {
    super.OnInit();
    this.packHolderNames = ["sel_char_medal", "sel_char_medal_hover", "sel_char_medal_push", "sel_char_medal_focus"];
  }

  protected OnLayerPaint() {
    super.OnLayerPaint();
    var x = 38, y = 46;
    let img: JsXImage = this.sprite.ii.n.sel_char_medal_pic;
    Gpx.DrawImage(img.img, this.gx + x, this.gy + y);
    x += 25;
    y += 24;
    var text = "";
    switch (this.ClassType) {
      case PlayerClassType.Knight:
        img = this.sprite.ii.n.sel_char_medal_warrior;
        Gpx.DrawImage(img.img, this.gx + x, this.gy + y);
        text = "Мечник";
        break;
      case PlayerClassType.Mage:
        img = this.sprite.ii.n.sel_char_medal_wizzard;
        Gpx.DrawImage(img.img, this.gx + x + 3, this.gy + y);
        text = "Волшебник";
        break;
      case PlayerClassType.Archer:
        img = this.sprite.ii.n.sel_char_medal_archer;
        Gpx.DrawImage(img.img, this.gx + x, this.gy + y);
        text = "Лучник";
        break;
      case PlayerClassType.Priest:
        img = this.sprite.ii.n.sel_char_medal_healer;
        Gpx.DrawImage(img.img, this.gx + x + 12, this.gy + y);
        text = "Лекарь";
        break;
    }
    var wt = Gpx.MeasureText(text, this.font).width;
    var ht = Gpx.MeasureText("M", this.font).width;
    Gpx.TText2("#C0A383", "#675748", text,
      this.gx + (this.width - wt) / 2 + 0,
      this.gy + (this.height - ht) / 2 + 120,
      this.font);
  }

}