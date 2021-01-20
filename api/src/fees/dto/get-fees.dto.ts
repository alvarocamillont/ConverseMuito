import { ApiProperty } from '@nestjs/swagger';

import { FeesAPI } from '../fees.interface';
import { CreateFeesDto } from './create-fees.dto';

export class GetFeesDto implements FeesAPI {
  @ApiProperty()
  hasNext: boolean;

  @ApiProperty({ type: () => [CreateFeesDto] })
  items: Array<CreateFeesDto>;
}
