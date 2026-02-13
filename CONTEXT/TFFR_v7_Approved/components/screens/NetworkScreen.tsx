import React from 'react';
import { SectionHeader, CyberCard, CyberBadge } from '../ui/CyberComponents';
import { User, ConnectionState } from '../../types';
import { MessageSquare, Gavel, Coins, ArrowRight, Zap, Users, Activity } from 'lucide-react';
import { MOCK_USERS } from '../chat/ChatConstants';

const INTERACTIONS = [
  { id: 1, user: MOCK_USERS[0], type: 'COMMENT', text: 'Replied to your thread "Gate B..."', time: '2m ago', icon: MessageSquare, color: '#00ffff' },
  { id: 2, user: MOCK_USERS[1], type: 'TRADE', text: 'Accepted your Gig Offer', time: '15m ago', icon: Zap, color: '#39ff14' },
  { id: 3, user: MOCK_USERS[2], type: 'BID', text: 'Outbid you on "VIP Pass"', time: '1h ago', icon: Gavel, color: '#ffee00' },
  { id: 4, user: MOCK_USERS[3], type: 'TIP', text: 'Tipped you 5 MC', time: '2h ago', icon: Coins, color: '#d000ff' },
  { id: 5, user: MOCK_USERS[1], type: 'COMMENT', text: 'Mentioned you in "Traffic..."', time: '3h ago', icon: MessageSquare, color: '#00ffff' },
];

export const NetworkScreen = () => {
  return (
    <div className="space-y-6 animate-fade-in pb-20">
      <SectionHeader title="MY NETWORK" subtitle="Crew & Recent Interactions" />
      
      {/* Network Stats */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <CyberCard glow="cyan" padding="p-3">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-cyber-cyan/10 rounded-lg text-cyber-cyan"><Users size={20} /></div>
                <div>
                    <div className="text-2xl font-rajdhani font-black text-white leading-none">128</div>
                    <div className="text-[9px] font-mono text-gray-400 uppercase tracking-wider">CONNECTIONS</div>
                </div>
            </div>
        </CyberCard>
        <CyberCard glow="purple" padding="p-3">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-cyber-purple/10 rounded-lg text-cyber-purple"><Activity size={20} /></div>
                <div>
                    <div className="text-2xl font-rajdhani font-black text-white leading-none">85%</div>
                    <div className="text-[9px] font-mono text-gray-400 uppercase tracking-wider">ENGAGEMENT</div>
                </div>
            </div>
        </CyberCard>
      </div>

      <div className="space-y-4">
        <h3 className="font-orbitron font-bold text-xs text-cyber-green uppercase tracking-widest pl-1 flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-cyber-green rounded-full shadow-[0_0_5px_#39ff14]"></div>
            INTERACTION LOG
        </h3>
        
        {INTERACTIONS.map((item) => (
            <div key={item.id} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-black rounded-xl transform transition-transform group-hover:scale-[1.02] duration-200"></div>
                <div className="relative bg-[#121214] border border-white/5 p-4 rounded-xl flex items-center justify-between shadow-lg group-hover:border-white/20 transition-colors">
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <img src={item.user.avatarUrl} alt={item.user.username} className="w-12 h-12 rounded-full border border-gray-600 group-hover:border-white transition-colors" />
                            <div className="absolute -bottom-1 -right-1 bg-black text-[8px] px-1.5 py-0.5 rounded-full border border-gray-700 text-white font-mono font-bold">
                                {item.user.meritScore}
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center gap-2 mb-0.5">
                                <h4 className="font-bold text-white font-sans text-sm">{item.user.username}</h4>
                                <CyberBadge label={item.type} color={item.color} />
                            </div>
                            <p className="text-xs text-gray-400 font-sans group-hover:text-gray-300 transition-colors">{item.text}</p>
                            <span className="text-[9px] text-gray-600 font-mono mt-1 block">{item.time}</span>
                        </div>
                    </div>
                    <button className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
                        <ArrowRight size={18} />
                    </button>
                </div>
            </div>
        ))}
      </div>
      
      <div className="pt-4 text-center">
         <button className="text-xs font-orbitron font-bold text-cyber-cyan hover:text-white transition-colors tracking-widest border-b border-cyber-cyan/30 hover:border-cyber-cyan pb-1">
             VIEW FULL HISTORY
         </button>
      </div>
    </div>
  );
};