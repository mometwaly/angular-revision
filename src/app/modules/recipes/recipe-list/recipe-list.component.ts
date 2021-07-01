import { RecipeService } from './../../../services/recipe.service';
import { Recipe } from './../recipe.model';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[]
  constructor(private recipeService:RecipeService) {}

  ngOnInit(): void {
    this.recipes=this.recipeService.getRecipes();

  }
}
