
import React, { useState } from 'react';
import {
  Search,
  MoreVertical,
  Phone,
  Video,
  Paperclip,
  Send,
  Image as ImageIcon,
  Mic,
  Smile,
  Check,
  CheckCheck,
  Clock,
  Bot,
  MoreHorizontal,
  FileText,
  MapPin,
  Box,
  Truck,
  Ship,
  X
} from 'lucide-react';

// Mock Data
const CONTACTS = [
  { 
    id: 1, 
    name: "Logistics AI", 
    role: "Automated Support", 
    avatar: "bot", 
    status: "online", 
    unread: 0, 
    time: "Now", 
    lastMsg: "He actualizado la ruta del envío #CN-4921.",
    isTyping: false 
  },
  { 
    id: 2, 
    name: "Sarah Chen", 
    role: "Gerente de Operaciones", 
    avatar: "https://picsum.photos/seed/sarah/200/200", 
    status: "online", 
    unread: 3, 
    time: "10:30 AM", 
    lastMsg: "¿Podemos confirmar la descarga en Hamburgo?",
    isTyping: true 
  },
  { 
    id: 3, 
    name: "Mike Ross", 
    role: "Agente Aduanal", 
    avatar: "https://picsum.photos/seed/mike/200/200", 
    status: "offline", 
    unread: 0, 
    time: "Ayer", 
    lastMsg: "Documentos fiscales adjuntos.",
    isTyping: false 
  },
  { 
    id: 4, 
    name: "Equipo de Soporte", 
    role: "Atención al Cliente", 
    avatar: "group", 
    status: "idle", 
    unread: 0, 
    time: "Mar 20", 
    lastMsg: "Ticket #9921 cerrado exitosamente.",
    isTyping: false 
  },
];

const INITIAL_MESSAGES = [
  { id: 1, senderId: 2, text: "Hola! ¿Tienes actualizaciones sobre el contenedor #CN-4921?", time: "10:00 AM", type: "text", status: "read" },
  { id: 2, senderId: 0, text: "Hola Sarah, déjame revisar el estado en tiempo real.", time: "10:05 AM", type: "text", status: "read" },
  { 
    id: 3, 
    senderId: 0, 
    text: "", 
    time: "10:05 AM", 
    type: "shipment", 
    data: { 
      id: "#CN-4921", 
      status: "In Transit", 
      origin: "Shanghai, CN", 
      dest: "Hamburg, DE", 
      eta: "Oct 28" 
    },
    status: "read"
  },
  { id: 4, senderId: 2, text: "Perfecto, parece que llegará a tiempo. ¿Necesitamos documentos adicionales?", time: "10:08 AM", type: "text", status: "read" },
  { id: 5, senderId: 0, text: "Solo la factura comercial actualizada. Puedes subirla aquí.", time: "10:10 AM", type: "text", status: "delivered" },
];

