/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

import { ExternalLink, ShoppingCart, Star } from "lucide-react";

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "@/components/ui/animated-modal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const VehicleSearch = () => {
  const [vehicleSearchResults, setVehicleSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (searchType: string, query: any) => {
    setIsSearching(true);
    // Simulate API call
    setTimeout(() => {
      setVehicleSearchResults([
        {
          id: 1,
          name: "Premium Brake Pad Set - Front",
          partNumber: "BP-2018-HC-F",
          brand: "AutoStop Pro",
          price: 89.99,
          rating: 4.8,
          reviews: 124,
          compatibility: "Honda Civic 2018-2021",
          inStock: true,
          image: "/parts/brake-pads-close-up.jpg",
        },
        {
          id: 2,
          name: "Ceramic Brake Pads - Front Axle",
          partNumber: "CBP-HC18-001",
          brand: "StopTech",
          price: 124.99,
          rating: 4.9,
          reviews: 89,
          compatibility: "Honda Civic 2018-2021",
          inStock: true,
          image: "/parts/ceramic-brake-pads.jpg",
        },
        {
          id: 3,
          name: "OEM Replacement Brake Pads",
          partNumber: "45022-S5A-000",
          brand: "Honda Genuine",
          price: 156.99,
          rating: 5.0,
          reviews: 67,
          compatibility: "Honda Civic 2018-2021",
          inStock: false,
          image: "/parts/pwr-16-1855_xe_xl.jpg",
        },
      ]);
      setIsSearching(false);
    }, 1500);
  };
  return (
    <section>
      <div className="flex w-full flex-col items-center">
        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
          <div className="col-span-1">
            <Label htmlFor="year">Year</Label>
            <Select>
              <SelectTrigger className="mt-1 w-full">
                <SelectValue placeholder="Select year" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 30 }, (_, i) => 2024 - i).map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="make">Make</Label>
            <Select>
              <SelectTrigger className="mt-1 w-full">
                <SelectValue placeholder="Select make" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="honda">Honda</SelectItem>
                <SelectItem value="toyota">Toyota</SelectItem>
                <SelectItem value="ford">Ford</SelectItem>
                <SelectItem value="chevrolet">Chevrolet</SelectItem>
                <SelectItem value="nissan">Nissan</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="model">Model</Label>
            <Select>
              <SelectTrigger className="mt-1 w-full">
                <SelectValue placeholder="Select model" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="civic">Civic</SelectItem>
                <SelectItem value="accord">Accord</SelectItem>
                <SelectItem value="crv">CR-V</SelectItem>
                <SelectItem value="pilot">Pilot</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="engine">Engine (Optional)</Label>
            <Select>
              <SelectTrigger className="mt-1 w-full">
                <SelectValue placeholder="Select engine" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1.5l">1.5L Turbo</SelectItem>
                <SelectItem value="2.0l">2.0L</SelectItem>
                <SelectItem value="2.4l">2.4L</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="mt-2 w-full">
          <Label htmlFor="part-type">Part Type</Label>
          <Select>
            <SelectTrigger className="mt-1 w-full">
              <SelectValue placeholder="What part are you looking for?" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="brake-pads">Brake Pads</SelectItem>
              <SelectItem value="oil-filter">Oil Filter</SelectItem>
              <SelectItem value="air-filter">Air Filter</SelectItem>
              <SelectItem value="spark-plugs">Spark Plugs</SelectItem>
              <SelectItem value="battery">Battery</SelectItem>
              <SelectItem value="alternator">Alternator</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button
          onClick={() => handleSearch("vehicle", {})}
          disabled={isSearching}
          className="mt-4 w-full"
        >
          {isSearching ? "Searching..." : "Search by Vehicle"}
        </Button>
      </div>
      {/* Search Results */}
      {vehicleSearchResults.length > 0 && (
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="font-serif font-black">
              Search Results
            </CardTitle>
            <CardDescription>
              Found {vehicleSearchResults.length} compatible parts for your
              vehicle
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {vehicleSearchResults.map((part) => (
                <div
                  key={part.id}
                  className="border-border flex items-center space-x-4 rounded-lg border p-4"
                >
                  <img
                    src={part.image || "/placeholder.svg"}
                    alt={part.name}
                    className="bg-muted h-20 w-20 rounded-md object-cover"
                  />
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-serif text-lg font-black">
                          {part.name}
                        </h3>
                        <p className="text-muted-foreground text-sm">
                          Part #: {part.partNumber}
                        </p>
                        <p className="text-muted-foreground text-sm">
                          Brand: {part.brand}
                        </p>
                        <p className="text-muted-foreground text-sm">
                          Fits: {part.compatibility}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-foreground font-serif text-2xl font-black">
                          ${part.price}
                        </p>
                        <div className="mt-1 flex items-center space-x-1">
                          <Star className="h-4 w-4 fill-current text-yellow-400" />
                          <span className="text-sm">{part.rating}</span>
                          <span className="text-muted-foreground text-sm">
                            ({part.reviews})
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {part.inStock ? (
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                            In Stock
                          </Badge>
                        ) : (
                          <Badge variant="secondary">Out of Stock</Badge>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center justify-center py-40">
                          <Modal>
                            <ModalTrigger className="group/modal-btn flex justify-center bg-black text-white dark:bg-white dark:text-black">
                              <span className="items center flex gap-4">
                                <ExternalLink className="mr-2 h-4 w-4" />
                                View Details
                              </span>
                            </ModalTrigger>
                            <ModalBody>
                              <ModalContent>
                                <h4 className="mb-8 text-center text-lg font-bold text-neutral-600 md:text-2xl dark:text-neutral-100">
                                  Book your trip to{" "}
                                  <span className="rounded-md border border-gray-200 bg-gray-100 px-1 py-0.5 dark:border-neutral-700 dark:bg-neutral-800">
                                    Bali
                                  </span>{" "}
                                  now! ✈️
                                </h4>
                                <div>Content</div>
                              </ModalContent>
                              <ModalFooter className="gap-4">
                                <span className="w-28 rounded-md border border-gray-300 bg-gray-200 px-2 py-1 text-sm text-black dark:border-black dark:bg-black dark:text-white">
                                  Cancel
                                </span>
                                <span className="w-28 rounded-md border border-black bg-black px-2 py-1 text-sm text-white dark:bg-white dark:text-black">
                                  Book Now
                                </span>
                              </ModalFooter>
                            </ModalBody>
                          </Modal>
                        </div>
                        <Button size="sm" disabled={!part.inStock}>
                          <ShoppingCart className="mr-2 h-4 w-4" />
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </section>
  );
};

export default VehicleSearch;
