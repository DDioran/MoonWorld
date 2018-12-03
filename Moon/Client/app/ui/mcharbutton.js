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
var info_1 = require("../service/info");
var MCharacterButton = /** @class */ (function (_super) {
    __extends(MCharacterButton, _super);
    function MCharacterButton() {
        var _this = _super.call(this) || this;
        _this.text = "MCharacterButton";
        _this.font = "24px CoreRhino-Bold";
        _this.TextMarginLeft;
        return _this;
    }
    MCharacterButton.prototype.OnInit = function () {
        _super.prototype.OnInit.call(this);
        this.packHolderNames = ["sel_char_button", "sel_char_button_hover", "sel_char_button_push", "sel_char_button_focus"];
    };
    MCharacterButton.prototype.OnLayerPaint = function () {
        //super.OnLayerPaint();
        var idx = 0;
        if (this.enabled) {
            if (this.Selected)
                idx = 3;
            else if (this.mouseHover || this.mouseDown) {
                idx = 1;
                if (this.mouseHover && this.mouseDown)
                    idx = 2;
            }
        }
        var img = this.sprite.ii.n[this.packHolderNames[idx]];
        mgfx_1.Gpx.DrawImageExact(img.img, this.gx, this.gy, img.w, img.h);
        img = this.sprite.ii.n.sel_char_button_pic_full;
        mgfx_1.Gpx.DrawImage(img.img, this.gx, this.gy + 2);
        if (this.Selected) {
            img = this.sprite.ii.n.sel_char_button_focus_pic;
            mgfx_1.Gpx.DrawImage(img.img, this.gx + 44, this.gy + 2);
        }
        var x = 10, y = 12;
        var text = "";
        switch (this.CharInfo.ClassType) {
            case info_1.PlayerClassType.Knight:
                img = this.sprite.ii.n.sel_char_medal_warrior;
                mgfx_1.Gpx.DrawImage(img.img, this.gx + x, this.gy + y);
                text = "Мечник";
                break;
            case info_1.PlayerClassType.Mage:
                img = this.sprite.ii.n.sel_char_medal_wizzard;
                mgfx_1.Gpx.DrawImage(img.img, this.gx + x + 3, this.gy + y);
                text = "Волшебник";
                break;
            case info_1.PlayerClassType.Archer:
                img = this.sprite.ii.n.sel_char_medal_archer;
                mgfx_1.Gpx.DrawImage(img.img, this.gx + x + 1, this.gy + y + 1);
                text = "Лучник";
                break;
            case info_1.PlayerClassType.Priest:
                img = this.sprite.ii.n.sel_char_medal_healer;
                mgfx_1.Gpx.DrawImage(img.img, this.gx + x + 13, this.gy + y);
                text = "Лекарь";
                break;
        }
        var font = "18px CoreRhino-Bold";
        var wt = mgfx_1.Gpx.MeasureText(text, font).width;
        mgfx_1.Gpx.TText2(this.color, this.ShadowColor, this.text, this.gx + 80, this.gy + 4, this.font);
        mgfx_1.Gpx.TText2(this.color, this.ShadowColor, text, this.gx + 80, this.gy + 34, font);
        mgfx_1.Gpx.TText2(this.color, this.ShadowColor, "Level " + this.CharInfo.Level.toFixed(0), this.gx + 90 + wt, this.gy + 34, "18px CoreRhino-Regular");
    };
    return MCharacterButton;
}(mfixbutton_1.MFixButton));
exports.MCharacterButton = MCharacterButton;
//# sourceMappingURL=mcharbutton.js.map