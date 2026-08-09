"use client";

import { motion } from "framer-motion";

export default function SchoolsPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-4xl font-bold text-white mb-4">Schools & Colleges</h1>
        <p className="text-slate-400 mb-12">World-class education institutions within the township</p>
      </motion.div>
      <div className="space-y-6">
        {[
          { name: "School 1 — Primary School", area: "10 Acres", features: ["Primary education (Class 1–8)", "AI-assisted attendance tracking", "Parent portal with real-time updates", "GPS-tracked school transport", "Smart classrooms"] },
          { name: "School 2 — Secondary School", area: "8 Acres", features: ["Secondary education (Class 9–12)", "Digital classroom with AI learning", "RFID student entry/exit tracking", "Science & computer labs", "Sports complex access"] },
          { name: "College 1 — Engineering College", area: "25 Acres", features: ["B.Tech / M.Tech programs", "Research & innovation center", "Library with 50,000+ volumes", "Hostel facility", "Sports complex"] },
          { name: "College 2 — Management College", area: "15 Acres", features: ["MBA & BBA programs", "Training center", "Innovation labs", "Corporate tie-ups", "Placement cell"] },
        ].map((inst, i) => (
          <motion.div
            key={inst.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <h3 className="font-semibold text-white text-lg">{inst.name}</h3>
              <span className="text-xs text-brand-cyan bg-brand-cyan/10 px-3 py-1 rounded-full">{inst.area}</span>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {inst.features.map((f) => (
                <li key={f} className="text-slate-400 text-sm flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-brand-green rounded-full" />{f}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
