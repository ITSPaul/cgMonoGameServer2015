import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AuthenticationService } from '../authentication.service';

import { environment } from '../../environments/environment';

import { AuthUser, Token } from '../auth-user';
import { ValuesService } from '../values.service';

@Component({
    selector: 'khk-restricted',
    templateUrl: 'restricted.component.html'
})

export class RestrictedComponent implements OnInit {
    public _user: AuthUser;
    public _apiValues: any;
    public isLoggedIn: boolean;
    public apiType: string;
    public message: string;

    constructor(
        private location: Location,
        private authService: AuthenticationService,
        private valuesService: ValuesService) {

        this.apiType = 'playerinfo';
        this.message = 'Hello from RestrictedComponent';
    }

    ngOnInit() {
      this.isLoggedIn = this.authService.isLoggedIn;
      this.authService.onLoginChanged.subscribe(loginSuccess => {
        this.isLoggedIn = loginSuccess;
      });
    }

    getUser() {
        this._user = this.authService.currentUser;
    }

    callApi() {
        const url = `${environment.apiHost}/api/${this.apiType}`;
        this.valuesService
            .callApi(url)
            .subscribe(result => {
                this._apiValues = result;
            },
            error => console.log(error));
    }
}
