import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const URL = environment.api;
@Injectable({
  providedIn: 'root',
})
export class PlansService {
  constructor(private http: HttpClient) {}

  getPlans(): Observable<any> {
    return this.http.get<any>(`${URL}/plans`);
  }

  getPlan(id: string): Observable<any> {
    return this.http.get<any>(`${URL}/plans/${id}`);
  }
}
