import { Collection, Item } from '../utils/interfaces/collection.interface';

export type Fees = Array<Fee>;

export interface Fee extends Item {
  origin?: string;
  destiny?: string;
  value?: number;
}

export interface FeesAPI extends Collection {
  items: Fees;
}
