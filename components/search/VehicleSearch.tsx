import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { toast } from "sonner";
import { listVehicleEngineTypes } from "@/actions/vehicle-information.actions";
import {
  fetchManufacturersAction,
  fetchModelsAction,
  fetchVehicleDetailsAction,
} from "@/actions/vehicles.actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type {
  ModelType,
  ModelTypeResponseType,
  VehicleModelType,
  VehicleModelTypeResponseType,
} from "@/types/model-vehicles.type";
import type {
  ManufacturerDetailsType,
  VehicleManufacturerType,
  VehicleTypeDetailsType,
} from "@/types/vehicles.type";
import { VehiclesType } from "@/utils/constants/constants";
import Image from "next/image";
import { getManufacturerProperty } from "@/lib/methods";

const VehicleSearch = () => {
  const queryClient = useQueryClient();
  const [vehicleType, setVehicleType] = useState<number | null>(null);
  const [manufacturer, setManufacturer] = useState<number | null>(null);
  const [model, setModel] = useState<number | null>(null);
  const [engine, setEngine] = useState<number | null>(null);

  // --- Manufacturer Mutation
  const {
    data: manufacturers,
    isPending: manufacturersPending,
    mutateAsync: loadManufacturers,
  } = useMutation({
    mutationKey: ["manufacturers"],
    mutationFn: async (typeId: number) => {
      if (!vehicleType) return [];
      // ✅ check cache
      const cached = queryClient.getQueryData(["manufacturers", typeId]);
      if (cached) return cached;

      const result = await fetchManufacturersAction(typeId);
      queryClient.setQueryData(["manufacturers", typeId], result);
      return result;
    },
    onSuccess: (searchResult: VehicleManufacturerType) => {
      console.log("res", searchResult);
      if (searchResult.countManufactures) {
        toast.success("Success", {
          description: "Success Search",
        });
        return searchResult;
      } else {
        toast.error("Failure", {
          description: JSON.stringify(searchResult),
        });
        return null;
      }
    },
    onError: (err) => {
      toast.error("Failed to load manufacturers", {
        description: String(err),
      });
    },
  });

  // --- Models Mutation
  const {
    data: modelsList,
    isPending: modelsPending,
    mutateAsync: loadModels,
  } = useMutation({
    mutationKey: ["models"],
    mutationFn: async (manufacturerId: number) => {
      if (!vehicleType) return [];
      // ✅ check cache
      const cached = queryClient.getQueryData(["models", manufacturerId]);
      if (cached) return cached;

      const result = await fetchModelsAction(manufacturerId, vehicleType);
      queryClient.setQueryData(["models", manufacturerId], result);
      return result;
    },
    onSuccess: (searchResult: VehicleModelTypeResponseType) => {
      console.log("res", searchResult);
      if (searchResult.models) {
        toast.success("Success", {
          description: "Success Search",
        });
        return searchResult;
      } else {
        toast.error("Failure", {
          description: JSON.stringify(searchResult),
        });
        return null;
      }
    },
    onError: (err) => {
      toast.error("Failed to load manufacturers", {
        description: String(err),
      });
    },
  });

  // --- Engine types Mutation
  const {
    data: enginesList,
    isPending: enginesPending,
    mutateAsync: loadEngines,
  } = useMutation({
    mutationKey: ["engines"],
    mutationFn: async (modelsId: number) => {
      if (!vehicleType || !manufacturer) return [];
      // ✅ check cache
      const cached = queryClient.getQueryData(["engines", modelsId]);
      if (cached) return cached;

      const result = await listVehicleEngineTypes(
        modelsId,
        vehicleType,
      );
      queryClient.setQueryData(["engines", modelsId], result);
      return result;
    },
    onSuccess: (searchResult: ModelTypeResponseType) => {
      console.log("res", searchResult);
      if (searchResult.modelTypes) {
        toast.success("Success", {
          description: "Success Search",
        });
        return searchResult;
      } else {
        toast.error("Failure", {
          description: JSON.stringify(searchResult),
        });
        return null;
      }
    },
    onError: (err) => {
      toast.error("Failed to load engine types", {
        description: String(err),
      });
    },
  });

  // --- Vehicle Mutation
  const {
    data: vehicleDetails,
    isPending: vehiclePending,
    mutateAsync: loadVehicleDetails,
  } = useMutation({
    mutationKey: ["vehicle"],
    mutationFn: async (vehicleId: number) => {
      if (!vehicleType || !manufacturer || !model) return [];
      // ✅ check cache
      const cached = queryClient.getQueryData(["vehicle", vehicleId]);
      if (cached) return cached;

      const result = await fetchVehicleDetailsAction(
        vehicleId,
        vehicleType,
      );
      queryClient.setQueryData(["vehicle", vehicleId], result);
      return result;
    },
    onSuccess: (searchResult: VehicleTypeDetailsType) => {
      console.log("res", searchResult);
      if (searchResult) {
        toast.success("Success", {
          description: "Success Search",
        });
        return searchResult;
      } else {
        toast.error("Failure", {
          description: JSON.stringify(searchResult),
        });
        return null;
      }
    },
    onError: (err) => {
      toast.error("Failed to load engine types", {
        description: String(err),
      });
    },
  });

  const handleVehicleTypeChange = async (val: string) => {
    console.log("vvvv", val);
    const typeId = Number(val);
    setVehicleType(typeId);
    setManufacturer(null); // reset manufacturer
    await loadManufacturers(Number(val)); // load manufacturers for selected vehicle type
  };

  const handleVehicleManufacturerSelect = async (val: string) => {
    console.log("mmmm", val);
    const manuId = Number(val);
    setManufacturer(manuId);
    setModel(null); // reset model
    await loadModels(Number(val)); // load model for selected vehicle manufacturer
  };

  const handleVehicleModelSelect = async (val: string) => {
    console.log("eeee", val);
    const modelId = Number(val);
    setModel(modelId);
    setEngine(null); // reset engine
    await loadEngines(Number(val)); // load engines for selected vehicle model
  };

  const handleVehicleEngineSelect = async (val: string) => {
    console.log("eeee", val);
    const vehicleId = Number(val);
    setEngine(vehicleId);
    await loadVehicleDetails(Number(val)); // load vehicle for selected engine
  };

  return (
    <section>
      <div className="flex flex-col w-full items-center gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          {/* Vehicle Type */}
          <div className="col-span-1">
            <Label htmlFor="vehicleType">Vehicle Type</Label>
            <Select
              defaultValue={undefined}
              onValueChange={(value) => handleVehicleTypeChange(value)}
            >
              <SelectTrigger className="mt-1 w-full">
                <SelectValue placeholder="Select vehicle type" />
              </SelectTrigger>
              <SelectContent>
                {VehiclesType.map((v) => (
                  <SelectItem key={v.id} value={String(v.id)}>
                    {v.value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {/* Manufacturer */}
          <div>
            <Label htmlFor="manufacturer">Manufacturer</Label>
            <Select
              disabled={!vehicleType || manufacturersPending}
              onValueChange={(value) => handleVehicleManufacturerSelect(value)}
            >
              <SelectTrigger className="mt-1 w-full">
                <SelectValue
                  placeholder={
                    manufacturersPending ? "Loading..." : "Select manufacturer"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {manufacturers &&
                  manufacturers.manufacturers.length &&
                  manufacturers?.manufacturers.map(
                    (m: ManufacturerDetailsType) => (
                      <SelectItem
                        key={m.manufacturerId}
                        value={String(m.manufacturerId)}
                        className="flex gap-1 items-center"
                      >
                        <Image
                          src={
                            (getManufacturerProperty(1, m.manufacturerId, "imageURL") as string) ||
                            "/manufacturers/MANUFACTURER.png"
                          }
                          alt={m.brand}
                          width={50}
                          height={15}
                          className="rounded-md object-contain"
                        />
                        {m.brand}
                      </SelectItem>
                    ),
                  )}
              </SelectContent>
            </Select>
          </div>
          {/* Models */}
          <div>
            <Label htmlFor="models">Model</Label>
            <Select
              disabled={!manufacturer || modelsPending}
              onValueChange={(value) => handleVehicleModelSelect(value)}
            >
              <SelectTrigger className="mt-1 w-full">
                <SelectValue
                  placeholder={
                    modelsPending ? "Loading..." : "Select manufacturer"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {modelsList &&
                  modelsList.models.length &&
                  modelsList.models.map((m: VehicleModelType) => (
                    <SelectItem key={m.modelId} value={String(m.modelId)}>
                      {m.modelName}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
          {/* Engines */}
          <div>
            <Label htmlFor="engines">Engines</Label>
            <Select
              disabled={!model || enginesPending}
              onValueChange={(value) => handleVehicleEngineSelect(value)}
            >
              <SelectTrigger className="mt-1 w-full">
                <SelectValue
                  placeholder={
                    enginesPending ? "Loading..." : "Select Engine Type..."
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {enginesList &&
                  enginesList.modelTypes.length &&
                  enginesList.modelTypes.map((m: ModelType) => (
                    <SelectItem key={m.vehicleId} value={String(m.vehicleId)}>
                      {m.modelName}, {m.powerPs}PS, {m.fuelType}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      {/* Search Results */}
      {manufacturersPending ||
      modelsPending ||
      enginesPending ||
      vehiclePending ? (
        <div className="size-full flex items-center justify-center">
          Loading data..
        </div>
      ) : vehicleDetails ? (
        <Card className="w-full max-w-lg shadow-md mt-8">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">
              {vehicleDetails.vehicleTypeDetails.brand} —{" "}
              {vehicleDetails.vehicleTypeDetails.modelType}
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              {vehicleDetails.vehicleTypeDetails.constructionIntervalStart} →{" "}
              {vehicleDetails.vehicleTypeDetails.constructionIntervalEnd}
            </p>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-medium">Engine</p>
              <p>{vehicleDetails.vehicleTypeDetails.typeEngine}</p>
            </div>
            <div>
              <p className="font-medium">Fuel</p>
              <p>{vehicleDetails.vehicleTypeDetails.fuelType}</p>
            </div>
            <div>
              <p className="font-medium">Power</p>
              <p>
                {vehicleDetails.vehicleTypeDetails.powerKw} kW /{" "}
                {vehicleDetails.vehicleTypeDetails.powerPs} PS
              </p>
            </div>
            <div>
              <p className="font-medium">Capacity</p>
              <p>{vehicleDetails.vehicleTypeDetails.capacityLt} L</p>
            </div>
            <div>
              <p className="font-medium">Body</p>
              <p>{vehicleDetails.vehicleTypeDetails.bodyType}</p>
            </div>
            <div>
              <p className="font-medium">Drive</p>
              <p>{vehicleDetails.vehicleTypeDetails.driveType ?? "—"}</p>
            </div>
            <div>
              <p className="font-medium">Engine Code</p>
              <p>{vehicleDetails.vehicleTypeDetails.engCodes}</p>
            </div>
            <div>
              <p className="font-medium">Catalyst</p>
              <p>{vehicleDetails.vehicleTypeDetails.catalysatorType ?? "—"}</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button>Parts Category</Button>
          </CardFooter>
        </Card>
      ) : (
        <div>No data found</div>
      )}
    </section>
  );
};

export default VehicleSearch;
