
import React, { useState } from 'react';
import { 
  MapPin, 
  Info, 
  ChevronRight, 
  ChevronLeft, 
  Check, 
  Loader2, 
  Box, 
  Weight, 
  Maximize, 
  AlertTriangle,
  Zap,
  Leaf,
  ThermometerSnowflake,
  Package,
  CreditCard,
  ArrowRight
} from 'lucide-react';
import { TRANSPORT_MODES, MAJOR_PORTS } from '../constants';

interface BookingProps {
  onCalculate: (bookingData: any) => void;
}

const CARGO_TYPES = [
  { id: 'general', label: 'General', icon: <Package className="w-5 h-5" /> },
  { id: 'hazardous', label: 'Peligrosa', icon: <AlertTriangle className="w-5 h-5" /> },
  { id: 'perishable', label: 'Perecedera', icon: <ThermometerSnowflake className="w-5 h-5" /> },
  { id: 'electronics', label: 'Electrónica', icon: <Zap className="w-5 h-5" /> },
  { id: 'fragile', label: 'Frágil', icon: <Box className="w-5 h-5" /> },
  { id: 'eco', label: 'Eco-Friendly', icon: <Leaf className="w-5 h-5" /> },
];

export const Booking: React.FC<BookingProps> = ({ onCalculate }) => {
  const [step, setStep] = useState(1);
  const [isCalculating, setIsCalculating] = useState(false);
  
  // Form State
  const [selectedMode, setSelectedMode] = useState('sea');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  
  const [cargoType, setCargoType] = useState('general');
  const [weight, setWeight] = useState('');
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [instructions, setInstructions] = useState('');

  const handleCalculate = () => {
    setIsCalculating(true);
    
    // Construct the booking object
    const bookingData = {
        id: `ORD-${Math.floor(Math.random() * 10000)}`,
        mode: selectedMode,
        origin,
        destination,
        cargoType,
        weight,
        dimensions: { length, width, height },
        instructions,
        date: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }),
        eta: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { day: 'numeric', month: 'short' }) // Mock ETA + 14 days
    };

    setTimeout(() => {
      setIsCalculating(false);
      onCalculate(bookingData); 
    }, 1500);
  };

  const nextStep = () => {
    if (step === 1 && (!origin || !destination)) {
      alert("Por favor seleccione origen y destino.");
      return;
    }
    setStep(prev => prev + 1);
  };

  const prevStep = () => setStep(prev => prev - 1);

  return (
    <div className="p-6 max-w-4xl mx-auto animate-in fade-in duration-500">
      <div className="mb-10">
        <h2 className="text-3xl font-extrabold text-slate-800 mb-2">Nueva Reserva de Envío</h2>
        <p className="text-slate-500 font-medium">Configure los detalles de su ruta y carga internacional.</p>
      </div>

      <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-2xl shadow-slate-200/40">
        {/* Step Indicator */}
        <div className="flex items-center justify-end gap-3 mb-12">
          {[
            { n: 1, label: 'Ruta' },
            { n: 2, label: 'Carga' },
            { n: 3, label: 'Resumen' }
          ].map((s) => (
            <React.Fragment key={s.n}>
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-black transition-all ${
                  step === s.n ? 'bg-blue-600 text-white ring-4 ring-blue-100' :
                  step > s.n ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-400'
                }`}>
                  {step > s.n ? <Check className="w-4 h-4" strokeWidth={3} /> : s.n}
                </div>
                <span className={`text-[10px] font-black uppercase tracking-widest ${step === s.n ? 'text-blue-600' : 'text-slate-400'}`}>
                  {s.label}
                </span>
              </div>
              {s.n < 3 && <div className="w-6 h-[1px] bg-slate-200"></div>}
            </React.Fragment>
          ))}
        </div>

        {/* STEP 1: ROUTE */}
        {step === 1 && (
          <div className="animate-in slide-in-from-right-4 duration-300">
            <div className="mb-12">
              <h4 className="text-lg font-black text-slate-800 mb-6 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
                Modo de Transporte
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {TRANSPORT_MODES.map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() => setSelectedMode(mode.id)}
                    className={`flex flex-col items-center justify-center p-8 rounded-[2rem] border-2 transition-all group ${
                      selectedMode === mode.id
                        ? 'border-blue-600 bg-blue-50/30 shadow-xl shadow-blue-100/50'
                        : 'border-slate-50 bg-slate-50/50 hover:border-blue-200 hover:bg-white'
                    }`}
                  >
                    <div className={`mb-4 w-16 h-16 rounded-2xl flex items-center justify-center transition-all ${
                      selectedMode === mode.id ? 'bg-blue-600 text-white shadow-lg' : 'bg-white text-slate-400 group-hover:text-blue-500 shadow-sm'
                    }`}>
                      {mode.icon}
                    </div>
                    <h5 className="font-black text-slate-800 mb-1">{mode.name}</h5>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{mode.time}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="space-y-3">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Puerto de Origen</label>
                <div className="relative group">
                  <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                  <select
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                    className="w-full bg-slate-50 border-none rounded-2xl py-4.5 pl-14 pr-6 text-sm font-bold focus:ring-4 focus:ring-blue-100 outline-none appearance-none transition-all cursor-pointer text-slate-700"
                  >
                    <option value="" disabled>Seleccione puerto de salida...</option>
                    {MAJOR_PORTS.map(port => (
                      <option key={port.id} value={port.id}>{port.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Puerto de Destino</label>
                <div className="relative group">
                  <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                  <select
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full bg-slate-50 border-none rounded-2xl py-4.5 pl-14 pr-6 text-sm font-bold focus:ring-4 focus:ring-blue-100 outline-none appearance-none transition-all cursor-pointer text-slate-700"
                  >
                    <option value="" disabled>Seleccione puerto de llegada...</option>
                    {MAJOR_PORTS.filter(p => p.id !== origin).map(port => (
                      <option key={port.id} value={port.id}>{port.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button onClick={nextStep} className="bg-slate-900 hover:bg-black text-white px-10 py-5 rounded-[1.5rem] font-black text-sm flex items-center gap-3 shadow-xl transition-all active:scale-95">
                CONTINUAR A CARGA <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: CARGO DETAILS */}
        {step === 2 && (
          <div className="animate-in slide-in-from-right-4 duration-300">
            <div className="mb-10">
              <h4 className="text-lg font-black text-slate-800 mb-6 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
                Detalles de la Carga
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {CARGO_TYPES.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setCargoType(type.id)}
                    className={`flex flex-col items-center p-4 rounded-2xl border-2 transition-all ${
                      cargoType === type.id 
                        ? 'border-blue-600 bg-blue-50 text-blue-600' 
                        : 'border-slate-50 bg-slate-50 text-slate-400 hover:border-slate-200'
                    }`}
                  >
                    {type.icon}
                    <span className="text-[10px] font-black uppercase mt-2">{type.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              <div className="space-y-3">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Peso Total (kg)</label>
                <div className="relative group">
                  <Weight className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                  <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="Ej: 500"
                    className="w-full bg-slate-50 border-none rounded-2xl py-4.5 pl-14 pr-6 text-sm font-bold focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                  />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Dimensiones (L x W x H cm)</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                    placeholder="L"
                    className="w-1/3 bg-slate-50 border-none rounded-2xl py-4.5 px-4 text-sm font-bold focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                  />
                  <input
                    type="number"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    placeholder="W"
                    className="w-1/3 bg-slate-50 border-none rounded-2xl py-4.5 px-4 text-sm font-bold focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                  />
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder="H"
                    className="w-1/3 bg-slate-50 border-none rounded-2xl py-4.5 px-4 text-sm font-bold focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-3 mb-12">
              <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Instrucciones Especiales</label>
              <textarea
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                placeholder="Ej: Mantener alejado de la humedad, no apilar..."
                rows={4}
                className="w-full bg-slate-50 border-none rounded-[1.5rem] p-6 text-sm font-bold focus:ring-4 focus:ring-blue-100 outline-none transition-all resize-none"
              />
            </div>

            <div className="flex justify-between">
              <button onClick={prevStep} className="text-slate-500 font-black text-sm flex items-center gap-2 px-6 py-4 rounded-2xl hover:bg-slate-50 transition-all">
                <ChevronLeft className="w-5 h-5" /> ATRÁS
              </button>
              <button onClick={nextStep} className="bg-slate-900 hover:bg-black text-white px-10 py-5 rounded-[1.5rem] font-black text-sm flex items-center gap-3 shadow-xl transition-all active:scale-95">
                REVISAR RESUMEN <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: SUMMARY */}
        {step === 3 && (
          <div className="animate-in slide-in-from-right-4 duration-300">
            <div className="mb-10">
              <h4 className="text-lg font-black text-slate-800 mb-6 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
                Resumen del Envío
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100 space-y-6">
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Ruta Seleccionada</p>
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-white rounded-xl shadow-sm">
                        <MapPin className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 font-black text-slate-800">
                          {MAJOR_PORTS.find(p => p.id === origin)?.name}
                          <ChevronRight className="w-4 h-4 text-slate-300" />
                          {MAJOR_PORTS.find(p => p.id === destination)?.name}
                        </div>
                        <p className="text-xs font-bold text-slate-400 mt-0.5 uppercase tracking-tighter">
                          Modo: {TRANSPORT_MODES.find(m => m.id === selectedMode)?.name}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-6 border-t border-slate-200/60">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Detalle de Carga</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                        <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Tipo</p>
                        <p className="text-sm font-black text-slate-800 uppercase">{cargoType}</p>
                      </div>
                      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                        <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Peso</p>
                        <p className="text-sm font-black text-slate-800">{weight || '0'} kg</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-8 bg-blue-600 text-white rounded-[2rem] shadow-xl shadow-blue-100 flex flex-col justify-between h-full">
                   <div>
                     <p className="text-[10px] font-black text-blue-200 uppercase tracking-widest mb-1">Costo Estimado</p>
                     <div className="flex items-baseline gap-1 mb-2">
                        <h5 className="text-4xl font-black">$3,420.00</h5>
                        <span className="text-sm font-bold text-blue-200">USD</span>
                     </div>
                     <p className="text-xs font-bold text-blue-100/60 mb-6">Sujeto a verificación final de dimensiones.</p>
                   </div>
                   
                   {/* Payment Section */}
                   <div className="bg-white/10 rounded-xl p-4 mb-6 backdrop-blur-sm border border-white/10">
                      <p className="text-[10px] font-black text-blue-200 uppercase tracking-widest mb-3">Método de Pago</p>
                      <div className="flex items-center justify-between">
                         <div className="flex items-center gap-3">
                             <div className="w-10 h-7 bg-white rounded flex items-center justify-center shadow-sm">
                                 <div className="flex -space-x-1">
                                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                                    <div className="w-2.5 h-2.5 rounded-full bg-orange-400/80"></div>
                                 </div>
                             </div>
                             <div>
                                 <p className="text-xs font-bold text-white">MasterCard Corp</p>
                                 <p className="text-[10px] font-medium text-blue-200">**** 8821</p>
                             </div>
                         </div>
                         <button className="text-[10px] font-bold text-white hover:text-blue-200 transition-colors uppercase tracking-wider">Cambiar</button>
                      </div>
                   </div>

                   <button 
                      onClick={handleCalculate}
                      disabled={isCalculating}
                      className="w-full py-4 bg-white text-blue-600 rounded-xl font-black text-sm flex items-center justify-center gap-2 hover:bg-blue-50 transition-all shadow-lg active:scale-95 disabled:opacity-50 mb-4"
                   >
                      {isCalculating ? (
                          <>
                              <Loader2 className="w-4 h-4 animate-spin" /> PROCESANDO...
                          </>
                      ) : (
                          <>
                              PAGAR Y CONFIRMAR <ArrowRight className="w-4 h-4" />
                          </>
                      )}
                   </button>

                   <div className="pt-4 border-t border-white/10 space-y-2">
                     <div className="flex justify-between text-xs font-bold">
                       <span className="text-blue-200">Tiempo Estimado</span>
                       <span>{TRANSPORT_MODES.find(m => m.id === selectedMode)?.time}</span>
                     </div>
                     <p className="text-[10px] font-bold text-blue-200 italic">
                       * Incluye seguro básico y tasas portuarias.
                     </p>
                   </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <button onClick={prevStep} className="text-slate-500 font-black text-sm flex items-center gap-2 px-6 py-4 rounded-2xl hover:bg-slate-50 transition-all">
                <ChevronLeft className="w-5 h-5" /> ATRÁS
              </button>
              {/* Payment button moved to card above */}
              <div></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
