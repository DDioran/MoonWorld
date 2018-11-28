"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var mform_1 = require("../mlib/mform");
var mwindow_1 = require("../mlib/mwindow");
var mpanel_1 = require("../mlib/mpanel");
var mfixbutton_1 = require("../ui/mfixbutton");
var mimage_1 = require("../mlib/mimage");
var mmedalbutton_1 = require("../ui/mmedalbutton");
var mlabel_1 = require("../mlib/mlabel");
var mtextbox_1 = require("../mlib/mtextbox");
var playerdata_1 = require("../info/playerdata");
var mcontrol_1 = require("../mlib/mcontrol");
var mcharbutton_1 = require("../ui/mcharbutton");
var app_1 = require("../global/app");
var moon_info_1 = require("../service/moon-info");
var CharacterForm = /** @class */ (function (_super) {
    __extends(CharacterForm, _super);
    function CharacterForm() {
        var _this = _super.call(this) || this;
        _this.backgroundColor = "#231C19";
        _this.transparent = false;
        _this.BorderVisible = false;
        _this.PlayerData = app_1.App.PlayerData;
        _this.CharacterInfo = null;
        if (_this.PlayerData.CharacterList.length > 0)
            _this.CharacterInfo = _this.PlayerData.CharacterList[0];
        _this.win = new mwindow_1.MWindow();
        _this.win.Text = "Выбор персонажа";
        _this.win.Font = "32px Roboto-Bold";
        _this.win.Width = 1100;
        _this.win.Height = 600;
        _this.win.Align = mcontrol_1.MAlign.Center;
        _this.win.VAlign = mcontrol_1.MVAlign.Middle;
        _this.controls.Add(_this.win);
        _this.lpan = new mpanel_1.MPanel();
        _this.lpan.X = 8;
        _this.lpan.Y = 72;
        _this.lpan.Width = 341;
        _this.lpan.Height = 520;
        _this.win.Controls.Add(_this.lpan);
        // ---------------------------------------------------
        // -- New character
        // ---------------------------------------------------
        _this.pnew = new mpanel_1.MPanel();
        _this.pnew.X = 347;
        _this.pnew.Y = 72;
        _this.pnew.Width = 745;
        _this.pnew.Height = 520;
        _this.pnew.Visible = _this.CharacterInfo == null;
        _this.win.Controls.Add(_this.pnew);
        _this.icreatenew = new mimage_1.MImage();
        _this.icreatenew.PackName = "buttons";
        _this.icreatenew.ImageName = "sel_char_button";
        _this.icreatenew.X = 0;
        _this.icreatenew.Y = 0;
        _this.icreatenew.Height = 16;
        _this.lpan.Controls.Add(_this.icreatenew);
        _this.bcreatenew = new mfixbutton_1.MFixButton();
        _this.bcreatenew.Align = mcontrol_1.MAlign.Center;
        _this.bcreatenew.PackHolderNames = ["sel_add_char_button", "sel_add_char_button_hover", "sel_add_char_button_push"];
        _this.bcreatenew.Font = "18px Roboto";
        _this.bcreatenew.Text = "CREATE CHARACTER";
        _this.bcreatenew.TextMarginLeft = 24;
        _this.bcreatenew.MouseClick = function (s, e) {
            _this.charName.Text = "";
            _this.pstart.Visible = false;
            _this.pnew.Visible = true;
            _this.pnew.DetermineMouseHover(app_1.App.StoreXYPos);
            _this.SetActiveHtmls();
        };
        _this.lpan.Controls.Add(_this.bcreatenew);
        _this.medals = [];
        var fm = new mmedalbutton_1.MMedalButton();
        var fmg = fm.CreateSelectedGroup();
        fm.X = 20;
        fm.Y = 20;
        fm.ClassType = moon_info_1.PlayerClassType.Knight;
        _this.pnew.Controls.Add(fm);
        _this.medals.push(fm);
        fm = new mmedalbutton_1.MMedalButton();
        fm.Add2SelectedGroup(fmg);
        fm.X = 200;
        fm.Y = 20;
        fm.ClassType = moon_info_1.PlayerClassType.Mage;
        _this.pnew.Controls.Add(fm);
        _this.medals.push(fm);
        fm = new mmedalbutton_1.MMedalButton();
        fm.Add2SelectedGroup(fmg);
        fm.X = 380;
        fm.Y = 20;
        fm.ClassType = moon_info_1.PlayerClassType.Archer;
        _this.pnew.Controls.Add(fm);
        _this.medals.push(fm);
        fm = new mmedalbutton_1.MMedalButton();
        fm.Add2SelectedGroup(fmg);
        fm.X = 560;
        fm.Y = 20;
        fm.ClassType = moon_info_1.PlayerClassType.Priest;
        _this.pnew.Controls.Add(fm);
        _this.medals.push(fm);
        _this.namelabel = new mlabel_1.MLabel();
        _this.namelabel.X = 0;
        _this.namelabel.Y = 300;
        _this.namelabel.Width = _this.pnew.Width;
        _this.namelabel.Align = mcontrol_1.MAlign.Center;
        _this.namelabel.TextAlign = mcontrol_1.MAlign.Center;
        _this.namelabel.Text = "Введите имя персонажа:";
        _this.pnew.Controls.Add(_this.namelabel);
        _this.lError = new mlabel_1.MLabel();
        _this.lError.X = 0;
        _this.lError.Y = 386;
        _this.lError.Width = _this.pnew.Width;
        _this.lError.Align = mcontrol_1.MAlign.Center;
        _this.lError.TextAlign = mcontrol_1.MAlign.Center;
        _this.lError.Color = "#E35D52";
        _this.lError.Text = "";
        _this.pnew.Controls.Add(_this.lError);
        var ok = new mfixbutton_1.MFixButton();
        ok.X = 0;
        ok.Y = 440;
        ok.Color = "#FFFCEE";
        ok.ShadowColor = "#000000";
        ok.Text = "Создать";
        ok.Align = mcontrol_1.MAlign.Center;
        ok.MouseClick = function (s, e) {
            var name = _this.charName.Text.trim();
            _this.lError.Text = "";
            if (name.length < 3) {
                _this.lError.Text = "Имя должно содержать не менее 3-х символов";
                return;
            }
            if (name.length > 24) {
                _this.lError.Text = "Имя персонажа не может быть больше 24-х символов";
                return;
            }
            if (name.split(' ').length > 1) {
                _this.lError.Text = "Неверное имя персонажа";
                return;
            }
            _this.CreateCharacter();
        };
        _this.pnew.Controls.Add(ok);
        _this.charName = new mtextbox_1.MTextBox();
        _this.charName.BackgroundColor = "#C0A383";
        _this.charName.Y = 340;
        _this.charName.Width = 240;
        _this.charName.Align = mcontrol_1.MAlign.Center;
        _this.charName.Text = "";
        _this.pnew.Controls.Add(_this.charName);
        // ---------------------------------------------------
        // -- Start panel
        // ---------------------------------------------------
        _this.pstart = new mpanel_1.MPanel();
        _this.pstart.X = 347;
        _this.pstart.Y = 72;
        _this.pstart.Width = 745;
        _this.pstart.Height = 520;
        _this.pstart.Visible = _this.CharacterInfo != null;
        _this.win.Controls.Add(_this.pstart);
        _this.startmedal = new mmedalbutton_1.MMedalButton();
        _this.startmedal.CreateSelectedGroup();
        _this.startmedal.Y = 20;
        _this.startmedal.Align = mcontrol_1.MAlign.Center;
        _this.pstart.Controls.Add(_this.startmedal);
        _this.charLevel = new mlabel_1.MLabel();
        _this.charLevel.X = 0;
        _this.charLevel.Y = 300;
        _this.charLevel.Width = _this.pnew.Width;
        _this.charLevel.Align = mcontrol_1.MAlign.Center;
        _this.charLevel.TextAlign = mcontrol_1.MAlign.Center;
        _this.charLevel.Text = "---";
        _this.pstart.Controls.Add(_this.charLevel);
        _this.charLabel = new mlabel_1.MLabel();
        _this.charLabel.X = 0;
        _this.charLabel.Y = 360;
        _this.charLabel.Width = _this.pnew.Width;
        _this.charLabel.Align = mcontrol_1.MAlign.Center;
        _this.charLabel.TextAlign = mcontrol_1.MAlign.Center;
        _this.charLabel.Font = "32px RobotoBold";
        _this.charLabel.Text = "---";
        _this.pstart.Controls.Add(_this.charLabel);
        var start = new mfixbutton_1.MFixButton();
        start.X = 0;
        start.Y = 440;
        start.Color = "#FFFCEE";
        start.ShadowColor = "#000000";
        start.Text = "Играть";
        start.Align = mcontrol_1.MAlign.Center;
        start.MouseClick = function (s, e) {
            app_1.App.Game.CharacterId = _this.CharacterInfo.CharacterId;
            app_1.App.Game.InitProc_InitPlayer();
        };
        _this.pstart.Controls.Add(start);
        _this.ScanCharacter(null);
        _this.SetActiveHtmls();
        return _this;
    }
    CharacterForm.prototype.CreateCharacter = function () {
        var _this = this;
        var moonChar = new moon_info_1.MoonChar();
        moonChar.userGuid = app_1.App.UserGuid;
        moonChar.name = this.charName.Text.trim();
        moonChar.class = this.medals[0].SelectedGroup.Selected.ClassType;
        moonChar.level = 1;
        app_1.App.Hub.Request("InsertMoonCharacter", moonChar, function (res) {
            if (res.errorCode == 0) {
                _this.pstart.Visible = true;
                _this.pstart.DetermineMouseHover(app_1.App.StoreXYPos);
                _this.pnew.Visible = false;
                _this.SetActiveHtmls();
                _this.ScanCharacter(res.charGuid);
            }
            else
                _this.lError.Text = res.errorMessage;
        });
    };
    CharacterForm.prototype.ScanCharacter = function (currentGuid) {
        var _this = this;
        app_1.App.Hub.Request("GetMoonCharacterList", app_1.App.UserGuid, function (res) {
            if (res.errorCode == 0) {
                _this.CharacterInfo = null;
                _this.PlayerData.CharacterList = [];
                if (res.chars)
                    res.chars.sort(function (c1, c2) { return (new Date(c2.accessDate)).getTime() - (new Date(c1.accessDate)).getTime(); }).forEach(function (char) {
                        var lchar = new playerdata_1.CharacterInfo();
                        lchar.ClassType = char.class;
                        lchar.CharacterName = char.name;
                        lchar.Level = char.level;
                        lchar.CharacterId = char.moonCharacterGuid;
                        if (lchar.CharacterId == currentGuid)
                            _this.CharacterInfo = lchar;
                        _this.PlayerData.CharacterList.push(lchar);
                    });
                if (!_this.CharacterInfo && _this.PlayerData.CharacterList.length)
                    _this.CharacterInfo = _this.PlayerData.CharacterList[0];
                _this.CreateCharacterListButtons(currentGuid == null);
                if (_this.CharacterInfo) {
                    _this.pstart.Visible = true;
                    _this.pstart.DetermineMouseHover(app_1.App.StoreXYPos);
                    _this.pnew.Visible = false;
                    _this.SetActiveHtmls();
                    _this.FillStartCharacter();
                }
            }
            else
                _this.lError.Text = res.errorMessage;
        });
    };
    CharacterForm.prototype.CreateCharacterListButtons = function (first) {
        var _this = this;
        if (this.chars)
            this.chars.forEach(function (char) {
                _this.lpan.Controls.Remove(char);
            });
        this.chars = [];
        var idx = 4;
        var group = null;
        this.PlayerData.CharacterList.forEach(function (pchar) {
            var char = new mcharbutton_1.MCharacterButton();
            char.X = 0;
            char.Y = idx;
            char.CharInfo = pchar;
            char.Text = pchar.CharacterName;
            char.MouseClick = function (s, e) {
                _this.CharacterInfo = pchar;
                _this.FillStartCharacter();
                _this.pstart.Visible = true;
                _this.pstart.DetermineMouseHover(app_1.App.StoreXYPos);
                _this.pnew.Visible = false;
                _this.SetActiveHtmls();
            };
            _this.lpan.Controls.Add(char);
            _this.chars.push(char);
            if (!group)
                group = char.CreateSelectedGroup();
            else
                char.Add2SelectedGroup(group);
            idx += 68;
        });
        if (this.chars.length)
            this.chars[0].Select();
        //if (!first && this.chars.length > 0)
        //  this.chars[this.chars.length - 1].Select();
        this.icreatenew.Y = idx - 1;
        this.bcreatenew.Y = idx + 3;
        if (this.chars.length == 0)
            this.bcreatenew.Y += 2;
        this.icreatenew.Visible = this.chars.length > 0;
        this.bcreatenew.Visible = this.chars.length < 5;
    };
    CharacterForm.prototype.FillStartCharacter = function () {
        this.startmedal.ClassType = this.CharacterInfo.ClassType;
        this.charLevel.Text = "Уровень " + this.CharacterInfo.Level.toFixed(0);
        this.charLabel.Text = this.CharacterInfo.CharacterName;
    };
    CharacterForm.prototype.SetActiveHtmls = function () {
        /*if (this.pnew.Visible)
          this.pnew.Activate();
        else
          this.pnew.Deactivate();*/
    };
    CharacterForm.prototype.ResizeWindow = function () {
        this.width = app_1.App.Game.Width;
        this.height = app_1.App.Game.Height;
        _super.prototype.ResizeWindow.call(this);
    };
    CharacterForm.prototype.OnDispatch = function () {
        _super.prototype.OnDispatch.call(this);
    };
    CharacterForm.prototype.OnPaint = function () {
        _super.prototype.OnPaint.call(this);
    };
    CharacterForm.prototype.OnLayerPaint = function () {
        _super.prototype.OnLayerPaint.call(this);
    };
    CharacterForm.prototype.OnActivate = function () {
        _super.prototype.OnActivate.call(this);
        this.SetActiveHtmls();
    };
    return CharacterForm;
}(mform_1.MForm));
exports.CharacterForm = CharacterForm;
//# sourceMappingURL=charform.js.map