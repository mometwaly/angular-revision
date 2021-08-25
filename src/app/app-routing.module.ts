import { AuthComponent } from './modules/auth/auth.component';
import { RecipeEditComponent } from './modules/recipes/recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from './modules/recipes/recipe-detail/recipe-detail.component';
import { RecipeStartComponent } from './modules/recipes/recipe-start/recipe-start.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipesComponent } from './modules/recipes/recipes.component';
import { ShoppingListComponent } from './modules/shopping-list/shopping-list.component';
import { AuthGardService } from './services/auth-gard.service';
const appRoutes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  {
    path: 'recipes',
    component: RecipesComponent,
    canActivate: [AuthGardService],
    children: [
      { path: '', component: RecipeStartComponent },
      { path: 'new', component: RecipeEditComponent },
      { path: ':id', component: RecipeDetailComponent },
      { path: ':id/edit', component: RecipeEditComponent },
    ],
  },
  { path: 'shopping-list', component: ShoppingListComponent },
  { path: 'auth', component: AuthComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
