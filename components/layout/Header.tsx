"use client";

import React from "react";
import { Search, Clock, Bell, Menu } from "lucide-react";

interface HeaderProps {
  activeTab: string;
}

export default function Header({ activeTab }: HeaderProps) {
  const getTitle = () => {
    switch (activeTab) {
      case "dashboard":
        return "Command Center";
      case "map":
        return "Live Tracking Map";
      case "fleet":
        return "Fleet Management";
      case "alerts":
        return "Operational Alert Logs";
      case "analytics":
        return "Performance Analytics";
      default:
        return "Command Center";
    }
  };

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-zinc-100 shadow-sm fixed top-0 right-0 w-full md:w-[calc(100%-280px)] h-16 z-40 flex items-center justify-between px-6 md:px-8 transition-all duration-300">
      <div className="flex items-center gap-4">
        {/* Mobile menu toggle placeholder */}
        <button className="md:hidden p-1 text-zinc-700 hover:bg-zinc-50 rounded-lg">
          <Menu className="w-6 h-6" />
        </button>
        <h2 className="text-xl font-bold text-zinc-950 font-sans tracking-tight">
          {getTitle()}
        </h2>
      </div>

      <div className="flex items-center gap-6">
        {/* Search */}
        <div className="relative hidden sm:flex items-center bg-zinc-50 border border-zinc-200 focus-within:border-[#df8820] focus-within:ring-2 focus-within:ring-[#fff4e6] rounded-full px-4 py-1.5 transition-all duration-200">
          <Search className="w-4 h-4 text-zinc-400 mr-2" />
          <input
            className="bg-transparent border-none outline-none text-sm text-zinc-800 placeholder-zinc-400 w-48 font-sans"
            placeholder="Search fleets, drivers, areas..."
            type="text"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button className="text-zinc-500 hover:text-[#df8820] p-2 hover:bg-zinc-50 rounded-full transition-colors relative">
            <Clock className="w-5 h-5" />
          </button>
          
          <button className="text-zinc-500 hover:text-[#df8820] p-2 hover:bg-zinc-50 rounded-full transition-colors relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Divider */}
          <div className="h-6 w-[1px] bg-zinc-200"></div>

          {/* Profile */}
          <div className="flex items-center gap-2 cursor-pointer group">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-zinc-200 group-hover:border-[#df8820] transition-colors">
              <img
                alt="Dispatcher Profile"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBNWJ0RB_QF500aeSJQQmK9uV0rlws4yG3Xtd-CFXf6oiXg-yQq9ycplGUbGXtEAiS1mHXF6OjjOgZUmvibU3n7zSXtFS_lpLQMiilDh4DyBnDXjdWaVVFxzcSUXltWBwsa9Y7JviQ7sh1bQa9BF6OQedZxHc6L7VIVw13zYHLZZ5eY1_y7yjHOdXBLy-yS8Q5c2bInFNto92MZHWlF1F6wBS5brCmjm79wi5w4fqlZ--Lt8w69lOWyUG-GeXzsCAghHpJ6kYTbHGs"
              />
            </div>
            <div className="hidden lg:flex flex-col text-left">
              <span className="text-xs font-semibold text-zinc-800 font-sans leading-none">Rizal Basri</span>
              <span className="text-[10px] text-zinc-400 font-sans">Lead Dispatcher</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
