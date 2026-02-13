import React, { useState } from 'react';
import { SectionHeader, CyberCard, CyberBadge } from '../ui/CyberComponents';
import { Briefcase, Hand, MapPin, DollarSign, Search, Filter } from 'lucide-react';
import { MOCK_USERS } from '../chat/ChatConstants';

const GLOBAL_GIGS = [
  { id: 1, type: 'OFFER', title: 'Holding spot in Merch Line', price: 50, location: 'Section 100', user: MOCK_USERS[0], time: '2m ago' },
  { id: 2, type: 'REQUEST', title: 'Need battery pack urgently', price: 15, location: 'Upper Deck', user: MOCK_USERS[1], time: '5m ago' },
  { id: 3, type: 'OFFER', title: 'Selling VIP Lanyard (Legit)', price: 500, location: 'North Gate', user: MOCK_USERS[2], time: '12m ago' },
  { id: 4, type: 'REQUEST', title: 'Ride share to Downtown', price: 20, location: 'Parking Lot C', user: MOCK_USERS[3], time: '20m ago' },
  { id: 5, type: 'OFFER', title: 'Expert Crowd Navigation', price: 30, location: 'Mosh Pit', user: MOCK_USERS[4], time: '25m ago' },
  { id: 6, type: 'OFFER', title: 'Cold Water Bottles x2', price: 10, location: 'Stairs', user: MOCK_USERS[0], time: '30m ago' },
];

export const MarketplaceScreen = () => {
  const [filter, setFilter] = useState<'ALL' | 'OFFER' | 'REQUEST'>('ALL');

  const filteredGigs = GLOBAL_GIGS.filter(g => filter === 'ALL' || g.type === filter);

  return (
    <div className="space-y-4 animate-fade-in pb-20">
      <div className="flex items-center justify-between mb-2">
          <SectionHeader title="GLOBAL MARKET" subtitle="Real-time Gig Board" />
          <div className="flex gap-1 bg-[#1a1a1a] p-1 rounded-lg border border-white/10">
              <button onClick={() => setFilter('ALL')} className={`px-3 py-1 text-[10px] font-bold rounded ${filter === 'ALL' ? 'bg-white text-black' : 'text-gray-400 hover:text-white'}`}>ALL</button>
              <button onClick={() => setFilter('OFFER')} className={`px-3 py-1 text-[10px] font-bold rounded ${filter === 'OFFER' ? 'bg-cyber-yellow text-black' : 'text-gray-400 hover:text-white'}`}>OFFERS</button>
              <button onClick={() => setFilter('REQUEST')} className={`px-3 py-1 text-[10px] font-bold rounded ${filter === 'REQUEST' ? 'bg-cyber-cyan text-black' : 'text-gray-400 hover:text-white'}`}>NEEDS</button>
          </div>
      </div>

      <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
          <input type="text" placeholder="Search gigs, items, or locations..." className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:border-cyber-green focus:outline-none transition-colors font-sans" />
      </div>

      <div className="space-y-3">
          {filteredGigs.map((gig) => {
              const isOffer = gig.type === 'OFFER';
              return (
                  <div key={gig.id} className="relative group">
                       <div className={`absolute inset-0 bg-gradient-to-r ${isOffer ? 'from-yellow-900/20' : 'from-cyan-900/20'} to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity`}></div>
                       <div className={`relative bg-[#121214] border-l-4 ${isOffer ? 'border-cyber-yellow' : 'border-cyber-cyan'} rounded-r-xl p-4 shadow-lg flex flex-col gap-3`}>
                           <div className="flex justify-between items-start">
                               <div className="flex flex-col">
                                   <div className="flex items-center gap-2 mb-1">
                                       <span className={`text-[9px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded ${isOffer ? 'bg-cyber-yellow text-black' : 'bg-cyber-cyan text-black'}`}>{gig.type}</span>
                                       <span className="text-[10px] text-gray-500 font-mono">{gig.time}</span>
                                   </div>
                                   <h3 className="text-white font-bold font-sans text-sm leading-tight">{gig.title}</h3>
                               </div>
                               <div className="flex flex-col items-end">
                                   <span className={`text-xl font-rajdhani font-black ${isOffer ? 'text-cyber-yellow' : 'text-cyber-cyan'}`}>{gig.price} MC</span>
                               </div>
                           </div>
                           
                           <div className="flex items-center justify-between border-t border-white/5 pt-3 mt-1">
                               <div className="flex items-center gap-3">
                                   <div className="flex items-center gap-1 text-gray-400 text-xs">
                                       <MapPin size={12} />
                                       <span>{gig.location}</span>
                                   </div>
                                   <div className="flex items-center gap-1 text-gray-500 text-xs">
                                       <div className="w-4 h-4 rounded-full bg-gray-700 overflow-hidden"><img src={gig.user.avatarUrl} className="w-full h-full object-cover"/></div>
                                       <span>{gig.user.username}</span>
                                   </div>
                               </div>
                               <button className={`px-4 py-1.5 rounded text-[10px] font-black uppercase tracking-wider transition-all hover:scale-105 active:scale-95 ${isOffer ? 'bg-transparent border border-cyber-yellow text-cyber-yellow hover:bg-cyber-yellow hover:text-black' : 'bg-transparent border border-cyber-cyan text-cyber-cyan hover:bg-cyber-cyan hover:text-black'}`}>
                                   {isOffer ? 'BID / BUY' : 'OFFER HELP'}
                               </button>
                           </div>
                       </div>
                  </div>
              )
          })}
      </div>
    </div>
  );
};