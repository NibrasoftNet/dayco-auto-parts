"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { serialize } from "@/lib/serializers";
import { Articles } from "@/types/articles.type";

import ProductCard from "./product-card";
import ProductCardSkeleton from "./product-card-skeleton";

interface ProductListProps {
  initialArticles: (Articles & { id: string })[];
}

export default function ProductList({ initialArticles }: ProductListProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);
  const [articles, setArticles] = useState(initialArticles);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(initialArticles.length === 20);

  const abortRef = useRef<AbortController | null>(null);
  const pageSize = 20;

  // Fetch products
  const fetchProducts = useCallback(
    async (q: string, p: number, replace = false) => {
      // Abort previous request if still pending
      if (abortRef.current) abortRef.current.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const res = await fetch(
          `/api/products?q=${encodeURIComponent(q)}&page=${p}&pageSize=${pageSize}`,
          { signal: controller.signal }
        );
        if (!res.ok) throw new Error("Failed to fetch products");

        const data = (await res.json()) as (Articles & { id: string })[];
        setArticles((prev) => (replace ? data : [...prev, ...data]));
        setHasMore(data.length === pageSize);
        return data;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        if (err.name === "AbortError") return [];
        throw err;
      }
    },
    []
  );

  // Handle search
  const handleSearch = useCallback(
    async (e?: React.FormEvent) => {
      if (e) e.preventDefault();
      setLoading(true);
      setPage(1);

      const newUrl = query ? serialize({ q: query }) : "";
      router.replace(newUrl ? `${newUrl}` : "/dashboard/products");

      try {
        await fetchProducts(query, 1, true);
      } finally {
        setLoading(false);
      }
    },
    [query, fetchProducts, router]
  );

  // Load more
  const loadMore = useCallback(async () => {
    setLoadingMore(true);
    const nextPage = page + 1;
    try {
      await fetchProducts(query, nextPage);
      setPage(nextPage);
    } finally {
      setLoadingMore(false);
    }
  }, [page, query, fetchProducts]);

  // Initial load on mount (URL query)
  useEffect(() => {
    const urlQuery = searchParams.get("q") || "";
    setQuery(urlQuery);
    setPage(1);
    setLoading(true);

    fetchProducts(urlQuery, 1, true).finally(() => setLoading(false));
  }, []); // only on mount

  // Clear search
  const clearSearch = useCallback(() => {
    setQuery(""); // clear input
    setPage(1); // reset pagination
    setLoading(true);

    // Remove `q` from URL
    router.replace("/dashboard/products"); // now URL has no query

    fetchProducts("", 1, true) // fetch all products
      .finally(() => setLoading(false));
  }, [fetchProducts, router]);

  return (
    <>
      {/* Search Form */}

      <form onSubmit={handleSearch} className="relative mb-6 flex gap-2">
        <div className="relative flex-1">
          <Input
            placeholder="Search by Ref#"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pr-10"
          />
          {query && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-gray-700"
              aria-label="Clear search"
            >
              <X size={18} />
            </button>
          )}
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </Button>
      </form>

      {/* Product Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {articles.map((article, idx) => (
          <ProductCard
            key={`${article.id}-${idx}`}
            article={article}
            idx={idx}
          />
        ))}

        {loadingMore &&
          Array.from({ length: pageSize }).map((_, idx) => (
            <ProductCardSkeleton key={`skeleton-${idx}`} />
          ))}
      </div>

      {/* Load More */}
      {hasMore && !loading && (
        <div className="mt-6 flex justify-center">
          <Button onClick={loadMore} disabled={loadingMore}>
            {loadingMore ? "Loading..." : "Load More"}
          </Button>
        </div>
      )}

      {/* Empty State */}
      {!loading && articles.length === 0 && (
        <div className="mt-8 text-center text-gray-500">No products found.</div>
      )}
    </>
  );
}
