import { Component, OnInit, Input } from '@angular/core';
import { Payable } from '@app/models';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-payable-list-item',
  templateUrl: './payable-list-item.component.html',
  styleUrls: ['./payable-list-item.component.scss']
})
export class PayableListItemComponent implements OnInit {

  @Input() day: Date
  public _payables: Payable[] = []
  public payableTable = new MatTableDataSource<Payable>();
  displayedColumns: string[] = ['category', 'subCategory', 'pricePerUnit', 'quantity', 'transactionDate', 'fieldName', 'actions'];

  @Input('payables')
  set payables(value: Payable[]) {
    this._payables = value
    this.payableTable.data = value
    this.payableTable._updateChangeSubscription();
  }

  get payables(): Payable[] {
    return this._payables
  }

  constructor() { }

  ngOnInit(): void {
  }

}
