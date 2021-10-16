import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PoBreadcrumb, PoSelectOption } from '@po-ui/ng-components';
import { forkJoin, Observable, of, Subscription } from 'rxjs';
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
export class SimulationComponent implements OnInit, OnDestroy {
  simulationForm!: FormGroup;
  title = 'Simulação de Tarifa';
  breadcrumb: PoBreadcrumb = {
    items: [{ label: 'Home' }],
  };
  plano = 'Plano';

  cities: Array<PoSelectOption>;
  plans: Array<PoSelectOption>;
  simulation: SimulationValueResult;

  sub = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private planService: PlansService,
    private citiesService: CitiesService
  ) {}

  ngOnInit(): void {
    this.setForm();
    this.setPlansOption();
    this.setCitiesOption();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  private setPlansOption(): void {
    this.sub.add(
      this.planService.getPlans().subscribe((plansApi) => {
        const plansFromApi = plansApi.items;
        this.plans = plansFromApi.map((plan) => {
          return {
            label: plan.description,
            value: plan.id,
          };
        });
      })
    );
  }

  private setCitiesOption(): void {
    this.sub.add(
      this.citiesService.getCities().subscribe((citiesApi) => {
        const citiesFromApi = citiesApi.items;
        this.cities = citiesFromApi.map((city) => {
          return {
            label: `${city.name} - ${city.code}`,
            value: city.code,
          };
        });
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
