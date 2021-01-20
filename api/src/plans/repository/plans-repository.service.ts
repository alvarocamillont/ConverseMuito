import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Plan, PlansAPI } from '../plans.interface';

@Injectable()
export abstract class PlansRepositoryService {
  abstract getAll(
    search?: string,
    page?: string,
    pageSize?: string,
  ): Observable<PlansAPI>;
  abstract getOne(id: string): Observable<Plan>;
}
