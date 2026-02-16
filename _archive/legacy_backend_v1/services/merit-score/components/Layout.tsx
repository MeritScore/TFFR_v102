import React from 'react';
import { UserRole, Screen } from '../types';
import { MessageSquare, Gavel, Wallet, Grid, LogOut, Users, Network, Tag, Bell } from 'lucide-react';

export const Layout = ({ children, currentScreen, userRole, roleLabel, onNavigate, onLogout }: {
  children?: React.ReactNode,
  currentScreen: Screen,
  userRole: UserRole,
  roleLabel?: string,
  onNavigate: (s: Screen) => void,
  onLogout: () => void
}) => {
  const navItems = userRole === UserRole.ADMIN
    ? [
      { id: Screen.ADMIN_TEAM_CHAT, label: 'TEAM CHAT', icon: Users },
      { id: Screen.ADMIN_DASH, label: 'COMMAND', icon: Grid },
      { id: Screen.FEED, label: 'THE FUN FAN REPORTER CHAT', icon: MessageSquare }, // Public Feed Access
    ]
    : [
      { id: Screen.FEED, label: 'CHAT', icon: MessageSquare },
      { id: Screen.MY_NETWORK, label: 'NETWORK', icon: Network },
      { id: Screen.DEALS, label: 'DEALS', icon: Tag },
      { id: Screen.MARKET, label: 'MARKET', icon: Gavel },
      { id: Screen.WALLET, label: 'WALLET', icon: Wallet },
      { id: Screen.NOTIFICATIONS, label: 'ALERTS', icon: Bell },
    ];

  return (
    <div className="min-h-screen relative flex flex-col bg-cyber-black">
      {/* Header - Sticky within the mobile container */}
      <header className="sticky top-0 z-50 bg-cyber-black/90 backdrop-blur-md border-b border-gray-800 h-16 w-full">
        <div className="h-full px-4 flex items-center justify-between">

          {/* BRAND IDENTITY: THE FUN FAN REPORTER */}
          <div className="flex items-center gap-3">
            {/* Cool Modern Diagonal Line */}
            <div className="w-1.5 h-8 bg-cyber-green skew-x-12 shadow-[0_0_10px_#39ff14]"></div>

            <div className="flex flex-row items-baseline gap-2">
              <span className="font-orbitron font-bold text-sm tracking-[0.2em] leading-none pointer-events-none">
                <span className="text-white">THE </span>
                <span className="text-cyber-green drop-shadow-[0_0_15px_rgba(57,255,20,0.6)]">FUN </span>
                <span className="text-white">FAN </span>
                <span className="text-cyber-green drop-shadow-[0_0_15px_rgba(57,255,20,0.6)]">REPORTER</span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-[10px] text-gray-500 font-mono uppercase">Role</p>
              <p className="text-xs font-bold text-cyber-cyan">{roleLabel || userRole}</p>
            </div>
            <button onClick={onLogout} className="p-2 text-gray-500 hover:text-red-500 transition-colors" aria-label="Logout">
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full p-4 pb-24">
        {children}
      </main>

      {/* Bottom Navigation - Fixed to viewport bottom BUT constrained to mobile width */}
      {userRole !== UserRole.GUEST && (
        <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto h-20 bg-cyber-black/95 backdrop-blur-lg border-t border-gray-800 z-50 pb-4">
          <div className="h-full flex items-center justify-around px-2">
            {navItems.map((item) => {
              const isActive = currentScreen === item.id || (item.id === Screen.ADMIN_DASH && (currentScreen as string).startsWith('DASH_'));
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`relative flex flex-col items-center justify-center w-20 h-full transition-all duration-300 ${isActive ? 'text-cyber-green' : 'text-gray-500 hover:text-gray-300'}`}
                >
                  {isActive && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-cyber-green shadow-[0_0_10px_#39ff14]"></div>
                  )}
                  <div className={`p-1 rounded-lg ${isActive ? 'scale-110 drop-shadow-[0_0_5px_rgba(57,255,20,0.5)]' : ''}`}>
                    <Icon strokeWidth={isActive ? 2.5 : 1.5} size={24} />
                  </div>
                  {/* FORCED SINGLE LINE: whitespace-nowrap and tracking adjustment */}
                  <span className={`text-[9px] font-orbitron mt-1 whitespace-nowrap tracking-tight ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </nav>
      )}
    </div>
  );
};