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
var mcontrol_1 = require("../mlib/mcontrol");
var mob_1 = require("../objs/mob");
var effect_1 = require("../objs/effect");
var chest_1 = require("../objs/chest");
var chat_1 = require("../main/chat");
var targethp_1 = require("../main/targethp");
var party_1 = require("../main/party");
var app_1 = require("./app");
var info_1 = require("../service/info");
var mgfx_1 = require("../mlib/mgfx");
var mcontextmenu_1 = require("../ui/mcontextmenu");
var MoonPlayField = /** @class */ (function (_super) {
    __extends(MoonPlayField, _super);
    function MoonPlayField() {
        var _this = _super.call(this) || this;
        _this.layerZero = [];
        _this.cursor = { x: 0, y: 0 };
        _this.MessageBox = null;
        app_1.App.Field = _this;
        _this.x = 0;
        _this.y = 0;
        _this.cx = 0;
        _this.cy = 0;
        _this.zeroWidth = 32;
        _this.zeroHeight = 47;
        _this.zeroSize = 192;
        _this.playerx = 600; //Math.floor(this.zeroSize * this.zeroWidth / 2);
        _this.playery = 600; //Math.floor(this.zeroSize * this.zeroHeight / 2);
        for (var j = 0; j < _this.zeroHeight; j++) {
            _this.layerZero[j] = [];
            for (var i = 0; i < _this.zeroWidth; i++)
                _this.layerZero[j][i] = 0;
        }
        _this.MoonMobList = new mob_1.MoonMobList();
        _this.MoonEffectList = new effect_1.MoonEffectList();
        _this.MoonChestList = new chest_1.MoonChestList();
        _this.ContextPanels = [];
        _this.Party = new party_1.MParty(20, 20);
        _this.controls.Add(_this.Party);
        _this.TargetHP = new targethp_1.MTargetHP();
        _this.TargetHP.Width = 600;
        _this.TargetHP.Height = 60;
        _this.TargetHP.Align = mcontrol_1.MAlign.Center;
        _this.TargetHP.Y = 0;
        _this.controls.Add(_this.TargetHP);
        _this.Chat = new chat_1.MChat();
        _this.Chat.Width = 560;
        _this.Chat.Height = 300;
        _this.controls.Add(_this.Chat);
        return _this;
    }
    MoonPlayField.prototype.InitializePlayer = function (playerInfo) {
        this.MoonPlayer = new mob_1.MoonMob(playerInfo);
        this.playerx = this.MoonPlayer.X;
        this.playery = this.MoonPlayer.Y;
    };
    MoonPlayField.prototype.Dispatch = function () {
        _super.prototype.Dispatch.call(this);
        this.MoonChestList.Dispatcher();
        this.MoonMobList.Dispatcher();
        this.MoonEffectList.Dispatcher();
        //this.MoonPlayer.Dispatcher();
        if (this.MoonPlayer) {
            this.playerx = this.MoonPlayer.X;
            this.playery = this.MoonPlayer.Y;
            if (this.MoonPlayer.State == info_1.MoonMobState.Alive && this.MoonPlayer.PInstruction == "s" && this.MoonPlayer.SkillState == info_1.SkillState.Charge) {
                this.MoonPlayer.ChargeLeft += app_1.App.DeltaTime;
            }
            this.MoonPlayer.Skills.forEach(function (s) {
                if (s.cooldownTimeLeft < s.cooldownTime)
                    s.cooldownTimeLeft += app_1.App.DeltaTime;
            });
        }
    };
    MoonPlayField.prototype.Paint = function () {
        this.TargetHP.Visible = app_1.App.Field.MoonPlayer && app_1.App.Field.MoonPlayer.TargetId > 0;
        _super.prototype.Paint.call(this);
        this.MoonChestList.Paint();
        this.MoonMobList.Paint();
        this.MoonEffectList.Paint();
        // minimap
        var mmw = 300;
        var mmh = 350;
        var mmox = app_1.App.Game.Width - mmw - 20;
        var mmoy = 20;
        var k = Math.min(mmw / (this.zeroSize * this.zeroWidth), mmh / (this.zeroSize * this.zeroHeight));
        var mmx = -(this.zeroSize * this.zeroWidth * k - mmw) / 2;
        var mmy = -(this.zeroSize * this.zeroHeight * k - mmh) / 2;
        mgfx_1.Gpx.DrawFillRect("rgba(192, 192, 192, 0.4)", "rgba(255, 255, 255, 0.6)", mmox, mmoy, mmw, mmh);
        app_1.App.Field.MoonMobList.ItemList.forEach(function (i) {
            var mob = i;
            if (mob.State == info_1.MoonMobState.Await)
                return;
            if (mob.Type == info_1.MoonMobType.Player) {
                var cc = "red";
                if (mob.State == info_1.MoonMobState.Dead)
                    cc = "gray";
                if (mob.PlayerId == app_1.App.PlayerGuid)
                    cc = "green";
                mgfx_1.Gpx.DrawFillCircle(cc, "yellow", mmox + mob.X * k + mmx, mmoy + mob.Y * k + mmy, 3);
            }
            if (mob.Type == info_1.MoonMobType.Mob) {
                var cc = "red";
                if (mob.State == info_1.MoonMobState.Dead)
                    cc = "gray";
                mgfx_1.Gpx.FillCircle(cc, mmox + mob.X * k + mmx, mmoy + mob.Y * k + mmy, 1.3);
            }
            if (mob.Type == info_1.MoonMobType.Npc) {
                var cc = "lightblue";
                mgfx_1.Gpx.DrawFillCircle(cc, "yellow", mmox + mob.X * k + mmx, mmoy + mob.Y * k + mmy, 3);
            }
        });
        // ---------
        // ui-player
        if (this.MoonPlayer) {
            // ---------
            if (this.MoonPlayer.State == info_1.MoonMobState.Alive && this.MoonPlayer.PInstruction == "s" && this.MoonPlayer.SkillState == info_1.SkillState.Charge) {
                mgfx_1.Gpx.DrawFillRect("gray", "#E0E000", this.cx - 100, app_1.App.Game.Height - 240, 200, 12, 1.5);
                mgfx_1.Gpx.FillRect("yellow", this.cx - 99, app_1.App.Game.Height - 239, 198 * this.MoonPlayer.ChargeLeft / this.MoonPlayer.ChargeTime, 10);
            }
            // ---------
            var skills = app_1.App.Resx.GetPackResource("skills");
            var misc = app_1.App.Resx.GetPackResource("misc");
            var ct = this.MoonPlayer.ClassType;
            var nsk = 3;
            if (this.MoonPlayer.ClassType == 2)
                ct = 1;
            if (this.MoonPlayer.ClassType == 1)
                ct = 2;
            mgfx_1.Gpx.DrawImage(skills.ss.s[0 + ct * nsk].img, this.cx - 65 * 4, app_1.App.Game.Height - 96);
            mgfx_1.Gpx.DrawImage(skills.ss.s[1 + ct * nsk].img, this.cx - 65 * 3, app_1.App.Game.Height - 96);
            mgfx_1.Gpx.DrawImage(skills.ss.s[2 + ct * nsk].img, this.cx - 65 * 2, app_1.App.Game.Height - 96);
            mgfx_1.Gpx.DrawImage(misc.ii.n.empty_skill_slot.img, this.cx - 65 * 1, app_1.App.Game.Height - 96);
            mgfx_1.Gpx.DrawImage(misc.ii.n.empty_skill_slot.img, this.cx + 65 * 0, app_1.App.Game.Height - 96);
            mgfx_1.Gpx.DrawImage(misc.ii.n.empty_skill_slot.img, this.cx + 65 * 1, app_1.App.Game.Height - 96);
            mgfx_1.Gpx.DrawImage(misc.ii.n.empty_skill_slot.img, this.cx + 65 * 2, app_1.App.Game.Height - 96);
            mgfx_1.Gpx.DrawImage(misc.ii.n.empty_skill_slot.img, this.cx + 65 * 3, app_1.App.Game.Height - 96);
            for (var i = 0; i < this.MoonPlayer.Skills.length; i++) {
                var skill = this.MoonPlayer.Skills[i];
                if (skill && skill.cooldownTime > skill.cooldownTimeLeft) {
                    var centerX = this.cx - 65 * 4 + 32 + 65 * i;
                    var centerY = app_1.App.Game.Height - 96 + 32;
                    var radius = 32;
                    var angle = (1 - skill.cooldownTimeLeft / skill.cooldownTime) * 2 * Math.PI;
                    mgfx_1.Gpx.FillSector("rgb(128, 128, 128, 0.7)", centerX, centerY, radius, 0 - Math.PI / 2, angle - Math.PI / 2);
                }
            }
            // ---------
        }
        // ---------
    };
    MoonPlayField.prototype.OnDispatch = function () {
        _super.prototype.OnDispatch.call(this);
    };
    MoonPlayField.prototype.OnPaint = function () {
        var pack = app_1.App.Resx.GetPackResource("layer-zero");
        var b = pack.GetImageByName("grass");
        for (var j = 0; j < this.zeroHeight; j++)
            for (var i = 0; i < this.zeroWidth; i++)
                mgfx_1.Gpx.DrawImage(b.img, this.X + i * this.zeroSize - this.playerx + this.cx, this.Y + j * this.zeroSize - this.playery + this.cy);
    };
    MoonPlayField.prototype.ResizeWindow = function () {
        this.width = app_1.App.Game.Width;
        this.height = app_1.App.Game.Height;
        this.cx = Math.floor(this.width / 2);
        this.cy = Math.floor(this.height / 2);
        this.Chat.X = 10;
        this.Chat.Y = this.height - this.Chat.Height - 10;
        this.Chat.ResizeWindow();
        if (this.MessageBox != null)
            this.MessageBox.ResizeWindow();
    };
    MoonPlayField.prototype.DropContextPanels = function () {
        this.ContextPanels.forEach(function (cp) {
            cp.Deactivate();
            cp.Parent.Controls.Remove(cp);
        });
        this.ContextPanels = [];
    };
    MoonPlayField.prototype.OnMouseDown = function (e) {
        _super.prototype.OnMouseDown.call(this, e);
        app_1.App.MBtns[e.Button] = e.X;
        if (e.Button == 0 || e.Button == 2)
            this.PlayerClick(e.Button, e.X - this.cx + this.playerx, e.Y - this.cy + this.playery);
    };
    MoonPlayField.prototype.OnMouseMove = function (e) {
        _super.prototype.OnMouseMove.call(this, e);
        if (app_1.App.MBtns[0])
            app_1.App.MBtns[0] = e.X;
        if (app_1.App.MBtns[1])
            app_1.App.MBtns[1] = e.X;
        if (app_1.App.MBtns[2])
            app_1.App.MBtns[2] = e.X;
        this.cursor.x = e.X;
        this.cursor.y = e.Y;
        this.PlayerMove(e.X - this.cx + this.playerx, e.Y - this.cy + this.playery);
    };
    MoonPlayField.prototype.PlayerMove = function (x, y) {
    };
    MoonPlayField.prototype.SetUnderCursor = function (x, y) {
        // Наведение на цель
        this.UnderCursor = null;
        for (var i = 0; i < this.MoonChestList.ItemList.length; i++) {
            var m = this.MoonChestList.ItemList[i];
            if (m.State != chest_1.ChestState.Restricted && m.State != chest_1.ChestState.Available)
                continue;
            if (Math.sqrt((m.X - x) * (m.X - x) + (m.Y - y) * (m.Y - y)) < m.Info.radius) {
                this.UnderCursor = m;
                break;
            }
        }
        if (!this.UnderCursor)
            for (var i = 0; i < this.MoonMobList.ItemList.length; i++) {
                var m = this.MoonMobList.ItemList[i];
                if (m.State == info_1.MoonMobState.Await)
                    continue;
                if (m.Type == info_1.MoonMobType.Player && m.PlayerId == app_1.App.PlayerGuid)
                    continue;
                if (Math.sqrt((m.X - x) * (m.X - x) + (m.Y - y) * (m.Y - y)) < m.Radius) {
                    this.UnderCursor = m;
                    break;
                }
            }
    };
    MoonPlayField.prototype.SetCursor = function () {
        var x = this.cursor.x - this.cx + this.playerx;
        var y = this.cursor.y - this.cy + this.playery;
        this.SetUnderCursor(x, y);
        app_1.App.Canvas.style.cursor = this.UnderCursor ? "pointer" : "default";
    };
    MoonPlayField.prototype.PlayerClick = function (button, x, y) {
        this.SetUnderCursor(x, y);
        if (this.UnderCursor) {
            // Ткнули в моба, игрока или сундук
            var ot = info_1.MoonObjectType.Mob;
            var oid;
            if (this.UnderCursor instanceof chest_1.MoonChest) {
                ot = info_1.MoonObjectType.Chest;
                oid = this.UnderCursor.Info.chestId;
            }
            else {
                oid = this.UnderCursor.MobId;
            }
            app_1.App.Hub.PlayerSelectTo(app_1.App.PlayerGuid, ot, oid, button);
        }
        else
            // Ткнули на местность
            app_1.App.Hub.PlayerMoveTo(app_1.App.PlayerGuid, x, y, button);
    };
    MoonPlayField.prototype.OnPropagateMouseDown = function (Event) {
        this.DropContextPanels();
    };
    MoonPlayField.prototype.ContextMenuTargetHP = function (x, y) {
        this.DropContextPanels();
        if (app_1.App.Field.MoonPlayer.TargetId > 0) {
            this.ContextObjectMenu(x, y, app_1.App.Field.MoonPlayer.TargetId);
        }
    };
    MoonPlayField.prototype.ContextObjectMenu = function (x, y, objectId) {
        this.DropContextPanels();
        var mob = app_1.App.Field.MoonMobList.ItemList.filter(function (i) { return i.MobId == objectId; })[0];
        if (mob.Type != info_1.MoonMobType.Player)
            return;
        if (mob.Party)
            return;
        var menu = new mcontextmenu_1.MContextMenu(x, y, mob, ['Добавить в группу', '', 'Написать игроку', 'Информация о персонаже']);
        menu.Activate();
        menu.ContextMenuClick = function (s, e) {
            if (e.Index == 0)
                app_1.App.Hub.InviteGroup(app_1.App.PlayerGuid, mob.PlayerId);
        };
    };
    return MoonPlayField;
}(mcontrol_1.MControl));
exports.MoonPlayField = MoonPlayField;
//# sourceMappingURL=playfield.js.map