import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Payable } from 'src/app/model/payable';
import { PayablesService } from '../payables.service';

@Component({
  selector: 'app-payable-list',
  templateUrl: './payable-list.component.html',
  styleUrls: ['./payable-list.component.scss']
})
export class PayableListComponent implements OnInit {
  payables = new MatTableDataSource<Payable>();

displayedColumns: string[] = ['id', 'transactionDate', 'category', 'subCategory', 'quantity', 'pricePerUnit', 'actions'];

  constructor(private service: PayablesService) { }

  ngOnInit() {
    this.getPayables();
  }

  getPayables(): void {
      this.service.getPayables()
        .subscribe(payables => {
          this.payables.data = payables;
          payables.forEach(element => {
            console.log(JSON.stringify(element));
          });
        });
  }

  openEditDialog(payable: Payable): void {
  //   const dialogRef = this.dialog.open(EditFieldDialogComponent, {
  //     width: '600px',
  //     data: field
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');

  //   });
   }

  openCreateDialog(payable: Payable): void {
    // const dialogRef = this.dialog.open(CreateFieldDialogComponent, {
    //   width: '600px'
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   this.getFields();
    //   console.log('The dialog was closed');
    // });
  }
}
