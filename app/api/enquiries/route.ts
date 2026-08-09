import { NextRequest, NextResponse } from "next/server";
import { enquirySchema } from "@/lib/validators/enquiry";
import { randomUUID } from "crypto";

// In-memory store for demo (replace with Prisma in production)
const enquiries: Record<string, unknown>[] = [];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = enquirySchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          error: {
            code: "VALIDATION_ERROR",
            message: "Validation failed",
            fields: result.error.flatten().fieldErrors,
          },
        },
        { status: 400 }
      );
    }

    const referenceNo = `ENQ-${randomUUID().split("-")[0].toUpperCase()}`;
    enquiries.push({ ...result.data, referenceNo, createdAt: new Date().toISOString() });

    return NextResponse.json({ referenceNo, message: "Enquiry submitted successfully" });
  } catch {
    return NextResponse.json(
      { error: { code: "INTERNAL_ERROR", message: "Internal server error" } },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ enquiries });
}
