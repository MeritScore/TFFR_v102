import React, { useState, useEffect } from 'react';
import { ArrowRight, Crown, ShieldCheck, Coins, Users, Loader, Lock } from 'lucide-react';
import { CyberButton, IsotypeTheFunFanReporter } from '../ui/CyberComponents';

interface Props {
  userProfile: { handle: string, specialty: string };
  onComplete: (data: { specialty: string }) => void;
}

// --- High-Fidelity Official Payment Components ---

const ApplePayLogo = () => (
  <div className="flex items-center gap-1.5">
    <svg viewBox="0 0 384 512" height="18" fill="white" className="mt-[-2px]">
      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5c0 60.1 21.1 120.6 52 165.7 18.2 27.2 40.5 57 69.3 56.4 26.6-.7 36.5-17.2 68.6-17.2 32.7 0 42.6 17.3 70.3 16.6 28-.7 47.9-29.3 64.6-56.1 18.2-28.8 25.4-56.8 25.4-58.1-1.3-.6-48.4-19.1-45.5-52.1zM262 136.2c18.6-22.9 31-54.8 27.6-86.8-26.3 1.2-57.9 17.9-76.4 40.4-15.6 18.9-29.4 50.1-26.2 81.3 28.5 1.5 56.7-12 75-34.9z" />
    </svg>
    <span className="font-sans font-semibold text-xl tracking-tighter">Pay</span>
  </div>
);

const GPayLogo = () => (
  <div className="flex items-center gap-1.5">
    <span className="text-white/80 font-sans font-medium text-base">Pay with</span>
    <div className="flex items-center gap-1 bg-white px-1.5 py-0.5 rounded">
      <svg width="18" height="18" viewBox="0 0 24 24">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z" fill="#EA4335" />
      </svg>
      <span className="text-gray-600 font-sans font-bold text-lg tracking-tighter">Pay</span>
    </div>
  </div>
);

