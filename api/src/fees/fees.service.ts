import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Fee, FeesAPI } from './fees.interface';
import { FeesRepositoryService } from './repository/fees-repository.service';

@Injectable()
export class FeesService {
  constructor(private feesRepositoryService: FeesRepositoryService) {}

  getAll(
    search?: string,
    page?: string,
    pageSize?: string,
  ): Observable<FeesAPI> {
    return this.feesRepositoryService.getAll(search, page, pageSize);
  }

  getOne(id: string): Observable<Fee> {
    return this.feesRepositoryService.getOne(id);
  }

  getFeeByCity(origin: string, destiny: string): Observable<Fee> {
    return this.feesRepositoryService.getFeeByCity(origin, destiny);
  }
}
