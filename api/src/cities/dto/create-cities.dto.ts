import { ApiPropertyOptional } from '@nestjs/swagger';
import { City } from '../cities.interface';

export class CreateCitiesDto implements City {
  @ApiPropertyOptional()
  id: string;

  @ApiPropertyOptional()
  name: string;

  @ApiPropertyOptional()
  code: string;
}
