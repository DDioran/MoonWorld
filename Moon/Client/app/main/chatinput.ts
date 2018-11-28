import { MHtml } from "../mlib/mhtml";
import { Gpx } from "../mlib/mgfx";
import { EventArgs } from "../mlib/events";

type EnterTextDelegate = (sender: MChatInput, event: EventArgs) => void;

export class MChatInput extends MHtml {
  protected TextBoxElement: HTMLInputElement;
  public EnterText: EnterTextDelegate;

  constructor(x: number, y: number, width: number, height: number) {
    super(x, y, width, height);
    this.text = "";
    this.TextBoxElement = null;
    this.color = "#D0B393";
    this.GenerateHtmlTemplate();
  }
  protected GenerateHtmlTemplate() {
    this.HtmlTemplate = "<input type='textbox' style='background-color: transparent;border: 0px solid;outline:none;font-size:14px;' autocomplete='no' />";
  }
  public get Text(): string {
    return this.text;
  }
  public set Text(value: string) {
    this.text = value;
    this.TextBoxElement.value = this.text;
  }
  public CreateControl() {
    super.CreateControl();
    this.TextBoxElement = this.HtmlNode.childNodes[0].childNodes[0] as HTMLInputElement;
    this.TextBoxElement.value = this.text;
    this.TextBoxElement.addEventListener('input', (evt) => { this.OnChangeTextByUser(evt); }, false);
    this.TextBoxElement.addEventListener('keyup', (evt) => { this.OnChangeTextByUser(evt); }, false);
  }
  public OnChangeTextByUser(evt) {
    this.text = this.TextBoxElement.value;
    if (evt.keyCode == 13 && this.EnterText)
      this.EnterText(this, new EventArgs());
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

  public AfterPaint() {
    Gpx.DrawRect("rgba(250,250,200,0.6)", this.gx, this.gy, this.width, this.height);
  }

  public IsFocus(): boolean {
    if (!this.TextBoxElement) return false;
    return this.TextBoxElement == document.activeElement;
  }

  public DropFocus() {
    if (this.IsFocus())
      this.TextBoxElement.blur();
  }

}