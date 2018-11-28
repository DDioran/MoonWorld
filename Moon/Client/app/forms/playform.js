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
var playfield_1 = require("../global/playfield");
var app_1 = require("../global/app");
var MoonPlayForm = /** @class */ (function (_super) {
    __extends(MoonPlayForm, _super);
    function MoonPlayForm() {
        var _this = _super.call(this) || this;
        _this.backgroundColor = "#506070";
        _this.transparent = false;
        _this.BorderVisible = false;
        _this.controls.Add(new playfield_1.MoonPlayField());
        return _this;
    }
    MoonPlayForm.prototype.ResizeWindow = function () {
        this.width = app_1.App.Game.Width;
        this.height = app_1.App.Game.Height;
        app_1.App.Field.Width = this.width;
        app_1.App.Field.Height = this.height;
        app_1.App.Field.ResizeWindow();
    };
    return MoonPlayForm;
}(mform_1.MForm));
exports.MoonPlayForm = MoonPlayForm;
//# sourceMappingURL=playform.js.map