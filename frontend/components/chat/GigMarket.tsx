import React from 'react';
import { X } from 'lucide-react';
export const GigMarket = ({ isOpen, onClose }: any) => {
    if(!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
             <div className="bg-gray-900 border border-cyber-yellow w-full max-w-sm rounded-lg p-6 relative">
                <button onClick={onClose} className="absolute top-2 right-2 text-gray-400"><X/></button>
                <h2 className="text-xl text-cyber-yellow font-bold mb-4">Gig Market</h2>
                <p className="text-gray-400">Marketplace placeholder content.</p>
             </div>
        </div>
    );
}