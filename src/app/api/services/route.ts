import { NextResponse } from "next/server";
import { searchServices, SERVICES_CONFIG } from "@/config/services";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query") || "";
  const category = searchParams.get("category") || "";

  const results = searchServices(query, category);

  return NextResponse.json({
    services: results,
    total: results.length,
    categories: Array.from(new Set(SERVICES_CONFIG.map(s => s.category)))
  });
}
