import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Plan, PlansApi } from './plans';

import { PlansService } from './plans.service';

describe('PlansService', () => {
  let service: PlansService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(PlansService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('get plans', fakeAsync(() => {
    const fakeBody: PlansApi = {
      hasNext: false,
      items: [
        {
          id: '1',
          description: 'Test',
          freeMinutes: 50,
        },
      ],
    };

    service.getPlans().subscribe((response) => {
      expect(response).toEqual(fakeBody.items);
    });

    const request = httpMock.expectOne((req) => {
      return req.method === 'GET';
    });

    request.flush(fakeBody);

    tick();
  }));

  it('get plan', fakeAsync(() => {
    const fakeBody: Plan = {
      id: '1',
      description: 'Test',
      freeMinutes: 50,
    };

    service.getPlan('1').subscribe((response) => {
      expect(response).toEqual(fakeBody);
    });

    const request = httpMock.expectOne((req) => {
      return req.method === 'GET';
    });

    request.flush(fakeBody);

    tick();
  }));
});
