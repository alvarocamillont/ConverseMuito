import { ApiProperty } from '@nestjs/swagger';
import { CitiesAPI } from '../cities.interface';
import { CreateCitiesDto } from './create-cities.dto';

export class GetCitiesDto implements CitiesAPI {
  @ApiProperty()
  hasNext: boolean;

  @ApiProperty({ type: () => [CreateCitiesDto] })
  items: Array<CreateCitiesDto>;
}
