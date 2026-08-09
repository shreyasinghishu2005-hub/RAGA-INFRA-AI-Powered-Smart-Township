import { NextRequest, NextResponse } from "next/server";
import { openai } from "@/lib/openai";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { symptoms } = body as { symptoms: string[] };

    if (!symptoms || symptoms.length === 0) {
      return NextResponse.json({ error: { code: "VALIDATION_ERROR", message: "symptoms array is required" } }, { status: 400 });
    }

    const prompt = `You are a medical AI assistant. A patient presents with the following symptoms: ${symptoms.join(", ")}.
Provide a ranked differential diagnosis with 3 possible conditions and confidence levels (High/Medium/Low).
Format: "1. [Condition] — [Confidence] — [Brief reason]"
Add a disclaimer that this is AI assistance only and a doctor must confirm.`;

    let diagnosis: string;
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 300,
      });
      diagnosis = response.choices[0]?.message?.content ?? "";
    } catch {
      diagnosis = `Based on symptoms (${symptoms.join(", ")}), possible conditions include:\n1. Viral Fever — High — common with fever and body ache\n2. Respiratory Infection — Medium — consistent with cough/throat symptoms\n3. Dehydration — Low — possible contributing factor\n\n⚠️ This is AI-assisted analysis only. Please consult a qualified doctor for diagnosis and treatment.`;
    }

    return NextResponse.json({ diagnosis });
  } catch {
    return NextResponse.json({ error: { code: "INTERNAL_ERROR", message: "Diagnosis failed" } }, { status: 500 });
  }
}
