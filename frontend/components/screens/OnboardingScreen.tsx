import React, { useState } from 'react';
import { CyberButton } from '../ui/CyberComponents';
import { ArrowRight, UserCircle, AlertTriangle, LogIn, Lock } from 'lucide-react';
import { FirebaseClient } from '../../api/FirebaseClient';

interface Props {
  onComplete: (data: { handle: string }) => void;
  onSwitchToLogin?: () => void;
}

const GoogleLogo = () => (<svg viewBox="0 0 24 24" width="1.2em" height="1.2em" xmlns="http://www.w3.org/2000/svg" className="inline-block shrink-0"><g fill="none" fillRule="evenodd"><path d="M20.64 12.2045c0-.6381-.0573-1.2518-.1636-1.8409H12v3.4814h4.8436c-.2086 1.125-.8427 2.0782-1.7959 2.7164v2.2581h2.9087c1.7018-1.5668 2.6836-3.874 2.6836-6.615z" fill="#4285F4" /><path d="M12 21c2.43 0 4.4673-.806 5.9564-2.1805l-2.9087-2.2581c-.8059.54-1.8368.859-3.0477.859-2.344 0-4.3282-1.5831-5.036-3.7104H3.9574v2.3318C5.4382 18.9832 9.4818 21 12 21z" fill="#34A853" /><path d="M6.964 13.71c-.18-.54-.2822-1.1168-.2822-1.71s.1023-1.17.2823-1.71V7.9582H3.9573A8.9965 8.9965 0 0 0 3 12c0 1.4523.3477 2.8268.9573 4.0418L6.964 13.71z" fill="#FBBC05" /><path d="M12 6.9545c1.3214 0 2.5077.4541 3.4405 1.346l2.5813-2.5814C16.4632 4.2695 14.426 3.3636 12 3.3636 9.4818 3.3636 5.4382 5.3805 3.9574 8.3318l3.0067 2.3318C7.6718 8.5377 9.6559 6.9545 12 6.9545z" fill="#EA4335" /></g></svg>);

