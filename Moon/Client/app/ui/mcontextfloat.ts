import { MFloat } from "./mfloat";
import { App } from "../global/app";

export class MContextFloat extends MFloat {
  constructor(x?: number, y?: number, width?: number, height?: number) {
    super(x, y, width, height);
    App.Field.ContextPanels.push(this);
  }
}