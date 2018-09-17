import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './authentication.service';

@Component({
  selector: 'khk-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = 'Test Login App';
  public isLoggedIn: boolean;

  constructor(private authService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn;
    this.authService.onLoginChanged.subscribe(loginSuccess => {
      this.isLoggedIn = loginSuccess;
    });
  }
}
