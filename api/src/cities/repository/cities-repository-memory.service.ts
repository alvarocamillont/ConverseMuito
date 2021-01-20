import { Injectable } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { getCollection, getItem } from '../../utils/utils';
import { CitiesAPI, City } from '../cities.interface';
import { cities } from '../db/cities.data';
import { CitiesRepositoryService } from './cities-repository.service';

@Injectable()
export class CitiesRepositoryMemoryService extends CitiesRepositoryService {
  cities = cities;
  getAll(
    search?: string,
    page?: string,
    pageSize?: string,
  ): Observable<CitiesAPI> {
    return of(getCollection(this.cities, search, page, pageSize));
  }

  getOne(id: string): Observable<City> {
    return of(getItem(id, this.cities));
  }

  getCityByDDDCode(code: string): Observable<City> {
    return of(this.cities.find((city) => city.code === code));
  }
}
