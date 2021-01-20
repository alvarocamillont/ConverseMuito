import { ApiPropertyOptional } from '@nestjs/swagger';
import { Plan } from '../plans.interface';

export class CreatePlansDto implements Plan {
  @ApiPropertyOptional()
  id: string;

  @ApiPropertyOptional()
  description: string;

  @ApiPropertyOptional()
  freeMinutes: number;
}
