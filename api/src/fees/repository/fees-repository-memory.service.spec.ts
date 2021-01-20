import { Test, TestingModule } from '@nestjs/testing';
import { Fees, FeesAPI } from '../fees.interface';
import { FeesRepositoryMemoryService } from './fees-repository-memory.service';

describe('FeesRepositoryMemoryService', () => {
  let service: FeesRepositoryMemoryService;

  beforeEach(async () => {
    const mockFees: Fees = [
      { id: '1', destiny: '5', origin: '1', value: 20 },
      { id: '2', destiny: '3', origin: '1', value: 50 },
    ];
    const module: TestingModule = await Test.createTestingModule({
      providers: [FeesRepositoryMemoryService],
    }).compile();

    service = module.get<FeesRepositoryMemoryService>(
      FeesRepositoryMemoryService,
    );

    service.fees = mockFees;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('getAll: should get fees by search ', (done) => {
    const result: FeesAPI = {
      hasNext: false,
      items: [{ id: '2', destiny: '3', origin: '1', value: 50 }],
    };

    service.getAll('3').subscribe((fees) => {
      expect(fees).toEqual(result);
      done();
    });
  });

  it('getOne: should get fees by id ', (done) => {
    service.getOne('2').subscribe((fee) => {
      expect(fee).toEqual({
        id: '2',
        destiny: '3',
        origin: '1',
        value: 50,
      });
      done();
    });
  });

  it('getFeeByCity: should get fees by original and destiny code', (done) => {
    service.getFeeByCity('1', '3').subscribe((fee) => {
      expect(fee).toEqual({
        id: '2',
        destiny: '3',
        origin: '1',
        value: 50,
      });
      done();
    });
  });
});
