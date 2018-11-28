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
var mgfx_1 = require("./mgfx");
var events_1 = require("./events");
var MSelectedGroup = /** @class */ (function () {
    function MSelectedGroup() {
        this.ctrls = [];
    }
    MSelectedGroup.prototype.AddControl = function (control) {
        if (!this.ctrls.length)
            this.Selected = control;
        this.ctrls.push(control);
        return this;
    };
    return MSelectedGroup;
}());
exports.MSelectedGroup = MSelectedGroup;
var MPlaceHolderPanel = /** @class */ (function (_super) {
    __extends(MPlaceHolderPanel, _super);
    function MPlaceHolderPanel(x, y, width, height, text) {
        var _this = _super.call(this, x, y, width, height, text) || this;
        _this.transparent = false;
        _this.backgroundColor = "#fefeee";
        _this.BorderColor = "#000000";
        _this.BorderVisible = true;
        _this.BorderWidth = 1;
        _this.TextMarginTop = 0;
        _this.TextMarginLeft = 0;
        _this.Color = "#C0A383";
        _this.ShadowColor = "#675748";
        _this.selGroup = null;
        return _this;
    }
    Object.defineProperty(MPlaceHolderPanel.prototype, "Selected", {
        get: function () {
            if (!this.selGroup)
                return false;
            return this.selGroup.Selected == this;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MPlaceHolderPanel.prototype, "SelectedGroup", {
        get: function () {
            return this.selGroup;
        },
        enumerable: true,
        configurable: true
    });
    MPlaceHolderPanel.prototype.OnInit = function () {
        _super.prototype.OnInit.call(this);
    };
    MPlaceHolderPanel.prototype.CreateSelectedGroup = function () {
        if (!this.selGroup) {
            this.selGroup = new MSelectedGroup();
            this.selGroup.AddControl(this);
        }
        return this.selGroup;
    };
    MPlaceHolderPanel.prototype.Add2SelectedGroup = function (group) {
        if (!group)
            return this.CreateSelectedGroup();
        this.selGroup = group;
        group.AddControl(this);
        return group;
    };
    MPlaceHolderPanel.prototype.Select = function () {
        if (this.selGroup)
            this.selGroup.Selected = this;
    };
    MPlaceHolderPanel.prototype.OnPaint = function () {
        _super.prototype.OnPaint.call(this);
        if (this.BorderVisible)
            mgfx_1.Gpx.DrawRect(this.BorderColor, this.gx, this.gy, this.width, this.height, this.BorderWidth);
        this.OnLayerPaint();
    };
    MPlaceHolderPanel.prototype.OnLayerPaint = function () {
    };
    MPlaceHolderPanel.prototype.OnMouseClick = function (e) {
        _super.prototype.OnMouseClick.call(this, e);
        if (this.selGroup && !this.Selected) {
            this.selGroup.Selected = this;
            this.OnControlSelect(new events_1.EventArgs());
        }
    };
    MPlaceHolderPanel.prototype.OnControlSelect = function (e) {
        if (this.ControlSelect)
            this.ControlSelect(this, e);
        if (this.SelectedGroup && this.SelectedGroup.ControlSelect)
            this.SelectedGroup.ControlSelect(this, e);
    };
    return MPlaceHolderPanel;
}(mcontrol_1.MControl));
exports.MPlaceHolderPanel = MPlaceHolderPanel;
//# sourceMappingURL=mphpanel.js.map