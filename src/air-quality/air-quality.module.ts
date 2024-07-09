import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { AirQualityService } from './air-quality.service';
import { AirQualityController } from './air-quality.controller';
import { AirQuality } from './air-quality.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AirQuality]),
    HttpModule,
  ],
  providers: [AirQualityService],
  controllers: [AirQualityController],
})
export class AirQualityModule {}
