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
var mgfx_1 = require("./mgfx");
var mpanel_1 = require("./mpanel");
var MWindow = /** @class */ (function (_super) {
    __extends(MWindow, _super);
    function MWindow() {
        return _super.call(this) || this;
    }
    MWindow.prototype.OnInit = function () {
        _super.prototype.OnInit.call(this);
        this.PackHolderNames = ["win_ul", "win_u", "win_ur", "win_dl", "win_d", "win_dr", "win_l", "win_r", "win_m"];
    };
    MWindow.prototype.OnLayerPaint = function () {
        _super.prototype.OnLayerPaint.call(this);
        mgfx_1.Gpx.TText2("#C0A383", "#675748", this.text, this.gx + 24, this.gy + 12, this.font);
    };
    return MWindow;
}(mpanel_1.MPanel));
exports.MWindow = MWindow;
//# sourceMappingURL=mwindow.js.map