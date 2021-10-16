import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Plans, PlansApi } from './plans';

const URL = environment.api;
@Injectable({
  providedIn: 'root',
})
export class PlansService {
  constructor(private http: HttpClient) {}

  getPlans(): Observable<Plans> {
    return this.http.get<PlansApi>(`${URL}/plans`).pipe(pluck('items'));
  }

  getPlan(id: string): Observable<any> {
    return this.http.get<any>(`${URL}/plans/${id}`);
  }
}