export const Messages: React.FC = () => {
  const [selectedContact, setSelectedContact] = useState(CONTACTS[1]);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState("");
  const [activeTab, setActiveTab] = useState('all'); // all, unread, groups

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg = {
      id: messages.length + 1,
      senderId: 0,
      text: inputText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: "text",
      status: "sent"
    };

    setMessages([...messages, newMsg]);
    setInputText("");

    // Simulate auto-reply
    setTimeout(() => {
        const reply = {
            id: messages.length + 2,
            senderId: selectedContact.id,
            text: "Gracias, lo revisaré en breve.",
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            type: "text",
            status: "sent"
        };
        setMessages(prev => [...prev, reply]);
    }, 2000);
  };

  return (
    <div className="h-[calc(100vh-8rem)] lg:h-[calc(100vh-6rem)] p-4 lg:p-8 max-w-[1920px] mx-auto animate-in fade-in duration-500">
      <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-100 h-full overflow-hidden flex flex-col md:flex-row">
        
        {/* Sidebar List */}
        <div className={`w-full md:w-80 lg:w-96 flex flex-col border-r border-slate-100 ${selectedContact ? 'hidden md:flex' : 'flex'}`}>
          
          {/* Sidebar Header */}
          <div className="p-6 pb-2">
            <h2 className="text-2xl font-black text-slate-800 mb-4 tracking-tight">Mensajes</h2>
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
              <input 
                type="text" 
                placeholder="Buscar chats..." 
                className="w-full bg-slate-50 border-none rounded-xl py-3 pl-10 pr-4 text-sm font-bold focus:ring-2 focus:ring-blue-100 outline-none transition-all"
              />
            </div>
            
            {/* Filter Tabs */}
            <div className="flex gap-2 mt-6 overflow-x-auto no-scrollbar pb-2">
                {['Todos', 'No leídos', 'Equipos'].map((tab) => (
                    <button 
                        key={tab}
                        onClick={() => setActiveTab(tab.toLowerCase())}
                        className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider whitespace-nowrap transition-colors ${
                            activeTab === tab.toLowerCase() || (tab === 'Todos' && activeTab === 'all')
                            ? 'bg-slate-800 text-white' 
                            : 'bg-slate-50 text-slate-400 hover:bg-slate-100'
                        }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>
          </div>

          {/* Contact List */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden p-3 space-y-1">
            {CONTACTS.map((contact) => (
              <button
                key={contact.id}
                onClick={() => setSelectedContact(contact)}
                className={`w-full p-3 rounded-2xl flex items-center gap-4 transition-all group ${
                  selectedContact?.id === contact.id ? 'bg-blue-50/50 ring-1 ring-blue-100' : 'hover:bg-slate-50'
                }`}
              >
                <div className="relative">
                   <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white text-lg font-bold shadow-sm ${
                       contact.avatar === 'bot' ? 'bg-indigo-600' : contact.avatar === 'group' ? 'bg-orange-500' : 'bg-slate-200'
                   }`}>
                       {contact.avatar === 'bot' ? <Bot className="w-6 h-6" /> : 
                        contact.avatar === 'group' ? <span className="text-xs">TEAM</span> :
                        <img src={contact.avatar} alt={contact.name} className="w-full h-full rounded-2xl object-cover" />
                       }
                   </div>
                   <div className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 border-2 border-white rounded-full ${
                       contact.status === 'online' ? 'bg-emerald-500' : 
                       contact.status === 'idle' ? 'bg-amber-500' : 'bg-slate-300'
                   }`}></div>
                </div>
                
                <div className="flex-1 text-left min-w-0">
                    <div className="flex justify-between items-baseline mb-0.5">
                        <h4 className={`text-sm font-black truncate ${selectedContact?.id === contact.id ? 'text-blue-700' : 'text-slate-700'}`}>
                            {contact.name}
                        </h4>
                        <span className="text-[10px] font-bold text-slate-400">{contact.time}</span>
                    </div>
                    <p className={`text-xs truncate ${contact.isTyping ? 'text-blue-600 font-bold italic' : 'text-slate-500 font-medium'}`}>
                        {contact.isTyping ? 'Escribiendo...' : contact.lastMsg}
                    </p>
                </div>
                {contact.unread > 0 && (
                    <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center text-[10px] font-black text-white shadow-lg shadow-blue-200">
                        {contact.unread}
                    </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className={`flex-1 flex flex-col bg-[#f8fafc]/50 relative ${!selectedContact ? 'hidden md:flex items-center justify-center' : 'flex'}`}>
            {!selectedContact ? (
                <div className="text-center opacity-50">
                    <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Send className="w-8 h-8 text-slate-400" />
                    </div>
                    <p className="font-black text-slate-400">Selecciona un chat para comenzar</p>
                </div>
            ) : (
                <>
                    {/* Chat Header */}
                    <div className="h-20 border-b border-slate-100 bg-white/80 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-10">
                        <div className="flex items-center gap-4">
                            <button onClick={() => setSelectedContact(null as any)} className="md:hidden p-2 -ml-2 text-slate-400">
                                <X className="w-5 h-5" />
                            </button>
                            <div className="relative">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-sm ${
                                    selectedContact.avatar === 'bot' ? 'bg-indigo-600' : selectedContact.avatar === 'group' ? 'bg-orange-500' : 'bg-slate-200'
                                }`}>
                                    {selectedContact.avatar === 'bot' ? <Bot className="w-5 h-5" /> : 
                                        selectedContact.avatar === 'group' ? <span className="text-[10px]">TEAM</span> :
                                        <img src={selectedContact.avatar} alt="" className="w-full h-full rounded-xl object-cover" />
                                    }
                                </div>
                            </div>
                            <div>
                                <h3 className="font-black text-slate-800 leading-none">{selectedContact.name}</h3>
                                <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-wide">{selectedContact.role}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button className="p-2.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors">
                                <Phone className="w-5 h-5" />
                            </button>
                            <button className="p-2.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors">
                                <Video className="w-5 h-5" />
                            </button>
                            <div className="w-[1px] h-8 bg-slate-100 mx-2"></div>
                            <button className="p-2.5 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors">
                                <MoreVertical className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Messages List */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-6">
                        {messages.map((msg, idx) => (
                            <div key={msg.id} className={`flex ${msg.senderId === 0 ? 'justify-end' : 'justify-start'}`}>
                                <div className={`flex flex-col max-w-[85%] md:max-w-[70%] ${msg.senderId === 0 ? 'items-end' : 'items-start'}`}>
                                    
                                    {/* Message Bubble */}
                                    {msg.type === 'shipment' ? (
                                        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm w-72 mb-1">
                                            <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2">
                                                <div className="flex items-center gap-2">
                                                    <div className="p-1.5 bg-blue-100 text-blue-600 rounded-lg">
                                                        <Ship className="w-4 h-4" />
                                                    </div>
                                                    <span className="font-black text-slate-700 text-sm">{msg.data?.id}</span>
                                                </div>
                                                <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-black rounded uppercase">{msg.data?.status}</span>
                                            </div>
                                            <div className="flex justify-between items-center text-xs mb-3">
                                                <div>
                                                    <p className="text-[10px] text-slate-400 font-bold uppercase">Origin</p>
                                                    <p className="font-bold text-slate-700">{msg.data?.origin}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-[10px] text-slate-400 font-bold uppercase">Dest</p>
                                                    <p className="font-bold text-slate-700">{msg.data?.dest}</p>
                                                </div>
                                            </div>
                                            <button className="w-full py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-black transition-colors">
                                                Track Shipment
                                            </button>
                                        </div>
                                    ) : (
                                        <div className={`px-5 py-3.5 rounded-2xl shadow-sm text-sm font-medium leading-relaxed relative group ${
                                            msg.senderId === 0 
                                            ? 'bg-blue-600 text-white rounded-tr-sm' 
                                            : 'bg-white text-slate-700 border border-slate-100 rounded-tl-sm'
                                        }`}>
                                            {msg.text}
                                            {/* Timestamp overlay on hover could go here */}
                                        </div>
                                    )}

                                    {/* Meta Info */}
                                    <div className="flex items-center gap-1.5 mt-1 px-1">
                                        <span className="text-[10px] font-bold text-slate-400">{msg.time}</span>
                                        {msg.senderId === 0 && (
                                            msg.status === 'read' ? <CheckCheck className="w-3.5 h-3.5 text-blue-500" /> : <Check className="w-3.5 h-3.5 text-slate-300" />
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Input Area */}
                    <div className="p-4 bg-white border-t border-slate-100">
                        <form onSubmit={handleSend} className="flex items-end gap-2 bg-slate-50 p-2 rounded-[1.5rem] border border-slate-100 focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-200 transition-all">
                            <button type="button" className="p-3 text-slate-400 hover:text-blue-600 hover:bg-white rounded-full transition-colors">
                                <Paperclip className="w-5 h-5" />
                            </button>
                            <textarea
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                onKeyDown={(e) => {
                                    if(e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        handleSend(e);
                                    }
                                }}
                                placeholder="Escribe un mensaje..."
                                className="flex-1 bg-transparent border-none focus:ring-0 text-sm font-medium text-slate-700 placeholder:text-slate-400 min-h-[44px] max-h-32 py-3 resize-none"
                                rows={1}
                            />
                            <div className="flex items-center gap-1 pr-1">
                                <button type="button" className="p-3 text-slate-400 hover:text-blue-600 hover:bg-white rounded-full transition-colors hidden sm:block">
                                    <Smile className="w-5 h-5" />
                                </button>
                                {inputText.trim() ? (
                                    <button type="submit" className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 shadow-md transition-all active:scale-90">
                                        <Send className="w-5 h-5" />
                                    </button>
                                ) : (
                                    <button type="button" className="p-3 text-slate-400 hover:text-blue-600 hover:bg-white rounded-full transition-colors">
                                        <Mic className="w-5 h-5" />
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </>
            )}
        </div>

        {/* Right Info Panel (Desktop Only) */}
        {selectedContact && (
            <div className="hidden xl:flex w-72 border-l border-slate-100 flex-col bg-white">
                <div className="p-8 text-center border-b border-slate-100">
                     <div className={`w-24 h-24 rounded-[2rem] flex items-center justify-center text-white text-3xl font-bold shadow-lg mx-auto mb-4 ${
                        selectedContact.avatar === 'bot' ? 'bg-indigo-600 shadow-indigo-200' : selectedContact.avatar === 'group' ? 'bg-orange-500 shadow-orange-200' : 'bg-slate-200 shadow-slate-200'
                     }`}>
                         {selectedContact.avatar === 'bot' ? <Bot className="w-10 h-10" /> : 
                          selectedContact.avatar === 'group' ? <span className="text-sm">TEAM</span> :
                          <img src={selectedContact.avatar} alt="" className="w-full h-full rounded-[2rem] object-cover" />
                         }
                     </div>
                     <h2 className="text-lg font-black text-slate-800">{selectedContact.name}</h2>
                     <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">{selectedContact.role}</p>
                </div>
                
                <div className="p-6 space-y-6">
                    <div>
                        <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest mb-4">Archivos Compartidos</h4>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl group cursor-pointer hover:bg-blue-50 transition-colors">
                                <div className="p-2 bg-white rounded-lg text-blue-600 shadow-sm">
                                    <FileText className="w-4 h-4" />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-xs font-bold text-slate-700 truncate group-hover:text-blue-700">Factura_CN4921.pdf</p>
                                    <p className="text-[10px] font-bold text-slate-400">2.4 MB • Ayer</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl group cursor-pointer hover:bg-blue-50 transition-colors">
                                <div className="p-2 bg-white rounded-lg text-emerald-600 shadow-sm">
                                    <ImageIcon className="w-4 h-4" />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-xs font-bold text-slate-700 truncate group-hover:text-blue-700">Damage_Report.jpg</p>
                                    <p className="text-[10px] font-bold text-slate-400">1.8 MB • Oct 22</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest mb-4">Acciones Rápidas</h4>
                        <button className="w-full py-3 bg-white border border-slate-200 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-50 hover:border-slate-300 transition-colors mb-2">
                            Crear Ticket de Soporte
                        </button>
                        <button className="w-full py-3 bg-white border border-slate-200 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-50 hover:border-slate-300 transition-colors">
                            Ver Perfil Completo
                        </button>
                    </div>
                </div>
            </div>
        )}

      </div>
    </div>
  );
};
