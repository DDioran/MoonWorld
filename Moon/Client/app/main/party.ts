import { MPlaceHolderPanel } from "../mlib/mphpanel";
import { MoonMob, MoonMobList } from "../objs/mob";
import { MContextMenu } from "../ui/mcontextmenu";
import { JsPack, JsXSprite } from "../global/resx";
import { App } from "../global/app";
import { PlayerClassType, MoonObjectType } from "../service/info";
import { MouseArgs } from "../mlib/events";
import { Gpx } from "../mlib/mgfx";

export class MPartyPlayer extends MPlaceHolderPanel {
  public MainPlayer: boolean;
  public Player: MoonMob;
  private pack: JsPack;
  constructor(Y: number, Main: boolean) {
    super(0, Y);
    this.transparent = true;
    this.BorderVisible = false;
    this.MainPlayer = Main;
    this.width = Main ? 224 : 157;
    this.height = Main ? 72 : 51;
  }

  public AfterPaint() {
    if (!this.Player) return;
    this.pack = App.Resx.GetPackResource("ui-player");
    var ration = this.MainPlayer ? 1 : 0.7;
    var sfnt = this.MainPlayer ? 13 : 9;
    var mfnt = this.MainPlayer ? 16 : 11;
    var bfnt = this.MainPlayer ? 20 : 14;
    let pSpr: JsXSprite = this.pack.ss.s[this.Player.ClassType];
    Gpx.DrawImageExactWH(pSpr.img, this.gx, this.gy, pSpr.img.width, pSpr.img.height, pSpr.img.width * ration, pSpr.img.height * ration);
    var col1 = "#0F9FFF";
    var col2 = "#0D7DDD";
    if (this.Player.ClassType == PlayerClassType.Archer) {
      col1 = "#FFFF00";
      col2 = "#DDDD00";
    }
    if (this.Player.ClassType == PlayerClassType.Knight) {
      col1 = "#CCCCCC";
      col2 = "#AAAAAA";
    }
    if (this.Player.ClassType == PlayerClassType.Priest) {
      col1 = "#FFEEDD";
      col2 = "#DDBBAA";
    }
    Gpx.FillRect("#00FF00", this.gx + 70.5 * ration, this.gy + 28.5 * ration, (145 * this.Player.HP / this.Player.MaxHP) * ration, 8 * ration);
    Gpx.FillRect("#00DD00", this.gx + 70.5 * ration, this.gy + 35.5 * ration, (145 * this.Player.HP / this.Player.MaxHP) * ration, 5 * ration);
    Gpx.FillRect(col1, this.gx + 70.5 * ration, this.gy + 47.5 * ration, 145 * ration, 8 * ration);
    Gpx.FillRect(col2, this.gx + 70.5 * ration, this.gy + 54.5 * ration, 145 * ration, 5 * ration);
    Gpx.Text(this.Player.Active ? "Yellow" : "#c0c0c0", ((this.Player.Party && this.Player.Party.leader == this.Player.PlayerId) ? "* " : "") + this.Player.Name, this.gx + 70 * ration, this.gy + 21 * ration, mfnt + "px CoreRhino-Regular");
    Gpx.Text("Yellow", this.Player.Level.toFixed(0), this.gx + 45 * ration, this.gy + 58 * ration, bfnt + "px CoreRhino-Regular");
    Gpx.FillRect("#FFFF00", this.gx + 8.5 * ration, this.gy + 66.3 * ration, (210 * this.Player.Exp / this.Player.MaxExp) * ration, 0.7 * ration);
    var text = this.Player.HP.toFixed(0) + "/" + this.Player.MaxHP.toFixed(0);
    var width = Gpx.MeasureText(text, "14px CoreRhino-Regular").width;
    Gpx.Text2("White", "Black", text, this.gx + (70 + (145 - width) / 2) * ration, this.gy + 39 * ration, sfnt + "px CoreRhino-Regular");
    text = "100/100";
    width = Gpx.MeasureText(text, "14px CoreRhino-Regular").width;
    Gpx.Text2("White", "Black", text, this.gx + (70 + (145 - width) / 2) * ration, this.gy + 58 * ration, sfnt + "px CoreRhino-Regular");
  }

  protected OnPropagateMouseDown(Event: MouseArgs): void {
    Event.Propagate = false;
  }
  protected OnPropagateMouseUp(Event: MouseArgs): void {
    Event.Propagate = false;
  }
  protected OnPropagateMouseClick(Event: MouseArgs): void {
    Event.Propagate = false;
    App.Field.DropContextPanels();
    if (Event.Button == 2) {
      var menu: MContextMenu;
      if (this.Player.Party) {
        if (App.Field.MoonPlayer == this.Player) {
          menu = new MContextMenu(Event.X, Event.Y, this.Player, ['Выйти из группы']);
          menu.ContextMenuClick = (s, e) => {
            if (e.Index == 0) {
              App.Hub.LeaveGroup(App.PlayerGuid);
            }
          }
        } else
          if (this.Player.Party.leader == App.Field.MoonPlayer.PlayerId) {
            menu = new MContextMenu(Event.X, Event.Y, this.Player, ['Исключить из группы', 'Передать лидерство', '', 'Написать игроку', 'Информация о персонаже']);
            menu.ContextMenuClick = (s, e) => {
              if (e.Index == 0)
                App.Hub.RemoveFromGroup(App.PlayerGuid, this.Player.PlayerId);
              if (e.Index == 1)
                App.Hub.SetLeaderGroup(App.PlayerGuid, this.Player.PlayerId);
            }
          }
          else {
            menu = new MContextMenu(Event.X, Event.Y, this.Player, ['Написать игроку', 'Информация о персонаже']);
          }
        menu.Activate();
      }
    }
    if (Event.Button == 0)
      App.Hub.PlayerSelectTo(App.PlayerGuid, MoonObjectType.Mob, this.Player.MobId, 2);
  }
}

export class MParty extends MPlaceHolderPanel {
  public Items: MPartyPlayer[] = [];
  constructor(X: number, Y: number) {
    super(X, Y);
    this.transparent = true;
    this.BorderVisible = false;
    this.width = 224;
    this.height = 286;
    var ppl = new MPartyPlayer(0, true);
    this.controls.Add(ppl);
    this.Items.push(ppl);
    for (var i = 0, ox = 76; i < 4; i++ , ox += 53) {
      ppl = new MPartyPlayer(ox, false);
      ppl.Visible = false;
      this.controls.Add(ppl);
      this.Items.push(ppl);
    }
  }
  public OnDispatch() {
    super.OnDispatch();
    if (App.Field.MoonPlayer) {
      var idx = 0;
      this.Items.forEach(i => i.Visible = false);
      this.Items[idx].Player = App.Field.MoonPlayer;
      this.Items[idx].Visible = true;
      idx++;
      for (var i = idx; i < 4 + idx; i++) {
        this.Items[i].Player = null;
        this.Items[i].Visible = false;
      }
      if (App.Field.MoonPlayer.Party)
        App.Field.MoonPlayer.Party.items.forEach(p => {
          if (App.Field.MoonPlayer.PlayerId == p) return;
          this.Items[idx].Player = MoonMobList.FindPlayer(p);
          this.Items[idx].Visible = true;
          idx++;
        });
    }
  }



}