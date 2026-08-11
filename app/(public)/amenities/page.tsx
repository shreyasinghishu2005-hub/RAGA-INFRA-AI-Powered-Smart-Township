"use client";
export const dynamic = "force-dynamic";

import { motion } from "framer-motion";
import { Shield, Sun, Droplets, Wifi, Heart, TreePine, Car, Zap, Building2, ShoppingBag } from "lucide-react";

const amenities = [
  { icon: Shield, cat: "Security", items: ["AI Face Recognition", "24/7 CCTV", "Smart Gates", "Drone Surveillance", "SOS Buttons"] },
  { icon: Sun, cat: "Energy", items: ["30-Acre Solar Farm", "2.4 MW Capacity", "Battery Storage", "Grid Export", "Smart Meters"] },
  { icon: Droplets, cat: "Water", items: ["Water Treatment Plant", "Rainwater Harvesting", "IoT Leak Detection", "Smart Distribution", "Flood Prediction"] },
  { icon: Wifi, cat: "Connectivity", items: ["5G Network", "Fiber Optic", "Township-wide Wi-Fi", "IoT Gateway", "Edge Computing"] },
  { icon: Heart, cat: "Healthcare", items: ["3 Smart Hospitals", "AI Diagnosis", "Elder Care Wearables", "Ambulance Tracking", "Emergency SOS"] },
  { icon: TreePine, cat: "Eco & Parks", items: ["25-Acre Central Park", "Green Belts", "Smart Irrigation", "Walking Tracks", "Open Gym"] },
  { icon: Car, cat: "Transport", items: ["Smart Parking", "EV Charging", "Vehicle Tracking", "School Bus GPS", "Road Safety AI"] },
  { icon: Zap, cat: "AI Utilities", items: ["Smart Street Lights", "Predictive Maintenance", "Fault Detection", "Utility Analytics", "Waste Collection AI"] },
  { icon: Building2, cat: "Commercial", items: ["Shopping Mall", "Food Court", "Cinema", "IT Office Park", "Co-working Spaces"] },
  { icon: ShoppingBag, cat: "Recreation", items: ["Sports Complex", "Party Club", "Swimming Pool", "Petrol Pump", "Community Events"] },
];

export default function AmenitiesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-4xl font-bold text-white mb-4">Amenities</h1>
        <p className="text-slate-400 mb-12">Everything you need, intelligently managed</p>
      </motion.div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {amenities.map((a, i) => (
          <motion.div
            key={a.cat}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="glass p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg bg-brand-blue/20 flex items-center justify-center">
                <a.icon className="w-5 h-5 text-brand-cyan" />
              </div>
              <h3 className="font-semibold text-white">{a.cat}</h3>
            </div>
            <ul className="space-y-1">
              {a.items.map((item) => (
                <li key={item} className="text-slate-400 text-sm flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-brand-cyan rounded-full shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
