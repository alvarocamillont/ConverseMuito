import { ApiPropertyOptional } from '@nestjs/swagger';
import { Fee } from '../fees.interface';

export class CreateFeesDto implements Fee {
  @ApiPropertyOptional()
  id: string;

  @ApiPropertyOptional()
  origin: string;

  @ApiPropertyOptional()
  destiny: string;

  @ApiPropertyOptional()
  value: number;
}
