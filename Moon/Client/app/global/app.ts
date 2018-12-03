import { MoonHub } from "./hub";
import { IndexedDBAngular } from "indexeddb-angular";
import { ResX } from "./resx";
import { MoonPlayField } from "./playfield";
import { MoonService } from "../service/service";
import { MoonGame } from "./game";
import { PlayerData } from "../info/playerdata";
import { Coord } from "../mlib/mgfx";
import { MouseExtArgs, MouseArgs } from "../mlib/events";

export abstract class App {
  public static Html: HTMLDivElement;
  public static Canvas: HTMLCanvasElement;
  public static Context: CanvasRenderingContext2D;
  public static Resx: ResX;
  public static Game: MoonGame;
  public static Field: MoonPlayField;
  public static MoonService: MoonService;
  public static Initialized: boolean = false;
  public static Hub: MoonHub;
  public static PlayerGuid: string = null;
  public static IsMoonDb: boolean = false;
  public static MoonDb: IndexedDBAngular = null;
  public static PlayerData: PlayerData;
  public static LastTime: Date;
  public static DeltaTime: number;
  public static Keys: any = {};
  public static MBtns: any = {};
  public static StoreXY: Coord;
  public static StoreXYPos: Coord;
  protected static fps: string;
  protected static lastTime: number;
  protected static fpsTime: number;
  protected static mouseOldX;
  protected static mouseOldY;
  protected static Active: boolean;
  protected static Runnig: boolean = false;
  public static _ox: number = 0;
  public static _oy: number = 0;
  public static UserAuth: boolean = false;
  public static UserGuid: string = null;
  public static UserAllow: boolean = false;
  public static UserName: string;
  public static UserNameStore: string;

  public static InitializeApplication() {
    this.Html = document.querySelector("#gameField");
    this.Canvas = document.querySelector("#gameCanvas");
    this.Context = this.Canvas.getContext("2d");
    new MoonGame();
    new ResX();
    this.InitializeEvents();
    this.GameInit();
    this.resize_window();
    MoonService.authInfo((res) => {
      App.UserAuth = res.isAuthUser;
      App.UserAllow = res.isAllow;
      App.UserName = res.userName;
      App.UserGuid = res.userGuid;
      this.Game.InitEngine();
    });
  }

  protected static InitializeEvents() {
    window.addEventListener("resize", () => { this.resize_window(); }, false);
    document.addEventListener("keydown", (evt) => { this.key_operation(evt, true); }, false);
    document.addEventListener("keyup", (evt) => { this.key_operation(evt, false); }, false);
    App.Canvas.addEventListener('mousemove', (evt) => { this.mouse_move(evt); }, false);
    App.Canvas.addEventListener('click', (evt) => { this.mouse_click(evt); }, false);
    App.Canvas.addEventListener('contextmenu', (evt) => { this.mouse_click(evt); }, false);
    App.Canvas.addEventListener('mouseover', (evt) => { this.mouse_enter(evt); }, false);
    App.Canvas.addEventListener('mouseout', (evt) => { this.mouse_leave(evt); }, false);
    App.Canvas.addEventListener('mousedown', (evt) => { this.mouse_down(evt); }, false);
    App.Canvas.addEventListener('mouseup', (evt) => { this.mouse_up(evt); }, false);
    window.addEventListener('mousemove', (evt) => { this.body_move(evt); }, false);
    document.addEventListener('selectstart', (evt) => { event.preventDefault(); }, false);
    document.addEventListener('contextmenu', (evt) => { event.preventDefault(); }, false);
    window.addEventListener("mousewheel", (evt) => { this.mouse_wheel(evt); }, false);
  }

  public static InitIndexedDb(callback: Function) {
    this.MoonDb = new IndexedDBAngular('MoonDb', 1);
    this.MoonDb.createStore(1, (db) => {
      db.currentTarget.result.createObjectStore('moonJson', { keyPath: "name" });
    }).then(() => {
      this.IsMoonDb = true;
      console.log("Information: Game connected to IndexedDB.");
      if (callback)
        callback();
    }, (error) => {
      console.log(error);
      if (callback)
        callback();
    });
  }

  public static resize_window() {
    App.Canvas.width = App.Html.clientWidth - 4;
    App.Canvas.height = App.Html.clientHeight - 4;
    App.Game.Width = App.Canvas.width;
    App.Game.Height = App.Canvas.height;
    if (App.Game.ActiveForm) App.Game.ActiveForm.ResizeWindow();
  }

  public static mouse_wheel(event: any): void {
    if (!event) event = window.event;
    if (event.ctrlKey)
      event.preventDefault();
  }

