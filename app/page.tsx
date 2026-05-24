"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  ArrowRight,
  PlayCircle,
  Smartphone,
  Cpu,
  BarChart3,
  ShieldCheck,
  CheckCircle2,
  FileText,
  Mail,
  Phone,
  Globe,
  Truck,
  Zap,
  Brain,
  AlertTriangle,
  TrendingUp,
  Navigation,
  Star,
  ChevronRight,
  Activity,
  Wifi,
  Recycle,
  TreePine,
  MapPin,
  Clock,
  Trash2,
} from "lucide-react";

// ─── Dynamic Map Import (MapLibre - no token needed) ─────────────────────────
const LandingMap = dynamic(() => import("@/components/landing/landing-map"), { ssr: false });
const LandingRouteMap = dynamic(() => import("@/components/landing/landing-route-map"), { ssr: false });

// ─── Scroll Reveal Hook ──────────────────────────────────────────────────────

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

// ─── Animated Counter Hook ────────────────────────────────────────────────────

function useCounter(end: number, duration = 2200, trigger = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let startTs: number;
    const step = (ts: number) => {
      if (!startTs) startTs = ts;
      const p = Math.min((ts - startTs) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.floor(eased * end));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, duration, trigger]);
  return count;
}

// ─── Feature Items ────────────────────────────────────────────────────────────

const FEATURES = [
  {
    icon: Navigation, title: "Live GPS Tracking",
    desc: "Pantau posisi real-time setiap armada di peta interaktif dengan akurasi sub-meter dan update setiap 4 detik.",
    color: "text-[#2d9f6c]", bg: "bg-[#ebf7f2]", border: "border-[#2d9f6c]/15",
  },
  {
    icon: Brain, title: "AI Route Optimizer",
    desc: "Algoritma cerdas rekomendasikan rute terpendek berdasarkan kondisi lalu lintas dan volume sampah historis.",
    color: "text-[#df8820]", bg: "bg-[#fff4e6]", border: "border-[#df8820]/15",
  },
  {
    icon: AlertTriangle, title: "Deteksi Pelanggaran",
    desc: "Sistem otomatis deteksi penyimpangan rute, kecepatan berlebih, dan idle berkepanjangan dalam hitungan detik.",
    color: "text-red-500", bg: "bg-red-50", border: "border-red-200/40",
  },
  {
    icon: BarChart3, title: "Analitik Dashboard",
    desc: "Grafik interaktif volume sampah, efisiensi BBM, dan distribusi status armada dengan export PDF.",
    color: "text-blue-500", bg: "bg-blue-50", border: "border-blue-200/40",
  },
  {
    icon: Smartphone, title: "Driver Mobile App",
    desc: "Panduan rute digital, absensi, dan pelaporan insiden langsung dari genggaman pengemudi di lapangan.",
    color: "text-purple-500", bg: "bg-purple-50", border: "border-purple-200/40",
  },
];

const TESTIMONIALS = [
  {
    name: "Ir. Budi Setiyanto", role: "Kepala Dinas Lingkungan Hidup", org: "DKI Jakarta",
    text: "SIGAP mengubah cara kami mengelola 1.300+ armada. Efisiensi rute meningkat 40% dalam 3 bulan pertama implementasi.",
  },
  {
    name: "Dewi Rahayu, M.T.", role: "Direktur Operasional", org: "UPST Jakarta Pusat",
    text: "Dengan live tracking, kami bisa respons pelanggaran dalam hitungan menit — bukan jam seperti sebelumnya.",
  },
  {
    name: "Ahmad Fauzi", role: "Koordinator Dispatcher", org: "TPA Bantar Gebang",
    text: "Antrean masuk TPA turun dari 45 menit menjadi 14 menit rata-rata. Transformasi nyata di lapangan.",
  },
];

// ─── Component ─────────────────────────────────────────────────────────────────

