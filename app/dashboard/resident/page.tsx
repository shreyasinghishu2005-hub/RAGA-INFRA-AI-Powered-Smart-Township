"use client";

import { useState } from "react";
import KPICard from "@/components/dashboard/KPICard";
import { Zap, Droplets, FileText, Car } from "lucide-react";

export default function ResidentDashboard() {
  const [ticketRef, setTicketRef] = useState<string | null>(null);
  const [complaint, setComplaint] = useState("");

  const raiseComplaint = async () => {
    if (!complaint.trim()) return;
    const ref = `TKT-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    setTicketRef(ref);
    setComplaint("");
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Resident Portal</h1>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <KPICard title="Electricity" value="284" unit="kWh" icon={Zap} status="ok" subtitle="This month" />
        <KPICard title="Water" value="3,200" unit="L" icon={Droplets} status="ok" subtitle="This month" />
        <KPICard title="Bill Due" value="₹4,850" icon={FileText} status="warning" subtitle="Due Nov 1" />
        <KPICard title="Parking" value="B-24" icon={Car} status="ok" subtitle="Reserved" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Raise Complaint */}
        <div className="glass p-5">
          <h2 className="font-semibold text-white mb-4">Raise Maintenance Complaint</h2>
          {ticketRef ? (
            <div className="text-center py-6">
              <div className="text-3xl mb-2">✅</div>
              <p className="text-white font-semibold">Ticket raised!</p>
              <p className="text-brand-cyan font-mono mt-2">{ticketRef}</p>
              <button onClick={() => setTicketRef(null)} className="mt-4 text-sm text-slate-400 hover:text-white">Raise another</button>
            </div>
          ) : (
            <div className="space-y-3">
              <textarea
                value={complaint}
                onChange={(e) => setComplaint(e.target.value)}
                placeholder="Describe the issue..."
                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm resize-none focus:outline-none focus:border-brand-cyan/40"
                rows={4}
              />
              <button onClick={raiseComplaint} className="w-full py-2 bg-brand-blue text-white rounded-lg text-sm font-medium hover:opacity-90">
                Submit Complaint
              </button>
            </div>
          )}
        </div>

        {/* Visitor Passes */}
        <div className="glass p-5">
          <h2 className="font-semibold text-white mb-4">Active Visitor Passes</h2>
          <div className="space-y-3">
            {[
              { name: "Rahul Sharma", valid: "Until 8 PM today", gate: "Gate 1" },
              { name: "Priya Singh", valid: "Until Nov 12", gate: "Gate 2" },
            ].map((pass) => (
              <div key={pass.name} className="flex items-center justify-between bg-white/5 p-3 rounded-lg">
                <div>
                  <div className="text-white text-sm font-medium">{pass.name}</div>
                  <div className="text-slate-500 text-xs">{pass.valid} · {pass.gate}</div>
                </div>
                <span className="w-2 h-2 bg-brand-green rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
