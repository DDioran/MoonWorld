import { MPlaceHolderPanel } from "../mlib/mphpanel";
import { MChatTab } from "./chattab";
import { MChatList } from "./chatlist";
import { MChatInput } from "./chatinput";
import { App } from "../global/app";
import { Gpx } from "../mlib/mgfx";

export enum MChatType {
  TabAll,
  TabCommon,
  TabFight,
  TabGroup
}

export class MChat extends MPlaceHolderPanel {
  public tabs: MChatTab[];
  public chats: MChatList[];
  public input: MChatInput;
  constructor() {
    super();
    this.transparent = true;
    this.BorderVisible = false;
    this.tabs = [];
    var tab = new MChatTab(5.5, 2.5, 80, 28, "Все", MChatType.TabAll);
    tab.CreateSelectedGroup();
    tab.SelectedGroup.ControlSelect = (s, e) => {
      this.chats.forEach(c => {
        c.Visible = c.ChatType == (s as MChatTab).ChatType;
      });
    }
    this.controls.Add(tab);
    this.tabs.push(tab);
    tab = new MChatTab(5.5 + 80, 2.5, 120, 28, "Общий", MChatType.TabCommon);
    tab.Add2SelectedGroup(this.tabs[0].SelectedGroup);
    this.controls.Add(tab);
    this.tabs.push(tab);
    tab = new MChatTab(5.5 + 200, 2.5, 80, 28, "Бой", MChatType.TabFight);
    tab.Add2SelectedGroup(this.tabs[0].SelectedGroup);
    this.controls.Add(tab);
    this.tabs.push(tab);
    tab = new MChatTab(5.5 + 280, 2.5, 140, 28, "Группа", MChatType.TabGroup);
    tab.Add2SelectedGroup(this.tabs[0].SelectedGroup);
    this.controls.Add(tab);
    this.tabs.push(tab);
    this.chats = [];
    var chat = new MChatList(5, 33, 550, 230, MChatType.TabAll);
    this.controls.Add(chat);
    this.chats.push(chat)
    chat = new MChatList(5, 33, 550, 230, MChatType.TabCommon);
    chat.Visible = false;
    this.controls.Add(chat);
    this.chats.push(chat)
    chat = new MChatList(5, 33, 550, 230, MChatType.TabFight);
    chat.Visible = false;
    this.controls.Add(chat);
    this.chats.push(chat)
    chat = new MChatList(5, 33, 550, 230, MChatType.TabGroup);
    chat.Visible = false;
    this.controls.Add(chat);
    this.chats.push(chat)
    this.input = new MChatInput(5.5, 266.5, 550, 28);
    this.input.EnterText = (s, e) => {
      App.Hub.MessageChat(App.PlayerGuid, (this.tabs[0].SelectedGroup.Selected as MChatTab).ChatType, this.input.Text);
      this.input.Text = "";
    }
    this.controls.Add(this.input);
  }
  public OnInit() {
    super.OnInit();
  }
  public AfterPaint() {
    Gpx.FillRect("rgba(120,120,120,0.5)", this.gx, this.gy, this.width, this.height);
    Gpx.DrawRect("rgba(250,250,200,0.6)", this.gx + 2.5, this.gy + 2.5 + 28, this.width - 5, this.height - 5 - 28);

    super.AfterPaint();

    /*Gpx.DrawRect("rgba(255,255,200,0.6)", this.gx + 2.5 + 3, this.gy + 2.5, 130, 28);
    Gpx.DrawRect("rgba(250,250,200,0.6)", this.gx + 2.5 + 3 + 130, this.gy + 4.5, 130, 26);
    Gpx.DrawRect("rgba(250,250,200,0.6)", this.gx + 2.5 + 3 + 260, this.gy + 4.5, 130, 26);
    Gpx.DrawRect("rgba(250,250,200,0.6)", this.gx + 2.5 + 3 + 390, this.gy + 4.5, 130, 26);*/

    /*var text = App.MoonGame.value_speed.toFixed(2);
    var width = GG.MeasureText(text, "16px Roboto").width;
    Gpx.TText("Yellow", text, this.gx + 2.5 + 4 + (130 - width) / 2, this.gy + 2.5 + 1, "15px Roboto");*/


    /*
    if (App.Field.MoonPlayer && App.Field.MoonPlayer.TargetId > 0) {
      let mob: MoonMob = App.Field.MoonMobList.ItemList.filter(i => (i as MoonMob).MobId == App.Field.MoonPlayer.TargetId)[0] as MoonMob;
      var text = mob.Level.toFixed(0);
      var width = GG.MeasureText(text, "22px Roboto").width;
      Gpx.TText2("Yellow", "Black", text, this.gx + (32 - width) / 2, this.gy + 1, "21px Roboto-Bold");
      Gpx.DrawCircle("Yellow", this.gx + 15, this.gy + 16, 13);
      Gpx.TText("Yellow", mob.Name, this.gx + 36, this.gy, "24px Roboto-Bold");
      var hpLen = (this.width - 4) * mob.HP / mob.MaxHP;
      Gpx.FillRect("rgba(21, 17, 17, 0.2)", this.gx, this.gy + 30, this.width, 32);
      Gpx.DrawRect("#394750", this.gx, this.gy + 30, this.width, 32);
      Gpx.DrawRect("#363D45", this.gx + 1, this.gy + 30 + 1, this.width - 2, 30);
      Gpx.FillRect("#EE1B22", this.gx + 2, this.gy + 30 + 2, hpLen, 16);
      Gpx.FillRect("#B10B0F", this.gx + 2, this.gy + 30 + 2 + 16, hpLen, 12);
      var text = mob.HP.toFixed(0) + "/" + mob.MaxHP.toFixed(0);
      var width = GG.MeasureText(text, "24px Roboto").width;
      Gpx.TText2("Yellow", "Black", text, this.gx + (this.width - width) / 2, this.gy + 30, "23px Roboto-Bold");
    }
    */
  }
}