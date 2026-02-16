import React, { useState, useEffect, useRef } from 'react';
import { 
  Users, DollarSign, Activity, Power, ShieldCheck, MessageSquare, 
  Search, Bell, Hash, Edit3, ArrowLeft, Mic, Clock, FileText,
  Home, Smile, Sparkles, Database, FileClock, RefreshCw,
  X, Terminal, Gavel, TrendingUp, Heart, MessageCircle, ExternalLink, ChevronRight,
  Cpu, Zap, Award, Globe, CheckCircle2, Bot,
  RefreshCcw, RotateCw, ToggleLeft, ToggleRight, Undo2, Lock, Bomb, Copy, Save, ChevronDown, AlertTriangle, Play, Send,
  AlertOctagon, UserCheck, MapPin, Crown, BarChart2, Scale, Headset, History, Wallet, Star, Brain, Rocket, Palette, Briefcase
} from 'lucide-react';
import { CyberButton, CyberCard, SectionHeader, CyberBadge } from '../../ui/CyberComponents';
import { Screen } from '../../../types';

interface Props {
  onNavigate: (screen: Screen) => void;
  onBack: () => void;
  agentId: string; // The ID of the agent owning this dashboard (e.g., 'MARK', 'HACKY')
}

// --- CONFIGURATION ---

const AGENT_MAP_FULL = [
  { id: 'ARCHY', code: 'A', color: '#39ff14', icon: Cpu, role: 'HEAD OF AI', name: 'CTO ARCHY' },
  { id: 'DATIN', code: 'D', color: '#10b981', icon: BarChart2, role: 'DATA & MONETIZATION', name: 'DATIN' },
  { id: 'FLOR', code: 'F', color: '#eab308', icon: Scale, role: 'COO & LEGAL', name: 'FLOR' },
  { id: 'HACKY', code: 'H', color: '#ef4444', icon: ShieldCheck, role: 'CISO & GUARDIAN', name: 'HACKY' },
  { id: 'SIRENA', code: 'S', color: '#00ffff', icon: Headset, role: 'LIVE OPS CMDR', name: 'SIRENA' },
  { id: 'ASSI', code: 'I', color: '#ffffff', icon: Brain, role: 'EXECUTIVE ASST.', name: 'ASSI' },
  { id: 'VIPY', code: 'V', color: '#f97316', icon: Briefcase, role: 'B2B PARTNERSHIP', name: 'VIPY' },
  { id: 'MARK', code: 'M', color: '#ec4899', icon: Rocket, role: 'CMO & GROWTH', name: 'MARK' },
  { id: 'DESY', code: 'U', color: '#a855f7', icon: Palette, role: 'CPDO & UX LEAD', name: 'DESY' },
  { id: 'AI_SUPPORT', code: 'G', color: '#9ca3af', icon: Bot, role: 'TEAM PORTAL', name: 'GUIDE' },
];

const ContextControls = ({ onClick, context }: { onClick: (agent: string, ctx: string) => void, context: string }) => (
  <div className="flex items-center gap-0.5 z-20 flex-wrap justify-end max-w-[160px]">
    {AGENT_MAP_FULL.filter(a => ['ARCHY','DATIN','FLOR','HACKY','SIRENA','ASSI','VIPY'].includes(a.id)).map((agent) => (
      <button 
        key={agent.id}
        onClick={(e) => { e.stopPropagation(); onClick(agent.id, `${context}_${agent.id}_LAYER`); }}
        className="w-4 h-4 min-w-[16px] rounded-[3px] border flex items-center justify-center text-[8px] font-orbitron font-bold transition-all duration-200 active:scale-90 hover:scale-110 shadow-sm"
        style={{ 
          borderColor: `${agent.color}50`, 
          backgroundColor: `${agent.color}10`, 
          color: agent.color,
          boxShadow: `0 0 2px ${agent.color}20`
        }}
        title={`Ask ${agent.name}`}
      >
        {agent.code}
      </button>
    ))}
  </div>
);

// --- GLOBAL STATE STORE FOR PERSISTENCE ---
// This ensures that when you switch agents, their specific settings (like Model) are remembered
const AGENT_STATE_STORE: Record<string, {
  modelConfig: string;
  safeMode: boolean;
  quarantined: boolean;
  nuclearArmed: boolean;
}> = {};

// --- AGENT BUTTON HELPER ---
const AgentButton = ({ 
  agentId, 
  context, 
  onClick, 
  label 
}: { 
  agentId: string; 
  context: string; 
  onClick: (id: string, ctx: string) => void;
  label?: string; 
}) => {
  const agent = AGENT_MAP_FULL.find(a => a.id === agentId) || AGENT_MAP_FULL[0];
  const displayLabel = label || agent.code;
  
  return (
    <button 
      onClick={(e) => {
        e.stopPropagation();
        onClick(agentId, context);
      }}
      className="group relative flex items-center justify-center transition-all duration-200 active:scale-90"
      title={`Chat with ${agent.name}`}
    >
      <div 
        className="w-5 h-5 min-w-[20px] rounded-[4px] border flex items-center justify-center text-[10px] font-orbitron font-bold z-20 shadow-[0_0_5px_rgba(0,0,0,0.5)] bg-black/40 backdrop-blur-sm hover:bg-black hover:scale-110 transition-all"
        style={{ borderColor: `${agent.color}80`, color: agent.color, backgroundColor: `${agent.color}10` }}
      >
        {displayLabel}
      </div>
    </button>
  );
};

