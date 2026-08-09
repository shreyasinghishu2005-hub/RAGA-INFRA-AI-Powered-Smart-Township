import { NextRequest, NextResponse } from "next/server";
import { residentialBookingSchema } from "@/lib/validators/booking";
import { randomUUID } from "crypto";

const bookings: Record<string, unknown>[] = [];

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

    const referenceNo = `RES-${randomUUID().split("-")[0].toUpperCase()}`;
    bookings.push({
      ...result.data,
      type: "residential",
      referenceNo,
      status: "PENDING",
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ referenceNo, message: "Residential booking enquiry submitted" });
  } catch {
    return NextResponse.json(
      { error: { code: "INTERNAL_ERROR", message: "Internal server error" } },
      { status: 500 }
    );
  }
}
