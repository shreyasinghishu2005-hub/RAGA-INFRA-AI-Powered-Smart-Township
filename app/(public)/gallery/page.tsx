"use client";
export const dynamic = "force-dynamic";

import { motion } from "framer-motion";

const images = [
  { src: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600", label: "Main Gate & Security" },
  { src: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600", label: "Residential Towers" },
  { src: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600", label: "Shopping Complex" },
  { src: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600", label: "IT Office Park" },
  { src: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600", label: "Central Park" },
  { src: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=600", label: "Solar Farm" },
  { src: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600", label: "Hospital" },
  { src: "https://images.unsplash.com/photo-1562774053-701939374585?w=600", label: "College Campus" },
  { src: "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=600", label: "Smart Villas" },
];

export default function GalleryPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-4xl font-bold text-white mb-4">Gallery</h1>
        <p className="text-slate-400 mb-10">Visual overview of Raga Infra Smart Township zones and infrastructure</p>
      </motion.div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((img, i) => (
          <motion.div
            key={img.label}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="relative group overflow-hidden rounded-xl"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img.src}
              alt={img.label}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
              <span className="text-white font-medium text-sm">{img.label}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
