import React, { useState } from 'react';
import { CyberButton } from '../ui/CyberComponents';
import { X, Mail, Loader, CheckCircle } from 'lucide-react';

interface Props {
  onBackToLogin: () => void;
}

export const RecoverPasswordScreen: React.FC<Props> = ({ onBackToLogin }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('sending');
    // Simulate API call
    setTimeout(() => {
      setStatus('sent');
    }, 1500);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-6 bg-cyber-black relative overflow-hidden">
      {/* Background Effect */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-10">
        <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-gradient-to-br from-cyber-purple/10 via-transparent to-transparent animate-spin-slow origin-center blur-[120px]"></div>
      </div>

      <div className="w-full max-w-sm relative z-20">
        {/* Header with Close Button */}
        <div className="flex justify-end mb-2">
          <button 
            onClick={onBackToLogin}
            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all"
          >
            <X size={20} />
          </button>
        </div>

        {status !== 'sent' ? (
          <form onSubmit={handleSubmit}>
            <div className="text-center space-y-2 mb-8">
               <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-cyber-purple/10 border border-cyber-purple/20 flex items-center justify-center">
                     <Mail size={32} className="text-cyber-purple" />
                  </div>
               </div>
               <h1 className="text-3xl font-orbitron font-black text-white uppercase tracking-tighter drop-shadow-lg">
                 RECOVER PASSWORD
               </h1>
               <p className="text-sm text-gray-400 font-sans max-w-xs mx-auto">
                 Enter your account's email and we'll send you a recovery link.
               </p>
            </div>
    
            <div className="space-y-4">
              <div className="relative group">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value.toLowerCase())}
                  placeholder="Email Address" 
                  required
                  className="w-full bg-cyber-dark/80 border border-white/10 rounded-lg px-4 py-3 text-white font-sans focus:outline-none focus:border-cyber-purple/50 focus:ring-1 focus:ring-cyber-purple/20 transition-all placeholder:text-gray-500"
                />
              </div>
              
              <CyberButton 
                fullWidth 
                type="submit"
                disabled={status === 'sending' || !email}
                className={`!rounded-xl shadow-[0_0_20px_rgba(208,0,255,0.4)] bg-cyber-purple hover:shadow-[0_0_35px_rgba(208,0,255,0.6)] text-white ${status === 'sending' ? 'cursor-wait' : ''}`}
              >
                {status === 'sending' ? (
                  <>
                    <Loader className="animate-spin mr-2" size={16} /> SENDING...
                  </>
                ) : (
                  'SEND RECOVERY LINK'
                )}
              </CyberButton>
            </div>
          </form>
        ) : (
          <div className="text-center space-y-6 animate-[fadeIn_0.5s_ease-out]">
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 rounded-full bg-cyber-green/10 border-2 border-cyber-green/30 flex items-center justify-center relative">
                <div className="absolute inset-0 rounded-full bg-cyber-green/20 animate-pulse-fast"></div>
                <CheckCircle size={40} className="text-cyber-green relative z-10" />
              </div>
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-orbitron font-black text-white uppercase tracking-tighter drop-shadow-lg">
                LINK SENT
              </h1>
              <p className="text-sm text-gray-300 font-sans max-w-xs mx-auto">
                A password recovery link has been sent to <span className="font-bold text-white">{email}</span>. Please check your inbox and spam folder.
              </p>
            </div>
            <CyberButton 
              fullWidth 
              onClick={onBackToLogin}
              className="!rounded-xl shadow-[0_0_20px_rgba(57,255,20,0.4)]"
            >
              BACK TO LOGIN
            </CyberButton>
          </div>
        )}
      </div>
    </div>
  );
};