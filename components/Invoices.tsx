
import React, { useState } from 'react';
import { 
  FileText, 
  Plus, 
  Search, 
  Filter, 
  Download, 
  CreditCard, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  MoreHorizontal,
  ArrowUpRight,
  DollarSign,
  Wallet,
  Calendar
} from 'lucide-react';

const MOCK_INVOICES = [
  { id: 'INV-2024-001', ref: '#CN-4921', date: '24 Oct, 2024', due: '30 Oct, 2024', amount: 2450.00, status: 'Pendiente' },
  { id: 'INV-2024-002', ref: '#US-1102', date: '20 Oct, 2024', due: '20 Oct, 2024', amount: 1250.50, status: 'Pagada' },
  { id: 'INV-2024-003', ref: '#MX-3321', date: '15 Oct, 2024', due: '18 Oct, 2024', amount: 850.00, status: 'Vencida' },
  { id: 'INV-2024-004', ref: '#BR-7721', date: '10 Oct, 2024', due: '10 Oct, 2024', amount: 3100.00, status: 'Pagada' },
  { id: 'INV-2024-005', ref: '#JP-1102', date: '28 Sep, 2024', due: '30 Sep, 2024', amount: 4200.00, status: 'Pagada' },
  { id: 'INV-2024-006', ref: '#DE-9921', date: '25 Sep, 2024', due: '05 Oct, 2024', amount: 1800.00, status: 'Vencida' },
];

