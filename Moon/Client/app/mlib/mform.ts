import { MouseExtArgs, MouseArgs } from "./events";
import { MPlaceHolderPanel } from "./mphpanel";
import { App } from "../global/app";

export class MForm extends MPlaceHolderPanel {
  public ParentForm: MForm;
  public DialogForm: MForm;

  constructor(ParentForm?: MForm) {
    super();
    this.ParentForm = ParentForm;
    this.BorderVisible = true;
    this.DialogForm = null;
  }

  public Dispatch() {
    if (this.DialogForm)
      this.DialogForm.Dispatch();
    else
      super.Dispatch();
  }

  public Paint() {
    super.BeforePaint();
    super.Paint();
    super.AfterPaint();
    if (this.DialogForm)
      this.DialogForm.Paint();
  }

  public PropagateMouseMove(Args: MouseExtArgs): void {
    if (this.DialogForm) {
      let f: MForm = this.DialogForm;
      while (f.DialogForm) f = f.DialogForm;
      f.PropagateMouseMove(Args);
    }
    else
      super.PropagateMouseMove(Args);
  }
  public PropagateMouseClick(Args: MouseArgs): void {
    if (this.DialogForm) {
      let f: MForm = this.DialogForm;
      while (f.DialogForm) f = f.DialogForm;
      f.PropagateMouseClick(Args);
    }
    else
      super.PropagateMouseClick(Args);
  }
  public PropagateMouseEnter(Args: MouseArgs): void {
    if (this.DialogForm) {
      let f: MForm = this.DialogForm;
      while (f.DialogForm) f = f.DialogForm;
      f.PropagateMouseEnter(Args);
    }
    else
      super.PropagateMouseEnter(Args);
  }
  public PropagateMouseLeave(Args: MouseArgs): void {
    if (this.DialogForm) {
      let f: MForm = this.DialogForm;
      while (f.DialogForm) f = f.DialogForm;
      f.PropagateMouseLeave(Args);
    }
    else
      super.PropagateMouseLeave(Args);
  }
  public PropagateMouseDown(Args: MouseArgs): void {
    if (this.DialogForm) {
      let f: MForm = this.DialogForm;
      while (f.DialogForm) f = f.DialogForm;
      f.PropagateMouseDown(Args);
    }
    else
      super.PropagateMouseDown(Args);
  }
  public PropagateMouseUp(Args: MouseArgs): void {
    if (this.DialogForm) {
      let f: MForm = this.DialogForm;
      while (f.DialogForm) f = f.DialogForm;
      f.PropagateMouseUp(Args);
    }
    else
      super.PropagateMouseUp(Args);
  }
  public DetermineMouseHover() {
    super.DetermineMouseHover(App.StoreXYPos);
  }

}