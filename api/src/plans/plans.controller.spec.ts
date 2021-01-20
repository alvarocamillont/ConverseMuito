import { Test, TestingModule } from '@nestjs/testing';

import { PlansController } from './plans.controller';
import { PlansService } from './plans.service';


describe('PlansController', () => {
  let controller: PlansController;
  let service: PlansService;

  beforeEach(async () => {
    const mockService = {
      getAll: jest.fn(),
      getOne: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlansController],
      providers: [
        {
          provide: PlansService,
          useFactory: () => mockService,
        },
      ],
    }).compile();

    controller = module.get<PlansController>(PlansController);
    service = module.get<PlansService>(PlansService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAll', () => {
    it('should be called service with search ', () => {
      controller.getAll({
        search: 'Plano30',
      });

      expect(service.getAll).toBeCalledWith('Plano30', undefined, undefined);
    });

    it('should be called service with filter ', () => {
      controller.getAll({
        filter: 'Plano30',
      });

      expect(service.getAll).toBeCalledWith('Plano30', undefined, undefined);
    });
  });

  describe('getOne', () => {
    it('should be called service with right parameter ', () => {
      controller.getOne({ id: '1' });

      expect(service.getOne).toBeCalledWith('1');
    });
  });
});
