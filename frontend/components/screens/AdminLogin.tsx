import React, { useState, useEffect } from 'react';
import {
  ShieldAlert, Palette, Rocket, Scale, Brain, Headset,
  BarChart2, Briefcase, Lock, Fingerprint, X, Terminal,
  Cpu, Activity
} from 'lucide-react';

interface Props {
  onAccessGranted: (agentId?: string) => void;
  onBack: () => void;
  targetRole: string; // 'ARCHY', 'GOD_MODE', 'SPONSOR', 'AI_SUPPORT', etc.
}

// NOTE FOR CTO ARCHY (BACKEND):
// Every personnel ID (targetRole) below must have a UNIQUE passcode/hash in the database.
// Do not share passwords between roles.
const ROLE_NAMES: Record<string, string> = {
  'GOD_MODE': 'MARILYN GOD MODE',
  'ARCHY': 'CTO ARCHY (HEAD OF AI)',
  'SPONSOR': 'EVENT SPONSOR',
  'OWNER': 'VENUE OWNER',
  'MANAGER': 'VENUE MANAGER',
  'PROMOTER': 'VENUE PROMOTER',
  // Specific Agent Roles
  'HACKY': 'AI MODERATOR (HACKY)',
  'SIRENA': 'AI MANAGER (SIRENA)',
  'VIPPY': 'VIP AI AGENT (VIPPY)',
  'ASSI': 'EXECUTIVE ASST. (ASSI)',
  'DATIN': 'AI BROKER (DATIN)',
  // Fallbacks if needed
  'ASSISTANT': 'EXECUTIVE ASST.',
  'MODERATOR': 'AI MODERATOR',
  'AI_BROKER': 'AI BROKER',
  'VIP_AGENT': 'VIP AI AGENT',
  'AI_SUPPORT': 'AI SUPPORT GUIDE'
};

const AGENT_PINS: Record<string, string> = {
  'ARCHY': '1111',
  'ASSI': '2222',
  'DESY': '3333',
  'MARK': '4444',
  'HACKY': '5555',
  'FLOR': '6666',
  'SIRENA': '7777',
  'DATIN': '8888',
  'VIPPY': '9999',
  'SPONSOR': '1234',
  'OWNER': '4321',
  'MANAGER': '5678',
  'PROMOTER': '8765',
  'AI_SUPPORT': '1010'
};

// The AI High Council Data (Only visible if AI_SUPPORT is selected)
const AGENTS = [
  { id: 'ASSI', name: 'ASSI', role: 'Exec. Chief of Staff', icon: Brain, color: 'text-white', desc: 'Orchestration & Roadmap' },
  { id: 'DESY', name: 'DESY', role: 'CPDO & UX Lead', icon: Palette, color: 'text-purple-400', desc: 'Design System & Frontend' },
  { id: 'MARK', name: 'MARK', role: 'CMO & Growth', icon: Rocket, color: 'text-pink-500', desc: 'Viral Loops & Ad Strategy' },
  { id: 'HACKY', name: 'HACKY', role: 'CISO & Guardian', icon: ShieldAlert, color: 'text-red-500', desc: 'Security, QA & Load Tests' },
  { id: 'FLOR', name: 'FLOR', role: 'COO & Legal', icon: Scale, color: 'text-yellow-500', desc: 'FinOps, ToS & Compliance' },
  { id: 'SIRENA', name: 'SIRENA', role: 'Live Ops Cmdr', icon: Headset, color: 'text-cyan-400', desc: 'Support & Trust/Safety' },
  { id: 'DATIN', name: 'DATIN', role: 'Data & Monetization', icon: BarChart2, color: 'text-green-400', desc: 'AdOps & Tokenomics' },
  { id: 'VIPPY', name: 'VIPPY', role: 'B2B Partnership', icon: Briefcase, color: 'text-orange-400', desc: 'Sales & Promoter Relations' },
];

