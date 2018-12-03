import { MouseArgs, MouseExtArgs } from "./events";
import { Font, Color, Gpx } from "./mgfx";
import { App } from "../global/app";

export enum MessageType {
  MouseClick,
  MouseMove,
  MouseEnter,
  MouseLeave,
  MouseDown,
  MouseUp
}

export enum MAlign {
  None,
  Left,
  Center,
  Right
}
export enum MVAlign {
  None,
  Top,
  Middle,
  Bottom
}


export class MessageItem {
  public MessageType: MessageType;
  public MessageObject: MouseArgs;
  constructor(Type: MessageType, Object: MouseArgs) {
    this.MessageType = Type;
    this.MessageObject = Object;
  }
}

type MouseExtDelegate = (sender: MControl, event: MouseExtArgs) => void;
type MouseDelegate = (sender: MControl, event: MouseArgs) => void;

export class Margin {
  protected control: MControl;
  protected left: number;
  protected right: number;
  protected top: number;
  protected bottom: number;
  constructor(Control: MControl) {
    this.control = Control;
    this.left = 0;
    this.right = 0;
    this.top = 0;
    this.bottom = 0;
  }
  public get Left(): number {
    return this.left;
  }
  public set Left(value: number) {
    this.left = value;
    this.control.AjustmentPosition();
  }
  public get Right(): number {
    return this.right;
  }
  public set Right(value: number) {
    this.right = value;
    this.control.AjustmentPosition();
  }
  public get Top(): number {
    return this.top;
  }
  public set Top(value: number) {
    this.top = value;
    this.control.AjustmentPosition();
  }
  public get Bottom(): number {
    return this.bottom;
  }
  public set Bottom(value: number) {
    this.bottom = value;
    this.control.AjustmentPosition();
  }
}

