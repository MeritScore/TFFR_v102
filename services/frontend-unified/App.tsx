import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { LoginSimulation } from './components/screens/LoginSimulation';
import { OnboardingScreen } from './components/screens/OnboardingScreen';
import { LoginScreen } from './components/screens/LoginScreen';
import { RecoverPasswordScreen } from './components/screens/RecoverPasswordScreen';
import { SpecialtySelectionScreen } from './components/screens/SpecialtySelectionScreen';
import { AdminPersonnelSelect } from './components/screens/AdminPersonnelSelect';
import { AdminLogin } from './components/screens/AdminLogin';
import { FanDashboard } from './components/screens/FanDashboard';
import { MarketplaceScreen } from './components/screens/MarketplaceScreen';
import { WalletScreen } from './components/screens/WalletScreen';
import { AdminCommand } from './components/screens/AdminCommand';
import { DashboardDatin } from './components/screens/dashboards/DashboardDatin';
import { AgentDashboard } from './components/screens/dashboards/AgentDashboard';
import { AdminTeamChat } from './components/screens/AdminTeamChat';
import { NetworkScreen } from './components/screens/NetworkScreen';
import { DealsScreen } from './components/screens/DealsScreen';
import { SectionHeader, CyberCard } from './components/ui/CyberComponents';
import { UserRole, Screen } from './types';
import { Bell, CheckCircle2 } from 'lucide-react';

