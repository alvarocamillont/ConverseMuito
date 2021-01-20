export interface SimulationValue {
  origin: string;
  destiny: string;
  plan: string;
  timeInMinutes: number;
  valueWithPlan: number;
  valueWithoutPlan: number;
}

export interface SimulationValueResult {
  planDescription: string;
  valueWithPlan: number;
  valueWithoutPlan: number;
}

export interface SimulationForm {
  origin: string;
  destiny: string;
  time: number;
  plan: string;
}
