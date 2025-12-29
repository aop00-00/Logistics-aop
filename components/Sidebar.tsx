
import React from 'react';
import { LogOut } from 'lucide-react';
import { NAVIGATION_ITEMS } from '../constants';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (id: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  return (
    <aside className="hidden lg:flex flex-col w-72 bg-white border-r border-slate-200 h-screen sticky top-0 p-6">
      <div className="flex items-center gap-3 mb-10">
        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-100">
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <div>
          <h1 className="font-extrabold text-slate-800 text-base leading-tight">Logistics Corp</h1>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Freight Forwarder</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1.5">
        {NAVIGATION_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl transition-all group ${
              activeTab === item.id
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-100'
                : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className={`${activeTab === item.id ? 'text-white' : 'text-slate-400 group-hover:text-blue-500'}`}>
                {item.icon}
              </span>
              <span className="font-bold text-sm">{item.label}</span>
            </div>
            {item.badge && activeTab !== item.id && (
              <span className="bg-red-500 text-white text-[10px] font-black px-1.5 py-0.5 rounded-full">
                {item.badge}
              </span>
            )}
          </button>
        ))}
      </nav>

      <div className="pt-6 border-t border-slate-100">
        <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-[1.5rem] border border-slate-100">
          <img
            src="https://picsum.photos/seed/alex/100/100"
            alt="User"
            className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-black text-slate-800 truncate leading-none mb-1">Alex Morgan</p>
            <p className="text-[10px] font-bold text-slate-400 truncate uppercase">Logistics Manager</p>
          </div>
          <button className="text-slate-300 hover:text-red-500 transition-colors">
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </aside>
  );
};