export default function LandingPage() {
  const [countersReady, setCountersReady] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [heroMounted, setHeroMounted] = useState(false);

  const statsReveal = useReveal();
  const featuresReveal = useReveal();
  const showcaseReveal = useReveal();
  const impactReveal = useReveal();
  const testimonialReveal = useReveal();
  const mobileAppReveal = useReveal();

  const fleetCount = useCounter(1369, 2000, countersReady);
  const tonsDay = useCounter(12400, 2200, countersReady);
  const accuracy = useCounter(98, 1600, countersReady);
  const efficiency = useCounter(40, 1400, countersReady);

  // ─── Interactive Console Demo States ──────────────────────────────────────────
  const [activeDemoTab, setActiveDemoTab] = useState("map");
  const [optimizeActive, setOptimizeActive] = useState(true);
  const [activeChart, setActiveChart] = useState("waste");
  const [appScreen, setAppScreen] = useState("home");
  const [reportedIncident, setReportedIncident] = useState<string | null>(null);

  useEffect(() => { setTimeout(() => setHeroMounted(true), 150); }, []);
  useEffect(() => { if (statsReveal.visible) setCountersReady(true); }, [statsReveal.visible]);
  useEffect(() => {
    const i = setInterval(() => setActiveTestimonial(p => (p + 1) % TESTIMONIALS.length), 6000);
    return () => clearInterval(i);
  }, []);

  return (
    <div className="bg-white font-sans text-zinc-900 min-h-screen flex flex-col selection:bg-[#fff4e6] selection:text-[#df8820]">

      {/* ══════════════════════════════════════════════════════════════
          NAVBAR — White, clean
      ══════════════════════════════════════════════════════════════ */}
      <nav className="bg-white/90 backdrop-blur-2xl fixed top-0 w-full z-50 border-b border-zinc-100 shadow-sm">
        <div className="flex justify-between items-center h-[72px] px-6 md:px-12 max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#2d9f6c] to-[#24855a] rounded-2xl flex items-center justify-center shadow-lg shadow-[#2d9f6c]/20">
              <Recycle className="w-5 h-5 text-white" />
            </div>
            <div className="leading-none">
              <span className="font-headline text-[22px] font-extrabold text-zinc-900 tracking-tight block">SIGAP</span>
              <span className="text-[8px] font-bold text-[#2d9f6c] uppercase tracking-[0.2em]">Dinas Lingkungan Hidup</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-10">
            {[["Fitur", "#features"], ["Teknologi", "#tech"], ["Dampak", "#impact"], ["Testimoni", "#testimonials"]].map(([label, href]) => (
              <a key={label} href={href} className="text-[13px] font-semibold text-zinc-500 hover:text-[#2d9f6c] transition-colors duration-300 relative group">
                {label}
                <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-[#2d9f6c] group-hover:w-full transition-all duration-300 rounded-full" />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="hidden sm:block text-[13px] font-semibold text-zinc-500 hover:text-[#df8820] transition-colors px-4 py-2">
              Login
            </Link>
            <Link
              href="/dashboard"
              className="flex items-center gap-1.5 px-6 py-2.5 bg-[#2d9f6c] text-white text-[13px] font-bold rounded-2xl shadow-lg shadow-[#2d9f6c]/25 hover:bg-[#24855a] hover:-translate-y-0.5 transition-all duration-300"
            >
              Buka Dashboard <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </nav>

      <main className="pt-[72px] flex-1">

        {/* ══════════════════════════════════════════════════════════════
            HERO — White background, colored accents
        ══════════════════════════════════════════════════════════════ */}
        <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-gradient-to-br from-white via-[#f0faf5] to-[#fef8f0]">
          {/* Decorative background elements */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Soft gradient orbs */}
            <div className="absolute top-[10%] right-[5%] w-[500px] h-[500px] bg-[#2d9f6c] rounded-full blur-[200px] opacity-[0.06] animate-float-slow" />
            <div className="absolute bottom-[10%] left-[10%] w-[400px] h-[400px] bg-[#df8820] rounded-full blur-[180px] opacity-[0.05] animate-float" />

            {/* Subtle dots pattern */}
            <div className="absolute inset-0 opacity-[0.03]"
              style={{ backgroundImage: "radial-gradient(circle, #2d9f6c 1px, transparent 1px)", backgroundSize: "40px 40px" }}
            />

            {/* Decorative shapes */}
            <div className="absolute top-[15%] right-[15%] w-40 h-40 border-2 border-[#2d9f6c]/10 rounded-3xl rotate-12 animate-float-slow" />
            <div className="absolute bottom-[20%] left-[8%] w-28 h-28 border-2 border-[#df8820]/10 rounded-full animate-float" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full py-16 grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Copy */}
            <div className="space-y-8">
              {/* Live badge */}
              <div className={`transition-all duration-700 ${heroMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
                <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[#ebf7f2] border border-[#2d9f6c]/15 text-[#2d9f6c] w-fit">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2d9f6c] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2d9f6c]" />
                  </span>
                  <span className="text-[11px] font-bold tracking-[0.15em] uppercase">Sistem Aktif • Real-Time Jakarta</span>
                </div>
              </div>

              {/* Headline */}
              <div className="space-y-5">
                <h1 className={`font-headline text-[2.8rem] sm:text-[3.5rem] lg:text-[4.2rem] font-extrabold leading-[1.08] tracking-[-0.03em] text-zinc-900 transition-all duration-1000 ${heroMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                  style={{ transitionDelay: "200ms" }}
                >
                  Revolusi{" "}
                  <span className="text-gradient-orange">Manajemen</span>
                  <br />
                  <span className="text-gradient-green">Armada</span>{" "}
                  Ibu Kota
                </h1>

                <p className={`text-[16px] sm:text-[17px] text-zinc-500 leading-[1.8] max-w-lg transition-all duration-1000 ${heroMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                  style={{ transitionDelay: "400ms" }}
                >
                  Monitor, integrasi, dan optimalisasi pergerakan <strong className="text-zinc-700 font-semibold">1.369 armada kebersihan</strong> DKI Jakarta secara real-time dengan teknologi AI dan Mobile App.
                </p>
              </div>

              {/* CTAs */}
              <div className={`flex flex-wrap gap-4 transition-all duration-1000 ${heroMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                style={{ transitionDelay: "600ms" }}
              >
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2.5 px-8 py-4 bg-[#2d9f6c] text-white font-bold rounded-2xl shadow-[0_8px_30px_rgba(45,159,108,0.3)] hover:bg-[#24855a] hover:shadow-[0_16px_40px_rgba(45,159,108,0.35)] hover:-translate-y-1 transition-all duration-400 text-[14px]"
                >
                  Eksplorasi Dashboard <ArrowRight className="w-4 h-4" />
                </Link>
                <button className="flex items-center gap-2.5 px-8 py-4 bg-white text-zinc-700 font-bold rounded-2xl border border-zinc-200 hover:border-[#df8820]/40 hover:text-[#df8820] hover:shadow-lg transition-all duration-300 text-[14px] group shadow-sm">
                  <PlayCircle className="w-5 h-5 text-[#df8820] group-hover:scale-110 transition-transform" />
                  Tonton Demo
                </button>
              </div>

              {/* Social proof */}
              <div className={`flex items-center gap-5 transition-all duration-1000 ${heroMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                style={{ transitionDelay: "800ms" }}
              >
                <div className="flex -space-x-2.5">
                  {["BP", "EP", "KD", "RH", "AG"].map((init, i) => (
                    <div key={i}
                      className="w-9 h-9 rounded-full border-[2.5px] border-white flex items-center justify-center text-[10px] font-extrabold text-white shadow-md transition-transform hover:scale-110 hover:z-10"
                      style={{ backgroundColor: ["#2d9f6c","#df8820","#3b82f6","#2d9f6c","#df8820"][i] }}
                    >
                      {init}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex gap-0.5 mb-1">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-[#df8820] text-[#df8820]" />)}
                  </div>
                  <p className="text-[11px] text-zinc-400 font-semibold">Dipercaya <strong className="text-zinc-600">200+ dispatcher</strong> DLH Jakarta</p>
                </div>
              </div>
            </div>

            {/* Right: Light Glass Dashboard Preview */}
            <div className={`hidden lg:flex flex-col gap-4 transition-all duration-1000 ${heroMounted ? "opacity-100 translate-x-0" : "opacity-0 translate-x-16"}`}
              style={{ transitionDelay: "500ms" }}
            >
              {/* Main card */}
              <div className="bg-white rounded-3xl p-6 shadow-xl border border-zinc-100 animate-float-slow">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-[0.2em]">Command Center</p>
                    <p className="text-zinc-900 font-headline font-extrabold text-lg tracking-tight">Status Armada Live</p>
                  </div>
                  <span className="flex items-center gap-1.5 px-3 py-1.5 bg-[#ebf7f2] text-[#2d9f6c] text-[9px] font-extrabold rounded-full uppercase tracking-[0.15em] border border-[#2d9f6c]/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2d9f6c] animate-pulse" />
                    Live
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2.5 mb-4">
                  {[
                    { label: "Aktif", val: "892", c: "#2d9f6c", bg: "bg-[#ebf7f2]" },
                    { label: "Pelanggaran", val: "22", c: "#ef4444", bg: "bg-red-50" },
                    { label: "Idle", val: "331", c: "#df8820", bg: "bg-[#fff4e6]" },
                  ].map((s, i) => (
                    <div key={i} className={`${s.bg} rounded-2xl p-3 text-center border border-zinc-100 hover:shadow-md transition-shadow`}>
                      <p className="text-xl font-headline font-extrabold tracking-tight" style={{ color: s.c }}>{s.val}</p>
                      <p className="text-[8px] text-zinc-400 font-bold tracking-[0.1em] uppercase mt-0.5">{s.label}</p>
                    </div>
                  ))}
                </div>

                {[
                  { truk: "B-5566-DLH", info: "Zone C → Bantar Gebang • 45 km/h", status: "ON ROUTE", c: "#2d9f6c", bg: "bg-[#ebf7f2]" },
                  { truk: "B-7722-DLH", info: "Tol Slipi — Kecepatan 85 km/h", status: "VIOLATION", c: "#ef4444", bg: "bg-red-50" },
                  { truk: "B-9988-DLH", info: "Menteng — Idle 35 menit", status: "IDLE", c: "#df8820", bg: "bg-[#fff4e6]" },
                ].map((t, i) => (
                  <div key={i} className="flex items-center justify-between py-2.5 border-t border-zinc-100 group hover:bg-zinc-50/50 transition-colors rounded-lg px-1">
                    <div className="min-w-0">
                      <p className="text-zinc-800 text-[12px] font-extrabold font-mono tracking-wide">{t.truk}</p>
                      <p className="text-zinc-400 text-[10px] truncate">{t.info}</p>
                    </div>
                    <span className={`text-[8px] font-extrabold px-2.5 py-1 rounded-lg shrink-0 tracking-wider uppercase ${t.bg}`} style={{ color: t.c }}>
                      {t.status}
                    </span>
                  </div>
                ))}
              </div>

              {/* Alert mini card */}
              <div className="bg-red-50 border border-red-100 rounded-2xl p-4 flex items-center gap-3.5 shadow-md animate-float" style={{ animationDelay: "2s" }}>
                <div className="p-2 bg-white rounded-xl shrink-0 shadow-sm">
                  <AlertTriangle className="w-5 h-5 text-red-500 animate-pulse" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-zinc-800 text-[12px] font-extrabold">Pelanggaran Terdeteksi</p>
                  <p className="text-red-400 text-[10px] truncate">B-7722-DLH — Kecepatan 85 km/h di Tol Slipi</p>
                </div>
                <span className="text-[8px] font-extrabold text-red-500 bg-white px-2.5 py-1 rounded-lg shrink-0 animate-pulse tracking-wider border border-red-100">BARU</span>
              </div>

              {/* Efficiency mini card */}
              <div className="bg-[#ebf7f2] border border-[#2d9f6c]/15 rounded-2xl p-4 flex items-center gap-3.5 shadow-md animate-float" style={{ animationDelay: "4s" }}>
                <div className="p-2 bg-white rounded-xl shrink-0 shadow-sm">
                  <TrendingUp className="w-5 h-5 text-[#2d9f6c]" />
                </div>
                <div className="flex-1">
                  <p className="text-zinc-800 text-[12px] font-extrabold">Efisiensi Rute Meningkat</p>
                  <div className="w-full h-1.5 bg-white rounded-full mt-2 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#2d9f6c] to-[#4ade80] rounded-full" style={{ width: "91%", animation: "count-up-bar 2s ease-out both", animationDelay: "1s" }} />
                  </div>
                </div>
                <span className="text-[#2d9f6c] font-headline font-extrabold text-base tracking-tight">91%</span>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            STATS COUNTER BAR — Light orange banner
        ══════════════════════════════════════════════════════════════ */}
        <section ref={statsReveal.ref} className="py-16 px-6 md:px-12 bg-gradient-to-r from-[#df8820] to-[#e99a40] relative overflow-hidden">
          {/* Pattern overlay */}
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "30px 30px" }} />

          <div className={`max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-16 relative z-10 transition-all duration-1000 ${statsReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            {[
              { value: fleetCount.toLocaleString("id-ID"), label: "Total Armada" },
              { value: `${(tonsDay / 1000).toFixed(1)}k`, label: "Ton Sampah / Hari" },
              { value: `${accuracy}%`, label: "Ketepatan Rute" },
              { value: `+${efficiency}%`, label: "Efisiensi Operasional" },
            ].map((s, i) => (
              <div key={i} className="text-center group">
                <p className="font-headline text-5xl sm:text-[3.5rem] font-extrabold tracking-[-0.04em] text-white transition-transform duration-300 group-hover:scale-105 drop-shadow-md">
                  {s.value}
                </p>
                <p className="text-[10px] font-bold text-white/70 uppercase tracking-[0.2em] mt-3">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            FEATURES GRID — Clean white cards
        ══════════════════════════════════════════════════════════════ */}
        <section id="features" ref={featuresReveal.ref} className="py-28 px-6 md:px-12 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className={`text-center mb-20 max-w-2xl mx-auto transition-all duration-1000 ${featuresReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#ebf7f2] text-[#2d9f6c] text-[10px] font-extrabold rounded-full uppercase tracking-[0.2em] mb-6">
                <Zap className="w-3.5 h-3.5" /> Fitur Unggulan
              </div>
              <h2 className="font-headline text-4xl sm:text-5xl font-extrabold tracking-[-0.03em] text-zinc-900 mb-5 leading-[1.1]">
                Semua yang Anda butuhkan
                <br />
                <span className="text-gradient-green">dalam satu platform</span>
              </h2>
              <p className="text-zinc-500 leading-relaxed text-[15px]">
                Dari tracking GPS hingga analitik AI — SIGAP mengintegrasikan seluruh operasional kebersihan Jakarta.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {FEATURES.map((f, i) => {
                const Icon = f.icon;
                return (
                  <div
                    key={i}
                    className={`relative bg-white rounded-3xl p-8 border ${f.border} shadow-sm hover-lift group overflow-hidden cursor-default transition-all duration-700 ${featuresReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                    style={{ transitionDelay: `${i * 100}ms` }}
                  >
                    <div className="relative z-10">
                      <div className={`w-14 h-14 rounded-2xl ${f.bg} ${f.color} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:shadow-lg transition-all duration-400`}>
                        <Icon className="w-6 h-6 stroke-[2]" />
                      </div>
                      <h3 className="font-headline font-extrabold text-zinc-900 text-[17px] mb-2.5 tracking-tight">{f.title}</h3>
                      <p className="text-[13px] text-zinc-500 leading-[1.7]">{f.desc}</p>
                      <div className={`flex items-center gap-1.5 mt-6 text-[12px] font-bold ${f.color} opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1`}>
                        Pelajari lebih <ChevronRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            SHOWCASE: INTERACTIVE COMMAND CENTER CONSOLE — White, Glass
        ══════════════════════════════════════════════════════════════ */}
        <section id="tech" ref={showcaseReveal.ref} className="py-28 px-6 md:px-12 bg-zinc-50/50 border-y border-zinc-100">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#fff4e6] text-[#df8820] text-[10px] font-extrabold rounded-full uppercase tracking-[0.2em] mb-5">
                <Brain className="w-3.5 h-3.5" /> Konsol Demo Interaktif
              </div>
              <h2 className="font-headline text-4xl sm:text-5xl font-extrabold tracking-[-0.03em] text-zinc-900 mb-5 leading-[1.1]">
                Coba teknologi <span className="text-gradient-orange">SIGAP</span> secara langsung
              </h2>
              <p className="text-zinc-500 text-[15px] max-w-2xl mx-auto">
                Gunakan simulator di bawah ini untuk menguji 4 modul utama kami. Klik tab untuk beralih dan berinteraksi dengan elemen visual.
              </p>
            </div>

            {/* Interactive Selector Tabs Row */}
            <div className="flex flex-wrap justify-center gap-3.5 mb-10 max-w-4xl mx-auto">
              {[
                { id: "map", label: "Live GPS Tracking", desc: "Pantauan Real-time", icon: MapPin },
                { id: "route", label: "AI Route Optimizer", desc: "Bypass Kemacetan", icon: Navigation },
                { id: "analytics", label: "Smart Analytics", desc: "Metrik & Efisiensi", icon: BarChart3 },
                { id: "app", label: "Driver Mobile App", desc: "Simulator Pengemudi", icon: Smartphone },
              ].map((tab) => {
                const TabIcon = tab.icon;
                const isActive = activeDemoTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveDemoTab(tab.id);
                      if (tab.id === "app") {
                        setAppScreen("home");
                        setReportedIncident(null);
                      }
                    }}
                    className={`flex items-center gap-3 px-6 py-4 rounded-2xl border text-left transition-all duration-300 ${
                      isActive
                        ? "bg-white border-[#2d9f6c] shadow-lg shadow-[#2d9f6c]/5 -translate-y-0.5 text-[#2d9f6c]"
                        : "bg-white/80 border-zinc-200/60 text-zinc-500 hover:bg-white hover:border-zinc-300 hover:text-zinc-800"
                    }`}
                  >
                    <div className={`p-2.5 rounded-xl transition-colors ${
                      isActive ? "bg-[#ebf7f2] text-[#2d9f6c]" : "bg-zinc-50 text-zinc-400"
                    }`}>
                      <TabIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[13px] font-extrabold tracking-tight block leading-none">{tab.label}</p>
                      <p className="text-[10px] text-zinc-400 font-semibold mt-0.5 leading-none">{tab.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Main Interactive Board */}
            <div className="grid lg:grid-cols-12 gap-10 items-center">
              {/* Left Column: Interactive Display (Span 7) */}
              <div className="lg:col-span-7 bg-white rounded-[2rem] border border-zinc-200/60 p-6 shadow-xl relative aspect-[4/3] w-full overflow-hidden flex flex-col justify-between">
                
                {/* ─── TAB 1: LIVE MAP DISPLAY ─── */}
                {activeDemoTab === "map" && (
                  <div className="absolute inset-0 rounded-2xl overflow-hidden">
                    <LandingMap />
                  </div>
                )}

                {/* ─── TAB 2: AI ROUTE OPTIMIZER DISPLAY ─── */}
                {activeDemoTab === "route" && (
                  <div className="absolute inset-0 rounded-2xl overflow-hidden">
                    <LandingRouteMap optimizeActive={optimizeActive} onToggle={() => setOptimizeActive(!optimizeActive)} />
                  </div>
                )}

                {/* ─── TAB 3: SMART ANALYTICS DISPLAY ─── */}
                {activeDemoTab === "analytics" && (
                  <div className="absolute inset-0 p-6 flex flex-col justify-between h-full bg-zinc-50/20">
                    <div className="flex justify-between items-center z-10">
                      <div className="bg-white/95 border border-zinc-150 px-3 py-1.5 rounded-xl shadow-sm">
                        <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-wider block">Dashboard Analitik</span>
                        <span className="text-zinc-800 font-headline font-extrabold text-[12px] flex items-center gap-1.5">
                          <Activity className="w-3.5 h-3.5 text-[#2d9f6c]" />
                          Grafik Efisiensi Bulanan
                        </span>
                      </div>
                      
                      {/* Metric Toggles */}
                      <div className="flex bg-zinc-100 p-0.5 rounded-lg border border-zinc-200">
                        {[
                          { id: "waste", label: "Sampah" },
                          { id: "bbm", label: "BBM" },
                          { id: "ontime", label: "Ketepatan" }
                        ].map((btn) => (
                          <button
                            key={btn.id}
                            onClick={() => setActiveChart(btn.id)}
                            className={`text-[8.5px] font-extrabold px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                              activeChart === btn.id 
                                ? "bg-white text-zinc-800 shadow-sm" 
                                : "text-zinc-400 hover:text-zinc-700"
                            }`}
                          >
                            {btn.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Chart Area */}
                    <div className="absolute inset-0 m-6 rounded-2xl border border-zinc-200 bg-white p-5 flex flex-col justify-between shadow-inner">
                      <div className="flex items-center justify-between shrink-0">
                        <div>
                          <h4 className="text-[12px] font-extrabold text-zinc-800">
                            {activeChart === "waste" && "Volume Penumpukan Sampah Terangkat"}
                            {activeChart === "bbm" && "Penghematan Bahan Bakar Armada"}
                            {activeChart === "ontime" && "Persentase Ketepatan Pengiriman Rute"}
                          </h4>
                          <p className="text-[8.5px] text-zinc-400 font-semibold uppercase mt-0.5">Mei 2026 • Wilayah DKI Jakarta</p>
                        </div>
                        <span className="text-[#2d9f6c] bg-[#ebf7f2] border border-[#2d9f6c]/25 px-2.5 py-1 rounded-lg text-[10px] font-extrabold shrink-0 animate-scale-in">
                          {activeChart === "waste" && "+12.4k Ton/Hari"}
                          {activeChart === "bbm" && "Hemat 28.5%"}
                          {activeChart === "ontime" && "98.2% Sesuai Jadwal"}
                        </span>
                      </div>

                      {/* Animated Bars Simulator */}
                      <div className="flex items-end justify-between h-[120px] pt-4 px-2 w-full border-b border-zinc-100 shrink-0">
                        {[
                          { day: "Sen", waste: 45, bbm: 75, ontime: 85 },
                          { day: "Sel", waste: 62, bbm: 60, ontime: 70 },
                          { day: "Rab", waste: 85, bbm: 40, ontime: 92 },
                          { day: "Kam", waste: 90, bbm: 82, ontime: 95 },
                          { day: "Jum", waste: 75, bbm: 70, ontime: 88 },
                          { day: "Sab", waste: 50, bbm: 50, ontime: 78 },
                          { day: "Min", waste: 92, bbm: 95, ontime: 98 },
                        ].map((d, i) => {
                          let value = 0;
                          let barColor = "bg-[#2d9f6c]";
                          if (activeChart === "waste") {
                            value = d.waste;
                            barColor = "bg-[#2d9f6c] hover:bg-[#24855a]";
                          } else if (activeChart === "bbm") {
                            value = d.bbm;
                            barColor = "bg-[#df8820] hover:bg-[#c67315]";
                          } else {
                            value = d.ontime;
                            barColor = "bg-blue-500 hover:bg-blue-600";
                          }

                          return (
                            <div key={i} className="flex flex-col items-center flex-1 group cursor-pointer">
                              <span className="text-[7.5px] font-bold text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity mb-1 font-mono">
                                {value}%
                              </span>
                              <div className="w-6 sm:w-8 bg-zinc-50 rounded-t-lg h-[90px] flex items-end overflow-hidden border border-zinc-100">
                                <div 
                                  className={`w-full rounded-t-lg transition-all duration-700 ${barColor}`}
                                  style={{ height: `${value}%` }}
                                />
                              </div>
                              <span className="text-[8.5px] font-bold text-zinc-400 mt-2">{d.day}</span>
                            </div>
                          );
                        })}
                      </div>

                      <div className="flex justify-between text-[8px] font-semibold text-zinc-400 uppercase pt-2 shrink-0">
                        <span>Pusat Kendali DLH Jakarta</span>
                        <span>*Data di-update otomatis setiap jam</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* ─── TAB 4: MOBILE DRIVER APP SIMULATOR ─── */}
                {activeDemoTab === "app" && (
                  <div className="absolute inset-0 p-6 flex items-center justify-center h-full bg-zinc-150/40">
                    
                    {/* iPhone Simulator Frame */}
                    <div className="w-[230px] h-[390px] bg-white border-[6px] border-zinc-900 rounded-[32px] shadow-2xl relative overflow-hidden flex flex-col font-sans shrink-0">
                      {/* iPhone notch speaker & camera */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-4 bg-zinc-900 rounded-b-xl z-35 flex items-center justify-center">
                        <div className="w-10 h-1 bg-zinc-800 rounded-full" />
                      </div>

                      {/* iPhone Screen Header */}
                      <div className="bg-[#2d9f6c] pt-5 pb-3.5 px-4 text-white text-left z-20 shrink-0">
                        <div className="flex justify-between items-center text-[9px] font-bold opacity-85 mb-1.5">
                          <span>09:41</span>
                          <span className="flex items-center gap-1">
                            <Wifi className="w-2.5 h-2.5" /> LTE
                          </span>
                        </div>
                        <h5 className="font-extrabold text-[12px] tracking-tight">SIGAP Mobile</h5>
                        <p className="text-[7.5px] opacity-80 mt-0.5">Aplikasi Pengemudi Kebersihan</p>
                      </div>

                      {/* Screen Dynamic Body */}
                      <div className="flex-1 bg-zinc-50 p-3 overflow-y-auto text-left flex flex-col justify-between">
                        
                        {/* SCREEN 1: APP HOME SCREEN */}
                        {appScreen === "home" && (
                          <div className="flex flex-col gap-2.5 h-full justify-between">
                            <div className="space-y-2">
                              <div className="bg-white border border-zinc-200 p-2.5 rounded-xl shadow-xs">
                                <span className="text-[7.5px] font-bold text-zinc-400 uppercase tracking-wider block">Profil Driver</span>
                                <p className="font-extrabold text-[11px] text-zinc-800">Bambang Pamungkas</p>
                                <p className="text-[8px] text-zinc-400 font-mono mt-0.5">ID: B-5566-DLH • Zone C</p>
                              </div>
                              
                              <div className="bg-white border border-zinc-200 p-2.5 rounded-xl shadow-xs space-y-1.5">
                                <span className="text-[7.5px] font-bold text-[#df8820] uppercase tracking-wider block">Tugas Hari Ini</span>
                                <p className="font-extrabold text-[10px] text-zinc-700 leading-tight">Pengangkutan Sampah Zone C → TPA Bantar Gebang</p>
                                <div className="flex items-center gap-1.5 text-[8.5px] text-zinc-500">
                                  <Clock className="w-3 h-3 shrink-0" />
                                  <span>07:00 - 15:00 WIB</span>
                                </div>
                              </div>
                            </div>

                            <button 
                              onClick={() => setAppScreen("route")}
                              className="w-full py-2.5 bg-[#2d9f6c] hover:bg-[#24855a] text-white text-[10px] font-extrabold rounded-xl shadow-md transition-colors text-center uppercase tracking-wide cursor-pointer"
                            >
                              Mulai Perjalanan
                            </button>
                          </div>
                        )}

                        {/* SCREEN 2: ROUTE NAVIGATION ACTIVE */}
                        {appScreen === "route" && (
                          <div className="flex flex-col gap-2.5 h-full justify-between">
                            <div className="space-y-2">
                              <div className="bg-[#ebf7f2] border border-[#2d9f6c]/20 p-2.5 rounded-xl flex items-center gap-2">
                                <span className="relative flex h-1.5 w-1.5 shrink-0">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2d9f6c] opacity-75" />
                                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#2d9f6c]" />
                                </span>
                                <p className="text-[8.5px] font-extrabold text-[#2d9f6c] uppercase tracking-wide">Rute AI Aktif</p>
                              </div>

                              <div className="bg-white border border-zinc-200 p-2.5 rounded-xl shadow-xs">
                                <p className="text-[7.5px] font-bold text-zinc-400 uppercase tracking-wider">Tujuan Berikutnya</p>
                                <p className="font-extrabold text-[10px] text-zinc-800 leading-tight mt-0.5">TPA Bantar Gebang</p>
                                <div className="w-full h-1 bg-zinc-100 rounded-full mt-2.5 overflow-hidden">
                                  <div className="h-full bg-gradient-to-r from-[#2d9f6c] to-[#4ade80]" style={{ width: "45%" }} />
                                </div>
                                <span className="text-[7.5px] text-zinc-400 font-semibold block mt-1">Estimasi tiba: 32 m (14.2 km)</span>
                              </div>

                              <div className="bg-white border border-zinc-200 p-2.5 rounded-xl shadow-xs space-y-1.5">
                                <span className="text-[7.5px] font-bold text-zinc-400 uppercase tracking-wider block">Daftar Tugas</span>
                                <div className="space-y-1">
                                  {["Muat Sampah di TPS C (8.5T)", "Timbang Muatan", "Perjalanan ke Bantar Gebang"].map((t, idx) => (
                                    <div key={idx} className="flex items-center gap-1.5 text-[8.5px] text-zinc-600">
                                      <CheckCircle2 className={`w-3.5 h-3.5 ${idx < 2 ? "text-[#2d9f6c] fill-[#2d9f6c]/10" : "text-zinc-300"}`} />
                                      <span className={idx < 2 ? "line-through text-zinc-400 font-medium" : "font-semibold"}>{t}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-1.5 shrink-0">
                              <button 
                                onClick={() => setAppScreen("report")}
                                className="py-2 border border-red-200 hover:bg-red-50 text-red-500 text-[9px] font-extrabold rounded-lg text-center cursor-pointer uppercase"
                              >
                                Lapor Kendala
                              </button>
                              <button 
                                onClick={() => setAppScreen("success")}
                                className="py-2 bg-[#2d9f6c] hover:bg-[#24855a] text-white text-[9px] font-extrabold rounded-lg text-center shadow-xs cursor-pointer uppercase"
                              >
                                Tiba di TPA
                              </button>
                            </div>
                          </div>
                        )}

                        {/* SCREEN 3: REPORT INCIDENT */}
                        {appScreen === "report" && (
                          <div className="flex flex-col gap-2.5 h-full justify-between">
                            <div className="space-y-2">
                              <h6 className="font-extrabold text-[11px] text-zinc-700 block">Laporkan Kendala Rute</h6>
                              <p className="text-[8px] text-zinc-400 font-semibold leading-tight">Pilih jenis kendala yang Anda hadapi untuk respons cepat dari dispatcher.</p>
                              
                              <div className="space-y-1.5 pt-1.5">
                                {[
                                  { id: "macet", label: "Macet Parah", color: "border-yellow-200 text-yellow-600 bg-yellow-50" },
                                  { id: "ban-bocor", label: "Ban Bocor", color: "border-red-200 text-red-500 bg-red-50" },
                                  { id: "mesin-mogok", label: "Mesin Mogok", color: "border-red-200 text-red-500 bg-red-50" }
                                ].map((inc) => (
                                  <button
                                    key={inc.id}
                                    onClick={() => setReportedIncident(inc.label)}
                                    className={`w-full py-2 px-3 border rounded-xl text-left text-[9px] font-extrabold cursor-pointer transition-all ${
                                      reportedIncident === inc.label 
                                        ? "ring-2 ring-zinc-750 bg-white" 
                                        : inc.color
                                    }`}
                                  >
                                    {inc.label}
                                  </button>
                                ))}
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-1.5 shrink-0">
                              <button 
                                onClick={() => setAppScreen("route")}
                                className="py-2 border border-zinc-200 text-zinc-500 text-[9px] font-extrabold rounded-lg text-center cursor-pointer"
                              >
                                Batal
                              </button>
                              <button 
                                onClick={() => {
                                  if (reportedIncident) {
                                    setAppScreen("success-report");
                                  } else {
                                    alert("Pilih jenis kendala terlebih dahulu");
                                  }
                                }}
                                className="py-2 bg-red-500 hover:bg-red-600 text-white text-[9px] font-extrabold rounded-lg text-center shadow-xs cursor-pointer uppercase"
                              >
                                Kirim Laporan
                              </button>
                            </div>
                          </div>
                        )}

                        {/* SCREEN 4: SUCCESS REPORTED SCREEN */}
                        {appScreen === "success-report" && (
                          <div className="flex flex-col items-center justify-center gap-3.5 h-full py-6 text-center">
                            <div className="w-11 h-11 bg-red-50 text-red-500 rounded-full border border-red-100 flex items-center justify-center shadow-xs animate-bounce">
                              <AlertTriangle className="w-6 h-6 animate-pulse" />
                            </div>
                            <div>
                              <h6 className="font-extrabold text-[12px] text-zinc-800 leading-tight">Laporan Terkirim!</h6>
                              <p className="text-[8px] text-zinc-400 font-semibold max-w-[150px] mx-auto mt-1 leading-normal">
                                Kendala &rdquo;<strong className="text-zinc-700 font-extrabold">{reportedIncident}</strong>&rdquo; berhasil dilaporkan. Dispatcher sedang memproses bantuan.
                              </p>
                            </div>
                            <button 
                              onClick={() => {
                                setAppScreen("route");
                                setReportedIncident(null);
                              }}
                              className="px-4 py-2 border border-zinc-200 text-zinc-600 text-[8.5px] font-extrabold rounded-lg shadow-xs hover:bg-zinc-100 mt-2 transition-colors cursor-pointer uppercase"
                            >
                              Kembali ke Rute
                            </button>
                          </div>
                        )}

                        {/* SCREEN 5: SUCCESS COMPLETED SCREEN */}
                        {appScreen === "success" && (
                          <div className="flex flex-col items-center justify-center gap-3.5 h-full py-6 text-center">
                            <div className="w-11 h-11 bg-[#ebf7f2] text-[#2d9f6c] rounded-full border border-[#2d9f6c]/20 flex items-center justify-center shadow-xs animate-scale-in">
                              <CheckCircle2 className="w-6 h-6 fill-[#2d9f6c]/10" />
                            </div>
                            <div>
                              <h6 className="font-extrabold text-[12px] text-zinc-800 leading-tight">Tugas Selesai!</h6>
                              <p className="text-[8px] text-zinc-400 font-semibold max-w-[150px] mx-auto mt-1 leading-normal">
                                8.5 Ton muatan terkirim dengan selamat di TPA Bantar Gebang. Selamat atas kontribusi Anda!
                              </p>
                            </div>
                            <button 
                              onClick={() => setAppScreen("home")}
                              className="px-4 py-2 bg-[#2d9f6c] text-white text-[8.5px] font-extrabold rounded-lg shadow-sm hover:bg-[#24855a] mt-2 transition-colors cursor-pointer uppercase tracking-wider"
                            >
                              Ambil Tugas Baru
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column: Explanations and Actions (Span 5) */}
              <div className="lg:col-span-5 space-y-7 text-left">
                
                {/* DYNAMIC CONTENT FOR MAP */}
                {activeDemoTab === "map" && (
                  <div className="space-y-6">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#ebf7f2] text-[#2d9f6c] text-[10px] font-extrabold rounded-full uppercase tracking-wider">
                      Live GPS Tracking
                    </div>
                    <h3 className="font-headline text-3xl sm:text-[34px] font-extrabold tracking-tight text-zinc-900 leading-tight">
                      Pantauan posisi presisi <span className="text-[#2d9f6c]">Sub-Meter</span>
                    </h3>
                    <p className="text-zinc-500 leading-relaxed text-[14px]">
                      Sistem kami menghubungkan GPS presisi tinggi dari aplikasi driver pada setiap truk sampah ke pusat kendali DLH. Koordinat di-update setiap 4 detik untuk akurasi optimal.
                    </p>
                    <div className="space-y-3.5 border-l-2 border-zinc-200 pl-4 py-1">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-[#2d9f6c] shrink-0 mt-0.5" />
                        <p className="text-[13px] text-zinc-600 font-semibold">Tolak ukur deviasi rute instan</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-[#2d9f6c] shrink-0 mt-0.5" />
                        <p className="text-[13px] text-zinc-600 font-semibold">Bypass pemetaan manual dengan sinkronisasi satelit</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* DYNAMIC CONTENT FOR ROUTE */}
                {activeDemoTab === "route" && (
                  <div className="space-y-6">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#fff4e6] text-[#df8820] text-[10px] font-extrabold rounded-full uppercase tracking-wider">
                      AI Route Optimizer
                    </div>
                    <h3 className="font-headline text-3xl sm:text-[34px] font-extrabold tracking-tight text-zinc-900 leading-tight">
                      Rute terpilih otomatis bebas <span className="text-[#df8820]">Macet</span>
                    </h3>
                    <p className="text-zinc-500 leading-relaxed text-[14px]">
                      Algoritma AI SIGAP menganalisis kepadatan jalan raya DKI Jakarta secara dinamis. Driver diarahkan memotong jalur macet, menghemat waktu dan bahan bakar secara drastis.
                    </p>
                    <div className="space-y-3.5 border-l-2 border-zinc-200 pl-4 py-1">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-[#df8820] shrink-0 mt-0.5" />
                        <p className="text-[13px] text-zinc-600 font-semibold">Penyusutan jarak tempuh hingga 35%</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-[#df8820] shrink-0 mt-0.5" />
                        <p className="text-[13px] text-zinc-600 font-semibold">Penurunan emisi karbon armada DLH Jakarta</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* DYNAMIC CONTENT FOR ANALYTICS */}
                {activeDemoTab === "analytics" && (
                  <div className="space-y-6">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-50 text-blue-500 text-[10px] font-extrabold rounded-full uppercase tracking-wider">
                      Smart Analytics
                    </div>
                    <h3 className="font-headline text-3xl sm:text-[34px] font-extrabold tracking-tight text-zinc-900 leading-tight">
                      Pengambilan keputusan berbasis <span className="text-blue-500">Data</span>
                    </h3>
                    <p className="text-zinc-500 leading-relaxed text-[14px]">
                      Konversi data lapangan mentah menjadi visualisasi analitik yang mudah dibaca. Membantu pimpinan memantau kapasitas TPA dan produktivitas harian secara objektif.
                    </p>
                    <div className="space-y-3.5 border-l-2 border-zinc-200 pl-4 py-1">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                        <p className="text-[13px] text-zinc-600 font-semibold">Grafik volume sampah terangkat bulanan</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                        <p className="text-[13px] text-zinc-600 font-semibold">Ekspor rekap laporan otomatis (PDF/XLSX)</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* DYNAMIC CONTENT FOR APP */}
                {activeDemoTab === "app" && (
                  <div className="space-y-6">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-purple-50 text-purple-500 text-[10px] font-extrabold rounded-full uppercase tracking-wider">
                      Driver Mobile App
                    </div>
                    <h3 className="font-headline text-3xl sm:text-[34px] font-extrabold tracking-tight text-zinc-900 leading-tight">
                      Sinergi kuat pengemudi & <span className="text-purple-500">Dispatcher</span>
                    </h3>
                    <p className="text-zinc-500 leading-relaxed text-[14px]">
                      Driver dibekali aplikasi praktis untuk panduan navigasi AI, absensi, hingga pelaporan cepat anomali ban bocor atau jalan tertutup langsung dari lokasi.
                    </p>
                    <div className="space-y-3.5 border-l-2 border-zinc-200 pl-4 py-1">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" />
                        <p className="text-[13px] text-zinc-600 font-semibold">Pelaporan kendala terintegrasi &lt; 3 detik</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" />
                        <p className="text-[13px] text-zinc-600 font-semibold">Absensi online berbasis koordinat GPS</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-4 pt-4 border-t border-zinc-100">
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-2 px-6 py-3.5 bg-[#2d9f6c] hover:bg-[#24855a] text-white font-bold rounded-xl text-[13px] transition-all duration-300 shadow-md shadow-[#2d9f6c]/20"
                  >
                    Buka Dashboard Nyata <ArrowRight className="w-4 h-4" />
                  </Link>
                  <a
                    href="#features"
                    className="px-6 py-3.5 bg-white border border-zinc-200 text-zinc-500 hover:text-zinc-800 hover:border-zinc-300 font-bold rounded-xl text-[13px] transition-colors"
                  >
                    Pelajari Fitur Lain
                  </a>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            MOBILE APP SHOWCASE SECTION — White, Modern
        ══════════════════════════════════════════════════════════════ */}
        <section id="mobile-app" ref={mobileAppReveal.ref} className="py-28 px-6 md:px-12 bg-white">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-16 items-center">
            
            {/* Left Column: Premium App Screen Mockup & Badges (Span 5) */}
            <div className={`lg:col-span-5 flex flex-col items-center gap-8 transition-all duration-1000 ${
              mobileAppReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}>
              
              {/* Styled iOS Phone Mockup Container */}
              <div className="w-[280px] h-[550px] bg-zinc-950 rounded-[48px] border-[10px] border-zinc-950 shadow-2xl relative overflow-hidden flex flex-col font-sans shrink-0 border-t-[14px]">
                {/* iPhone notch speaker & camera */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-5 bg-zinc-950 rounded-b-xl z-35 flex items-center justify-center">
                  <div className="w-12 h-1 bg-zinc-800 rounded-full" />
                </div>

                {/* Simulated Screen Header */}
                <div className="bg-[#2d9f6c] pt-4 pb-3.5 px-4 text-white text-left z-20 shrink-0">
                  <div className="flex justify-between items-center text-[9px] font-bold opacity-80 mb-1.5">
                    <span>09:41</span>
                    <span className="flex items-center gap-1">
                      <Wifi className="w-2.5 h-2.5" /> LTE
                    </span>
                  </div>
                  <h5 className="font-extrabold text-[12px] tracking-tight">SIGAP Driver</h5>
                  <p className="text-[7.5px] opacity-80 mt-0.5">Aplikasi Bidang Kebersihan DLH</p>
                </div>

                {/* Screen Content Body */}
                <div className="flex-1 bg-zinc-50 p-3 overflow-hidden text-left flex flex-col justify-between relative">
                  
                  {/* Push Notification Overlay */}
                  <div className="absolute top-2 left-2 right-2 bg-white border border-zinc-150 p-2.5 rounded-xl shadow-md z-30 flex items-start gap-2 animate-float">
                    <div className="p-1.5 bg-[#fff4e6] text-[#df8820] rounded-lg shrink-0 shadow-xs">
                      <Brain className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-extrabold text-[9px] text-zinc-800 leading-none">Dispatcher DLH</p>
                      <p className="text-[8px] text-zinc-400 mt-1 leading-tight truncate">Gunakan Rute JORR menghindari macet Slipi.</p>
                    </div>
                  </div>

                  <div className="space-y-2.5 pt-12 flex-1 overflow-y-auto">
                    {/* Driver profile card */}
                    <div className="bg-white border border-zinc-200 p-2.5 rounded-xl shadow-xs">
                      <span className="text-[7px] font-bold text-zinc-400 uppercase tracking-wider block">Supir Terdaftar</span>
                      <p className="font-extrabold text-[11px] text-zinc-800 mt-0.5">Bambang Pamungkas</p>
                      <p className="text-[8px] text-zinc-400 font-mono mt-0.5">ID: B-5566-DLH • Zone C</p>
                    </div>

                    {/* Navigation Path mock */}
                    <div className="bg-white border border-zinc-200 p-2 rounded-xl shadow-xs">
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-[7.5px] font-bold text-[#2d9f6c] uppercase tracking-wide">Rute Navigasi Aktif</span>
                        <span className="text-[7.5px] text-zinc-400">Tiba: 14 m</span>
                      </div>
                      
                      {/* Mini Map Screen Vector */}
                      <div className="h-20 bg-zinc-50 border border-zinc-100 rounded-lg relative overflow-hidden flex items-center justify-center">
                        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)", backgroundSize: "16px 16px" }} />
                        <svg className="absolute inset-0 w-full h-full text-zinc-200" fill="none" strokeWidth="2">
                          <path d="M 10 70 Q 100 20, 185 55 T 260 20" stroke="#2d9f6c" strokeWidth="3" />
                        </svg>
                        
                        <div className="absolute top-[32%] left-[42%] text-center">
                          <div className="w-3.5 h-3.5 rounded-full bg-white border border-[#2d9f6c] flex items-center justify-center shadow-md">
                            <Truck className="w-2.5 h-2.5 text-[#2d9f6c]" />
                          </div>
                        </div>

                        <div className="absolute bottom-[20%] right-[10%] text-center">
                          <div className="w-3 h-3 rounded-full bg-[#2d9f6c] flex items-center justify-center text-[7px] text-white font-bold">3</div>
                        </div>
                      </div>
                    </div>

                    {/* Task checklist card */}
                    <div className="bg-white border border-zinc-200 p-2.5 rounded-xl shadow-xs">
                      <span className="text-[7px] font-bold text-zinc-400 uppercase tracking-wider block">Daftar Titik Penjemputan</span>
                      <div className="space-y-1.5 pt-1.5">
                        <div className="flex items-center gap-1.5 text-[8.5px] text-zinc-500">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#2d9f6c] fill-[#2d9f6c]/10 shrink-0" />
                          <span className="line-through">TPS Kebon Sirih (3.8T)</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[8.5px] text-zinc-700 font-semibold">
                          <span className="w-3.5 h-3.5 rounded-full border border-zinc-300 shrink-0" />
                          <span>TPS Menteng Dalam (4.2T)</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Clock In Success footer button */}
                  <div className="bg-white border-t border-zinc-100 p-2 shrink-0 flex justify-between items-center">
                    <div>
                      <p className="text-[7px] font-bold text-zinc-400 uppercase">Timbangan Terakhir</p>
                      <p className="font-extrabold text-[10px] text-zinc-800 mt-0.5">8.0 Ton (Bantar Gebang)</p>
                    </div>
                    <span className="px-2 py-0.5 bg-[#ebf7f2] text-[#2d9f6c] border border-[#2d9f6c]/20 text-[7px] font-extrabold rounded uppercase tracking-wider">
                      TERCATAT
                    </span>
                  </div>
                </div>

                {/* iPhone screen bottom indicator */}
                <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-24 h-1 bg-zinc-900 rounded-full z-50" />
              </div>

              {/* App Store / Google Play Badge Rows */}
              <div className="flex flex-wrap justify-center gap-3 w-full max-w-sm pt-2">
                {/* Apple App Store */}
                <div className="flex items-center gap-2.5 px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl cursor-pointer border border-zinc-800 transition-colors shadow-md shrink-0">
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,22C14.32,22.05 13.89,21.24 12.37,21.24C10.84,21.24 10.37,21.97 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.1,16.67C20.08,16.74 19.67,18.11 18.71,19.5M15.97,4.17C16.63,3.37 17.07,2.28 16.95,1C16,1.04 14.9,1.6 14.24,2.38C13.68,3.04 13.19,4.14 13.34,5.39C14.39,5.47 15.4,4.88 15.97,4.17Z" />
                  </svg>
                  <div className="text-left leading-none">
                    <span className="text-[7.5px] uppercase tracking-wider text-zinc-400 font-semibold block">Download on the</span>
                    <span className="text-xs font-extrabold tracking-tight mt-0.5 block">App Store</span>
                  </div>
                </div>
                {/* Google Play Store */}
                <div className="flex items-center gap-2.5 px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl cursor-pointer border border-zinc-800 transition-colors shadow-md shrink-0">
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3,5.27V18.73L16.55,12L3,5.27M17.87,11.33L19.34,12L17.87,12.67L5.56,18.73L16.55,12L5.56,5.27L17.87,11.33M20,11L18.5,12L20,13V11Z" />
                  </svg>
                  <div className="text-left leading-none">
                    <span className="text-[7.5px] uppercase tracking-wider text-zinc-400 font-semibold block">GET IT ON</span>
                    <span className="text-xs font-extrabold tracking-tight mt-0.5 block">Google Play</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Explanations and App Features (Span 7) */}
            <div className={`lg:col-span-7 space-y-7 text-left transition-all duration-1000 ${
              mobileAppReveal.visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
            }`} style={{ transitionDelay: "200ms" }}>
              
              <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#ebf7f2] text-[#2d9f6c] text-[10px] font-extrabold rounded-full uppercase tracking-[0.2em]">
                <Smartphone className="w-3.5 h-3.5" /> Aplikasi Lapangan Supir
              </div>
              
              <h2 className="font-headline text-4xl sm:text-5xl font-extrabold tracking-[-0.03em] text-zinc-900 leading-[1.1]">
                Sinergi sempurna supir di lapangan
                <br />
                <span className="text-gradient-green">dengan pusat kendali</span>
              </h2>
              
              <p className="text-zinc-500 leading-[1.75] text-[15px]">
                Aplikasi mobile resmi **SIGAP Mobile** dirancang khusus untuk seluruh pengemudi armada kebersihan Dinas Lingkungan Hidup DKI Jakarta. Memastikan kepatuhan rute, kemudahan navigasi, dan mempercepat respons pertolongan jika terjadi kendala.
              </p>

              {/* Mobile App features list */}
              <div className="grid sm:grid-cols-2 gap-6 pt-2">
                {[
                  {
                    title: "GPS Absensi Geofencing",
                    desc: "Absensi clock-in dan clock-out secara otomatis saat truk memasuki depo sampah resmi terverifikasi satelit.",
                    icon: MapPin, color: "text-[#2d9f6c]", bg: "bg-[#ebf7f2]"
                  },
                  {
                    title: "Navigasi AI Terintegrasi",
                    desc: "Menerima pembaruan rute tercepat bebas kemacetan parah di Slipi, Sudirman, dan koridor utama Jakarta lainnya.",
                    icon: Navigation, color: "text-[#df8820]", bg: "bg-[#fff4e6]"
                  },
                  {
                    title: "Laporan Kendala Instan",
                    desc: "Melaporkan ban bocor, mesin mogok, atau jalan terblokir kurang dari 3 detik disertai unggahan foto bukti.",
                    icon: AlertTriangle, color: "text-red-500", bg: "bg-red-50"
                  },
                  {
                    title: "Integrasi Jembatan Timbang",
                    desc: "Berat muatan sampah terangkut terdaftar secara otomatis saat truk melewati sensor timbangan depo/TPS.",
                    icon: Trash2, color: "text-blue-500", bg: "bg-blue-50"
                  }
                ].map((feat, i) => {
                  const FeatIcon = feat.icon;
                  return (
                    <div key={i} className="flex gap-4 group">
                      <div className={`w-11 h-11 rounded-xl ${feat.bg} ${feat.color} flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-xs`}>
                        <FeatIcon className="w-5 h-5 stroke-[2.5]" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-headline font-extrabold text-zinc-900 text-sm tracking-tight">{feat.title}</h4>
                        <p className="text-[12px] text-zinc-500 leading-relaxed">{feat.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex flex-wrap gap-4 pt-6 border-t border-zinc-100">
                <button className="flex items-center gap-2.5 px-8 py-4 bg-[#2d9f6c] text-white font-bold rounded-2xl hover:bg-[#24855a] transition-all duration-300 text-[13px] shadow-lg shadow-[#2d9f6c]/20">
                  Unduh Panduan Supir (PDF) <CheckCircle2 className="w-4 h-4" />
                </button>
                <button className="flex items-center gap-2.5 px-8 py-4 bg-white text-zinc-700 font-bold rounded-2xl border border-zinc-200 hover:border-zinc-350 hover:bg-zinc-50 transition-colors text-[13px] shadow-sm">
                  Tonton Video Demo
                </button>
              </div>

            </div>

          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            IMPACT — White background, colored cards
        ══════════════════════════════════════════════════════════════ */}
        <section id="impact" ref={impactReveal.ref} className="py-28 px-6 md:px-12 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className={`text-center mb-20 max-w-2xl mx-auto transition-all duration-1000 ${impactReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#fff4e6] text-[#df8820] text-[10px] font-extrabold rounded-full uppercase tracking-[0.2em] mb-6">
                <TrendingUp className="w-3.5 h-3.5" /> Transformasi Nyata
              </div>
              <h2 className="font-headline text-4xl sm:text-5xl font-extrabold tracking-[-0.03em] text-zinc-900 mb-5 leading-[1.1]">
                Dari konvensional
                <br />
                <span className="text-gradient-green">menuju cerdas</span>
              </h2>
              <p className="text-zinc-500 text-[15px]">Bagaimana SIGAP mentransformasi operasional kebersihan Jakarta.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  badge: "SEBELUM", badgeCls: "text-zinc-500 bg-zinc-100",
                  icon: FileText, iconBg: "bg-zinc-100", iconClr: "text-zinc-400",
                  title: "Sistem Manual", titleCls: "text-zinc-600",
                  cardBg: "bg-zinc-50", border: "border-zinc-200",
                  items: ["Pelaporan kertas yang lambat", "Rute tidak terpantau", "Konsumsi BBM boros 30%", "Respon pelanggaran > 2 jam"],
                },
                {
                  badge: "PROSES", badgeCls: "text-[#df8820] bg-[#fff4e6]",
                  icon: Cpu, iconBg: "bg-[#fff4e6]", iconClr: "text-[#df8820]",
                  title: "Integrasi SIGAP", titleCls: "text-[#df8820]",
                  cardBg: "bg-[#fffbf5]", border: "border-[#df8820]/20",
                  items: ["Data GPS real-time via Mobile App", "AI optimasi rute otomatis", "Notifikasi pelanggaran instan", "Dashboard terpusat dispatcher"],
                },
                {
                  badge: "HASIL", badgeCls: "text-[#2d9f6c] bg-[#ebf7f2]",
                  icon: ShieldCheck, iconBg: "bg-[#ebf7f2]", iconClr: "text-[#2d9f6c]",
                  title: "Operasional Cerdas", titleCls: "text-[#2d9f6c]",
                  cardBg: "bg-[#f5fdf9]", border: "border-[#2d9f6c]/20",
                  items: ["Efisiensi rute +40%", "Pelanggaran turun 60%", "BBM hemat 28%", "Antrean TPA < 15 menit"],
                },
              ].map((col, i) => {
                const Icon = col.icon;
                return (
                  <div key={i} className={`${col.cardBg} border ${col.border} rounded-3xl p-8 hover:-translate-y-1 hover:shadow-xl transition-all duration-500 ${impactReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                    style={{ transitionDelay: `${i * 150 + 200}ms` }}>
                    <div className={`inline-flex items-center px-3.5 py-1.5 rounded-full text-[9px] font-extrabold uppercase tracking-[0.2em] mb-6 ${col.badgeCls}`}>
                      {col.badge}
                    </div>
                    <div className={`w-12 h-12 rounded-2xl ${col.iconBg} ${col.iconClr} flex items-center justify-center mb-6`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className={`font-headline font-extrabold text-lg mb-5 tracking-tight ${col.titleCls}`}>{col.title}</h3>
                    <ul className="space-y-3">
                      {col.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-2.5 text-[13px] text-zinc-500">
                          <ChevronRight className={`w-4 h-4 mt-0.5 shrink-0 ${col.iconClr}`} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            TESTIMONIALS — Soft green background
        ══════════════════════════════════════════════════════════════ */}
        <section id="testimonials" ref={testimonialReveal.ref} className="py-28 px-6 md:px-12 bg-gradient-to-br from-[#f0faf5] to-[#f5fdf9]">
          <div className="max-w-4xl mx-auto">
            <div className={`text-center mb-16 transition-all duration-1000 ${testimonialReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-[#2d9f6c] text-[10px] font-extrabold rounded-full uppercase tracking-[0.2em] mb-6 border border-[#2d9f6c]/15 shadow-sm">
                <Star className="w-3.5 h-3.5 fill-[#2d9f6c]" /> Testimoni
              </div>
              <h2 className="font-headline text-4xl sm:text-5xl font-extrabold tracking-[-0.03em] text-zinc-900 leading-[1.1]">
                Dipercaya para
                <br />
                <span className="text-gradient-green">profesional lapangan</span>
              </h2>
            </div>

            <div className={`bg-white rounded-[2rem] p-10 sm:p-14 border border-zinc-100 relative overflow-hidden min-h-[300px] shadow-lg transition-all duration-1000 ${testimonialReveal.visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-[0.97]"}`}
              style={{ transitionDelay: "200ms" }}>
              <div className="absolute top-4 right-8 font-headline text-zinc-100 font-extrabold text-[160px] leading-none select-none pointer-events-none">&ldquo;</div>

              {TESTIMONIALS.map((t, i) => (
                <div
                  key={i}
                  className={`transition-all duration-700 ease-in-out ${i === activeTestimonial ? "opacity-100 translate-y-0 relative" : "opacity-0 translate-y-6 absolute top-10 left-10 right-10 pointer-events-none"}`}
                >
                  <div className="flex gap-1 mb-8">
                    {[...Array(5)].map((_, j) => <Star key={j} className="w-5 h-5 fill-[#df8820] text-[#df8820]" />)}
                  </div>
                  <p className="font-headline text-2xl sm:text-[28px] font-semibold text-zinc-700 leading-[1.6] mb-10 max-w-2xl tracking-tight">
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#2d9f6c] to-[#4ade80] flex items-center justify-center text-white font-headline font-extrabold text-[15px] shadow-lg shadow-[#2d9f6c]/20">
                      {t.name.split(" ").map(w => w[0]).slice(0, 2).join("")}
                    </div>
                    <div>
                      <p className="font-headline font-extrabold text-zinc-900 tracking-tight text-[15px]">{t.name}</p>
                      <p className="text-[13px] text-zinc-500 font-medium">{t.role} — {t.org}</p>
                    </div>
                  </div>
                </div>
              ))}

              <div className="flex gap-2 mt-10 pt-8 border-t border-zinc-100">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveTestimonial(i)}
                    className={`h-1.5 rounded-full transition-all duration-500 ${i === activeTestimonial ? "w-10 bg-[#2d9f6c]" : "w-3 bg-zinc-200 hover:bg-zinc-300"}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            FINAL CTA — Green gradient (no black!)
        ══════════════════════════════════════════════════════════════ */}
        <section className="py-28 px-6 md:px-12 bg-gradient-to-br from-[#2d9f6c] to-[#24855a] relative overflow-hidden">
          {/* Decorative */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-white rounded-full blur-[200px] opacity-[0.06]" />
            <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-[#df8820] rounded-full blur-[180px] opacity-[0.08]" />
            <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
          </div>

          <div className="max-w-3xl mx-auto text-center relative z-10 space-y-10">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/15 border border-white/20 text-white text-[10px] font-extrabold rounded-full uppercase tracking-[0.2em] mx-auto">
              <TreePine className="w-3.5 h-3.5" /> Jakarta Bersih
            </div>
            <h2 className="font-headline text-5xl sm:text-6xl font-extrabold text-white leading-[1.08] tracking-[-0.03em]">
              Siap menuju
              <br />
              Jakarta lebih bersih?
            </h2>
            <p className="text-white/70 text-lg leading-[1.7] max-w-xl mx-auto">
              Bergabunglah dengan ekosistem armada cerdas DKI Jakarta. Eksplorasi dashboard live SIGAP sekarang — tanpa registrasi.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-2">
              <Link
                href="/dashboard"
                className="flex items-center gap-2.5 px-10 py-4.5 bg-white text-[#2d9f6c] font-bold rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-400 text-[14px]"
              >
                Masuk ke Dashboard <ArrowRight className="w-4 h-4" />
              </Link>
              <button className="flex items-center gap-2.5 px-10 py-4.5 bg-white/15 text-white font-bold rounded-2xl border border-white/25 hover:bg-white/25 transition-all duration-300 text-[14px]">
                Jadwalkan Demo
              </button>
            </div>
          </div>
        </section>

      </main>

      {/* ══════════════════════════════════════════════════════════════
          FOOTER — White, clean
      ══════════════════════════════════════════════════════════════ */}
      <footer className="bg-white py-20 px-6 md:px-12 border-t border-zinc-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-14 border-b border-zinc-100">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-gradient-to-br from-[#2d9f6c] to-[#24855a] rounded-2xl flex items-center justify-center shadow-lg shadow-[#2d9f6c]/15">
                  <Recycle className="w-5 h-5 text-white" />
                </div>
                <span className="font-headline font-extrabold text-xl tracking-tight text-zinc-900">SIGAP</span>
              </div>
              <p className="text-zinc-500 text-[13px] leading-relaxed">
                Sistem Integrasi Gerak Armada Pintar — Menuju Jakarta yang lebih bersih melalui teknologi AI dan Mobile App.
              </p>
              <div className="flex gap-3 mt-6">
                {[Globe, Mail, Phone].map((Icon, i) => (
                  <a key={i} href="#" className="w-10 h-10 rounded-2xl bg-zinc-50 border border-zinc-100 hover:bg-[#ebf7f2] hover:border-[#2d9f6c]/20 flex items-center justify-center text-zinc-400 hover:text-[#2d9f6c] transition-all duration-300 hover:-translate-y-0.5">
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {[
              { title: "Platform", items: ["Dashboard", "Live Map", "Fleet Management", "Analitik", "Pengambilan Sampah"] },
              { title: "Organisasi", items: ["Tentang Kami", "Fitur", "Teknologi", "Hubungi Kami"] },
              { title: "Legal", items: ["Kebijakan Privasi", "Syarat Layanan", "Website DLH Jakarta"] },
            ].map((col, i) => (
              <div key={i}>
                <h4 className="font-headline font-extrabold text-zinc-800 mb-6 text-[11px] uppercase tracking-[0.2em]">{col.title}</h4>
                <ul className="space-y-3.5">
                  {col.items.map((item, j) => (
                    <li key={j}>
                      <a href="#" className="text-zinc-500 hover:text-[#2d9f6c] text-[13px] font-medium transition-colors duration-200">{item}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-zinc-400 text-[12px]">
              © 2026 Dinas Lingkungan Hidup DKI Jakarta. SIGAP — Sistem Integrasi Gerak Armada Pintar.
            </p>
            <div className="flex items-center gap-2.5 px-5 py-2.5 bg-[#ebf7f2] border border-[#2d9f6c]/15 rounded-full">
              <span className="w-2 h-2 rounded-full bg-[#2d9f6c] animate-pulse" />
              <span className="text-[11px] text-[#2d9f6c] font-semibold tracking-wide">Sistem Aktif • Real-time</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
