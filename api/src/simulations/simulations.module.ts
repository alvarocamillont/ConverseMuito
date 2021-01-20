import { Module } from '@nestjs/common';
import { CitiesModule } from '../cities/cities.module';
import { FeesModule } from '../fees/fees.module';
import { PlansModule } from '../plans/plans.module';
import { SimulationsRepositoryMemoryService } from './repository/simulations-repository-memory.service';
import { SimulationsRepositoryService } from './repository/simulations-repository.service';
import { SimulationsController } from './simulations.controller';
import { SimulationsService } from './simulations.service';

const repositoryProvider = {
  provide: SimulationsRepositoryService,
  useClass: SimulationsRepositoryMemoryService,
};
@Module({
  controllers: [SimulationsController],
  providers: [SimulationsService, repositoryProvider],
  imports: [CitiesModule, FeesModule, PlansModule],
})
export class SimulationsModule {}
