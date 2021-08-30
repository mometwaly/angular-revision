import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DropdownDirective } from './dropdown.directive';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  declarations: [SpinnerComponent, DropdownDirective],
  imports: [CommonModule],
  exports: [SpinnerComponent, DropdownDirective, CommonModule],
})
export class SharedModule {}
