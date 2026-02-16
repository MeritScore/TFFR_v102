import React, { useState } from 'react';
import { Send, Plus, X, Briefcase, Hand, MapPin, Gavel } from 'lucide-react';

export const InputBar = ({ onSendMessage, onQuickAction }: any) => {
  const [text, setText] = useState('');
  const [showMenu, setShowMenu] = useState(false);

  const handleAction = (action: string) => {
    onQuickAction(action);
    setShowMenu(false);
  };

  return (
    <div className="fixed bottom-20 left-0 right-0 z-40 max-w-md mx-auto font-sans">
      {/* Quick Action Menu */}
      {showMenu && (
        <div className="bg-[#0a0a0a] border-t border-white/10 px-4 py-6 animate-slide-up shadow-2xl backdrop-blur-xl relative">
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyber-cyan/50 to-transparent"></div>
          <div className="grid grid-cols-4 gap-3 mb-2">
            <button 
                onClick={() => handleAction('OFFER_GIG')} 
                className="aspect-square border border-cyber-yellow rounded-none flex flex-col items-center justify-center gap-2 bg-black hover:bg-cyber-yellow/10 transition-colors group relative overflow-hidden"
            >
                <div className="absolute inset-0 bg-cyber-yellow/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <Briefcase className="text-cyber-yellow group-hover:scale-110 transition-transform relative z-10" size={24} strokeWidth={1.5} />
                <span className="text-[9px] font-orbitron font-bold text-cyber-yellow leading-tight text-center relative z-10 tracking-wider">OFFER<br/>GIG</span>
            </button>
            
            <button 
                onClick={() => handleAction('REQUEST_HELP')} 
                className="aspect-square border border-cyber-cyan rounded-none flex flex-col items-center justify-center gap-2 bg-black hover:bg-cyber-cyan/10 transition-colors group relative overflow-hidden"
            >
                <div className="absolute inset-0 bg-cyber-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <Hand className="text-cyber-cyan group-hover:scale-110 transition-transform relative z-10" size={24} strokeWidth={1.5} />
                <span className="text-[9px] font-orbitron font-bold text-cyber-cyan leading-tight text-center relative z-10 tracking-wider">REQUEST<br/>HELP</span>
            </button>
            
            <button 
                onClick={() => handleAction('INTEL')} 
                className="aspect-square border border-red-500 rounded-none flex flex-col items-center justify-center gap-2 bg-black hover:bg-red-500/10 transition-colors group relative overflow-hidden"
            >
                <div className="absolute inset-0 bg-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <MapPin className="text-red-500 group-hover:scale-110 transition-transform relative z-10" size={24} strokeWidth={1.5} />
                <span className="text-[9px] font-orbitron font-bold text-red-500 leading-tight text-center relative z-10 tracking-wider">REPORT<br/>INTEL</span>
            </button>
            
            <button 
                onClick={() => handleAction('STARTING_BID')} 
                className="aspect-square border border-cyber-green rounded-none flex flex-col items-center justify-center gap-2 bg-black hover:bg-cyber-green/10 transition-colors group relative overflow-hidden"
            >
                <div className="absolute inset-0 bg-cyber-green/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <Gavel className="text-cyber-green group-hover:scale-110 transition-transform relative z-10" size={24} strokeWidth={1.5} />
                <span className="text-[9px] font-orbitron font-bold text-cyber-green leading-tight text-center relative z-10 tracking-wider">STARTING<br/>BID</span>
            </button>
          </div>
          
          <div className="h-1.5 bg-gray-800 rounded-full mt-4 mx-auto w-1/3 opacity-50"></div>
        </div>
      )}

      {/* Input Row */}
      <div className="bg-black p-3 flex items-center gap-2 border-t border-white/10 shadow-[0_-5px_20px_rgba(0,0,0,0.5)]">
        <button 
            onClick={() => setShowMenu(!showMenu)} 
            className={`w-12 h-12 flex items-center justify-center border transition-all duration-300 ${showMenu ? 'border-cyber-cyan text-cyber-cyan bg-cyber-cyan/10 rotate-90' : 'border-white/20 text-cyber-cyan bg-white/5 hover:border-cyber-cyan hover:bg-cyber-cyan/5'}`}
        >
            {showMenu ? <X size={24} /> : <Plus size={24} />}
        </button>
        
        <input 
          className="flex-1 bg-[#121212] text-white text-sm px-4 h-12 outline-none border border-transparent focus:border-gray-700 placeholder:text-gray-500 font-sans transition-colors" 
          value={text} 
          onChange={e => setText(e.target.value)}
          placeholder="Broadcast to Hive..."
          onKeyDown={e => {
              if(e.key === 'Enter' && text.trim()) {
                  onSendMessage(text);
                  setText('');
              }
          }}
        />
        
        <button 
            onClick={() => { if(text.trim()) { onSendMessage(text); setText(''); }}} 
            className="w-14 h-12 bg-[#006666] hover:bg-[#008888] text-white flex items-center justify-center skew-x-[-10deg] ml-1 transition-colors shadow-[0_0_15px_rgba(0,128,128,0.3)] active:scale-95"
        >
             <div className="skew-x-[10deg]">
                <Send size={20} fill="currentColor" strokeWidth={0} />
             </div>
        </button>
      </div>
    </div>
  );
}