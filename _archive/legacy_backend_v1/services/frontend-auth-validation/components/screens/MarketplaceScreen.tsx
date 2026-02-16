import React, { useState, useEffect } from 'react';
import { Gavel, Heart } from 'lucide-react';
import { CyberCard, CyberButton, SectionHeader, CyberBadge } from '../ui/CyberComponents';

export const MarketplaceScreen = () => {
  const [currentBid, setCurrentBid] = useState(450);
  const [timeLeft, setTimeLeft] = useState(300);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(t => t > 0 ? t - 1 : 0);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleBid = () => { setCurrentBid(prev => prev + 10); };

  return (
    <div className="space-y-6 pb-24 animate-[slideIn_0.3s_ease-out]">
      <SectionHeader title="LIVE AUCTION" subtitle="Meritocracy Coin Only" />
      <CyberCard glow="green" className="mb-8">
        <div className="absolute top-2 right-2 z-30"><CyberBadge label="LIVE" color="#39ff14" /></div>
        <div className="w-full h-48 bg-gray-800 rounded mb-4 relative overflow-hidden group"><div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div><img src="https://picsum.photos/400/200?grayscale" alt="Item" className="w-full h-full object-cover mix-blend-overlay group-hover:scale-110 transition-transform duration-700" /><div className="absolute bottom-2 left-2"><h3 className="text-xl font-orbitron font-bold text-white">Backstage Pass (Access Level 5)</h3></div></div>
        <div className="flex justify-between items-end mb-4"><div><p className="text-xs text-gray-400 font-sans uppercase">Current Highest Bid</p><div className="text-3xl font-rajdhani font-bold text-cyber-green flex items-center gap-1 shadow-neon-green drop-shadow-lg">{currentBid} <span className="text-sm text-gray-400 font-sans mt-2">COINS</span></div></div><div className="text-right"><p className="text-xs text-gray-400 font-sans uppercase">Closes In</p><div className="text-2xl font-rajdhani font-bold text-red-500 tabular-nums animate-pulse">{formatTime(timeLeft)}</div></div></div>
        <CyberButton fullWidth onClick={handleBid} className="mb-2"><Gavel className="w-4 h-4" /> PLACE BID (+10)</CyberButton>
        <p className="text-[10px] text-center text-gray-500">*50% Fee applied. Funds held in escrow for 7 days.</p>
      </CyberCard>
      <SectionHeader title="VIRAL RAFFLES" subtitle="Pay with Social Action" />
      <div className="grid grid-cols-2 gap-4">
        <CyberCard glow="purple" className="flex flex-col justify-between h-40"><div><div className="flex justify-between mb-2"><CyberBadge label="FREE" color="#d000ff" /></div><h4 className="font-orbitron font-bold text-sm leading-tight">Signed Cyber-Jersey</h4></div><button className="flex items-center justify-center gap-2 bg-pink-600/20 border border-pink-500 text-pink-500 py-2 rounded hover:bg-pink-600/40 transition-colors"><Heart className="w-4 h-4 fill-current" /> LIKE TO ENTER</button></CyberCard>
        <CyberCard glow="cyan" className="flex flex-col justify-between h-40"><div><div className="flex justify-between mb-2"><CyberBadge label="PROMO" color="#00ffff" /></div><h4 className="font-orbitron font-bold text-sm leading-tight">VIP Lounge Upgrade</h4></div><button className="flex items-center justify-center gap-2 bg-cyan-600/20 border border-cyan-500 text-cyan-500 py-2 rounded hover:bg-cyan-600/40 transition-colors"><Heart className="w-4 h-4" /> LIKE TO ENTER</button></CyberCard>
      </div>
    </div>
  );
};