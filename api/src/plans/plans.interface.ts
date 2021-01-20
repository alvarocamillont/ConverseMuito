import { Collection, Item } from '../utils/interfaces/collection.interface';

export type Plans = Array<Plan>;

export interface Plan extends Item {
  description?: string;
  freeMinutes?: number;
}

export interface PlansAPI extends Collection {
  items: Plans;
}
