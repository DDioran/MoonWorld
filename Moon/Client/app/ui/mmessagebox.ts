import { MContextFloat } from "./mcontextfloat";
import { MoonMob } from "../objs/mob";
import { MFloat } from "./mfloat";
import { EventArgs } from "../mlib/events";
import { App } from "../global/app";

export enum MessageBoxButton {
  mbOk,
  mbCancel
}

export class MessageBoxClickArgs extends EventArgs {
  public Type: MessageBoxButton;
  constructor(Type: MessageBoxButton) {
    super();
    this.Type = Type;
  }
}

type MessageBoxClickDelegate = (sender: MMessageBox, event: MessageBoxClickArgs) => void;

export class MMessageBox extends MFloat {
  protected MessageElement: HTMLElement;
  public ListMenu: string[];
  public Mob: MoonMob;
  public ButtonClick: MessageBoxClickDelegate;
  public Caption: string;
  public Buttons: MessageBoxButton[];

  constructor(width: number, height: number, caption: string, text: string, buttons: MessageBoxButton | MessageBoxButton[] = null) {
    super(0, 0, width, height);
    this.text = text;
    this.Caption = caption;
    if (!buttons || Array.isArray(buttons) && !buttons.length) buttons = MessageBoxButton.mbOk;
    if (!Array.isArray(buttons)) buttons = [buttons];
    this.Buttons = buttons;
    this.GenerateHtmlTemplate();
  }
  protected OnActivate() {
    this.X = (App.Field.Width - this.width) / 2;
    this.Y = (App.Field.Height - this.height) / 3;
    super.OnActivate();
    if (App.Field.MessageBox) return;
    App.Field.MessageBox = this;
  }
  public ResizeWindow() {
    this.X = (App.Field.Width - this.width) / 2;
    this.Y = (App.Field.Height - this.height) / 3;
    super.ResizeWindow();
  }
  protected OnDeactivate() {
    super.OnDeactivate();
    App.Field.MessageBox = null;
  }
  protected GenerateHtmlTemplate() {
    var buttons = '';
    this.Buttons.forEach(b => {
      var title = '';
      switch (b) {
        case MessageBoxButton.mbOk: title = 'Принять'; break;
        case MessageBoxButton.mbCancel: title = 'Отмена'; break;
      }
      buttons += `<span class='m-window-float-button'><span>${title}</span></span>`;
    })
    var content = `<div class='m-window-float-caption'>${this.Caption}</div>
      <div class='m-window-float-body'>${this.text}</div>
      <div class='m-window-float-buttons'>${buttons}</div>`;
    this.HtmlTemplate = "<div class='m-window-float'>" + content + "</div>";
  }
  public CreateControl() {
    super.CreateControl();
    this.MessageElement = this.HtmlNode.childNodes[0].childNodes[0] as HTMLElement;
    this.HolderElement.style.backgroundColor = this.bgColor;
    this.HolderElement.style.padding = '3px';
    for (var i = 0; i < this.Buttons.length; i++) {
      (this.MessageElement.children.item(2).children.item(i) as any).tagId = this.Buttons[i];
      this.MessageElement.children.item(2).children.item(i).addEventListener('click', (evt) => {
        if (this.ButtonClick)
          this.ButtonClick(this, new MessageBoxClickArgs((evt.currentTarget as any).tagId));
        this.Deactivate();
        this.Parent.Controls.Remove(this);
      });
    };
  }
  protected OnAjustmentHtml() {
    super.OnAjustmentHtml();
    if (this.MessageElement) {
      this.MessageElement.style.width = this.width + 'px';
      this.MessageElement.style.height = this.height + 'px';
      (this.MessageElement.children.item(1) as HTMLElement).style.height = (this.height - 100) + 'px';
    }
  }

}