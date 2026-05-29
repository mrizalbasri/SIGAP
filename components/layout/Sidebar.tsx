"use client";

import React from "react";
import Image from "next/image";
import {
  LayoutDashboard,
  Map as MapIcon,
  Truck,
  AlertTriangle,
  BarChart3,
  Settings,
  HelpCircle,
  Trash2,
  X,
} from "lucide-react";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isMobileOpen?: boolean;
  setIsMobileOpen?: (open: boolean) => void;
}

export default function Sidebar({
  activeTab,
  setActiveTab,
  isMobileOpen = false,
  setIsMobileOpen,
}: SidebarProps) {
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

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    if (setIsMobileOpen) {
      setIsMobileOpen(false);
    }
  };

  return (
    <>
      {/* Backdrop overlay for mobile screen */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-xs z-45 md:hidden transition-opacity duration-300"
          onClick={() => setIsMobileOpen?.(false)}
        />
      )}

      <aside
        className={`fixed md:fixed left-0 top-0 z-50 flex bg-white/95 backdrop-blur-xl border-r border-zinc-150 shadow-md w-[280px] h-screen flex-col py-6 transition-transform duration-300 ease-out md:translate-x-0 ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand Logo & Close Trigger */}
        <div className="px-6 py-4 flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Image
              src="/logo.webp"
              alt="SIGAP Logo"
              width={80}
              height={80}
              className="object-contain"
              loading="eager"
            />
            <div>
              <h1 className="text-2xl font-black tracking-tight font-sans">
                <span className="text-[#16a34a]">SIG</span>
                <span className="text-[#df8820]">AP</span>
              </h1>
              <p className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">
                Smart Fleet System
              </p>
            </div>
          </div>

          {/* Mobile close button */}
          {setIsMobileOpen && (
            <button
              onClick={() => setIsMobileOpen(false)}
              className="md:hidden p-1.5 text-zinc-500 hover:bg-zinc-100 rounded-xl transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Main Menu */}
        <nav className="flex-1 space-y-1.5 px-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`flex items-center space-x-3 px-4 py-3.5 rounded-xl w-full text-left font-medium transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "text-[#df8820] bg-[#fff4e6] font-semibold shadow-sm border-r-4 border-[#df8820]"
                    : "text-zinc-500 hover:text-[#df8820] hover:bg-zinc-50"
                }`}
              >
                <Icon
                  className={`w-5 h-5 stroke-[2] ${isActive ? "text-[#df8820]" : "text-zinc-400"}`}
                />
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
                  onClick={() => handleTabClick(item.id)}
                  className={`flex items-center space-x-3 px-4 py-2.5 rounded-lg w-full text-left font-medium transition-all duration-250 cursor-pointer ${
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
    </>
  );
}
