"use client";

import { MapContainer, TileLayer, GeoJSON, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect } from "react";

// Fix default marker icons for Next.js
const fixMarkerIcon = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  });
};

// Approximate GeoJSON zones around Mahindra World City, Chennai (12.7°N, 80.0°E)
const CENTER: [number, number] = [12.72, 80.01];

const zones = [
  { name: "Residential Area", color: "#3b82f6", coords: [[80.005, 12.725], [80.01, 12.725], [80.01, 12.73], [80.005, 12.73], [80.005, 12.725]] },
  { name: "Premium Villas", color: "#8b5cf6", coords: [[80.01, 12.72], [80.015, 12.72], [80.015, 12.726], [80.01, 12.726], [80.01, 12.72]] },
  { name: "Commercial Zone", color: "#f59e0b", coords: [[80.0, 12.72], [80.005, 12.72], [80.005, 12.724], [80.0, 12.724], [80.0, 12.72]] },
  { name: "IT Office Park", color: "#a855f7", coords: [[79.995, 12.718], [80.0, 12.718], [80.0, 12.723], [79.995, 12.723], [79.995, 12.718]] },
  { name: "Solar Farm", color: "#eab308", coords: [[80.015, 12.715], [80.022, 12.715], [80.022, 12.72], [80.015, 12.72], [80.015, 12.715]] },
  { name: "Water Plant", color: "#06b6d4", coords: [[80.022, 12.72], [80.026, 12.72], [80.026, 12.723], [80.022, 12.723], [80.022, 12.72]] },
  { name: "Hospitals", color: "#ef4444", coords: [[80.005, 12.715], [80.012, 12.715], [80.012, 12.72], [80.005, 12.72], [80.005, 12.715]] },
  { name: "Schools & Colleges", color: "#10b981", coords: [[79.998, 12.727], [80.005, 12.727], [80.005, 12.732], [79.998, 12.732], [79.998, 12.727]] },
  { name: "Central Park", color: "#22c55e", coords: [[80.01, 12.73], [80.016, 12.73], [80.016, 12.736], [80.01, 12.736], [80.01, 12.73]] },
  { name: "Rainwater Lake", color: "#0ea5e9", coords: [[80.016, 12.726], [80.022, 12.726], [80.022, 12.73], [80.016, 12.73], [80.016, 12.726]] },
];

const landmarks = [
  { pos: [12.726, 80.0075] as [number, number], label: "🏠 Residential Towers" },
  { pos: [12.718, 79.997] as [number, number], label: "🏢 IT Park" },
  { pos: [12.717, 80.009] as [number, number], label: "🏥 Hospital Complex" },
  { pos: [12.717, 80.018] as [number, number], label: "☀️ Solar Farm" },
  { pos: [12.733, 80.013] as [number, number], label: "🌳 Central Park" },
  { pos: [12.721, 80.0] as [number, number], label: "🛍️ Commercial Mall" },
  { pos: [12.728, 80.001] as [number, number], label: "🎓 College Campus" },
  { pos: [12.721, 80.024] as [number, number], label: "💧 Water Plant" },
];

function toLeafletCoords(coords: number[][]): [number, number][] {
  return coords.map(([lng, lat]) => [lat, lng]);
}

export default function TownshipMap() {
  useEffect(() => {
    fixMarkerIcon();
  }, []);

  return (
    <MapContainer
      center={CENTER}
      zoom={14}
      style={{ height: "600px", width: "100%", background: "#0a0f2e" }}
      className="z-0"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />

      {zones.map((zone) => {
        const latlngs = toLeafletCoords(zone.coords);
        const geoJson = {
          type: "Feature" as const,
          geometry: {
            type: "Polygon" as const,
            coordinates: [zone.coords],
          },
          properties: { name: zone.name },
        };
        return (
          <GeoJSON
            key={zone.name}
            data={geoJson}
            style={{
              fillColor: zone.color,
              fillOpacity: 0.35,
              color: zone.color,
              weight: 2,
            }}
          >
            <Popup>
              <strong>{zone.name}</strong>
            </Popup>
          </GeoJSON>
        );
      })}

      {landmarks.map((lm) => (
        <Marker key={lm.label} position={lm.pos}>
          <Popup>{lm.label}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
