import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PoBreadcrumb, PoSelectOption } from '@po-ui/ng-components';
import { forkJoin, Observable, of } from 'rxjs';
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

  cities: Array<PoSelectOption>;
  plans: Array<PoSelectOption>;
  simulation: SimulationValueResult;

  constructor(
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.setForm();
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
