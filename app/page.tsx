"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
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
const FeaturesBentoGrid = dynamic(() => import("@/components/landing/FeaturesBentoGrid"), { ssr: false });

// ─── Scroll Reveal Hook ──────────────────────────────────────────────────────

type RevealDirection = "up" | "down" | "left" | "right" | "scale";

function useReveal(direction: RevealDirection = "up", threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold, rootMargin: "0px 0px -60px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible, direction };
}

function revealClass(visible: boolean, direction: RevealDirection = "up", _delay = 0) {
  const base = "transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]";
  const hidden: Record<RevealDirection, string> = {
    up: "opacity-0 translate-y-10",
    down: "opacity-0 -translate-y-10",
    left: "opacity-0 translate-x-12",
    right: "opacity-0 -translate-x-12",
    scale: "opacity-0 scale-90",
  };
  const shown = "opacity-100 translate-x-0 translate-y-0 scale-100";
  return `${base} ${visible ? shown : hidden[direction]}`;
}

function revealStyle(delay: number) {
  return delay ? { transitionDelay: `${delay}ms` } : undefined;
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


// ─── Component ─────────────────────────────────────────────────────────────────

export default function LandingPage() {
  const [heroMounted, setHeroMounted] = useState(false);

  const statsReveal = useReveal("up");
  const featuresReveal = useReveal("up");
  const showcaseReveal = useReveal("up");
  const impactReveal = useReveal("up");
  const advantagesReveal = useReveal("up");
  const mobileAppReveal = useReveal("up");

  // ─── Interactive Console Demo States ──────────────────────────────────────────
  const [activeDemoTab, setActiveDemoTab] = useState("map");
  const [optimizeActive, setOptimizeActive] = useState(true);
  const [activeChart, setActiveChart] = useState("waste");
  const [appScreen, setAppScreen] = useState("home");

  // ─── Video Walkthrough Tab State ──────────────────────────────────────────────
  const [consoleVideoPlaying, setConsoleVideoPlaying] = useState(false);
  const walkthroughVideoRef = useRef<HTMLVideoElement>(null);

  // ─── Keunggulan Carousel State ───────────────────────────────────────────────
  const [activeAdvantageSlide, setActiveAdvantageSlide] = useState(0);

  useEffect(() => { setTimeout(() => setHeroMounted(true), 150); }, []);


  return (
    <div className="bg-white font-sans text-zinc-900 min-h-screen flex flex-col selection:bg-[#fff4e6] selection:text-[#df8820]">

      {/* ══════════════════════════════════════════════════════════════
          NAVBAR — White, clean
      ══════════════════════════════════════════════════════════════ */}
      <nav className="bg-white/90 backdrop-blur-2xl fixed top-0 w-full z-50 border-b border-zinc-100 shadow-sm">
        <div className="flex justify-between items-center h-[72px] px-6 md:px-12 max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-3">
            <Image src="/logo.webp" alt="SIGAP Logo" width={48} height={48} className="rounded-2xl shadow-lg shadow-[#2d9f6c]/20" loading="eager" />
            <div className="leading-none">
              <span className="font-headline text-[22px] font-extrabold tracking-tight block">
                <span className="text-[#16a34a]">SIG</span>
                <span className="text-[#df8820]">AP</span>
              </span>
              <span className="text-[8px] font-bold text-[#2d9f6c] uppercase tracking-[0.2em]">Smart Fleet System</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-10">
            {[["Fitur", "#features"], ["Teknologi", "#tech"], ["Dampak", "#impact"], ["Keunggulan", "#advantages"]].map(([label, href]) => (
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
        {/* ══════════════════════════════════════════════════════════════
            HERO & BENTO GRID — Flowhub Style, SIGAP Colors
        ══════════════════════════════════════════════════════════════ */}
        <section className="relative min-h-screen pt-12 pb-24 flex flex-col justify-start overflow-hidden bg-gradient-to-br from-white via-[#f0faf5] to-[#fef8f0] perspective-container">
          <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&display=swap');
            
            .perspective-container {
              perspective: 1200px;
              transform-style: preserve-3d;
            }

            @keyframes springBadgePop {
              0% {
                opacity: 0;
                transform: scale(0.4) translateY(-30px);
              }
              70% {
                transform: scale(1.12) translateY(2px);
              }
              100% {
                opacity: 1;
                transform: scale(1) translateY(0);
              }
            }

            @keyframes premiumRevealLine {
              0% {
                opacity: 0;
                transform: translateY(115%) rotateX(-12deg) skewY(2deg);
                filter: blur(4px);
              }
              100% {
                opacity: 1;
                transform: translateY(0) rotateX(0deg) skewY(0deg);
                filter: blur(0);
              }
            }

            @keyframes springFadeUp {
              0% {
                opacity: 0;
                transform: translateY(35px) scale(0.96);
                filter: blur(2px);
              }
              70% {
                transform: translateY(-3px) scale(1.01);
              }
              100% {
                opacity: 1;
                transform: translateY(0) scale(1);
                filter: blur(0);
              }
            }

            @keyframes springSearchPop {
              0% {
                opacity: 0;
                transform: translateY(50px) scale(0.9) rotateX(-8deg);
              }
              70% {
                transform: translateY(-5px) scale(1.02) rotateX(1.5deg);
              }
              100% {
                opacity: 1;
                transform: translateY(0) scale(1) rotateX(0deg);
              }
            }

            @keyframes drawPathSpring {
              0% {
                stroke-dashoffset: 300;
                opacity: 0;
              }
              30% {
                opacity: 1;
              }
              100% {
                stroke-dashoffset: 0;
                opacity: 1;
              }
            }

            @keyframes bounceArrowhead {
              0% {
                opacity: 0;
                transform: scale(0);
              }
              70% {
                transform: scale(1.3);
              }
              100% {
                opacity: 1;
                transform: scale(1);
              }
            }

            @keyframes bentoSpringLeft {
              0% {
                opacity: 0;
                transform: translateX(-40px) translateY(40px) rotateY(-12deg) scale(0.94);
              }
              70% {
                transform: translateX(3px) translateY(-3px) rotateY(1deg) scale(1.015);
              }
              100% {
                opacity: 1;
                transform: translateX(0) translateY(0) rotateY(0deg) scale(1);
              }
            }

            @keyframes bentoSpringCenter {
              0% {
                opacity: 0;
                transform: translateY(70px) rotateX(-10deg) scale(0.92);
              }
              70% {
                transform: translateY(-5px) rotateX(1.5deg) scale(1.02);
              }
              100% {
                opacity: 1;
                transform: translateY(0) rotateX(0deg) scale(1);
              }
            }

            @keyframes bentoSpringRight {
              0% {
                opacity: 0;
                transform: translateX(40px) translateY(40px) rotateY(12deg) scale(0.94);
              }
              70% {
                transform: translateX(-3px) translateY(-3px) rotateY(-1deg) scale(1.015);
              }
              100% {
                opacity: 1;
                transform: translateX(0) translateY(0) rotateY(0deg) scale(1);
              }
            }

            @keyframes bentoStackCard1 {
              0% {
                opacity: 0;
                transform: translateY(50px) rotate(-8deg) scale(0.85);
              }
              75% {
                transform: translateY(-4px) rotate(-3deg) scale(1.01);
              }
              100% {
                opacity: 0.85;
                transform: translateY(0) rotate(-2deg) scale(1);
              }
            }

            @keyframes bentoStackCard2 {
              0% {
                opacity: 0;
                transform: translateY(70px) rotate(8deg) scale(0.85);
              }
              75% {
                transform: translateY(-4px) rotate(3deg) scale(1.01);
              }
              100% {
                opacity: 0.95;
                transform: translateY(0) rotate(2deg) scale(1);
              }
            }

            @keyframes bentoStackForeground {
              0% {
                opacity: 0;
                transform: translateY(90px) rotateX(-8deg) scale(0.9);
              }
              75% {
                transform: translateY(-5px) rotateX(1.5deg) scale(1.02);
              }
              100% {
                opacity: 1;
                transform: translateY(0) rotateX(0deg) scale(1);
              }
            }

            @keyframes ringPulseOut {
              0% {
                transform: scale(1);
                opacity: 0.6;
              }
              100% {
                transform: scale(2.6);
                opacity: 0;
              }
            }

            .badge-ripple::after {
              content: '';
              position: absolute;
              inset: -4px;
              border-radius: 9999px;
              border: 1px solid rgba(45, 159, 108, 0.4);
              animation: ringPulseOut 2s cubic-bezier(0.16, 1, 0.3, 1) infinite;
            }

            .animate-badge-pop {
              animation: springBadgePop 1.1s cubic-bezier(0.34, 1.56, 0.64, 1) both;
            }

            .animate-reveal-line {
              animation: premiumRevealLine 1.3s cubic-bezier(0.16, 1, 0.3, 1) both;
            }

            .animate-spring-fade-up {
              animation: springFadeUp 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) both;
            }

            .animate-search-spring {
              animation: springSearchPop 1.3s cubic-bezier(0.34, 1.56, 0.64, 1) both;
            }

            .animate-bento-spring-left {
              animation: bentoSpringLeft 1.4s cubic-bezier(0.34, 1.56, 0.64, 1) both;
            }

            .animate-bento-spring-center {
              animation: bentoSpringCenter 1.4s cubic-bezier(0.34, 1.56, 0.64, 1) both;
            }

            .animate-bento-spring-right {
              animation: bentoSpringRight 1.4s cubic-bezier(0.34, 1.56, 0.64, 1) both;
            }

            .animate-stack-card-1 {
              animation: bentoStackCard1 1.4s cubic-bezier(0.34, 1.56, 0.64, 1) both;
            }

            .animate-stack-card-2 {
              animation: bentoStackCard2 1.4s cubic-bezier(0.34, 1.56, 0.64, 1) both;
            }

            .animate-stack-foreground {
              animation: bentoStackForeground 1.4s cubic-bezier(0.34, 1.56, 0.64, 1) both;
            }

            .animate-draw-path-spring {
              stroke-dasharray: 300;
              stroke-dashoffset: 300;
              animation: drawPathSpring 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            }

            .animate-arrowhead-bounce {
              transform-origin: center;
              animation: bounceArrowhead 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) both;
            }
          `}</style>

          {/* Decorative background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
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

          <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full pt-16 flex flex-col items-center">
            
            {/* Top Badge */}
            <div className={`mb-6 ${heroMounted ? "animate-badge-pop" : "opacity-0"}`} style={{ animationDelay: "150ms" }}>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ebf7f2]/70 backdrop-blur-md border border-[#2d9f6c]/20 text-[#2d9f6c] text-[10px] font-extrabold tracking-wider uppercase shadow-[0_2px_15px_rgba(45,159,108,0.06)] hover:bg-[#ebf7f2] transition-colors cursor-default relative badge-ripple">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2d9f6c] opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#2d9f6c]" />
                </span>
                <span>Sistem Aktif • Real-Time Jakarta</span>
              </div>
            </div>

            {/* Centered Headline */}
            <div className="text-center max-w-4xl mx-auto space-y-6 relative z-10">
              <h1 className="font-headline text-[2.8rem] sm:text-[4rem] lg:text-[4.8rem] font-extrabold leading-[1.08] tracking-[-0.03em] text-zinc-900 flex flex-col items-center select-none">
                <span className="block overflow-hidden h-full pb-1">
                  <span className={`block ${heroMounted ? "animate-reveal-line" : "opacity-0"}`} style={{ animationDelay: "280ms" }}>
                    Revolusi <span className="text-gradient-orange">Manajemen</span>
                  </span>
                </span>
                <span className="block overflow-hidden h-full pb-1 mt-1">
                  <span className={`block ${heroMounted ? "animate-reveal-line" : "opacity-0"}`} style={{ animationDelay: "450ms" }}>
                    <span className="text-gradient-green">Armada</span> Ibu Kota
                  </span>
                </span>
              </h1>

              <div className="overflow-hidden">
                <p className={`text-[16px] sm:text-[18px] text-zinc-500 leading-[1.8] max-w-2xl mx-auto ${heroMounted ? "animate-spring-fade-up" : "opacity-0"}`}
                  style={{ animationDelay: "580ms" }}
                >
                  Monitor, integrasi, dan optimalisasi pergerakan <strong className="text-zinc-700 font-semibold">1.369 armada kebersihan</strong> DKI Jakarta secara real-time dengan teknologi AI dan Mobile App.
                </p>
              </div>
            </div>

            {/* Bento Feature Grid (3 Columns with Mathematical Height Alignment - 410px) */}
            <div className="mt-20 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-start text-left relative">
              <style>{`
                @keyframes routeFlow {
                  0% { stroke-dashoffset: 300; }
                  100% { stroke-dashoffset: 0; }
                }
                .animate-route-flow {
                  animation: routeFlow 7s linear infinite;
                }
                @keyframes chevronPulse {
                  0%, 100% { opacity: 0.2; transform: translateX(0); }
                  50% { opacity: 1; transform: translateX(4px); }
                }
                .chevron-pulse-1 { animation: chevronPulse 1.5s infinite 0.1s; }
                .chevron-pulse-2 { animation: chevronPulse 1.5s infinite 0.3s; }
                .chevron-pulse-3 { animation: chevronPulse 1.5s infinite 0.5s; }
              `}</style>

              {/* Kolom 1: Shift & Rencana Perjalanan (Total Height = 410px) */}
              <div className="flex flex-col gap-5 w-full">
                
                {/* Card 1: Jadwal Shift & Rencana Perjalanan (Height: 410px) */}
                <div className={`bg-gradient-to-b from-white to-zinc-50/50 rounded-[32px] p-6 shadow-[0_15px_30px_rgba(0,0,0,0.03),0_1px_2px_rgba(0,0,0,0.02)] border border-zinc-100/80 flex flex-col justify-between h-[410px] hover:shadow-[0_25px_50px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 relative group overflow-hidden ${heroMounted ? "animate-bento-spring-left" : "opacity-0"}`} style={{ animationDelay: "800ms" }}>
                  <div className="absolute top-0 right-0 h-1.5 w-full bg-gradient-to-r from-[#2d9f6c]/20 via-[#2d9f6c] to-[#2d9f6c]/20 group-hover:from-[#2d9f6c] group-hover:to-[#2d9f6c] transition-all duration-500" />
                  
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#2d9f6c] bg-[#ebf7f2] px-3.5 py-1.5 rounded-full border border-[#2d9f6c]/15">
                      Jadwal Shift
                    </span>
                    <span className="text-[9px] font-extrabold text-[#2d9f6c] bg-[#ebf7f2] px-3 py-1 rounded-full flex items-center gap-1.5 border border-[#2d9f6c]/20">
                      <span className="w-2 h-2 rounded-full bg-[#2d9f6c] relative flex">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2d9f6c] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2d9f6c]"></span>
                      </span>
                      Shift Aktif
                    </span>
                  </div>

                  <div>
                    <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest leading-none">ARMADA JALUR C</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xl font-headline font-extrabold text-zinc-950 font-mono tracking-tight leading-none bg-zinc-50 border border-zinc-200 px-2.5 py-1 rounded-xl shadow-inner">
                        B-1234-DLH
                      </span>
                      <span className="text-[10px] text-zinc-500 font-semibold px-2 py-0.5 bg-zinc-100 rounded-md">Truk Compactor</span>
                    </div>
                  </div>

                  {/* Shift Progress & Time */}
                  <div className="py-4 border-y border-zinc-100/80 space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-[18px] font-extrabold text-zinc-800 leading-none tracking-tight">Senin, 8 Mar</p>
                        <p className="text-[11px] text-zinc-500 font-semibold mt-1.5 flex items-center gap-2">
                          <Clock className="w-4.5 h-4.5 text-[#df8820] shrink-0" /> Shift Pagi: <span className="font-bold text-zinc-700">06:00 – 12:00 WIB</span>
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] font-extrabold text-[#2d9f6c] bg-[#ebf7f2] px-2.5 py-1 rounded-lg border border-[#2d9f6c]/10">75% Selesai</span>
                      </div>
                    </div>
                    
                    {/* Shift progress bar */}
                    <div className="space-y-1.5">
                      <div className="h-2 bg-zinc-100 rounded-full overflow-hidden border border-zinc-200/50 p-[1px]">
                        <div className="h-full bg-gradient-to-r from-[#2d9f6c] to-[#10b981] rounded-full transition-all duration-500 relative" style={{ width: "75%" }}>
                          <span className="absolute right-0 top-0 w-1.5 h-1.5 bg-white rounded-full my-[1px] mx-[1px] animate-ping" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tasks / Stops list */}
                  <div className="space-y-2">
                    <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest leading-none">Rencana Perjalanan</p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2.5 text-[11px] text-zinc-400 font-medium">
                        <div className="w-4 h-4 rounded-full bg-[#ebf7f2] border border-[#2d9f6c]/30 flex items-center justify-center shrink-0">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#2d9f6c]" />
                        </div>
                        <span className="line-through decoration-zinc-300">TPS Kebon Sirih (Selesai • 06:45)</span>
                      </div>
                      <div className="flex items-center gap-2.5 text-[11px] text-zinc-400 font-medium">
                        <div className="w-4 h-4 rounded-full bg-[#ebf7f2] border border-[#2d9f6c]/30 flex items-center justify-center shrink-0">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#2d9f6c]" />
                        </div>
                        <span className="line-through decoration-zinc-300">TPS Menteng Dalam (Selesai • 08:30)</span>
                      </div>
                      <div className="flex items-center gap-2.5 text-[11px] text-zinc-800 font-bold bg-[#fff4e6]/60 border border-[#df8820]/15 p-1.5 pr-2.5 rounded-xl">
                        <span className="w-4 h-4 rounded-full border-2 border-[#df8820] flex items-center justify-center shrink-0 bg-white">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#df8820] animate-pulse" />
                        </span>
                        <span className="truncate">TPA Bantar Gebang (Timbang Muatan)</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 pt-3.5 border-t border-zinc-100/80">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#df8820] to-[#f59e0b] border-2 border-white shadow-md flex items-center justify-center text-[11px] font-extrabold text-white shrink-0">
                      BP
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[9px] text-zinc-400 font-bold leading-none uppercase tracking-wide">Supir Terdaftar</p>
                      <p className="text-[12px] font-extrabold text-zinc-800 mt-1 leading-none truncate">Bambang Pamungkas</p>
                    </div>
                  </div>

                  <button 
                    onClick={() => {
                      setActiveDemoTab("map");
                      setConsoleVideoPlaying(false);
                      const el = document.getElementById("tech");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="w-full text-center py-3 bg-gradient-to-r from-[#2d9f6c] to-[#10b981] hover:from-[#228659] hover:to-[#059669] text-white font-extrabold text-[11px] rounded-xl shadow-md shadow-[#2d9f6c]/10 hover:shadow-lg hover:shadow-[#2d9f6c]/20 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 cursor-pointer uppercase tracking-wider"
                  >
                    Verifikasi Lokasi Truk
                  </button>
                </div>

              </div>

              {/* Kolom 2: 10X AI (Height: 410px) */}
              <div className="w-full">
                
                {/* Card 2: 10X AI Optimization (Height: 410px) */}
                <div className={`bg-gradient-to-b from-white to-zinc-50/50 rounded-[32px] p-7 shadow-[0_15px_30px_rgba(0,0,0,0.03),0_1px_2px_rgba(0,0,0,0.02)] border border-zinc-100/80 flex flex-col justify-between h-[410px] hover:shadow-[0_25px_50px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 relative group overflow-hidden ${heroMounted ? "animate-bento-spring-center" : "opacity-0"}`} style={{ animationDelay: "1100ms" }}>
                  <div className="absolute top-0 right-0 h-1.5 w-full bg-gradient-to-r from-[#df8820]/20 via-[#df8820] to-[#df8820]/20 group-hover:from-[#df8820] group-hover:to-[#df8820] transition-all duration-500" />
                  
                  {/* Glowing AI Neural Map Background Visual */}
                  <div className="absolute top-[80px] right-4 w-[240px] h-[140px] opacity-75 group-hover:opacity-90 transition-opacity duration-300 pointer-events-none">
                    <svg width="100%" height="100%" viewBox="0 0 240 140" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <pattern id="ai-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                          <circle cx="2" cy="2" r="1" fill="#e2e8f0" />
                        </pattern>
                        <linearGradient id="path-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#2d9f6c" />
                          <stop offset="100%" stopColor="#df8820" />
                        </linearGradient>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#ai-grid)" opacity="0.4" />
                      
                      {/* Route Connections */}
                      <path d="M20,100 L80,40 L160,80 L220,20" stroke="url(#path-grad)" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="6 6" />
                      
                      {/* Animated Glowing Active Path */}
                      <path d="M20,100 L80,40 L160,80 L220,20" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="300" strokeDashoffset="300" className="animate-route-flow" />
                      
                      {/* Node Circles */}
                      <circle cx="20" cy="100" r="4.5" fill="#ebf7f2" stroke="#2d9f6c" strokeWidth="2" />
                      <circle cx="80" cy="40" r="4.5" fill="#fff4e6" stroke="#df8820" strokeWidth="2" />
                      <circle cx="160" cy="80" r="4.5" fill="#ebf7f2" stroke="#2d9f6c" strokeWidth="2" />
                      <circle cx="220" cy="20" r="4.5" fill="#e0f2fe" stroke="#0a51a1" strokeWidth="2" />
                      
                      {/* Halo Pulsing around Node */}
                      <circle cx="160" cy="80" r="10" stroke="#2d9f6c" strokeWidth="1" opacity="0.5" className="animate-ping" style={{ transformOrigin: "160px 80px" }} />
                      <circle cx="80" cy="40" r="10" stroke="#df8820" strokeWidth="1" opacity="0.5" className="animate-ping" style={{ transformOrigin: "80px 40px", animationDelay: "0.5s" }} />
                    </svg>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#df8820] bg-[#fff4e6] px-3.5 py-1.5 rounded-full border border-[#df8820]/15">
                      Kecerdasan AI
                    </span>
                    <div className="flex items-center gap-1 mt-8 relative z-10">
                      <p className="text-7xl sm:text-8xl font-headline font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-[#2d9f6c] to-[#10b981] tracking-tighter leading-none filter drop-shadow-sm select-none">
                        10X
                      </p>
                      <div className="flex -space-x-1 mt-2">
                        <ChevronRight className="w-8 h-8 text-[#df8820] shrink-0 chevron-pulse-1" />
                        <ChevronRight className="w-8 h-8 text-[#df8820] shrink-0 chevron-pulse-2" />
                        <ChevronRight className="w-8 h-8 text-[#df8820] shrink-0 chevron-pulse-3" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative z-10">
                    <p className="text-[14px] text-zinc-500 font-semibold leading-relaxed">
                      Optimalisasi rute truk pengangkutan sampah secara otomatis berbasis algoritma kecerdasan buatan dinamis.
                    </p>
                    <div className="mt-6 w-full h-2.5 bg-zinc-100 rounded-full overflow-hidden border border-zinc-200/50 p-[1px]">
                      <div className="h-full bg-gradient-to-r from-[#2d9f6c] via-[#10b981] to-[#059669] rounded-full transition-all duration-500 relative" style={{ width: "91%" }}>
                        <span className="absolute right-0 top-0 w-2 h-2 bg-white rounded-full my-[1px] mx-[1px] animate-ping" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <p className="text-[9.5px] text-zinc-400 font-extrabold uppercase tracking-wider">Efisiensi Rute</p>
                      <span className="text-[11px] font-extrabold text-[#2d9f6c] bg-[#ebf7f2] px-2.5 py-0.5 rounded-md border border-[#2d9f6c]/10">
                        91% MENINGKAT
                      </span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Kolom 3: Stacked Aduan JAKI (Height: 410px Container, perfectly responsive with % widths) */}
              <div className="w-full h-[410px] relative">
                
                {/* Background card 1 (Timbangan Bantar Gebang) - Mint green (88% Width, Centered) */}
                <div className={`absolute top-2 left-1/2 -translate-x-[48%] w-[88%] h-[120px] bg-gradient-to-br from-[#ebf7f2] to-[#dcfce7] border border-[#2d9f6c]/25 rounded-[24px] p-5 shadow-[0_10px_25px_rgba(45,159,108,0.05)] transform rotate-[-2.5deg] hover:rotate-0 hover:-translate-y-2 transition-all duration-500 backdrop-blur-md ${heroMounted ? "animate-stack-card-1" : "opacity-0"}`} style={{ animationDelay: "1200ms" }}>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[9px] font-extrabold text-[#2d9f6c] uppercase tracking-[0.12em] bg-white px-2.5 py-1 rounded-full border border-[#2d9f6c]/15">Timbangan Bantar Gebang</span>
                    <span className="text-[8px] text-[#2d9f6c] font-bold tracking-wider flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-[#2d9f6c] rounded-full animate-ping" />
                      LIVE
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-[11px] font-semibold text-zinc-700 mt-2">
                    <div>
                      <p className="text-[8px] text-zinc-400 font-bold uppercase leading-none mb-1">Armada</p>
                      <p className="font-mono text-zinc-800 font-extrabold">B-5566-DLH</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[8px] text-zinc-400 font-bold uppercase leading-none mb-1">Berat Muatan</p>
                      <p className="text-[#2d9f6c] font-extrabold text-[12.5px]">8.42 Ton</p>
                    </div>
                  </div>
                </div>

                {/* Background card 2 (Rerouting AI) - Yellow (92% Width, Centered) */}
                <div className={`absolute top-12 left-1/2 -translate-x-[49%] w-[92%] h-[120px] bg-gradient-to-br from-[#fff4e6] to-[#fef3c7] border border-[#df8820]/25 rounded-[24px] p-5 shadow-[0_12px_30px_rgba(223,136,32,0.06)] transform rotate-[2.5deg] hover:rotate-0 hover:-translate-y-2 transition-all duration-500 backdrop-blur-md ${heroMounted ? "animate-stack-card-2" : "opacity-0"}`} style={{ animationDelay: "1300ms" }}>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[9px] font-extrabold text-[#df8820] uppercase tracking-[0.12em] bg-white px-2.5 py-1 rounded-full border border-[#df8820]/15">Rerouting AI</span>
                    <span className="w-2 h-2 rounded-full bg-[#df8820] relative flex">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#df8820] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#df8820]"></span>
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-[11px] font-semibold text-zinc-700 mt-2">
                    <div>
                      <p className="text-[8px] text-zinc-400 font-bold uppercase leading-none mb-1">Armada</p>
                      <p className="font-mono text-zinc-800 font-extrabold">B-1234-DLH</p>
                    </div>
                    <div className="text-right flex flex-col items-end">
                      <p className="text-[8px] text-zinc-400 font-bold uppercase leading-none mb-1">Bypass Macet</p>
                      <span className="text-[#2d9f6c] font-extrabold text-[10px] flex items-center gap-0.5">
                        <TrendingUp className="w-3.5 h-3.5 text-[#2d9f6c]" /> -12 Menit
                      </span>
                    </div>
                  </div>
                </div>

                {/* Foreground Card: Aduan JAKI (100% Width, Fits column perfectly, height 314px) */}
                <div className={`absolute top-[96px] left-1/2 -translate-x-1/2 w-full h-[314px] bg-gradient-to-b from-white to-zinc-50/50 border border-zinc-100 rounded-[32px] p-6 shadow-[0_25px_60px_rgba(10,81,161,0.08),0_4px_12px_rgba(10,81,161,0.02)] z-10 hover:-translate-y-1 hover:shadow-[0_30px_70px_rgba(10,81,161,0.14)] transition-all duration-300 flex flex-col justify-between group overflow-hidden ${heroMounted ? "animate-stack-foreground" : "opacity-0"}`} style={{ animationDelay: "1400ms" }}>
                  <div className="absolute top-0 right-0 h-1.5 w-full bg-gradient-to-r from-[#0a51a1]/20 via-[#0a51a1] to-[#0a51a1]/20 group-hover:from-[#0a51a1] group-hover:to-[#0a51a1] transition-all duration-500" />
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-[#0a51a1] to-[#3b82f6] shadow-sm flex items-center justify-center text-[11px] font-extrabold text-white">
                        J
                      </div>
                      <span className="text-[10px] font-extrabold text-[#0a51a1] tracking-[0.08em] uppercase">Aduan JAKI</span>
                    </div>
                    <span className="text-[9px] font-extrabold text-white bg-[#df8820] px-3 py-1 rounded-full uppercase tracking-wider shadow-sm animate-pulse">
                      BARU
                    </span>
                  </div>
                  
                  <div className="space-y-2 mt-4 flex-1">
                    <p className="text-[9px] text-zinc-400 font-bold uppercase tracking-widest leading-none">Laporan Warga</p>
                    <p className="text-[13.5px] font-extrabold text-zinc-800 leading-snug group-hover:text-zinc-900 transition-colors">
                      Tumpukan sampah liar di trotoar Sudirman dekat Stasiun MRT
                    </p>
                  </div>
                  
                  <div className="py-3.5 border-t border-zinc-100 flex justify-between items-center text-[11px] font-semibold text-zinc-700 mt-2">
                    <div>
                      <p className="text-[8px] text-zinc-400 font-bold uppercase leading-none mb-1">Masuk</p>
                      <p className="text-zinc-800 font-extrabold font-mono">Pukul 09:23 WIB</p>
                    </div>
                    <span className="text-[9px] font-extrabold text-[#2d9f6c] bg-[#ebf7f2] px-3.5 py-1.5 rounded-xl border border-[#2d9f6c]/15 shadow-sm">
                      Disposisi C-12
                    </span>
                  </div>
                </div>
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

          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-16 relative z-10">
            {[
              { value: "1.369", label: "Total Armada" },
              { value: "12.4k", label: "Ton Sampah / Hari" },
              { value: "98%", label: "Ketepatan Rute" },
              { value: "+40%", label: "Efisiensi Operasional" },
            ].map((s, i) => (
              <div key={i} className={`text-center group ${revealClass(statsReveal.visible, "scale")}`} style={revealStyle(i * 120)}>
                <p className="font-headline text-5xl sm:text-[3.5rem] font-extrabold tracking-[-0.04em] text-white transition-transform duration-300 group-hover:scale-110 drop-shadow-md">
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
            <div className={`text-center mb-20 max-w-2xl mx-auto ${revealClass(featuresReveal.visible, "up")}`}>
              <h2 className="font-headline text-4xl sm:text-5xl font-extrabold tracking-[-0.03em] text-zinc-900 mb-5 leading-[1.1]">
                Semua yang Anda butuhkan
                <br />
                <span className="text-gradient-green">dalam satu platform</span>
              </h2>
              <p className="text-zinc-500 leading-relaxed text-[15px]">
                Dari tracking GPS hingga analitik AI — SIGAP mengintegrasikan seluruh operasional kebersihan Jakarta.
              </p>
            </div>

            {/* Asymmetric Bento Grid */}
            <FeaturesBentoGrid
              features={FEATURES}
              visible={featuresReveal.visible}
              revealClass={revealClass}
              revealStyle={revealStyle}
            />
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            SHOWCASE: INTERACTIVE COMMAND CENTER CONSOLE — White, Glass
        ══════════════════════════════════════════════════════════════ */}
        <section id="tech" ref={showcaseReveal.ref} className="py-28 px-6 md:px-12 bg-zinc-50/50 border-y border-zinc-100">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16 max-w-3xl mx-auto">
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
                { id: "walkthrough", label: "Video Walkthrough", desc: "Panduan Ekosistem", icon: PlayCircle },
              ].map((tab) => {
                const TabIcon = tab.icon;
                const isActive = activeDemoTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveDemoTab(tab.id);
                      if (tab.id === "walkthrough") {
                        setConsoleVideoPlaying(false);
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

                {/* ─── TAB 4: WALKTHROUGH VIDEO ─── */}
                {activeDemoTab === "walkthrough" && (
                  <div
                    className="absolute inset-0 p-6 flex flex-col justify-between h-full bg-zinc-950 text-white rounded-2xl overflow-hidden shadow-inner border border-zinc-900"
                    onMouseLeave={() => {
                      if (walkthroughVideoRef.current) {
                        walkthroughVideoRef.current.pause();
                        walkthroughVideoRef.current.currentTime = 0;
                      }
                      setConsoleVideoPlaying(false);
                    }}
                  >
                    {!consoleVideoPlaying ? (
                      // Walkthrough Video Cover Image / State
                      <div
                        onMouseEnter={() => setConsoleVideoPlaying(true)}
                        className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center cursor-pointer group"
                      >
                        {/* Backdrop city art simulation */}
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-zinc-900/60 z-0" />
                        <div className="absolute inset-0 z-0 opacity-10 bg-cover bg-center" style={{ backgroundImage: "url('/logo.webp')" }} />
                        
                        {/* Grid elements simulating Jakarta traffic map in background */}
                        <div className="absolute inset-0 z-0 opacity-[0.05]" style={{ backgroundImage: "radial-gradient(circle, #2d9f6c 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
                        
                        {/* Custom big glowing play button */}
                        <div className="relative z-10 w-20 h-20 rounded-full bg-[#df8820] text-white flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:bg-[#2d9f6c] transition-all duration-300 animate-pulse">
                          <PlayCircle className="w-12 h-12 stroke-[1.5]" />
                        </div>
                        
                        <div className="relative z-10 space-y-1.5 mt-5">
                          <p className="text-white font-extrabold text-sm md:text-base tracking-tight leading-none group-hover:text-[#fff4e6] transition-colors">
                            Putar Demo Walkthrough SIGAP
                          </p>
                          <p className="text-zinc-400 text-[10px] md:text-xs font-semibold">
                            Durasi: 1:12 • Kualitas Ultra-HD • Sound Terintegrasi
                          </p>
                        </div>

                        {/* Left bottom simulated badge */}
                        <div className="absolute bottom-4 left-4 bg-zinc-900/80 border border-zinc-800 backdrop-blur-md px-3 py-1.5 rounded-lg flex items-center gap-1.5 z-10">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#2d9f6c] animate-pulse" />
                          <span className="text-[9px] text-zinc-300 font-extrabold uppercase tracking-wide">Command Center DLH</span>
                        </div>
                      </div>
                    ) : (
                      // Active video / simulation screen
                      <div className="absolute inset-0 flex flex-col justify-between p-4 z-10 text-white select-none">
                        {/* Local Walkthrough Video Player */}
                        <video
                          ref={walkthroughVideoRef}
                          src="/videos/walkthrough.mp4"
                          title="SIGAP DKI Jakarta Walkthrough Video"
                          className="absolute inset-0 w-full h-full z-0 rounded-2xl object-cover"
                          controls
                          muted
                          playsInline
                          preload="metadata"
                          onMouseEnter={() => {
                            walkthroughVideoRef.current?.play();
                          }}
                          onMouseLeave={() => {
                            if (walkthroughVideoRef.current) {
                              walkthroughVideoRef.current.pause();
                              walkthroughVideoRef.current.currentTime = 0;
                            }
                            setConsoleVideoPlaying(false);
                          }}
                        />
                        
                        {/* Custom Player Controls overlay for high-fidelity feel */}
                        <div className="absolute bottom-3 right-3 bg-zinc-950/80 border border-zinc-800 backdrop-blur-md px-3 py-1 rounded-md flex items-center gap-2 z-10">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              if (walkthroughVideoRef.current) {
                                walkthroughVideoRef.current.pause();
                                walkthroughVideoRef.current.currentTime = 0;
                              }
                              setConsoleVideoPlaying(false);
                            }}
                            className="text-[9px] text-zinc-300 hover:text-white font-extrabold uppercase tracking-wide cursor-pointer flex items-center gap-1"
                          >
                            <span>🔄 Ulangi Panduan</span>
                          </button>
                        </div>
                      </div>
                    )}
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

                {/* DYNAMIC CONTENT FOR VIDEO WALKTHROUGH */}
                {activeDemoTab === "walkthrough" && (
                  <div className="space-y-6 animate-fade-in">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#fff4e6] text-[#df8820] text-[10px] font-extrabold rounded-full uppercase tracking-wider">
                       Video Walkthrough
                    </div>
                    <h3 className="font-headline text-3xl sm:text-[34px] font-extrabold tracking-tight text-zinc-900 leading-tight">
                      Panduan ekosistem cerdas <span className="text-[#df8820]">SIGAP</span>
                    </h3>
                    <p className="text-zinc-500 leading-relaxed text-[14px]">
                      Tonton bagaimana platform terintegrasi kami memantau pergerakan truk sampah, mengoptimalkan rute armada menggunakan kecerdasan buatan, dan mempertemukan aksi supir dengan dispatcher DLH secara real-time.
                    </p>
                    <div className="space-y-3.5 border-l-2 border-zinc-200 pl-4 py-1">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-[#df8820] shrink-0 mt-0.5" />
                        <p className="text-[13px] text-zinc-600 font-semibold">Gambaran umum visualisasi dashboard & pemetaan GPS</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-[#df8820] shrink-0 mt-0.5" />
                        <p className="text-[13px] text-zinc-600 font-semibold">Demo alur kerja supir & deteksi jembatan timbang otomatis</p>
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
            <div className={`lg:col-span-5 flex flex-col items-center gap-8 ${revealClass(mobileAppReveal.visible, "right")}`}>
              
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

              {/* Premium App Status Badge for Competition */}
              <div className="flex items-center gap-2.5 px-5 py-3 bg-[#ebf7f2] border border-[#2d9f6c]/20 text-[#2d9f6c] rounded-2xl shadow-xs mt-4">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2d9f6c] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2d9f6c]" />
                </span>
                <span className="text-[10px] font-extrabold tracking-wider uppercase">Aplikasi Aktif • Penggunaan Internal DLH DKI</span>
              </div>

            </div>

            {/* Right Column: Explanations and App Features (Span 7) */}
            <div className={`lg:col-span-7 space-y-7 text-left ${revealClass(mobileAppReveal.visible, "left", 200)}`}>
              
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
                <button className="flex items-center gap-2.5 px-8 py-4 bg-[#2d9f6c] text-white font-bold rounded-2xl hover:bg-[#24855a] transition-all duration-300 text-[13px] shadow-lg shadow-[#2d9f6c]/20 cursor-pointer">
                  Unduh Panduan Supir (PDF) <CheckCircle2 className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => {
                    setActiveDemoTab("walkthrough");
                    setConsoleVideoPlaying(false);
                    const el = document.getElementById("tech");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="flex items-center gap-2.5 px-8 py-4 bg-white text-zinc-700 font-bold rounded-2xl border border-zinc-200 hover:border-zinc-350 hover:bg-zinc-50 transition-colors text-[13px] shadow-sm cursor-pointer"
                >
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
            <div className={`text-center mb-20 max-w-2xl mx-auto ${revealClass(impactReveal.visible, "up")}`}>
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
                  <div key={i} className={`${col.cardBg} border ${col.border} rounded-3xl p-8 hover:-translate-y-1 hover:shadow-xl transition-all duration-500 ${revealClass(impactReveal.visible, i === 0 ? "right" : i === 2 ? "left" : "up", i * 150 + 200)}`}>
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
            COMPETITIVE ADVANTAGES — Comparison + Morphing Deck
        ══════════════════════════════════════════════════════════════ */}
        <section id="advantages" ref={advantagesReveal.ref} className="py-28 px-6 md:px-12 bg-white">
          <div className="max-w-7xl mx-auto">
            {/* ─── Header ─── */}
            <div className="text-center mb-20 max-w-3xl mx-auto flex flex-col items-center">
              <h2 
                className={`${revealClass(advantagesReveal.visible, "up")} font-headline text-[2.5rem] sm:text-5xl lg:text-6xl font-extrabold tracking-[-0.03em] text-zinc-900 leading-[1.1] mb-6`}
                style={revealStyle(150)}
              >
                Mengapa <span className="text-gradient-green">memilih</span>
                <br />
                <span className="text-gradient-orange">SIGAP?</span>
              </h2>
              <p 
                className={`${revealClass(advantagesReveal.visible, "up")} text-zinc-500 text-lg leading-relaxed max-w-2xl mx-auto`}
                style={revealStyle(300)}
              >
                Tiga keunggulan utama yang mendisrupsi sistem manajemen kebersihan konvensional secara menyeluruh di DKI Jakarta.
              </p>
            </div>

            {/* ─── 2-Column Split Feature Deck ─── */}
            <div className="grid lg:grid-cols-12 gap-10 items-stretch mt-12">
              
              {/* Left Column: Navigation Cards (Span 5) */}
              <div className="lg:col-span-5 flex flex-col gap-4 justify-center">
                {[
                  {
                    id: 0,
                    icon: Brain,
                    title: "AI Route Optimizer",
                    desc: "Algoritma machine learning bypass kemacetan otomatis.",
                    tag: "Efisiensi +35%",
                    color: "border-[#df8820]/30 text-[#df8820] bg-[#fff4e6]",
                    baseColor: "text-[#df8820]",
                    activeCls: "border-[#df8820] bg-zinc-50/50 shadow-lg shadow-[#df8820]/5",
                    delay: 350,
                  },
                  {
                    id: 1,
                    icon: MapPin,
                    title: "Monitoring Real-time 24/7",
                    desc: "Pantau posisi armada di peta dengan update tiap 4 detik.",
                    tag: "Akurasi Sub-Meter",
                    color: "border-[#2d9f6c]/30 text-[#2d9f6c] bg-[#ebf7f2]",
                    baseColor: "text-[#2d9f6c]",
                    activeCls: "border-[#2d9f6c] bg-zinc-50/50 shadow-lg shadow-[#2d9f6c]/5",
                    delay: 500,
                  },
                  {
                    id: 2,
                    icon: AlertTriangle,
                    title: "Deteksi Pelanggaran Proaktif",
                    desc: "AI deteksi otomatis deviasi rute dan batas kecepatan.",
                    tag: "Proteksi SOS",
                    color: "border-red-200 text-red-600 bg-red-50",
                    baseColor: "text-red-600",
                    activeCls: "border-red-500 bg-zinc-50/50 shadow-lg shadow-red-500/5",
                    delay: 650,
                  },
                ].map((item) => {
                  const IconComp = item.icon;
                  const isActive = activeAdvantageSlide === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveAdvantageSlide(item.id)}
                      className={`${revealClass(advantagesReveal.visible, "up")} w-full text-left p-6 rounded-3xl border transition-all duration-300 flex items-start gap-4 cursor-pointer relative overflow-hidden group ${
                        isActive ? item.activeCls : "border-zinc-100 bg-white hover:border-zinc-300 hover:shadow-md"
                      }`}
                      style={revealStyle(item.delay)}
                    >
                      <div className={`p-3 rounded-2xl shrink-0 ${item.color}`}>
                        <IconComp className="w-6 h-6" />
                      </div>
                      <div className="flex-1 min-w-0 pr-4">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-headline font-extrabold text-[16px] text-zinc-950 block leading-tight">{item.title}</span>
                          <span className={`text-[8px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${item.color} border border-current/10`}>
                            {item.tag}
                          </span>
                        </div>
                        <p className="text-[12px] text-zinc-500 font-semibold mt-2.5 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                      <ChevronRight className={`w-5 h-5 absolute right-4 top-1/2 -translate-y-1/2 transition-transform duration-300 ${
                        isActive ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-50"
                      } ${item.baseColor}`} />
                    </button>
                  );
                })}
              </div>

              {/* Right Column: Visual Showcase Card Canvas (Span 7) */}
              <div 
                className={`${revealClass(advantagesReveal.visible, "scale")} lg:col-span-7 bg-zinc-50/50 border border-zinc-100 rounded-[2.5rem] p-6 flex flex-col justify-between shadow-inner min-h-[420px] relative overflow-hidden`}
                style={revealStyle(600)}
              >
                
                {/* ─── SLIDE 0: AI ROUTE DETAILED UI ─── */}
                {activeAdvantageSlide === 0 && (
                  <div className="flex-1 flex flex-col justify-between animate-fade-in z-10 w-full h-full">
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-zinc-200/50 pb-4 mb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#df8820] animate-pulse" />
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-zinc-400 font-mono">AI Router Simulator</span>
                      </div>
                      <span className="text-[9px] font-extrabold text-[#df8820] bg-[#fff4e6] px-3 py-1 rounded-full border border-[#df8820]/15">
                        Rute Optimal AI Aktif
                      </span>
                    </div>

                    {/* Graphic Map Showcase */}
                    <div className="flex-1 bg-white rounded-2xl border border-zinc-200/60 p-4 shadow-sm flex flex-col justify-between relative overflow-hidden min-h-[220px]">
                      {/* Grid background */}
                      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, #df8820 1px, transparent 1px)", backgroundSize: "16px 16px" }} />
                      
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-wider leading-none">ARMADA DITARGETKAN</p>
                          <p className="text-[15px] font-headline font-extrabold text-zinc-950 mt-1 font-mono">B-1234-DLH</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-wider leading-none">AI ACCURACY</p>
                          <p className="text-[15px] font-headline font-extrabold text-[#2d9f6c] mt-1 font-mono">98.4% Match</p>
                        </div>
                      </div>

                      {/* Stylized Visual Route Comparison */}
                      <div className="py-4 space-y-3 relative z-10 flex-1 flex flex-col justify-center text-left">
                        {/* Congested Route Bar */}
                        <div className="flex items-center gap-3">
                          <span className="text-[10px] font-bold text-zinc-400 w-16 shrink-0 text-right">Rute Normal</span>
                          <div className="flex-1 h-3 bg-red-50 rounded-full border border-red-200/30 overflow-hidden relative">
                            <div className="h-full bg-red-400 rounded-full" style={{ width: "100%" }} />
                            <span className="absolute inset-0 flex items-center justify-end pr-3 text-[8px] font-bold text-red-700 leading-none">Jl. Sudirman (Macet Parah) • 28.9 km</span>
                          </div>
                        </div>
                        {/* Optimized AI Route Bar */}
                        <div className="flex items-center gap-3">
                          <span className="text-[10px] font-bold text-[#df8820] w-16 shrink-0 text-right">AI Rute Cerdas</span>
                          <div className="flex-1 h-6 bg-[#ebf7f2] rounded-full border border-[#2d9f6c]/20 overflow-hidden relative">
                            <div className="h-full bg-gradient-to-r from-[#2d9f6c] to-[#4ade80] rounded-full" style={{ width: "77%" }} />
                            <span className="absolute inset-0 flex items-center justify-between px-3 text-[9px] font-extrabold text-[#2d9f6c] uppercase tracking-wider leading-none">
                              <span>Optimal AI</span>
                              <span>Bypass Tol Slipi • 22.5 km</span>
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Small Bottom Stats Row */}
                      <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-bold border-t border-zinc-100 pt-3">
                        <div className="bg-zinc-50 rounded-lg p-2 border border-zinc-100">
                          <span className="text-[8px] text-zinc-400 uppercase tracking-wider block">WAKTU EKONOMIS</span>
                          <span className="text-zinc-800 text-[11px] font-extrabold">-30% Durasi</span>
                        </div>
                        <div className="bg-zinc-50 rounded-lg p-2 border border-zinc-100">
                          <span className="text-[8px] text-zinc-400 uppercase tracking-wider block">BBM TEREFISIEN</span>
                          <span className="text-[#2d9f6c] text-[11px] font-extrabold">+28.5% Hemat</span>
                        </div>
                        <div className="bg-zinc-50 rounded-lg p-2 border border-zinc-100">
                          <span className="text-[8px] text-zinc-400 uppercase tracking-wider block">JARAK TEMPUH</span>
                          <span className="text-zinc-800 text-[11px] font-extrabold">-6.4 km</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* ─── SLIDE 1: GPS TRACKING REAL-TIME UI ─── */}
                {activeAdvantageSlide === 1 && (
                  <div className="flex-1 flex flex-col justify-between animate-fade-in z-10 w-full h-full">
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-zinc-200/50 pb-4 mb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#2d9f6c] animate-pulse" />
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-zinc-400 font-mono">Live GPS Telemetry</span>
                      </div>
                      <span className="text-[9px] font-extrabold text-[#2d9f6c] bg-[#ebf7f2] px-3 py-1 rounded-full border border-[#2d9f6c]/15 flex items-center gap-1">
                        <span className="w-1 h-1 bg-[#2d9f6c] rounded-full animate-ping" />
                        Update 4 Detik
                      </span>
                    </div>

                    {/* Satellite Active Fleet List */}
                    <div className="flex-1 bg-white rounded-2xl border border-zinc-200/60 p-4 shadow-sm flex flex-col justify-between min-h-[220px]">
                      <div className="space-y-3 flex-1 flex flex-col justify-center">
                        {[
                          { plat: "B-5566-DLH", name: "Eko Purjianto", zone: "Zone C → Bantar Gebang", speed: "45 km/h", status: "ON ROUTE", clr: "text-[#2d9f6c] bg-[#ebf7f2]" },
                          { plat: "B-1234-DLH", name: "Bambang Pamungkas", zone: "Zone A → Bantar Gebang", speed: "48 km/h", status: "ON ROUTE", clr: "text-[#2d9f6c] bg-[#ebf7f2]" },
                          { plat: "B-9988-DLH", name: "Budi Sudarsono", zone: "Zone B → TPS Menteng", speed: "0 km/h (Idle)", status: "IDLE", clr: "text-[#df8820] bg-[#fff4e6]" },
                        ].map((row, i) => (
                          <div key={i} className="flex items-center justify-between p-3 bg-zinc-50 rounded-xl border border-zinc-100 hover:border-zinc-200 hover:shadow-sm transition-all text-left">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center text-white shrink-0 font-extrabold text-[9px] font-mono">
                                TRK
                              </div>
                              <div>
                                <span className="text-[11px] font-extrabold text-zinc-950 font-mono block leading-none">{row.plat}</span>
                                <span className="text-[9px] text-zinc-400 font-bold block mt-1 leading-none">{row.name} • {row.zone}</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <span className="text-[11px] font-extrabold text-zinc-700 font-mono block leading-none">{row.speed}</span>
                              <span className={`text-[8px] font-extrabold px-2 py-0.5 rounded-full mt-1.5 inline-block uppercase tracking-wider ${row.clr} border border-current/10`}>
                                {row.status}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Small Bottom Stats Row */}
                      <div className="grid grid-cols-2 gap-2 text-center text-[10px] font-bold border-t border-zinc-100 pt-3">
                        <div className="bg-zinc-50 rounded-lg p-2 border border-zinc-100">
                          <span className="text-[8px] text-zinc-400 uppercase tracking-wider block">LATENSI TRANSMISI</span>
                          <span className="text-[#2d9f6c] text-[11px] font-extrabold">0.3s Delay (Sangat Baik)</span>
                        </div>
                        <div className="bg-zinc-50 rounded-lg p-2 border border-zinc-100">
                          <span className="text-[8px] text-zinc-400 uppercase tracking-wider block">SATELIT TERKONEKSI</span>
                          <span className="text-zinc-800 text-[11px] font-extrabold">24 Satelit GPS Aktif</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* ─── SLIDE 2: PROACTIVE ALERT WARNING UI ─── */}
                {activeAdvantageSlide === 2 && (
                  <div className="flex-1 flex flex-col justify-between animate-fade-in z-10 w-full h-full">
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-zinc-200/50 pb-4 mb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-zinc-400 font-mono">Proactive Alert Center</span>
                      </div>
                      <span className="text-[9px] font-extrabold text-red-600 bg-red-50 px-3 py-1 rounded-full border border-red-200/40">
                        1 Bahaya Terdeteksi
                      </span>
                    </div>

                    {/* Massive Warning Card */}
                    <div className="flex-1 bg-white rounded-2xl border border-red-200/50 p-5 shadow-lg shadow-red-500/5 flex flex-col justify-between min-h-[220px] relative overflow-hidden text-left">
                      {/* Pulse shadow overlay */}
                      <div className="absolute inset-0 bg-red-500/[0.01] animate-pulse pointer-events-none" />

                      <div className="flex gap-4">
                        <div className="w-12 h-12 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center shrink-0 text-red-600 animate-pulse">
                          <AlertTriangle className="w-6 h-6 text-red-600" />
                        </div>
                        <div className="flex-1">
                          <span className="text-[9px] text-red-500 font-extrabold uppercase tracking-wider bg-red-50 border border-red-200 px-2 py-0.5 rounded-full">KECEPATAN BERLEBIH</span>
                          <p className="text-[15px] font-headline font-extrabold text-zinc-950 mt-1.5">Batas Kecepatan Maksimum Dilanggar!</p>
                          <p className="text-[12px] text-zinc-500 font-semibold mt-1 leading-relaxed">
                            Armada <strong className="text-zinc-700 font-extrabold">B-7722-DLH</strong> (Pengemudi: Gendut Doni) terdeteksi melaju di kecepatan <span className="text-red-600 font-extrabold font-mono">85 km/jam</span> pada zona Tol Slipi (Batas Maks: 60 km/jam).
                          </p>
                        </div>
                      </div>

                      {/* Action Box */}
                      <div className="mt-4 flex gap-2 border-t border-zinc-100 pt-4">
                        <button 
                          onClick={() => alert("Simulasi: Peringatan tegas terkirim via Driver App & WhatsApp!")}
                          className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white font-extrabold text-[11px] rounded-xl transition-all uppercase tracking-wider cursor-pointer shadow-md shadow-red-600/25 active:scale-95"
                        >
                          Kirim Peringatan
                        </button>
                        <button 
                          onClick={() => alert("Menghubungi nomor telepon terdaftar Gendut Doni (+62-812-3456-7890)...")}
                          className="px-4 py-2.5 bg-zinc-50 hover:bg-zinc-100 text-zinc-700 border border-zinc-200 rounded-xl text-[11px] font-extrabold transition-all cursor-pointer active:scale-95 flex items-center gap-1.5"
                        >
                          <Phone className="w-3.5 h-3.5" /> Call Driver
                        </button>
                      </div>
                    </div>
                  </div>
                )}

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
                <Image src="/logo.webp" alt="SIGAP Logo" width={40} height={40} className="rounded-2xl shadow-lg shadow-[#2d9f6c]/15" loading="eager" />
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
