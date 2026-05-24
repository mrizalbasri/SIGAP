"use client";

import React, { useState, useEffect } from "react";
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  AreaChart, Area,
} from "recharts";
import {
  BarChart3, TrendingUp, TrendingDown, Activity,
  Fuel, Clock, ShieldCheck, AlertOctagon, Download,
} from "lucide-react";

// ─── Dummy Data ───────────────────────────────────────────────────────────────

const monthlyVolume = [
  { bulan: "Nov", volume: 11820, target: 12000 },
  { bulan: "Des", volume: 12340, target: 12500 },
  { bulan: "Jan", volume: 11950, target: 12000 },
  { bulan: "Feb", volume: 10880, target: 12000 },
  { bulan: "Mar", volume: 12760, target: 12500 },
  { bulan: "Apr", volume: 13120, target: 13000 },
  { bulan: "Mei", volume: 7200,  target: 13000 }, // Current (partial)
];

const violationTrend = [
  { minggu: "Mggu 1 Apr", pelanggaran: 18, peringatan: 32 },
  { minggu: "Mggu 2 Apr", pelanggaran: 22, peringatan: 28 },
  { minggu: "Mggu 3 Apr", pelanggaran: 15, peringatan: 24 },
  { minggu: "Mggu 4 Apr", pelanggaran: 11, peringatan: 19 },
  { minggu: "Mggu 1 Mei", pelanggaran: 14, peringatan: 22 },
  { minggu: "Mggu 2 Mei", pelanggaran: 9,  peringatan: 15 },
  { minggu: "Mggu 3 Mei", pelanggaran: 7,  peringatan: 12 },
];

const fuelEfficiency = [
  { bulan: "Nov", kmL: 4.2 }, { bulan: "Des", kmL: 4.1 },
  { bulan: "Jan", kmL: 4.3 }, { bulan: "Feb", kmL: 4.4 },
  { bulan: "Mar", kmL: 4.5 }, { bulan: "Apr", kmL: 4.7 },
  { bulan: "Mei", kmL: 4.8 },
];

const routeByWilayah = [
  { wilayah: "Jakarta Pusat",  selesai: 92, tertunda: 4 },
  { wilayah: "Jakarta Barat",  selesai: 87, tertunda: 7 },
  { wilayah: "Jakarta Timur",  selesai: 95, tertunda: 3 },
  { wilayah: "Jakarta Selatan",selesai: 89, tertunda: 5 },
  { wilayah: "Jakarta Utara",  selesai: 91, tertunda: 4 },
];

const fleetStatus = [
  { name: "Aktif Beroperasi", value: 892, color: "#2d9f6c" },
  { name: "Idle / Standby",   value: 331, color: "#df8820" },
  { name: "Pelanggaran",      value: 22,  color: "#ef4444" },
  { name: "Offline",          value: 124, color: "#9ca3af" },
];

const topViolators = [
  { trukId: "B-7722-DLH", pengemudi: "Gendut Doni",      jumlah: 8, tipe: "Kecepatan Berlebih" },
  { trukId: "B-1234-DLH", pengemudi: "Bambang Pamungkas", jumlah: 6, tipe: "Penyimpangan Rute" },
  { trukId: "B-9988-DLH", pengemudi: "Budi Sudarsono",   jumlah: 5, tipe: "Idle Berkepanjangan" },
  { trukId: "B-6655-DLH", pengemudi: "Sigit Prayogo",    jumlah: 4, tipe: "Parkir Ilegal" },
  { trukId: "B-1199-DLH", pengemudi: "Dedi Kurniawan",   jumlah: 3, tipe: "Muatan Berlebih" },
];

// ─── Component ─────────────────────────────────────────────────────────────────

