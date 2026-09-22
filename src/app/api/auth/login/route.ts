import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { comparePassword, setSessionCookie } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const { emailOrPhone, password, requiredRole } = await req.json();

    if (!emailOrPhone || !password) {
      return NextResponse.json(
        { error: "Please enter your email/mobile and password" },
        { status: 400 }
      );
    }

    const term = emailOrPhone.toLowerCase().trim();

    // Find user by email or phone
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: term },
          { phone: term }
        ]
      }
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials. Please check your details." },
        { status: 401 }
      );
    }

    // Role check if explicit login portal (e.g. Admin portal requiring ADMIN role)
    if (requiredRole && user.role !== requiredRole) {
      return NextResponse.json(
        { error: `Access denied. Account is not registered as an ${requiredRole}.` },
        { status: 403 }
      );
    }

    const isValid = await comparePassword(password, user.passwordHash);
    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid credentials. Please check your password." },
        { status: 401 }
      );
    }

    // Create session cookie
    await setSessionCookie({
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role as "CITIZEN" | "ADMIN",
    });

    return NextResponse.json({
      message: "Logged in successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error: any) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error during authentication" },
      { status: 500 }
    );
  }
}
