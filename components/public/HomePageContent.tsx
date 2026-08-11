"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Sun, Shield, Heart, Wifi, Building2, Leaf,
  GraduationCap, Hospital, Zap, Droplets, TreePine, Car,
} from "lucide-react";

const stats = [
  { label: "Acres", value: "300" },
  { label: "Zones", value: "17" },
  { label: "Residential Units", value: "5000+" },
  { label: "Solar Capacity", value: "2.4 MW" },
];

const zones = [
  { icon: Building2, title: "Residential", desc: "Smart apartments & premium villas with AI automation", color: "from-blue-500 to-cyan-500", area: "75 Acres" },
  { icon: Building2, title: "IT Office Park", desc: "30-acre tech hub with co-working and innovation centers", color: "from-purple-500 to-pink-500", area: "30 Acres" },
  { icon: GraduationCap, title: "Education Hub", desc: "2 colleges + 2 schools with AI-powered learning", color: "from-green-500 to-teal-500", area: "58 Acres" },
  { icon: Hospital, title: "Healthcare", desc: "3 smart hospitals with AI diagnosis and ambulance tracking", color: "from-red-500 to-orange-500", area: "33 Acres" },
  { icon: Sun, title: "Solar Farm", desc: "2.4 MW solar production with battery storage and grid export", color: "from-yellow-500 to-amber-500", area: "30 Acres" },
  { icon: Leaf, title: "Eco & Parks", desc: "Central park, rainwater lake, green belts and smart irrigation", color: "from-emerald-500 to-green-500", area: "40+ Acres" },
];

const features = [
  { icon: Shield, label: "AI CCTV & Face Recognition" },
  { icon: Zap, label: "Smart Street Lights" },
  { icon: Droplets, label: "Smart Water Management" },
  { icon: Heart, label: "Elder Care Wearables" },
  { icon: Wifi, label: "5G + IoT Network" },
  { icon: TreePine, label: "Smart Irrigation" },
  { icon: Car, label: "EV Charging" },
  { icon: Leaf, label: "Rainwater Harvesting" },
];

export default function HomePageContent() {
  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-4">
        <div className="absolute inset-0 bg-gradient-radial from-brand-blue/20 via-transparent to-transparent" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-blue/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-cyan/10 rounded-full blur-3xl" />
        <div className="relative z-10 text-center max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-cyan/30 bg-brand-cyan/10 text-brand-cyan text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-brand-cyan rounded-full animate-pulse" />
              300 Acres · Near Mahindra SEZ · Chennai
            </span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
            RAGA INFRA{" "}
            <span className="bg-gradient-to-r from-brand-blue via-brand-cyan to-brand-green bg-clip-text text-transparent">
              Smart Township
            </span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="text-slate-300 text-lg sm:text-xl max-w-2xl mx-auto mb-10">
            AI-powered living with solar energy, smart security, elder care, and IoT-connected infrastructure — all in one integrated 300-acre township.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/booking/residential" className="px-8 py-4 bg-gradient-to-r from-brand-blue to-brand-cyan text-white rounded-xl font-semibold hover:opacity-90 transition-opacity glow-blue">
              Book a Property
            </Link>
            <Link href="/map" className="px-8 py-4 glass border border-white/20 text-white rounded-xl font-semibold hover:border-brand-cyan/40 transition-colors">
              Explore Live Map
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 px-4 border-y border-white/10">
        <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
              <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-brand-cyan to-brand-green bg-clip-text text-transparent">{stat.value}</div>
              <div className="text-slate-400 text-sm mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Zones */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Township Zones</h2>
            <p className="text-slate-400 max-w-xl mx-auto">Every acre designed with purpose</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {zones.map((zone, i) => (
              <motion.div key={zone.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass p-6 hover:border-white/20 transition-all group">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${zone.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <zone.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-white">{zone.title}</h3>
                  <span className="text-xs text-brand-cyan bg-brand-cyan/10 px-2 py-1 rounded-full">{zone.area}</span>
                </div>
                <p className="text-slate-400 text-sm">{zone.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-gradient-to-r from-brand-blue/10 via-brand-cyan/5 to-brand-green/10 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center text-2xl sm:text-3xl font-bold text-white mb-10">Smart Features</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {features.map((f, i) => (
              <motion.div key={f.label} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="glass p-4 flex flex-col items-center text-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-brand-blue/20 flex items-center justify-center">
                  <f.icon className="w-5 h-5 text-brand-cyan" />
                </div>
                <span className="text-slate-300 text-sm font-medium">{f.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Ready to live smarter?</h2>
          <p className="text-slate-400 mb-8">Book your property in Raga Infra Smart Township today.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/booking/residential" className="px-8 py-4 bg-brand-blue hover:bg-brand-blue/80 text-white rounded-xl font-semibold transition-colors">Residential Booking</Link>
            <Link href="/booking/commercial" className="px-8 py-4 glass border border-white/20 text-white rounded-xl font-semibold hover:border-brand-cyan/40 transition-colors">Commercial Booking</Link>
            <Link href="/chatbot" className="px-8 py-4 glass border border-brand-green/30 text-brand-green rounded-xl font-semibold hover:bg-brand-green/10 transition-colors">Ask AI Chatbot</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
