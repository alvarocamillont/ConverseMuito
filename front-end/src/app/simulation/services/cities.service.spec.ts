import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { CitiesService } from './cities.service';
import { CitiesAPI } from './cities';

describe('CitiesService', () => {
  let service: CitiesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(CitiesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('get cities', fakeAsync(() => {
    const fakeBody: CitiesAPI = {
      hasNext: false,
      items: [
        {
          id: '1',
          code: '011',
          name: 'São Paulo',
        },
      ],
    };

    service.getCities().subscribe((response) => {
      expect(response).toEqual(fakeBody.items);
    });

    const request = httpMock.expectOne((req) => {
      return req.method === 'GET';
    });

    request.flush(fakeBody);

    tick();
  }));
});
