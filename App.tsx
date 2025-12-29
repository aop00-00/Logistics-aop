
import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { Booking } from './components/Booking';
import { BookingConfirmation } from './components/BookingConfirmation';
import { Tracking } from './components/Tracking';
import { Login } from './components/Login';
import { Orders } from './components/Orders';
import { OrderDetail } from './components/OrderDetail';
import { Invoices } from './components/Invoices';
import { Messages } from './components/Messages';
import { Settings } from './components/Settings';
import { Loader2 } from 'lucide-react';

const AppContent: React.FC = () => {
  const { user, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState('bookings');
  const [confirmedBookingData, setConfirmedBookingData] = useState<any>(null);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
      </div>
    );
  }

  // If not authenticated, show the login screen
  if (!user) {
    return <Login />;
  }

  const handleBookingCalculated = (data: any) => {
    setConfirmedBookingData(data);
    setActiveTab('booking-success');
  };

  const handleOrderSelect = (order: any) => {
    setSelectedOrder(order);
    setActiveTab('order-detail');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'bookings':
        return <Booking onCalculate={handleBookingCalculated} />;
      case 'booking-success':
        return <BookingConfirmation 
          data={confirmedBookingData} 
          onTrack={() => setActiveTab('orders')} 
          onBack={() => setActiveTab('dashboard')} 
        />;
      case 'orders':
        return <Orders onViewDetails={handleOrderSelect} />;
      case 'order-detail':
        return <OrderDetail order={selectedOrder} onBack={() => setActiveTab('orders')} />;
      case 'invoices':
        return <Invoices />;
      case 'messages':
        return <Messages />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  const getTitle = () => {
    switch (activeTab) {
      case 'dashboard': return 'Dashboard';
      case 'bookings': return 'Reservar Pedido';
      case 'booking-success': return 'Confirmación de Pedido';
      case 'orders': return 'Mis Pedidos';
      case 'order-detail': return `Detalle de Pedido ${selectedOrder?.id || ''}`;
      case 'invoices': return 'Facturación y Pagos';
      case 'messages': return 'Mensajería y Soporte';
      case 'settings': return 'Ajustes';
      default: return 'LogisticsPro';
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="flex-1 flex flex-col">
        <Header title={getTitle()} />
        <main className="flex-1 pb-20 lg:pb-10 bg-slate-50/50">
          {renderContent()}
        </main>
        
        {/* Mobile Bottom Nav */}
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-6 py-4 flex justify-between items-center z-50 shadow-2xl">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'dashboard' ? 'text-blue-600' : 'text-slate-400'}`}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
            <span className="text-[10px] font-black uppercase tracking-tighter">Home</span>
          </button>
          <button 
            onClick={() => setActiveTab('bookings')}
            className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'bookings' ? 'text-blue-600' : 'text-slate-400'}`}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
            <span className="text-[10px] font-black uppercase tracking-tighter">Reserva</span>
          </button>
          <button 
            onClick={() => setActiveTab('invoices')}
            className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'invoices' ? 'text-blue-600' : 'text-slate-400'}`}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
            <span className="text-[10px] font-black uppercase tracking-tighter">Facturas</span>
          </button>
          <div className="w-10 h-10 rounded-xl overflow-hidden ring-2 ring-slate-100">
            <img src="https://picsum.photos/seed/alex/100/100" alt="Profile" className="w-full h-full object-cover" />
          </div>
        </nav>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
