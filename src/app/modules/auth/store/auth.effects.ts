import { User } from './../../../shared/user.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of, throwError } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { AuthResponseData } from 'src/app/services/auth.service';
import * as AuthActions from './auth.actions';
import * as fromApp from './../../../store/app.reducer';
import { Store } from '@ngrx/store';

const handelAuthentication = (resData) => {
  const expiratinDate = new Date(
    new Date().getTime() + +resData.expiresIn * 1000
  );
  const user = new User(
    resData.email,
    resData.localId,
    resData.idToken,
    expiratinDate
  );
  localStorage.setItem('userData', JSON.stringify(user));
  return new AuthActions.AuthenticateSuccess({
    email: resData.email,
    id: resData.localId,
    token: resData.idToken,
    expiratinDate: expiratinDate,
  });
};
const handelError = (errorResponse) => {
  let errorMessage = 'An error occured';
  if (!errorResponse.error.error || !errorResponse.error) {
    return of(new AuthActions.AuthenticateFail(errorMessage));
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
  return of(new AuthActions.AuthenticateFail(errorMessage));
};
@Injectable()
export class AuthEffects {
  @Effect()
  authSignUp = this.actions$.pipe(
    ofType(AuthActions.SIGNUP_START),
    switchMap((signupAction: AuthActions.SignupStart) => {
      return this.http
        .post<AuthResponseData>(
          'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC-7Mog7bvk26b1KZiy1YuWVPZOGmRv9FQ',
          {
            email: signupAction.payload.email,
            password: signupAction.payload.password,
            returnSecureToken: true,
          }
        )
        .pipe(
          map((res) => {
            return handelAuthentication(res);
          }),
          catchError((error) => {
            return handelError(error);
          })
        );
    })
  );
  @Effect()
  authLogin = this.actions$.pipe(
    ofType(AuthActions.LOGIN_START),
    switchMap((authData: AuthActions.LoginStart) => {
      return this.http
        .post<AuthResponseData>(
          'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC-7Mog7bvk26b1KZiy1YuWVPZOGmRv9FQ',
          {
            email: authData.payload.email,
            password: authData.payload.password,
            returnSecureToken: true,
          }
        )
        .pipe(
          map((resData) => {
            return handelAuthentication(resData);
          }),
          catchError((error) => {
            return handelError(error); // for returning observale not error for not crashing main observable
          })
        );
    })
  );
  @Effect({ dispatch: false })
  authSuccess = this.actions$.pipe(
    ofType(AuthActions.AUTHENTICATE_SUCCESS, AuthActions.LOGOUT),
    tap(() => {
      this.router.navigate(['/']);
    })
  );
  @Effect({ dispatch: false })
  authLogout = this.actions$.pipe(
    ofType(AuthActions.LOGOUT),
    tap(() => {
      localStorage.removeItem('userData');
    })
  );
  @Effect()
  autoLogin = this.actions$.pipe(
    ofType(AuthActions.AUTO_LOGIN),
    map(() => {
      const userdata: {
        email: string;
        id: string;
        _token: string;
        _tokenExpirationDate: string;
      } = JSON.parse(localStorage.getItem('userData'));
      if (!userdata) {
        return { type: 'Dummy' };
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
        return this.store.dispatch(
          new AuthActions.AuthenticateSuccess({
            email: loadedUser.email,
            id: loadedUser.id,
            token: loadedUser.token,
            expiratinDate: new Date(userdata._tokenExpirationDate),
          })
        );
      }
      return { type: 'Dummy' };
    })
  );
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}
}
