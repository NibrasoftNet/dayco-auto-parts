export type VehiclesOptionsType = {
  id: number;
  value: string;
};

export type VehicleManufacturerType = {
  countManufactures: number;
  manufacturers: ManufacturerDetailsType[];
};

export type ManufacturerDetailsType = {
  manufacturerId: number;
  brand: string;
};

export type VehicleTypeDetailsType = {
  vehicleTypeDetails: VehicleCompleteDetailsType;
};

export type VehicleCompleteDetailsType = {
  brand: string;
  modelType: string;
  typeEngine: string;
  constructionIntervalStart: string; // ISO date string
  constructionIntervalEnd: string; // ISO date string
  powerKw: string; // numeric but returned as string
  powerPs: string; // numeric but returned as string
  capacityTax: string | null;
  capacityLt: string | null;
  capacityTech: string | null;
  abs: string | null;
  asr: string | null;
  numberOfCylinders: number;
  numberOfValves: number;
  bodyType: string;
  engineType: string;
  gearType: string | null;
  driveType: string | null;
  brakeSystem: string | null;
  brakeType: string | null;
  fuelType: string;
  catalysatorType: string | null;
  fuelMixture: string | null;
  engCodes: string;
};
