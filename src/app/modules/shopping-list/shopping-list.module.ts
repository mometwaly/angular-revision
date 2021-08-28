import { SharedModule } from './../../shared/shared.module';
import { ShoppingListRoutingModule } from './Shopping-list-routing.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { ShoppingListComponent } from './shopping-list.component';

@NgModule({
  declarations: [ShoppingListComponent, ShoppingEditComponent],
  imports: [RouterModule, SharedModule, FormsModule, ShoppingListRoutingModule],
})
export class ShoppingListModule {}
