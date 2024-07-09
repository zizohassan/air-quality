import { Test, TestingModule } from '@nestjs/testing';
import { AirQualityController } from './air-quality.controller';
import { AirQualityService } from './air-quality.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

describe('AirQualityController', () => {
  let controller: AirQualityController;
  let service: AirQualityService;

  const mockAirQualityService = {
    getAirQuality: jest.fn((longitude, latitude) => ({
      city: 'Paris',
      state: 'Ile-de-France',
      country: 'France',
      location: { type: 'Point', coordinates: [longitude, latitude] },
      current: {
        pollution: { ts: '2024-07-09T13:00:00.000Z', aqius: 49, mainus: 'p2' },
        weather: { ts: '2024-07-09T13:00:00.000Z' },
      },
    })),
    getMostPollutedTime: jest.fn(() => ({
      timestamp: '2024-07-09T13:00:00.000Z',
      aqi: 49,
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, ConfigModule.forRoot()],
      controllers: [AirQualityController],
      providers: [
        { provide: AirQualityService, useValue: mockAirQualityService },
      ],
    }).compile();

    controller = module.get<AirQualityController>(AirQualityController);
    service = module.get<AirQualityService>(AirQualityService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return air quality data for specified coordinates', async () => {
    const result = await controller.getAirQuality({ longitude: 2.352222, latitude: 48.856613 });
    expect(result).toEqual(expect.objectContaining({
      city: 'Paris',
      current: expect.objectContaining({
        pollution: expect.objectContaining({
          aqius: 49,
        }),
      }),
    }));
  });

  it('should return the datetime when the Paris zone was most polluted', async () => {
    const result = await controller.getMostPollutedTime();
    expect(result).toEqual(expect.objectContaining({
      timestamp: '2024-07-09T13:00:00.000Z',
      aqi: 49,
    }));
  });
});
