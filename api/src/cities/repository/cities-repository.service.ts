import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { CitiesAPI, City } from '../cities.interface';

@Injectable()
export abstract class CitiesRepositoryService {
  abstract getAll(
    search?: string,
    page?: string,
    pageSize?: string,
  ): Observable<CitiesAPI>;
  abstract getOne(id: string): Observable<City>;
  abstract getCityByDDDCode(code: string): Observable<City>;
}
