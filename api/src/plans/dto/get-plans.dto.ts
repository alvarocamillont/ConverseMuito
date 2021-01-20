import { ApiProperty } from '@nestjs/swagger';
import { PlansAPI } from '../plans.interface';

import { CreatePlansDto } from './create-plans.dto';

export class GetPlansDto implements PlansAPI {
  @ApiProperty()
  hasNext: boolean;

  @ApiProperty({ type: () => [CreatePlansDto] })
  items: Array<CreatePlansDto>;
}
