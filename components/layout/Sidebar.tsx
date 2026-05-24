"use client";

import React from "react";
import { 
  LayoutDashboard, 
  Map as MapIcon, 
  Truck, 
  AlertTriangle, 
  BarChart3, 
  Settings, 
  HelpCircle,
  ShieldAlert,
  Trash2
} from "lucide-react";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "map", label: "Live Map", icon: MapIcon },
    { id: "collection", label: "Pengambilan Sampah", icon: Trash2 },
    { id: "fleet", label: "Fleet Management", icon: Truck },
    { id: "alerts", label: "Alert Logs", icon: AlertTriangle },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
  ];

  const bottomItems = [
    { id: "settings", label: "Settings", icon: Settings },
    { id: "support", label: "Support", icon: HelpCircle },
  ];

  return (
    <aside className="hidden md:flex bg-white/95 backdrop-blur-xl border-r border-zinc-150 shadow-sm w-[280px] h-screen fixed left-0 top-0 flex-col py-6 z-50 transition-all duration-300">
      {/* Brand Logo */}
      <div className="px-6 py-4 flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-[#fff4e6] flex items-center justify-center text-[#df8820]">
          <ShieldAlert className="w-6 h-6 stroke-[2]" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-[#1a1a1a] tracking-tight font-sans">
            SIGAP
          </h1>
          <p className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">
            Armada Pintar DLH
          </p>
        </div>
      </div>

      {/* Main Menu */}
      <nav className="flex-1 space-y-1.5 px-3">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center space-x-3 px-4 py-3.5 rounded-xl w-full text-left font-medium transition-all duration-200 ${
                isActive
                  ? "text-[#df8820] bg-[#fff4e6] font-semibold shadow-sm border-r-4 border-[#df8820]"
                  : "text-zinc-500 hover:text-[#df8820] hover:bg-zinc-50"
              }`}
            >
              <Icon className={`w-5 h-5 stroke-[2] ${isActive ? "text-[#df8820]" : "text-zinc-400"}`} />
              <span className="text-sm font-sans">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Bottom Menu */}
      <div className="mt-auto px-3 py-4 border-t border-zinc-100">
        <nav className="space-y-1">
          {bottomItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-3 px-4 py-2.5 rounded-lg w-full text-left font-medium transition-all duration-250 ${
                  isActive
                    ? "text-[#df8820] bg-[#fff4e6]"
                    : "text-zinc-500 hover:text-[#df8820] hover:bg-zinc-50"
                }`}
              >
                <Icon className="w-4 h-4 text-zinc-400" />
                <span className="text-xs font-sans">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
