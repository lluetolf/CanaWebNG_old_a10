import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Field } from '@app/models';
import { FieldsService } from '@app/services';


@Component({
  selector: 'app-edit-field-dialog',
  templateUrl: './edit-field-dialog.component.html',
  styleUrls: ['./edit-field-dialog.component.scss'],
  providers: []
})
export class EditFieldDialogComponent implements OnInit {
  readonly dateFormat: string = 'dd.MM.yyyy';
  field: Field;

  constructor(
    public dialogRef: MatDialogRef<EditFieldDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Field,
    private fieldService: FieldsService) {}

  ngOnInit() {
    console.log('Sent to Dialog: ', this.data);
    this.field = this.data;
    Object.keys(this.field).forEach(key =>
      console.log(key + ' - ' + this.field[key] + ' - ' + typeof this.field[key])
    );
  }

  save() {
    Object.keys(this.field).forEach(key =>
      console.log(key + ' - ' + this.field[key] + ' - ' + typeof this.field[key])
    );
    this.fieldService.updateField(this.field).subscribe(obs => {
      this.dialogRef.close();
    });
  }

  dismiss() {
    this.dialogRef.close();
  }

}
