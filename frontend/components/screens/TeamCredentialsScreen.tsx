import React, { useState } from 'react';
import { CyberButton, CyberCard, SectionHeader, CyberBadge } from '../ui/CyberComponents';
import { ArrowLeft, Key, Mail, ShieldAlert, Cpu, Gavel, Scale, Headset, ShieldCheck, BarChart2, Briefcase, Eye, EyeOff, Hash } from 'lucide-react';

interface Props {
    onBack: () => void;
}

export const TeamCredentialsScreen: React.FC<Props> = ({ onBack }) => {
    const [showAllPasswords, setShowAllPasswords] = useState(false);
    const [visibleIds, setVisibleIds] = useState<Record<string, boolean>>({});

    const toggleVisibility = (id: string) => {
        setVisibleIds(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    // The credentials list pulling from secure environment strings
    const credentials = [
        {
            id: 'GOD_MODE',
            name: 'Marilyn (Founder)',
            role: 'ROOT / GOD MODE',
            email: import.meta.env.VITE_GOD_MODE_EMAIL || 'HIDDEN',
            pin: import.meta.env.VITE_GOD_MODE_PIN || '••••',
            icon: ShieldAlert,
            color: '#ef4444' // Red
        },
        {
            id: 'ARCHY',
            name: 'CTO ARCHY',
            role: 'HEAD OF AI',
            email: import.meta.env.VITE_ARCHY_EMAIL || 'HIDDEN',
            pin: import.meta.env.VITE_ARCHY_PIN || '••••',
            icon: Cpu,
            color: '#39ff14' // Green
        },
        {
            id: 'FLOR',
            name: 'FLOR',
            role: 'COO & LEGAL',
            email: import.meta.env.VITE_FLOR_EMAIL || 'HIDDEN',
            pin: import.meta.env.VITE_FLOR_PIN || '••••',
            icon: Scale,
            color: '#eab308' // Yellow
        },
        {
            id: 'SIRENA',
            name: 'SIRENA',
            role: 'LIVE OPS',
            email: import.meta.env.VITE_SIRENA_EMAIL || 'HIDDEN',
            pin: import.meta.env.VITE_SIRENA_PIN || '••••',
            icon: Headset,
            color: '#00ffff' // Cyan
        },
        {
            id: 'HACKY',
            name: 'HACKY',
            role: 'CISO / SECURITY',
            email: import.meta.env.VITE_HACKY_EMAIL || 'HIDDEN',
            pin: import.meta.env.VITE_HACKY_PIN || '••••',
            icon: ShieldCheck,
            color: '#ef4444' // Red
        },
        {
            id: 'DATIN',
            name: 'DATIN',
            role: 'DATA & ADS',
            email: import.meta.env.VITE_DATIN_EMAIL || 'HIDDEN',
            pin: import.meta.env.VITE_DATIN_PIN || '••••',
            icon: BarChart2,
            color: '#10b981' // Emerald
        },
        {
            id: 'VIPPY',
            name: 'VIPPY',
            role: 'B2B & VIP',
            email: import.meta.env.VITE_VIPPY_EMAIL || 'HIDDEN',
            pin: import.meta.env.VITE_VIPPY_PIN || '••••',
            icon: Briefcase,
            color: '#f97316' // Orange
        },
        {
            id: 'ASSI',
            name: 'ASSI',
            role: 'ASSISTANT',
            email: import.meta.env.VITE_ASSI_EMAIL || 'HIDDEN',
            pin: import.meta.env.VITE_ASSI_PIN || '••••',
            icon: Key,
            color: '#a855f7' // Purple
        },
        {
            id: 'DESY',
            name: 'DESY',
            role: 'DESIGN',
            email: import.meta.env.VITE_DESY_EMAIL || 'HIDDEN',
            pin: import.meta.env.VITE_DESY_PIN || '••••',
            icon: Key,
            color: '#ec4899' // Pink
        }
    ];

    return (
        <div className="flex flex-col min-h-screen bg-black font-sans pb-20">
            {/* HEADER */}
            <div className="bg-[#0a0a0a] border-b border-white/10 p-4 sticky top-0 z-50 flex items-center justify-between">
                <button onClick={onBack} className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 text-white hover:bg-white/10 transition-colors">
                    <ArrowLeft size={20} />
                </button>
                <div className="text-center">
                    <h1 className="font-orbitron font-bold text-white tracking-widest leading-none">ROOT ACCESS</h1>
                    <span className="text-[10px] text-red-500 font-mono tracking-widest uppercase">TEAM CREDENTIALS DECRYPTED</span>
                </div>
                <div className="w-10"></div> {/* Spacer */}
            </div>

            <div className="p-4 space-y-6">
                <div className="flex items-center justify-between mb-2">
                    <SectionHeader title="RESTRICTED ROSTER" subtitle="Secure Terminal Logins" />
                    <button
                        onClick={() => setShowAllPasswords(!showAllPasswords)}
                        className="flex items-center gap-2 text-xs font-mono bg-gray-900 border border-gray-700 px-3 py-1.5 rounded-lg text-gray-300 hover:text-white transition-colors"
                    >
                        {showAllPasswords ? <EyeOff size={14} /> : <Eye size={14} />}
                        {showAllPasswords ? 'HIDE ALL' : 'REVEAL ALL'}
                    </button>
                </div>

                <div className="space-y-4">
                    {credentials.map((cred) => (
                        <CyberCard glow="none" key={cred.id} className="relative overflow-hidden group">
                            {/* Decorative background glow based on agent color */}
                            <div
                                className="absolute inset-0 opacity-[0.03] transition-opacity duration-300 group-hover:opacity-[0.08]"
                                style={{ background: `linear-gradient(135deg, ${cred.color} 0%, transparent 100%)` }}
                            ></div>

                            <div className="flex items-start justify-between relative z-10">
                                <div className="flex items-center gap-3 mb-4">
                                    <div
                                        className="w-10 h-10 rounded-xl border flex items-center justify-center shadow-lg"
                                        style={{
                                            borderColor: `${cred.color}50`,
                                            backgroundColor: `${cred.color}15`,
                                            boxShadow: `0 0 15px ${cred.color}20`
                                        }}
                                    >
                                        <cred.icon size={20} color={cred.color} />
                                    </div>
                                    <div>
                                        <h3 className="font-orbitron font-bold text-white tracking-widest" style={{ color: cred.id === 'GOD_MODE' ? '#ef4444' : 'white' }}>
                                            {cred.name}
                                        </h3>
                                        <p className="text-[10px] font-mono text-gray-400">{cred.role}</p>
                                    </div>
                                </div>
                                {cred.id === 'GOD_MODE' && <CyberBadge label="OMNI-PASS" color="#ef4444" />}
                            </div>

                            <div className="space-y-3 relative z-10 bg-black/40 p-3 rounded-lg border border-white/5">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2 text-gray-400">
                                        <Mail size={14} />
                                        <span className="text-xs font-mono uppercase">Gateway Email</span>
                                    </div>
                                    <span className="text-sm font-sans tracking-wide text-white bg-gray-900 px-2 py-1 rounded select-all">
                                        {cred.email}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2 text-gray-400">
                                        <Hash size={14} />
                                        <span className="text-xs font-mono uppercase">Terminal PIN</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => toggleVisibility(cred.id)}
                                            className="text-gray-500 hover:text-white transition-colors p-1"
                                        >
                                            {(showAllPasswords || visibleIds[cred.id]) ? <EyeOff size={14} /> : <Eye size={14} />}
                                        </button>
                                        <span className={`text-lg font-rajdhani font-bold px-3 py-1 bg-gray-900 rounded select-all ${cred.id === 'GOD_MODE' ? 'text-red-500 shadow-[0_0_10px_rgba(239,68,68,0.3)]' : 'text-cyber-green'}`}>
                                            {(showAllPasswords || visibleIds[cred.id]) ? cred.pin : '••••'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </CyberCard>
                    ))}
                </div>

                <div className="pt-6 border-t border-red-900/30 text-center">
                    <p className="text-xs text-red-500/80 font-mono tracking-widest uppercase">
                        WARNING: THIS CLASSIFIED DOCUMENT IS RESTRICTED TO ROOT.
                    </p>
                </div>
            </div>
        </div>
    );
};
