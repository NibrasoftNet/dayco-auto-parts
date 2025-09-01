"use client";

import { memo } from "react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Articles } from "@/types/articles.type";

import ProductDetailsModal from "../modals/ProductDetailModals";
import { Badge } from "../ui/badge";

interface ProductCardProps {
  article: Articles & { id: string };
  idx: number;
}

const ProductCard = memo(({ article }: ProductCardProps) => {
  const partRef = String(article.cod ?? "");
  const partYear = Number(article.iann ?? 0);

  return (
    <Card className="flex flex-col justify-between transition-shadow hover:shadow-lg">
      <CardHeader>
        {/* Stock Badge */}
        <Badge
          variant={article?.stk && article.stk > 0 ? "success" : "destructive"}
        >
          {article?.stk && article.stk > 0 ? "Disponible" : "Hors Stock"}
        </Badge>
        <CardTitle className="line-clamp-2 max-w-[200px]">
          {article.libf || "No Name"}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-2">
        <p className="text-lg font-medium">Ref#: {partRef || "—"}</p>
        <p>Price: {article.pvttc ?? 0} TND</p>
      </CardContent>
      <CardFooter className="flex w-full items-end justify-end">
        {/* The modal renders its own trigger button and handles fetching */}

        <ProductDetailsModal partRef={partRef} partYear={partYear} />
      </CardFooter>
    </Card>
  );
});

ProductCard.displayName = "ProductCard";
export default ProductCard;
