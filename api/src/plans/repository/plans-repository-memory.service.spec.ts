import { Test, TestingModule } from '@nestjs/testing';
import { Plans, PlansAPI } from '../plans.interface';
import { PlansRepositoryMemoryService } from './plans-repository-memory.service';

describe('PlansRepositoryMemoryService', () => {
  let service: PlansRepositoryMemoryService;

  beforeEach(async () => {
    const mockPlans: Plans = [
      { id: '1', description: 'Plano10', freeMinutes: 10 },
      { id: '2', description: 'Plano5', freeMinutes: 5 },
    ];
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlansRepositoryMemoryService],
    }).compile();

    service = module.get<PlansRepositoryMemoryService>(
      PlansRepositoryMemoryService,
    );

    service.plans = mockPlans;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('getAll: should get plans by search ', (done) => {
    const result: PlansAPI = {
      hasNext: false,
      items: [{ id: '2', description: 'Plano5', freeMinutes: 5 }],
    };

    service.getAll('Plano5').subscribe((plan) => {
      expect(plan).toEqual(result);
      done();
    });
  });

  it('getOne: should get plans by id ', (done) => {
    service.getOne('2').subscribe((plan) => {
      expect(plan).toEqual({
        id: '2',
        description: 'Plano5',
        freeMinutes: 5,
      });
      done();
    });
  });
});
