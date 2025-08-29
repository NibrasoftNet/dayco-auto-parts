"use client";

import { Car, Package, Search } from "lucide-react";



import AutomobileList from "@/components/list/AutomobileList";
import CommercialList from "@/components/list/CommercialList";
import MotoList from "@/components/list/MotoList";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";





export default function ManufacturerPage() {
  return (
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
              <AutomobileList />
            </TabsContent>
            {/* Part Number Search */}
            <TabsContent value="comm" className="space-y-4">
              <CommercialList />
            </TabsContent>
            {/* Vehicle Search */}
            <TabsContent value="moto" className="space-y-4">
              <MotoList />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
  );
}
