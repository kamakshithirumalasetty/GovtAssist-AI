import React from "react";
import { clsx } from "clsx";

interface BadgeProps {
  status: "SUBMITTED" | "UNDER_REVIEW" | "APPROVED" | "REJECTED" | "DRAFT" | string;
  className?: string;
}

export function StatusBadge({ status, className }: BadgeProps) {
  let colorStyle = "bg-slate-100 text-slate-700 border-slate-300";
  let label = status;

  switch (status) {
    case "APPROVED":
      colorStyle = "bg-emerald-50 text-emerald-700 border-emerald-200 ring-emerald-500/10";
      label = "Approved";
      break;
    case "REJECTED":
      colorStyle = "bg-rose-50 text-rose-700 border-rose-200 ring-rose-500/10";
      label = "Rejected";
      break;
    case "UNDER_REVIEW":
      colorStyle = "bg-amber-50 text-amber-700 border-amber-200 ring-amber-500/10";
      label = "Under Review";
      break;
    case "SUBMITTED":
      colorStyle = "bg-sky-50 text-sky-700 border-sky-200 ring-sky-500/10";
      label = "Submitted";
      break;
    case "DRAFT":
      colorStyle = "bg-slate-100 text-slate-600 border-slate-200";
      label = "Draft";
      break;
    default:
      break;
  }

  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border shadow-xs transition-colors",
        colorStyle,
        className
      )}
    >
      <span
        className={clsx(
          "w-1.5 h-1.5 rounded-full",
          status === "APPROVED" && "bg-emerald-500",
          status === "REJECTED" && "bg-rose-500",
          status === "UNDER_REVIEW" && "bg-amber-500 animate-pulse",
          status === "SUBMITTED" && "bg-sky-500",
          status === "DRAFT" && "bg-slate-400"
        )}
      />
      {label}
    </span>
  );
}
