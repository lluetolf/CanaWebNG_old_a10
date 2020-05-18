import { Component, OnInit } from '@angular/core';

import { PayablesService } from '@app/services'
import { Payable } from '@app/models';

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
