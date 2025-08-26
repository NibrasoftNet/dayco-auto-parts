"use client";
import { memo } from "react";
import { Articles } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ProductCardProps {
  article: Articles & { id: string };
  idx: number;
}

const ProductCard = memo(({ article, idx }: ProductCardProps) => (
  <Card
    key={`${article.id}-${idx}`}
    className="hover:shadow-lg transition-shadow"
  >
    <CardHeader>
      <CardTitle className="truncate max-w-[200px]">
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
