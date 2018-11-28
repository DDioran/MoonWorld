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
var app_1 = require("../global/app");
var MChatList = /** @class */ (function (_super) {
    __extends(MChatList, _super);
    function MChatList(x, y, width, height, type) {
        var _this = _super.call(this, x, y, width, height) || this;
        _this.ChatType = type;
        _this.ListElement = null;
        _this.color = "yellow";
        //this.TransparentEvents = true;
        _this.GenerateHtmlTemplate();
        return _this;
    }
    MChatList.prototype.GenerateHtmlTemplate = function () {
        this.HtmlTemplate = "<div style='xpointer-events: none;overflow-y:scroll;font-size:16px;background-color:rgba(255, 255, 255, 0.1)'><div>";
    };
    MChatList.prototype.CreateControl = function () {
        _super.prototype.CreateControl.call(this);
        this.ListElement = this.HtmlNode.childNodes[0].childNodes[0];
    };
    MChatList.prototype.OnAjustmentHtml = function () {
        _super.prototype.OnAjustmentHtml.call(this);
        if (this.ListElement) {
            this.ListElement.style.color = this.color;
            this.ListElement.style.width = (this.width - 0).toFixed(0) + 'px';
            this.ListElement.style.height = (this.height - 0).toFixed(0) + 'px';
        }
    };
    MChatList.prototype.AddLine = function (id, color, text) {
        var template = document.createElement('template');
        if (id == null)
            template.innerHTML = "<div>" + text + "</div>";
        else {
            var mob = app_1.App.Field.MoonMobList.ItemList.filter(function (i) { return i.MobId == id; })[0];
            template.innerHTML = "<div><span class='m-chat-link'>" + mob.Name + "</span>: " + text + "</div>";
        }
        var obj = template.content.firstChild;
        obj.style.color = color;
        this.ListElement.appendChild(obj);
        if (id != null)
            obj.childNodes[0].addEventListener('mousedown', function (evt) {
                if (evt.button == 2)
                    app_1.App.Field.ContextObjectMenu(evt.x, evt.y, id);
            });
        this.ListElement.scrollTop = this.ListElement.scrollHeight - this.ListElement.clientHeight;
    };
    return MChatList;
}(mhtml_1.MHtml));
exports.MChatList = MChatList;
//# sourceMappingURL=chatlist.js.map