export class EventArgs {
  public Propagate: boolean = true;
}

export class MouseArgs extends EventArgs {
  public X: number;
  public Y: number;
  public Button: number;
  constructor(CButton: number, CX: number, CY: number) {
    super();
    this.Button = CButton;
    this.X = CX;
    this.Y = CY;
  }
  public static CoordToControl(e: MouseArgs, x: number, y: number): MouseArgs {
    return new MouseArgs(e.Button, e.X - x, e.Y - y);
  }
}

export class MouseExtArgs extends MouseArgs {
  public PrevX: number;
  public PrevY: number;
  constructor(CButton: number, CX: number, CY: number, CPX: number, CPY: number) {
    super(CButton, CX, CY);
    this.PrevX = CPX;
    this.PrevY = CPY;
  }
  public static CoordToControl(e: MouseExtArgs, x: number, y: number): MouseExtArgs {
    return new MouseExtArgs(e.Button, e.X - x, e.Y - y, e.PrevX - x, e.PrevY - y);
  }
}

