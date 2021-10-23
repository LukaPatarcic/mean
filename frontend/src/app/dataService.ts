import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};
@Injectable()
export class DataService{
  constructor(private http:HttpClient){  }

  Post(url:string,body:any): Observable<any>{
    return this.http.post<any>(url, body, httpOptions).pipe( retry(1), catchError(this.handleError) );
  }
  Get(url:string): Observable<any>{
    return this.http.get<any>(url, httpOptions).pipe( retry(1), catchError(this.handleError) );
  }
  private handleError(error: any){
    let body = error.json();
    return body || {};
  }
}
