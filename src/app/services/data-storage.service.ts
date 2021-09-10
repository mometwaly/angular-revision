import { RecipeService } from './recipe.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../modules/recipes/recipe.model';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeServices: RecipeService
  ) {}
  storeRecipes() {
    const recipes = this.recipeServices.getRecipes();
    this.http
      .post('https://ng-recipe-book-4c7db.firebaseio.com/recipes.json', recipes)
      .subscribe(
        (respose) => {
          console.log(respose);
        },
        (error) => {
          console.log(error);
        }
      );
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
          this.recipeServices.setRecipes(recipes);
        })
      );
  }
}
