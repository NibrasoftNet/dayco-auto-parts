import Image from "next/image";

import { ShoppingCart } from "lucide-react";

import ArticleDetailsModal from "@/components/modals/ArticleDetailModals";
import { Button } from "@/components/ui/button";
import type { ArticleDetailType } from "@/types/articles.type";

const ArticleCard = ({ article }: { article: ArticleDetailType }) => {
  return (
    <li
      key={article.articleId}
      className="flex flex-col items-center justify-between rounded-lg border border-gray-800 p-2 shadow-xl md:flex-row"
    >
      <article className="flex flex-col items-start gap-2 md:flex-row">
        <Image
          src={article.imageLink || article.imageMedia || article.s3ImageLink}
          width={50}
          height={50}
          alt="article-image"
          className="col-span-1 hidden md:block"
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
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </div>
    </li>
  );
};

export default ArticleCard;
