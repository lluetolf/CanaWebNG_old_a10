import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PayableListComponent } from './payable-list/payable-list.component';


const routes: Routes = [  {
  path: 'payablesList', component: PayableListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PayablesRoutingModule { }
