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
var mgfx_1 = require("./mgfx");
var app_1 = require("../global/app");
var MBorder = /** @class */ (function (_super) {
    __extends(MBorder, _super);
    function MBorder() {
        var _this = _super.call(this) || this;
        _this.sprite = app_1.App.Resx.GetPackResource(_this.PackName);
        _this.transparent = true;
        _this.BorderVisible = false;
        return _this;
    }
    MBorder.prototype.OnInit = function () {
        _super.prototype.OnInit.call(this);
        this.PackName = "window";
        this.PackHolderNames = ["pan_ul", "pan_u", "pan_ur", "pan_dl", "pan_d", "pan_dr", "pan_l", "pan_r", "win_m"];
    };
    MBorder.prototype.OnLayerPaint = function () {
        _super.prototype.OnLayerPaint.call(this);
        var img_ul = this.sprite.ii.n[this.PackHolderNames[0]];
        var img_ul_w = img_ul.w;
        if (img_ul_w > this.width)
            img_ul_w = this.width;
        mgfx_1.Gpx.DrawImageExact(img_ul.img, this.gx, this.gy, img_ul_w, img_ul.h);
        if (img_ul.w < this.width) {
            var img_u = this.sprite.ii.n[this.PackHolderNames[1]];
            mgfx_1.Gpx.DrawImageExactW(img_u.img, this.gx + img_ul_w, this.gy, img_u.w, img_u.h, this.width - img_ul.w);
        }
        ;
        var img_ur = this.sprite.ii.n[this.PackHolderNames[2]];
        mgfx_1.Gpx.DrawImageExact(img_ur.img, this.gx + this.width - img_ur.w, this.gy, img_ur.w, img_ur.h);
        var img_dl = this.sprite.ii.n[this.PackHolderNames[3]];
        mgfx_1.Gpx.DrawImageExact(img_dl.img, this.gx, this.gy + this.height - img_dl.h, img_ul_w, img_ul.h);
        if (img_ul.w < this.width) {
            var img_d = this.sprite.ii.n[this.PackHolderNames[4]];
            mgfx_1.Gpx.DrawImageExactW(img_d.img, this.gx + img_ul_w, this.gy + this.height - img_dl.h, img_d.w, img_d.h, this.width - img_ul.w);
        }
        var img_dr = this.sprite.ii.n[this.PackHolderNames[5]];
        mgfx_1.Gpx.DrawImageExact(img_dr.img, this.gx + this.width - img_ur.w, this.gy + this.height - img_dl.h, img_dr.w, img_dr.h);
        var img_l = this.sprite.ii.n[this.PackHolderNames[6]];
        mgfx_1.Gpx.DrawImageExactH(img_l.img, this.gx, this.gy + img_ul.h, img_l.w, img_l.h, this.height - img_ur.h - img_dr.h);
        var img_r = this.sprite.ii.n[this.PackHolderNames[7]];
        mgfx_1.Gpx.DrawImageExactH(img_r.img, this.gx + this.width - img_r.w, this.gy + img_ul.h, img_r.w, img_r.h, this.height - img_ur.h - img_dr.h);
    };
    return MBorder;
}(mphpanel_1.MPlaceHolderPanel));
exports.MBorder = MBorder;
//# sourceMappingURL=mborder.js.map