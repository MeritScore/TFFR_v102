import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { LoginSimulation } from './components/screens/LoginSimulation';
import { OnboardingScreen } from './components/screens/OnboardingScreen';
import { LoginScreen } from './components/screens/LoginScreen';
import { RecoverPasswordScreen } from './components/screens/RecoverPasswordScreen';
import { SpecialtySelectionScreen } from './components/screens/SpecialtySelectionScreen';
import { AdminGatewayLogin } from './components/screens/AdminGatewayLogin';
import { AdminPersonnelSelect } from './components/screens/AdminPersonnelSelect';
import { AdminLogin } from './components/screens/AdminLogin';
import { FanDashboard } from './components/screens/FanDashboard';
import { MarketplaceScreen } from './components/screens/MarketplaceScreen';
import { NetworkScreen } from './components/screens/NetworkScreen';
import { DealsScreen } from './components/screens/DealsScreen';
import { WalletScreen } from './components/screens/WalletScreen';
import { AdminCommand } from './components/screens/AdminCommand';
import { DashboardDatin } from './components/screens/dashboards/DashboardDatin';
import { AgentDashboard } from './components/screens/dashboards/AgentDashboard';
import { RoleManagementDashboard } from './components/screens/dashboards/RoleManagementDashboard';

import { AdminTeamChat } from './components/screens/AdminTeamChat';
import { TeamCredentialsScreen } from './components/screens/TeamCredentialsScreen';
import { SectionHeader, CyberCard } from './components/ui/CyberComponents';
import { UserRole, Screen } from './types';
import { Bell, CheckCircle2, AlertTriangle } from 'lucide-react';

