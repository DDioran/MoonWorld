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
var EventArgs = /** @class */ (function () {
    function EventArgs() {
        this.Propagate = true;
    }
    return EventArgs;
}());
exports.EventArgs = EventArgs;
var MouseArgs = /** @class */ (function (_super) {
    __extends(MouseArgs, _super);
    function MouseArgs(CButton, CX, CY) {
        var _this = _super.call(this) || this;
        _this.Button = CButton;
        _this.X = CX;
        _this.Y = CY;
        return _this;
    }
    MouseArgs.CoordToControl = function (e, x, y) {
        return new MouseArgs(e.Button, e.X - x, e.Y - y);
    };
    return MouseArgs;
}(EventArgs));
exports.MouseArgs = MouseArgs;
var MouseExtArgs = /** @class */ (function (_super) {
    __extends(MouseExtArgs, _super);
    function MouseExtArgs(CButton, CX, CY, CPX, CPY) {
        var _this = _super.call(this, CButton, CX, CY) || this;
        _this.PrevX = CPX;
        _this.PrevY = CPY;
        return _this;
    }
    MouseExtArgs.CoordToControl = function (e, x, y) {
        return new MouseExtArgs(e.Button, e.X - x, e.Y - y, e.PrevX - x, e.PrevY - y);
    };
    return MouseExtArgs;
}(MouseArgs));
exports.MouseExtArgs = MouseExtArgs;
//# sourceMappingURL=events.js.map