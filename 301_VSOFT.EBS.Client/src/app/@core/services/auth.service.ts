import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {OAuthService} from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient,
              private oauthService: OAuthService) {

  }

  async registerUserIdp(username: string, pwd: string, fullname: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const body = {
        Email: username,
        Password: pwd,
        FullName: fullname
      };

      const options = {
        headers: new HttpHeaders({
          'Content-Type': `application/json; charset=utf-8`,
          Accept: 'application/json'
        })
      };

      return this.httpClient.post(environment.idpUrl + '/account/register', body, options).subscribe((aCode) => {
        resolve(aCode);
      }, error => {
        reject(error);
      });
    });
  }

  async acitvateUserIdp(activationCode: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const options = {
        headers: new HttpHeaders({
          'Content-Type': `application/json; charset=utf-8`,
          Accept: 'application/json'
        })
      };

      return this.httpClient.get(environment.idpUrl + '/account/activate' + `/${activationCode}`, options).subscribe((aCode) => {
        resolve(aCode);
      }, errorObj => {
        reject(errorObj.error);
      });
    });
  }

  async resetUserPwd(email: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const options = {
        headers: new HttpHeaders({
          'Content-Type': `application/json; charset=utf-8`,
          Accept: 'application/json'
        })
      };

      return this.httpClient.get(environment.idpUrl + `/account/pwdreset/${email}`, options).subscribe((aCode) => {
        resolve(aCode);
      }, errorObj => {
        reject(errorObj.error);
      });
    });
  }

  async setUserNewPwd(code: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const options = {
        headers: new HttpHeaders({
          'Content-Type': `application/json; charset=utf-8`,
          Accept: 'application/json'
        })
      };

      return this.httpClient.get(environment.idpUrl + `/account/pwdreset/newpwd/${code}`, options).subscribe((aCode) => {
        resolve(aCode);
      }, errorObj => {
        reject(errorObj.error);
      });
    });
  }

  checkIfUserExists(username: string): Observable<any> {
    return this.httpClient.get(environment.idpUrl + '/account/exists' + '?uname=' + username);
  }

  async userInRole(roles: string[]): Promise<boolean> {
    let isInRole = false;

    if (this.oauthService.hasValidAccessToken()) {
      const claims = this.oauthService.getIdentityClaims() as any;

      if (claims && claims.role && Array.isArray(claims.role)) {
        claims.role.forEach((item) => {
          if (roles.indexOf(item) !== -1) {
            isInRole = true;
          }
        });
      } else {
        if (roles.indexOf(claims.role) !== -1) {
          isInRole = true;
        }
      }
    }

    return isInRole;
  }

  isUserAdmin() {
    let isAdmin = false;

    if (this.oauthService.hasValidAccessToken()) {
      const claims = this.oauthService.getIdentityClaims() as any;

      if (claims?.role?.indexOf('Admin') !== -1) {
        isAdmin = true;
      }
    }

    return isAdmin;
  }

  isNormalUser() {
    let isNormalUser = false;

    if (this.oauthService.hasValidAccessToken()) {
      const claims = this.oauthService.getIdentityClaims() as any;

      if (claims?.role?.indexOf('Benutzer') !== -1) {
        isNormalUser = true;
      }
    }

    return isNormalUser;
  }

  getUsername(): string {
    let name = '';

    if (this.oauthService.hasValidAccessToken()) {
      const claims = this.oauthService.getIdentityClaims() as any;
      name = claims.name;
    }

    return name;
  }
}
