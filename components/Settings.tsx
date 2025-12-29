
import React, { useState } from 'react';
import {
  User,
  Bell,
  Shield,
  CreditCard,
  Building,
  Globe,
  Mail,
  Smartphone,
  Lock,
  LogOut,
  Camera,
  Check,
  Save,
  Loader2,
  Moon,
  Sun,
  Laptop
} from 'lucide-react';

export const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isLoading, setIsLoading] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    marketing: false
  });

  const handleSave = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  const tabs = [
    { id: 'profile', label: 'Mi Perfil', icon: <User className="w-5 h-5" /> },
    { id: 'company', label: 'Empresa', icon: <Building className="w-5 h-5" /> },
    { id: 'notifications', label: 'Notificaciones', icon: <Bell className="w-5 h-5" /> },
    { id: 'security', label: 'Seguridad', icon: <Shield className="w-5 h-5" /> },
    { id: 'billing', label: 'Facturación', icon: <CreditCard className="w-5 h-5" /> },
  ];

  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto animate-in fade-in duration-500">
      
      <div className="mb-8">
        <h2 className="text-3xl font-black text-slate-800 tracking-tight">Ajustes de Cuenta</h2>
        <p className="text-slate-500 font-medium mt-1">Gestione su perfil, preferencias y seguridad de la cuenta.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Sidebar Navigation */}
        <div className="lg:w-72 flex-shrink-0">
          <div className="bg-white rounded-[2rem] p-4 shadow-sm border border-slate-100 sticky top-24">
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all font-bold text-sm ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </nav>
            
            <div className="mt-8 pt-8 border-t border-slate-100 px-4 pb-2">
              <button className="flex items-center gap-3 text-red-500 font-bold text-sm hover:text-red-600 transition-colors w-full">
                <LogOut className="w-5 h-5" />
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 space-y-6">
          
          {/* PROFILE TAB */}
          {activeTab === 'profile' && (
            <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
              {/* Avatar Card */}
              <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 flex flex-col md:flex-row items-center gap-8">
                <div className="relative group">
                  <div className="w-32 h-32 rounded-full p-1 border-4 border-slate-50 bg-white shadow-inner">
                    <img 
                      src="https://picsum.photos/seed/alex/200/200" 
                      alt="Profile" 
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <button className="absolute bottom-2 right-2 p-2 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors">
                    <Camera className="w-4 h-4" />
                  </button>
                </div>
                <div className="text-center md:text-left flex-1">
                  <h3 className="text-2xl font-black text-slate-800">Alex Morgan</h3>
                  <p className="text-slate-400 font-bold text-sm uppercase tracking-wide mb-4">Logistics Manager</p>
                  <div className="flex flex-wrap justify-center md:justify-start gap-3">
                    <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold uppercase">Administrador</span>
                    <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-xs font-bold uppercase">Verificado</span>
                  </div>
                </div>
              </div>

              {/* Personal Info Form */}
              <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
                <h4 className="text-lg font-black text-slate-800 mb-6">Información Personal</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Nombre Completo</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input type="text" defaultValue="Alex Morgan" className="w-full bg-slate-50 border-none rounded-xl py-3.5 pl-12 pr-4 text-sm font-bold focus:ring-2 focus:ring-blue-100 outline-none" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Email Corporativo</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input type="email" defaultValue="alex.morgan@logisticscorp.com" className="w-full bg-slate-50 border-none rounded-xl py-3.5 pl-12 pr-4 text-sm font-bold focus:ring-2 focus:ring-blue-100 outline-none" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Teléfono</label>
                    <div className="relative">
                      <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input type="tel" defaultValue="+1 (555) 000-0000" className="w-full bg-slate-50 border-none rounded-xl py-3.5 pl-12 pr-4 text-sm font-bold focus:ring-2 focus:ring-blue-100 outline-none" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Idioma</label>
                    <div className="relative">
                      <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <select className="w-full bg-slate-50 border-none rounded-xl py-3.5 pl-12 pr-4 text-sm font-bold focus:ring-2 focus:ring-blue-100 outline-none appearance-none cursor-pointer">
                        <option>Español (ES)</option>
                        <option>English (US)</option>
                        <option>Deutsch (DE)</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* NOTIFICATIONS TAB */}
          {activeTab === 'notifications' && (
            <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
              <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
                <h4 className="text-lg font-black text-slate-800 mb-6">Preferencias de Contacto</h4>
                <div className="space-y-6">
                  {[
                    { key: 'email', label: 'Notificaciones por Email', desc: 'Reciba actualizaciones de envíos y facturas.', icon: <Mail className="w-5 h-5" /> },
                    { key: 'push', label: 'Notificaciones Push', desc: 'Alertas en tiempo real en su navegador.', icon: <Bell className="w-5 h-5" /> },
                    { key: 'sms', label: 'Mensajes SMS', desc: 'Para alertas críticas y códigos de seguridad.', icon: <Smartphone className="w-5 h-5" /> },
                    { key: 'marketing', label: 'Novedades y Ofertas', desc: 'Información sobre nuevas rutas y descuentos.', icon: <Globe className="w-5 h-5" /> }
                  ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between p-4 rounded-xl hover:bg-slate-50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                          {item.icon}
                        </div>
                        <div>
                          <p className="font-black text-slate-800 text-sm">{item.label}</p>
                          <p className="text-xs font-medium text-slate-400 mt-0.5">{item.desc}</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => setNotifications({ ...notifications, [item.key]: !notifications[item.key as keyof typeof notifications] })}
                        className={`relative w-14 h-8 rounded-full transition-colors ${notifications[item.key as keyof typeof notifications] ? 'bg-blue-600' : 'bg-slate-200'}`}
                      >
                        <div className={`absolute top-1 left-1 bg-white w-6 h-6 rounded-full shadow-sm transition-transform ${notifications[item.key as keyof typeof notifications] ? 'translate-x-6' : 'translate-x-0'}`}></div>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* SECURITY TAB */}
          {activeTab === 'security' && (
            <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
              <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
                <h4 className="text-lg font-black text-slate-800 mb-6">Contraseña y Autenticación</h4>
                
                <div className="space-y-6">
                  <div className="p-4 bg-orange-50 border border-orange-100 rounded-xl flex gap-4 items-start">
                    <div className="p-2 bg-white rounded-lg text-orange-500 shadow-sm">
                      <Shield className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-black text-orange-800">Recomendación de Seguridad</p>
                      <p className="text-xs font-medium text-orange-600/80 mt-1">
                        Su contraseña no ha sido cambiada en 3 meses. Le recomendamos actualizarla para mayor seguridad.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Nueva Contraseña</label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input type="password" placeholder="••••••••" className="w-full bg-slate-50 border-none rounded-xl py-3.5 pl-12 pr-4 text-sm font-bold focus:ring-2 focus:ring-blue-100 outline-none" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Confirmar Contraseña</label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input type="password" placeholder="••••••••" className="w-full bg-slate-50 border-none rounded-xl py-3.5 pl-12 pr-4 text-sm font-bold focus:ring-2 focus:ring-blue-100 outline-none" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-slate-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-black text-slate-800">Autenticación de Dos Factores (2FA)</p>
                        <p className="text-xs font-medium text-slate-400">Añade una capa extra de seguridad a tu cuenta.</p>
                      </div>
                      <button className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-xs font-black uppercase transition-colors">
                        Configurar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* COMPANY TAB */}
          {activeTab === 'company' && (
            <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
              <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
                <h4 className="text-lg font-black text-slate-800 mb-6">Datos de la Empresa</h4>
                <div className="grid grid-cols-1 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Nombre Legal</label>
                    <div className="relative">
                      <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input type="text" defaultValue="Logistics Corp International Ltd." className="w-full bg-slate-50 border-none rounded-xl py-3.5 pl-12 pr-4 text-sm font-bold focus:ring-2 focus:ring-blue-100 outline-none" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="space-y-2">
                        <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">ID Fiscal / VAT</label>
                        <div className="relative">
                          <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                          <input type="text" defaultValue="EU55920112" className="w-full bg-slate-50 border-none rounded-xl py-3.5 pl-12 pr-4 text-sm font-bold focus:ring-2 focus:ring-blue-100 outline-none" />
                        </div>
                     </div>
                     <div className="space-y-2">
                        <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Sitio Web</label>
                        <div className="relative">
                          <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                          <input type="url" defaultValue="https://logisticscorp.com" className="w-full bg-slate-50 border-none rounded-xl py-3.5 pl-12 pr-4 text-sm font-bold focus:ring-2 focus:ring-blue-100 outline-none" />
                        </div>
                     </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Dirección Fiscal</label>
                    <textarea 
                        className="w-full bg-slate-50 border-none rounded-xl p-4 text-sm font-bold focus:ring-2 focus:ring-blue-100 outline-none resize-none"
                        rows={3}
                        defaultValue="1234 Shipping Lane, Business District, Hamburg, Germany 20457"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* BILLING TAB */}
          {activeTab === 'billing' && (
            <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
               <div className="bg-slate-900 rounded-[2rem] p-8 text-white shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl -translate-y-32 translate-x-16"></div>
                    <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div>
                            <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-1">Método Principal</p>
                            <div className="flex items-center gap-3">
                                <CreditCard className="w-8 h-8 text-white" />
                                <div>
                                    <p className="text-xl font-black tracking-widest">•••• •••• •••• 4242</p>
                                    <p className="text-xs text-slate-400">Expira 12/25</p>
                                </div>
                            </div>
                        </div>
                        <button className="px-6 py-3 bg-white text-slate-900 rounded-xl text-xs font-black uppercase hover:bg-slate-200 transition-colors">
                            Editar Método
                        </button>
                    </div>
               </div>
               
               <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
                   <h4 className="text-lg font-black text-slate-800 mb-6">Historial Reciente</h4>
                   <div className="space-y-4">
                       {[1, 2, 3].map((i) => (
                           <div key={i} className="flex items-center justify-between p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">
                               <div className="flex items-center gap-4">
                                   <div className="p-3 bg-slate-100 rounded-lg text-slate-500">
                                       <CreditCard className="w-5 h-5" />
                                   </div>
                                   <div>
                                       <p className="font-black text-slate-800 text-sm">Pago de Factura #INV-2024-00{i}</p>
                                       <p className="text-xs text-slate-400">Oct {20 - i}, 2024</p>
                                   </div>
                               </div>
                               <p className="font-black text-slate-800">-$2,450.00</p>
                           </div>
                       ))}
                   </div>
               </div>
            </div>
          )}

          {/* Sticky Save Button */}
          <div className="sticky bottom-6 bg-white/80 backdrop-blur-md p-4 rounded-[1.5rem] border border-slate-100 shadow-lg flex justify-end gap-4 mt-6 z-20">
             <button className="px-6 py-3 bg-transparent hover:bg-slate-100 text-slate-500 rounded-xl text-sm font-bold transition-colors">
                 Cancelar
             </button>
             <button 
                onClick={handleSave}
                disabled={isLoading}
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-black flex items-center gap-2 shadow-lg shadow-blue-200 transition-all active:scale-95"
             >
                 {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                 {isLoading ? 'Guardando...' : 'Guardar Cambios'}
             </button>
          </div>

        </div>
      </div>
    </div>
  );
};
