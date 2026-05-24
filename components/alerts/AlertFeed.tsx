"use client";

import React from "react";
import { Filter, Eye, AlertOctagon, Clock, CheckCircle } from "lucide-react";
import { AlertItem } from "@/types/fleet";

interface AlertFeedProps {
  alerts: AlertItem[];
}

export default function AlertFeed({ alerts }: AlertFeedProps) {
  return (
    <div className="bg-white rounded-2xl p-5 border border-zinc-150 shadow-sm flex flex-col h-full overflow-hidden">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-zinc-900 font-sans tracking-tight">
          Live Alert Feed
        </h3>
        <button className="p-2 hover:bg-zinc-50 rounded-lg text-zinc-500 hover:text-[#df8820] transition-colors">
          <Filter className="w-4 h-4" />
        </button>
      </div>

      {/* Alerts List */}
      <div className="flex-1 overflow-y-auto pr-1 space-y-3 max-h-[360px] md:max-h-none">
        {alerts.map((alert) => {
          let styleClass = "";
          let dotColor = "";
          let iconClass = null;

          if (alert.type === "VIOLATION") {
            styleClass = "bg-red-50/70 border-l-4 border-red-500";
            dotColor = "bg-red-500 animate-pulse";
            iconClass = <AlertOctagon className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />;
          } else if (alert.type === "WARNING") {
            styleClass = "bg-[#fff4e6]/70 border-l-4 border-[#df8820]";
            dotColor = "bg-[#df8820]";
            iconClass = <Clock className="w-4 h-4 text-[#df8820] shrink-0 mt-0.5" />;
          } else {
            styleClass = "bg-green-50/70 border-l-4 border-[#2d9f6c]";
            dotColor = "bg-[#2d9f6c]";
            iconClass = <CheckCircle className="w-4 h-4 text-[#2d9f6c] shrink-0 mt-0.5" />;
          }

          return (
            <div
              key={alert.id}
              className={`p-3.5 rounded-r-xl transition-all duration-200 hover:translate-x-1 ${styleClass} flex gap-3`}
            >
              {iconClass}
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-1">
                  <span className="text-sm font-bold text-zinc-900 font-sans truncate">
                    {alert.truckId}
                  </span>
                  <span className="text-[10px] text-zinc-400 font-sans tracking-wider shrink-0 ml-2">
                    {alert.time}
                  </span>
                </div>
                <p className="text-xs text-zinc-600 font-sans truncate">
                  {alert.message}
                </p>
              </div>
              <div className="flex items-center shrink-0">
                <span className={`w-2.5 h-2.5 rounded-full ${dotColor}`}></span>
              </div>
            </div>
          );
        })}
      </div>

      <button className="mt-4 w-full py-2.5 bg-zinc-50 hover:bg-zinc-100 text-zinc-700 hover:text-zinc-900 rounded-xl font-semibold text-xs font-sans transition-colors flex items-center justify-center gap-1.5 border border-zinc-200">
        <Eye className="w-4 h-4" />
        View All Active Alerts
      </button>
    </div>
  );
}
