import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SimulationRoutingModule } from './simulation-routing.module';
import { SimulationComponent } from './simulation.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [SimulationComponent],
  imports: [CommonModule, SimulationRoutingModule, SharedModule],
})
export class SimulationModule {}
