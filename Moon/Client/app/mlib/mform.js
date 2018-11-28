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
var mphpanel_1 = require("./mphpanel");
var app_1 = require("../global/app");
var MForm = /** @class */ (function (_super) {
    __extends(MForm, _super);
    function MForm(ParentForm) {
        var _this = _super.call(this) || this;
        _this.ParentForm = ParentForm;
        _this.BorderVisible = true;
        _this.DialogForm = null;
        return _this;
    }
    MForm.prototype.Dispatch = function () {
        if (this.DialogForm)
            this.DialogForm.Dispatch();
        else
            _super.prototype.Dispatch.call(this);
    };
    MForm.prototype.Paint = function () {
        _super.prototype.BeforePaint.call(this);
        _super.prototype.Paint.call(this);
        _super.prototype.AfterPaint.call(this);
        if (this.DialogForm)
            this.DialogForm.Paint();
    };
    MForm.prototype.PropagateMouseMove = function (Args) {
        if (this.DialogForm) {
            var f = this.DialogForm;
            while (f.DialogForm)
                f = f.DialogForm;
            f.PropagateMouseMove(Args);
        }
        else
            _super.prototype.PropagateMouseMove.call(this, Args);
    };
    MForm.prototype.PropagateMouseClick = function (Args) {
        if (this.DialogForm) {
            var f = this.DialogForm;
            while (f.DialogForm)
                f = f.DialogForm;
            f.PropagateMouseClick(Args);
        }
        else
            _super.prototype.PropagateMouseClick.call(this, Args);
    };
    MForm.prototype.PropagateMouseEnter = function (Args) {
        if (this.DialogForm) {
            var f = this.DialogForm;
            while (f.DialogForm)
                f = f.DialogForm;
            f.PropagateMouseEnter(Args);
        }
        else
            _super.prototype.PropagateMouseEnter.call(this, Args);
    };
    MForm.prototype.PropagateMouseLeave = function (Args) {
        if (this.DialogForm) {
            var f = this.DialogForm;
            while (f.DialogForm)
                f = f.DialogForm;
            f.PropagateMouseLeave(Args);
        }
        else
            _super.prototype.PropagateMouseLeave.call(this, Args);
    };
    MForm.prototype.PropagateMouseDown = function (Args) {
        if (this.DialogForm) {
            var f = this.DialogForm;
            while (f.DialogForm)
                f = f.DialogForm;
            f.PropagateMouseDown(Args);
        }
        else
            _super.prototype.PropagateMouseDown.call(this, Args);
    };
    MForm.prototype.PropagateMouseUp = function (Args) {
        if (this.DialogForm) {
            var f = this.DialogForm;
            while (f.DialogForm)
                f = f.DialogForm;
            f.PropagateMouseUp(Args);
        }
        else
            _super.prototype.PropagateMouseUp.call(this, Args);
    };
    MForm.prototype.DetermineMouseHover = function () {
        _super.prototype.DetermineMouseHover.call(this, app_1.App.StoreXYPos);
    };
    return MForm;
}(mphpanel_1.MPlaceHolderPanel));
exports.MForm = MForm;
//# sourceMappingURL=mform.js.map