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
var mhtml_1 = require("./mhtml");
var app_1 = require("../global/app");
var mgfx_1 = require("./mgfx");
var MTextBox = /** @class */ (function (_super) {
    __extends(MTextBox, _super);
    function MTextBox() {
        var _this = _super.call(this) || this;
        _this.sprite = app_1.App.Resx.GetPackResource(_this.PackName);
        _this.text = "text";
        _this.TextBoxElement = null;
        _this.height = _this.sprite.ii.n.textbox_left.h;
        _this.color = "#D0B393";
        _this.GenerateHtmlTemplate();
        return _this;
    }
    Object.defineProperty(MTextBox.prototype, "Password", {
        set: function (value) {
            this.password = value;
            this.GenerateHtmlTemplate();
        },
        enumerable: true,
        configurable: true
    });
    MTextBox.prototype.OnInit = function () {
        _super.prototype.OnInit.call(this);
        this.PackName = "controls";
        this.Password = false;
    };
    MTextBox.prototype.GenerateHtmlTemplate = function () {
        var tt = "textbox";
        if (this.password)
            tt = "password";
        this.HtmlTemplate = "<input type='" + tt + "' style='background-color: transparent;border: 0px solid;outline:none;font-size:24px;' autocomplete='new-password' />";
    };
    MTextBox.prototype.CreateControl = function () {
        var _this = this;
        _super.prototype.CreateControl.call(this);
        this.TextBoxElement = this.HtmlNode.childNodes[0].childNodes[0];
        this.TextBoxElement.value = this.text;
        this.TextBoxElement.addEventListener('input', function (evt) { _this.OnChangeTextByUser(); }, false);
        this.TextBoxElement.addEventListener('keyup', function (evt) { _this.OnChangeTextByUser(); }, false);
    };
    MTextBox.prototype.OnChangeTextByUser = function () {
        this.text = this.TextBoxElement.value;
    };
    MTextBox.prototype.OnAjustmentHtml = function () {
        _super.prototype.OnAjustmentHtml.call(this);
        if (this.TextBoxElement) {
            this.HolderElement.style.left = (this.gx + 5).toFixed(0) + 'px';
            this.HolderElement.style.top = (this.gy + 1).toFixed(0) + 'px';
            this.TextBoxElement.style.width = (this.width - 10).toFixed(0) + 'px';
            this.TextBoxElement.style.height = (this.height - 2).toFixed(0) + 'px';
            this.TextBoxElement.style.color = this.Color;
        }
    };
    MTextBox.prototype.OnPaint = function () {
        _super.prototype.OnPaint.call(this);
        var img = this.sprite.ii.n.textbox_left;
        var img_w = img.w;
        if (img_w > this.width)
            img_w = this.width;
        mgfx_1.Gpx.DrawImageExact(img.img, this.gx, this.gy, img_w, img.h);
        if (img.w < this.width) {
            img = this.sprite.ii.n.textbox_fill;
            mgfx_1.Gpx.DrawImageExactW(img.img, this.gx + img_w, this.gy, img.w, img.h, this.width - img.w);
        }
        ;
        img = this.sprite.ii.n.textbox_right;
        mgfx_1.Gpx.DrawImageExact(img.img, this.gx + this.width - img.w, this.gy, img.w, img.h);
    };
    return MTextBox;
}(mhtml_1.MHtml));
exports.MTextBox = MTextBox;
//# sourceMappingURL=mtextbox.js.map