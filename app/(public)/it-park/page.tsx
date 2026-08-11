"use client";
export const dynamic = "force-dynamic";

import { motion } from "framer-motion";
import Link from "next/link";

export default function ITParkPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-4xl font-bold text-white mb-4">IT Office Park</h1>
        <p className="text-slate-400 text-lg mb-12">30 acres of cutting-edge workspace for companies and startups</p>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {[
          { title: "Company Buildings", desc: "Grade-A office space with smart access control, automated lighting, and AI-powered energy management." },
          { title: "Startup Hub", desc: "Dedicated space for early-stage startups with flexible terms, mentoring facilities, and networking events." },
          { title: "Innovation Center", desc: "R&D labs, prototyping rooms, and collaboration spaces for tech innovation." },
          { title: "Co-working Spaces", desc: "Hot desks, dedicated desks, and private cabins with high-speed internet and smart conference rooms." },
          { title: "Meeting Rooms", desc: "AI-assisted meeting rooms with video conferencing, digital whiteboards, and automated booking." },
          { title: "Smart Parking", desc: "500+ EV-compatible parking slots with real-time availability tracking and automated billing." },
        ].map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass p-6"
          >
            <h3 className="font-semibold text-white mb-2">{item.title}</h3>
            <p className="text-slate-400 text-sm">{item.desc}</p>
          </motion.div>
        ))}
      </div>
      <div className="text-center">
        <Link href="/booking/commercial" className="px-8 py-4 bg-brand-blue text-white rounded-xl font-semibold hover:opacity-90 transition-opacity">
          Book Office Space
        </Link>
      </div>
    </div>
  );
}
