import { MForm } from "../mlib/mform";
import { MWindow } from "../mlib/mwindow";
import { MPanel } from "../mlib/mpanel";
import { MFixButton } from "../ui/mfixbutton";
import { MImage } from "../mlib/mimage";
import { MMedalButton } from "../ui/mmedalbutton";
import { MLabel } from "../mlib/mlabel";
import { MTextBox } from "../mlib/mtextbox";
import { PlayerData, CharacterInfo } from "../info/playerdata";
import { MAlign, MVAlign } from "../mlib/mcontrol";
import { MCharacterButton } from "../ui/mcharbutton";
import { MSelectedGroup } from "../mlib/mphpanel";
import { App } from "../global/app";
import { PlayerClassType} from "../service/info";
import { MoonChar } from "../service/response";

export class CharacterForm extends MForm {
  public win: MWindow;
  public lpan: MPanel;
  public pnew: MPanel;
  public pstart: MPanel;
  public fixbut: MFixButton;
  public fixbut2: MFixButton;
  public icreatenew: MImage;
  public bcreatenew: MFixButton;

  public chars: MCharacterButton[];
  public medals: MMedalButton[];
  public namelabel: MLabel;
  public lError: MLabel;
  public charName: MTextBox;
  public startmedal: MMedalButton;
  public charLevel: MLabel;
  public charLabel: MLabel;

  public PlayerData: PlayerData;
  public CharacterInfo: CharacterInfo;

