"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MoonService = /** @class */ (function () {
    function MoonService() {
    }
    MoonService.logOn = function (logOnData, callback) {
        var xhr = new XMLHttpRequest();
        xhr.open('PUT', 'ApiMoon/LogOn');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = function () {
            if (xhr.status === 200) {
                if (callback)
                    callback(JSON.parse(xhr.responseText));
            }
        };
        xhr.send(JSON.stringify(logOnData));
    };
    MoonService.authInfo = function (callback) {
        var xhr = new XMLHttpRequest();
        xhr.open('PUT', 'ApiMoon/GetAuthInfo');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = function () {
            if (xhr.status === 200) {
                if (callback)
                    callback(JSON.parse(xhr.responseText));
            }
        };
        xhr.send(null);
    };
    return MoonService;
}());
exports.MoonService = MoonService;
//# sourceMappingURL=service.js.map