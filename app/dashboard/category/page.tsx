"use client";

import React from "react";
import type {
  CategoriesResponseType,
  CategoryNodeType,
} from "@/types/articles-category.type";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { articlesPartsCategoryV2Action } from "@/actions/parts-category.actions";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

const ArticlesCategoryPage = () => {
  const searchParams = useSearchParams();
  const vehicleId = searchParams.get("vehicleId");
  const manuId = searchParams.get("manuId");
  console.log("vehicleId, manuId", vehicleId, manuId);
  const {
    data: articlesCategoryResult,
    isFetching,
    isRefetching,
    isLoading,
    isPending,
  } = useQuery({
    queryFn: async () => {
      const toastId = toast("Begins...");
      toast.loading("Loading...", {
        description: "List categories...",
        id: toastId,
      });
      try {
        const data: CategoriesResponseType =
          await articlesPartsCategoryV2Action(
            Number(vehicleId),
            Number(manuId),
            1,
          );
        toast.dismiss(toastId);
        if (data && data.categories) {
          toast.success("Success", {
            description: "List Success",
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
    queryKey: ["group-articles", vehicleId, manuId],
    placeholderData: keepPreviousData,
    retryOnMount: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchInterval: false,
  });
  // Recursive function to render all levels
  const renderCategoryTree = (category: CategoryNodeType, level = 0) => {
    const hasChildren =
      category.children && Object.values(category.children).length > 0;

    return (
      <li key={category.categoryId} className={`pl-${level * 4}`}>
        {hasChildren ? (
          <>
            <span className="font-medium">{category.categoryName}</span>
            <ul className="mt-1 space-y-1">
              {Object.values(category.children!).map((child) =>
                renderCategoryTree(child, level + 1),
              )}
            </ul>
          </>
        ) : (
          <Link
            href={`article?vehicleId=${vehicleId}&manuId=${manuId}&categoryId=${category.categoryId}`}
            className="text-blue-600 hover:underline"
          >
            {category.categoryName} (ID: {category.categoryId})
          </Link>
        )}
      </li>
    );
  };
  return (
    <div>
      <div className="flex flex-col gap-1">
        <span className="font-normal underline">Category</span>
        <h1 className="text-4xl font-semibold">Articles Category</h1>
      </div>
      {isLoading || isFetching || isPending || isRefetching ? (
        <div>Loading...</div>
      ) : (
        <ul className="flex size-full mt-4">
          {articlesCategoryResult ? (
            <Accordion type="single" collapsible className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.values(articlesCategoryResult.categories).map(
                (category) => (
                  <AccordionItem
                    key={category.categoryId}
                    value={`cat-${category.categoryId}`}
                    className="col-span-1"
                  >
                    <AccordionTrigger>{category.categoryName}</AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-1">
                        {renderCategoryTree(category)}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ),
              )}
            </Accordion>
          ) : (
            <p className="text-sm text-muted-foreground">
              No categories found.
            </p>
          )}
        </ul>
      )}
    </div>
  );
};

export default ArticlesCategoryPage;
