"use client";

import React, { useState } from "react";
import {
  AlertTriangle,
  AlertOctagon,
  Info,
  ShieldAlert,
  Search,
  Filter,
  ChevronDown,
  Clock,
  Truck,
  MapPin,
  Download,
  Eye,
  CheckCircle2,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

type LogType = "VIOLATION" | "WARNING" | "INFO";
type LogStatus = "BARU" | "DIPROSES" | "SELESAI";

interface AlertLog {
  id: string;
  nomor: string;
  trukId: string;
  pengemudi: string;
  tipe: LogType;
  status: LogStatus;
  pesan: string;
  detail: string;
  lokasi: string;
  waktu: string;
  tanggal: string;
}

// ─── Dummy Data ───────────────────────────────────────────────────────────────

const LOGS: AlertLog[] = [
  {
    id: "1", nomor: "ALT-2026-0581",
    trukId: "B-7722-DLH", pengemudi: "Gendut Doni",
    tipe: "VIOLATION", status: "BARU",
    pesan: "Batas Kecepatan Terlampaui",
    detail: "Kecepatan terdeteksi 85 km/h di zona 50 km/h — Tol Jakarta-Bekasi KM 14",
    lokasi: "Tol Jakarta-Bekasi, Jakarta Timur",
    waktu: "10:42", tanggal: "24 Mei 2026",
  },
  {
    id: "2", nomor: "ALT-2026-0580",
    trukId: "B-1234-DLH", pengemudi: "Bambang Pamungkas",
    tipe: "VIOLATION", status: "DIPROSES",
    pesan: "Penyimpangan Rute",
    detail: "Armada keluar dari koridor resmi Jl. M.H. Thamrin ke jalur lambat tanpa izin dispatcher",
    lokasi: "Jl. M.H. Thamrin, Jakarta Pusat",
    waktu: "10:28", tanggal: "24 Mei 2026",
  },
  {
    id: "3", nomor: "ALT-2026-0579",
    trukId: "B-9988-DLH", pengemudi: "Budi Sudarsono",
    tipe: "WARNING", status: "DIPROSES",
    pesan: "Idle Berkepanjangan",
    detail: "Truk berhenti lebih dari 35 menit tanpa konfirmasi aktivitas di area Menteng",
    lokasi: "Jl. Imam Bonjol, Menteng, Jakarta Pusat",
    waktu: "09:55", tanggal: "24 Mei 2026",
  },
  {
    id: "4", nomor: "ALT-2026-0578",
    trukId: "B-2211-DLH", pengemudi: "Hendra Saputra",
    tipe: "WARNING", status: "SELESAI",
    pesan: "Suhu Mesin Tinggi",
    detail: "Sensor mesin melaporkan suhu 98°C, melebihi ambang batas normal (85°C). Armada dialihkan ke bengkel.",
    lokasi: "Garasi DLH Cawang, Jakarta Timur",
    waktu: "09:31", tanggal: "24 Mei 2026",
  },
  {
    id: "5", nomor: "ALT-2026-0577",
    trukId: "B-5566-DLH", pengemudi: "Eko Purjianto",
    tipe: "INFO", status: "SELESAI",
    pesan: "Bongkar Muat Selesai — TPA Bantar Gebang",
    detail: "6.1 Ton sampah berhasil dibongkar di TPST Bantar Gebang. Estimasi: 6.4T. Efisiensi: 95.3%",
    lokasi: "TPST Bantar Gebang, Bekasi",
    waktu: "09:12", tanggal: "24 Mei 2026",
  },
  {
    id: "6", nomor: "ALT-2026-0576",
    trukId: "B-4422-DLH", pengemudi: "Agus Wahyudi",
    tipe: "INFO", status: "SELESAI",
    pesan: "Zona Ancol Selesai Dikoleksi",
    detail: "10 RT di zona Ancol-Pademangan berhasil dikoleksi. Total volume: 5.3 Ton.",
    lokasi: "Pademangan, Jakarta Utara",
    waktu: "08:55", tanggal: "24 Mei 2026",
  },
  {
    id: "7", nomor: "ALT-2026-0575",
    trukId: "B-8833-DLH", pengemudi: "Kurniawan Dwi Y.",
    tipe: "WARNING", status: "DIPROSES",
    pesan: "Fluktuasi Sinyal GPS",
    detail: "Telemetri GPS mengalami kehilangan sinyal selama 4 menit di area padat sinyal Grogol",
    lokasi: "Jl. S. Parman, Grogol, Jakarta Barat",
    waktu: "08:40", tanggal: "24 Mei 2026",
  },
  {
    id: "8", nomor: "ALT-2026-0574",
    trukId: "B-3311-DLH", pengemudi: "Rudi Hermawan",
    tipe: "INFO", status: "SELESAI",
    pesan: "Keberangkatan dari Garasi Pusat",
    detail: "Armada berangkat dari garasi pukul 05:58 WIB menuju Zone F — TPS Kebayoran Baru.",
    lokasi: "Garasi DLH Pusat, Jakarta Selatan",
    waktu: "05:58", tanggal: "24 Mei 2026",
  },
  {
    id: "9", nomor: "ALT-2026-0573",
    trukId: "B-6655-DLH", pengemudi: "Sigit Prayogo",
    tipe: "VIOLATION", status: "SELESAI",
    pesan: "Parkir Ilegal Terdeteksi",
    detail: "Armada berhenti lebih dari 60 menit di bahu jalan Pluit tanpa izin.",
    lokasi: "Jl. Pluit Raya, Penjaringan, Jakarta Utara",
    waktu: "22:15", tanggal: "23 Mei 2026",
  },
  {
    id: "10", nomor: "ALT-2026-0572",
    trukId: "B-5544-DLH", pengemudi: "Fajar Nugroho",
    tipe: "WARNING", status: "SELESAI",
    pesan: "Bahan Bakar Hampir Habis",
    detail: "Level BBM 12% tersisa. Armada diarahkan ke SPBU terdekat di Cakung sebelum melanjutkan rute.",
    lokasi: "Jl. Raya Bekasi, Cakung, Jakarta Timur",
    waktu: "21:40", tanggal: "23 Mei 2026",
  },
  {
    id: "11", nomor: "ALT-2026-0571",
    trukId: "B-8877-DLH", pengemudi: "Wahyu Santoso",
    tipe: "INFO", status: "SELESAI",
    pesan: "Servis Rutin Selesai",
    detail: "Pemeriksaan berkala 1.000 jam selesai di bengkel mitra DLH. Armada kembali siap operasional.",
    lokasi: "Bengkel Mitra DLH, Pasar Minggu",
    waktu: "17:00", tanggal: "23 Mei 2026",
  },
  {
    id: "12", nomor: "ALT-2026-0570",
    trukId: "B-1199-DLH", pengemudi: "Dedi Kurniawan",
    tipe: "VIOLATION", status: "SELESAI",
    pesan: "Muatan Melebihi Kapasitas",
    detail: "Sensor berat mendeteksi 10.2 Ton di armada berkapasitas 8.8 Ton. Potensi kerusakan jalan.",
    lokasi: "TPS Cipayung, Jakarta Timur",
    waktu: "15:30", tanggal: "23 Mei 2026",
  },
];

// ─── Config ────────────────────────────────────────────────────────────────────

const TYPE_CONFIG: Record<LogType, {
  label: string; color: string; bg: string; border: string; icon: React.ElementType;
}> = {
  VIOLATION: { label: "Pelanggaran", color: "text-red-600", bg: "bg-red-50", border: "border-red-200", icon: AlertOctagon },
  WARNING:   { label: "Peringatan",  color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-200", icon: AlertTriangle },
  INFO:      { label: "Informasi",   color: "text-blue-600",  bg: "bg-blue-50",  border: "border-blue-100",  icon: Info },
};

const STATUS_CONFIG: Record<LogStatus, { label: string; color: string; bg: string }> = {
  BARU:      { label: "Baru",      color: "text-red-600",   bg: "bg-red-50" },
  DIPROSES:  { label: "Diproses",  color: "text-amber-600", bg: "bg-amber-50" },
  SELESAI:   { label: "Selesai",   color: "text-[#2d9f6c]", bg: "bg-[#ebf7f2]" },
};

// ─── Component ─────────────────────────────────────────────────────────────────

export default function AlertLogs() {
  const [search, setSearch] = useState("");
  const [filterTipe, setFilterTipe] = useState<LogType | "SEMUA">("SEMUA");
  const [filterStatus, setFilterStatus] = useState<LogStatus | "SEMUA">("SEMUA");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const violations = LOGS.filter(l => l.tipe === "VIOLATION").length;
  const warnings   = LOGS.filter(l => l.tipe === "WARNING").length;
  const infos      = LOGS.filter(l => l.tipe === "INFO").length;
  const baru       = LOGS.filter(l => l.status === "BARU").length;

  const filtered = LOGS.filter(l => {
    const matchSearch = search === "" ||
      l.pesan.toLowerCase().includes(search.toLowerCase()) ||
      l.trukId.toLowerCase().includes(search.toLowerCase()) ||
      l.pengemudi.toLowerCase().includes(search.toLowerCase()) ||
      l.nomor.toLowerCase().includes(search.toLowerCase());
    const matchTipe   = filterTipe === "SEMUA"   || l.tipe   === filterTipe;
    const matchStatus = filterStatus === "SEMUA" || l.status === filterStatus;
    return matchSearch && matchTipe && matchStatus;
  });

  return (
    <div className="flex flex-col gap-6 animate-fade-in">

      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-zinc-900 tracking-tight font-sans flex items-center gap-2">
            <ShieldAlert className="w-6 h-6 text-red-500" />
            Log Pelanggaran &amp; Notifikasi
          </h2>
          <p className="text-sm text-zinc-500 font-sans mt-0.5">
            Riwayat lengkap alert, pelanggaran, dan peristiwa operasional armada DKI Jakarta
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold rounded-xl transition-colors shadow-sm">
          <Download className="w-3.5 h-3.5" />
          Ekspor CSV
        </button>
      </div>

      {/* KPI Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Pelanggaran",  value: violations, color: "border-red-400",    text: "text-red-500",       sub: "butuh tindakan" },
          { label: "Peringatan",   value: warnings,   color: "border-amber-400",  text: "text-amber-500",     sub: "perlu pantau" },
          { label: "Informasi",    value: infos,       color: "border-blue-300",   text: "text-blue-500",      sub: "status normal" },
          { label: "Belum Ditangani", value: baru,    color: "border-zinc-300",   text: "text-zinc-700",      sub: "menunggu respon" },
        ].map((k, i) => (
          <div key={i} className={`bg-white rounded-2xl p-4 border-t-4 ${k.color} shadow-sm`}>
            <p className="text-xs font-semibold text-zinc-400 font-sans">{k.label}</p>
            <p className={`text-3xl font-extrabold tracking-tight font-sans mt-1 ${k.text}`}>{k.value}</p>
            <p className="text-[10px] text-zinc-400 font-sans mt-0.5">{k.sub}</p>
          </div>
        ))}
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input
            type="text"
            placeholder="Cari pesan, nomor truk, pengemudi, atau nomor log..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-sm border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400/30 focus:border-red-400 font-sans bg-white text-zinc-800 placeholder-zinc-400 transition-all"
          />
        </div>
        {/* Tipe Filter */}
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
          <select
            value={filterTipe}
            onChange={e => setFilterTipe(e.target.value as LogType | "SEMUA")}
            className="pl-9 pr-10 py-2.5 text-sm border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400/30 font-sans bg-white text-zinc-700 appearance-none cursor-pointer transition-all"
          >
            <option value="SEMUA">Semua Tipe</option>
            <option value="VIOLATION">Pelanggaran</option>
            <option value="WARNING">Peringatan</option>
            <option value="INFO">Informasi</option>
          </select>
        </div>
        {/* Status Filter */}
        <div className="relative">
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value as LogStatus | "SEMUA")}
            className="pl-4 pr-10 py-2.5 text-sm border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400/30 font-sans bg-white text-zinc-700 appearance-none cursor-pointer transition-all"
          >
            <option value="SEMUA">Semua Status</option>
            <option value="BARU">Baru</option>
            <option value="DIPROSES">Diproses</option>
            <option value="SELESAI">Selesai</option>
          </select>
        </div>
      </div>

      {/* Log List */}
      <div className="flex flex-col gap-3">
        {filtered.length === 0 && (
          <div className="bg-white rounded-2xl border border-zinc-100 p-12 flex flex-col items-center text-center">
            <ShieldAlert className="w-10 h-10 text-zinc-300 mb-3" />
            <p className="text-sm font-semibold text-zinc-400 font-sans">Tidak ada log yang cocok dengan filter.</p>
          </div>
        )}

        {filtered.map(log => {
          const typeCfg   = TYPE_CONFIG[log.tipe];
          const statusCfg = STATUS_CONFIG[log.status];
          const TypeIcon  = typeCfg.icon;
          const isExpanded = expandedId === log.id;

          return (
            <div
              key={log.id}
              className={`bg-white rounded-2xl border shadow-sm overflow-hidden transition-all duration-200 ${
                isExpanded ? `border-l-4 ${typeCfg.border}` : "border-zinc-100 hover:border-zinc-200 hover:shadow-md"
              }`}
            >
              {/* Row */}
              <div
                className="flex items-start gap-4 p-4 cursor-pointer group"
                onClick={() => setExpandedId(isExpanded ? null : log.id)}
              >
                {/* Type Icon */}
                <div className={`p-2.5 rounded-xl shrink-0 mt-0.5 ${typeCfg.bg}`}>
                  <TypeIcon className={`w-5 h-5 ${typeCfg.color} ${log.tipe === "VIOLATION" ? "animate-pulse" : ""}`} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="font-extrabold text-zinc-900 text-sm font-sans">{log.pesan}</span>
                    <span className={`text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider ${typeCfg.bg} ${typeCfg.color}`}>
                      {typeCfg.label}
                    </span>
                    <span className={`text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider ${statusCfg.bg} ${statusCfg.color}`}>
                      {statusCfg.label}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-500 font-sans line-clamp-1 group-hover:line-clamp-none transition-all">
                    {log.detail}
                  </p>
                  <div className="flex items-center gap-4 mt-2 flex-wrap">
                    <div className="flex items-center gap-1.5">
                      <Truck className="w-3 h-3 text-zinc-400" />
                      <span className="text-[11px] font-bold text-zinc-600 font-sans">{log.trukId}</span>
                      <span className="text-[11px] text-zinc-400 font-sans">— {log.pengemudi}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3 h-3 text-zinc-400" />
                      <span className="text-[11px] text-zinc-400 font-sans truncate max-w-[200px]">{log.lokasi}</span>
                    </div>
                  </div>
                </div>

                {/* Time */}
                <div className="text-right shrink-0">
                  <div className="flex items-center gap-1 text-zinc-400 justify-end">
                    <Clock className="w-3 h-3" />
                    <span className="text-[11px] font-bold font-sans">{log.waktu}</span>
                  </div>
                  <span className="text-[10px] text-zinc-300 font-sans">{log.tanggal}</span>
                  <div className="text-[9px] font-mono text-zinc-300 mt-1">{log.nomor}</div>
                </div>
              </div>

              {/* Expanded Detail */}
              {isExpanded && (
                <div className={`border-t ${typeCfg.border} ${typeCfg.bg} px-5 py-4`}>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-sans mb-4">
                    <div>
                      <span className="text-zinc-400 uppercase tracking-wider text-[10px] font-bold block mb-0.5">Nomor Log</span>
                      <span className="font-bold font-mono text-zinc-700">{log.nomor}</span>
                    </div>
                    <div>
                      <span className="text-zinc-400 uppercase tracking-wider text-[10px] font-bold block mb-0.5">No. Armada</span>
                      <span className="font-bold text-zinc-700">{log.trukId}</span>
                    </div>
                    <div>
                      <span className="text-zinc-400 uppercase tracking-wider text-[10px] font-bold block mb-0.5">Pengemudi</span>
                      <span className="font-bold text-zinc-700">{log.pengemudi}</span>
                    </div>
                    <div>
                      <span className="text-zinc-400 uppercase tracking-wider text-[10px] font-bold block mb-0.5">Waktu Kejadian</span>
                      <span className="font-bold text-zinc-700">{log.waktu} — {log.tanggal}</span>
                    </div>
                  </div>
                  <div className="mb-3">
                    <span className="text-zinc-400 uppercase tracking-wider text-[10px] font-bold block mb-1">Detail Lengkap</span>
                    <p className={`text-xs font-sans font-medium ${typeCfg.color}`}>{log.detail}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-zinc-200 text-zinc-600 text-[11px] font-bold rounded-lg hover:bg-zinc-50 transition-colors">
                      <Eye className="w-3.5 h-3.5" /> Lihat di Peta
                    </button>
                    {log.status !== "SELESAI" && (
                      <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[#2d9f6c] text-white text-[11px] font-bold rounded-lg hover:bg-[#247e56] transition-colors">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Tandai Selesai
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between bg-white rounded-2xl border border-zinc-100 px-5 py-3 shadow-sm">
        <span className="text-xs text-zinc-400 font-sans">
          Menampilkan <strong className="text-zinc-600">{filtered.length}</strong> dari <strong className="text-zinc-600">{LOGS.length}</strong> log (Total: 4.821 log historis)
        </span>
        <div className="flex items-center gap-1">
          {["‹", "1", "2", "3", "...", "402", "›"].map((p, i) => (
            <button
              key={i}
              className={`w-8 h-8 rounded-lg text-xs font-bold transition-colors ${
                p === "1"
                  ? "bg-[#df8820] text-white"
                  : "text-zinc-500 hover:bg-zinc-100"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
