import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PayablesRoutingModule } from './payables-routing.module';
import { PayableListComponent } from './payable-list/payable-list.component';
import { EditPayableComponent } from './edit-payable/edit-payable.component';
import { CreatePayableComponent } from './create-payable/create-payable.component';
import { MaterialModule } from '@app/shared/material.module';


@NgModule({
  declarations: [PayableListComponent, EditPayableComponent, CreatePayableComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PayablesRoutingModule,
    MaterialModule
  ]
})
export class PayablesModule { }
