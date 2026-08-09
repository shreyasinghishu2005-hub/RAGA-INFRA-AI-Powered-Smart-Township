export type SensorType =
  | "power_kw"
  | "solar_kw"
  | "battery_pct"
  | "water_flow"
  | "water_pressure"
  | "temperature"
  | "humidity"
  | "smoke"
  | "motion"
  | "gas"
  | "flood"
  | "aqi"
  | "noise_db"
  | "heart_rate"
  | "door_status"
  | "waste_pct"
  | "lake_level";

export interface SensorReading {
  deviceId: string;
  type: SensorType;
  value: number;
  unit: string;
  zone: string;
  status: "online" | "offline" | "triggered";
  timestamp: string;
}

const zones = [
  "residential-a",
  "residential-b",
  "premium-villas",
  "commercial-mall",
  "it-park",
  "school-1",
  "school-2",
  "hospital-1",
  "hospital-2",
  "hospital-3",
  "solar-farm",
  "water-plant",
  "central-park",
  "main-gate",
  "government-office",
];

function rand(min: number, max: number, decimals = 1): number {
  return parseFloat((Math.random() * (max - min) + min).toFixed(decimals));
}

function chance(probability: number): boolean {
  return Math.random() < probability;
}

export function generateSensorSnapshot(): SensorReading[] {
  const ts = new Date().toISOString();
  const readings: SensorReading[] = [];

  // Power grid readings per zone
  zones.forEach((zone) => {
    readings.push({
      deviceId: `pwr-${zone}`,
      type: "power_kw",
      value: rand(10, 500),
      unit: "kW",
      zone,
      status: chance(0.97) ? "online" : "offline",
      timestamp: ts,
    });
  });

  // Solar farm
  readings.push({
    deviceId: "solar-main",
    type: "solar_kw",
    value: rand(800, 2400),
    unit: "kW",
    zone: "solar-farm",
    status: "online",
    timestamp: ts,
  });
  readings.push({
    deviceId: "battery-main",
    type: "battery_pct",
    value: rand(30, 95),
    unit: "%",
    zone: "solar-farm",
    status: "online",
    timestamp: ts,
  });

  // Water plant
  readings.push({
    deviceId: "water-flow-main",
    type: "water_flow",
    value: rand(500, 2000),
    unit: "L/hr",
    zone: "water-plant",
    status: "online",
    timestamp: ts,
  });
  readings.push({
    deviceId: "water-pressure-main",
    type: "water_pressure",
    value: rand(2.5, 6.0),
    unit: "bar",
    zone: "water-plant",
    status: "online",
    timestamp: ts,
  });

  // Environmental sensors (3 key zones)
  ["central-park", "residential-a", "commercial-mall"].forEach((zone) => {
    readings.push({
      deviceId: `temp-${zone}`,
      type: "temperature",
      value: rand(22, 38),
      unit: "°C",
      zone,
      status: "online",
      timestamp: ts,
    });
    readings.push({
      deviceId: `aqi-${zone}`,
      type: "aqi",
      value: rand(30, 120),
      unit: "AQI",
      zone,
      status: "online",
      timestamp: ts,
    });
    readings.push({
      deviceId: `noise-${zone}`,
      type: "noise_db",
      value: rand(35, 80),
      unit: "dB",
      zone,
      status: "online",
      timestamp: ts,
    });
  });

  // Safety sensors
  ["residential-a", "commercial-mall", "hospital-1"].forEach((zone) => {
    const smokeVal = chance(0.02) ? rand(50, 100) : rand(0, 15);
    readings.push({
      deviceId: `smoke-${zone}`,
      type: "smoke",
      value: smokeVal,
      unit: "ppm",
      zone,
      status: smokeVal > 40 ? "triggered" : "online",
      timestamp: ts,
    });
    const gasVal = chance(0.02) ? rand(50, 100) : rand(0, 10);
    readings.push({
      deviceId: `gas-${zone}`,
      type: "gas",
      value: gasVal,
      unit: "ppm",
      zone,
      status: gasVal > 30 ? "triggered" : "online",
      timestamp: ts,
    });
  });

  // Motion sensors at gates
  readings.push({
    deviceId: "motion-main-gate",
    type: "motion",
    value: chance(0.3) ? 1 : 0,
    unit: "bool",
    zone: "main-gate",
    status: "online",
    timestamp: ts,
  });

  // Flood sensor at lake
  readings.push({
    deviceId: "lake-level",
    type: "lake_level",
    value: rand(2, 8),
    unit: "m",
    zone: "water-plant",
    status: "online",
    timestamp: ts,
  });

  // Elder care wearable (demo)
  const heartRate = chance(0.03) ? rand(140, 180) : rand(60, 90);
  readings.push({
    deviceId: "wearable-elder-001",
    type: "heart_rate",
    value: heartRate,
    unit: "bpm",
    zone: "residential-b",
    status: heartRate > 130 || heartRate < 45 ? "triggered" : "online",
    timestamp: ts,
  });

  // Waste bins
  ["residential-a", "commercial-mall", "central-park"].forEach((zone) => {
    readings.push({
      deviceId: `waste-${zone}`,
      type: "waste_pct",
      value: rand(10, 100),
      unit: "%",
      zone,
      status: "online",
      timestamp: ts,
    });
  });

  return readings;
}

export function getThreshold(type: SensorType): { min?: number; max?: number } {
  const thresholds: Partial<Record<SensorType, { min?: number; max?: number }>> = {
    smoke: { max: 40 },
    gas: { max: 30 },
    heart_rate: { min: 45, max: 130 },
    aqi: { max: 100 },
    flood: { max: 5 },
    waste_pct: { max: 85 },
    lake_level: { max: 7 },
    battery_pct: { min: 15 },
  };
  return thresholds[type] ?? {};
}

export function isThresholdBreached(reading: SensorReading): boolean {
  const { min, max } = getThreshold(reading.type);
  if (max !== undefined && reading.value > max) return true;
  if (min !== undefined && reading.value < min) return true;
  return false;
}
