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
var mphpanel_1 = require("./mphpanel");
var app_1 = require("../global/app");
var MImage = /** @class */ (function (_super) {
    __extends(MImage, _super);
    function MImage() {
        var _this = _super.call(this) || this;
        _this.transparent = true;
        _this.BorderVisible = false;
        _this.sprite = null;
        return _this;
    }
    Object.defineProperty(MImage.prototype, "PackName", {
        set: function (value) {
            this.packName = value;
            this.Ajustment();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MImage.prototype, "ImageName", {
        set: function (value) {
            this.imageName = value;
            this.Ajustment();
        },
        enumerable: true,
        configurable: true
    });
    MImage.prototype.Ajustment = function () {
        this.sprite = null;
        if (this.packName) {
            this.sprite = app_1.App.Resx.GetPackResource(this.packName);
            if (this.imageName) {
                var img = this.sprite.ii.n[this.imageName];
                this.width = img.w;
                this.height = img.h;
                this.AjustmentPosition();
            }
        }
    };
    MImage.prototype.OnLayerPaint = function () {
        if (this.imageName) {
            var img = this.sprite.ii.n[this.imageName];
            mgfx_1.Gpx.DrawImageExact(img.img, this.gx, this.gy, this.width, this.height);
        }
    };
    return MImage;
}(mphpanel_1.MPlaceHolderPanel));
exports.MImage = MImage;
//# sourceMappingURL=mimage.js.map