export const Invoices: React.FC = () => {
  const [filter, setFilter] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const stats = {
    pending: MOCK_INVOICES.filter(i => i.status === 'Pendiente').reduce((acc, curr) => acc + curr.amount, 0),
    paid: MOCK_INVOICES.filter(i => i.status === 'Pagada').reduce((acc, curr) => acc + curr.amount, 0),
    overdue: MOCK_INVOICES.filter(i => i.status === 'Vencida').length
  };

  const filteredInvoices = MOCK_INVOICES.filter(inv => {
    const matchesSearch = inv.id.toLowerCase().includes(searchTerm.toLowerCase()) || inv.ref.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'Todos' || inv.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-6 lg:p-10 max-w-[1920px] mx-auto space-y-8 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight">Facturación</h2>
          <p className="text-slate-500 font-medium mt-1">Gestione sus pagos, descargue facturas y consulte su historial financiero.</p>
        </div>
        <button 
          onClick={() => setIsGenerating(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-black text-sm flex items-center gap-2 shadow-xl shadow-blue-100 transition-all active:scale-95"
        >
          <Plus className="w-5 h-5" /> GENERAR FACTURA
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm relative overflow-hidden group">
            <div className="absolute right-0 top-0 w-32 h-32 bg-orange-50 rounded-bl-[100%] transition-transform group-hover:scale-110"></div>
            <div className="relative z-10">
                <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mb-4">
                    <Clock className="w-6 h-6" />
                </div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Pendiente de Pago</p>
                <h3 className="text-3xl font-black text-slate-800 mt-1">${stats.pending.toLocaleString()}</h3>
                <p className="text-xs font-medium text-orange-600 mt-2 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> Requiere atención inmediata
                </p>
            </div>
        </div>

        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm relative overflow-hidden group">
            <div className="absolute right-0 top-0 w-32 h-32 bg-emerald-50 rounded-bl-[100%] transition-transform group-hover:scale-110"></div>
            <div className="relative z-10">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-6 h-6" />
                </div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total Pagado (Año)</p>
                <h3 className="text-3xl font-black text-slate-800 mt-1">${stats.paid.toLocaleString()}</h3>
                <p className="text-xs font-medium text-emerald-600 mt-2 flex items-center gap-1">
                    <ArrowUpRight className="w-3 h-3" /> +12% vs año anterior
                </p>
            </div>
        </div>

        <div className="bg-slate-900 p-6 rounded-[2rem] shadow-xl text-white relative overflow-hidden">
            <div className="absolute right-0 top-0 w-32 h-32 bg-white/5 rounded-bl-[100%]"></div>
            <div className="relative z-10">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-4">
                    <AlertCircle className="w-6 h-6" />
                </div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Facturas Vencidas</p>
                <h3 className="text-3xl font-black mt-1">{stats.overdue}</h3>
                <p className="text-xs font-medium text-slate-400 mt-2">
                   Por favor regularice su estado.
                </p>
            </div>
        </div>
      </div>

      {/* Filters & Actions */}
      <div className="bg-white p-2 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex p-1 bg-slate-50 rounded-xl w-full md:w-auto">
            {['Todos', 'Pagada', 'Pendiente', 'Vencida'].map((f) => (
                <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-6 py-2.5 rounded-lg text-xs font-black uppercase tracking-wide transition-all ${
                        filter === f 
                        ? 'bg-white text-slate-800 shadow-sm' 
                        : 'text-slate-400 hover:text-slate-600'
                    }`}
                >
                    {f}
                </button>
            ))}
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto px-2">
            <div className="relative flex-1 md:w-64">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                    type="text" 
                    placeholder="Buscar por ID o Referencia..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-slate-50 border-none rounded-xl py-3 pl-10 pr-4 text-sm font-bold focus:ring-2 focus:ring-blue-100 outline-none"
                />
            </div>
            <button className="p-3 bg-slate-50 text-slate-600 rounded-xl hover:bg-slate-100 transition-colors">
                <Filter className="w-5 h-5" />
            </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead className="bg-slate-50/50 border-b border-slate-100">
                    <tr>
                        <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Factura</th>
                        <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Referencia Envío</th>
                        <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Fechas</th>
                        <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Monto Total</th>
                        <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Estado</th>
                        <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Acciones</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {filteredInvoices.map((inv) => (
                        <tr key={inv.id} className="group hover:bg-slate-50/50 transition-colors">
                            <td className="px-8 py-6">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-slate-50 rounded-lg text-slate-400">
                                        <FileText className="w-4 h-4" />
                                    </div>
                                    <span className="font-black text-slate-700">{inv.id}</span>
                                </div>
                            </td>
                            <td className="px-8 py-6">
                                <span className="text-sm font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-lg">{inv.ref}</span>
                            </td>
                            <td className="px-8 py-6">
                                <div className="text-xs font-bold text-slate-700 flex items-center gap-2">
                                    <Calendar className="w-3 h-3 text-slate-400" /> {inv.date}
                                </div>
                                <div className="text-[10px] font-bold text-slate-400 uppercase mt-1 ml-5">
                                    Vence: {inv.due}
                                </div>
                            </td>
                            <td className="px-8 py-6">
                                <span className="text-sm font-black text-slate-800">${inv.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                            </td>
                            <td className="px-8 py-6 text-center">
                                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                                    inv.status === 'Pagada' ? 'bg-emerald-50 text-emerald-600' : 
                                    inv.status === 'Pendiente' ? 'bg-orange-50 text-orange-600' : 
                                    'bg-red-50 text-red-600'
                                }`}>
                                    {inv.status === 'Pagada' ? <CheckCircle2 className="w-3 h-3" /> : 
                                     inv.status === 'Pendiente' ? <Clock className="w-3 h-3" /> : 
                                     <AlertCircle className="w-3 h-3" />}
                                    {inv.status}
                                </span>
                            </td>
                            <td className="px-8 py-6 text-right">
                                <div className="flex items-center justify-end gap-2">
                                    {inv.status !== 'Pagada' && (
                                        <button className="flex items-center gap-2 px-3 py-2 bg-slate-900 text-white rounded-lg text-[10px] font-black uppercase hover:bg-black transition-colors">
                                            <CreditCard className="w-3 h-3" /> Pagar
                                        </button>
                                    )}
                                    <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Descargar PDF">
                                        <Download className="w-4 h-4" />
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
            {filteredInvoices.length === 0 && (
                <div className="p-12 text-center text-slate-400">
                    <p className="font-medium">No se encontraron facturas.</p>
                </div>
            )}
        </div>
      </div>

      {/* Generate Invoice Modal Overlay */}
      {isGenerating && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white p-8 rounded-[2rem] max-w-md w-full shadow-2xl space-y-6">
                <div className="text-center">
                    <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FileText className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-800">Generar Nueva Factura</h3>
                    <p className="text-slate-500 text-sm mt-2">Seleccione un envío para generar una factura pro-forma o fiscal.</p>
                </div>
                
                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">ID de Envío</label>
                        <select className="w-full bg-slate-50 border-none rounded-xl py-3 px-4 text-sm font-bold focus:ring-2 focus:ring-blue-100 outline-none">
                            <option>Seleccionar envío...</option>
                            <option>#CN-4921 (En Tránsito)</option>
                            <option>#MX-3321 (Entregado)</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Tipo de Factura</label>
                        <div className="grid grid-cols-2 gap-3">
                            <button className="py-3 border-2 border-blue-600 bg-blue-50 text-blue-700 rounded-xl text-xs font-black uppercase">Fiscal</button>
                            <button className="py-3 border-2 border-slate-100 bg-white text-slate-400 hover:border-slate-300 rounded-xl text-xs font-black uppercase">Pro-Forma</button>
                        </div>
                    </div>
                </div>

                <div className="flex gap-3 pt-4">
                    <button 
                        onClick={() => setIsGenerating(false)}
                        className="flex-1 py-3.5 bg-slate-100 text-slate-600 rounded-xl text-xs font-black uppercase hover:bg-slate-200 transition-colors"
                    >
                        Cancelar
                    </button>
                    <button 
                        onClick={() => {
                            alert("Factura generada y enviada a su correo.");
                            setIsGenerating(false);
                        }}
                        className="flex-1 py-3.5 bg-blue-600 text-white rounded-xl text-xs font-black uppercase hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
                    >
                        Generar
                    </button>
                </div>
            </div>
        </div>
      )}

    </div>
  );
};
