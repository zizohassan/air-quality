import { Controller, Get, Query } from '@nestjs/common';
import { AirQualityService } from './air-quality.service';
import { ApiOperation, ApiTags, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { AirQualityRequestDto, AirQualityResponseDto } from './dto/air-quality.dto';

@ApiTags('air-quality')
@Controller('air-quality')
export class AirQualityController {
  constructor(private readonly airQualityService: AirQualityService) {}

  @Get()
  @ApiOperation({ summary: 'Get air quality data for specified coordinates' })
  @ApiQuery({ name: 'longitude', required: true, description: 'Longitude of the location' })
  @ApiQuery({ name: 'latitude', required: true, description: 'Latitude of the location' })
  @ApiResponse({ status: 200, description: 'Air quality data', type: AirQualityResponseDto })
  async getAirQuality(@Query() query: AirQualityRequestDto): Promise<AirQualityResponseDto> {
    const { longitude, latitude } = query;
    return this.airQualityService.getAirQuality(longitude, latitude);
  }

  @Get('most-polluted')
  @ApiOperation({ summary: 'Get the datetime when the Paris zone was most polluted' })
  @ApiResponse({ status: 200, description: 'Most polluted datetime' })
  async getMostPollutedTime() {
    return this.airQualityService.getMostPollutedTime();
  }
}
