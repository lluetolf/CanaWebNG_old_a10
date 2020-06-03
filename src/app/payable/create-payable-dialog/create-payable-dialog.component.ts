import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { PayablesService, FieldsService } from '@app/services';
import { Payable, Field } from '@app/models';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-payable-dialog',
  templateUrl: './create-payable-dialog.component.html',
  styleUrls: ['./create-payable-dialog.component.scss']
})
export class CreatePayableDialogComponent implements OnInit {
  public readonly payableFormGroup: FormGroup

  payable: Payable
  fields: Field[]

  selectedCategory
  categories: Array<any>
  subCategories: Array<any>

  constructor(
    public dialogRef: MatDialogRef<CreatePayableDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: Date,
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
    this.payable = new Payable({'quantity': 1, 'documentId': "N/A", 'transactionDate': this.data});
    this.payableFormGroup.patchValue(this.payable)
    this.categories = this.payableService.categories
    this.fieldService.getFields().subscribe( fields => {
      this.fields = fields
    })
    console.log('Sent to CreateFieldDialogComponent: ');
  }

  save(post) {
    this.payable = new Payable(post)
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
