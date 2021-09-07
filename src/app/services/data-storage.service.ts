import { RecipeService } from './recipe.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../modules/recipes/recipe.model';
import { map, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromApp from './../store/app.reducer';
import * as RecipeActions from './../modules/recipes/store/recipe.actions';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeServices: RecipeService,
    private store: Store<fromApp.AppState>
  ) {}
  storeRecipes() {
    const recipes = this.recipeServices.getRecipes();
    this.http
      .put('https://ng-recipe-book-4c7db.firebaseio.com/recipes.json', recipes)
      .subscribe((res) => {
        console.log(res);
      });
  }
  fetchRecipes() {
    return this.http
      .get<Recipe[]>('https://ng-recipe-book-4c7db.firebaseio.com/recipes.json')
      .pipe(
        map((recipes) => {
          return recipes.map((recipe) => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : [],
            };
          });
        }),
        tap((recipes) => {
          //this.recipeServices.setRecipes(recipes);
          this.store.dispatch(new RecipeActions.SetRecipe(recipes));
        })
      );
  }
}
