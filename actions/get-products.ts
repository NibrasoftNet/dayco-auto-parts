
 
import { db, withSyntheticId } from "@/lib/db";
import { ArticleDB } from "@/types/articles.type";

// Server-side only
export async function getProducts(
  query: string,
  page = 1,
  pageSize = 20
): Promise<(ArticleDB & { id: string })[]> {
  const offset = (page - 1) * pageSize;

  const rawProducts = await db.$queryRaw<ArticleDB[]>`
    SELECT *
    FROM articles
    WHERE cod LIKE ${"%" + query + "%"}
       OR reffrn LIKE ${"%" + query + "%"}
       OR codebar LIKE ${"%" + query + "%"}
    ORDER BY iann DESC
    OFFSET ${offset} ROWS
    FETCH NEXT ${pageSize} ROWS ONLY
  `;

  return withSyntheticId(rawProducts, ["cod", "reffrn", "codebar"]);
}


// Server-side only
export async function getProductDetails(
  partRef: string,
  partYear?: string
): Promise<(ArticleDB & { id: string }) | null> {
  try {
    const result = await db.$queryRaw<ArticleDB[]>`
      SELECT *
      FROM articles
      WHERE cod = ${partRef}
        AND iann = ${partYear ? partYear : ""}
    `;

    if (!result || result.length === 0) {
      return null;
    }

    return {
      ...result[0],
      id: `${result[0].cod}-${result[0].iann}`, // synthetic unique id
    };
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