export class MControl {
  protected x: number;
  protected y: number;
  protected gx: number;
  protected gy: number;
  protected width: number;
  protected height: number;
  protected margin: Margin;
  protected align: MAlign;
  protected valign: MVAlign;
  protected text: string;
  protected enabled: boolean;
  protected visible: boolean;
  protected font: Font;
  protected color: Color;
  protected backgroundColor: Color;
  protected transparent: boolean;
  protected mouseHover: boolean;
  protected mouseDown: boolean;
  protected mouse_x: number;
  protected mouse_y: number;
  protected parent: MControl;
  protected controls: ControlCollection;
  protected queue: MessageItem[];
  protected canmousecapture: boolean;
  public MouseMove: MouseExtDelegate;
  public MouseClick: MouseDelegate;
  public MouseEnter: MouseDelegate;
  public MouseLeave: MouseDelegate;
  public MouseDown: MouseDelegate;
  public MouseUp: MouseDelegate;
  public TagObject: any;
  public get X(): number {
    return this.x;
  }
  public set X(value: number) {
    this.x = value;
    this.AjustmentPosition();
  }
  public get Y(): number {
    return this.y;
  }
  public set Y(value: number) {
    this.y = value;
    this.AjustmentPosition();
  }
  public get GX(): number {
    return this.gx;
  }
  public get GY(): number {
    return this.gy;
  }
  public get Width(): number {
    return this.width;
  }
  public set Width(value: number) {
    this.width = value;
    this.AjustmentPosition();
  }
  public get Height(): number {
    return this.height;
  }
  public set Height(value: number) {
    this.height = value;
    this.AjustmentPosition();
  }
  public get Margin(): Margin {
    return this.margin;
  }
  public get Align(): MAlign {
    return this.align;
  }
  public set Align(value: MAlign) {
    this.align = value;
    this.AjustmentPosition();
  }
  public get VAlign(): MVAlign {
    return this.valign;
  }
  public set VAlign(value: MVAlign) {
    this.valign = value;
    this.AjustmentPosition();
  }
  public get Text(): string {
    return this.text;
  }
  public set Text(value: string) {
    this.text = value;
  }
  public get Enabled(): boolean {
    return this.enabled;
  }
  public set Enabled(value: boolean) {
    this.enabled = value;
  }
  public get Visible(): boolean {
    return this.visible;
  }
  public set Visible(value: boolean) {
    this.visible = value;
  }
  public get Font(): string {
    return this.font;
  }
  public set Font(value: string) {
    this.font = value;
  }
  public get BackgroundColor(): string {
    return this.backgroundColor;
  }
  public set BackgroundColor(value: string) {
    this.backgroundColor = value;
  }
  public get Color(): string {
    return this.color;
  }
  public set Color(value: string) {
    this.color = value;
  }
  public get Transparent(): boolean {
    return this.transparent;
  }
  public set Transparent(value: boolean) {
    this.transparent = value;
  }
  public get Parent(): MControl {
    return this.parent;
  }
  public set Parent(value: MControl) {
    this.parent = value;
    this.AjustmentPosition();
  }
  public get Controls(): ControlCollection {
    return this.controls;
  }
  constructor(x: number = 0, y: number = 0, width: number = 100, height: number = 100, text: string = "object") {
    this.controls = new ControlCollection(this);
    this.margin = new Margin(this);
    this.x = this.gx = x;
    this.y = this.gy = y;
    this.mouse_x = -1;
    this.mouse_y = -1;
    this.width = width;
    this.height = height;
    this.text = text;
    this.align = MAlign.None;
    this.valign = MVAlign.None;
    this.enabled = true;
    this.visible = true;
    this.parent = null;
    this.font = "10 CoreRhino-Regular";
    this.color = "white";
    this.backgroundColor = "black";
    this.transparent = true;
    this.canmousecapture = false;
    this.queue = [];
    this.AjustmentPosition();
    this.OnInit();
  }
  public OnInit() {

  }
  public AddQueue(mi: MessageItem): void {
    if (!this.visible)
      return
    if (!this.enabled)
      return
    this.queue.push(mi);
  }
  public Dispatch(): void {
    if (!this.visible)
      return
    if (!this.enabled)
      return
    this.controls.Dispatch();
    while (this.queue.length > 0) {
      var item: MessageItem = this.queue.shift() as MessageItem;
      switch (item.MessageType) {
        case MessageType.MouseMove:
          this.OnMouseMove(<MouseExtArgs>item.MessageObject);
          break;
        case MessageType.MouseClick:
          this.OnMouseClick(item.MessageObject);
          break;
        case MessageType.MouseEnter:
          this.OnMouseEnter(item.MessageObject);
          break;
        case MessageType.MouseLeave:
          this.OnMouseLeave(item.MessageObject);
          break;
        case MessageType.MouseDown:
          this.OnMouseDown(item.MessageObject);
          break;
        case MessageType.MouseUp:
          this.OnMouseUp(item.MessageObject);
          break;
      }
    }
    this.OnDispatch();
  }
  public BeforePaint(): void {
    if (!this.visible)
      return
    this.controls.Items.forEach(i => i.BeforePaint());
  }
  public Paint(): void {
    if (!this.visible)
      return
    this.OnPaint();
    this.controls.Paint();
  }
  public AfterPaint(): void {
    if (!this.visible)
      return
    this.OnAfterPaint();
    this.controls.Items.forEach(i => i.AfterPaint());
  }
  public AjustmentPosition(): void {
    this.gx = this.x;
    this.gy = this.y;
    if (this.parent) {
      if (this.align == MAlign.None) this.gx += this.margin.Left;
      if (this.align == MAlign.Left) this.gx = this.margin.Left;
      if (this.align == MAlign.Right) this.gx = this.parent.Width - this.width - this.margin.Right;
      if (this.align == MAlign.Center) this.gx = (this.parent.Width - this.width - this.margin.Right - this.margin.Left) / 2;
      if (this.valign == MVAlign.None) this.gy += this.margin.Top;
      if (this.valign == MVAlign.Top) this.gy = this.margin.Top;
      if (this.valign == MVAlign.Bottom) this.gy = this.parent.Height - this.height - this.margin.Bottom;
      if (this.valign == MVAlign.Middle) this.gy = (this.parent.Height - this.height - this.margin.Bottom - this.margin.Top) / 2;
    }
    if (this.parent) {
      this.gx += this.parent.GX;
      this.gy += this.parent.GY;
    }
    this.OnAjustmentPosition();
    this.controls.AjustmentPosition();
  }
  protected OnAjustmentPosition() {

  }
  protected OnPaint(): void {
    if (!this.transparent && this.visible)
      Gpx.FillRect(this.backgroundColor, this.gx, this.gy, this.width, this.height);
  }
  protected OnAfterPaint(): void {
  }
  public PropagateMouseMove(Event: MouseExtArgs): void {
    if (!this.visible) return;
    for (var v in this.controls.Items)
      this.controls.Items[v].PropagateMouseMove(Event);
    this.mouse_x = -1;
    this.mouse_y = -1;
    if (Event.X >= this.gx && Event.Y >= this.gy && Event.X < this.gx + this.width && Event.Y < this.gy + this.height) {
      var gmea: MouseExtArgs = MouseExtArgs.CoordToControl(Event, this.gx, this.gy);
      var mi: MessageItem = new MessageItem(MessageType.MouseMove, gmea);
      this.AddQueue(mi);
      this.mouse_x = gmea.X;
      this.mouse_y = gmea.Y;
    }
    if (Event.X >= this.gx && Event.Y >= this.gy && Event.X < this.gx + this.width && Event.Y < this.gy + this.height)
      if (!(Event.PrevX >= this.gx && Event.PrevY >= this.gy && Event.PrevX < this.gx + this.width && Event.PrevY < this.gy + this.height)) {
        if (!this.mouseHover) {
          this.AddQueue(new MessageItem(MessageType.MouseEnter, Event));
          this.mouseHover = true;
        }
      }
    if (!(Event.X >= this.gx && Event.Y >= this.gy && Event.X < this.gx + this.width && Event.Y < this.gy + this.height))
      if (Event.PrevX >= this.gx && Event.PrevY >= this.gy && Event.PrevX < this.gx + this.width && Event.PrevY < this.gy + this.height) {
        if (this.mouseHover) {
          this.AddQueue(new MessageItem(MessageType.MouseLeave, Event));
          this.mouseHover = false;
        }
      }
  }
  public PropagateMouseEnter(Event: MouseArgs): void {
    if (!this.visible) return;
    for (var v in this.controls.Items)
      this.controls.Items[v].PropagateMouseEnter(Event);
    if (!this.mouseHover && this.MouseInside2()) {
      this.AddQueue(new MessageItem(MessageType.MouseEnter, Event));
      this.mouseHover = true;
    }
  }
  public PropagateMouseLeave(Event: MouseArgs): void {
    if (!this.visible) return;
    for (var v in this.controls.Items)
      this.controls.Items[v].PropagateMouseLeave(Event);
    if (this.mouseHover) {
      this.AddQueue(new MessageItem(MessageType.MouseLeave, Event));
      this.mouseHover = false;
    }
  }
  public PropagateMouseDown(Event: MouseArgs): void {
    if (!this.visible) return;
    for (var v in this.controls.Items)
      this.controls.Items[v].PropagateMouseDown(Event);
    if (!Event.Propagate) return;
    if (Event.X >= this.gx && Event.Y >= this.gy && Event.X < this.gx + this.width && Event.Y < this.gy + this.height) {
      this.AddQueue(new MessageItem(MessageType.MouseDown, MouseArgs.CoordToControl(Event, this.gx, this.gy)));
      if (this.canmousecapture && !App.Game.MouseCaptured())
        App.Game.MouseCapture(this);
      this.mouseDown = true;
      this.OnPropagateMouseDown(Event);
    }
  }
  protected OnPropagateMouseDown(Event: MouseArgs): void {
  }
  public PropagateMouseUp(Event: MouseArgs): void {
    if (!this.visible) return;
    for (var v in this.controls.Items)
      this.controls.Items[v].PropagateMouseUp(Event);
    if (!Event.Propagate) return;
    if (Event.X >= this.gx && Event.Y >= this.gy && Event.X < this.gx + this.width && Event.Y < this.gy + this.height ||
      App.Game.MouseCaptureObject() == this) {
      this.AddQueue(new MessageItem(MessageType.MouseUp, MouseArgs.CoordToControl(Event, this.gx, this.gy)));
      this.mouseDown = false;
      this.OnPropagateMouseUp(Event);
    }
  }
  protected OnPropagateMouseUp(Event: MouseArgs): void {
  }
  public PropagateMouseClick(Event: MouseArgs): void {
    if (!this.visible) return;
    for (var v in this.controls.Items)
      this.controls.Items[v].PropagateMouseClick(Event);
    if (!Event.Propagate) return;
    if (Event.X >= this.gx && Event.Y >= this.gy && Event.X < this.gx + this.width && Event.Y < this.gy + this.height) {
      this.AddQueue(new MessageItem(MessageType.MouseClick, MouseArgs.CoordToControl(Event, this.gx, this.gy)));
      this.OnPropagateMouseClick(Event);
    }
  }
  protected OnPropagateMouseClick(Event: MouseArgs): void {
  }
  public DetermineMouseHover(xypos: any): void {
    if (!this.visible) return;
    for (var v in this.controls.Items)
      this.controls.Items[v].DetermineMouseHover(xypos);
    this.mouseHover = false;
    if (xypos)
      this.mouseHover = this.MouseInside3(xypos.X, xypos.Y);
  }

