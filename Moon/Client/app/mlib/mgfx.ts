import { App } from "../global/app";

export type Color = string;
export type Font = string;

export class Rectangle {
  public X: number;
  public Y: number;
  public Width: number;
  public Height: number;
  constructor(X: number, Y: number, Width: number, Height: number) {
    this.X = X;
    this.Y = Y;
    this.Width = Width;
    this.Height = Height;
  }
}

export class Triangle {
  public X1: number;
  public Y1: number;
  public X2: number;
  public Y2: number;
  public X3: number;
  public Y3: number;
  public get Rectangle(): Rectangle {
    let _x1: number = Math.min(this.X1, this.X2, this.X3);
    let _x2: number = Math.max(this.X1, this.X2, this.X3);
    let _y1: number = Math.min(this.Y1, this.Y2, this.Y3);
    let _y2: number = Math.max(this.Y1, this.Y2, this.Y3);
    return new Rectangle(_x1, _y1, _x2 - _x1, _y2 - _y1);
  }
  public get Center(): Coord {
    let _x1: number = Math.min(this.X1, this.X2, this.X3);
    let _x2: number = Math.max(this.X1, this.X2, this.X3);
    let _y1: number = Math.min(this.Y1, this.Y2, this.Y3);
    let _y2: number = Math.max(this.Y1, this.Y2, this.Y3);
    return new Coord((_x2 - _x1) / 2, (_y2 - _y1) / 2);
  }
  constructor(X1: number, Y1: number, X2: number, Y2: number, X3: number, Y3: number) {
    this.X1 = X1;
    this.Y1 = Y1;
    this.X2 = X2;
    this.Y2 = Y2;
    this.X3 = X3;
    this.Y3 = Y3;
  }
}

export class Size {
  public Width: number;
  public Height: number;
  constructor(Width: number, Height: number) {
    this.Width = Width;
    this.Height = Height;
  }
}

export class Coord {
  public X: number;
  public Y: number;
  constructor(X: number, Y: number) {
    this.X = X;
    this.Y = Y;
  }
}

export abstract class Gpx {
  public static DrawRect(Color: Color, X: number, Y: number, W: number, H: number, LineWidth: number = 1) {
    App.Context.beginPath();
    App.Context.rect(X + App._ox, Y + App._oy, W, H);
    App.Context.lineWidth = LineWidth;
    App.Context.strokeStyle = Color;
    App.Context.stroke();
  }
  public static FillRect(Color: Color, X: number, Y: number, W: number, H: number) {
    App.Context.beginPath();
    App.Context.rect(X + App._ox, Y + App._oy, W, H);
    App.Context.fillStyle = Color;
    App.Context.fill();
  }
  public static DrawFillRect(ColorFill: Color, ColorStroke: Color, X: number, Y: number, W: number, H: number, LineWidth: number = 1) {
    App.Context.beginPath();
    App.Context.rect(X + App._ox, Y + App._oy, W, H);
    App.Context.fillStyle = ColorFill;
    App.Context.fill();
    App.Context.lineWidth = LineWidth;
    App.Context.strokeStyle = ColorStroke;
    App.Context.stroke();
  }
  public static DrawCircle(Color: Color, X: number, Y: number, R: number, LineWidth: number = 1) {
    App.Context.beginPath();
    App.Context.arc(X + App._ox, Y + App._oy, R, 0, 2 * Math.PI, false);
    App.Context.lineWidth = LineWidth;
    App.Context.strokeStyle = Color;
    App.Context.stroke();
  }
  public static FillCircle(Color: Color, X: number, Y: number, R: number) {
    App.Context.beginPath();
    App.Context.arc(X + App._ox, Y + App._oy, R, 0, Math.PI * 2, false);
    App.Context.fillStyle = Color;
    App.Context.fill();
  }
  public static FillArc(Color: Color, X: number, Y: number, R: number, SA: number, EA: number) {
    App.Context.beginPath();
    App.Context.arc(X + App._ox, Y + App._oy, R, SA, EA, false);
    App.Context.fillStyle = Color;
    App.Context.fill();
  }
  public static FillSector(Color: Color, X: number, Y: number, R: number, SA: number, EA: number) {
    App.Context.beginPath();
    App.Context.moveTo(X + App._ox, Y + App._oy);
    App.Context.arc(X + App._ox, Y + App._oy, R, SA, EA, false);
    App.Context.lineTo(X + App._ox, Y + App._oy);
    App.Context.fillStyle = Color;
    App.Context.fill();
  }
  public static DrawFillCircle(ColorFill: Color, color_stroke: Color, X: number, Y: number, R: number, LineWidth: number = 1) {
    App.Context.beginPath();
    App.Context.arc(X + App._ox, Y + App._oy, R, 0, Math.PI * 2, false);
    App.Context.fillStyle = ColorFill;
    App.Context.fill();
    App.Context.lineWidth = LineWidth;
    App.Context.strokeStyle = color_stroke;
    App.Context.stroke();
  }
  public static DrawFillTriangle(ColorFill: Color, ColorStroke: Color, X1: number, Y1: number, X2: number, Y2: number, X3: number, Y3: number, LineWidth: number = 1) {
    App.Context.beginPath();
    App.Context.moveTo(X1 + App._ox, Y1 + App._oy);
    App.Context.lineTo(X2 + App._ox, Y2 + App._oy);
    App.Context.lineTo(X3 + App._ox, Y3 + App._oy);
    App.Context.fillStyle = ColorFill;
    App.Context.fill();
    App.Context.lineWidth = LineWidth;
    App.Context.strokeStyle = ColorStroke;
    App.Context.stroke();
  }
  public static DrawLine(Color: Color, X1: number, Y1: number, X2: number, Y2: number, LineWidth: number = 1) {
    App.Context.beginPath();
    App.Context.moveTo(X1 + App._ox, Y1 + App._oy);
    App.Context.lineTo(X2 + App._ox, Y2 + App._oy);
    App.Context.lineWidth = LineWidth;
    App.Context.strokeStyle = Color;
    App.Context.stroke();
  }
  public static Text(Color: Color, Text: string, X: number, Y: number, Font?: Font) {
    if (Font)
      App.Context.font = Font;
    App.Context.fillStyle = Color;
    App.Context.fillText(Text, X + App._ox, Y + App._oy);
  }
  public static MeasureText(Text: string, Font?: Font): TextMetrics {
    if (Font)
      App.Context.font = Font;
    return App.Context.measureText(Text);
  }

