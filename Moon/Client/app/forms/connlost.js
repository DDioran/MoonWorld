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
var mform_1 = require("../mlib/mform");
var mphpanel_1 = require("../mlib/mphpanel");
var mcontrol_1 = require("../mlib/mcontrol");
var mgfx_1 = require("../mlib/mgfx");
var app_1 = require("../global/app");
var ConnectionLostForm = /** @class */ (function (_super) {
    __extends(ConnectionLostForm, _super);
    function ConnectionLostForm() {
        var _this = _super.call(this) || this;
        _this.backgroundColor = "#506070";
        _this.transparent = false;
        _this.BorderVisible = false;
        _this.loadpanel = new MCLPanel();
        _this.loadpanel.Text = "Connection lost ;-(";
        _this.loadpanel.Align = mcontrol_1.MAlign.Center;
        _this.loadpanel.VAlign = mcontrol_1.MVAlign.Middle;
        _this.controls.Add(_this.loadpanel);
        return _this;
    }
    ConnectionLostForm.prototype.ResizeWindow = function () {
        this.width = app_1.App.Game.Width;
        this.height = app_1.App.Game.Height;
        this.loadpanel.Width = this.width / 3;
        this.loadpanel.Height = 32;
        this.loadpanel.Margin.Bottom = this.height / 10;
        _super.prototype.ResizeWindow.call(this);
    };
    return ConnectionLostForm;
}(mform_1.MForm));
exports.ConnectionLostForm = ConnectionLostForm;
var MCLPanel = /** @class */ (function (_super) {
    __extends(MCLPanel, _super);
    function MCLPanel() {
        var _this = _super.call(this) || this;
        _this.backgroundColor = "#fefede";
        return _this;
    }
    MCLPanel.prototype.OnPaint = function () {
        _super.prototype.OnPaint.call(this);
        mgfx_1.Gpx.FillRect("#9C3D37", this.gx, this.gy, this.width, this.height);
        mgfx_1.Gpx.Text2("#E9F383", "#686A05", this.text, this.gx + 10, this.gy + 24, "22px Roboto");
    };
    return MCLPanel;
}(mphpanel_1.MPlaceHolderPanel));
exports.MCLPanel = MCLPanel;
//# sourceMappingURL=connlost.js.map