import React, { useState } from 'react';
import { CyberButton, CyberCard } from '../ui/CyberComponents';
import { Lock, X, ShieldAlert } from 'lucide-react';
import { FirebaseClient } from '../../api/FirebaseClient';

interface Props {
    onBack: () => void;
    onLoginSuccess: (data: { handle: string, role: string }) => void;
}

export const AdminGatewayLogin: React.FC<Props> = ({ onBack, onLoginSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleAdminLogin = async () => {
        if (!email || !password) return;
        setIsLoading(true);
        setErrorMsg('');
        try {
            const { idToken } = await FirebaseClient.loginWithEmail(email, password);
            // Let the backend verify the token and return the user profile.
            // If the email is valid, it will authenticate.
            const { user } = await FirebaseClient.authenticateWithBackend(idToken);

            // Basic Frontend Security Check: We enforce that standard USERs cannot pass the gateway.
            // The backend will also strictly enforce roles for actual API logic,
            // but this UX check prevents pure UI spoofing.
            if (user.role === 'USER' || user.role === 'GUEST') {
                throw new Error("Standard users are not permitted in the Secure Terminal.");
            }

            // If they passed, let them into the Inner Sanctum (Personnel Grid)
            onLoginSuccess({ handle: user.username, role: user.role });
        } catch (error: any) {
            console.error('Admin Gateway Login Failed', error);
            setErrorMsg('ACCESS DENIED: ' + (error.message || 'Invalid Credentials'));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4 py-6 bg-black relative overflow-hidden font-sans">
            {/* Red Background Elements for Admin vibe */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
                <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-gradient-to-br from-red-900/40 via-transparent to-transparent animate-spin-slow origin-center blur-[120px]"></div>
            </div>

            <div className="w-full max-w-sm relative z-20">
                <div className="flex justify-end mb-2">
                    <button
                        onClick={onBack}
                        title="Close"
                        className="w-10 h-10 rounded-full bg-red-900/20 border border-red-900/50 flex items-center justify-center text-red-500 hover:text-red-400 hover:bg-red-900/40 transition-all"
                    >
                        <X size={20} />
                    </button>
                </div>

                <CyberCard glow="red">
                    <div className="text-center space-y-4 mb-6 mt-4">
                        <div className="flex justify-center">
                            <div className="p-3 bg-red-900/20 rounded-full border border-red-500/30 animate-pulse">
                                <ShieldAlert size={36} className="text-red-500" />
                            </div>
                        </div>
                        <div>
                            <h1 className="text-2xl font-orbitron font-black text-white uppercase tracking-widest drop-shadow-lg">
                                SECURE GATEWAY
                            </h1>
                            <p className="text-[10px] text-red-400 font-mono tracking-widest mt-2 uppercase">
                                RESTRICTED PERSONNEL ONLY
                            </p>
                        </div>
                    </div>

                    <div className="space-y-4 mb-6">
                        {errorMsg && (
                            <div className="bg-red-900/50 border border-red-500 text-red-200 text-xs p-3 rounded-lg font-mono text-center">
                                {errorMsg}
                            </div>
                        )}

                        <div className="space-y-3">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value.toLowerCase())}
                                placeholder="Secure Email ID"
                                className="w-full bg-gray-900 border border-red-900/50 rounded-lg px-4 py-3 text-red-100 font-mono focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500/50 transition-all placeholder:text-red-900/50"
                            />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Passphrase"
                                className="w-full bg-gray-900 border border-red-900/50 rounded-lg px-4 py-3 text-red-100 font-mono focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500/50 transition-all placeholder:text-red-900/50"
                            />
                        </div>

                        <CyberButton
                            fullWidth
                            onClick={handleAdminLogin}
                            disabled={!email || !password || isLoading}
                            className={`!rounded-xl !bg-red-600 hover:!bg-red-500 shadow-[0_0_20px_rgba(220,38,38,0.4)] ${(!email || !password || isLoading) ? 'opacity-50' : ''}`}
                        >
                            <div className="flex items-center justify-center gap-2">
                                <Lock size={16} className={isLoading ? "animate-pulse" : ""} />
                                <span className="font-orbitron tracking-widest font-bold">
                                    {isLoading ? 'VERIFYING...' : 'INITIATE HANDSHAKE'}
                                </span>
                            </div>
                        </CyberButton>
                    </div>
                </CyberCard>

                <div className="text-center mt-6">
                    <p className="text-[9px] text-red-500/50 font-mono uppercase tracking-widest">
                        UNAUTHORIZED ACCESS WILL BE LOGGED
                    </p>
                </div>
            </div>
        </div>
    );
};
