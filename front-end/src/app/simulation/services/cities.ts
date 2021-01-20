export interface CitiesAPI {
  hasNext: boolean;
  items: Cities;
}

export interface City {
  id: string;
  name: string;
  code: string;
}

export type Cities = Array<City>;
