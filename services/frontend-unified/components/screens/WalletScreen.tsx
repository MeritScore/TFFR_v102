import React from 'react';
import { Wallet, Lock, Zap, Activity, Gem, Clock } from 'lucide-react';

export const WalletScreen = () => {
  return (
    <div className="space-y-6 pb-24 animate-fade-in text-gray-200">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 bg-yellow-500/10 rounded-lg border border-yellow-500/50 shadow-[0_0_10px_rgba(234,179,8,0.2)]">
            <Wallet className="text-yellow-500" size={24} />
        </div>
        <h1 className="text-2xl font-orbitron font-black text-white tracking-widest uppercase">
            THE <span className="text-yellow-500">VAULT</span>
        </h1>
      </div>
      <div className="relative bg-[#0a0a0a] rounded-2xl border border-yellow-500/30 p-6 overflow-hidden shadow-[0_0_30px_rgba(234,179,8,0.15)] group">
        <div className="absolute top-0 right-0 p-4 opacity-50"><Lock size={16} className="text-yellow-500" /></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-yellow-500/10 blur-[50px] rounded-full pointer-events-none"></div>
        <div className="relative z-10 flex flex-col items-center text-center space-y-4">
            <span className="text-[10px] font-orbitron font-bold text-gray-400 uppercase tracking-[0.2em]">ESCROW PROTOCOL ACTIVE</span>
            <div className="flex items-center gap-3">
                <div className="rotate-45 p-1 bg-yellow-500 border border-white/20"><div className="w-4 h-4 bg-black border border-yellow-500"></div></div>
                <span className="text-6xl font-rajdhani font-black text-white tracking-tight drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">1,240</span>
            </div>
            <span className="text-sm font-mono font-bold text-green-400 tracking-wider">≈ $8,990.00 USD</span>
            <div className="flex gap-2 pt-2 items-center">
                <div className="w-8 h-1.5 bg-yellow-500 rounded-full shadow-[0_0_5px_#eab308]"></div>
                <div className="w-1.5 h-1.5 bg-gray-700 rounded-full"></div>
                <div className="w-1.5 h-1.5 bg-gray-700 rounded-full"></div>
            </div>
        </div>
      </div>
      <div className="bg-[#121214] border border-white/10 rounded-xl p-5 shadow-lg relative overflow-hidden">
         <div className="flex justify-between items-center mb-3">
             <div className="flex items-center gap-2">
                 <Clock size={14} className="text-gray-400" />
                 <span className="text-[10px] font-orbitron font-bold text-gray-300 uppercase tracking-wider">7-DAY SECURITY HOLD</span>
             </div>
             <div className="flex items-center gap-2">
                 <div className="rotate-45 w-2 h-2 bg-gray-500"></div>
                 <span className="text-xs font-rajdhani font-bold text-white">450 LOCKED</span>
             </div>
         </div>
         <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden mb-3">
             <div className="h-full bg-gradient-to-r from-orange-500 to-yellow-500 w-[35%] shadow-[0_0_10px_#f97316]"></div>
         </div>
         <p className="text-[10px] text-gray-500 font-sans leading-relaxed">Funds are released upon verification of Gig Completion Packets.</p>
      </div>
      <div>
         <h3 className="font-orbitron font-bold text-sm text-gray-400 uppercase tracking-widest mb-4">LEDGER</h3>
         <div className="space-y-3">
             <div className="bg-[#0f0f11] border border-white/5 p-4 rounded-xl flex items-center justify-between hover:border-white/10 transition-colors">
                 <div className="flex items-center gap-4">
                     <div className="w-10 h-10 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center text-green-500 shadow-[0_0_10px_rgba(34,197,94,0.2)]"><Zap size={18} fill="currentColor" /></div>
                     <div>
                         <h4 className="font-bold text-white text-sm">Gig: Valet Parking</h4>
                         <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[10px] font-mono text-gray-500">Feb 8, 16:30</span>
                            <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
                            <span className="text-[9px] font-orbitron text-gray-400 uppercase">ESCROW</span>
                         </div>
                     </div>
                 </div>
                 <span className="text-lg font-rajdhani font-bold text-green-500">+100</span>
             </div>
             <div className="bg-[#0f0f11] border border-white/5 p-4 rounded-xl flex items-center justify-between hover:border-white/10 transition-colors">
                 <div className="flex items-center gap-4">
                     <div className="w-10 h-10 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-500 shadow-[0_0_10px_rgba(239,68,68,0.2)]"><Activity size={18} /></div>
                     <div>
                         <h4 className="font-bold text-white text-sm">Intel: Traffic Route</h4>
                         <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[10px] font-mono text-gray-500">Feb 8, 15:15</span>
                            <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
                            <span className="text-[9px] font-orbitron text-gray-400 uppercase">CLEARED</span>
                         </div>
                     </div>
                 </div>
                 <span className="text-lg font-rajdhani font-bold text-red-500">-5</span>
             </div>
         </div>
      </div>
      <button className="w-full bg-cyber-cyan hover:bg-cyan-400 text-black font-orbitron font-black text-sm py-4 rounded-xl uppercase tracking-wider shadow-[0_0_20px_rgba(0,255,255,0.4)] transition-all active:scale-95 clip-path-polygon">
          INITIATE CASHOUT
      </button>
    </div>
  );
};