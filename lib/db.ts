import { PrismaClient } from "../generated/prisma";


declare global {
  var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = db;
}

// Synthetic ID helper
export function withSyntheticId<T>(
  data: T[],
  keys: (keyof T)[]
): (T & { id: string })[] {
  return data.map(item => ({
    ...item,
    id: keys.map(k => (item[k] !== null && item[k] !== undefined ? item[k] : "")).join("-")
  }));
}