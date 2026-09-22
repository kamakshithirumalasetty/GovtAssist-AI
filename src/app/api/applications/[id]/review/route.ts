import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { AdminReviewSchema } from "@/lib/validation";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getSession();

  // Strict Admin Role Check
  if (!session || session.role !== "ADMIN") {
    return NextResponse.json(
      { error: "Access denied. Admin authorization required." },
      { status: 403 }
    );
  }

  try {
    const body = await req.json();
    const result = AdminReviewSchema.safeParse({
      applicationId: params.id,
      action: body.action,
      rejectionReason: body.rejectionReason,
    });

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.errors[0]?.message || "Invalid review data" },
        { status: 400 }
      );
    }

    const { action, rejectionReason } = result.data;

    const application = await prisma.application.findUnique({
      where: { id: params.id },
      include: { service: true, user: true }
    });

    if (!application) {
      return NextResponse.json({ error: "Application not found" }, { status: 404 });
    }

    const newStatus = action === "APPROVED" ? "APPROVED" : "REJECTED";

    // Update Application status
    const updatedApplication = await prisma.application.update({
      where: { id: params.id },
      data: {
        status: newStatus,
        rejectionReason: action === "REJECTED" ? rejectionReason : null,
        reviewedAt: new Date(),
      },
    });

    // Record Audit Trail
    await prisma.adminAction.create({
      data: {
        applicationId: application.id,
        adminId: session.userId,
        action: action,
        reason: action === "REJECTED" ? rejectionReason : "Approved by administrator.",
        createdAt: new Date()
      }
    });

    // Notify Citizen
    const notifTitle = action === "APPROVED" ? "Application Approved 🎉" : "Application Rejected ❌";
    const notifMessage = action === "APPROVED"
      ? `Your application ${application.applicationNumber} for ${application.service.name} has been APPROVED.`
      : `Your application ${application.applicationNumber} for ${application.service.name} was REJECTED. Reason: ${rejectionReason}`;

    await prisma.notification.create({
      data: {
        userId: application.userId,
        title: notifTitle,
        message: notifMessage,
      }
    });

    return NextResponse.json({
      message: `Application has been ${newStatus.toLowerCase()} successfully.`,
      application: updatedApplication
    });
  } catch (error: any) {
    console.error("Admin review error:", error);
    return NextResponse.json(
      { error: "Failed to process admin review action" },
      { status: 500 }
    );
  }
}