export const OnboardingScreen: React.FC<Props> = ({ onComplete, onSwitchToLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailSubmit = async () => {
    if (email && password) {
      if (password.length < 6) {
        alert("Password must be at least 6 characters.");
        return;
      }
      try {
        const { idToken } = await FirebaseClient.registerWithEmail(email, password);
        const { user } = await FirebaseClient.authenticateWithBackend(idToken);
        onComplete({ handle: user.username });
      } catch (error: any) {
        alert(`Registration Failed: ${error.message}`);
      }
    }
  };

  const handleProviderLogin = async (provider: 'google' | 'facebook' | 'apple' | 'github' | 'twitter') => {
    try {
      const { idToken } = await FirebaseClient.signInWithProvider(provider);
      const { user } = await FirebaseClient.authenticateWithBackend(idToken);
      onComplete({ handle: user.username });
    } catch (error: any) {
      console.error(`${provider} Registration Failed`, error);
      if (error.code === 'auth/operation-not-allowed') {
        alert(`Authentication with ${provider} is not enabled in Firebase Console yet.`);
      } else if (error.code !== 'auth/popup-closed-by-user') {
        alert(`${provider} Registration Failed: ${error.message || 'Unknown Error'}`);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-6 bg-cyber-black relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-10">
        <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-gradient-to-br from-cyber-green/5 via-transparent to-transparent animate-spin-slow origin-center blur-[120px]"></div>
      </div>
      <div className="w-full max-w-md relative z-10 space-y-4">
        <div className="space-y-4 animate-[fadeIn_0.5s_ease-out] w-full max-w-[340px] mx-auto">
          {/* Header Title */}
          <div className="text-center space-y-1 mb-6">
            <h2 className="text-2xl font-orbitron font-black text-white uppercase tracking-tighter leading-tight">
              CREATE YOUR FREE<br /><span className="text-cyber-green">ACCOUNT</span>
            </h2>
            <p className="text-gray-400 font-rajdhani font-bold text-[10px] tracking-widest mt-1 uppercase">STEP 1 OF 3</p>
          </div>

          {/* Email Card Container */}
          <div className="relative group">
            <div className="absolute -inset-[1px] bg-gradient-to-r from-[#39ff14] via-[#00ffff] to-[#d000ff] rounded-[14px] blur-sm opacity-60 group-hover:opacity-100 transition duration-500"></div>

            <div className="relative p-[1.2px] rounded-[14px] bg-gradient-to-r from-[#39ff14] via-[#00ffff] to-[#d000ff]">
              <div className="bg-[#050505] rounded-[13px] p-3.5 space-y-2 h-full relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>

                <h3 className="text-[#39ff14] font-orbitron font-bold text-[10px] tracking-[0.2em] uppercase relative z-10">ENTER EMAIL & PASSWORD</h3>

                <div className="space-y-2 relative z-10">
                  <div className="relative bg-[#0a0a0a] border border-white/10 rounded-lg p-2 flex items-center gap-3 group-focus-within:border-[#39ff14]/50 transition-colors">
                    <div className="w-7 h-7 rounded-full border border-[#39ff14]/40 bg-[#39ff14]/10 flex items-center justify-center shrink-0">
                      <UserCircle size={14} className="text-[#39ff14]" />
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value.toLowerCase())}
                      placeholder="Email"
                      className="flex-1 w-full bg-transparent border-none text-white font-rajdhani font-bold text-base focus:ring-0 outline-none placeholder:text-gray-600 appearance-none lowercase tracking-wide"
                    />
                  </div>
                  <div className="relative bg-[#0a0a0a] border border-white/10 rounded-lg p-2 flex items-center gap-3 group-focus-within:border-[#39ff14]/50 transition-colors">
                    <div className="w-7 h-7 rounded-full border border-[#39ff14]/40 bg-[#39ff14]/10 flex items-center justify-center shrink-0">
                      <Lock size={14} className="text-[#39ff14]" />
                    </div>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password (min 6 chars)"
                      className="flex-1 w-full bg-transparent border-none text-white font-rajdhani font-bold text-base focus:ring-0 outline-none placeholder:text-gray-600 appearance-none tracking-wide"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Next Step Button */}
          <CyberButton
            fullWidth
            onClick={handleEmailSubmit}
            disabled={!email || !password}
            variant="primary"
            className={`h-14 text-base rounded-xl font-black shadow-[0_0_30px_rgba(57,255,20,0.3)] group transition-all duration-300 ${(!email || !password) ? 'opacity-30 grayscale cursor-not-allowed' : 'hover:scale-[1.01] active:scale-95'}`}
          >
            NEXT STEP <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </CyberButton>

          {/* Action Required Alert */}
          {email.length > 0 && (
            <div className="bg-[#241a05] border border-yellow-500/30 rounded-lg p-3 flex items-start gap-3 backdrop-blur-sm animate-[fadeIn_0.3s_ease-out]">
              <AlertTriangle className="text-yellow-400 shrink-0 mt-0.5" size={16} />
              <div className="space-y-0.5 pt-0.5 text-left">
                <h4 className="text-yellow-400 font-orbitron font-black text-[9px] uppercase tracking-widest">ACTION REQUIRED</h4>
                <p className="text-[10px] text-white font-sans leading-tight">Verify your email address after registration to activate full account features.</p>
              </div>
            </div>
          )}

          {/* Divider */}
          <div className="relative py-2 flex items-center justify-center">
            <div className="w-full border-t border-white/10 opacity-40"></div>
            <div className="absolute bg-cyber-black px-4 text-gray-400 font-orbitron font-bold text-[9px] tracking-[0.3em] uppercase">OR</div>
          </div>

          {/* Social Auth */}
          <div className="space-y-4 mb-6">
            <button
              onClick={() => handleProviderLogin('google')}
              className="w-full bg-white text-black font-black font-sans h-12 rounded-lg flex items-center justify-center gap-3 hover:bg-gray-100 transition-all active:scale-[0.98] duration-200 shadow-lg"
            >
              <GoogleLogo />
              <span className="uppercase font-orbitron text-[10px] tracking-widest font-bold">Continue with Google</span>
            </button>
          </div>

          {/* Login Link */}
          <div className="pt-2">
            <button
              onClick={onSwitchToLogin}
              className="w-full bg-cyber-green text-black font-black font-orbitron text-[10px] tracking-[0.15em] h-12 rounded-lg flex items-center justify-center gap-3 border border-transparent shadow-[0_0_15px_rgba(57,255,20,0.3)] transition-all active:scale-[0.96] active:bg-black active:border-cyber-cyan active:text-cyber-cyan duration-200 uppercase group"
            >
              <LogIn size={16} className="group-active:text-cyber-cyan group-hover:scale-110 transition-transform" />
              ALREADY REGISTERED? LOGIN
            </button>
          </div>

          {/* Footer */}
          <p className="text-[9px] text-center text-gray-400 w-full mx-auto leading-relaxed pt-2 font-sans uppercase tracking-tight">
            By continuing, you agree to our <span className="underline text-gray-200 cursor-pointer hover:text-white transition-colors">Terms</span> and <span className="underline text-gray-200 cursor-pointer hover:text-white transition-colors">Privacy Policy</span>.
          </p>
        </div>
      </div>
    </div>
  );
};