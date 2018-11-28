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
var mborder_1 = require("./mborder");
var MPanel = /** @class */ (function (_super) {
    __extends(MPanel, _super);
    function MPanel() {
        return _super.call(this) || this;
    }
    MPanel.prototype.OnInit = function () {
        _super.prototype.OnInit.call(this);
    };
    MPanel.prototype.OnLayerPaint = function () {
        var img = this.sprite.ii.n[this.PackHolderNames[8]];
        for (var j = 0; j < this.height; j += img.h)
            for (var i = 0; i < this.width; i += img.w) {
                var w = img.w, h = img.h;
                if (i + w > this.width)
                    w = this.width - i;
                if (j + h > this.height)
                    h = this.height - j;
                mgfx_1.Gpx.DrawImageExact(img.img, this.gx + i, this.gy + j, w, h);
            }
        _super.prototype.OnLayerPaint.call(this);
    };
    return MPanel;
}(mborder_1.MBorder));
exports.MPanel = MPanel;
//# sourceMappingURL=mpanel.js.map