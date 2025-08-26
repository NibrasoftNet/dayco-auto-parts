"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Articles } from "@/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { serialize } from "@/lib/serializers";
import ProductCardSkeleton from "./product-card-skeleton";
import ProductCard from "./product-card";

interface ProductListProps {
  initialArticles: (Articles & { id: string })[];
}

export default function ProductList({ initialArticles }: ProductListProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialQuery = searchParams.get("q") || "";
  const initialPage = parseInt(searchParams.get("page") || "1", 10);

  const [query, setQuery] = useState(initialQuery);
  const [articles, setArticles] = useState(initialArticles);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(initialPage);
  const pageSize = 20;
  const [hasMore, setHasMore] = useState(initialArticles.length === pageSize);

  async function fetchProducts(q: string, p: number) {
    const res = await fetch(
      `/api/products?q=${encodeURIComponent(q)}&page=${p}&pageSize=${pageSize}`
    );
    if (!res.ok) throw new Error("Failed to fetch products");
    return res.json() as Promise<(Articles & { id: string })[]>;
  }

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setPage(1);

    const newUrl = serialize({ q: query, page: 1 });
    router.replace(`?${newUrl}`);

    const results = await fetchProducts(query, 1);
    setArticles(results);
    setHasMore(results.length === pageSize);
    setLoading(false);
  }

  async function loadMore() {
    const nextPage = page + 1;
    setLoadingMore(true);

    const results = await fetchProducts(query, nextPage);
    setArticles((prev) => [...prev, ...results]);
    setPage(nextPage);
    setHasMore(results.length === pageSize);

    const newUrl = serialize({ q: query, page: nextPage });
    router.replace(`?${newUrl}`);

    setLoadingMore(false);
  }

  // Optional: Update state if URL params change
  useEffect(() => {
    async function loadFromUrl() {
      const q = searchParams.get("q") || "";
      const p = parseInt(searchParams.get("page") || "1", 10);
      if (q !== query || p !== page) {
        setQuery(q);
        setPage(p);
        setLoading(true);
        const results = await fetchProducts(q, p);
        setArticles(results);
        setHasMore(results.length === pageSize);
        setLoading(false);
      }
    }
    loadFromUrl();
  }, [searchParams.toString()]);

  return (
    <>
      {/* Search Form */}
      <form onSubmit={handleSearch} className="flex gap-2 mb-6">
        <Input
          placeholder="Search by Part#"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1"
        />
        <Button type="submit" disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </Button>
      </form>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {articles.map((article, idx) => (
          <ProductCard
            key={`${article.id}-${idx}`}
            article={article}
            idx={idx}
          />
        ))}

        {/* Inline Skeletons for "Load More" */}
        {loadingMore &&
          Array.from({ length: pageSize }).map((_, idx) => (
            <ProductCardSkeleton key={`skeleton-${idx}`} />
          ))}
      </div>

      {/* Load More Button */}
      {hasMore && !loading && (
        <div className="flex justify-center mt-6">
          <Button onClick={loadMore} disabled={loadingMore}>
            {loadingMore ? "Loading..." : "Load More"}
          </Button>
        </div>
      )}

      {/* Empty state */}
      {!loading && articles.length === 0 && (
        <div className="text-center mt-8 text-gray-500">No products found.</div>
      )}
    </>
  );
}
