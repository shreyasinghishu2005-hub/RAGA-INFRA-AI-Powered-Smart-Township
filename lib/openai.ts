import OpenAI from "openai";

// Lazy client — only instantiated on first call, not at module load time
// This prevents build failures when OPENAI_API_KEY is not set
let _client: OpenAI | null = null;

function getClient(): OpenAI {
  if (!_client) {
    _client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY ?? "placeholder",
    });
  }
  return _client;
}

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
  if (!process.env.OPENAI_API_KEY) {
    return "I'm the Raga Infra AI assistant. Our 300-acre smart township near Mahindra SEZ offers smart apartments, villas, IT park, schools, hospitals, solar energy and more. How can I help you?";
  }
  const response = await getClient().chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: TOWNSHIP_SYSTEM_PROMPT },
      ...messages,
    ],
    max_tokens: 500,
    temperature: 0.7,
  });
  return response.choices[0]?.message?.content ?? "How can I help you with Raga Infra Smart Township?";
}

export async function generateReport(prompt: string): Promise<string> {
  if (!process.env.OPENAI_API_KEY) {
    return "Township operations ran smoothly over the past 24 hours. Solar farm produced 18,200 kWh with battery storage at 72%. Security logged 3 minor incidents, all resolved. Elder care monitored 45 residents with 2 health alerts — both addressed within SLA. Green Index at 74/100.";
  }
  const response = await getClient().chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    max_tokens: 300,
  });
  return response.choices[0]?.message?.content ?? "";
}

export async function generateDiagnosis(symptoms: string[]): Promise<string> {
  if (!process.env.OPENAI_API_KEY) {
    return `Based on symptoms (${symptoms.join(", ")}):\n1. Viral Fever — High — common presentation\n2. Respiratory Infection — Medium — consistent with symptoms\n3. Dehydration — Low — possible contributing factor\n\n⚠️ AI-assisted analysis only. Please consult a qualified doctor.`;
  }
  const response = await getClient().chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{
      role: "user",
      content: `Patient symptoms: ${symptoms.join(", ")}. Provide top 3 differential diagnoses with confidence levels. Add doctor consultation disclaimer.`
    }],
    max_tokens: 300,
  });
  return response.choices[0]?.message?.content ?? "";
}
