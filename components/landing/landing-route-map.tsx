"use client";

import { useState } from "react";
import {
  Map,
  MapMarker,
  MarkerContent,
  MapControls,
  MapRoute,
} from "@/components/ui/map";
import { Zap, AlertTriangle, Recycle, MapPin } from "lucide-react";

// Rute manual (lewat Tol Slipi - macet, memutar)
const MANUAL_ROUTE: [number, number][] = [
  [106.845, -6.215],
  [106.82, -6.2],
  [106.795, -6.19],
  [106.79, -6.21],
  [106.81, -6.24],
  [106.84, -6.27],
  [106.87, -6.29],
  [106.91, -6.31],
  [106.94, -6.33],
  [106.97, -6.34],
  [106.9926, -6.3495],
];

// Rute AI optimized (bypass macet, lebih pendek)
const AI_ROUTE: [number, number][] = [
  [106.845, -6.215],
  [106.86, -6.225],
  [106.88, -6.245],
  [106.91, -6.27],
  [106.94, -6.3],
  [106.965, -6.325],
  [106.9926, -6.3495],
];

interface LandingRouteMapProps {
  optimizeActive: boolean;
  onToggle: () => void;
}

export default function LandingRouteMap({ optimizeActive, onToggle }: LandingRouteMapProps) {
  return (
    <div className="absolute inset-0 rounded-2xl overflow-hidden flex flex-col">
      {/* Map area */}
      <div className="relative flex-1">
        <Map
          center={[106.9, -6.27]}
          zoom={11}
          className="h-full w-full"
        >
          <MapControls position="bottom-right" showZoom />

          {/* Manual route (red) */}
          <MapRoute
            id="manual-route"
            coordinates={MANUAL_ROUTE}
            color="#ef4444"
            width={optimizeActive ? 2.5 : 4.5}
            opacity={optimizeActive ? 0.35 : 0.9}
            dashArray={optimizeActive ? [6, 6] : undefined}
            interactive={false}
          />

          {/* AI optimized route (green) */}
          <MapRoute
            id="ai-route"
            coordinates={AI_ROUTE}
            color="#2d9f6c"
            width={optimizeActive ? 5 : 2.5}
            opacity={optimizeActive ? 0.9 : 0.3}
            interactive={false}
          />

          {/* Start marker */}
          <MapMarker longitude={106.845} latitude={-6.215}>
            <MarkerContent>
              <div className="flex flex-col items-center">
                <div className="px-2 py-0.5 bg-blue-500 text-white text-[8px] font-extrabold rounded shadow-md whitespace-nowrap">
                  Start (Zone A)
                </div>
                <div className="w-4 h-4 mt-1 rounded-full bg-blue-500 border-2 border-white shadow-lg flex items-center justify-center">
                  <MapPin className="w-2.5 h-2.5 text-white" />
                </div>
              </div>
            </MarkerContent>
          </MapMarker>

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

          {/* Traffic jam indicator on manual route */}
          {!optimizeActive && (
            <MapMarker longitude={106.795} latitude={-6.19}>
              <MarkerContent>
                <div className="flex items-center gap-1 bg-red-50 border border-red-200 px-2 py-1 rounded-lg animate-pulse shadow-md">
                  <AlertTriangle className="w-3 h-3 text-red-500" />
                  <span className="text-[8px] font-extrabold text-red-600">Tol Slipi Macet</span>
                </div>
              </MarkerContent>
            </MapMarker>
          )}

          {/* AI bypass indicator */}
          {optimizeActive && (
            <MapMarker longitude={106.9} latitude={-6.265}>
              <MarkerContent>
                <div className="flex items-center gap-1 bg-[#ebf7f2] border border-[#2d9f6c]/20 px-2.5 py-1 rounded-lg shadow-sm">
                  <span className="w-1.5 h-1.5 bg-[#2d9f6c] rounded-full animate-ping" />
                  <span className="text-[8px] font-extrabold text-[#2d9f6c] uppercase tracking-wide">AI Bypass Macet</span>
                </div>
              </MarkerContent>
            </MapMarker>
          )}
        </Map>

        {/* Toggle overlay */}
        <div className="absolute top-3 right-3 z-10">
          <button
            onClick={onToggle}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-[10px] font-extrabold shadow-md transition-all cursor-pointer backdrop-blur-sm ${
              optimizeActive
                ? "bg-[#2d9f6c] border-[#2d9f6c] text-white"
                : "bg-white/95 border-zinc-200 text-zinc-500 hover:text-zinc-800"
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${optimizeActive ? "bg-white animate-pulse" : "bg-zinc-400"}`} />
            AI Optimasi: {optimizeActive ? "AKTIF" : "NONAKTIF"}
          </button>
        </div>

        {/* Header overlay */}
        <div className="absolute top-3 left-3 z-10">
          <div className="bg-white/95 backdrop-blur-sm border border-zinc-150 px-3 py-1.5 rounded-xl shadow-sm">
            <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-wider block">AI Rute Simulator</span>
            <span className="text-zinc-800 font-headline font-extrabold text-[12px] flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-[#df8820]" />
              Jakarta Pusat → Bantar Gebang
            </span>
          </div>
        </div>

        {/* Legend overlay */}
        <div className="absolute bottom-3 left-3 z-10 bg-white/95 backdrop-blur-sm border border-zinc-150 px-3 py-2 rounded-xl shadow-sm space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-5 h-0.5 bg-red-500 rounded" style={{ opacity: optimizeActive ? 0.4 : 1 }} />
            <span className="text-[8px] font-bold text-zinc-500">Rute Manual</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-0.5 bg-[#2d9f6c] rounded" style={{ opacity: optimizeActive ? 1 : 0.3 }} />
            <span className="text-[8px] font-bold text-zinc-500">Rute AI Optimized</span>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="bg-zinc-50 border-t border-zinc-150 p-3 grid grid-cols-3 gap-2.5 text-center shrink-0">
        <div>
          <p className="text-[8px] font-bold text-zinc-400 uppercase">Jarak Tempuh</p>
          <p className={`text-[13px] font-headline font-extrabold ${optimizeActive ? "text-[#2d9f6c]" : "text-red-500"}`}>
            {optimizeActive ? "14.2 km" : "22.5 km"}
          </p>
          <span className="text-[7.5px] font-bold text-zinc-400">{optimizeActive ? "Hemat 36%" : "Jalur Memutar"}</span>
        </div>
        <div className="border-x border-zinc-200">
          <p className="text-[8px] font-bold text-zinc-400 uppercase">Waktu Perjalanan</p>
          <p className={`text-[13px] font-headline font-extrabold ${optimizeActive ? "text-[#2d9f6c]" : "text-red-500"}`}>
            {optimizeActive ? "32 Menit" : "75 Menit"}
          </p>
          <span className="text-[7.5px] font-bold text-zinc-400">{optimizeActive ? "Hemat 57%" : "Terjebak Macet"}</span>
        </div>
        <div>
          <p className="text-[8px] font-bold text-zinc-400 uppercase">BBM Terpakai</p>
          <p className={`text-[13px] font-headline font-extrabold ${optimizeActive ? "text-[#2d9f6c]" : "text-red-500"}`}>
            {optimizeActive ? "6.2 Liter" : "10.5 Liter"}
          </p>
          <span className="text-[7.5px] font-bold text-[#2d9f6c] font-extrabold">{optimizeActive ? "Hemat 40.9%" : "Boros BBM"}</span>
        </div>
      </div>
    </div>
  );
}
