import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Plan, PlansApi } from './plans';

const URL = environment.api;
@Injectable({
  providedIn: 'root',
})
export class PlansService {
  constructor(private http: HttpClient) {}

  getPlans(): Observable<PlansApi> {
    return this.http.get<PlansApi>(`${URL}/plans`);
  }

  getPlan(id: string): Observable<Plan> {
    return this.http.get<any>(`${URL}/plans/${id}`);
  }
}
