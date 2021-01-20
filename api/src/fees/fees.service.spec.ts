import { Test, TestingModule } from '@nestjs/testing';
import { FeesService } from './fees.service';
import { FeesRepositoryService } from './repository/fees-repository.service';

describe('FeesService', () => {
  let service: FeesService;
  let repository: FeesRepositoryService;

  beforeEach(async () => {
    const mockService = {
      getAll: jest.fn(),
      getOne: jest.fn(),
      getFeeByCity: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FeesService,
        {
          provide: FeesRepositoryService,
          useFactory: () => mockService,
        },
      ],
    }).compile();

    service = module.get<FeesService>(FeesService);
    repository = module.get<FeesRepositoryService>(FeesRepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should be called service with search ', () => {
      service.getAll('1');

      expect(repository.getAll).toBeCalledWith('1', undefined, undefined);
    });
  });

  describe('getOne', () => {
    it('should be called service with right parameter ', () => {
      service.getOne('1');

      expect(repository.getOne).toBeCalledWith('1');
    });
  });

  describe('getFeeByCity', () => {
    it('should be called service with right parameter ', () => {
      service.getFeeByCity('1', '2');

      expect(repository.getFeeByCity).toBeCalledWith('1', '2');
    });
  });
});
