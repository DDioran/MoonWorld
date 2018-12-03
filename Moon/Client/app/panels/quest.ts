import { MoonMob } from "../objs/mob";
import { EventArgs } from "../mlib/events";
import { App } from "../global/app";
import { MFloat } from "../ui/mfloat";
import { NpcTalkInfo } from "../service/moon-info";

export class QuestPanel extends MFloat {
  protected QuestElement: HTMLElement;
  protected main: HTMLElement;
  protected mainText: HTMLElement;
  protected mainQuest: HTMLElement;
  protected mainOk: HTMLElement;
  public Npc: MoonMob;
  public Info: NpcTalkInfo;

  constructor(npc: MoonMob, info: NpcTalkInfo) {
    super(100, 100);
    this.width = 500;
    this.height = 700;
    this.Npc = npc;
    this.Info = info;
    this.GenerateHtmlTemplate();
  }
  protected OnAjustmentHtml() {
    super.OnAjustmentHtml();
    if (this.HolderElement) {
      this.HolderElement.style.width = this.width.toFixed(0) + 'px';
      this.HolderElement.style.height = this.height.toFixed(0) + 'px';
    }
  }
  protected GenerateHtmlTemplate() {
    var onesep = "<div class='m-context-panel-separator'><div></div></div>";
    var dblsep = "<div class='m-context-panel-doubleseparator'><div></div></div>";
    var quest = "";
    this.Info.questCompleteList.forEach(q => {
      quest += `<div>? ${q.title}</div>`;
    });
    this.Info.questOfferList.forEach(q => {
      quest += `<div>! ${q.title}</div>`;
    });
    var content =
      `<div class='m-context-panel-label'>${this.Info.title}</div>
        ${dblsep}
        <div class='m-context-panel-body' mid='main'>
          <div mid='text'>
            ${this.Info.description}
          </div>
          <div mid='quest'>
            ${onesep}
            ${quest}
          </div>
          <div class='m-window-float-buttons'>
            ${onesep}
            <span mid='ok' class='m-window-float-button'><span>Ок</span></span>
          </div>
        </div>`;
    this.HtmlTemplate = `<div class='m-context-panel'>${content}</div>`;
  }
  public CreateControl() {
    super.CreateControl();
    this.QuestElement = this.HtmlNode.childNodes[0].childNodes[0] as HTMLElement;
    this.HolderElement.style.backgroundColor = this.bgColor;
    this.HolderElement.style.padding = '3px';
    this.main = this.QuestElement.querySelector("div[mid='main']");
    this.mainText = this.main.querySelector("div[mid='text']");
    this.mainQuest = this.main.querySelector("div[mid='quest']");
    this.mainOk = this.main.querySelector("div[mid='ok']");
  }
}