  protected OnMouseMove(e: MouseExtArgs): void {
    if (this.MouseMove)
      this.MouseMove(this, e);
  }
  protected OnMouseClick(e: MouseArgs): void {
    if (this.MouseClick)
      this.MouseClick(this, e);
  }
  protected OnMouseEnter(e: MouseArgs): void {
    if (this.MouseEnter)
      this.MouseEnter(this, e);
  }
  protected OnMouseLeave(e: MouseArgs): void {
    if (this.MouseLeave)
      this.MouseLeave(this, e);
  }
  protected OnMouseDown(e: MouseArgs): void {
    if (this.MouseDown)
      this.MouseDown(this, e);
  }
  protected OnMouseUp(e: MouseArgs): void {
    if (this.MouseUp)
      this.MouseUp(this, e);
  }
  protected MouseInside(): boolean {
    return !(this.mouse_x < 0 || this.mouse_y < 0 || this.mouse_x > this.width || this.mouse_y > this.height || !this.mouseHover);
  }
  protected MouseInside2(): boolean {
    return !(this.mouse_x < 0 || this.mouse_y < 0 || this.mouse_x > this.width || this.mouse_y > this.height);
  }
  protected MouseInside3(x: number, y: number): boolean {
    return !(x < 0 || y < 0 || x > this.width || y > this.height);
  }
  protected OnDispatch(): void {

  }
  public ResizeWindow(): void {
    this.AjustmentPosition();
  }
  public Activate() {
    for (var v in this.controls.Items)
      this.controls.Items[v].Activate();
    this.OnActivate();
  }
  public Deactivate() {
    for (var v in this.controls.Items)
      this.controls.Items[v].Deactivate();
    this.OnDeactivate();
  }
  protected OnActivate() {
  }

  protected OnDeactivate() {
  }

}
export class ControlCollection {
  protected masterControl: MControl;
  protected items: MControl[];
  public get Items(): MControl[] {
    return this.items;
  }
  constructor(Control: MControl) {
    this.masterControl = Control;
    this.items = [];
  }
  public Add(control: MControl): MControl {
    this.items.push(control);
    control.Parent = this.masterControl;
    control.AjustmentPosition();
    return control;
  }
  public Remove(control: MControl): void {
    control.Parent = null;
    var idx = this.items.findIndex((obj) => obj === control);
    if (idx >= 0) this.items.splice(idx, 1);
  }
  public Dispatch(): void {
    for (var v in this.items)
      this.items[v].Dispatch();
  }
  public Paint(): void {
    for (var v in this.items)
      this.items[v].Paint();
  }
  public AjustmentPosition(): void {
    for (var v in this.items)
      this.items[v].AjustmentPosition();
  }
}
