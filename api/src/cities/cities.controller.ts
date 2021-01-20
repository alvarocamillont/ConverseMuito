/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ParamQueryId, QueryApi } from '../utils/interfaces/query.interface';

import { CitiesService } from './cities.service';
import { GetCitiesDto } from './dto/get-cities.dto';
import { CreateCitiesDto } from './dto/create-cities.dto';
import { Observable } from 'rxjs';
import { CitiesAPI, City } from './cities.interface';

@ApiTags('Cities')
@Controller('cities')
export class CitiesController {
  constructor(private citiesService: CitiesService) {}

  @ApiResponse({ status: 200, type: GetCitiesDto })
  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({ name: 'filter', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'pageSize', required: false })
  @Get()
  getAll(@Query() query: QueryApi): Observable<CitiesAPI> {
    const { search, filter, page, pageSize } = query;

    return this.citiesService.getAll(search || filter, page, pageSize);
  }

  @ApiResponse({ status: 200, type: CreateCitiesDto })
  @ApiParam({ name: 'id' })
  @Get(':id')
  getOne(@Param() params: ParamQueryId): Observable<City> {
    return this.citiesService.getOne(params['id']);
  }
}
