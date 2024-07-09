import { ApiProperty } from '@nestjs/swagger';

export class LocationDto {
  @ApiProperty({ example: 'Point', description: 'Type of the location' })
  type: string;

  @ApiProperty({ example: [2.351666, 48.859425], description: 'Coordinates of the location' })
  coordinates: number[];
}

export class PollutionDto {
  @ApiProperty({ example: '2024-07-09T13:00:00.000Z', description: 'Timestamp of the pollution data' })
  ts: string;

  @ApiProperty({ example: 49, description: 'Air Quality Index (US)' })
  aqius: number;

  @ApiProperty({ example: 'p2', description: 'Main pollutant (US)' })
  mainus: string;

  @ApiProperty({ example: 24, description: 'Air Quality Index (CN)' })
  aqicn: number;

  @ApiProperty({ example: 'o3', description: 'Main pollutant (CN)' })
  maincn: string;
}

export class WeatherDto {
  @ApiProperty({ example: '2024-07-09T13:00:00.000Z', description: 'Timestamp of the weather data' })
  ts: string;

  @ApiProperty({ example: 23, description: 'Temperature in Celsius' })
  tp: number;

  @ApiProperty({ example: 1011, description: 'Atmospheric pressure in hPa' })
  pr: number;

  @ApiProperty({ example: 64, description: 'Humidity percentage' })
  hu: number;

  @ApiProperty({ example: 4.63, description: 'Wind speed in m/s' })
  ws: number;

  @ApiProperty({ example: 360, description: 'Wind direction in degrees' })
  wd: number;

  @ApiProperty({ example: '10d', description: 'Weather icon code' })
  ic: string;
}

export class CurrentDto {
  @ApiProperty({ type: PollutionDto, description: 'Current pollution data' })
  pollution: PollutionDto;

  @ApiProperty({ type: WeatherDto, description: 'Current weather data' })
  weather: WeatherDto;
}

export class AirQualityResponseDto {
  @ApiProperty({ example: 'Paris', description: 'City name' })
  city: string;

  @ApiProperty({ example: 'Ile-de-France', description: 'State name' })
  state: string;

  @ApiProperty({ example: 'France', description: 'Country name' })
  country: string;

  @ApiProperty({ type: LocationDto, description: 'Location data' })
  location: LocationDto;

  @ApiProperty({ type: CurrentDto, description: 'Current data' })
  current: CurrentDto;
}

export class AirQualityRequestDto {
  @ApiProperty({ example: 2.352222, description: 'Longitude of the location' })
  longitude: number;

  @ApiProperty({ example: 48.856613, description: 'Latitude of the location' })
  latitude: number;
}
