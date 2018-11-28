import { MHtml } from "../mlib/mhtml";
import { MChatType } from "./chat";
import { MoonMob } from "../objs/mob";
import { App } from "../global/app";

export class MChatList extends MHtml {
  protected ListElement: HTMLElement;
  public ChatType: MChatType;

  constructor(x: number, y: number, width: number, height: number, type: MChatType) {
    super(x, y, width, height);
    this.ChatType = type;
    this.ListElement = null;
    this.color = "yellow";
    //this.TransparentEvents = true;
    this.GenerateHtmlTemplate();
  }
  protected GenerateHtmlTemplate() {
    this.HtmlTemplate = "<div style='xpointer-events: none;overflow-y:scroll;font-size:16px;background-color:rgba(255, 255, 255, 0.1)'><div>";
  }
  public CreateControl() {
    super.CreateControl();
    this.ListElement = this.HtmlNode.childNodes[0].childNodes[0] as HTMLInputElement;
  }
  protected OnAjustmentHtml() {
    super.OnAjustmentHtml();
    if (this.ListElement) {
      this.ListElement.style.color = this.color;
      this.ListElement.style.width = (this.width - 0).toFixed(0) + 'px';
      this.ListElement.style.height = (this.height - 0).toFixed(0) + 'px';
    }
  }
  public AddLine(id: number, color:string, text: string) {
    var template = document.createElement('template');
    if (id == null)
      template.innerHTML = "<div>" + text + "</div>";
    else {
      let mob: MoonMob = App.Field.MoonMobList.ItemList.filter(i => (i as MoonMob).MobId == id)[0] as MoonMob;
      template.innerHTML = "<div><span class='m-chat-link'>" + mob.Name + "</span>: " + text + "</div>";
    }
    var obj = template.content.firstChild;
    (obj as HTMLElement).style.color = color;
    this.ListElement.appendChild(obj);
    if (id != null)
      obj.childNodes[0].addEventListener('mousedown', (evt: any) => {
        if (evt.button == 2)
          App.Field.ContextObjectMenu(evt.x, evt.y, id);
      });
    this.ListElement.scrollTop = this.ListElement.scrollHeight - this.ListElement.clientHeight;
  }
}