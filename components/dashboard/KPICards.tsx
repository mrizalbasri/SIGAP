"use client";

import React from "react";
import { Truck, Navigation, AlertOctagon, ShieldAlert } from "lucide-react";
import { FleetTruck } from "@/types/fleet";

interface KPICardsProps {
  trucks?: FleetTruck[];
}

export default function KPICards({ trucks = [] }: KPICardsProps) {
  // Compute dynamic stats if trucks list is passed, otherwise fall back to Jakarta broad baselines
  const onRouteSim = trucks.filter(t => t.status === "ON_ROUTE").length;
  const violationSim = trucks.filter(t => t.status === "VIOLATION").length;
  const idleSim = trucks.filter(t => t.status === "IDLE").length;

  const onRouteCount = trucks.length > 0 ? 890 + onRouteSim : 892;
  const violationCount = trucks.length > 0 ? 22 + violationSim : 24;
  const idleCount = trucks.length > 0 ? 331 + idleSim : 332;
  const totalFleet = onRouteCount + violationCount + idleCount + 124; // Including offline baseline

  const cards = [
    {
      title: "Total Fleet",
      value: totalFleet.toLocaleString("id-ID"),
      subtext: "+12 baru hari ini",
      icon: Truck,
      colorClass: "border-[#df8820]",
      bgColor: "bg-[#fff4e6]/50",
      textColor: "text-[#df8820]",
    },
    {
      title: "On Route",
      value: onRouteCount.toLocaleString("id-ID"),
      subtext: `${Math.round((onRouteCount / totalFleet) * 100)}% Aktif Beroperasi`,
      icon: Navigation,
      colorClass: "border-[#2d9f6c]",
      bgColor: "bg-[#ebf7f2]/50",
      textColor: "text-[#2d9f6c]",
    },
    {
      title: "Violations",
      value: violationCount.toLocaleString("id-ID"),
      subtext: "Butuh Perhatian Segera",
      icon: AlertOctagon,
      colorClass: "border-red-500",
      bgColor: "bg-red-50/50",
      textColor: "text-red-500",
      isPulse: violationCount > 22,
    },
    {
      title: "Idle / Maintenance",
      value: idleCount.toLocaleString("id-ID"),
      subtext: `${Math.round((idleCount / totalFleet) * 100)}% Garasi/Bengkel`,
      icon: ShieldAlert,
      colorClass: "border-zinc-400",
      bgColor: "bg-zinc-100/50",
      textColor: "text-zinc-500",
    },
  ];

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div
            key={idx}
            className={`bg-white rounded-2xl p-5 border-t-4 ${card.colorClass} shadow-sm hover:shadow-md transition-shadow duration-250 flex flex-col relative overflow-hidden group`}
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-sm font-semibold text-zinc-500 font-sans">
                {card.title}
              </h3>
              <div className={`p-2 rounded-xl ${card.bgColor} ${card.textColor}`}>
                <Icon className={`w-5 h-5 stroke-[2] ${card.isPulse ? "animate-pulse" : ""}`} />
              </div>
            </div>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-3xl font-extrabold text-zinc-900 tracking-tight font-sans">
                {card.value}
              </span>
              <span className={`text-xs font-semibold font-sans ${card.textColor}`}>
                {card.subtext}
              </span>
            </div>
          </div>
        );
      })}
    </section>
  );
}
