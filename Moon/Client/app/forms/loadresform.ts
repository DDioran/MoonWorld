import { MForm } from "../mlib/mform";
import { MPlaceHolderPanel } from "../mlib/mphpanel";
import { MAlign, MVAlign } from "../mlib/mcontrol";
import { App } from "../global/app";
import { Gpx } from "../mlib/mgfx";

export class LoadingResourceForm extends MForm {
  public loadpanel: MResPanel;
  public get Text(): string {
    return this.loadpanel.Text;
  }
  public set Text(value: string) {
    this.loadpanel.Text = value;
  }
  constructor() {
    super();
    this.backgroundColor = "#506070";
    this.transparent = false;
    this.BorderVisible = false;

    this.loadpanel = new MResPanel();
    this.loadpanel.Text = "Loading...";
    this.loadpanel.Align = MAlign.Center;
    this.loadpanel.VAlign = MVAlign.Bottom;
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

  public OnDispatch(): void {
    super.OnDispatch();
    this.loadpanel.Percent = App.Resx.CountLoadedResources / App.Resx.CountAllResources;
  }

  public OnPaint(): void {
    super.OnPaint();
  }

}

export class MResPanel extends MPlaceHolderPanel {
  public Percent: number;
  public Time: number;
  public Odd: boolean;
  constructor() {
    super();
    this.backgroundColor = "#fefede";
    this.Percent = 0;
    this.Time = 0;
  }
  protected OnDispatch() {
    super.OnDispatch();
    this.Time += App.DeltaTime;
    if (this.Time > 0.5) {
      this.Time = 0;
      this.Odd = !this.Odd;
    }
  }
  protected OnPaint() {
    super.OnPaint();
    Gpx.FillRect("#789B47", this.gx, this.gy, this.width * this.Percent, this.height);
    //if (this.Odd)
    Gpx.Text2("#E9F383", "#686A05", this.text, this.gx + 10, this.gy + 24, "22px CoreRhino-Regular");
  }
}