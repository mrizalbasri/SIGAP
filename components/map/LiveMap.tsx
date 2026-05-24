"use client";

import React, { useState, useEffect } from "react";
import Map, { Marker, Popup, NavigationControl, FullscreenControl } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { Truck, Navigation, AlertTriangle, RefreshCw } from "lucide-react";
import { FleetTruck } from "@/types/fleet";

interface LiveMapProps {
  trucks: FleetTruck[];
}

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || "";

export default function LiveMap({ trucks }: LiveMapProps) {
  const [selectedTruck, setSelectedTruck] = useState<FleetTruck | null>(null);
  const [selectedLandmark, setSelectedLandmark] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Update selected truck details when its location changes in real-time
  useEffect(() => {
    if (selectedTruck) {
      const updated = trucks.find(t => t.id === selectedTruck.id);
      if (updated) {
        setSelectedTruck(updated);
      }
    }
  }, [trucks, selectedTruck]);

  // Fail-safe check for empty or placeholder Mapbox tokens
  const isTokenMissing = !MAPBOX_TOKEN || MAPBOX_TOKEN.trim() === "" || MAPBOX_TOKEN.includes("YOUR_MAPBOX_ACCESS_TOKEN_HERE");

  if (isTokenMissing) {
    return (
      <div className="h-[480px] md:h-[600px] w-full rounded-2xl bg-amber-50/70 border border-amber-200 flex items-center justify-center p-6 text-center">
        <div className="flex flex-col items-center gap-3.5 max-w-sm">
          <div className="p-3 bg-amber-100 text-amber-600 rounded-2xl">
            <AlertTriangle className="w-8 h-8 stroke-[2.5]" />
          </div>
          <h4 className="font-extrabold text-zinc-900 text-sm font-sans tracking-tight">Mapbox Access Token Belum Siap</h4>
          <p className="text-zinc-600 text-xs font-sans leading-relaxed">
            Token Mapbox tidak ditemukan atau bernilai kosong di file <code>.env</code> Anda.
          </p>
          <div className="p-3 bg-white/80 border border-zinc-150 rounded-xl text-left w-full text-[10px] font-mono text-zinc-500 space-y-1">
            <p className="font-bold text-zinc-700">Langkah Penyelesaian:</p>
            <p>1. Buka berkas <code>.env</code> di root folder.</p>
            <p>2. Pastikan <code>NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN</code> telah terisi token publik Mapbox Anda.</p>
            <p>3. <strong>RESTART dev server Anda</strong> (jalankan ulang <code>npm run dev</code> di terminal) agar Next.js memuat perubahan lingkungan baru.</p>
          </div>
        </div>
      </div>
    );
  }

  if (!isMounted) {
    return (
      <div className="h-[480px] md:h-[600px] w-full rounded-2xl bg-zinc-100 flex items-center justify-center border border-zinc-200">
        <div className="flex flex-col items-center gap-3">
          <RefreshCw className="w-8 h-8 text-[#df8820] animate-spin" />
          <span className="text-zinc-500 font-sans text-sm font-semibold">Memuat Peta Live Tracking...</span>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ON_ROUTE": return "#2d9f6c"; // Green
      case "VIOLATION": return "#ef4444"; // Red
      case "IDLE": return "#df8820"; // Orange
      default: return "#9ca3af"; // Gray
    }
  };

  return (
    <div className="h-[480px] md:h-[600px] w-full rounded-2xl overflow-hidden shadow-lg border border-zinc-150 relative flex flex-col group">
      {/* Map Header Status Bar */}
      <div className="absolute top-4 left-4 z-10 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-xl flex items-center gap-2.5 border border-zinc-200 shadow-sm transition-all duration-300">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2d9f6c] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2d9f6c]"></span>
        </span>
        <span className="text-xs font-bold text-zinc-800 font-sans tracking-wide">
          DKI Jakarta - Live GPS Dispatch
        </span>
      </div>

      {/* Map Canvas */}
      <Map
        initialViewState={{
          longitude: 106.9099, // Perfectly balanced center between Jakarta (Monas) and Bekasi (Bantar Gebang)
          latitude: -6.2623,
          zoom: 10.8 // Widescreen zoom mapping both starting fleets and Bantar Gebang
        }}
        mapStyle="mapbox://styles/mapbox/light-v11" // Elegant, clean white/light public map style
        mapboxAccessToken={MAPBOX_TOKEN}
        style={{ width: "100%", height: "100%" }}
        onError={(e) => {
          // Quietly log to console without triggering Next.js fast-refresh error overlay
          console.warn("Mapbox telemetry notice (non-fatal):", e.error?.message || e);
        }}
      >
        <NavigationControl position="bottom-right" />
        <FullscreenControl position="bottom-right" />

        {/* TPA Bantar Gebang Final Destination Landmark Pin */}
        <Marker
          longitude={106.9926}
          latitude={-6.3495}
          anchor="bottom"
          onClick={e => {
            e.originalEvent.stopPropagation();
            setSelectedLandmark(true);
            setSelectedTruck(null); // Close truck popup if open
          }}
        >
          <div className="flex flex-col items-center cursor-pointer transition-all duration-200 hover:scale-110 group">
            {/* Custom Glowing Tag Label */}
            <div className="px-2 py-0.5 rounded bg-zinc-900 text-[8px] font-black text-white shadow-md border border-zinc-700 whitespace-nowrap transition-transform duration-200 group-hover:scale-105">
              🏁 TPST Bantar Gebang (Tujuan Akhir)
            </div>
            {/* Custom glowing landmark pin using orange theme */}
            <div 
              className="w-5 h-5 rounded-full border-2 border-white mt-1 shadow-lg flex items-center justify-center transition-all duration-200 animate-pulse"
              style={{ 
                backgroundColor: "#df8820",
                boxShadow: "0 0 12px #df8820"
              }}
            >
              <span className="text-[8px] font-black text-white">TPA</span>
            </div>
          </div>
        </Marker>

        {/* Dynamic Trucks Markers */}
        {trucks.map(truck => {
          const color = getStatusColor(truck.status);
          const isSelected = selectedTruck?.id === truck.id;
          
          return (
            <Marker
              key={truck.id}
              longitude={truck.lng}
              latitude={truck.lat}
              anchor="bottom"
              onClick={e => {
                e.originalEvent.stopPropagation();
                setSelectedTruck(truck);
                setSelectedLandmark(false); // Close landmark popup if open
              }}
            >
              <div className="flex flex-col items-center cursor-pointer transition-all duration-200 hover:scale-110">
                {/* Truck ID Tag */}
                <div className={`px-2 py-0.5 rounded text-[9px] font-black text-white shadow-sm border border-white/20 transition-all duration-200 ${
                  isSelected ? "scale-105 ring-2 ring-white" : ""
                }`} style={{ backgroundColor: color }}>
                  {truck.truckId}
                </div>
                {/* Custom glowing pin */}
                <div 
                  className={`w-3.5 h-3.5 rounded-full border-2 border-white mt-1 shadow-md transition-all duration-200 ${
                    truck.status === "VIOLATION" ? "animate-pulse" : ""
                  }`}
                  style={{ 
                    backgroundColor: color,
                    boxShadow: `0 0 10px ${color}`
                  }}
                />
              </div>
            </Marker>
          );
        })}

        {/* Selected Truck Popup Card */}
        {selectedTruck && (
          <Popup
            longitude={selectedTruck.lng}
            latitude={selectedTruck.lat}
            anchor="top"
            onClose={() => setSelectedTruck(null)}
            closeOnClick={false}
            className="custom-popup"
          >
            <div className="p-1 max-w-[280px] text-zinc-800 font-sans">
              {/* Header */}
              <div className="flex justify-between items-center border-b border-zinc-100 pb-2 mb-2">
                <span className="font-extrabold text-sm font-sans tracking-tight text-zinc-950">
                  {selectedTruck.truckId}
                </span>
                <span 
                  className="text-[9px] font-black px-2 py-0.5 rounded-full text-white"
                  style={{ backgroundColor: getStatusColor(selectedTruck.status) }}
                >
                  {selectedTruck.status.replace("_", " ")}
                </span>
              </div>

              {/* Body stats */}
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-zinc-400">Pengemudi:</span>
                  <span className="font-semibold text-zinc-800">{selectedTruck.driver}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Kecepatan:</span>
                  <span className="font-semibold text-zinc-800">{selectedTruck.speed} km/jam</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Muatan Sampah:</span>
                  <span className="font-semibold text-zinc-800">{selectedTruck.weight} Ton</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Rute Operasional:</span>
                  <span className="font-semibold text-zinc-800 truncate max-w-[150px]">{selectedTruck.route}</span>
                </div>
              </div>

              {/* Violation alert area */}
              {selectedTruck.status === "VIOLATION" && selectedTruck.violationDetail && (
                <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded-lg flex items-start gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <p className="text-[10px] text-red-700 font-medium leading-relaxed">
                    {selectedTruck.violationDetail}
                  </p>
                </div>
              )}
            </div>
          </Popup>
        )}

        {/* TPST Bantar Gebang Landmark Popup Card */}
        {selectedLandmark && (
          <Popup
            longitude={106.9926}
            latitude={-6.3495}
            anchor="top"
            onClose={() => setSelectedLandmark(false)}
            closeOnClick={false}
            className="custom-popup"
          >
            <div className="p-1 max-w-[280px] text-zinc-800 font-sans">
              {/* Header */}
              <div className="flex justify-between items-center border-b border-zinc-100 pb-2 mb-2">
                <span className="font-extrabold text-sm font-sans tracking-tight text-zinc-950">
                  TPST Bantar Gebang
                </span>
                <span className="text-[9px] font-black px-2 py-0.5 rounded-full text-white bg-[#2d9f6c]">
                  OPERASIONAL
                </span>
              </div>

              {/* Body stats */}
              <div className="space-y-2 text-xs">
                <div className="flex flex-col gap-0.5">
                  <span className="text-zinc-400 font-semibold uppercase tracking-wider text-[9px]">Alamat Tujuan:</span>
                  <span className="font-semibold text-zinc-800 leading-tight">
                    RT.002/RW.005, Ciketing Udik, Bantar Gebang, Bekasi, Jawa Barat 17153
                  </span>
                </div>
                <div className="flex justify-between border-t border-zinc-100 pt-1.5">
                  <span className="text-zinc-400">Kapasitas Harian:</span>
                  <span className="font-semibold text-zinc-800">7.500 - 8.000 Ton/Hari</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Antrean Masuk:</span>
                  <span className="font-semibold text-[#2d9f6c]">14 Menit (Lancar)</span>
                </div>
              </div>
            </div>
          </Popup>
        )}
      </Map>
    </div>
  );
}
