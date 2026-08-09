"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Info, XCircle, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Alert {
  id: string;
  type: string;
  severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  title: string;
  description: string;
  zone?: string;
  status: "OPEN" | "ACKNOWLEDGED" | "RESOLVED";
  createdAt: string;
}

interface AlertFeedProps {
  alerts: Alert[];
  onAcknowledge?: (id: string) => void;
  maxItems?: number;
}

const severityStyles = {
  CRITICAL: { bg: "bg-red-500/10 border-red-500/30", text: "text-red-400", icon: XCircle },
  HIGH: { bg: "bg-orange-500/10 border-orange-500/30", text: "text-orange-400", icon: AlertTriangle },
  MEDIUM: { bg: "bg-yellow-500/10 border-yellow-500/30", text: "text-yellow-400", icon: AlertTriangle },
  LOW: { bg: "bg-blue-500/10 border-blue-500/30", text: "text-blue-400", icon: Info },
};

export default function AlertFeed({ alerts, onAcknowledge, maxItems = 20 }: AlertFeedProps) {
  const displayed = alerts.slice(0, maxItems);

  if (displayed.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-slate-500">
        <CheckCircle className="w-8 h-8 mb-2 text-brand-green" />
        <p className="text-sm">No active alerts</p>
      </div>
    );
  }

  return (
    <div className="space-y-2 overflow-y-auto max-h-80 pr-1">
      <AnimatePresence>
        {displayed.map((alert) => {
          const style = severityStyles[alert.severity];
          const Icon = style.icon;
          return (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className={cn("border rounded-lg p-3 flex gap-3", style.bg)}
            >
              <Icon className={cn("w-4 h-4 mt-0.5 shrink-0", style.text)} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-white text-sm font-medium truncate">{alert.title}</span>
                  <span className={cn("text-xs shrink-0", style.text)}>{alert.severity}</span>
                </div>
                <p className="text-slate-400 text-xs mt-0.5 truncate">{alert.description}</p>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-slate-500 text-xs">{alert.zone ?? "Township"} · {new Date(alert.createdAt).toLocaleTimeString()}</span>
                  {alert.status === "OPEN" && onAcknowledge && (
                    <button
                      onClick={() => onAcknowledge(alert.id)}
                      className="text-xs text-brand-cyan hover:underline"
                    >
                      Acknowledge
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
