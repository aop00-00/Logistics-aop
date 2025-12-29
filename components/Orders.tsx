
import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Package, 
  Truck, 
  Ship, 
  Plane, 
  Calendar, 
  MapPin, 
  MoreHorizontal, 
  Download, 
  ChevronRight, 
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText
} from 'lucide-react';

// Mock Data for Orders
const ACTIVE_ORDERS = [
  {
    id: '#CN-4921',
    mode: 'sea',
    origin: 'Shanghai, CN',
    destination: 'Hamburg, DE',
    status: 'In Transit',
    progress: 65,
    eta: 'Oct 28, 2024',
    items: 'Electronics (1,200 units)',
    lastUpdate: 'Vessel departure confirmed.',
    icon: <Ship className="w-5 h-5" />
  },
  {
    id: '#US-1102',
    mode: 'air',
    origin: 'New York, US',
    destination: 'London, UK',
    status: 'Customs',
    progress: 85,
    eta: 'Oct 25, 2024',
    items: 'Furniture Parts',
    lastUpdate: 'Customs clearance in progress.',
    icon: <Plane className="w-5 h-5" />
  },
  {
    id: '#MX-3321',
    mode: 'land',
    origin: 'Veracruz, MX',
    destination: 'Miami, US',
    status: 'Pending',
    progress: 10,
    eta: 'Nov 02, 2024',
    items: 'Textiles',
    lastUpdate: 'Awaiting pickup at origin.',
    icon: <Truck className="w-5 h-5" />
  }
];

const ORDER_HISTORY = [
  { id: '#HIST-9921', date: 'Sep 28, 2024', origin: 'Tokyo, JP', dest: 'Seattle, US', amount: '$4,200', status: 'Delivered', mode: 'sea' },
  { id: '#HIST-8822', date: 'Sep 15, 2024', origin: 'Berlin, DE', dest: 'Paris, FR', amount: '$850', status: 'Delivered', mode: 'land' },
  { id: '#HIST-7733', date: 'Aug 30, 2024', origin: 'Mumbai, IN', dest: 'Dubai, AE', amount: '$1,200', status: 'Cancelled', mode: 'air' },
  { id: '#HIST-6644', date: 'Aug 12, 2024', origin: 'Santos, BR', dest: 'Lisbon, PT', amount: '$3,100', status: 'Delivered', mode: 'sea' },
  { id: '#HIST-5555', date: 'Jul 22, 2024', origin: 'Sydney, AU', dest: 'Singapore, SG', amount: '$2,400', status: 'Delivered', mode: 'sea' },
];

interface OrdersProps {
    onViewDetails?: (order: any) => void;
}

