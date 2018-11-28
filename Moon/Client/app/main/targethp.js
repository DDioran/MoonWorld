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
var chest_1 = require("../objs/chest");
var mgfx_1 = require("../mlib/mgfx");
var moon_info_1 = require("../service/moon-info");
var app_1 = require("../global/app");
var MTargetHP = /** @class */ (function (_super) {
    __extends(MTargetHP, _super);
    function MTargetHP() {
        var _this = _super.call(this) || this;
        _this.transparent = true;
        _this.BorderVisible = false;
        return _this;
    }
    MTargetHP.prototype.OnInit = function () {
        _super.prototype.OnInit.call(this);
    };
    MTargetHP.prototype.AfterPaint = function () {
        var player = app_1.App.Field.MoonPlayer;
        if (player && player.TargetId > 0) {
            if (player.TargetType == moon_info_1.MoonObjectType.Mob) {
                var mob = mob_1.MoonMobList.FindMob(player.TargetId);
                var text = mob.Level.toFixed(0);
                var width = mgfx_1.Gpx.MeasureText(text, "22px Roboto").width;
                mgfx_1.Gpx.TText2("Yellow", "Black", text, this.gx + (32 - width) / 2, this.gy + 1, "21px Roboto-Bold");
                mgfx_1.Gpx.DrawCircle("Yellow", this.gx + 15, this.gy + 16, 13);
                mgfx_1.Gpx.TText("Yellow", mob.Name, this.gx + 36, this.gy, "24px Roboto-Bold");
                var hpLen = (this.width - 4) * mob.HP / mob.MaxHP;
                mgfx_1.Gpx.FillRect("rgba(21, 17, 17, 0.2)", this.gx, this.gy + 30, this.width, 32);
                mgfx_1.Gpx.DrawRect("#394750", this.gx, this.gy + 30, this.width, 32);
                mgfx_1.Gpx.DrawRect("#363D45", this.gx + 1, this.gy + 30 + 1, this.width - 2, 30);
                mgfx_1.Gpx.FillRect("#EE1B22", this.gx + 2, this.gy + 30 + 2, hpLen, 16);
                mgfx_1.Gpx.FillRect("#B10B0F", this.gx + 2, this.gy + 30 + 2 + 16, hpLen, 12);
                var text = mob.HP.toFixed(0) + "/" + mob.MaxHP.toFixed(0);
                var width = mgfx_1.Gpx.MeasureText(text, "24px Roboto").width;
                mgfx_1.Gpx.TText2("Yellow", "Black", text, this.gx + (this.width - width) / 2, this.gy + 30, "23px Roboto-Bold");
            }
            if (player.TargetType == moon_info_1.MoonObjectType.Chest) {
                var chest = chest_1.MoonChestList.FindChest(player.TargetId);
                mgfx_1.Gpx.TText("Yellow", "Сундук с сокровищами", this.gx, this.gy, "24px Roboto-Bold");
                mgfx_1.Gpx.FillRect("rgba(21, 17, 17, 0.2)", this.gx, this.gy + 30, this.width, 32);
                mgfx_1.Gpx.DrawRect("#394750", this.gx, this.gy + 30, this.width, 32);
                mgfx_1.Gpx.DrawRect("#363D45", this.gx + 1, this.gy + 30 + 1, this.width - 2, 30);
                mgfx_1.Gpx.FillRect("#4B7AB7", this.gx + 2, this.gy + 30 + 2, this.width - 4, 16);
                mgfx_1.Gpx.FillRect("#3E6599", this.gx + 2, this.gy + 30 + 2 + 16, this.width - 4, 12);
            }
            if (player.TargetType == moon_info_1.MoonObjectType.Npc) {
                var npc = mob_1.MoonMobList.FindMob(player.TargetId);
                mgfx_1.Gpx.TText("Yellow", npc.Name, this.gx, this.gy, "24px Roboto-Bold");
                mgfx_1.Gpx.FillRect("rgba(21, 17, 17, 0.2)", this.gx, this.gy + 30, this.width, 32);
                mgfx_1.Gpx.DrawRect("#395047", this.gx, this.gy + 30, this.width, 32);
                mgfx_1.Gpx.DrawRect("#36453D", this.gx + 1, this.gy + 30 + 1, this.width - 2, 30);
                mgfx_1.Gpx.FillRect("#4BB77A", this.gx + 2, this.gy + 30 + 2, this.width - 4, 16);
                mgfx_1.Gpx.FillRect("#3E9965", this.gx + 2, this.gy + 30 + 2 + 16, this.width - 4, 12);
            }
        }
    };
    MTargetHP.prototype.OnPropagateMouseDown = function (Event) {
        if (Event.Button == 2)
            Event.Propagate = false;
    };
    MTargetHP.prototype.OnPropagateMouseUp = function (Event) {
        if (Event.Button == 2)
            Event.Propagate = false;
    };
    MTargetHP.prototype.OnPropagateMouseClick = function (Event) {
        if (Event.Button == 2) {
            Event.Propagate = false;
            app_1.App.Field.ContextMenuTargetHP(Event.X, Event.Y);
        }
    };
    return MTargetHP;
}(mphpanel_1.MPlaceHolderPanel));
exports.MTargetHP = MTargetHP;
//# sourceMappingURL=targethp.js.map