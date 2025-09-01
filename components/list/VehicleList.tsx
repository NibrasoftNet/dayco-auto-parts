"use client";

import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { fetchManufacturersAction } from "@/actions/vehicles.actions";
import {
  VehicleListType,
  VehicleManufacturerType,
} from "@/types/vehicles.type";
import Link from "next/link";
import Image from "next/image";
import { getManufacturerProperty } from "@/lib/methods";

const VehicleList = ({ typeId }: VehicleListType) => {
  const [search, setSearch] = useState("");

  const {
    data: vehicleListResult,
    isFetching,
    isRefetching,
    isLoading,
  } = useQuery({
    queryKey: ["manufacturers", typeId],
    queryFn: async () => {
      const toastId = toast("Begins...");
      toast.loading("Loading...", {
        description: "loading vehicles...",
        id: toastId,
      });
      try {
        const data: VehicleManufacturerType =
          await fetchManufacturersAction(typeId);
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

  // Case-insensitive filter (similar to ILIKE)
  const filteredManufacturers = useMemo(() => {
    if (!vehicleListResult?.manufacturers) return [];
    return vehicleListResult.manufacturers.filter((manu) =>
      manu.brand.toLowerCase().includes(search.toLowerCase())
    );
  }, [vehicleListResult, search]);

  return (
    <section className="flex flex-col size-full gap-4">
      {isFetching || isRefetching || isLoading ? (
        <div>loading...</div>
      ) : vehicleListResult && vehicleListResult.manufacturers ? (
        <div className="flex flex-col size-full gap-6">
          <h2 className="font-semibold">
            Total: {filteredManufacturers.length} /{" "}
            {vehicleListResult.countManufactures}
          </h2>

          {/* 🔍 Search input */}
          <input
            type="text"
            placeholder="Search by brand..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-lg p-2 w-full md:w-1/2"
          />

          <ul className="flex flex-wrap gap-4">
            {filteredManufacturers.length > 0 ? (
              filteredManufacturers.map((manu) => (
                <Link
                  href={`models?typeId=${1}&manuId=${manu.manufacturerId}`}
                  key={manu.manufacturerId}
                  className="w-48 h-48 flex flex-col items-center justify-center border rounded-lg p-4 hover:shadow-lg hover:scale-105 transition-all duration-200 ease-in-out gap-4"
                >
                  <Image
                    src={
                      (getManufacturerProperty(
                        typeId,
                        manu.manufacturerId,
                        "imageURL"
                      ) as string) || "/manufacturers/MANUFACTURER.png"
                    }
                    alt="manufacturer"
                    width={100}
                    height={100}
                    className="rounded-md object-contain"
                  />
                  <span className="font-semibold text-center">{manu.brand}</span>
                  <span className="font-semibold text-center">
                    {manu.manufacturerId}
                  </span>
                </Link>
              ))
            ) : (
              <div>No manufacturers found</div>
            )}
          </ul>
        </div>
      ) : (
        <div>no data found</div>
      )}
    </section>
  );
};

export default VehicleList;