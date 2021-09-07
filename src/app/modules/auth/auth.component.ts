import { AuthService, AuthResponseData } from './../../services/auth.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import * as fromApp from './../../store/app.reducer';
import { Store } from '@ngrx/store';
import * as AuthActions from './store/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  error: string = '';
  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.store.select('auth').subscribe((authStore) => {
      this.isLoading = authStore.loading;
      this.error = authStore.authError;
    });
  }
  switchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
  onAuthenticate(form: NgForm) {
    if (!form.valid) {
      return;
    }
    this.isLoading = true;

    if (this.isLoginMode) {
      const email = form.value.email;
      const password = form.value.password;
      //authObs = this.authService.login(email, password);
      this.store.dispatch(new AuthActions.LoginStart({ email, password }));
    } else {
      const email = form.value.email;
      const password = form.value.password;
      this.store.dispatch(new AuthActions.SignupStart({ email, password }));
    }

    form.reset();
  }
}
