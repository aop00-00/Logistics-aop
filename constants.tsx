
import React from 'react';
import { Ship, Plane, Truck, LayoutDashboard, Compass, FileText, MessageSquare, Settings } from 'lucide-react';

export const TRANSPORT_MODES = [
  { id: 'sea', name: 'Transporte Marítimo', time: '20-45 days', icon: <Ship className="w-8 h-8" /> },
  { id: 'air', name: 'Transporte Aéreo', time: '3-7 days', icon: <Plane className="w-8 h-8" /> },
  { id: 'land', name: 'Transporte Terrestre', time: 'flexible', icon: <Truck className="w-8 h-8" /> },
] as const;

export const NAVIGATION_ITEMS = [
  { id: 'bookings', label: 'Reservar Pedido', icon: <Compass className="w-5 h-5" /> },
  { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
  { id: 'orders', label: 'Mis Pedidos', icon: <Compass className="w-5 h-5" /> },
  { id: 'invoices', label: 'Facturas', icon: <FileText className="w-5 h-5" /> },
  { id: 'messages', label: 'Mensajes', icon: <MessageSquare className="w-5 h-5" />, badge: 2 },
  { id: 'settings', label: 'Ajustes', icon: <Settings className="w-5 h-5" /> },
];

export const MAJOR_PORTS = [
  { id: 'shanghai', name: 'Shanghai Port, CN', country: 'China' },
  { id: 'singapore', name: 'Port of Singapore, SG', country: 'Singapore' },
  { id: 'ningbo', name: 'Ningbo-Zhoushan, CN', country: 'China' },
  { id: 'shenzhen', name: 'Port of Shenzhen, CN', country: 'China' },
  { id: 'guangzhou', name: 'Port of Guangzhou, CN', country: 'China' },
  { id: 'busan', name: 'Port of Busan, KR', country: 'South Korea' },
  { id: 'hongkong', name: 'Port of Hong Kong, HK', country: 'Hong Kong' },
  { id: 'rotterdam', name: 'Port of Rotterdam, NL', country: 'Netherlands' },
  { id: 'hamburg', name: 'Port of Hamburg, DE', country: 'Germany' },
  { id: 'antwerp', name: 'Port of Antwerp, BE', country: 'Belgium' },
  { id: 'losangeles', name: 'Port of Los Angeles, US', country: 'USA' },
  { id: 'longbeach', name: 'Port of Long Beach, US', country: 'USA' },
  { id: 'newyork', name: 'Port of New York/New Jersey, US', country: 'USA' },
  { id: 'valencia', name: 'Port of Valencia, ES', country: 'Spain' },
  { id: 'veracruz', name: 'Port of Veracruz, MX', country: 'Mexico' },
  { id: 'santos', name: 'Port of Santos, BR', country: 'Brazil' },
  { id: 'jebelali', name: 'Jebel Ali Port, AE', country: 'UAE' },
];

export const MOCK_SHIPMENTS = [
  {
    id: '#CN-4921',
    category: 'Electronics',
    status: 'IN TRANSIT' as const,
    origin: { city: 'Shanghai', country: 'China', code: '🇨🇳' },
    destination: { city: 'Hamburg', country: 'Germany', code: '🇩🇪' },
    eta: '4h'
  },
  {
    id: '#US-1102',
    category: 'Furniture',
    status: 'CUSTOMS' as const,
    origin: { city: 'New York', country: 'USA', code: '🇺🇸' },
    destination: { city: 'London', country: 'UK', code: '🇬🇧' }
  },
  {
    id: '#JP-8872',
    category: 'Auto Parts',
    status: 'PENDING' as const,
    origin: { city: 'Tokyo', country: 'Japan', code: '🇯🇵' },
    destination: { city: 'Seattle', country: 'USA', code: '🇺🇸' }
  }
];
