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
var mcontextfloat_1 = require("./mcontextfloat");
var events_1 = require("../mlib/events");
var app_1 = require("../global/app");
var ContextMenuClickArgs = /** @class */ (function (_super) {
    __extends(ContextMenuClickArgs, _super);
    function ContextMenuClickArgs(Index) {
        var _this = _super.call(this) || this;
        _this.Index = Index;
        return _this;
    }
    return ContextMenuClickArgs;
}(events_1.EventArgs));
exports.ContextMenuClickArgs = ContextMenuClickArgs;
var MContextMenu = /** @class */ (function (_super) {
    __extends(MContextMenu, _super);
    function MContextMenu(x, y, mob, menu) {
        var _this = _super.call(this, x, y) || this;
        _this.Mob = mob;
        _this.ListMenu = menu;
        _this.GenerateHtmlTemplate();
        return _this;
    }
    MContextMenu.prototype.GenerateHtmlTemplate = function () {
        var content = "<div class='m-context-menu-label'>" + this.Mob.Name + "</div><div class='m-context-menu-doubleseparator'><div></div></div>";
        this.ListMenu.forEach(function (lm) {
            if (lm == '')
                content += "<div class='m-context-menu-separator'><div></div></div>";
            else
                content += "<div>" + lm + "</div>";
        });
        this.HtmlTemplate = "<div class='m-context-menu'>" + content + "</div>";
    };
    MContextMenu.prototype.CreateControl = function () {
        var _this = this;
        _super.prototype.CreateControl.call(this);
        this.MenuElement = this.HtmlNode.childNodes[0].childNodes[0];
        this.HolderElement.style.backgroundColor = this.bgColor;
        this.HolderElement.style.padding = '3px';
        for (var i = 0; i < this.ListMenu.length; i++) {
            if (this.ListMenu[i] == '')
                continue;
            this.MenuElement.childNodes[i + 2].tagId = i;
            this.MenuElement.childNodes[i + 2].addEventListener('click', function (evt) {
                if (_this.ContextMenuClick)
                    _this.ContextMenuClick(_this, new ContextMenuClickArgs(evt.currentTarget.tagId));
                app_1.App.Field.DropContextPanels();
            }, false);
        }
        ;
    };
    return MContextMenu;
}(mcontextfloat_1.MContextFloat));
exports.MContextMenu = MContextMenu;
//# sourceMappingURL=mcontextmenu.js.map