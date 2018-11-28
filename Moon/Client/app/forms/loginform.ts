import { MForm } from "../mlib/mform";
import { MWindow } from "../mlib/mwindow";
import { MFixButton } from "../ui/mfixbutton";
import { MLabel } from "../mlib/mlabel";
import { MTextBox } from "../mlib/mtextbox";
import { MAlign, MVAlign } from "../mlib/mcontrol";
import { App } from "../global/app";
import { LogOnData } from "../service/moon-info";

export class LoginForm extends MForm {
  public wMain: MWindow;
  public bLogin: MFixButton;
  public lError: MLabel;
  public lLogin: MLabel;
  public lPassword: MLabel;
  public tbLogin: MTextBox;
  public tbPassword: MTextBox;

  constructor() {
    super();
    this.backgroundColor = "#231C19";
    this.transparent = false;
    this.BorderVisible = false;

    this.wMain = new MWindow();
    this.wMain.Text = "Введите учетные данные";
    this.wMain.Font = "32px Roboto-Bold";
    this.wMain.Width = 500;
    this.wMain.Height = 450;
    this.wMain.Align = MAlign.Center;
    this.wMain.VAlign = MVAlign.Middle;
    this.controls.Add(this.wMain);

    this.lLogin = new MLabel();
    this.lLogin.X = 0;
    this.lLogin.Y = 120;
    this.lLogin.Width = 240;
    this.lLogin.Align = MAlign.Center;
    this.lLogin.Text = "Login";
    this.wMain.Controls.Add(this.lLogin);

    this.tbLogin = new MTextBox();
    this.tbLogin.BackgroundColor = "#C0A383";
    this.tbLogin.Y = 160;
    this.tbLogin.Width = 240;
    this.tbLogin.Align = MAlign.Center;
    this.tbLogin.Text = "";
    this.wMain.Controls.Add(this.tbLogin);

    this.lPassword = new MLabel();
    this.lPassword.X = 0;
    this.lPassword.Y = 220;
    this.lPassword.Width = 240;
    this.lPassword.Align = MAlign.Center;
    this.lPassword.Text = "Password";
    this.wMain.Controls.Add(this.lPassword);

    this.tbPassword = new MTextBox();
    this.tbPassword.BackgroundColor = "#C0A383";
    this.tbPassword.Y = 260;
    this.tbPassword.Width = 240;
    this.tbPassword.Align = MAlign.Center;
    this.tbPassword.Text = "";
    this.tbPassword.Password = true;
    this.wMain.Controls.Add(this.tbPassword);

    this.bLogin = new MFixButton();
    this.bLogin.X = 0;
    this.bLogin.Y = 330;
    this.bLogin.Color = "#FFFCEE";
    this.bLogin.ShadowColor = "#000000";
    this.bLogin.Text = "Вход";
    this.bLogin.Align = MAlign.Center;
    this.bLogin.MouseClick = (s, e) => {
      var login = this.tbLogin.Text.trim();
      var password = this.tbPassword.Text.trim();
      this.lError.Text = "";
      if (login.length < 1 || login.length > 64 || password.length < 1 || password.length > 64) {
        this.lError.Text = "Неверные учетные данные";
        return;
      }
      this.Login();
    };
    this.wMain.Controls.Add(this.bLogin);

    this.lError = new MLabel();
    this.lError.X = 0;
    this.lError.Y = 390;
    this.lError.Width = this.wMain.Width;
    this.lError.Align = MAlign.Center;
    this.lError.TextAlign = MAlign.Center;
    this.lError.Color = "#E35D52";
    this.lError.Text = "";
    this.wMain.Controls.Add(this.lError);
  }

  public Login(): void {
    var logInfo: LogOnData = new LogOnData();
    logInfo.login = this.tbLogin.Text.trim();
    logInfo.password = this.tbPassword.Text.trim();
    App.Hub.Request("LogOn", logInfo, (res) => {
      if (res.errorCode == 0) {
        App.UserAuth = true;
        App.UserGuid = res.user.userGuid;
        App.Game.InitProc_AfterLogin();
      } else
        this.lError.Text = res.errorMessage;
    });
    /*
    var xhr = new XMLHttpRequest();
    xhr.open('PUT', 'myservice/user/1234');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function() {
        if (xhr.status === 200) {
            var userInfo = JSON.parse(xhr.responseText);
        }
    };
    xhr.send(JSON.stringify({
        name: 'John Smith',
        age: 34
    }));     
    */
  }

  public ResizeWindow(): void {
    this.width = App.Game.Width;
    this.height = App.Game.Height;
    super.ResizeWindow();
  }

}
