import React from 'react';
import { SectionHeader, CyberCard } from '../ui/CyberComponents';
import { Coins, Gavel, Briefcase, ArrowUpRight, ArrowDownLeft, Clock } from 'lucide-react';

const TRANSACTIONS = [
  { id: 1, title: 'Tip Sent to Hive Mind', type: 'TIP', amount: -5, status: 'COMPLETED', date: 'Feb 8, 16:45', party: 'System' },
  { id: 2, title: 'Gig Payment: Valet', type: 'GIG', amount: +100, status: 'ESCROW', date: 'Feb 8, 16:30', party: 'FastValet' },
  { id: 3, title: 'Bid on "Signed Jersey"', type: 'BID', amount: -150, status: 'ACTIVE', date: 'Feb 8, 15:10', party: 'AuctionBot' },
  { id: 4, title: 'Tip Received', type: 'TIP', amount: +10, status: 'COMPLETED', date: 'Feb 8, 14:20', party: 'VenueStaff_Sarah' },
  { id: 5, title: 'Gig Refund', type: 'REFUND', amount: +25, status: 'COMPLETED', date: 'Feb 8, 12:00', party: 'System' },
];

export const DealsScreen = () => {
  return (
    <div className="space-y-6 animate-fade-in pb-20">
      <SectionHeader title="MY DEALS" subtitle="Financial Log & Active Bids" />

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-3 mb-2">
         <div className="bg-[#1a1a1a] rounded-xl p-4 border border-white/5 flex flex-col justify-between h-24 relative overflow-hidden">
             <div className="absolute right-0 top-0 p-2 opacity-10"><Coins size={40} /></div>
             <span className="text-[9px] font-mono text-gray-400 uppercase tracking-widest z-10">NET FLOW (24H)</span>
             <div className="text-2xl font-rajdhani font-black text-white z-10 flex items-baseline gap-1">
                -20 <span className="text-xs font-bold text-gray-500">MC</span>
             </div>
         </div>
         <div className="bg-[#1a1a1a] rounded-xl p-4 border border-white/5 flex flex-col justify-between h-24 relative overflow-hidden">
             <div className="absolute right-0 top-0 p-2 opacity-10"><Gavel size={40} /></div>
             <span className="text-[9px] font-mono text-gray-400 uppercase tracking-widest z-10">ACTIVE BIDS</span>
             <div className="text-2xl font-rajdhani font-black text-cyber-yellow z-10">1</div>
         </div>
      </div>

      <div className="space-y-3">
         {TRANSACTIONS.map((tx) => {
             const isPositive = tx.amount > 0;
             const isPending = tx.status === 'ESCROW' || tx.status === 'ACTIVE';
             const ColorIcon = tx.type === 'BID' ? Gavel : tx.type === 'GIG' ? Briefcase : Coins;
             
             return (
                 <div key={tx.id} className="bg-[#0f0f11] border border-white/5 rounded-xl p-4 flex items-center justify-between hover:border-white/10 transition-colors shadow-md">
                     <div className="flex items-center gap-4">
                         <div className={`w-10 h-10 rounded-full flex items-center justify-center border ${
                             tx.type === 'BID' ? 'bg-yellow-500/10 border-yellow-500/30 text-yellow-500' :
                             tx.type === 'GIG' ? 'bg-blue-500/10 border-blue-500/30 text-blue-500' :
                             'bg-purple-500/10 border-purple-500/30 text-purple-500'
                         }`}>
                             <ColorIcon size={18} />
                         </div>
                         <div>
                             <h4 className="font-bold text-white text-sm font-sans">{tx.title}</h4>
                             <div className="flex items-center gap-2 mt-1">
                                 <span className="text-[10px] text-gray-500 font-mono">{tx.date}</span>
                                 <span className="text-gray-700">•</span>
                                 <span className="text-[10px] text-gray-400 font-sans">{tx.party}</span>
                             </div>
                         </div>
                     </div>
                     <div className="text-right">
                         <div className={`font-rajdhani font-black text-lg ${isPending ? 'text-gray-400' : isPositive ? 'text-cyber-green' : 'text-white'}`}>
                             {isPositive ? '+' : ''}{tx.amount} MC
                         </div>
                         <div className={`text-[9px] font-bold uppercase tracking-widest flex items-center justify-end gap-1 ${
                             tx.status === 'COMPLETED' ? 'text-cyber-green' : 
                             tx.status === 'ESCROW' ? 'text-blue-400' : 'text-cyber-yellow'
                         }`}>
                             {tx.status} {tx.status === 'ESCROW' && <Clock size={8} />}
                         </div>
                     </div>
                 </div>
             );
         })}
      </div>
      
      <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-cyber-green/10 to-transparent border-l-2 border-cyber-green">
          <p className="text-[10px] text-gray-300 font-sans leading-relaxed">
             <strong className="text-cyber-green">TIP:</strong> Use <strong>Merit Pay</strong> to securely hold funds in Escrow until the Gig is verified complete.
          </p>
      </div>
    </div>
  );
};