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
var app_1 = require("../global/app");
var mgfx_1 = require("../mlib/mgfx");
var LoadingResourceForm = /** @class */ (function (_super) {
    __extends(LoadingResourceForm, _super);
    function LoadingResourceForm() {
        var _this = _super.call(this) || this;
        _this.backgroundColor = "#506070";
        _this.transparent = false;
        _this.BorderVisible = false;
        _this.loadpanel = new MResPanel();
        _this.loadpanel.Text = "Loading...";
        _this.loadpanel.Align = mcontrol_1.MAlign.Center;
        _this.loadpanel.VAlign = mcontrol_1.MVAlign.Bottom;
        _this.controls.Add(_this.loadpanel);
        return _this;
    }
    Object.defineProperty(LoadingResourceForm.prototype, "Text", {
        get: function () {
            return this.loadpanel.Text;
        },
        set: function (value) {
            this.loadpanel.Text = value;
        },
        enumerable: true,
        configurable: true
    });
    LoadingResourceForm.prototype.ResizeWindow = function () {
        this.width = app_1.App.Game.Width;
        this.height = app_1.App.Game.Height;
        this.loadpanel.Width = this.width / 3;
        this.loadpanel.Height = 32;
        this.loadpanel.Margin.Bottom = this.height / 10;
        _super.prototype.ResizeWindow.call(this);
    };
    LoadingResourceForm.prototype.OnDispatch = function () {
        _super.prototype.OnDispatch.call(this);
        this.loadpanel.Percent = app_1.App.Resx.CountLoadedResources / app_1.App.Resx.CountAllResources;
    };
    LoadingResourceForm.prototype.OnPaint = function () {
        _super.prototype.OnPaint.call(this);
    };
    return LoadingResourceForm;
}(mform_1.MForm));
exports.LoadingResourceForm = LoadingResourceForm;
var MResPanel = /** @class */ (function (_super) {
    __extends(MResPanel, _super);
    function MResPanel() {
        var _this = _super.call(this) || this;
        _this.backgroundColor = "#fefede";
        _this.Percent = 0;
        _this.Time = 0;
        return _this;
    }
    MResPanel.prototype.OnDispatch = function () {
        _super.prototype.OnDispatch.call(this);
        this.Time += app_1.App.DeltaTime;
        if (this.Time > 0.5) {
            this.Time = 0;
            this.Odd = !this.Odd;
        }
    };
    MResPanel.prototype.OnPaint = function () {
        _super.prototype.OnPaint.call(this);
        mgfx_1.Gpx.FillRect("#789B47", this.gx, this.gy, this.width * this.Percent, this.height);
        //if (this.Odd)
        mgfx_1.Gpx.Text2("#E9F383", "#686A05", this.text, this.gx + 10, this.gy + 24, "22px Roboto");
    };
    return MResPanel;
}(mphpanel_1.MPlaceHolderPanel));
exports.MResPanel = MResPanel;
//# sourceMappingURL=loadresform.js.map