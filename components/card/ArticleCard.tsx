import React from 'react';
import Image from "next/image";
import ArticleDetailsModal from "@/components/modals/ArticleDetailModals";
import {Button} from "@/components/ui/button";
import {ShoppingCart} from "lucide-react";
import type {ArticleDetailType} from "@/types/articles.type";

const ArticleCard = ({article}: {article: ArticleDetailType }) => {
    return (
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
    );
};

export default ArticleCard;