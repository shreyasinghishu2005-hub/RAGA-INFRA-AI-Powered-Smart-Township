import { NextRequest, NextResponse } from "next/server";
import { residentialBookingSchema } from "@/lib/validators/booking";

const bookings: Record<string, unknown>[] = [];

function generateRef(prefix: string): string {
  return `${prefix}-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = residentialBookingSchema.safeParse(body);

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

    const referenceNo = generateRef("RES");
    bookings.push({
      ...result.data,
      type: "residential",
      referenceNo,
      status: "PENDING",
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({
      referenceNo,
      message: "Residential booking enquiry submitted",
    });
  } catch {
    return NextResponse.json(
      { error: { code: "INTERNAL_ERROR", message: "Internal server error" } },
      { status: 500 }
    );
  }
}
