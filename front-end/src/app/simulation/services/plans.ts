export interface PlansApi {
  items: Plans;
  hasNext: boolean;
}

export interface Plan {
  id: string;
  description: string;
  freeMinutes: number;
}

export type Plans = Array<Plan>;