export const AgentDashboard: React.FC<Props> = ({ onNavigate, onBack, agentId }) => {
  const [activeUsers, setActiveUsers] = useState(75402);
  const [activeChat, setActiveChat] = useState<{ agent: string, context: string } | null>(null);

  // Initialize state from store or defaults if first time accessing this agent
  const storedState = AGENT_STATE_STORE[agentId] || {
    modelConfig: 'Gemini 3.0 Flash',
    safeMode: false,
    quarantined: false,
    nuclearArmed: false
  };

  // OPS STATE (Persisted per agent)
  const [modelConfig, setModelConfig] = useState(storedState.modelConfig);
  const [safeMode, setSafeMode] = useState(storedState.safeMode);
  const [quarantined, setQuarantined] = useState(storedState.quarantined);
  const [nuclearArmed, setNuclearArmed] = useState(storedState.nuclearArmed);
  
  // Non-persisted UI state
  const [leaderboardTab, setLeaderboardTab] = useState<'EARNERS' | 'SPENDERS'>('EARNERS');

  // Update store whenever local state changes
  useEffect(() => {
    AGENT_STATE_STORE[agentId] = {
      modelConfig,
      safeMode,
      quarantined,
      nuclearArmed
    };
  }, [agentId, modelConfig, safeMode, quarantined, nuclearArmed]);

  // HIVE PORTAL STATE
  const [hivePortalData, setHivePortalData] = useState<{
    type: 'BID' | 'VIRAL' | 'PROFILE' | 'HISTORY';
    user: string;
    details: string;
    metrics?: string;
    subType?: 'EARNER' | 'SPENDER';
  } | null>(null);

  // Get Current Owner Config
  const ownerConfig = AGENT_MAP_FULL.find(a => a.id === agentId) || AGENT_MAP_FULL[0];

  const openChat = (agent: string, context: string) => setActiveChat({ agent, context });

  const openHivePortal = (
    type: 'BID' | 'VIRAL' | 'PROFILE' | 'HISTORY', 
    user: string, 
    details: string, 
    metrics?: string,
    subType?: 'EARNER' | 'SPENDER'
  ) => {
    setHivePortalData({ type, user, details, metrics, subType });
  };

  // --- SUB-COMPONENT: HIVE MIND PORTAL ---
  const HiveMindPortal = () => {
    if (!hivePortalData) return null;
    return (
      <div className="fixed inset-0 z-[120] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-[zoomIn_0.2s_ease-out]">
        <div className="w-full max-w-sm bg-[#050505] border border-white/20 rounded-xl overflow-hidden shadow-2xl relative flex flex-col max-h-[80vh]">
          {/* Header */}
          <div className={`px-4 py-3 border-b flex justify-between items-center ${
            hivePortalData.type === 'BID' ? 'bg-yellow-900/20 border-yellow-500/50' : 
            hivePortalData.type === 'VIRAL' ? 'bg-pink-900/20 border-pink-500/50' : 
            hivePortalData.type === 'PROFILE' ? 'bg-purple-900/20 border-purple-500/50' :
            'bg-emerald-900/20 border-emerald-500/50'
          }`}>
             <div className="flex items-center gap-2">
                {hivePortalData.type === 'BID' && <Gavel size={16} className="text-yellow-500" />}
                {hivePortalData.type === 'VIRAL' && <TrendingUp size={16} className="text-pink-500" />}
                {hivePortalData.type === 'PROFILE' && <Award size={16} className="text-purple-500" />}
                {hivePortalData.type === 'HISTORY' && <History size={16} className="text-emerald-500" />}
                
                <span className="font-orbitron font-bold text-sm text-white tracking-widest">
                  {hivePortalData.type === 'HISTORY' ? 'USER_LEDGER' : 'HIVE_MIND_FEED'}
                </span>
             </div>
             <button onClick={() => setHivePortalData(null)} className="text-white/50 hover:text-white"><X size={20} /></button>
          </div>
          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4 bg-black relative custom-scrollbar space-y-4">
             {/* Content Block Logic from Datin */}
             {hivePortalData.type === 'BID' && (
                <div className="p-4 rounded-lg border-l-4 border-yellow-500 bg-yellow-500/10 shadow-[0_0_20px_rgba(234,179,8,0.2)]">
                   <div className="flex items-center gap-2 mb-2">
                      <span className="font-bold text-sm text-yellow-400">@{hivePortalData.user}</span>
                      <CyberBadge label="LIVE" color="#eab308" />
                   </div>
                   <p className="text-xl font-rajdhani font-bold text-white uppercase">PLACED BID: {hivePortalData.metrics}</p>
                   <p className="text-xs text-gray-300 mt-1">{hivePortalData.details}</p>
                </div>
             )}
             {/* ... (Other types handled generically below if strict type check passed) */}
             {hivePortalData.type !== 'BID' && (
                 <div className="p-4 rounded-lg border-l-4 border-white/50 bg-white/5">
                    <div className="flex items-center gap-2 mb-2">
                       <span className="font-bold text-sm text-white">@{hivePortalData.user}</span>
                       <CyberBadge label={hivePortalData.type} color="#ffffff" />
                    </div>
                    <p className="text-sm text-gray-300">{hivePortalData.details}</p>
                    {hivePortalData.metrics && <p className="text-lg font-bold text-white mt-2">{hivePortalData.metrics}</p>}
                 </div>
             )}
             
             {/* Dynamic Context Action based on owner */}
             <CyberButton fullWidth className="h-10 text-[10px]" onClick={() => openChat(agentId, `ANALYZE_${hivePortalData.type}_${hivePortalData.user}`)}>
                ANALYZE WITH {ownerConfig.name}
             </CyberButton>
          </div>
        </div>
      </div>
    );
  };

  // --- SUB-COMPONENT: AGENT CHAT OVERLAY ---
  const AgentChatOverlay = () => {
    if (!activeChat) return null;

    const [input, setInput] = useState('');
    const [history, setHistory] = useState<{sender: 'user' | 'agent', text: string}[]>([]);
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    const agentConfig = AGENT_MAP_FULL.find(a => a.id === activeChat.agent) || AGENT_MAP_FULL[0];

    useEffect(() => {
      const greeting = `Channel open with ${agentConfig.name}. Context: [${activeChat.context}]. How can I assist?`;
      setHistory([{ sender: 'agent', text: greeting }]);
    }, [activeChat, agentConfig.name]);

    useEffect(() => {
      if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }, [history, isTyping]);

    const handleSend = () => {
      if (!input.trim()) return;
      const userMsg = input;
      setHistory(prev => [...prev, { sender: 'user', text: userMsg }]);
      setInput('');
      setIsTyping(true);

      setTimeout(() => {
        setIsTyping(false);
        const responses = [
          `Running analysis on ${activeChat.context}...`,
          "Data point logged. Updating the model.",
          "Confirmed. Execution pending approval.",
          "I see. Let me cross-reference that with the Hive Mind."
        ];
        setHistory(prev => [...prev, { sender: 'agent', text: responses[Math.floor(Math.random() * responses.length)] }]);
      }, 1500);
    };

    return (
      <div className="fixed inset-0 z-[150] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-[fadeIn_0.2s_ease-out]">
         <div className="w-full max-w-sm bg-[#050505] border rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col h-[500px] max-h-[80vh]" style={{ borderColor: `${agentConfig.color}50` }}>
            <div className="bg-[#0a0a0a] p-4 border-b flex items-center justify-between shrink-0" style={{ borderColor: `${agentConfig.color}20` }}>
               <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center border shadow-[0_0_10px_rgba(0,0,0,0.3)]" style={{ borderColor: agentConfig.color, backgroundColor: `${agentConfig.color}20` }}>
                     <agentConfig.icon size={16} style={{ color: agentConfig.color }} />
                  </div>
                  <div>
                     <h3 className="font-orbitron font-bold text-sm tracking-wide" style={{ color: agentConfig.color }}>{agentConfig.name}</h3>
                     <p className="text-[10px] text-gray-500 font-mono flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: agentConfig.color }}></span> ONLINE
                     </p>
                  </div>
               </div>
               <button onClick={() => setActiveChat(null)} className="text-gray-500 hover:text-white"><X size={20} /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-black/50 custom-scrollbar" ref={scrollRef}>
               {history.map((msg, i) => (
                  <div key={i} className={`flex gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                      <div className={`w-6 h-6 rounded flex-shrink-0 flex items-center justify-center text-[10px] font-bold border ${msg.sender === 'agent' ? '' : 'bg-white/10 border-white/20 text-white'}`} style={msg.sender === 'agent' ? { borderColor: agentConfig.color, color: agentConfig.color, backgroundColor: `${agentConfig.color}20` } : {}}>
                          {msg.sender === 'agent' ? agentConfig.code : 'ME'}
                      </div>
                      <div className={`max-w-[80%] rounded-lg p-3 text-xs leading-relaxed border ${msg.sender === 'agent' ? 'bg-[#1a1a1a] border-white/5 text-gray-300 rounded-tl-none' : 'bg-white/10 border-white/20 text-white rounded-tr-none'}`}>
                          {msg.text}
                      </div>
                  </div>
               ))}
               {isTyping && <div className="text-xs animate-pulse ml-9" style={{ color: agentConfig.color }}>Thinking...</div>}
            </div>
            <div className="p-3 bg-[#0a0a0a] border-t border-white/10 flex gap-2 shrink-0">
               <input 
                  type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Type a message..." autoFocus
                  className="flex-1 bg-black border border-white/20 rounded-lg px-3 py-2 text-xs text-white focus:outline-none font-mono"
                  style={{ caretColor: agentConfig.color }}
               />
               <button onClick={handleSend} disabled={!input.trim()} className="rounded-lg w-10 flex items-center justify-center hover:opacity-80 text-black" style={{ backgroundColor: agentConfig.color }}>
                  <Send size={16} />
               </button>
            </div>
         </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 pb-24 animate-[fadeIn_0.3s_ease-out]">
      <AgentChatOverlay />
      <HiveMindPortal />
      
      {/* HEADER: AGENT IDENTIFIER */}
      <div className="bg-black/40 border-b -mx-4 px-4 py-3 mb-4 flex justify-between items-center" style={{ borderColor: `${ownerConfig.color}30`, backgroundColor: `${ownerConfig.color}05` }}>
         <div>
            {/* Customized Format as requested: Executive Asst. (ASSI) */}
            <h1 className="font-orbitron font-bold text-lg tracking-widest" style={{ color: ownerConfig.color }}>{ownerConfig.role} ({ownerConfig.name})</h1>
            {/* Dynamic Access Level just for flavor */}
            <p className="text-[10px] font-mono opacity-80" style={{ color: ownerConfig.color }}>ROLE DASHBOARD | LEVEL 7 ACCESS</p>
         </div>
         <button onClick={onBack} className="text-gray-500 hover:text-white"><X size={20} /></button>
      </div>

      {/* METRICS */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-gray-900/60 border border-gray-700 p-3 rounded-lg flex flex-col justify-between">
           <div className="flex items-center gap-2 text-gray-400 mb-1">
              <Users size={14} />
              <span className="text-[10px] font-orbitron tracking-widest">ACTIVE USERS</span>
           </div>
           <span className="text-2xl font-rajdhani font-bold text-white tabular-nums">{activeUsers.toLocaleString()}</span>
        </div>
        <div className="bg-gray-900/60 border border-gray-700 p-3 rounded-lg flex flex-col justify-between">
           <div className="flex items-center gap-2 text-gray-400 mb-1">
              <DollarSign size={14} />
              <span className="text-[10px] font-orbitron tracking-widest">BUDGET BURN</span>
           </div>
           <span className="text-2xl font-rajdhani font-bold text-white tabular-nums">$142.50 <span className="text-xs text-gray-500 font-normal">/ $295</span></span>
        </div>
      </div>

      {/* SECTION 1: UNIT ECONOMICS */}
      <SectionHeader title="UNIT ECONOMICS" subtitle="PROFITABILITY ENGINE" />
      <div className="bg-[#050505] border border-gray-800 rounded-xl p-4 mb-8 shadow-[0_0_20px_rgba(0,0,0,0.5)] relative overflow-hidden">
         <div className="absolute inset-0 bg-[linear-gradient(rgba(20,20,20,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(20,20,20,0.5)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none opacity-20"></div>
         <div className="flex items-center justify-between mb-6 relative z-10">
            <div className="flex items-center gap-3">
               <Scale className="text-green-500" size={20} />
               <span className="font-orbitron font-bold text-white text-base">ARPU vs CPU</span>
            </div>
            <ContextControls onClick={openChat} context="UNIT_ECONOMICS" />
         </div>
         <div className="mb-4 relative z-10">
             <div className="flex justify-between items-end mb-1">
                <span className="text-[10px] text-gray-400 font-mono font-bold">AVG REVENUE PER USER</span>
                <span className="text-lg font-rajdhani font-bold text-green-400">$4.12</span>
             </div>
             <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 w-[75%] shadow-[0_0_10px_#22c55e]"></div>
             </div>
         </div>
         <div className="mb-6 relative z-10">
             <div className="flex justify-between items-end mb-1">
                <span className="text-[10px] text-gray-400 font-mono font-bold">COST PER USER (CPU)</span>
                <span className="text-lg font-rajdhani font-bold text-red-400">$0.85</span>
             </div>
             <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-red-500 w-[20%] shadow-[0_0_10px_#ef4444]"></div>
             </div>
         </div>
         <div className="pt-4 border-t border-white/5 flex items-center justify-between relative z-10">
             <div className="flex items-center gap-2 text-gray-500">
                <BarChart2 size={12} />
                <span className="text-[10px] font-mono">eCPM TREND</span>
             </div>
             <div className="flex items-center gap-2 text-green-500 text-[10px] font-bold">
                 <div className="w-4 h-4 rounded border border-green-500 flex items-center justify-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                 </div>
                 +12% (Optimization Active)
             </div>
         </div>
      </div>

      {/* SECTION 2: MONETIZATION (DATIN CLONE) */}
      <SectionHeader title="MONETIZATION" subtitle="SHARED PROTOCOL" />
      <div className="grid grid-cols-2 gap-3 mb-6">
         <CyberCard glow="none" className="bg-gray-900/20 relative">
            <div className="absolute top-2 right-2">
               <ContextControls onClick={openChat} context="ADMOB_YIELD" />
            </div>
            <p className="text-[9px] text-gray-500 uppercase font-bold mt-1">AdMob eCPM</p>
            <p className="text-xl font-rajdhani font-bold text-white mt-1">$12.45</p>
            <div className="h-1 bg-gray-800 rounded mt-3 overflow-hidden">
               <div className="bg-green-500 w-[70%] h-full"></div>
            </div>
         </CyberCard>
         <CyberCard glow="none" className="bg-gray-900/20 relative">
            <div className="absolute top-2 right-2">
               <ContextControls onClick={openChat} context="ESCROW_VAULT" />
            </div>
            <p className="text-[9px] text-gray-500 uppercase font-bold mt-1">Escrow Vault</p>
            <p className="text-xl font-rajdhani font-bold text-yellow-500 mt-1">450k <span className="text-[10px] text-gray-600">COINS</span></p>
            <div className="h-1 bg-gray-800 rounded mt-3 overflow-hidden">
               <div className="bg-yellow-500 w-[40%] h-full"></div>
            </div>
         </CyberCard>
      </div>

      {/* SECTION 3: LIVE BID STREAM */}
      <div className="mb-6">
         <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-orbitron font-bold text-yellow-500 tracking-wider flex items-center gap-2">
               <Gavel size={14} /> LIVE BID STREAM
            </h3>
            <span className="text-[9px] text-gray-500 font-mono">SORT: VALUE (DESC)</span>
         </div>
         <div className="bg-yellow-900/10 border border-yellow-500/30 rounded-xl overflow-hidden">
            {[
               { rank: 1, user: 'CryptoKing_99', amount: '5,000', item: 'Backstage Pass', verified: true },
               { rank: 2, user: 'Sarah_Vibes', amount: '3,200', item: 'VIP Table (4)', verified: true },
               { rank: 3, user: 'Neon_Rider', amount: '1,500', item: 'Meet & Greet', verified: false },
               { rank: 4, user: 'Anon_7721', amount: '800', item: 'Signed Merch', verified: false },
            ].map((bid, i) => (
               <div key={i} className="flex items-center justify-between p-3 border-b border-yellow-500/10 last:border-0 hover:bg-yellow-500/5 transition-colors group">
                  <div className="flex items-center gap-3">
                     <div className={`w-6 h-6 rounded flex items-center justify-center font-bold text-xs ${i === 0 ? 'bg-yellow-500 text-black' : 'bg-gray-800 text-gray-400'}`}>
                        #{bid.rank}
                     </div>
                     <div>
                        <div className="flex items-center gap-1.5">
                           <button 
                              onClick={() => openHivePortal('BID', bid.user, bid.item, bid.amount)}
                              className="font-bold text-sm text-gray-200 group-hover:text-yellow-400 transition-colors hover:underline flex items-center gap-1"
                           >
                              @{bid.user} <ExternalLink size={10} className="opacity-50" />
                           </button>
                        </div>
                        <p className="text-[9px] text-gray-500">{bid.item}</p>
                     </div>
                  </div>
                  <div className="flex items-center gap-2">
                      <div className="text-right mr-2">
                         <div className="font-rajdhani font-bold text-yellow-500 text-sm">{bid.amount}</div>
                         <div className="text-[8px] text-gray-600 font-mono">COINS</div>
                      </div>
                      <ContextControls onClick={openChat} context={`BID_VERIFY_${bid.user}`} />
                  </div>
               </div>
            ))}
            <div className="p-2 bg-yellow-500/10 text-center border-t border-yellow-500/20 hover:bg-yellow-500/20 cursor-pointer transition-colors">
               <span className="text-[10px] font-bold text-yellow-500 uppercase flex items-center justify-center gap-1">
                  View All Active Bids <ChevronRight size={10} />
               </span>
            </div>
         </div>
      </div>

      {/* SECTION 4: VIRAL VELOCITY */}
      <div className="mb-6">
         <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-orbitron font-bold text-pink-500 tracking-wider flex items-center gap-2">
               <TrendingUp size={14} /> VIRAL VELOCITY
            </h3>
            <span className="text-[9px] text-gray-500 font-mono">METRIC: HYPE SCORE</span>
         </div>
         <div className="bg-pink-900/10 border border-pink-500/30 rounded-xl overflow-hidden">
            {[
               { rank: 1, user: 'PartyAnimal_X', likes: '1.2k', comments: '342', verified: true, post: 'The laser show at Zone B is INSANE! #TFFR #SuperBowl' },
               { rank: 2, user: 'DJ_Spinz', likes: '890', comments: '156', verified: true, post: 'Dropping a secret set in 10 mins. Find the green door.' },
               { rank: 3, user: 'Festival_Queen', likes: '650', comments: '98', verified: true, post: 'Who needs VIP when General Admin has this vibe?' },
               { rank: 4, user: 'Rave_Dave', likes: '420', comments: '45', verified: false, post: 'Trading 2 waters for a charging cable. DM me.' },
            ].map((user, i) => (
               <div key={i} className="flex items-center justify-between p-3 border-b border-pink-500/10 last:border-0 hover:bg-pink-500/5 transition-colors group">
                  <div className="flex items-center gap-3">
                     <div className="w-8 h-8 rounded-full bg-gray-800 border border-gray-600 flex items-center justify-center relative overflow-hidden">
                        <span className="text-xs font-bold text-gray-500">{user.user.charAt(0)}</span>
                        {user.verified && <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-blue-500 border-2 border-black rounded-full"></div>}
                     </div>
                     <div>
                        <div className="flex items-center gap-1.5">
                           <button 
                              onClick={() => openHivePortal('VIRAL', user.user, user.post, `${user.likes}|${user.comments}`)}
                              className="font-bold text-sm text-gray-200 group-hover:text-pink-400 transition-colors hover:underline flex items-center gap-1"
                           >
                              @{user.user} <ExternalLink size={10} className="opacity-50" />
                           </button>
                        </div>
                        <p className="text-[9px] text-gray-500 font-mono">Potential Influencer</p>
                     </div>
                  </div>
                  <div className="flex items-center gap-2">
                     <div className="flex items-center gap-3 mr-2">
                        <div className="text-center"><div className="flex items-center gap-1 text-pink-400 text-xs font-bold"><Heart size={10} fill="currentColor" /> {user.likes}</div></div>
                        <div className="text-center"><div className="flex items-center gap-1 text-purple-400 text-xs font-bold"><MessageCircle size={10} fill="currentColor" /> {user.comments}</div></div>
                     </div>
                     <ContextControls onClick={openChat} context={`VIRAL_CHECK_${user.user}`} />
                  </div>
               </div>
            ))}
            <div className="p-2 bg-pink-500/10 text-center border-t border-pink-500/20 hover:bg-pink-500/20 cursor-pointer transition-colors">
               <span className="text-[10px] font-bold text-pink-500 uppercase flex items-center justify-center gap-1">
                  Analyze Viral Trends <ChevronRight size={10} />
               </span>
            </div>
         </div>
      </div>

      {/* SECTION 5: FLASH PROMOTER ANALYTICS */}
      <div className="mb-6">
         <div className="flex items-center justify-between mb-2">
             <div className="flex items-center gap-2">
                 <Zap className="text-orange-500" size={18} />
                 <div>
                    <h2 className="text-sm font-orbitron font-bold text-white">FLASH PROMOTER</h2>
                    <p className="text-[9px] text-orange-400 font-mono">VENUE & GIG PERFORMANCE</p>
                 </div>
             </div>
             <ContextControls onClick={openChat} context="FLASH_PROMOTER_ANALYTICS" />
         </div>

         <div className="bg-orange-900/10 border border-orange-500/30 rounded-xl overflow-hidden">
             <div className="grid grid-cols-3 border-b border-orange-500/20 bg-orange-900/20">
                 <div className="p-3 text-center border-r border-orange-500/20">
                     <p className="text-[9px] text-orange-300 font-mono mb-1">TOTAL REV</p>
                     <p className="text-lg font-rajdhani font-bold text-white">$12.4k</p>
                 </div>
                 <div className="p-3 text-center border-r border-orange-500/20">
                     <p className="text-[9px] text-orange-300 font-mono mb-1">RSVPs</p>
                     <p className="text-lg font-rajdhani font-bold text-white">3,240</p>
                 </div>
                 <div className="p-3 text-center">
                     <p className="text-[9px] text-orange-300 font-mono mb-1">ACT BIDS</p>
                     <p className="text-lg font-rajdhani font-bold text-white">142</p>
                 </div>
             </div>
             <div className="p-0">
                 <div className="bg-black/40 px-3 py-2 flex justify-between text-[9px] text-gray-500 font-mono uppercase tracking-wider">
                     <span>VENUE / PROMOTER</span>
                     <span className="text-right">REV / RSVP</span>
                 </div>
                 {[
                    { name: 'Club Cyberia', promoter: 'Neon_Steve', rev: '$4,200', rsvp: '850', bids: '45' },
                    { name: 'The Grid Lounge', promoter: 'Sarah_Vibes', rev: '$3,850', rsvp: '620', bids: '38' },
                    { name: 'Underground Zone', promoter: 'Bass_Head', rev: '$2,100', rsvp: '410', bids: '22' },
                    { name: 'VIP Skybox', promoter: 'Lux_Events', rev: '$1,950', rsvp: '120', bids: '15' },
                 ].map((venue, i) => (
                    <div key={i} className="flex items-center justify-between p-3 border-b border-orange-500/10 last:border-0 hover:bg-orange-500/5 transition-colors group">
                        <div className="flex items-center gap-3">
                           <div className="w-8 h-8 rounded bg-gray-800 flex items-center justify-center text-orange-500 border border-white/5">
                               <MapPin size={14} />
                           </div>
                           <div>
                               <p className="text-xs font-bold text-gray-200">{venue.name}</p>
                               <p className="text-[10px] text-gray-500">@{venue.promoter}</p>
                           </div>
                        </div>
                        <div className="flex items-center gap-2">
                           <div className="text-right mr-2">
                               <p className="text-sm font-rajdhani font-bold text-orange-400">{venue.rev}</p>
                               <div className="flex items-center justify-end gap-2 text-[9px] text-gray-500 font-mono">
                                  <span className="flex items-center gap-0.5"><Users size={8} /> {venue.rsvp}</span>
                                  <span className="flex items-center gap-0.5"><Gavel size={8} /> {venue.bids}</span>
                               </div>
                           </div>
                           <ContextControls onClick={openChat} context={`VENUE_${venue.name.toUpperCase().replace(/\s/g, '_')}`} />
                        </div>
                    </div>
                 ))}
                 <button className="w-full mt-0 py-2 text-[10px] text-orange-400 font-mono hover:text-white transition-colors border-t border-orange-500/10 hover:bg-orange-500/10">
                     VIEW FULL LIST >
                 </button>
             </div>
         </div>
      </div>

      {/* SECTION 6: MERIT SCORE ECONOMY */}
      <div className="mb-6">
         <div className="flex items-center justify-between mb-2">
             <div className="flex items-center gap-2">
                 <Award className="text-purple-500" size={18} />
                 <div>
                    <h2 className="text-sm font-orbitron font-bold text-white">MERIT SCORE</h2>
                    <p className="text-[9px] text-purple-400 font-mono">REPUTATION LEADERBOARD</p>
                 </div>
             </div>
             <ContextControls onClick={openChat} context="MERIT_SCORE_ECONOMY" />
         </div>

         <div className="bg-purple-900/10 border border-purple-500/30 rounded-xl p-4">
             <div className="flex items-center justify-between mb-4 bg-purple-900/20 p-3 rounded-lg border border-purple-500/20">
                 <div className="flex items-center gap-3">
                    <UserCheck className="text-purple-400" size={20} />
                    <div>
                        <p className="text-[10px] text-gray-400 font-mono uppercase">Transparency Rate</p>
                        <p className="text-xs text-purple-200">Users showing score publicly</p>
                    </div>
                 </div>
                 <div className="text-right">
                     <p className="text-2xl font-rajdhani font-bold text-purple-400">87%</p>
                 </div>
             </div>
             <div>
                 <p className="text-[10px] text-gray-500 font-mono uppercase tracking-widest mb-2">TOP 50 LEADERBOARD (0-300)</p>
                 <div className="space-y-1">
                     {[
                        { rank: 1, user: 'Nova_Prime', score: 298, badge: 'LEGEND' },
                        { rank: 2, user: 'Gig_Master', score: 295, badge: 'ELITE' },
                        { rank: 3, user: 'Helper_Bot_7', score: 291, badge: 'ELITE' },
                        { rank: 4, user: 'Crowd_Surfer', score: 288, badge: 'PRO' },
                        { rank: 5, user: 'Techno_Viking', score: 285, badge: 'PRO' },
                     ].map((user, i) => (
                        <div key={i} className="flex items-center justify-between bg-black/40 p-2 rounded border border-white/5 hover:border-purple-500/30 transition-colors">
                            <div className="flex items-center gap-3">
                                <span className={`font-mono text-xs font-bold w-6 text-center ${i === 0 ? 'text-yellow-400' : 'text-gray-500'}`}>#{user.rank}</span>
                                <button 
                                   onClick={() => openHivePortal('PROFILE', user.user, user.badge, user.score.toString())}
                                   className="text-xs font-bold text-gray-200 hover:text-purple-400 hover:underline transition-colors text-left flex items-center gap-1"
                                >
                                   @{user.user} <ExternalLink size={10} className="opacity-50" />
                                </button>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="text-right">
                                   <div className="flex items-center justify-end gap-1">
                                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20">{user.badge}</span>
                                      <span className="font-rajdhani font-bold text-sm text-white w-8 text-right">{user.score}</span>
                                   </div>
                                </div>
                                <ContextControls onClick={openChat} context={`USER_MERIT_${user.user.toUpperCase()}`} />
                            </div>
                        </div>
                     ))}
                 </div>
                 <button className="w-full mt-2 py-2 text-[10px] text-purple-400 font-mono hover:text-white transition-colors border-t border-white/5">
                     VIEW FULL RANKING >
                 </button>
             </div>
         </div>
      </div>

      {/* SECTION 7: USER VALUE SEGMENTATION */}
      <div className="mb-8">
         <div className="flex items-center justify-between mb-4">
             <div className="flex items-center gap-2">
                 <Crown className="text-yellow-500" size={18} />
                 <div>
                    <h2 className="text-sm font-orbitron font-bold text-white">USER VALUE</h2>
                    <p className="text-[9px] text-yellow-500 font-mono">TOP 50 SEGMENTATION</p>
                 </div>
             </div>
             <ContextControls onClick={openChat} context={`USER_VALUE_${leaderboardTab}`} />
         </div>
         <div className="flex p-1 bg-black/40 border border-white/10 rounded-lg mb-3">
             <button 
                 onClick={() => setLeaderboardTab('EARNERS')}
                 className={`flex-1 py-2 text-[10px] font-bold font-orbitron rounded transition-all ${leaderboardTab === 'EARNERS' ? 'bg-emerald-500 text-black shadow-[0_0_10px_rgba(16,185,129,0.4)]' : 'text-gray-500 hover:text-white'}`}
             >
                 TOP PROFITABLE (EARNERS)
             </button>
             <button 
                 onClick={() => setLeaderboardTab('SPENDERS')}
                 className={`flex-1 py-2 text-[10px] font-bold font-orbitron rounded transition-all ${leaderboardTab === 'SPENDERS' ? 'bg-yellow-500 text-black shadow-[0_0_10px_rgba(234,179,8,0.4)]' : 'text-gray-500 hover:text-white'}`}
             >
                 TOP CLIENTS (SPENDERS)
             </button>
         </div>
         <div className="bg-gray-900/20 border border-white/10 rounded-xl overflow-hidden">
             <div className="px-3 py-2 bg-white/5 border-b border-white/5 flex justify-between text-[9px] text-gray-500 font-mono uppercase tracking-wider">
                 <span>USER RANK</span>
                 <span>{leaderboardTab === 'EARNERS' ? 'COINS RECEIVED' : 'COINS TIPPED'}</span>
             </div>
             {(leaderboardTab === 'EARNERS' ? [
                 { rank: 1, user: 'Gig_Goddess', amount: '12,450', role: 'VIP Waitress' },
                 { rank: 2, user: 'Fast_Runner', amount: '8,200', role: 'Courier' },
                 { rank: 3, user: 'Line_Holder_Pro', amount: '6,150', role: 'Service' },
                 { rank: 4, user: 'Info_Broker', amount: '5,900', role: 'Intel' },
                 { rank: 5, user: 'Charge_Master', amount: '4,200', role: 'Tech Support' },
             ] : [
                 { rank: 1, user: 'Whale_Watcher', amount: '25,000', role: 'VIP Guest' },
                 { rank: 2, user: 'Party_Sponsor', amount: '18,500', role: 'Sponsor' },
                 { rank: 3, user: 'Big_Spender_88', amount: '15,200', role: 'Backstage' },
                 { rank: 4, user: 'Group_Lead', amount: '12,100', role: 'VIP Table' },
                 { rank: 5, user: 'Late_Arrival', amount: '9,800', role: 'General Admin' },
             ]).map((item, i) => (
                 <div key={i} className="flex items-center justify-between p-3 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                     <div className="flex items-center gap-3">
                         <div className={`w-6 h-6 rounded flex items-center justify-center font-bold text-xs ${i === 0 ? (leaderboardTab === 'EARNERS' ? 'bg-emerald-500 text-black' : 'bg-yellow-500 text-black') : 'bg-gray-800 text-gray-400'}`}>
                             #{item.rank}
                         </div>
                         <div>
                             <button 
                                onClick={() => openHivePortal('HISTORY', item.user, item.role, item.amount, leaderboardTab === 'EARNERS' ? 'EARNER' : 'SPENDER')}
                                className="text-xs font-bold text-gray-200 hover:text-white hover:underline transition-colors text-left flex items-center gap-1"
                             >
                                @{item.user} <ExternalLink size={10} className="opacity-50" />
                             </button>
                             <p className="text-[9px] text-gray-500">{item.role}</p>
                         </div>
                     </div>
                     <div className="flex items-center gap-2">
                        <div className="text-right mr-2">
                            <p className={`font-rajdhani font-bold text-lg ${leaderboardTab === 'EARNERS' ? 'text-emerald-400' : 'text-yellow-400'}`}>
                                {item.amount}
                            </p>
                            <p className="text-[8px] text-gray-600 font-mono text-right">COINS</p>
                        </div>
                        <ContextControls onClick={openChat} context={`USER_VALUE_${item.user.toUpperCase()}`} />
                     </div>
                 </div>
             ))}
             <button className="w-full mt-0 py-2 text-[10px] text-gray-500 font-mono hover:text-white transition-colors border-t border-white/5 hover:bg-white/5">
                  VIEW FULL RANKING >
             </button>
         </div>
      </div>

      {/* SECTION 8: HIVE MIND HUB */}
      <SectionHeader title="HIVE MIND HUB" subtitle="NEURAL INTERLINK" />
      <div className="grid grid-cols-2 gap-3 mb-6">
         {/* Flash Promoter */}
         <div className="bg-orange-900/10 border border-orange-500/30 rounded-xl p-3 relative group hover:bg-orange-900/20 transition-all cursor-pointer">
             <div className="absolute top-2 right-2 flex gap-1">
                 <AgentButton agentId="ARCHY" context="FLASH_TECH" onClick={openChat} label="A" />
                 <AgentButton agentId="HACKY" context="FLASH_SECURITY" onClick={openChat} label="H" />
             </div>
             <div className="flex items-center gap-2 mb-2">
                 <div className="p-1.5 bg-orange-500/20 rounded text-orange-500"><Zap size={16} /></div>
                 <span className="text-[10px] font-orbitron font-bold text-white leading-none">FLASH<br/>PROMOTER</span>
             </div>
             <div className="flex items-end justify-between">
                 <div>
                    <div className="flex items-center gap-1 text-[9px] text-gray-400 font-mono mb-0.5"><span className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_5px_#22c55e]"></span> ACTIVE</div>
                    <div className="text-lg font-rajdhani font-bold text-white">24 <span className="text-[10px] font-sans font-normal text-gray-500">Live Gigs</span></div>
                 </div>
             </div>
         </div>

         {/* Merit Score */}
         <div className="bg-purple-900/10 border border-purple-500/30 rounded-xl p-3 relative group hover:bg-purple-900/20 transition-all cursor-pointer">
             <div className="absolute top-2 right-2 flex gap-1">
                 <AgentButton agentId="ARCHY" context="SCORE_TECH" onClick={openChat} label="A" />
                 <AgentButton agentId="HACKY" context="SCORE_FRAUD" onClick={openChat} label="H" />
             </div>
             <div className="flex items-center gap-2 mb-2">
                 <div className="p-1.5 bg-purple-500/20 rounded text-purple-500"><Award size={16} /></div>
                 <span className="text-[10px] font-orbitron font-bold text-white leading-none">MERIT<br/>SCORE</span>
             </div>
             <div className="flex items-end justify-between">
                 <div>
                    <div className="flex items-center gap-1 text-[9px] text-gray-400 font-mono mb-0.5"><span className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_5px_#22c55e]"></span> ONLINE</div>
                    <div className="text-lg font-rajdhani font-bold text-white">v2.4 <span className="text-[10px] font-sans font-normal text-gray-500">Stable</span></div>
                 </div>
             </div>
         </div>
      </div>

      {/* SECTION 9: WP NETWORK */}
      <div className="bg-blue-900/10 border border-blue-500/30 rounded-xl p-3 mb-8 relative">
          <div className="absolute top-3 right-3 flex gap-1">
             <AgentButton agentId="ARCHY" context="WP_NET_TECH" onClick={openChat} label="A" />
             <AgentButton agentId="HACKY" context="WP_NET_SEC" onClick={openChat} label="H" />
          </div>
          <div className="flex items-center gap-2 mb-3">
              <div className="p-1.5 bg-blue-500/20 rounded text-blue-500"><Globe size={16} /></div>
              <div><h4 className="text-xs font-orbitron font-bold text-white">WORDPRESS NETWORK</h4><p className="text-[9px] text-gray-400 font-mono">CMS CLUSTER STATUS</p></div>
          </div>
          
          <div className="space-y-2">
              {['meritocracycoin.com', 'meritocracy.club', 'thehumanteam.org', 'influentialcircle.com'].map((site, i) => (
                  <div key={i} className="flex items-center justify-between bg-black/40 p-2 rounded border border-white/5 hover:bg-white/5 transition-colors group">
                      <div className="flex items-center gap-2">
                          <CheckCircle2 size={10} className="text-green-500" />
                          <a href={`https://${site}`} target="_blank" rel="noopener noreferrer" className="text-[10px] text-gray-300 font-sans hover:text-white transition-colors">{site}</a>
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity ml-1">
                            {/* Row Agent: Archy */}
                            <AgentButton agentId="ARCHY" context={`WP_SITE_${site.replace(/\./g, '_')}`} onClick={openChat} label="A" />
                          </div>
                      </div>
                      <span className="text-[9px] text-blue-400 font-mono">SYNCED</span>
                  </div>
              ))}
          </div>
      </div>

      {/* --- DYNAMIC OPS CENTER (AGENT SPECIFIC) --- */}
      <SectionHeader title={`${ownerConfig.name} OPS`} subtitle={`${ownerConfig.role} PROTOCOL`} />

      <div className={`border rounded-xl p-4 relative overflow-hidden transition-colors duration-500 ${quarantined ? 'bg-red-950/20 border-red-500/50' : 'bg-gray-900/20 border-gray-700'}`} style={!quarantined ? { borderColor: `${ownerConfig.color}40`, backgroundColor: `${ownerConfig.color}05` } : {}}>
         
         <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
            <ownerConfig.icon size={120} style={{ color: ownerConfig.color }} />
         </div>

         <div className="flex items-center justify-between mb-6 relative z-10">
            <div className="flex items-center gap-3">
               <div className={`w-3 h-3 rounded-full shadow-[0_0_8px] ${quarantined ? 'bg-red-500 shadow-red-500 animate-pulse' : 'bg-green-500 shadow-green-500'}`}></div>
               <div>
                  <h3 className={`font-orbitron font-bold text-sm ${quarantined ? 'text-red-500' : 'text-white'}`}>
                     STATUS: {quarantined ? 'OFFLINE' : 'ONLINE'}
                  </h3>
                  <p className="text-[9px] text-gray-400 font-mono">
                     {quarantined ? 'CONNECTION SEVERED' : 'NEURAL LINK STABLE'}
                  </p>
               </div>
            </div>
            {/* HERE IS THE KEY: The chat context defaults to the Owner Agent, but can switch */}
            <ContextControls onClick={openChat} context={`${ownerConfig.id}_OPS_STATUS`} />
         </div>

         {/* 1. MODEL CONFIG */}
         <div className="bg-black/40 border border-white/5 rounded-lg p-3 mb-4 relative z-10">
            <div className="flex justify-between items-start mb-2">
               <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">GEMINI MODEL CONFIG</p>
               {/* Context for model config chat */}
               <button onClick={() => openChat(agentId, `${agentId}_MODEL_CONFIG`)} className="text-[9px] text-white hover:underline">
                  Chat Context >
               </button>
            </div>
            
            <div className="flex items-center gap-2">
               <div className="flex-1">
                  <button 
                     onClick={() => setModelConfig(prev => prev.includes('Flash') ? 'Gemini 3.0 Pro' : 'Gemini 3.0 Flash')}
                     className="w-full bg-[#1a1a1a] border border-white/10 hover:border-white/30 rounded px-3 py-2 flex items-center justify-between group transition-all"
                  >
                     <div className="flex items-center gap-2">
                        <Cpu size={14} style={{ color: ownerConfig.color }} />
                        <span className="text-xs font-bold text-white">{modelConfig}</span>
                     </div>
                     <RefreshCw size={12} className="text-gray-500" />
                  </button>
               </div>
            </div>
         </div>

         {/* 2. SYSTEM INSTRUCTIONS */}
         <div className="bg-black/40 border border-white/5 rounded-lg p-3 mb-6 relative z-10">
            <div className="flex justify-between items-center mb-2">
               <div className="flex items-center gap-2">
                  <Database size={12} style={{ color: ownerConfig.color }} />
                  <p className="text-[9px] font-bold uppercase tracking-widest" style={{ color: ownerConfig.color }}>SYSTEM GEM (INSTRUCTIONS)</p>
               </div>
               <div className="flex gap-2">
                  <button className="text-[9px] bg-white/5 hover:bg-white/10 px-2 py-1 rounded text-white flex items-center gap-1 border border-white/10">
                     <Edit3 size={10} /> EDIT
                  </button>
               </div>
            </div>
            <div className="h-16 bg-[#050505] rounded border border-white/10 p-2 overflow-hidden relative group cursor-text">
               <p className="text-[9px] text-gray-500 font-mono leading-relaxed">
                  You are {ownerConfig.name}. Your role is {ownerConfig.role}. Ensure all operations within your domain are optimized for the event...
               </p>
            </div>
         </div>

         {/* 3. RECOVERY ACTIONS (Generic for Clone) */}
         <div className="space-y-3 relative z-10">
            
            {/* LEVEL 1: SOFT FIX */}
            <div className="border border-white/10 bg-white/5 rounded-lg overflow-hidden">
               <div className="px-3 py-2 bg-white/5 border-b border-white/10 flex justify-between items-center">
                  <span className="text-[9px] font-bold text-gray-300 uppercase tracking-widest flex items-center gap-1">
                     <RefreshCcw size={10} /> LEVEL 1: SOFT FIX
                  </span>
                  <ContextControls onClick={openChat} context={`${agentId}_LEVEL_1_FIX`} />
               </div>
               <div className="p-2 grid grid-cols-2 gap-2">
                  <button className="bg-black/40 border border-white/10 text-gray-300 p-2 rounded flex flex-col items-center justify-center gap-1 active:scale-95 transition-all hover:bg-white/5">
                     <RefreshCcw size={16} />
                     <span className="text-[9px] font-bold">RESET MEMORY</span>
                  </button>
                  <button className="bg-black/40 border border-white/10 text-gray-300 p-2 rounded flex flex-col items-center justify-center gap-1 active:scale-95 transition-all hover:bg-white/5">
                     <RotateCw size={16} />
                     <span className="text-[9px] font-bold">HOT RELOAD</span>
                  </button>
               </div>
            </div>

            {/* LEVEL 2: HARD STOP */}
            <div className="border border-white/10 bg-white/5 rounded-lg overflow-hidden">
               <div className="px-3 py-2 bg-white/5 border-b border-white/10 flex justify-between items-center">
                  <span className="text-[9px] font-bold text-gray-300 uppercase tracking-widest flex items-center gap-1">
                     <AlertTriangle size={10} /> LEVEL 2: HARD STOP
                  </span>
                  <ContextControls onClick={openChat} context={`${agentId}_LEVEL_2_FIX`} />
               </div>
               <div className="p-2 flex gap-2">
                  <button 
                     onClick={() => setSafeMode(!safeMode)}
                     className={`flex-1 p-2 rounded border flex items-center justify-between px-3 transition-all ${safeMode ? 'bg-orange-500/20 border-orange-500 text-orange-500' : 'bg-black/40 border-white/10 text-gray-400'}`}
                  >
                     <span className="text-[9px] font-bold">SAFE MODE</span>
                     {safeMode ? <ToggleRight size={18} /> : <ToggleLeft size={18} />}
                  </button>
                  <button className="flex-1 bg-black/40 hover:bg-white/5 border border-white/10 text-gray-300 p-2 rounded flex items-center justify-center gap-2 active:scale-95 transition-all">
                     <Undo2 size={16} />
                     <span className="text-[9px] font-bold">ROLLBACK (15m)</span>
                  </button>
               </div>
            </div>

            {/* LEVEL 3: NUCLEAR */}
            <div className="border border-red-500/30 bg-red-900/10 rounded-lg overflow-hidden">
               <div className="px-3 py-2 bg-red-900/20 border-b border-red-500/30 flex justify-between items-center">
                  <span className="text-[9px] font-bold text-red-500 uppercase tracking-widest flex items-center gap-1">
                     <Bomb size={10} /> LEVEL 3: NUCLEAR
                  </span>
                  <ContextControls onClick={openChat} context={`${agentId}_LEVEL_3_FIX`} />
               </div>
               <div className="p-2 grid grid-cols-2 gap-2">
                  <button 
                     onClick={() => setQuarantined(!quarantined)}
                     className={`p-2 rounded border flex flex-col items-center justify-center gap-1 active:scale-95 transition-all ${quarantined ? 'bg-red-500/20 border-red-500 text-red-500' : 'bg-black/40 border-red-500/30 text-red-500'}`}
                  >
                     <Lock size={16} />
                     <span className="text-[9px] font-bold">{quarantined ? 'LIFT QUARANTINE' : 'QUARANTINE AI'}</span>
                  </button>
                  <button 
                     onClick={() => setNuclearArmed(!nuclearArmed)}
                     className={`p-2 rounded border flex flex-col items-center justify-center gap-1 active:scale-95 transition-all ${nuclearArmed ? 'bg-red-500 text-black border-red-500 animate-pulse' : 'bg-black/40 border-red-500/30 text-red-500'}`}
                  >
                     <Power size={16} />
                     <span className="text-[9px] font-bold">{nuclearArmed ? 'ARMED (CLICK AGAIN)' : 'SHUTDOWN'}</span>
                  </button>
               </div>
            </div>

         </div>

      </div>

    </div>
  );
};
