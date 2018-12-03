"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var mform_1 = require("../mlib/mform");
var mwindow_1 = require("../mlib/mwindow");
var mfixbutton_1 = require("../ui/mfixbutton");
var mlabel_1 = require("../mlib/mlabel");
var mtextbox_1 = require("../mlib/mtextbox");
var mcontrol_1 = require("../mlib/mcontrol");
var app_1 = require("../global/app");
var service_1 = require("../service/service");
var response_1 = require("../service/response");
var LoginForm = /** @class */ (function (_super) {
    __extends(LoginForm, _super);
    function LoginForm() {
        var _this = _super.call(this) || this;
        _this.backgroundColor = "#231C19";
        _this.transparent = false;
        _this.BorderVisible = false;
        _this.wMain = new mwindow_1.MWindow();
        _this.wMain.Text = "Введите учетные данные";
        _this.wMain.Font = "32px CoreRhino-Regular";
        _this.wMain.Width = 500;
        _this.wMain.Height = 450;
        _this.wMain.Align = mcontrol_1.MAlign.Center;
        _this.wMain.VAlign = mcontrol_1.MVAlign.Middle;
        _this.controls.Add(_this.wMain);
        _this.lLogin = new mlabel_1.MLabel();
        _this.lLogin.X = 0;
        _this.lLogin.Y = 120;
        _this.lLogin.Width = 240;
        _this.lLogin.Align = mcontrol_1.MAlign.Center;
        _this.lLogin.Text = "Login";
        _this.wMain.Controls.Add(_this.lLogin);
        _this.tbLogin = new mtextbox_1.MTextBox();
        _this.tbLogin.BackgroundColor = "#C0A383";
        _this.tbLogin.Y = 160;
        _this.tbLogin.Width = 240;
        _this.tbLogin.Align = mcontrol_1.MAlign.Center;
        _this.tbLogin.Text = "";
        _this.wMain.Controls.Add(_this.tbLogin);
        _this.lPassword = new mlabel_1.MLabel();
        _this.lPassword.X = 0;
        _this.lPassword.Y = 220;
        _this.lPassword.Width = 240;
        _this.lPassword.Align = mcontrol_1.MAlign.Center;
        _this.lPassword.Text = "Password";
        _this.wMain.Controls.Add(_this.lPassword);
        _this.tbPassword = new mtextbox_1.MTextBox();
        _this.tbPassword.BackgroundColor = "#C0A383";
        _this.tbPassword.Y = 260;
        _this.tbPassword.Width = 240;
        _this.tbPassword.Align = mcontrol_1.MAlign.Center;
        _this.tbPassword.Text = "";
        _this.tbPassword.Password = true;
        _this.wMain.Controls.Add(_this.tbPassword);
        _this.bLogin = new mfixbutton_1.MFixButton();
        _this.bLogin.X = 0;
        _this.bLogin.Y = 330;
        _this.bLogin.Color = "#FFFCEE";
        _this.bLogin.ShadowColor = "#000000";
        _this.bLogin.Text = "Вход";
        _this.bLogin.Align = mcontrol_1.MAlign.Center;
        _this.bLogin.MouseClick = function (s, e) {
            var login = _this.tbLogin.Text.trim();
            var password = _this.tbPassword.Text.trim();
            _this.lError.Text = "";
            if (login.length < 1 || login.length > 64 || password.length < 1 || password.length > 64) {
                _this.lError.Text = "Неверные учетные данные";
                return;
            }
            _this.Login();
        };
        _this.wMain.Controls.Add(_this.bLogin);
        _this.lError = new mlabel_1.MLabel();
        _this.lError.X = 0;
        _this.lError.Y = 390;
        _this.lError.Width = _this.wMain.Width;
        _this.lError.Align = mcontrol_1.MAlign.Center;
        _this.lError.TextAlign = mcontrol_1.MAlign.Center;
        _this.lError.Color = "#E35D52";
        _this.lError.Text = "";
        _this.wMain.Controls.Add(_this.lError);
        return _this;
    }
    LoginForm.prototype.Login = function () {
        var _this = this;
        var logInfo = new response_1.LogOnData();
        logInfo.login = this.tbLogin.Text.trim();
        logInfo.password = this.tbPassword.Text.trim();
        service_1.MoonService.logOn(logInfo, function (res) {
            if (res.errorCode == 0) {
                app_1.App.UserAuth = true;
                app_1.App.UserGuid = res.user.userGuid;
                app_1.App.Game.InitProc_AfterLogin();
            }
            else
                _this.lError.Text = res.errorMessage;
        });
    };
    LoginForm.prototype.ResizeWindow = function () {
        this.width = app_1.App.Game.Width;
        this.height = app_1.App.Game.Height;
        _super.prototype.ResizeWindow.call(this);
    };
    return LoginForm;
}(mform_1.MForm));
exports.LoginForm = LoginForm;
//# sourceMappingURL=loginform.js.map