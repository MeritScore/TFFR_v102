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
      { id: Screen.FEED, label: 'TFFR CHAT', icon: MessageSquare },
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
      <header className="sticky top-0 z-50 bg-cyber-black/90 backdrop-blur-md border-b border-gray-800 h-16 w-full">
        <div className="h-full px-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-8 bg-cyber-green skew-x-12 shadow-[0_0_10px_#39ff14]"></div>
            <div className="flex flex-col justify-center">
              <div className="flex items-baseline gap-1 leading-none">
                <span className="font-orbitron font-bold text-[10px] text-white tracking-widest">THE</span>
                <span className="font-orbitron font-bold text-[10px] text-cyber-green tracking-widest drop-shadow-[0_0_5px_#39ff14cc]">FUN</span>
                <span className="font-orbitron font-bold text-[10px] text-white tracking-widest">FAN</span>
              </div>
              <span className="font-orbitron font-bold text-base text-cyber-green tracking-widest leading-none -mt-0.5 drop-shadow-[0_0_8px_#39ff1499]">REPORTER</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={onLogout} className="p-2 text-gray-500 hover:text-red-500 transition-colors"><LogOut size={20} /></button>
          </div>
        </div>
      </header>
      <main className="flex-1 w-full p-4 pb-24">{children}</main>
      {userRole !== UserRole.GUEST && (
        <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto h-20 bg-cyber-black/95 backdrop-blur-lg border-t border-gray-800 z-50 pb-4">
          <div className="h-full flex items-center justify-between px-1">
            {navItems.map((item) => {
              const isActive = currentScreen === item.id || (item.id === Screen.ADMIN_DASH && (currentScreen as string).startsWith('DASH_'));
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`relative flex flex-1 flex-col items-center justify-center h-full transition-all duration-300 min-w-0 ${isActive ? 'text-cyber-green' : 'text-gray-300 hover:text-white'}`}
                >
                  {isActive && <div className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-1 bg-cyber-green shadow-[0_0_10px_#39ff14]"></div>}
                  <div className={`p-1 rounded-lg ${isActive ? 'scale-110 drop-shadow-[0_0_5px_#39ff1480]' : ''}`}>
                    <Icon strokeWidth={isActive ? 2.5 : 2} size={20} />
                  </div>
                  <span className={`text-[9px] font-sans font-bold mt-1 whitespace-nowrap tracking-wide ${isActive ? 'opacity-100' : 'opacity-90'}`}>
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