  constructor() {
    super();
    this.backgroundColor = "#231C19";
    this.transparent = false;
    this.BorderVisible = false;

    this.PlayerData = App.PlayerData;
    this.CharacterInfo = null;
    if (this.PlayerData.CharacterList.length > 0)
      this.CharacterInfo = this.PlayerData.CharacterList[0];

    this.win = new MWindow();
    this.win.Text = "Выбор персонажа";
    this.win.Font = "32px CoreRhino-Regular";
    this.win.Width = 1100;
    this.win.Height = 600;
    this.win.Align = MAlign.Center;
    this.win.VAlign = MVAlign.Middle;
    this.controls.Add(this.win);

    this.lpan = new MPanel();
    this.lpan.X = 8;
    this.lpan.Y = 72;
    this.lpan.Width = 341;
    this.lpan.Height = 520;
    this.win.Controls.Add(this.lpan);

    // ---------------------------------------------------
    // -- New character
    // ---------------------------------------------------

    this.pnew = new MPanel();
    this.pnew.X = 347;
    this.pnew.Y = 72;
    this.pnew.Width = 745;
    this.pnew.Height = 520;
    this.pnew.Visible = this.CharacterInfo == null;
    this.win.Controls.Add(this.pnew);

    this.icreatenew = new MImage();
    this.icreatenew.PackName = "buttons";
    this.icreatenew.ImageName = "sel_char_button";
    this.icreatenew.X = 0;
    this.icreatenew.Y = 0;
    this.icreatenew.Height = 16;
    this.lpan.Controls.Add(this.icreatenew);

    this.bcreatenew = new MFixButton();
    this.bcreatenew.Align = MAlign.Center;
    this.bcreatenew.PackHolderNames = ["sel_add_char_button", "sel_add_char_button_hover", "sel_add_char_button_push"];
    this.bcreatenew.Font = "18px CoreRhino-Regular";
    this.bcreatenew.Text = "CREATE CHARACTER";
    this.bcreatenew.TextMarginLeft = 24;
    this.bcreatenew.MouseClick = (s, e) => {
      this.charName.Text = "";
      this.pstart.Visible = false;
      this.pnew.Visible = true;
      this.pnew.DetermineMouseHover(App.StoreXYPos);
      this.SetActiveHtmls();
    };
    this.lpan.Controls.Add(this.bcreatenew);

    this.medals = [];
    var fm = new MMedalButton();
    var fmg = fm.CreateSelectedGroup();
    fm.X = 20;
    fm.Y = 20;
    fm.ClassType = PlayerClassType.Knight;
    this.pnew.Controls.Add(fm);
    this.medals.push(fm);

    fm = new MMedalButton();
    fm.Add2SelectedGroup(fmg);
    fm.X = 200;
    fm.Y = 20;
    fm.ClassType = PlayerClassType.Mage;
    this.pnew.Controls.Add(fm);
    this.medals.push(fm);

    fm = new MMedalButton();
    fm.Add2SelectedGroup(fmg);
    fm.X = 380;
    fm.Y = 20;
    fm.ClassType = PlayerClassType.Archer;
    this.pnew.Controls.Add(fm);
    this.medals.push(fm);

    fm = new MMedalButton();
    fm.Add2SelectedGroup(fmg);
    fm.X = 560;
    fm.Y = 20;
    fm.ClassType = PlayerClassType.Priest;
    this.pnew.Controls.Add(fm);
    this.medals.push(fm);

    this.namelabel = new MLabel();
    this.namelabel.X = 0;
    this.namelabel.Y = 300;
    this.namelabel.Width = this.pnew.Width;
    this.namelabel.Align = MAlign.Center;
    this.namelabel.TextAlign = MAlign.Center;
    this.namelabel.Text = "Введите имя персонажа:";
    this.pnew.Controls.Add(this.namelabel);

    this.lError = new MLabel();
    this.lError.X = 0;
    this.lError.Y = 386;
    this.lError.Width = this.pnew.Width;
    this.lError.Align = MAlign.Center;
    this.lError.TextAlign = MAlign.Center;
    this.lError.Color = "#E35D52";
    this.lError.Text = "";
    this.pnew.Controls.Add(this.lError);

    var ok = new MFixButton();
    ok.X = 0;
    ok.Y = 440;
    ok.Color = "#FFFCEE";
    ok.ShadowColor = "#000000";
    ok.Text = "Создать";
    ok.Align = MAlign.Center;
    ok.MouseClick = (s, e) => {
      var name = this.charName.Text.trim();
      this.lError.Text = "";
      if (name.length < 3) {
        this.lError.Text = "Имя должно содержать не менее 3-х символов";
        return;
      }
      if (name.length > 24) {
        this.lError.Text = "Имя персонажа не может быть больше 24-х символов";
        return;
      }
      if (name.split(' ').length > 1) {
        this.lError.Text = "Неверное имя персонажа";
        return;
      }
      this.CreateCharacter();
    };
    this.pnew.Controls.Add(ok);

    this.charName = new MTextBox();
    this.charName.BackgroundColor = "#C0A383";
    this.charName.Y = 340;
    this.charName.Width = 240;
    this.charName.Align = MAlign.Center;
    this.charName.Text = "";
    this.pnew.Controls.Add(this.charName);

    // ---------------------------------------------------
    // -- Start panel
    // ---------------------------------------------------

    this.pstart = new MPanel();
    this.pstart.X = 347;
    this.pstart.Y = 72;
    this.pstart.Width = 745;
    this.pstart.Height = 520;
    this.pstart.Visible = this.CharacterInfo != null;
    this.win.Controls.Add(this.pstart);

    this.startmedal = new MMedalButton();
    this.startmedal.CreateSelectedGroup();
    this.startmedal.Y = 20;
    this.startmedal.Align = MAlign.Center;
    this.pstart.Controls.Add(this.startmedal);

    this.charLevel = new MLabel();
    this.charLevel.X = 0;
    this.charLevel.Y = 300;
    this.charLevel.Width = this.pnew.Width;
    this.charLevel.Align = MAlign.Center;
    this.charLevel.TextAlign = MAlign.Center;
    this.charLevel.Text = "---";
    this.pstart.Controls.Add(this.charLevel);

    this.charLabel = new MLabel();
    this.charLabel.X = 0;
    this.charLabel.Y = 360;
    this.charLabel.Width = this.pnew.Width;
    this.charLabel.Align = MAlign.Center;
    this.charLabel.TextAlign = MAlign.Center;
    this.charLabel.Font = "32px CoreRhino-Bold";
    this.charLabel.Text = "---";
    this.pstart.Controls.Add(this.charLabel);

    var start = new MFixButton();
    start.X = 0;
    start.Y = 440;
    start.Color = "#FFFCEE";
    start.ShadowColor = "#000000";
    start.Text = "Играть";
    start.Align = MAlign.Center;
    start.MouseClick = (s, e) => {
      App.Game.CharacterId = this.CharacterInfo.CharacterId;
      App.Game.InitProc_InitPlayer();
    };
    this.pstart.Controls.Add(start);

    this.ScanCharacter(null);

    this.SetActiveHtmls();
  }

