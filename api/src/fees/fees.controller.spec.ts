import { Test, TestingModule } from '@nestjs/testing';
import { FeesController } from './fees.controller';
import { FeesService } from './fees.service';

describe('FeesController', () => {
  let controller: FeesController;
  let service: FeesService;

  beforeEach(async () => {
    const mockService = {
      getAll: jest.fn(),
      getOne: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FeesController],
      providers: [
        {
          provide: FeesService,
          useFactory: () => mockService,
        },
      ],
    }).compile();

    controller = module.get<FeesController>(FeesController);
    service = module.get<FeesService>(FeesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAll', () => {
    it('should be called service with search ', () => {
      controller.getAll({
        search: '1',
      });

      expect(service.getAll).toBeCalledWith('1', undefined, undefined);
    });

    it('should be called service with filter ', () => {
      controller.getAll({
        filter: '1',
      });

      expect(service.getAll).toBeCalledWith('1', undefined, undefined);
    });
  });

  describe('getOne', () => {
    it('should be called service with right parameter ', () => {
      controller.getOne({ id: '1' });

      expect(service.getOne).toBeCalledWith('1');
    });
  });
});
