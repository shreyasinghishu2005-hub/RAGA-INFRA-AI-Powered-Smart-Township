import { NextRequest, NextResponse } from "next/server";
import { chatWithTownship, type ChatMessage } from "@/lib/openai";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages } = body as { messages: ChatMessage[] };

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: { code: "VALIDATION_ERROR", message: "messages array is required" } },
        { status: 400 }
      );
    }

    const lastMessage = messages[messages.length - 1];
    if (!lastMessage?.content || lastMessage.content.trim() === "") {
      return NextResponse.json(
        { error: { code: "VALIDATION_ERROR", message: "Message content cannot be empty" } },
        { status: 400 }
      );
    }

    const message = await chatWithTownship(messages);
    return NextResponse.json({ message });
  } catch (err) {
    console.error("AI chat error:", err);
    return NextResponse.json({
      message: "I'm the Raga Infra AI assistant. Ask me anything about our 300-acre smart township near Mahindra SEZ — properties, amenities, schools, hospitals, and more.",
    });
  }
}
