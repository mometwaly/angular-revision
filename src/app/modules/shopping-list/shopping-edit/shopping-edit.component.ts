import { ShoppingListService } from './../../../services/shopping-list.service';
import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput',{static:false}) nameInputRef : ElementRef;
  @ViewChild('amountInput',{static:false}) amountInputRef : ElementRef;
  constructor(private shoppingListServices : ShoppingListService) { }

  ngOnInit(): void {
  }
  onAddIngredient(){
    const ingredients = new Ingredient (this.nameInputRef.nativeElement.value,this.amountInputRef.nativeElement.value)
    this.shoppingListServices.addIngredient(ingredients);
  }

}
