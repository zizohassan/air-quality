import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AirQuality } from './src/air-quality/air-quality.entity';
import { AirQualityModule } from './src/air-quality/air-quality.module';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.test' });

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async () => ({
        type: 'mysql',
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT, 10),
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        entities: [AirQuality],
        synchronize: true,
      }),
    }),
    TypeOrmModule.forFeature([AirQuality]),
    AirQualityModule,
  ],
})
export class TestAppModule {}
