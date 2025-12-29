
import React from 'react';
import { LogOut, Sparkles } from 'lucide-react';
import { NAVIGATION_ITEMS } from '../constants';
import { useAuth } from '../contexts/AuthContext';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (id: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const { profile, signOut } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error signing out", error);
    }
  };

  const fullName = profile?.first_name 
    ? `${profile.first_name} ${profile.last_name || ''}`
    : 'User';

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

      {/* Credits / Plan Info */}
      <div className="mb-6 px-4">
        <div className="bg-slate-900 rounded-2xl p-4 text-white relative overflow-hidden">
             <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/20 rounded-full blur-xl -translate-y-5 translate-x-5"></div>
             <div className="relative z-10">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Plan Actual</span>
                    {profile?.is_pro ? (
                        <span className="px-2 py-0.5 bg-gradient-to-r from-amber-200 to-yellow-400 text-yellow-900 rounded-lg text-[10px] font-black flex items-center gap-1">
                            <Sparkles className="w-3 h-3" /> PRO
                        </span>
                    ) : (
                        <span className="px-2 py-0.5 bg-slate-700 text-slate-300 rounded-lg text-[10px] font-black">
                            FREE
                        </span>
                    )}
                </div>
                <div className="flex items-end gap-1 mb-1">
                    <span className="text-2xl font-black">{profile?.credits || 0}</span>
                    <span className="text-xs font-medium text-slate-400 mb-1">créditos</span>
                </div>
                <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 w-3/4"></div>
                </div>
             </div>
        </div>
      </div>

      <div className="pt-6 border-t border-slate-100">
        <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-[1.5rem] border border-slate-100">
          <img
            src={`https://ui-avatars.com/api/?name=${fullName}&background=2563eb&color=fff`}
            alt="User"
            className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-black text-slate-800 truncate leading-none mb-1">{fullName}</p>
            <p className="text-[10px] font-bold text-slate-400 truncate uppercase">{profile?.email}</p>
          </div>
          <button 
            onClick={handleLogout} 
            className="text-slate-300 hover:text-red-500 transition-colors"
            title="Sign Out"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </aside>
  );
};
