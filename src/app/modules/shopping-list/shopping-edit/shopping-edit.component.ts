import { Ingredient } from './../../../shared/ingredient.model';
import { ShoppingListService } from './../../../services/shopping-list.service';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: false }) editForm: NgForm;
  editMode = false;
  editedITemIndex: number;
  editedItem: Ingredient;
  constructor(private shoppingListServices: ShoppingListService) {}
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  subscription: Subscription;
  ngOnInit(): void {
    this.subscription = this.shoppingListServices.editedItem.subscribe(
      (itemId: number) => {
        this.editMode = true;
        this.editedITemIndex = itemId;
        this.editedItem = this.shoppingListServices.getIngredientByIndex(
          this.editedITemIndex
        );
        this.editForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount,
        });
      }
    );
  }
  onClearForm() {
    this.editForm.reset();
    this.editMode = false;
  }
  onSubmitForm(form: NgForm) {
    const value = form.value;
    const ingredients = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.shoppingListServices.updateIngredient(
        this.editedITemIndex,
        ingredients
      );
    } else {
      this.shoppingListServices.addIngredient(ingredients);
    }
    this.editMode = false;
    form.reset();
  }
  onDeleteItem() {
    this.shoppingListServices.deleteIngredient(this.editedITemIndex);
    this.editForm.reset();
    this.editMode = false;
  }
}
