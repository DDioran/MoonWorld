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
var mcontrol_1 = require("./mcontrol");
var app_1 = require("../global/app");
var MHtml = /** @class */ (function (_super) {
    __extends(MHtml, _super);
    function MHtml(x, y, width, height, text) {
        var _this = _super.call(this, x, y, width, height, text) || this;
        _this.HtmlOutTemplate = "<div style='@style1;position: relative;display:none;'><div style='@style2;position: absolute;top:@toppx;left:@leftpx'>@template</div></div>";
        _this.HtmlTemplate = "HTML Template";
        _this.HtmlNode = null;
        _this.HolderElement = null;
        _this.TransparentEvents = false;
        return _this;
    }
    MHtml.prototype.OnInit = function () {
        _super.prototype.OnInit.call(this);
    };
    MHtml.prototype.FullHtml = function () {
        var html = this.HtmlOutTemplate;
        html = html.replace("@left", this.gx.toFixed(0));
        html = html.replace("@top", this.gy.toFixed(0));
        var style = this.TransparentEvents ? 'pointer-events: none' : '';
        html = html.replace("@style1", style);
        html = html.replace("@style2", style);
        html = html.replace("@template", this.HtmlTemplate);
        return html;
    };
    MHtml.prototype.CreateControl = function () {
        if (this.HtmlNode)
            return;
        this.HtmlNode = this.htmlToElement(this.FullHtml());
        app_1.App.Html.insertBefore(this.HtmlNode, app_1.App.Canvas);
        this.HolderElement = this.HtmlNode.childNodes[0];
    };
    MHtml.prototype.DestroyControl = function () {
        if (!this.HtmlNode)
            return;
        app_1.App.Html.removeChild(this.HtmlNode);
        this.HtmlNode = null;
        this.HolderElement = null;
    };
    MHtml.prototype.Show = function () {
        this.visible = true;
        if (!this.HtmlNode)
            return;
        this.HtmlNode.style.display = 'block';
    };
    Object.defineProperty(MHtml.prototype, "Visible", {
        set: function (value) {
            this.visible = value;
            if (this.HtmlNode)
                if (this.visible)
                    this.Show();
                else
                    this.Hide();
        },
        enumerable: true,
        configurable: true
    });
    MHtml.prototype.Hide = function () {
        this.visible = false;
        if (!this.HtmlNode)
            return;
        this.HtmlNode.style.display = 'none';
    };
    MHtml.prototype.OnActivate = function () {
        this.CreateControl();
        if (this.visible)
            this.Show();
        this.OnAjustmentHtml();
    };
    MHtml.prototype.OnDeactivate = function () {
        this.DestroyControl();
    };
    MHtml.prototype.OnAjustmentPosition = function () {
        _super.prototype.OnAjustmentPosition.call(this);
        this.OnAjustmentHtml();
    };
    MHtml.prototype.OnAjustmentHtml = function () {
        if (this.HolderElement) {
            this.HolderElement.style.left = this.gx.toFixed(0) + 'px';
            this.HolderElement.style.top = this.gy.toFixed(0) + 'px';
        }
    };
    MHtml.prototype.htmlToElement = function (html) {
        var template = document.createElement('template');
        html = html.trim();
        template.innerHTML = html;
        return template.content.firstChild;
    };
    MHtml.prototype.OnPaint = function () {
    };
    return MHtml;
}(mcontrol_1.MControl));
exports.MHtml = MHtml;
//# sourceMappingURL=mhtml.js.map