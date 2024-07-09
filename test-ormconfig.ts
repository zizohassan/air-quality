import { DataSource } from 'typeorm';
import { AirQuality } from './src/air-quality/air-quality.entity';

export const testDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost', // or your MySQL host
  port: 3306,
  username: 'test_user', // replace with your test database username
  password: 'test_password', // replace with your test database password
  database: 'test_database', // replace with your test database name
  entities: [AirQuality],
  synchronize: true,
});
