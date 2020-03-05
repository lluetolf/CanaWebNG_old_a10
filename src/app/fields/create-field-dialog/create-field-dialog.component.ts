import { Component, ViewChild, OnInit, Inject } from '@angular/core';
import { Field } from 'src/app/model/field';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDatepicker } from '@angular/material/datepicker';


import { FieldsService } from '../fields.service';

@Component({
  selector: 'app-create-field-dialog',
  templateUrl: './create-field-dialog.component.html',
  styleUrls: ['./create-field-dialog.component.scss']
})
export class CreateFieldDialogComponent implements OnInit {
  readonly dateFormat: string = 'dd.MM.yyyy';
  field: Field;
  acquisitionDateField: Date;

  constructor(
    public dialogRef: MatDialogRef<CreateFieldDialogComponent>,
    private fieldService: FieldsService) {}

  ngOnInit() {
    this.field = new Field();
    console.log('Sent to CreateFieldDialogComponent: ');
  }

  save() {
    // Transform Date to String
    const ad = this.acquisitionDateField;
    const formattedDate = (ad.getDate()) + '.' + (ad.getMonth() + 1) + '.' + ad.getFullYear();
    this.field.acquisitionDate = formattedDate;

    this.fieldService.addField(this.field).subscribe(field => {
      console.log('Create:' + field);

      this.dialogRef.close();
    });
  }

  dismiss() {
    this.dialogRef.close();
  }

}

