import dynamic from "next/dynamic";

const TownshipMap = dynamic(() => import("@/components/public/TownshipMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[600px] glass flex items-center justify-center">
      <div className="text-slate-400">Loading map...</div>
    </div>
  ),
});

export default function MapPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-white mb-2">Live Township Map</h1>
      <p className="text-slate-400 mb-8">
        Interactive map showing all zones of Raga Infra Smart Township near Mahindra SEZ, Chennai.
      </p>
      <div className="rounded-2xl overflow-hidden border border-white/10">
        <TownshipMap />
      </div>
    </div>
  );
}
