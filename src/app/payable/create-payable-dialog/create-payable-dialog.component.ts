import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { PayablesService, FieldsService } from '@app/services';
import { Payable, Field } from '@app/models';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import * as moment from 'moment';

@Component({
  selector: 'app-create-payable-dialog',
  templateUrl: './create-payable-dialog.component.html',
  styleUrls: ['./create-payable-dialog.component.scss']
})
export class CreatePayableDialogComponent implements OnInit {
  public readonly payableFormGroup: FormGroup
  isEdit: boolean = false
  payable: Payable
  fields: Field[]

  selectedCategory
  categories: Array<any>
  subCategories: Array<any>

  constructor(
    public dialogRef: MatDialogRef<CreatePayableDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: Payable,
      private payableService: PayablesService,
      private fieldService: FieldsService,
      private formBuilder: FormBuilder) {
        this.payableFormGroup = this.formBuilder.group({
          fieldName: ['', Validators.required],
          provider: ['', Validators.required],
          category: ['', Validators.required],
          subCategory: [''],
          documentId: [''],
          pricePerUnit: ['', Validators.required],
          quantity: ['', Validators.required],
          transactionDate: ['', Validators.required],
          comment: [''],
        })

      }

  ngOnInit() {
    this.payable = this.data;
    if (this.payable._id === undefined){
      this.isEdit = false
    } else {
      this.isEdit = true
    }
    this.payableFormGroup.patchValue(this.payable)
    this.payableFormGroup.get('transactionDate').setValue(formatDate(this.payable.transactionDate, 'dd.MM.yyyy', 'en'))
    this.categories = this.payableService.categories
    this.fieldService.getFields().subscribe( fields => {
      this.fields = fields
    })
    console.log('Sent to CreateFieldDialogComponent: ');
  }

  save(post) {
    let payable_id = this.payable._id
    this.payable = new Payable(post)
    this.payable.transactionDate = moment(this.payable.transactionDate, "DD.MM.YYYY").toDate()
    if(this.isEdit){
      this.payable._id = payable_id
      this.payableService.updatePayable(this.payable).subscribe(
        payable => {
        console.log('Updated:' + payable)
        this.dialogRef.close(payable)
      });
    } else {
      this.payableService.addPayable(this.payable).subscribe(
        payable => {
        console.log('Create:' + payable)
        this.dialogRef.close(payable)
      });
    }

  }

  dismiss() {
    this.dialogRef.close();
  }

}