const App = () => {
  const [role, setRole] = useState<UserRole>(UserRole.GUEST);
  const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.LOGIN);
  const [userProfile, setUserProfile] = useState<{ handle: string, specialty: string }>({ handle: '', specialty: '' });

  const [selectedAdminId, setSelectedAdminId] = useState<string | null>(null);

  const handleRoleSelect = (selectedRole: UserRole) => {
    setRole(selectedRole);
    if (selectedRole === UserRole.ADMIN) {
      setCurrentScreen(Screen.ADMIN_GATEWAY);
    } else {
      setCurrentScreen(Screen.ONBOARDING);
    }
  };

  const handleAuthComplete = (data: { handle: string }) => {
    setUserProfile({ handle: data.handle, specialty: '' });
    setCurrentScreen(Screen.SELECT_SPECIALTY);
  };

  const handleSpecialtyComplete = (data: { specialty: string }) => {
    setUserProfile(prev => ({ ...prev, specialty: data.specialty }));
    setCurrentScreen(Screen.FEED);
  }

  const handlePersonnelSelected = (id: string) => {
    setSelectedAdminId(id);
    setCurrentScreen(Screen.ADMIN_LOGIN);
  };

  // Updated to accept a specific ID (e.g. 'ASSI') passed from the Grid selection
  const handleAdminAccessGranted = (specificAgentId?: string) => {
    // If a specific agent was selected in the grid (e.g. ASSI), use that. 
    // Otherwise fall back to the initial selection (e.g. ARCHY).
    const effectiveId = specificAgentId || selectedAdminId;

    if (!effectiveId) return;

    // Update the selected ID so the Layout header reflects the correct Role (e.g. ASSI)
    if (specificAgentId) {
      setSelectedAdminId(specificAgentId);
    }

    // DIRECT LINKING LOGIC FOR IDENTIFY PERSONNEL PAGE
    switch (effectiveId) {
      // THE 8 AGENTS
      case 'ASSI': setCurrentScreen(Screen.DASH_ASSI); break;
      case 'DESY': setCurrentScreen(Screen.DASH_DESY); break;
      case 'MARK': setCurrentScreen(Screen.DASH_MARK); break;
      case 'HACKY': setCurrentScreen(Screen.DASH_HACKY); break;
      case 'FLOR': setCurrentScreen(Screen.DASH_FLOR); break;
      case 'SIRENA': setCurrentScreen(Screen.DASH_SIRENA); break;
      case 'AI_BROKER': case 'DATIN': setCurrentScreen(Screen.DASH_DATIN); break;
      case 'VIP_AGENT': case 'VIPPY': setCurrentScreen(Screen.DASH_VIPPY); break;

      // OTHER ROLES - ROUTED TO NEW DASHBOARD
      case 'GOD_MODE': setCurrentScreen(Screen.DASH_GOD_MODE); break;
      case 'ARCHY': setCurrentScreen(Screen.DASH_ARCHY); break;
      case 'SPONSOR': setCurrentScreen(Screen.DASH_SPONSOR); break;
      case 'OWNER': setCurrentScreen(Screen.DASH_OWNER); break;
      case 'MANAGER': setCurrentScreen(Screen.DASH_MANAGER); break;
      case 'PROMOTER': setCurrentScreen(Screen.DASH_PROMOTER); break;

      case 'ASSISTANT': setCurrentScreen(Screen.DASH_ASSISTANT); break; // Fallback if still used
      case 'MODERATOR': setCurrentScreen(Screen.DASH_MODERATOR); break; // Fallback if still used
      case 'AI_MANAGER': setCurrentScreen(Screen.DASH_SIRENA); break; // Sirena fallback
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
      case Screen.LOGIN:
        return <LoginSimulation onSelectRole={handleRoleSelect} />;
      case Screen.ADMIN_GATEWAY:
        return (
          <AdminGatewayLogin
            onBack={handleLogout}
            onLoginSuccess={() => setCurrentScreen(Screen.ADMIN_PERSONNEL_SELECT)}
          />
        );
      case Screen.ADMIN_PERSONNEL_SELECT:
        return <AdminPersonnelSelect onSelectPersonnel={handlePersonnelSelected} onBack={handleLogout} />;
      case Screen.ADMIN_LOGIN:
        return (
          <AdminLogin
            targetRole={selectedAdminId || 'ARCHY'}
            onAccessGranted={handleAdminAccessGranted}
            onBack={() => setCurrentScreen(Screen.ADMIN_PERSONNEL_SELECT)}
          />
        );
      case Screen.ONBOARDING:
        return <OnboardingScreen onComplete={handleAuthComplete} onSwitchToLogin={() => setCurrentScreen(Screen.LOGIN_FLOW)} />;
      case Screen.LOGIN_FLOW:
        return <LoginScreen onBack={() => setCurrentScreen(Screen.LOGIN)} onSwitchToSignup={() => setCurrentScreen(Screen.ONBOARDING)} onLoginSuccess={handleAuthComplete} onForgotPassword={() => setCurrentScreen(Screen.RECOVER_PASSWORD)} />;
      case Screen.RECOVER_PASSWORD:
        return <RecoverPasswordScreen onBackToLogin={() => setCurrentScreen(Screen.LOGIN_FLOW)} />;
      case Screen.SELECT_SPECIALTY:
        return <SpecialtySelectionScreen userProfile={userProfile} onComplete={handleSpecialtyComplete} />;
      case Screen.FEED:
        const dashboardProfile = role === UserRole.ADMIN
          ? { handle: selectedAdminId || 'ADMIN', specialty: 'vip' }
          : userProfile;
        return <FanDashboard userProfile={dashboardProfile} />;

      // --- NEW NAVIGATION SCREENS (FROM HIVE MIND) ---
      case Screen.MY_NETWORK:
        return <NetworkScreen />;
      case Screen.DEALS:
        return <DealsScreen />;
      case Screen.NOTIFICATIONS:
        return (
          <div className="space-y-6 animate-[fadeIn_0.3s_ease-out] pb-20">
            <SectionHeader title="NOTIFICATIONS" subtitle="Alerts & Updates" />

            <div className="flex flex-col items-center justify-center py-10 px-6 bg-[#121212] border border-white/10 rounded-2xl shadow-lg">
              <div className="w-14 h-14 rounded-full bg-cyber-purple/10 flex items-center justify-center mb-4 border border-cyber-purple/40 shadow-[0_0_15px_rgba(208,0,255,0.2)]">
                <Bell size={28} className="text-cyber-purple" />
              </div>
              <h3 className="font-orbitron font-bold text-lg text-white tracking-widest mb-2">ALL CAUGHT UP</h3>
              <p className="font-rajdhani font-medium text-base text-gray-300 text-center max-w-xs">
                You have no new notifications at the moment.
              </p>
            </div>

            <div>
              <h4 className="font-orbitron font-bold text-xs text-cyber-cyan uppercase tracking-widest mb-3 pl-1 flex items-center gap-2">
                <div className="w-1 h-1 bg-cyber-cyan rounded-full"></div> RECENT HISTORY
              </h4>

              <div className="space-y-3">
                <div className="bg-[#1a1a1a] p-4 rounded-xl border border-white/5 flex gap-4 items-start hover:border-cyber-green/30 transition-all">
                  <div className="mt-1">
                    <CheckCircle2 size={20} className="text-cyber-green" />
                  </div>
                  <div className="flex-1">
                    <h5 className="font-rajdhani font-bold text-white text-lg leading-none mb-1">Welcome to THE FUN FAN REPORTER</h5>
                    <p className="font-sans text-sm text-gray-200 leading-relaxed">Your account verification is complete. You can now access the Global Chat.</p>
                    <span className="text-[10px] font-mono text-gray-500 mt-2 block">Today, 10:42 AM</span>
                  </div>
                </div>

                <div className="bg-[#1a1a1a] p-4 rounded-xl border border-white/5 flex gap-4 items-start hover:border-yellow-500/30 transition-all">
                  <div className="mt-1">
                    <AlertTriangle size={20} className="text-yellow-500" />
                  </div>
                  <div className="flex-1">
                    <h5 className="font-rajdhani font-bold text-white text-lg leading-none mb-1">System Update</h5>
                    <p className="font-sans text-sm text-gray-200 leading-relaxed">Merit Score calculation has been updated to v2.4.</p>
                    <span className="text-[10px] font-mono text-gray-500 mt-2 block">Yesterday, 14:00 PM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case Screen.MARKET:
        return <MarketplaceScreen />;
      case Screen.WALLET:
        return <WalletScreen />;
      case Screen.ADMIN_TEAM_CHAT:
        return <AdminTeamChat />;
      case Screen.TEAM_CREDENTIALS:
        return <TeamCredentialsScreen onBack={() => setCurrentScreen(Screen.DASH_GOD_MODE)} />;

      // ADMIN ROLE DASHBOARDS
      case Screen.ADMIN_DASH:
        return <AdminCommand adminId={selectedAdminId} onNavigate={setCurrentScreen} />;

      // THE 8 AGENTS - USING THE CLONE DASHBOARD
      case Screen.DASH_DATIN:
        return <DashboardDatin onNavigate={setCurrentScreen} onBack={() => setCurrentScreen(Screen.ADMIN_PERSONNEL_SELECT)} />;

      case Screen.DASH_ASSI:
        return <AgentDashboard agentId="ASSI" onNavigate={setCurrentScreen} onBack={() => setCurrentScreen(Screen.ADMIN_PERSONNEL_SELECT)} />;
      case Screen.DASH_DESY:
        return <AgentDashboard agentId="DESY" onNavigate={setCurrentScreen} onBack={() => setCurrentScreen(Screen.ADMIN_PERSONNEL_SELECT)} />;
      case Screen.DASH_MARK:
        return <AgentDashboard agentId="MARK" onNavigate={setCurrentScreen} onBack={() => setCurrentScreen(Screen.ADMIN_PERSONNEL_SELECT)} />;
      case Screen.DASH_HACKY:
        return <AgentDashboard agentId="HACKY" onNavigate={setCurrentScreen} onBack={() => setCurrentScreen(Screen.ADMIN_PERSONNEL_SELECT)} />;
      case Screen.DASH_FLOR:
        return <AgentDashboard agentId="FLOR" onNavigate={setCurrentScreen} onBack={() => setCurrentScreen(Screen.ADMIN_PERSONNEL_SELECT)} />;
      case Screen.DASH_SIRENA:
        return <AgentDashboard agentId="SIRENA" onNavigate={setCurrentScreen} onBack={() => setCurrentScreen(Screen.ADMIN_PERSONNEL_SELECT)} />;
      case Screen.DASH_VIPPY:
        return <AgentDashboard agentId="VIPPY" onNavigate={setCurrentScreen} onBack={() => setCurrentScreen(Screen.ADMIN_PERSONNEL_SELECT)} />;
      case Screen.DASH_ARCHY:
        return <AgentDashboard agentId="ARCHY" onNavigate={setCurrentScreen} onBack={() => setCurrentScreen(Screen.ADMIN_PERSONNEL_SELECT)} />;

      case Screen.DASH_GUIDE: // AI SUPPORT
        return <AgentDashboard agentId="AI_SUPPORT" onNavigate={setCurrentScreen} onBack={() => setCurrentScreen(Screen.ADMIN_PERSONNEL_SELECT)} />;

      // SPECIFIC HUMAN ROLES (NEW MANAGEMENT DASHBOARDS)
      case Screen.DASH_SPONSOR:
        return <RoleManagementDashboard roleType="SPONSOR" onNavigate={setCurrentScreen} onBack={() => setCurrentScreen(Screen.ADMIN_PERSONNEL_SELECT)} />;
      case Screen.DASH_OWNER:
        return <RoleManagementDashboard roleType="OWNER" onNavigate={setCurrentScreen} onBack={() => setCurrentScreen(Screen.ADMIN_PERSONNEL_SELECT)} />;
      case Screen.DASH_MANAGER:
        return <RoleManagementDashboard roleType="MANAGER" onNavigate={setCurrentScreen} onBack={() => setCurrentScreen(Screen.ADMIN_PERSONNEL_SELECT)} />;
      case Screen.DASH_PROMOTER:
        return <RoleManagementDashboard roleType="PROMOTER" onNavigate={setCurrentScreen} onBack={() => setCurrentScreen(Screen.ADMIN_PERSONNEL_SELECT)} />;

      // Fallback for others (God Mode etc still use Command Center)
      case Screen.DASH_GOD_MODE:
      case Screen.DASH_ASSISTANT:
      case Screen.DASH_MODERATOR:
        return <AdminCommand adminId={selectedAdminId} onNavigate={setCurrentScreen} />;

      default:
        return <LoginSimulation onSelectRole={handleRoleSelect} />;
    }
  };

  const isFullScreen = [
    Screen.LOGIN, Screen.ONBOARDING, Screen.LOGIN_FLOW,
    Screen.ADMIN_GATEWAY, Screen.ADMIN_PERSONNEL_SELECT, Screen.ADMIN_LOGIN,
    Screen.RECOVER_PASSWORD, Screen.SELECT_SPECIALTY, Screen.TEAM_CREDENTIALS
  ].includes(currentScreen);

  // Determine if we need a custom role label for the header
  const getRoleLabel = () => {
    if (currentScreen === Screen.DASH_DATIN) return 'DATIN';
    if (currentScreen === Screen.DASH_ASSI) return 'ASSI';
    if (currentScreen === Screen.DASH_DESY) return 'DESY';
    if (currentScreen === Screen.DASH_MARK) return 'MARK';
    if (currentScreen === Screen.DASH_HACKY) return 'HACKY';
    if (currentScreen === Screen.DASH_FLOR) return 'FLOR';
    if (currentScreen === Screen.DASH_SIRENA) return 'SIRENA';
    if (currentScreen === Screen.DASH_VIPPY) return 'VIPPY';
    if (currentScreen === Screen.DASH_ARCHY) return 'ARCHY';
    if (currentScreen === Screen.DASH_SPONSOR) return 'SPONSOR';
    if (currentScreen === Screen.DASH_OWNER) return 'OWNER';
    if (currentScreen === Screen.DASH_MANAGER) return 'MANAGER';
    if (currentScreen === Screen.DASH_PROMOTER) return 'PROMOTER';

    // Fallback to selectedAdminId if it matches a known agent
    if (['ASSI', 'DESY', 'MARK', 'HACKY', 'FLOR', 'SIRENA', 'VIPPY', 'DATIN', 'ARCHY', 'SPONSOR', 'OWNER', 'MANAGER', 'PROMOTER'].includes(selectedAdminId || '')) {
      return selectedAdminId!;
    }
    return undefined;
  };

  return (
    <div className="min-h-screen bg-[#09090b] flex items-center justify-center p-4 sm:p-8 font-sans">
      <div className="w-full max-w-md relative group transform-gpu">
        <div className="absolute -inset-[3px] bg-gradient-to-b from-[#39ff14] via-[#00ffff] to-[#d000ff] rounded-[24px] blur-md opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>
        <div className="relative p-[2px] rounded-[24px] bg-gradient-to-b from-[#39ff14] via-[#00ffff] to-[#d000ff] shadow-2xl">
          <div className="bg-cyber-black rounded-[22px] overflow-hidden min-h-[800px] max-h-[90vh] relative flex flex-col shadow-inner overflow-y-auto no-scrollbar scroll-smooth">
            {isFullScreen ? (
              renderScreen()
            ) : (
              <Layout
                currentScreen={currentScreen}
                userRole={role}
                roleLabel={getRoleLabel()}
                onNavigate={setCurrentScreen}
                onLogout={handleLogout}
              >
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