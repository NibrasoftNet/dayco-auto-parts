"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useParams } from "next/navigation";
import React from "react";
import { toast } from "sonner";
import { searchByOemNumberAction } from "@/actions/oem.actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getSupplierProperty } from "@/lib/methods";
import type { OemArticleListType, OemArticleType } from "@/types/oem.type";

const OemArticleListDetailsPage = () => {
  const params = useParams<{ oemNumber: string }>();
  console.log("params", params);
  const {
    data: partNumberSearchResult,
    isFetching,
    isRefetching,
    isLoading,
  } = useQuery({
    queryFn: async () => {
      const toastId = toast("Begins...");
      toast.loading("Loading...", {
        description: "Create Community...",
        id: toastId,
      });
      try {
        const data: OemArticleListType = await searchByOemNumberAction(
          params.oemNumber,
        );
        toast.dismiss(toastId);
        if (data && data.length) {
          toast.success("Success", {
            description: "Extraction Success",
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
    queryKey: ["part-number", params.oemNumber],
    placeholderData: keepPreviousData,
    retryOnMount: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchInterval: false,
  });
  return (
    <section>
      {/* Search Results */}
      {isLoading || isFetching || isRefetching ? (
        <div>Loading...</div>
      ) : partNumberSearchResult ? (
        <div className="flex flex-col size-full items-center gap-4 overflow-auto">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Search Result</CardTitle>
              <CardDescription>
                Total Found&nbsp;{partNumberSearchResult.length}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col size-full gap-4">
              {partNumberSearchResult?.length &&
                partNumberSearchResult.map(
                  (article: OemArticleType, index: number) => (
                    <li
                      // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                      key={index}
                      className="border border-gray-800 rounded-lg shadow-xl p-2 flex flex-col md:flex-row items-center justify-between"
                    >
                      <article className="flex flex-col md:flex-row gap-2 items-start">
                        <Image
                          src={article.imageLink || article.imageMedia || article.s3ImageLink || article.s3image ||"/parts/PART.png"}
                          width={50}
                          height={50}
                          alt="Articele Image"
                          className="hidden md:block col-span-1"
                          unoptimized
                        />
                        <ul className="flex flex-col">
                          <ol>
                            <span className="font-semibold">Reference:</span>
                            &nbsp;
                            {article.articleNo}
                          </ol>
                          <ol>
                            <span className="font-semibold">Supplier:</span>
                            &nbsp;
                            {article.supplierName}
                          </ol>
                          <ol>
                            <span className="font-semibold">Sup Id:</span>&nbsp;
                            {article.supplierId}
                          </ol>
                        </ul>
                      </article>
                      <Image
                        src={
                          getSupplierProperty(
                            String(article.supplierId),
                            "supLogoURL",
                          ) || "/suppliers/SUPPLIER.svg"
                        }
                        alt={article.supplierName}
                        width={100}
                        height={100}
                        className="rounded-md object-contain"
                      />
                    </li>
                  ),
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

export default OemArticleListDetailsPage;
