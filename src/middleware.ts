import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decryptSession } from "@/lib/jwt";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("govtassist_session")?.value;

  const session = token ? await decryptSession(token) : null;

  // 1. Citizen Protected Routes
  if (pathname.startsWith("/citizen")) {
    if (pathname === "/citizen/login" || pathname === "/citizen/register") {
      if (session) {
        return NextResponse.redirect(new URL("/citizen/dashboard", request.url));
      }
      return NextResponse.next();
    }

    if (!session) {
      const loginUrl = new URL("/citizen/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // 2. Admin Protected Routes
  if (pathname.startsWith("/admin")) {
    if (pathname === "/admin/login") {
      if (session && session.role === "ADMIN") {
        return NextResponse.redirect(new URL("/admin/dashboard", request.url));
      }
      return NextResponse.next();
    }

    if (!session || session.role !== "ADMIN") {
      const adminLoginUrl = new URL("/admin/login", request.url);
      return NextResponse.redirect(adminLoginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/citizen/:path*", "/admin/:path*"],
};
