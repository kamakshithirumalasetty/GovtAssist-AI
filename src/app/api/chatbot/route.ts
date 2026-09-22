import { NextResponse } from "next/server";
import { processUserChatMessage } from "@/lib/chatbot-engine";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Please provide a valid message string." },
        { status: 400 }
      );
    }

    const response = processUserChatMessage(message);
    return NextResponse.json(response);
  } catch (error: any) {
    console.error("Chatbot API error:", error);
    return NextResponse.json(
      { error: "Chatbot engine encountered an error processing request." },
      { status: 500 }
    );
  }
}
