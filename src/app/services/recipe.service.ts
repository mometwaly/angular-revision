import { Subject } from 'rxjs';

import { Ingredient } from './../shared/ingredient.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from '../modules/recipes/recipe.model';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../modules/shopping-list/store/shopping-list.actions';
import * as formShoppingList from '../modules/shopping-list/store/shopping-list.reducer';
import * as fromApp from '../store/app.reducer';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();
  recipesChanged = new Subject<Recipe[]>();
  private recipes: Recipe[] = [];

  constructor(
    //private slService: ShoppingListService,
    private store: Store<fromApp.AppState>
  ) {}
  getRecipes() {
    return this.recipes;
  }
  getRecipe(index: number) {
    return this.recipes[index];
  }
  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
  }
  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
  }
  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
  }
  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
  }
  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
  }
}
