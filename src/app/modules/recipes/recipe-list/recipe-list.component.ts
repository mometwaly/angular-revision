import { RecipeService } from './../../../services/recipe.service';
import { Recipe } from './../recipe.model';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../store/app.reducer';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[];
  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    //this.recipes = this.recipeService.getRecipes();
    this.store.select('recipes').subscribe((recipeDate) => {
      this.recipes = recipeDate.recipes;
    });
  }
  onAddRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
