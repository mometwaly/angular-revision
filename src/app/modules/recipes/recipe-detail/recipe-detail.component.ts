import { RecipeService } from './../../../services/recipe.service';
import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {
  @Input() recipe : Recipe;
  constructor(private recipeService : RecipeService) { }

  ngOnInit(): void {
  }
  addIngredientToShoppingList(){
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients)
  }
}
