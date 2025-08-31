// components/ModelsPage.tsx (Client Component)
"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import type { VehicleModelTypeResponseType } from "@/types/model-vehicles.type";
import { fetchModelsAction } from "@/actions/vehicles.actions";
import Link from "next/link";

const ModelList = ({ searchParams }: { searchParams: { typeId: string; manuId: string } }) => {
  const manuId = searchParams.manuId as string;
  const typeId = searchParams.typeId as string;

  const { data: modelsList, isLoading, isFetching, isRefetching } = useQuery<VehicleModelTypeResponseType | null>({
    queryKey: ["models", manuId],
    queryFn: async () => {
      const toastId = toast("Begins...");
      toast.loading("Loading...", { description: "loading automobiles...", id: toastId });

      try {
        const data = await fetchModelsAction(Number(manuId), Number(typeId));
        toast.dismiss(toastId);

        if (data?.models) {
          toast.success("Success", { description: "Success list automobiles", id: toastId });
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
  if (!modelsList?.models) return <div>no data found</div>;

  return (
    <section className="flex size-full">
      <div className="flex flex-col size-full gap-6">
        <h2 className="font-semibold">Total: {modelsList.countModels}</h2>
        <ul className="flex flex-wrap gap-4">
          {modelsList.models.map((model) => (
            <Link
              href={`engines?typeId=${typeId}&manuId=${manuId}&modelId=${model.modelId}`}
              key={model.modelId}
              className="w-48 h-48 flex flex-col items-center justify-center border rounded-lg p-4 hover:shadow-lg hover:scale-105 transition-all duration-200 ease-in-out gap-4"
            >
              <span className="font-semibold text-center">{model.modelId}</span>
              <span className="font-semibold text-center">{model.modelName}</span>
              <span className="font-semibold text-center">{model.modelYearFrom}</span>
              <span className="font-semibold text-center">{model.modelYearTo}</span>
            </Link>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ModelList;
