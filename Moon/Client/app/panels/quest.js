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
var mfloat_1 = require("../ui/mfloat");
var QuestPanel = /** @class */ (function (_super) {
    __extends(QuestPanel, _super);
    function QuestPanel(npc, info) {
        var _this = _super.call(this, 100, 100) || this;
        _this.width = 500;
        _this.height = 700;
        _this.Npc = npc;
        _this.Info = info;
        _this.GenerateHtmlTemplate();
        return _this;
    }
    QuestPanel.prototype.OnAjustmentHtml = function () {
        _super.prototype.OnAjustmentHtml.call(this);
        if (this.HolderElement) {
            this.HolderElement.style.width = this.width.toFixed(0) + 'px';
            this.HolderElement.style.height = this.height.toFixed(0) + 'px';
        }
    };
    QuestPanel.prototype.GenerateHtmlTemplate = function () {
        var onesep = "<div class='m-context-panel-separator'><div></div></div>";
        var dblsep = "<div class='m-context-panel-doubleseparator'><div></div></div>";
        var quest = "";
        this.Info.questCompleteList.forEach(function (q) {
            quest += "<div>? " + q.title + "</div>";
        });
        this.Info.questOfferList.forEach(function (q) {
            quest += "<div>! " + q.title + "</div>";
        });
        var content = "<div class='m-context-panel-label'>" + this.Info.title + "</div>\n        " + dblsep + "\n        <div class='m-context-panel-body' mid='main'>\n          <div mid='text'>\n            " + this.Info.description + "\n          </div>\n          <div mid='quest'>\n            " + onesep + "\n            " + quest + "\n          </div>\n          <div class='m-window-float-buttons'>\n            " + onesep + "\n            <span mid='ok' class='m-window-float-button'><span>\u041E\u043A</span></span>\n          </div>\n        </div>";
        this.HtmlTemplate = "<div class='m-context-panel'>" + content + "</div>";
    };
    QuestPanel.prototype.CreateControl = function () {
        _super.prototype.CreateControl.call(this);
        this.QuestElement = this.HtmlNode.childNodes[0].childNodes[0];
        this.HolderElement.style.backgroundColor = this.bgColor;
        this.HolderElement.style.padding = '3px';
        this.main = this.QuestElement.querySelector("div[mid='main']");
        this.mainText = this.main.querySelector("div[mid='text']");
        this.mainQuest = this.main.querySelector("div[mid='quest']");
        this.mainOk = this.main.querySelector("div[mid='ok']");
    };
    return QuestPanel;
}(mfloat_1.MFloat));
exports.QuestPanel = QuestPanel;
//# sourceMappingURL=quest.js.map