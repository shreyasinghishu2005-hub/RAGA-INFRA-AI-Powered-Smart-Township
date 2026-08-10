import { NextRequest, NextResponse } from "next/server";
import { generateDiagnosis } from "@/lib/openai";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { symptoms } = body as { symptoms: string[] };

    if (!symptoms || symptoms.length === 0) {
      return NextResponse.json(
        { error: { code: "VALIDATION_ERROR", message: "symptoms array is required" } },
        { status: 400 }
      );
    }

    const diagnosis = await generateDiagnosis(symptoms);
    return NextResponse.json({ diagnosis });
  } catch {
    return NextResponse.json({
      diagnosis: "Please consult a qualified doctor for diagnosis. This AI assistant is for informational purposes only."
    });
  }
}
