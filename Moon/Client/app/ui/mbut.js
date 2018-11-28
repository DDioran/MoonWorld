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
var mpanel_1 = require("../mlib/mpanel");
var mgfx_1 = require("../mlib/mgfx");
var MBut = /** @class */ (function (_super) {
    __extends(MBut, _super);
    function MBut() {
        var _this = _super.call(this) || this;
        _this.text = "but";
        _this.font = "24px Roboto-Bold";
        return _this;
    }
    MBut.prototype.OnInit = function () {
        _super.prototype.OnInit.call(this);
        this.PackHolderNames = ["but_ul", "but_u", "but_ur", "but_dl", "but_d", "but_dr", "but_l", "but_r", "but_m"];
    };
    MBut.prototype.OnLayerPaint = function () {
        _super.prototype.OnLayerPaint.call(this);
        mgfx_1.Gpx.TText2("#C0A383", "#675748", this.text, this.gx + 32, this.gy + 32, this.font);
    };
    return MBut;
}(mpanel_1.MPanel));
exports.MBut = MBut;
//# sourceMappingURL=mbut.js.map