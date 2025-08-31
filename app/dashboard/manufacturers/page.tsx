import { Car, Package, Search } from "lucide-react";

// ISR revalidate every 1 week
export const revalidate = 604_800; // 604800 seconds = 1 week

import VehicleList from "@/components/list/VehicleList";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { fetchManufacturersAction } from "@/actions/vehicles.actions";

export default async function ManufacturerPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["manufacturers", 1],
    queryFn: () => fetchManufacturersAction(1),
    staleTime: 1000 * 60 * 60 * 24 * 7, // 1 week in ms
    gcTime: 1000 * 60 * 60 * 24 * 7, // 1 week in ms
  });

  await queryClient.prefetchQuery({
    queryKey: ["manufacturers", 2],
    queryFn: () => fetchManufacturersAction(2),
    staleTime: 1000 * 60 * 60 * 24 * 7, // 1 week in ms
    gcTime: 1000 * 60 * 60 * 24 * 7, // 1 week in msh
  });

  await queryClient.prefetchQuery({
    queryKey: ["manufacturers", 3],
    queryFn: () => fetchManufacturersAction(3),
    staleTime: 1000 * 60 * 60 * 24 * 7, // 1 week in ms
    gcTime: 1000 * 60 * 60 * 24 * 7, // 1 week in ms
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Card>
        <CardHeader>
          <CardTitle className="font-serif font-black">
            Find Your Vehicles
          </CardTitle>
          <CardDescription>
            Choose your vehicle type for the most accurate results
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="auto" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="auto" className="flex items-center space-x-2">
                <Car className="w-4 h-4" />
                <span>Automobile</span>
              </TabsTrigger>
              <TabsTrigger value="comm" className="flex items-center space-x-2">
                <Package className="w-4 h-4" />
                <span>Commercial</span>
              </TabsTrigger>
              <TabsTrigger
                value="moto"
                className="flex items-center space-x-2"
              >
                <Search className="w-4 h-4" />
                <span>Moto</span>
              </TabsTrigger>
            </TabsList>
            {/* VIN Search */}
            <TabsContent value="auto" className="space-y-4">
              <VehicleList typeId={1} />
            </TabsContent>
            {/* Part Number Search */}
            <TabsContent value="comm" className="space-y-4">
              <VehicleList typeId={2} />
            </TabsContent>
            {/* Vehicle Search */}
            <TabsContent value="moto" className="space-y-4">
              <VehicleList typeId={3} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </HydrationBoundary>
  );
}