  public static Text2(FillColor: Color, StrokeColor: Color, Text: string, X: number, Y: number, Font?: Font) {
    App.Context.save();
    if (Font)
      App.Context.font = Font;
    App.Context.fillStyle = FillColor;
    App.Context.strokeStyle = StrokeColor;
    App.Context.strokeText(Text, X + App._ox, Y + App._oy);
    App.Context.fillText(Text, X + App._ox, Y + App._oy);
    App.Context.restore();
  }
  public static TText(Color: Color, Text: string, X: number, Y: number, Font?: Font) {
    App.Context.save();
    if (Font)
      App.Context.font = Font;
    App.Context.textBaseline = "top";
    App.Context.fillStyle = Color;
    App.Context.fillText(Text, X + App._ox, Y + App._oy);
    App.Context.restore();
  }

  public static TText2(FillColor: Color, StrokeColor: Color, Text: string, X: number, Y: number, Font?: Font) {
    App.Context.save();
    if (Font)
      App.Context.font = Font;
    App.Context.fillStyle = FillColor;
    App.Context.strokeStyle = StrokeColor;
    App.Context.textBaseline = "top";
    App.Context.fillText(Text, X + App._ox, Y + App._oy);
    App.Context.strokeText(Text, X + App._ox, Y + App._oy);
    App.Context.restore();
  }

  public static DrawImage(image: HTMLImageElement, X: number, Y: number, Alpha: number = null) {
    App.Context.save();
    if (Alpha)
      App.Context.globalAlpha = Alpha;
    App.Context.drawImage(image, X + App._ox, Y + App._oy);
    App.Context.restore();
  }

  public static DrawImageExact(image: HTMLImageElement, X: number, Y: number, W: number, H: number) {
    App.Context.drawImage(image, 0, 0, W, H, X + App._ox, Y + App._oy, W, H);
  }

  public static DrawImageExactW(image: HTMLImageElement, X: number, Y: number, W: number, H: number, Width: number) {
    App.Context.drawImage(image, 0, 0, W, H, X + App._ox, Y + App._oy, Width, H);
  }

