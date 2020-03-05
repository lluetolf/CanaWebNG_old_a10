import { Component, OnInit } from '@angular/core';
import { Field } from '../model/field';
import { FieldsService } from '../fields/fields.service';
import { PayablesService } from '../payable/payables.service';
import { Payable } from '../model/payable';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  fields: Field[] = [];
  payables: Payable[] = [];

  constructor(
    private fieldsService: FieldsService,
    private payablesService: PayablesService) {}

  ngOnInit() {
    this.getFields();
    this.getPayables();
  }

  getFields(): void {
    this.fieldsService.getFields()
      .subscribe(fields => {
        this.fields = fields;
        console.log('Fields: ');
        fields.forEach(element => {
          console.log("JSON.stringify(element)");
        });
      });
  }

  getPayables(): void {
    this.payablesService.getPayables()
      .subscribe(payables => {
        this.payables = payables;
        console.log('Payables: ');
        payables.forEach(element => {
          console.log("JSON.stringify(element)");
        });
      });
  }
}
