import 'rxjs/add/operator/toPromise';
import { HttpClient, DefaultHttpClient } from '@aspnet/signalr';

export class BaseService {
  protected _headers: { [key: string]: string; };
  protected _urlPrefix: string;
  protected _http: DefaultHttpClient;

  constructor() {
    this._http = new DefaultHttpClient(null)
    this._headers["Content-Type"] = "application/json;charset=utf-8";
    this._urlPrefix = "Api";
  }

  protected HttpRequest(url: string, object: any) {

  }

  protected handleError(error: any, method: string): Promise<any> {
    if (error != null && error.error != null && error.error.ErrorCode != null) {
      return Promise.reject(error.error.ErrorMessage);
    }
    console.error('An error occurred @ ' + method + ' service call', error);
    return Promise.reject(error.message || 'An error occurred @ ' + method + ' service call');
  }

}