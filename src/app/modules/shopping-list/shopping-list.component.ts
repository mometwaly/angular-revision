import * as ShoppingListActions from './store/shopping-list.actions';
import * as FromShoppingList from './store/shopping-list.reducer';
import { ShoppingListService } from './../../services/shopping-list.service';
import { Component, OnInit } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Store } from '@ngrx/store';
import * as fromApp from './../../store/app.reducer';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[];
  constructor(
    private shoppingListService: ShoppingListService,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.store.select('shoppingList').subscribe((shoppingListStoreData) => {
      this.ingredients = shoppingListStoreData.ingredients;
    });
  }
  onEditItem(index: number) {
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
  }
}
