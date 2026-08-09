"use client";

import KPICard from "@/components/dashboard/KPICard";
import { Users, Shield, Database, Activity } from "lucide-react";

const auditLog = [
  { user: "admin@ragainfra.com", action: "CREATE User", record: "USR-001", time: "10:32 AM" },
  { user: "manager@ragainfra.com", action: "ACKNOWLEDGE Alert", record: "ALT-045", time: "10:28 AM" },
  { user: "admin@ragainfra.com", action: "UPDATE Config", record: "CFG-007", time: "10:15 AM" },
  { user: "manager@ragainfra.com", action: "GENERATE Report", record: "RPT-023", time: "09:50 AM" },
  { user: "admin@ragainfra.com", action: "DELETE Visitor Pass", record: "VIS-089", time: "09:30 AM" },
];

export default function SuperAdminDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Super Admin Dashboard</h1>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <KPICard title="Total Users" value="4,287" icon={Users} status="ok" />
        <KPICard title="Active Roles" value="11" icon={Shield} status="ok" />
        <KPICard title="DB Records" value="48,290" icon={Database} status="ok" />
        <KPICard title="API Calls Today" value="12,450" icon={Activity} status="ok" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {[
          { role: "Super Admin", count: 2 },
          { role: "Township Mgr", count: 5 },
          { role: "Residents", count: 4200 },
          { role: "Security", count: 24 },
          { role: "Hospital", count: 42 },
          { role: "School", count: 62 },
        ].map((r) => (
          <div key={r.role} className="glass p-3 text-center">
            <div className="text-xl font-bold text-brand-cyan">{r.count.toLocaleString()}</div>
            <div className="text-slate-400 text-xs mt-1">{r.role}</div>
          </div>
        ))}
      </div>

      <div className="glass p-5">
        <h2 className="font-semibold text-white mb-4">Audit Log</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                {["User", "Action", "Record ID", "Time"].map((h) => (
                  <th key={h} className="text-left text-slate-400 font-medium py-2 px-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {auditLog.map((log, i) => (
                <tr key={i} className="border-b border-white/5">
                  <td className="py-2 px-3 text-slate-300">{log.user}</td>
                  <td className="py-2 px-3 text-white">{log.action}</td>
                  <td className="py-2 px-3 font-mono text-xs text-brand-cyan">{log.record}</td>
                  <td className="py-2 px-3 text-slate-500">{log.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
