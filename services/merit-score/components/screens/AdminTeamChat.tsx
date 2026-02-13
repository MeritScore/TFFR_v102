import React from 'react';
import { Search, Bell, MessageSquare, Mic, Edit3, Hash } from 'lucide-react';
import { IsotypeTheFunFanReporter } from '../ui/CyberComponents';

export const AdminTeamChat = () => {
  return (
    <div className="flex flex-col h-[calc(100vh-140px)] animate-[fadeIn_0.3s_ease-out]">
      {/* Header */}
      <div className="bg-[#1a1a1d] px-4 py-3 border-b border-white/5 flex items-center gap-3 rounded-t-xl">
        <div className="flex-1 bg-[#050505] rounded-lg h-9 flex items-center px-3 border border-white/10">
          <Search size={14} className="text-gray-500 mr-2" />
          <span className="text-gray-500 text-sm font-sans">Jump to or search...</span>
        </div>
        <div className="w-8 h-8 rounded-full bg-cyber-purple/20 flex items-center justify-center border border-cyber-purple/50 relative">
          <IsotypeTheFunFanReporter color="#d000ff" noGlow className="w-5 h-5" />
          <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-[#1a1a1d] rounded-full"></div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar bg-[#0e0e10]">

        {/* Quick Action Cards */}
        <div className="p-4 flex gap-3 overflow-x-auto pb-4 border-b border-white/5 no-scrollbar">
          <div className="min-w-[100px] h-[80px] bg-[#1a1a1d] rounded-xl p-3 flex flex-col justify-between border border-white/5 active:scale-95 transition-transform">
            <div className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center text-red-500"><Bell size={16} fill="currentColor" /></div>
            <div>
              <div className="text-white font-bold text-xs">Urgent</div>
              <div className="text-gray-500 text-[10px]">5 new</div>
            </div>
          </div>
          <div className="min-w-[100px] h-[80px] bg-[#1a1a1d] rounded-xl p-3 flex flex-col justify-between border border-white/5 active:scale-95 transition-transform">
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-500"><MessageSquare size={16} fill="currentColor" /></div>
            <div>
              <div className="text-white font-bold text-xs">Threads</div>
              <div className="text-gray-500 text-[10px]">1 mention</div>
            </div>
          </div>
          <div className="min-w-[100px] h-[80px] bg-[#1a1a1d] rounded-xl p-3 flex flex-col justify-between border border-white/5 active:scale-95 transition-transform">
            <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center text-green-500"><Mic size={16} /></div>
            <div>
              <div className="text-white font-bold text-xs">War Room</div>
              <div className="text-gray-500 text-[10px]">1 live</div>
            </div>
          </div>
        </div>

        {/* Unread DMs - ACTIVE CONVERSATIONS FROM GOD MODE */}
        <div className="py-2">
          <div className="px-4 py-2 flex justify-between items-center">
            <h3 className="text-gray-400 font-bold text-xs font-orbitron tracking-wider">ACTIVE AGENT CHATS</h3>
          </div>

          <div className="px-2 space-y-1">
            {[
              { name: 'CTO ARCHY', role: 'Head of AI', msg: 'AUDIT', online: true, color: 'text-green-400' },
              { name: 'FLOR', role: 'COO / Legal', msg: 'KILL', online: false, color: 'text-yellow-400' },
              { name: 'HACKY', role: 'CISO / Security', msg: 'LOGS', online: true, color: 'text-red-400' },
              { name: 'DATIN', role: 'Data / Funds', msg: 'ADS', online: true, color: 'text-emerald-400' }
            ].map((user, i) => (
              <div key={i} className="flex items-center gap-3 px-3 py-2 hover:bg-white/5 rounded-lg active:bg-white/10 transition-colors">
                <div className="relative">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-xs bg-gray-800 ${user.color}`}>
                    {user.name.substring(0, 2)}
                  </div>
                  {user.online && <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-[#0e0e10] rounded-full"></div>}
                </div>
                <div className="flex-1">
                  <div className="text-white font-bold text-sm leading-none">{user.name}</div>
                  <div className="text-gray-500 text-[10px] mt-1">{user.role}</div>
                </div>
                <div className="w-8 h-5 bg-cyber-purple/20 border border-cyber-purple text-cyber-purple rounded flex items-center justify-center text-[9px] font-bold">
                  {user.msg}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Channels - REFLECTING DASHBOARD CONTEXTS */}
        <div className="py-2">
          <div className="px-4 py-2 flex justify-between items-center">
            <h3 className="text-gray-400 font-bold text-xs font-orbitron tracking-wider">SECURE CHANNELS</h3>
          </div>
          <div className="px-2 space-y-0.5">
            {[
              { name: 'audit-logs-red', unread: true },
              { name: 'kill-switch-approvals', unread: true },
              { name: 'live-ops-alerts', unread: false },
              { name: 'viral-velocity-bot-check', unread: false },
              { name: 'admob-yield-ops', unread: false }
            ].map((channel, i) => (
              <div key={i} className={`flex items-center gap-3 px-3 py-2 rounded-lg ${channel.unread ? 'bg-white/5' : 'hover:bg-white/5 opacity-70'}`}>
                <Hash size={16} className={channel.unread ? 'text-white' : 'text-gray-500'} />
                <div className={`flex-1 font-sans text-sm ${channel.unread ? 'text-white font-bold' : 'text-gray-400'}`}>
                  {channel.name}
                </div>
                {channel.unread && <div className="w-2 h-2 bg-white rounded-full"></div>}
              </div>
            ))}
          </div>
        </div>

        <div className="p-10 text-center text-gray-500 text-xs">
          <p>End of channel list</p>
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="absolute bottom-24 right-4 z-20">
        <button className="w-12 h-12 bg-cyber-purple hover:bg-purple-600 rounded-xl shadow-lg shadow-purple-900/40 flex items-center justify-center text-white transition-transform active:scale-95">
          <Edit3 size={20} />
        </button>
      </div>
    </div>
  );
};