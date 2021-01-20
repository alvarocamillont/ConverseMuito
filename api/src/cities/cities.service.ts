import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { CitiesAPI, City } from './cities.interface';
import { CitiesRepositoryService } from './repository/cities-repository.service';

@Injectable()
export class CitiesService {
  constructor(private citiesRepositoryService: CitiesRepositoryService) {}

  getAll(
    search?: string,
    page?: string,
    pageSize?: string,
  ): Observable<CitiesAPI> {
    return this.citiesRepositoryService.getAll(search, page, pageSize);
  }

  getOne(id: string): Observable<City> {
    return this.citiesRepositoryService.getOne(id);
  }

  getCityByDDDCode(code: string): Observable<City> {
    return this.citiesRepositoryService.getCityByDDDCode(code);
  }
}
