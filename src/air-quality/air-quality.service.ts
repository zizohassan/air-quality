import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AirQuality } from './air-quality.entity';
import { Cron, CronExpression } from '@nestjs/schedule';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { AirQualityResponseDto, PollutionDto } from './dto/air-quality.dto';


@Injectable()
export class AirQualityService {
  private readonly apiKey: string;
  private readonly iqairUrl: string;

  constructor(
    @InjectRepository(AirQuality)
    private airQualityRepository: Repository<AirQuality>,
    private httpService: HttpService,
    private configService: ConfigService,
  ) {
    this.apiKey = this.configService.get<string>('API_KEY');
    this.iqairUrl = this.configService.get<string>('IQAIR_URL');
  }


  async getAirQuality(longitude: number, latitude: number): Promise<any> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.iqairUrl}nearest_city?lat=${latitude}&lon=${longitude}&key=${this.apiKey}`),
      );
      return response.data.data.current.pollution;
    } catch (error) {
      throw new HttpException('Failed to fetch air quality data', HttpStatus.BAD_REQUEST);
    }
  }


  async saveAirQuality(data: PollutionDto, longitude: number, latitude: number) {
    try {
      const timestamp = new Date(data.ts);
      const existingRecord = await this.airQualityRepository.findOne({
        where: {
          timestamp,
          longitude,
          latitude,
        },
      });
      if (existingRecord) {
        return {};
      }

      const airQuality = new AirQuality();
      airQuality.longitude = longitude;
      airQuality.latitude = latitude;
      airQuality.aqi = data.aqius;
      airQuality.main_pollutant = data.mainus;
      airQuality.timestamp = timestamp;
      await this.airQualityRepository.save(airQuality);

      return airQuality;
    } catch (error) {
      throw new HttpException('Failed to save air quality data', HttpStatus.INTERNAL_SERVER_ERROR, error);
    }
  }

  @Cron(CronExpression.EVERY_MINUTE)
  async checkParisAirQuality() {
    const longitude = 2.352222;
    const latitude = 48.856613;

    try {
      const data = await this.getAirQuality(longitude, latitude);
      await this.saveAirQuality(data, longitude, latitude);
    } catch (error) {
      console.error('Failed to check Paris air quality:', error);
    }
  }


  async getMostPollutedTime(): Promise<AirQuality> {
    try {
      const mostPolluted = await this.airQualityRepository
        .createQueryBuilder('air_quality')
        .orderBy('air_quality.aqi', 'DESC')
        .getOne();

      if (!mostPolluted) {
        throw new HttpException('No air quality data found', HttpStatus.NOT_FOUND);
      }

      return mostPolluted;
    } catch (error) {
      throw new HttpException('Failed to retrieve the most polluted time', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
