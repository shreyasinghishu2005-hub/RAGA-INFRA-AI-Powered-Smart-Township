"use client";

import { useIoTStream } from "@/components/dashboard/IoTStreamConsumer";
import KPICard from "@/components/dashboard/KPICard";
import { Zap, Droplets, Shield, Leaf, Building2, Users } from "lucide-react";

export default function TownshipDashboard() {
  const { sensors, connected } = useIoTStream();
  const solarKw = Object.values(sensors).find((s) => s.type === "solar_kw")?.value ?? 0;
  const waterFlow = Object.values(sensors).find((s) => s.type === "water_flow")?.value ?? 0;
  const avgAqi = Object.values(sensors).filter((s) => s.type === "aqi").reduce((a, b, _, arr) => a + b.value / arr.length, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Township Dashboard</h1>
        <p className="text-slate-400 text-sm mt-1">
          <span className={`inline-flex items-center gap-1.5 ${connected ? "text-brand-green" : "text-yellow-400"}`}>
            <span className={`w-2 h-2 rounded-full ${connected ? "bg-brand-green animate-pulse" : "bg-yellow-400"}`} />
            {connected ? "Live Data" : "Reconnecting..."}
          </span>
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        <KPICard title="Solar Output" value={solarKw.toFixed(0)} unit="kW" icon={Zap} status="ok" />
        <KPICard title="Water Flow" value={waterFlow.toFixed(0)} unit="L/hr" icon={Droplets} status="ok" />
        <KPICard title="Avg AQI" value={avgAqi.toFixed(0)} icon={Leaf} status={avgAqi > 100 ? "critical" : "ok"} />
        <KPICard title="Total Zones" value="17" icon={Building2} status="ok" />
        <KPICard title="Active Sensors" value={Object.keys(sensors).length} icon={Shield} status="ok" />
        <KPICard title="Residents" value="4,200+" icon={Users} status="ok" />
      </div>
      <div className="glass p-6">
        <h2 className="font-semibold text-white mb-4">Township Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-slate-400">
          {[
            "✅ 300-acre smart township operational",
            "✅ Solar Farm — 2.4 MW capacity",
            "✅ 3 hospitals fully operational",
            "✅ 4 educational institutions active",
            "✅ AI Command Center live",
            "✅ Elder care monitoring active",
            "✅ Security systems online",
            "✅ Water treatment plant operational",
            "✅ 5G network coverage: 97%",
          ].map((item) => (
            <div key={item} className="flex items-center gap-2">{item}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
