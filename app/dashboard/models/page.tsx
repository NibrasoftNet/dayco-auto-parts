"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { fetchModelsAction } from "@/actions/vehicles.actions";
import type { VehicleModelTypeResponseType } from "@/types/model-vehicles.type";
import Link from "next/link";

const ModelsPage = () => {
  const searchParams = useSearchParams();
  const typeId = searchParams.get("typeId") as string;
  const manuId = searchParams.get("manuId") as string;
  console.log("vehicleId, manuId", manuId);
  const {
    data: modelsList,
    isFetching,
    isRefetching,
    isLoading,
  } = useQuery({
    queryKey: ["models", manuId],
    queryFn: async () => {
      const toastId = toast("Begins...");
      toast.loading("Loading...", {
        description: "loading automobiles...",
        id: toastId,
      });
      try {
        const data: VehicleModelTypeResponseType =
          await fetchModelsAction(Number(manuId), Number(typeId));
        toast.dismiss(toastId);
        if (data && data.models) {
          toast.success("Success", {
            description: "Success list automobiles",
            id: toastId,
          });
          return data;
        } else {
          toast.error("Failed", {
            description: JSON.stringify(data),
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
  });
  return (
    <section className="flex size-full">
      {
        isFetching ||
        isRefetching ||
        isLoading ? <div>loading...</div> : modelsList && modelsList.models ? (
          <div className="flex flex-col size-full gap-6">
            <h2 className="font-semibold">Total: {modelsList.countModels}</h2>
            <ul className="flex flex-wrap gap-4">
              {
                modelsList.models.map((model) => (
                    <Link href={'#'} key={model.modelId} className="w-48 h-48 flex flex-col items-center justify-center border rounded-lg p-4 hover:shadow-lg hover:scale-105 transition-all duration-200 ease-in-out gap-4">
                      <span className="font-semibold text-center">{model.modelName}</span>
                      <span className="font-semibold text-center">{model.modelYearTo}</span>
                      <span className="font-semibold text-center">{model.modelYearTo}</span>
                    </Link>
                  )
                )}
            </ul>
          </div>
        ) : (<div>no data found</div>)}
    </section>
  );
};

export default ModelsPage;