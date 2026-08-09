"use client";

import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { enquirySchema, type EnquiryInput } from "@/lib/validators/enquiry";
import { useState } from "react";
import { MapPin, Mail, Phone } from "lucide-react";

export default function ContactPage() {
  const [refNo, setRefNo] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<EnquiryInput>({
    resolver: zodResolver(enquirySchema),
    defaultValues: { type: "general" },
  });

  const onSubmit = async (data: EnquiryInput) => {
    setLoading(true);
    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (res.ok) {
        setRefNo(json.referenceNo);
        reset();
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-4xl font-bold text-white mb-4">Contact Us</h1>
        <p className="text-slate-400 mb-12">Get in touch with the Raga Infra sales and support team</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Info */}
        <div className="space-y-6">
          <div className="glass p-6">
            <h3 className="font-semibold text-white mb-4">Township Location</h3>
            <div className="space-y-3 text-slate-400 text-sm">
              <div className="flex items-start gap-3"><MapPin className="w-4 h-4 text-brand-cyan mt-0.5" />Near Mahindra World City (SEZ), Chengalpattu, Tamil Nadu 603 004</div>
              <div className="flex items-center gap-3"><Mail className="w-4 h-4 text-brand-cyan" />info@ragainfra.com</div>
              <div className="flex items-center gap-3"><Phone className="w-4 h-4 text-brand-cyan" />+91 98765 43210</div>
            </div>
          </div>
          <div className="glass p-6">
            <h3 className="font-semibold text-white mb-3">Office Hours</h3>
            <div className="text-slate-400 text-sm space-y-1">
              <div>Mon – Sat: 9:00 AM – 6:00 PM</div>
              <div>Sunday: 10:00 AM – 4:00 PM</div>
            </div>
          </div>
        </div>

        {/* Form */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
          {refNo ? (
            <div className="glass p-8 text-center">
              <div className="text-4xl mb-4">✅</div>
              <h3 className="text-white font-semibold mb-2">Enquiry Submitted!</h3>
              <p className="text-slate-400 text-sm mb-4">Your reference number is:</p>
              <div className="font-mono text-brand-cyan text-lg font-bold">{refNo}</div>
              <button onClick={() => setRefNo(null)} className="mt-6 text-sm text-slate-400 hover:text-white">Submit another</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="glass p-6 space-y-4">
              {[
                { field: "name" as const, label: "Full Name", type: "text" },
                { field: "email" as const, label: "Email Address", type: "email" },
                { field: "phone" as const, label: "Phone Number", type: "tel" },
              ].map(({ field, label, type }) => (
                <div key={field}>
                  <label className="block text-sm text-slate-300 mb-1">{label}</label>
                  <input
                    {...register(field)}
                    type={type}
                    className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan/40 text-sm"
                  />
                  {errors[field] && <p className="text-red-400 text-xs mt-1">{errors[field]?.message}</p>}
                </div>
              ))}
              <div>
                <label className="block text-sm text-slate-300 mb-1">Message</label>
                <textarea
                  {...register("message")}
                  rows={4}
                  className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan/40 text-sm resize-none"
                />
                {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>}
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-brand-blue hover:bg-brand-blue/80 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
              >
                {loading ? "Sending..." : "Send Enquiry"}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
}
