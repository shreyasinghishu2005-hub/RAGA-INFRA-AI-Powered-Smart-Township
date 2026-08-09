"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const plans = [
  { type: "2BHK Apartment", price: "₹65 Lakh", area: "950 sq ft", features: ["Smart home automation", "24/7 security", "Parking slot", "Solar power backup", "Community amenities"] },
  { type: "3BHK Apartment", price: "₹95 Lakh", area: "1400 sq ft", popular: true, features: ["Smart home automation", "2 parking slots", "Solar power backup", "Premium gym access", "All amenities included"] },
  { type: "Smart Villa", price: "₹1.8 Cr", area: "2800 sq ft", features: ["Full AI automation", "Private garden", "3 car garage", "Dedicated solar panels", "Elder care ready"] },
  { type: "Premium Villa", price: "₹3.5 Cr+", area: "5000+ sq ft", features: ["Ultra-luxury finishes", "Private pool option", "4 car garage", "Smart climate control", "Concierge service"] },
  { type: "Retail Shop", price: "₹45 Lakh/unit", area: "300–800 sq ft", features: ["High footfall location", "Digital payment systems", "Customer analytics", "24/7 security", "Loading bay access"] },
  { type: "Office Space", price: "₹80/sq ft/mo", area: "500–10,000 sq ft", features: ["Grade-A infrastructure", "5G connectivity", "Smart meeting rooms", "EV parking", "Flexible lease terms"] },
];

export default function PricingPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-4xl font-bold text-white mb-4">Pricing</h1>
        <p className="text-slate-400 mb-12">Transparent pricing across all residential and commercial offerings</p>
      </motion.div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan, i) => (
          <motion.div
            key={plan.type}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`glass p-6 flex flex-col relative ${plan.popular ? "border-brand-cyan/40 glow-blue" : ""}`}
          >
            {plan.popular && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs bg-brand-cyan text-brand-navy font-bold px-3 py-1 rounded-full">
                Most Popular
              </span>
            )}
            <div className="mb-4">
              <h3 className="font-semibold text-white mb-1">{plan.type}</h3>
              <div className="text-2xl font-bold text-brand-cyan">{plan.price}</div>
              <div className="text-slate-500 text-sm">{plan.area}</div>
            </div>
            <ul className="space-y-2 flex-1 mb-6">
              {plan.features.map((f) => (
                <li key={f} className="text-slate-400 text-sm flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-brand-green rounded-full" />{f}
                </li>
              ))}
            </ul>
            <Link
              href={plan.type.includes("Office") || plan.type.includes("Retail") ? "/booking/commercial" : "/booking/residential"}
              className="block text-center px-4 py-2 bg-brand-blue/20 border border-brand-blue/40 text-brand-cyan rounded-lg text-sm font-medium hover:bg-brand-blue/40 transition-colors"
            >
              Enquire Now
            </Link>
          </motion.div>
        ))}
      </div>
      <p className="text-slate-500 text-sm text-center mt-8">* Prices are indicative. Contact us for actual pricing and availability.</p>
    </div>
  );
}
