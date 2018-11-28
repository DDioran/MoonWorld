import { MControl } from "./mcontrol";
import { Color, Gpx } from "./mgfx";
import { EventArgs, MouseArgs } from "./events";

type ControlSelectDelegate = (sender: MPlaceHolderPanel, event: EventArgs) => void;

export class MSelectedGroup {
  private ctrls: Array<MPlaceHolderPanel> = [];
  public Selected: MPlaceHolderPanel;
  public ControlSelect: ControlSelectDelegate;
  public AddControl(control: MPlaceHolderPanel): MSelectedGroup {
    if (!this.ctrls.length) this.Selected = control;
    this.ctrls.push(control);
    return this;
  }
}

export class MPlaceHolderPanel extends MControl {
  private selGroup: MSelectedGroup;
  public BorderVisible: boolean;
  public BorderColor: Color;
  public BorderWidth: number;
  public TextMarginTop: number;
  public TextMarginLeft: number;
  public ShadowColor: Color;
  public ControlSelect: ControlSelectDelegate;
  public get Selected(): boolean{
    if (!this.selGroup) return false;
    return this.selGroup.Selected == this;
  }
  public get SelectedGroup(): MSelectedGroup {
    return this.selGroup;
  }
  constructor(x?: number, y?: number, width?: number, height?: number, text?: string) {
    super(x, y, width, height, text);
    this.transparent = false;
    this.backgroundColor = "#fefeee";
    this.BorderColor = "#000000";
    this.BorderVisible = true;
    this.BorderWidth = 1;
    this.TextMarginTop = 0;
    this.TextMarginLeft = 0;
    this.Color = "#C0A383";
    this.ShadowColor = "#675748";
    this.selGroup = null;
  }
  public OnInit() {
    super.OnInit();
  }
  public CreateSelectedGroup(): MSelectedGroup {
    if (!this.selGroup) {
      this.selGroup = new MSelectedGroup();
      this.selGroup.AddControl(this);
    }
    return this.selGroup;
  }
  public Add2SelectedGroup(group: MSelectedGroup): MSelectedGroup {
    if (!group)
      return this.CreateSelectedGroup();
    this.selGroup = group;
    group.AddControl(this);
    return group;
  }
  public Select() {
    if (this.selGroup)
      this.selGroup.Selected = this;
  }
  protected OnPaint() {
    super.OnPaint();
    if (this.BorderVisible)
      Gpx.DrawRect(this.BorderColor, this.gx, this.gy, this.width, this.height, this.BorderWidth);
    this.OnLayerPaint();
  }
  protected OnLayerPaint() {
  }

  protected OnMouseClick(e: MouseArgs): void {
    super.OnMouseClick(e);
    if (this.selGroup && !this.Selected) {
      this.selGroup.Selected = this;
      this.OnControlSelect(new EventArgs());
    }
  }

  protected OnControlSelect(e: EventArgs): void {
    if (this.ControlSelect)
      this.ControlSelect(this, e);
    if (this.SelectedGroup && this.SelectedGroup.ControlSelect)
      this.SelectedGroup.ControlSelect(this, e);
  }


}