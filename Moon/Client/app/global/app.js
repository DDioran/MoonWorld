"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var indexeddb_angular_1 = require("indexeddb-angular");
var resx_1 = require("./resx");
var game_1 = require("./game");
var mgfx_1 = require("../mlib/mgfx");
var events_1 = require("../mlib/events");
var App = /** @class */ (function () {
    function App() {
    }
    App.InitializeApplication = function () {
        this.Html = document.querySelector("#gameField");
        this.Canvas = document.querySelector("#gameCanvas");
        this.Context = this.Canvas.getContext("2d");
        new game_1.MoonGame();
        new resx_1.ResX();
        this.InitializeEvents();
        this.GameInit();
        this.resize_window();
        App.UserAuth = false;
        App.UserAllow = false;
        App.UserName = null;
        App.UserGuid = null;
        this.Game.InitEngine();
    };
    App.InitializeEvents = function () {
        var _this = this;
        window.addEventListener("resize", function () { _this.resize_window(); }, false);
        document.addEventListener("keydown", function (evt) { _this.key_operation(evt, true); }, false);
        document.addEventListener("keyup", function (evt) { _this.key_operation(evt, false); }, false);
        App.Canvas.addEventListener('mousemove', function (evt) { _this.mouse_move(evt); }, false);
        App.Canvas.addEventListener('click', function (evt) { _this.mouse_click(evt); }, false);
        App.Canvas.addEventListener('contextmenu', function (evt) { _this.mouse_click(evt); }, false);
        App.Canvas.addEventListener('mouseover', function (evt) { _this.mouse_enter(evt); }, false);
        App.Canvas.addEventListener('mouseout', function (evt) { _this.mouse_leave(evt); }, false);
        App.Canvas.addEventListener('mousedown', function (evt) { _this.mouse_down(evt); }, false);
        App.Canvas.addEventListener('mouseup', function (evt) { _this.mouse_up(evt); }, false);
        window.addEventListener('mousemove', function (evt) { _this.body_move(evt); }, false);
        document.addEventListener('selectstart', function (evt) { event.preventDefault(); }, false);
        document.addEventListener('contextmenu', function (evt) { event.preventDefault(); }, false);
        window.addEventListener("mousewheel", function (evt) { _this.mouse_wheel(evt); }, false);
    };
    App.InitIndexedDb = function (callback) {
        var _this = this;
        this.MoonDb = new indexeddb_angular_1.IndexedDBAngular('MoonDb', 1);
        this.MoonDb.createStore(1, function (db) {
            db.currentTarget.result.createObjectStore('moonJson', { keyPath: "name" });
        }).then(function () {
            _this.IsMoonDb = true;
            console.log("Information: Game connected to IndexedDB.");
            if (callback)
                callback();
        }, function (error) {
            console.log(error);
            if (callback)
                callback();
        });
    };
    App.resize_window = function () {
        App.Canvas.width = App.Html.clientWidth - 4;
        App.Canvas.height = App.Html.clientHeight - 4;
        App.Game.Width = App.Canvas.width;
        App.Game.Height = App.Canvas.height;
        if (App.Game.ActiveForm)
            App.Game.ActiveForm.ResizeWindow();
    };
    App.mouse_wheel = function (event) {
        if (!event)
            event = window.event;
        if (event.ctrlKey)
            event.preventDefault();
    };
    App.key_operation = function (event, downkey) {
        if (App.Initialized && App.Field) {
            if (App.Field.Chat && App.Field.Chat.input.IsFocus())
                return;
            App.Field.DropContextPanels();
        }
        var keycode = 0;
        if (!event)
            event = window.event;
        if (event.keyCode)
            keycode = event.keyCode; // IE
        else if (event.which)
            keycode = event.which; // all browsers
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
        if (keycode == 107 && downkey)
            App.Game.value_speed += 0.1;
        if (keycode == 109 && downkey)
            App.Game.value_speed -= 0.1;
    };
    App.getMousePos = function (evt) {
        var rect = App.Canvas.getBoundingClientRect();
        return new mgfx_1.Coord(evt.clientX - rect.left, evt.clientY - rect.top);
    };
    App.body_move = function (evt) {
        App.StoreXY = new mgfx_1.Coord(evt.clientX, evt.clientY);
        App.StoreXYPos = null;
    };
    App.mouse_move = function (evt) {
        App.StoreXY = new mgfx_1.Coord(evt.clientX, evt.clientY);
        App.StoreXYPos = this.getMousePos(evt);
        var args = new events_1.MouseExtArgs(0, App.StoreXYPos.X, App.StoreXYPos.Y, this.mouseOldX, this.mouseOldY);
        App.Game.PropagateMouseMove(args);
        this.mouseOldX = App.StoreXYPos.X;
        this.mouseOldY = App.StoreXYPos.Y;
        evt.preventDefault();
        evt.stopPropagation();
    };
    App.mouse_click = function (evt) {
        var mousePos = this.getMousePos(evt);
        var args = new events_1.MouseArgs(evt.button, mousePos.X, mousePos.Y);
        App.Game.PropagateMouseClick(args);
        evt.preventDefault();
        evt.stopPropagation();
    };
    App.mouse_enter = function (evt) {
        var mousePos = this.getMousePos(evt);
        var args = new events_1.MouseArgs(0, mousePos.X, mousePos.Y);
        App.Game.PropagateMouseEnter(args);
        evt.preventDefault();
        evt.stopPropagation();
    };
    App.mouse_leave = function (evt) {
        var mousePos = this.getMousePos(evt);
        var args = new events_1.MouseArgs(0, mousePos.X, mousePos.Y);
        App.Game.PropagateMouseLeave(args);
        evt.preventDefault();
        evt.stopPropagation();
    };
    App.mouse_down = function (evt) {
        if (App.Initialized && App.Field) {
            if (App.Field.Chat)
                App.Field.Chat.input.DropFocus();
            //App.Field.DropContextPanels();
        }
        var mousePos = this.getMousePos(evt);
        var args = new events_1.MouseArgs(evt.button, mousePos.X, mousePos.Y);
        App.Game.PropagateMouseDown(args);
        evt.preventDefault();
        evt.stopPropagation();
    };
    App.mouse_up = function (evt) {
        var mousePos = this.getMousePos(evt);
        var args = new events_1.MouseArgs(evt.button, mousePos.X, mousePos.Y);
        App.Game.PropagateMouseUp(args);
        evt.preventDefault();
        evt.stopPropagation();
        if (App.MBtns[evt.button])
            App.MBtns[evt.button] = null;
    };
    App.GameInit = function () {
        this.lastTime = Date.now();
        this.fpsTime = Date.now();
        this.Active = true;
        window.setInterval(function () { App.GameDispatch(); }, 16);
        this.GamePaint();
    };
    App.GameDispatch = function () {
        if (!this.Active)
            return;
        if (this.Runnig)
            return;
        this.Runnig = true;
        var now = Date.now();
        App.DeltaTime = (now - this.lastTime) / 1000.0;
        App.Game.GameCycle();
        this.lastTime = now;
        this.Runnig = false;
    };
    App.GamePaint = function () {
        var _this = this;
        if (App.Field)
            App.Field.SetCursor();
        App.Game.GamePaint();
        requestAnimationFrame(function () {
            _this.GamePaint();
        });
    };
    App.Initialized = false;
    App.PlayerGuid = null;
    App.IsMoonDb = false;
    App.MoonDb = null;
    App.Keys = {};
    App.MBtns = {};
    App.Runnig = false;
    App._ox = 0;
    App._oy = 0;
    App.UserAuth = false;
    App.UserGuid = null;
    App.UserAllow = false;
    return App;
}());
exports.App = App;
//# sourceMappingURL=app.js.map