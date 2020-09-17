import { Component, OnInit } from '@angular/core';

import { Payable } from '@app/models';
import { PayablesService } from '@app/services';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-payable-list',
  templateUrl: './payable-list.component.html',
  styleUrls: ['./payable-list.component.scss']
})
export class PayableListComponent implements OnInit {
  rawPayables: Payable[] = [];
  selectedDay = new Date();
  daysOfWeek: Date[];
  payablesAreLoading = true;

  constructor(private route: ActivatedRoute, private service: PayablesService) { }

  ngOnInit() {
    const tmpDay = this.route.snapshot.paramMap.get('day');
    this.selectedDay = tmpDay ? new Date(tmpDay) : new Date();
    this.changeSelectedDate();
  }

  public getRawPayables(day: Date) {
    const result = this.rawPayables.filter(
      p => p.transactionDate.getDate() === day.getDate());
    console.log(`Get payables for: ${day}, got: ${result.length}`);
    return result;
  }

  public nextWeek(): void {
    const day = new Date(this.selectedDay);
    day.setDate(day.getDate() + 7);
    this.selectedDay = day;
    this.changeSelectedDate();
  }

  public previousWeek(): void {
    const day = new Date(this.selectedDay);
    day.setDate(day.getDate() - 7);
    this.selectedDay = day;
    this.changeSelectedDate();
  }

  public changeSelectedDate(): void {
    console.log(this.selectedDay);
    this.payablesAreLoading = true;
    this.service.getPayablesOfWeek(this.selectedDay)
      .subscribe(payables => {
        this.rawPayables = payables;
        console.log(`Fetched payables: ${payables.length}`);

        let day = this.getMonday();
        const tmp = [];
        for (let i = 0; i < 7; i++) {
          tmp.push({
            day: day,
            entries: this.getRawPayables(day)
          });
          day = new Date(day.getFullYear(), day.getMonth(), day.getDate());
          day.setDate(day.getDate() + 1);
        }
        this.daysOfWeek = tmp;
        this.payablesAreLoading = false;
      });
  }

  public getMonday() {
    const d = new Date(this.selectedDay);
    const day = d.getDay() || 7;
    if (day !== 1) {
      d.setHours(-24 * (day - 1) + 12); // +12 against TZ issues
    }
    return d;
  }

  public getSunday() {
    const d = new Date(this.selectedDay);
    const day = d.getDay() || 7;
    if (day !== 7) {
      d.setHours(24 * (7 - day) + 12); // +12 against TZ issues
    }
    return d;
  }

}
