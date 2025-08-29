import { keepPreviousData, useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";
import { listVehicleEngineTypes } from "@/actions/vehicle-information.actions";
import { getManufacturerProperty } from "@/lib/methods";
import type {
  ModelType,
  ModelTypeResponseType,
} from "@/types/model-vehicles.type";
import type { VehicleDecodeResponseType } from "@/types/vehicle-decode.type";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const VehicleCard = ({ details }: { details: VehicleDecodeResponseType }) => {
  const router = useRouter();
  const manufacturer = details.data.matchingManufacturers.array[0];
  const model = details.data.matchingModels.array[0];
  const vehicle = details.data.matchingVehicles.array; // take the first vehicle

  const {
    data: modelVehiclesResult,
    isFetching,
    isRefetching,
    isLoading,
    isPending,
  } = useQuery({
    queryKey: ["model-vehicle", model.modelId],
    queryFn: async () => {
      const toastId = toast("Begins...");
      toast.loading("Loading...", {
        description: "Create Community...",
        id: toastId,
      });
      try {
        const data: ModelTypeResponseType = await listVehicleEngineTypes(
          model.modelId,
          1,
        );
        toast.dismiss(toastId);
        if (data && data.modelTypes) {
          toast.success("Success", {
            description: "Creation Success",
            id: toastId,
          });
          return data;
        } else {
          toast.error("Failed", {
            description: "VIN is not valid",
          });
          return null;
        }
      } catch (e) {
        toast.error("Error", {
          description: `${e}`,
        });
        toast.dismiss(toastId);
      }
    },
    placeholderData: keepPreviousData,
    retryOnMount: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchInterval: false,
  });

  return (
    <div className="flex flex-col gap-4 size-full">
      <Card className="w-full shadow-lg rounded-2xl gap-1">
        <CardHeader>
          <CardTitle className="text-lg font-bold">
            {manufacturer?.manuName} {model?.modelName}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <h2>Matching Vehicles: {vehicle.length}</h2>
        </CardContent>
      </Card>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {vehicle.map((v) => (
          <Card
            key={v.carId}
            className="flex flex-row items-center justify-between col-span-1 border p-4 rounded-lg hover:bg-gray-50 gap-1"
          >
            <div className="flex flex-col gap-1">
              <p className="text-sm">
                <span className="font-medium">Car Name:</span> {v.carName}
              </p>
              <p className="text-sm">
                <span className="font-medium">Manufacturer ID:</span> {v.manuId}
              </p>
              <p className="text-sm">
                <span className="font-medium">Model ID:</span> {v.modelId}
              </p>
              <p className="text-sm">
                <span className="font-medium">Car ID:</span> {v.carId}
              </p>
            </div>
            <Image
              src={
                (getManufacturerProperty(1, v.manuId, "imageURL") as string) ||
                "/manufacturers/MANUFACTURER.png"
              }
              alt={v.carName}
              width={200}
              height={200}
              className="rounded-md object-contain"
            />
          </Card>
        ))}
      </ul>
      <ul className="flex flex-col gap-2 size-full">
        {isPending || isFetching || isRefetching || isLoading ? (
          <p>Loading vehicle categories...</p>
        ) : modelVehiclesResult && modelVehiclesResult.modelType.length ? (
          <div className="flex flex-col size-full gap-2">
            <Card className="w-full shadow-lg rounded-2xl">
              <CardHeader>
                <CardTitle className="text-lg font-bold">
                  {modelVehiclesResult?.modelType}{" "}
                  {modelVehiclesResult?.countModelTypes}
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                {modelVehiclesResult.modelTypes.map((vehicle: ModelType) => (
                  <Card
                    key={vehicle.vehicleId}
                    className="col-span-1 p-4 gap-1 hover:bg-gray-800 hover:text-white cursor-pointer hover:border-blue-500"
                    onClick={() =>
                      router.push(
                        `category?vehicleId=${vehicle.vehicleId}&manuId=${model.manuId}`,
                      )
                    }
                  >
                    <h2 className="text-md font-semibold">
                      {vehicle.modelName}, {vehicle.typeEngineName}
                    </h2>
                    <p>
                      <span className="font-medium">From:</span>{" "}
                      {vehicle.constructionIntervalStart}
                    </p>
                    <p>
                      <span className="font-medium">To:</span>{" "}
                      {vehicle.constructionIntervalEnd}
                    </p>
                    <p>
                      <span className="font-medium">Power(KW):</span>{" "}
                      {vehicle.powerKw}
                    </p>
                    <p>
                      <span className="font-medium">Fuel Type:</span>{" "}
                      {vehicle.fuelType}
                    </p>
                    <p>
                      <span className="font-medium">Body Type:</span>{" "}
                      {vehicle.bodyType}
                    </p>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </div>
        ) : (
          <p>No vehicle found.</p>
        )}
      </ul>
    </div>
  );
};

export default VehicleCard;
