import { Test, TestingModule } from '@nestjs/testing';
import { Simulations, SimulationsAPI } from '../simulations.interface';
import { SimulationsRepositoryMemoryService } from './simulations-repository-memory.service';

describe('FeesRepositoryMemoryService', () => {
  let service: SimulationsRepositoryMemoryService;

  beforeEach(async () => {
    const mockSimulations: Simulations = [
      { id: '1', destiny: '1', origin: '2', timeInMinutes: 50 },
      { id: '2', destiny: '7', origin: '8', timeInMinutes: 50 },
    ];
    const module: TestingModule = await Test.createTestingModule({
      providers: [SimulationsRepositoryMemoryService],
    }).compile();

    service = module.get<SimulationsRepositoryMemoryService>(
      SimulationsRepositoryMemoryService,
    );
    service.simulations = mockSimulations;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('getAll: should get simulation by search ', (done) => {
    const result: SimulationsAPI = {
      hasNext: false,
      items: [{ id: '2', destiny: '7', origin: '8', timeInMinutes: 50 }],
    };

    service.getAll('7').subscribe((simulations) => {
      expect(simulations).toEqual(result);
      done();
    });
  });

  it('getOne: should get simulation by id ', (done) => {
    service.getOne('2').subscribe((simulation) => {
      expect(simulation).toEqual({
        id: '2',
        destiny: '7',
        origin: '8',
        timeInMinutes: 50,
      });

      done();
    });
  });
});
