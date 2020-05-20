import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { Payable } from '@app/models';
import { PayablesService } from '@app/services';
import { range } from 'rxjs';

@Component({
  selector: 'app-payable-list',
  templateUrl: './payable-list.component.html',
  styleUrls: ['./payable-list.component.scss']
})
export class PayableListComponent implements OnInit {
  rawPayables: Payable[] = []
  selectedDay = new Date()
  daysOfWeek: Date[]

displayedColumns: string[] = ['category', 'subCategory', 'pricePerUnit', 'quantity', 'transactionDate', 'fieldName', 'actions'];

  constructor(private service: PayablesService) { }

  ngOnInit() {
    this.changeSelectedDate()
  }

  public getRawPayables(day: Date) {
    var result = this.rawPayables.filter(
      p => p.transactionDate.getDate() === day.getDate())
    console.log(`Get payables for: ${day}, got: ${result.length}`)
    return result
  }

  public nextWeek(): void {
    var day = new Date(this.selectedDay)
    day.setDate(day.getDate() + 7)
    this.selectedDay = day
    this.changeSelectedDate()
  }

  public previousWeek(): void {
    var day = new Date(this.selectedDay)
    day.setDate(day.getDate() - 7)
    this.selectedDay = day
    this.changeSelectedDate()
  }

  public changeSelectedDate(): void {
    console.log(this.selectedDay)
    this.service.getPayablesOfWeek(this.selectedDay)
    .subscribe(payables => {
      this.rawPayables = payables;
      console.log(`Fetched payables: ${payables.length}`)

      let day = this.getMonday()
      var tmp = []
      for (let i = 0; i < 7; i++) {
        day = new Date(day.getFullYear(), day.getMonth(), day.getDate())
        tmp.push( { 
          'day': day,
          'entries': this.getRawPayables(day)
         })
        day.setDate(day.getDate() + 1)
      }
      this.daysOfWeek = tmp
    });
  }

  public getMonday() {
    var d = new Date(this.selectedDay)
    var day = d.getDay() || 7
    if(day !== 1)
      d.setHours(-24 * (day - 1) + 12) //+12 against TZ issues
    return d 
}

public getSunday() {
  var d = new Date(this.selectedDay)
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
