"use client";

import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { BarChart3, TrendingUp, Compass, Activity } from "lucide-react";
import { FleetTruck } from "@/types/fleet";

interface AnalyticsChartsProps {
  trucks?: FleetTruck[];
}

export default function AnalyticsCharts({ trucks = [] }: AnalyticsChartsProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Compute status distribution dynamically if trucks data is provided
  const onRouteSim = trucks.filter(t => t.status === "ON_ROUTE").length;
  const violationSim = trucks.filter(t => t.status === "VIOLATION").length;
  const idleSim = trucks.filter(t => t.status === "IDLE").length;

  const onRouteCount = trucks.length > 0 ? 890 + onRouteSim : 892;
  const violationCount = trucks.length > 0 ? 22 + violationSim : 24;
  const idleCount = trucks.length > 0 ? 331 + idleSim : 332;
  const totalFleet = onRouteCount + violationCount + idleCount + 124;

  // Mock data for waste volume per region
  const volumeData = [
    { name: "Jak-Pus", volume: 1240, target: 1300 },
    { name: "Jak-Bar", volume: 2480, target: 2500 },
    { name: "Jak-Tim", volume: 3150, target: 3000 },
    { name: "Jak-Sel", volume: 2820, target: 2900 },
    { name: "Jak-Ut", volume: 2910, target: 2800 }
  ];

  // Mock data for weekly route efficiency
  const efficiencyData = [
    { week: "Minggu 1", efisiensi: 82 },
    { week: "Minggu 2", efisiensi: 85 },
    { week: "Minggu 3", efisiensi: 89 },
    { week: "Minggu 4", efisiensi: 94 },
    { week: "Minggu 5", efisiensi: 98 }
  ];

  // Fleet status distribution mapped to the charts using DLH colors
  const statusData = [
    { name: "On Route", value: onRouteCount, color: "#2d9f6c" },
    { name: "Idle", value: idleCount, color: "#df8820" },
    { name: "Violation", value: violationCount, color: "#ef4444" },
    { name: "Offline", value: 124, color: "#9ca3af" }
  ];

  if (!isMounted) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[350px]">
        <div className="bg-white rounded-2xl p-6 border border-zinc-150 flex items-center justify-center text-zinc-400 font-sans">
          Memuat Grafik Analisis...
        </div>
        <div className="bg-white rounded-2xl p-6 border border-zinc-150 flex items-center justify-center text-zinc-400 font-sans">
          Memuat Tren Efisiensi...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Upper Analytics Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Waste Volume Bar Chart */}
        <div className="bg-white rounded-2xl p-5 border border-zinc-150 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-[#fff4e6] text-[#df8820] rounded-xl">
                <BarChart3 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-extrabold text-zinc-800 font-sans">Volume Sampah Terangkut</h4>
                <p className="text-[10px] text-zinc-400 font-sans">Ton sampah per wilayah administrasi DKI Jakarta</p>
              </div>
            </div>
          </div>
          <div className="h-[280px] w-full text-xs">
            <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
              <BarChart data={volumeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f4f4f5" />
                <XAxis dataKey="name" stroke="#a1a1aa" tickLine={false} />
                <YAxis stroke="#a1a1aa" tickLine={false} />
                <Tooltip />
                <Legend iconType="circle" />
                <Bar dataKey="volume" name="Volume Terangkut (Ton)" fill="#df8820" radius={[4, 4, 0, 0]} />
                <Bar dataKey="target" name="Target Wilayah (Ton)" fill="#e4e4e7" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Route Efficiency Line Chart */}
        <div className="bg-white rounded-2xl p-5 border border-zinc-150 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-[#ebf7f2] text-[#2d9f6c] rounded-xl">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-extrabold text-zinc-800 font-sans">Tren Efisiensi Rute</h4>
                <p className="text-[10px] text-zinc-400 font-sans">Persentase efisiensi ketepatan rute mingguan armada</p>
              </div>
            </div>
          </div>
          <div className="h-[280px] w-full text-xs">
            <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
              <LineChart data={efficiencyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f4f4f5" />
                <XAxis dataKey="week" stroke="#a1a1aa" tickLine={false} />
                <YAxis stroke="#a1a1aa" tickLine={false} domain={[70, 100]} />
                <Tooltip />
                <Legend iconType="circle" />
                <Line
                  type="monotone"
                  dataKey="efisiensi"
                  name="Ketepatan Rute (%)"
                  stroke="#2d9f6c"
                  strokeWidth={3}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bottom Analytics Row: Pie Chart & Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Status Distribution Pie Chart */}
        <div className="bg-white rounded-2xl p-5 border border-zinc-150 shadow-sm flex flex-col lg:col-span-1">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="p-2 bg-zinc-100 text-zinc-500 rounded-xl">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-extrabold text-zinc-800 font-sans">Status Distribusi Armada</h4>
              <p className="text-[10px] text-zinc-400 font-sans">Persentase status {totalFleet.toLocaleString("id-ID")} truk saat ini</p>
            </div>
          </div>
          <div className="h-[200px] w-full relative text-xs">
            <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            {/* Center Label positioned in exact absolute center of parent */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <span className="text-xl font-black text-zinc-800 leading-none">{totalFleet.toLocaleString("id-ID")}</span>
              <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest mt-1">Total Truk</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-zinc-100 text-xs">
            {statusData.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                <span className="text-zinc-500 truncate">{item.name}: <strong>{item.value.toLocaleString("id-ID")}</strong></span>
              </div>
            ))}
          </div>
        </div>

        {/* Live Performance Stats Summary */}
        <div className="bg-white rounded-2xl p-5 border border-zinc-150 shadow-sm flex flex-col lg:col-span-2">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="p-2 bg-[#fff4e6] text-[#df8820] rounded-xl">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-extrabold text-zinc-800 font-sans">Ringkasan Kinerja Hari Ini</h4>
              <p className="text-[10px] text-zinc-400 font-sans">Laporan aktivitas penjemputan sampah lapangan</p>
            </div>
          </div>
          <div className="flex-1 space-y-4 text-sm font-sans pt-2">
            <div className="p-3.5 bg-zinc-50 rounded-xl border border-zinc-150 flex items-center justify-between">
              <div>
                <p className="text-xs text-zinc-500 font-semibold uppercase tracking-wide">TPA Bantar Gebang Queue</p>
                <h5 className="font-extrabold text-zinc-800 mt-0.5">Waktu Antre Rata-rata: <strong>14 Menit</strong></h5>
              </div>
              <span className="text-xs font-bold text-[#2d9f6c] bg-[#ebf7f2] px-2.5 py-1 rounded-full">Lancar ✅</span>
            </div>
            <div className="p-3.5 bg-zinc-50 rounded-xl border border-zinc-150 flex items-center justify-between">
              <div>
                <p className="text-xs text-zinc-500 font-semibold uppercase tracking-wide">Konsumsi BBM Armada</p>
                <h5 className="font-extrabold text-zinc-800 mt-0.5">Rata-rata Konsumsi: <strong>1:4.8 (km/L)</strong></h5>
              </div>
              <span className="text-xs font-bold text-[#df8820] bg-[#fff4e6] px-2.5 py-1 rounded-full">Optimal ⚠️</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
