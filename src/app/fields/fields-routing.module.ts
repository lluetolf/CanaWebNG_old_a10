import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FieldListComponent } from './field-list/field-list.component';


const routes: Routes = [  {
  path: 'fieldList', component: FieldListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FieldsRoutingModule { }
