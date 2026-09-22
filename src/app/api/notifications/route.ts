import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ notifications: [] });
  }

  const notifications = await prisma.notification.findMany({
    where: { userId: session.userId },
    orderBy: { createdAt: "desc" },
    take: 20
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  return NextResponse.json({ notifications, unreadCount });
}

export async function PUT(req: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { notificationId } = await req.json();

  if (notificationId) {
    await prisma.notification.update({
      where: { id: notificationId },
      data: { read: true }
    });
  } else {
    // Mark all as read
    await prisma.notification.updateMany({
      where: { userId: session.userId, read: false },
      data: { read: true }
    });
  }

  return NextResponse.json({ message: "Notifications marked as read" });
}
