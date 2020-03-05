import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {FormControl} from '@angular/forms';
import { Field } from 'src/app/model/field';
import { FieldsService } from '../fields.service';
import { parse } from 'date-fns';


@Component({
  selector: 'app-edit-field-dialog',
  templateUrl: './edit-field-dialog.component.html',
  styleUrls: ['./edit-field-dialog.component.scss'],
  providers: []
})
export class EditFieldDialogComponent implements OnInit {
  readonly dateFormat: string = 'dd.MM.yyyy';
  field: Field;
  acquisitionDateField: Date;

  constructor(
    public dialogRef: MatDialogRef<EditFieldDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Field,
    private fieldService: FieldsService) {}

  ngOnInit() {
    console.log('Sent to Dialog: ', this.data);
    this.field = Object.assign({}, this.data);
    const ad = this.field.acquisitionDate;
    this.acquisitionDateField = parse(ad, this.dateFormat, new Date());
  }

  pickAcquisitionDate(event: any) {
    const data = event;
    const formattedDate = data.getDate() + '-' + (data.getMonth() + 1) + '-' + data.getFullYear();
    this.field.acquisitionDate = formattedDate;
    console.log('Reformated to: ' + formattedDate);
  }

  save() {
    // Transform Date to String
    const ad = this.acquisitionDateField;
    const formattedDate = (ad.getDate()) + '.' + (ad.getMonth() + 1) + '.' + ad.getFullYear();
    this.field.acquisitionDate = formattedDate;

    this.fieldService.updateField(this.field).subscribe(obs => {
      this.data.ingenioId = this.field.ingenioId;
      this.data.acquisitionDate = this.field.acquisitionDate;
      this.data.name = this.field.name;
      this.data.owner = this.field.owner;
      this.data.size = this.field.size;
      this.data.cultivatedArea = this.field.cultivatedArea;

      this.dialogRef.close();
    });
  }

  dismiss() {
    this.dialogRef.close();
  }

}
