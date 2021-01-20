import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { SimulationService } from './simulation.service';
import { SimulationValue } from './simulation';
import { HttpParams } from '@angular/common/http';

describe('SimulationService', () => {
  let service: SimulationService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(SimulationService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('make a simulation', () => {
    it('with params', fakeAsync(() => {
      const fakeBody: SimulationValue = {
        destiny: '011',
        origin: '017',
        plan: '1',
        timeInMinutes: 10,
        valueWithPlan: 100,
        valueWithoutPlan: 200,
      };

      service.simulate('011', '017', 10, '1').subscribe((response) => {
        expect(response).toEqual(fakeBody);
      });

      const request = httpMock.expectOne((req) => {
        return req.method === 'GET';
      });

      request.flush(fakeBody);

      tick();
    }));

    it('without params', fakeAsync(() => {
      const fakeBody: SimulationValue = {
        destiny: '011',
        origin: '017',
        plan: '1',
        timeInMinutes: 10,
        valueWithPlan: 100,
        valueWithoutPlan: 200,
      };

      service.simulate().subscribe((response) => {
        expect(response).toEqual(fakeBody);
      });

      const request = httpMock.expectOne((req) => {
        return req.method === 'GET';
      });

      request.flush(fakeBody);

      tick();
    }));
  });
});
