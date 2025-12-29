
import React from 'react';
import { Check, Download, CreditCard, ChevronRight, FileText, Share2 } from 'lucide-react';

export const Tracking: React.FC = () => {
  const steps = [
    { title: 'Booking Confirmed', desc: 'Order #CN-4921 has been placed', time: 'Jan 12, 10:30 AM', done: true, current: false },
    { title: 'Picked Up', desc: 'Shanghai Main Port, Dock 4', time: 'Jan 14, 08:45 AM', done: true, current: false },
    { title: 'In Transit', desc: 'Vessel "MSC GULSUN" - East China Sea', time: 'In Progress', done: false, current: true },
    { title: 'Customs Clearance', desc: 'Port of Hamburg, Germany', time: 'Est. Jan 28', done: false, current: false },
    { title: 'Delivered', desc: 'Final Destination Warehouse', time: 'Est. Jan 30', done: false, current: false },
  ];

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-800">Shipment Details</h2>
          <p className="text-slate-500 flex items-center gap-2 mt-1">
            Tracking ID: <span className="font-bold text-slate-800">#CN-4921-2024</span>
            <button className="text-blue-600 p-1 hover:bg-blue-50 rounded-lg transition-colors"><Share2 className="w-4 h-4" /></button>
          </p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50">
            <FileText className="w-4 h-4" />
            Packing List
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-100 hover:bg-blue-700">
            <Download className="w-4 h-4" />
            Download Invoice
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Timeline */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
            <h3 className="text-xl font-bold text-slate-800 mb-8">Tracking History</h3>
            
            <div className="space-y-0">
              {steps.map((step, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border-4 ${
                      step.done ? 'bg-blue-600 border-blue-50 text-white' : 
                      step.current ? 'bg-white border-blue-600 text-blue-600 animate-pulse' :
                      'bg-slate-50 border-slate-100 text-slate-300'
                    }`}>
                      {step.done ? <Check className="w-5 h-5" /> : idx + 1}
                    </div>
                    {idx < steps.length - 1 && (
                      <div className={`w-[2px] h-16 ${step.done ? 'bg-blue-600' : 'bg-slate-100'}`}></div>
                    )}
                  </div>
                  <div className="flex-1 pb-10">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className={`font-bold ${step.done || step.current ? 'text-slate-800' : 'text-slate-400'}`}>
                        {step.title}
                      </h4>
                      <span className="text-[10px] font-bold text-slate-400 uppercase">{step.time}</span>
                    </div>
                    <p className="text-sm text-slate-500">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Financials & Payment */}
        <div className="space-y-6">
          <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-xl shadow-slate-200 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 blur-3xl rounded-full -translate-y-12 translate-x-12"></div>
            
            <h3 className="text-xl font-bold mb-6">Financial Summary</h3>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-slate-400 text-sm">
                <span>Freight Charges</span>
                <span className="text-white font-bold">$2,450.00</span>
              </div>
              <div className="flex justify-between text-slate-400 text-sm">
                <span>Insurance (Cargo)</span>
                <span className="text-white font-bold">$125.00</span>
              </div>
              <div className="flex justify-between text-slate-400 text-sm">
                <span>Export Taxes</span>
                <span className="text-white font-bold">$42.50</span>
              </div>
              <div className="h-[1px] bg-slate-800 my-2"></div>
              <div className="flex justify-between items-end">
                <span className="text-slate-400 font-medium">Total Amount</span>
                <span className="text-3xl font-extrabold text-blue-400">$2,617.50</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl p-4">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                  <CreditCard className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-slate-400">Payment Status</p>
                  <p className="text-sm font-bold text-orange-400">Awaiting Payment</p>
                </div>
              </div>

              <button className="w-full bg-blue-600 hover:bg-blue-500 py-4 rounded-2xl font-extrabold text-lg flex items-center justify-center gap-2 group transition-all">
                Pay Now
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="flex justify-center gap-4 mt-6 opacity-30">
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="Paypal" className="h-5" />
            </div>
          </div>

          <div className="bg-blue-50 rounded-[2rem] p-6 border border-blue-100">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shrink-0">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-800 mb-1">Electronic Invoicing</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Your billing documents are generated automatically upon vessel departure.
                </p>
                <button className="text-blue-600 text-xs font-bold mt-2 hover:underline">Setup Auto-Pay</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
