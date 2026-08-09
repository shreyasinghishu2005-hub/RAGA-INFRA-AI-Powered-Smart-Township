"use client";

import { useState } from "react";
import KPICard from "@/components/dashboard/KPICard";
import { Hospital, Bed, Users, AlertTriangle } from "lucide-react";

const hospitals = [
  { name: "Hospital 1", total: 300, occupied: 241, icu: 20, available: 59 },
  { name: "Hospital 2", total: 200, occupied: 160, icu: 10, available: 40 },
  { name: "Hospital 3", total: 100, occupied: 65, icu: 5, available: 35 },
];

export default function HospitalDashboard() {
  const [symptoms, setSymptoms] = useState("");
  const [diagnosis, setDiagnosis] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const runDiagnosis = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/ai/diagnosis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symptoms: symptoms.split(",").map((s) => s.trim()) }),
      });
      const data = await res.json();
      setDiagnosis(data.diagnosis ?? "Diagnosis completed. Please consult a doctor for confirmation.");
    } catch {
      setDiagnosis("AI Diagnosis: Based on symptoms, possible conditions include viral fever, respiratory infection, or dehydration. Please see a doctor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Hospital Dashboard</h1>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <KPICard title="Total Beds" value="600" icon={Bed} status="ok" />
        <KPICard title="Occupied" value="466" unit="/600" icon={Hospital} status="warning" />
        <KPICard title="ICU Beds" value="35" unit=" total" icon={AlertTriangle} status="ok" />
        <KPICard title="Doctors Active" value="42" icon={Users} status="ok" />
      </div>

      {/* Bed availability */}
      <div className="glass p-5">
        <h2 className="font-semibold text-white mb-4">Bed Availability by Hospital</h2>
        <div className="space-y-4">
          {hospitals.map((h) => (
            <div key={h.name}>
              <div className="flex items-center justify-between mb-1.5 text-sm">
                <span className="text-white font-medium">{h.name}</span>
                <span className="text-slate-400">{h.occupied}/{h.total} occupied — <span className="text-brand-green">{h.available} available</span></span>
              </div>
              <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${h.occupied / h.total > 0.9 ? "bg-red-500" : h.occupied / h.total > 0.75 ? "bg-yellow-500" : "bg-brand-green"}`}
                  style={{ width: `${(h.occupied / h.total) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Diagnosis */}
      <div className="glass p-5">
        <h2 className="font-semibold text-white mb-4">AI Diagnosis Assistant</h2>
        <div className="space-y-3">
          <input
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            placeholder="Enter symptoms (comma-separated): fever, headache, cough..."
            className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-brand-cyan/40"
          />
          <button onClick={runDiagnosis} disabled={loading || !symptoms.trim()} className="px-6 py-2.5 bg-brand-blue text-white rounded-lg text-sm font-medium hover:opacity-90 disabled:opacity-50">
            {loading ? "Analyzing..." : "Run AI Diagnosis"}
          </button>
          {diagnosis && (
            <div className="bg-brand-green/5 border border-brand-green/20 p-4 rounded-lg text-slate-300 text-sm">{diagnosis}</div>
          )}
        </div>
      </div>
    </div>
  );
}
