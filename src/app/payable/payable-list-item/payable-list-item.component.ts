import { Component, OnInit, Input } from '@angular/core';
import { Payable } from '@app/models';
import { MatTableDataSource } from '@angular/material/table';
import { CreatePayableDialogComponent } from '../create-payable-dialog/create-payable-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-payable-list-item',
  templateUrl: './payable-list-item.component.html',
  styleUrls: ['./payable-list-item.component.scss']
})
export class PayableListItemComponent implements OnInit {

  @Input() day: Date
  public _payables: Payable[] = []
  public payableTable = new MatTableDataSource<Payable>();
  displayedColumns: string[] = ['provider','category', 'subCategory', 'pricePerUnit', 'quantity', 'transactionDate', 'fieldName', 'actions'];

  @Input('payables')
  set payables(value: Payable[]) {
    this._payables = value
    this.payableTable.data = value
    this.payableTable._updateChangeSubscription();
  }

  get payables(): Payable[] {
    return this._payables
  }

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDeleteDialog(payable: Payable): void {
  }

  openEditDialog(payable: Payable): void {
    //   const dialogRef = this.dialog.open(EditFieldDialogComponent, {
    //     width: '600px',
    //     data: field
    //   });
  
    //   dialogRef.afterClosed().subscribe(result => {
    //     console.log('The dialog was closed');
  
    //   });
     }
  
    openCreateDialog(): void {
      const dialogRef = this.dialog.open(CreatePayableDialogComponent, {
        width: '600px',
        data: this.day
      });

      dialogRef.afterClosed().subscribe(result => {
        if(result) {
          this.payables.push(result);
          this.payableTable._updateChangeSubscription();
          console.log('The dialog was closed and payable created');
        } else {
          console.log('Error creating payable.');
        }
      });
    }

}
