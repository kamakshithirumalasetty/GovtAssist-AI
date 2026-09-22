"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Bot,
  Send,
  User,
  Sparkles,
  ArrowRight,
  FileCheck,
  Search,
  ExternalLink,
  ShieldCheck,
  RefreshCw,
  HelpCircle,
  FileText
} from "lucide-react";

export interface Message {
  id: string;
  sender: "user" | "assistant";
  text: string;
  timestamp: string;
  detectedService?: any;
  actionButtons?: any[];
  suggestedQuestions?: string[];
  isDemoDisclaimer?: boolean;
}

export function Chatbot({ initialServiceQuery }: { initialServiceQuery?: string }) {
  const router = useRouter();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome-1",
      sender: "assistant",
      text: "Hello! I’m your **AI Government Services Assistant**. I can help you discover government services, check eligibility & required documents, answer your questions, and guide you through online applications.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestedQuestions: [
        "How can I apply for a PAN Card?",
        "I need a new Aadhaar Card",
        "How do I renew my driving licence?",
        "Show me available government services",
        "Track my application"
      ]
    }
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  useEffect(() => {
    if (initialServiceQuery) {
      handleSendQuery(initialServiceQuery);
    }
  }, [initialServiceQuery]);

  const handleSendQuery = async (queryText?: string) => {
    const query = queryText || input;
    if (!query.trim() || loading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    if (!queryText) setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: query }),
      });

      if (res.ok) {
        const data = await res.json();
        const botMsg: Message = {
          id: (Date.now() + 1).toString(),
          sender: "assistant",
          text: data.text,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          detectedService: data.detectedService,
          actionButtons: data.actionButtons,
          suggestedQuestions: data.suggestedQuestions,
          isDemoDisclaimer: data.isDemoDisclaimer,
        };
        setMessages(prev => [...prev, botMsg]);
      } else {
        throw new Error("Chatbot API error");
      }
    } catch {
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "assistant",
          text: "I encountered a minor issue parsing your query. Please try selecting one of the suggested service questions below.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          suggestedQuestions: ["Show me all available services", "Track my application"]
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[700px] bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">

      {/* Chat Header */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 px-6 py-4 text-white flex items-center justify-between shrink-0 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600/60 border border-blue-400/30 flex items-center justify-center text-amber-300 shadow-inner">
            <Bot className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h2 className="font-bold text-base flex items-center gap-2">
              Government AI Assistant
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[10px] px-2 py-0.5 rounded-full font-semibold">
                Online
              </span>
            </h2>
            <p className="text-xs text-blue-200">
              Instant answers & dynamic application guidance for 30 services
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            setMessages([
              {
                id: "welcome-1",
                sender: "assistant",
                text: "Hello! I’m your **AI Government Services Assistant**. How can I help you today?",
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                suggestedQuestions: [
                  "How can I apply for a PAN Card?",
                  "I need a new Aadhaar Card",
                  "How do I renew my driving licence?",
                  "Show me available government services",
                  "Track my application"
                ]
              }
            ]);
          }}
          className="p-2 text-blue-200 hover:text-white hover:bg-blue-800/50 rounded-lg transition-colors text-xs flex items-center gap-1"
          title="Reset conversation"
        >
          <RefreshCw className="w-4 h-4" />
          <span className="hidden sm:inline">Reset</span>
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 bg-slate-50/50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${msg.sender === "user" ? "flex-row-reverse" : ""}`}
          >
            {/* Avatar */}
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-white font-bold text-xs ${
                msg.sender === "user"
                  ? "bg-slate-800"
                  : "bg-gradient-to-br from-blue-600 to-indigo-700"
              }`}
            >
              {msg.sender === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4 text-amber-300" />}
            </div>

            {/* Bubble */}
            <div className={`max-w-[85%] sm:max-w-[75%] space-y-3`}>
              <div
                className={`p-4 rounded-2xl text-sm leading-relaxed shadow-xs ${
                  msg.sender === "user"
                    ? "bg-blue-600 text-white rounded-tr-none font-medium"
                    : "bg-white border border-slate-200/90 text-slate-800 rounded-tl-none whitespace-pre-line"
                }`}
              >
                {msg.text}

                {/* Service Highlights Card */}
                {msg.detectedService && (
                  <div className="mt-3 pt-3 border-t border-slate-100 bg-blue-50/70 p-3.5 rounded-xl border border-blue-100 text-xs space-y-2">
                    <div className="flex items-center justify-between font-bold text-blue-900 text-sm">
                      <span>{msg.detectedService.name}</span>
                      <span className="bg-blue-200 text-blue-800 px-2 py-0.5 rounded text-[10px]">
                        {msg.detectedService.category}
                      </span>
                    </div>
                    <p className="text-slate-600">{msg.detectedService.description}</p>
                    <div className="flex items-center gap-4 text-slate-700 font-medium">
                      <span>⏱️ Est: {msg.detectedService.processingDays} Days</span>
                      <span>💰 Fee: {msg.detectedService.fee}</span>
                    </div>
                  </div>
                )}

                <div
                  className={`text-[10px] mt-1.5 text-right font-normal ${
                    msg.sender === "user" ? "text-blue-100" : "text-slate-400"
                  }`}
                >
                  {msg.timestamp}
                </div>
              </div>

              {/* Action Buttons */}
              {msg.actionButtons && msg.actionButtons.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {msg.actionButtons.map((btn, idx) => {
                    if (btn.actionType === "APPLY_NOW") {
                      return (
                        <Link
                          key={idx}
                          href={btn.targetUrl || `/citizen/apply/${btn.serviceId}`}
                          className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm flex items-center gap-1.5 transition-all hover:scale-102"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          {btn.label}
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      );
                    }

                    if (btn.actionType === "TRACK_APPLICATION") {
                      return (
                        <Link
                          key={idx}
                          href={btn.targetUrl || "/citizen/track"}
                          className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-amber-500 hover:bg-amber-600 text-white shadow-sm flex items-center gap-1.5 transition-colors"
                        >
                          <Search className="w-3.5 h-3.5" />
                          {btn.label}
                        </Link>
                      );
                    }

                    return (
                      <Link
                        key={idx}
                        href={btn.targetUrl || "/services"}
                        className="px-3.5 py-2 rounded-xl text-xs font-medium bg-white hover:bg-blue-50 text-blue-700 border border-blue-200 shadow-xs flex items-center gap-1.5 transition-colors"
                      >
                        <FileCheck className="w-3.5 h-3.5 text-blue-500" />
                        {btn.label}
                      </Link>
                    );
                  })}
                </div>
              )}

              {/* Suggested Questions Pills */}
              {msg.suggestedQuestions && msg.suggestedQuestions.length > 0 && (
                <div className="pt-2">
                  <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-500" /> Suggested Prompts
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {msg.suggestedQuestions.map((q, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSendQuery(q)}
                        className="text-xs bg-white hover:bg-blue-50 hover:border-blue-300 text-slate-700 px-3 py-1.5 rounded-lg border border-slate-200 transition-all text-left shadow-2xs"
                      >
                        💬 {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Loading Indicator */}
        {loading && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center">
              <Bot className="w-4 h-4 animate-spin text-amber-300" />
            </div>
            <div className="bg-white border border-slate-200 px-4 py-3 rounded-2xl rounded-tl-none text-xs text-slate-500 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-bounce"></span>
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-bounce [animation-delay:0.4s]"></span>
              <span>Analyzing service requirement...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Box */}
      <div className="p-3 sm:p-4 bg-white border-t border-slate-200 shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendQuery();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about any government service (e.g. PAN card, Driving Licence, Scholarship)..."
            className="flex-1 px-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-slate-50 focus:bg-white transition-all"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold text-sm rounded-xl shadow-md transition-all flex items-center gap-2 shrink-0"
          >
            <span>Send</span>
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

    </div>
  );
}
