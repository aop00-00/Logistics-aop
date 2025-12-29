
import React from 'react';
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  Clock, 
  Ship, 
  Truck, 
  Plane, 
  Package, 
  FileText, 
  Download, 
  Thermometer, 
  Droplets, 
  Activity, 
  ShieldCheck, 
  Container,
  Anchor,
  Navigation
} from 'lucide-react';

interface OrderDetailProps {
  order: any;
  onBack: () => void;
}

export const OrderDetail: React.FC<OrderDetailProps> = ({ order, onBack }) => {
  if (!order) return null;

  // Mock telemetry data based on order mode
  const telemetry = {
    temp: '18.5°C',
    humidity: '45%',
    shock: 'Normal',
    lastPing: '2 min ago'
  };

  return (
    <div className="p-6 lg:p-10 max-w-[1920px] mx-auto animate-in slide-in-from-right-8 duration-500">
      
      {/* Header Navigation */}
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-slate-500 hover:text-slate-800 font-bold mb-6 transition-colors group"
      >
        <div className="p-2 bg-white rounded-xl border border-slate-200 group-hover:border-slate-300">
            <ArrowLeft className="w-4 h-4" />
        </div>
        <span>Volver a Pedidos</span>
      </button>

      {/* Main Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Left Column: Main Status & Map */}
        <div className="xl:col-span-2 space-y-6">
            
            {/* Status Card */}
            <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="flex items-center gap-6">
                    <div className={`w-20 h-20 rounded-[1.5rem] flex items-center justify-center text-white shadow-xl ${
                        order.mode === 'sea' ? 'bg-blue-600 shadow-blue-200' : 
                        order.mode === 'air' ? 'bg-orange-500 shadow-orange-200' : 'bg-emerald-500 shadow-emerald-200'
                    }`}>
                        {order.mode === 'sea' ? <Ship className="w-10 h-10" /> : order.mode === 'air' ? <Plane className="w-10 h-10" /> : <Truck className="w-10 h-10" />}
                    </div>
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <h2 className="text-3xl font-black text-slate-800 tracking-tight">{order.id}</h2>
                            <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-lg text-xs font-black uppercase tracking-wider flex items-center gap-1">
                                <Activity className="w-3 h-3" /> En Tránsito
                            </span>
                        </div>
                        <p className="text-sm font-bold text-slate-400 flex items-center gap-2">
                            Ref: PO-2024-8821 • <span className="text-slate-600">{order.origin} <span className="mx-1">→</span> {order.destination}</span>
                        </p>
                    </div>
                </div>
                <div className="text-right bg-slate-50 px-6 py-3 rounded-2xl border border-slate-100">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Llegada Estimada</p>
                    <p className="text-xl font-black text-slate-800">{order.eta}</p>
                    <p className="text-xs font-bold text-blue-600">A tiempo</p>
                </div>
            </div>

            {/* Visual Map / Route Container */}
            <div className="bg-slate-900 rounded-[2.5rem] p-1 shadow-2xl overflow-hidden relative min-h-[400px] group">
                {/* Simulated Map Background */}
                <div className="absolute inset-0 bg-[#0f172a] opacity-100">
                    <div className="absolute inset-0 opacity-20" style={{ 
                        backgroundImage: 'radial-gradient(#3b82f6 1px, transparent 1px)', 
                        backgroundSize: '40px 40px' 
                    }}></div>
                    
                    {/* Simplified Route SVG */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
                        <path d="M100,300 C300,300 400,100 800,150" fill="none" stroke="#1e293b" strokeWidth="4" strokeDasharray="10 10" />
                        <path d="M100,300 C300,300 400,100 800,150" fill="none" stroke="#3b82f6" strokeWidth="2" strokeDasharray="10 10" className="animate-pulse" />
                    </svg>

                    {/* Origin Marker */}
                    <div className="absolute left-[10%] top-[60%] flex flex-col items-center gap-2">
                        <div className="w-4 h-4 bg-slate-500 rounded-full ring-4 ring-slate-800"></div>
                        <span className="text-xs font-bold text-slate-400 uppercase bg-slate-900/80 px-2 py-1 rounded">{order.origin}</span>
                    </div>

                    {/* Destination Marker */}
                    <div className="absolute left-[80%] top-[30%] flex flex-col items-center gap-2">
                        <div className="w-4 h-4 bg-emerald-500 rounded-full ring-4 ring-emerald-900/50 animate-pulse"></div>
                        <span className="text-xs font-bold text-emerald-400 uppercase bg-slate-900/80 px-2 py-1 rounded">{order.destination}</span>
                    </div>

                    {/* Current Position (Simulated) */}
                    <div className="absolute left-[45%] top-[40%] flex flex-col items-center gap-4 transition-transform group-hover:scale-110 duration-500">
                        <div className="relative">
                            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-[0_0_40px_-5px_rgba(37,99,235,0.6)] z-10 relative">
                                {order.mode === 'sea' ? <Ship className="w-8 h-8" /> : <Truck className="w-8 h-8" />}
                            </div>
                            <div className="absolute -inset-4 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-3 rounded-xl text-center">
                            <p className="text-xs font-bold text-white">Posición Actual</p>
                            <p className="text-[10px] text-blue-200">Lat: 34.0522 N • Lon: 118.2437 W</p>
                        </div>
                    </div>
                </div>

                {/* Telemetry Overlay */}
                <div className="absolute bottom-6 left-6 right-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { label: 'Temperatura', value: telemetry.temp, icon: <Thermometer className="w-4 h-4" />, color: 'text-blue-400' },
                        { label: 'Humedad', value: telemetry.humidity, icon: <Droplets className="w-4 h-4" />, color: 'text-cyan-400' },
                        { label: 'Integridad', value: telemetry.shock, icon: <ShieldCheck className="w-4 h-4" />, color: 'text-emerald-400' },
                        { label: 'Última Señal', value: telemetry.lastPing, icon: <Activity className="w-4 h-4" />, color: 'text-orange-400' },
                    ].map((metric, i) => (
                        <div key={i} className="bg-slate-800/80 backdrop-blur-md border border-slate-700/50 p-4 rounded-2xl">
                            <div className={`flex items-center gap-2 ${metric.color} mb-1`}>
                                {metric.icon}
                                <span className="text-[10px] font-black uppercase tracking-widest">{metric.label}</span>
                            </div>
                            <p className="text-lg font-black text-white">{metric.value}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Cargo Manifest */}
            <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
                <h3 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2">
                    <Package className="w-6 h-6 text-blue-600" /> Manifiesto de Carga
                </h3>
                <div className="overflow-hidden rounded-2xl border border-slate-100">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50">
                            <tr>
                                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Código</th>
                                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Descripción</th>
                                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Cant.</th>
                                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Peso</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-sm font-medium text-slate-600">
                            <tr>
                                <td className="px-6 py-4 font-bold text-slate-800">EL-992-X</td>
                                <td className="px-6 py-4">Componentes Electrónicos (PCB)</td>
                                <td className="px-6 py-4">850 uds</td>
                                <td className="px-6 py-4 text-right">450 kg</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 font-bold text-slate-800">PK-110-A</td>
                                <td className="px-6 py-4">Material de Embalaje Industrial</td>
                                <td className="px-6 py-4">120 rollos</td>
                                <td className="px-6 py-4 text-right">1,200 kg</td>
                            </tr>
                            <tr className="bg-slate-50/50">
                                <td colSpan={3} className="px-6 py-4 font-black text-slate-800 text-right uppercase">Peso Total</td>
                                <td className="px-6 py-4 font-black text-blue-600 text-right">1,650 kg</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        {/* Right Column: Timeline & Docs */}
        <div className="space-y-6">
            
            {/* Timeline */}
            <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
                <h3 className="text-lg font-black text-slate-800 mb-6 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-slate-400" /> Línea de Tiempo
                </h3>
                <div className="space-y-8 relative">
                    <div className="absolute left-[19px] top-2 bottom-2 w-0.5 bg-slate-100"></div>
                    {[
                        { title: 'Salida de Puerto', date: 'Oct 12, 08:30 AM', loc: 'Shanghai, CN', status: 'done' },
                        { title: 'Carga en Buque', date: 'Oct 14, 14:15 PM', loc: 'Terminal 3', status: 'done' },
                        { title: 'Cruce Oceánico', date: 'En Progreso', loc: 'Océano Índico', status: 'current' },
                        { title: 'Llegada a Destino', date: 'Est. Oct 28', loc: 'Hamburg, DE', status: 'pending' },
                    ].map((step, idx) => (
                        <div key={idx} className="relative flex gap-4 group">
                            <div className={`w-10 h-10 rounded-full border-4 flex items-center justify-center shrink-0 z-10 transition-colors ${
                                step.status === 'done' ? 'bg-slate-800 border-slate-100 text-white' :
                                step.status === 'current' ? 'bg-blue-600 border-blue-100 text-white shadow-lg shadow-blue-200' :
                                'bg-white border-slate-200 text-slate-300'
                            }`}>
                                {step.status === 'done' ? <ShieldCheck className="w-4 h-4" /> : 
                                 step.status === 'current' ? <Navigation className="w-4 h-4 animate-pulse" /> :
                                 <Anchor className="w-4 h-4" />}
                            </div>
                            <div className="pt-1">
                                <p className={`text-sm font-black ${step.status === 'pending' ? 'text-slate-400' : 'text-slate-800'}`}>
                                    {step.title}
                                </p>
                                <p className="text-xs font-bold text-slate-400 mt-0.5">{step.date}</p>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-300 mt-1">{step.loc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Documents */}
            <div className="bg-slate-50 rounded-[2.5rem] p-8 border border-slate-100">
                <h3 className="text-lg font-black text-slate-800 mb-6 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-slate-400" /> Documentos
                </h3>
                <div className="space-y-3">
                    {[
                        { name: 'Bill of Lading', size: '2.4 MB' },
                        { name: 'Factura Comercial', size: '1.1 MB' },
                        { name: 'Lista de Empaque', size: '850 KB' },
                        { name: 'Certificado de Origen', size: '1.5 MB' },
                    ].map((doc, i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-200 hover:border-blue-200 hover:shadow-md transition-all group cursor-pointer">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-slate-100 text-slate-500 rounded-lg group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                                    <FileText className="w-4 h-4" />
                                </div>
                                <div>
                                    <p className="text-xs font-black text-slate-700 group-hover:text-blue-700">{doc.name}</p>
                                    <p className="text-[10px] font-bold text-slate-400">{doc.size}</p>
                                </div>
                            </div>
                            <Download className="w-4 h-4 text-slate-300 group-hover:text-blue-600" />
                        </div>
                    ))}
                </div>
                <button className="w-full mt-6 py-3 bg-slate-900 text-white rounded-xl text-xs font-black uppercase hover:bg-black transition-colors">
                    Descargar Todo (.zip)
                </button>
            </div>

        </div>

      </div>
    </div>
  );
};
