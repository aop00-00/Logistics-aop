
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Minus, 
  Navigation2, 
  Ship, 
  Search, 
  MapPin, 
  ExternalLink,
  Loader2,
  Box,
  Thermometer,
  Activity,
  Filter,
  Maximize2,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  FileText,
  AlertTriangle,
  Clock,
  DollarSign,
  PieChart,
  BarChart3,
  Zap,
  ShieldAlert,
  Truck
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

// --- Types & Interfaces ---

interface MapSearchResult {
  text: string;
  links: { title?: string; uri?: string }[];
}

// --- Mock Data ---

const STATS = [
  { label: 'Total Shipments', value: '1,248', change: '+12.5%', trend: 'up', icon: <Box className="w-5 h-5" /> },
  { label: 'Active Weight', value: '4,820t', change: '+5.2%', trend: 'up', icon: <Navigation2 className="w-5 h-5" /> },
  { label: 'On-Time Delivery', value: '98.2%', change: '-0.4%', trend: 'down', icon: <Clock className="w-5 h-5" /> },
  { label: 'Monthly Revenue', value: '$4.2M', change: '+8.1%', trend: 'up', icon: <DollarSign className="w-5 h-5" /> },
];

const ALERTS = [
  { id: 1, type: 'warning', text: 'Port Congestion: Shanghai Terminal 3 delay expected (+4h).', time: '10m ago' },
  { id: 2, type: 'success', text: 'Customs Cleared: Shipment #CN-4921 released by DE authorities.', time: '32m ago' },
  { id: 3, type: 'info', text: 'Vessel Departure: MSC GULSUN left Ningbo on schedule.', time: '1h ago' },
];

const REVENUE_DATA = [
  { month: 'May', value: 45000, label: '$45k' },
  { month: 'Jun', value: 68000, label: '$68k' },
  { month: 'Jul', value: 52000, label: '$52k' },
  { month: 'Aug', value: 78000, label: '$78k' },
  { month: 'Sep', value: 64000, label: '$64k' },
  { month: 'Oct', value: 95000, label: '$95k' },
];

const VESSELS = [
  { 
    id: 'MSK-9928-X', 
    name: 'MSC GULSUN', 
    cargo: 'Electronics - Heading East', 
    progress: 75, 
    eta: 'Oct 28, 2024', 
    loadDate: 'Oct 12, 2024',
    origin: 'Shanghai, CN',
    destination: 'Hamburg, DE',
    coords: { x: 65, y: 45 }, 
    manifest: [
      { item: 'Lithium-Ion Batteries', qty: '450 units', weight: '2.4t' },
      { item: 'OLED Display Panels', qty: '1,200 units', weight: '1.8t' }
    ],
    temp: '22°C',
    humidity: '45%'
  },
  { 
    id: 'MAERSK-122', 
    name: 'MAERSK SEOUL', 
    cargo: 'Textiles - Deep Sea', 
    progress: 30, 
    eta: 'Nov 05, 2024', 
    loadDate: 'Oct 18, 2024',
    origin: 'Ningbo, CN',
    destination: 'Los Angeles, US',
    coords: { x: 25, y: 60 },
    manifest: [
      { item: 'Cotton Fabrics', qty: '80 rolls', weight: '4.2t' }
    ],
    temp: '18°C',
    humidity: '50%'
  },
];

const MOCK_HISTORY = [
  { id: '#CN-4921', status: 'In Transit', origin: 'Shanghai, CN', dest: 'Hamburg, DE', date: 'Oct 24', weight: '2,400kg', mode: 'Sea' },
  { id: '#US-9921', status: 'Customs', origin: 'New York, US', dest: 'London, UK', date: 'Oct 22', weight: '850kg', mode: 'Air' },
  { id: '#JP-1102', status: 'Pending', origin: 'Tokyo, JP', dest: 'Seattle, US', date: 'Oct 20', weight: '1,200kg', mode: 'Sea' },
  { id: '#MX-3321', status: 'Delivered', origin: 'Veracruz, MX', dest: 'Miami, US', date: 'Oct 18', weight: '500kg', mode: 'Land' },
  { id: '#BR-7721', status: 'In Transit', origin: 'Santos, BR', dest: 'Lisbon, PT', date: 'Oct 15', weight: '3,100kg', mode: 'Sea' },
];