  public static key_operation(event: any, downkey: boolean): void {
    if (App.Initialized && App.Field) {
      if (App.Field.Chat && App.Field.Chat.input.IsFocus()) return;
      App.Field.DropContextPanels();
    }
    let keycode: number = 0;
    if (!event) event = window.event;
    if (event.keyCode) keycode = event.keyCode; // IE
    else if (event.which) keycode = event.which; // all browsers
    if (event.ctrlKey && (keycode == 107 || keycode == 109)) {
      event.preventDefault();
      return;
    }
    App.Keys[keycode] = downkey;
    App.Keys.ctrlKey = event.ctrlKey;
    App.Keys.shiftKey = event.shiftKey;
    App.Keys.altKey = event.altKey;
    App.Keys.metaKey = event.metaKey;
    if (App.Initialized &&
      App.Game.ActiveForm == App.Game.MainForm &&
      App.Game.ActiveForm.DialogForm == null)
      App.Hub.KeyOperation(App.PlayerGuid, keycode, downkey);
    if (keycode == 107 && downkey) App.Game.value_speed += 0.1;
    if (keycode == 109 && downkey) App.Game.value_speed -= 0.1;
  }

  public static getMousePos(evt: any): Coord {
    var rect = App.Canvas.getBoundingClientRect();
    return new Coord(evt.clientX - rect.left, evt.clientY - rect.top);
  }

  public static body_move(evt: any): void {
    App.StoreXY = new Coord(evt.clientX, evt.clientY);
    App.StoreXYPos = null;
  }

  public static mouse_move(evt: any): void {
    App.StoreXY = new Coord(evt.clientX, evt.clientY);
    App.StoreXYPos = this.getMousePos(evt);
    let args: MouseExtArgs = new MouseExtArgs(0, App.StoreXYPos.X, App.StoreXYPos.Y, this.mouseOldX, this.mouseOldY);
    App.Game.PropagateMouseMove(args);
    this.mouseOldX = App.StoreXYPos.X;
    this.mouseOldY = App.StoreXYPos.Y;
    evt.preventDefault();
    evt.stopPropagation();
  }

  public static mouse_click(evt: any): void {
    var mousePos = this.getMousePos(evt);
    let args: MouseArgs = new MouseArgs(evt.button, mousePos.X, mousePos.Y);
    App.Game.PropagateMouseClick(args);
    evt.preventDefault();
    evt.stopPropagation();
  }

  public static mouse_enter(evt: any): void {
    var mousePos = this.getMousePos(evt);
    let args: MouseArgs = new MouseArgs(0, mousePos.X, mousePos.Y);
    App.Game.PropagateMouseEnter(args);
    evt.preventDefault();
    evt.stopPropagation();
  }

  public static mouse_leave(evt: any): void {
    var mousePos = this.getMousePos(evt);
    let args: MouseArgs = new MouseArgs(0, mousePos.X, mousePos.Y);
    App.Game.PropagateMouseLeave(args);
    evt.preventDefault();
    evt.stopPropagation();
  }

  public static mouse_down(evt: any): void {
    if (App.Initialized && App.Field) {
      if (App.Field.Chat)
        App.Field.Chat.input.DropFocus();
      //App.Field.DropContextPanels();
    }
    var mousePos = this.getMousePos(evt);
    let args: MouseArgs = new MouseArgs(evt.button, mousePos.X, mousePos.Y);
    App.Game.PropagateMouseDown(args);
    evt.preventDefault();
    evt.stopPropagation();
  }

  public static mouse_up(evt: any): void {
    var mousePos = this.getMousePos(evt);
    let args: MouseArgs = new MouseArgs(evt.button, mousePos.X, mousePos.Y);
    App.Game.PropagateMouseUp(args);
    evt.preventDefault();
    evt.stopPropagation();
    if (App.MBtns[evt.button]) App.MBtns[evt.button] = null;
  }

  public static GameInit() {
    this.lastTime = Date.now();
    this.fpsTime = Date.now();
    this.Active = true;
    window.setInterval(function () { App.GameDispatch(); }, 16);
    this.GamePaint();
  }

  public static GameDispatch(): void {
    if (!this.Active) return;
    if (this.Runnig) return;
    this.Runnig = true;
    var now = Date.now();
    App.DeltaTime = (now - this.lastTime) / 1000.0;
    App.Game.GameCycle();
    this.lastTime = now;
    this.Runnig = false;
  }


  public static GamePaint(): void {
    if (App.Field)
      App.Field.SetCursor();
    App.Game.GamePaint();
    requestAnimationFrame(() => {
      this.GamePaint();
    });
  }
}