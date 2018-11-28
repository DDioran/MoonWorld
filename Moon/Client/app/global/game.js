"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var signalr_1 = require("@aspnet/signalr");
var signalR = require("@aspnet/signalr");
var app_1 = require("./app");
var hub_1 = require("./hub");
var loadresform_1 = require("../forms/loadresform");
var playform_1 = require("../forms/playform");
var charform_1 = require("../forms/charform");
var loginform_1 = require("../forms/loginform");
var playerdata_1 = require("../info/playerdata");
var signal_1 = require("./signal");
var mgfx_1 = require("../mlib/mgfx");
var MoonGame = /** @class */ (function () {
    function MoonGame() {
        this.value_speed = 1.0;
        app_1.App.Game = this;
        this.LoadResForm = new loadresform_1.LoadingResourceForm();
        this.SetActiveForm(this.LoadResForm);
        this.CaptureControl = null;
    }
    MoonGame.prototype.InitEngine = function () {
        var _this = this;
        this.LoadResForm.Text = "Initialize indexed db...";
        app_1.App.InitIndexedDb(function () {
            _this.LoadResForm.Text = "Initialize signalr...";
            var builder = new signalr_1.HubConnectionBuilder();
            app_1.App.Hub = new hub_1.MoonHub(builder
                .withUrl('/moonhub')
                .configureLogging(signalR.LogLevel.Information)
                .build());
            // register message coming from the server
            signal_1.MoonSignal.RegisterSignalREvents();
            // Запуск SignalR
            app_1.App.Hub.Hub.start()
                .then(function (res) {
                _this.LoadResForm.Text = "Loading resources...";
                app_1.App.Resx.LoadPackNames = [
                    "lzero", "ui-player", "window", "buttons", "controls", "misc",
                    "white-mag", "green-knight", "bow-skel", "priest",
                    "pink-zombie", "red-archer", "skel", "sword-skel",
                    "moon-click", "magic-arrow", "magic-arrow-explosive", "knight-aa-strike",
                    "bow-arrow", "fireball", "fireball-expl", "skills", "sword-strike",
                    "iknight"
                ];
                app_1.App.Resx.LoadAllResources(function () {
                    _this.LoadResForm.Text = "Starting game...";
                    app_1.App.PlayerData = new playerdata_1.PlayerData();
                    _this.InitProc_Login();
                });
            })
                .catch(function (err) {
                console.error(err.toString());
            });
        });
    };
    MoonGame.prototype.InitProc_Login = function () {
        if (app_1.App.UserAuth) {
            this.InitProc_SelectCharacter();
            return;
        }
        this.LoginForm = new loginform_1.LoginForm();
        this.SetActiveForm(this.LoginForm);
        this.LoginForm.ResizeWindow();
    };
    MoonGame.prototype.InitProc_AfterLogin = function () {
        this.InitProc_SelectCharacter();
    };
    MoonGame.prototype.InitProc_SelectCharacter = function () {
        this.CharForm = new charform_1.CharacterForm();
        this.SetActiveForm(this.CharForm);
        this.CharForm.ResizeWindow();
    };
    MoonGame.prototype.InitProc_InitPlayer = function () {
        this.MainForm = new playform_1.MoonPlayForm();
        this.InitPlayer();
    };
    MoonGame.prototype.InitProc_StartGame = function () {
        this.SetActiveForm(this.MainForm);
        this.MainForm.ResizeWindow();
        window.setTimeout(function () {
            app_1.App.Hub.DownloadAllObjects(app_1.App.PlayerGuid);
        }, 2000);
    };
    MoonGame.prototype.GameCycle = function () {
        if (this.ActiveForm)
            this.ActiveForm.Dispatch();
    };
    MoonGame.prototype.GamePaint = function () {
        if (this.ActiveForm) {
            this.ActiveForm.Paint();
        }
    };
    MoonGame.prototype.DialogShadow = function (CurrentDialogForm) {
        var form = this.ActiveForm;
        while (form.DialogForm != null)
            form = form.DialogForm;
        if (form == CurrentDialogForm)
            mgfx_1.Gpx.ShadowScreen();
    };
    MoonGame.prototype.PropagateMouseMove = function (Args) {
        if (this.MouseCaptured()) {
            this.MouseCaptureObject().PropagateMouseMove(Args);
            return;
        }
        if (this.ActiveForm)
            this.ActiveForm.PropagateMouseMove(Args);
    };
    MoonGame.prototype.PropagateMouseClick = function (Args) {
        if (this.MouseCaptured()) {
            this.MouseCaptureObject().PropagateMouseClick(Args);
            return;
        }
        if (this.ActiveForm)
            this.ActiveForm.PropagateMouseClick(Args);
    };
    MoonGame.prototype.PropagateMouseEnter = function (Args) {
        if (this.MouseCaptured()) {
            this.MouseCaptureObject().PropagateMouseEnter(Args);
            return;
        }
        if (this.ActiveForm)
            this.ActiveForm.PropagateMouseEnter(Args);
    };
    MoonGame.prototype.PropagateMouseLeave = function (Args) {
        if (this.MouseCaptured()) {
            this.MouseCaptureObject().PropagateMouseLeave(Args);
            return;
        }
        if (this.ActiveForm)
            this.ActiveForm.PropagateMouseLeave(Args);
    };
    MoonGame.prototype.PropagateMouseDown = function (Args) {
        if (this.MouseCaptured()) {
            this.MouseCaptureObject().PropagateMouseDown(Args);
            return;
        }
        if (this.ActiveForm)
            this.ActiveForm.PropagateMouseDown(Args);
    };
    MoonGame.prototype.PropagateMouseUp = function (Args) {
        if (this.MouseCaptured()) {
            this.MouseCaptureObject().PropagateMouseUp(Args);
            this.MouseRelease();
            return;
        }
        if (this.ActiveForm)
            this.ActiveForm.PropagateMouseUp(Args);
    };
    MoonGame.prototype.MouseCapture = function (Ctrl) {
        this.CaptureControl = Ctrl;
    };
    MoonGame.prototype.MouseRelease = function () {
        this.CaptureControl = null;
    };
    MoonGame.prototype.MouseCaptured = function () {
        return this.CaptureControl != null;
    };
    MoonGame.prototype.MouseCaptureObject = function () {
        return this.CaptureControl;
    };
    MoonGame.prototype.SetActiveForm = function (form) {
        if (this.ActiveForm)
            this.ActiveForm.Deactivate();
        this.ActiveForm = form;
        this.ActiveForm.Activate();
    };
    MoonGame.prototype.InitPlayer = function () {
        app_1.App.Hub.RegisterClient(app_1.App.UserGuid, this.CharacterId);
    };
    MoonGame.prototype.PlayerRegistered = function (playerInfo) {
        app_1.App.PlayerGuid = this.CharacterId;
        app_1.App.Field.InitializePlayer(playerInfo);
        app_1.App.Initialized = true;
        this.InitProc_StartGame();
    };
    return MoonGame;
}());
exports.MoonGame = MoonGame;
//# sourceMappingURL=game.js.map