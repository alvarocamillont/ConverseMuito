import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { PoModule } from '@po-ui/ng-components';
import { of } from 'rxjs';
import { CitiesService } from './services/cities.service';
import { PlansService } from './services/plans.service';
import { SimulationService } from './services/simulation.service';

import { SimulationComponent } from './simulation.component';

describe('SimulationComponent', () => {
  let component: SimulationComponent;
  let fixture: ComponentFixture<SimulationComponent>;
  let citiesService: CitiesService;
  let plansService: PlansService;
  let simulationService: SimulationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, PoModule],
      providers: [CitiesService, PlansService, SimulationService],
      declarations: [SimulationComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimulationComponent);
    citiesService = TestBed.inject(CitiesService);
    plansService = TestBed.inject(PlansService);
    simulationService = TestBed.inject(SimulationService);

    spyOn(citiesService, 'getCities').and.returnValue(
      of([
        {
          id: '1',
          code: '011',
          name: 'São Paulo',
        },
      ])
    );

    spyOn(plansService, 'getPlans').and.returnValue(
      of([
        {
          id: '1',
          description: 'Test',
          freeMinutes: 50,
        },
      ])
    );

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('cancel return page', () => {
    const spy = spyOn(window.history, 'back');
    component.cancel();
    expect(spy).toHaveBeenCalled();
  });

  describe('simulate', () => {
    it('with params', fakeAsync(() => {
      const spy = spyOn(simulationService, 'simulate').and.returnValue(
        of({
          destiny: '011',
          origin: '017',
          plan: '1',
          timeInMinutes: 10,
          valueWithPlan: 100,
          valueWithoutPlan: 200,
        })
      );

      spyOn(plansService, 'getPlan').and.returnValue(
        of({
          id: '1',
          description: 'Test',
          freeMinutes: 50,
        })
      );

      component.simulationForm.controls.origin.setValue('011');
      component.simulationForm.controls.destiny.setValue('12');
      component.simulationForm.controls.time.setValue('14');
      component.simulationForm.controls.plan.setValue('18');

      tick(500);

      expect(spy).toHaveBeenCalled();
    }));

    it('without params', fakeAsync(() => {
      const spy = spyOn(simulationService, 'simulate').and.returnValue(
        of({
          destiny: '011',
          origin: '017',
          plan: '1',
          timeInMinutes: 10,
          valueWithPlan: 100,
          valueWithoutPlan: 200,
        })
      );

      spyOn(plansService, 'getPlan').and.returnValue(of(undefined));

      component.simulationForm.controls.origin.setValue('');
      component.simulationForm.controls.destiny.setValue('');
      component.simulationForm.controls.time.setValue('');
      component.simulationForm.controls.plan.setValue('');

      tick(500);

      expect(spy).toHaveBeenCalled();
    }));
  });
});
