import React, { useState, useEffect, useRef } from 'react';
import {
   Users, DollarSign, Plus, MessageSquare, Search,
   Building, Megaphone, Briefcase, X, Send, User,
   MapPin, Star, MoreVertical, Trash2, Phone
} from 'lucide-react';
import { CyberButton, CyberCard, SectionHeader, CyberBadge } from '../../ui/CyberComponents';
import { Screen } from '../../../types';

type RoleType = 'SPONSOR' | 'OWNER' | 'MANAGER' | 'PROMOTER';

interface Props {
   roleType: RoleType;
   onNavigate: (screen: Screen) => void;
   onBack: () => void;
}

// --- CONFIGURATION PER ROLE ---
const ROLE_CONFIG = {
   SPONSOR: {
      title: 'EVENT SPONSOR(S)',
      subtitle: 'FINANCIAL PARTNERS & BRANDS',
      entityLabel: 'Sponsor',
      subLabel: 'Company',
      metric1: 'TOTAL CONTRIBUTION',
      metric2: 'ACTIVE CAMPAIGNS',
      color: 'text-yellow-400',
      borderColor: 'border-yellow-500',
      glow: 'yellow',
      icon: DollarSign,
      btnColor: 'bg-yellow-500 text-black hover:bg-yellow-400 shadow-[0_0_20px_rgba(234,179,8,0.4)]'
   },
   OWNER: {
      title: 'VENUE OWNER(S)',
      subtitle: 'PROPERTY & ASSET HOLDERS',
      entityLabel: 'Owner',
      subLabel: 'Venue',
      metric1: 'TOTAL CAPACITY',
      metric2: 'PROPERTIES LIVE',
      color: 'text-purple-400',
      borderColor: 'border-purple-500',
      glow: 'purple',
      icon: Building,
      btnColor: 'bg-purple-600 text-white hover:bg-purple-500 shadow-[0_0_20px_rgba(147,51,234,0.4)]'
   },
   MANAGER: {
      title: 'VENUE/EVENT MANAGER(S)',
      subtitle: 'LOGISTICS & OPERATIONS',
      entityLabel: 'Manager',
      subLabel: 'Zone / Area',
      metric1: 'STAFF ON DUTY',
      metric2: 'OPEN TICKETS',
      color: 'text-blue-400',
      borderColor: 'border-blue-500',
      glow: 'cyan',
      icon: Briefcase,
      btnColor: 'bg-blue-600 text-white hover:bg-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.4)]'
   },
   PROMOTER: {
      title: 'VENUE/EVENT PROMOTER(S)',
      subtitle: 'MARKETING & HYPE SQUAD',
      entityLabel: 'Promoter',
      subLabel: 'Crew Name',
      metric1: 'GUEST LIST COUNT',
      metric2: 'TICKETS SOLD',
      color: 'text-pink-400',
      borderColor: 'border-pink-500',
      glow: 'none',
      icon: Megaphone,
      btnColor: 'bg-pink-600 text-white hover:bg-pink-500 shadow-[0_0_20px_rgba(219,39,119,0.4)]'
   }
};

// --- MOCK DATA ---
const INITIAL_DATA = {
   SPONSOR: [
      { id: '1', name: 'Mike Ross', org: 'Red Bull', status: 'online', avatar: 'MR' },
      { id: '2', name: 'Sarah Connor', org: 'Cyberdyne Systems', status: 'offline', avatar: 'SC' },
      { id: '3', name: 'Tony Stark', org: 'Stark Ind.', status: 'online', avatar: 'TS' }
   ],
   OWNER: [
      { id: '1', name: 'Mr. Big', org: 'Main Stadium', status: 'online', avatar: 'MB' },
      { id: '2', name: 'Jane Doe', org: 'Club Z', status: 'busy', avatar: 'JD' },
      { id: '3', name: 'Carlos R.', org: 'Fuego', status: 'online', avatar: 'CR' },
      { id: '4', name: 'Luis R.', org: 'Fuego', status: 'offline', avatar: 'LR' }
   ],
   MANAGER: [
      { id: '1', name: 'Steve Rogers', org: 'VIP Section A', status: 'online', avatar: 'SR' },
      { id: '2', name: 'Natasha R.', org: 'Security Gates', status: 'online', avatar: 'NR' }
   ],
   PROMOTER: [
      { id: '1', name: 'Alex Party', org: 'NightLife Crew', status: 'online', avatar: 'AP' },
      { id: '2', name: 'DJ X', org: 'Bass Drop', status: 'offline', avatar: 'DX' }
   ]
};