export const Orders: React.FC<OrdersProps> = ({ onViewDetails }) => {
  const [activeTab, setActiveTab] = useState<'active' | 'history'>('active');
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight">Mis Pedidos</h2>
          <p className="text-slate-500 font-medium mt-1">Gestione sus envíos activos y consulte el historial.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Buscar pedido..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white border border-slate-200 rounded-xl py-3 pl-11 pr-4 text-sm font-bold focus:ring-4 focus:ring-blue-50 focus:border-blue-200 outline-none w-64 shadow-sm"
            />
          </div>
          <button className="p-3 bg-white border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 shadow-sm transition-colors">
            <Filter className="w-5 h-5" />
          </button>
          <button className="p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-100 transition-colors">
            <Download className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-8 border-b border-slate-200">
        <button 
          onClick={() => setActiveTab('active')}
          className={`pb-4 text-sm font-black uppercase tracking-wider transition-all relative ${
            activeTab === 'active' ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          En Curso <span className="ml-2 bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full text-[10px]">{ACTIVE_ORDERS.length}</span>
          {activeTab === 'active' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 rounded-t-full"></div>}
        </button>
        <button 
          onClick={() => setActiveTab('history')}
          className={`pb-4 text-sm font-black uppercase tracking-wider transition-all relative ${
            activeTab === 'history' ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          Historial <span className="ml-2 bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full text-[10px]">{ORDER_HISTORY.length}</span>
          {activeTab === 'history' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 rounded-t-full"></div>}
        </button>
      </div>

      {/* Content Area */}
      {activeTab === 'active' ? (
        <div className="grid grid-cols-1 gap-6">
          {ACTIVE_ORDERS.map((order) => (
            <div key={order.id} className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm hover:shadow-lg transition-all group">
              <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-6 mb-8">
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg ${
                    order.mode === 'sea' ? 'bg-blue-600 shadow-blue-200' : 
                    order.mode === 'air' ? 'bg-orange-500 shadow-orange-200' : 'bg-emerald-500 shadow-emerald-200'
                  }`}>
                    {order.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="text-xl font-black text-slate-800">{order.id}</h3>
                      <span className="bg-blue-50 text-blue-600 text-[10px] font-black px-2 py-1 rounded-lg uppercase tracking-wider">{order.status}</span>
                    </div>
                    <p className="text-sm font-medium text-slate-500 mt-1">{order.items}</p>
                  </div>
                </div>
                <div className="flex items-center gap-8">
                  <div className="text-right">
                    <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Estimación de Llegada</p>
                    <p className="text-lg font-black text-slate-800 flex items-center gap-2 justify-end">
                      <Calendar className="w-4 h-4 text-slate-400" /> {order.eta}
                    </p>
                  </div>
                  <button 
                    onClick={() => onViewDetails && onViewDetails(order)}
                    className="bg-slate-900 text-white px-6 py-3 rounded-xl text-xs font-black hover:bg-black transition-colors"
                  >
                    VER DETALLES
                  </button>
                </div>
              </div>

              {/* Progress Bar & Route */}
              <div className="relative pt-6 pb-2">
                <div className="flex justify-between text-xs font-black text-slate-800 mb-4 uppercase tracking-wider">
                  <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-slate-400" /> {order.origin}</span>
                  <span className="flex items-center gap-2">{order.destination} <MapPin className="w-4 h-4 text-slate-400" /></span>
                </div>
                <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 ${
                      order.status === 'Pending' ? 'bg-amber-400' : 'bg-blue-600'
                    }`} 
                    style={{ width: `${order.progress}%` }}
                  ></div>
                </div>
                <div className="mt-4 flex items-center gap-2 text-xs font-medium text-slate-500">
                  <Clock className="w-4 h-4 text-blue-500" />
                  Actualización: <span className="text-slate-700 font-bold">{order.lastUpdate}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50 border-b border-slate-100">
              <tr>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">ID Pedido</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Fecha</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Ruta</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Monto</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Estado</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {ORDER_HISTORY.filter(h => h.id.toLowerCase().includes(searchTerm.toLowerCase())).map((order) => (
                <tr key={order.id} className="group hover:bg-slate-50/50 transition-colors">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white border border-slate-100 rounded-lg text-slate-400">
                        {order.mode === 'sea' ? <Ship className="w-3 h-3" /> : order.mode === 'air' ? <Plane className="w-3 h-3" /> : <Truck className="w-3 h-3" />}
                      </div>
                      <span className="font-black text-slate-700">{order.id}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-sm font-bold text-slate-500">{order.date}</td>
                  <td className="px-8 py-6">
                    <div className="text-sm font-bold text-slate-700">{order.origin}</div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase mt-0.5">To {order.dest}</div>
                  </td>
                  <td className="px-8 py-6 text-sm font-black text-slate-800">{order.amount}</td>
                  <td className="px-8 py-6 text-center">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                      order.status === 'Delivered' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
                    }`}>
                      {order.status === 'Delivered' ? <CheckCircle2 className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                      {order.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Download Invoice">
                        <FileText className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {ORDER_HISTORY.length === 0 && (
            <div className="p-12 text-center text-slate-400">
              <Package className="w-12 h-12 mx-auto mb-4 opacity-20" />
              <p className="font-medium">No se encontraron pedidos.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
