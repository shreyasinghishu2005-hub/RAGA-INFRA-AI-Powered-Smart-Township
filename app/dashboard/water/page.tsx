"use client";

import { useIoTStream } from "@/components/dashboard/IoTStreamConsumer";
import KPICard from "@/components/dashboard/KPICard";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Droplets, Activity, Database } from "lucide-react";
import { useState, useEffect } from "react";

export default function WaterDashboard() {
  const { sensors } = useIoTStream();
  const [history, setHistory] = useState<{ time: string; flow: number; pressure: number }[]>([]);

  const flow = Object.values(sensors).find((s) => s.type === "water_flow")?.value ?? 0;
  const pressure = Object.values(sensors).find((s) => s.type === "water_pressure")?.value ?? 0;
  const lakeLevel = Object.values(sensors).find((s) => s.type === "lake_level")?.value ?? 0;

  useEffect(() => {
    if (flow > 0) {
      const ts = new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
      setHistory((prev) => [...prev.slice(-20), { time: ts, flow, pressure }]);
    }
  }, [flow, pressure]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Water Dashboard</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <KPICard title="Water Flow" value={flow.toFixed(0)} unit="L/hr" icon={Droplets} status="ok" />
        <KPICard title="Pressure" value={pressure.toFixed(1)} unit="bar" icon={Activity} status={pressure < 2.5 ? "warning" : "ok"} />
        <KPICard title="Lake Level" value={lakeLevel.toFixed(1)} unit="m" icon={Database} status={lakeLevel > 7 ? "critical" : lakeLevel > 6 ? "warning" : "ok"} />
      </div>
      <div className="glass p-6">
        <h2 className="font-semibold text-white mb-4">Water Flow & Pressure (Live)</h2>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={history}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
            <XAxis dataKey="time" tick={{ fill: "#94a3b8", fontSize: 11 }} />
            <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} />
            <Tooltip contentStyle={{ background: "#0a0f2e", border: "1px solid #ffffff20", borderRadius: 8 }} />
            <Line type="monotone" dataKey="flow" stroke="#06b6d4" name="Flow L/hr" dot={false} />
            <Line type="monotone" dataKey="pressure" stroke="#10b981" name="Pressure bar" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