export const RoleManagementDashboard: React.FC<Props> = ({ roleType, onNavigate, onBack }) => {
   const config = ROLE_CONFIG[roleType];
   const [entities, setEntities] = useState(INITIAL_DATA[roleType]);
   const [activeChatId, setActiveChatId] = useState<string | null>(null);

   // Modals
   const [showAddModal, setShowAddModal] = useState(false);
   const [showBrandModal, setShowBrandModal] = useState(false);
   const [showVenueModal, setShowVenueModal] = useState(false);
   const [showVenueEventModal, setShowVenueEventModal] = useState(false);

   // Add Entity Modal State
   const [newName, setNewName] = useState('');
   const [newOrg, setNewOrg] = useState('');

   // Add Secondary Entity Modal State (Brand or Venue)
   const [newBrandName, setNewBrandName] = useState('');
   const [newVenueName, setNewVenueName] = useState('');
   const [newVenueEventName, setNewVenueEventName] = useState('');

   // Search State
   const [personSearch, setPersonSearch] = useState('');
   const [brandSearch, setBrandSearch] = useState('');
   const [venueSearch, setVenueSearch] = useState('');
   const [venueEventSearch, setVenueEventSearch] = useState('');

   // Handle Add Entity
   const handleAdd = () => {
      if (!newName || !newOrg) return;
      const newEntity = {
         id: Date.now().toString(),
         name: newName,
         org: newOrg,
         status: 'offline',
         avatar: newName.substring(0, 2).toUpperCase()
      };
      setEntities([...entities, newEntity]);
      setNewName('');
      setNewOrg('');
      setShowAddModal(false);
   };

   const handleAddBrand = () => {
      if (!newBrandName) return;
      alert(`Brand "${newBrandName}" added to registry. You can now assign personnel to this brand.`);
      setNewBrandName('');
      setShowBrandModal(false);
   };

   const handleAddVenue = () => {
      if (!newVenueName) return;
      alert(`Venue "${newVenueName}" added to registry. You can now assign owners to this venue.`);
      setNewVenueName('');
      setShowVenueModal(false);
   };

   const handleAddVenueEvent = () => {
      if (!newVenueEventName) return;
      alert(`Venue/Event "${newVenueEventName}" added to registry. You can now assign managers/promoters to this entity.`);
      setNewVenueEventName('');
      setShowVenueEventModal(false);
   };

   // Filter Entities
   const filteredEntities = entities.filter(e => {
      const matchesPerson = e.name.toLowerCase().includes(personSearch.toLowerCase());

      let matchesSecondary = true;
      if (roleType === 'SPONSOR') {
         matchesSecondary = e.org.toLowerCase().includes(brandSearch.toLowerCase());
      } else if (roleType === 'OWNER') {
         matchesSecondary = e.org.toLowerCase().includes(venueSearch.toLowerCase());
      } else if (roleType === 'MANAGER' || roleType === 'PROMOTER') {
         matchesSecondary = e.org.toLowerCase().includes(venueEventSearch.toLowerCase());
      }

      return matchesPerson && matchesSecondary;
   });

   // --- SUB-COMPONENT: CHAT OVERLAY ---
   const ChatOverlay = () => {
      if (!activeChatId) return null;
      const target = entities.find(e => e.id === activeChatId);
      if (!target) return null;

      const [input, setInput] = useState('');
      const [history, setHistory] = useState<{ sender: 'me' | 'them', text: string }[]>([]);
      const scrollRef = useRef<HTMLDivElement>(null);

      useEffect(() => {
         // Default system greeting or status instead of "Them" talking first
         setHistory([{
            sender: 'them',
            text: `[SYSTEM] Secure encrypted connection established with ${target.name} (${target.org}).`
         }]);

         // Pre-fill Input Template based on Role for Marilyn
         if (roleType === 'SPONSOR') {
            setInput("Hello, this is Marilyn Alvarado from MERIT SCORE. I need your designer to send me the art and promotion materials max on Feb 7 at 6pm.");
         } else if (roleType === 'OWNER') {
            setInput(`Hello ${target.name}, this is Marilyn. I need to confirm the venue access details for ${target.org} for the upcoming event.`);
         } else if (roleType === 'MANAGER') {
            setInput(`Hello ${target.name}, checking in on the logistics for your zone.`);
         } else if (roleType === 'PROMOTER') {
            setInput(`Hello ${target.name}, how are the ticket sales trending?`);
         } else {
            setInput(`Hello ${target.name}, this is Marilyn Alvarado.`);
         }
      }, [activeChatId]);

      const send = () => {
         if (!input.trim()) return;
         setHistory(prev => [...prev, { sender: 'me', text: input }]);
         setInput('');

         // Auto-reply simulation
         setTimeout(() => {
            let reply = "I'll look into that right away.";
            if (input.includes('art')) reply = "Hi Marilyn! Understood. I'll ping our design team immediately and ensure you get the files before the deadline.";
            setHistory(prev => [...prev, { sender: 'them', text: reply }]);
            if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
         }, 1500);
      };

      return (
         <div className="fixed inset-0 z-[150] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-[fadeIn_0.2s_ease-out]">
            <div className={`w-full max-w-sm bg-[#050505] border rounded-xl shadow-2xl overflow-hidden flex flex-col h-[500px] max-h-[80vh] ${config.borderColor}`}>
               {/* Chat Header */}
               <div className="bg-[#0a0a0a] p-4 border-b border-white/10 flex items-center justify-between shrink-0">
                  <div className="flex items-center gap-3">
                     <div className={`w-10 h-10 rounded-full flex items-center justify-center border bg-gray-800 text-white font-bold ${config.color} ${config.borderColor}`}>
                        {target.avatar}
                     </div>
                     <div>
                        <h3 className={`font-orbitron font-bold text-sm tracking-wide ${config.color}`}>{target.name}</h3>
                        <p className="text-[10px] text-gray-400 font-mono flex items-center gap-1">
                           {target.org} • <span className={`w-1.5 h-1.5 rounded-full ${target.status === 'online' ? 'bg-green-500' : 'bg-gray-500'}`}></span> {target.status.toUpperCase()}
                        </p>
                     </div>
                  </div>
                  <button onClick={() => setActiveChatId(null)} className="text-gray-500 hover:text-white"><X size={20} /></button>
               </div>

               {/* Chat Messages */}
               <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-black/50 custom-scrollbar">
                  {history.map((msg, i) => (
                     <div key={i} className={`flex gap-3 ${msg.sender === 'me' ? 'flex-row-reverse' : ''}`}>
                        <div className={`max-w-[80%] rounded-lg p-3 text-xs leading-relaxed border ${msg.sender === 'them' ? 'bg-[#1a1a1a] border-white/5 text-gray-300 rounded-tl-none' : `bg-white/10 border-white/20 text-white rounded-tr-none`}`}>
                           {msg.text}
                        </div>
                     </div>
                  ))}
               </div>

               {/* Input */}
               <div className="p-3 bg-[#0a0a0a] border-t border-white/10 flex gap-2 shrink-0">
                  <textarea
                     value={input}
                     onChange={(e) => setInput(e.target.value)}
                     placeholder={`Message ${target.name}...`} autoFocus
                     onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                           e.preventDefault();
                           send();
                        }
                     }}
                     className="flex-1 bg-black border border-white/20 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-white/40 font-mono resize-none h-12 custom-scrollbar"
                  />
                  <button onClick={send} className={`text-black rounded-lg w-10 h-12 flex items-center justify-center hover:opacity-80 transition-opacity bg-white`}>
                     <Send size={16} />
                  </button>
               </div>
            </div>
         </div>
      );
   };

   // --- SUB-COMPONENT: ADD ENTITY MODAL ---
   const AddModal = () => {
      if (!showAddModal) return null;
      return (
         <div className="fixed inset-0 z-[160] bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
            <div className={`w-full max-w-xs bg-[#0a0a0a] border rounded-xl p-6 relative shadow-[0_0_50px_rgba(0,0,0,0.8)] ${config.borderColor}`}>
               <button onClick={() => setShowAddModal(false)} className="absolute top-4 right-4 text-gray-500 hover:text-white"><X size={20} /></button>
               <div className="text-center mb-6">
                  <div className={`w-12 h-12 rounded-full border mx-auto flex items-center justify-center mb-3 bg-white/5 ${config.color} ${config.borderColor}`}>
                     <Plus size={24} />
                  </div>
                  <h3 className="font-orbitron font-bold text-white text-lg">ADD NEW {config.entityLabel.toUpperCase()}</h3>
               </div>

               <div className="space-y-4">
                  <div>
                     <label className="text-[10px] text-gray-500 font-bold tracking-widest block mb-1">NAME</label>
                     <input value={newName} onChange={(e) => setNewName(e.target.value)} className="w-full bg-black border border-white/20 rounded p-2 text-white text-sm focus:border-white/50 outline-none" placeholder="e.g. John Wick" />
                  </div>
                  <div>
                     <label className="text-[10px] text-gray-500 font-bold tracking-widest block mb-1">{config.subLabel.toUpperCase()}</label>
                     <input value={newOrg} onChange={(e) => setNewOrg(e.target.value)} className="w-full bg-black border border-white/20 rounded p-2 text-white text-sm focus:border-white/50 outline-none" placeholder={`e.g. ${roleType === 'SPONSOR' ? 'Coca Cola' : 'Main Stage'}`} />
                  </div>
                  <CyberButton fullWidth onClick={handleAdd} className={`mt-4 h-12 ${config.btnColor}`}>CONFIRM ADDITION</CyberButton>
               </div>
            </div>
         </div>
      );
   };

   // --- SUB-COMPONENT: ADD BRAND MODAL (FOR SPONSORS) ---
   const AddBrandModal = () => {
      if (!showBrandModal) return null;
      return (
         <div className="fixed inset-0 z-[160] bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
            <div className={`w-full max-w-xs bg-[#0a0a0a] border rounded-xl p-6 relative shadow-[0_0_50px_rgba(0,0,0,0.8)] ${config.borderColor}`}>
               <button onClick={() => setShowBrandModal(false)} className="absolute top-4 right-4 text-gray-500 hover:text-white"><X size={20} /></button>
               <div className="text-center mb-6">
                  <div className={`w-12 h-12 rounded-full border mx-auto flex items-center justify-center mb-3 bg-white/5 ${config.color} ${config.borderColor}`}>
                     <Building size={24} />
                  </div>
                  <h3 className="font-orbitron font-bold text-white text-lg">ADD NEW BRAND</h3>
               </div>

               <div className="space-y-4">
                  <div>
                     <label className="text-[10px] text-gray-500 font-bold tracking-widest block mb-1">BRAND NAME</label>
                     <input value={newBrandName} onChange={(e) => setNewBrandName(e.target.value)} className="w-full bg-black border border-white/20 rounded p-2 text-white text-sm focus:border-white/50 outline-none" placeholder="e.g. Red Bull" />
                  </div>
                  <p className="text-[10px] text-gray-500 italic">Adding a brand allows you to group multiple personnel (Managers, Designers, etc.) under one entity.</p>
                  <CyberButton fullWidth onClick={handleAddBrand} className={`mt-4 h-12 ${config.btnColor}`}>CREATE BRAND</CyberButton>
               </div>
            </div>
         </div>
      );
   };

   // --- SUB-COMPONENT: ADD VENUE MODAL (FOR OWNERS) ---
   const AddVenueModal = () => {
      if (!showVenueModal) return null;
      return (
         <div className="fixed inset-0 z-[160] bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
            <div className={`w-full max-w-xs bg-[#0a0a0a] border rounded-xl p-6 relative shadow-[0_0_50px_rgba(0,0,0,0.8)] ${config.borderColor}`}>
               <button onClick={() => setShowVenueModal(false)} className="absolute top-4 right-4 text-gray-500 hover:text-white"><X size={20} /></button>
               <div className="text-center mb-6">
                  <div className={`w-12 h-12 rounded-full border mx-auto flex items-center justify-center mb-3 bg-white/5 ${config.color} ${config.borderColor}`}>
                     <Building size={24} />
                  </div>
                  <h3 className="font-orbitron font-bold text-white text-lg">ADD NEW VENUE</h3>
               </div>

               <div className="space-y-4">
                  <div>
                     <label className="text-[10px] text-gray-500 font-bold tracking-widest block mb-1">VENUE NAME</label>
                     <input value={newVenueName} onChange={(e) => setNewVenueName(e.target.value)} className="w-full bg-black border border-white/20 rounded p-2 text-white text-sm focus:border-white/50 outline-none" placeholder="e.g. Fuego" />
                  </div>
                  <p className="text-[10px] text-gray-500 italic">Adding a venue allows you to group multiple owners (Partners, Brothers, etc.) under one property.</p>
                  <CyberButton fullWidth onClick={handleAddVenue} className={`mt-4 h-12 ${config.btnColor}`}>CREATE VENUE</CyberButton>
               </div>
            </div>
         </div>
      );
   };

   // --- SUB-COMPONENT: ADD VENUE/EVENT MODAL (FOR MANAGERS & PROMOTERS) ---
   const AddVenueEventModal = () => {
      if (!showVenueEventModal) return null;
      return (
         <div className="fixed inset-0 z-[160] bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
            <div className={`w-full max-w-xs bg-[#0a0a0a] border rounded-xl p-6 relative shadow-[0_0_50px_rgba(0,0,0,0.8)] ${config.borderColor}`}>
               <button onClick={() => setShowVenueEventModal(false)} className="absolute top-4 right-4 text-gray-500 hover:text-white"><X size={20} /></button>
               <div className="text-center mb-6">
                  <div className={`w-12 h-12 rounded-full border mx-auto flex items-center justify-center mb-3 bg-white/5 ${config.color} ${config.borderColor}`}>
                     <Building size={24} />
                  </div>
                  <h3 className="font-orbitron font-bold text-white text-lg">ADD NEW VENUE/EVENT</h3>
               </div>

               <div className="space-y-4">
                  <div>
                     <label className="text-[10px] text-gray-500 font-bold tracking-widest block mb-1">NAME</label>
                     <input value={newVenueEventName} onChange={(e) => setNewVenueEventName(e.target.value)} className="w-full bg-black border border-white/20 rounded p-2 text-white text-sm focus:border-white/50 outline-none" placeholder="e.g. Summer Fest Main Stage" />
                  </div>
                  <p className="text-[10px] text-gray-500 italic">Adding an entity allows you to group multiple {roleType === 'MANAGER' ? 'managers' : 'promoters'} under one operation.</p>
                  <CyberButton fullWidth onClick={handleAddVenueEvent} className={`mt-4 h-12 ${config.btnColor}`}>CREATE ENTITY</CyberButton>
               </div>
            </div>
         </div>
      );
   };

   return (
      <div className="space-y-6 pb-24 animate-[fadeIn_0.3s_ease-out]">
         <ChatOverlay />
         <AddModal />
         <AddBrandModal />
         <AddVenueModal />
         <AddVenueEventModal />

         {/* HEADER */}
         <div className={`bg-gray-900/40 border-b ${config.borderColor} -mx-4 px-4 py-3 mb-4 flex justify-between items-center relative overflow-hidden`}>
            <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-transparent via-${config.glow === 'yellow' ? 'yellow-500' : config.glow === 'purple' ? 'purple-500' : config.glow === 'cyan' ? 'cyan-500' : 'pink-500'} to-transparent`}></div>
            <div>
               <h1 className={`font-orbitron font-bold text-lg tracking-widest ${config.color}`}>{config.title}</h1>
               <p className="text-[10px] text-gray-400 font-mono tracking-wider">{config.subtitle}</p>
            </div>
            <button onClick={onBack} className="text-gray-500 hover:text-white"><X size={20} /></button>
         </div>

         {/* METRICS ROW - LIGHTENED TEXT AS REQUESTED */}
         <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="bg-[#1a1a1a] border border-white/20 p-3 rounded-lg flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
               <p className="text-[9px] text-gray-300 font-orbitron tracking-widest mb-1">{config.metric1}</p>
               <span className="text-xl font-rajdhani font-bold text-white tabular-nums">
                  {roleType === 'SPONSOR' ? '$842.5k' : roleType === 'OWNER' ? '45,000' : roleType === 'MANAGER' ? '142' : '3,240'}
               </span>
            </div>
            <div className="bg-[#1a1a1a] border border-white/20 p-3 rounded-lg flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
               <p className="text-[9px] text-gray-300 font-orbitron tracking-widest mb-1">{config.metric2}</p>
               <span className="text-xl font-rajdhani font-bold text-white tabular-nums">
                  {roleType === 'SPONSOR' ? '12' : roleType === 'OWNER' ? '4' : roleType === 'MANAGER' ? '8' : '1,502'}
               </span>
            </div>
         </div>

         {/* ACTION BAR AREA */}
         <div className="space-y-3 mb-4">

            {/* ROW 1: ENTITY (PERSON) SEARCH & ADD */}
            <div className="flex items-center gap-3">
               <div className="flex-1 bg-[#0a0a0a] border border-white/10 rounded-lg h-10 flex items-center px-3">
                  <Search size={14} className="text-gray-500 mr-2" />
                  <input
                     type="text"
                     value={personSearch}
                     onChange={(e) => setPersonSearch(e.target.value)}
                     placeholder={`Search ${config.entityLabel}s...`}
                     className="bg-transparent border-none text-xs text-white focus:outline-none w-full font-mono"
                  />
               </div>
               <button
                  onClick={() => setShowAddModal(true)}
                  className={`h-10 px-4 rounded-lg border bg-white/5 hover:bg-white/10 text-white text-xs font-bold font-orbitron tracking-wider flex items-center gap-2 transition-colors ${config.borderColor}`}
               >
                  <Plus size={14} /> ADD NEW
               </button>
            </div>

            {/* ROW 2: SPONSOR SPECIFIC - BRAND SEARCH & ADD BRAND */}
            {roleType === 'SPONSOR' && (
               <div className="flex items-center gap-3 animate-[fadeIn_0.3s_ease-out]">
                  <div className="flex-1 bg-[#0a0a0a] border border-white/10 rounded-lg h-10 flex items-center px-3">
                     <Building size={14} className="text-gray-500 mr-2" />
                     <input
                        type="text"
                        value={brandSearch}
                        onChange={(e) => setBrandSearch(e.target.value)}
                        placeholder="Search Brand..."
                        className="bg-transparent border-none text-xs text-white focus:outline-none w-full font-mono"
                     />
                  </div>
                  <button
                     onClick={() => setShowBrandModal(true)}
                     className={`h-10 px-3 rounded-lg border bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-400 text-[10px] font-bold font-orbitron tracking-wider flex items-center gap-1 transition-colors border-yellow-500/50`}
                  >
                     <Plus size={12} /> ADD NEW BRAND
                  </button>
               </div>
            )}

            {/* ROW 3: OWNER SPECIFIC - VENUE SEARCH & ADD VENUE */}
            {roleType === 'OWNER' && (
               <div className="flex items-center gap-3 animate-[fadeIn_0.3s_ease-out]">
                  <div className="flex-1 bg-[#0a0a0a] border border-white/10 rounded-lg h-10 flex items-center px-3">
                     <MapPin size={14} className="text-gray-500 mr-2" />
                     <input
                        type="text"
                        value={venueSearch}
                        onChange={(e) => setVenueSearch(e.target.value)}
                        placeholder="Search Venue..."
                        className="bg-transparent border-none text-xs text-white focus:outline-none w-full font-mono"
                     />
                  </div>
                  <button
                     onClick={() => setShowVenueModal(true)}
                     className={`h-10 px-3 rounded-lg border bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 text-[10px] font-bold font-orbitron tracking-wider flex items-center gap-1 transition-colors border-purple-500/50`}
                  >
                     <Plus size={12} /> ADD NEW VENUE
                  </button>
               </div>
            )}

            {/* ROW 4: MANAGER & PROMOTER SPECIFIC */}
            {(roleType === 'MANAGER' || roleType === 'PROMOTER') && (
               <div className="flex items-center gap-3 animate-[fadeIn_0.3s_ease-out]">
                  <div className="flex-1 bg-[#0a0a0a] border border-white/10 rounded-lg h-10 flex items-center px-3">
                     <MapPin size={14} className="text-gray-500 mr-2" />
                     <input
                        type="text"
                        value={venueEventSearch}
                        onChange={(e) => setVenueEventSearch(e.target.value)}
                        placeholder="Search Venue or Event..."
                        className="bg-transparent border-none text-xs text-white focus:outline-none w-full font-mono"
                     />
                  </div>
                  <button
                     onClick={() => setShowVenueEventModal(true)}
                     className={`h-10 px-3 rounded-lg border ${roleType === 'MANAGER' ? 'bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border-blue-500/50' : 'bg-pink-500/10 hover:bg-pink-500/20 text-pink-400 border-pink-500/50'} text-[10px] font-bold font-orbitron tracking-wider flex items-center gap-1 transition-colors`}
                  >
                     <Plus size={12} /> ADD NEW VENUE / EVENT
                  </button>
               </div>
            )}

         </div>

         {/* ENTITY LIST */}
         <div className="space-y-3">
            {filteredEntities.map((item) => (
               <div
                  key={item.id}
                  onClick={() => setActiveChatId(item.id)}
                  className="group bg-black/40 border border-white/10 hover:border-white/30 rounded-xl p-3 flex items-center justify-between cursor-pointer transition-all active:scale-[0.99] relative overflow-hidden"
               >
                  <div className={`absolute left-0 top-0 bottom-0 w-1 ${item.status === 'online' ? 'bg-green-500' : 'bg-gray-700'}`}></div>

                  <div className="flex items-center gap-3 pl-2">
                     <div className="relative">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm bg-[#1a1a1a] text-gray-300 border border-white/5`}>
                           {item.avatar}
                        </div>
                        {item.status === 'online' && <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-black rounded-full shadow-lg"></div>}
                     </div>
                     <div>
                        <h3 className="font-bold text-sm text-white leading-none">{item.name}</h3>
                        <p className={`text-[10px] font-mono mt-1 ${config.color}`}>{item.org}</p>
                     </div>
                  </div>

                  <div className="flex items-center gap-3">
                     <div className="text-right hidden sm:block">
                        <p className="text-[9px] text-gray-500 font-mono uppercase tracking-wider">{item.status}</p>
                     </div>
                     <div className={`w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-white/10 group-hover:${config.color} transition-colors`}>
                        <MessageSquare size={14} />
                     </div>
                  </div>
               </div>
            ))}
         </div>

         <div className="mt-8 text-center">
            <p className="text-[10px] text-gray-600 font-mono">
               SECURE DIRECT LINK ESTABLISHED | END-TO-END ENCRYPTED
            </p>
         </div>

      </div>
   );
};