import React, { useRef, useState, useEffect } from 'react';
import { UserRole } from '../../types';
import { CyberButton, CyberCard, IsotypeTheFunFanReporter } from '../ui/CyberComponents';
import { Lock, ExternalLink } from 'lucide-react';

export const LoginSimulation = ({ onSelectRole }: { onSelectRole: (role: UserRole) => void }) => {
  const svgRef = useRef(null);
  const [bootPhase, setBootPhase] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);

  const diagnosticLines = [
    "> INITIALIZING HIVE_MIND_PROTOCOL...",
    "> LOADING MERITOCRACY_COIN ASSETS...",
    "> SYNCING INFLUENTIAL_CIRCLE DATA...",
    "> CONNECTION ESTABLISHED: GLOBAL_ARENA",
    "> STATUS: READY TO START THE FUN."
  ];

  useEffect(() => {
    diagnosticLines.forEach((line, i) => {
      setTimeout(() => setLogs(prev => [...prev, line]), i * 300);
    });
    const timer1 = setTimeout(() => setBootPhase(1), 300);
    const timer2 = setTimeout(() => setBootPhase(2), 1500);
    const timer3 = setTimeout(() => setBootPhase(3), 2200);
    return () => { clearTimeout(timer1); clearTimeout(timer2); clearTimeout(timer3); };
  }, []);

  return (
    <div className="flex flex-col items-center justify-start min-h-screen px-4 py-8 relative overflow-x-hidden bg-cyber-black scroll-smooth">
      {/* Background Ambient */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20 overflow-hidden">
        <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-gradient-to-br from-cyber-green/5 via-transparent to-transparent animate-spin-slow origin-center blur-[120px]"></div>
      </div>

      {/* Boot Sequence Overlay */}
      {bootPhase < 2 && (
        <div className="absolute inset-0 z-50 bg-black flex flex-col items-center justify-center p-8 transition-opacity duration-1000">
          <div className="w-full max-w-xs font-mono text-[10px] text-cyber-green space-y-1">
            {logs.map((log, i) => (
              <div key={i} className="animate-pulse">{log}</div>
            ))}
            <div className="w-2 h-4 bg-cyber-green animate-pulse inline-block"></div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className={`relative z-10 text-center space-y-4 mb-6 transition-all duration-1000 ${bootPhase >= 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        <div className="relative mx-auto w-24 h-24 flex items-center justify-center">
          <div className="absolute inset-0 bg-cyber-green/5 rounded-full blur-3xl animate-pulse"></div>
          <IsotypeTheFunFanReporter />
        </div>

        <div className={`space-y-4 transition-all duration-700 delay-300 ${bootPhase >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <h1 className="text-4xl md:text-5xl font-orbitron font-black leading-none tracking-tighter drop-shadow-2xl">
            <span className="text-white">THE </span>
            <span className="text-cyber-green drop-shadow-[0_0_15px_rgba(57,255,20,0.6)]">FUN </span>
            <span className="text-white">FAN</span><br />
            <span className="text-cyber-green drop-shadow-[0_0_15px_rgba(57,255,20,0.6)]">REPORTER</span>
          </h1>
          <div className="flex flex-col items-center gap-2">
            <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-cyber-green to-transparent opacity-60"></div>
            <p className="text-cyber-green font-rajdhani font-bold tracking-tight text-[11px] uppercase leading-[1.3] max-w-[280px] mx-auto drop-shadow-[0_0_8px_rgba(57,255,20,0.4)]">
              Powered by Meritocracy Coin, Influential Circle,<br />Meritocracy Club, and The Human Team
            </p>
            <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-cyber-green to-transparent opacity-60"></div>
          </div>
        </div>
      </div>

      {/* Interactive Section */}
      <div className={`w-full max-w-lg relative z-10 space-y-8 pb-48 transition-all duration-1000 delay-700 ${bootPhase >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="text-center space-y-4 px-3">
          <p className="text-gray-300 text-sm font-sans leading-[1.1] tracking-wide">
            Get help on demand for tips, unlock exclusive VIP parties, and connect with a community that supports the gig economy. Make new friends, be someone’s hero, or maybe even discover your soulmate!
          </p>
          <p className="text-cyber-cyan text-sm font-sans leading-[1.1] font-semibold">
            Chat and earn US$ tips in real time. Instantly offer your services or products at massive events (20,000+ people). Share valuable info, post offers, place bids or win them, and unlock new opportunities.
          </p>
        </div>

        <CyberCard glow="green">
          <div className="flex flex-col items-center text-center p-2">
            <h2 className="text-[16px] sm:text-[18px] md:text-xl font-orbitron font-black text-white mb-6 uppercase tracking-tight sm:tracking-widest leading-[1.4]">
              BE PART OF OUR<br />
              HIVE MIND<br />
              SINGULARITY FOR<br />
              MASSIVE EVENTS
            </h2>
            <CyberButton fullWidth onClick={() => onSelectRole(UserRole.FAN)} className="h-20 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-white/30 animate-scan pointer-events-none"></div>
              <div className="w-11 h-11 mr-4">
                <IsotypeTheFunFanReporter color="#000000" noGlow={true} className="w-full h-full" />
              </div>
              <span className="text-2xl tracking-tighter font-black">START THE FUN</span>
            </CyberButton>
          </div>
        </CyberCard>

        {/* Exclusive Guest List Link */}
        <div className="text-center px-4 -mt-4">
          <a
            href="https://partiful.com/e/QotsHQ3kj2sHi05d7AF0"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 py-2 px-4 rounded-lg bg-white/5 border border-white/10 hover:border-cyber-cyan transition-all duration-300 shadow-[0_0_10px_rgba(255,255,255,0.05)]"
          >
            <span className="text-[11px] font-orbitron font-bold text-gray-300 group-hover:text-cyber-cyan transition-colors tracking-wider text-center leading-relaxed">
              Get on our exclusive guest list<br />
              for the next event!
            </span>
            <ExternalLink size={12} className="text-gray-500 group-hover:text-cyber-cyan transition-colors" />
          </a>
        </div>

        <div className="text-center pt-2">
          <button
            onClick={() => onSelectRole(UserRole.ADMIN)}
            className="text-[11px] font-orbitron font-black text-cyber-purple hover:text-cyber-cyan transition-all uppercase tracking-[0.3em] flex items-center justify-center gap-2 mx-auto py-3 px-6 rounded-xl border border-cyber-purple/40 bg-cyber-purple/10 shadow-[0_0_15px_rgba(208,0,255,0.2)] hover:bg-cyber-purple/20 h-auto"
          >
            <Lock size={12} className="text-cyber-cyan" />
            <span>RESTRICTED ADMIN ACCESS</span>
          </button>
        </div>
      </div>
    </div>
  );
}