import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Router} from '@angular/router';
import {StorageService} from './storage.service';
import {Observable, throwError} from 'rxjs';
import {environment} from '../../../environments/environment';
import {catchError, map} from 'rxjs/operators';

import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  jwttokenkey = 'auth';

  constructor(private httpClient: HttpClient,
              private router: Router,
              private storageService: StorageService) {
  }

  login(username, password): Observable<any> {
    const basicAuth = btoa(environment.idpUser + ':' + environment.idpPwd);

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
        Authorization: 'Basic ' + basicAuth
      })
    };

    const body = new HttpParams()
      .set('grant_type', 'password')
      .set('scope', environment.apiScope)
      .set('username', username)
      .set('password', password);

    return this.httpClient.post(environment.idpUrl + '/connect/token', body, options)
      .pipe(
        map((data: any) => {
          this.storageService.setItem(this.jwttokenkey, data.access_token);
        }),
        catchError(this.errorHandl)
      );
  }

  registerUserIdp(username: string, pwd: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const body = {
        Email: username,
        Password: pwd
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

  acitvateUserIdp(activationCode: string): Promise<any> {
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

  resetUserPwd(email: string): Promise<any> {
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

  setUserNewPwd(code: string): Promise<any> {
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

  logoff(): void {
    this.storageService.removeItem(this.jwttokenkey).then(() => {
      //this.router.navigate(['/anmelden']);
    });
  }

  isUserLoggedIn(): boolean {
    let loggedIn = false;
    const jwttoken = this.storageService.getItem(this.jwttokenkey);

    if (jwttoken) {
      const decoded = jwt_decode(jwttoken);
      const currentDate = new Date();
      const expirationDate = new Date(decoded.exp * 1000);

      const dif = expirationDate.getTime() - currentDate.getTime();
      //const dif = decoded.exp - currentDate;
      //console.log(expirationDate - currentDate);

      loggedIn = dif > 0;

      // console.log(dateStart.getUTCDate());
      // console.log(dateStart);
      // const dif = decoded.exp - decoded.iat;
      // console.log(dif);
      // console.log(decoded);
    }

    // console.log(loggedIn);

    return loggedIn;
  }

  tokenIfUserLoggedIn(): string {
    let token = '';

    if (this.isUserLoggedIn()) {
      // token = this.storageService.getItem(this.jwttokenkey);
      //
      // const decoded = jwt_decode(token);
      //
      // const dif = decoded.exp - decoded.iat;
      // console.log(dif);
      // if
      //
      // if (jwttoken.access_token) {
      //   token = jwttoken.access_token;
      // }
    }

    return token;
  }

  /*
  Checks if a user is in specific roles
  * */
  userInRole(roles: string[]): boolean {
    let exists = false;
    // const token = this.jwtHelper.decodeToken(this.tokenIfUserLoggedIn());
    //
    // roles.forEach((item) => {
    //   if (token.role.indexOf(item) !== -1) {
    //     exists = true;
    //   }
    // });

    return exists;
  }

  /*
  Error handling in
  * */
  errorHandl(error): any {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      if (error.error.error_description) {
        errorMessage = error.error.error_description;
      } else if (error.error.message) {
        errorMessage = error.error.message;
      }
    }
    return throwError(errorMessage);
  }
}
