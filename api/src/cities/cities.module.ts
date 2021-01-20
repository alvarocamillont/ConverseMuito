import { Module } from '@nestjs/common';
import { CitiesController } from './cities.controller';
import { CitiesService } from './cities.service';
import { CitiesRepositoryMemoryService } from './repository/cities-repository-memory.service';
import { CitiesRepositoryService } from './repository/cities-repository.service';

const repositoryProvider = {
  provide: CitiesRepositoryService,
  useClass: CitiesRepositoryMemoryService,
};
@Module({
  controllers: [CitiesController],
  providers: [CitiesService, repositoryProvider],
  exports: [CitiesService],
})
export class CitiesModule {}
