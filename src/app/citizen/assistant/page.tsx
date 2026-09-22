"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Chatbot } from "@/components/chatbot/Chatbot";
import { Bot } from "lucide-react";

function AssistantContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || undefined;
  return <Chatbot initialServiceQuery={query} />;
}

export default function AssistantPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <Bot className="w-7 h-7 text-blue-600" />
            Government AI Virtual Assistant
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Ask questions about any of our 30 digital government services, check requirements, or get direct application links.
          </p>
        </div>
      </div>

      <Suspense fallback={<div className="p-8 text-center text-xs text-slate-500">Loading Assistant...</div>}>
        <AssistantContent />
      </Suspense>
    </div>
  );
}
