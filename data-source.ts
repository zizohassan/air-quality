import 'dotenv/config';
import { DataSource } from 'typeorm';
import { AirQuality } from './src/air-quality/air-quality.entity';

const dataSource = new DataSource({
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT, 10),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [AirQuality],
  migrations: ['dist/migrations/*{.ts,.js}'],
  synchronize: false,
});

export default dataSource;
