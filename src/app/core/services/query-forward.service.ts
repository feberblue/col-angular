import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { URL_SERVICE } from './config';

@Injectable({
  providedIn: 'root'
})
export class QueryForwardService {

  private extractData(resp : Response){
    let body = resp;
    return body || {};
  }

  constructor(private _clientHttp: HttpClient) { }

  public getAllData(query): Observable<any> {
    return this._clientHttp.get<any>(URL_SERVICE.URL_QUERY_FORWARD + "?State=" + query);
    //return this._clientHttp.get(URL_SERVICE.URL_QUERY).pipe(map(this.extractData));
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
