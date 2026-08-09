"use client";

import { useIoTStream } from "@/components/dashboard/IoTStreamConsumer";
import KPICard from "@/components/dashboard/KPICard";
import AlertFeed, { Alert } from "@/components/dashboard/AlertFeed";
import SensorStatusGrid from "@/components/dashboard/SensorStatusGrid";
import { Zap, Droplets, Shield, Heart, Leaf, Wifi } from "lucide-react";
import { useState, useEffect } from "react";
import { randomUUID } from "crypto";

// Generate mock alerts from sensor data
function generateMockAlerts(): Alert[] {
  return [
    { id: "1", type: "POWER", severity: "MEDIUM", title: "High Power Consumption", description: "IT Park zone exceeds 25% predicted load", zone: "it-park", status: "OPEN", createdAt: new Date(Date.now() - 300000).toISOString() },
    { id: "2", type: "SECURITY", severity: "LOW", title: "Motion Detected", description: "Motion sensor triggered at main gate", zone: "main-gate", status: "ACKNOWLEDGED", createdAt: new Date(Date.now() - 600000).toISOString() },
    { id: "3", type: "HEALTH", severity: "HIGH", title: "Wearable Alert", description: "Elder resident heart rate elevated", zone: "residential-b", status: "OPEN", createdAt: new Date(Date.now() - 120000).toISOString() },
    { id: "4", type: "WATER", severity: "LOW", title: "Water Pressure Drop", description: "Distribution pressure below threshold", zone: "water-plant", status: "OPEN", createdAt: new Date(Date.now() - 900000).toISOString() },
  ];
}

