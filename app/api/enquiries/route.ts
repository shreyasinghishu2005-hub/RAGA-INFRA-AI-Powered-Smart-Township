import { NextRequest, NextResponse } from "next/server";
import { enquirySchema } from "@/lib/validators/enquiry";

// In-memory store for demo (replace with Prisma + DATABASE_URL in production)
const enquiries: Record<string, unknown>[] = [];

function generateRef(prefix: string): string {
  return `${prefix}-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
}

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

    const referenceNo = generateRef("ENQ");
    enquiries.push({
      ...result.data,
      referenceNo,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({
      referenceNo,
      message: "Enquiry submitted successfully",
    });
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