const App = () => {
  const [role, setRole] = useState<UserRole>(UserRole.GUEST);
  const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.LOGIN);
  const [userProfile, setUserProfile] = useState<{ handle: string, specialty: string }>({ handle: '', specialty: '' });
  const [selectedAdminId, setSelectedAdminId] = useState<string | null>(null);

  const handleRoleSelect = (selectedRole: UserRole) => {
    setRole(selectedRole);
    if (selectedRole === UserRole.ADMIN) {
      setCurrentScreen(Screen.ADMIN_PERSONNEL_SELECT);
    } else {
      setCurrentScreen(Screen.ONBOARDING);
    }
  };

  const handleAuthComplete = (data: { handle: string }) => {
    setUserProfile({ handle: data.handle, specialty: '' });
    setCurrentScreen(Screen.SELECT_SPECIALTY);
  };

  const handleSpecialtyComplete = (data: { specialty: string }) => {
    setUserProfile(prev => ({...prev, specialty: data.specialty}));
    setCurrentScreen(Screen.FEED);
  }

  const handlePersonnelSelected = (id: string) => {
    setSelectedAdminId(id);
    setCurrentScreen(Screen.ADMIN_LOGIN);
  };

  const handleAdminAccessGranted = () => {
    if (!selectedAdminId) return;
    switch (selectedAdminId) {
      case 'ASSI': setCurrentScreen(Screen.DASH_ASSI); break;
      case 'DESY': setCurrentScreen(Screen.DASH_DESY); break;
      case 'MARK': setCurrentScreen(Screen.DASH_MARK); break;
      case 'HACKY': setCurrentScreen(Screen.DASH_HACKY); break;
      case 'FLOR': setCurrentScreen(Screen.DASH_FLOR); break;
      case 'SIRENA': setCurrentScreen(Screen.DASH_SIRENA); break;
      case 'AI_BROKER': case 'DATIN': setCurrentScreen(Screen.DASH_DATIN); break;
      case 'VIP_AGENT': case 'VIPY': setCurrentScreen(Screen.DASH_VIPY); break;
      case 'GOD_MODE': setCurrentScreen(Screen.DASH_GOD_MODE); break;
      case 'ARCHY': setCurrentScreen(Screen.DASH_ARCHY); break;
      case 'SPONSOR': setCurrentScreen(Screen.DASH_SPONSOR); break;
      case 'OWNER': setCurrentScreen(Screen.DASH_OWNER); break;
      case 'MANAGER': setCurrentScreen(Screen.DASH_MANAGER); break;
      case 'PROMOTER': setCurrentScreen(Screen.DASH_PROMOTER); break;
      case 'ASSISTANT': setCurrentScreen(Screen.DASH_ASSISTANT); break;
      case 'MODERATOR': setCurrentScreen(Screen.DASH_MODERATOR); break;
      case 'AI_MANAGER': setCurrentScreen(Screen.DASH_SIRENA); break;
      case 'AI_SUPPORT': setCurrentScreen(Screen.DASH_GUIDE); break;
      default: setCurrentScreen(Screen.DASH_GOD_MODE);
    }
  };

  const handleLogout = () => {
    setRole(UserRole.GUEST);
    setCurrentScreen(Screen.LOGIN);
    setUserProfile({ handle: '', specialty: '' });
    setSelectedAdminId(null);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case Screen.LOGIN: return <LoginSimulation onSelectRole={handleRoleSelect} />;
      case Screen.ADMIN_PERSONNEL_SELECT: return <AdminPersonnelSelect onSelectPersonnel={handlePersonnelSelected} onBack={handleLogout} />;
      case Screen.ADMIN_LOGIN: return <AdminLogin targetRole={selectedAdminId || 'ARCHY'} onAccessGranted={handleAdminAccessGranted} onBack={() => setCurrentScreen(Screen.ADMIN_PERSONNEL_SELECT)} />;
      case Screen.ONBOARDING: return <OnboardingScreen onComplete={handleAuthComplete} onSwitchToLogin={() => setCurrentScreen(Screen.LOGIN_FLOW)} />;
      case Screen.LOGIN_FLOW: return <LoginScreen onBack={() => setCurrentScreen(Screen.LOGIN)} onSwitchToSignup={() => setCurrentScreen(Screen.ONBOARDING)} onLoginSuccess={handleAuthComplete} onForgotPassword={() => setCurrentScreen(Screen.RECOVER_PASSWORD)} />;
      case Screen.RECOVER_PASSWORD: return <RecoverPasswordScreen onBackToLogin={() => setCurrentScreen(Screen.LOGIN_FLOW)} />;
      case Screen.SELECT_SPECIALTY: return <SpecialtySelectionScreen userProfile={userProfile} onComplete={handleSpecialtyComplete} />;
      case Screen.FEED: 
        const dashboardProfile = role === UserRole.ADMIN ? { handle: selectedAdminId || 'ADMIN', specialty: 'vip' } : userProfile;
        return <FanDashboard userProfile={dashboardProfile} />;
      case Screen.MY_NETWORK: return <NetworkScreen />;
      case Screen.DEALS: return <DealsScreen />;
      case Screen.NOTIFICATIONS:
         return (
          <div className="space-y-6 animate-[fadeIn_0.3s_ease-out] pb-20">
            <SectionHeader title="NOTIFICATIONS" subtitle="Alerts & Updates" />
            <div className="flex flex-col items-center justify-center py-10 px-6 bg-[#121212] border border-white/10 rounded-2xl shadow-lg">
               <div className="w-14 h-14 rounded-full bg-cyber-purple/10 flex items-center justify-center mb-4 border border-cyber-purple/40 shadow-[0_0_15px_rgba(208,0,255,0.2)]">
                  <Bell size={28} className="text-cyber-purple" />
               </div>
               <h3 className="font-orbitron font-bold text-lg text-white tracking-widest mb-2">ALL CAUGHT UP</h3>
               <p className="font-rajdhani font-medium text-base text-gray-300 text-center max-w-xs">You have no new notifications at the moment.</p>
            </div>
            <div>
               <h4 className="font-orbitron font-bold text-xs text-cyber-cyan uppercase tracking-widest mb-3 pl-1 flex items-center gap-2">
                  <div className="w-1 h-1 bg-cyber-cyan rounded-full"></div> RECENT HISTORY
               </h4>
               <div className="space-y-3">
                  <div className="bg-[#1a1a1a] p-4 rounded-xl border border-white/5 flex gap-4 items-start hover:border-cyber-green/30 transition-all">
                     <div className="mt-1"><CheckCircle2 size={20} className="text-cyber-green" /></div>
                     <div className="flex-1">
                        <h5 className="font-rajdhani font-bold text-white text-lg leading-none mb-1">Welcome to THE FUN FAN REPORTER</h5>
                        <p className="font-sans text-sm text-gray-200 leading-relaxed">Your account verification is complete. You can now access the Global Chat.</p>
                        <span className="text-[10px] font-mono text-gray-500 mt-2 block">Today, 10:42 AM</span>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        );
      case Screen.MARKET: return <MarketplaceScreen />;
      case Screen.WALLET: return <WalletScreen />;
      case Screen.ADMIN_TEAM_CHAT: return <AdminTeamChat />;
      case Screen.DASH_DATIN: return <DashboardDatin onNavigate={setCurrentScreen} onBack={() => setCurrentScreen(Screen.ADMIN_PERSONNEL_SELECT)} />;
      case Screen.DASH_ASSI: return <AgentDashboard agentId="ASSI" onNavigate={setCurrentScreen} onBack={() => setCurrentScreen(Screen.ADMIN_PERSONNEL_SELECT)} />;
      case Screen.DASH_DESY: return <AgentDashboard agentId="DESY" onNavigate={setCurrentScreen} onBack={() => setCurrentScreen(Screen.ADMIN_PERSONNEL_SELECT)} />;
      case Screen.DASH_MARK: return <AgentDashboard agentId="MARK" onNavigate={setCurrentScreen} onBack={() => setCurrentScreen(Screen.ADMIN_PERSONNEL_SELECT)} />;
      case Screen.DASH_HACKY: return <AgentDashboard agentId="HACKY" onNavigate={setCurrentScreen} onBack={() => setCurrentScreen(Screen.ADMIN_PERSONNEL_SELECT)} />;
      case Screen.DASH_FLOR: return <AgentDashboard agentId="FLOR" onNavigate={setCurrentScreen} onBack={() => setCurrentScreen(Screen.ADMIN_PERSONNEL_SELECT)} />;
      case Screen.DASH_SIRENA: return <AgentDashboard agentId="SIRENA" onNavigate={setCurrentScreen} onBack={() => setCurrentScreen(Screen.ADMIN_PERSONNEL_SELECT)} />;
      case Screen.DASH_VIPY: return <AgentDashboard agentId="VIPY" onNavigate={setCurrentScreen} onBack={() => setCurrentScreen(Screen.ADMIN_PERSONNEL_SELECT)} />;
      case Screen.DASH_GUIDE: return <AgentDashboard agentId="AI_SUPPORT" onNavigate={setCurrentScreen} onBack={() => setCurrentScreen(Screen.ADMIN_PERSONNEL_SELECT)} />;
      default: return <AdminCommand adminId={selectedAdminId} onNavigate={setCurrentScreen} />;
    }
  };

  const isFullScreen = [
    Screen.LOGIN, Screen.ONBOARDING, Screen.LOGIN_FLOW, 
    Screen.ADMIN_PERSONNEL_SELECT, Screen.ADMIN_LOGIN, 
    Screen.RECOVER_PASSWORD, Screen.SELECT_SPECIALTY
  ].includes(currentScreen);

  return (
    <div className="min-h-screen bg-[#09090b] flex items-center justify-center p-4 sm:p-8 font-sans">
      <div className="w-full max-w-md relative group transform-gpu">
        <div className="absolute -inset-[3px] bg-gradient-to-b from-[#39ff14] via-[#00ffff] to-[#d000ff] rounded-[24px] blur-md opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>
        <div className="relative p-[2px] rounded-[24px] bg-gradient-to-b from-[#39ff14] via-[#00ffff] to-[#d000ff] shadow-2xl">
          <div className="bg-cyber-black rounded-[22px] overflow-hidden min-h-[800px] max-h-[90vh] relative flex flex-col shadow-inner overflow-y-auto no-scrollbar scroll-smooth">
            {isFullScreen ? renderScreen() : (
              <Layout currentScreen={currentScreen} userRole={role} roleLabel={selectedAdminId || undefined} onNavigate={setCurrentScreen} onLogout={handleLogout}>
                {renderScreen()}
              </Layout>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default App;