import { NextResponse } from "next/server";
import { getServiceById } from "@/config/services";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const service = getServiceById(params.id);
  if (!service) {
    return NextResponse.json({ error: "Service not found" }, { status: 404 });
  }

  return NextResponse.json({ service });
}
