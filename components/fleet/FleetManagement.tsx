"use client";

import React, { useState, useMemo } from "react";
import {
  Truck,
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  MapPin,
  Fuel,
  Wrench,
  User,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  Clock,
  WifiOff,
  Package,
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Navigation,
  Activity,
  FileText,
  Star,
  BarChart2,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

type TruckStatus = "ON_ROUTE" | "IDLE" | "VIOLATION" | "OFFLINE" | "MAINTENANCE";

interface FleetTruck {
  id: string;
  driver: string;
  year: number;
  status: TruckStatus;
  route: string;
  capacity: number;
  fuelEfficiency: number;
  lastService: string;
  phone: string;
  plate: string;
  distanceToday: number;
  tripsToday: number;
  wasteCollected: number;
  engineHours: number;
  lastNote: string;
  rating: number;
}

// ─── Dummy Data ───────────────────────────────────────────────────────────────

const FLEET_DATA: FleetTruck[] = [
  {
    id: "B-1234-DLH",
    driver: "Bambang Pamungkas",
    year: 2020,
    status: "VIOLATION",
    route: "Zone A → TPA Bantar Gebang",
    capacity: 8.5,
    fuelEfficiency: 4.2,
    lastService: "12 Mei 2026",
    phone: "+62 812-3456-7890",
    plate: "B-1234-DLH",
    distanceToday: 72,
    tripsToday: 3,
    wasteCollected: 25.5,
    engineHours: 6.4,
    lastNote: "Kecepatan melebihi batas (85 km/h). Pengemudi perlu teguran.",
    rating: 2.8,
  },
  {
    id: "B-9988-DLH",
    driver: "Budi Sudarsono",
    year: 2019,
    status: "IDLE",
    route: "Zone B → TPS Menteng",
    capacity: 4.2,
    fuelEfficiency: 4.8,
    lastService: "08 Mei 2026",
    phone: "+62 813-2233-4455",
    plate: "B-9988-DLH",
    distanceToday: 38,
    tripsToday: 2,
    wasteCollected: 8.4,
    engineHours: 3.2,
    lastNote: "Menunggu jadwal pengambilan berikutnya di Pool Menteng.",
    rating: 4.1,
  },
  {
    id: "B-5566-DLH",
    driver: "Eko Purjianto",
    year: 2021,
    status: "ON_ROUTE",
    route: "Zone C → TPA Bantar Gebang",
    capacity: 6.8,
    fuelEfficiency: 5.1,
    lastService: "15 Mei 2026",
    phone: "+62 857-6677-8899",
    plate: "B-5566-DLH",
    distanceToday: 91,
    tripsToday: 4,
    wasteCollected: 27.2,
    engineHours: 7.8,
    lastNote: "Perjalanan normal. Estimasi tiba TPA: 14:30 WIB.",
    rating: 4.7,
  },
  {
    id: "B-8833-DLH",
    driver: "Kurniawan Dwi Y.",
    year: 2022,
    status: "ON_ROUTE",
    route: "Zone D → TPS Ancol",
    capacity: 7.1,
    fuelEfficiency: 4.9,
    lastService: "20 Mei 2026",
    phone: "+62 878-4455-6677",
    plate: "B-8833-DLH",
    distanceToday: 55,
    tripsToday: 3,
    wasteCollected: 21.3,
    engineHours: 5.1,
    lastNote: "Kondisi armada baik. Pengemudi disiplin waktu.",
    rating: 4.5,
  },
  {
    id: "B-7722-DLH",
    driver: "Gendut Doni",
    year: 2019,
    status: "VIOLATION",
    route: "Zone E → TPA Bantar Gebang",
    capacity: 9.0,
    fuelEfficiency: 3.9,
    lastService: "01 Mei 2026",
    phone: "+62 811-9988-7766",
    plate: "B-7722-DLH",
    distanceToday: 43,
    tripsToday: 2,
    wasteCollected: 18.0,
    engineHours: 4.3,
    lastNote: "Kelebihan muatan terdeteksi. Perlu pemeriksaan segera.",
    rating: 2.4,
  },
  {
    id: "B-3311-DLH",
    driver: "Rudi Hermawan",
    year: 2023,
    status: "ON_ROUTE",
    route: "Zone F → TPS Kebayoran",
    capacity: 10.2,
    fuelEfficiency: 5.3,
    lastService: "22 Mei 2026",
    phone: "+62 856-3344-5566",
    plate: "B-3311-DLH",
    distanceToday: 62,
    tripsToday: 3,
    wasteCollected: 30.6,
    engineHours: 5.5,
    lastNote: "Armada baru, performa sangat baik. BBM efisien.",
    rating: 4.9,
  },
  {
    id: "B-4422-DLH",
    driver: "Agus Wahyudi",
    year: 2020,
    status: "ON_ROUTE",
    route: "Zone G → TPS Ancol",
    capacity: 5.5,
    fuelEfficiency: 4.7,
    lastService: "18 Mei 2026",
    phone: "+62 819-4455-2233",
    plate: "B-4422-DLH",
    distanceToday: 48,
    tripsToday: 3,
    wasteCollected: 16.5,
    engineHours: 4.8,
    lastNote: "Rute lancar. Tidak ada kendala hari ini.",
    rating: 4.3,
  },
  {
    id: "B-6655-DLH",
    driver: "Sigit Prayogo",
    year: 2021,
    status: "OFFLINE",
    route: "Zone H → TPS Penjaringan",
    capacity: 6.8,
    fuelEfficiency: 4.5,
    lastService: "05 Apr 2026",
    phone: "+62 822-6655-4433",
    plate: "B-6655-DLH",
    distanceToday: 0,
    tripsToday: 0,
    wasteCollected: 0,
    engineHours: 0,
    lastNote: "GPS tidak merespons sejak 06:00 WIB. Koneksi putus.",
    rating: 3.6,
  },
  {
    id: "B-2211-DLH",
    driver: "Hendra Saputra",
    year: 2022,
    status: "MAINTENANCE",
    route: "Garasi Pusat",
    capacity: 8.0,
    fuelEfficiency: 4.1,
    lastService: "10 Mei 2026",
    phone: "+62 831-2211-0099",
    plate: "B-2211-DLH",
    distanceToday: 0,
    tripsToday: 0,
    wasteCollected: 0,
    engineHours: 0,
    lastNote: "Penggantian oli mesin dan rem. Est. selesai: 26 Mei 2026.",
    rating: 4.0,
  },
  {
    id: "B-5544-DLH",
    driver: "Fajar Nugroho",
    year: 2023,
    status: "ON_ROUTE",
    route: "Zone I → TPS Cakung",
    capacity: 9.5,
    fuelEfficiency: 5.0,
    lastService: "21 Mei 2026",
    phone: "+62 852-5544-3322",
    plate: "B-5544-DLH",
    distanceToday: 78,
    tripsToday: 4,
    wasteCollected: 38.0,
    engineHours: 7.2,
    lastNote: "Produktivitas tertinggi hari ini. Pengemudi berpengalaman.",
    rating: 4.8,
  },
  {
    id: "B-8877-DLH",
    driver: "Wahyu Santoso",
    year: 2020,
    status: "IDLE",
    route: "Zone J → TPS Pasar Minggu",
    capacity: 7.2,
    fuelEfficiency: 4.6,
    lastService: "17 Mei 2026",
    phone: "+62 815-8877-6655",
    plate: "B-8877-DLH",
    distanceToday: 29,
    tripsToday: 1,
    wasteCollected: 7.2,
    engineHours: 2.1,
    lastNote: "Selesai lebih awal. Menunggu penugasan tambahan.",
    rating: 4.2,
  },
  {
    id: "B-1199-DLH",
    driver: "Dedi Kurniawan",
    year: 2021,
    status: "ON_ROUTE",
    route: "Zone K → TPA Bantar Gebang",
    capacity: 8.8,
    fuelEfficiency: 4.4,
    lastService: "19 Mei 2026",
    phone: "+62 818-1199-0077",
    plate: "B-1199-DLH",
    distanceToday: 84,
    tripsToday: 4,
    wasteCollected: 35.2,
    engineHours: 7.9,
    lastNote: "Perjalanan ke TPA ke-4 hari ini. Performa konsisten.",
    rating: 4.4,
  },
];

// ─── Status Config ────────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<
  TruckStatus,
  { label: string; bg: string; text: string; icon: React.ReactNode; pulse: boolean }
> = {
  ON_ROUTE: {
    label: "Beroperasi",
    bg: "bg-[#ebf7f2]",
    text: "text-[#2d9f6c]",
    icon: <Navigation className="w-3 h-3" />,
    pulse: false,
  },
  IDLE: {
    label: "Idle",
    bg: "bg-[#fff4e6]",
    text: "text-[#df8820]",
    icon: <Clock className="w-3 h-3" />,
    pulse: false,
  },
  VIOLATION: {
    label: "Pelanggaran",
    bg: "bg-red-50",
    text: "text-red-600",
    icon: <AlertTriangle className="w-3 h-3" />,
    pulse: true,
  },
  OFFLINE: {
    label: "Offline",
    bg: "bg-zinc-100",
    text: "text-zinc-500",
    icon: <WifiOff className="w-3 h-3" />,
    pulse: false,
  },
  MAINTENANCE: {
    label: "Perawatan",
    bg: "bg-blue-50",
    text: "text-blue-600",
    icon: <Wrench className="w-3 h-3" />,
    pulse: false,
  },
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: TruckStatus }) {
  const cfg = STATUS_CONFIG[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${cfg.bg} ${cfg.text}`}
    >
      <span className={cfg.pulse ? "animate-pulse" : ""}>{cfg.icon}</span>
      {cfg.label}
    </span>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`w-3 h-3 ${
            i <= Math.round(rating) ? "fill-[#df8820] text-[#df8820]" : "text-zinc-200 fill-zinc-200"
          }`}
        />
      ))}
      <span className="text-xs text-zinc-500 ml-1">{rating.toFixed(1)}</span>
    </div>
  );
}

function ExpandedRow({ truck }: { truck: FleetTruck }) {
  const initials = truck.driver
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("");

  return (
    <tr>
      <td colSpan={9} className="px-0 py-0">
        <div className="mx-2 mb-3 bg-gradient-to-br from-zinc-50 to-white border border-zinc-100 rounded-2xl p-5 shadow-sm">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Driver Profile */}
            <div className="flex items-start gap-4 min-w-[220px]">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#df8820] to-[#f5a623] flex items-center justify-center text-white font-extrabold text-xl shadow-md flex-shrink-0">
                {initials}
              </div>
              <div>
                <p className="font-bold text-zinc-800 text-base leading-tight">{truck.driver}</p>
                <p className="text-sm text-zinc-500 mt-0.5">{truck.plate}</p>
                <p className="text-sm text-zinc-500">{truck.phone}</p>
                <div className="mt-2">
                  <StarRating rating={truck.rating} />
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="hidden lg:block w-px bg-zinc-100" />

            {/* Stats Grid */}
            <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-white rounded-xl p-3 border border-zinc-100">
                <p className="text-xs text-zinc-400 mb-1 flex items-center gap-1">
                  <Navigation className="w-3 h-3" /> Jarak Hari Ini
                </p>
                <p className="text-xl font-extrabold text-zinc-800">{truck.distanceToday}</p>
                <p className="text-xs text-zinc-400">kilometer</p>
              </div>
              <div className="bg-white rounded-xl p-3 border border-zinc-100">
                <p className="text-xs text-zinc-400 mb-1 flex items-center gap-1">
                  <Activity className="w-3 h-3" /> Ritase
                </p>
                <p className="text-xl font-extrabold text-zinc-800">{truck.tripsToday}</p>
                <p className="text-xs text-zinc-400">perjalanan</p>
              </div>
              <div className="bg-white rounded-xl p-3 border border-zinc-100">
                <p className="text-xs text-zinc-400 mb-1 flex items-center gap-1">
                  <Package className="w-3 h-3" /> Sampah Terangkut
                </p>
                <p className="text-xl font-extrabold text-zinc-800">{truck.wasteCollected}</p>
                <p className="text-xs text-zinc-400">ton</p>
              </div>
              <div className="bg-white rounded-xl p-3 border border-zinc-100">
                <p className="text-xs text-zinc-400 mb-1 flex items-center gap-1">
                  <BarChart2 className="w-3 h-3" /> Jam Mesin
                </p>
                <p className="text-xl font-extrabold text-zinc-800">{truck.engineHours}</p>
                <p className="text-xs text-zinc-400">jam</p>
              </div>
            </div>

            {/* Divider */}
            <div className="hidden lg:block w-px bg-zinc-100" />

            {/* Note & Actions */}
            <div className="min-w-[220px] flex flex-col justify-between gap-3">
              <div>
                <p className="text-xs font-semibold text-zinc-500 mb-1.5 flex items-center gap-1">
                  <FileText className="w-3 h-3" /> Catatan Terakhir
                </p>
                <p className="text-sm text-zinc-700 leading-snug bg-white rounded-xl p-3 border border-zinc-100">
                  {truck.lastNote}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button className="flex-1 inline-flex items-center justify-center gap-1.5 bg-[#df8820] text-white text-xs font-semibold py-2 px-3 rounded-xl hover:bg-[#c97a1c] transition-colors">
                  <ExternalLink className="w-3 h-3" />
                  Lihat Riwayat
                </button>
                <button className="flex-1 inline-flex items-center justify-center gap-1.5 bg-white border border-zinc-200 text-zinc-700 text-xs font-semibold py-2 px-3 rounded-xl hover:bg-zinc-50 transition-colors">
                  <MapPin className="w-3 h-3" />
                  Lacak Peta
                </button>
              </div>
            </div>
          </div>
        </div>
      </td>
    </tr>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function FleetManagement() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"ALL" | TruckStatus>("ALL");
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [filterOpen, setFilterOpen] = useState(false);

  const filtered = useMemo(() => {
    return FLEET_DATA.filter((truck) => {
      const matchSearch =
        truck.id.toLowerCase().includes(search.toLowerCase()) ||
        truck.driver.toLowerCase().includes(search.toLowerCase()) ||
        truck.route.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === "ALL" || truck.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [search, statusFilter]);

  const kpi = useMemo(() => {
    const aktif = FLEET_DATA.filter((t) => t.status === "ON_ROUTE").length;
    const perawatan = FLEET_DATA.filter(
      (t) => t.status === "MAINTENANCE" || t.status === "OFFLINE"
    ).length;
    return { aktif, perawatan };
  }, []);

  const toggleRow = (id: string) => {
    setExpandedRow((prev) => (prev === id ? null : id));
  };

  const filterLabels: Record<"ALL" | TruckStatus, string> = {
    ALL: "Semua Status",
    ON_ROUTE: "Beroperasi",
    IDLE: "Idle",
    VIOLATION: "Pelanggaran",
    OFFLINE: "Offline",
    MAINTENANCE: "Perawatan",
  };

  return (
    <div className="min-h-screen bg-zinc-50 font-sans p-6 space-y-6">
      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-zinc-900 flex items-center gap-2">
            <Truck className="w-6 h-6 text-[#df8820]" />
            Manajemen Armada
          </h1>
          <p className="text-sm text-zinc-500 mt-0.5">
            SIGAP DKI Jakarta — Data per 24 Mei 2026, 19:48 WIB
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              placeholder="Cari armada atau pengemudi..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2.5 rounded-xl border border-zinc-200 bg-white text-sm text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#df8820]/30 focus:border-[#df8820] transition w-64"
            />
          </div>

          {/* Filter Dropdown */}
          <div className="relative">
            <button
              onClick={() => setFilterOpen((v) => !v)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-zinc-200 bg-white text-sm font-medium text-zinc-700 hover:bg-zinc-50 transition"
            >
              <Filter className="w-4 h-4 text-zinc-400" />
              {filterLabels[statusFilter]}
              <ChevronDown className="w-4 h-4 text-zinc-400" />
            </button>
            {filterOpen && (
              <div className="absolute right-0 top-full mt-1 z-20 bg-white border border-zinc-100 rounded-xl shadow-lg overflow-hidden min-w-[160px]">
                {(["ALL", "ON_ROUTE", "IDLE", "VIOLATION", "OFFLINE", "MAINTENANCE"] as const).map(
                  (s) => (
                    <button
                      key={s}
                      onClick={() => {
                        setStatusFilter(s);
                        setFilterOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-sm hover:bg-zinc-50 transition ${
                        statusFilter === s ? "font-semibold text-[#df8820]" : "text-zinc-700"
                      }`}
                    >
                      {filterLabels[s]}
                    </button>
                  )
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── KPI Summary Bar ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "Total Armada",
            value: "1,369",
            sub: "unit terdaftar",
            icon: <Truck className="w-5 h-5" />,
            color: "text-zinc-700",
            bg: "bg-white",
            iconBg: "bg-zinc-100 text-zinc-500",
          },
          {
            label: "Aktif Beroperasi",
            value: "892",
            sub: "unit hari ini",
            icon: <CheckCircle2 className="w-5 h-5" />,
            color: "text-[#2d9f6c]",
            bg: "bg-[#ebf7f2]",
            iconBg: "bg-[#2d9f6c]/10 text-[#2d9f6c]",
          },
          {
            label: "Dalam Perawatan",
            value: "331",
            sub: "unit non-aktif",
            icon: <Wrench className="w-5 h-5" />,
            color: "text-blue-600",
            bg: "bg-blue-50",
            iconBg: "bg-blue-100 text-blue-500",
          },
          {
            label: "Armada Baru",
            value: "12",
            sub: "unit bulan ini",
            icon: <Star className="w-5 h-5" />,
            color: "text-[#df8820]",
            bg: "bg-[#fff4e6]",
            iconBg: "bg-[#df8820]/10 text-[#df8820]",
          },
        ].map((kpiItem) => (
          <div
            key={kpiItem.label}
            className={`${kpiItem.bg} rounded-2xl border border-zinc-100 shadow-sm p-5 flex items-center gap-4`}
          >
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${kpiItem.iconBg} flex-shrink-0`}>
              {kpiItem.icon}
            </div>
            <div>
              <p className="text-xs text-zinc-500 font-medium">{kpiItem.label}</p>
              <p className={`text-2xl font-extrabold tracking-tight ${kpiItem.color}`}>
                {kpiItem.value}
              </p>
              <p className="text-xs text-zinc-400">{kpiItem.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Fleet Table ── */}
      <div className="bg-white rounded-2xl shadow-sm border border-zinc-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-zinc-100 flex items-center justify-between">
          <p className="text-sm font-semibold text-zinc-700">
            Menampilkan{" "}
            <span className="text-zinc-900">{filtered.length}</span> dari{" "}
            <span className="text-zinc-900">1,369</span> armada
          </p>
          <p className="text-xs text-zinc-400">Klik baris untuk detail</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-zinc-50 border-b border-zinc-100">
                {[
                  "No. Armada",
                  "Pengemudi",
                  "Tahun",
                  "Status",
                  "Rute Aktif",
                  "Kapasitas (Ton)",
                  "BBM (km/L)",
                  "Terakhir Servis",
                  "",
                ].map((col) => (
                  <th
                    key={col}
                    className="px-4 py-3 text-left text-xs font-semibold text-zinc-500 tracking-wide whitespace-nowrap"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={9} className="text-center py-12 text-zinc-400 text-sm">
                    Tidak ada data yang sesuai filter.
                  </td>
                </tr>
              ) : (
                filtered.map((truck) => {
                  const isExpanded = expandedRow === truck.id;
                  return (
                    <React.Fragment key={truck.id}>
                      <tr
                        onClick={() => toggleRow(truck.id)}
                        className={`border-b border-zinc-50 cursor-pointer transition-colors ${
                          isExpanded
                            ? "bg-[#fff4e6]/40"
                            : "hover:bg-zinc-50/80"
                        }`}
                      >
                        {/* No. Armada */}
                        <td className="px-4 py-3.5 whitespace-nowrap">
                          <span className="font-mono font-bold text-zinc-800 text-xs bg-zinc-100 px-2.5 py-1 rounded-lg">
                            {truck.id}
                          </span>
                        </td>

                        {/* Pengemudi */}
                        <td className="px-4 py-3.5 whitespace-nowrap">
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#df8820] to-[#f5a623] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                              {truck.driver
                                .split(" ")
                                .slice(0, 2)
                                .map((n) => n[0])
                                .join("")}
                            </div>
                            <span className="font-medium text-zinc-800">{truck.driver}</span>
                          </div>
                        </td>

                        {/* Tahun */}
                        <td className="px-4 py-3.5 whitespace-nowrap">
                          <span className="text-zinc-600 font-medium">{truck.year}</span>
                        </td>

                        {/* Status */}
                        <td className="px-4 py-3.5 whitespace-nowrap">
                          <StatusBadge status={truck.status} />
                        </td>

                        {/* Rute */}
                        <td className="px-4 py-3.5 whitespace-nowrap">
                          <div className="flex items-center gap-1.5 text-zinc-600 max-w-[220px] truncate">
                            <MapPin className="w-3.5 h-3.5 text-zinc-400 flex-shrink-0" />
                            <span className="text-xs truncate">{truck.route}</span>
                          </div>
                        </td>

                        {/* Kapasitas */}
                        <td className="px-4 py-3.5 whitespace-nowrap">
                          <div className="flex items-center gap-1.5">
                            <Package className="w-3.5 h-3.5 text-zinc-400" />
                            <span className="font-semibold text-zinc-700">{truck.capacity}T</span>
                          </div>
                        </td>

                        {/* BBM */}
                        <td className="px-4 py-3.5 whitespace-nowrap">
                          <div className="flex items-center gap-1.5">
                            <Fuel className="w-3.5 h-3.5 text-zinc-400" />
                            <span
                              className={`font-semibold ${
                                truck.fuelEfficiency >= 5.0
                                  ? "text-[#2d9f6c]"
                                  : truck.fuelEfficiency >= 4.5
                                  ? "text-[#df8820]"
                                  : "text-red-500"
                              }`}
                            >
                              {truck.fuelEfficiency}
                            </span>
                          </div>
                        </td>

                        {/* Terakhir Servis */}
                        <td className="px-4 py-3.5 whitespace-nowrap">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                            <span className="text-zinc-600 text-xs">{truck.lastService}</span>
                          </div>
                        </td>

                        {/* Expand Toggle */}
                        <td className="px-4 py-3.5 whitespace-nowrap">
                          <button className="p-1 rounded-lg hover:bg-zinc-100 transition text-zinc-400">
                            {isExpanded ? (
                              <ChevronUp className="w-4 h-4" />
                            ) : (
                              <ChevronDown className="w-4 h-4" />
                            )}
                          </button>
                        </td>
                      </tr>

                      {/* Expanded Detail Row */}
                      {isExpanded && <ExpandedRow truck={truck} />}
                    </React.Fragment>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* ── Pagination ── */}
        <div className="px-6 py-4 border-t border-zinc-100 flex items-center justify-between">
          <p className="text-sm text-zinc-500">
            Halaman <span className="font-semibold text-zinc-800">1</span> dari{" "}
            <span className="font-semibold text-zinc-800">115</span>
            <span className="text-zinc-400 ml-2">(1.369 total armada)</span>
          </p>

          <div className="flex items-center gap-1.5">
            <button
              disabled
              className="inline-flex items-center gap-1 px-3 py-2 rounded-xl border border-zinc-200 text-sm text-zinc-400 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="w-4 h-4" />
              Prev
            </button>

            {[1, 2, 3, "...", 114, 115].map((page, i) => (
              <button
                key={i}
                className={`w-9 h-9 rounded-xl text-sm font-medium transition ${
                  page === 1
                    ? "bg-[#df8820] text-white shadow-sm"
                    : page === "..."
                    ? "text-zinc-400 cursor-default"
                    : "border border-zinc-200 text-zinc-600 hover:bg-zinc-50"
                }`}
              >
                {page}
              </button>
            ))}

            <button className="inline-flex items-center gap-1 px-3 py-2 rounded-xl border border-zinc-200 text-sm text-zinc-700 hover:bg-zinc-50 transition">
              Next
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
