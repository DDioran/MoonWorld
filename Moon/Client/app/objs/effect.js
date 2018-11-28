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
var sobject_1 = require("../mlib/sobject");
var mcounter_1 = require("../mlib/mcounter");
var app_1 = require("../global/app");
var mgfx_1 = require("../mlib/mgfx");
var MoonEffectState;
(function (MoonEffectState) {
    MoonEffectState[MoonEffectState["Await"] = 0] = "Await";
    MoonEffectState[MoonEffectState["Alive"] = 1] = "Alive";
    MoonEffectState[MoonEffectState["Done"] = 2] = "Done";
})(MoonEffectState = exports.MoonEffectState || (exports.MoonEffectState = {}));
var MoonPointEffect = /** @class */ (function (_super) {
    __extends(MoonPointEffect, _super);
    function MoonPointEffect(SpriteName, Speed, X, Y) {
        var _this = _super.call(this, X, Y) || this;
        _this.Speed = Speed;
        _this.spriteName = SpriteName;
        app_1.App.Field.MoonEffectList.ItemList.push(_this);
        _this.State = MoonEffectState.Await;
        return _this;
    }
    MoonPointEffect.prototype.Dispatcher = function () {
        if (this.State == MoonEffectState.Await) {
            this.sprite = app_1.App.Resx.GetPackResource(this.spriteName);
            this.CounterView = new mcounter_1.MCounter(this.sprite.ss.s.length, this.Speed, false);
            this.State = MoonEffectState.Alive;
        }
        else if (this.State == MoonEffectState.Alive) {
            var idx = this.CounterView.GetIndex(app_1.App.DeltaTime);
            if (idx < 0) {
                this.State = MoonEffectState.Done;
                this.Deleted = true;
            }
        }
    };
    MoonPointEffect.prototype.Paint = function () {
        if (this.State == MoonEffectState.Alive) {
            var idx = this.CounterView.GetCurrentIndex();
            if (idx < 0)
                return;
            var spr = this.sprite.ss.s[idx];
            mgfx_1.Gpx.DrawImage(spr.img, Math.floor(-app_1.App.Field.playerx + app_1.App.Field.cx + this.X - spr.cx), Math.floor(-app_1.App.Field.playery + app_1.App.Field.cy + this.Y - spr.cy));
        }
    };
    return MoonPointEffect;
}(sobject_1.SObjectXY));
exports.MoonPointEffect = MoonPointEffect;
var MoonLineEffect = /** @class */ (function (_super) {
    __extends(MoonLineEffect, _super);
    function MoonLineEffect(SpriteName, Speed, X1, Y1, X2, Y2) {
        var _this = _super.call(this, X1, Y1) || this;
        _this.Time = 0.3;
        _this.dX = (X2 - X1) / _this.Time;
        _this.dY = (Y2 - Y1) / _this.Time;
        _this.angle = Math.atan2(Y2 - Y1, X2 - X1) + Math.PI / 2;
        if (_this.angle > Math.PI * 2)
            _this.angle -= Math.PI * 2;
        _this.Speed = Speed;
        _this.spriteName = SpriteName;
        app_1.App.Field.MoonEffectList.ItemList.push(_this);
        _this.State = MoonEffectState.Await;
        return _this;
    }
    MoonLineEffect.prototype.Dispatcher = function () {
        if (this.State == MoonEffectState.Await) {
            this.sprite = app_1.App.Resx.GetPackResource(this.spriteName);
            this.CounterView = new mcounter_1.MCounter(this.sprite.ss.s.length, this.Speed, true);
            this.State = MoonEffectState.Alive;
            this.TimeLeft = 0;
        }
        else if (this.State == MoonEffectState.Alive) {
            this.CounterView.GetIndex(app_1.App.DeltaTime);
            this.TimeLeft += app_1.App.DeltaTime;
            if (this.Time < this.TimeLeft) {
                this.State = MoonEffectState.Done;
                this.Deleted = true;
            }
        }
    };
    MoonLineEffect.prototype.Paint = function () {
        if (this.State == MoonEffectState.Alive) {
            var idx = this.CounterView.GetCurrentIndex();
            var spr = this.sprite.ss.s[idx];
            //var gx = - App.Field.playerx + App.Field.cx - spr.cx + this.X + this.dX * this.TimeLeft;
            //var gy = - App.Field.playery + App.Field.cy - spr.cy + this.Y + this.dY * this.TimeLeft;
            var gx = -app_1.App.Field.playerx + app_1.App.Field.cx + this.X + this.dX * this.TimeLeft;
            var gy = -app_1.App.Field.playery + app_1.App.Field.cy + this.Y + this.dY * this.TimeLeft;
            //Gpx.DrawImage(spr.img, gx, gy);
            mgfx_1.Gpx.DrawImageCenterRotate(spr.img, gx, gy, spr.cx, spr.cy, new mgfx_1.Rectangle(0, 0, spr.img.width, spr.img.height), this.angle);
        }
    };
    return MoonLineEffect;
}(sobject_1.SObjectXY));
exports.MoonLineEffect = MoonLineEffect;
var MoonHitEffect = /** @class */ (function (_super) {
    __extends(MoonHitEffect, _super);
    function MoonHitEffect(X, Y, Hit, Crit, MobId) {
        var _this = _super.call(this, X, Y) || this;
        _this.Hit = Hit;
        _this.Crit = Crit;
        _this.MobId = MobId;
        app_1.App.Field.MoonEffectList.ItemList.push(_this);
        _this.State = MoonEffectState.Await;
        return _this;
    }
    MoonHitEffect.prototype.Dispatcher = function () {
        if (this.State == MoonEffectState.Await) {
            this.CounterView = new mcounter_1.MCounter(200, 0.5, false);
            this.State = MoonEffectState.Alive;
        }
        else if (this.State == MoonEffectState.Alive) {
            var idx = this.CounterView.GetIndex(app_1.App.DeltaTime);
            if (idx < 0) {
                this.State = MoonEffectState.Done;
                this.Deleted = true;
            }
        }
    };
    MoonHitEffect.prototype.Paint = function () {
        var _this = this;
        if (this.State == MoonEffectState.Alive) {
            var idx = this.CounterView.GetCurrentIndex();
            if (idx < 0)
                return;
            var a = 1;
            var ofy = 0;
            if (idx > 100) {
                a = (200 - idx) / 100;
                ofy = 10 - (200 - idx) / 10;
            }
            var col1 = "rgba(255, 0, 0, " + a + ")";
            var col2 = "rgba(255, 255, 0, " + a + ")";
            var font = "20px Roboto-Bold";
            if (app_1.App.Field.MoonPlayer.MobId == this.MobId) {
                col1 = "rgba(0, 128, 255, " + a + ")";
            }
            var msg = this.Hit.toFixed(0);
            if (this.Crit == 1)
                msg = "КРИТ! " + msg;
            if (this.Crit == -1)
                msg = "Промах";
            var mob = app_1.App.Field.MoonMobList.ItemList.filter(function (m) { return _this.MobId == m.MobId; })[0];
            mgfx_1.Gpx.Text2(col1, col2, msg, Math.floor(-app_1.App.Field.playerx + app_1.App.Field.cx + mob.X + this.X), Math.floor(-app_1.App.Field.playery + app_1.App.Field.cy + mob.Y + this.Y - ofy), font);
        }
    };
    return MoonHitEffect;
}(sobject_1.SObjectXY));
exports.MoonHitEffect = MoonHitEffect;
var MoonDashEffect = /** @class */ (function (_super) {
    __extends(MoonDashEffect, _super);
    function MoonDashEffect(Mob, X2, Y2) {
        var _this = _super.call(this, Mob.X, Mob.Y) || this;
        _this.Mob = Mob;
        _this.Time = 0.2;
        _this.startX = Mob.X;
        _this.startY = Mob.Y;
        _this.destX = X2;
        _this.destY = Y2;
        _this.dX = (_this.destX - _this.startX) / _this.Time;
        _this.dY = (_this.destY - _this.startY) / _this.Time;
        app_1.App.Field.MoonEffectList.ItemList.push(_this);
        _this.State = MoonEffectState.Await;
        return _this;
    }
    MoonDashEffect.prototype.Dispatcher = function () {
        if (this.State == MoonEffectState.Await) {
            this.State = MoonEffectState.Alive;
            this.TimeLeft = 0;
        }
        else if (this.State == MoonEffectState.Alive) {
            this.TimeLeft += app_1.App.DeltaTime;
            this.Mob.X = this.startX + this.dX * this.TimeLeft;
            this.Mob.Y = this.startY + this.dY * this.TimeLeft;
            if (this.Time < this.TimeLeft) {
                this.State = MoonEffectState.Done;
                this.Deleted = true;
                this.Mob.X = this.destX;
                this.Mob.Y = this.destY;
            }
        }
    };
    return MoonDashEffect;
}(sobject_1.SObjectXY));
exports.MoonDashEffect = MoonDashEffect;
var MoonEffectList = /** @class */ (function (_super) {
    __extends(MoonEffectList, _super);
    function MoonEffectList() {
        var _this = _super.call(this) || this;
        _this.counter = new mcounter_1.MCounter(60, 1, false);
        return _this;
    }
    MoonEffectList.prototype.Dispatcher = function () {
        _super.prototype.Dispatcher.call(this);
    };
    return MoonEffectList;
}(sobject_1.SObjectList));
exports.MoonEffectList = MoonEffectList;
//# sourceMappingURL=effect.js.map