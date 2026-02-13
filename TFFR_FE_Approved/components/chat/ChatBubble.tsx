import React, { useState } from 'react';
import { Message, MessageType, User } from '../../types';
import { Shield, Zap, Ticket, Coins, Layers, Pause, Play, Smile, Flag, Briefcase, Gavel, MessageSquare, Link, MapPin, Clock } from 'lucide-react';

interface ChatBubbleProps {
    message: Message;
    isOwn: boolean;
    onTogglePause?: () => void;
    onInteraction?: () => void;
    onOpenThread?: (message: Message) => void;
    onReserve?: (message: Message) => void;
    onClaim?: (message: Message) => void;
    onViewProfile?: (user: User) => void;
    isPaused?: boolean;
    hideActions?: boolean;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({ message, isOwn, onTogglePause, onInteraction, onOpenThread, onReserve, onClaim, onViewProfile, isPaused, hideActions = false }) => {
    const [showReactions, setShowReactions] = useState(false);
    const [selectedReaction, setSelectedReaction] = useState<string | null>(null);
    const isSystem = message.type === MessageType.SYSTEM;
    const isAlert = message.type === MessageType.ALERT;
    const isGig = message.type === MessageType.GIG_OFFER;
    const isLottery = message.type === MessageType.SOCIAL_LOTTERY;
    const isSpotRelease = message.type === MessageType.SPOT_RELEASE;
    const isFlashPromo = message.type === MessageType.FLASH_PROMO;
    const repeatCount = message.repeatCount || 1;
    const isHiveMind = repeatCount > 1;
    const REACTIONS = [{ label: 'Like', icon: '👍' }, { label: 'Love', icon: '❤️' }, { label: 'Care', icon: '🥰' }, { label: 'Haha', icon: '😆' }, { label: 'Wow', icon: '😮' }, { label: 'Sad', icon: '😢' }, { label: 'Angry', icon: '😡' }];
    const handleAction = (callback?: () => void) => { if (onInteraction) onInteraction(); if (callback) callback(); };

    if (isSystem) { return (<div className="w-full flex justify-center my-4 opacity-90"><div className="bg-cyber-gray/90 backdrop-blur border border-cyber-yellow/40 text-cyber-yellow px-4 py-2 text-xs font-mono rounded-lg flex items-center gap-2 shadow-lg"><Zap size={12} fill="currentColor" />{message.text}</div></div>); }

    if (isLottery) { return (<div className="w-full flex justify-center my-6"><div className="bg-cyber-dark/95 backdrop-blur border-2 border-cyber-green shadow-neon-green p-5 w-[95%] rounded-xl text-center relative overflow-hidden"><div className="absolute top-0 left-0 w-full h-1 bg-cyber-green animate-pulse"></div><div className="flex flex-col items-center gap-3"><Ticket className="text-cyber-green w-10 h-10" /><h3 className="font-display text-cyber-green text-xl font-bold tracking-wider">SOCIAL LOTTERY</h3><p className="text-white text-base font-sans mb-2">{message.text}</p><button onClick={() => handleAction()} className="bg-cyber-green text-black font-black text-sm px-8 py-3 rounded uppercase hover:bg-white transition-colors transform hover:scale-105">ENTER NOW</button><div className="text-cyber-green/80 text-xs mt-2 font-mono">PARTICIPANTS: {message.metadata?.participants?.toLocaleString()}</div></div></div></div>); }

    if (isFlashPromo) {
        return (
            <div className="w-full flex justify-center my-6 animate-fade-in px-2">
                <div className="w-full max-w-sm bg-black border border-cyber-cyan rounded-xl overflow-hidden shadow-[0_0_15px_rgba(0,255,255,0.15)] transform transition-transform hover:scale-[1.01] relative group">
                    {/* Background Accent */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-cyber-cyan/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                    <Zap className="absolute top-2 right-2 text-cyber-cyan/10 rotate-12 w-24 h-24 pointer-events-none" strokeWidth={1} />

                    {/* Header */}
                    <div className="bg-[#051111] border-b border-cyber-cyan/30 p-3 flex justify-between items-center relative z-10">
                        <div className="flex items-center gap-2 text-cyber-cyan">
                            <Zap size={18} fill="currentColor" strokeWidth={0} />
                            <span className="font-orbitron font-black italic tracking-wider text-xs sm:text-sm">FLASH PROMO</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-cyan opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyber-cyan"></span>
                            </span>
                            <span className="text-[10px] font-mono font-bold text-cyber-cyan uppercase tracking-wider">LIVE NOW</span>
                        </div>
                    </div>

                    {/* Body */}
                    <div className="p-5 space-y-4 relative z-10">
                        <div>
                            <h3 className="text-2xl font-black italic text-white mb-2 font-sans tracking-tight uppercase leading-none">{message.metadata?.gigTitle || 'PROMO'}</h3>
                            <div className="pl-3 border-l-2 border-cyber-cyan">
                                <p className="text-xs font-mono text-gray-300">Target: <span className="text-white">{message.metadata?.target || 'All Users'}</span></p>
                            </div>
                        </div>

                        <div className="text-[10px] text-gray-500 font-mono font-bold uppercase tracking-widest">
                            VALID FOR THE NEXT 30 MINUTES
                        </div>

                        <div className="flex gap-3">
                            {/* Button */}
                            <button
                                onClick={() => handleAction(() => onClaim && onClaim(message))}
                                className="flex-1 bg-cyber-cyan hover:bg-cyan-400 text-black font-black font-orbitron text-base py-3.5 rounded shadow-[0_0_20px_rgba(0,255,255,0.3)] transition-all active:scale-95 uppercase tracking-wide hover:shadow-[0_0_30px_rgba(0,255,255,0.5)]"
                            >
                                CLAIM NOW
                            </button>
                            {/* Timer */}
                            <div className="bg-[#0a1a1a] border border-cyber-cyan/30 rounded px-4 flex items-center justify-center min-w-[80px]">
                                <span className="text-cyber-cyan font-mono font-bold text-lg">{message.metadata?.timeLeft || '30:00'}</span>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="pt-3 border-t border-white/10 flex items-start gap-2 text-[10px] font-mono text-gray-500">
                            <MapPin size={12} />
                            <span>VENUE: <span className="text-white font-bold">{message.metadata?.venue || 'Unknown'}</span></span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (isSpotRelease) {
        return (
            <div className="w-full flex justify-center my-6 animate-fade-in px-2">
                <div className="w-full max-w-sm bg-black border border-cyber-yellow rounded-xl overflow-hidden shadow-[0_0_15px_rgba(255,238,0,0.15)] transform transition-transform hover:scale-[1.01]">
                    {/* Header */}
                    <div className="bg-cyber-yellow/10 border-b border-cyber-yellow/30 p-3 flex justify-between items-center">
                        <div className="flex items-center gap-2 text-cyber-yellow">
                            <Ticket size={18} fill="currentColor" strokeWidth={1.5} />
                            <span className="font-orbitron font-black italic tracking-wider text-xs sm:text-sm">MERITOCRACY SPOT RELEASE</span>
                        </div>
                        <div className="bg-cyber-yellow text-black text-[10px] font-bold px-1.5 py-0.5 rounded shadow-[0_0_5px_rgba(255,238,0,0.8)]">{message.metadata?.timeLeft || '15m'}</div>
                    </div>

                    {/* Body */}
                    <div className="p-5 space-y-5">
                        <div>
                            <h3 className="text-xl font-bold text-white mb-2 font-sans tracking-tight">Skip the line!</h3>
                            <p className="text-sm font-mono text-gray-400 leading-relaxed">{message.text}</p>
                        </div>

                        {/* Status Bar */}
                        <div className="bg-[#0f1219] rounded px-4 py-3 flex justify-between items-center border-l-2 border-cyber-yellow/50 shadow-inner">
                            <span className="text-gray-500 text-[10px] font-bold uppercase tracking-wider">STATUS</span>
                            <span className="text-cyber-yellow text-sm font-black tracking-[0.2em] shadow-cyber-yellow/10 drop-shadow-[0_0_2px_rgba(255,238,0,0.5)]">{">>>"} STANDBY</span>
                        </div>

                        {/* Button */}
                        <button
                            onClick={() => handleAction(() => onReserve && onReserve(message))}
                            className="w-full bg-cyber-yellow hover:bg-yellow-400 text-black font-black font-orbitron text-base py-3.5 rounded shadow-[0_0_20px_rgba(255,238,0,0.4)] transition-all active:scale-95 uppercase tracking-wide hover:shadow-[0_0_30px_rgba(255,238,0,0.6)]"
                        >
                            RESERVE NOW
                        </button>

                        {/* Footer */}
                        <div className="pt-3 border-t border-white/10 flex items-start gap-8 text-[10px] font-mono text-gray-500">
                            <div className="flex flex-col gap-1">
                                <span className="text-gray-600 flex items-center gap-1.5"><MapPin size={10} /> VENUE:</span>
                                <span className="text-white font-bold tracking-wide">{message.metadata?.venue || 'Unknown'}</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-gray-600">Location:</span>
                                <span className="text-gray-400">{message.metadata?.location || 'Unknown'}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const user = message.sender as User;
    let cardStyles = "bg-[#27272a] border-l-4 border-cyber-cyan/50"; let textColor = "text-gray-200";
    if (isOwn) { cardStyles = "bg-[#142918] border-r-4 border-cyber-green/50"; } else if (isGig) { cardStyles = "bg-[#292415] border-l-4 border-cyber-yellow"; } else if (isAlert) { cardStyles = "bg-[#291515] border-l-4 border-red-500"; } else if (message.topicTag) { cardStyles = "bg-[#241529] border-l-4 border-purple-500"; }
    if (isHiveMind) { cardStyles += " shadow-neon-green border-2 border-cyber-green"; }

    const paymentColor = (message.metadata?.amount || 0) >= 300 ? 'text-cyber-yellow' : 'text-cyber-cyan';

    return (
        <div className={`flex w-full ${isOwn ? 'justify-end' : 'justify-start'}`}>
            <div className={`relative w-[98%] ${cardStyles} p-3 md:p-4 rounded-xl shadow-lg backdrop-blur-sm transition-all duration-300`}>
                <div className={`flex items-center gap-3 mb-2 pb-2 border-b border-white/10 ${isOwn ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div
                        className="relative cursor-pointer group/avatar active:scale-95 transition-transform"
                        onClick={() => onViewProfile && onViewProfile(user)}
                    >
                        {isHiveMind ? (<div className="w-8 h-8 rounded-full bg-cyber-green flex items-center justify-center text-black shadow-neon-green"><Layers size={16} /></div>) : (<img src={user.avatarUrl || `https://ui-avatars.com/api/?name=${user.username}`} alt={user.username} className={`w-8 h-8 rounded-full border-2 transition-all ${isGig ? 'border-cyber-yellow group-hover/avatar:border-white' : isOwn ? 'border-cyber-green group-hover/avatar:border-white' : 'border-gray-500 group-hover/avatar:border-cyber-cyan'}`} />)}
                        {!isOwn && !isHiveMind && (
                            <div
                                className="absolute -bottom-1 -right-1 bg-black text-[8px] px-1 rounded-full border border-gray-600 font-mono font-bold"
                                style={{ color: user.scoreColor || '#e5e7eb' }}
                            >
                                {user.meritScore || 100}
                            </div>
                        )}
                    </div>
                    <div
                        className={`flex flex-col ${isOwn ? 'items-end' : 'items-start'} cursor-pointer group/name active:opacity-70 transition-opacity`}
                        onClick={() => onViewProfile && onViewProfile(user)}
                    >
                        <div className="flex items-center gap-1.5"><span className={`text-sm font-bold font-display transition-colors ${isOwn ? 'text-cyber-green group-hover/name:text-white' : 'text-cyber-cyan group-hover/name:text-white'}`}>{user.username}</span>{user.isVerified && <Shield size={10} className="text-cyber-yellow fill-cyber-yellow" />}{isHiveMind && <span className="text-[10px] bg-cyber-green text-black px-1.5 rounded font-bold">x{repeatCount}</span>}</div>
                        <span className="text-[10px] text-gray-400 font-mono uppercase">{message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    <div className="flex-1"></div>
                    {(isGig || message.topicTag || isAlert) && (<div className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${isGig ? 'bg-cyber-yellow/20 text-cyber-yellow' : isAlert ? 'bg-red-500/20 text-red-500' : 'bg-purple-500/20 text-purple-400'}`}>{isGig && "GIG OFFER"}{isAlert && "INTEL"}{message.topicTag && `#${message.topicTag}`}</div>)}
                </div>

                <div className={`text-sm md:text-base leading-relaxed ${textColor} ${isOwn ? 'text-right' : 'text-left'}`}>
                    {isGig && (
                        <div className={`mb-1 font-bold text-xs flex items-center gap-1 justify-end ${paymentColor}`}>
                            PAYMENT: {message.metadata?.amount} MC <Link size={12} />
                        </div>
                    )}
                    <p>{message.text}</p>
                </div>

                {selectedReaction && (<div className={`absolute -bottom-2 ${isOwn ? 'left-4' : 'right-4'} bg-gray-700 border border-gray-500 rounded-full w-6 h-6 flex items-center justify-center text-xs shadow-lg text-white`}>{selectedReaction}</div>)}

                {!isOwn && !isHiveMind && !hideActions && (
                    <div className="mt-3 pt-2 border-t border-white/10">
                        <div className="flex flex-wrap items-center gap-2 justify-between">
                            <div className="flex flex-wrap gap-1">
                                <button onClick={() => handleAction()} className="flex items-center gap-1 bg-cyber-green text-black px-2 py-1.5 rounded text-[10px] font-black uppercase hover:bg-white transition-all shadow-lg hover:shadow-neon-green active:scale-95"><Coins size={12} strokeWidth={3} />TIP</button>
                                <button onClick={() => handleAction(() => onOpenThread && onOpenThread(message))} className={`flex items-center gap-1 border border-purple-500 text-purple-400 px-2 py-1.5 rounded text-[10px] font-bold uppercase hover:bg-purple-500/20 transition-all active:scale-95 ${message.replies && message.replies.length > 0 ? 'bg-purple-500/10' : ''}`}><MessageSquare size={12} />COMMENT{message.replies && message.replies.length > 0 && (<span className="ml-0.5 bg-purple-500 text-black px-1 rounded-full text-[9px]">{message.replies.length}</span>)}</button>
                                {isGig && (<><button onClick={() => handleAction()} className="flex items-center gap-1 border border-cyber-yellow text-cyber-yellow px-2 py-1.5 rounded text-[10px] font-bold uppercase hover:bg-cyber-yellow/20 transition-all active:scale-95"><Gavel size={12} />BID</button><button onClick={() => handleAction()} className="flex items-center gap-1 bg-cyber-yellow text-black px-2 py-1.5 rounded text-[10px] font-bold uppercase hover:bg-white transition-all active:scale-95"><Briefcase size={12} />ACCEPT</button></>)}
                            </div>
                            <div className="flex items-center gap-3 ml-auto">
                                <div className="relative">
                                    <button onClick={() => handleAction(() => setShowReactions(!showReactions))} className="text-gray-400 hover:text-white transition-colors p-1"><Smile size={18} /></button>
                                    {showReactions && (<div className="absolute bottom-full right-0 mb-2 bg-white rounded-full p-2 flex gap-1 shadow-2xl z-50 animate-scale-in origin-bottom-right min-w-[200px]">{REACTIONS.map((r) => (<button key={r.label} onClick={() => handleAction(() => { setSelectedReaction(r.icon); setShowReactions(false); })} className="text-2xl hover:scale-125 transition-transform">{r.icon}</button>))}</div>)}
                                </div>
                                <button onClick={onTogglePause} className={`flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded transition-colors whitespace-nowrap ${isPaused ? 'text-cyber-cyan border border-cyber-cyan animate-pulse' : 'text-gray-300 hover:text-white'}`}>{isPaused ? <Play size={10} /> : <Pause size={10} />}{isPaused ? "UNPAUSE" : "PAUSE TO READ"}</button>
                                <div className="flex gap-2"><button onClick={() => handleAction()} className="text-gray-400 hover:text-red-500 transition-colors p-1" title="Report"><Flag size={14} /></button></div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};