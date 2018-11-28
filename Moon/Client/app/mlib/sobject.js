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
var SObject = /** @class */ (function () {
    function SObject() {
        this.Deleted = false;
    }
    SObject.prototype.Dispatcher = function () {
    };
    SObject.prototype.PaintBefore = function () {
    };
    SObject.prototype.Paint = function () {
    };
    SObject.prototype.PaintAfter = function () {
    };
    return SObject;
}());
exports.SObject = SObject;
var SObjectXY = /** @class */ (function (_super) {
    __extends(SObjectXY, _super);
    function SObjectXY(X, Y) {
        var _this = _super.call(this) || this;
        _this.X = X;
        _this.Y = Y;
        return _this;
    }
    SObjectXY.prototype.Dispatcher = function () {
    };
    SObjectXY.prototype.PaintBefore = function () {
    };
    SObjectXY.prototype.Paint = function () {
    };
    SObjectXY.prototype.PaintAfter = function () {
    };
    return SObjectXY;
}(SObject));
exports.SObjectXY = SObjectXY;
var SObjectRect = /** @class */ (function (_super) {
    __extends(SObjectRect, _super);
    function SObjectRect(X, Y, W, H) {
        var _this = _super.call(this, X, Y) || this;
        _this.W = W;
        _this.H = H;
        return _this;
    }
    SObjectRect.prototype.Dispatcher = function () {
    };
    SObjectRect.prototype.PaintBefore = function () {
    };
    SObjectRect.prototype.Paint = function () {
    };
    SObjectRect.prototype.PaintAfter = function () {
    };
    return SObjectRect;
}(SObjectXY));
exports.SObjectRect = SObjectRect;
var SObjectList = /** @class */ (function () {
    function SObjectList() {
        this.items = [];
    }
    SObjectList.prototype.Add = function (obj) {
        this.items.push(obj);
        return obj;
    };
    SObjectList.prototype.Clear = function () {
        this.items = [];
    };
    Object.defineProperty(SObjectList.prototype, "ItemList", {
        get: function () {
            return this.items;
        },
        enumerable: true,
        configurable: true
    });
    SObjectList.prototype.Dispatcher = function () {
        for (var v in this.items)
            this.items[v].Dispatcher();
        this.deletedItems = [];
        var newitems = [];
        for (var v in this.items)
            if (!this.items[v].Deleted)
                newitems.push(this.items[v]);
            else
                this.deletedItems.push(this.items[v]);
        this.items = newitems;
    };
    SObjectList.prototype.Paint = function () {
        for (var v in this.items)
            this.items[v].PaintBefore();
        for (var v in this.items)
            this.items[v].Paint();
        for (var v in this.items)
            this.items[v].PaintAfter();
    };
    return SObjectList;
}());
exports.SObjectList = SObjectList;
//# sourceMappingURL=sobject.js.map