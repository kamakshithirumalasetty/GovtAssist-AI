import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getSession();
  const searchId = params.id;

  // Find by DB id OR applicationNumber
  const application = await prisma.application.findFirst({
    where: {
      OR: [
        { id: searchId },
        { applicationNumber: searchId.toUpperCase() }
      ]
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          dateOfBirth: true,
          gender: true,
          address: true,
          state: true,
          district: true,
          pincode: true,
        }
      },
      service: true,
      documents: true,
      adminActions: {
        include: {
          admin: { select: { name: true } }
        },
        orderBy: { createdAt: "desc" }
      }
    }
  });

  if (!application) {
    return NextResponse.json({ error: "Application not found" }, { status: 404 });
  }

  // Security: Check role authorization
  if (session && session.role === "CITIZEN" && application.userId !== session.userId) {
    return NextResponse.json({ error: "Unauthorized to access this application" }, { status: 403 });
  }

  return NextResponse.json({ application });
}
