import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Fee, FeesAPI } from '../fees.interface';

@Injectable()
export abstract class FeesRepositoryService {
  abstract getAll(
    search?: string,
    page?: string,
    pageSize?: string,
  ): Observable<FeesAPI>;
  abstract getOne(id: string): Observable<Fee>;
  abstract getFeeByCity(origin: string, destiny: string): Observable<Fee>;
}
