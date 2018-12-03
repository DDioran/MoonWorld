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
var BaseResponse = /** @class */ (function () {
    function BaseResponse() {
        this.errorCode = 0;
    }
    return BaseResponse;
}());
exports.BaseResponse = BaseResponse;
var MoonCharListResult = /** @class */ (function (_super) {
    __extends(MoonCharListResult, _super);
    function MoonCharListResult() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return MoonCharListResult;
}(BaseResponse));
exports.MoonCharListResult = MoonCharListResult;
var MoonCharResult = /** @class */ (function (_super) {
    __extends(MoonCharResult, _super);
    function MoonCharResult() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return MoonCharResult;
}(BaseResponse));
exports.MoonCharResult = MoonCharResult;
var MoonCharGuidResult = /** @class */ (function (_super) {
    __extends(MoonCharGuidResult, _super);
    function MoonCharGuidResult() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return MoonCharGuidResult;
}(BaseResponse));
exports.MoonCharGuidResult = MoonCharGuidResult;
var MoonChar = /** @class */ (function () {
    function MoonChar() {
    }
    return MoonChar;
}());
exports.MoonChar = MoonChar;
var LogOnData = /** @class */ (function () {
    function LogOnData() {
    }
    return LogOnData;
}());
exports.LogOnData = LogOnData;
var UserItem = /** @class */ (function () {
    function UserItem() {
    }
    return UserItem;
}());
exports.UserItem = UserItem;
var UserEditResult = /** @class */ (function (_super) {
    __extends(UserEditResult, _super);
    function UserEditResult() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return UserEditResult;
}(BaseResponse));
exports.UserEditResult = UserEditResult;
var AuthResult = /** @class */ (function (_super) {
    __extends(AuthResult, _super);
    function AuthResult() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return AuthResult;
}(BaseResponse));
exports.AuthResult = AuthResult;
//# sourceMappingURL=response.js.map