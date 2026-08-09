"use client";

import { useIoTStream } from "@/components/dashboard/IoTStreamConsumer";
import KPICard from "@/components/dashboard/KPICard";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Sun, Zap, Battery, Leaf } from "lucide-react";
import { useState, useEffect } from "react";

export default function SolarDashboard() {
  const { sensors } = useIoTStream();
  const [history, setHistory] = useState<{ time: string; kw: number; battery: number }[]>([]);

  const solarKw = Object.values(sensors).find((s) => s.type === "solar_kw")?.value ?? 0;
  const batteryPct = Object.values(sensors).find((s) => s.type === "battery_pct")?.value ?? 0;
  const dailyYield = (solarKw * 6.5).toFixed(0); // mock daily accumulation
  const carbonSaved = (Number(dailyYield) * 0.82).toFixed(0);

  useEffect(() => {
    if (solarKw > 0) {
      const ts = new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
      setHistory((prev) => [...prev.slice(-20), { time: ts, kw: solarKw, battery: batteryPct }]);
    }
  }, [solarKw, batteryPct]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Solar Dashboard</h1>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <KPICard title="Solar Output" value={solarKw.toFixed(1)} unit="kW" icon={Sun} status={solarKw < 500 ? "warning" : "ok"} />
        <KPICard title="Daily Yield" value={dailyYield} unit="kWh" icon={Zap} status="ok" />
        <KPICard title="Battery" value={batteryPct.toFixed(0)} unit="%" icon={Battery} status={batteryPct < 20 ? "critical" : batteryPct < 40 ? "warning" : "ok"} />
        <KPICard title="Carbon Saved" value={carbonSaved} unit="kg CO₂" icon={Leaf} status="ok" />
      </div>
      <div className="glass p-6">
        <h2 className="font-semibold text-white mb-4">Live Solar Production (kW)</h2>
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart data={history}>
            <defs>
              <linearGradient id="solar" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#eab308" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#eab308" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
            <XAxis dataKey="time" tick={{ fill: "#94a3b8", fontSize: 11 }} />
            <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} />
            <Tooltip contentStyle={{ background: "#0a0f2e", border: "1px solid #ffffff20", borderRadius: 8 }} />
            <Area type="monotone" dataKey="kw" stroke="#eab308" fill="url(#solar)" name="Solar kW" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
