import { Module } from '@nestjs/common';
import { PlansController } from './plans.controller';
import { PlansService } from './plans.service';
import { PlansRepositoryMemoryService } from './repository/plans-repository-memory.service';
import { PlansRepositoryService } from './repository/plans-repository.service';

const repositoryProvider = {
  provide: PlansRepositoryService,
  useClass: PlansRepositoryMemoryService,
};
@Module({
  controllers: [PlansController],
  providers: [PlansService, repositoryProvider],
  exports: [PlansService],
})
export class PlansModule {}
