import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class IsLoggedInGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthenticationService) { }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const isLoggedIn = this.authService.isLoggedIn;
    if (!isLoggedIn) {
      this.router.navigateByUrl('/');
    }
    return isLoggedIn;
  }
}
