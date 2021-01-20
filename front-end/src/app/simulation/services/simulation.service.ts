import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SimulationValue } from './simulation';

const URL = environment.api;
@Injectable({
  providedIn: 'root',
})
export class SimulationService {
  constructor(private http: HttpClient) {}

  simulate(
    origin?: string,
    destiny?: string,
    time?: number,
    plan?: string
  ): Observable<SimulationValue> {
    const params = new HttpParams()
      .append('origin', origin)
      .append('destiny', destiny)
      .append('time', time?.toString())
      .append('plan', plan);

    return this.http.get<SimulationValue>(`${URL}/simulations/value`, {
      params,
    });
  }
}
