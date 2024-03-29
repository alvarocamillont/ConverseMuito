import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PoBreadcrumb, PoSelectOption } from '@po-ui/ng-components';
import { forkJoin, Observable, of } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  pluck,
  switchMap,
  tap,
} from 'rxjs/operators';
import { CitiesService } from './services/cities.service';
import { PlansService } from './services/plans.service';
import { SimulationForm, SimulationValueResult } from './services/simulation';
import { SimulationService } from './services/simulation.service';

const WAITING = 300;
@Component({
  selector: 'app-simulation',
  templateUrl: './simulation.component.html',
  styleUrls: ['./simulation.component.css'],
})
export class SimulationComponent implements OnInit {
  simulationForm!: FormGroup;
  title = 'Simulação de Tarifa';
  breadcrumb: PoBreadcrumb = {
    items: [{ label: 'Home' }],
  };
  plano = 'Plano';

  cities$: Observable<Array<PoSelectOption>>;
  plans$: Observable<Array<PoSelectOption>>;
  simulation$: Observable<SimulationValueResult>;

  constructor(
    private formBuilder: FormBuilder,
    private citiesService: CitiesService,
    private plansService: PlansService,
    private simulationService: SimulationService
  ) {}

  ngOnInit(): void {
    this.setForm();
    this.setCitiesOption();
    this.setPlansOption();
    this.setSimulation();
  }

  private setSimulation(): void {
    this.simulation$ = this.simulationForm.valueChanges.pipe(
      debounceTime(WAITING),
      switchMap((model: SimulationForm) => this.getSimulationValue(model))
    );
  }

  private getSimulationValue(
    model: SimulationForm
  ): Observable<SimulationValueResult> {
    const { origin, destiny, time, plan } = model;

    return forkJoin({
      simulation: this.simulationService.simulate(origin, destiny, time, plan),
      planDetail: this.plansService.getPlan(plan),
    }).pipe(
      map((simulationPart) => {
        const {
          planDetail,
          simulation: { valueWithPlan, valueWithoutPlan },
        } = simulationPart;
        const planDescription = planDetail?.description;

        return {
          planDescription,
          valueWithPlan,
          valueWithoutPlan,
        };
      })
    );
  }

  private setCitiesOption(): void {
    this.cities$ = this.citiesService.getCities().pipe(
      map((cities) => {
        return cities.map((city) => ({
          label: `${city.name} - ${city.code}`,
          value: city.code,
        }));
      })
    );
  }

  private setPlansOption(): void {
    this.plans$ = this.plansService.getPlans().pipe(
      map((plans) => {
        return plans.map((plan) => ({
          label: plan.description,
          value: plan.id,
        }));
      })
    );
  }

  private setForm(): void {
    this.simulationForm = this.formBuilder.group({
      origin: ['', [Validators.required]],
      destiny: ['', [Validators.required]],
      time: ['', [Validators.required]],
      plan: ['', [Validators.required]],
    });
  }

  cancel(): void {
    window.history.back();
  }
}
