"use client";

import { useState, useEffect } from "react";
import {
  Map,
  MapMarker,
  MarkerContent,
  MapControls,
  MapPopup,
  MapRoute,
} from "@/components/ui/map";
import { Truck, AlertTriangle, Recycle } from "lucide-react";

const TRUCK_DATA = [
  {
    id: "B-5566-DLH",
    status: "ON_ROUTE" as const,
    driver: "Bambang Pamungkas",
    route: "Zone C → Bantar Gebang",
    speed: 45,
    weight: 8.5,
    baseLng: 106.845,
    baseLat: -6.215,
    targetLng: 106.9926,
    targetLat: -6.3495,
  },
  {
    id: "B-7722-DLH",
    status: "VIOLATION" as const,
    driver: "Eko Prasetyo",
    route: "Tol Slipi — Kecepatan Berlebih",
    speed: 85,
    weight: 6.2,
    baseLng: 106.795,
    baseLat: -6.19,
    targetLng: 106.9926,
    targetLat: -6.3495,
  },
  {
    id: "B-9988-DLH",
    status: "IDLE" as const,
    driver: "Rudi Hartono",
    route: "Area Menteng — Parkir",
    speed: 0,
    weight: 3.1,
    baseLng: 106.8456,
    baseLat: -6.1944,
    targetLng: 106.8456,
    targetLat: -6.1944,
  },
];

const ROUTE_COORDS: [number, number][] = [
  [106.845, -6.215],
  [106.86, -6.225],
  [106.88, -6.24],
  [106.91, -6.26],
  [106.935, -6.285],
  [106.955, -6.31],
  [106.975, -6.33],
  [106.9926, -6.3495],
];

function getStatusColor(status: string) {
  switch (status) {
    case "ON_ROUTE": return "#2d9f6c";
    case "VIOLATION": return "#ef4444";
    case "IDLE": return "#df8820";
    default: return "#9ca3af";
  }
}

function getStatusLabel(status: string) {
  switch (status) {
    case "ON_ROUTE": return "ON ROUTE";
    case "VIOLATION": return "PELANGGARAN";
    case "IDLE": return "IDLE";
    default: return status;
  }
}

export default function LandingMap() {
  const [selectedTruck, setSelectedTruck] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => (p + 0.005) % 1);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const getTruckPosition = (truck: typeof TRUCK_DATA[0]) => {
    if (truck.status === "IDLE") return { lng: truck.baseLng, lat: truck.baseLat };
    const t = truck.status === "VIOLATION" ? (progress + 0.4) % 1 : progress;
    const lng = truck.baseLng + (truck.targetLng - truck.baseLng) * t;
    const lat = truck.baseLat + (truck.targetLat - truck.baseLat) * t;
    return { lng, lat };
  };

  const selected = TRUCK_DATA.find((t) => t.id === selectedTruck);
  const selectedPos = selected ? getTruckPosition(selected) : null;

  return (
    <div className="h-full w-full rounded-2xl overflow-hidden">
      <Map
        center={[106.89, -6.26]}
        zoom={11.2}
        className="h-full w-full"
      >
        <MapControls position="bottom-right" showZoom showFullscreen />

        <MapRoute
          coordinates={ROUTE_COORDS}
          color="#2d9f6c"
          width={3}
          opacity={0.6}
          dashArray={[4, 4]}
          interactive={false}
        />

        {/* TPA Bantar Gebang marker */}
        <MapMarker longitude={106.9926} latitude={-6.3495}>
          <MarkerContent>
            <div className="flex flex-col items-center">
              <div className="px-2 py-0.5 bg-[#2d9f6c] text-white text-[8px] font-extrabold rounded shadow-md whitespace-nowrap">
                TPA Bantar Gebang
              </div>
              <div className="w-5 h-5 mt-1 rounded-full bg-[#2d9f6c] border-2 border-white shadow-lg flex items-center justify-center">
                <Recycle className="w-3 h-3 text-white" />
              </div>
            </div>
          </MarkerContent>
        </MapMarker>

        {/* Truck markers */}
        {TRUCK_DATA.map((truck) => {
          const pos = getTruckPosition(truck);
          const color = getStatusColor(truck.status);
          return (
            <MapMarker
              key={truck.id}
              longitude={pos.lng}
              latitude={pos.lat}
              onClick={() => setSelectedTruck(truck.id === selectedTruck ? null : truck.id)}
            >
              <MarkerContent>
                <div className="flex flex-col items-center cursor-pointer transition-transform hover:scale-110">
                  <div
                    className="px-2 py-0.5 text-[9px] font-extrabold text-white rounded shadow-sm"
                    style={{ backgroundColor: color }}
                  >
                    {truck.id}
                  </div>
                  <div
                    className={`w-4 h-4 mt-1 rounded-full border-2 border-white shadow-md flex items-center justify-center ${
                      truck.status === "VIOLATION" ? "animate-pulse" : ""
                    }`}
                    style={{ backgroundColor: color, boxShadow: `0 0 8px ${color}` }}
                  >
                    <Truck className="w-2.5 h-2.5 text-white" />
                  </div>
                </div>
              </MarkerContent>
            </MapMarker>
          );
        })}

        {/* Selected truck popup */}
        {selected && selectedPos && (
          <MapPopup
            longitude={selectedPos.lng}
            latitude={selectedPos.lat}
            onClose={() => setSelectedTruck(null)}
            closeButton
            className="!max-w-[260px] !p-3"
          >
            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="font-extrabold text-sm font-mono">{selected.id}</span>
                <span
                  className="text-[9px] font-extrabold px-2 py-0.5 rounded-full text-white"
                  style={{ backgroundColor: getStatusColor(selected.status) }}
                >
                  {getStatusLabel(selected.status)}
                </span>
              </div>
              <div className="space-y-1 pt-1 border-t">
                <div className="flex justify-between">
                  <span className="text-zinc-400">Pengemudi:</span>
                  <span className="font-semibold">{selected.driver}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Kecepatan:</span>
                  <span className="font-semibold">{selected.speed} km/h</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Muatan:</span>
                  <span className="font-semibold">{selected.weight} Ton</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Rute:</span>
                  <span className="font-semibold truncate max-w-[120px]">{selected.route}</span>
                </div>
              </div>
              {selected.status === "VIOLATION" && (
                <div className="flex items-start gap-1.5 p-2 bg-red-50 border border-red-200 rounded-lg mt-1">
                  <AlertTriangle className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                  <p className="text-[10px] text-red-700 font-medium">
                    Kecepatan berlebih 85 km/h di Tol Slipi — melebihi batas 60 km/h
                  </p>
                </div>
              )}
            </div>
          </MapPopup>
        )}
      </Map>
    </div>
  );
}
