import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import { CitiesService } from '../cities/cities.service';
import { FeesService } from '../fees/fees.service';
import { PlansService } from '../plans/plans.service';
import { SimulationsRepositoryService } from './repository/simulations-repository.service';
import { SimulationsService } from './simulations.service';

function setMocks() {
  const simulationsRepositoryMock = {
    getAll: jest.fn(),
    getOne: jest.fn(),
  };

  const citiesServiceMock = {
    getCityByDDDCode: jest.fn(),
  };

  const feesServiceMock = {
    getFeeByCity: jest.fn(),
  };

  const planServiceMock = {
    getOne: jest.fn(),
  };

  return {
    simulationsRepositoryMock,
    citiesServiceMock,
    feesServiceMock,
    planServiceMock,
  };
}

describe('SimulationsService', () => {
  let service: SimulationsService;
  let repository: SimulationsRepositoryService;
  let citiesService: CitiesService;
  let feesService: FeesService;
  let planService: PlansService;

  beforeEach(async () => {
    const {
      simulationsRepositoryMock,
      citiesServiceMock,
      feesServiceMock,
      planServiceMock,
    } = setMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SimulationsService,
        {
          provide: SimulationsRepositoryService,
          useFactory: () => simulationsRepositoryMock,
        },
        {
          provide: CitiesService,
          useFactory: () => citiesServiceMock,
        },
        {
          provide: FeesService,
          useFactory: () => feesServiceMock,
        },
        {
          provide: PlansService,
          useFactory: () => planServiceMock,
        },
      ],
    }).compile();

    service = module.get<SimulationsService>(SimulationsService);

    repository = module.get<SimulationsRepositoryService>(
      SimulationsRepositoryService,
    );

    citiesService = module.get<CitiesService>(CitiesService);
    feesService = module.get<FeesService>(FeesService);
    planService = module.get<PlansService>(PlansService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('getAll', () => {
    it('should be called service with search ', () => {
      service.getAll('Plano30');

      expect(repository.getAll).toBeCalledWith('Plano30', undefined, undefined);
    });
  });

  describe('getOne', () => {
    it('should be called service with right parameter ', () => {
      service.getOne('1');

      expect(repository.getOne).toBeCalledWith('1');
    });
  });

  describe('simulate', () => {
    it('should simulate value based on plans ', (done) => {
      jest.spyOn(citiesService, 'getCityByDDDCode').mockImplementation(() =>
        of({
          id: '2',
          code: '019',
          name: 'Rio de Janeiro',
        }),
      );

      jest.spyOn(feesService, 'getFeeByCity').mockImplementation(() =>
        of({
          id: '2',
          destiny: '3',
          origin: '1',
          value: 1.7,
        }),
      );

      jest.spyOn(planService, 'getOne').mockImplementation(() =>
        of({
          id: '2',
          description: 'Plano5',
          freeMinutes: 60,
        }),
      );

      service.simulate('011', '017', 80, '2').subscribe((simulations) => {
        expect(simulations).toEqual({
          origin: '011',
          destiny: '017',
          plan: '2',
          timeInMinutes: 80,
          valueWithPlan: 37.4,
          valueWithoutPlan: 136,
        });
        done();
      });
    });

    it('should simulate value without plan ', (done) => {
      jest.spyOn(citiesService, 'getCityByDDDCode').mockImplementation(() =>
        of({
          id: '2',
          code: '019',
          name: 'Rio de Janeiro',
        }),
      );

      jest.spyOn(feesService, 'getFeeByCity').mockImplementation(() =>
        of({
          id: '2',
          destiny: '3',
          origin: '1',
          value: 1.7,
        }),
      );

      jest.spyOn(planService, 'getOne').mockImplementation(() => of(undefined));

      service.simulate('011', '017', 80).subscribe((simulations) => {
        expect(simulations).toEqual({
          origin: '011',
          destiny: '017',
          timeInMinutes: 80,
          valueWithPlan: 149.6,
          valueWithoutPlan: 136,
        });
        done();
      });
    });

    it('should simulate value with plan using less minutes ', (done) => {
      jest.spyOn(citiesService, 'getCityByDDDCode').mockImplementation(() =>
        of({
          id: '2',
          code: '019',
          name: 'Rio de Janeiro',
        }),
      );

      jest.spyOn(feesService, 'getFeeByCity').mockImplementation(() =>
        of({
          id: '2',
          destiny: '3',
          origin: '1',
          value: 1.7,
        }),
      );

      jest.spyOn(planService, 'getOne').mockImplementation(() =>
        of({
          id: '2',
          description: 'Plano5',
          freeMinutes: 60,
        }),
      );

      service.simulate('011', '017', 20, '2').subscribe((simulations) => {
        expect(simulations).toEqual({
          origin: '011',
          destiny: '017',
          plan: '2',
          timeInMinutes: 20,
          valueWithPlan: 0,
          valueWithoutPlan: 34,
        });
        done();
      });
    });

    it('should simulate value with invalid city ', (done) => {
      jest.spyOn(citiesService, 'getCityByDDDCode').mockImplementation(() =>
        of(undefined),
      );

      jest.spyOn(feesService, 'getFeeByCity').mockImplementation(() =>
        of(undefined),
      );

      jest.spyOn(planService, 'getOne').mockImplementation(() =>
        of(undefined),
      );

      service.simulate('011', '017', 20, '2').subscribe((simulations) => {
        expect(simulations).toEqual({
          origin: '011',
          destiny: '017',
          timeInMinutes: 20,
          valueWithPlan: 0,
          valueWithoutPlan: 0,
        });
        done();
      });
    });
  });
});
