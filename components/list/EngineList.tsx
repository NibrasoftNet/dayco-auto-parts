"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import type { ModelType, ModelTypeResponseType } from "@/types/model-vehicles.type";
import Link from "next/link";
import { listVehicleEngineTypes } from "@/actions/vehicle-information.actions";

const ModelList = ({ searchParams }: { searchParams: { typeId: string; manuId: string; modelId: string } }) => {
  const typeId = searchParams.typeId as string;
  const manuId = searchParams.manuId as string;
  const modelId = searchParams.modelId as string;

  const { data: enginesList, isLoading, isFetching, isRefetching } = useQuery<ModelTypeResponseType | null>({
    queryKey: ["engines", modelId],
    queryFn: async () => {
      const toastId = toast("Begins...");
      toast.loading("Loading...", { description: "loading engines...", id: toastId });

      try {
        const data = await listVehicleEngineTypes(Number(modelId), Number(typeId));
        toast.dismiss(toastId);

        if (data?.modelTypes) {
          toast.success("Success", { description: "Success list engines", id: toastId });
          return data;
        } else {
          toast.error("Failed", { description: JSON.stringify(data) });
          return null;
        }
      } catch (e) {
        toast.error("Error", { description: `${e}` });
        toast.dismiss(toastId);
        return null;
      }
    },
    staleTime: 1000 * 60 * 60 * 24 * 7, // 1 week
    gcTime: 1000 * 60 * 60 * 24 * 7,    // 1 week
  });

  if (isLoading || isFetching || isRefetching) return <div>loading...</div>;
  if (!enginesList?.modelTypes) return <div>no data found</div>;

  return (
    <section className="flex size-full">
      <div className="flex flex-col size-full gap-6">
        <h2 className="font-semibold">Total: {enginesList.countModelTypes}</h2>
        <ul className="flex flex-wrap gap-4">
          {enginesList.modelTypes.map((engine: ModelType) => (
            <Link
              href={`category?vehicleId=${engine.vehicleId}&manuId=${manuId}`}
              key={engine.vehicleId + engine.typeEngineName + engine?.engineCodes}
              className="w-48 h-48 flex flex-col items-center justify-center border rounded-lg p-4 hover:shadow-lg hover:scale-105 transition-all duration-200 ease-in-out gap-4"
            >
              <span className="font-semibold text-center">{engine.vehicleId}</span>
              <span className="font-semibold text-center">{engine.typeEngineName}</span>
              <span className="font-semibold text-center">{engine?.engineCodes}</span>
              <span className="font-semibold text-center">{engine.constructionIntervalStart}</span>
            </Link>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ModelList;
