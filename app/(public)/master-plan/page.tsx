"use client";

import { motion } from "framer-motion";

const zones = [
  { color: "bg-blue-500", label: "Residential Area", area: "75 Acres", pct: "25%" },
  { color: "bg-purple-500", label: "Premium Villas", area: "40 Acres", pct: "13%" },
  { color: "bg-orange-500", label: "Commercial / Shopping", area: "20 Acres", pct: "7%" },
  { color: "bg-violet-500", label: "IT Companies / Office Park", area: "30 Acres", pct: "10%" },
  { color: "bg-teal-500", label: "Colleges / Universities", area: "40 Acres", pct: "13%" },
  { color: "bg-green-500", label: "Schools (2)", area: "18 Acres", pct: "6%" },
  { color: "bg-red-500", label: "Hospitals (3)", area: "33 Acres", pct: "11%" },
  { color: "bg-slate-400", label: "Govt. Office Complex", area: "10 Acres", pct: "3%" },
  { color: "bg-pink-500", label: "Sports Complex / Ground", area: "10 Acres", pct: "3%" },
  { color: "bg-yellow-400", label: "Solar Farm", area: "30 Acres", pct: "10%" },
  { color: "bg-cyan-400", label: "Water Tank & Treatment Plant", area: "5 Acres", pct: "2%" },
  { color: "bg-emerald-400", label: "Rainwater Harvesting Lake & Park", area: "15 Acres", pct: "5%" },
  { color: "bg-lime-400", label: "Central Park & Open Spaces", area: "25 Acres", pct: "8%" },
];

export default function MasterPlanPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Master Plan</h1>
        <p className="text-slate-400 text-lg mb-12">Area distribution across all 300 acres of Raga Infra Smart Township</p>
      </motion.div>

      {/* Zone breakdown */}
      <div className="glass p-8 mb-10">
        <h2 className="text-xl font-semibold text-white mb-6">Area Distribution (300 Acres)</h2>
        <div className="space-y-3">
          {zones.map((z, i) => (
            <motion.div
              key={z.label}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.03 }}
              className="flex items-center gap-4"
            >
              <div className={`w-3 h-3 rounded-full ${z.color} shrink-0`} />
              <div className="flex-1 text-slate-300 text-sm">{z.label}</div>
              <div className="text-slate-400 text-sm w-20 text-right">{z.area}</div>
              <div className="w-32">
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${z.color} rounded-full`}
                    style={{ width: z.pct }}
                  />
                </div>
              </div>
              <div className="text-slate-400 text-sm w-8 text-right">{z.pct}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Planning Logic */}
      <div className="glass p-8">
        <h2 className="text-xl font-semibold text-white mb-4">Planning Logic</h2>
        <div className="flex flex-wrap gap-2 text-sm">
          {[
            "Land / Site Analysis",
            "Zone Division",
            "Residential",
            "Education",
            "Healthcare",
            "Commercial Zone",
            "IT / Company Zone",
            "Government Offices",
            "Central Park & Green Belt",
            "Solar Farm",
            "Water Management",
            "Sports & Entertainment",
            "Road Network",
            "Main Gate & Security",
            "Smart Systems",
            "AI Control Centre",
            "Safe + Green + Smart Township",
          ].map((step, i) => (
            <span
              key={step}
              className="px-3 py-1.5 rounded-lg border border-white/10 text-slate-300"
            >
              {i + 1}. {step}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
