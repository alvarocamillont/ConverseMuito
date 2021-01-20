import { Test, TestingModule } from '@nestjs/testing';
import { CitiesController } from './cities.controller';
import { CitiesService } from './cities.service';

describe('CitiesController', () => {
  let controller: CitiesController;
  let service: CitiesService;

  beforeEach(async () => {
    const mockService = {
      getAll: jest.fn(),
      getOne: jest.fn(),
      getCitieByDDDCode: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CitiesController],
      providers: [
        {
          provide: CitiesService,
          useFactory: () => mockService,
        },
      ],
    }).compile();

    controller = module.get<CitiesController>(CitiesController);
    service = module.get<CitiesService>(CitiesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAll', () => {
    it('should be called service with search ', () => {
      controller.getAll({
        search: 'São Paulo',
      });

      expect(service.getAll).toBeCalledWith('São Paulo', undefined, undefined);
    });

    it('should be called service with filter ', () => {
      controller.getAll({
        filter: 'São Paulo',
      });

      expect(service.getAll).toBeCalledWith('São Paulo', undefined, undefined);
    });
  });

  describe('getOne', () => {
    it('should be called service with right parameter ', () => {
      controller.getOne({ id: '1' });

      expect(service.getOne).toBeCalledWith('1');
    });
  });
});
