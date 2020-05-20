import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';


import { environment } from '@environments/environment';
import { Payable } from '@app/models'

@Injectable({
  providedIn: 'root'
})
export class PayablesService {
  private serviceURL = environment.apiBaseUri + 'payable';

  constructor(
    private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  private log(message: string) {
    console.log(`PayablesService: ${message}`);
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /* Get all Fields from the server */
  getPayables(): Observable<Payable[]> {
    return this.http.get<Payable[]>(this.serviceURL)
      .pipe(
        tap(_ => this.log('fetched all payables')),
        catchError(this.handleError<Payable[]>('getPayables', []))
      );
  }

  /* Get all Fields from the server */
  getLatestPayables(): Observable<Payable[]> {
    const url = this.serviceURL + "/latest/5"
    return this.http.get<Payable[]>(url)
      .pipe(
        tap(_ => this.log('fetched latest 5 payables')),
        catchError(this.handleError<Payable[]>('getPayables', []))
      );
  }

  getPayablesOfWeek(day: Date): Observable<Payable[]> {
    const url = `${this.serviceURL}/${this.getMonday(day).toISOString()}/${this.getSunday(day).toISOString()}` 
    return this.http.get<Payable[]>(url)
      .pipe(
        map(data => {
          const payables: Payable[] = [];
          return data.map(item => {
            item.transactionDate = new Date(item.transactionDate)
            item.lastUpdated = new Date(item.lastUpdated)
            return new Payable(item)
          })
        }),
        tap(_ => this.log('fetched all payables for week')),
        catchError(this.handleError<Payable[]>('getPayablesOfWeek', []))
      );
  }

  private getMonday(date: Date) {
      var d = new Date(date)
      var day = d.getDay() || 7
      if(day !== 1)
        d.setHours(-24 * (day - 1) + 12) //+12 against TZ issues
      return d 
  }

  private getSunday(date: Date) {
    var d = new Date(date)
    var day = d.getDay() || 7
    if(day !== 7)
      d.setHours(24 * (7-day) + 12) //+12 against TZ issues
    return d 
}

}
