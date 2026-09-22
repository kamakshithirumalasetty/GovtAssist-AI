import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { ProfileUpdateSchema } from "@/lib/validation";

export async function PUT(req: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const result = ProfileUpdateSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.errors[0]?.message || "Invalid profile data" },
        { status: 400 }
      );
    }

    const data = result.data;

    const updatedUser = await prisma.user.update({
      where: { id: session.userId },
      data: {
        name: data.fullName,
        phone: data.phone,
        dateOfBirth: data.dob,
        gender: data.gender,
        address: data.address,
        state: data.state,
        district: data.district,
        pincode: data.pincode,
      },
    });

    return NextResponse.json({
      message: "Profile updated successfully",
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        role: updatedUser.role,
        address: updatedUser.address,
      },
    });
  } catch (error: any) {
    console.error("Profile update error:", error);
    return NextResponse.json(
      { error: "Failed to update profile details" },
      { status: 500 }
    );
  }
}
