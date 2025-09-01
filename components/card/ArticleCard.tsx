import Image from "next/image";

import { ShoppingCart } from "lucide-react";

import ArticleDetailsModal from "@/components/modals/ArticleDetailModals";
import { Button } from "@/components/ui/button";
import type { ArticleDB, ArticleDetailType } from "@/types/articles.type";

import ProductDetailsModal from "../modals/ProductDetailModals";

// Normalized UI type
type ArticleUI = {
  id: string;
  reference: string | null;
  year?: number | null;
  supplierName: string | null;
  supplierId: string | null;
  image: string;
  raw: ArticleDetailType | (ArticleDB & { id: string });
};

// Step 2: Adapters
const fromApi = (article: ArticleDetailType): ArticleUI => ({
  id: (article.articleId ?? "").toString(),
  reference: article.articleNo,
  supplierName: article.supplierName,
  supplierId: (article.supplierId ?? "").toString(),
  image: article.imageLink || article.imageMedia || "/parts/PART.png",
  raw: article,
});

const fromDb = (article: ArticleDB & { id: string }): ArticleUI => ({
  id: article.id,
  reference: article.cod ?? "", // "Code article"
  supplierName: article.nfrn ?? "", // "Nom fournisseur"
  supplierId: article.frn ?? "", // "Code fournisseur"
  image: article.codimg // Maybe the image code (likely mapped to an asset path)?
    ? `/images/articles/${article.codimg}.png`
    : "/parts/PART.png",
  raw: article,
  year: article.iann ?? null,
});

// Step 3: Unified Card Component
const ArticleCard = ({
  article,
  type,
}: {
  article: ArticleDetailType | (ArticleDB & { id: string });
  type: "api" | "db";
}) => {
  const normalized: ArticleUI =
    type === "api"
      ? fromApi(article as ArticleDetailType)
      : fromDb(article as ArticleDB & { id: string });
  console.log(
    "🚀 ~ ArticleCard ~ key:",
    type === "api" ? normalized.id : normalized.id + normalized.year
  );
  const key =
    type === "api"
      ? normalized.id
      : normalized.id + normalized.year + Date.now();

  return (
    <li
      key={key}
      className="flex flex-col items-center justify-between rounded-lg border border-gray-800 p-2 shadow-xl md:flex-row"
    >
      <article className="flex flex-col items-start gap-2 md:flex-row">
        <Image
          src={normalized.image}
          width={50}
          height={50}
          alt="article-image"
          className="col-span-1 hidden md:block"
          unoptimized
        />
        <ul className="flex flex-col">
          <ol>
            <span className="font-semibold">Reference:</span>&nbsp;
            {normalized.reference}
          </ol>
          <ol>
            <span className="font-semibold">Supplier:</span>&nbsp;
            {normalized.supplierName}
          </ol>
          <ol>
            <span className="font-semibold">Sup Id:</span>&nbsp;
            {normalized.supplierId}
          </ol>
        </ul>
      </article>
      <div className="flex items-center justify-center gap-4">
        {type === "api" ? (
          <ArticleDetailsModal article={normalized.raw as ArticleDetailType} />
        ) : (
          normalized.reference && (
            <ProductDetailsModal
              partRef={normalized.reference}
              partYear={normalized.year ?? 2025}
            />
          )
        )}
        {type === "db" && (
          <Button size="sm" disabled={false}>
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
        )}
      </div>
    </li>
  );
};

export default ArticleCard;
