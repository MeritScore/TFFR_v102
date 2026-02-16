import React, { useState, useEffect, useRef } from 'react';
import { Bot, X, Send, Sparkles, Brain, Info, HelpCircle, ChevronRight, Zap } from 'lucide-react';
import { User, Message, MessageType } from '../../types';

const ARCHY_USER: User = {
    id: 'archy',
    username: 'ARCHY',
    meritScore: 999,
    avatarUrl: 'https://img.icons8.com/isometric/512/brain.png',
    scoreColor: '#d000ff',
    isVerified: true,
    role: 'PLATFORM GUIDE (GEMINI 3 API)'
};

const INITIAL_ARCHY_MESSAGES: Message[] = [
    {
        id: 'archy-1',
        text: "Hello! I am Archy, your Gemini 3 AI Guide. I'm here to help you navigate The Fun Fan Reporter platform and understand how reputation works in this ecosystem. What would you like to know?",
        sender: ARCHY_USER,
        timestamp: new Date(),
        type: MessageType.CHAT
    }
];

export const ArchyGuide: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>(INITIAL_ARCHY_MESSAGES);
    const [inputText, setInputText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const handleSendMessage = () => {
        if (!inputText.trim()) return;

        const userMsg: Message = {
            id: `user-${Date.now()}`,
            text: inputText,
            sender: 'YOU' as any, // Simple display for user
            timestamp: new Date(),
            type: MessageType.CHAT
        };

        setMessages(prev => [...prev, userMsg]);
        setInputText('');
        setIsTyping(true);

        // Simulated Archy Logic (Gemini 3 Mock)
        setTimeout(() => {
            let archyResponse = "I'm processing your request via the Gemini 3 neural net...";
            const query = userMsg.text.toLowerCase();

            if (query.includes('the fun fan reporter') || query.includes('reputation')) {
                archyResponse = "The Merit Score status is your behavioral collateral. It's calculated based on three vectors: Consistency (reliability), Complexity (skill level), and Velocity (speed). High levels unlock VIP channels and better Gig rates.";
            } else if (query.includes('gig') || query.includes('work')) {
                archyResponse = "Gigs are tasks offered by other users or the system. You can bid on them or claim them directly if your Merit Score meets the requirements. Successful Gigs increase your score!";
            } else if (query.includes('vip')) {
                archyResponse = "VIP status is for elite fans with high scores or verified identities like Marilyn Alvarado. It grants access to restricted chat channels and exclusive deals.";
            } else if (query.includes('benito')) {
                archyResponse = "Benito Martínez is a high-profile participant currently unverified. His low score makes him a 'Liquid Trader'—high risk, but often involved in unique market movements.";
            } else if (query.includes('marilyn')) {
                archyResponse = "Marilyn Alvarado is an Elite & Verified Member with a near-perfect reputation level. She is a trusted node in the platform's social graph.";
            } else {
                archyResponse = "Interesting question. As a Gemini 3 entity, I see that you're exploring the nuances of our platform. You can check your Merit dashboard, trade in the Global Feed, or join specialized channels to learn more.";
            }

            const archyMsg: Message = {
                id: `archy-${Date.now()}`,
                text: archyResponse,
                sender: ARCHY_USER,
                timestamp: new Date(),
                type: MessageType.CHAT
            };

            setMessages(prev => [...prev, archyMsg]);
            setIsTyping(false);
        }, 1500);
    };

    return (
        <div className="fixed bottom-48 right-6 z-[60]">
            {/* Floating Action Button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="w-14 h-14 rounded-full bg-gradient-to-br from-[#d000ff] to-[#7000ff] flex items-center justify-center shadow-[0_0_20px_rgba(208,0,255,0.4)] hover:shadow-[0_0_30px_rgba(208,0,255,0.6)] hover:scale-110 active:scale-95 transition-all animate-pulse"
                >
                    <Brain size={28} className="text-white" />
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-cyber-cyan rounded-full flex items-center justify-center border border-black animate-bounce">
                        <Sparkles size={10} className="text-black" />
                    </div>
                </button>
            )}

            {/* Archy Chat Window */}
            {isOpen && (
                <div className="w-80 h-[450px] bg-cyber-black border border-white/20 rounded-2xl flex flex-col shadow-[0_10px_40px_rgba(0,0,0,0.8)] animate-slide-up border-b-[#d000ff] border-b-4">
                    {/* Header */}
                    <div className="p-4 border-b border-white/10 flex justify-between items-center bg-gradient-to-r from-[#1a1a1a] to-black rounded-t-2xl">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-[#d000ff]/20 border border-[#d000ff]/40 flex items-center justify-center shadow-[0_0_10px_rgba(208,0,255,0.2)]">
                                <Brain size={20} className="text-[#d000ff]" />
                            </div>
                            <div>
                                <h3 className="text-sm font-orbitron font-black text-white tracking-widest flex items-center gap-1.5">
                                    ARCHY <div className="w-1.5 h-1.5 bg-cyber-cyan rounded-full animate-ping"></div>
                                </h3>
                                <p className="text-[9px] text-[#d000ff] font-mono font-bold uppercase tracking-tighter">Gemini 3 Intelligence</p>
                            </div>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-white transition-colors">
                            <X size={18} />
                        </button>
                    </div>

                    {/* Messages */}
                    <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar bg-[radial-gradient(circle_at_bottom_right,_rgba(208,0,255,0.05)_0%,_transparent_50%)]">
                        {messages.map((msg) => {
                            const isArchy = (msg.sender as any).id === 'archy' || msg.sender === 'ARCHY';
                            return (
                                <div key={msg.id} className={`flex ${isArchy ? 'justify-start' : 'justify-end'}`}>
                                    <div className={`max-w-[85%] p-3 rounded-xl text-xs font-sans leading-relaxed shadow-sm ${isArchy
                                        ? 'bg-white/5 border border-white/10 text-gray-200 rounded-tl-none'
                                        : 'bg-[#d000ff] text-white rounded-tr-none font-bold'
                                        }`}>
                                        {msg.text}
                                    </div>
                                </div>
                            );
                        })}
                        {isTyping && (
                            <div className="flex justify-start">
                                <div className="bg-white/5 border border-white/10 p-3 rounded-xl rounded-tl-none flex gap-1 items-center">
                                    <div className="w-1.5 h-1.5 bg-[#d000ff] rounded-full animate-bounce"></div>
                                    <div className="w-1.5 h-1.5 bg-[#d000ff] rounded-full animate-bounce [animation-delay:0.2s]"></div>
                                    <div className="w-1.5 h-1.5 bg-[#d000ff] rounded-full animate-bounce [animation-delay:0.4s]"></div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Quick Info */}
                    <div className="px-4 py-2 flex gap-2 overflow-x-auto no-scrollbar border-t border-white/5">
                        {['Merit Score?', 'What are Gigs?', 'Who is Benito?'].map(q => (
                            <button
                                key={q}
                                onClick={() => { setInputText(q); }}
                                className="whitespace-nowrap px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[9px] font-bold text-gray-400 hover:text-white hover:border-[#d000ff] transition-all"
                            >
                                {q}
                            </button>
                        ))}
                    </div>

                    {/* Input */}
                    <div className="p-4 border-t border-white/10 flex gap-2 bg-black/40">
                        <input
                            type="text"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                            placeholder="Ask Archy..."
                            className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d000ff] transition-colors"
                        />
                        <button
                            onClick={handleSendMessage}
                            className="p-2 bg-[#d000ff] rounded-lg text-white hover:bg-purple-600 transition-colors shadow-[0_0_10px_rgba(208,0,255,0.3)]"
                        >
                            <Send size={16} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
