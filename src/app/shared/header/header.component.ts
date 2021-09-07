import { User } from './../user.model';
import { AuthService } from './../../services/auth.service';
import { DataStorageService } from './../../services/data-storage.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import { map } from 'rxjs/operators';
import * as AuthActions from './../../modules/auth/store/auth.actions';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  isAuthenticated = false;

  ngOnInit(): void {
    this.store
      .select('auth')
      .pipe(
        map((authData) => {
          return authData.user;
        })
      )
      .subscribe((user) => {
        this.isAuthenticated = user ? true : false;
      });
  }
  onSaveData() {
    this.dataStorageService.storeRecipes();
  }
  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }
  ngOnDestroy(): void {}
  onLogout() {
    this.store.dispatch(new AuthActions.Logout());
  }
}
