
export type TransportMode = 'sea' | 'air' | 'land';

export type ShipmentStatus = 'IN TRANSIT' | 'CUSTOMS' | 'DELIVERED' | 'PENDING';

export interface Shipment {
  id: string;
  category: string;
  status: ShipmentStatus;
  origin: {
    city: string;
    country: string;
    code: string;
  };
  destination: {
    city: string;
    country: string;
    code: string;
  };
  eta?: string;
}

export interface TrackingStep {
  title: string;
  description: string;
  timestamp: string;
  isCompleted: boolean;
  isCurrent: boolean;
}

export interface FinancialSummary {
  subtotal: number;
  insurance: number;
  tax: number;
  total: number;
}
