import { User } from './../shared/user.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Subject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromApp from './../store/app.reducer';
import * as AuthActions from './../modules/auth/store/auth.actions';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  //user = new Subject<User>();
  token: string;
  private tokenExpriationTimer: any;
  constructor(
    private http: HttpClient,
    private store: Store<fromApp.AppState>
  ) {}
  signUp(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC-7Mog7bvk26b1KZiy1YuWVPZOGmRv9FQ',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handelError),
        tap((resData) => {
          this.handelAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }
  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC-7Mog7bvk26b1KZiy1YuWVPZOGmRv9FQ',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handelError),
        tap((resData) => {
          this.handelAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }
  private handelError(errorResponse: HttpErrorResponse) {
    let errorMessage = 'An error occured';
    if (!errorResponse.error.error || !errorResponse.error) {
      return throwError(errorMessage);
    }
    switch (errorResponse.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This Email already exist';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This is Email not found';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password not correct';
        break;
    }
    return throwError(errorMessage);
  }
  private handelAuthentication(
    email: string,
    id: string,
    token: string,
    expireIn: number
  ) {
    const expiratinDate = new Date(new Date().getTime() + +expireIn * 1000);
    const user = new User(email, id, token, expiratinDate);
    //this.user.next(user);
    this.store.dispatch(
      new AuthActions.AuthenticateSuccess({
        email: email,
        id: id,
        token: token,
        expiratinDate: expiratinDate,
      })
    );
    this.autoLogout(expireIn * 1000);
    this.token = token;
    localStorage.setItem('userData', JSON.stringify(user));
  }
  autoLogin() {
    const userdata: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userdata) {
      return;
    }
    const loadedUser = new User(
      userdata.email,
      userdata.id,
      userdata._token,
      new Date(userdata._tokenExpirationDate)
    );
    if (loadedUser.token) {
      //this.user.next(loadedUser);
      //we should call auto logout
      this.store.dispatch(
        new AuthActions.AuthenticateSuccess({
          email: loadedUser.email,
          id: loadedUser.id,
          token: loadedUser.token,
          expiratinDate: new Date(userdata._tokenExpirationDate),
        })
      );
      this.token = loadedUser.token;
      console.log('log from autoLogin');
    }
  }
  logout() {
    if (this.tokenExpriationTimer) {
      clearTimeout(this.tokenExpriationTimer);
    }
    this.tokenExpriationTimer = null;
    //this.user.next(undefined);
    this.store.dispatch(new AuthActions.Logout());
    this.token = null;
    localStorage.removeItem('userData');
  }
  autoLogout(expirationDuration: number) {
    this.tokenExpriationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }
}
