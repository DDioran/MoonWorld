import { HubConnectionBuilder } from '@aspnet/signalr';
import * as signalR from '@aspnet/signalr';
import { App } from './app';
import { MoonHub } from './hub';
import { LoadingResourceForm } from '../forms/loadresform';
import { ConnectionLostForm } from '../forms/connlost';
import { MoonPlayForm } from '../forms/playform';
import { CharacterForm } from '../forms/charform';
import { LoginForm } from '../forms/loginform';
import { MForm } from '../mlib/mform';
import { MControl } from '../mlib/mcontrol';
import { PlayerData } from '../info/playerdata';
import { MouseExtArgs, MouseArgs } from '../mlib/events';
import { MoonSignal } from './signal';
import { Gpx } from '../mlib/mgfx';
import { ClientInfo } from '../service/info';

export class MoonGame {
  public Width: number;
  public Height: number;
  public LoadResForm: LoadingResourceForm;
  public ConnLostForm: ConnectionLostForm;
  public MainForm: MoonPlayForm;
  public CharForm: CharacterForm;
  public LoginForm: LoginForm;
  public ActiveForm: MForm;
  public CaptureControl: MControl;
  public CharacterId: string;

  public value_speed: number = 1.0;

  constructor() {
    App.Game = this;
    this.LoadResForm = new LoadingResourceForm();
    this.SetActiveForm(this.LoadResForm);
    this.CaptureControl = null;
  }

  public InitEngine() {
    this.LoadResForm.Text = "Initialize indexed db...";
    App.InitIndexedDb(() => {
      this.LoadResForm.Text = "Initialize signalr...";
      let builder = new HubConnectionBuilder();
      App.Hub = new MoonHub(builder
        .withUrl('/moonhub')
        .configureLogging(signalR.LogLevel.Information)
        .build());
      // register message coming from the server
      MoonSignal.RegisterSignalREvents();
      // Запуск SignalR
      App.Hub.Hub.start()
        .then(res => {
          this.LoadResForm.Text = "Loading resources...";
          App.Resx.LoadPackNames = [
            "lzero", "ui-player", "window", "buttons", "controls", "misc",
            "white-mag", "green-knight", "bow-skel", "priest",
            "pink-zombie", "red-archer", "skel", "sword-skel",
            "moon-click", "magic-arrow", "magic-arrow-explosive", "knight-aa-strike",
            "bow-arrow", "fireball", "fireball-expl", "skills", "sword-strike",
            "iknight"];
          App.Resx.LoadAllResources(() => {
            this.LoadResForm.Text = "Starting game...";
            App.PlayerData = new PlayerData();
            this.InitProc_Login();
          });
        })
        .catch(err => {
          console.error(err.toString());
        });
    });
  }

  public InitProc_Login() {
    if (App.UserAuth) {
      this.InitProc_SelectCharacter();
      return;
    }
    this.LoginForm = new LoginForm();
    this.SetActiveForm(this.LoginForm);
    this.LoginForm.ResizeWindow();
  }
  public InitProc_AfterLogin() {
    this.InitProc_SelectCharacter();
  }

  public InitProc_SelectCharacter() {
    this.CharForm = new CharacterForm();
    this.SetActiveForm(this.CharForm);
    this.CharForm.ResizeWindow();
  }

  public InitProc_InitPlayer() {
    this.MainForm = new MoonPlayForm();
    this.InitPlayer();
  }

  public InitProc_StartGame() {
    this.SetActiveForm(this.MainForm);
    this.MainForm.ResizeWindow();
    window.setTimeout(() => {
      App.Hub.DownloadAllObjects(App.PlayerGuid);
    }, 2000);
  }

  public GameCycle() {
    if (this.ActiveForm)
      this.ActiveForm.Dispatch();
  }

  public GamePaint() {
    if (this.ActiveForm) {
      this.ActiveForm.Paint();
    }
  }

  public DialogShadow(CurrentDialogForm: MForm) {
    let form: MForm = this.ActiveForm;
    while (form.DialogForm != null) form = form.DialogForm;
    if (form == CurrentDialogForm)
      Gpx.ShadowScreen();
  }

  public PropagateMouseMove(Args: MouseExtArgs): void {
    if (this.MouseCaptured()) {
      this.MouseCaptureObject().PropagateMouseMove(Args);
      return;
    }
    if (this.ActiveForm)
      this.ActiveForm.PropagateMouseMove(Args);
  }
  public PropagateMouseClick(Args: MouseArgs): void {
    if (this.MouseCaptured()) {
      this.MouseCaptureObject().PropagateMouseClick(Args);
      return;
    }
    if (this.ActiveForm)
      this.ActiveForm.PropagateMouseClick(Args);
  }
  public PropagateMouseEnter(Args: MouseArgs): void {
    if (this.MouseCaptured()) {
      this.MouseCaptureObject().PropagateMouseEnter(Args);
      return;
    }
    if (this.ActiveForm)
      this.ActiveForm.PropagateMouseEnter(Args);
  }
  public PropagateMouseLeave(Args: MouseArgs): void {
    if (this.MouseCaptured()) {
      this.MouseCaptureObject().PropagateMouseLeave(Args);
      return;
    }
    if (this.ActiveForm)
      this.ActiveForm.PropagateMouseLeave(Args);
  }

  public PropagateMouseDown(Args: MouseArgs): void {
    if (this.MouseCaptured()) {
      this.MouseCaptureObject().PropagateMouseDown(Args);
      return;
    }
    if (this.ActiveForm)
      this.ActiveForm.PropagateMouseDown(Args);
  }
  public PropagateMouseUp(Args: MouseArgs): void {
    if (this.MouseCaptured()) {
      this.MouseCaptureObject().PropagateMouseUp(Args);
      this.MouseRelease();
      return;
    }
    if (this.ActiveForm)
      this.ActiveForm.PropagateMouseUp(Args);
  }

  public MouseCapture(Ctrl: MControl): void {
    this.CaptureControl = Ctrl;
  }

  public MouseRelease(): void {
    this.CaptureControl = null;
  }

  public MouseCaptured(): boolean {
    return this.CaptureControl != null;
  }

  public MouseCaptureObject(): MControl {
    return this.CaptureControl;
  }

  public SetActiveForm(form: MForm) {
    if (this.ActiveForm)
      this.ActiveForm.Deactivate();
    this.ActiveForm = form;
    this.ActiveForm.Activate();
  }

  public InitPlayer() {
    App.Hub.RegisterClient(App.UserGuid, this.CharacterId);
  }

  public PlayerRegistered(playerInfo: ClientInfo) {
    App.PlayerGuid = this.CharacterId;
    App.Field.InitializePlayer(playerInfo);
    App.Initialized = true;
    this.InitProc_StartGame();
  }

}