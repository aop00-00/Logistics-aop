
import React from 'react';
import { 
  CheckCircle2, 
  MapPin, 
  Calendar, 
  Package, 
  ArrowRight, 
  Download, 
  Share2, 
  Ship, 
  Truck, 
  Plane,
  Box,
  FileText,
  Printer
} from 'lucide-react';
import { MAJOR_PORTS, TRANSPORT_MODES } from '../constants';

interface BookingConfirmationProps {
  data: any;
  onTrack: () => void;
  onBack: () => void;
}

export const BookingConfirmation: React.FC<BookingConfirmationProps> = ({ data, onTrack, onBack }) => {
  if (!data) return null;

  const originName = MAJOR_PORTS.find(p => p.id === data.origin)?.name || data.origin;
  const destName = MAJOR_PORTS.find(p => p.id === data.destination)?.name || data.destination;
  const modeInfo = TRANSPORT_MODES.find(m => m.id === data.mode);

  return (
    <div className="p-6 lg:p-10 max-w-5xl mx-auto animate-in zoom-in-95 duration-500">
      
      {/* Success Header */}
      <div className="text-center mb-10">
        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-emerald-50">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h2 className="text-3xl font-black text-slate-800 tracking-tight">¡Reserva Confirmada!</h2>
        <p className="text-slate-500 font-medium mt-2">
          Su orden <span className="text-slate-800 font-black">#{data.id}</span> ha sido generada exitosamente.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Details Card */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full -translate-y-32 translate-x-32 z-0"></div>
            
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">ID de Seguimiento</p>
                  <h3 className="text-2xl font-black text-blue-600">{data.id}</h3>
                </div>
                <div className="flex gap-2">
                  <button className="p-2.5 bg-slate-50 text-slate-600 rounded-xl hover:bg-slate-100 transition-colors">
                    <Printer className="w-5 h-5" />
                  </button>
                  <button className="p-2.5 bg-slate-50 text-slate-600 rounded-xl hover:bg-slate-100 transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Route Visual */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-slate-50/50 rounded-2xl p-6 border border-slate-100 mb-8">
                <div className="flex items-center gap-4 w-full md:w-auto">
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-slate-400">
                    <MapPin className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Origen</p>
                    <p className="font-black text-slate-800 leading-tight">{originName}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{data.date}</p>
                  </div>
                </div>

                <div className="flex-1 flex flex-col items-center px-4 w-full">
                   <div className="w-full h-0.5 bg-slate-200 relative">
                      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-100 px-2 text-slate-400">
                        {data.mode === 'sea' ? <Ship className="w-4 h-4" /> : data.mode === 'air' ? <Plane className="w-4 h-4" /> : <Truck className="w-4 h-4" />}
                      </div>
                   </div>
                   <p className="text-[10px] font-bold text-slate-400 mt-2 uppercase">{modeInfo?.time || 'Calculando ruta'}</p>
                </div>

                <div className="flex items-center gap-4 w-full md:w-auto justify-end">
                  <div className="text-right">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Destino</p>
                    <p className="font-black text-slate-800 leading-tight">{destName}</p>
                    <p className="text-xs text-slate-500 mt-0.5">Est. {data.eta}</p>
                  </div>
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-slate-400">
                    <MapPin className="w-6 h-6 text-emerald-600" />
                  </div>
                </div>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-slate-50 p-4 rounded-2xl">
                   <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Carga</p>
                   <div className="flex items-center gap-2">
                      <Package className="w-4 h-4 text-slate-600" />
                      <span className="font-black text-slate-800 capitalize">{data.cargoType}</span>
                   </div>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl">
                   <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Peso</p>
                   <div className="flex items-center gap-2">
                      <Box className="w-4 h-4 text-slate-600" />
                      <span className="font-black text-slate-800">{data.weight} kg</span>
                   </div>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl">
                   <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Servicio</p>
                   <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-slate-600" />
                      <span className="font-black text-slate-800">Standard</span>
                   </div>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl">
                   <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Incoterm</p>
                   <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-slate-600" />
                      <span className="font-black text-slate-800">FOB</span>
                   </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button 
              onClick={onBack}
              className="flex-1 py-4 bg-white border border-slate-200 text-slate-600 rounded-2xl text-sm font-black hover:bg-slate-50 transition-colors"
            >
              Volver al Inicio
            </button>
            <button 
              onClick={onTrack}
              className="flex-1 py-4 bg-slate-900 text-white rounded-2xl text-sm font-black hover:bg-black transition-colors flex items-center justify-center gap-2 shadow-xl"
            >
              Rastrear Envío <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Cost Summary Column */}
        <div className="space-y-6">
           <div className="bg-blue-600 text-white p-8 rounded-[2.5rem] shadow-xl shadow-blue-200 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-10 translate-x-10"></div>
              
              <h4 className="text-lg font-black mb-6">Resumen de Costos</h4>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-blue-100 text-sm font-medium">
                  <span>Flete Base</span>
                  <span>$3,200.00</span>
                </div>
                <div className="flex justify-between text-blue-100 text-sm font-medium">
                  <span>Recargo Combustible</span>
                  <span>$150.00</span>
                </div>
                <div className="flex justify-between text-blue-100 text-sm font-medium">
                  <span>Seguro</span>
                  <span>$70.00</span>
                </div>
                <div className="h-[1px] bg-white/20 my-2"></div>
                <div className="flex justify-between items-end">
                  <span className="text-blue-100 font-bold">Total Estimado</span>
                  <span className="text-3xl font-black text-white">$3,420.00</span>
                </div>
              </div>

              <button className="w-full py-3.5 bg-white text-blue-600 rounded-xl text-xs font-black uppercase hover:bg-blue-50 transition-colors flex items-center justify-center gap-2">
                <Download className="w-4 h-4" /> Descargar Factura Pro-forma
              </button>
           </div>

           <div className="bg-orange-50 p-6 rounded-[2rem] border border-orange-100">
              <div className="flex gap-4">
                 <div className="p-2 bg-white rounded-xl text-orange-500 h-fit shadow-sm">
                    <Calendar className="w-6 h-6" />
                 </div>
                 <div>
                    <h5 className="font-black text-slate-800 text-sm">Próximos Pasos</h5>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                       Un agente de LogisticsPro se pondrá en contacto en las próximas 2 horas para coordinar la recolección de la carga.
                    </p>
                 </div>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};
