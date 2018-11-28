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
var mfloat_1 = require("./mfloat");
var events_1 = require("../mlib/events");
var app_1 = require("../global/app");
var MessageBoxButton;
(function (MessageBoxButton) {
    MessageBoxButton[MessageBoxButton["mbOk"] = 0] = "mbOk";
    MessageBoxButton[MessageBoxButton["mbCancel"] = 1] = "mbCancel";
})(MessageBoxButton = exports.MessageBoxButton || (exports.MessageBoxButton = {}));
var MessageBoxClickArgs = /** @class */ (function (_super) {
    __extends(MessageBoxClickArgs, _super);
    function MessageBoxClickArgs(Type) {
        var _this = _super.call(this) || this;
        _this.Type = Type;
        return _this;
    }
    return MessageBoxClickArgs;
}(events_1.EventArgs));
exports.MessageBoxClickArgs = MessageBoxClickArgs;
var MMessageBox = /** @class */ (function (_super) {
    __extends(MMessageBox, _super);
    function MMessageBox(width, height, caption, text, buttons) {
        if (buttons === void 0) { buttons = null; }
        var _this = _super.call(this, 0, 0, width, height) || this;
        _this.text = text;
        _this.Caption = caption;
        if (!buttons || Array.isArray(buttons) && !buttons.length)
            buttons = MessageBoxButton.mbOk;
        if (!Array.isArray(buttons))
            buttons = [buttons];
        _this.Buttons = buttons;
        _this.GenerateHtmlTemplate();
        return _this;
    }
    MMessageBox.prototype.OnActivate = function () {
        this.X = (app_1.App.Field.Width - this.width) / 2;
        this.Y = (app_1.App.Field.Height - this.height) / 3;
        _super.prototype.OnActivate.call(this);
        if (app_1.App.Field.MessageBox)
            return;
        app_1.App.Field.MessageBox = this;
    };
    MMessageBox.prototype.ResizeWindow = function () {
        this.X = (app_1.App.Field.Width - this.width) / 2;
        this.Y = (app_1.App.Field.Height - this.height) / 3;
        _super.prototype.ResizeWindow.call(this);
    };
    MMessageBox.prototype.OnDeactivate = function () {
        _super.prototype.OnDeactivate.call(this);
        app_1.App.Field.MessageBox = null;
    };
    MMessageBox.prototype.GenerateHtmlTemplate = function () {
        var buttons = '';
        this.Buttons.forEach(function (b) {
            var title = '';
            switch (b) {
                case MessageBoxButton.mbOk:
                    title = 'Принять';
                    break;
                case MessageBoxButton.mbCancel:
                    title = 'Отмена';
                    break;
            }
            buttons += "<span class='m-window-float-button'><span>" + title + "</span></span>";
        });
        var content = "<div class='m-window-float-caption'>" + this.Caption + "</div>\n      <div class='m-window-float-body'>" + this.text + "</div>\n      <div class='m-window-float-buttons'>" + buttons + "</div>";
        this.HtmlTemplate = "<div class='m-window-float'>" + content + "</div>";
    };
    MMessageBox.prototype.CreateControl = function () {
        var _this = this;
        _super.prototype.CreateControl.call(this);
        this.MessageElement = this.HtmlNode.childNodes[0].childNodes[0];
        this.HolderElement.style.backgroundColor = this.bgColor;
        this.HolderElement.style.padding = '3px';
        for (var i = 0; i < this.Buttons.length; i++) {
            this.MessageElement.children.item(2).children.item(i).tagId = this.Buttons[i];
            this.MessageElement.children.item(2).children.item(i).addEventListener('click', function (evt) {
                if (_this.ButtonClick)
                    _this.ButtonClick(_this, new MessageBoxClickArgs(evt.currentTarget.tagId));
                _this.Deactivate();
                _this.Parent.Controls.Remove(_this);
            });
        }
        ;
    };
    MMessageBox.prototype.OnAjustmentHtml = function () {
        _super.prototype.OnAjustmentHtml.call(this);
        if (this.MessageElement) {
            this.MessageElement.style.width = this.width + 'px';
            this.MessageElement.style.height = this.height + 'px';
            this.MessageElement.children.item(1).style.height = (this.height - 100) + 'px';
        }
    };
    return MMessageBox;
}(mfloat_1.MFloat));
exports.MMessageBox = MMessageBox;
//# sourceMappingURL=mmessagebox.js.map