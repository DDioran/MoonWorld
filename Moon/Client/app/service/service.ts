import { LogOnData, UserEditResult, AuthResult } from "./response";

export class MoonService {
  public static logOn(logOnData: LogOnData, callback: (result: UserEditResult) => void) {
    var xhr = new XMLHttpRequest();
    xhr.open('PUT', 'ApiMoon/LogOn');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function () {
      if (xhr.status === 200) {
        if (callback)
          callback(JSON.parse(xhr.responseText));
      }
    };
    xhr.send(JSON.stringify(logOnData));
  }
  public static authInfo(callback: (result: AuthResult) => void) {
    var xhr = new XMLHttpRequest();
    xhr.open('PUT', 'ApiMoon/GetAuthInfo');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function () {
      if (xhr.status === 200) {
        if (callback)
          callback(JSON.parse(xhr.responseText));
      }
    };
    xhr.send(null);
  }
}
