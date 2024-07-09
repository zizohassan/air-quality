import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AirQuality {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('double')
  longitude: number;

  @Column('double')
  latitude: number;

  @Column()
  aqi: number;

  @Column()
  main_pollutant: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  timestamp: Date;
}
