import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Payable } from '@app/models';
import { PayablesService } from '../payables.service';

@Component({
  selector: 'app-payable-list',
  templateUrl: './payable-list.component.html',
  styleUrls: ['./payable-list.component.scss']
})
export class PayableListComponent implements OnInit {
  payables = new MatTableDataSource<Payable>()
  selectedDay = new Date()
  daysOfWeek = []

displayedColumns: string[] = ['category', 'subCategory', 'pricePerUnit', 'quantity', 'transactionDate', 'fieldName', 'actions'];

  constructor(private service: PayablesService) { }

  ngOnInit() {
    this.changeSelectedDate()
  }

  public changeSelectedDate(): void {
    console.log(this.selectedDay)
    this.service.getPayablesOfWeek(this.selectedDay)
    .subscribe(payables => {
      this.payables.data = payables;
      payables.forEach(element => {
        console.log(JSON.stringify(element));
      });
    });
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

  public getMonday() {
    var d = this.selectedDay
    var day = d.getDay() || 7
    if(day !== 1)
      d.setHours(-24 * (day - 1) + 12) //+12 against TZ issues
    return d 
}

public getSunday() {
  var d = this.selectedDay
  var day = d.getDay() || 7
  if(day !== 7)
    d.setHours(24 * (7-day) + 12) //+12 against TZ issues
  return d 
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

  openCreateDialog(): void {
    // const dialogRef = this.dialog.open(CreateFieldDialogComponent, {
    //   width: '600px'
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   this.getFields();
    //   console.log('The dialog was closed');
    // });
  }
}
