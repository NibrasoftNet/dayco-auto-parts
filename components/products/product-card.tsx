"use client";

import { memo, useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { Eye, Loader2, X } from "lucide-react";
import { toast } from "sonner";

import { singleArticleCompleteDetailsAction } from "@/actions/articles.actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArticleDetailType, Articles } from "@/types/articles.type";

import ProductDetailsModal from "../modals/ProductDetailModals";

interface ProductCardProps {
  article: Articles & { id: string };
  idx: number;
}

const ProductCard = memo(({ article, idx }: ProductCardProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [articleDetails, setArticleDetails] =
    useState<ArticleDetailType | null>(null);

  const {
    data: partNumberSearchResult,
    isFetching,
    refetch,
  } = useQuery({
    queryFn: async () => {
      const toastId = toast("Begins...");
      toast.loading("Loading...", {
        description: "Fetching details...",
        id: toastId,
      });
      try {
        const data = await singleArticleCompleteDetailsAction(article.cod!);
        toast.dismiss(toastId);
        if (data)
          toast.success("Success", {
            description: "Details loaded",
            id: toastId,
          });
        if (data?.articles && data?.articles.length > 0) {
          setArticleDetails(data.articles[0]);
        }
        return data;
      } catch (e) {
        toast.error("Error fetching details", {
          description: `${e}`,
          id: toastId,
        });
        toast.dismiss(toastId);
        return null;
      }
    },
    queryKey: ["part-number", article.cod],
    enabled: false, // DO NOT fetch automatically
    retry: 1,
  });
  console.log("🚀 ~ partNumberSearchResult:", partNumberSearchResult);

  const handleViewDetails = async () => {
    setModalOpen(true); // open modal immediately
    await refetch(); // trigger the query on demand
  };

  return (
    <>
      <Card className="flex flex-col justify-between transition-shadow hover:shadow-lg">
        <CardHeader>
          <CardTitle className="line-clamp-2 max-w-[200px]">
            {article.libf || "No Name"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-lg font-medium">Ref#: {article.cod}</p>
          <p>Price: {article.pvttc || 0} TND</p>
          {modalOpen ? (
            <>
              {articleDetails ? (
                <ProductDetailsModal
                  article={articleDetails}
                  loading={isFetching}
                />
              ) : (
                <>
                  {isFetching ? (
                    <div className="flex w-full cursor-pointer justify-center rounded-md bg-black p-2 text-white dark:bg-white dark:text-black">
                      <Loader2 className="mr-2 size-4 animate-spin" />
                      <span className="text-sm font-medium">Loading...</span>
                    </div>
                  ) : (
                    <div className="flex w-full cursor-pointer justify-center rounded-md bg-red-300 p-2 text-red-500 dark:bg-red-700 dark:text-red-200">
                      <X className="mr-2 size-4" />
                      <span className="text-sm font-medium">
                        No details found
                      </span>
                    </div>
                  )}
                </>
              )}
            </>
          ) : (
            <button
              onClick={handleViewDetails}
              className="flex w-full cursor-pointer justify-center rounded-md bg-black p-2 text-white dark:bg-white dark:text-black"
            >
              <Eye className="mr-2 size-4" />
              <span className="text-sm font-medium">
                {" "}
                {isFetching ? "Loading..." : "See More..."}
              </span>
            </button>
          )}
        </CardContent>
      </Card>
    </>
  );
});

ProductCard.displayName = "ProductCard";
export default ProductCard;
