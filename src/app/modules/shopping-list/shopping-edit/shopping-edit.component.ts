import { Ingredient } from './../../../shared/ingredient.model';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import * as ShoppingListAction from './../store/shopping-list.actions';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from './../store/shopping-list.actions';
import * as fromApp from '../../../store/app.reducer';

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
  constructor(private store: Store<fromApp.AppState>) {}
  ngOnDestroy(): void {
    this.store.dispatch(new ShoppingListActions.EndEdit());
  }

  ngOnInit(): void {
    this.store.select('shoppingList').subscribe((storeData) => {
      if (storeData.editedIngredientIndex > -1) {
        this.editMode = true;
        this.editedITemIndex = storeData.editedIngredientIndex;
        this.editedItem = storeData.editedIngredient;
        this.editForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount,
        });
      } else {
        this.editMode = false;
      }
    });
  }
  onClearForm() {
    this.editForm.reset();
    this.editMode = false;
    this.store.dispatch(new ShoppingListActions.EndEdit());
  }
  onSubmitForm(form: NgForm) {
    const value = form.value;
    const ingredients = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.store.dispatch(
        new ShoppingListAction.UpdateIngredient({
          index: this.editedITemIndex,
          ingredient: ingredients,
        })
      );
    } else {
      //this.shoppingListServices.addIngredient(ingredients);
      this.store.dispatch(new ShoppingListAction.AddIngredient(ingredients));
    }
    this.editMode = false;
    form.reset();
  }
  onDeleteItem() {
    //this.shoppingListServices.deleteIngredient(this.editedITemIndex);
    this.store.dispatch(
      new ShoppingListAction.DeleteIngredient(this.editedITemIndex)
    );
    this.editForm.reset();
    this.editMode = false;
  }
}
