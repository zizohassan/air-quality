import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AirQualityModule } from './air-quality/air-quality.module';
import { ScheduleModule } from '@nestjs/schedule';
import { HttpModule } from '@nestjs/axios';
import dataSource from '../data-source';
import { AppController } from './app.controller';
import { AppService } from './app.service';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      ...dataSource.options,
    }),
    ScheduleModule.forRoot(),
    HttpModule,
    AirQualityModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
