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
var app_1 = require("../global/app");
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
            quest += "<div class='m-context-panel-select' code='" + q.itemCode + "' qt='0'>? " + q.title + "</div>";
        });
        this.Info.questOfferList.forEach(function (q) {
            quest += "<div class='m-context-panel-select' code='" + q.itemCode + "' qt='1'>! " + q.title + "</div>";
        });
        var content = "<div class='m-context-panel-label'>" + this.Info.title + "</div>\n       " + dblsep + "\n       <div class='m-context-panel-body' mid='main'>\n         <div>" + this.Info.description + "</div>\n         <div mid='quest'>\n           " + onesep + "\n           " + quest + "\n         </div>\n         <div class='m-window-float-buttons'>\n           " + onesep + "\n           <span class='m-window-float-button'><span mid='ok'>\u0423\u0439\u0442\u0438</span></span>\n         </div>\n       </div>\n       <div class='m-context-panel-body hide' mid='offer'>\n         <div mid='title'></div>\n         <br/>\n         <div mid='text'></div>\n         <br/>\n         <div>\u041D\u0430\u0433\u0440\u0430\u0434\u0430:</div>\n         <div><div class='quest-main-award'>\u041E\u043F\u044B\u0442:</div><div mid='exp' class='quest-main-award-value'></div></div>\n         <div><div class='quest-main-award'>\u041C\u043E\u043D\u0435\u0442\u044B:</div><div mid='coin' class='quest-main-award-value'></div></div>\n         <div class='m-window-float-buttons'>\n           " + onesep + "\n           <span class='m-window-float-button'><span mid='yes'>\u041F\u0440\u0438\u043D\u044F\u0442\u044C</span></span>\n           <span class='m-window-float-button'><span mid='no'>\u041E\u0442\u043C\u0435\u043D\u0430</span></span>\n         </div>\n       </div>";
        this.HtmlTemplate = "<div class='m-context-panel'>" + content + "</div>";
    };
    QuestPanel.prototype.CreateControl = function () {
        var _this = this;
        _super.prototype.CreateControl.call(this);
        this.QuestElement = this.HtmlNode.childNodes[0].childNodes[0];
        this.HolderElement.style.backgroundColor = this.bgColor;
        this.HolderElement.style.padding = '3px';
        this.main = this.QuestElement.querySelector("div[mid='main']");
        this.mainOk = this.main.querySelector("span[mid='ok']");
        this.quest = this.main.querySelector("div[mid='quest']");
        this.offer = this.QuestElement.querySelector("div[mid='offer']");
        this.offerTitle = this.offer.querySelector("div[mid='title']");
        this.offerText = this.offer.querySelector("div[mid='text']");
        this.offerYes = this.offer.querySelector("span[mid='yes']");
        this.offerNo = this.offer.querySelector("span[mid='no']");
        this.exp = this.offer.querySelector("div[mid='exp']");
        this.coin = this.offer.querySelector("div[mid='coin']");
        this.mainOk.addEventListener('click', function (evt) {
            app_1.App.Field.QuestPanel.Hide();
            app_1.App.Field.QuestPanel.Deactivate();
            app_1.App.Field.QuestPanel = null;
            _this.SelfRemove();
        });
        for (var i = 0; i < this.quest.children.length; i++) {
            this.quest.children.item(i).addEventListener('click', function (evt) {
                var code = evt.currentTarget.getAttribute('code');
                if (!code)
                    return;
                var type = evt.currentTarget.getAttribute('qt');
                _this.main.style.display = 'none';
                _this.offer.style.display = 'block';
                _this.selInfo = type == 1 ?
                    _this.Info.questOfferList.find(function (q) { return q.itemCode == code; }) :
                    _this.Info.questCompleteList.find(function (q) { return q.itemCode == code; });
                _this.offerTitle.innerText = _this.selInfo.title;
                _this.offerText.innerText = _this.selInfo.description;
                _this.exp.innerText = _this.selInfo.experience.toFixed(0);
                _this.coin.innerText = _this.selInfo.coins.toFixed(0);
            });
        }
        this.offerYes.addEventListener('click', function (evt) {
        });
        this.offerNo.addEventListener('click', function (evt) {
            _this.main.style.display = 'block';
            _this.offer.style.display = 'none';
        });
    };
    return QuestPanel;
}(mfloat_1.MFloat));
exports.QuestPanel = QuestPanel;
//# sourceMappingURL=quest.js.map