// app/api/products/route.ts (Next.js 13+ API route)
import { NextRequest, NextResponse } from "next/server";
import { getProducts } from "@/actions/get-products";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q") || "";
  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = parseInt(searchParams.get("pageSize") || "20", 10);

  const products = await getProducts(query, page, pageSize);

  return NextResponse.json(products);
}
