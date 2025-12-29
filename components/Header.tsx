
import React from 'react';
import { Search, Bell, HelpCircle, Maximize } from 'lucide-react';

export const Header: React.FC<{ title: string }> = ({ title }) => {
  return (
    <header className="bg-white/90 backdrop-blur-xl border-b border-slate-200 sticky top-0 z-30 px-8 py-5">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <h2 className="text-2xl font-black text-slate-800 tracking-tight">{title}</h2>
        
        <div className="flex-1 max-w-xl mx-12">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
            <input
              type="text"
              placeholder="Enter Tracking ID..."
              className="w-full bg-slate-50 border-none rounded-2xl py-3.5 pl-12 pr-12 text-sm font-bold focus:ring-4 focus:ring-blue-100 transition-all outline-none"
            />
            <button className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500 transition-colors">
              <Maximize className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="p-3 text-slate-400 hover:bg-slate-50 hover:text-blue-600 rounded-2xl relative transition-all group">
            <Bell className="w-5.5 h-5.5" />
            <span className="absolute top-3.5 right-3.5 w-2 h-2 bg-red-500 border-2 border-white rounded-full"></span>
          </button>
          <button className="p-3 text-slate-400 hover:bg-slate-50 hover:text-blue-600 rounded-2xl transition-all">
            <HelpCircle className="w-5.5 h-5.5" />
          </button>
          <div className="h-10 w-[1px] bg-slate-100 mx-3"></div>
          <div className="flex items-center gap-3 pl-2 cursor-pointer group">
            <img
              src="https://picsum.photos/seed/user/100/100"
              alt="Profile"
              className="w-10 h-10 rounded-2xl ring-4 ring-blue-50 transition-all group-hover:ring-blue-100"
            />
          </div>
        </div>
      </div>
    </header>
  );
};
