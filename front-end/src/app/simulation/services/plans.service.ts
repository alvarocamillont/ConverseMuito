import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Plan, Plans, PlansApi } from './plans';
import { pluck } from 'rxjs/operators';

const URL = environment.api;
@Injectable({
  providedIn: 'root',
})
export class PlansService {
  constructor(private http: HttpClient) {}

  getPlans(): Observable<Plans> {
    return this.http.get<PlansApi>(`${URL}/plans`).pipe(pluck('items'));
  }

  getPlan(id: string): Observable<Plan> {
    return this.http.get<Plan>(`${URL}/plans/${id}`);
  }
}
