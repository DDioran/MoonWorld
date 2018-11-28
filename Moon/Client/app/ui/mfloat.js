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
var MFloat = /** @class */ (function (_super) {
    __extends(MFloat, _super);
    function MFloat(x, y, width, height) {
        var _this = _super.call(this, x, y, width, height) || this;
        _this.bgColor = 'rgba(64,64,64,0.8)';
        _this.lineColor = 'rgba(250,250,200,0.6)';
        app_1.App.Field.Controls.Add(_this);
        return _this;
    }
    return MFloat;
}(mhtml_1.MHtml));
exports.MFloat = MFloat;
//# sourceMappingURL=mfloat.js.map