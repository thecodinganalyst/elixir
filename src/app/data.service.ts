import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Navigation } from './navigation';
import {EMPTY, Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import { View } from './view';
import { Table } from './table';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  private navigationUrl = 'assets/navigation.json';

  constructor(private http: HttpClient) { }

  getTable(url: string): Observable<Table> {
    return this.http.get<Table>(url).pipe(
      tap(_ => this.log('Fetch table')),
      tap(_ => this.log(JSON.stringify(_))),
      catchError(this.handleError<Table>('getTable'))
    );
  }

  getNavigation(): Observable<Navigation> {
    return this.http.get<Navigation>(this.navigationUrl)
      .pipe(
        tap(_ => this.log('Fetch navigation')),
        tap(_ => this.log(JSON.stringify(_))),
        catchError(this.handleError<Navigation>('getNavigation'))
      );
  }


  private log(message: string): void {
    console.log(message);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T): (error: any) => Observable<T>{
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
