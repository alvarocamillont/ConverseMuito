import { Test, TestingModule } from '@nestjs/testing';
import { Cities, CitiesAPI } from '../cities.interface';
import { CitiesRepositoryMemoryService } from './cities-repository-memory.service';

describe('CitiesRepositoryMemoryService', () => {
  let service: CitiesRepositoryMemoryService;
  let mockCities: Cities;

  beforeEach(async () => {
    mockCities = [
      { id: '1', code: '011', name: 'São Paulo' },
      { id: '2', code: '019', name: 'Rio de Janeiro' },
    ];
    const module: TestingModule = await Test.createTestingModule({
      providers: [CitiesRepositoryMemoryService],
    }).compile();

    service = module.get<CitiesRepositoryMemoryService>(
      CitiesRepositoryMemoryService,
    );

    service.cities = mockCities;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('getAll: should get cities by search ', (done) => {
    const result: CitiesAPI = {
      hasNext: false,
      items: [{ id: '2', code: '019', name: 'Rio de Janeiro' }],
    };
    service.getAll('Rio').subscribe((cities) => {
      expect(cities).toEqual(result);
      done();
    });
  });

  it('getOne: should get cities by id ', (done) => {
    service.getOne('2').subscribe((city) => {
      expect(city).toEqual({
        id: '2',
        code: '019',
        name: 'Rio de Janeiro',
      });
      done();
    });
  });

  it('getCityByDDDCode: should get cities by code ', (done) => {
    service.getCityByDDDCode('019').subscribe((city) => {
      expect(city).toEqual({
        id: '2',
        code: '019',
        name: 'Rio de Janeiro',
      });
      done();
    });
  });
});
