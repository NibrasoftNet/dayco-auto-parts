
 
import { db, withSyntheticId } from "@/lib/db";
import { Articles } from "@/types";

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
    ORDER BY cod ASC
    OFFSET ${offset} ROWS
    FETCH NEXT ${pageSize} ROWS ONLY
  `;

  return withSyntheticId(rawProducts, ["cod", "reffrn", "codebar"]);
}
