import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { AuthenticationService } from './authentication.service';

@Injectable()
export class ValuesService {
  private authHeaders: HttpHeaders;

  constructor(private http: HttpClient, private authService: AuthenticationService) { }

  callApi(url: string): Observable<HttpResponse<Object>> {
    this._setAuthHeaders();
    return this.authGet(url);
  }

  authGet(url: string, headers?: HttpHeaders): Observable<HttpResponse<Object>> {

    // HEADERS ARE INJECTED in auth.interceptor
    // if (headers) {
    //   headers = this._setRequestOptions(headers);
    // } else {
    //   headers = this._setRequestOptions();
    // }
    return this.http.get<HttpResponse<Object>>(url /*, { headers: headers }*/);
  }

  private _setAuthHeaders(access_token?, token_type = 'Bearer') {
    access_token = access_token || this.authService.getCachedToken();

    this.authHeaders = new HttpHeaders();
    this.authHeaders = this.authHeaders.set('Authorization', token_type + ' ' + access_token);
    this.authHeaders = this.authHeaders.set('Content-Type', 'application/json');
  }
  public _setRequestOptions(headers?: HttpHeaders)  {

    if (headers) {
      headers.set('Authorization', this.authHeaders.get('Authorization'));
    } else {
      return this.authHeaders;
    }

    return headers;
  }
}
