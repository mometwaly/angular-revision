import { Recipe } from './../../recipe.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe : Recipe;
  @Output() recipeIsSelected = new EventEmitter<void>()
  constructor() { }
  
  ngOnInit(): void {
  }
  onSelectRecipe(){
    this.recipeIsSelected.emit()
  }

}
