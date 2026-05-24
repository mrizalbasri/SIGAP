export type TruckStatus = "ON_ROUTE" | "VIOLATION" | "IDLE" | "OFFLINE";
export type AlertType = "VIOLATION" | "WARNING" | "INFO";

export interface FleetTruck {
  id: string;
  truckId: string;
  driver: string;
  status: TruckStatus;
  lat: number;
  lng: number;
  speed: number;
  weight: number; // tons
  route: string;
  violationDetail?: string;
}

export interface AlertItem {
  id: string;
  truckId: string;
  time: string;
  type: AlertType;
  message: string;
}
