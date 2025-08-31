"use client";

import React, { useState } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { vehicleDecodeAction } from "@/actions/vin-decoder.actions";
import VehicleCard from "@/components/card/VehicleCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { VehicleDecodeResponseType } from "@/types/vehicle-decode.type";

const VinSearch = () => {
  const [vin, setVin] = useState<string>("");
  const queryClient = useQueryClient();

  const {
    data: vinSearchResult,
    isPending,
    mutateAsync,
  } = useMutation({
    mutationKey: ["vehicle-decode", vin],
    mutationFn: async () => {
      // ✅ check cache first
      const cached = queryClient.getQueryData(["vehicle-decode", vin]);
      if (cached) {
        console.log("using cached data for", vin);
        return cached; // skip API call
      }
      const result = await vehicleDecodeAction(vin);
      // ✅ store in cache
      queryClient.setQueryData(["vehicle-decode", vin], result);
      return result;
    },
    onSuccess: (searchResult: VehicleDecodeResponseType) => {
      console.log("res", searchResult);
      if (searchResult.status === 200) {
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
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    onError: (error: any) => {
      toast.error("Error", {
        description: `${error}`,
      });
    },
  });
  const handleVinInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVin(e.target.value.toUpperCase());
  };
  const handleVinSearch = async () => {
    if (vin.length === 17) {
      await mutateAsync();
    } else {
      toast.error("Failed", {
        description: "VIN must be 17 characters long",
      });
    }
  };
  return (
    <section className="flex size-full flex-col items-center gap-4">
      <div className="flex w-full flex-col gap-4">
        <div>
          <Label htmlFor="vin">Vehicle Identification Number (VIN)</Label>
          <Input
            id="vin"
            value={vin}
            onChange={handleVinInputChange}
            placeholder="Enter 17-digit VIN (e.g., 1HGBH41JXMN109186)"
            className="mt-1"
            maxLength={17}
          />
          <p className="text-muted-foreground mt-1 text-xs">
            VIN provides the most accurate part compatibility results
          </p>
        </div>
        <Button
          onClick={() => handleVinSearch()}
          disabled={isPending || vin.length !== 17}
          className="w-full cursor-pointer"
        >
          {isPending ? "Searching..." : "Search by VIN"}
        </Button>
      </div>
      {/* Search Results */}
      {isPending ? (
        <div>Loading...</div>
      ) : vinSearchResult && vinSearchResult.data ? (
        <div className="flex size-full flex-col items-center">
          <VehicleCard details={vinSearchResult} />
        </div>
      ) : (
        <div>no data available</div>
      )}
    </section>
  );
};

export default VinSearch;
