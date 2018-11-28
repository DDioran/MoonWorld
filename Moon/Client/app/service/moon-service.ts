import { BaseResponse } from "./base-response";
import { BaseService } from "./base-service";
import { HttpClient } from "@aspnet/signalr";
import { LogOnData } from "./moon-info";

export class MoonService extends BaseService {
  constructor() {
    super();
    this._urlPrefix = "/Api/";
  }
  /*public registerClient(clientId: string): Promise<BaseResponse> {
    return this._http
      .post(this._urlPrefix + "RegisterClient", new  JSON.stringify(clientId))
      .toPromise()
      .then(res => res as BaseResponse)
      .catch(reason => this.handleError(reason, "registerClient"));
  }
  public initializeClient(clientId: string): Promise<MoonClientInfoResult> {
    return this._http
      .post(this._urlPrefix + "InitializeClient", JSON.stringify(clientId), { headers: this._headers })
      .toPromise()
      .then(res => res as MoonClientInfoResult)
      .catch(reason => this.handleError(reason, "initializeClient"));
  }
  public logOn(logOnData: LogOnData): Promise<UserEditResult> {
    return this._http
      .post(this._urlPrefix + "LogOn", JSON.stringify(logOnData), { headers: this._headers })
      .toPromise()
      .then(res => res as UserEditResult)
      .catch(reason => this.handleError(reason, "logOn"));
  }
  public getMoonCharacterList(userGuid: string): Promise<MoonCharListResult> {
    return this._http
      .post(this._urlPrefix + "GetMoonCharacterList", JSON.stringify(userGuid), { headers: this._headers })
      .toPromise()
      .then(res => res as MoonCharListResult)
      .catch(reason => this.handleError(reason, "getMoonCharacterList"));
  }
  public getMoonCharacter(moonCharacterGuid: string): Promise<MoonCharResult> {
    return this._http
      .post(this._urlPrefix + "GetMoonCharacter", JSON.stringify(moonCharacterGuid), { headers: this._headers })
      .toPromise()
      .then(res => res as MoonCharResult)
      .catch(reason => this.handleError(reason, "getMoonCharacter"));
  }
  public insertMoonCharacter(moonChar: MoonChar): Promise<MoonCharGuidResult> {
    return this._http
      .post(this._urlPrefix + "InsertMoonCharacter", JSON.stringify(moonChar), { headers: this._headers })
      .toPromise()
      .then(res => res as MoonCharGuidResult)
      .catch(reason => this.handleError(reason, "insertMoonCharacter"));
  }
  public updateMoonCharacter(moonChar: MoonChar): Promise<BaseResponse> {
    return this._http
      .post(this._urlPrefix + "UpdateMoonCharacter", JSON.stringify(moonChar), { headers: this._headers })
      .toPromise()
      .then(res => res as BaseResponse)
      .catch(reason => this.handleError(reason, "updateMoonCharacter"));
  }
  public deleteMoonCharacter(userGuid: string): Promise<BaseResponse> {
    return this._http
      .post(this._urlPrefix + "DeleteMoonCharacter", JSON.stringify(userGuid), { headers: this._headers })
      .toPromise()
      .then(res => res as BaseResponse)
      .catch(reason => this.handleError(reason, "deleteMoonCharacter"));
  }*/
}
