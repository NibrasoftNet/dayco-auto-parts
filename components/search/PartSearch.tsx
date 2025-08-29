/* eslint-disable @typescript-eslint/no-explicit-any */
import type React from "react";
import { useState } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { singleArticleCompleteDetailsAction } from "@/actions/articles.actions";
import ArticleCard from "@/components/card/ArticleCard";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type {
  ArticleDetailType,
  ArticleDetailsResponse,
} from "@/types/articles.type";

const PartSearch = () => {
  const [articleNo, setArticleNo] = useState<string>("");
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
      const result = await singleArticleCompleteDetailsAction(articleNo, 1);
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
