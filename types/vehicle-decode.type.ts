export type VehicleDecodeResponseType = {
  data: {
    dataSource: {
      dataSourceKey: string;
    }[];

    matchingModels: {
      array: {
        manuId: number;
        modelId: number;
        modelName: string;
      }[];
    };

    matchingVehicles: {
      array: {
        carId: number;
        manuId: number;
        carName: string;
        modelId: number;
        linkageTargetType: string;
        subLinkageTargetType: string;
        vehicleTypeDescription: string;
      }[];
    };

    matchingManufacturers: {
      array: {
        manuId: number;
        manuName: string;
      }[];
    };

    matchingVehiclesCount: number;
  };

  status: number;
};
