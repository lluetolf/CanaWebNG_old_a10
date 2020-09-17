import { Component, ViewChild, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Field } from '@app/models';
import { FieldsService } from '@app/services';

@Component({
  selector: 'app-create-field-dialog',
  templateUrl: './create-field-dialog.component.html',
  styleUrls: ['./create-field-dialog.component.scss']
})
export class CreateFieldDialogComponent implements OnInit {
  field: Field;

  constructor(
    public dialogRef: MatDialogRef<CreateFieldDialogComponent>,
    private fieldService: FieldsService) {}

  ngOnInit() {
    this.field = new Field();
    console.log('Sent to CreateFieldDialogComponent: ');
  }

  save() {
    this.field.lastUpdated = new Date();
    this.fieldService.addField(this.field).subscribe(field => {
      console.log('Create:' + field);

      this.dialogRef.close();
    });
  }

  dismiss() {
    this.dialogRef.close();
  }

}

