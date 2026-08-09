import Link from "next/link";
import { Zap, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/20 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-brand-blue to-brand-cyan rounded-lg flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-white text-lg">RAGA INFRA</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              AI Powered Smart Township — 300 acres of sustainable, intelligent living near Mahindra SEZ. Solar energy, smart security, and connected community.
            </p>
            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2 text-slate-400 text-sm">
                <MapPin className="w-4 h-4 text-brand-cyan" />
                Near Mahindra SEZ, Chennai
              </div>
              <div className="flex items-center gap-2 text-slate-400 text-sm">
                <Mail className="w-4 h-4 text-brand-cyan" />
                info@ragainfra.com
              </div>
              <div className="flex items-center gap-2 text-slate-400 text-sm">
                <Phone className="w-4 h-4 text-brand-cyan" />
                +91 98765 43210
              </div>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Township</h3>
            <ul className="space-y-2 text-slate-400 text-sm">
              {["About", "Master Plan", "Live Map", "Gallery", "Amenities"].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase().replace(" ", "-")}`}
                    className="hover:text-brand-cyan transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Booking */}
          <div>
            <h3 className="text-white font-semibold mb-4">Book</h3>
            <ul className="space-y-2 text-slate-400 text-sm">
              {[
                { label: "Residential", href: "/booking/residential" },
                { label: "Commercial", href: "/booking/commercial" },
                { label: "IT Park", href: "/it-park" },
                { label: "Pricing", href: "/pricing" },
                { label: "Contact Us", href: "/contact" },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="hover:text-brand-cyan transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            © 2026 Raga Infra Smart Township. All rights reserved.
          </p>
          <p className="text-slate-500 text-sm">
            Powered by AI · Built for the Future
          </p>
        </div>
      </div>
    </footer>
  );
}
