import { ApiProperty } from '@nestjs/swagger';
import { SimulationsAPI } from '../simulations.interface';

import { CreateSimulationsDto } from './create-simulations.dto';

export class GetSimulationDto implements SimulationsAPI {
  @ApiProperty()
  hasNext: boolean;

  @ApiProperty({ type: () => [CreateSimulationsDto] })
  items: Array<CreateSimulationsDto>;
}
