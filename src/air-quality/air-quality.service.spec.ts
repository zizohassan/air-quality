import { Test, TestingModule } from '@nestjs/testing';
import { AirQualityService } from './air-quality.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AirQuality } from './air-quality.entity';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { of } from 'rxjs';
import { Repository } from 'typeorm';

describe('AirQualityService', () => {
  let service: AirQualityService;
  let repository: Repository<AirQuality>;

  const mockHttpService = {
    get: jest.fn(() => of({
      data: {
        status: 'success',
        data: {
          city: 'Paris',
          state: 'Ile-de-France',
          country: 'France',
          location: {
            type: 'Point',
            coordinates: [
              2.351666,
              48.859425,
            ],
          },
          current: {
            pollution: {
              ts: '2024-07-09T18:00:00.000Z',
              aqius: 29,
              mainus: 'o3',
              aqicn: 22,
              maincn: 'o3',
            },
            weather: {
              ts: '2024-07-09T18:00:00.000Z',
              tp: 24,
              pr: 1011,
              hu: 64,
              ws: 2.57,
              wd: 240,
              ic: '01d',
            },
          },
        },
      },
    })),
  };

  const mockConfigService = {
    get: jest.fn(() => 'test_api_key'),
  };

  const mockAirQualityRepository = {
    findOne: jest.fn(),
    save: jest.fn(),
    clear: jest.fn(), // Mock the clear method
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AirQualityService,
        { provide: getRepositoryToken(AirQuality), useValue: mockAirQualityRepository },
        { provide: HttpService, useValue: mockHttpService },
        { provide: ConfigService, useValue: mockConfigService },
      ],
    }).compile();

    service = module.get<AirQualityService>(AirQualityService);
    repository = module.get<Repository<AirQuality>>(getRepositoryToken(AirQuality));

    await repository.clear(); // Clear the database before each test
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });


  it('should save air quality data if it does not exist', async () => {
    mockAirQualityRepository.findOne.mockResolvedValue(null);

    const savedRecord = await service.saveAirQuality({
      ts: '2024-07-09T18:00:00.000Z',
      aqius: 29,
      mainus: 'o3',
      aqicn: 22,
      maincn: 'o3',
    }, 2.351666, 48.859425);

    expect(savedRecord).toMatchObject({
      aqi: 29,
      latitude: 48.859425,
      longitude: 2.351666,
      main_pollutant: 'o3',
      timestamp: new Date('2024-07-09T18:00:00.000Z'),
    });
  });

  it('should fetch and return air quality data', async () => {
    const data = await service.getAirQuality(2.352222, 48.856613);
    expect(data).toEqual({
      ts: '2024-07-09T18:00:00.000Z',
      aqius: 29,
      mainus: 'o3',
      aqicn: 22,
      maincn: 'o3',
    });
  });

  it('should not save air quality data if it already exists', async () => {
    mockAirQualityRepository.findOne.mockResolvedValue(new AirQuality());
    const data = await service.saveAirQuality({
      ts: '2024-07-09T18:00:00.000Z',
      aqius: 29,
      mainus: 'o3',
      aqicn: 22,
      maincn: 'o3',
    }, 2.351666, 48.859425);

    expect(data).toEqual({});
  });

});
