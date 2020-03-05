import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Payable } from '../model/payable';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PayablesService {
  private serviceURL = 'api/payables';

  constructor(
    private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  private log(message: string) {
    console.log(`FieldsService: ${message}`);
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
}
