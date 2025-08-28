// lib/articles.ts
import { db, withSyntheticId } from "@/lib/db";
import { Articles } from "@/types/articles.type";

// Server-side only
export async function getLastArticles(
  limit = 100
): Promise<(Articles & { id: string })[]> {
  const rawArticles = await db.$queryRaw<Articles[]>`
    SELECT TOP(${limit}) *
    FROM articles
    WHERE cod IS NOT NULL
    ORDER BY iann DESC
  `;

  return withSyntheticId(rawArticles, ["cod", "reffrn", "codebar"]);
}
