'use client';
import React, { useState } from 'react';
import { Send, Smile, Wifi, WifiOff } from 'lucide-react';
import SafetyAlert from './SafetyAlert';
import LiveAuctionWidget from './LiveAuctionWidget';

export default function ChatInterface({ initializationData }) {
    const { user_profile, zone_context, live_auction } = initializationData || {};
    const [input, setInput] = useState('');
    const [isOnline, setIsOnline] = useState(true);

    // Mock messages for demonstration
    const messages = [
        {
            id: 1,
            user: 'HiveMind_01',
            type: 'system',
            content: 'Welcome to Sector 7. Keep hydration levels high.',
            time: 'NOW'
        },
        {
            id: 2,
            user: 'TraderJoe',
            type: 'user',
            content: 'Selling 2x VIP Passes for side stage. Verified Escrow only.',
            time: '2m ago'
        },
        {
            id: 3,
            user: 'NeonRider',
            type: 'user',
            content: 'Is the north gate open yet?',
            time: '5m ago'
        },
        {
            id: 4,
            user: user_profile?.username || 'You',
            type: 'self',
            content: 'READY FOR SUPER BOWL. Let\'s find some Intel.',
            time: '0s'
        },
    ];

    const handleSend = () => {
        if (input.trim()) {
            console.log('Sending:', input);
            setInput('');
        }
    };

    return (
        <div className="flex flex-col h-screen bg-cyber-black text-white overflow-hidden">

            {/* HEADER */}
            <header className="flex justify-between items-center p-4 border-b border-gray-800 bg-cyber-black/95 backdrop-blur-sm z-10 sticky top-0">
                <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                        {isOnline ? (
                            <>
                                <div className="w-2 h-2 rounded-full bg-cyber-green shadow-[0_0_8px_#39ff14] animate-pulse"></div>
                                <Wifi className="w-3 h-3 text-cyber-green" />
                                <span className="text-[10px] font-orbitron font-bold text-cyber-green tracking-widest uppercase">
                                    ONLINE
                                </span>
                            </>
                        ) : (
                            <>
                                <div className="w-2 h-2 rounded-full bg-cyber-yellow shadow-[0_0_8px_#ffee00] animate-pulse"></div>
                                <WifiOff className="w-3 h-3 text-cyber-yellow" />
                                <span className="text-[10px] font-orbitron font-bold text-cyber-yellow tracking-widest uppercase">
                                    SYNCING
                                </span>
                            </>
                        )}
                    </div>
                    <div className="text-xs font-roboto text-gray-400 mt-0.5">
                        {user_profile?.username || 'Agent'}
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    {user_profile?.role === 'VIP' ? (
                        <div className="px-3 py-1.5 rounded-md border border-cyber-yellow bg-cyber-yellow/10">
                            <span className="text-[10px] font-orbitron font-bold tracking-widest text-cyber-yellow uppercase neon-glow-green">
                                VIP ACCESS
                            </span>
                        </div>
                    ) : (
                        <div className="px-3 py-1.5 rounded-md border border-cyber-cyan bg-cyber-cyan/10">
                            <span className="text-[10px] font-orbitron font-bold tracking-widest text-cyber-cyan uppercase">
                                FAN
                            </span>
                        </div>
                    )}
                </div>
            </header>

            {/* FEED (SCROLLABLE) */}
            <main className="flex-1 overflow-y-auto p-4 pb-32 scrollbar-thin scrollbar-thumb-cyber-green/20 scrollbar-track-transparent">

                {/* SAFETY ALERT */}
                {zone_context?.safety_alert && (
                    <SafetyAlert alert={zone_context.safety_alert} />
                )}

                {/* TITLE */}
                <h1 className="text-2xl font-orbitron font-bold mb-1 bg-gradient-to-r from-white via-gray-300 to-gray-600 bg-clip-text text-transparent">
                    THE FUN FAN <span className="text-cyber-green neon-glow-green">REPORTER</span>
                </h1>
                <div className="flex items-center gap-2 mb-6 pb-2 border-b border-cyber-cyan/30 w-fit">
                    <div className="text-[10px] text-cyber-cyan tracking-[0.2em] font-orbitron uppercase">
                        HIVE FEED
                    </div>
                    <div className="w-1 h-1 rounded-full bg-cyber-cyan animate-pulse"></div>
                </div>

                {/* LIVE AUCTION WIDGET */}
                {live_auction && <LiveAuctionWidget auction={live_auction} />}

                {/* MESSAGES */}
                <div className="space-y-4">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`flex flex-col ${msg.type === 'self' ? 'items-end' : 'items-start'}`}
                        >

                            {msg.type !== 'self' && (
                                <div className={`text-[10px] font-bold mb-1 flex items-center gap-2 ${msg.type === 'system' ? 'text-cyber-cyan' : 'text-cyber-green'
                                    }`}>
                                    <span className="font-orbitron">@{msg.user}</span>
                                    <span className="text-gray-600 font-roboto font-normal text-[9px]">{msg.time}</span>
                                </div>
                            )}

                            <div className={`max-w-[85%] p-3 rounded-xl text-sm leading-relaxed ${msg.type === 'self'
                                    ? 'bg-cyber-green/10 border border-cyber-green text-white rounded-br-none shadow-[0_0_10px_rgba(57,255,20,0.1)]'
                                    : msg.type === 'system'
                                        ? 'bg-gray-900/80 border border-gray-700 text-gray-300 backdrop-blur-sm'
                                        : 'bg-gray-800/80 border border-gray-700 text-gray-200 rounded-bl-none backdrop-blur-sm'
                                }`}>
                                <p className="font-roboto">{msg.content}</p>
                            </div>

                            {msg.type === 'self' && (
                                <div className="text-[9px] text-cyber-green mt-1 flex items-center gap-1 font-orbitron">
                                    <span>YOU</span>
                                    <div className="w-1 h-1 rounded-full bg-cyber-green"></div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </main>

            {/* FOOTER INPUT (FIXED) */}
            <div className="fixed bottom-0 left-0 right-0 p-4 glass-panel border-t border-gray-800 pb-safe">
                <div className="relative max-w-3xl mx-auto">
                    <input
                        type="text"
                        placeholder="Type your message..."
                        className="w-full bg-gray-900/90 border border-gray-700 rounded-full py-4 pl-12 pr-14 text-sm text-white focus:outline-none focus:border-cyber-green focus:shadow-[0_0_15px_rgba(57,255,20,0.2)] transition-all placeholder-gray-500 font-roboto"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    />
                    <button className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-cyber-green transition-colors">
                        <Smile size={20} />
                    </button>
                    <button
                        onClick={handleSend}
                        className="absolute right-3 top-1/2 -translate-y-1/2 bg-cyber-green/10 hover:bg-cyber-green/20 p-2.5 rounded-full transition-all text-cyber-green border border-cyber-green/30 hover:border-cyber-green/60 hover:shadow-[0_0_15px_rgba(57,255,20,0.3)]"
                    >
                        <Send size={18} />
                    </button>
                </div>
            </div>

        </div>
    );
}
