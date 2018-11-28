"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("../global/app");
var Rectangle = /** @class */ (function () {
    function Rectangle(X, Y, Width, Height) {
        this.X = X;
        this.Y = Y;
        this.Width = Width;
        this.Height = Height;
    }
    return Rectangle;
}());
exports.Rectangle = Rectangle;
var Triangle = /** @class */ (function () {
    function Triangle(X1, Y1, X2, Y2, X3, Y3) {
        this.X1 = X1;
        this.Y1 = Y1;
        this.X2 = X2;
        this.Y2 = Y2;
        this.X3 = X3;
        this.Y3 = Y3;
    }
    Object.defineProperty(Triangle.prototype, "Rectangle", {
        get: function () {
            var _x1 = Math.min(this.X1, this.X2, this.X3);
            var _x2 = Math.max(this.X1, this.X2, this.X3);
            var _y1 = Math.min(this.Y1, this.Y2, this.Y3);
            var _y2 = Math.max(this.Y1, this.Y2, this.Y3);
            return new Rectangle(_x1, _y1, _x2 - _x1, _y2 - _y1);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Triangle.prototype, "Center", {
        get: function () {
            var _x1 = Math.min(this.X1, this.X2, this.X3);
            var _x2 = Math.max(this.X1, this.X2, this.X3);
            var _y1 = Math.min(this.Y1, this.Y2, this.Y3);
            var _y2 = Math.max(this.Y1, this.Y2, this.Y3);
            return new Coord((_x2 - _x1) / 2, (_y2 - _y1) / 2);
        },
        enumerable: true,
        configurable: true
    });
    return Triangle;
}());
exports.Triangle = Triangle;
var Size = /** @class */ (function () {
    function Size(Width, Height) {
        this.Width = Width;
        this.Height = Height;
    }
    return Size;
}());
exports.Size = Size;
var Coord = /** @class */ (function () {
    function Coord(X, Y) {
        this.X = X;
        this.Y = Y;
    }
    return Coord;
}());
exports.Coord = Coord;
var Gpx = /** @class */ (function () {
    function Gpx() {
    }
    Gpx.DrawRect = function (Color, X, Y, W, H, LineWidth) {
        if (LineWidth === void 0) { LineWidth = 1; }
        app_1.App.Context.beginPath();
        app_1.App.Context.rect(X + app_1.App._ox, Y + app_1.App._oy, W, H);
        app_1.App.Context.lineWidth = LineWidth;
        app_1.App.Context.strokeStyle = Color;
        app_1.App.Context.stroke();
    };
    Gpx.FillRect = function (Color, X, Y, W, H) {
        app_1.App.Context.beginPath();
        app_1.App.Context.rect(X + app_1.App._ox, Y + app_1.App._oy, W, H);
        app_1.App.Context.fillStyle = Color;
        app_1.App.Context.fill();
    };
    Gpx.DrawFillRect = function (ColorFill, ColorStroke, X, Y, W, H, LineWidth) {
        if (LineWidth === void 0) { LineWidth = 1; }
        app_1.App.Context.beginPath();
        app_1.App.Context.rect(X + app_1.App._ox, Y + app_1.App._oy, W, H);
        app_1.App.Context.fillStyle = ColorFill;
        app_1.App.Context.fill();
        app_1.App.Context.lineWidth = LineWidth;
        app_1.App.Context.strokeStyle = ColorStroke;
        app_1.App.Context.stroke();
    };
    Gpx.DrawCircle = function (Color, X, Y, R, LineWidth) {
        if (LineWidth === void 0) { LineWidth = 1; }
        app_1.App.Context.beginPath();
        app_1.App.Context.arc(X + app_1.App._ox, Y + app_1.App._oy, R, 0, 2 * Math.PI, false);
        app_1.App.Context.lineWidth = LineWidth;
        app_1.App.Context.strokeStyle = Color;
        app_1.App.Context.stroke();
    };
    Gpx.FillCircle = function (Color, X, Y, R) {
        app_1.App.Context.beginPath();
        app_1.App.Context.arc(X + app_1.App._ox, Y + app_1.App._oy, R, 0, Math.PI * 2, false);
        app_1.App.Context.fillStyle = Color;
        app_1.App.Context.fill();
    };
    Gpx.FillArc = function (Color, X, Y, R, SA, EA) {
        app_1.App.Context.beginPath();
        app_1.App.Context.arc(X + app_1.App._ox, Y + app_1.App._oy, R, SA, EA, false);
        app_1.App.Context.fillStyle = Color;
        app_1.App.Context.fill();
    };
    Gpx.FillSector = function (Color, X, Y, R, SA, EA) {
        app_1.App.Context.beginPath();
        app_1.App.Context.moveTo(X + app_1.App._ox, Y + app_1.App._oy);
        app_1.App.Context.arc(X + app_1.App._ox, Y + app_1.App._oy, R, SA, EA, false);
        app_1.App.Context.lineTo(X + app_1.App._ox, Y + app_1.App._oy);
        app_1.App.Context.fillStyle = Color;
        app_1.App.Context.fill();
    };
    Gpx.DrawFillCircle = function (ColorFill, color_stroke, X, Y, R, LineWidth) {
        if (LineWidth === void 0) { LineWidth = 1; }
        app_1.App.Context.beginPath();
        app_1.App.Context.arc(X + app_1.App._ox, Y + app_1.App._oy, R, 0, Math.PI * 2, false);
        app_1.App.Context.fillStyle = ColorFill;
        app_1.App.Context.fill();
        app_1.App.Context.lineWidth = LineWidth;
        app_1.App.Context.strokeStyle = color_stroke;
        app_1.App.Context.stroke();
    };
    Gpx.DrawFillTriangle = function (ColorFill, ColorStroke, X1, Y1, X2, Y2, X3, Y3, LineWidth) {
        if (LineWidth === void 0) { LineWidth = 1; }
        app_1.App.Context.beginPath();
        app_1.App.Context.moveTo(X1 + app_1.App._ox, Y1 + app_1.App._oy);
        app_1.App.Context.lineTo(X2 + app_1.App._ox, Y2 + app_1.App._oy);
        app_1.App.Context.lineTo(X3 + app_1.App._ox, Y3 + app_1.App._oy);
        app_1.App.Context.fillStyle = ColorFill;
        app_1.App.Context.fill();
        app_1.App.Context.lineWidth = LineWidth;
        app_1.App.Context.strokeStyle = ColorStroke;
        app_1.App.Context.stroke();
    };
    Gpx.DrawLine = function (Color, X1, Y1, X2, Y2, LineWidth) {
        if (LineWidth === void 0) { LineWidth = 1; }
        app_1.App.Context.beginPath();
        app_1.App.Context.moveTo(X1 + app_1.App._ox, Y1 + app_1.App._oy);
        app_1.App.Context.lineTo(X2 + app_1.App._ox, Y2 + app_1.App._oy);
        app_1.App.Context.lineWidth = LineWidth;
        app_1.App.Context.strokeStyle = Color;
        app_1.App.Context.stroke();
    };
    Gpx.Text = function (Color, Text, X, Y, Font) {
        if (Font)
            app_1.App.Context.font = Font;
        app_1.App.Context.fillStyle = Color;
        app_1.App.Context.fillText(Text, X + app_1.App._ox, Y + app_1.App._oy);
    };
    Gpx.MeasureText = function (Text, Font) {
        if (Font)
            app_1.App.Context.font = Font;
        return app_1.App.Context.measureText(Text);
    };
    Gpx.Text2 = function (FillColor, StrokeColor, Text, X, Y, Font) {
        app_1.App.Context.save();
        if (Font)
            app_1.App.Context.font = Font;
        app_1.App.Context.fillStyle = FillColor;
        app_1.App.Context.strokeStyle = StrokeColor;
        app_1.App.Context.strokeText(Text, X + app_1.App._ox, Y + app_1.App._oy);
        app_1.App.Context.fillText(Text, X + app_1.App._ox, Y + app_1.App._oy);
        app_1.App.Context.restore();
    };
    Gpx.TText = function (Color, Text, X, Y, Font) {
        app_1.App.Context.save();
        if (Font)
            app_1.App.Context.font = Font;
        app_1.App.Context.textBaseline = "top";
        app_1.App.Context.fillStyle = Color;
        app_1.App.Context.fillText(Text, X + app_1.App._ox, Y + app_1.App._oy);
        app_1.App.Context.restore();
    };
    Gpx.TText2 = function (FillColor, StrokeColor, Text, X, Y, Font) {
        app_1.App.Context.save();
        if (Font)
            app_1.App.Context.font = Font;
        app_1.App.Context.fillStyle = FillColor;
        app_1.App.Context.strokeStyle = StrokeColor;
        app_1.App.Context.textBaseline = "top";
        app_1.App.Context.fillText(Text, X + app_1.App._ox, Y + app_1.App._oy);
        app_1.App.Context.strokeText(Text, X + app_1.App._ox, Y + app_1.App._oy);
        app_1.App.Context.restore();
    };
    Gpx.DrawImage = function (image, X, Y, Alpha) {
        if (Alpha === void 0) { Alpha = null; }
        app_1.App.Context.save();
        if (Alpha)
            app_1.App.Context.globalAlpha = Alpha;
        app_1.App.Context.drawImage(image, X + app_1.App._ox, Y + app_1.App._oy);
        app_1.App.Context.restore();
    };
    Gpx.DrawImageExact = function (image, X, Y, W, H) {
        app_1.App.Context.drawImage(image, 0, 0, W, H, X + app_1.App._ox, Y + app_1.App._oy, W, H);
    };
    Gpx.DrawImageExactW = function (image, X, Y, W, H, Width) {
        app_1.App.Context.drawImage(image, 0, 0, W, H, X + app_1.App._ox, Y + app_1.App._oy, Width, H);
    };
    Gpx.DrawImageExactH = function (image, X, Y, W, H, Height) {
        app_1.App.Context.drawImage(image, 0, 0, W, H, X + app_1.App._ox, Y + app_1.App._oy, W, Height);
    };
    Gpx.DrawImageExactWH = function (image, X, Y, W, H, Width, Height) {
        app_1.App.Context.drawImage(image, 0, 0, W, H, X + app_1.App._ox, Y + app_1.App._oy, Width, Height);
    };
    Gpx.DrawImageRect = function (image, X, Y, rect) {
        app_1.App.Context.drawImage(image, rect.X, rect.Y, rect.Width, rect.Height, X + app_1.App._ox, Y + app_1.App._oy, rect.Width, rect.Height);
    };
    Gpx.DrawImageCenter = function (image, X, Y, CX, CY, rect) {
        app_1.App.Context.drawImage(image, rect.X, rect.Y, rect.Width, rect.Height, X - CX + app_1.App._ox, Y - CY + app_1.App._oy, rect.Width, rect.Height);
    };
    Gpx.DrawImageCenterRotate = function (image, X, Y, CX, CY, rect, Angle) {
        app_1.App.Context.save();
        app_1.App.Context.translate(X + app_1.App._ox, Y + app_1.App._oy);
        app_1.App.Context.rotate(Angle);
        app_1.App.Context.drawImage(image, rect.X, rect.Y, rect.Width, rect.Height, -CX, -CY, rect.Width, rect.Height);
        app_1.App.Context.restore();
    };
    Gpx.DrawImageCenterRotateScale = function (image, X, Y, CX, CY, rect, Angle, Scale) {
        app_1.App.Context.save();
        app_1.App.Context.translate(X + app_1.App._ox, Y + app_1.App._oy);
        app_1.App.Context.scale(Scale, Scale);
        app_1.App.Context.rotate(Angle);
        app_1.App.Context.drawImage(image, rect.X, rect.Y, rect.Width, rect.Height, -CX, -CY, rect.Width, rect.Height);
        app_1.App.Context.restore();
    };
    Gpx.DrawImageCenterScale = function (image, X, Y, CX, CY, rect, Scale, Alpha) {
        if (Alpha === void 0) { Alpha = null; }
        app_1.App.Context.save();
        app_1.App.Context.translate(X + app_1.App._ox, Y + app_1.App._oy);
        app_1.App.Context.scale(Scale, Scale);
        if (Alpha)
            app_1.App.Context.globalAlpha = Alpha;
        app_1.App.Context.drawImage(image, rect.X, rect.Y, rect.Width, rect.Height, -CX, -CY, rect.Width, rect.Height);
        app_1.App.Context.restore();
    };
    Gpx.DrawImageCenterScaleX = function (image, X, Y, CX, CY, rect, Scale) {
        app_1.App.Context.save();
        app_1.App.Context.translate(X + app_1.App._ox, Y + app_1.App._oy);
        app_1.App.Context.scale(Scale, 1);
        app_1.App.Context.drawImage(image, rect.X, rect.Y, rect.Width, rect.Height, -CX, -CY, rect.Width, rect.Height);
        app_1.App.Context.restore();
    };
    Gpx.ShadowScreen = function () {
        app_1.App.Context.save();
        app_1.App.Context.beginPath();
        app_1.App.Context.rect(0, 0, app_1.App.Canvas.width, app_1.App.Canvas.height);
        app_1.App.Context.fillStyle = "rgba(0, 0, 0, 0.6)";
        app_1.App.Context.fill();
        var m = Math.max(app_1.App.Canvas.width, app_1.App.Canvas.height);
        var gr = "rgba(100, 100, 100, 0.6)";
        for (var i = 0; i < m; i += 6) {
            app_1.App.Context.beginPath();
            app_1.App.Context.moveTo(i, 0);
            app_1.App.Context.lineTo(m + i, m);
            app_1.App.Context.lineWidth = 3;
            app_1.App.Context.strokeStyle = gr;
            app_1.App.Context.stroke();
            if (i != 0) {
                app_1.App.Context.beginPath();
                app_1.App.Context.moveTo(-i, 0);
                app_1.App.Context.lineTo(m - i, m);
                app_1.App.Context.lineWidth = 3;
                app_1.App.Context.strokeStyle = gr;
                app_1.App.Context.stroke();
            }
        }
        for (var i = 0; i < m * 2; i += 6) {
            app_1.App.Context.beginPath();
            app_1.App.Context.moveTo(i, 0);
            app_1.App.Context.lineTo(-m + i, m);
            app_1.App.Context.lineWidth = 3;
            app_1.App.Context.strokeStyle = gr;
            app_1.App.Context.stroke();
        }
        app_1.App.Context.restore();
    };
    return Gpx;
}());
exports.Gpx = Gpx;
//# sourceMappingURL=mgfx.js.map