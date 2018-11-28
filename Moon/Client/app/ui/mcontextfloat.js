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
var mfloat_1 = require("./mfloat");
var app_1 = require("../global/app");
var MContextFloat = /** @class */ (function (_super) {
    __extends(MContextFloat, _super);
    function MContextFloat(x, y, width, height) {
        var _this = _super.call(this, x, y, width, height) || this;
        app_1.App.Field.ContextPanels.push(_this);
        return _this;
    }
    return MContextFloat;
}(mfloat_1.MFloat));
exports.MContextFloat = MContextFloat;
//# sourceMappingURL=mcontextfloat.js.map