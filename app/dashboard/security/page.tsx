"use client";

import { useState } from "react";
import AlertFeed, { Alert } from "@/components/dashboard/AlertFeed";
import { Shield, Camera, Car, Users } from "lucide-react";
import KPICard from "@/components/dashboard/KPICard";

const mockAlerts: Alert[] = [
  { id: "s1", type: "SECURITY", severity: "HIGH", title: "Unknown Vehicle", description: "Unregistered plate at Gate 2", zone: "main-gate", status: "OPEN", createdAt: new Date(Date.now() - 60000).toISOString() },
  { id: "s2", type: "SECURITY", severity: "MEDIUM", title: "Motion Detected", description: "After-hours motion in parking B", zone: "residential-a", status: "OPEN", createdAt: new Date(Date.now() - 120000).toISOString() },
  { id: "s3", type: "SECURITY", severity: "LOW", title: "Visitor Pass Expired", description: "Visitor overstaying in Block C", zone: "residential-b", status: "OPEN", createdAt: new Date(Date.now() - 300000).toISOString() },
];

const cameras = ["Main Gate", "Residential A", "IT Park Entry", "Hospital Lobby", "Mall Entrance", "Solar Farm"];

export default function SecurityDashboard() {
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts);
  const [sosTriggered, setSosTriggered] = useState(false);

  const triggerSOS = async () => {
    setSosTriggered(true);
    const newAlert: Alert = {
      id: `sos-${Date.now()}`,
      type: "SECURITY",
      severity: "CRITICAL",
      title: "SOS TRIGGERED",
      description: "Manual SOS activated from Security Dashboard",
      zone: "command-center",
      status: "OPEN",
      createdAt: new Date().toISOString(),
    };
    setAlerts((prev) => [newAlert, ...prev]);
    setTimeout(() => setSosTriggered(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Security Dashboard</h1>
        <button
          onClick={triggerSOS}
          disabled={sosTriggered}
          className={`px-6 py-3 rounded-xl font-bold text-sm transition-all ${sosTriggered ? "bg-red-900 text-red-300" : "bg-red-600 hover:bg-red-500 text-white animate-pulse"}`}
        >
          {sosTriggered ? "⚠️ SOS SENT" : "🆘 TRIGGER SOS"}
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <KPICard title="Cameras Online" value="48" unit="/50" icon={Camera} status="ok" />
        <KPICard title="Gates Active" value="6" unit="/6" icon={Shield} status="ok" />
        <KPICard title="Visitors Today" value="142" icon={Users} status="ok" />
        <KPICard title="Vehicles Logged" value="89" icon={Car} status="ok" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Camera grid */}
        <div className="glass p-5">
          <h2 className="font-semibold text-white mb-4">Camera Feeds</h2>
          <div className="grid grid-cols-2 gap-3">
            {cameras.map((cam) => (
              <div key={cam} className="bg-black/40 rounded-lg aspect-video flex flex-col items-center justify-center border border-white/10">
                <Camera className="w-6 h-6 text-slate-500 mb-1" />
                <span className="text-xs text-slate-500">{cam}</span>
                <span className="text-xs text-brand-green mt-1">● LIVE</span>
              </div>
            ))}
          </div>
        </div>

        {/* Alert feed */}
        <div className="glass p-5">
          <h2 className="font-semibold text-white mb-4">Security Alerts</h2>
          <AlertFeed alerts={alerts} onAcknowledge={(id) => setAlerts((prev) => prev.map((a) => a.id === id ? { ...a, status: "ACKNOWLEDGED" } : a))} />
        </div>
      </div>
    </div>
  );
}
