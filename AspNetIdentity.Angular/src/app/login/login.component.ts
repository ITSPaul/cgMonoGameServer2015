import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'khk-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private isLogged = false;
  private subscription: any;

  userPasswordInput: string;
  userEmailInput: string;

  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit() {
    this.isLogged = this.authService.isLoggedIn;
    this.authService.onLoginChanged.subscribe(loginSuccess => {
      this.isLogged = loginSuccess;
    });
  }

  login(username: string, password: string): void {
    this.authService.login(username, password)
    .subscribe(
        resultData => {
          this.isLogged = !!resultData;
          console.log(resultData);
          if (this.isLogged) {
            this.router.navigate(['/']);
          }
        },
      err => {
        console.log(err);
        // TODO: handle incorrect login
      });
  }

  logout(): void {
    this.authService.logout();
  }

  get isLoggedIn(): boolean {
    return this.isLogged;
  }

}
