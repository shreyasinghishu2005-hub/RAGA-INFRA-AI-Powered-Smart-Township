"use client";

import { cn } from "@/lib/utils";
import type { SensorReading } from "@/lib/mock-iot";

interface SensorStatusGridProps {
  sensors: Record<string, SensorReading>;
}

const statusStyles = {
  online: "bg-brand-green/20 text-brand-green border-brand-green/20",
  offline: "bg-red-500/20 text-red-400 border-red-500/20",
  triggered: "bg-orange-500/20 text-orange-400 border-orange-500/20 animate-pulse",
};

export default function SensorStatusGrid({ sensors }: SensorStatusGridProps) {
  const entries = Object.values(sensors);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
      {entries.map((s) => (
        <div
          key={s.deviceId}
          className={cn(
            "border rounded-lg p-2 text-xs",
            statusStyles[s.status]
          )}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="truncate font-medium">{s.deviceId.split("-").slice(0, 2).join("-")}</span>
            <span className={cn(
              "w-2 h-2 rounded-full ml-1 shrink-0",
              s.status === "online" ? "bg-brand-green" :
              s.status === "triggered" ? "bg-orange-400 animate-ping" : "bg-red-400"
            )} />
          </div>
          <div className="text-[10px] opacity-70 truncate">{s.type}: {s.value.toFixed(1)} {s.unit}</div>
          <div className="text-[10px] opacity-50 truncate">{s.zone}</div>
        </div>
      ))}
      {entries.length === 0 && (
        <div className="col-span-full text-center text-slate-500 py-8 text-sm">
          Waiting for sensor data...
        </div>
      )}
    </div>
  );
}