export const Dashboard: React.FC = () => {
  const [selectedVessel, setSelectedVessel] = useState(VESSELS[0]);
  const [isDetailView, setIsDetailView] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState<MapSearchResult | null>(null);
  const [aiReport, setAiReport] = useState<string | null>(null);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  
  // Map Navigation State
  const [mapTransform, setMapTransform] = useState({ x: 0, y: 0, scale: 1 });
  const [isPanning, setIsPanning] = useState(false);
  const lastMousePos = useRef({ x: 0, y: 0 });
  const mapContainerRef = useRef<HTMLDivElement>(null);

  // --- Handlers ---

  const handleMapSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Información sobre el puerto o terminal: ${searchQuery}.`,
        config: { tools: [{ googleMaps: {} }] },
      });
      const links = response.candidates?.[0]?.groundingMetadata?.groundingChunks
        ?.map((chunk: any) => chunk.maps).filter(Boolean) || [];
      setSearchResult({ text: response.text || "Found.", links });
    } catch (e) { console.error(e); } finally { setIsSearching(false); }
  };

  const generateLogisticsReport = async () => {
    setIsGeneratingReport(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Generate a short technical status report for the vessel ${selectedVessel.name}. Cargo: ${selectedVessel.cargo}.`,
      });
      setAiReport(response.text || "Operaciones normales.");
    } catch (e) { setAiReport("En tránsito según lo programado."); } finally { setIsGeneratingReport(false); }
  };

  // Map Controls
  const handleZoom = (delta: number) => {
    setMapTransform(prev => ({
      ...prev,
      scale: Math.min(Math.max(prev.scale + delta, 0.5), 4)
    }));
  };

  const centerOnVessel = (vessel: typeof VESSELS[0]) => {
    if (!mapContainerRef.current) return;
    const { width, height } = mapContainerRef.current.getBoundingClientRect();
    const targetX = (width / 2) - (vessel.coords.x / 100 * width * mapTransform.scale);
    const targetY = (height / 2) - (vessel.coords.y / 100 * height * mapTransform.scale);
    setMapTransform(prev => ({ ...prev, x: targetX, y: targetY }));
    setSelectedVessel(vessel);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsPanning(true);
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isPanning) return;
    const dx = e.clientX - lastMousePos.current.x;
    const dy = e.clientY - lastMousePos.current.y;
    setMapTransform(prev => ({ ...prev, x: prev.x + dx, y: prev.y + dy }));
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => setIsPanning(false);
  const handleWheel = (e: React.WheelEvent) => handleZoom(e.deltaY > 0 ? -0.1 : 0.1);

  // --- Render Functions ---

  const renderSimpleBarChart = () => {
    const maxVal = Math.max(...REVENUE_DATA.map(d => d.value));
    return (
      <div className="flex items-end justify-between h-32 gap-2 mt-4">
        {REVENUE_DATA.map((d, i) => (
          <div key={i} className="flex flex-col items-center gap-2 group w-full">
            <div 
              className="w-full bg-blue-100 rounded-t-lg group-hover:bg-blue-600 transition-all relative overflow-hidden" 
              style={{ height: `${(d.value / maxVal) * 100}%` }}
            >
              <div className="absolute inset-x-0 bottom-0 h-1 bg-blue-300 group-hover:bg-blue-400"></div>
            </div>
            <span className="text-[10px] font-bold text-slate-400 uppercase">{d.month}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="p-6 lg:p-10 max-w-[1920px] mx-auto space-y-8 animate-in fade-in duration-500">
      
      {/* 1. Header & Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {STATS.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-lg transition-all group">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-slate-50 rounded-2xl text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                {stat.icon}
              </div>
              <div className={`flex items-center gap-1 text-xs font-black px-2 py-1 rounded-full ${stat.trend === 'up' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                {stat.trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {stat.change}
              </div>
            </div>
            <h3 className="text-3xl font-black text-slate-800 tracking-tight">{stat.value}</h3>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* 2. Main Grid Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: Operations & Map */}
        <div className="xl:col-span-2 space-y-8">
          
          {/* Global Live Operations Map */}
          <div className="bg-white rounded-[2.5rem] p-2 shadow-xl border border-slate-100 overflow-hidden relative">
            <div className="absolute top-8 left-8 z-10 flex flex-col gap-2">
              <h3 className="text-2xl font-black text-slate-800 tracking-tight">Live Operations</h3>
              <div className="flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                </span>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{VESSELS.length} Active Vessels</p>
              </div>
            </div>

            <div 
              ref={mapContainerRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onWheel={handleWheel}
              className="relative w-full h-[500px] bg-[#f1f5f9] rounded-[2rem] overflow-hidden cursor-grab active:cursor-grabbing border border-slate-100"
            >
              {/* Map Controls */}
              <div className="absolute top-8 right-8 z-30 flex flex-col gap-2">
                <button onClick={(e) => { e.stopPropagation(); handleZoom(0.2); }} className="p-3 bg-white text-slate-800 rounded-2xl shadow-xl hover:bg-slate-50"><Plus className="w-5 h-5" /></button>
                <button onClick={(e) => { e.stopPropagation(); handleZoom(-0.2); }} className="p-3 bg-white text-slate-800 rounded-2xl shadow-xl hover:bg-slate-50"><Minus className="w-5 h-5" /></button>
                <button onClick={(e) => { e.stopPropagation(); centerOnVessel(selectedVessel); }} className="p-3 bg-blue-600 text-white rounded-2xl shadow-xl hover:bg-blue-700 mt-2"><Maximize2 className="w-5 h-5" /></button>
              </div>

              {/* Map Content */}
              <div 
                style={{ 
                  transform: `translate(${mapTransform.x}px, ${mapTransform.y}px) scale(${mapTransform.scale})`,
                  transformOrigin: '0 0',
                  transition: isPanning ? 'none' : 'transform 0.5s cubic-bezier(0.2, 1, 0.3, 1)'
                }}
                className="absolute inset-0 w-full h-full"
              >
                <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
                <svg className="absolute inset-0 w-full h-full opacity-40 pointer-events-none" viewBox="0 0 1000 500">
                  <path d="M50,150 Q150,50 300,150 T500,200 T700,100 T950,250" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="10 5" />
                </svg>
                {VESSELS.map((v) => (
                  <button 
                    key={v.id} 
                    onClick={(e) => { e.stopPropagation(); setSelectedVessel(v); }} 
                    className="absolute transition-all transform hover:scale-110 z-20 group" 
                    style={{ left: `${v.coords.x}%`, top: `${v.coords.y}%` }}
                  >
                    <div className={`p-3 rounded-2xl shadow-xl transition-all ${selectedVessel.id === v.id ? 'bg-blue-600 text-white scale-125 ring-8 ring-blue-500/20' : 'bg-white text-slate-400 group-hover:text-blue-500'}`}>
                      <Ship className="w-5 h-5" />
                    </div>
                    {/* Tooltip on Hover */}
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-slate-800 text-white px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-wide opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                      {v.name}
                    </div>
                  </button>
                ))}
              </div>
              
              {/* Overlay Search */}
              <div className="absolute bottom-8 left-8 right-8 z-30 pointer-events-none">
                 <div className="pointer-events-auto bg-white/90 backdrop-blur-md p-4 rounded-[2rem] shadow-2xl border border-white flex gap-4 items-center max-w-xl mx-auto">
                    <Search className="w-5 h-5 text-slate-400 ml-2" />
                    <input 
                      type="text" 
                      placeholder="Search port intelligence..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleMapSearch(e)}
                      className="bg-transparent border-none outline-none text-sm font-bold text-slate-700 w-full"
                    />
                    {isSearching && <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />}
                 </div>
              </div>
            </div>

            {/* Selected Vessel Info Bar */}
            <div className="px-8 py-6 flex items-center justify-between border-t border-slate-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                  <Ship className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-black text-slate-800">{selectedVessel.name}</h4>
                  <p className="text-xs font-bold text-slate-400 uppercase">{selectedVessel.cargo}</p>
                </div>
              </div>
              <div className="hidden sm:flex gap-8">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Origin</p>
                  <p className="font-bold text-slate-800">{selectedVessel.origin}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Destination</p>
                  <p className="font-bold text-slate-800">{selectedVessel.destination}</p>
                </div>
                <div>
                   <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">ETA</p>
                   <p className="font-bold text-blue-600">{selectedVessel.eta}</p>
                </div>
              </div>
              <button 
                onClick={() => generateLogisticsReport()}
                className="px-6 py-3 bg-slate-900 text-white rounded-xl text-xs font-black hover:bg-black transition-colors"
              >
                {isGeneratingReport ? 'Analyzing...' : 'AI Report'}
              </button>
            </div>
          </div>

          {/* Table & Revenue Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             {/* Revenue Chart */}
             <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
               <div className="flex justify-between items-center mb-2">
                 <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
                   <BarChart3 className="w-5 h-5 text-blue-600" /> Revenue
                 </h3>
                 <button className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-colors">View Report</button>
               </div>
               <p className="text-sm font-medium text-slate-400 mb-6">Gross shipping revenue (last 6 months)</p>
               {renderSimpleBarChart()}
             </div>

             {/* Recent Orders List */}
             <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col">
               <div className="flex justify-between items-center mb-6">
                 <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
                   <Activity className="w-5 h-5 text-emerald-500" /> Recent
                 </h3>
                 <Filter className="w-5 h-5 text-slate-300 cursor-pointer hover:text-slate-500" />
               </div>
               <div className="flex-1 overflow-auto no-scrollbar space-y-4">
                 {MOCK_HISTORY.slice(0, 4).map((h) => (
                   <div key={h.id} className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100 group">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-xl ${h.mode === 'Sea' ? 'bg-blue-100 text-blue-600' : h.mode === 'Air' ? 'bg-orange-100 text-orange-600' : 'bg-emerald-100 text-emerald-600'}`}>
                           {h.mode === 'Sea' ? <Ship className="w-4 h-4" /> : h.mode === 'Air' ? <Zap className="w-4 h-4" /> : <Truck className="w-4 h-4" />}
                        </div>
                        <div>
                          <p className="text-sm font-black text-slate-800">{h.id}</p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase">{h.origin} → {h.dest}</p>
                        </div>
                      </div>
                      <div className="text-right">
                         <span className={`px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${
                           h.status === 'In Transit' ? 'bg-blue-50 text-blue-600' :
                           h.status === 'Delivered' ? 'bg-emerald-50 text-emerald-600' :
                           'bg-amber-50 text-amber-600'
                         }`}>
                           {h.status}
                         </span>
                      </div>
                   </div>
                 ))}
               </div>
               <button className="w-full mt-4 py-3 text-xs font-black text-slate-400 hover:text-slate-600 border-t border-slate-100 uppercase tracking-widest">
                 View All Shipments
               </button>
             </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Command Center */}
        <div className="space-y-8">
          
          {/* Quick Actions Grid */}
          <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl">
             <h3 className="text-lg font-black mb-6 flex items-center gap-2">Quick Actions</h3>
             <div className="grid grid-cols-2 gap-4">
               {[
                 { label: 'New Booking', icon: <Plus className="w-5 h-5" />, color: 'bg-blue-600 hover:bg-blue-500' },
                 { label: 'Get Invoice', icon: <FileText className="w-5 h-5" />, color: 'bg-white/10 hover:bg-white/20' },
                 { label: 'Track ID', icon: <Search className="w-5 h-5" />, color: 'bg-white/10 hover:bg-white/20' },
                 { label: 'Support', icon: <ShieldAlert className="w-5 h-5" />, color: 'bg-white/10 hover:bg-white/20' }
               ].map((action, i) => (
                 <button key={i} className={`flex flex-col items-center justify-center p-4 rounded-2xl gap-2 transition-all active:scale-95 ${action.color}`}>
                   {action.icon}
                   <span className="text-[10px] font-bold uppercase text-center">{action.label}</span>
                 </button>
               ))}
             </div>
          </div>

          {/* Mode Distribution Donut */}
          <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
            <h3 className="text-lg font-black text-slate-800 mb-6 flex items-center gap-2">
               <PieChart className="w-5 h-5 text-purple-500" /> Fleet Mix
            </h3>
            <div className="flex items-center justify-center relative py-4">
              {/* Simple CSS/SVG Donut simulation */}
              <svg viewBox="0 0 100 100" className="w-48 h-48 -rotate-90">
                 <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f1f5f9" strokeWidth="12" />
                 {/* Segments: Sea 45%, Air 30%, Land 25% */}
                 <circle cx="50" cy="50" r="40" fill="transparent" stroke="#2563eb" strokeWidth="12" strokeDasharray="113 251" /> 
                 <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f59e0b" strokeWidth="12" strokeDasharray="75 251" strokeDashoffset="-113" />
                 <circle cx="50" cy="50" r="40" fill="transparent" stroke="#10b981" strokeWidth="12" strokeDasharray="63 251" strokeDashoffset="-188" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                 <span className="text-3xl font-black text-slate-800">1.2k</span>
                 <span className="text-[10px] font-bold text-slate-400 uppercase">Total Units</span>
              </div>
            </div>
            <div className="flex justify-center gap-4 mt-4">
              <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-blue-600"></div><span className="text-xs font-bold text-slate-600">Sea</span></div>
              <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-orange-500"></div><span className="text-xs font-bold text-slate-600">Air</span></div>
              <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-emerald-500"></div><span className="text-xs font-bold text-slate-600">Land</span></div>
            </div>
          </div>

          {/* Live Alerts Feed */}
          <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
            <h3 className="text-lg font-black text-slate-800 mb-6 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-500" /> Live Alerts
            </h3>
            <div className="space-y-4">
               {ALERTS.map((alert) => (
                 <div key={alert.id} className="flex gap-3 items-start pb-4 border-b border-slate-50 last:border-0 last:pb-0">
                    <div className={`mt-0.5 w-2 h-2 rounded-full shrink-0 ${alert.type === 'warning' ? 'bg-orange-500' : alert.type === 'success' ? 'bg-emerald-500' : 'bg-blue-500'}`}></div>
                    <div>
                      <p className="text-xs font-bold text-slate-700 leading-relaxed">{alert.text}</p>
                      <p className="text-[10px] font-bold text-slate-400 mt-1">{alert.time}</p>
                    </div>
                 </div>
               ))}
            </div>
          </div>

          {/* AI Insight Card (If Report Generated) */}
          {aiReport && (
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2.5rem] p-8 text-white shadow-xl animate-in slide-in-from-right">
              <h3 className="text-lg font-black mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-300 fill-current" /> AI Insight
              </h3>
              <p className="text-sm font-medium leading-relaxed opacity-90 italic">"{aiReport}"</p>
            </div>
          )}

        </div>
      </div>
      
      {/* 3. Search Result Modal/Overlay (If searching) */}
      {searchResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white p-8 rounded-[2rem] max-w-lg w-full shadow-2xl space-y-4">
            <h3 className="text-xl font-black text-slate-800">Location Intelligence</h3>
            <p className="text-sm text-slate-600">{searchResult.text}</p>
            <div className="flex flex-wrap gap-2">
              {searchResult.links.map((l, i) => (
                <a key={i} href={l.uri} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-xl text-xs font-bold text-blue-600 hover:bg-blue-50">
                  <ExternalLink className="w-3 h-3" /> {l.title || 'View Map'}
                </a>
              ))}
            </div>
            <button 
              onClick={() => setSearchResult(null)}
              className="w-full py-3 bg-slate-100 hover:bg-slate-200 rounded-xl text-sm font-black text-slate-700 transition-colors"
            >
              Close Intelligence
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
