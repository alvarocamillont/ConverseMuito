import { Injectable } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { getCollection, getItem } from '../../utils/utils';
import { fees } from '../db/fees.data';
import { Fee, FeesAPI } from '../fees.interface';
import { FeesRepositoryService } from './fees-repository.service';

@Injectable()
export class FeesRepositoryMemoryService extends FeesRepositoryService {
  fees = fees;
  getAll(
    search?: string,
    page?: string,
    pageSize?: string,
  ): Observable<FeesAPI> {
    return of(getCollection(this.fees, search, page, pageSize));
  }

  getOne(id: string): Observable<Fee> {
    return of(getItem(id, this.fees));
  }

  getFeeByCity(origin: string, destiny: string): Observable<Fee> {
    return of(
      this.fees.find((fee) => fee.origin === origin && fee.destiny === destiny),
    );
  }
}
