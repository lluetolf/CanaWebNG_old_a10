import { Component, OnInit } from '@angular/core';
import { FieldsService } from '../fields.service';
import { Field } from 'src/app/model/field';
import { MatDialog } from '@angular/material/dialog';
import { MatTableModule, MatTableDataSource } from '@angular/material/table'
import { EditFieldDialogComponent } from '../edit-field-dialog/edit-field-dialog.component';
import { stringify } from 'querystring';
import { CreateFieldDialogComponent } from '../create-field-dialog/create-field-dialog.component';

@Component({
  selector: 'app-field-list',
  templateUrl: './field-list.component.html',
  styleUrls: ['./field-list.component.scss']
})
export class FieldListComponent implements OnInit {
  fields = new MatTableDataSource<Field>();

  displayedColumns: string[] = ['id', 'name', 'owner', 'size', 'cultivatedArea', 'acquisitionDate', 'actions'];

  constructor(private fieldService: FieldsService, public dialog: MatDialog) { }

  ngOnInit() {
    this.getFields();
  }

  getFields(): void {
    this.fieldService.getFields()
      .subscribe(fields => {
        this.fields.data = fields;
        fields.forEach(element => {
          console.log(JSON.stringify(element));
        });
      });
  }

  openEditDialog(field: Field): void {
    const dialogRef = this.dialog.open(EditFieldDialogComponent, {
      width: '600px',
      data: field
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }

  openCreateDialog(field: Field): void {
    const dialogRef = this.dialog.open(CreateFieldDialogComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getFields();
      console.log('The dialog was closed');
    });
  }
}
