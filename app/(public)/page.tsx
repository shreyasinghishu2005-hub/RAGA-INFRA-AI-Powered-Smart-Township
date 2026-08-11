"use client";

import dynamic from "next/dynamic";

const HomePage = dynamic(() => import("@/components/public/HomePageContent"), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-brand-cyan text-lg animate-pulse">Loading Raga Infra...</div>
    </div>
  ),
});

export default function Page() {
  return <HomePage />;
}
