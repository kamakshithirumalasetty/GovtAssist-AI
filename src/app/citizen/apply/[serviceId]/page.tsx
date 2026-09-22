import React from "react";
import { notFound, redirect } from "next/navigation";
import { getServiceById } from "@/config/services";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { DynamicApplicationForm } from "@/components/applications/DynamicApplicationForm";

export default async function ApplyServicePage({ params }: { params: { serviceId: string } }) {
  const session = await getSession();
  if (!session) {
    redirect(`/citizen/login?from=/citizen/apply/${params.serviceId}`);
  }

  const service = getServiceById(params.serviceId);
  if (!service) {
    notFound();
  }

  const user = await prisma.user.findUnique({
    where: { id: session.userId }
  });

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6">
      <DynamicApplicationForm service={service} prefillUser={user} />
    </div>
  );
}
