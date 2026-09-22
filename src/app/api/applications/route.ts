import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getServiceById } from "@/config/services";

function generateApplicationNumber(): string {
  const year = new Date().getFullYear();
  const randomNum = Math.floor(100000 + Math.random() * 900000);
  return `GOV-${year}-${randomNum}`;
}

export async function GET(req: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");
  const serviceId = searchParams.get("serviceId");
  const search = searchParams.get("search");

  // Build filter condition
  const where: any = {};

  if (session.role === "CITIZEN") {
    where.userId = session.userId;
  }

  if (status && status !== "ALL") {
    where.status = status;
  }

  if (serviceId) {
    where.serviceId = serviceId;
  }

  if (search) {
    where.OR = [
      { applicationNumber: { contains: search } },
      { service: { name: { contains: search } } },
      { user: { name: { contains: search } } }
    ];
  }

  const applications = await prisma.application.findMany({
    where,
    include: {
      user: {
        select: { id: true, name: true, email: true, phone: true }
      },
      service: {
        select: { id: true, name: true, category: true, icon: true }
      },
      documents: true,
      adminActions: {
        include: {
          admin: { select: { name: true } }
        },
        orderBy: { createdAt: "desc" }
      }
    },
    orderBy: { submittedAt: "desc" }
  });

  return NextResponse.json({ applications });
}

export async function POST(req: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized. Please log in to apply." }, { status: 401 });
  }

  try {
    const { serviceId, formData, documents } = await req.json();

    if (!serviceId || !formData) {
      return NextResponse.json({ error: "Service ID and form data are required." }, { status: 400 });
    }

    const service = getServiceById(serviceId);
    if (!service) {
      return NextResponse.json({ error: "Invalid Service ID" }, { status: 400 });
    }

    // Ensure application number uniqueness
    let appNumber = generateApplicationNumber();
    let isUnique = false;
    while (!isUnique) {
      const existing = await prisma.application.findUnique({
        where: { applicationNumber: appNumber }
      });
      if (!existing) {
        isUnique = true;
      } else {
        appNumber = generateApplicationNumber();
      }
    }

    // Create Application record with documents in transaction
    const application = await prisma.application.create({
      data: {
        applicationNumber: appNumber,
        userId: session.userId,
        serviceId: service.id,
        status: "SUBMITTED",
        formData: typeof formData === "string" ? formData : JSON.stringify(formData),
        submittedAt: new Date(),
        documents: {
          create: Array.isArray(documents)
            ? documents.map((doc: any) => ({
                documentType: doc.documentType || "Supporting Document",
                fileName: doc.fileName || "document.pdf",
                fileUrl: doc.fileUrl || "/demo/sample_document.pdf",
              }))
            : []
        }
      },
      include: {
        service: true,
        documents: true
      }
    });

    // Create notification for citizen
    await prisma.notification.create({
      data: {
        userId: session.userId,
        title: "Application Submitted",
        message: `Your application for ${service.name} (${appNumber}) has been submitted successfully. Track your application status anytime from your dashboard.`
      }
    });

    // Notify admins
    const adminUsers = await prisma.user.findMany({ where: { role: "ADMIN" } });
    for (const admin of adminUsers) {
      await prisma.notification.create({
        data: {
          userId: admin.id,
          title: "New Application Received",
          message: `New application (${appNumber}) for ${service.name} received from ${session.name}.`
        }
      });
    }

    return NextResponse.json({
      message: "Application submitted successfully.",
      applicationId: application.id,
      applicationNumber: application.applicationNumber,
      serviceName: service.name,
      status: application.status,
      submittedAt: application.submittedAt
    });
  } catch (error: any) {
    console.error("Application submission error:", error);
    return NextResponse.json(
      { error: "Failed to submit application. Please try again." },
      { status: 500 }
    );
  }
}
