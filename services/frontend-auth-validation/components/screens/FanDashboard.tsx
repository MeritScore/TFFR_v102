import React, { useState, useEffect } from 'react';
import { AlertTriangle, Crown } from 'lucide-react';
import { SectionHeader, CyberBadge } from '../ui/CyberComponents';

interface Props {
  userProfile?: { handle: string, specialty: string };
}

export const FanDashboard: React.FC<Props> = ({ userProfile }) => {
  const isVip = userProfile?.specialty === 'vip';
  const [messages, setMessages] = useState([
    { id: '1', user: 'HiveMind_01', text: 'Welcome to Sector 7. Keep hydration levels high.', type: 'safety', timestamp: 'NOW', isVip: false },
    { id: '2', user: 'TraderJoe', text: 'Selling 2x VIP Passes for side stage. Verified Escrow only.', type: 'trade', timestamp: '2m ago', isVip: false },
    { id: '3', user: 'NeoFan', text: 'Is the north gate open yet?', type: 'general', timestamp: '5m ago', isVip: false },
  ]);

  useEffect(() => {
    if (userProfile?.handle) {
      const welcomeMsg = {
        id: 'me-1',
        user: userProfile.handle,
        text: isVip
          ? "Just joined the VIP channel. Anyone in the Gold Lounge?"
          : "Ready for the event! Let's go!",
        type: 'general',
        timestamp: 'Just now',
        isVip: isVip
      };
      setMessages(prev => [welcomeMsg, ...prev]);
    }
  }, [userProfile, isVip]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newMsg = {
        id: Date.now().toString(),
        user: `User_${Math.floor(Math.random() * 999)}`,
        text: 'Anyone trading Merit Coins for water?',
        type: 'general',
        timestamp: 'Just now',
        isVip: Math.random() > 0.9
      };
      setMessages(prev => [newMsg, ...prev.slice(0, 4)]);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {userProfile?.handle && (
        <div className="bg-black/40 border-b border-white/10 -mx-4 px-4 py-2 flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isVip ? 'bg-yellow-400 animate-pulse' : 'bg-green-500'}`}></div>
            <span className="text-xs font-mono text-gray-400">ONLINE AS: <span className="text-white font-bold">{userProfile.handle}</span></span>
          </div>
          {isVip && <CyberBadge label="VIP ACCESS" color="#facc15" />}
        </div>
      )}
      <div className="sticky top-0 z-30 -mx-4 px-4 pb-2 bg-gradient-to-b from-cyber-black via-cyber-black to-transparent">
        <div className="border border-red-500/50 bg-red-900/20 backdrop-blur-md rounded-lg p-3 flex items-start gap-3 shadow-[0_0_15px_rgba(255,0,0,0.3)] animate-pulse-fast">
          <AlertTriangle className="text-red-500 w-5 h-5 flex-shrink-0 mt-1" />
          <div>
            <h4 className="font-orbitron font-bold text-red-500 text-sm">HIGH TEMP WARNING</h4>
            <p className="text-xs text-red-200 font-sans">Water stations deployed at Gate C & D. Stay hydrated.</p>
          </div>
        </div>
      </div>
      <SectionHeader title="HIVE FEED" subtitle="Real-time Intel & Trade" />
      <div className="space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`relative p-3 rounded-lg border-l-2 backdrop-blur-sm transition-all duration-300 ${msg.isVip ? 'bg-yellow-900/10 border-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.1)]' : msg.type === 'safety' ? 'bg-blue-900/10 border-blue-400' : msg.type === 'trade' ? 'bg-green-900/10 border-cyber-green' : 'bg-white/5 border-gray-600'}`}>
            <div className="flex justify-between items-start mb-1">
              <div className="flex items-center gap-2">
                <span className={`font-rajdhani font-bold text-sm ${msg.isVip ? 'text-yellow-400' : msg.type === 'trade' ? 'text-cyber-green' : 'text-cyber-cyan'}`}>@{msg.user}</span>
                {msg.isVip && (<div className="relative"><div className="absolute inset-0 bg-yellow-400 blur-[8px] opacity-40"></div><Crown size={14} className="relative z-10 text-yellow-400 fill-yellow-400/20" /></div>)}
              </div>
              <span className="text-[10px] text-gray-500 font-mono">{msg.timestamp}</span>
            </div>
            <p className={`text-sm font-sans leading-relaxed ${msg.isVip ? 'text-yellow-100' : 'text-gray-200'}`}>{msg.text}</p>
            {msg.type === 'trade' && (<div className="mt-2 flex gap-2"><button className="text-[10px] bg-cyber-green/10 text-cyber-green border border-cyber-green/30 px-2 py-1 rounded hover:bg-cyber-green/20">OFFER TRADE</button></div>)}
          </div>
        ))}
      </div>
      
      {/* 
        Fixed Banner Ad 
        Constrained to mobile width so it doesn't span full desktop screen 
      */}
      <div className="fixed bottom-[80px] left-0 right-0 max-w-md mx-auto px-4 z-40">
        <div className="bg-black/90 backdrop-blur border-t-2 border-yellow-500/50 p-2 rounded-t-lg shadow-lg">
          <div className="flex items-center justify-between text-xs text-yellow-500 font-mono"><span>[AD] NEON ENERGY DRINK</span><span className="bg-yellow-500 text-black px-1 font-bold">SPONSORED</span></div>
          <p className="text-xs text-gray-400 mt-1">Recharge your cyber-implants. Buy 1 Get 1 Free at Zone 4.</p>
        </div>
      </div>
    </div>
  );
};