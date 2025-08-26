"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import React from "react";
import { toast } from "sonner";
import { singleArticleCompleteDetailsAction } from "@/actions/articles.actions";
import ArticleDetailsModal from "@/components/modals/ArticleDetailModals";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type {
  ArticleDetailsResponse,
  ArticleDetailType,
} from "@/types/articles.type";

const ArticleListDetailsPage = () => {
  const params = useParams<{ articleId: string }>();
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
        const data: ArticleDetailsResponse =
          await singleArticleCompleteDetailsAction(params.articleId);
        toast.dismiss(toastId);
        if (data && data.articles) {
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
    queryKey: ["part-number", params.articleId],
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
        <div className="flex flex-col size-full items-center gap-4">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>
                Search Result:&nbsp;{partNumberSearchResult.articleNo}
              </CardTitle>
              <CardDescription>
                Total Found&nbsp;{partNumberSearchResult.countArticles}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col size-full gap-4">
              {partNumberSearchResult?.articles.length &&
                partNumberSearchResult.articles.map(
                  (article: ArticleDetailType) => (
                    <li
                      key={article.articleId}
                      className="border border-gray-800 rounded-lg shadow-xl p-2 flex flex-col md:flex-row items-center justify-between"
                    >
                      <article className="flex flex-col md:flex-row gap-2 items-start">
                        <Image
                          src={article.s3ImageLink}
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
                      <div className="flex gap-4">
                        <ArticleDetailsModal article={article} />
                        <Button size="sm" disabled={false}>
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Add to Cart
                        </Button>
                      </div>
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

export default ArticleListDetailsPage;
