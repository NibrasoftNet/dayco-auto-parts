"use client";

import { memo } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Articles } from "@/types/articles.type";

interface ProductCardProps {
  article: Articles & { id: string };
  idx: number;
}

const ProductCard = memo(({ article, idx }: ProductCardProps) => (
  <Card
    key={`${article.id}-${idx}`}
    className="transition-shadow hover:shadow-lg"
  >
    <CardHeader>
      <CardTitle className="max-w-[200px] truncate">
        {article.libf || "No Name"}
      </CardTitle>
    </CardHeader>
    <CardContent>
      <p>Part#: {article.cod}</p>
      <p>Ref: {article.reffrn}</p>
      <p>Stock: {article.stk || 0}</p>
      <p>Price: {article.pvttc || 0} €</p>
    </CardContent>
  </Card>
));

ProductCard.displayName = "ProductCard";

export default ProductCard;
