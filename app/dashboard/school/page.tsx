"use client";

import KPICard from "@/components/dashboard/KPICard";
import { GraduationCap, Users, Bus, CheckSquare } from "lucide-react";

const attendance = [
  { class: "School 1 — Class 1-5", present: 280, total: 300 },
  { class: "School 1 — Class 6-8", present: 210, total: 240 },
  { class: "School 2 — Class 9-10", present: 185, total: 200 },
  { class: "School 2 — Class 11-12", present: 160, total: 180 },
];

export default function SchoolDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">School Dashboard</h1>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <KPICard title="Total Students" value="920" icon={Users} status="ok" />
        <KPICard title="Present Today" value="835" unit="/920" icon={CheckSquare} status="ok" />
        <KPICard title="Buses Active" value="8" unit="/8" icon={Bus} status="ok" />
        <KPICard title="Teachers" value="62" icon={GraduationCap} status="ok" />
      </div>
      <div className="glass p-5">
        <h2 className="font-semibold text-white mb-4">Class-wise Attendance</h2>
        <div className="space-y-4">
          {attendance.map((c) => (
            <div key={c.class}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-white">{c.class}</span>
                <span className="text-slate-400">{c.present}/{c.total} — <span className="text-brand-green">{Math.round((c.present / c.total) * 100)}%</span></span>
              </div>
              <div className="h-2.5 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-brand-green rounded-full" style={{ width: `${(c.present / c.total) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="glass p-5">
        <h2 className="font-semibold text-white mb-3">Transport Status</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {["Bus 01", "Bus 02", "Bus 03", "Bus 04", "Bus 05", "Bus 06", "Bus 07", "Bus 08"].map((bus) => (
            <div key={bus} className="flex items-center justify-between bg-white/5 p-2 rounded-lg text-sm">
              <span className="text-slate-300">🚌 {bus}</span>
              <span className="text-brand-green text-xs">● On Route</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
