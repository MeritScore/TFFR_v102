import React, { useState, useEffect, useRef } from 'react';
import { Crown, ShieldCheck, DollarSign, Users, Flame, Search, Volume2, X, Check, Key, CheckCircle2, Ticket, Gift, CreditCard, Lock, AlertTriangle, Copy, Star, Coins, MessageSquare, Briefcase, Bookmark, Plus, Minus, Zap } from 'lucide-react';
import { CyberButton } from '../ui/CyberComponents';
import { Message, MessageType, User } from '../../types';
import { CURRENT_USER, INITIAL_MESSAGES, SYSTEM_ALERTS, MOCK_USERS, TOPICS, SPAM_PHRASES, UNIQUE_MESSAGES } from '../chat/ChatConstants';
import { ChatBubble } from '../chat/ChatBubble';
import { InputBar } from '../chat/InputBar';
import { ThreadView } from '../chat/ThreadView';
import { TopicTicker } from '../chat/TopicTicker';
import { GigMarket } from '../chat/GigMarket';
import { MeritView } from './MeritView';

interface Props {
  userProfile?: { handle: string, specialty: string };
}
function shuffleArray(array: string[]) {
    let currentIndex = array.length,  randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}
const generateId = () => Math.random().toString(36).substr(2, 9);
export const FanDashboard: React.FC<Props> = ({ userProfile }) => {
  const isVip = userProfile?.specialty === 'vip';
  const [showVipPortal, setShowVipPortal] = useState(false);
  const [giftCode, setGiftCode] = useState<string | null>(null);
  const [redeemCodeInput, setRedeemCodeInput] = useState('');
  const [simulatedVipStatus, setSimulatedVipStatus] = useState(isVip);
  
  // Reservation Modal State
  const [reservationState, setReservationState] = useState<'CLOSED' | 'CONFIG' | 'SUCCESS'>('CLOSED');
  const [reserveConfig, setReserveConfig] = useState({ duration: 45, partySize: 5, name: '' });
  
  // Promo Modal State
  const [promoState, setPromoState] = useState<'CLOSED' | 'CLAIM' | 'REDEEMED'>('CLOSED');
  
  const handleReserveOpen = () => {
      setReservationState('CONFIG');
      setReserveConfig({ duration: 45, partySize: 5, name: '' });
  };
  
  const handleClaimOpen = () => {
      setPromoState('CLAIM');
  };
  
  const updateConfig = (field: 'duration' | 'partySize', change: number) => {
      setReserveConfig(prev => {
          const newVal = prev[field] + change;
          if (field === 'duration' && newVal < 15) return prev;
          if (field === 'partySize' && newVal < 1) return prev;
          return { ...prev, [field]: newVal };
      });
  };

  const calculatedCost = Math.ceil((reserveConfig.duration / 15) * reserveConfig.partySize);

  const CUSTOM_INITIAL_MESSAGES: Message[] = [
    ...INITIAL_MESSAGES,
    {
      id: 'msg-demo-all-buttons',
      text: 'Need 3 people to help unload equipment at the VIP Backstage entrance. Must have credentials or high Merit Score. Bidding open.',
      sender: { id: 'u5', username: 'CryptoKing', meritScore: 120, avatarUrl: 'https://picsum.photos/205/205' },
      timestamp: new Date(),
      type: MessageType.GIG_OFFER,
      topicTag: 'VIP_ACCESS',
      metadata: { gigTitle: 'Equipment Unload', amount: 300 },
      replies: [
        { id: 'r1', text: 'I have a score of 180, is that enough?', sender: MOCK_USERS[0], timestamp: new Date(Date.now() - 1000 * 60 * 2), type: MessageType.CHAT },
        { id: 'r2', text: 'On my way now!', sender: MOCK_USERS[1], timestamp: new Date(Date.now() - 1000 * 60 * 1), type: MessageType.CHAT }
      ]
    },
    {
      id: 'msg-flash-promo',
      text: 'Target: Names starting with "M"',
      sender: 'SYSTEM',
      timestamp: new Date(),
      type: MessageType.FLASH_PROMO,
      metadata: {
        gigTitle: '1 FREE DRINK',
        venue: 'The Turbo Paddock',
        timeLeft: '29:59',
        target: 'Names starting with "M"'
      }
    },
    {
        id: 'msg-spot-release',
        text: '5 Spots available for 1 Meritocracy Coin.',
        sender: 'SYSTEM',
        timestamp: new Date(),
        type: MessageType.SPOT_RELEASE,
        metadata: {
            venue: 'Pit Stop Pub',
            location: 'Santa Clara - Sunnyvale',
            amount: 1,
            timeLeft: '15m'
        }
    },
    {
        id: 'msg-interested-trade',
        text: 'Selling 2 VIP Lounge passes for tonight. 500 MC each. Instant transfer available.',
        sender: MOCK_USERS[2],
        timestamp: new Date(Date.now() - 1000 * 60 * 15),
        type: MessageType.GIG_OFFER,
        topicTag: 'TICKETS',
        metadata: { gigTitle: 'VIP Lounge Passes', amount: 500 },
        replies: [
            { id: 'r-me-1', text: 'I am interested. Would you take 900 for both?', sender: CURRENT_USER, timestamp: new Date(), type: MessageType.CHAT }
        ]
    }
  ];

  const [messages, setMessages] = useState<Message[]>(CUSTOM_INITIAL_MESSAGES);
  const [activeChannel, setActiveChannel] = useState<'GLOBAL' | 'MERIT' | 'VIP' | 'SAFETY' | 'TRADE' | 'COMMENTS'>('GLOBAL');
  const [isGigMarketOpen, setIsGigMarketOpen] = useState(false);
  const [activeTopic, setActiveTopic] = useState<string | null>(null);
  const [activeThreadId, setActiveThreadId] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const isPausedRef = useRef(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const messageQueueRef = useRef<string[]>(shuffleArray([...UNIQUE_MESSAGES]));
  const queueIndexRef = useRef(0);
  const handleChannelSelect = (channel: any) => {
    setActiveChannel(channel);
    if (channel === 'VIP') { setShowVipPortal(true); }
  };
  const togglePause = () => { const newState = !isPausedRef.current; isPausedRef.current = newState; setIsPaused(newState); };
  const handleInteraction = () => { if (!isPausedRef.current) { isPausedRef.current = true; setIsPaused(true); } };
  const handleOpenThread = (message: Message) => { setActiveThreadId(message.id); handleInteraction(); };
  const handleSendReply = (text: string) => {
      if (!activeThreadId) return;
      const replyMsg: Message = { id: generateId(), text, sender: CURRENT_USER, timestamp: new Date(), type: MessageType.CHAT };
      setMessages(prev => prev.map(msg => {
          if (msg.id === activeThreadId) return { ...msg, replies: [...(msg.replies || []), replyMsg] };
          return msg;
      }));
  };
  const getNextUniqueMessage = () => {
      if (queueIndexRef.current >= messageQueueRef.current.length) { messageQueueRef.current = shuffleArray([...UNIQUE_MESSAGES]); queueIndexRef.current = 0; }
      const msg = messageQueueRef.current[queueIndexRef.current]; queueIndexRef.current++; return msg;
  };
  const addMessage = (text: string, sourceMode: string, topicName?: string) => {
      setMessages(prev => {
          const lastMsg = prev[prev.length - 1];
          const randomUser = MOCK_USERS[Math.floor(Math.random() * MOCK_USERS.length)];
          if (lastMsg && lastMsg.text === text && lastMsg.type !== MessageType.SYSTEM) {
              const updatedLastMsg = { ...lastMsg, repeatCount: (lastMsg.repeatCount || 1) + 1, timestamp: new Date() };
              return [...prev.slice(0, -1), updatedLastMsg];
          }
          const newMessage: Message = { id: generateId(), text, sender: randomUser, timestamp: new Date(), type: MessageType.CHAT, repeatCount: 1, topicTag: topicName };
          return [...prev, newMessage];
      });
  };
  const handleSendMessage = (text: string) => {
    setMessages(prev => {
        const lastMsg = prev[prev.length - 1];
        if (lastMsg && lastMsg.text === text) {
             const updatedLastMsg = { ...lastMsg, repeatCount: (lastMsg.repeatCount || 1) + 1, timestamp: new Date() };
             return [...prev.slice(0, -1), updatedLastMsg];
        }
        const newMessage: Message = { id: generateId(), text, sender: CURRENT_USER, timestamp: new Date(), type: MessageType.CHAT, repeatCount: 1, topicTag: activeTopic || undefined };
        return [...prev, newMessage];
    });
  };
  const handleQuickAction = (action: string) => {
    if (action === 'OFFER_GIG') {
      const msg: Message = { id: generateId(), text: 'I need 2 runners for Gate B. 50MC per person. Urgent!', sender: CURRENT_USER, timestamp: new Date(), type: MessageType.GIG_OFFER, metadata: { amount: 50, gigTitle: "Runner Needed" } };
      setMessages(prev => [...prev, msg]);
    } else if (action === 'REQUEST_HELP') {
      const msg: Message = { id: generateId(), text: 'REQUESTING ASSISTANCE: Need backup at Section 100. Crowd density high.', sender: CURRENT_USER, timestamp: new Date(), type: MessageType.ALERT, metadata: { amount: 0, location: 'Section 100' } };
      setMessages(prev => [...prev, msg]);
    } else if (action === 'INTEL') {
      const msg: Message = { id: generateId(), text: 'Reported obstruction at Sector 4. Awaiting verification.', sender: CURRENT_USER, timestamp: new Date(), type: MessageType.ALERT, metadata: { amount: 5, location: 'Sector 4' } };
      setMessages(prev => [...prev, msg]);
    } else if (action === 'STARTING_BID') {
       const msg: Message = { id: generateId(), text: `STARTING BID: 150 MC for the signed jersey!`, sender: CURRENT_USER, timestamp: new Date(), type: MessageType.GIG_OFFER, metadata: { amount: 150, gigTitle: "Auction Bid" } };
       setMessages(prev => [...prev, msg]);
    } else if (action === 'TIP') {
       const tipMsg: Message = { id: generateId(), text: `Tipped 5 MC to Hive Mind`, sender: CURRENT_USER, timestamp: new Date(), type: MessageType.TIPPING, metadata: { amount: 5 } };
       setMessages(prev => [...prev, tipMsg]);
    }
  };
  const handleGenerateGift = () => { setTimeout(() => { setGiftCode(`VIP-${Math.random().toString(36).substring(2, 8).toUpperCase()}`); }, 1000); };
  const handleUpgradeVip = () => { setTimeout(() => { setSimulatedVipStatus(true); }, 1000); };
  const handleRedeemCode = () => { if (redeemCodeInput.length > 5) { setTimeout(() => { setSimulatedVipStatus(true); }, 500); } };
  useEffect(() => {
    let mode = 'NORMAL'; let spamCounter = 0; let topicCounter = 0; let currentTopicIndex = 0; let currentSpamPhrase = "";
    const interval = setInterval(() => {
      const random = Math.random();
      if (activeThreadId && random > 0.6) {
          const randomUser = MOCK_USERS[Math.floor(Math.random() * MOCK_USERS.length)];
          const replyText = ["Me too!", "Is this still available?", "Checking now.", "Wait for me!"][Math.floor(Math.random() * 4)];
          const botReply: Message = { id: generateId(), text: replyText, sender: randomUser, timestamp: new Date(), type: MessageType.CHAT };
          setMessages(prev => prev.map(msg => { if (msg.id === activeThreadId) { return { ...msg, replies: [...(msg.replies || []), botReply] }; } return msg; }));
      }
      if (isPausedRef.current) return;
      if (mode === 'NORMAL' && random > 0.95) {
          const subRandom = Math.random();
          if (subRandom > 0.5) { mode = 'SPAM'; currentSpamPhrase = SPAM_PHRASES[Math.floor(Math.random() * SPAM_PHRASES.length)]; spamCounter = 5 + Math.floor(Math.random() * 8); } 
          else { mode = 'TOPIC'; currentTopicIndex = Math.floor(Math.random() * TOPICS.length); setActiveTopic(TOPICS[currentTopicIndex].name); topicCounter = 6 + Math.floor(Math.random() * 6); }
      }
      if (mode === 'SPAM') { if (spamCounter > 0) { addMessage(currentSpamPhrase, 'SPAM'); spamCounter--; } else { mode = 'NORMAL'; } } 
      else if (mode === 'TOPIC') {
          if (topicCounter > 0) {
              const topic = TOPICS[currentTopicIndex];
              const keyword = topic.keywords[Math.floor(Math.random() * topic.keywords.length)];
              const variations = [`Has anyone seen the ${keyword}?`, `The ${keyword} is crazy right now!`, `Update on ${keyword}??`, `Warning about the ${keyword}.`, `Just got to the ${keyword}.`, `Why is the ${keyword} like this?`, `Checking intel on ${keyword}...`];
              addMessage(variations[Math.floor(Math.random() * variations.length)], 'TOPIC', topic.name);
              topicCounter--;
          } else { mode = 'NORMAL'; setActiveTopic(null); }
      } else {
          if (random > 0.75) { const nextMsg = getNextUniqueMessage(); addMessage(nextMsg, 'NORMAL'); }
          if (random < 0.02) { const alertMsg: Message = { id: generateId(), text: SYSTEM_ALERTS[Math.floor(Math.random() * SYSTEM_ALERTS.length)], sender: 'SYSTEM', timestamp: new Date(), type: MessageType.SYSTEM, metadata: { participants: Math.floor(Math.random() * 80000) } }; setMessages(prev => [...prev, alertMsg]); }
      }
    }, 5000); 
    return () => clearInterval(interval);
  }, [activeThreadId]);
  useEffect(() => { if (!isPaused && chatEndRef.current) { chatEndRef.current.scrollIntoView({ behavior: 'smooth' }); } }, [messages, activeTopic, isPaused]);
  
  const getFilteredMessages = () => {
    switch (activeChannel) {
      case 'VIP': return messages.filter(m => typeof m.sender === 'object' && m.sender.meritScore > 200);
      case 'TRADE': 
         // Filter for Gigs/Trades where user is sender OR user replied to them
         return messages.filter(m => {
             const isTradeType = m.type === MessageType.GIG_OFFER || m.type === MessageType.SOCIAL_LOTTERY || m.type === MessageType.SPOT_RELEASE || m.type === MessageType.FLASH_PROMO;
             const isMyMessage = typeof m.sender === 'object' && m.sender.id === CURRENT_USER.id;
             const hasMyReply = m.replies?.some(r => typeof r.sender === 'object' && r.sender.id === CURRENT_USER.id);
             return isTradeType && (isMyMessage || hasMyReply || m.type === MessageType.SPOT_RELEASE || m.type === MessageType.FLASH_PROMO); // Always show spot releases in Trade for now
         });
      case 'SAFETY': return messages.filter(m => m.type === MessageType.ALERT || m.type === MessageType.SYSTEM);
      case 'COMMENTS': 
         return messages.filter(m => {
             const isMyMessage = typeof m.sender === 'object' && m.sender.id === CURRENT_USER.id;
             const hasMyReply = m.replies?.some(r => typeof r.sender === 'object' && r.sender.id === CURRENT_USER.id);
             return isMyMessage || hasMyReply;
         });
      default: return messages;
    }
  };
  const displayedMessages = getFilteredMessages();
  const activeThreadMessage = messages.find(m => m.id === activeThreadId);
  const renderVipPortalOverlay = () => {
    if (!showVipPortal) return null;
    return (
      <div className="absolute inset-0 z-50 bg-black/95 backdrop-blur-xl animate-[fadeIn_0.3s_ease-out] flex flex-col p-4">
        <div className="flex justify-between items-center mb-6 border-b border-yellow-500/30 pb-4">
          <div className="flex items-center gap-3"><div className="p-2 bg-yellow-500/20 rounded-lg border border-yellow-500"><Crown className="text-yellow-500" size={24} /></div><div><h2 className="text-xl font-orbitron font-black text-white tracking-widest">VIP EXPERIENCE</h2><p className="text-[10px] text-yellow-500 font-mono uppercase">Exclusive Access Control</p></div></div>
          <button onClick={() => setShowVipPortal(false)} className="p-2 bg-white/10 rounded-full hover:bg-white/20 text-white transition-colors"><X size={20} /></button>
        </div>
        <div className="flex-1 overflow-y-auto space-y-6 custom-scrollbar pb-10">
          {simulatedVipStatus && (
            <div className="p-1 rounded-xl bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600">
              <div className="bg-black rounded-[10px] p-5 text-center space-y-4">
                <div className="inline-block p-3 rounded-full bg-yellow-500/20 mb-2"><Check size={32} className="text-yellow-400" /></div>
                <h3 className="text-xl font-orbitron font-bold text-white uppercase">Welcome, {userProfile?.handle || 'VIP Guest'}!</h3>
                <p className="text-sm text-gray-300 font-sans">Your VIP status is active. Enjoy exclusive access to the VIP Lounge, front-row upgrades, and premium support.</p>
                <div className="bg-gray-900 border border-white/10 rounded-lg p-3 mt-2"><p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">YOUR PASSCODE (EMAILED)</p><p className="text-2xl font-mono font-bold text-yellow-500 tracking-widest">882-9XA-VIP</p></div>
                <CyberButton fullWidth onClick={() => setShowVipPortal(false)} className="h-12 text-sm mt-2">ENTER VIP CHAT</CyberButton>
              </div>
            </div>
          )}
          {!simulatedVipStatus && (
            <>
               <div className="bg-gradient-to-r from-[#0a0a0a] to-black border border-cyber-green/40 rounded-xl p-5 shadow-[0_0_15px_rgba(57,255,20,0.05)] relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-3 opacity-10 pointer-events-none"><Key size={80} className="text-cyber-green" /></div>
                  <h3 className="text-lg font-orbitron font-bold text-white flex items-center gap-2 mb-2"><Key size={18} className="text-cyber-green" /> ENTER VIP ACCESS CODE</h3>
                  <div className="text-xs text-gray-400 font-sans mb-4 leading-relaxed max-w-[95%]">
                     <p className="mb-2">Already have a code? Enter the <strong>VIP Code</strong> sent to your email upon registration, or a Gift Code you received.</p>
                     <p className="text-cyber-green font-bold text-[10px] uppercase flex items-center gap-1"><CheckCircle2 size={10} /> One-time verification. Future access is automatic.</p>
                  </div>
                  <div className="flex gap-2">
                     <div className="flex-1 bg-black border border-white/20 rounded-lg flex items-center px-3 focus-within:border-cyber-green focus-within:shadow-[0_0_10px_rgba(57,255,20,0.2)] transition-all"><Lock size={14} className="text-gray-500 mr-2" />
                        <input type="text" placeholder="ENTER CODE HERE" value={redeemCodeInput} onChange={(e) => setRedeemCodeInput(e.target.value)} className="bg-transparent text-white text-sm w-full focus:outline-none uppercase font-mono py-3 placeholder:text-gray-700" />
                     </div>
                     <button onClick={handleRedeemCode} disabled={redeemCodeInput.length < 3} className="bg-cyber-green hover:bg-green-400 text-black font-black font-orbitron text-xs px-5 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-[0_0_15px_rgba(57,255,20,0.3)] active:scale-95">UNLOCK</button>
                  </div>
               </div>
               <div className="flex items-center gap-4 px-2 my-2"><div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div><span className="text-[10px] font-orbitron text-gray-500 uppercase tracking-widest">OR</span><div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div></div>
               <div className="border border-white/10 bg-white/5 rounded-xl p-5 space-y-4 relative overflow-hidden group hover:border-yellow-500/50 transition-colors">
                  <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity"><Crown size={80} /></div>
                  <div><h3 className="text-lg font-orbitron font-bold text-white flex items-center gap-2">UPGRADE TO VIP STATUS <Crown size={16} className="text-yellow-500" /></h3><p className="text-xs text-gray-400 mt-1 font-sans">Don't have a code? Unlock the full potential instantly.</p></div>
                  <ul className="space-y-2">{['Exclusive VIP Chat Channel', 'Priority Tipping & Requests', 'VIP Badge on Chat', 'Access to Secret After-Parties'].map((benefit, i) => (<li key={i} className="flex items-center gap-2 text-xs text-gray-300 font-sans"><div className="w-1.5 h-1.5 bg-yellow-500 rounded-full shadow-[0_0_5px_#eab308]"></div>{benefit}</li>))}</ul>
                  <div className="pt-2">
                    <button onClick={handleUpgradeVip} className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-black font-orbitron py-3 rounded-lg flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(234,179,8,0.4)] transition-all active:scale-95"><span className="flex flex-col items-center leading-none py-1"><span>BECOME A VIP</span><span className="text-[10px] font-sans font-normal opacity-80 mt-1">100 MERITOCRACY COIN (US$ 750)</span></span></button>
                  </div>
               </div>
               <div className="border border-white/10 bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-xl p-5 space-y-4">
                 <div className="flex items-center gap-3 mb-2"><div className="p-2 bg-purple-500/20 rounded-lg text-purple-400"><Gift size={20} /></div><div><h3 className="text-lg font-orbitron font-bold text-white">GIFT A VIP EXPERIENCE</h3><p className="text-xs text-gray-400 font-sans">Share the fun with a friend.</p></div></div>
                 {!giftCode ? (
                   <>
                     <p className="text-xs text-gray-300 font-sans leading-relaxed">Purchase a single-use VIP access code. You can send this code to anyone.</p>
                     <div className="bg-purple-500/10 border border-purple-500/30 p-3 rounded-lg flex items-start gap-2"><AlertTriangle size={14} className="text-purple-400 mt-0.5 shrink-0" /><p className="text-[10px] text-purple-200 leading-tight"><strong>INSTRUCTION:</strong> After purchasing, send the code to your guest. They must open this <strong>VIP</strong> tab and enter the code in the "ENTER VIP ACCESS CODE" section above.</p></div>
                     <button onClick={handleGenerateGift} className="w-full bg-cyber-purple hover:bg-purple-400 text-white font-bold font-orbitron py-3 rounded-lg flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(208,0,255,0.3)] transition-all active:scale-95"><CreditCard size={16} /> <span className="flex flex-col items-start leading-none"><span>BUY GIFT CODE</span><span className="text-[9px] opacity-80 font-sans mt-0.5">100 MERITOCRACY COIN (US$ 750)</span></span></button>
                   </>
                 ) : (
                   <div className="bg-black/50 border border-purple-500/50 rounded-lg p-4 animate-[fadeIn_0.3s_ease-out]">
                     <p className="text-[10px] text-purple-400 font-bold uppercase tracking-widest mb-2 text-center">GIFT CODE GENERATED</p>
                     <div className="bg-white/10 rounded px-3 py-2 flex items-center justify-between mb-3 border border-white/5"><span className="font-mono text-xl font-bold text-white tracking-widest">{giftCode}</span><button className="text-gray-400 hover:text-white"><Copy size={16} /></button></div>
                     <p className="text-[10px] text-gray-500 text-center font-sans mb-3">Share this code with your guest.</p>
                     <button onClick={() => setGiftCode(null)} className="w-full mt-1 text-xs text-purple-400 hover:text-white underline">Purchase another</button>
                   </div>
                 )}
               </div>
            </>
          )}
        </div>
      </div>
    );
  };

  const renderPromoModals = () => {
      if (promoState === 'CLOSED') return null;

      if (promoState === 'REDEEMED') {
          return (
            <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-fade-in">
               <div className="bg-[#050505] border border-cyber-cyan w-full max-w-sm rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(0,255,255,0.15)] relative">
                  <button onClick={() => setPromoState('CLOSED')} className="absolute top-4 right-4 text-gray-400 hover:text-white"><X size={20}/></button>
                  
                  <div className="p-8 flex flex-col items-center text-center space-y-6">
                      <div className="w-20 h-20 rounded-full bg-cyber-cyan/10 border border-cyber-cyan flex items-center justify-center mb-2 shadow-[0_0_20px_rgba(0,255,255,0.2)]">
                          <Check size={40} className="text-cyber-cyan" strokeWidth={3} />
                      </div>
                      
                      <div>
                          <h2 className="text-2xl font-orbitron font-black italic text-white tracking-wider mb-2">OFFER REDEEMED</h2>
                          <p className="text-sm font-sans text-gray-400">Head to the bar to claim your drink!</p>
                      </div>
    
                      <div className="w-full bg-[#0f0f0f] border border-cyber-cyan/30 rounded-lg p-6 relative overflow-hidden group">
                           <div className="absolute inset-0 bg-cyber-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                          <div className="text-2xl font-mono font-bold text-cyber-cyan tracking-widest mb-2 shadow-cyber-cyan/20 drop-shadow-[0_0_5px_rgba(0,255,255,0.5)]">#M-DRINK-99</div>
                          <p className="text-[9px] text-gray-600 font-bold uppercase tracking-[0.2em]">VALID FOR 15 MINUTES</p>
                      </div>
                  </div>
               </div>
            </div>
          );
      }

      return (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-fade-in">
           <div className="bg-[#050505] border border-cyber-cyan w-full max-w-sm rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(0,255,255,0.15)]">
               {/* Header */}
               <div className="flex justify-between items-center p-4 border-b border-white/10 bg-[#0a0a0a]">
                   <div className="flex items-center gap-2">
                       <Zap size={20} className="text-cyber-cyan" fill="currentColor" />
                       <h2 className="font-orbitron font-black text-white tracking-widest text-sm">CLAIM OFFER</h2>
                   </div>
                   <button onClick={() => setPromoState('CLOSED')} className="text-gray-400 hover:text-white"><X size={20}/></button>
               </div>

               {/* Content */}
               <div className="p-6 space-y-6">
                   <div className="text-center bg-cyber-cyan/5 border border-cyber-cyan/20 rounded-xl p-4">
                       <h3 className="text-2xl font-black italic text-cyber-cyan mb-1 font-sans">1 FREE DRINK</h3>
                       <p className="text-sm font-mono text-gray-400">@ The Turbo Paddock</p>
                   </div>

                   <div className="bg-[#0f0f11] border border-white/10 rounded-xl p-4 space-y-3">
                       <div className="flex justify-between items-center border-b border-white/5 pb-2">
                           <span className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest">STATUS</span>
                           <span className="bg-green-900/50 text-green-400 text-[10px] font-bold px-1.5 py-0.5 rounded border border-green-500/30">LIVE</span>
                       </div>
                       <div className="flex justify-between items-center border-b border-white/5 pb-2">
                           <span className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest">TARGET</span>
                           <span className="text-xs font-mono text-white text-right">Names starting with "M"</span>
                       </div>
                       <div className="flex justify-between items-center">
                           <span className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest">EXPIRES IN</span>
                           <span className="text-lg font-mono font-bold text-cyber-cyan">29:59</span>
                       </div>
                   </div>

                   <p className="text-[10px] text-gray-500 font-sans text-center italic leading-relaxed">
                       By redeeming, you verify that you meet the target criteria. ID verification required at venue.
                   </p>

                   {/* Confirm Button */}
                   <button 
                      onClick={() => setPromoState('REDEEMED')}
                      className="w-full bg-cyber-cyan hover:bg-cyan-400 text-black font-black font-orbitron text-sm py-4 rounded-lg uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(0,255,255,0.3)] hover:shadow-[0_0_30px_rgba(0,255,255,0.5)] active:scale-95"
                   >
                      <Zap size={18} fill="currentColor" strokeWidth={0} />
                      REDEEM NOW
                   </button>
               </div>
           </div>
        </div>
      );
  };

  const renderReservationModals = () => {
    if (reservationState === 'CLOSED') return null;

    if (reservationState === 'SUCCESS') {
      return (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-fade-in">
           <div className="bg-[#050505] border border-cyber-yellow w-full max-w-sm rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(255,238,0,0.15)] relative">
              <button onClick={() => setReservationState('CLOSED')} className="absolute top-4 right-4 text-gray-400 hover:text-white"><X size={20}/></button>
              
              <div className="p-8 flex flex-col items-center text-center space-y-6">
                  <div className="w-20 h-20 rounded-full bg-cyber-yellow/10 border border-cyber-yellow flex items-center justify-center mb-2 shadow-[0_0_20px_rgba(255,238,0,0.2)]">
                      <Check size={40} className="text-cyber-yellow" strokeWidth={3} />
                  </div>
                  
                  <div>
                      <h2 className="text-2xl font-orbitron font-black italic text-white tracking-wider mb-2">ACCESS GRANTED</h2>
                      <p className="text-sm font-sans text-gray-400">Your spot is held for <span className="text-white font-bold">{reserveConfig.duration} minutes</span>.</p>
                  </div>

                  <div className="w-full bg-[#0f0f0f] border border-white/10 rounded-lg p-6">
                      <div className="text-3xl font-mono font-bold text-cyber-yellow tracking-widest mb-2 shadow-cyber-yellow/20 drop-shadow-[0_0_5px_rgba(255,238,0,0.5)]">#8X99-LP</div>
                      <p className="text-[9px] text-gray-600 font-bold uppercase tracking-[0.2em]">SHOW THIS CODE AT THE DOOR</p>
                  </div>
              </div>
           </div>
        </div>
      );
    }

    return (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-fade-in">
           <div className="bg-[#050505] border border-cyber-yellow w-full max-w-sm rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(255,238,0,0.15)]">
               {/* Header */}
               <div className="flex justify-between items-center p-4 border-b border-white/10 bg-[#0a0a0a]">
                   <div className="flex items-center gap-2">
                       <Ticket size={20} className="text-cyber-yellow" fill="currentColor" />
                       <h2 className="font-orbitron font-black text-white tracking-widest text-sm">RESERVE SPOT</h2>
                   </div>
                   <button onClick={() => setReservationState('CLOSED')} className="text-gray-400 hover:text-white"><X size={20}/></button>
               </div>

               {/* Content */}
               <div className="p-6 space-y-6">
                   <div className="text-center space-y-1">
                       <span className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest">TOTAL COST</span>
                       <div className="flex items-baseline justify-center gap-1">
                           <span className="text-5xl font-rajdhani font-black text-white">{calculatedCost}</span>
                           <span className="text-xl font-bold text-cyber-yellow">MC</span>
                       </div>
                   </div>

                   {/* Duration Control */}
                   <div className="space-y-2">
                       <div className="flex justify-between items-center px-1">
                           <span className="text-[10px] font-bold text-cyber-yellow uppercase tracking-wider">DURATION</span>
                           <span className="text-[10px] font-bold text-white uppercase tracking-wider">{reserveConfig.duration} MIN</span>
                       </div>
                       <div className="flex gap-2 h-12">
                           <button onClick={() => updateConfig('duration', -15)} className="w-12 h-full bg-[#121214] border border-white/10 rounded-lg flex items-center justify-center hover:bg-white/5 active:scale-95 transition-all text-gray-400 hover:text-white"><Minus size={18} /></button>
                           <div className="flex-1 bg-black border border-white/10 rounded-lg flex items-center justify-center font-mono text-sm text-white font-bold">{reserveConfig.duration}m Hold</div>
                           <button onClick={() => updateConfig('duration', 15)} className="w-12 h-full bg-[#121214] border border-white/10 rounded-lg flex items-center justify-center hover:bg-white/5 active:scale-95 transition-all text-gray-400 hover:text-white"><Plus size={18} /></button>
                       </div>
                       <p className="text-[9px] text-right text-gray-600 font-mono">1 MC / 15 min</p>
                   </div>

                   {/* Party Size Control */}
                   <div className="space-y-2">
                       <div className="flex justify-between items-center px-1">
                           <span className="text-[10px] font-bold text-cyber-yellow uppercase tracking-wider">PARTY SIZE</span>
                           <span className="text-[10px] font-bold text-white uppercase tracking-wider">{reserveConfig.partySize} PEOPLE</span>
                       </div>
                       <div className="flex gap-2 h-12">
                           <button onClick={() => updateConfig('partySize', -1)} className="w-12 h-full bg-[#121214] border border-white/10 rounded-lg flex items-center justify-center hover:bg-white/5 active:scale-95 transition-all text-gray-400 hover:text-white"><Minus size={18} /></button>
                           <div className="flex-1 bg-black border border-white/10 rounded-lg flex items-center justify-center font-mono text-sm text-white font-bold">{reserveConfig.partySize} Guests</div>
                           <button onClick={() => updateConfig('partySize', 1)} className="w-12 h-full bg-[#121214] border border-white/10 rounded-lg flex items-center justify-center hover:bg-white/5 active:scale-95 transition-all text-gray-400 hover:text-white"><Plus size={18} /></button>
                       </div>
                       <p className="text-[9px] text-right text-gray-600 font-mono">1 MC / Person</p>
                   </div>

                   {/* Name Input */}
                   <div className="space-y-2">
                       <span className="text-[10px] font-bold text-cyber-yellow uppercase tracking-wider px-1">MAIN GUEST NAME</span>
                       <input 
                          type="text" 
                          placeholder="Enter full name"
                          value={reserveConfig.name}
                          onChange={(e) => setReserveConfig(prev => ({...prev, name: e.target.value}))}
                          className="w-full h-12 bg-black border border-white/10 rounded-lg px-4 text-sm text-white focus:outline-none focus:border-cyber-yellow/50 transition-colors placeholder:text-gray-700"
                       />
                   </div>

                   {/* Confirm Button */}
                   <button 
                      onClick={() => setReservationState('SUCCESS')}
                      className="w-full bg-cyber-yellow hover:bg-yellow-400 text-black font-black font-orbitron text-sm py-4 rounded-xl uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(255,238,0,0.3)] hover:shadow-[0_0_30px_rgba(255,238,0,0.5)] active:scale-95 mt-2"
                   >
                      <Lock size={16} strokeWidth={2.5} />
                      CONFIRM RESERVATION
                   </button>
               </div>
           </div>
        </div>
    );
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] relative font-sans text-gray-200 bg-black">
      {renderVipPortalOverlay()}
      {renderReservationModals()}
      {renderPromoModals()}
      <div className="sticky top-0 z-20 bg-cyber-black/95 backdrop-blur-md border-b border-white/10 pb-2 pt-2">
        <div className="flex justify-between items-end mb-4 px-1">
           <div>
              <h2 className="text-xl font-orbitron font-black text-white leading-none tracking-tight">GLOBAL FEED</h2>
              <div className="flex items-center gap-2 mt-1">
                 <div className="flex items-center gap-1 text-[10px] text-green-400 font-mono"><span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span></span> 75,402 ONLINE</div>
                 <div className="text-[10px] text-gray-600 font-mono">|</div>
                 <div className="flex items-center gap-1 text-[10px] text-orange-400 font-mono"><Flame size={10} /> 890 msgs/min</div>
              </div>
           </div>
           <button onClick={() => handleChannelSelect('MERIT')} className="flex flex-col items-end group active:scale-95 transition-transform"><span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest group-hover:text-cyber-green transition-colors">MY MERIT</span><div className="flex items-center gap-1"><span className="text-2xl font-rajdhani font-black text-cyber-green leading-none group-hover:text-white transition-colors">245</span><div className="bg-cyber-green/20 text-cyber-green text-[9px] font-bold px-1 rounded-sm border border-cyber-green/30 group-hover:bg-cyber-green group-hover:text-black transition-colors">MS</div></div></button>
        </div>
        <div className="bg-cyber-green rounded-xl p-1.5 mx-1 shadow-[0_0_20px_rgba(57,255,20,0.4)]">
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
             {[ { id: 'GLOBAL', icon: Users }, { id: 'MERIT', icon: Star }, { id: 'VIP', icon: Crown }, { id: 'SAFETY', icon: ShieldCheck }, { id: 'TRADE', icon: DollarSign }, { id: 'COMMENTS', icon: MessageSquare } ].map(ch => (
               <button key={ch.id} onClick={() => handleChannelSelect(ch.id)} className={`flex items-center gap-2 px-5 py-2.5 rounded-lg transition-all whitespace-nowrap active:scale-95 ${activeChannel === ch.id ? `bg-black text-cyber-green shadow-lg font-bold border border-black` : 'bg-transparent text-black/60 hover:text-black font-bold border border-transparent'}`}><ch.icon size={16} className="text-current" strokeWidth={3} /><span className="text-xs font-black font-orbitron tracking-wider">{ch.id === 'MERIT' ? 'MERIT SCORE' : ch.id}</span></button>
             ))}
          </div>
        </div>
      </div>
      <TopicTicker topic={activeTopic} />
      <main className="flex-1 overflow-y-auto custom-scrollbar px-2 py-4 space-y-4 relative bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-black to-black">
         {activeChannel === 'MERIT' ? ( <MeritView user={CURRENT_USER} /> ) : (
             <>
               <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] pointer-events-none"></div>
               <div className="relative z-10 max-w-4xl mx-auto space-y-3 pb-4">
                   {activeChannel === 'TRADE' && (
                       <div className="mx-2 my-4 bg-[#1a1a1a] border-l-4 border-cyber-yellow p-4 rounded-r-xl relative overflow-hidden shadow-lg animate-fade-in">
                           <div className="absolute top-0 right-0 p-4 opacity-10"><Briefcase size={60} className="text-cyber-yellow" /></div>
                           <h3 className="font-orbitron font-bold text-white text-sm tracking-widest uppercase mb-1 flex items-center gap-2">
                              <Bookmark size={14} className="text-cyber-yellow" />
                              WATCHLIST & ACTIVE NEGOTIATIONS
                           </h3>
                           <p className="text-[10px] text-gray-400 font-sans max-w-[85%] leading-relaxed">
                              Real-time tracking of your bids, offers, and engaged Gigs. This feed filters the Global Market to show only what matters to you.
                           </p>
                       </div>
                   )}
                   {displayedMessages.length === 0 ? ( <div className="flex flex-col items-center justify-center h-48 text-gray-500 space-y-2 opacity-50"><Volume2 size={32} /><p className="text-xs font-mono">NO SIGNAL IN THIS CHANNEL</p></div> ) : (
                      <>
                         {activeChannel === 'GLOBAL' && <div className="flex justify-center my-6"><span className="bg-white/5 backdrop-blur px-4 py-1.5 text-[10px] font-mono font-bold text-gray-400 rounded-full border border-white/10 shadow-lg">TODAY, FEB 08</span></div>}
                         {displayedMessages.map((msg) => ( <ChatBubble key={msg.id} message={msg} isOwn={msg.sender !== 'SYSTEM' && (msg.sender as User).id === CURRENT_USER.id} onTogglePause={togglePause} onInteraction={handleInteraction} onOpenThread={handleOpenThread} onReserve={handleReserveOpen} onClaim={handleClaimOpen} isPaused={isPaused} /> ))}
                      </>
                   )}
                   <div ref={chatEndRef} />
               </div>
             </>
         )}
      </main>
      {activeChannel !== 'MERIT' && ( <InputBar onSendMessage={handleSendMessage} onQuickAction={handleQuickAction} /> )}
      <GigMarket isOpen={isGigMarketOpen} onClose={() => setIsGigMarketOpen(false)} />
      {activeThreadMessage && ( <ThreadView parentMessage={activeThreadMessage} replies={activeThreadMessage.replies || []} currentUser={CURRENT_USER} onClose={() => setActiveThreadId(null)} onSendReply={handleSendReply} /> )}
    </div>
  );
};