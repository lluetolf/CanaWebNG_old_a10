import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Field } from '../model/field';

@Injectable({
  providedIn: 'root'
})
export class FieldsService {
  private serviceURL = 'api/fields';

  constructor(
    private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  /* Get all Fields from the server */
  getFields(): Observable<Field[]> {
    return this.http.get<Field[]>(this.serviceURL)
      .pipe(
        tap(_ => this.log('fetched all fields')),
        catchError(this.handleError<Field[]>('getFields', []))
      );
  }

  /** GET field by id. Return `undefined` when id not found */
  getHeroNo404<Data>(id: number): Observable<Field> {
    const url = `${this.serviceURL}/?id=${id}`;

    return this.http.get<Field[]>(url)
      .pipe(
        map(fields => fields[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} field id=${id}`);
        }),
        catchError(this.handleError<Field>(`getHero id=${id}`))
      );
  }

  /** GET field by id. Will 404 if id not found */
  getField(id: number): Observable<Field> {
    const url = `${this.serviceURL}/${id}`;

    return this.http.get<Field>(url).pipe(
      tap(_ => this.log(`fetched field id=${id}`)),
      catchError(this.handleError<Field>(`getField id=${id}`))
    );
  }


  /** PUT: update the hero on the server */
  updateField(field: Field): Observable<any> {
    return this.http.put(this.serviceURL, field, this.httpOptions).pipe(
      tap(_ => this.log(`updated field id=${field.id}`)),
      catchError(this.handleError<any>('updateField'))
    );
  }


  /** POST: add a new hero to the server */
  addField(hero: Field): Observable<Field> {
    return this.http.post<Field>(this.serviceURL, hero, this.httpOptions).pipe(
      tap((newField: Field) => this.log(`added field w/ id=${newField.id}`)),
      catchError(this.handleError<Field>('addField'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteField(hero: Field | number): Observable<Field> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.serviceURL}/${id}`;

    return this.http.delete<Field>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted field id=${id}`)),
      catchError(this.handleError<Field>('deleteField'))
    );
  }

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
}
