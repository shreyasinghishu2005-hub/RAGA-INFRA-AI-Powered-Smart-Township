"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string | number;
  unit?: string;
  icon: LucideIcon;
  trend?: "up" | "down" | "neutral";
  status?: "ok" | "warning" | "critical";
  subtitle?: string;
}

const statusColors = {
  ok: "border-brand-green/30 bg-brand-green/5",
  warning: "border-yellow-500/30 bg-yellow-500/5",
  critical: "border-red-500/30 bg-red-500/5",
};

const statusIconColors = {
  ok: "bg-brand-green/20 text-brand-green",
  warning: "bg-yellow-500/20 text-yellow-400",
  critical: "bg-red-500/20 text-red-400",
};

export default function KPICard({ title, value, unit, icon: Icon, trend, status = "ok", subtitle }: KPICardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("glass p-5 border", statusColors[status])}
    >
      <div className="flex items-start justify-between mb-3">
        <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center", statusIconColors[status])}>
          <Icon className="w-5 h-5" />
        </div>
        {trend && (
          <span className={cn(
            "text-xs px-2 py-0.5 rounded-full",
            trend === "up" ? "text-brand-green bg-brand-green/10" :
            trend === "down" ? "text-red-400 bg-red-400/10" :
            "text-slate-400 bg-white/5"
          )}>
            {trend === "up" ? "↑" : trend === "down" ? "↓" : "→"}
          </span>
        )}
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-bold text-white">{value}</span>
        {unit && <span className="text-sm text-slate-400">{unit}</span>}
      </div>
      <div className="text-slate-400 text-sm mt-1">{title}</div>
      {subtitle && <div className="text-slate-500 text-xs mt-0.5">{subtitle}</div>}
    </motion.div>
  );
}
