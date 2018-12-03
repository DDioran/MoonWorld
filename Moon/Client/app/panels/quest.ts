import { MoonMob } from "../objs/mob";
import { EventArgs } from "../mlib/events";
import { App } from "../global/app";
import { MFloat } from "../ui/mfloat";
import { NpcTalkInfo, NpcTalkQuestInfo } from "../service/info";

export class QuestPanel extends MFloat {
  protected QuestElement: HTMLElement;
  protected main: HTMLElement;
  protected mainOk: HTMLElement;
  protected quest: HTMLElement;
  protected offer: HTMLElement;
  protected offerTitle: HTMLElement;
  protected offerText: HTMLElement;
  protected offerYes: HTMLElement;
  protected offerNo: HTMLElement;
  protected selCode: string;
  protected exp: HTMLElement;
  protected coin: HTMLElement;
  public Npc: MoonMob;
  public Info: NpcTalkInfo;
  protected selInfo: NpcTalkQuestInfo;

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
      quest += `<div class='m-context-panel-select' code='${q.itemCode}' qt='0'>? ${q.title}</div>`;
    });
    this.Info.questOfferList.forEach(q => {
      quest += `<div class='m-context-panel-select' code='${q.itemCode}' qt='1'>! ${q.title}</div>`;
    });
    var content =
      `<div class='m-context-panel-label'>${this.Info.title}</div>
       ${dblsep}
       <div class='m-context-panel-body' mid='main'>
         <div>${this.Info.description}</div>
         <div mid='quest'>
           ${onesep}
           ${quest}
         </div>
         <div class='m-window-float-buttons'>
           ${onesep}
           <span class='m-window-float-button'><span mid='ok'>Уйти</span></span>
         </div>
       </div>
       <div class='m-context-panel-body hide' mid='offer'>
         <div mid='title'></div>
         <br/>
         <div mid='text'></div>
         <br/>
         <div>Награда:</div>
         <div><div class='quest-main-award'>Опыт:</div><div mid='exp' class='quest-main-award-value'></div></div>
         <div><div class='quest-main-award'>Монеты:</div><div mid='coin' class='quest-main-award-value'></div></div>
         <div class='m-window-float-buttons'>
           ${onesep}
           <span class='m-window-float-button'><span mid='yes'>Принять</span></span>
           <span class='m-window-float-button'><span mid='no'>Отмена</span></span>
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
    this.mainOk = this.main.querySelector("span[mid='ok']");
    this.quest = this.main.querySelector("div[mid='quest']");
    this.offer = this.QuestElement.querySelector("div[mid='offer']");
    this.offerTitle = this.offer.querySelector("div[mid='title']");
    this.offerText = this.offer.querySelector("div[mid='text']");
    this.offerYes = this.offer.querySelector("span[mid='yes']");
    this.offerNo = this.offer.querySelector("span[mid='no']");
    this.exp = this.offer.querySelector("div[mid='exp']");
    this.coin = this.offer.querySelector("div[mid='coin']");

    this.mainOk.addEventListener('click', (evt) => {
      App.Field.QuestPanel.Hide();
      App.Field.QuestPanel.Deactivate();
      App.Field.QuestPanel = null;
      this.SelfRemove();
    });

    for (var i = 0; i < this.quest.children.length; i++) {
      this.quest.children.item(i).addEventListener('click', (evt) => {
        var code = (evt.currentTarget as any).getAttribute('code');
        if (!code) return;
        var type = (evt.currentTarget as any).getAttribute('qt');
        this.main.style.display = 'none';
        this.offer.style.display = 'block';
        this.selInfo = type == 1 ?
          this.Info.questOfferList.find(q => q.itemCode == code) :
          this.Info.questCompleteList.find(q => q.itemCode == code);
        this.offerTitle.innerText = this.selInfo.title;
        this.offerText.innerText = this.selInfo.description;
        this.exp.innerText = this.selInfo.experience.toFixed(0);
        this.coin.innerText = this.selInfo.coins.toFixed(0);
      });
    }

    this.offerYes.addEventListener('click', (evt) => {
    });
    this.offerNo.addEventListener('click', (evt) => {
      this.main.style.display = 'block';
      this.offer.style.display = 'none';
    });

  }
}