"use client";

import React from "react";
import {
  Navigation,
  Brain,
  AlertTriangle,
  BarChart3,
  Smartphone,
  ChevronRight,
} from "lucide-react";

interface Feature {
  icon: any;
  title: string;
  desc: string;
  color: string;
  bg: string;
  border: string;
}

interface FeaturesBentoGridProps {
  features: Feature[];
  visible: boolean;
  revealClass: (visible: boolean, direction: string, delay?: number) => string;
  revealStyle: (delay: number) => React.CSSProperties | undefined;
}

export default function FeaturesBentoGrid({
  features,
  visible,
  revealClass,
  revealStyle,
}: FeaturesBentoGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-5 auto-rows-[200px]">
      {/* Feature 1: Live GPS Tracking - Large (spans 2x2) */}
      <div
        className={`relative bg-white rounded-3xl p-8 border ${features[0].border} shadow-sm hover-lift group overflow-hidden cursor-default md:col-span-3 lg:col-span-5 md:row-span-2 ${revealClass(visible, "up")}`}
        style={revealStyle(0)}
      >
        <div className="relative z-10 h-full flex flex-col justify-between">
          <div>
            <div
              className={`w-16 h-16 rounded-2xl ${features[0].bg} ${features[0].color} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-lg transition-all duration-400 ${visible ? "animate-bounce-in" : "opacity-0"}`}
              style={{ animationDelay: "200ms" }}
            >
              <Navigation className="w-7 h-7 stroke-[2]" />
            </div>
            <h3 className="font-headline font-extrabold text-zinc-900 text-[20px] mb-3 tracking-tight">
              {features[0].title}
            </h3>
            <p className="text-[14px] text-zinc-500 leading-[1.7]">
              {features[0].desc}
            </p>
          </div>
          <div
            className={`flex items-center gap-1.5 mt-6 text-[13px] font-bold ${features[0].color} opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1`}
          >
            Pelajari lebih <ChevronRight className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Feature 2: AI Route Optimizer - Large (spans 2x2) */}
      <div
        className={`relative bg-white rounded-3xl p-8 border ${features[1].border} shadow-sm hover-lift group overflow-hidden cursor-default md:col-span-3 lg:col-span-4 md:row-span-2 ${revealClass(visible, "scale")}`}
        style={revealStyle(100)}
      >
        <div className="relative z-10 h-full flex flex-col justify-between">
          <div>
            <div
              className={`w-16 h-16 rounded-2xl ${features[1].bg} ${features[1].color} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-lg transition-all duration-400 ${visible ? "animate-bounce-in" : "opacity-0"}`}
              style={{ animationDelay: "300ms" }}
            >
              <Brain className="w-7 h-7 stroke-[2]" />
            </div>
            <h3 className="font-headline font-extrabold text-zinc-900 text-[20px] mb-3 tracking-tight">
              {features[1].title}
            </h3>
            <p className="text-[14px] text-zinc-500 leading-[1.7]">
              {features[1].desc}
            </p>
          </div>
          <div
            className={`flex items-center gap-1.5 mt-6 text-[13px] font-bold ${features[1].color} opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1`}
          >
            Pelajari lebih <ChevronRight className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Feature 3: Deteksi Pelanggaran - Medium (spans 1x2) */}
      <div
        className={`relative bg-white rounded-3xl p-6 border ${features[2].border} shadow-sm hover-lift group overflow-hidden cursor-default md:col-span-3 lg:col-span-3 md:row-span-2 ${revealClass(visible, "up")}`}
        style={revealStyle(200)}
      >
        <div className="relative z-10 h-full flex flex-col justify-between">
          <div>
            <div
              className={`w-14 h-14 rounded-2xl ${features[2].bg} ${features[2].color} flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-lg transition-all duration-400 ${visible ? "animate-bounce-in" : "opacity-0"}`}
              style={{ animationDelay: "400ms" }}
            >
              <AlertTriangle className="w-6 h-6 stroke-[2]" />
            </div>
            <h3 className="font-headline font-extrabold text-zinc-900 text-[17px] mb-2.5 tracking-tight">
              {features[2].title}
            </h3>
            <p className="text-[13px] text-zinc-500 leading-[1.7]">
              {features[2].desc}
            </p>
          </div>
          <div
            className={`flex items-center gap-1.5 mt-4 text-[12px] font-bold ${features[2].color} opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1`}
          >
            Pelajari lebih <ChevronRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>

      {/* Feature 4: Analitik Dashboard - Medium */}
      <div
        className={`relative bg-white rounded-3xl p-6 border ${features[3].border} shadow-sm hover-lift group overflow-hidden cursor-default md:col-span-3 lg:col-span-6 ${revealClass(visible, "scale")}`}
        style={revealStyle(300)}
      >
        <div className="relative z-10">
          <div
            className={`w-14 h-14 rounded-2xl ${features[3].bg} ${features[3].color} flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-lg transition-all duration-400 ${visible ? "animate-bounce-in" : "opacity-0"}`}
            style={{ animationDelay: "500ms" }}
          >
            <BarChart3 className="w-6 h-6 stroke-[2]" />
          </div>
          <h3 className="font-headline font-extrabold text-zinc-900 text-[17px] mb-2.5 tracking-tight">
            {features[3].title}
          </h3>
          <p className="text-[13px] text-zinc-500 leading-[1.7]">
            {features[3].desc}
          </p>
          <div
            className={`flex items-center gap-1.5 mt-5 text-[12px] font-bold ${features[3].color} opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1`}
          >
            Pelajari lebih <ChevronRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>

      {/* Feature 5: Driver Mobile App - Medium */}
      <div
        className={`relative bg-white rounded-3xl p-6 border ${features[4].border} shadow-sm hover-lift group overflow-hidden cursor-default md:col-span-3 lg:col-span-6 ${revealClass(visible, "up")}`}
        style={revealStyle(400)}
      >
        <div className="relative z-10">
          <div
            className={`w-14 h-14 rounded-2xl ${features[4].bg} ${features[4].color} flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-lg transition-all duration-400 ${visible ? "animate-bounce-in" : "opacity-0"}`}
            style={{ animationDelay: "600ms" }}
          >
            <Smartphone className="w-6 h-6 stroke-[2]" />
          </div>
          <h3 className="font-headline font-extrabold text-zinc-900 text-[17px] mb-2.5 tracking-tight">
            {features[4].title}
          </h3>
          <p className="text-[13px] text-zinc-500 leading-[1.7]">
            {features[4].desc}
          </p>
          <div
            className={`flex items-center gap-1.5 mt-5 text-[12px] font-bold ${features[4].color} opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1`}
          >
            Pelajari lebih <ChevronRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </div>
  );
}
