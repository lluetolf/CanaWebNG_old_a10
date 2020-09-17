import { Component, OnInit, Input } from '@angular/core';
import { Payable } from '@app/models';
import { MatTableDataSource } from '@angular/material/table';
import { CreatePayableDialogComponent } from '../create-payable-dialog/create-payable-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '@app/shared/confirmation-dialog/confirmation-dialog.component';
import { PayablesService } from '@app/services';

@Component({
  selector: 'app-payable-list-item',
  templateUrl: './payable-list-item.component.html',
  styleUrls: ['./payable-list-item.component.scss']
})
export class PayableListItemComponent implements OnInit {

  @Input() day: Date;
  public _payables: Payable[] = [];
  public payableTable = new MatTableDataSource<Payable>();
  displayedColumns: string[] = ['provider', 'category', 'subCategory', 'pricePerUnit', 'quantity', 'transactionDate', 'fieldName', 'actions'];

  @Input('payables')
  set payables(value: Payable[]) {
    this._payables = value;
    this.payableTable.data = value;
    this.payableTable._updateChangeSubscription();
  }

  get payables(): Payable[] {
    return this._payables;
  }

  constructor(public dialog: MatDialog, private payableService: PayablesService) { }

  ngOnInit(): void {
  }

  openDeleteDialog(payable: Payable): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: 'Do you want to delete the payable?'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(`Delete payable with id: ${payable._id}`);
        this.payableService.deletePayable(payable._id).subscribe(r => {
          console.log(r);
          this.payables.splice(this.payables.findIndex(e => e._id === payable._id), 1);
          this.payableTable._updateChangeSubscription();
        });

      }
    });
  }

  openEditDialog(payable: Payable): void {
    const dialogRef = this.dialog.open(CreatePayableDialogComponent, {
      width: '600px',
      data: payable
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        Object.assign(payable, result);
        this.payableTable._updateChangeSubscription();
        console.log('The dialog was closed and payable updated');
      } else {
        console.log('Error updating payable.');
      }
    });
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(CreatePayableDialogComponent, {
      width: '600px',
      data: new Payable({ transactionDate: this.day, quantity: 1, documentId: 'N/A', })
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.payables.push(result);
        this.payableTable._updateChangeSubscription();
        console.log('The dialog was closed and payable created');
      } else {
        console.log('Error creating payable.');
      }
    });
  }

}
