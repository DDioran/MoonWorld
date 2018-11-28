import { MControl } from "./mcontrol";
import { App } from "../global/app";

export class MHtml extends MControl {
  public HtmlOutTemplate: string;
  public HtmlTemplate: string;
  public TransparentEvents: boolean;
  protected HtmlNode: Node;
  protected HolderElement: HTMLElement;
  constructor(x?: number, y?: number, width?: number, height?: number, text?: string) {
    super(x, y, width, height, text);
    this.HtmlOutTemplate = "<div style='@style1;position: relative;display:none;'><div style='@style2;position: absolute;top:@toppx;left:@leftpx'>@template</div></div>";
    this.HtmlTemplate = "HTML Template";
    this.HtmlNode = null;
    this.HolderElement = null;
    this.TransparentEvents = false;
  }
  public OnInit() {
    super.OnInit();
  }
  public FullHtml(): string {
    var html = this.HtmlOutTemplate;
    html = html.replace("@left", this.gx.toFixed(0));
    html = html.replace("@top", this.gy.toFixed(0));
    var style = this.TransparentEvents ? 'pointer-events: none' : '';
    html = html.replace("@style1", style);
    html = html.replace("@style2", style);
    html = html.replace("@template", this.HtmlTemplate);
    return html;
  }
  public CreateControl() {
    if (this.HtmlNode) return;
    this.HtmlNode = this.htmlToElement(this.FullHtml());
    App.Html.insertBefore(this.HtmlNode, App.Canvas);
    this.HolderElement = this.HtmlNode.childNodes[0] as HTMLElement;
  }
  public DestroyControl() {
    if (!this.HtmlNode) return;
    App.Html.removeChild(this.HtmlNode);
    this.HtmlNode = null;
    this.HolderElement = null;
  }
  public Show() {
    this.visible = true;
    if (!this.HtmlNode) return;
    (this.HtmlNode as HTMLElement).style.display = 'block';
  }
  public set Visible(value: boolean) {
    this.visible = value;
    if (this.HtmlNode)
      if (this.visible)
        this.Show();
      else
        this.Hide();
  }

  public Hide() {
    this.visible = false;
    if (!this.HtmlNode) return;
    (this.HtmlNode as HTMLElement).style.display = 'none';
  }
  protected OnActivate() {
    this.CreateControl();
    if (this.visible) this.Show();
    this.OnAjustmentHtml();
  }
  protected OnDeactivate() {
    this.DestroyControl();
  }
  protected OnAjustmentPosition() {
    super.OnAjustmentPosition();
    this.OnAjustmentHtml();
  }
  protected OnAjustmentHtml() {
    if (this.HolderElement) {
      this.HolderElement.style.left = this.gx.toFixed(0) + 'px';
      this.HolderElement.style.top = this.gy.toFixed(0) + 'px';
    }
  }
  protected htmlToElement(html: string) {
    var template = document.createElement('template');
    html = html.trim();
    template.innerHTML = html;
    return template.content.firstChild;
  }
  protected OnPaint() {
  }
}