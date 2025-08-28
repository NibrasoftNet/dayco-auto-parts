import { getArticles } from "@/actions/get-articles";
import { getLastArticles } from "@/actions/get-last-articles";
import ProductList from "@/components/products/product-list";
import { Articles } from "@/types/articles.type";

export default async function ArticlesPage() {
  const initialArticles: (Articles & { id: string })[] = await getArticles(
    1,
    20
  );
  const lastArticles = await getLastArticles();
  console.log("🚀 ~ ArticlesPage ~ initialArticles:", initialArticles);
  console.log("🚀 ~ ArticlesPage ~ lastArticles:", lastArticles);

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-2xl font-bold">Products</h1>
      <span>
        <pre>{JSON.stringify(lastArticles, null, 2)}</pre>
      </span>
      <ProductList initialArticles={initialArticles} />
    </div>
  );
}
