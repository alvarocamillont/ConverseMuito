import { Collection, Item } from '../utils/interfaces/collection.interface';

export type Cities = Array<City>;
export interface City extends Item {
  name?: string;
  code?: string;
}

export interface CitiesAPI extends Collection {
  items: Cities;
}
