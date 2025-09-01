// lib/articles.ts
import { db, withSyntheticId } from "@/lib/db";
import { ArticleDB } from "@/types/articles.type";

// Server-side only
export async function getLastArticles(
  limit = 100
): Promise<(ArticleDB & { id: string })[]> {
  const rawArticles = await db.$queryRaw<ArticleDB[]>`
    SELECT TOP(${limit}) *
    FROM articles
    WHERE cod IS NOT NULL
    ORDER BY iann DESC
  `;

  return withSyntheticId(rawArticles, ["cod", "reffrn", "codebar"]);
}
