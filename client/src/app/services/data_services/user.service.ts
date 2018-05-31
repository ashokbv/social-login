import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators";
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  getEnrolledChartData() {
    return this.http.get<any>('v1/api/getEnrolledCount')
      .pipe(map(response => {
        console.log(response);
        return response;
      }));
  }

  getVerifiedChartData() {
    return this.http.get<any>('v1/api/getVerifiedCount')
      .pipe(map(response => {
        console.log(response);
        return response;
      }));
  }
}
