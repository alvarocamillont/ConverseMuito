import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CitiesAPI } from './cities';

const URL = environment.api;
@Injectable({
  providedIn: 'root',
})
export class CitiesService {
  constructor(private http: HttpClient) {}

  getCities(): Observable<CitiesAPI> {
    return this.http.get<CitiesAPI>(`${URL}/cities`);
  }
}
