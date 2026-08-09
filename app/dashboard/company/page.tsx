"use client";

import { useState } from "react";
import KPICard from "@/components/dashboard/KPICard";
import { Building2, Users, Car, Calendar } from "lucide-react";

const rooms = [
  { id: "MR-01", name: "Conference Room A", capacity: 20, status: "available" },
  { id: "MR-02", name: "Board Room", capacity: 12, status: "booked" },
  { id: "MR-03", name: "Training Room", capacity: 30, status: "available" },
  { id: "MR-04", name: "Huddle Space 1", capacity: 6, status: "available" },
  { id: "MR-05", name: "Innovation Lab", capacity: 15, status: "booked" },
  { id: "MR-06", name: "Seminar Hall", capacity: 100, status: "available" },
];

export default function CompanyDashboard() {
  const [bookedRoom, setBookedRoom] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Company Dashboard — IT Park</h1>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <KPICard title="Office Occupancy" value="78" unit="%" icon={Building2} status="ok" />
        <KPICard title="Employees Today" value="1,240" icon={Users} status="ok" />
        <KPICard title="Parking Used" value="342" unit="/500" icon={Car} status="ok" />
        <KPICard title="Meetings Today" value="18" icon={Calendar} status="ok" />
      </div>

      <div className="glass p-5">
        <h2 className="font-semibold text-white mb-4">Meeting Room Availability</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {rooms.map((room) => (
            <div key={room.id} className={`border rounded-lg p-4 ${room.status === "available" ? "border-brand-green/20 bg-brand-green/5" : "border-red-500/20 bg-red-500/5"}`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-medium text-sm">{room.name}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${room.status === "available" ? "text-brand-green bg-brand-green/10" : "text-red-400 bg-red-400/10"}`}>
                  {room.status}
                </span>
              </div>
              <div className="text-slate-500 text-xs mb-3">Capacity: {room.capacity} persons</div>
              {room.status === "available" && (
                <button
                  onClick={() => setBookedRoom(room.id === bookedRoom ? null : room.id)}
                  className="w-full py-1.5 bg-brand-blue/20 text-brand-cyan rounded text-xs font-medium hover:bg-brand-blue/30 transition-colors"
                >
                  {bookedRoom === room.id ? "✅ Booked" : "Book Now"}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
