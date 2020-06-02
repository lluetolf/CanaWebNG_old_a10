import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { PayablesService, FieldsService } from '@app/services';
import { Payable, Field } from '@app/models';

@Component({
  selector: 'app-create-payable-dialog',
  templateUrl: './create-payable-dialog.component.html',
  styleUrls: ['./create-payable-dialog.component.scss']
})
export class CreatePayableDialogComponent implements OnInit {
  payable: Payable
  fields: Field[]

  selectedCategory
  categories: Array<any>
  subCategories: Array<any>

  constructor(
    public dialogRef: MatDialogRef<CreatePayableDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: Date,
      private payableService: PayablesService,
      private fieldService: FieldsService) {}

  ngOnInit() {
    this.payable = new Payable({'quantity': 1, 'documentId': -1, 'transactionDate': this.data});

    this.categories = this.payableService.categories
    this.fieldService.getFields().subscribe( fields => {
      this.fields = fields
    })
    console.log('Sent to CreateFieldDialogComponent: ');
  }

  changeCategory() {
    console.log(`selectedCategory: ${this.selectedCategory}`);
    
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
