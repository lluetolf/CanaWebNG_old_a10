import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PayableListComponent } from './payable-list/payable-list.component';
import { EditPayableComponent } from './edit-payable/edit-payable.component';
import { CreatePayableComponent } from './create-payable/create-payable.component';
import { PayableListItemComponent } from './payable-list-item/payable-list-item.component';

import { MaterialModule } from '@app/shared/material.module';


@NgModule({
  declarations: [
    PayableListComponent, 
    EditPayableComponent, 
    CreatePayableComponent, 
    PayableListItemComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class PayablesModule { }
