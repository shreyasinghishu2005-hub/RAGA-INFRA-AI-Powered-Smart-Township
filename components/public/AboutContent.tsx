"use client";

import { motion } from "framer-motion";
import { MapPin, Calendar, Award, Leaf } from "lucide-react";

const milestones = [
  { year: "2023", event: "Land acquisition — 300 acres near Mahindra SEZ" },
  { year: "2024", event: "Master plan approval and foundation work begins" },
  { year: "2025", event: "Phase 1 residential towers and solar farm construction" },
  { year: "2026", event: "Smart systems deployment — AI Command Center goes live" },
  { year: "2027", event: "Phase 2 — Commercial zone and IT Park inauguration" },
];

export default function AboutContent() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">About the Township</h1>
        <p className="text-slate-400 text-lg max-w-2xl mb-12">Raga Infra Smart Township is a vision for the future of urban living — sustainable, connected, and intelligent.</p>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {[
          { icon: MapPin, title: "Prime Location", desc: "Strategically located near Mahindra SEZ, Chennai with excellent connectivity to highways, airports, and city centres." },
          { icon: Leaf, title: "Eco-First Design", desc: "Solar energy, rainwater harvesting, smart irrigation, and green belts make this one of India's most sustainable townships." },
          { icon: Award, title: "AI-Powered Living", desc: "From smart street lights to elder care wearables, every system is driven by AI to deliver safety, efficiency, and comfort." },
          { icon: Calendar, title: "Phased Development", desc: "Planned in phases from 2023–2028, ensuring quality construction with the highest smart city standards." },
        ].map((item, i) => (
          <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass p-6">
            <div className="w-10 h-10 rounded-lg bg-brand-blue/20 flex items-center justify-center mb-4">
              <item.icon className="w-5 h-5 text-brand-cyan" />
            </div>
            <h3 className="font-semibold text-white mb-2">{item.title}</h3>
            <p className="text-slate-400 text-sm">{item.desc}</p>
          </motion.div>
        ))}
      </div>
      <div>
        <h2 className="text-2xl font-bold text-white mb-8">Development Timeline</h2>
        <div className="space-y-4">
          {milestones.map((m, i) => (
            <motion.div key={m.year} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex gap-4 items-start">
              <div className="w-16 shrink-0 text-brand-cyan font-bold">{m.year}</div>
              <div className="flex-1 glass p-4 text-slate-300 text-sm">{m.event}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
