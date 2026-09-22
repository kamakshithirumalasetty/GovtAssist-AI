import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { hashPassword } from "@/lib/auth";
import { CitizenRegisterSchema } from "@/lib/validation";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validate fields with Zod
    const result = CitizenRegisterSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: result.error.errors[0]?.message || "Validation failed" },
        { status: 400 }
      );
    }

    const data = result.data;

    // Check duplicate email
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email.toLowerCase().trim() },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "An account with this email address already exists" },
        { status: 400 }
      );
    }

    const passwordHash = await hashPassword(data.password);

    const newUser = await prisma.user.create({
      data: {
        name: data.fullName,
        email: data.email.toLowerCase().trim(),
        phone: data.mobile,
        passwordHash: passwordHash,
        role: "CITIZEN",
        dateOfBirth: data.dob,
        gender: data.gender,
        address: data.address,
        state: data.state,
        district: data.district,
        pincode: data.pincode,
      },
    });

    return NextResponse.json({
      message: "Account created successfully.",
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error: any) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "An error occurred while creating your account. Please try again." },
      { status: 500 }
    );
  }
}
