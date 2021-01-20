import { Collection, Item } from '../utils/interfaces/collection.interface';

export type Simulations = Array<Simulation>;

export interface Simulation extends Item {
  origin?: string;
  destiny?: string;
  plan?: string;
  timeInMinutes?: number;
  valueWithPlan?: number;
  valueWithoutPlan?: number;
}

export interface SimulationsAPI extends Collection {
  items: Simulations;
}


