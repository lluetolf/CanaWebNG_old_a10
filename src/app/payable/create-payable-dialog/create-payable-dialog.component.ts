import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { PayablesService } from '@app/services';
import { Payable } from '@app/models';

@Component({
  selector: 'app-create-payable-dialog',
  templateUrl: './create-payable-dialog.component.html',
  styleUrls: ['./create-payable-dialog.component.scss']
})
export class CreatePayableDialogComponent implements OnInit {
  payable: Payable

  constructor(
    public dialogRef: MatDialogRef<CreatePayableDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: Date,
      private payableService: PayablesService) {}

  ngOnInit() {
    this.payable = new Payable();
    this.payable.transactionDate = this.data
    console.log('Sent to CreateFieldDialogComponent: ');
  }

  save() {
    this.payableService.addPayable(this.payable).subscribe(
      payable => {
      console.log('Create:' + payable)
      this.dialogRef.close(payable)
    });
  }

  dismiss() {
    this.dialogRef.close();
  }

}
