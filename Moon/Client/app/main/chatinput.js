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
var mhtml_1 = require("../mlib/mhtml");
var mgfx_1 = require("../mlib/mgfx");
var events_1 = require("../mlib/events");
var MChatInput = /** @class */ (function (_super) {
    __extends(MChatInput, _super);
    function MChatInput(x, y, width, height) {
        var _this = _super.call(this, x, y, width, height) || this;
        _this.text = "";
        _this.TextBoxElement = null;
        _this.color = "#D0B393";
        _this.GenerateHtmlTemplate();
        return _this;
    }
    MChatInput.prototype.GenerateHtmlTemplate = function () {
        this.HtmlTemplate = "<input type='textbox' style='background-color: transparent;border: 0px solid;outline:none;font-size:14px;' autocomplete='no' />";
    };
    Object.defineProperty(MChatInput.prototype, "Text", {
        get: function () {
            return this.text;
        },
        set: function (value) {
            this.text = value;
            this.TextBoxElement.value = this.text;
        },
        enumerable: true,
        configurable: true
    });
    MChatInput.prototype.CreateControl = function () {
        var _this = this;
        _super.prototype.CreateControl.call(this);
        this.TextBoxElement = this.HtmlNode.childNodes[0].childNodes[0];
        this.TextBoxElement.value = this.text;
        this.TextBoxElement.addEventListener('input', function (evt) { _this.OnChangeTextByUser(evt); }, false);
        this.TextBoxElement.addEventListener('keyup', function (evt) { _this.OnChangeTextByUser(evt); }, false);
    };
    MChatInput.prototype.OnChangeTextByUser = function (evt) {
        this.text = this.TextBoxElement.value;
        if (evt.keyCode == 13 && this.EnterText)
            this.EnterText(this, new events_1.EventArgs());
    };
    MChatInput.prototype.OnAjustmentHtml = function () {
        _super.prototype.OnAjustmentHtml.call(this);
        if (this.TextBoxElement) {
            this.HolderElement.style.left = (this.gx + 5).toFixed(0) + 'px';
            this.HolderElement.style.top = (this.gy + 1).toFixed(0) + 'px';
            this.TextBoxElement.style.width = (this.width - 10).toFixed(0) + 'px';
            this.TextBoxElement.style.height = (this.height - 2).toFixed(0) + 'px';
            this.TextBoxElement.style.color = this.Color;
        }
    };
    MChatInput.prototype.AfterPaint = function () {
        mgfx_1.Gpx.DrawRect("rgba(250,250,200,0.6)", this.gx, this.gy, this.width, this.height);
    };
    MChatInput.prototype.IsFocus = function () {
        if (!this.TextBoxElement)
            return false;
        return this.TextBoxElement == document.activeElement;
    };
    MChatInput.prototype.DropFocus = function () {
        if (this.IsFocus())
            this.TextBoxElement.blur();
    };
    return MChatInput;
}(mhtml_1.MHtml));
exports.MChatInput = MChatInput;
//# sourceMappingURL=chatinput.js.map