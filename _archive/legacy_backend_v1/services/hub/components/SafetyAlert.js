'use client';
import React from 'react';
import { AlertTriangle } from 'lucide-react';

export default function SafetyAlert({ alert }) {
    if (!alert) return null;

    return (
        <div className="w-full bg-gradient-to-r from-cyber-red/30 via-cyber-red/10 to-transparent border border-cyber-red rounded-lg p-4 mb-4 animate-pulse-slow">
            <div className="flex items-center gap-3">
                <div className="flex-shrink-0">
                    <AlertTriangle className="text-cyber-red w-6 h-6 animate-pulse" />
                </div>
                <div className="flex-1">
                    <h3 className="font-orbitron text-cyber-red text-xs font-bold tracking-widest uppercase neon-glow-red">
                        ⚠ HIVE MIND SAFETY ALERT
                    </h3>
                    <p className="text-gray-300 text-xs mt-1 font-roboto">
                        {alert.message || "High congestion reported. Stay alert."}
                    </p>
                </div>
            </div>
        </div>
    );
}
