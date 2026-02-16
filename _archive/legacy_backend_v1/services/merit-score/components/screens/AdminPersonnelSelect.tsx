import React from 'react';
import { 
  Lock, EyeOff, Fingerprint, Cpu, DollarSign, Building, 
  Megaphone, User, Shield, Briefcase, Bot, X, HelpCircle
} from 'lucide-react';

interface Props {
  onSelectPersonnel: (id: string) => void;
  onBack: () => void;
}

const PersonnelCard = ({ 
  icon: Icon, 
  title, 
  subtitle, 
  status, 
  onClick, 
  isLocked = false 
}: { 
  icon: any, 
  title: string, 
  subtitle: string, 
  status: string, 
  onClick?: () => void, 
  isLocked?: boolean
}) => (
  <button 
    onClick={onClick}
    disabled={isLocked}
    className={`
      relative w-full text-left p-3 rounded-xl border transition-all duration-300 group overflow-hidden
      ${isLocked 
          ? 'bg-gray-900/40 border-gray-800 opacity-60 cursor-not-allowed' 
          : 'bg-gray-900/60 border-gray-700 hover:border-cyber-green hover:bg-cyber-green/10 hover:shadow-[0_0_15px_rgba(57,255,20,0.2)]'}
    `}
  >
    <div className="relative z-10 flex flex-col h-full justify-between gap-3">
      <div className="flex justify-between items-start">
        <div className={`p-2 rounded-lg transition-colors duration-300 ${isLocked ? 'bg-gray-800 text-gray-600' : 'bg-black text-white border border-white/20 group-hover:bg-cyber-green group-hover:text-black group-hover:border-transparent'}`}>
          <Icon size={18} />
        </div>
        {isLocked ? <Lock size={12} className="text-gray-600" /> : <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_5px_#22c55e] group-hover:bg-cyber-green group-hover:shadow-[0_0_8px_#39ff14]"></div>}
      </div>
      
      <div>
        <h4 className={`font-orbitron font-bold text-[10px] tracking-wider uppercase mb-1 transition-colors ${isLocked ? 'text-gray-500' : 'text-gray-200 group-hover:text-white'}`}>
          {title}
        </h4>
        <p className={`font-mono text-[9px] uppercase leading-tight transition-colors ${isLocked ? 'text-gray-600' : 'text-gray-500 group-hover:text-cyber-green'}`}>
          {subtitle}
        </p>
      </div>

      <div className={`text-[8px] font-mono uppercase tracking-widest transition-colors ${isLocked ? 'text-gray-600' : 'text-gray-400 group-hover:text-cyber-green'}`}>
        {status}
      </div>
    </div>
  </button>
);

export const AdminPersonnelSelect: React.FC<Props> = ({ onSelectPersonnel, onBack }) => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col relative overflow-hidden font-sans">
      
      {/* Background Grid & Effects */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(20,20,20,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(20,20,20,0.5)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none opacity-50"></div>
      
      {/* Red Header Strip */}
      <div className="w-full h-1 bg-gradient-to-r from-red-900 via-red-600 to-red-900 shadow-[0_0_15px_#dc2626] relative z-20"></div>

      {/* Header */}
      <header className="relative z-20 flex items-center justify-between px-4 py-4 bg-black/90 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <Lock size={14} className="text-red-500 animate-pulse" />
          <span className="font-orbitron font-bold text-xs tracking-[0.2em] text-red-500">SECURE ACCESS TERMINAL</span>
        </div>
        <button onClick={onBack}>
           <X size={18} className="text-gray-500 hover:text-white transition-colors" />
        </button>
      </header>

      <main className="flex-1 relative z-10 px-4 py-2 overflow-y-auto no-scrollbar">
        
        {/* Authentication Visual */}
        <div className="flex flex-col items-center justify-center py-6 mb-2">
           <div className="relative w-16 h-16 flex items-center justify-center mb-4">
              <div className="absolute inset-0 border-2 border-red-500/20 rounded-full"></div>
              <div className="absolute inset-0 border-t-2 border-red-500 rounded-full animate-spin"></div>
              <Fingerprint size={32} className="text-red-500/80" />
           </div>
           <h2 className="text-lg font-orbitron font-black text-white uppercase tracking-widest">IDENTIFY PERSONNEL</h2>
           <p className="text-[10px] text-gray-500 font-mono tracking-wide">SELECT YOUR PROFILE TO AUTHENTICATE</p>
        </div>

        {/* Personnel Grid - Alternating Human (Left) / AI (Right) */}
        <div className="grid grid-cols-2 gap-3 pb-8">
           
           {/* ROW 1 */}
           <PersonnelCard 
             icon={EyeOff}
             title="Marilyn God Mode"
             subtitle="ROOT ACCESS"
             status="GATEWAY READY"
             onClick={() => onSelectPersonnel('GOD_MODE')}
           />
           <PersonnelCard 
             icon={Cpu}
             title="CTO Archy (GEMINI 3)"
             subtitle="HEAD OF AI"
             status="ONLINE"
             onClick={() => onSelectPersonnel('ARCHY')}
           />

           {/* ROW 2 */}
           <PersonnelCard 
             icon={DollarSign}
             title="Event Sponsor(s)"
             subtitle="FINANCIER"
             status="GATEWAY READY"
             onClick={() => onSelectPersonnel('SPONSOR')}
           />
           <PersonnelCard 
             icon={Shield}
             title="AI Moderator (HACKY)"
             subtitle="SECURITY"
             status="GATEWAY READY"
             onClick={() => onSelectPersonnel('HACKY')} 
           />
           
           {/* ROW 3 */}
           <PersonnelCard 
             icon={Building}
             title="Venue Owner"
             subtitle="PROPERTY BOSS"
             status="GATEWAY READY"
             onClick={() => onSelectPersonnel('OWNER')}
           />
           <PersonnelCard 
             icon={Bot}
             title="AI Broker (DATIN)"
             subtitle="GIG ECONOMY"
             status="GATEWAY READY"
             onClick={() => onSelectPersonnel('DATIN')}
           />

           {/* ROW 4 */}
           <PersonnelCard 
             icon={Briefcase}
             title="Venue Manager"
             subtitle="LOGISTICS"
             status="GATEWAY READY"
             onClick={() => onSelectPersonnel('MANAGER')}
           />
           <PersonnelCard 
             icon={Bot}
             title="AI Manager (SIRENA)"
             subtitle="COMMUNITY"
             status="GATEWAY READY"
             onClick={() => onSelectPersonnel('SIRENA')}
           />

           {/* ROW 5 */}
           <PersonnelCard 
             icon={Megaphone}
             title="Venue Promoter"
             subtitle="MARKETING/HYPE"
             status="GATEWAY READY"
             onClick={() => onSelectPersonnel('PROMOTER')}
           />
           <PersonnelCard 
             icon={Bot}
             title="VIP AI Agent (VIPY)"
             subtitle="CONCIERGE"
             status="GATEWAY READY"
             onClick={() => onSelectPersonnel('VIPY')}
           />

           {/* ROW 6 */}
           <PersonnelCard 
             icon={User}
             title="Executive Asst."
             subtitle="HUMAN NANNY"
             status="GATEWAY READY"
             onClick={() => onSelectPersonnel('ASSI')}
           />
           <PersonnelCard 
             icon={HelpCircle}
             title="AI Support (GUIDE)"
             subtitle="TEAM PORTAL"
             status="GATEWAY READY"
             onClick={() => onSelectPersonnel('AI_SUPPORT')}
           />

        </div>

        <div className="text-center pb-8">
           <p className="text-[9px] text-gray-700 font-mono">
              PROJECT BLUEPRINT V4.0 | LIQUID STATE PROTOCOL
           </p>
        </div>

      </main>
    </div>
  );
};