  public CreateCharacter(): void {
    let moonChar: MoonChar = new MoonChar();
    moonChar.userGuid = App.UserGuid;
    moonChar.name = this.charName.Text.trim();
    moonChar.class = (this.medals[0].SelectedGroup.Selected as MMedalButton).ClassType;
    moonChar.level = 1;
    App.Hub.Request("InsertMoonCharacter", moonChar, (res) => {
      if (res.errorCode == 0) {
        this.pstart.Visible = true;
        this.pstart.DetermineMouseHover(App.StoreXYPos);
        this.pnew.Visible = false;
        this.SetActiveHtmls();
        this.ScanCharacter(res.charGuid);
      } else
        this.lError.Text = res.errorMessage;
    });
  }

  public ScanCharacter(currentGuid: string) {
    App.Hub.Request("GetMoonCharacterList", App.UserGuid, (res) => {
        if (res.errorCode == 0) {
          this.CharacterInfo = null;
          this.PlayerData.CharacterList = [];
          if (res.chars)
            res.chars.sort((c1, c2) => (new Date(c2.accessDate)).getTime() - (new Date(c1.accessDate)).getTime()).forEach(char => {
              var lchar = new CharacterInfo();
              lchar.ClassType = char.class;
              lchar.CharacterName = char.name;
              lchar.Level = char.level;
              lchar.CharacterId = char.moonCharacterGuid;
              if (lchar.CharacterId == currentGuid)
                this.CharacterInfo = lchar;
              this.PlayerData.CharacterList.push(lchar);
            });
          if (!this.CharacterInfo && this.PlayerData.CharacterList.length)
            this.CharacterInfo = this.PlayerData.CharacterList[0];
          this.CreateCharacterListButtons(currentGuid == null);
          if (this.CharacterInfo) {
            this.pstart.Visible = true;
            this.pstart.DetermineMouseHover(App.StoreXYPos);
            this.pnew.Visible = false;
            this.SetActiveHtmls();
            this.FillStartCharacter();
          }
        } else
          this.lError.Text = res.errorMessage;
      });
  }

  public CreateCharacterListButtons(first) {
    if (this.chars)
      this.chars.forEach(char => {
        this.lpan.Controls.Remove(char);
      });
    this.chars = [];
    var idx = 4;
    var group: MSelectedGroup = null;
    this.PlayerData.CharacterList.forEach(pchar => {
      var char = new MCharacterButton();
      char.X = 0;
      char.Y = idx;
      char.CharInfo = pchar;
      char.Text = pchar.CharacterName;
      char.MouseClick = (s, e) => {
        this.CharacterInfo = pchar;
        this.FillStartCharacter();
        this.pstart.Visible = true;
        this.pstart.DetermineMouseHover(App.StoreXYPos);
        this.pnew.Visible = false;
        this.SetActiveHtmls();
      };
      this.lpan.Controls.Add(char);
      this.chars.push(char);
      if (!group)
        group = char.CreateSelectedGroup();
      else
        char.Add2SelectedGroup(group);
      idx += 68;
    });
    if(this.chars.length)
      this.chars[0].Select();
    //if (!first && this.chars.length > 0)
    //  this.chars[this.chars.length - 1].Select();
    this.icreatenew.Y = idx - 1;
    this.bcreatenew.Y = idx + 3;
    if (this.chars.length == 0) this.bcreatenew.Y += 2;
    this.icreatenew.Visible = this.chars.length > 0;
    this.bcreatenew.Visible = this.chars.length < 5;
  }

  public FillStartCharacter() {
    this.startmedal.ClassType = this.CharacterInfo.ClassType;
    this.charLevel.Text = "Уровень " + this.CharacterInfo.Level.toFixed(0);
    this.charLabel.Text = this.CharacterInfo.CharacterName;
  }

  public SetActiveHtmls() {
    /*if (this.pnew.Visible)
      this.pnew.Activate();
    else
      this.pnew.Deactivate();*/
  }

  public ResizeWindow(): void {
    this.width = App.Game.Width;
    this.height = App.Game.Height;
    super.ResizeWindow();
  }

  public OnDispatch(): void {
    super.OnDispatch();
  }

  public OnPaint(): void {
    super.OnPaint();
  }

  protected OnLayerPaint() {
    super.OnLayerPaint();
  }

  protected OnActivate() {
    super.OnActivate();
    this.SetActiveHtmls();
  }

}
