/* eslint-disable @typescript-eslint/no-explicit-any */
import type React from "react";
import { useState } from "react";



import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Bike, Bus, Car, Tractor, Truck } from "lucide-react";
import { toast } from "sonner";



import { singleArticleCompleteDetailsAction } from "@/actions/articles.actions";
import ArticleCard from "@/components/card/ArticleCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { ArticleDetailType, ArticleDetailsResponse } from "@/types/articles.type";
import { VehiclesType } from "@/utils/constants/constants";





// optional: map values to icons
const vehicleIcons: Record<string, React.ReactNode> = {
  AUTOMOBILE: <Car className="size-10 text-black" />,
  COMMERCIAL: <Truck className="size-10 text-black" />,
  MOTO: <Bike className="size-10 text-black" />,
  LCV: <Truck className="size-10 text-black" />,
  DriverCab: <Car className="size-10 text-black" />,
  Bus: <Bus className="size-10 text-black" />,
  Tractor: <Tractor className="size-10 text-black" />,
};

const PartSearch = () => {
  const [articleNo, setArticleNo] = useState<string>("");
  const [selectedId, setSelectedId] = useState<number>(1);

  const queryClient = useQueryClient();

  const {
    data: partNumberSearchResult,
    isPending,
    mutateAsync,
  } = useMutation({
    mutationKey: ["part-number", articleNo],
    mutationFn: async () => {
      // ✅ check cache first
      const cached = queryClient.getQueryData(["part-number", articleNo]);
      if (cached) {
        console.log("using cached data for", articleNo);
        return cached; // skip API call
      }
      const result = await singleArticleCompleteDetailsAction(articleNo, selectedId);
      // ✅ store in cache
      queryClient.setQueryData(["part-number", articleNo], result);
      return result;
    },
    onSuccess: (searchResult: ArticleDetailsResponse) => {
      console.log("res", searchResult);
      if (searchResult && searchResult.articles) {
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
    onError: (error: any) => {
      toast.error("Error", {
        description: `${error}`,
      });
    },
  });
  const handleArticleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("vvv", e.target.value);
    setArticleNo(e.target.value.toUpperCase());
  };
  const handleArticleSearch = async () => {
    if (articleNo.length > 3) {
      await mutateAsync();
    } else {
      toast.error("Failed", {
        description: "Search term must be at least 4 characters long",
      });
    }
  };

  const handleChange = (value: string) => {
    const selected = VehiclesType.find((v) => v.value === value);
    if (selected) {
      setSelectedId(selected.id);
      console.log("Selected ID:", selected.id); // ✅ use this for fetch
    }
  };

  return (
    <section className="flex size-full flex-col gap-4">
      <div className="space-y-4">
        <div>
          <Label htmlFor="part-number">Part Number</Label>
          <Input
            id="part-number"
            value={articleNo}
            onChange={handleArticleInputChange}
            placeholder="Enter manufacturer part number (e.g., 45022-S5A-000)"
            className="mt-1"
          />
          <p className="text-muted-foreground mt-1 text-xs">
            Search using OEM or aftermarket part numbers
          </p>
        </div>
        <RadioGroup
          defaultValue={VehiclesType[0].value}
          onValueChange={handleChange}
          className="mt-1 flex flex-wrap gap-4"
        >
          {VehiclesType.map((vehicle) => (
            <div
              key={vehicle.id}
              className="flex items-center space-x-3"
            >
              <RadioGroupItem value={vehicle.value} id={`vehicle-${vehicle.id}`} />
              <Label
                htmlFor={`vehicle-${vehicle.id}`}
                className="flex cursor-pointer items-center space-x-2"
              >
                {vehicleIcons[vehicle.value] ?? (
                  <Car className="size-10 text-gray-500" />
                )}
                <span>{vehicle.value}</span>
              </Label>
            </div>
          ))}
        </RadioGroup>
        <Button
          onClick={() => handleArticleSearch()}
          disabled={isPending || articleNo.length < 3}
          className="w-full cursor-pointer"
        >
          {isPending ? "Searching..." : "Search by Number"}
        </Button>
      </div>
      {/* Search Results */}
      {isPending ? (
        <div>Loading...</div>
      ) : partNumberSearchResult ? (
        <div className="flex size-full flex-col items-center gap-4">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>
                Search Result:&nbsp;{partNumberSearchResult.articleNo}
              </CardTitle>
              <CardDescription>
                Total Found&nbsp;{partNumberSearchResult.countArticles}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex size-full flex-col gap-4">
              {partNumberSearchResult?.articles &&
                partNumberSearchResult?.articles.length &&
                partNumberSearchResult.articles.map(
                  (article: ArticleDetailType) => (
                    <ArticleCard article={article} key={article.articleId} />
                  )
                )}
            </CardContent>
          </Card>
        </div>
      ) : (
        <div>no data available</div>
      )}
    </section>
  );
};

export default PartSearch;
