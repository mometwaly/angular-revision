import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];
  editedItem = new Subject<number>();
  constructor() {}
  getIngredients() {
    return this.ingredients;
  }
  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
  }
  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
  }
  getIngredientByIndex(index: number) {
    return this.ingredients[index];
  }
  addIngredients(ingredients: Ingredient[]) {
    for (let ingredient of ingredients) {
      this.addIngredient(ingredient);
    }
  }
  updateIngredient(index: number, ingredient: Ingredient) {
    this.ingredients[index] = ingredient;
  }
}
