"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from "recharts";

const energyData = [
  { day: "Mon", solar: 2100, consumed: 1850 },
  { day: "Tue", solar: 2300, consumed: 2100 },
  { day: "Wed", solar: 1900, consumed: 2000 },
  { day: "Thu", solar: 2400, consumed: 1950 },
  { day: "Fri", solar: 2200, consumed: 2200 },
  { day: "Sat", solar: 2350, consumed: 1700 },
  { day: "Sun", solar: 2000, consumed: 1600 },
];

const waterData = [
  { day: "Mon", usage: 45000 }, { day: "Tue", usage: 48000 },
  { day: "Wed", usage: 44000 }, { day: "Thu", usage: 52000 },
  { day: "Fri", usage: 50000 }, { day: "Sat", usage: 38000 }, { day: "Sun", usage: 35000 },
];

export default function AnalyticsDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Analytics Dashboard</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass p-5">
          <h2 className="font-semibold text-white mb-4">Weekly Energy — Solar vs Consumed (kWh)</h2>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={energyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
              <XAxis dataKey="day" tick={{ fill: "#94a3b8", fontSize: 11 }} />
              <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} />
              <Tooltip contentStyle={{ background: "#0a0f2e", border: "1px solid #ffffff20", borderRadius: 8 }} />
              <Legend />
              <Bar dataKey="solar" fill="#eab308" name="Solar" radius={[3, 3, 0, 0]} />
              <Bar dataKey="consumed" fill="#1a56db" name="Consumed" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="glass p-5">
          <h2 className="font-semibold text-white mb-4">Weekly Water Usage (L/day)</h2>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={waterData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
              <XAxis dataKey="day" tick={{ fill: "#94a3b8", fontSize: 11 }} />
              <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} />
              <Tooltip contentStyle={{ background: "#0a0f2e", border: "1px solid #ffffff20", borderRadius: 8 }} />
              <Line type="monotone" dataKey="usage" stroke="#06b6d4" name="Water L/day" dot={false} strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="glass p-5">
        <h2 className="font-semibold text-white mb-4">AI Insights Summary</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-300">
          {[
            "⚡ Solar production 8% above monthly average — export surplus to grid",
            "💧 Water consumption peaked Thursday — possible commercial zone event",
            "🌱 Green Index score: 74/100 — above target of 70",
            "🔒 Security incidents down 12% from last month",
            "❤️ Elder care alerts: 3 this week — all resolved within SLA",
            "🏗️ Predictive maintenance: 2 sensors flagged for inspection",
          ].map((insight) => (
            <div key={insight} className="bg-white/5 p-3 rounded-lg">{insight}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
