import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';

@Component({
    selector: 'khk-home',
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
    public isLoggedIn: boolean;
    public message: string;

    constructor(private authService: AuthenticationService) {
        this.message = 'Hello from HomeComponent';
    }

    ngOnInit(): void {
      this.isLoggedIn = this.authService.isLoggedIn;
      this.authService.onLoginChanged.subscribe(loginSuccess => {
        this.isLoggedIn = loginSuccess;
      });
    }

    public logout(): void {
      this.authService.logout();
    }

}
