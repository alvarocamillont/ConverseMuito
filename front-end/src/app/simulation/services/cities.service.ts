import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cities, CitiesAPI } from './cities';
import { map } from 'rxjs/operators';

const URL = environment.api;
@Injectable({
  providedIn: 'root',
})
export class CitiesService {
  constructor(private http: HttpClient) {}

  getCities(): Observable<Cities> {
    return this.http
      .get<CitiesAPI>(`${URL}/cities`)
      .pipe(map((citiesApi) => citiesApi.items));
  }
}
