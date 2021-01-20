import { Injectable } from '@nestjs/common';
import { forkJoin, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Fee } from 'src/fees/fees.interface';
import { Plan } from 'src/plans/plans.interface';
import { CitiesService } from '../cities/cities.service';
import { FeesService } from '../fees/fees.service';
import { PlansService } from '../plans/plans.service';
import { SimulationsRepositoryService } from './repository/simulations-repository.service';
import { Simulation, SimulationsAPI } from './simulations.interface';

@Injectable()
export class SimulationsService {
  constructor(
    private simulationsRepositoryService: SimulationsRepositoryService,
    private citiesService: CitiesService,
    private feesService: FeesService,
    private planService: PlansService,
  ) {}

  getAll(
    search?: string,
    page?: string,
    pageSize?: string,
  ): Observable<SimulationsAPI> {
    return this.simulationsRepositoryService.getAll(search, page, pageSize);
  }

  getOne(id: string): Observable<Simulation> {
    return this.simulationsRepositoryService.getOne(id);
  }

  simulate(
    origin: string,
    destiny: string,
    time: number,
    plan?: string,
  ): Observable<Simulation> {
    return forkJoin({
      fee: this.getFee(origin, destiny),
      plan: this.planService.getOne(plan),
    }).pipe(
      map((simulationParts) =>
        this.createSimulation(
          time,
          origin,
          destiny,
          simulationParts.fee,
          simulationParts.plan,
        ),
      ),
    );
  }

  private getFee(codeOrigin: string, codeDestiny: string): Observable<Fee> {
    return forkJoin({
      cityOrigin: this.citiesService.getCityByDDDCode(codeOrigin),
      cityDestiny: this.citiesService.getCityByDDDCode(codeDestiny),
    }).pipe(
      map((cities) => ({
        cityOriginId: cities.cityOrigin?.id,
        cityDestinyId: cities.cityDestiny?.id,
      })),
      switchMap((citiesId) =>
        this.feesService.getFeeByCity(
          citiesId.cityOriginId,
          citiesId.cityDestinyId,
        ),
      ),
    );
  }

  private createSimulation(
    timeInMinutes: number,
    origin: string,
    destiny: string,
    fee?: Fee,
    planToSimulate?: Plan,
    extraFee = 10,
  ): Simulation {
    const freeMinutes = planToSimulate?.freeMinutes ?? 0;
    const plan = planToSimulate?.id;
    const feeValue = fee?.value ?? 0;

    const valueWithoutPlan = this.roundNumber(timeInMinutes * feeValue);
    const valueWithPlan = this.roundNumber(
      this.calcValueWithPlan(timeInMinutes, freeMinutes, feeValue, extraFee),
    );

    return {
      origin,
      destiny,
      plan,
      timeInMinutes,
      valueWithPlan,
      valueWithoutPlan,
    };
  }

  private roundNumber(value: number) {
    return Math.round((value + Number.EPSILON) * 100) / 100;
  }

  private calcValueWithPlan(
    time: number,
    freeMinutes: number,
    feeValue: number,
    extraFee: number,
  ): number {
    let totalTime = time - freeMinutes;
    totalTime = totalTime < 0 ? 0 : totalTime;
    extraFee = 1 + extraFee / 100;

    return totalTime * (feeValue * extraFee);
  }
}
