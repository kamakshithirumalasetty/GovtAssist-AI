import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      role: true,
      dateOfBirth: true,
      gender: true,
      address: true,
      state: true,
      district: true,
      pincode: true,
      createdAt: true,
    }
  });

  if (!user) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  return NextResponse.json({ user });
}
