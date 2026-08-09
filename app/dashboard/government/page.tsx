"use client";

import { useState } from "react";
import { Landmark, FileText, CheckCircle, Clock } from "lucide-react";
import KPICard from "@/components/dashboard/KPICard";

const services = [
  { id: "GOV-001", type: "Property Tax", status: "RESOLVED", date: "Oct 28", citizen: "A. Kumar" },
  { id: "GOV-002", type: "Birth Certificate", status: "IN_PROGRESS", date: "Nov 1", citizen: "R. Patel" },
  { id: "GOV-003", type: "NOC", status: "RECEIVED", date: "Nov 2", citizen: "S. Iyer" },
  { id: "GOV-004", type: "Complaint", status: "IN_PROGRESS", date: "Nov 3", citizen: "M. Reddy" },
];

const statusStyle: Record<string, string> = {
  RESOLVED: "text-brand-green bg-brand-green/10",
  IN_PROGRESS: "text-yellow-400 bg-yellow-400/10",
  RECEIVED: "text-brand-cyan bg-brand-cyan/10",
};

export default function GovernmentDashboard() {
  const [announcements, setAnnouncements] = useState<string[]>(["Township maintenance scheduled for Nov 10 from 10 PM–2 AM"]);
  const [newAnn, setNewAnn] = useState("");

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Government Services Portal</h1>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <KPICard title="Total Requests" value="48" icon={FileText} status="ok" />
        <KPICard title="Resolved" value="31" icon={CheckCircle} status="ok" />
        <KPICard title="In Progress" value="12" icon={Clock} status="warning" />
        <KPICard title="Pending" value="5" icon={Landmark} status="ok" />
      </div>

      <div className="glass p-5">
        <h2 className="font-semibold text-white mb-4">Service Applications</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                {["Ticket ID", "Type", "Citizen", "Date", "Status"].map((h) => (
                  <th key={h} className="text-left text-slate-400 font-medium py-2 px-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {services.map((s) => (
                <tr key={s.id} className="border-b border-white/5 hover:bg-white/3">
                  <td className="py-2.5 px-3 text-slate-300 font-mono text-xs">{s.id}</td>
                  <td className="py-2.5 px-3 text-white">{s.type}</td>
                  <td className="py-2.5 px-3 text-slate-400">{s.citizen}</td>
                  <td className="py-2.5 px-3 text-slate-400">{s.date}</td>
                  <td className="py-2.5 px-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${statusStyle[s.status]}`}>{s.status.replace("_", " ")}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="glass p-5">
        <h2 className="font-semibold text-white mb-3">Publish Announcement</h2>
        <div className="flex gap-2 mb-4">
          <input value={newAnn} onChange={(e) => setNewAnn(e.target.value)} placeholder="Announcement text..." className="flex-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-brand-cyan/40" />
          <button onClick={() => { if (newAnn.trim()) { setAnnouncements((p) => [newAnn, ...p]); setNewAnn(""); } }} className="px-4 py-2 bg-brand-blue text-white rounded-lg text-sm">Publish</button>
        </div>
        <div className="space-y-2">
          {announcements.map((ann, i) => (
            <div key={i} className="flex items-start gap-2 bg-white/5 p-3 rounded-lg text-sm text-slate-300">
              <span className="text-brand-cyan">📢</span>{ann}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
