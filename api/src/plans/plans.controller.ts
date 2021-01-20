/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { ParamQueryId, QueryApi } from '../utils/interfaces/query.interface';
import { CreatePlansDto } from './dto/create-plans.dto';
import { GetPlansDto } from './dto/get-plans.dto';
import { Plan, PlansAPI } from './plans.interface';
import { PlansService } from './plans.service';

@ApiTags('Plans')
@Controller('plans')
export class PlansController {
  constructor(private plansService: PlansService) {}

  @ApiResponse({ status: 200, type: GetPlansDto })
  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({ name: 'filter', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'pageSize', required: false })
  @Get()
  getAll(@Query() query: QueryApi): Observable<PlansAPI> {
    const { search, filter, page, pageSize } = query;

    return this.plansService.getAll(search || filter, page, pageSize);
  }

  @ApiResponse({ status: 200, type: CreatePlansDto })
  @ApiParam({ name: 'id' })
  @Get(':id')
  getOne(@Param() params: ParamQueryId): Observable<Plan> {
    return this.plansService.getOne(params['id']);
  }
}
