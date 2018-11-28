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
var app_1 = require("../global/app");
var mgfx_1 = require("../mlib/mgfx");
var MFixButton = /** @class */ (function (_super) {
    __extends(MFixButton, _super);
    function MFixButton() {
        var _this = _super.call(this) || this;
        _this.sprite = app_1.App.Resx.GetPackResource(_this.PackName);
        _this.transparent = true;
        _this.BorderVisible = false;
        _this.text = "but";
        _this.font = "24px Roboto-Bold";
        _this.Ajustment();
        _this.canmousecapture = true;
        return _this;
    }
    Object.defineProperty(MFixButton.prototype, "PackHolderNames", {
        set: function (value) {
            this.packHolderNames = value;
            this.Ajustment();
        },
        enumerable: true,
        configurable: true
    });
    MFixButton.prototype.OnInit = function () {
        _super.prototype.OnInit.call(this);
        this.PackName = "buttons";
        this.packHolderNames = ["sel_button_green", "sel_button_green_hover", "sel_button_green_push"];
    };
    MFixButton.prototype.Ajustment = function () {
        this.width = this.sprite.ii.n[this.packHolderNames[0]].w;
        this.height = this.sprite.ii.n[this.packHolderNames[0]].h;
    };
    MFixButton.prototype.OnLayerPaint = function () {
        _super.prototype.OnLayerPaint.call(this);
        var idx = 0, ofs = 0;
        if (this.enabled) {
            if (this.Selected)
                idx = 3;
            else if (this.mouseHover || this.mouseDown) {
                idx = 1;
                if (this.mouseHover && this.mouseDown) {
                    idx = 2;
                    ofs = 1;
                }
            }
        }
        var img = this.sprite.ii.n[this.packHolderNames[idx]];
        mgfx_1.Gpx.DrawImageExact(img.img, this.gx, this.gy, img.w, img.h);
        var wt = mgfx_1.Gpx.MeasureText(this.text, this.font).width;
        var ht = parseInt(this.font) * 1.4;
        mgfx_1.Gpx.TText2(this.color, this.ShadowColor, this.text, this.gx + (this.width - wt) / 2 + this.TextMarginLeft + ofs, this.gy + (this.height - ht) / 2 + this.TextMarginTop + ofs, this.font);
    };
    return MFixButton;
}(mphpanel_1.MPlaceHolderPanel));
exports.MFixButton = MFixButton;
//# sourceMappingURL=mfixbutton.js.map