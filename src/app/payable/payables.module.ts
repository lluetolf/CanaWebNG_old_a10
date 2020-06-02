import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PayableListComponent } from './payable-list/payable-list.component';
import { PayableListItemComponent } from './payable-list-item/payable-list-item.component';

import { MaterialModule } from '@app/shared/material.module';
import { CreatePayableDialogComponent } from './create-payable-dialog/create-payable-dialog.component';
import { EditPayableDialogComponent } from './edit-payable-dialog/edit-payable-dialog.component';
import { SubcategoryPipe } from './subcategory.pipe';


@NgModule({
  declarations: [
    PayableListComponent,
    PayableListItemComponent,
    CreatePayableDialogComponent,
    EditPayableDialogComponent,
    SubcategoryPipe],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class PayablesModule { }
