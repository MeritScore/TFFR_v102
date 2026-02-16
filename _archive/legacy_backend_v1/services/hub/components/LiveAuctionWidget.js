'use client';
import React, { useState, useEffect } from 'react';
import { Gavel, Shield } from 'lucide-react';

export default function LiveAuctionWidget({ auction }) {
    const [timeLeft, setTimeLeft] = useState(0);

    useEffect(() => {
        if (!auction?.end_time_epoch) return;

        const calculateTimeLeft = () => {
            const now = Date.now();
            const remaining = Math.max(0, auction.end_time_epoch - now);
            setTimeLeft(remaining);
        };

        calculateTimeLeft();
        const timer = setInterval(calculateTimeLeft, 1000);
        return () => clearInterval(timer);
    }, [auction?.end_time_epoch]);

    const formatTime = (ms) => {
        const totalSeconds = Math.floor(ms / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    if (!auction) return null;

    return (
        <div className="w-full glass-panel rounded-xl p-5 mb-6 shadow-[0_0_30px_rgba(57,255,20,0.15)]">

            {/* Header */}
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-cyber-red animate-ping"></div>
                    <div className="w-2 h-2 rounded-full bg-cyber-red absolute"></div>
                    <span className="text-cyber-green text-[10px] font-orbitron font-bold tracking-[0.2em] uppercase ml-3">
                        LIVE AUCTION
                    </span>
                </div>
                <div className="flex items-center gap-1 bg-cyber-green/10 px-2 py-1 rounded border border-cyber-green/30">
                    <Shield className="w-3 h-3 text-cyber-green" />
                    <span className="text-cyber-green text-[9px] font-mono uppercase">Escrow</span>
                </div>
            </div>

            {/* Item Name */}
            <div className="text-center mb-6">
                <h2 className="text-white text-lg font-orbitron font-bold tracking-wider mb-3 neon-glow-green">
                    {auction.item_name}
                </h2>

                {/* Countdown Timer */}
                <div className="relative inline-block">
                    <div className="text-6xl font-mono text-cyber-green font-bold tracking-tighter neon-glow-green">
                        {formatTime(timeLeft)}
                    </div>
                    <div className="absolute inset-0 bg-cyber-green/5 blur-xl -z-10"></div>
                </div>
            </div>

            {/* Bid Info */}
            <div className="grid grid-cols-2 gap-4 mb-5 px-2">
                <div className="text-center">
                    <div className="text-[9px] text-gray-500 uppercase tracking-widest font-orbitron mb-1">
                        Current Bid
                    </div>
                    <div className="text-2xl font-bold text-white font-mono">
                        {auction.current_bid} <span className="text-sm text-cyber-cyan">MC</span>
                    </div>
                </div>
                <div className="text-center">
                    <div className="text-[9px] text-gray-500 uppercase tracking-widest font-orbitron mb-1">
                        Closes In
                    </div>
                    <div className="text-2xl font-bold text-cyber-red font-mono">
                        {formatTime(timeLeft)}
                    </div>
                </div>
            </div>

            {/* Bid Button */}
            <button className="w-full bg-cyber-green hover:bg-cyber-cyan text-cyber-black font-orbitron font-bold text-sm py-4 px-6 rounded-lg tracking-[0.15em] uppercase transition-all duration-300 shadow-[0_0_25px_rgba(57,255,20,0.4)] hover:shadow-[0_0_35px_rgba(0,243,255,0.6)] flex items-center justify-center gap-3 group">
                <Gavel className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                <span>BID NOW (+10)</span>
            </button>

            {/* Footer Note */}
            <div className="text-center mt-3">
                <span className="text-[9px] text-gray-600 font-roboto">
                    Protected by 7-Day Escrow Verification
                </span>
            </div>
        </div>
    );
}
