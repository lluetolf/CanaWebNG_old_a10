import { Component, OnInit } from '@angular/core';
import { Field } from '@app/models'
import { FieldsService } from '../fields/fields.service';
import { PayablesService } from '../payable/payables.service';
import { Payable } from '../models/payable';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  latestPayables: Payable[] = [];

  constructor(
    private payablesService: PayablesService) {}

  ngOnInit() {
    this.getPayables();
  }

  getPayables(): void {
    this.payablesService.getLatestPayables()
      .subscribe(payables => {
        this.latestPayables = payables;
      });
  }
}