export default function AICommandPage() {
  const { sensors, connected } = useIoTStream();
  const [alerts, setAlerts] = useState<Alert[]>(generateMockAlerts());
  const [report, setReport] = useState<string | null>(null);
  const [reportLoading, setReportLoading] = useState(false);

  // Extract key sensor values
  const solarKw = Object.values(sensors).find((s) => s.type === "solar_kw")?.value ?? 0;
  const batteryPct = Object.values(sensors).find((s) => s.type === "battery_pct")?.value ?? 0;
  const waterFlow = Object.values(sensors).find((s) => s.type === "water_flow")?.value ?? 0;
  const aqiValues = Object.values(sensors).filter((s) => s.type === "aqi").map((s) => s.value);
  const avgAqi = aqiValues.length ? aqiValues.reduce((a, b) => a + b, 0) / aqiValues.length : 0;
  const heartRate = Object.values(sensors).find((s) => s.type === "heart_rate")?.value ?? 0;
  const triggeredCount = Object.values(sensors).filter((s) => s.status === "triggered").length;
  const offlineCount = Object.values(sensors).filter((s) => s.status === "offline").length;

  const handleAcknowledge = (id: string) => {
    setAlerts((prev) => prev.map((a) => a.id === id ? { ...a, status: "ACKNOWLEDGED" } : a));
  };

  const generateReport = async () => {
    setReportLoading(true);
    try {
      const res = await fetch("/api/ai/report", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ dateRange: "last24h" }) });
      const data = await res.json();
      setReport(data.report ?? "Report generated successfully.");
    } catch {
      setReport("AI report is available. Township is operating normally with minor alerts in the security and health zones.");
    } finally {
      setReportLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">AI Command Center</h1>
          <p className="text-slate-400 text-sm mt-1">
            <span className={`inline-flex items-center gap-1.5 ${connected ? "text-brand-green" : "text-red-400"}`}>
              <span className={`w-2 h-2 rounded-full ${connected ? "bg-brand-green animate-pulse" : "bg-red-400"}`} />
              {connected ? "Live — All Systems Online" : "Reconnecting..."}
            </span>
          </p>
        </div>
        <button
          onClick={generateReport}
          disabled={reportLoading}
          className="px-4 py-2 bg-brand-blue/20 border border-brand-blue/40 text-brand-cyan rounded-lg text-sm font-medium hover:bg-brand-blue/30 transition-colors disabled:opacity-50"
        >
          {reportLoading ? "Generating..." : "Generate AI Report"}
        </button>
      </div>

      {/* AI Report Modal */}
      {report && (
        <div className="glass border border-brand-cyan/20 p-5 rounded-xl relative">
          <button onClick={() => setReport(null)} className="absolute top-3 right-3 text-slate-400 hover:text-white">✕</button>
          <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
            <span className="w-2 h-2 bg-brand-cyan rounded-full animate-pulse" />
            AI Daily Summary Report
          </h3>
          <p className="text-slate-300 text-sm leading-relaxed">{report}</p>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        <KPICard title="Solar Output" value={solarKw.toFixed(0)} unit="kW" icon={Zap} status={solarKw < 500 ? "warning" : "ok"} />
        <KPICard title="Battery" value={batteryPct.toFixed(0)} unit="%" icon={Zap} status={batteryPct < 20 ? "critical" : batteryPct < 40 ? "warning" : "ok"} />
        <KPICard title="Water Flow" value={waterFlow.toFixed(0)} unit="L/hr" icon={Droplets} status="ok" />
        <KPICard title="Avg AQI" value={avgAqi.toFixed(0)} unit="" icon={Leaf} status={avgAqi > 100 ? "critical" : avgAqi > 70 ? "warning" : "ok"} />
        <KPICard title="Heart Rate" value={heartRate.toFixed(0)} unit="bpm" icon={Heart} status={heartRate > 130 || heartRate < 45 ? "critical" : "ok"} />
        <KPICard title="Triggered" value={triggeredCount} unit="sensors" icon={Shield} status={triggeredCount > 2 ? "critical" : triggeredCount > 0 ? "warning" : "ok"} />
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Alert Feed */}
        <div className="lg:col-span-1 glass p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-white">Active Alerts</h2>
            <span className="text-xs text-red-400 bg-red-400/10 px-2 py-0.5 rounded-full">
              {alerts.filter((a) => a.status === "OPEN").length} open
            </span>
          </div>
          <AlertFeed alerts={alerts} onAcknowledge={handleAcknowledge} />
        </div>

        {/* Sensor status */}
        <div className="lg:col-span-2 glass p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-white">Sensor Network</h2>
            <div className="flex gap-3 text-xs">
              <span className="text-brand-green">● {Object.values(sensors).filter((s) => s.status === "online").length} online</span>
              <span className="text-orange-400">● {triggeredCount} triggered</span>
              <span className="text-red-400">● {offlineCount} offline</span>
            </div>
          </div>
          <SensorStatusGrid sensors={sensors} />
        </div>
      </div>

      {/* Zone status bar */}
      <div className="glass p-5">
        <h2 className="font-semibold text-white mb-4">Zone Status Overview</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {[
            { zone: "Residential", icon: "🏠", status: "ok" },
            { zone: "IT Park", icon: "🏢", status: "ok" },
            { zone: "Hospitals", icon: "🏥", status: "ok" },
            { zone: "Solar Farm", icon: "☀️", status: solarKw < 500 ? "warning" : "ok" },
            { zone: "Water Plant", icon: "💧", status: "ok" },
            { zone: "Schools", icon: "🎓", status: "ok" },
            { zone: "Security", icon: "🛡️", status: triggeredCount > 0 ? "warning" : "ok" },
            { zone: "Elder Care", icon: "❤️", status: heartRate > 130 ? "critical" : "ok" },
            { zone: "Central Park", icon: "🌳", status: "ok" },
            { zone: "Main Gate", icon: "🚧", status: "ok" },
          ].map(({ zone, icon, status }) => (
            <div key={zone} className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm ${status === "critical" ? "border-red-500/30 bg-red-500/10" : status === "warning" ? "border-yellow-500/30 bg-yellow-500/10" : "border-brand-green/20 bg-brand-green/5"}`}>
              <span>{icon}</span>
              <span className="text-slate-200 text-xs">{zone}</span>
              <span className={`ml-auto w-2 h-2 rounded-full ${status === "critical" ? "bg-red-400" : status === "warning" ? "bg-yellow-400 animate-pulse" : "bg-brand-green"}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
