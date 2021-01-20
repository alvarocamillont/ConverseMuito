import { Test, TestingModule } from '@nestjs/testing';
import { CitiesService } from './cities.service';
import { CitiesRepositoryService } from './repository/cities-repository.service';

describe('CitiesService', () => {
  let service: CitiesService;
  let repository: CitiesRepositoryService;

  beforeEach(async () => {
    const mockService = {
      getAll: jest.fn(),
      getOne: jest.fn(),
      getCityByDDDCode: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CitiesService,
        {
          provide: CitiesRepositoryService,
          useFactory: () => mockService,
        },
      ],
    }).compile();

    service = module.get<CitiesService>(CitiesService);
    repository = module.get<CitiesRepositoryService>(CitiesRepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should be called service with search ', () => {
      service.getAll('São Paulo');

      expect(repository.getAll).toBeCalledWith(
        'São Paulo',
        undefined,
        undefined,
      );
    });
  });

  describe('getOne', () => {
    it('should be called service with right parameter ', () => {
      service.getOne('1');

      expect(repository.getOne).toBeCalledWith('1');
    });
  });

  describe('getCityByDDDCode', () => {
    it('should be called service with right parameter ', () => {
      service.getCityByDDDCode('1');

      expect(repository.getCityByDDDCode).toBeCalledWith('1');
    });
  });
});
