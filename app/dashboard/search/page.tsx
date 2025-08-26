"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Package, Car } from "lucide-react";
import VinSearch from "@/components/search/VinSearch";
import PartSearch from "@/components/search/PartSearch";
import VehicleSearch from "@/components/search/VehicleSearch";

export default function SearchPage() {
  return (
    <section className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-serif font-black text-3xl text-foreground">
          Search Parts
        </h1>
        <p className="text-muted-foreground">
          Find compatible auto parts using VIN, part number, or vehicle details
        </p>
      </div>

      {/* Search Tabs */}
      <Card>
        <CardHeader>
          <CardTitle className="font-serif font-black">
            Find Your Parts
          </CardTitle>
          <CardDescription>
            Choose your preferred search method for the most accurate results
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="vin" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="vin" className="flex items-center space-x-2">
                <Car className="w-4 h-4" />
                <span>VIN Search</span>
              </TabsTrigger>
              <TabsTrigger value="part" className="flex items-center space-x-2">
                <Package className="w-4 h-4" />
                <span>Part Number</span>
              </TabsTrigger>
              <TabsTrigger
                value="vehicle"
                className="flex items-center space-x-2"
              >
                <Search className="w-4 h-4" />
                <span>Vehicle Search</span>
              </TabsTrigger>
            </TabsList>
            {/* VIN Search */}
            <TabsContent value="vin" className="space-y-4">
              <VinSearch />
            </TabsContent>
            {/* Part Number Search */}
            <TabsContent value="part" className="space-y-4">
              <PartSearch />
            </TabsContent>
            {/* Vehicle Search */}
            <TabsContent value="vehicle" className="space-y-4">
              <VehicleSearch />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </section>
  );
}
