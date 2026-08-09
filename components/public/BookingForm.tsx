"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { z } from "zod";

type BookingFormProps = {
  type: "residential" | "commercial";
  schema: z.ZodType;
  fields: { name: string; label: string; type?: string; options?: string[] }[];
};

export default function BookingForm({ type, schema, fields }: BookingFormProps) {
  const [refNo, setRefNo] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: Record<string, string>) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/bookings/${type}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (res.ok) {
        setRefNo(json.referenceNo);
        reset();
      } else {
        setError(json.error?.message ?? "Something went wrong");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (refNo) {
    return (
      <div className="glass p-8 text-center">
        <div className="text-5xl mb-4">🎉</div>
        <h3 className="text-white font-semibold text-xl mb-2">Booking Confirmed!</h3>
        <p className="text-slate-400 mb-4">Your reference number is:</p>
        <div className="font-mono text-brand-cyan text-xl font-bold bg-brand-cyan/10 px-4 py-3 rounded-lg inline-block">
          {refNo}
        </div>
        <p className="text-slate-500 text-sm mt-4">Our team will contact you within 24 hours.</p>
        <button
          onClick={() => setRefNo(null)}
          className="mt-6 text-sm text-slate-400 hover:text-white transition-colors"
        >
          Submit another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit as never)} className="glass p-6 space-y-4">
      {fields.map(({ name, label, type: fieldType, options }) => (
        <div key={name}>
          <label className="block text-sm text-slate-300 mb-1.5">{label}</label>
          {options ? (
            <select
              {...register(name)}
              className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-brand-cyan/40 text-sm"
            >
              <option value="" disabled>Select {label}</option>
              {options.map((opt) => (
                <option key={opt} value={opt} className="bg-brand-navy">
                  {opt.charAt(0).toUpperCase() + opt.slice(1).replace(/-/g, " ")}
                </option>
              ))}
            </select>
          ) : (
            <input
              {...register(name)}
              type={fieldType ?? "text"}
              className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan/40 text-sm"
            />
          )}
          {errors[name] && (
            <p className="text-red-400 text-xs mt-1">
              {(errors[name]?.message as string) ?? "Required"}
            </p>
          )}
        </div>
      ))}

      {error && (
        <div className="text-red-400 text-sm bg-red-400/10 p-3 rounded-lg">{error}</div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-gradient-to-r from-brand-blue to-brand-cyan text-white rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {loading ? "Submitting..." : "Submit Booking Enquiry"}
      </button>
    </form>
  );
}
