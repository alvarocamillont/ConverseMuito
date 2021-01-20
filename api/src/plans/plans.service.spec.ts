import { Test, TestingModule } from '@nestjs/testing';
import { PlansService } from './plans.service';
import { PlansRepositoryService } from './repository/plans-repository.service';

describe('PlansService', () => {
  let service: PlansService;
  let repository: PlansRepositoryService;

  beforeEach(async () => {
    const mockService = {
      getAll: jest.fn(),
      getOne: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlansService,
        {
          provide: PlansRepositoryService,
          useFactory: () => mockService,
        },
      ],
    }).compile();

    service = module.get<PlansService>(PlansService);
    repository = module.get<PlansRepositoryService>(PlansRepositoryService);
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
});
