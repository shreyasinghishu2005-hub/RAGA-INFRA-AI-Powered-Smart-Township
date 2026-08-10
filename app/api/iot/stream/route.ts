import { generateSensorSnapshot } from "@/lib/mock-iot";

export const dynamic = "force-dynamic";

export async function GET() {
  const encoder = new TextEncoder();
  let interval: ReturnType<typeof setInterval>;
  let timeout: ReturnType<typeof setTimeout>;

  const stream = new ReadableStream({
    start(controller) {
      const send = () => {
        try {
          const snapshot = generateSensorSnapshot();
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(snapshot)}\n\n`));
        } catch {
          // ignore send errors
        }
      };

      send();
      interval = setInterval(send, 3000);

      // Auto-close after 5 minutes to prevent runaway connections
      timeout = setTimeout(() => {
        clearInterval(interval);
        try { controller.close(); } catch { /* already closed */ }
      }, 5 * 60 * 1000);
    },
    cancel() {
      clearInterval(interval);
      clearTimeout(timeout);
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "Connection": "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}
