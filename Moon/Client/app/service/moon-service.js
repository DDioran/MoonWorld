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
var base_service_1 = require("./base-service");
var MoonService = /** @class */ (function (_super) {
    __extends(MoonService, _super);
    function MoonService() {
        var _this = _super.call(this) || this;
        _this._urlPrefix = "/Api/";
        return _this;
    }
    return MoonService;
}(base_service_1.BaseService));
exports.MoonService = MoonService;
//# sourceMappingURL=moon-service.js.map