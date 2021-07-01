import { RecipeService } from './../../services/recipe.service';
import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
})
export class RecipesComponent implements OnInit {
  targetRecipe : Recipe;
  constructor(private recipeService : RecipeService) {}

  ngOnInit(): void {
    this.recipeService.recipeSelected.subscribe((recipe:Recipe)=>{
      this.targetRecipe=recipe
    })
  }
}
