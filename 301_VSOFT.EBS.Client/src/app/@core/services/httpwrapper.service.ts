import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {environment} from 'src/environments/environment';
import {AuthService} from '@core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class HttpwrapperService {

  constructor(private httpClient: HttpClient,
              private authService: AuthService,
              @Inject(PLATFORM_ID) private platformId: any) {
  }

  public get(url: string, options?: any): Observable<any> {
    const urlDest = environment.apiUrl + url;

    if (!options) {
      options = {
        headers: new HttpHeaders({
          'Content-Type': `application/json; charset=utf-8`,
          Accept: 'application/json'
        })
      };
    }

    return this.httpClient.get<any>(urlDest, options).pipe(
      catchError(err => {
        console.log(err);
        return of(false);
      })
    );
  }

  public post(url: string, body: any, options?: any): Observable<any> {
    const bodyJson = JSON.stringify(body);
    const urlDest = environment.apiUrl + url;

    if (!options) {
      options = {
        headers: new HttpHeaders({
          'Content-Type': `application/json; charset=utf-8`,
          Accept: 'application/json'
        })
      };
    }

    return this.httpClient.post<any>(urlDest, bodyJson, options).pipe(
      catchError(err => {
        console.log(err);
        return of(false);
      })
    );
  }

  public put(url: string, body: string, options?: any): Observable<any> {
    const bodyJson = JSON.stringify(body);
    const urlDest = environment.apiUrl + url;

    if (!options) {
      options = {
        headers: new HttpHeaders({
          'Content-Type': `application/json; charset=utf-8`,
          Accept: 'application/json'
        })
      };
    }

    return this.httpClient.put<any>(urlDest, bodyJson, options).pipe(
      catchError(err => {
        console.log(err);
        return of(false);
      })
    );
  }

  public delete(url: string, options?: any): Observable<any> {
    const urlDest = environment.apiUrl + url;

    if (!options) {
      options = {
        headers: new HttpHeaders({
          'Content-Type': `application/json; charset=utf-8`,
          Accept: 'application/json'
        })
      };
    }

    return this.httpClient.delete<any>(urlDest, options).pipe(
      catchError(err => {
        console.log(err);
        return of(false);
      })
    );
  }

  public patch(url: string, body: string, options?: any): Observable<any> {
    const bodyJson = JSON.stringify(body);
    const urlDest = environment.apiUrl + url;

    if (!options) {
      options = {
        headers: new HttpHeaders({
          'Content-Type': `application/json; charset=utf-8`,
          Accept: 'application/json'
        })
      };
    }

    return this.httpClient.patch<any>(urlDest, bodyJson, options).pipe(
      catchError(err => {
        console.log(err);
        return of(false);
      })
    );
  }

  public clientLogging(error: any) {
    console.log(error);
    this.post(environment.apiUrl + '/client /logging', error).pipe(
      catchError(err => {
        return of(err);
      })
    );
  }
}
