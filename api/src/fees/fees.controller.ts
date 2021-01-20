/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { CitiesAPI } from '../cities/cities.interface';
import { ParamQueryId, QueryApi } from '../utils/interfaces/query.interface';
import { CreateFeesDto } from './dto/create-fees.dto';
import { GetFeesDto } from './dto/get-fees.dto';
import { Fee } from './fees.interface';
import { FeesService } from './fees.service';

@ApiTags('Fees')
@Controller('fees')
export class FeesController {
  constructor(private feesService: FeesService) {}

  @ApiResponse({ status: 200, type: GetFeesDto })
  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({ name: 'filter', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'pageSize', required: false })
  @Get()
  getAll(@Query() query: QueryApi): Observable<CitiesAPI> {
    const { search, filter, page, pageSize } = query;

    return this.feesService.getAll(search || filter, page, pageSize);
  }

  @ApiResponse({ status: 200, type: CreateFeesDto })
  @ApiParam({ name: 'id' })
  @Get(':id')
  getOne(@Param() params: ParamQueryId): Observable<Fee> {
    return this.feesService.getOne(params['id']);
  }
}
