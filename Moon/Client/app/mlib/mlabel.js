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
var mphpanel_1 = require("./mphpanel");
var mcontrol_1 = require("./mcontrol");
var mgfx_1 = require("./mgfx");
var MLabel = /** @class */ (function (_super) {
    __extends(MLabel, _super);
    function MLabel() {
        var _this = _super.call(this) || this;
        _this.transparent = true;
        _this.BorderVisible = false;
        _this.TextAlign = mcontrol_1.MAlign.None;
        _this.TextVAlign = mcontrol_1.MVAlign.None;
        _this.text = "Label";
        return _this;
    }
    MLabel.prototype.OnPaint = function () {
        _super.prototype.OnPaint.call(this);
        var wt = mgfx_1.Gpx.MeasureText(this.text, this.font).width;
        var ht = mgfx_1.Gpx.MeasureText("M", this.font).width;
        var x = 0, y = 0;
        if (this.TextAlign == mcontrol_1.MAlign.Right)
            x = this.width - wt;
        if (this.TextAlign == mcontrol_1.MAlign.Center)
            x = (this.width - wt) / 2;
        if (this.TextVAlign == mcontrol_1.MVAlign.Bottom)
            y = this.height - ht;
        if (this.TextVAlign == mcontrol_1.MVAlign.Middle)
            y = (this.height - ht) / 2;
        mgfx_1.Gpx.TText2(this.Color, this.ShadowColor, this.text, this.gx + x + this.TextMarginLeft, this.gy + y + this.TextMarginTop, this.font);
    };
    return MLabel;
}(mphpanel_1.MPlaceHolderPanel));
exports.MLabel = MLabel;
//# sourceMappingURL=mlabel.js.map