import { MHtml } from "../mlib/mhtml";
import { Color } from "../mlib/mgfx";
import { App } from "../global/app";

export class MFloat extends MHtml {
  public bgColor: Color;
  public lineColor: Color;
  constructor(x?: number, y?: number, width?: number, height?: number) {
    super(x, y, width, height);
    this.bgColor = 'rgba(64,64,64,0.8)';
    this.lineColor = 'rgba(250,250,200,0.6)';
    App.Field.Controls.Add(this);
  }
}