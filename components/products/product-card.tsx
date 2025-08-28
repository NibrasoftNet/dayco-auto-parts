"use client";

import { memo } from "react";

import { CheckCircle, XCircle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Articles } from "@/types/articles.type";

interface ProductCardProps {
  article: Articles & { id: string };
  idx: number;
}

const ProductCard = memo(({ article, idx }: ProductCardProps) => {
  const inStock = article.stk && article.stk > 0;

  return (
    <Card
      key={`${article.id}-${idx}`}
      className="flex flex-col justify-between transition-shadow hover:shadow-lg"
    >
      <CardHeader>
        <CardTitle className="line-clamp-2 max-w-[200px]">
          {article.libf || "No Name"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-lg font-medium">Ref#: {article.cod}</p>
        <p>Price: {article.pvttc || 0} TND</p>
        <div className="pt-2">
          <Badge
            variant={inStock ? "success" : "destructive"}
            className="flex items-center gap-1"
          >
            {inStock ? (
              <>
                <CheckCircle className="h-4 w-4" />
                Disponible
              </>
            ) : (
              <>
                <XCircle className="h-4 w-4" />
                Hors Stock
              </>
            )}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
});

ProductCard.displayName = "ProductCard";

export default ProductCard;
