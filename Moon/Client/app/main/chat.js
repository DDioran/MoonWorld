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
var chattab_1 = require("./chattab");
var chatlist_1 = require("./chatlist");
var chatinput_1 = require("./chatinput");
var app_1 = require("../global/app");
var mgfx_1 = require("../mlib/mgfx");
var MChatType;
(function (MChatType) {
    MChatType[MChatType["TabAll"] = 0] = "TabAll";
    MChatType[MChatType["TabCommon"] = 1] = "TabCommon";
    MChatType[MChatType["TabFight"] = 2] = "TabFight";
    MChatType[MChatType["TabGroup"] = 3] = "TabGroup";
})(MChatType = exports.MChatType || (exports.MChatType = {}));
var MChat = /** @class */ (function (_super) {
    __extends(MChat, _super);
    function MChat() {
        var _this = _super.call(this) || this;
        _this.transparent = true;
        _this.BorderVisible = false;
        _this.tabs = [];
        var tab = new chattab_1.MChatTab(5.5, 2.5, 80, 28, "Все", MChatType.TabAll);
        tab.CreateSelectedGroup();
        tab.SelectedGroup.ControlSelect = function (s, e) {
            _this.chats.forEach(function (c) {
                c.Visible = c.ChatType == s.ChatType;
            });
        };
        _this.controls.Add(tab);
        _this.tabs.push(tab);
        tab = new chattab_1.MChatTab(5.5 + 80, 2.5, 120, 28, "Общий", MChatType.TabCommon);
        tab.Add2SelectedGroup(_this.tabs[0].SelectedGroup);
        _this.controls.Add(tab);
        _this.tabs.push(tab);
        tab = new chattab_1.MChatTab(5.5 + 200, 2.5, 80, 28, "Бой", MChatType.TabFight);
        tab.Add2SelectedGroup(_this.tabs[0].SelectedGroup);
        _this.controls.Add(tab);
        _this.tabs.push(tab);
        tab = new chattab_1.MChatTab(5.5 + 280, 2.5, 140, 28, "Группа", MChatType.TabGroup);
        tab.Add2SelectedGroup(_this.tabs[0].SelectedGroup);
        _this.controls.Add(tab);
        _this.tabs.push(tab);
        _this.chats = [];
        var chat = new chatlist_1.MChatList(5, 33, 550, 230, MChatType.TabAll);
        _this.controls.Add(chat);
        _this.chats.push(chat);
        chat = new chatlist_1.MChatList(5, 33, 550, 230, MChatType.TabCommon);
        chat.Visible = false;
        _this.controls.Add(chat);
        _this.chats.push(chat);
        chat = new chatlist_1.MChatList(5, 33, 550, 230, MChatType.TabFight);
        chat.Visible = false;
        _this.controls.Add(chat);
        _this.chats.push(chat);
        chat = new chatlist_1.MChatList(5, 33, 550, 230, MChatType.TabGroup);
        chat.Visible = false;
        _this.controls.Add(chat);
        _this.chats.push(chat);
        _this.input = new chatinput_1.MChatInput(5.5, 266.5, 550, 28);
        _this.input.EnterText = function (s, e) {
            app_1.App.Hub.MessageChat(app_1.App.PlayerGuid, _this.tabs[0].SelectedGroup.Selected.ChatType, _this.input.Text);
            _this.input.Text = "";
        };
        _this.controls.Add(_this.input);
        return _this;
    }
    MChat.prototype.OnInit = function () {
        _super.prototype.OnInit.call(this);
    };
    MChat.prototype.AfterPaint = function () {
        mgfx_1.Gpx.FillRect("rgba(120,120,120,0.5)", this.gx, this.gy, this.width, this.height);
        mgfx_1.Gpx.DrawRect("rgba(250,250,200,0.6)", this.gx + 2.5, this.gy + 2.5 + 28, this.width - 5, this.height - 5 - 28);
        _super.prototype.AfterPaint.call(this);
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
    };
    return MChat;
}(mphpanel_1.MPlaceHolderPanel));
exports.MChat = MChat;
//# sourceMappingURL=chat.js.map