  public static DrawImageExactH(image: HTMLImageElement, X: number, Y: number, W: number, H: number, Height: number) {
    App.Context.drawImage(image, 0, 0, W, H, X + App._ox, Y + App._oy, W, Height);
  }

  public static DrawImageExactWH(image: HTMLImageElement, X: number, Y: number, W: number, H: number, Width: number, Height: number) {
    App.Context.drawImage(image, 0, 0, W, H, X + App._ox, Y + App._oy, Width, Height);
  }

  public static DrawImageRect(image: HTMLImageElement, X: number, Y: number, rect: Rectangle) {
    App.Context.drawImage(image, rect.X, rect.Y, rect.Width, rect.Height, X + App._ox, Y + App._oy, rect.Width, rect.Height);
  }

  public static DrawImageCenter(image: HTMLImageElement, X: number, Y: number, CX: number, CY: number, rect: Rectangle) {
    App.Context.drawImage(image, rect.X, rect.Y, rect.Width, rect.Height, X - CX + App._ox, Y - CY + App._oy, rect.Width, rect.Height);
  }

  public static DrawImageCenterRotate(image: HTMLImageElement, X: number, Y: number, CX: number, CY: number, rect: Rectangle, Angle: number) {
    App.Context.save();
    App.Context.translate(X + App._ox, Y + App._oy);
    App.Context.rotate(Angle);
    App.Context.drawImage(image, rect.X, rect.Y, rect.Width, rect.Height, -CX, -CY, rect.Width, rect.Height);
    App.Context.restore();
  }

  public static DrawImageCenterRotateScale(image: HTMLImageElement, X: number, Y: number, CX: number, CY: number, rect: Rectangle, Angle: number, Scale: number) {
    App.Context.save();
    App.Context.translate(X + App._ox, Y + App._oy);
    App.Context.scale(Scale, Scale);
    App.Context.rotate(Angle);
    App.Context.drawImage(image, rect.X, rect.Y, rect.Width, rect.Height, -CX, -CY, rect.Width, rect.Height);
    App.Context.restore();
  }

  public static DrawImageCenterScale(image: HTMLImageElement, X: number, Y: number, CX: number, CY: number, rect: Rectangle, Scale: number, Alpha: number = null) {
    App.Context.save();
    App.Context.translate(X + App._ox, Y + App._oy);
    App.Context.scale(Scale, Scale);
    if (Alpha)
      App.Context.globalAlpha = Alpha;
    App.Context.drawImage(image, rect.X, rect.Y, rect.Width, rect.Height, -CX, -CY, rect.Width, rect.Height);
    App.Context.restore();
  }
  public static DrawImageCenterScaleX(image: HTMLImageElement, X: number, Y: number, CX: number, CY: number, rect: Rectangle, Scale: number) {
    App.Context.save();
    App.Context.translate(X + App._ox, Y + App._oy);
    App.Context.scale(Scale, 1);
    App.Context.drawImage(image, rect.X, rect.Y, rect.Width, rect.Height, -CX, -CY, rect.Width, rect.Height);
    App.Context.restore();
  }

  public static ShadowScreen() {
    App.Context.save();
    App.Context.beginPath();
    App.Context.rect(0, 0, App.Canvas.width, App.Canvas.height);
    App.Context.fillStyle = "rgba(0, 0, 0, 0.6)";
    App.Context.fill();
    var m: number = Math.max(App.Canvas.width, App.Canvas.height);
    var gr: Color = "rgba(100, 100, 100, 0.6)";
    for (var i: number = 0; i < m; i += 6) {
      App.Context.beginPath();
      App.Context.moveTo(i, 0);
      App.Context.lineTo(m + i, m);
      App.Context.lineWidth = 3;
      App.Context.strokeStyle = gr;
      App.Context.stroke();
      if (i != 0) {
        App.Context.beginPath();
        App.Context.moveTo(-i, 0);
        App.Context.lineTo(m - i, m);
        App.Context.lineWidth = 3;
        App.Context.strokeStyle = gr;
        App.Context.stroke();
      }
    }
    for (var i: number = 0; i < m * 2; i += 6) {
      App.Context.beginPath();
      App.Context.moveTo(i, 0);
      App.Context.lineTo(-m + i, m);
      App.Context.lineWidth = 3;
      App.Context.strokeStyle = gr;
      App.Context.stroke();
    }
    App.Context.restore();
  }

}
