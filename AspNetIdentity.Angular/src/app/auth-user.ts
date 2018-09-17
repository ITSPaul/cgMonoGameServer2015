
export class AuthUser {

    username: string;
    access_token: string;

    constructor(userName, access_token: string) {
        if (userName) {
          this.username = userName;
          this.access_token = access_token;
          }
        }
    }


export class Token {
  access_token: string;
  token_type: string;
  expires_in: string;
  userName:string;
  issued:string;
  expires:string;
}
