import { MContextFloat } from "./mcontextfloat";
import { MoonMob } from "../objs/mob";
import { EventArgs } from "../mlib/events";
import { App } from "../global/app";

export class ContextMenuClickArgs extends EventArgs {
  public Index: number;
  constructor(Index: number) {
    super();
    this.Index = Index;
  }
}

type ContextMenuClickDelegate = (sender: MContextMenu, event: ContextMenuClickArgs) => void;

export class MContextMenu extends MContextFloat {
  protected MenuElement: HTMLElement;
  public ListMenu: string[];
  public Mob: MoonMob;
  public ContextMenuClick: ContextMenuClickDelegate;

  constructor(x: number, y: number, mob: MoonMob, menu: string[]) {
    super(x, y);
    this.Mob = mob;
    this.ListMenu = menu;
    this.GenerateHtmlTemplate();
  }
  protected GenerateHtmlTemplate() {
    var content = "<div class='m-context-menu-label'>" + this.Mob.Name + "</div><div class='m-context-menu-doubleseparator'><div></div></div>";
    this.ListMenu.forEach(lm => {
      if (lm == '')
        content += "<div class='m-context-menu-separator'><div></div></div>";
      else
      content += "<div>" + lm + "</div>";
    });
    this.HtmlTemplate = "<div class='m-context-menu'>" + content + "</div>";
  }
  public CreateControl() {
    super.CreateControl();
    this.MenuElement = this.HtmlNode.childNodes[0].childNodes[0] as HTMLElement;
    this.HolderElement.style.backgroundColor = this.bgColor;
    this.HolderElement.style.padding = '3px';
    for (var i = 0; i < this.ListMenu.length; i++) {
      if (this.ListMenu[i] == '') continue;
      (this.MenuElement.childNodes[i + 2] as any).tagId = i;
      this.MenuElement.childNodes[i + 2].addEventListener('click', (evt) => {
        if (this.ContextMenuClick)
          this.ContextMenuClick(this, new ContextMenuClickArgs((evt.currentTarget as any).tagId));
        App.Field.DropContextPanels();
      }, false);
    };
  }
}