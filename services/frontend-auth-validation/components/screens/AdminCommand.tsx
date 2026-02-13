import React, { useState, useEffect, useRef } from 'react';
import {
   Users, DollarSign, Activity, Power, ShieldCheck, MessageSquare,
   Search, Bell, Hash, Edit3, ArrowLeft, Mic, Clock, FileText,
   Home, Smile, Sparkles, Database, FileClock, RefreshCw,
   X, Terminal, Gavel, TrendingUp, Heart, MessageCircle, ExternalLink, ChevronRight,
   Cpu, Zap, Award, Globe, CheckCircle2, Bot,
   RefreshCcw, RotateCw, ToggleLeft, ToggleRight, Undo2, Lock, Bomb, Copy, Save, ChevronDown, AlertTriangle, Play, Send,
   AlertOctagon, Scale, Headset, BarChart2, Briefcase, Eye, Link
} from 'lucide-react';
import { CyberButton, CyberCard, SectionHeader, CyberBadge, IsotypeTheFunFanReporter } from '../ui/CyberComponents';
import { Screen } from '../../types';

interface Props {
   adminId: string | null;
   onNavigate: (screen: Screen) => void;
}

// --- AGENT CONFIGURATION (V4.0 BLUEPRINT) ---
const AGENT_CONFIG: Record<string, { name: string; role: string; color: string; icon: any; greeting: string }> = {
   ARCHY: {
      name: 'CTO ARCHY',
      role: 'HEAD OF AI & ARCHITECTURE',
      color: '#39ff14', // Cyber Green
      icon: Cpu,
      greeting: 'Systems nominal. Backend architecture ready. What is your command?'
   },
   FLOR: {
      name: 'FLOR',
      role: 'COO & LEGAL / FINOPS',
      color: '#eab308', // Yellow
      icon: Scale,
      greeting: 'Financial safeguards active. Monitoring burn rate against the $295 event cap.'
   },
   SIRENA: {
      name: 'SIRENA',
      role: 'LIVE OPS COMMANDER',
      color: '#00ffff', // Cyan
      icon: Headset,
      greeting: 'Liquid Mode standby. Ready to support offline users and moderate the Hive Mind.'
   },
   HACKY: {
      name: 'HACKY',
      role: 'CISO & GUARDIAN',
      color: '#ef4444', // Red
      icon: ShieldCheck,
      greeting: 'Perimeter secure. Zero Trust architecture enforced. Ready for load testing.'
   },
   DATIN: {
      name: 'DATIN',
      role: 'DATA & MONETIZATION',
      color: '#10b981', // Emerald
      icon: BarChart2,
      greeting: 'AdMob eCPM optimization algorithms running. Analyzing Meritocracy Coin economy.'
   },
   VIPY: {
      name: 'VIPY',
      role: 'B2B & PARTNERSHIPS',
      color: '#f97316', // Orange
      icon: Briefcase,
      greeting: 'FlashPromoter channels open. Nightclub liaisons are standing by.'
   }
};

// --- REUSABLE AGENT BUTTON COMPONENT ---
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
   const config = AGENT_CONFIG[agentId] || AGENT_CONFIG.ARCHY;
   const displayLabel = label || agentId.charAt(0);

   return (
      <button
         onClick={(e) => {
            e.stopPropagation();
            onClick(agentId, context);
         }}
         className="group relative flex items-center justify-center transition-all duration-200 active:scale-90"
         title={`Chat with ${config.name}`}
      >
         <div
            className="w-5 h-5 min-w-[20px] rounded-[4px] border flex items-center justify-center text-[10px] font-orbitron font-bold z-20 shadow-[0_0_5px_rgba(0,0,0,0.5)] bg-black/40 backdrop-blur-sm hover:bg-black hover:scale-110 transition-all"
            style={{ borderColor: `${config.color}80`, color: config.color, backgroundColor: `${config.color}10` }}
         >
            {displayLabel}
         </div>
      </button>
   );
};

