import { Module } from '@nestjs/common';
import { FeesController } from './fees.controller';
import { FeesService } from './fees.service';
import { FeesRepositoryMemoryService } from './repository/fees-repository-memory.service';
import { FeesRepositoryService } from './repository/fees-repository.service';

const repositoryProvider = {
  provide: FeesRepositoryService,
  useClass: FeesRepositoryMemoryService,
};
@Module({
  controllers: [FeesController],
  providers: [FeesService, repositoryProvider],
  exports: [FeesService],
})
export class FeesModule {}
