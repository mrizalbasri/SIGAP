"use client";

import React from "react";
import Link from "next/link";
import { 
  PlayCircle, 
  Map, 
  Smartphone, 
  Cpu, 
  BarChart, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  FileText,
  Mail,
  Phone,
  Globe
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="bg-zinc-50 font-sans text-zinc-900 selection:bg-[#fff4e6] selection:text-[#df8820] min-h-screen flex flex-col">
      {/* TopNavBar */}
      <nav className="bg-white/90 backdrop-blur-lg fixed top-0 w-full z-50 border-b border-zinc-100 transition-all duration-300">
        <div className="flex justify-between items-center h-20 px-6 md:px-12 max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-2">
            <span className="font-headline text-2xl font-black text-[#df8820] tracking-tight">
              SIGAP
            </span>
            <span className="hidden sm:inline-block h-4 w-[1px] bg-zinc-200"></span>
            <span className="hidden sm:inline-block text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
              DKI Jakarta
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a className="text-zinc-800 font-medium hover:text-[#df8820] transition-colors duration-200 text-sm" href="#features">Fitur</a>
            <a className="text-zinc-500 font-medium hover:text-[#df8820] transition-colors duration-200 text-sm" href="#tech">Teknologi</a>
            <a className="text-zinc-500 font-medium hover:text-[#df8820] transition-colors duration-200 text-sm" href="#impact">Dampak</a>
          </div>

          <div className="flex items-center gap-4">
            <Link 
              href="/dashboard"
              className="px-5 py-2.5 text-zinc-600 font-semibold hover:text-[#df8820] transition-all duration-200 rounded-full hover:bg-zinc-50 text-sm"
            >
              Sign In
            </Link>
            <Link 
              href="/dashboard"
              className="px-6 py-2.5 bg-zinc-950 text-white font-semibold rounded-full shadow-sm hover:bg-[#df8820] transition-all duration-300 text-sm"
            >
              Dashboard Live Map
            </Link>
          </div>
        </div>
      </nav>

      <main className="pt-20 flex-1">
        {/* Hero Section */}
        <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-zinc-950 text-white">
          <div className="absolute inset-0 z-0">
            <img 
              alt="Jakarta Smart Fleet Map" 
              className="w-full h-full object-cover opacity-35 mix-blend-luminosity" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCZe8B4ct_HI3cSsc22aRKqhv4MjeG9aZt5v3QkQD5DjH_-nRkXYCnIzsNek1gs8btHiapvmm7tLxUrhG0CaJvMK_SK4aGinGJwcb7C9DM7Gnrrf_e5V0PA3Ah_xBQ0_XByCw8tMjmY3mNYWIQKpOvtvpl5v1niXsHnCJb006x0Pz7813XmJmUhQSDrMac_XU5rdv6FzCJs8dRKQW9OH6d2otTdgY7yP8yaodrwLp0l6jHFL74gJAHefJjGS0OfAHcBeIsCRXX9_cE"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/90 via-zinc-950/50 to-transparent"></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full grid lg:grid-cols-2 gap-12 items-center py-16">
            <div className="text-left space-y-6 max-w-xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white">
                <span className="w-2 h-2 rounded-full bg-[#27ab7d] animate-pulse"></span>
                <span className="text-[10px] font-bold tracking-wider uppercase">Smart Fleet Jakarta</span>
              </div>
              <h1 className="font-headline text-4xl sm:text-5xl lg:text-6xl font-black leading-tight text-white">
                Revolusi <span className="text-[#df8820]">Manajemen Armada</span> Ibu Kota
              </h1>
              <p className="text-base sm:text-lg text-zinc-300 leading-relaxed max-w-lg">
                Monitor, integrasi, dan optimalisasi pergerakan armada kebersihan Jakarta secara real-time dengan teknologi AI dan IoT terkini.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Link 
                  href="/dashboard"
                  className="px-8 py-4 bg-[#df8820] text-white font-semibold rounded-full shadow-[0_8px_30px_rgba(245,152,39,0.3)] hover:bg-[#c67315] transition-all duration-300 text-sm flex items-center gap-1.5"
                >
                  Eksplorasi Dashboard <ArrowRight className="w-4 h-4" />
                </Link>
                <button className="px-8 py-4 bg-transparent text-white font-semibold rounded-full border border-white/30 hover:bg-white/10 transition-all duration-300 text-sm flex items-center gap-2">
                  <PlayCircle className="w-5 h-5 text-[#df8820]" /> Video Demo
                </button>
              </div>
            </div>

            {/* Hero Decorative Glass Card */}
            <div className="hidden lg:block relative h-[450px]">
              <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-xl border border-white/10 p-6 rounded-3xl w-80 shadow-2xl animate-[bounce_6s_infinite] transition-transform">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-[#27ab7d]/20 rounded-lg text-[#27ab7d]">
                    <Map className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Live Tracking</p>
                    <p className="text-lg font-bold text-white font-headline">Optimasi Rute</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs mb-1 text-zinc-300">
                      <span>Ketepatan Rute</span>
                      <span className="text-[#27ab7d] font-bold">98%</span>
                    </div>
                    <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
                      <div className="h-full bg-[#27ab7d] rounded-full" style={{ width: "98%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1 text-zinc-300">
                      <span>Efisiensi Waktu</span>
                      <span className="text-[#df8820] font-bold">+40%</span>
                    </div>
                    <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
                      <div className="h-full bg-[#df8820] rounded-full" style={{ width: "75%" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Integrated Real-time Stats Bar */}
        <section className="bg-zinc-50 relative z-20 -mt-10 max-w-5xl mx-auto px-6 rounded-3xl shadow-xl w-full">
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 border border-zinc-150 flex flex-col md:flex-row justify-between items-center gap-8 md:divide-x md:divide-zinc-200">
            <div className="flex-1 text-center w-full py-2">
              <p className="font-headline text-3xl sm:text-4xl font-extrabold text-zinc-900 mb-1">577+</p>
              <p className="text-sm font-semibold text-zinc-500 uppercase tracking-wider">Armada Aktif</p>
            </div>
            <div className="flex-1 text-center w-full py-2">
              <p className="font-headline text-3xl sm:text-4xl font-extrabold text-[#27ab7d] mb-1">12.4k</p>
              <p className="text-sm font-semibold text-zinc-500 uppercase tracking-wider">Ton Sampah / Hari</p>
            </div>
            <div className="flex-1 text-center w-full py-2">
              <p className="font-headline text-3xl sm:text-4xl font-extrabold text-[#df8820] mb-1">98%</p>
              <p className="text-sm font-semibold text-zinc-500 uppercase tracking-wider">Ketepatan Rute</p>
            </div>
          </div>
        </section>

        {/* Feature Showcase (Z-Pattern) */}
        <section id="features" className="py-28 px-6 md:px-12 bg-white relative">
          <div className="max-w-7xl mx-auto space-y-32 relative z-10">
            {/* Showcase 1: Command Center */}
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1 relative rounded-[2rem] overflow-hidden aspect-[4/3] shadow-2xl group border border-zinc-200">
                <img 
                  alt="Command Center Dashboard" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAVAFr7Q4DHsSAcduf-Io5_z9P3VKcxPhc5PlL3cBps4tSrkjGrQNwFx4eculUo0zgIxBD4UU3qtCEO2lEMG3SGh-74RBzsjNSX6InaIZgbrB8wU_TsYxQwDset_b8bLeggyyOSd-Pb5__9ODBxYXG0BCJer9wRpe2ULppDiFNnVTMl216ZGpnh8lZe3qE5k1MDhETCGaUtDXNWdrqb_ZmvArKvSMPLn7iv2vWS-3IJjsgtBdJdamIFBVrU4f8yPrYbZNx_PY-Ur4A"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/40 to-transparent"></div>
              </div>
              <div className="order-1 lg:order-2 space-y-6">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#fff4e6] text-[#df8820] mb-2">
                  <BarChart className="w-7 h-7 stroke-[2]" />
                </div>
                <h2 className="font-headline text-3xl sm:text-4xl text-zinc-900 font-extrabold tracking-tight">
                  Centralized Command Center
                </h2>
                <p className="text-zinc-600 leading-relaxed">
                  Pusat kendali visual yang memantau setiap pergerakan armada, status kesehatan mesin, hingga tingkat okupansi sampah di TPS secara real-time. Dari sistem konvensional menuju ekosistem digital yang cerdas dan transparan.
                </p>
                <ul className="space-y-4 pt-4">
                  <li className="flex items-start gap-3">
                    <div className="mt-1 p-1 rounded-full bg-[#e8f8f3] text-[#27ab7d]">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-semibold text-zinc-700">Monitoring GPS real-time untuk seluruh armada aktif</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 p-1 rounded-full bg-[#e8f8f3] text-[#27ab7d]">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-semibold text-zinc-700">Dashboard analitik performa terpusat</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Showcase 2: Driver App & IoT */}
            <div id="tech" className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#e8f8f3] text-[#27ab7d] mb-2">
                  <Smartphone className="w-7 h-7 stroke-[2]" />
                </div>
                <h2 className="font-headline text-3xl sm:text-4xl text-zinc-900 font-extrabold tracking-tight">
                  Driver App &amp; Integrasi IoT
                </h2>
                <p className="text-zinc-600 leading-relaxed">
                  Panduan rute dinamis, pelaporan insiden instan, dan absensi digital untuk pengemudi, didukung oleh integrasi langsung dengan sensor bahan bakar dan GPS tracker untuk prediksi kebutuhan armada berbasis volume historis.
                </p>
                <div className="grid grid-cols-2 gap-6 pt-6">
                  <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-150">
                    <Cpu className="w-6 h-6 text-[#df8820] mb-3" />
                    <h4 className="font-headline text-sm font-bold mb-1 text-zinc-800">IoT Sensor</h4>
                    <p className="text-xs text-zinc-500">Integrasi langsung dengan sensor bahan bakar dan GPS.</p>
                  </div>
                  <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-150">
                    <BarChart className="w-6 h-6 text-[#27ab7d] mb-3" />
                    <h4 className="font-headline text-sm font-bold mb-1 text-zinc-800">Analytics</h4>
                    <p className="text-xs text-zinc-500">Prediksi rute dan kebutuhan BBM historis.</p>
                  </div>
                </div>
              </div>
              <div className="relative rounded-[2rem] overflow-hidden aspect-[4/3] shadow-2xl bg-zinc-100 group flex items-center justify-center border border-zinc-200">
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-100 to-zinc-200"></div>
                <div className="relative z-10 w-64 h-96 bg-zinc-900 rounded-[2rem] p-4 shadow-xl transform rotate-[-4deg] transition-transform duration-500 group-hover:rotate-0">
                  <div className="bg-white rounded-xl p-4 h-full border border-zinc-800 text-zinc-800">
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-8 h-8 rounded-full bg-zinc-200"></div>
                      <div className="w-16 h-3 rounded-full bg-zinc-200"></div>
                    </div>
                    <div className="space-y-4">
                      <div className="h-20 rounded-lg bg-zinc-100 flex items-center justify-center text-zinc-400 text-xs font-bold font-sans">
                        Peta Driver
                      </div>
                      <div className="h-10 rounded-lg bg-[#e8f8f3] border border-[#27ab7d]/20 text-[#27ab7d] text-[10px] font-bold flex items-center justify-center font-sans">
                        RUTAS TEROPTIMAL ✅
                      </div>
                      <div className="h-10 rounded-lg bg-zinc-100"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Impact Section */}
        <section id="impact" className="py-24 px-6 md:px-12 bg-zinc-50 border-t border-b border-zinc-100">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 max-w-2xl mx-auto">
              <h2 className="font-headline text-3xl sm:text-4xl text-zinc-900 font-extrabold tracking-tight mb-4">
                Transformasi Efisiensi Lapangan
              </h2>
              <p className="text-zinc-500 font-sans">
                Bagaimana SIGAP merubah operasional konvensional menjadi cerdas dan terintegrasi.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 relative">
              <div className="relative z-10 flex flex-col items-center text-center group">
                <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-md border-4 border-zinc-50 mb-6 transition-transform group-hover:scale-105">
                  <FileText className="w-8 h-8 text-zinc-500" />
                </div>
                <div className="bg-white p-6 rounded-2xl w-full border border-zinc-150 shadow-sm">
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2 block">Sebelum</span>
                  <h3 className="font-headline text-lg font-bold text-zinc-800 mb-3">Sistem Konvensional</h3>
                  <ul className="text-xs text-zinc-500 space-y-2 text-left">
                    <li>• Pelaporan manual yang lambat</li>
                    <li>• Rute armada tidak terpantau</li>
                    <li>• Konsumsi BBM tidak efisien</li>
                  </ul>
                </div>
              </div>

              <div className="relative z-10 flex flex-col items-center text-center group mt-8 md:mt-0">
                <div className="w-20 h-20 rounded-full bg-[#fff4e6] flex items-center justify-center shadow-md border-4 border-zinc-50 mb-6 transition-transform group-hover:scale-105">
                  <Cpu className="w-8 h-8 text-[#df8820]" />
                </div>
                <div className="bg-[#fff4e6]/30 border border-[#df8820]/20 p-6 rounded-2xl w-full shadow-sm">
                  <span className="text-[10px] font-bold text-[#df8820] uppercase tracking-widest mb-2 block">Proses</span>
                  <h3 className="font-headline text-lg font-bold text-[#df8820] mb-3">Integrasi SIGAP</h3>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    Pengumpulan data real-time via IoT, analisis AI untuk optimasi rute, dan distribusi tugas via aplikasi pengemudi.
                  </p>
                </div>
              </div>

              <div className="relative z-10 flex flex-col items-center text-center group mt-8 md:mt-0">
                <div className="w-20 h-20 rounded-full bg-[#e8f8f3] flex items-center justify-center shadow-md border-4 border-zinc-50 mb-6 transition-transform group-hover:scale-105">
                  <ShieldCheck className="w-8 h-8 text-[#27ab7d]" />
                </div>
                <div className="bg-[#e8f8f3]/30 border border-[#27ab7d]/20 p-6 rounded-2xl w-full shadow-sm">
                  <span className="text-[10px] font-bold text-[#27ab7d] uppercase tracking-widest mb-2 block">Hasil</span>
                  <h3 className="font-headline text-lg font-bold text-[#27ab7d] mb-3">Solusi Cerdas</h3>
                  <ul className="text-xs text-zinc-600 space-y-2 text-left">
                    <li>• Monitoring GPS real-time</li>
                    <li>• Optimasi rute otomatis via AI</li>
                    <li>• Peningkatan efisiensi 40%</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Success Quote & CTA */}
        <section className="py-24 px-6 md:px-12 bg-zinc-950 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#df8820] rounded-full mix-blend-multiply filter blur-3xl opacity-15 transform translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#27ab7d] rounded-full mix-blend-multiply filter blur-3xl opacity-15 transform -translate-x-1/2 translate-y-1/2"></div>
          
          <div className="max-w-4xl mx-auto relative z-10 text-center space-y-10">
            <h2 className="font-headline text-2xl sm:text-4xl text-white font-extrabold leading-snug">
              "Efisiensi Meningkat 40%. Data berdasarkan implementasi fase pertama pada armada pengangkut sampah Jakarta."
            </h2>
            <div className="w-20 h-[2px] bg-white/20 mx-auto"></div>
            <div className="space-y-4">
              <h3 className="font-headline text-xl sm:text-2xl text-white font-bold">Siap Mengoptimalkan Operasional Anda?</h3>
              <p className="text-sm text-zinc-400 max-w-xl mx-auto leading-relaxed">
                Bergabunglah dengan ratusan pengelola armada yang telah meningkatkan efisiensi dan transparansi bersama SIGAP.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-6 pt-4">
              <Link 
                href="/dashboard"
                className="px-10 py-4 bg-[#df8820] text-white font-semibold rounded-full shadow-lg hover:bg-[#c67315] transition-transform hover:-translate-y-0.5 text-sm"
              >
                Masuk ke Dashboard
              </Link>
              <button className="px-10 py-4 bg-transparent text-white font-semibold rounded-full border border-white/30 hover:bg-white/10 transition-transform hover:-translate-y-0.5 text-sm">
                Jadwalkan Konsultasi
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white w-full py-16 border-t border-zinc-150">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 px-6 md:px-12 max-w-7xl mx-auto w-full">
          <div>
            <span className="font-headline text-xl font-black text-[#df8820] mb-4 block tracking-tight">SIGAP</span>
            <p className="text-zinc-500 text-xs leading-relaxed">
              Sistem Integrasi Gerak Armada Pintar - Menuju Jakarta yang lebih bersih dan cerdas melalui teknologi.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-zinc-800 mb-6 text-xs uppercase tracking-wider">Navigasi</h4>
            <ul className="space-y-4">
              <li><a className="text-zinc-500 hover:text-[#df8820] text-xs font-semibold" href="#">Features</a></li>
              <li><a className="text-zinc-500 hover:text-[#df8820] text-xs font-semibold" href="#">Technology</a></li>
              <li><Link className="text-zinc-500 hover:text-[#df8820] text-xs font-semibold" href="/dashboard">Dashboard</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-zinc-800 mb-6 text-xs uppercase tracking-wider">Legal</h4>
            <ul className="space-y-4">
              <li><a className="text-zinc-500 hover:text-[#df8820] text-xs font-semibold" href="#">Privacy Policy</a></li>
              <li><a className="text-zinc-500 hover:text-[#df8820] text-xs font-semibold" href="#">Terms of Service</a></li>
              <li><a className="text-zinc-500 hover:text-[#df8820] text-xs font-semibold" href="https://lingkunganhidup.jakarta.go.id/">Website DLH</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-zinc-800 mb-6 text-xs uppercase tracking-wider">Kontak</h4>
            <p className="text-zinc-500 text-xs leading-relaxed mb-6">
              Dinas Lingkungan Hidup DKI Jakarta<br/>Jl. Mandala V, Cililitan, Jakarta Timur
            </p>
            <div className="flex gap-4">
              <a className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-600 hover:bg-[#df8820] hover:text-white transition-colors" href="#"><Globe className="w-4 h-4" /></a>
              <a className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-600 hover:bg-[#df8820] hover:text-white transition-colors" href="#"><Mail className="w-4 h-4" /></a>
              <a className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-600 hover:bg-[#df8820] hover:text-white transition-colors" href="#"><Phone className="w-4 h-4" /></a>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 md:px-12 mt-16 pt-8 border-t border-zinc-100 text-center md:text-left flex flex-col md:flex-row justify-between items-center w-full">
          <p className="text-zinc-400 text-xs">© 2026 DLH DKI Jakarta. SIGAP - Sistem Integrasi Gerak Armada Pintar.</p>
        </div>
      </footer>
    </div>
  );
}
