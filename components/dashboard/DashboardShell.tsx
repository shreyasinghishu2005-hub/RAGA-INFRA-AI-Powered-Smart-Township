"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import {
  LayoutDashboard, Shield, Building2, GraduationCap, Hospital,
  Home, Briefcase, Landmark, Sun, Droplets, Brain, BarChart3,
  Menu, X, Zap, Bell
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard/super-admin", label: "Super Admin", icon: LayoutDashboard },
  { href: "/dashboard/township", label: "Township", icon: Building2 },
  { href: "/dashboard/ai-command", label: "AI Command", icon: Brain },
  { href: "/dashboard/security", label: "Security", icon: Shield },
  { href: "/dashboard/hospital", label: "Hospital", icon: Hospital },
  { href: "/dashboard/school", label: "School", icon: GraduationCap },
  { href: "/dashboard/resident", label: "Resident", icon: Home },
  { href: "/dashboard/company", label: "Company", icon: Briefcase },
  { href: "/dashboard/government", label: "Government", icon: Landmark },
  { href: "/dashboard/solar", label: "Solar", icon: Sun },
  { href: "/dashboard/water", label: "Water", icon: Droplets },
  { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
];

export default function DashboardShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex bg-brand-navy">
      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-60 glass border-r border-white/10 flex flex-col transition-transform duration-300",
        sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        {/* Logo */}
        <div className="flex items-center gap-2 p-4 border-b border-white/10">
          <div className="w-8 h-8 bg-white/10 border border-white/20 rounded-lg flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="font-bold text-white text-sm">RAGA INFRA</div>
            <div className="text-xs text-slate-500">Command Center</div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setSidebarOpen(false)}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                pathname === item.href
                  ? "bg-white/10 text-white border border-white/20"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              )}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Back to site */}
        <div className="p-3 border-t border-white/10">
          <Link href="/" className="flex items-center gap-2 px-3 py-2 text-sm text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors">
            ← Public Site
          </Link>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 lg:ml-60 flex flex-col min-h-screen">
        {/* Top header */}
        <header className="sticky top-0 z-30 glass border-b border-white/10 px-4 h-14 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <div className="flex-1 lg:flex-none" />
          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-white rounded-full" />
            </button>
            <UserButton afterSignOutUrl="/" />
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
