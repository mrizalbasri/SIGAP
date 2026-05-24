"use client";

import React, { useState } from "react";
import {
  Trash2,
  CalendarDays,
  MapPin,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  RotateCcw,
  Search,
  Filter,
  ChevronDown,
  ArrowUpRight,
  Loader2,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

type ZoneStatus = "SELESAI" | "DALAM_PROSES" | "TERJADWAL" | "TERTUNDA";
type WasteType = "Organik" | "Anorganik" | "B3" | "Residu";

interface CollectionZone {
  id: string;
  kode: string;       // e.g. "WIL-A01"
  nama: string;       // Zone name e.g. "Gambir - Monas"
  kelurahan: string;
  kecamatan: string;
  kota: string;
  waktu: string;      // pickup time e.g. "06:00 WIB"
  status: ZoneStatus;
  truk: string;       // assigned truck id
  pengemudi: string;
  totalRt: number;
  rtSelesai: number;
  estimasiTon: number;
  aktualTon: number | null;
  jenisLimbah: WasteType[];
  lastUpdate: string;
}

// ─── Static Data ─────────────────────────────────────────────────────────────

const ZONES: CollectionZone[] = [
  {
    id: "1",
    kode: "WIL-A01",
    nama: "Gambir - Monas",
    kelurahan: "Gambir",
    kecamatan: "Gambir",
    kota: "Jakarta Pusat",
    waktu: "05:30 WIB",
    status: "SELESAI",
    truk: "B-5566-DLH",
    pengemudi: "Eko Purjianto",
    totalRt: 12,
    rtSelesai: 12,
    estimasiTon: 6.4,
    aktualTon: 6.1,
    jenisLimbah: ["Organik", "Anorganik"],
    lastUpdate: "07:45 WIB",
  },
  {
    id: "2",
    kode: "WIL-A02",
    nama: "Menteng - Cikini",
    kelurahan: "Cikini",
    kecamatan: "Menteng",
    kota: "Jakarta Pusat",
    waktu: "06:00 WIB",
    status: "SELESAI",
    truk: "B-9988-DLH",
    pengemudi: "Budi Sudarsono",
    totalRt: 18,
    rtSelesai: 18,
    estimasiTon: 4.8,
    aktualTon: 5.0,
    jenisLimbah: ["Organik", "Residu"],
    lastUpdate: "09:12 WIB",
  },
  {
    id: "3",
    kode: "WIL-B01",
    nama: "Sudirman - Tanah Abang",
    kelurahan: "Petamburan",
    kecamatan: "Tanah Abang",
    kota: "Jakarta Pusat",
    waktu: "06:30 WIB",
    status: "DALAM_PROSES",
    truk: "B-1234-DLH",
    pengemudi: "Bambang Pamungkas",
    totalRt: 22,
    rtSelesai: 14,
    estimasiTon: 8.5,
    aktualTon: null,
    jenisLimbah: ["Organik", "Anorganik", "B3"],
    lastUpdate: "10:42 WIB",
  },
  {
    id: "4",
    kode: "WIL-B02",
    nama: "Senen - Paseban",
    kelurahan: "Paseban",
    kecamatan: "Senen",
    kota: "Jakarta Pusat",
    waktu: "07:00 WIB",
    status: "DALAM_PROSES",
    truk: "B-8833-DLH",
    pengemudi: "Kurniawan Dwi Y.",
    totalRt: 15,
    rtSelesai: 8,
    estimasiTon: 7.1,
    aktualTon: null,
    jenisLimbah: ["Organik", "Residu"],
    lastUpdate: "10:38 WIB",
  },
  {
    id: "5",
    kode: "WIL-C01",
    nama: "Slipi - Palmerah",
    kelurahan: "Palmerah",
    kecamatan: "Palmerah",
    kota: "Jakarta Barat",
    waktu: "07:30 WIB",
    status: "TERTUNDA",
    truk: "B-7722-DLH",
    pengemudi: "Gendut Doni",
    totalRt: 20,
    rtSelesai: 0,
    estimasiTon: 9.0,
    aktualTon: null,
    jenisLimbah: ["Organik", "Anorganik", "B3"],
    lastUpdate: "07:29 WIB",
  },
  {
    id: "6",
    kode: "WIL-C02",
    nama: "Kebayoran Baru - Blok M",
    kelurahan: "Melawai",
    kecamatan: "Kebayoran Baru",
    kota: "Jakarta Selatan",
    waktu: "08:00 WIB",
    status: "TERJADWAL",
    truk: "B-3311-DLH",
    pengemudi: "Rudi Hermawan",
    totalRt: 25,
    rtSelesai: 0,
    estimasiTon: 10.2,
    aktualTon: null,
    jenisLimbah: ["Organik", "Anorganik", "Residu"],
    lastUpdate: "-",
  },
  {
    id: "7",
    kode: "WIL-D01",
    nama: "Ancol - Pademangan",
    kelurahan: "Pademangan",
    kecamatan: "Pademangan",
    kota: "Jakarta Utara",
    waktu: "06:00 WIB",
    status: "SELESAI",
    truk: "B-4422-DLH",
    pengemudi: "Agus Wahyudi",
    totalRt: 10,
    rtSelesai: 10,
    estimasiTon: 5.5,
    aktualTon: 5.3,
    jenisLimbah: ["Organik", "Anorganik"],
    lastUpdate: "08:55 WIB",
  },
  {
    id: "8",
    kode: "WIL-D02",
    nama: "Penjaringan - Pluit",
    kelurahan: "Pluit",
    kecamatan: "Penjaringan",
    kota: "Jakarta Utara",
    waktu: "06:30 WIB",
    status: "TERJADWAL",
    truk: "B-6655-DLH",
    pengemudi: "Sigit Prayogo",
    totalRt: 14,
    rtSelesai: 0,
    estimasiTon: 6.8,
    aktualTon: null,
    jenisLimbah: ["Organik", "Residu", "B3"],
    lastUpdate: "-",
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<
  ZoneStatus,
  { label: string; color: string; bg: string; icon: React.ElementType }
> = {
  SELESAI: {
    label: "Selesai",
    color: "text-[#2d9f6c]",
    bg: "bg-[#ebf7f2]",
    icon: CheckCircle2,
  },
  DALAM_PROSES: {
    label: "Dalam Proses",
    color: "text-blue-600",
    bg: "bg-blue-50",
    icon: Loader2,
  },
  TERJADWAL: {
    label: "Terjadwal",
    color: "text-zinc-500",
    bg: "bg-zinc-100",
    icon: Clock,
  },
  TERTUNDA: {
    label: "Tertunda",
    color: "text-red-500",
    bg: "bg-red-50",
    icon: AlertCircle,
  },
};

const WASTE_TYPE_COLORS: Record<WasteType, string> = {
  Organik: "bg-green-100 text-green-700",
  Anorganik: "bg-blue-100 text-blue-700",
  B3: "bg-red-100 text-red-700",
  Residu: "bg-zinc-100 text-zinc-600",
};

// ─── Component ───────────────────────────────────────────────────────────────

export default function WasteCollection() {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<ZoneStatus | "SEMUA">("SEMUA");
  const [selectedZone, setSelectedZone] = useState<CollectionZone | null>(null);

  // Computed KPIs
  const total = ZONES.length;
  const selesai = ZONES.filter((z) => z.status === "SELESAI").length;
  const dalamProses = ZONES.filter((z) => z.status === "DALAM_PROSES").length;
  const tertunda = ZONES.filter((z) => z.status === "TERTUNDA").length;
  const totalTonAktual = ZONES.reduce((s, z) => s + (z.aktualTon ?? 0), 0);
  const totalTonEstimasi = ZONES.reduce((s, z) => s + z.estimasiTon, 0);

  // Filtered zones
  const filtered = ZONES.filter((z) => {
    const matchSearch =
      search === "" ||
      z.nama.toLowerCase().includes(search.toLowerCase()) ||
      z.kode.toLowerCase().includes(search.toLowerCase()) ||
      z.kecamatan.toLowerCase().includes(search.toLowerCase()) ||
      z.truk.toLowerCase().includes(search.toLowerCase());
    const matchStatus =
      filterStatus === "SEMUA" || z.status === filterStatus;
    return matchSearch && matchStatus;
  });

  return (
    <div className="flex flex-col gap-6 animate-fade-in">

      {/* ── Page Header ─────────────────────────────────────── */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-zinc-900 tracking-tight font-sans flex items-center gap-2">
            <Trash2 className="w-6 h-6 text-[#df8820]" />
            Jadwal Pengambilan Sampah
          </h2>
          <p className="text-sm text-zinc-500 font-sans mt-0.5">
            Monitoring real-time koleksi sampah per wilayah DKI Jakarta — Hari Ini
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#df8820] hover:bg-[#c67315] text-white text-xs font-bold rounded-xl transition-colors shadow-sm">
          <RotateCcw className="w-3.5 h-3.5" />
          Refresh Status
        </button>
      </div>

      {/* ── KPI Summary Bar ─────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          {
            label: "Total Zona",
            value: total,
            sub: "wilayah hari ini",
            color: "border-zinc-300",
            textColor: "text-zinc-700",
          },
          {
            label: "Selesai",
            value: selesai,
            sub: `${Math.round((selesai / total) * 100)}% zona tuntas`,
            color: "border-[#2d9f6c]",
            textColor: "text-[#2d9f6c]",
          },
          {
            label: "Dalam Proses",
            value: dalamProses,
            sub: "sedang berjalan",
            color: "border-blue-400",
            textColor: "text-blue-600",
          },
          {
            label: "Tertunda",
            value: tertunda,
            sub: "perlu perhatian",
            color: "border-red-400",
            textColor: "text-red-500",
          },
          {
            label: "Volume Terkumpul",
            value: `${totalTonAktual.toFixed(1)} T`,
            sub: `dari est. ${totalTonEstimasi.toFixed(1)} Ton`,
            color: "border-[#df8820]",
            textColor: "text-[#df8820]",
          },
        ].map((kpi, i) => (
          <div
            key={i}
            className={`bg-white rounded-2xl p-4 border-t-4 ${kpi.color} shadow-sm hover:shadow-md transition-shadow duration-200`}
          >
            <p className="text-xs font-semibold text-zinc-400 font-sans mb-1">
              {kpi.label}
            </p>
            <p
              className={`text-2xl font-extrabold tracking-tight font-sans ${kpi.textColor}`}
            >
              {kpi.value}
            </p>
            <p className="text-[10px] text-zinc-400 font-sans mt-0.5">
              {kpi.sub}
            </p>
          </div>
        ))}
      </div>

      {/* ── Progress Bar Overall ────────────────────────────── */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-zinc-100">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-bold text-zinc-800 font-sans">
            Progress Koleksi Keseluruhan
          </span>
          <span className="text-sm font-extrabold text-[#2d9f6c] font-sans">
            {Math.round((selesai / total) * 100)}% Selesai
          </span>
        </div>
        <div className="w-full h-3 bg-zinc-100 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{
              width: `${(selesai / total) * 100}%`,
              background: "linear-gradient(90deg, #2d9f6c, #4ade80)",
            }}
          />
        </div>
        <div className="flex gap-4 mt-3 flex-wrap">
          {Object.entries(STATUS_CONFIG).map(([key, cfg]) => {
            const count = ZONES.filter((z) => z.status === key).length;
            return (
              <div key={key} className="flex items-center gap-1.5">
                <span
                  className={`w-2 h-2 rounded-full ${cfg.bg.replace("bg-", "bg-")} border`}
                  style={{
                    backgroundColor:
                      key === "SELESAI"
                        ? "#2d9f6c"
                        : key === "DALAM_PROSES"
                        ? "#2563eb"
                        : key === "TERTUNDA"
                        ? "#ef4444"
                        : "#9ca3af",
                  }}
                />
                <span className="text-[10px] text-zinc-500 font-sans">
                  {cfg.label}: <strong className="text-zinc-700">{count}</strong>
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Filter & Search Bar ─────────────────────────────── */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input
            type="text"
            placeholder="Cari zona, kecamatan, atau nomor truk..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-sm border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#df8820]/30 focus:border-[#df8820] font-sans bg-white text-zinc-800 placeholder-zinc-400 transition-all"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
          <select
            value={filterStatus}
            onChange={(e) =>
              setFilterStatus(e.target.value as ZoneStatus | "SEMUA")
            }
            className="pl-9 pr-10 py-2.5 text-sm border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#df8820]/30 focus:border-[#df8820] font-sans bg-white text-zinc-700 appearance-none cursor-pointer transition-all"
          >
            <option value="SEMUA">Semua Status</option>
            <option value="SELESAI">Selesai</option>
            <option value="DALAM_PROSES">Dalam Proses</option>
            <option value="TERJADWAL">Terjadwal</option>
            <option value="TERTUNDA">Tertunda</option>
          </select>
        </div>
      </div>

      {/* ── Zone Cards Grid ─────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
            <XCircle className="w-10 h-10 text-zinc-300 mb-3" />
            <p className="text-sm font-semibold text-zinc-500 font-sans">
              Tidak ada zona yang cocok dengan filter Anda.
            </p>
          </div>
        )}
        {filtered.map((zone) => {
          const cfg = STATUS_CONFIG[zone.status];
          const StatusIcon = cfg.icon;
          const progress =
            zone.totalRt > 0
              ? Math.round((zone.rtSelesai / zone.totalRt) * 100)
              : 0;

          return (
            <div
              key={zone.id}
              onClick={() =>
                setSelectedZone(selectedZone?.id === zone.id ? null : zone)
              }
              className={`bg-white rounded-2xl border border-zinc-100 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer overflow-hidden group ${
                selectedZone?.id === zone.id
                  ? "ring-2 ring-[#df8820] border-[#df8820]"
                  : "hover:border-zinc-200"
              }`}
            >
              {/* Card Header */}
              <div className="p-5 pb-3">
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[9px] font-black text-zinc-400 font-sans tracking-widest uppercase">
                        {zone.kode}
                      </span>
                    </div>
                    <h3 className="font-extrabold text-zinc-900 text-sm font-sans tracking-tight leading-tight">
                      {zone.nama}
                    </h3>
                    <div className="flex items-center gap-1 mt-1">
                      <MapPin className="w-3 h-3 text-zinc-400 shrink-0" />
                      <span className="text-[10px] text-zinc-400 font-sans">
                        {zone.kecamatan}, {zone.kota}
                      </span>
                    </div>
                  </div>
                  <div
                    className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-[10px] font-bold ${cfg.bg} ${cfg.color} shrink-0`}
                  >
                    <StatusIcon
                      className={`w-3.5 h-3.5 ${zone.status === "DALAM_PROSES" ? "animate-spin" : ""}`}
                    />
                    {cfg.label}
                  </div>
                </div>
              </div>

              {/* Progress */}
              <div className="px-5 pb-3">
                <div className="flex justify-between text-[10px] text-zinc-400 font-sans mb-1.5">
                  <span>RT Selesai: <strong className="text-zinc-700">{zone.rtSelesai}/{zone.totalRt}</strong></span>
                  <span className="font-bold text-zinc-600">{progress}%</span>
                </div>
                <div className="w-full h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${progress}%`,
                      backgroundColor:
                        zone.status === "SELESAI"
                          ? "#2d9f6c"
                          : zone.status === "DALAM_PROSES"
                          ? "#2563eb"
                          : zone.status === "TERTUNDA"
                          ? "#ef4444"
                          : "#d1d5db",
                    }}
                  />
                </div>
              </div>

              {/* Stats Row */}
              <div className="px-5 pb-4 flex items-center justify-between border-t border-zinc-50 pt-3">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3 h-3 text-zinc-400" />
                  <span className="text-[10px] text-zinc-500 font-sans">
                    {zone.waktu}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Trash2 className="w-3 h-3 text-zinc-400" />
                  <span className="text-[10px] font-semibold text-zinc-700 font-sans">
                    {zone.aktualTon !== null
                      ? `${zone.aktualTon} T (aktual)`
                      : `~${zone.estimasiTon} T (est.)`}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[#df8820] opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-[10px] font-bold font-sans">Detail</span>
                  <ArrowUpRight className="w-3 h-3" />
                </div>
              </div>

              {/* Waste Types */}
              <div className="px-5 pb-4 flex flex-wrap gap-1">
                {zone.jenisLimbah.map((jenis) => (
                  <span
                    key={jenis}
                    className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${WASTE_TYPE_COLORS[jenis]}`}
                  >
                    {jenis}
                  </span>
                ))}
              </div>

              {/* Expanded Detail Panel */}
              {selectedZone?.id === zone.id && (
                <div className="border-t border-zinc-100 bg-zinc-50/50 px-5 py-4 space-y-2">
                  <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2 font-sans">
                    Detail Penugasan
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-xs font-sans">
                    <div>
                      <span className="text-zinc-400 block">No. Armada</span>
                      <span className="font-bold text-zinc-800">{zone.truk}</span>
                    </div>
                    <div>
                      <span className="text-zinc-400 block">Pengemudi</span>
                      <span className="font-bold text-zinc-800">{zone.pengemudi}</span>
                    </div>
                    <div>
                      <span className="text-zinc-400 block">Update Terakhir</span>
                      <span className="font-bold text-zinc-800">{zone.lastUpdate}</span>
                    </div>
                    <div>
                      <span className="text-zinc-400 block">Kelurahan</span>
                      <span className="font-bold text-zinc-800">{zone.kelurahan}</span>
                    </div>
                  </div>
                  {zone.status === "TERTUNDA" && (
                    <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
                      <AlertCircle className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                      <p className="text-[10px] text-red-600 font-semibold">
                        Armada mengalami pelanggaran kecepatan. Koordinasi dispatcher diperlukan segera.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ── Daily Summary Table ─────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-zinc-100 flex items-center justify-between">
          <h3 className="font-bold text-zinc-800 font-sans text-sm flex items-center gap-2">
            <CalendarDays className="w-4 h-4 text-[#df8820]" />
            Ringkasan Harian — Semua Zona
          </h3>
          <span className="text-[10px] font-bold text-zinc-400 font-sans uppercase tracking-wider">
            {new Date().toLocaleDateString("id-ID", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs font-sans">
            <thead>
              <tr className="bg-zinc-50 border-b border-zinc-100">
                {["Kode", "Zona", "Waktu", "Armada", "RT Selesai", "Volume", "Status"].map(
                  (h) => (
                    <th
                      key={h}
                      className="px-4 py-3 text-left font-bold text-zinc-400 uppercase tracking-wider text-[10px]"
                    >
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-50">
              {ZONES.map((zone) => {
                const cfg = STATUS_CONFIG[zone.status];
                const StatusIcon = cfg.icon;
                return (
                  <tr
                    key={zone.id}
                    className="hover:bg-zinc-50/70 transition-colors cursor-pointer"
                    onClick={() =>
                      setSelectedZone(
                        selectedZone?.id === zone.id ? null : zone
                      )
                    }
                  >
                    <td className="px-4 py-3 font-mono font-bold text-zinc-500 text-[10px]">
                      {zone.kode}
                    </td>
                    <td className="px-4 py-3 font-semibold text-zinc-800">
                      {zone.nama}
                    </td>
                    <td className="px-4 py-3 text-zinc-500">{zone.waktu}</td>
                    <td className="px-4 py-3 font-mono text-zinc-600">
                      {zone.truk}
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-semibold text-zinc-700">
                        {zone.rtSelesai}
                      </span>
                      <span className="text-zinc-400">/{zone.totalRt}</span>
                    </td>
                    <td className="px-4 py-3 text-zinc-600">
                      {zone.aktualTon !== null
                        ? `${zone.aktualTon} T`
                        : `~${zone.estimasiTon} T`}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-bold ${cfg.bg} ${cfg.color}`}
                      >
                        <StatusIcon
                          className={`w-3 h-3 ${zone.status === "DALAM_PROSES" ? "animate-spin" : ""}`}
                        />
                        {cfg.label}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
