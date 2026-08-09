"use client";

import { useEffect, useState, useRef } from "react";
import type { SensorReading } from "@/lib/mock-iot";

type SensorMap = Record<string, SensorReading>;

export function useIoTStream() {
  const [sensors, setSensors] = useState<SensorMap>({});
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const esRef = useRef<EventSource | null>(null);
  const reconnectTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reconnectDelay = useRef(1000);

  useEffect(() => {
    const connect = () => {
      const es = new EventSource("/api/iot/stream");
      esRef.current = es;

      es.onopen = () => {
        setConnected(true);
        setError(null);
        reconnectDelay.current = 1000;
      };

      es.onmessage = (event) => {
        try {
          const readings: SensorReading[] = JSON.parse(event.data);
          setSensors((prev) => {
            const next = { ...prev };
            readings.forEach((r) => {
              next[r.deviceId] = r;
            });
            return next;
          });
        } catch {
          // ignore parse errors
        }
      };

      es.onerror = () => {
        setConnected(false);
        es.close();
        setError("Stream disconnected. Reconnecting...");
        reconnectTimer.current = setTimeout(() => {
          reconnectDelay.current = Math.min(reconnectDelay.current * 2, 30000);
          connect();
        }, reconnectDelay.current);
      };
    };

    connect();

    return () => {
      esRef.current?.close();
      if (reconnectTimer.current) clearTimeout(reconnectTimer.current);
    };
  }, []);

  return { sensors, connected, error };
}
