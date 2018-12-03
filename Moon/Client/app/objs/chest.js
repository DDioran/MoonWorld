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
var app_1 = require("../global/app");
var mgfx_1 = require("../mlib/mgfx");
var MoonGradeType;
(function (MoonGradeType) {
    MoonGradeType[MoonGradeType["Common"] = 0] = "Common";
    MoonGradeType[MoonGradeType["Uncommon"] = 1] = "Uncommon";
    MoonGradeType[MoonGradeType["Rary"] = 2] = "Rary";
    MoonGradeType[MoonGradeType["Legendary"] = 3] = "Legendary"; // легендарный - желтый
})(MoonGradeType = exports.MoonGradeType || (exports.MoonGradeType = {}));
var ChestState;
(function (ChestState) {
    ChestState[ChestState["Await"] = 0] = "Await";
    ChestState[ChestState["Appearance"] = 1] = "Appearance";
    ChestState[ChestState["Restricted"] = 2] = "Restricted";
    ChestState[ChestState["Available"] = 3] = "Available";
    ChestState[ChestState["Disappearance"] = 4] = "Disappearance";
    ChestState[ChestState["Destroy"] = 5] = "Destroy";
})(ChestState = exports.ChestState || (exports.ChestState = {}));
var ChestInfo = /** @class */ (function () {
    function ChestInfo() {
    }
    return ChestInfo;
}());
exports.ChestInfo = ChestInfo;
var MoonChest = /** @class */ (function (_super) {
    __extends(MoonChest, _super);
    function MoonChest() {
        var _this = _super.call(this, 0, 0) || this;
        app_1.App.Field.MoonChestList.ItemList.push(_this);
        _this.State = ChestState.Await;
        return _this;
    }
    MoonChest.prototype.SetInfo = function (ChestInfo) {
        this.X = ChestInfo.x;
        this.Y = ChestInfo.y;
        this.Info = ChestInfo;
        if (this.State != this.Info.state) {
            this.State = this.Info.state;
            if (this.State == ChestState.Destroy)
                this.Deleted = true;
        }
    };
    MoonChest.prototype.Dispatcher = function () {
    };
    MoonChest.prototype.Paint = function () {
        var misc = app_1.App.Resx.GetPackResource("misc");
        var px = Math.floor(-app_1.App.Field.playerx + app_1.App.Field.cx + this.X);
        var py = Math.floor(-app_1.App.Field.playery + app_1.App.Field.cy + this.Y);
        if (this.State == ChestState.Restricted || this.State == ChestState.Available) {
            var font = "11px CoreRhino-Regular";
            var width = mgfx_1.Gpx.MeasureText("Сундук", font).width;
            mgfx_1.Gpx.Text("Yellow", "Сундук", px - width / 2 + 4, py - 16, font);
        }
        if (this.State == ChestState.Restricted && this.Info.players.filter(function (p) { return p == app_1.App.PlayerGuid; }).length == 0) {
            mgfx_1.Gpx.DrawImage(misc.ii.n.chest_closed.img, px - 16, py - 12);
            return;
        }
        if (this.State == ChestState.Available || this.State == ChestState.Restricted) {
            mgfx_1.Gpx.DrawImage(misc.ii.n.chest_opened.img, px - 16, py - 12);
            return;
        }
    };
    return MoonChest;
}(sobject_1.SObjectXY));
exports.MoonChest = MoonChest;
var MoonChestList = /** @class */ (function (_super) {
    __extends(MoonChestList, _super);
    function MoonChestList() {
        return _super.call(this) || this;
    }
    MoonChestList.prototype.Dispatcher = function () {
        _super.prototype.Dispatcher.call(this);
    };
    MoonChestList.FindChest = function (ChestId) {
        return app_1.App.Field.MoonChestList.ItemList.find(function (m) { return m.Info.chestId == ChestId; });
    };
    return MoonChestList;
}(sobject_1.SObjectList));
exports.MoonChestList = MoonChestList;
//# sourceMappingURL=chest.js.map