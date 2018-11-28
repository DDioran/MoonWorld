"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("rxjs/add/operator/toPromise");
var signalr_1 = require("@aspnet/signalr");
var BaseService = /** @class */ (function () {
    function BaseService() {
        this._http = new signalr_1.DefaultHttpClient(null);
        this._headers["Content-Type"] = "application/json;charset=utf-8";
        this._urlPrefix = "Api";
    }
    BaseService.prototype.HttpRequest = function (url, object) {
    };
    BaseService.prototype.handleError = function (error, method) {
        if (error != null && error.error != null && error.error.ErrorCode != null) {
            return Promise.reject(error.error.ErrorMessage);
        }
        console.error('An error occurred @ ' + method + ' service call', error);
        return Promise.reject(error.message || 'An error occurred @ ' + method + ' service call');
    };
    return BaseService;
}());
exports.BaseService = BaseService;
//# sourceMappingURL=base-service.js.map