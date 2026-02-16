import React, { useState, useEffect, useRef } from 'react';
import { X, Send, CornerDownRight, MessageSquare } from 'lucide-react';
import { Message, User } from '../../types';

interface ThreadViewProps {
  parentMessage: Message;
  replies: Message[];
  currentUser: User;
  onClose: () => void;
  onSendReply: (text: string) => void;
}

export const ThreadView: React.FC<ThreadViewProps> = ({ parentMessage, replies, currentUser, onClose, onSendReply }) => {
    const [text, setText] = useState('');
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [replies]);

    const senderName = typeof parentMessage.sender !== 'string' ? parentMessage.sender.username : 'SYSTEM';

    return (
        <div className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-md flex items-end sm:items-center justify-center sm:p-4 animate-fade-in">
            {/* Thread Container */}
            <div className="w-full sm:max-w-md bg-[#0a0a0a] border-t sm:border border-white/20 sm:rounded-2xl shadow-2xl flex flex-col h-[85vh] sm:h-[80vh] relative overflow-hidden animate-slide-up">
                
                {/* Neon Top Line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyber-green via-cyber-cyan to-cyber-purple shadow-[0_0_10px_rgba(0,255,255,0.5)]"></div>
                
                {/* Header */}
                <div className="flex justify-between items-center p-4 border-b border-white/10 bg-[#0f0f0f] relative z-10">
                    <div>
                        <h3 className="text-white font-orbitron font-bold tracking-widest flex items-center gap-2 text-lg">
                             <CornerDownRight size={20} className="text-cyber-cyan" />
                             THREAD
                        </h3>
                        <p className="text-[10px] text-gray-500 font-mono uppercase tracking-wider">REPLYING TO {senderName}</p>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full active:scale-95">
                        <X size={24} />
                    </button>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 custom-scrollbar bg-black/40 space-y-6">
                    
                    {/* Parent Message (Context) */}
                    <div className="bg-[#151515] p-4 rounded-xl border-l-[3px] border-cyber-cyan/60 relative shadow-lg">
                        <div className="flex items-center justify-between mb-2">
                             <div className="flex items-center gap-2">
                                <MessageSquare size={14} className="text-cyber-cyan" />
                                <span className="text-xs font-bold text-cyber-cyan font-orbitron tracking-wide">
                                    {senderName}
                                </span>
                             </div>
                             <span className="text-[10px] text-gray-500 font-mono">
                                {parentMessage.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                             </span>
                        </div>
                        <p className="text-sm text-gray-200 leading-relaxed font-sans">{parentMessage.text}</p>
                    </div>

                    {/* Divider */}
                    <div className="flex items-center gap-3 opacity-60">
                        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-white/20"></div>
                        <span className="text-[9px] font-mono text-gray-500 bg-[#0a0a0a] px-2 rounded-full border border-white/10">LIVE REPLIES</span>
                        <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-white/20"></div>
                    </div>

                    {/* Replies List */}
                    <div className="space-y-4 pl-2">
                        {replies && replies.length > 0 ? (
                            replies.map((r: Message) => {
                                const isMe = typeof r.sender !== 'string' && r.sender.id === currentUser.id;
                                const rName = typeof r.sender !== 'string' ? r.sender.username : 'SYSTEM';
                                return (
                                    <div key={r.id} className={`flex gap-3 ${isMe ? 'flex-row-reverse' : ''} animate-slide-up group`}>
                                         <div className={`flex flex-col max-w-[85%] ${isMe ? 'items-end' : 'items-start'}`}>
                                             <div className="flex items-baseline gap-2 mb-1 px-1">
                                                 <span className={`text-[10px] font-bold font-orbitron tracking-wide ${isMe ? 'text-cyber-green' : 'text-cyber-cyan'}`}>
                                                     {rName}
                                                 </span>
                                                 <span className="text-[9px] text-gray-700 group-hover:text-gray-500 transition-colors font-mono">
                                                     {r.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                 </span>
                                             </div>
                                             <div className={`px-3 py-2.5 rounded-2xl text-sm leading-snug shadow-sm ${
                                                 isMe 
                                                 ? 'bg-cyber-green/10 text-white border border-cyber-green/20 rounded-tr-sm' 
                                                 : 'bg-[#1a1a1a] text-gray-300 border border-white/10 rounded-tl-sm'
                                             }`}>
                                                 {r.text}
                                             </div>
                                         </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="text-center py-10 opacity-50 flex flex-col items-center">
                                <MessageSquare size={32} className="text-gray-700 mb-2" />
                                <p className="text-gray-500 text-xs font-mono">No replies yet.</p>
                                <p className="text-gray-600 text-[10px]">Be the first to respond!</p>
                            </div>
                        )}
                        <div ref={bottomRef} />
                    </div>
                </div>

                {/* Input Area */}
                <div className="p-3 bg-[#0f0f0f] border-t border-white/10 pb-safe-area">
                    <div className="flex gap-2">
                         <input 
                            className="flex-1 bg-black border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyber-cyan/50 focus:ring-1 focus:ring-cyber-cyan/20 placeholder:text-gray-600 transition-all" 
                            value={text} 
                            onChange={e => setText(e.target.value)}
                            placeholder="Add to thread..."
                            autoFocus
                            onKeyDown={e => {
                                if(e.key === 'Enter' && text.trim()) {
                                    onSendReply(text);
                                    setText('');
                                }
                            }}
                        />
                        <button 
                            onClick={() => { if(text.trim()) { onSendReply(text); setText(''); }}} 
                            className="bg-cyber-cyan hover:bg-cyan-400 text-black p-3 rounded-xl transition-all shadow-[0_0_15px_rgba(0,255,255,0.2)] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={!text.trim()}
                        >
                            <Send size={20} strokeWidth={2.5} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}