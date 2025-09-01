import { getArticles } from "@/actions/get-articles";
import ProductList from "@/components/products/product-list";
import { ArticleDB } from "@/types/articles.type";

export default async function ArticlesPage() {
  const initialArticles: (ArticleDB & { id: string })[] = await getArticles(
    1,
    20
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-2xl font-bold">Products</h1>
      <ProductList initialArticles={initialArticles} />
    </div>
  );
}
