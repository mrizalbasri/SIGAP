"use client";

import { useState, useEffect } from "react";
import { FleetTruck, AlertItem } from "@/types/fleet";

export function useFleetData() {
  const [trucks, setTrucks] = useState<FleetTruck[]>([
    {
      id: "1",
      truckId: "B-1234-DLH",
      driver: "Bambang Pamungkas",
      status: "VIOLATION",
      lng: 106.8272, // Monas
      lat: -6.1751,
      speed: 0,
      weight: 8.5,
      route: "Zone A -> TPA Bantar Gebang",
      violationDetail: "Route Deviation: Keluar dari Jl. M.H. Thamrin ke jalur lambat"
    },
    {
      id: "2",
      truckId: "B-9988-DLH",
      driver: "Budi Sudarsono",
      status: "IDLE",
      lng: 106.8483, // Menteng
      lat: -6.1915,
      speed: 0,
      weight: 4.2,
      route: "Zone B -> TPS Menteng",
      violationDetail: "Berhenti > 35 Menit tanpa konfirmasi"
    },
    {
      id: "3",
      truckId: "B-5566-DLH",
      driver: "Eko Purjianto",
      status: "ON_ROUTE",
      lng: 106.8060, // Senayan
      lat: -6.2297,
      speed: 45,
      weight: 6.8,
      route: "Zone C -> TPA Bantar Gebang"
    },
    {
      id: "4",
      truckId: "B-8833-DLH",
      driver: "Kurniawan Dwi Y.",
      status: "ON_ROUTE",
      lng: 106.8326, // Ancol
      lat: -6.1432,
      speed: 38,
      weight: 7.1,
      route: "Zone D -> TPS Ancol"
    },
    {
      id: "5",
      truckId: "B-7722-DLH",
      driver: "Gendut Doni",
      status: "VIOLATION",
      lng: 106.7972, // Slipi
      lat: -6.1995,
      speed: 85,
      weight: 9.0,
      route: "Zone E -> TPA Bantar Gebang",
      violationDetail: "Batas Kecepatan Terlampaui (85 km/h di area Tol Kota)"
    }
  ]);

  const [alerts, setAlerts] = useState<AlertItem[]>([
    {
      id: "1",
      truckId: "B-1234-DLH",
      time: "10:42 AM",
      type: "VIOLATION",
      message: "Route Deviation - Sudirman Axis",
    },
    {
      id: "2",
      truckId: "B-9988-DLH",
      time: "10:35 AM",
      type: "WARNING",
      message: "Idle for > 30 mins - Menteng Area",
    },
    {
      id: "3",
      truckId: "B-5566-DLH",
      time: "10:15 AM",
      type: "INFO",
      message: "Regular Maintenance Completed",
    },
    {
      id: "4",
      truckId: "B-7722-DLH",
      time: "09:55 AM",
      type: "VIOLATION",
      message: "Speed Limit Exceeded (85 km/h) - Tol Slipi",
    },
  ]);

  // Simulate slight movements for real-time tracking
  useEffect(() => {
    const interval = setInterval(() => {
      setTrucks((prevTrucks) =>
        prevTrucks.map((truck) => {
          if (truck.status === "ON_ROUTE") {
            const latOffset = (Math.random() - 0.5) * 0.0008;
            const lngOffset = (Math.random() - 0.5) * 0.0008;
            return {
              ...truck,
              lat: truck.lat + latOffset,
              lng: truck.lng + lngOffset,
              speed: Math.floor(Math.max(20, Math.min(60, truck.speed + (Math.random() - 0.5) * 6)))
            };
          }
          return truck;
        })
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Simulate dynamic alerts prepending
  useEffect(() => {
    const alertTemplates = [
      { message: "Memasuki Zona Bantar Gebang - Estimasi Bongkar 12 Menit", type: "INFO" },
      { message: "Kecepatan di Tol Jakarta-Cikampek Mendekati Batas Maksimum", type: "WARNING" },
      { message: "Pembersihan Area Monas Selesai - Bergerak ke TPS Terdekat", type: "INFO" },
      { message: "GPS Signal Telemetry Fluktuasi di Area Grogol", type: "WARNING" },
      { message: "Route Deviation: Keluar jalur utama Jl. Letjen S. Parman", type: "VIOLATION" },
      { message: "Suhu Mesin Truk Terdeteksi Di Atas Normal (95°C)", type: "WARNING" }
    ] as const;

    const interval = setInterval(() => {
      const randomTruck = trucks[Math.floor(Math.random() * trucks.length)];
      const randomTemplate = alertTemplates[Math.floor(Math.random() * alertTemplates.length)];
      
      const now = new Date();
      let hours = now.getHours();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const timeStr = `${hours}:${minutes} ${ampm}`;

      const newAlert: AlertItem = {
        id: Math.random().toString(36).substring(2, 11),
        truckId: randomTruck.truckId,
        time: timeStr,
        type: randomTemplate.type,
        message: randomTemplate.message
      };

      setAlerts((prev) => [newAlert, ...prev.slice(0, 9)]);
    }, 15000);

    return () => clearInterval(interval);
  }, [trucks]);

  return { trucks, setTrucks, alerts, setAlerts };
}
