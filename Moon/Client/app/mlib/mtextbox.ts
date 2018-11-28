import { MHtml } from "./mhtml";
import { App } from "../global/app";
import { JsPack, JsXImage } from "../global/resx";
import { Gpx } from "./mgfx";

export class MTextBox extends MHtml {
  protected TextBoxElement: HTMLInputElement;
  protected sprite: JsPack;
  protected password: boolean;
  public PackName: string;
  public set Password(value: boolean) {
    this.password = value;
    this.GenerateHtmlTemplate();
  }

  constructor() {
    super();
    this.sprite = App.Resx.GetPackResource(this.PackName);
    this.text = "text";
    this.TextBoxElement = null;
    this.height = this.sprite.ii.n.textbox_left.h;
    this.color = "#D0B393";
    this.GenerateHtmlTemplate();
  }
  public OnInit() {
    super.OnInit();
    this.PackName = "controls";
    this.Password = false;
  }
  protected GenerateHtmlTemplate() {
    var tt = "textbox";
    if (this.password) tt = "password";
    this.HtmlTemplate = "<input type='" + tt + "' style='background-color: transparent;border: 0px solid;outline:none;font-size:24px;' autocomplete='new-password' />";
  }
  public CreateControl() {
    super.CreateControl();
    this.TextBoxElement = this.HtmlNode.childNodes[0].childNodes[0] as HTMLInputElement;
    this.TextBoxElement.value = this.text;
    this.TextBoxElement.addEventListener('input', (evt) => { this.OnChangeTextByUser(); }, false);
    this.TextBoxElement.addEventListener('keyup', (evt) => { this.OnChangeTextByUser(); }, false);
  }
  public OnChangeTextByUser() {
    this.text = this.TextBoxElement.value;
  }
  protected OnAjustmentHtml() {
    super.OnAjustmentHtml();
    if (this.TextBoxElement) {
      this.HolderElement.style.left = (this.gx + 5).toFixed(0) + 'px';
      this.HolderElement.style.top = (this.gy + 1).toFixed(0) + 'px';
      this.TextBoxElement.style.width = (this.width - 10).toFixed(0) + 'px';
      this.TextBoxElement.style.height = (this.height - 2).toFixed(0) + 'px';
      this.TextBoxElement.style.color = this.Color;
    }
  }
  protected OnPaint() {
    super.OnPaint();
    let img: JsXImage = this.sprite.ii.n.textbox_left;
    var img_w = img.w;
    if (img_w > this.width) img_w = this.width;
    Gpx.DrawImageExact(img.img, this.gx, this.gy, img_w, img.h);
    if (img.w < this.width) {
      img = this.sprite.ii.n.textbox_fill;
      Gpx.DrawImageExactW(img.img, this.gx + img_w, this.gy, img.w, img.h, this.width - img.w);
    };
    img = this.sprite.ii.n.textbox_right;
    Gpx.DrawImageExact(img.img, this.gx + this.width - img.w, this.gy, img.w, img.h);
  }

}