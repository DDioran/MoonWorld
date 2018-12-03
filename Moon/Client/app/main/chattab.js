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
var mphpanel_1 = require("../mlib/mphpanel");
var mgfx_1 = require("../mlib/mgfx");
var MChatTab = /** @class */ (function (_super) {
    __extends(MChatTab, _super);
    function MChatTab(x, y, width, height, text, type) {
        var _this = _super.call(this, x, y, width, height, text) || this;
        _this.ChatType = type;
        _this.transparent = true;
        _this.BorderVisible = false;
        return _this;
    }
    MChatTab.prototype.AfterPaint = function () {
        if (this.Selected)
            mgfx_1.Gpx.FillRect("rgba(255,255,255,0.4)", this.gx, this.gy, this.width, this.height);
        if (this.mouseHover && !this.Selected)
            mgfx_1.Gpx.FillRect("rgba(255,255,255,0.2)", this.gx, this.gy, this.width, this.height);
        mgfx_1.Gpx.DrawRect("rgba(255,255,200,0.6)", this.gx, this.gy, this.width, this.height);
        var width = mgfx_1.Gpx.MeasureText(this.text, "16px CoreRhino-Regular").width;
        mgfx_1.Gpx.TText("Yellow", this.text, this.gx + (this.width - width) / 2, this.gy + 2, "15px CoreRhino-Regular");
    };
    MChatTab.prototype.OnPropagateMouseDown = function (Event) {
        Event.Propagate = false;
    };
    MChatTab.prototype.OnPropagateMouseUp = function (Event) {
        Event.Propagate = false;
    };
    MChatTab.prototype.OnPropagateMouseClick = function (Event) {
        Event.Propagate = false;
    };
    return MChatTab;
}(mphpanel_1.MPlaceHolderPanel));
exports.MChatTab = MChatTab;
//# sourceMappingURL=chattab.js.map