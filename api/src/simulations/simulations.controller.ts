/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { ParamQueryId, QueryApi } from '../utils/interfaces/query.interface';
import {
  CreateSimulationsDto,
  SimulationQuery,
} from './dto/create-simulations.dto';
import { GetSimulationDto } from './dto/get-simulations.dto';
import { Simulation, SimulationsAPI } from './simulations.interface';
import { SimulationsService } from './simulations.service';

@ApiTags('Simulations')
@Controller('simulations')
export class SimulationsController {
  constructor(private simulationsService: SimulationsService) {}

  @ApiResponse({ status: 200, type: GetSimulationDto })
  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({ name: 'filter', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'pageSize', required: false })
  @Get()
  getAll(@Query() query: QueryApi): Observable<SimulationsAPI> {
    const { search, filter, page, pageSize } = query;

    return this.simulationsService.getAll(search || filter, page, pageSize);
  }

  @ApiResponse({ status: 200, type: CreateSimulationsDto })
  @ApiQuery({ name: 'origin', required: false })
  @ApiQuery({ name: 'destiny', required: false })
  @ApiQuery({ name: 'time', required: false })
  @ApiQuery({ name: 'plan', required: false })
  @Get('value')
  simulate(@Query() query?: SimulationQuery): Observable<Simulation> {
    const { origin, destiny, plan, time } = query;
    return this.simulationsService.simulate(origin, destiny, +time, plan);
  }

  @ApiResponse({ status: 200, type: CreateSimulationsDto })
  @ApiParam({ name: 'id' })
  @Get(':id')
  getOne(@Param() params: ParamQueryId): Observable<Simulation> {
    return this.simulationsService.getOne(params['id']);
  }
}
