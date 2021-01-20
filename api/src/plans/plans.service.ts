import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Plan, PlansAPI } from './plans.interface';
import { PlansRepositoryService } from './repository/plans-repository.service';

@Injectable()
export class PlansService {
  constructor(private plansRepositoryService: PlansRepositoryService) {}

  getAll(
    search?: string,
    page?: string,
    pageSize?: string,
  ): Observable<PlansAPI> {
    return this.plansRepositoryService.getAll(search, page, pageSize);
  }

  getOne(id: string): Observable<Plan> {
    return this.plansRepositoryService.getOne(id);
  }
}
