
 
import { db, withSyntheticId } from "@/lib/db";
import { Articles } from "@/types/articles.type";

// Server-side only
export async function getProducts(
  query: string,
  page = 1,
  pageSize = 20
): Promise<(Articles & { id: string })[]> {
  const offset = (page - 1) * pageSize;

  const rawProducts = await db.$queryRaw<Articles[]>`
    SELECT *
    FROM articles
    WHERE cod LIKE ${"%" + query + "%"}
       OR reffrn LIKE ${"%" + query + "%"}
       OR codebar LIKE ${"%" + query + "%"}
    ORDER BY iann ASC
    OFFSET ${offset} ROWS
    FETCH NEXT ${pageSize} ROWS ONLY
  `;

  return withSyntheticId(rawProducts, ["cod", "reffrn", "codebar"]);
}
