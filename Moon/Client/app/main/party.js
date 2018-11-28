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
var mphpanel_1 = require("../mlib/mphpanel");
var mob_1 = require("../objs/mob");
var mcontextmenu_1 = require("../ui/mcontextmenu");
var app_1 = require("../global/app");
var moon_info_1 = require("../service/moon-info");
var mgfx_1 = require("../mlib/mgfx");
var MPartyPlayer = /** @class */ (function (_super) {
    __extends(MPartyPlayer, _super);
    function MPartyPlayer(Y, Main) {
        var _this = _super.call(this, 0, Y) || this;
        _this.transparent = true;
        _this.BorderVisible = false;
        _this.MainPlayer = Main;
        _this.width = Main ? 224 : 157;
        _this.height = Main ? 72 : 51;
        return _this;
    }
    MPartyPlayer.prototype.AfterPaint = function () {
        if (!this.Player)
            return;
        this.pack = app_1.App.Resx.GetPackResource("ui-player");
        var ration = this.MainPlayer ? 1 : 0.7;
        var sfnt = this.MainPlayer ? 13 : 9;
        var mfnt = this.MainPlayer ? 16 : 11;
        var bfnt = this.MainPlayer ? 20 : 14;
        var pSpr = this.pack.ss.s[this.Player.ClassType];
        mgfx_1.Gpx.DrawImageExactWH(pSpr.img, this.gx, this.gy, pSpr.img.width, pSpr.img.height, pSpr.img.width * ration, pSpr.img.height * ration);
        var col1 = "#0F9FFF";
        var col2 = "#0D7DDD";
        if (this.Player.ClassType == moon_info_1.PlayerClassType.Archer) {
            col1 = "#FFFF00";
            col2 = "#DDDD00";
        }
        if (this.Player.ClassType == moon_info_1.PlayerClassType.Knight) {
            col1 = "#CCCCCC";
            col2 = "#AAAAAA";
        }
        if (this.Player.ClassType == moon_info_1.PlayerClassType.Priest) {
            col1 = "#FFEEDD";
            col2 = "#DDBBAA";
        }
        mgfx_1.Gpx.FillRect("#00FF00", this.gx + 70.5 * ration, this.gy + 28.5 * ration, (145 * this.Player.HP / this.Player.MaxHP) * ration, 8 * ration);
        mgfx_1.Gpx.FillRect("#00DD00", this.gx + 70.5 * ration, this.gy + 35.5 * ration, (145 * this.Player.HP / this.Player.MaxHP) * ration, 5 * ration);
        mgfx_1.Gpx.FillRect(col1, this.gx + 70.5 * ration, this.gy + 47.5 * ration, 145 * ration, 8 * ration);
        mgfx_1.Gpx.FillRect(col2, this.gx + 70.5 * ration, this.gy + 54.5 * ration, 145 * ration, 5 * ration);
        mgfx_1.Gpx.Text(this.Player.Active ? "Yellow" : "#c0c0c0", ((this.Player.Party && this.Player.Party.leader == this.Player.PlayerId) ? "* " : "") + this.Player.Name, this.gx + 70 * ration, this.gy + 21 * ration, mfnt + "px Roboto");
        mgfx_1.Gpx.Text("Yellow", this.Player.Level.toFixed(0), this.gx + 45 * ration, this.gy + 58 * ration, bfnt + "px Roboto");
        mgfx_1.Gpx.FillRect("#FFFF00", this.gx + 8.5 * ration, this.gy + 66.3 * ration, (210 * this.Player.Exp / this.Player.MaxExp) * ration, 0.7 * ration);
        var text = this.Player.HP.toFixed(0) + "/" + this.Player.MaxHP.toFixed(0);
        var width = mgfx_1.Gpx.MeasureText(text, "14px Roboto").width;
        mgfx_1.Gpx.Text2("White", "Black", text, this.gx + (70 + (145 - width) / 2) * ration, this.gy + 39 * ration, sfnt + "px Roboto");
        text = "100/100";
        width = mgfx_1.Gpx.MeasureText(text, "14px Roboto").width;
        mgfx_1.Gpx.Text2("White", "Black", text, this.gx + (70 + (145 - width) / 2) * ration, this.gy + 58 * ration, sfnt + "px Roboto");
    };
    MPartyPlayer.prototype.OnPropagateMouseDown = function (Event) {
        Event.Propagate = false;
    };
    MPartyPlayer.prototype.OnPropagateMouseUp = function (Event) {
        Event.Propagate = false;
    };
    MPartyPlayer.prototype.OnPropagateMouseClick = function (Event) {
        var _this = this;
        Event.Propagate = false;
        app_1.App.Field.DropContextPanels();
        if (Event.Button == 2) {
            var menu;
            if (this.Player.Party) {
                if (app_1.App.Field.MoonPlayer == this.Player) {
                    menu = new mcontextmenu_1.MContextMenu(Event.X, Event.Y, this.Player, ['Выйти из группы']);
                    menu.ContextMenuClick = function (s, e) {
                        if (e.Index == 0) {
                            app_1.App.Hub.LeaveGroup(app_1.App.PlayerGuid);
                        }
                    };
                }
                else if (this.Player.Party.leader == app_1.App.Field.MoonPlayer.PlayerId) {
                    menu = new mcontextmenu_1.MContextMenu(Event.X, Event.Y, this.Player, ['Исключить из группы', 'Передать лидерство', '', 'Написать игроку', 'Информация о персонаже']);
                    menu.ContextMenuClick = function (s, e) {
                        if (e.Index == 0)
                            app_1.App.Hub.RemoveFromGroup(app_1.App.PlayerGuid, _this.Player.PlayerId);
                        if (e.Index == 1)
                            app_1.App.Hub.SetLeaderGroup(app_1.App.PlayerGuid, _this.Player.PlayerId);
                    };
                }
                else {
                    menu = new mcontextmenu_1.MContextMenu(Event.X, Event.Y, this.Player, ['Написать игроку', 'Информация о персонаже']);
                }
                menu.Activate();
            }
        }
        if (Event.Button == 0)
            app_1.App.Hub.PlayerSelectTo(app_1.App.PlayerGuid, moon_info_1.MoonObjectType.Mob, this.Player.MobId, 2);
    };
    return MPartyPlayer;
}(mphpanel_1.MPlaceHolderPanel));
exports.MPartyPlayer = MPartyPlayer;
var MParty = /** @class */ (function (_super) {
    __extends(MParty, _super);
    function MParty(X, Y) {
        var _this = _super.call(this, X, Y) || this;
        _this.Items = [];
        _this.transparent = true;
        _this.BorderVisible = false;
        _this.width = 224;
        _this.height = 286;
        var ppl = new MPartyPlayer(0, true);
        _this.controls.Add(ppl);
        _this.Items.push(ppl);
        for (var i = 0, ox = 76; i < 4; i++, ox += 53) {
            ppl = new MPartyPlayer(ox, false);
            ppl.Visible = false;
            _this.controls.Add(ppl);
            _this.Items.push(ppl);
        }
        return _this;
    }
    MParty.prototype.OnDispatch = function () {
        var _this = this;
        _super.prototype.OnDispatch.call(this);
        if (app_1.App.Field.MoonPlayer) {
            var idx = 0;
            this.Items.forEach(function (i) { return i.Visible = false; });
            this.Items[idx].Player = app_1.App.Field.MoonPlayer;
            this.Items[idx].Visible = true;
            idx++;
            for (var i = idx; i < 4 + idx; i++) {
                this.Items[i].Player = null;
                this.Items[i].Visible = false;
            }
            if (app_1.App.Field.MoonPlayer.Party)
                app_1.App.Field.MoonPlayer.Party.items.forEach(function (p) {
                    if (app_1.App.Field.MoonPlayer.PlayerId == p)
                        return;
                    _this.Items[idx].Player = mob_1.MoonMobList.FindPlayer(p);
                    _this.Items[idx].Visible = true;
                    idx++;
                });
        }
    };
    return MParty;
}(mphpanel_1.MPlaceHolderPanel));
exports.MParty = MParty;
//# sourceMappingURL=party.js.map