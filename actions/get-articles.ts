 

import { db, withSyntheticId } from "@/lib/db";
import { ArticleDB } from "@/types/articles.type";

export async function getArticles(page = 1, pageSize = 20): Promise<(ArticleDB & {
    id: string;
})[]> {
  const offset = (page - 1) * pageSize;

  // Use SQL Server pagination with OFFSET/FETCH
  const rawArticles = await db.$queryRaw<ArticleDB[]>`
    SELECT * FROM articles
    ORDER BY iann
    OFFSET ${offset} ROWS
    FETCH NEXT ${pageSize} ROWS ONLY
  `;

  const articles = withSyntheticId(rawArticles, ["ste", "iann", "cod"]);

  return articles;
}
