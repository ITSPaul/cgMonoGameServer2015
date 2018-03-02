import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private authService: AuthenticationService;

  constructor(private inj: Injector) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let headers = req.headers;
    if (!headers.has('Content-Type')) {
      headers = headers.set('Content-Type', 'application/json');
    }

    if (!headers.has('Authorization')) {
      this.authService = this.inj.get(AuthenticationService);
      const authHeader = this.authService.getAuthorizationHeader();
      if (authHeader) {
        headers = headers.set('Authorization', authHeader);
      }
    }

    // Clone the request to add the new header.
    const authReq = req.clone({headers: headers});
    // Pass on the cloned request instead of the original request.
    return next.handle(authReq);
  }
}
