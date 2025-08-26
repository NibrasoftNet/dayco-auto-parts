import { getArticles } from "@/actions/get-articles";
import ProductList from "@/components/products/product-list";
import { Articles } from "@/types";

export default async function ArticlesPage() {
  const initialArticles: (Articles & { id: string })[] = await getArticles(
    1,
    20
  );
  console.log("🚀 ~ ArticlesPage ~ initialArticles:", initialArticles);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Products</h1>
      <ProductList initialArticles={initialArticles} />
    </div>
  );
}
