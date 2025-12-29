
import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Mail, Lock, User, ArrowRight, Truck, LayoutDashboard, Loader2, AlertCircle } from 'lucide-react';

export const Login: React.FC = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    if (!email || !password) return;
    
    setIsLoading(true);

    try {
      if (isRegistering) {
        // Sign Up
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              first_name: firstName,
              last_name: lastName
            }
          }
        });

        if (error) throw error;
        // Supabase handles session automatically on success
        
      } else {
        // Sign In
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        
        if (error) throw error;
      }
    } catch (error: any) {
      console.error(error);
      setErrorMsg(error.message || "An error occurred during authentication.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-slate-900 relative overflow-hidden items-center justify-center p-12">
        <div className="absolute inset-0 bg-blue-600/20 z-10"></div>
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        
        {/* Animated background shapes */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow" style={{ animationDelay: '1s' }}></div>

        <div className="relative z-20 max-w-lg text-white space-y-8">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-900/50 mb-8">
            <Truck className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-5xl font-black tracking-tight leading-tight">
            Gestión Logística Global Simplificada
          </h1>
          <p className="text-slate-300 text-lg leading-relaxed font-medium">
            Únase a más de 10,000 empresas que confían en LogisticsPro para el seguimiento en tiempo real, reservas automatizadas y gestión financiera de carga.
          </p>
          
          <div className="grid grid-cols-2 gap-4 pt-8">
            <div className="p-4 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10">
              <div className="text-2xl font-black text-blue-400 mb-1">98%</div>
              <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Entregas a Tiempo</div>
            </div>
            <div className="p-4 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10">
              <div className="text-2xl font-black text-emerald-400 mb-1">24/7</div>
              <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Soporte Global</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 animate-in slide-in-from-right-8 duration-700">
        <div className="w-full max-w-md space-y-10">
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-black text-slate-800 mb-2">
              {isRegistering ? 'Crear Cuenta' : 'Bienvenido de nuevo'}
            </h2>
            <p className="text-slate-500 font-medium">
              {isRegistering 
                ? 'Ingrese sus datos para comenzar a gestionar envíos.' 
                : 'Ingrese sus credenciales para acceder al dashboard.'}
            </p>
          </div>

          {errorMsg && (
            <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-xl flex items-start gap-3">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <p className="text-sm font-bold">{errorMsg}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {isRegistering && (
              <div className="grid grid-cols-2 gap-4 animate-in slide-in-from-top-4 fade-in">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Nombre</label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Juan"
                      className="w-full bg-white border-2 border-slate-100 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold focus:border-blue-600 focus:ring-0 outline-none transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Apellido</label>
                  <div className="relative group">
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Pérez"
                      className="w-full bg-white border-2 border-slate-100 rounded-2xl py-4 px-4 text-sm font-bold focus:border-blue-600 focus:ring-0 outline-none transition-all"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Usuario / Email</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full bg-white border-2 border-slate-100 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold focus:border-blue-600 focus:ring-0 outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Contraseña</label>
                {!isRegistering && (
                  <button type="button" className="text-xs font-bold text-blue-600 hover:text-blue-700">¿Olvidó su contraseña?</button>
                )}
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white border-2 border-slate-100 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold focus:border-blue-600 focus:ring-0 outline-none transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || !email || !password || (isRegistering && !firstName)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 shadow-xl shadow-blue-200 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  PROCESANDO...
                </>
              ) : (
                <>
                  {isRegistering ? 'REGISTRARSE' : 'INICIAR SESIÓN'}
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-sm font-medium text-slate-500">
              {isRegistering ? '¿Ya tiene una cuenta?' : '¿No tiene una cuenta?'}
              <button
                onClick={() => {
                   setIsRegistering(!isRegistering);
                   setErrorMsg('');
                }}
                className="ml-2 text-blue-600 font-black hover:underline"
              >
                {isRegistering ? 'Iniciar Sesión' : 'Registrarse ahora'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
