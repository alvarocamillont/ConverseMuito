import { Injectable } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { getCollection, getItem } from '../../utils/utils';
import { plans } from '../db/plans.data';
import { Plan, PlansAPI } from '../plans.interface';
import { PlansRepositoryService } from './plans-repository.service';

@Injectable()
export class PlansRepositoryMemoryService extends PlansRepositoryService {
  plans = plans;
  getAll(
    search?: string,
    page?: string,
    pageSize?: string,
  ): Observable<PlansAPI> {
    return of(getCollection(this.plans, search, page, pageSize));
  }

  getOne(id: string): Observable<Plan> {
    return of(getItem(id, this.plans));
  }
}
