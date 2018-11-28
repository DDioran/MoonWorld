import { MForm } from "../mlib/mform";
import { MoonPlayField } from "../global/playfield";
import { App } from "../global/app";

export class MoonPlayForm extends MForm {
  constructor() {
    super();
    this.backgroundColor = "#506070";
    this.transparent = false;
    this.BorderVisible = false;
    this.controls.Add(new MoonPlayField());
  }

  public ResizeWindow(): void {
    this.width = App.Game.Width;
    this.height = App.Game.Height;
    App.Field.Width = this.width;
    App.Field.Height = this.height;
    App.Field.ResizeWindow();
  }

}