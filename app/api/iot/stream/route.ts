import { generateSensorSnapshot } from "@/lib/mock-iot";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    start(controller) {
      const send = () => {
        try {
          const snapshot = generateSensorSnapshot();
          const data = `data: ${JSON.stringify(snapshot)}\n\n`;
          controller.enqueue(encoder.encode(data));
        } catch {
          controller.error("Stream error");
        }
      };

      // Send initial snapshot immediately
      send();

      // Send updates every 3 seconds
      const interval = setInterval(send, 3000);

      // Clean up after 5 minutes to prevent runaway connections
      const timeout = setTimeout(() => {
        clearInterval(interval);
        controller.close();
      }, 5 * 60 * 1000);

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}
