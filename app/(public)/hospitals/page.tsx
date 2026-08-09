"use client";

import { motion } from "framer-motion";

export default function HospitalsPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-4xl font-bold text-white mb-4">Hospitals</h1>
        <p className="text-slate-400 mb-12">Three smart hospitals serving the township's healthcare needs</p>
      </motion.div>
      <div className="space-y-6">
        {[
          { name: "Hospital 1 — Multi-Specialty", area: "15 Acres", beds: "300+", departments: ["Cardiology", "Neurology", "Oncology", "Emergency", "ICU", "Pediatrics"] },
          { name: "Hospital 2 — General Hospital", area: "10 Acres", beds: "200+", departments: ["General Medicine", "Surgery", "Orthopedics", "Gynecology", "ENT", "Dermatology"] },
          { name: "Hospital 3 — Community Clinic", area: "8 Acres", beds: "100+", departments: ["Primary Care", "Diagnostics", "Pharmacy", "Physiotherapy", "Elder Care"] },
        ].map((h, i) => (
          <motion.div
            key={h.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass p-6"
          >
            <div className="flex flex-wrap items-start justify-between gap-2 mb-4">
              <h3 className="font-semibold text-white text-lg">{h.name}</h3>
              <div className="flex gap-2">
                <span className="text-xs text-red-400 bg-red-400/10 px-3 py-1 rounded-full">{h.area}</span>
                <span className="text-xs text-brand-cyan bg-brand-cyan/10 px-3 py-1 rounded-full">{h.beds} Beds</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {h.departments.map((d) => (
                <span key={d} className="text-xs text-slate-300 bg-white/5 px-2 py-1 rounded">{d}</span>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-white/10 grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm text-slate-400">
              <span>✓ AI Diagnosis Assistant</span>
              <span>✓ Real-time Bed Availability</span>
              <span>✓ Ambulance GPS Tracking</span>
              <span>✓ Emergency Monitoring</span>
              <span>✓ Elder Care Integration</span>
              <span>✓ Digital Records</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