export const SpecialtySelectionScreen: React.FC<Props> = ({ userProfile, onComplete }) => {
  // Views: 'SELECTION' | 'VIP_PAYMENT' | 'PROCESSING' | 'VIP_SUCCESS' | 'SYNC'
  const [currentView, setCurrentView] = useState('SELECTION');
  const [specialty, setSpecialty] = useState('');

  // VIP Logic State
  const [coinQuantity, setCoinQuantity] = useState(100);
  const PRICE_PER_COIN = 7.25;
  const totalAmount = coinQuantity * PRICE_PER_COIN;

  // Sync State
  const [syncProgress, setSyncProgress] = useState(0);

  // --- Handlers ---

  const handleInitialSelection = () => {
    if (!specialty) return;
    if (specialty === 'vip') {
      setCurrentView('VIP_PAYMENT');
    } else {
      setCurrentView('SYNC');
    }
  };

  const handleVipPayment = () => {
    setCurrentView('PROCESSING');
    setTimeout(() => {
      setCurrentView('VIP_SUCCESS');
    }, 2500); // Simulate network
  };

  const handleContinueToSync = () => {
    setCurrentView('SYNC');
  };

  // Sync Animation
  useEffect(() => {
    if (currentView === 'SYNC') {
      const interval = setInterval(() => {
        setSyncProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => onComplete({ specialty }), 800);
            return 100;
          }
          return prev + 2;
        });
      }, 30);
      return () => clearInterval(interval);
    }
  }, [currentView, onComplete, specialty]);

  // --- Views ---

  // 1. SELECTION VIEW
  if (currentView === 'SELECTION') {
    const specialties = [
      { id: 'vip', label: 'VIP', icon: Crown, desc: 'Buy at least 100 MERITOCRACY COINS (US$7.25 each) and unlock the full premium experience, including exclusive VIP access and on-demand help-for-tips features.' },
      { id: 'safety', label: 'SAFETY INTEL', icon: ShieldCheck, desc: 'Be the hero or heroine of the night. Earn US$ tips by helping others with real-time alerts.' },
      { id: 'trade', label: 'TRADE & TIPS', icon: Coins, desc: 'Earn MERITOCRACY COINS by helping fans, then trade them for US$.' },
      { id: 'social', label: 'HIVE SOCIAL', icon: Users, desc: 'Make friends and unlock exclusive parties, secret after-parties, and last-minute free guest-list access.' }
    ];

    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4 py-6 bg-cyber-black relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-10">
          <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-gradient-to-br from-cyber-cyan/5 via-transparent to-transparent animate-spin-slow origin-center blur-[120px]"></div>
        </div>

        <div className="w-full max-w-md relative z-10 space-y-6">
          <div className="space-y-4 animate-[fadeIn_0.5s_ease-out]">
            <div className="text-center pt-8">
              <h2 className="text-2xl font-orbitron font-black text-white uppercase tracking-tighter leading-none">
                SELECT YOUR<br />
                <span className="text-cyber-cyan text-3xl">SPECIALTY</span>
              </h2>
            </div>

            <div className="bg-[#0f1215] border border-white/10 p-3 rounded-lg text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-cyber-cyan/5 pointer-events-none"></div>
              <p className="text-xs text-gray-400 font-sans leading-tight relative z-10">
                You can change or update your role multiple times during the event. Just choose what fits you best right now.
              </p>
            </div>

            <div className="space-y-2">
              {specialties.map((s) => {
                const Icon = s.icon;
                const isSelected = specialty === s.id;
                return (
                  <div key={s.id} onClick={() => setSpecialty(s.id)} className={`relative p-[1px] rounded-xl transition-all duration-300 group cursor-pointer ${isSelected ? 'bg-gradient-to-r from-cyber-purple to-cyber-cyan shadow-[0_0_15px_rgba(208,0,255,0.3)]' : 'bg-transparent hover:bg-white/10'}`}>
                    <div className={`relative rounded-[11px] p-3 flex items-start gap-3 h-full ${isSelected ? 'bg-[#0a0a0a]' : 'bg-[#0a0a0a] border border-white/10'}`}>
                      <div className={`p-2.5 rounded-lg border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${isSelected ? 'bg-cyber-purple/10 border-cyber-purple/50 text-cyber-purple' : 'bg-white/5 border-white/5 text-gray-500'}`}>
                        <Icon size={20} />
                      </div>
                      <div className="text-left flex-1 min-w-0">
                        <h4 className={`font-orbitron font-bold text-sm tracking-wide ${isSelected ? 'text-white' : 'text-gray-300'}`}>{s.label}</h4>
                        <p className="text-xs text-gray-400 font-sans leading-snug mt-1">{s.desc}</p>
                      </div>
                      {isSelected && (<div className="absolute right-3 top-3 w-2 h-2 rounded-full bg-cyber-cyan shadow-[0_0_5px_#00ffff]"></div>)}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-2">
              <CyberButton fullWidth onClick={handleInitialSelection} disabled={!specialty} className={`h-14 !rounded-xl font-bold uppercase tracking-widest text-sm shadow-none border-b-4 border-black/20 ${!specialty ? 'opacity-50 grayscale' : 'hover:scale-[1.01]'}`}>
                CONFIRM ROLE <ArrowRight className="ml-2 w-4 h-4" />
              </CyberButton>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 2. VIP PAYMENT VIEW
  if (currentView === 'VIP_PAYMENT') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4 py-4 bg-black relative overflow-hidden">
        {/* Golden Glow Effect */}
        <div className="absolute top-[-20%] left-[-20%] w-[140%] h-[140%] bg-yellow-500/5 blur-[100px] pointer-events-none"></div>

        <div className="w-full max-w-md relative z-10 space-y-4 animate-[fadeIn_0.5s_ease-out]">

          <div className="text-center space-y-2 pt-2">
            <Crown size={40} className="text-yellow-400 mx-auto drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]" />
            <h2 className="text-2xl font-orbitron font-black text-white uppercase tracking-tighter">VIP ACCESS</h2>
            <p className="text-gray-400 font-rajdhani font-bold text-[10px] tracking-[0.2em] uppercase">BUY MERITOCRACY COINS (CREDITS/TOKENS) TO UNLOCK</p>
          </div>

          {/* Payment Card */}
          <div className="relative p-[1px] bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 rounded-xl">
            <div className="bg-black rounded-[11px] p-4 space-y-4">

              {/* Quantity & Total Row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="bg-yellow-500/20 p-1.5 rounded text-yellow-500"><Coins size={18} /></div>
                  <div>
                    <p className="text-[9px] text-gray-500 font-bold uppercase tracking-wider">QUANTITY</p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <button onClick={() => setCoinQuantity(Math.max(100, coinQuantity - 10))} className="w-7 h-7 flex items-center justify-center bg-gray-900 border border-gray-700 text-gray-400 hover:text-white rounded text-sm">-</button>
                      <span className="font-orbitron font-bold text-white text-lg w-9 text-center">{coinQuantity}</span>
                      <button onClick={() => setCoinQuantity(coinQuantity + 10)} className="w-7 h-7 flex items-center justify-center bg-gray-900 border border-gray-700 text-gray-400 hover:text-white rounded text-sm">+</button>
                    </div>
                    <p className="text-[8px] text-yellow-500 font-bold mt-0.5">(MIN 100)</p>
                  </div>
                </div>
                <div className="font-mono text-[10px] text-cyber-cyan/80 leading-relaxed mb-4">
                  {'>'} INITIATING HANDSHAKE...<br />
                  {'>'} VERIFYING MERIT SCORE...<br />
                  {'>'} ENCRYPTING HANDLE: {userProfile.handle}...<br />
                  {'>'} ACCESS GRANTED.
                </div>
                <div className="text-right">
                  <p className="text-[9px] text-gray-500 font-bold uppercase tracking-wider">TOTAL</p>
                  <p className="text-xl font-orbitron font-black text-white">US$ {totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                  <p className="text-[8px] text-gray-600 font-sans">Includes Tax</p>
                </div>
              </div>

              {/* Disclaimer - COMPACT */}
              <div className="bg-gray-900/50 p-2.5 rounded-lg border border-white/5">
                <p className="text-xs text-gray-400 leading-snug font-sans text-justify">
                  Each Meritocracy Coin costs US${PRICE_PER_COIN}. You can buy as many Meritocracy Coins as you want, but to receive the VIP badge and unlock the full experience during this event, you must purchase at least 100 Meritocracy Coins (US${(100 * PRICE_PER_COIN).toFixed(2)}).
                </p>
              </div>

            </div>
          </div>

          {/* Payment Buttons - UPDATED: COMPACT & Text Only */}
          <div className="space-y-2 pt-1">
            <button onClick={handleVipPayment} className="w-full h-12 bg-[#635BFF] hover:bg-[#5851e0] text-white rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(99,91,255,0.3)] transition-all active:scale-[0.98]">
              <span className="font-sans font-bold text-lg tracking-tight">Stripe</span>
            </button>
            <button onClick={handleVipPayment} className="w-full h-12 bg-[#0070BA] hover:bg-[#0062a3] text-white rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(0,112,186,0.3)] transition-all active:scale-[0.98]">
              <span className="font-sans font-bold text-lg tracking-tight">PayPal</span>
            </button>
            <button onClick={handleVipPayment} className="w-full h-12 bg-black border border-white/20 hover:bg-gray-900 text-white rounded-lg flex items-center justify-center transition-all active:scale-[0.98]">
              <ApplePayLogo />
            </button>
            <button onClick={handleVipPayment} className="w-full h-12 bg-black border border-white/20 hover:bg-gray-900 text-white rounded-lg flex items-center justify-center transition-all active:scale-[0.98]">
              <GPayLogo />
            </button>
          </div>

          <p className="text-[9px] text-center text-gray-600 font-sans flex items-center justify-center gap-1 pb-2">
            <Lock size={8} /> Secure 256-bit SSL Encrypted Payment
          </p>
        </div>
      </div>
    );
  }

  // 3. PROCESSING VIEW
  if (currentView === 'PROCESSING') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black">
        <div className="bg-gray-900/50 px-8 py-6 rounded-lg border border-white/10 flex flex-col items-center gap-4 animate-pulse">
          <Loader className="animate-spin text-yellow-500" size={32} />
          <p className="font-orbitron font-bold text-gray-400 tracking-widest text-sm">PROCESSING TRANSACTION...</p>
        </div>
      </div>
    );
  }

  // 4. VIP SUCCESS VIEW
  if (currentView === 'VIP_SUCCESS') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black px-4 relative overflow-hidden">
        <div className="absolute top-[-20%] left-[-20%] w-[140%] h-[140%] bg-green-500/5 blur-[100px] pointer-events-none"></div>

        <div className="w-full max-w-md relative z-10 space-y-8 animate-[fadeIn_0.5s_ease-out]">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-1 bg-yellow-500 rounded-full shadow-[0_0_10px_#eab308]"></div>
          </div>

          <div className="text-center">
            <Crown size={56} className="text-yellow-400 mx-auto mb-4 drop-shadow-[0_0_20px_rgba(250,204,21,0.6)] animate-bounce" />
            <h2 className="text-3xl font-orbitron font-black text-white uppercase tracking-tighter">VIP ACCESS</h2>
            <p className="text-yellow-500 font-orbitron font-bold text-sm tracking-[0.2em] uppercase mt-2">BADGE ACQUIRED</p>
          </div>

          {/* Success Card */}
          <div className="relative p-[1px] bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600 rounded-xl shadow-[0_0_30px_rgba(234,179,8,0.2)]">
            <div className="bg-[#1a1500] rounded-[11px] p-6 border border-yellow-500/20">
              <h3 className="text-white font-bold text-sm mb-4">Congratulations! You'll now appear in the chat with your VIP badge.</h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                You have <span className="text-white font-bold">{coinQuantity} Meritocracy Coins</span> (credits/tokens equivalent to <span className="text-white font-bold">US${totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>) to spend and enjoy the full experience tonight.
              </p>
            </div>
          </div>

          <CyberButton
            fullWidth
            onClick={handleContinueToSync}
            className="h-16 bg-[#39ff14] text-black hover:bg-[#32e012] font-black text-lg shadow-[0_0_25px_rgba(57,255,20,0.5)] border-none"
          >
            CONTINUE TO SYNC <ArrowRight className="ml-2" />
          </CyberButton>

        </div>
      </div>
    );
  }

  // 5. SYNC VIEW
  if (currentView === 'SYNC') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-cyber-black relative overflow-hidden">
        <div className="w-full max-w-md text-center space-y-8">
          <div className="relative mx-auto w-32 h-32 flex items-center justify-center">
            <div className="absolute inset-0 border-4 border-[#1a1a1a] rounded-full"></div>
            <div className="absolute inset-0 border-4 border-cyber-green rounded-full transition-all duration-100 ease-out" style={{ clipPath: `inset(${100 - syncProgress}% 0 0 0)` }}></div>
            <div className="relative z-10 w-20 h-20 p-2">
              <IsotypeTheFunFanReporter color="#39ff14" />
            </div>
            <div className="absolute inset-0 rounded-full shadow-[0_0_30px_rgba(57,255,20,0.1)]"></div>
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-orbitron font-black text-white uppercase tracking-wider">INITIALIZING SYNC</h2>

            <div className="w-full max-w-[200px] h-1 bg-gray-800 rounded-full mx-auto overflow-hidden">
              <div className="h-full bg-cyber-green transition-all duration-100" style={{ width: `${syncProgress}%` }}></div>
            </div>

            <div className="flex justify-between text-[10px] font-mono text-cyber-green max-w-[200px] mx-auto pt-1">
              <span>{Math.floor(syncProgress)}% UPLOADED</span>
              <span>LATENCY: 4MS</span>
            </div>
          </div>

          <div className="bg-black border border-white/10 rounded-lg p-3 max-w-sm mx-auto">
            <p className="text-[10px] font-mono text-gray-500 text-left">
              {'>'} ENCRYPTING HANDLE: {userProfile.handle}...<br />
              {syncProgress > 30 && '> SECURE HANDSHAKE: ESTABLISHED'}<br />
              {syncProgress > 60 && `> APPLYING SPECIALTY: ${specialty.toUpperCase()}`}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return null;
};