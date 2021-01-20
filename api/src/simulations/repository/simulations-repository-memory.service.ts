import { Injectable } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { getCollection, getItem } from '../../utils/utils';
import { simulations } from '../db/simulations.data';
import { Simulation, SimulationsAPI } from '../simulations.interface';
import { SimulationsRepositoryService } from './simulations-repository.service';

@Injectable()
export class SimulationsRepositoryMemoryService extends SimulationsRepositoryService {
  simulations = simulations;
  getAll(
    search?: string,
    page?: string,
    pageSize?: string,
  ): Observable<SimulationsAPI> {
    return of(getCollection(this.simulations, search, page, pageSize));
  }

  getOne(id: string): Observable<Simulation> {
    return of(getItem(id, this.simulations));
  }
}
