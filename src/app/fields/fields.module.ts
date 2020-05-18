import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FieldsRoutingModule } from './fields-routing.module';
import { FieldListComponent } from './field-list/field-list.component';
import { EditFieldDialogComponent } from './edit-field-dialog/edit-field-dialog.component';
import { CreateFieldDialogComponent } from './create-field-dialog/create-field-dialog.component';
import { MaterialModule } from '@app/shared/material.module';


@NgModule({
  declarations: [FieldListComponent, EditFieldDialogComponent, CreateFieldDialogComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FieldsRoutingModule,
    MaterialModule
  ]
})
export class FieldsModule { }
