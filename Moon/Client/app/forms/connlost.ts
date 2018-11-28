import { MForm } from "../mlib/mform";
import { MPlaceHolderPanel } from "../mlib/mphpanel";
import { MAlign, MVAlign } from "../mlib/mcontrol";
import { Gpx } from "../mlib/mgfx";
import { App } from "../global/app";

export class ConnectionLostForm extends MForm {
  public loadpanel: MCLPanel;
  constructor() {
    super();
    this.backgroundColor = "#506070";
    this.transparent = false;
    this.BorderVisible = false;

    this.loadpanel = new MCLPanel();
    this.loadpanel.Text = "Connection lost ;-(";
    this.loadpanel.Align = MAlign.Center;
    this.loadpanel.VAlign = MVAlign.Middle;
    this.controls.Add(this.loadpanel);
  }

  public ResizeWindow(): void {
    this.width = App.Game.Width;
    this.height = App.Game.Height;
    this.loadpanel.Width = this.width / 3;
    this.loadpanel.Height = 32;
    this.loadpanel.Margin.Bottom = this.height / 10;
    super.ResizeWindow();
  }
}

export class MCLPanel extends MPlaceHolderPanel {
  constructor() {
    super();
    this.backgroundColor = "#fefede";
  }
  protected OnPaint() {
    super.OnPaint();
    Gpx.FillRect("#9C3D37", this.gx, this.gy, this.width, this.height);
    Gpx.Text2("#E9F383", "#686A05", this.text, this.gx + 10, this.gy + 24, "22px Roboto");
  }
}