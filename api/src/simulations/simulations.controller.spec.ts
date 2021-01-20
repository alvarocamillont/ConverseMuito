import { Test, TestingModule } from '@nestjs/testing';
import { SimulationsController } from './simulations.controller';
import { SimulationsService } from './simulations.service';

describe('SimulationsController', () => {
  let controller: SimulationsController;
  let service: SimulationsService;

  beforeEach(async () => {
    const mockService = {
      getAll: jest.fn(),
      getOne: jest.fn(),
      simulate: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SimulationsController],
      providers: [
        {
          provide: SimulationsService,
          useFactory: () => mockService,
        },
      ],
    }).compile();

    controller = module.get<SimulationsController>(SimulationsController);
    service = module.get<SimulationsService>(SimulationsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAll', () => {
    it('should be called service with search ', () => {
      controller.getAll({
        search: '2',
      });

      expect(service.getAll).toBeCalledWith('2', undefined, undefined);
    });

    it('should be called service with filter ', () => {
      controller.getAll({
        filter: '3',
      });

      expect(service.getAll).toBeCalledWith('3', undefined, undefined);
    });
  });

  describe('getOne', () => {
    it('should be called service with right parameter ', () => {
      controller.getOne({ id: '1' });

      expect(service.getOne).toBeCalledWith('1');
    });
  });

  describe('simulate', () => {
    it('should be called service with right parameter ', () => {
      controller.simulate({
        origin: '2',
        destiny: '1',
        plan: '3',
        time: 20,
      });

      expect(service.simulate).toBeCalledWith('2', '1', 20, '3');
    });
  });
});
