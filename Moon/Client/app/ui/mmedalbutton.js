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
var mfixbutton_1 = require("./mfixbutton");
var mgfx_1 = require("../mlib/mgfx");
var moon_info_1 = require("../service/moon-info");
var MMedalButton = /** @class */ (function (_super) {
    __extends(MMedalButton, _super);
    function MMedalButton() {
        var _this = _super.call(this) || this;
        _this.text = "";
        _this.font = "24px Roboto-Bold";
        _this.ClassType = moon_info_1.PlayerClassType.Knight;
        return _this;
    }
    MMedalButton.prototype.OnInit = function () {
        _super.prototype.OnInit.call(this);
        this.packHolderNames = ["sel_char_medal", "sel_char_medal_hover", "sel_char_medal_push", "sel_char_medal_focus"];
    };
    MMedalButton.prototype.OnLayerPaint = function () {
        _super.prototype.OnLayerPaint.call(this);
        var x = 38, y = 46;
        var img = this.sprite.ii.n.sel_char_medal_pic;
        mgfx_1.Gpx.DrawImage(img.img, this.gx + x, this.gy + y);
        x += 25;
        y += 24;
        var text = "";
        switch (this.ClassType) {
            case moon_info_1.PlayerClassType.Knight:
                img = this.sprite.ii.n.sel_char_medal_warrior;
                mgfx_1.Gpx.DrawImage(img.img, this.gx + x, this.gy + y);
                text = "Мечник";
                break;
            case moon_info_1.PlayerClassType.Mage:
                img = this.sprite.ii.n.sel_char_medal_wizzard;
                mgfx_1.Gpx.DrawImage(img.img, this.gx + x + 3, this.gy + y);
                text = "Волшебник";
                break;
            case moon_info_1.PlayerClassType.Archer:
                img = this.sprite.ii.n.sel_char_medal_archer;
                mgfx_1.Gpx.DrawImage(img.img, this.gx + x, this.gy + y);
                text = "Лучник";
                break;
            case moon_info_1.PlayerClassType.Priest:
                img = this.sprite.ii.n.sel_char_medal_healer;
                mgfx_1.Gpx.DrawImage(img.img, this.gx + x + 12, this.gy + y);
                text = "Лекарь";
                break;
        }
        var wt = mgfx_1.Gpx.MeasureText(text, this.font).width;
        var ht = mgfx_1.Gpx.MeasureText("M", this.font).width;
        mgfx_1.Gpx.TText2("#C0A383", "#675748", text, this.gx + (this.width - wt) / 2 + 0, this.gy + (this.height - ht) / 2 + 120, this.font);
    };
    return MMedalButton;
}(mfixbutton_1.MFixButton));
exports.MMedalButton = MMedalButton;
//# sourceMappingURL=mmedalbutton.js.map