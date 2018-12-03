export class BaseResponse {
  public errorCode: number = 0;
  public errorMessage: string;
  public stackTrace: string;
}

export class MoonCharListResult extends BaseResponse {
  public chars: Array<MoonChar>;
}
export class MoonCharResult extends BaseResponse {
  public char: MoonChar;
}
export class MoonCharGuidResult extends BaseResponse {
  public charGuid: string;
}
export class MoonChar {
  public moonCharacterGuid: string;
  public userGuid: string;
  public name: string;
  public class: number;
  public level: number;
  public data: string;
  public accessDate: Date;
}

export class LogOnData {
  public login: string;
  public password: string;
}

export class UserItem {
  public userGuid: string;
  public login: string;
  public active: number;
  public allow: number;
  public nickName: string;
  public lastName: string;
  public firstName: string;
  public middleName: string;
  public email: string;
  public phone: string;
  public profile: string;
  public lastLoginDate: Date;
}

export class UserEditResult extends BaseResponse {
  public user: UserItem;
}

export class AuthResult extends BaseResponse {
  public isAuthUser: boolean;
  public isAllow: boolean;
  public loginPath: string;
  public userName: string;
  public userGuid: string;
}
