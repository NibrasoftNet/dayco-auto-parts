 
import { db, withSyntheticId } from "@/lib/db";
import { Client } from "@/types";

export async function getClients(page = 1, pageSize = 20): Promise<(Client & {
    id: string;
})[]> {
  const offset = (page - 1) * pageSize;

  // Use SQL Server pagination with OFFSET/FETCH
  const rawClients = await db.$queryRaw<Client[]>`
    SELECT * FROM client
    ORDER BY iann DESC
    OFFSET ${offset} ROWS
    FETCH NEXT ${pageSize} ROWS ONLY
  `;

  const clients = withSyntheticId(rawClients, ["ste", "iann", "codecli"]);
  
  return clients;
}
