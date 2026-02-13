import React from 'react';
import { Wallet, Lock } from 'lucide-react';
import { CyberCard, SectionHeader, CyberButton } from '../ui/CyberComponents';

export const WalletScreen = () => {
  return (
    <div className="space-y-6 pb-24 animate-[fadeIn_0.3s]">
      <SectionHeader title="NEURAL WALLET" subtitle="Meritocracy Coin Ledger" />
      <div className="relative p-[1px] rounded-xl bg-gradient-to-r from-gray-700 via-gray-500 to-gray-800">
        <div className="bg-cyber-black rounded-xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-20"><Wallet className="w-24 h-24 text-white" /></div>
          <div className="relative z-10"><p className="text-gray-400 text-xs font-orbitron tracking-widest">AVAILABLE BALANCE</p><h1 className="text-5xl font-rajdhani font-bold text-white mt-2 mb-4">124.50</h1><div className="flex gap-4"><CyberButton variant="secondary" className="flex-1 text-xs">ADD FUNDS</CyberButton><CyberButton variant="primary" className="flex-1 text-xs" disabled={false}>WITHDRAW (STRIPE)</CyberButton></div><p className="text-[10px] text-gray-500 mt-2 text-center">Min. withdrawal: 10 Coins. Instant Transfer.</p></div>
        </div>
      </div>
      <CyberCard glow="none" className="border-t border-yellow-500/30">
        <div className="flex items-start gap-4">
          <div className="bg-yellow-500/10 p-3 rounded-full border border-yellow-500/50"><Lock className="w-6 h-6 text-yellow-500" /></div>
          <div className="flex-1"><h3 className="font-orbitron font-bold text-gray-200">PENDING (ESCROW)</h3><div className="flex justify-between items-end mt-1"><span className="text-2xl font-rajdhani font-bold text-yellow-500">45.00</span><span className="text-xs text-gray-500">Release: 4 Days</span></div><div className="w-full bg-gray-800 h-1 mt-2 rounded-full overflow-hidden"><div className="bg-yellow-500 h-full w-1/2"></div></div></div>
        </div>
      </CyberCard>
      <SectionHeader title="HISTORY" />
      <div className="space-y-3">{[{ label: 'Gig Payout: Water Delivery', amount: '+15.00', date: 'Today', status: 'Pending' }, { label: 'Auction Win: VIP Pass', amount: '-120.00', date: 'Yesterday', status: 'Completed' }, { label: 'Platform Fee (50%)', amount: '-7.50', date: 'Today', status: 'Deducted' },].map((tx, i) => (<div key={i} className="flex justify-between items-center p-3 border-b border-gray-800"><div className="flex items-center gap-3"><div className={`w-2 h-2 rounded-full ${tx.status === 'Pending' ? 'bg-yellow-500' : tx.status === 'Completed' ? 'bg-green-500' : 'bg-red-500'}`}></div><div><p className="text-sm font-bold text-gray-300">{tx.label}</p><p className="text-xs text-gray-600">{tx.date}</p></div></div><span className={`font-rajdhani font-bold ${tx.amount.startsWith('+') ? 'text-green-400' : 'text-gray-400'}`}>{tx.amount}</span></div>))}</div>
    </div>
  );
};