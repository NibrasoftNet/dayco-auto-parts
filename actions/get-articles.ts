 

import { db, withSyntheticId } from "@/lib/db";
import { Articles } from "@/types";

export async function getArticles(page = 1, pageSize = 20): Promise<(Articles & {
    id: string;
})[]> {
  const offset = (page - 1) * pageSize;

  // Use SQL Server pagination with OFFSET/FETCH
  const rawArticles = await db.$queryRaw<Articles[]>`
    SELECT * FROM articles
    ORDER BY iann
    OFFSET ${offset} ROWS
    FETCH NEXT ${pageSize} ROWS ONLY
  `;

  const articles = withSyntheticId(rawArticles, ["ste", "iann", "cod"]);

  return articles;
}
