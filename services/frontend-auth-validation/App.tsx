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
import { RoleManagementDashboard } from './components/screens/dashboards/RoleManagementDashboard';
import { AdminTeamChat } from './components/screens/AdminTeamChat';
import { UserRole, Screen } from './types';

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
      case 'VIP_AGENT': case 'VIPY': setCurrentScreen(Screen.DASH_VIPY); break;
      
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
      case Screen.MARKET:
        return <MarketplaceScreen />;
      case Screen.WALLET:
        return <WalletScreen />;
      case Screen.ADMIN_TEAM_CHAT:
        return <AdminTeamChat />;
      
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
      case Screen.DASH_VIPY:
        return <AgentDashboard agentId="VIPY" onNavigate={setCurrentScreen} onBack={() => setCurrentScreen(Screen.ADMIN_PERSONNEL_SELECT)} />;
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
    Screen.ADMIN_PERSONNEL_SELECT, Screen.ADMIN_LOGIN, 
    Screen.RECOVER_PASSWORD, Screen.SELECT_SPECIALTY
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
    if (currentScreen === Screen.DASH_VIPY) return 'VIPY';
    if (currentScreen === Screen.DASH_ARCHY) return 'ARCHY';
    if (currentScreen === Screen.DASH_SPONSOR) return 'SPONSOR';
    if (currentScreen === Screen.DASH_OWNER) return 'OWNER';
    if (currentScreen === Screen.DASH_MANAGER) return 'MANAGER';
    if (currentScreen === Screen.DASH_PROMOTER) return 'PROMOTER';
    
    // Fallback to selectedAdminId if it matches a known agent
    if (['ASSI', 'DESY', 'MARK', 'HACKY', 'FLOR', 'SIRENA', 'VIPY', 'DATIN', 'ARCHY', 'SPONSOR', 'OWNER', 'MANAGER', 'PROMOTER'].includes(selectedAdminId || '')) {
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