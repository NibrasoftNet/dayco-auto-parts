"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import Image from "next/image";

import type {
  ArticleType,
  VehicleArticlesResponseType,
} from "@/types/articles.type";
import { listGroupedArticlesAction } from "@/actions/articles.actions";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

const ArticlePage = () => {
  const searchParams = useSearchParams();
  const vehicleId = searchParams.get("vehicleId") as string;
  const manuId = searchParams.get("manuId") as string;
  const categoryId = searchParams.get("categoryId") as string;
  console.log("vehicleId, manuId", vehicleId, manuId, categoryId);

  const {
    data: listArticlesResult,
    isFetching,
    isRefetching,
    isLoading,
  } = useQuery({
    queryKey: ["list-articles", vehicleId, manuId, categoryId],
    queryFn: async () => {
      const toastId = toast("Begins...");
      toast.loading("Loading...", {
        description: "Create Community...",
        id: toastId,
      });
      try {
        const data: VehicleArticlesResponseType =
          await listGroupedArticlesAction(
            Number(vehicleId),
            Number(categoryId),
            1,
          );
        toast.dismiss(toastId);
        if (data && data.vehicleId) {
          toast.success("Success", {
            description: "Creation Success",
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
    placeholderData: keepPreviousData,
    retryOnMount: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchInterval: false,
  });

  return (
    <div className="flex flex-col size-full p-4">
      <h1 className="text-2xl">Articles List</h1>
      {isLoading || isFetching || isRefetching ? (
        <div>Loading...</div>
      ) : listArticlesResult ? (
        <div className="size-full flex flex-col items-center gap-8">
          <div className="flex gap-2 items-center w-full justify-start">
            <h2 className="text-4xl font-bold">Search Result:</h2>
            <span className="text-4xl font-bold">
              {listArticlesResult?.countArticles}
            </span>
          </div>
          <ul className="flex flex-col size-full gap-4">
            {listArticlesResult?.articles.length &&
              listArticlesResult.articles.map((article: ArticleType) => (
                <li
                  key={article.articleId}
                  className="border border-gray-800 rounded-lg shadow-xl p-2 flex flex-col md:flex-row items-center justify-between"
                >
                  <article className="flex flex-col md:flex-row gap-2 items-start">
                    <Image
                      src={article.imageLink || article.imageMedia || article.s3ImageLink}
                      width={50}
                      height={50}
                      alt="Articele Image"
                      className="hidden md:block col-span-1"
                      unoptimized
                    />
                    <ul className="flex flex-col">
                      <ol>
                        <span className="font-semibold">Reference:</span>&nbsp;
                        {article.articleNo}
                      </ol>
                      <ol>
                        <span className="font-semibold">Supplier:</span>&nbsp;
                        {article.supplierName}
                      </ol>
                      <ol>
                        <span className="font-semibold">Sup Id:</span>&nbsp;
                        {article.supplierId}
                      </ol>
                    </ul>
                  </article>
                  <Link
                    href={`article/details/${article.articleNo}`}
                    className="px-4 py-1 rounded-xl justify-center cursor-pointer hover:underline flex items-center gap-1 bg-black hover:bg-gray-700 text-white"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    <span>Details</span>
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      ) : (
        <div>No data available</div>
      )}
    </div>
  );
};

export default ArticlePage;
