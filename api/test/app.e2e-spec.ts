import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { SimulationsModule } from '../src/simulations/simulations.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [SimulationsModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('Simulation:', () => {
    it('Origin:011 Destiny:016 Time:20 Plan:ConverseMuito 30 ', () => {
      return request(app.getHttpServer())
        .get('/simulations/value?plan=1&time=20&destiny=016&origin=011')
        .expect(200)
        .expect({
          origin: '011',
          destiny: '016',
          plan: '1',
          timeInMinutes: 20,
          valueWithPlan: 0,
          valueWithoutPlan: 38,
        });
    });

    it('Origin:011 Destiny:017 Time:80 Plan:ConverseMuito 60 ', () => {
      return request(app.getHttpServer())
        .get('/simulations/value?plan=2&time=80&destiny=017&origin=011')
        .expect(200)
        .expect({
          origin: '011',
          destiny: '017',
          plan: '2',
          timeInMinutes: 80,
          valueWithPlan: 37.4,
          valueWithoutPlan: 136,
        });
    });

    it('Origin:018 Destiny:011 Time:200 Plan:ConverseMuito 120 ', () => {
      return request(app.getHttpServer())
        .get('/simulations/value?plan=3&time=200&destiny=011&origin=018')
        .expect(200)
        .expect({
          origin: '018',
          destiny: '011',
          plan: '3',
          timeInMinutes: 200,
          valueWithPlan: 167.2,
          valueWithoutPlan: 380,
        });
    });

    it('Origin:018 Destiny:017 Time:100 Plan:ConverseMuito 30 ', () => {
      return request(app.getHttpServer())
        .get('/simulations/value?plan=1&time=100&destiny=017&origin=018')
        .expect(200)
        .expect({
          origin: '018',
          destiny: '017',
          plan: '1',
          timeInMinutes: 100,
          valueWithPlan: 0,
          valueWithoutPlan: 0,
        });
    });
  });
});
