import { MFixButton } from "./mfixbutton";
import { CharacterInfo } from "../info/playerdata";
import { Gpx } from "../mlib/mgfx";
import { JsXImage } from "../global/resx";
import { PlayerClassType } from "../service/info";

export class MCharacterButton extends MFixButton {
  public CharInfo: CharacterInfo;
  constructor() {
    super();
    this.text = "MCharacterButton";
    this.font = "24px CoreRhino-Bold";
    this.TextMarginLeft
  }
  public OnInit() {
    super.OnInit();
    this.packHolderNames = ["sel_char_button", "sel_char_button_hover", "sel_char_button_push", "sel_char_button_focus"];
  }

  protected OnLayerPaint() {
    //super.OnLayerPaint();

    var idx = 0;
    if (this.enabled) {
      if (this.Selected)
        idx = 3;
      else if (this.mouseHover || this.mouseDown) {
        idx = 1;
        if (this.mouseHover && this.mouseDown)
          idx = 2;
      }
    }

    let img: JsXImage = this.sprite.ii.n[this.packHolderNames[idx]];
    Gpx.DrawImageExact(img.img, this.gx, this.gy, img.w, img.h);

    img = this.sprite.ii.n.sel_char_button_pic_full;
    Gpx.DrawImage(img.img, this.gx, this.gy + 2);

    if (this.Selected) {
      img = this.sprite.ii.n.sel_char_button_focus_pic;
      Gpx.DrawImage(img.img, this.gx + 44, this.gy + 2);
    }

    var x = 10, y = 12;
    var text = "";
    switch (this.CharInfo.ClassType) {
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
        Gpx.DrawImage(img.img, this.gx + x + 1, this.gy + y + 1);
        text = "Лучник";
        break;
      case PlayerClassType.Priest:
        img = this.sprite.ii.n.sel_char_medal_healer;
        Gpx.DrawImage(img.img, this.gx + x + 13, this.gy + y);
        text = "Лекарь";
        break;
    }

    var font = "18px CoreRhino-Bold";
    var wt = Gpx.MeasureText(text, font).width;
    Gpx.TText2(this.color, this.ShadowColor, this.text, this.gx + 80, this.gy + 4, this.font);
    Gpx.TText2(this.color, this.ShadowColor, text, this.gx + 80, this.gy + 34, font);
    Gpx.TText2(this.color, this.ShadowColor, "Level " + this.CharInfo.Level.toFixed(0),
      this.gx + 90 + wt, this.gy + 34, "18px CoreRhino-Regular");
  }

}