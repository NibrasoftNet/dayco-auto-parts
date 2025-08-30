"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { fetchManufacturersAction } from "@/actions/vehicles.actions";
import type { VehicleManufacturerType } from "@/types/vehicles.type";
import Link from "next/link";
import Image from "next/image";
import { getManufacturerProperty } from "@/lib/methods";

const AutomobileList = () => {
  const {
    data: automobileListResult,
    isFetching,
    isRefetching,
    isLoading,
  } = useQuery({
    queryKey: ["manufacturers", 1],
    queryFn: async () => {
      const toastId = toast("Begins...");
      toast.loading("Loading...", {
        description: "loading automobiles...",
        id: toastId,
      });
      try {
        const data: VehicleManufacturerType =
          await fetchManufacturersAction(1);
        toast.dismiss(toastId);
        if (data && data.manufacturers) {
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
        isLoading ? <div>loading...</div> : automobileListResult && automobileListResult.manufacturers ? (
          <div className="flex flex-col size-full gap-6">
            <h2 className="font-semibold">Total: {automobileListResult.countManufactures}</h2>
            <ul className="flex flex-wrap gap-4">
              {
                automobileListResult.manufacturers.map((manu) => (
                    <Link href={'#'} key={manu.manufacturerId} className="w-48 h-48 flex flex-col items-center justify-center border rounded-lg p-4 hover:shadow-lg hover:scale-105 transition-all duration-200 ease-in-out gap-4">
                      <Image
                        src={
                          (getManufacturerProperty(1, manu.manufacturerId, "imageURL") as string) ||
                          "/manufacturers/MANUFACTURER.png"
                        }
                        alt='manufacturer'
                        width={100}
                        height={100}
                        className="rounded-md object-contain"
                      />
                      <span className="font-semibold text-center">{manu.brand}</span>
                      <span className="font-semibold text-center">{manu.manufacturerId}</span>
                    </Link>
                  )
                )}
            </ul>
          </div>
      ) : (<div>no data found</div>)}
    </section>
  );
};

export default AutomobileList;