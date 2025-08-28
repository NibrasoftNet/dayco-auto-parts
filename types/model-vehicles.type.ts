export type ModelTypeResponseType = {
  modelType: string;
  countModelTypes: number;
  modelTypes: ModelType[];
};

export type ModelType = {
  vehicleId: number;
  manufacturerName: string;
  modelName: string;
  typeEngineName: string;
  constructionIntervalStart: string; // ISO date string e.g. "1975-01-01"
  constructionIntervalEnd: string; // ISO date string e.g. "1976-07-01"
  powerKw: string | null; // can be string like "63.0000" or null
  powerPs: string | null; // can be string like "85.0000" or null
  capacityTax: string | null; // sometimes null
  fuelType: string;
  bodyType: string;
  numberOfCylinders: number;
  capacityLt: string | null; // e.g. "1.8000"
  capacityTech: string | null; // e.g. "1760.0000"
  engineCodes: string | null; // can be null or comma-separated string like "ZZ,ZS"
};

export type VehicleModelTypeResponseType = {
  countModels: number;
  models: VehicleModelType[];
};

export type VehicleModelType = {
  modelId: number;
  modelName: string;
  modelYearFrom: string;
  modelYearTo: string | null;
};
