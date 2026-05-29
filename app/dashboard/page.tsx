"use client";

import React, { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import KPICards from "@/components/dashboard/KPICards";
import LiveMap from "@/components/map/LiveMap";
import AlertFeed from "@/components/alerts/AlertFeed";
import AnalyticsCharts from "@/components/dashboard/AnalyticsCharts";
import WasteCollection from "@/components/collection/WasteCollection";
import FleetManagement from "@/components/fleet/FleetManagement";
import AlertLogs from "@/components/alerts/AlertLogs";
import Analytics from "@/components/analytics/Analytics";
import { useFleetData } from "@/hooks/useFleetData";
import { RefreshCw, Wrench, ShieldAlert } from "lucide-react";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { trucks, alerts } = useFleetData();

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        // Executive Summary & Analytics Dashboard
        return (
          <div className="flex flex-col gap-6 animate-fade-in">
            {/* KPI Summary Cards */}
            <KPICards trucks={trucks} />

            {/* Recharts Analytics & Performance Indicators */}
            <AnalyticsCharts trucks={trucks} />
          </div>
        );
      case "map":
        // Dispatcher Live Tracking Map
        return (
          <div className="flex flex-col gap-6 animate-fade-in">
            {/* Map and Alert Feed Row Side-by-Side (Ideal for Dispatchers) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Live Tracking Map (Span 2) */}
              <div className="lg:col-span-2 flex flex-col">
                <LiveMap trucks={trucks} />
              </div>

              {/* Real-time Alert Feed (Span 1) */}
              <div className="lg:col-span-1">
                <AlertFeed alerts={alerts} />
              </div>
            </div>
          </div>
        );
      case "collection":
        return <WasteCollection />;
      case "fleet":
        return <FleetManagement />;
      case "alerts":
        return <AlertLogs />;
      case "analytics":
        return <Analytics />;
      default:
        // Placeholder for other tabs (Fleet, Alerts list, Analytics, Settings, Support)
        return (
          <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-white border border-zinc-150 rounded-2xl shadow-sm min-h-[400px]">
            <div className="w-16 h-16 rounded-2xl bg-[#fff4e6] flex items-center justify-center text-[#df8820] mb-6">
              <Wrench className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-zinc-900 font-sans tracking-tight mb-2">
              Modul Sedang Dikembangkan
            </h3>
            <p className="text-zinc-500 text-sm max-w-sm font-sans mb-6">
              Halaman ini sedang dipersiapkan untuk sinkronisasi penuh dengan ekosistem SIGAP DKI Jakarta. Silakan akses tab <strong>Dashboard</strong> atau <strong>Live Map</strong>.
            </p>
            <button 
              onClick={() => setActiveTab("dashboard")}
              className="px-5 py-2.5 bg-[#df8820] hover:bg-[#c67315] text-white font-semibold rounded-xl text-xs transition-colors shadow-sm font-sans"
            >
              Kembali ke Dashboard
            </button>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50/50 flex">
      {/* Sidebar Nav */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isMobileOpen={isSidebarOpen}
        setIsMobileOpen={setIsSidebarOpen}
      />

      {/* Main Content Area */}
      <div className="flex-1 md:ml-[280px] flex flex-col min-h-screen">
        {/* Header */}
        <Header activeTab={activeTab} onMenuClick={() => setIsSidebarOpen(true)} />

        {/* Page Content Canvas */}
        <main className="flex-1 pt-24 px-6 md:px-8 pb-8 flex flex-col gap-6 w-full max-w-[1600px] mx-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