export const AdminCommand: React.FC<Props> = ({ adminId, onNavigate }) => {
   const [killSwitchActive, setKillSwitchActive] = useState(false);
   const [activeUsers, setActiveUsers] = useState(75402);
   const [showAuditLogs, setShowAuditLogs] = useState(false);

   // CHAT STATE
   const [activeAgentId, setActiveAgentId] = useState<string | null>(null);
   const [chatContext, setChatContext] = useState<string | null>(null);

   // HIVE MIND PORTAL STATE (Simulation of jumping to the feed)
   const [hivePortalData, setHivePortalData] = useState<{
      type: 'BID' | 'VIRAL' | 'LOG';
      user: string;
      details: string;
      metrics?: string;
   } | null>(null);

   const toggleKillSwitch = () => setKillSwitchActive(!killSwitchActive);

   const openChat = (agentId: string, context: string) => {
      setActiveAgentId(agentId);
      setChatContext(context);
   };

   const openHivePortal = (type: 'BID' | 'VIRAL' | 'LOG', user: string, details: string, metrics?: string) => {
      setHivePortalData({ type, user, details, metrics });
   };

   // --- SUB-COMPONENT: HIVE MIND PORTAL (SIMULATION) ---
   const HiveMindPortal = () => {
      if (!hivePortalData) return null;

      return (
         <div className="fixed inset-0 z-[120] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-[zoomIn_0.2s_ease-out]">
            <div className="w-full max-w-sm bg-[#050505] border border-white/20 rounded-xl overflow-hidden shadow-2xl relative">

               {/* Header */}
               <div className={`px-4 py-3 border-b flex justify-between items-center ${hivePortalData.type === 'BID' ? 'bg-yellow-900/20 border-yellow-500/50' : hivePortalData.type === 'VIRAL' ? 'bg-pink-900/20 border-pink-500/50' : 'bg-gray-900 border-white/20'}`}>
                  <div className="flex items-center gap-2">
                     {hivePortalData.type === 'BID' && <Gavel size={16} className="text-yellow-500" />}
                     {hivePortalData.type === 'VIRAL' && <TrendingUp size={16} className="text-pink-500" />}
                     {hivePortalData.type === 'LOG' && <Terminal size={16} className="text-cyber-green" />}

                     <span className="font-orbitron font-bold text-sm text-white tracking-widest">
                        {hivePortalData.type === 'LOG' ? 'SYSTEM_TERMINAL' : 'HIVE_MIND_FEED'}
                     </span>
                  </div>
                  <button onClick={() => setHivePortalData(null)} className="text-white/50 hover:text-white"><X size={20} /></button>
               </div>

               {/* Simulation Content */}
               <div className="p-0 h-[400px] bg-black relative overflow-hidden flex flex-col">

                  {/* Background Matrix Effect */}
                  <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>

                  {/* Simulated Feed / Log View */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4 relative z-10 custom-scrollbar">

                     {/* Context: 75k Users Noise */}
                     {hivePortalData.type !== 'LOG' && (
                        <div className="space-y-2 opacity-30 blur-[1px]">
                           <div className="text-[10px] text-gray-500">User_992: <span className="text-gray-400">Where is the north gate?</span></div>
                           <div className="text-[10px] text-gray-500">Fan_Girl: <span className="text-gray-400">OMG THIS IS AMAZING</span></div>
                           <div className="text-[10px] text-gray-500">Cyber_Punk: <span className="text-gray-400">Buying water 10 coins</span></div>
                        </div>
                     )}

                     {/* THE TARGET EVENT (HIGHLIGHTED) */}
                     <div className={`p-4 rounded-lg border-l-4 shadow-[0_0_20px_rgba(0,0,0,0.5)] animate-pulse ${hivePortalData.type === 'BID' ? 'bg-yellow-500/10 border-yellow-500' :
                        hivePortalData.type === 'VIRAL' ? 'bg-pink-500/10 border-pink-500' :
                           'bg-green-500/10 border-green-500'
                        }`}>
                        <div className="flex items-center gap-2 mb-2">
                           <span className={`font-bold text-sm ${hivePortalData.type === 'BID' ? 'text-yellow-400' :
                              hivePortalData.type === 'VIRAL' ? 'text-pink-400' :
                                 'text-green-400'
                              }`}>@{hivePortalData.user}</span>
                           <span className="text-[9px] text-gray-400 font-mono">NOW</span>
                           <CyberBadge label="LIVE" color={hivePortalData.type === 'BID' ? '#eab308' : hivePortalData.type === 'VIRAL' ? '#ec4899' : '#39ff14'} />
                        </div>

                        {hivePortalData.type === 'BID' && (
                           <div>
                              <p className="text-xl font-rajdhani font-bold text-white uppercase">PLACED BID: {hivePortalData.metrics}</p>
                              <p className="text-xs text-gray-300 mt-1">{hivePortalData.details}</p>
                           </div>
                        )}

                        {hivePortalData.type === 'VIRAL' && (
                           <div>
                              <p className="text-sm font-sans text-white">"{hivePortalData.details}"</p>
                              <div className="flex gap-4 mt-2 text-pink-400 font-bold text-xs">
                                 <span>❤️ {hivePortalData.metrics?.split('|')[0]}</span>
                                 <span>💬 {hivePortalData.metrics?.split('|')[1]}</span>
                              </div>
                           </div>
                        )}

                        {hivePortalData.type === 'LOG' && (
                           <div className="font-mono text-[10px] text-green-300">
                              <p>{'>'} SOURCE_IP: 192.168.x.x</p>
                              <p>{'>'} TIMESTAMP: {new Date().toISOString()}</p>
                              <p>{'>'} PAYLOAD: {hivePortalData.details}</p>
                              <p>{'>'} STATUS: VERIFIED_ON_CHAIN</p>
                           </div>
                        )}
                     </div>

                     {/* More Noise */}
                     {hivePortalData.type !== 'LOG' && (
                        <div className="space-y-2 opacity-50">
                           <div className="text-[10px] text-gray-500">System: <span className="text-cyber-green">New High Score detected!</span></div>
                           <div className="text-[10px] text-gray-500">Anon_22: <span className="text-gray-400">Look at that bid!!</span></div>
                        </div>
                     )}
                  </div>

                  {/* Footer Actions */}
                  <div className="p-3 border-t border-white/10 bg-[#0a0a0a] flex gap-2">
                     {hivePortalData.type === 'BID' && (
                        <CyberButton fullWidth className="h-10 text-[10px]" onClick={() => openChat('DATIN', `VERIFY_BID_${hivePortalData.user}`)}>VERIFY FUNDS (DATIN)</CyberButton>
                     )}
                     {hivePortalData.type === 'VIRAL' && (
                        <CyberButton fullWidth className="h-10 text-[10px]" onClick={() => openChat('SIRENA', `MODERATE_POST_${hivePortalData.user}`)}>MODERATE (SIRENA)</CyberButton>
                     )}
                     {hivePortalData.type === 'LOG' && (
                        <CyberButton fullWidth className="h-10 text-[10px]" onClick={() => openChat('HACKY', `TRACE_LOG_${hivePortalData.user}`)}>TRACE ORIGIN (HACKY)</CyberButton>
                     )}
                  </div>
               </div>
            </div>
         </div>
      );
   };

   // --- SUB-COMPONENT: UNIFIED AGENT CHAT OVERLAY ---
   const AgentChatOverlay = () => {
      if (!activeAgentId || !chatContext) return null;

      const config = AGENT_CONFIG[activeAgentId];
      const [input, setInput] = useState('');
      const [history, setHistory] = useState<{ sender: 'user' | 'agent', text: string }[]>([]);
      const [isTyping, setIsTyping] = useState(false);
      const scrollRef = useRef<HTMLDivElement>(null);

      // Initial Greeting based on Persona & Context
      useEffect(() => {
         let initialMessage = config.greeting;
         if (chatContext) {
            initialMessage += `\n\n[CONTEXT: ${chatContext}]`;
         }
         setHistory([{ sender: 'agent', text: initialMessage }]);
      }, [activeAgentId, chatContext]);

      // Auto-scroll
      useEffect(() => {
         if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }, [history, isTyping]);

      const handleSend = () => {
         if (!input.trim()) return;
         const userMsg = input;
         setHistory(prev => [...prev, { sender: 'user', text: userMsg }]);
         setInput('');
         setIsTyping(true);

         // SIMULATED AI RESPONSE LOGIC
         setTimeout(() => {
            setIsTyping(false);
            let response = "Acknowledged.";

            // Simple Persona Logic
            if (activeAgentId === 'FLOR') {
               response = "I've noted that. I'm checking the burn rate and updating the financial projections for the event cap.";
            } else if (activeAgentId === 'SIRENA') {
               response = "Understood. I'll broadcast a Liquid Mode update to affected users immediately.";
            } else if (activeAgentId === 'HACKY') {
               response = "Threat vector analyzed. I'm updating the Cloud Armor rules to block that signature.";
            } else if (activeAgentId === 'DATIN') {
               response = "I'm recalculating the Tokenomics based on that input. eCPM targets adjusted.";
            } else if (activeAgentId === 'VIPY') {
               response = "Great. I'll push that offer to the FlashPromoter network right away.";
            } else {
               response = "Code updated. Deploying hotfix to Cloud Run Gen 2 instances.";
            }

            setHistory(prev => [...prev, { sender: 'agent', text: response }]);
         }, 1000);
      };

      const AgentIcon = config.icon;

      return (
         <div className="fixed inset-0 z-[150] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-[fadeIn_0.2s_ease-out]">
            <div className="w-full max-w-sm bg-[#050505] border rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col h-[500px] max-h-[80vh]" style={{ borderColor: `${config.color}50` }}>

               {/* Chat Header */}
               <div className="bg-[#0a0a0a] p-4 border-b flex items-center justify-between shrink-0" style={{ borderColor: `${config.color}30` }}>
                  <div className="flex items-center gap-3">
                     <div className="w-8 h-8 rounded-full flex items-center justify-center border shadow-[0_0_10px_rgba(0,0,0,0.3)]" style={{ borderColor: config.color, backgroundColor: `${config.color}20`, color: config.color }}>
                        <AgentIcon size={16} />
                     </div>
                     <div>
                        <h3 className="font-orbitron font-bold text-sm tracking-wide" style={{ color: config.color }}>{config.name}</h3>
                        <p className="text-[9px] text-gray-500 font-mono font-bold tracking-wider">{config.role}</p>
                     </div>
                  </div>
                  <button onClick={() => { setActiveAgentId(null); setChatContext(null); }} className="text-gray-500 hover:text-white transition-colors"><X size={20} /></button>
               </div>

               {/* Context Bar */}
               <div className="px-4 py-2 border-b border-white/5 bg-white/5 flex items-center gap-2">
                  <span className="text-[9px] text-gray-400 font-mono uppercase">CONTEXT:</span>
                  <span className="text-[9px] font-bold text-white font-mono truncate">{chatContext}</span>
               </div>

               {/* Chat Body */}
               <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-black/50 custom-scrollbar">
                  {history.map((msg, i) => (
                     <div key={i} className={`flex gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''} animate-[fadeIn_0.3s_ease-out]`}>
                        <div className={`w-6 h-6 rounded flex-shrink-0 flex items-center justify-center text-[10px] font-bold border ${msg.sender === 'agent' ? `bg-[${config.color}]/20 border-[${config.color}]` : 'bg-white/10 border-white/20 text-white'}`} style={msg.sender === 'agent' ? { borderColor: config.color, color: config.color, backgroundColor: `${config.color}15` } : {}}>
                           {msg.sender === 'agent' ? activeAgentId.charAt(0) : 'ME'}
                        </div>
                        <div className={`max-w-[80%] rounded-lg p-3 text-xs leading-relaxed border ${msg.sender === 'agent' ? 'bg-[#1a1a1a] border-white/5 text-gray-300 rounded-tl-none' : `border-opacity-30 text-white rounded-tr-none`}`} style={msg.sender === 'user' ? { borderColor: config.color, backgroundColor: `${config.color}10` } : {}}>
                           {msg.text}
                        </div>
                     </div>
                  ))}
                  {isTyping && <div className="text-xs animate-pulse ml-9" style={{ color: config.color }}>{config.name} is thinking...</div>}
               </div>

               {/* Input */}
               <div className="p-3 bg-[#0a0a0a] border-t border-white/10 flex gap-2 shrink-0">
                  <input
                     type="text"
                     value={input}
                     onChange={(e) => setInput(e.target.value)}
                     onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                     placeholder={`Message ${config.name}...`}
                     className="flex-1 bg-black border border-white/20 rounded-lg px-3 py-2 text-xs text-white focus:outline-none placeholder:text-gray-700 font-mono transition-colors"
                     style={{ caretColor: config.color }}
                     autoFocus
                  />
                  <button onClick={handleSend} disabled={!input.trim()} className="text-black rounded-lg w-10 flex items-center justify-center hover:opacity-80 transition-opacity" style={{ backgroundColor: config.color }}>
                     <Send size={16} />
                  </button>
               </div>
            </div>
         </div>
      );
   };

   // --- SUB-COMPONENT: AUDIT LOGS OVERLAY ---
   if (showAuditLogs) {
      return (
         <div className="fixed inset-0 z-50 bg-black flex flex-col animate-[fadeIn_0.2s_ease-out] font-mono">

            {/* CRITICAL: Inject Chat Overlay here so it works inside the Audit View */}
            <AgentChatOverlay />
            <HiveMindPortal />

            <div className="bg-gray-900 border-b border-gray-700 p-4 flex items-center justify-between">
               <div className="flex items-center gap-3">
                  <Terminal className="text-cyber-green" size={20} />
                  <div>
                     <h3 className="text-cyber-green font-bold text-sm tracking-widest">SYSTEM_AUDIT_LOGS</h3>
                     <div className="flex items-center gap-2 mt-0.5">
                        <p className="text-[10px] text-gray-500">REAL-TIME IMMUTABLE RECORD</p>
                        {/* AUDIT AGENT BUTTONS: A & H (HEADER) */}
                        <div className="flex items-center gap-1 ml-2 border-l border-gray-700 pl-2">
                           <AgentButton agentId="ARCHY" context="AUDIT_LOG_ANALYSIS" onClick={openChat} label="A" />
                           <AgentButton agentId="HACKY" context="AUDIT_THREAT_DETECTION" onClick={openChat} label="H" />
                        </div>
                     </div>
                  </div>
               </div>
               <button onClick={() => setShowAuditLogs(false)} className="bg-gray-800 p-2 rounded hover:bg-gray-700 text-white"><X size={20} /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-black text-[10px] sm:text-xs">
               {[
                  { time: '10:42:01', user: 'SYSTEM', action: 'CRON_JOB_EXECUTE', details: 'Cleanup temporary cache', status: 'OK' },
                  { time: '10:41:55', user: 'ADMIN_GOD', action: 'VIEW_DASHBOARD', details: 'Access granted via Pin', status: 'OK' },
                  { time: '10:40:12', user: 'USER_8821', action: 'BID_PLACE', details: 'Item #442 - 500 Coins', status: 'VERIFIED' },
                  { time: '10:39:45', user: 'BOT_NET_99', action: 'LOGIN_ATTEMPT', details: 'Failed - Cloud Armor Block', status: 'BLOCKED' },
                  { time: '10:38:22', user: 'FLOR', action: 'BUDGET_CHECK', details: 'Projected burn rate: Nominal', status: 'OK' },
                  { time: '10:38:00', user: 'CTO_ARCHY', action: 'DEPLOY_CONFIG', details: 'Gemini 3.0 Model Switch', status: 'OK' },
               ].map((log, i) => (
                  <button
                     key={i}
                     onClick={() => openHivePortal('LOG', log.user, `${log.action} | ${log.details}`)}
                     className="w-full flex items-center gap-2 border-b border-gray-900 pb-1 hover:bg-white/5 transition-colors group text-left relative"
                  >
                     {/* A & H Buttons per row for quick context - NOW INTERACTIVE BUTTONS */}
                     <div className="opacity-0 group-hover:opacity-100 flex gap-1 transition-opacity z-10 relative">
                        <button
                           onClick={(e) => {
                              e.stopPropagation();
                              openChat('ARCHY', `AUDIT_TRACE_${log.user}_${log.action}`);
                           }}
                           className="w-4 h-4 rounded bg-green-500/20 text-green-500 text-[8px] flex items-center justify-center border border-green-500 hover:bg-green-500 hover:text-black transition-colors font-bold"
                           title="Ask Archy"
                        >
                           A
                        </button>
                        <button
                           onClick={(e) => {
                              e.stopPropagation();
                              openChat('HACKY', `AUDIT_SEC_${log.user}_${log.action}`);
                           }}
                           className="w-4 h-4 rounded bg-red-500/20 text-red-500 text-[8px] flex items-center justify-center border border-red-500 hover:bg-red-500 hover:text-black transition-colors font-bold"
                           title="Ask Hacky"
                        >
                           H
                        </button>
                     </div>

                     <span className="text-gray-500 w-12 shrink-0">[{log.time}]</span>
                     <span className="text-cyber-cyan font-bold hover:underline">{log.user}</span>
                     <span className="text-white font-mono">{log.action}</span>
                     <span className="text-gray-400 flex-1 truncate">| {log.details}</span>
                     <span className={log.status === 'BLOCKED' ? 'text-red-500 font-bold' : 'text-cyber-green'}>{log.status}</span>
                     <ExternalLink size={10} className="text-gray-600 opacity-0 group-hover:opacity-100" />
                  </button>
               ))}
               <div className="text-cyber-green animate-pulse pt-2">_ Awaiting new stream data...</div>
            </div>
         </div>
      );
   }

   // --- MAIN GOD MODE DASHBOARD ---
   return (
      <div className="space-y-6 pb-24 animate-[fadeIn_0.3s_ease-out]">
         <AgentChatOverlay />
         <HiveMindPortal />

         {/* 1. HEADER: GOD MODE IDENTIFIER */}
         <div className="bg-gray-900/40 border-b border-gray-800 -mx-4 px-4 py-2 mb-2 flex justify-between items-center">
            <div className="flex items-center gap-2">
               <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_#22c55e]"></div>
               <span className="text-xs font-mono text-green-400">ROLE: <span className="text-white font-bold">{adminId || 'GOD_MODE'}</span></span>
            </div>
            <CyberBadge label="ROOT ACCESS" color="#ef4444" />
         </div>

         {/* 2. KPI CARDS */}
         <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-900/60 border border-gray-700 p-3 rounded-lg flex flex-col justify-between relative group hover:border-white/20 transition-colors">
               <div className="flex items-center gap-2 text-gray-400 mb-1">
                  <Users size={14} />
                  <span className="text-[10px] font-orbitron tracking-widest">ACTIVE USERS</span>
               </div>
               <span className="text-2xl font-rajdhani font-bold text-white tabular-nums">{activeUsers.toLocaleString()}</span>
            </div>
            <div className="bg-gray-900/60 border border-gray-700 p-3 rounded-lg flex flex-col justify-between relative group hover:border-white/20 transition-colors">
               <div className="flex items-center gap-2 text-gray-400 mb-1">
                  <DollarSign size={14} />
                  <span className="text-[10px] font-orbitron tracking-widest">BUDGET BURN</span>
               </div>
               <span className="text-2xl font-rajdhani font-bold text-white tabular-nums">$142.50 <span className="text-xs text-gray-500 font-normal">/ $295</span></span>
            </div>
         </div>

         {/* 3. FINANCIAL SAFEGUARDS (FLOR) */}
         <SectionHeader title="FINANCIAL SAFEGUARDS" subtitle="FLOR PROTOCOL" />
         <div className={`p-4 rounded-xl border transition-all duration-300 relative ${killSwitchActive ? 'bg-red-950/30 border-red-500' : 'bg-gray-900/40 border-gray-700'}`}>
            {/* Agents: Flor (Finance), Archy (Tech) */}
            <div className="absolute top-4 right-4 z-10 flex gap-1.5">
               <AgentButton agentId="FLOR" context="KILL_SWITCH_BUDGET" onClick={openChat} label="F" />
               <AgentButton agentId="ARCHY" context="KILL_SWITCH_TECH" onClick={openChat} label="A" />
            </div>

            <div className="flex items-start justify-between mb-4 pr-16">
               <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${killSwitchActive ? 'bg-red-500/20 text-red-500' : 'bg-gray-800 text-gray-400'}`}>
                     <Power size={24} />
                  </div>
                  <div>
                     <h3 className={`font-orbitron font-bold text-sm ${killSwitchActive ? 'text-red-500' : 'text-white'}`}>
                        EMERGENCY BUDGET KILL SWITCH
                     </h3>
                     <p className="text-[10px] text-gray-400 font-mono">
                        STATUS: {killSwitchActive ? 'ACTIVE - SYSTEM HALTED' : 'STANDBY - MONITORING'}
                     </p>
                  </div>
               </div>
               {killSwitchActive && <AlertOctagon className="text-red-500 animate-pulse" />}
            </div>

            <p className="text-xs text-gray-400 mb-4 font-sans leading-relaxed border-l-2 border-gray-700 pl-3">
               Activating this will immediately disable Cloud Run Invoker permissions. The app will enter "Maintenance Mode" for all users. Use only if Budget Cap ($295) is breached.
            </p>

            <CyberButton
               variant={killSwitchActive ? 'primary' : 'danger'}
               fullWidth
               onClick={toggleKillSwitch}
               className="h-12 text-xs shadow-lg"
            >
               {killSwitchActive ? 'RESTORE SYSTEM OPERATIONS' : 'ACTIVATE KILL SWITCH'}
            </CyberButton>
         </div>

         {/* 4. TEAM CHAT */}
         <div className="my-6">
            <CyberButton
               fullWidth
               variant="primary"
               onClick={() => onNavigate(Screen.ADMIN_TEAM_CHAT)}
               className="h-20 group !p-0 overflow-visible shadow-[0_0_25px_rgba(57,255,20,0.3)] border border-[#39ff14]/50"
            >
               <div className="w-full flex items-center justify-between px-3">
                  <div className="flex items-center gap-3">
                     <div className="bg-black p-2.5 rounded-lg text-cyber-green border border-black group-hover:scale-110 transition-transform shadow-lg">
                        <MessageSquare size={24} fill="currentColor" />
                     </div>
                     <div className="text-left flex flex-col">
                        <span className="font-orbitron font-black text-base text-black tracking-tighter leading-none">CHAT WITH THE TEAM</span>
                        <span className="text-[10px] text-gray-900 font-bold font-mono leading-tight mt-1">SECURE LINE: AI COUNCIL & HUMANS</span>
                     </div>
                  </div>

                  <div className="flex -space-x-3 items-center pl-2">
                     <img src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=100&h=100&fit=crop&crop=faces" alt="AI" className="w-9 h-9 rounded-full border-2 border-black z-30 object-cover bg-gray-800" />
                     <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces" alt="Human" className="w-9 h-9 rounded-full border-2 border-black z-20 object-cover bg-gray-800" />
                     <div className="w-9 h-9 rounded-full bg-black border-2 border-black z-10 flex items-center justify-center text-[10px] font-bold text-cyber-green shadow-lg">+5</div>
                  </div>
               </div>
            </CyberButton>
         </div>

         {/* 5. LIVE OPS (SIRENA) */}
         <SectionHeader title="LIVE OPS COMMAND" subtitle="SIRENA PROTOCOL" />
         <div className="space-y-3">
            <div className="bg-black border border-white/10 rounded-lg p-3 flex items-center justify-between">
               <div className="flex items-center gap-3">
                  <Activity className="text-cyber-green" size={18} />
                  <div>
                     <h4 className="text-xs font-bold text-white">SYSTEM HEALTH</h4>
                     <p className="text-[9px] text-gray-500">Latency: 24ms | Liquid Mode: ON</p>
                  </div>
               </div>
               <div className="flex items-center gap-2">
                  {/* Agents: Archy (Tech), Sirena (Support) */}
                  <AgentButton agentId="ARCHY" context="SYSTEM_HEALTH_TECH" onClick={openChat} label="A" />
                  <AgentButton agentId="SIRENA" context="SYSTEM_HEALTH_SUPPORT" onClick={openChat} label="S" />
                  <CyberBadge label="OPTIMAL" color="#39ff14" />
               </div>
            </div>

            <div className="bg-black border border-white/10 rounded-lg p-3 flex items-center justify-between">
               <div className="flex items-center gap-3">
                  <MessageSquare className="text-cyber-cyan" size={18} />
                  <div>
                     <h4 className="text-xs font-bold text-white">HIVE CHATTER</h4>
                     <p className="text-[9px] text-gray-500">Sentiment: Positive | Flagged: 12</p>
                  </div>
               </div>
               <div className="flex items-center gap-2">
                  <AgentButton agentId="ARCHY" context="CHAT_TECH" onClick={openChat} label="A" />
                  <AgentButton agentId="SIRENA" context="CHAT_MODERATION" onClick={openChat} label="S" />
                  <span className="text-xs font-mono text-cyber-cyan">MODERATE {'>'}</span>
               </div>
            </div>
         </div>

         {/* 6. SECURITY MATRIX (HACKY) */}
         <SectionHeader title="SECURITY MATRIX" subtitle="HACKY PROTOCOL" />
         <div className="bg-blue-950/10 border border-blue-900/40 rounded-xl p-4 space-y-4 relative overflow-hidden">
            {/* Agents: Hacky (Security), Archy (Tech) */}
            <div className="absolute top-4 right-4 flex gap-1.5">
               <AgentButton agentId="HACKY" context="SECURITY_MATRIX" onClick={openChat} label="H" />
               <AgentButton agentId="ARCHY" context="SECURITY_TECH" onClick={openChat} label="A" />
            </div>

            <div className="flex justify-between items-center pr-12">
               <div className="flex items-center gap-2">
                  <ShieldCheck className="text-blue-400" size={16} />
                  <span className="text-xs font-bold text-blue-100">THREAT LEVEL</span>
               </div>
               <span className="text-[10px] font-mono text-blue-300">LOW - LEVEL 1</span>
            </div>

            <div className="bg-black/60 rounded p-2 font-mono text-[9px] text-blue-200/70 h-24 overflow-hidden border border-blue-900/30 shadow-inner">
               <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black to-transparent pointer-events-none"></div>
               <div className="space-y-1">
                  <p className="text-gray-500">{'>'} SYSTEM DIAGNOSTICS STARTED...</p>
                  <p>{'>'} SCANNING TRAFFIC PATTERNS...</p>
                  <p>{'>'} DETECTED 2 BOT SIGNATURES [BLOCKED]</p>
                  <p>{'>'} VERIFYING MERIT SCORE HANDSHAKES... OK</p>
                  <p>{'>'} CLOUD ARMOR: ACTIVE</p>
                  <p>{'>'} UNIVERSAL LOGIN: SECURE</p>
               </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
               <button
                  onClick={() => setShowAuditLogs(true)}
                  className="h-16 rounded-lg bg-cyan-900/20 border border-cyan-500/30 hover:bg-cyan-500/20 hover:border-cyan-500/50 flex flex-col items-center justify-center gap-1 transition-all active:scale-95 group"
               >
                  <div className="flex items-center gap-2">
                     <FileClock size={14} className="text-cyan-400" />
                     <span className="text-[10px] font-bold text-cyan-400 group-hover:text-cyan-300">AUDIT LOGS</span>
                  </div>
                  <span className="text-[9px] text-cyan-600 font-mono tracking-wider font-bold opacity-80">TRACK ACTIONS</span>
               </button>

               <button className="h-16 rounded-lg bg-cyan-900/20 border border-cyan-500/30 hover:bg-cyan-500/20 hover:border-cyan-500/50 flex flex-col items-center justify-center gap-1 transition-all active:scale-95 group">
                  <div className="flex items-center gap-2">
                     <RefreshCw size={14} className="text-cyan-400" />
                     <span className="text-[10px] font-bold text-cyan-400 group-hover:text-cyan-300">PURGE CACHE</span>
                  </div>
                  <span className="text-[9px] text-cyan-600 font-mono tracking-wider font-bold opacity-80">REFRESH SYSTEM</span>
               </button>
            </div>
         </div>

         {/* 7. MONETIZATION (DATIN) */}
         <SectionHeader title="MONETIZATION" subtitle="DATIN PROTOCOL" />
         <div className="grid grid-cols-2 gap-3 mb-6">
            <CyberCard glow="none" className="bg-gray-900/20 relative">
               {/* Agents: Archy, Hacky, Datin */}
               <div className="absolute top-2 right-2 flex gap-1">
                  <AgentButton agentId="ARCHY" context="ADMOB_TECH" onClick={openChat} label="A" />
                  <AgentButton agentId="HACKY" context="ADMOB_FRAUD" onClick={openChat} label="H" />
                  <AgentButton agentId="DATIN" context="ADMOB_YIELD" onClick={openChat} label="D" />
               </div>
               <p className="text-[9px] text-gray-500 uppercase font-bold mt-1">AdMob eCPM</p>
               <p className="text-xl font-rajdhani font-bold text-white mt-1">$12.45</p>
               <div className="h-1 bg-gray-800 rounded mt-3 overflow-hidden">
                  <div className="bg-green-500 w-[70%] h-full"></div>
               </div>
            </CyberCard>
            <CyberCard glow="none" className="bg-gray-900/20 relative">
               {/* Agents: Archy, Hacky, Datin */}
               <div className="absolute top-2 right-2 flex gap-1">
                  <AgentButton agentId="ARCHY" context="ESCROW_TECH" onClick={openChat} label="A" />
                  <AgentButton agentId="HACKY" context="ESCROW_SECURITY" onClick={openChat} label="H" />
                  <AgentButton agentId="DATIN" context="ESCROW_FUNDS" onClick={openChat} label="D" />
               </div>
               <p className="text-[9px] text-gray-500 uppercase font-bold mt-1">Escrow Vault</p>
               <p className="text-xl font-rajdhani font-bold text-yellow-500 mt-1">450k <span className="text-[10px] text-gray-600">COINS</span></p>
               <div className="h-1 bg-gray-800 rounded mt-3 overflow-hidden">
                  <div className="bg-yellow-500 w-[40%] h-full"></div>
               </div>
            </CyberCard>
         </div>

         {/* 8. LIVE BID STREAM */}
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
                              {/* Agents on Bid Row: Archy, Hacky */}
                              <div className="opacity-0 group-hover:opacity-100 transition-opacity ml-1 flex gap-1">
                                 <AgentButton agentId="ARCHY" context={`BID_TECH_${bid.user}`} onClick={openChat} label="A" />
                                 <AgentButton agentId="HACKY" context={`BID_VERIFY_${bid.user}`} onClick={openChat} label="H" />
                              </div>
                           </div>
                           <p className="text-[9px] text-gray-500">{bid.item}</p>
                        </div>
                     </div>
                     <div className="text-right">
                        <div className="font-rajdhani font-bold text-yellow-500 text-sm">{bid.amount}</div>
                        <div className="text-[8px] text-gray-600 font-mono">COINS</div>
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

         {/* 9. VIRAL VELOCITY */}
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
                              {/* Agents on Viral Row: Archy, Hacky */}
                              <div className="opacity-0 group-hover:opacity-100 transition-opacity ml-1 flex gap-1">
                                 <AgentButton agentId="ARCHY" context={`VIRAL_TECH_${user.user}`} onClick={openChat} label="A" />
                                 <AgentButton agentId="HACKY" context={`VIRAL_BOT_CHECK_${user.user}`} onClick={openChat} label="H" />
                              </div>
                           </div>
                           <p className="text-[9px] text-gray-500 font-mono">Potential Influencer</p>
                        </div>
                     </div>
                     <div className="flex items-center gap-3">
                        <div className="text-center"><div className="flex items-center gap-1 text-pink-400 text-xs font-bold"><Heart size={10} fill="currentColor" /> {user.likes}</div></div>
                        <div className="text-center"><div className="flex items-center gap-1 text-purple-400 text-xs font-bold"><MessageCircle size={10} fill="currentColor" /> {user.comments}</div></div>
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

         {/* 10. HIVE MIND HUB */}
         <SectionHeader title="HIVE MIND HUB" subtitle="NEURAL INTERLINK" />
         <div className="grid grid-cols-2 gap-3 mb-3">
            {/* Flash Promoter */}
            <div className="bg-orange-900/10 border border-orange-500/30 rounded-xl p-3 relative group hover:bg-orange-900/20 transition-all cursor-pointer">
               {/* Agents: Archy, Hacky (Screenshot match) - But logically Vipy is here too. Sticking to SS: A, H */}
               <div className="absolute top-2 right-2 flex gap-1">
                  <AgentButton agentId="ARCHY" context="FLASH_TECH" onClick={openChat} label="A" />
                  <AgentButton agentId="HACKY" context="FLASH_SECURITY" onClick={openChat} label="H" />
               </div>
               <div className="flex items-center gap-2 mb-2">
                  <div className="p-1.5 bg-orange-500/20 rounded text-orange-500"><Zap size={16} /></div>
                  <span className="text-[10px] font-orbitron font-bold text-white leading-none">FLASH<br />PROMOTER</span>
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
               {/* Agents: Archy, Hacky */}
               <div className="absolute top-2 right-2 flex gap-1">
                  <AgentButton agentId="ARCHY" context="SCORE_TECH" onClick={openChat} label="A" />
                  <AgentButton agentId="HACKY" context="SCORE_FRAUD" onClick={openChat} label="H" />
               </div>
               <div className="flex items-center gap-2 mb-2">
                  <div className="p-1.5 bg-purple-500/20 rounded text-purple-500"><Award size={16} /></div>
                  <span className="text-[10px] font-orbitron font-bold text-white leading-none">MERIT<br />SCORE</span>
               </div>
               <div className="flex items-end justify-between">
                  <div>
                     <div className="flex items-center gap-1 text-[9px] text-gray-400 font-mono mb-0.5"><span className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_5px_#22c55e]"></span> ONLINE</div>
                     <div className="text-lg font-rajdhani font-bold text-white">v2.4 <span className="text-[10px] font-sans font-normal text-gray-500">Stable</span></div>
                  </div>
               </div>
            </div>
         </div>

         {/* 11. WP NETWORK */}
         <div className="bg-blue-900/10 border border-blue-500/30 rounded-xl p-3 mb-6 relative">
            {/* Agents: Archy, Hacky */}
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

      </div>
   );
};