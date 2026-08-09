import OpenAI from "openai";

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const TOWNSHIP_SYSTEM_PROMPT = `You are the AI assistant for Raga Infra Smart Township — a 300-acre AI-powered township near Mahindra SEZ. 

The township includes:
- 75 acres Residential (smart apartments and villas)
- 40 acres Premium Villas
- 20 acres Commercial Zone (shopping mall, food court, cinema)
- 30 acres IT Office Park
- 2 Colleges (25 + 15 acres)
- 2 Schools (10 + 8 acres)
- 3 Hospitals (15 + 10 + 8 acres)
- 10 acres Government Office Complex
- 30 acres Solar Farm
- 5 acres Water Treatment Plant
- 15 acres Rainwater Harvesting Lake
- 25 acres Central Park

Key features: AI surveillance, smart utilities, elder care system, eco monitoring, solar energy, 5G connectivity.

Answer questions about the township, booking, amenities, pricing, and facilities. Be helpful, concise, and accurate.`;

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export async function chatWithTownship(messages: ChatMessage[]): Promise<string> {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: TOWNSHIP_SYSTEM_PROMPT },
      ...messages,
    ],
    max_tokens: 500,
    temperature: 0.7,
  });

  return response.choices[0]?.message?.content ?? "I'm here to help. Please ask me anything about Raga Infra Smart Township.";
}
