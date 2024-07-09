import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TestAppModule } from '../../test-app.module';
import { AirQuality } from '../air-quality/air-quality.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AirQualityService } from '../air-quality/air-quality.service';

describe('AirQualityController (e2e)', () => {
  let app: INestApplication;
  let repository: Repository<AirQuality>;
  let service: AirQualityService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TestAppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    repository = moduleFixture.get<Repository<AirQuality>>(getRepositoryToken(AirQuality));
    service = moduleFixture.get<AirQualityService>(AirQualityService);
  });

  afterEach(async () => {
    await repository.query('DELETE FROM air_quality');
  });

  afterAll(async () => {
    await app.close();
  });

  it('/air-quality (POST) should save air quality data if it does not exist', async () => {

    const airQualityData = {
      longitude: 2.351666,
      latitude: 48.859425,
    };

    const response = await request(app.getHttpServer())
      .get('/air-quality')
      .send(airQualityData)
      .expect(200);

    const pollution = response.body;

    expect(pollution).toMatchObject({
      ts: expect.any(String),
      aqius: expect.any(Number),
      mainus: expect.any(String),
      aqicn: expect.any(Number),
      maincn: expect.any(String),
    });
  });

});