export default function Analytics() {
  const [isMounted, setIsMounted] = useState(false);
  const [period, setPeriod] = useState<"7H" | "30H" | "6B" | "1T">("6B");

  useEffect(() => { setIsMounted(true); }, []);

  const kpis = [
    { label: "Volume Mei (Ton)",    value: "7.200",  sub: "+4.8% vs bulan lalu",  trend: "up",   color: "border-[#df8820]",  text: "text-[#df8820]" },
    { label: "Efisiensi Rute",      value: "91.2%",  sub: "+2.1% dari target",    trend: "up",   color: "border-[#2d9f6c]", text: "text-[#2d9f6c]" },
    { label: "Konsumsi BBM",        value: "4.8 km/L", sub: "Efisiensi terbaik YTD", trend: "up", color: "border-blue-400",  text: "text-blue-600" },
    { label: "Pelanggaran Aktif",   value: "22",     sub: "−38% dari bulan lalu", trend: "down", color: "border-red-400",   text: "text-red-500" },
  ];

  if (!isMounted) {
    return (
      <div className="grid grid-cols-2 gap-6 min-h-[400px]">
        {[1,2,3,4].map(i => (
          <div key={i} className="bg-white rounded-2xl border border-zinc-100 flex items-center justify-center h-48 text-zinc-300 text-sm font-sans">
            Memuat Grafik...
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 animate-fade-in">

      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-zinc-900 tracking-tight font-sans flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-[#df8820]" />
            Analitik &amp; Laporan Kinerja
          </h2>
          <p className="text-sm text-zinc-500 font-sans mt-0.5">
            Dasbor analitik operasional armada sampah DKI Jakarta — Data per 24 Mei 2026
          </p>
        </div>
        <div className="flex items-center gap-2">
          {/* Period Selector */}
          <div className="flex bg-zinc-100 rounded-xl p-1 gap-1">
            {(["7H","30H","6B","1T"] as const).map(p => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  period === p
                    ? "bg-white text-[#df8820] shadow-sm"
                    : "text-zinc-500 hover:text-zinc-700"
                }`}
              >
                {p === "7H" ? "7 Hari" : p === "30H" ? "30 Hari" : p === "6B" ? "6 Bulan" : "1 Tahun"}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold rounded-xl transition-colors shadow-sm">
            <Download className="w-3.5 h-3.5" /> Ekspor
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((k, i) => (
          <div key={i} className={`bg-white rounded-2xl p-5 border-t-4 ${k.color} shadow-sm`}>
            <p className="text-xs font-semibold text-zinc-400 font-sans">{k.label}</p>
            <p className={`text-2xl font-extrabold tracking-tight font-sans mt-1 ${k.text}`}>{k.value}</p>
            <div className="flex items-center gap-1 mt-1">
              {k.trend === "up"
                ? <TrendingUp className="w-3 h-3 text-[#2d9f6c]" />
                : <TrendingDown className="w-3 h-3 text-red-500" />
              }
              <p className={`text-[10px] font-semibold font-sans ${k.trend === "up" ? "text-[#2d9f6c]" : "text-red-500"}`}>
                {k.sub}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Row 1: Volume Bulanan + Tren Pelanggaran */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Volume Sampah Bulanan */}
        <div className="bg-white rounded-2xl p-5 border border-zinc-100 shadow-sm">
          <div className="flex items-center gap-2.5 mb-5">
            <div className="p-2 bg-[#fff4e6] text-[#df8820] rounded-xl">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-extrabold text-zinc-800 font-sans">Volume Sampah Bulanan</h4>
              <p className="text-[10px] text-zinc-400 font-sans">Ton terangkut vs target 6 bulan terakhir</p>
            </div>
          </div>
          <div className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%" minWidth={0}>
              <AreaChart data={monthlyVolume}>
                <defs>
                  <linearGradient id="volGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#df8820" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#df8820" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f4f4f5" />
                <XAxis dataKey="bulan" stroke="#a1a1aa" tickLine={false} tick={{ fontSize: 11 }} />
                <YAxis stroke="#a1a1aa" tickLine={false} tick={{ fontSize: 11 }} />
                <Tooltip />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 11 }} />
                <Area type="monotone" dataKey="volume" name="Aktual (Ton)" stroke="#df8820" strokeWidth={2.5} fill="url(#volGrad)" />
                <Line type="monotone" dataKey="target" name="Target (Ton)" stroke="#e4e4e7" strokeWidth={2} strokeDasharray="5 5" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Tren Pelanggaran */}
        <div className="bg-white rounded-2xl p-5 border border-zinc-100 shadow-sm">
          <div className="flex items-center gap-2.5 mb-5">
            <div className="p-2 bg-red-50 text-red-500 rounded-xl">
              <AlertOctagon className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-extrabold text-zinc-800 font-sans">Tren Pelanggaran Mingguan</h4>
              <p className="text-[10px] text-zinc-400 font-sans">Jumlah insiden per minggu — tren menurun ✅</p>
            </div>
          </div>
          <div className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%" minWidth={0}>
              <BarChart data={violationTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f4f4f5" />
                <XAxis dataKey="minggu" stroke="#a1a1aa" tickLine={false} tick={{ fontSize: 10 }} />
                <YAxis stroke="#a1a1aa" tickLine={false} tick={{ fontSize: 11 }} />
                <Tooltip />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="pelanggaran" name="Pelanggaran" fill="#ef4444" radius={[4,4,0,0]} />
                <Bar dataKey="peringatan"  name="Peringatan"  fill="#f59e0b" radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Row 2: Efisiensi BBM + Capaian per Wilayah */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Efisiensi BBM */}
        <div className="bg-white rounded-2xl p-5 border border-zinc-100 shadow-sm">
          <div className="flex items-center gap-2.5 mb-5">
            <div className="p-2 bg-blue-50 text-blue-500 rounded-xl">
              <Fuel className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-extrabold text-zinc-800 font-sans">Efisiensi BBM Armada</h4>
              <p className="text-[10px] text-zinc-400 font-sans">Rata-rata km/liter per bulan — target: 4.5 km/L</p>
            </div>
          </div>
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%" minWidth={0}>
              <LineChart data={fuelEfficiency}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f4f4f5" />
                <XAxis dataKey="bulan" stroke="#a1a1aa" tickLine={false} tick={{ fontSize: 11 }} />
                <YAxis stroke="#a1a1aa" tickLine={false} domain={[3.8, 5.2]} tick={{ fontSize: 11 }} />
                <Tooltip />
                <Line type="monotone" dataKey="kmL" name="km/Liter" stroke="#3b82f6" strokeWidth={3} dot={{ fill: "#3b82f6", r: 5 }} activeDot={{ r: 7 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Capaian per Wilayah */}
        <div className="bg-white rounded-2xl p-5 border border-zinc-100 shadow-sm">
          <div className="flex items-center gap-2.5 mb-5">
            <div className="p-2 bg-[#ebf7f2] text-[#2d9f6c] rounded-xl">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-extrabold text-zinc-800 font-sans">Capaian Pengangkutan per Wilayah</h4>
              <p className="text-[10px] text-zinc-400 font-sans">Zona selesai vs tertunda hari ini</p>
            </div>
          </div>
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%" minWidth={0}>
              <BarChart data={routeByWilayah} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#f4f4f5" horizontal={false} />
                <XAxis type="number" stroke="#a1a1aa" tickLine={false} tick={{ fontSize: 11 }} />
                <YAxis type="category" dataKey="wilayah" stroke="#a1a1aa" tickLine={false} tick={{ fontSize: 10 }} width={110} />
                <Tooltip />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="selesai"  name="Zona Selesai"  fill="#2d9f6c" radius={[0,4,4,0]} />
                <Bar dataKey="tertunda" name="Zona Tertunda" fill="#f59e0b" radius={[0,4,4,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Row 3: Pie Status + Top Violators */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Distribusi Status Armada */}
        <div className="bg-white rounded-2xl p-5 border border-zinc-100 shadow-sm">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="p-2 bg-zinc-100 text-zinc-500 rounded-xl">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-extrabold text-zinc-800 font-sans">Distribusi Status Armada</h4>
              <p className="text-[10px] text-zinc-400 font-sans">1.369 total truk saat ini</p>
            </div>
          </div>
          <div className="relative h-[180px]">
            <ResponsiveContainer width="100%" height="100%" minWidth={0}>
              <PieChart>
                <Pie data={fleetStatus} cx="50%" cy="50%" innerRadius={55} outerRadius={75} paddingAngle={4} dataKey="value">
                  {fleetStatus.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none">
              <span className="text-xl font-black text-zinc-800 leading-none">1.369</span>
              <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest mt-0.5">Total</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-zinc-100">
            {fleetStatus.map((s, i) => (
              <div key={i} className="flex items-center gap-1.5 text-xs font-sans">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: s.color }} />
                <span className="text-zinc-500 truncate">{s.name}: <strong className="text-zinc-700">{s.value.toLocaleString("id-ID")}</strong></span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Pelanggar */}
        <div className="bg-white rounded-2xl p-5 border border-zinc-100 shadow-sm lg:col-span-2">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="p-2 bg-red-50 text-red-500 rounded-xl">
              <AlertOctagon className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-extrabold text-zinc-800 font-sans">Top 5 Armada — Pelanggaran Terbanyak (Bulan Ini)</h4>
              <p className="text-[10px] text-zinc-400 font-sans">Data dummy untuk keperluan demo sistem</p>
            </div>
          </div>
          <div className="space-y-3">
            {topViolators.map((v, i) => (
              <div key={i} className="flex items-center gap-4 p-3 bg-zinc-50 rounded-xl border border-zinc-100 hover:border-red-200 transition-colors">
                <div className="w-7 h-7 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs font-black shrink-0">
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] font-bold text-zinc-700">{v.trukId}</span>
                    <span className="text-[10px] text-zinc-400 font-sans">— {v.pengemudi}</span>
                  </div>
                  <span className="text-[10px] text-zinc-500 font-sans">{v.tipe}</span>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-sm font-extrabold text-red-500 font-sans">{v.jumlah}</span>
                  <span className="text-[10px] text-zinc-400 block font-sans">insiden</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
