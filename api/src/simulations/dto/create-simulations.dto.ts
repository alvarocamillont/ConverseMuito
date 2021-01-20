import { ApiPropertyOptional } from '@nestjs/swagger';
import { Simulation } from '../simulations.interface';

export class CreateSimulationsDto implements Simulation {
  @ApiPropertyOptional()
  id: string;

  @ApiPropertyOptional()
  origin: string;

  @ApiPropertyOptional()
  destiny: string;

  @ApiPropertyOptional()
  plan: string;

  @ApiPropertyOptional()
  timeInMinutes: number;

  @ApiPropertyOptional()
  valueWithPlan: number;

  @ApiPropertyOptional()
  valueWithoutPlan: number;
}

export class SimulationQuery {
  @ApiPropertyOptional()
  origin?: string;
  @ApiPropertyOptional()
  destiny?: string;
  @ApiPropertyOptional()
  plan?: string;
  @ApiPropertyOptional()
  time?: number;
}
