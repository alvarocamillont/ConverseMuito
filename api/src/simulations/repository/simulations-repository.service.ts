import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Simulation, SimulationsAPI } from '../simulations.interface';

@Injectable()
export abstract class SimulationsRepositoryService {
  abstract getAll(
    search?: string,
    page?: string,
    pageSize?: string,
  ): Observable<SimulationsAPI>;
  abstract getOne(id: string): Observable<Simulation>;
}