export const AdminLogin: React.FC<Props> = ({ onAccessGranted, onBack, targetRole }) => {
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [authStage, setAuthStage] = useState<'SELECT' | 'SCAN' | 'AUTHORIZED'>('SCAN');
  const [pin, setPin] = useState('');

  // Initial Logic: 
  // 1. We ALWAYS ask for a PIN first (Security Check).
  // 2. If targetRole is 'AI_SUPPORT', the PIN unlocks the "Identify Intelligence" Grid (SELECT stage).
  // 3. For other roles (including ARCHY now), the PIN unlocks the dashboard directly (AUTHORIZED stage).
  useEffect(() => {
    setSelectedAgent(targetRole);
    setAuthStage('SCAN');
  }, [targetRole]);

  const handleAgentSelect = (id: string) => {
    setSelectedAgent(id);
    // Bypass PIN SCAN inside the grid - Direct Authorization
    setAuthStage('AUTHORIZED');
    // Pass the specific ID (e.g., 'ASSI') back to App.tsx
    setTimeout(() => onAccessGranted(id), 800);
  };

  const handlePinEntry = (num: string) => {
    if (pin.length < 4) {
      const newPin = pin + num;
      setPin(newPin);
      if (newPin.length === 4) {
        // --- SECURE PIN LOGIC ---
        const MASTER_PIN = '2026'; // Founder's Omni-Passcode
        const isMasterPin = newPin === MASTER_PIN;
        const targetPin = AGENT_PINS[targetRole] || '0000'; // Default fallback if not mapped
        const isAgentPin = newPin === targetPin;
        const isGodModePanel = targetRole === 'GOD_MODE';

        let isAuthorized = false;

        if (isGodModePanel) {
          // Only the Master PIN can unlock the God Mode panel
          if (isMasterPin) isAuthorized = true;
        } else {
          // Other panels can be unlocked by their specific PIN or the Master PIN
          if (isAgentPin || isMasterPin) isAuthorized = true;
        }

        setTimeout(() => {
          if (isAuthorized) {
            if (targetRole === 'AI_SUPPORT') {
              // PIN Verified -> Unlock Agent Grid
              setAuthStage('SELECT');
              setPin('');
            } else {
              // PIN Verified -> Access Granted
              setAuthStage('AUTHORIZED');
              setTimeout(() => onAccessGranted(), 800);
            }
          } else {
            // UNAUTHORIZED -> Flash/Reset
            setPin('');
          }
        }, 600);
      }
    }
  };

  const handleBack = () => {
    // If we are on the Grid or PIN Pad, back takes us to the Personnel Select screen
    onBack();
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col relative overflow-hidden font-sans">
      {/* Background Grid & Effects */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(20,20,20,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(20,20,20,0.5)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(220,38,38,0.1)_0%,transparent_60%)] pointer-events-none"></div>

      {/* Header */}
      <header className="relative z-20 flex items-center justify-between px-6 py-4 border-b border-red-900/30 bg-black/90 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="bg-red-500/10 p-2 rounded border border-red-500/30 animate-pulse">
            <Lock size={16} className="text-red-500" />
          </div>
          <div>
            <h1 className="font-orbitron font-bold text-sm tracking-[0.2em] text-white">RESTRICTED ACCESS</h1>
            <p className="text-[10px] text-red-400 font-mono tracking-wider">
              {(targetRole === 'AI_SUPPORT') ? 'LEVEL 5 CLEARANCE' : 'PERSONNEL AUTHENTICATION'}
            </p>
          </div>
        </div>
        <button onClick={handleBack} className="p-2 hover:bg-white/5 rounded-full transition-colors group">
          <X size={20} className="text-gray-500 group-hover:text-white" />
        </button>
      </header>

      <main className="flex-1 relative z-10 flex flex-col items-center justify-center p-4">

        {/* VIEW 1: AGENT SELECTION (FOR AI_SUPPORT) - UNLOCKED AFTER PIN */}
        {authStage === 'SELECT' && (
          <div className="w-full max-w-4xl animate-[fadeIn_0.5s_ease-out]">
            <div className="text-center mb-10 space-y-2">
              <Cpu size={48} className="mx-auto text-gray-700 mb-4" strokeWidth={1} />
              <h2 className="text-2xl font-orbitron font-black text-white uppercase tracking-widest">Identify Intelligence</h2>
              <p className="text-xs text-gray-400 font-mono">SELECT YOUR DESIGNATED AI PROTOCOL</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {AGENTS.map((agent) => {
                const Icon = agent.icon;
                return (
                  <button
                    key={agent.id}
                    onClick={() => handleAgentSelect(agent.id)}
                    className="relative group bg-gray-900/40 border border-white/5 hover:border-white/20 hover:bg-gray-800/60 p-4 rounded-xl transition-all duration-300 flex flex-col items-center text-center h-40 justify-between overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="p-3 rounded-full bg-black/50 border border-white/10 group-hover:scale-110 transition-transform duration-300">
                      <Icon className={agent.color} size={24} />
                    </div>
                    <div className="relative z-10">
                      <h3 className="font-orbitron font-bold text-sm text-gray-200 group-hover:text-white">{agent.name}</h3>
                      <p className="text-[10px] text-gray-300 font-mono uppercase tracking-tight">{agent.role}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* VIEW 2: SECURITY HANDSHAKE (PIN PAD) - FIRST STEP */}
        {authStage === 'SCAN' && (
          <div className="w-full max-w-sm text-center space-y-8 animate-[zoomIn_0.3s_ease-out]">
            <div className="relative mx-auto w-24 h-24 flex items-center justify-center">
              <div className="absolute inset-0 border-t-2 border-red-500 rounded-full animate-spin"></div>
              <div className="absolute inset-0 border-2 border-red-500/20 rounded-full"></div>
              <Fingerprint size={40} className="text-red-500 animate-pulse" />
            </div>

            <div>
              <h3 className="text-xl font-orbitron font-bold text-white uppercase tracking-wider mb-1">
                {(targetRole === 'AI_SUPPORT') ? 'AI SUPPORT GUIDE' : (ROLE_NAMES[targetRole] || selectedAgent)}
              </h3>
              <p className="text-xs text-red-400 font-mono uppercase tracking-widest">
                {(targetRole === 'AI_SUPPORT') ? 'AI PROTOCOL SECURITY HASH' : 'ENTER ACCESS PASSCODE'}
              </p>
            </div>

            {/* Pin Display */}
            <div className="flex justify-center gap-4 my-6">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className={`w-3 h-3 rounded-full transition-colors duration-200 ${pin.length > i ? 'bg-red-500 shadow-[0_0_10px_#ef4444]' : 'bg-gray-800 border border-gray-700'}`}></div>
              ))}
            </div>

            {/* Keypad */}
            <div className="grid grid-cols-3 gap-3 max-w-[240px] mx-auto">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <button
                  key={num}
                  onClick={() => handlePinEntry(num.toString())}
                  className="h-14 bg-gray-900/50 border border-white/10 hover:bg-white/10 hover:border-white/30 rounded text-xl font-orbitron font-bold text-white transition-all active:scale-95"
                >
                  {num}
                </button>
              ))}
              <button onClick={() => { setPin(''); onBack(); }} className="h-14 flex items-center justify-center bg-gray-900/50 border border-white/10 text-gray-500 hover:text-white rounded transition-all active:scale-95">
                <X size={20} />
              </button>
              <button onClick={() => handlePinEntry('0')} className="h-14 bg-gray-900/50 border border-white/10 hover:bg-white/10 rounded text-xl font-orbitron font-bold text-white transition-all active:scale-95">
                0
              </button>
              <div className="h-14"></div>
            </div>
          </div>
        )}

        {/* VIEW 3: SUCCESS STATE */}
        {authStage === 'AUTHORIZED' && (
          <div className="flex flex-col items-center justify-center animate-[fadeIn_0.2s_ease-out]">
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center border border-green-500/50 shadow-[0_0_30px_rgba(34,197,94,0.3)] mb-6">
              <Terminal size={40} className="text-green-500" />
            </div>
            <h2 className="text-2xl font-orbitron font-black text-white tracking-widest">ACCESS GRANTED</h2>
            <p className="text-sm text-green-400 font-mono mt-2 flex items-center gap-2">
              <Activity size={14} className="animate-pulse" /> INITIALIZING DASHBOARD...
            </p>
          </div>
        )}

      </main>

      {/* Footer System Log */}
      <footer className="relative z-20 border-t border-white/5 bg-black/90 p-2">
        <div className="max-w-4xl mx-auto flex justify-between items-center text-[9px] font-mono text-gray-600">
          <span>SECURE CONNECTION: TLS 1.3</span>
          <span>LATENCY: 12ms</span>
          <span>NODE: US-CENTRAL1-A</span>
        </div>
      </footer>
    </div>
  );
};