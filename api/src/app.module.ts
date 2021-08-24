import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CitiesModule } from './cities/cities.module';
import { PlansModule } from './plans/plans.module';
import { SimulationsModule } from './simulations/simulations.module';
import { FeesModule } from './fees/fees.module';

@Module({
  imports: [CitiesModule, PlansModule, SimulationsModule, FeesModule],
  controllers: [AppController],
})
export class AppModule { }

// Teste
