import React from 'react';
import { ShieldCheck, Star, Zap, Activity, Shield, ArrowRight, Clock, Trophy, Info, Lock, Eye, Share2 } from 'lucide-react';
import { User } from '../../types';

interface MeritViewProps {
    user: User;
}

export const MeritView: React.FC<MeritViewProps> = ({ user }) => {
    return (
        <div className="p-0 pb-24 space-y-6 animate-fade-in">
            <div className="relative bg-[#09090b] rounded-[30px] p-4 overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-cyber-green/10 to-transparent pointer-events-none"></div>
                <div className="absolute top-4 right-4 z-10">
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 border border-cyber-green/50 backdrop-blur-md">
                        <div className="w-1.5 h-1.5 rounded-full bg-cyber-green shadow-[0_0_5px_#39ff14]"></div>
                        <span className="text-[9px] font-orbitron font-bold text-cyber-green tracking-wider uppercase">CREDIT VISIBLE</span>
                    </div>
                </div>
                <div className="flex flex-col items-center mt-8 mb-8 relative z-10">
                    <div className="relative w-36 h-36 flex items-center justify-center">
                        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                            <defs>
                                <linearGradient id="greenGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor={user.scoreColor || "#39ff14"} />
                                    <stop offset="100%" stopColor={user.scoreColor || "#00cc00"} />
                                </linearGradient>
                            </defs>
                            <circle cx="50" cy="50" r="46" stroke="#1a1a1a" strokeWidth="3" fill="none" />
                            <circle
                                cx="50" cy="50" r="46"
                                stroke="url(#greenGradient)"
                                strokeWidth="3" fill="none"
                                strokeDasharray="289"
                                strokeDashoffset={289 - (289 * (user.meritScore || 100) / 300)}
                                strokeLinecap="round"
                                className="transition-all duration-1000 ease-out drop-shadow-[0_0_8px_rgba(57,255,20,0.5)]"
                            />
                        </svg>
                        <div className="relative w-28 h-28 rounded-full overflow-hidden border-2 border-black">
                            <img src={user.avatarUrl || `https://ui-avatars.com/api/?name=${user.username}`} alt="Profile" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 ring-inset ring-2 ring-black/20 rounded-full pointer-events-none"></div>
                        </div>
                        <div className="absolute -bottom-4 z-20 bg-black border border-white/20 px-5 py-1.5 rounded-lg flex flex-col items-center shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
                            <span className="text-xl font-rajdhani font-black text-white leading-none">{user.meritScore || 100}</span>
                            <span className="text-[7px] font-orbitron font-bold tracking-wider" style={{ color: user.scoreColor || '#39ff14' }}>MERIT SCORE</span>
                        </div>
                    </div>
                    <h2 className="text-2xl font-orbitron font-black text-white mt-6 tracking-wide drop-shadow-md">{user.username}</h2>
                    <p className="text-xs font-mono text-gray-400 uppercase tracking-widest mb-2">{user.role || 'FAN LEVEL 1'}</p>
                </div>
                <div className="space-y-4 px-2 mb-8 animate-slide-up">
                    <div className="flex justify-between items-center">
                        <h3 className="font-orbitron font-bold text-sm text-white tracking-widest uppercase">BEHAVIORAL COLLATERAL</h3>
                        <Info size={14} className="text-gray-500" />
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                        <div className="bg-[#121214] rounded-xl p-3 flex flex-col items-center justify-center border-b-[3px] border-cyber-green relative overflow-hidden h-24 shadow-lg">
                            <div className="absolute inset-0 bg-cyber-green/5"></div>
                            <Clock size={16} className="text-gray-400 mb-2 z-10" />
                            <span className="text-xl font-rajdhani font-black text-white z-10 leading-none">{user.behavioralStats?.consistency || 75}%</span>
                            <span className="text-[7px] font-mono text-gray-500 uppercase mt-1 z-10">CONSISTENCY</span>
                        </div>
                        <div className="bg-[#121214] rounded-xl p-3 flex flex-col items-center justify-center border-b-[3px] border-cyber-cyan relative overflow-hidden h-24 shadow-lg">
                            <div className="absolute inset-0 bg-cyber-cyan/5"></div>
                            <Trophy size={16} className="text-gray-400 mb-2 z-10" />
                            <span className="text-xl font-rajdhani font-black text-white z-10 leading-none">{user.behavioralStats?.complexity || 'MED'}</span>
                            <span className="text-[7px] font-mono text-gray-500 uppercase mt-1 z-10">COMPLEXITY</span>
                        </div>
                        <div className="bg-[#121214] rounded-xl p-3 flex flex-col items-center justify-center border-b-[3px] border-cyber-yellow relative overflow-hidden h-24 shadow-lg">
                            <div className="absolute inset-0 bg-cyber-yellow/5"></div>
                            <Zap size={16} className="text-gray-400 mb-2 z-10" />
                            <span className="text-xl font-rajdhani font-black text-white z-10 leading-none">TOP {100 - (user.behavioralStats?.velocity || 50)}%</span>
                            <span className="text-[7px] font-mono text-gray-500 uppercase mt-1 z-10">VELOCITY</span>
                        </div>
                    </div>
                    <div className="bg-[#121214] border border-white/10 rounded-xl p-4 shadow-lg">
                        <div className="flex items-start gap-3 mb-4">
                            <div className="p-2.5 bg-cyber-cyan/10 rounded-lg border border-cyber-cyan/30 shrink-0"><Lock size={20} className="text-cyber-cyan" /></div>
                            <div className="flex-1">
                                <div className="flex justify-between items-center mb-1">
                                    <h4 className="font-orbitron font-bold text-xs text-white uppercase tracking-wider">BANKING VISIBILITY</h4>
                                    <div className="flex items-center gap-2">
                                        <span className="text-[9px] font-bold text-red-500 uppercase tracking-wider">PRIVATE</span>
                                        <div className="w-8 h-4 bg-gray-800 rounded-full relative cursor-pointer border border-gray-600"><div className="w-3 h-3 bg-gray-500 rounded-full absolute top-0.5 left-0.5"></div></div>
                                    </div>
                                </div>
                                <p className="text-[10px] text-gray-400 leading-tight font-sans">Control who accesses your Behavioral Collateral.</p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <button className="flex-1 py-3 border border-gray-700 rounded-lg text-[10px] font-orbitron font-bold text-gray-300 flex items-center justify-center gap-2 hover:bg-white/5 hover:text-white transition-colors uppercase tracking-wider"><Eye size={14} /> PREVIEW</button>
                            <button className="flex-1 py-3 bg-cyber-cyan/10 border border-cyber-cyan/50 rounded-lg text-[10px] font-orbitron font-bold text-cyber-cyan flex items-center justify-center gap-2 hover:bg-cyber-cyan/20 transition-colors uppercase tracking-wider shadow-[0_0_10px_rgba(0,255,255,0.1)]"><Share2 size={14} /> GENERATE LINK</button>
                        </div>
                    </div>
                </div>
                <div className="space-y-5 mb-8 px-2">
                    <div className="flex justify-between items-end border-b border-white/5 pb-2">
                        <div className="flex items-center gap-2">
                            <Activity size={16} className="text-cyber-cyan" />
                            <h3 className="font-orbitron font-bold text-sm text-white tracking-widest">MERIT VECTORS</h3>
                        </div>
                        <span className="text-[8px] font-mono text-gray-500 uppercase">LMA ALIGNED</span>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between text-[10px] font-bold font-mono mb-1"><span className="text-gray-300 tracking-wider">CONSISTENCY (RELIABILITY)</span><span className="text-cyber-green">{user.behavioralStats?.consistency || 75}%</span></div>
                            <div className="h-1.5 w-full bg-gray-900 rounded-full overflow-hidden border border-white/5"><div className="h-full bg-cyber-green shadow-[0_0_10px_#39ff14] transition-all duration-1000" style={{ width: `${user.behavioralStats?.consistency || 75}%` }}></div></div>
                        </div>
                        <div>
                            <div className="flex justify-between text-[10px] font-bold font-mono mb-1"><span className="text-gray-300 tracking-wider">VELOCITY (SPEED)</span><span className="text-cyber-cyan">{user.behavioralStats?.velocity || 50}%</span></div>
                            <div className="h-1.5 w-full bg-gray-900 rounded-full overflow-hidden border border-white/5"><div className="h-full bg-cyber-cyan shadow-[0_0_10px_#00ffff] transition-all duration-1000" style={{ width: `${user.behavioralStats?.velocity || 50}%` }}></div></div>
                        </div>
                        <div>
                            <div className="flex justify-between text-[10px] font-bold font-mono mb-1"><span className="text-gray-300 tracking-wider">COMPLEXITY (SKILL)</span><span className="text-cyber-yellow">{user.behavioralStats?.complexity === 'HIGH' ? 95 : user.behavioralStats?.complexity === 'MED' ? 65 : 35}%</span></div>
                            <div className="h-1.5 w-full bg-gray-900 rounded-full overflow-hidden border border-white/5"><div className="h-full bg-cyber-yellow shadow-[0_0_10px_#ffee00] transition-all duration-1000" style={{ width: `${user.behavioralStats?.complexity === 'HIGH' ? 95 : user.behavioralStats?.complexity === 'MED' ? 65 : 35}%` }}></div></div>
                        </div>
                    </div>
                    <p className="text-[9px] text-gray-500 italic font-mono leading-tight mt-2">* This data serves as behavioral collateral for Sustainability Linked Loans (SLLP).</p>
                </div>
                <div className="space-y-4 mb-8 px-2">
                    <div className="flex items-center gap-2 mb-3">
                        <Shield size={16} className="text-cyber-yellow" />
                        <h3 className="font-orbitron font-bold text-sm text-white tracking-widest">FINANCIAL TRUST PROTOCOL</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-[#121214] border border-white/10 rounded-2xl p-4 flex flex-col items-center justify-center relative shadow-lg">
                            <span className="text-[9px] font-mono text-gray-400 uppercase mb-3 tracking-wider">LOAN READINESS</span>
                            <div className="relative w-20 h-20 flex items-center justify-center">
                                <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                                    <circle cx="50" cy="50" r="42" stroke="#27272a" strokeWidth="6" fill="none" />
                                    <circle
                                        cx="50" cy="50" r="42" stroke="#39ff14" strokeWidth="6" fill="none"
                                        strokeDasharray="264"
                                        strokeDashoffset={264 - (264 * (user.behavioralStats?.consistency || 75) / 100)}
                                        strokeLinecap="round" className="drop-shadow-[0_0_8px_#39ff14] transition-all duration-1000"
                                    />
                                </svg>
                                <span className="text-sm font-black font-rajdhani text-white z-10">{user.behavioralStats?.consistency || 75}%</span>
                            </div>
                        </div>
                        <div className="bg-[#121214] border border-white/10 rounded-2xl p-4 flex flex-col justify-center shadow-lg">
                            <span className="text-[9px] font-mono text-gray-400 uppercase mb-2 tracking-wider">EST. COLLATERAL</span>
                            <span className="text-3xl font-rajdhani font-black text-white tracking-tight">${user.behavioralStats?.collateral || 100}</span>
                            <span className="text-[9px] text-gray-600 mt-1 font-bold">Based on Merit</span>
                        </div>
                    </div>
                </div>
                <div className="space-y-5 px-2">
                    <div>
                        <h4 className="text-[10px] font-mono text-gray-500 uppercase mb-2 tracking-widest">ABOUT</h4>
                        <p className="text-xs text-gray-300 font-sans leading-relaxed border-l-2 border-white/20 pl-3">{user.about || 'No identification data available.'}</p>
                    </div>
                    <div>
                        <h4 className="text-[10px] font-mono text-gray-500 uppercase mb-3 tracking-widest">SKILLS & EQUIPMENT</h4>
                        <div className="flex flex-wrap gap-2">
                            {(user.skills || ['FAN LEVEL 1']).map(tag => (
                                <div key={tag} className="px-3 py-1.5 rounded-md bg-[#1a1a1a] border border-white/10 flex items-center justify-center">
                                    <span className="text-[9px] font-bold font-orbitron text-gray-300 uppercase tracking-wider">{tag}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="mt-8 pt-4 border-t border-white/5 flex items-end justify-between px-2">
                    <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">HOURLY RATE</span>
                    <div className="flex items-baseline gap-1"><span className="text-2xl font-rajdhani font-black text-white">{Math.ceil((user.meritScore || 100) / 10)} MC</span><span className="text-[10px] text-gray-500">/ hr</span></div>
                </div>
                <button className="w-full mt-5 bg-cyber-green hover:bg-white text-black font-orbitron font-black text-sm py-4 rounded-xl uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(57,255,20,0.3)] hover:shadow-[0_0_30px_rgba(57,255,20,0.5)] active:scale-95 group"><span>SELECT {user.username.split('_')[0].toUpperCase()}</span><ArrowRight size={18} strokeWidth={3} className="group-hover:translate-x-1 transition-transform" /></button>

            </div>
        </div>
    );
};