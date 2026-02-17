import React, { useState } from 'react';
import { CyberButton, IsotypeTheFunFanReporter } from '../ui/CyberComponents';
import { X, Facebook, Instagram, Github } from 'lucide-react';
import { FirebaseClient } from '../../api/FirebaseClient';

interface Props {
  onBack: () => void;
  onSwitchToSignup: () => void;
  onLoginSuccess: (data: { handle: string }) => void;
  onForgotPassword: () => void;
}

const XLogo = ({ size = 16, className = "" }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932zm-1.294 19.497h2.039L6.482 2.395H4.293L17.607 20.65z" />
  </svg>
);

const AppleLogo = () => (<svg viewBox="0 0 384 512" fill="currentColor" height="1.2em" width="1.2em" className="mb-1"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5c0 60.1 21.1 120.6 52 165.7 18.2 27.2 40.5 57 69.3 56.4 26.6-.7 36.5-17.2 68.6-17.2 32.7 0 42.6 17.3 70.3 16.6 28-.7 47.9-29.3 64.6-56.1 18.2-28.8 25.4-56.8 25.4-58.1-1.3-.6-48.4-19.1-45.5-52.1zM262 136.2c18.6-22.9 31-54.8 27.6-86.8-26.3 1.2-57.9 17.9-76.4 40.4-15.6 18.9-29.4 50.1-26.2 81.3 28.5 1.5 56.7-12 75-34.9z" /></svg>);
const GoogleLogo = () => (<svg viewBox="0 0 24 24" width="1.2em" height="1.2em" xmlns="http://www.w3.org/2000/svg" className="inline-block shrink-0"><g fill="none" fillRule="evenodd"><path d="M20.64 12.2045c0-.6381-.0573-1.2518-.1636-1.8409H12v3.4814h4.8436c-.2086 1.125-.8427 2.0782-1.7959 2.7164v2.2581h2.9087c1.7018-1.5668 2.6836-3.874 2.6836-6.615z" fill="#4285F4" /><path d="M12 21c2.43 0 4.4673-.806 5.9564-2.1805l-2.9087-2.2581c-.8059.54-1.8368.859-3.0477.859-2.344 0-4.3282-1.5831-5.036-3.7104H3.9574v2.3318C5.4382 18.9832 9.4818 21 12 21z" fill="#34A853" /><path d="M6.964 13.71c-.18-.54-.2822-1.1168-.2822-1.71s.1023-1.17.2823-1.71V7.9582H3.9573A8.9965 8.9965 0 0 0 3 12c0 1.4523.3477 2.8268.9573 4.0418L6.964 13.71z" fill="#FBBC05" /><path d="M12 6.9545c1.3214 0 2.5077.4541 3.4405 1.346l2.5813-2.5814C16.4632 4.2695 14.426 3.3636 12 3.3636 9.4818 3.3636 5.4382 5.3805 3.9574 8.3318l3.0067 2.3318C7.6718 8.5377 9.6559 6.9545 12 6.9545z" fill="#EA4335" /></g></svg>);

export const LoginScreen: React.FC<Props> = ({ onBack, onSwitchToSignup, onLoginSuccess, onForgotPassword }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleProviderLogin = async (provider: 'google' | 'facebook' | 'apple' | 'github' | 'twitter') => {
    try {
      const { idToken } = await FirebaseClient.signInWithProvider(provider);
      const { user } = await FirebaseClient.authenticateWithBackend(idToken);
      onLoginSuccess({ handle: user.username });
    } catch (error: any) {
      console.error(`${provider} Login Failed`, error);
      // Better error message for user
      if (error.code === 'auth/operation-not-allowed') {
        alert(`Authentication with ${provider} is not enabled in Firebase Console yet.`);
      } else if (error.code === 'auth/popup-closed-by-user') {
        // Just closed, don't alert
      } else {
        alert(`${provider} Login Failed: ${error.message || 'Unknown Error'}`);
      }
    }
  };

  const handleLogin = () => {
    const handle = email.split('@')[0] || 'fan_reporter';
    onLoginSuccess({ handle });
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
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all"
          >
            <X size={20} />
          </button>
        </div>

        {/* Logo and Headings */}
        <div className="text-center space-y-2 mb-8">
          <div className="flex justify-center mb-1">
            <div className="w-12 h-12">
              <IsotypeTheFunFanReporter color="#39ff14" noGlow={true} />
            </div>
          </div>
          <h1 className="text-3xl font-orbitron font-black text-white uppercase tracking-tight drop-shadow-lg">
            LOG IN
          </h1>
        </div>

        {/* Form Inputs */}
        <div className="space-y-3 mb-4">
          <div className="relative group">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value.toLowerCase())}
              placeholder="Email"
              className="w-full bg-cyber-dark/80 border border-white/10 rounded-lg px-4 py-3 text-white font-sans focus:outline-none focus:border-cyber-purple/50 focus:ring-1 focus:ring-cyber-purple/20 transition-all placeholder:text-gray-500"
            />
          </div>
          <div className="relative group">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full bg-cyber-dark/80 border border-white/10 rounded-lg px-4 py-3 text-white font-sans focus:outline-none focus:border-cyber-purple/50 focus:ring-1 focus:ring-cyber-purple/20 transition-all placeholder:text-gray-500"
            />
          </div>
        </div>

        {/* Forgot Password */}
        <div className="text-center mb-5">
          <button onClick={onForgotPassword} className="text-gray-300 text-sm font-sans hover:text-white transition-colors">
            Forgot Password? <span className="text-cyber-purple font-bold">Recover it</span>
          </button>
        </div>

        {/* Main Action Button */}
        <div className="mb-5">
          <CyberButton
            fullWidth
            onClick={handleLogin}
            className="!rounded-xl shadow-[0_0_20px_rgba(57,255,20,0.4)]"
          >
            LOG IN
          </CyberButton>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-5">
          <div className="flex-1 h-[1px] bg-white/10"></div>
          <span className="text-gray-400 font-sans text-xs uppercase tracking-widest">or</span>
          <div className="flex-1 h-[1px] bg-white/10"></div>
        </div>

        {/* Social Auth - Primary (Google & Apple) */}
        <div className="space-y-2 mb-4">
          <button
            onClick={() => handleProviderLogin('google')}
            className="w-full bg-white text-black font-black font-sans h-12 rounded-lg flex items-center justify-center gap-3 hover:bg-gray-100 transition-all active:scale-[0.98] duration-200 shadow-lg"
          >
            <GoogleLogo />
            <span className="uppercase font-orbitron text-[10px] tracking-widest font-bold">Continue with Google</span>
          </button>

          <button
            onClick={() => handleProviderLogin('apple')}
            className="w-full bg-[#0a0a0a] border border-white/20 text-white font-bold font-orbitron h-12 rounded-lg flex items-center justify-center gap-3 hover:bg-black transition-all active:scale-[0.98] duration-200 uppercase group"
          >
            <AppleLogo />
            <span className="uppercase font-orbitron text-[10px] tracking-widest font-bold">Continue with Apple</span>
          </button>
        </div>

        {/* Other Options (Facebook, GitHub, X/Twitter) */}
        <div className="space-y-3 mb-6">
          <div className="text-center">
            <span className="text-gray-400 font-sans text-[10px] uppercase font-bold tracking-widest">Other options:</span>
          </div>
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => handleProviderLogin('facebook')}
              className="w-10 h-10 rounded-full bg-[#1877F2]/10 border border-[#1877F2]/30 flex items-center justify-center text-[#1877F2] hover:bg-[#1877F2]/20 transition-all active:scale-90"
              title="Continue with Facebook"
            >
              <Facebook size={20} fill="currentColor" />
            </button>
            <button
              onClick={() => handleProviderLogin('github')}
              className="w-10 h-10 rounded-full bg-white/5 border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-all active:scale-90"
              title="Continue with GitHub"
            >
              <Github size={20} />
            </button>
            <button
              onClick={() => handleProviderLogin('twitter')}
              className="w-10 h-10 rounded-full bg-white/5 border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-all active:scale-90"
              title="Continue with X (Twitter)"
            >
              <XLogo size={18} />
            </button>
          </div>
        </div>

        {/* Footer Link */}
        <div className="text-center">
          <p className="text-gray-300 font-sans text-sm">
            New to THE FUN FAN REPORTER? {' '}
            <button
              onClick={onSwitchToSignup}
              className="text-cyber-purple font-black hover:underline underline-offset-4"
            >
              Sign up for FREE
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};