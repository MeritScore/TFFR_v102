import React from 'react';

export interface CyberCardProps {
  children?: React.ReactNode;
  className?: string;
  glow?: 'green' | 'cyan' | 'purple' | 'none';
  onClick?: () => void;
  padding?: string;
}

export const CyberCard: React.FC<CyberCardProps> = ({ children, className = '', glow = 'none', onClick, padding = 'p-4' }) => {
  const glowClass = {
    green: 'shadow-neon-green',
    cyan: 'shadow-neon-cyan',
    purple: 'shadow-purple-500/50',
    none: ''
  }[glow];

  return (
    <div className={`relative group ${className} ${onClick ? 'cursor-pointer active:scale-[0.99] transition-transform duration-200' : ''}`} onClick={onClick}>
      <div className={`p-[2px] rounded-lg bg-metallic-gradient ${glowClass} transition-shadow duration-300`}>
        <div className="relative bg-cyber-black rounded-md h-full w-full overflow-hidden shadow-inset-deep">
          <div className="absolute top-0 left-0 right-0 h-1/3 bg-shine-gradient opacity-40 pointer-events-none z-10"></div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none mix-blend-overlay"></div>
          <div className={`relative z-20 ${padding}`}>{children}</div>
        </div>
      </div>
    </div>
  );
};

export const CyberButton = ({ children, variant = 'primary', fullWidth = false, className = '', ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'danger', fullWidth?: boolean }) => {
  const variants = {
    primary: 'bg-cyber-green text-black border border-transparent active:bg-black active:text-cyber-cyan active:border-cyber-cyan',
    secondary: 'bg-cyan-500 text-black border-none',
    danger: 'bg-red-600 text-white border-none',
  };
  const glowColor = {
    primary: 'shadow-[0_0_25px_rgba(57,255,20,0.6)] hover:shadow-[0_0_35px_rgba(57,255,20,0.8)]',
    secondary: 'shadow-[0_0_20px_rgba(0,255,255,0.5)]',
    danger: 'shadow-[0_0_20px_rgba(255,0,0,0.5)]',
  };

  return (
    <button
      className={`relative group overflow-hidden rounded-md transition-all duration-200 transform hover:-translate-y-1 hover:scale-[1.02] active:scale-[0.98] ${fullWidth ? 'w-full' : ''} ${variants[variant]} ${glowColor[variant]} ${className}`}
      {...props}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-12 -translate-x-full group-hover:animate-[shimmer_0.75s_infinite] pointer-events-none"></div>
      <div className="relative px-5 py-3 flex items-center justify-center h-full">
        <span className="font-orbitron font-black tracking-widest uppercase flex items-center gap-2 text-base">{children}</span>
      </div>
    </button>
  );
};

export const IsotypeTheFunFanReporter = React.forwardRef<SVGSVGElement, any>((props, ref) => {
  const mainColor = props.color || '#39ff14';
  const PERSON_POSITIONS = [
    { x: 74, y: 72 }, { x: 84, y: 72 }, { x: 74, y: 82 }, { x: 84, y: 82 },
    { x: 74, y: 92 }, { x: 84, y: 92 }, { x: 74, y: 102 }, { x: 84, y: 102 },
    { x: 74, y: 112 }, { x: 84, y: 112 }, { x: 74, y: 122 }, { x: 84, y: 122 },
    { x: 74, y: 132 }, { x: 84, y: 132 }, { x: 74, y: 142 }, { x: 84, y: 142 },
    { x: 94, y: 72 }, { x: 104, y: 72 }, { x: 114, y: 72 },
    { x: 94, y: 82 }, { x: 104, y: 82 }, { x: 114, y: 82 },
    { x: 94, y: 102 }, { x: 104, y: 102 }, { x: 94, y: 112 }, { x: 104, y: 112 },
  ];

  return (
    <svg ref={ref} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className={`${props.className || 'w-full h-full'} ${!props.noGlow ? 'animate-float' : ''}`}>
      <defs>
        <g id="person-unit">
          <circle cx="0" cy="-3" r="2.2" fill="none" stroke={mainColor} strokeWidth="2.8" />
          <path d="M -3.5 3.5 Q 0 -1 3.5 3.5" fill="none" stroke={mainColor} strokeWidth="2.8" strokeLinecap="round" />
        </g>
      </defs>
      <circle cx="100" cy="100" r="92" fill="none" stroke={mainColor} strokeWidth="5" className="opacity-80" />
      <g transform="translate(100, 100) scale(0.9) translate(-116, -86)">
        {PERSON_POSITIONS.map((pos, i) => (
          <use key={i} href="#person-unit" x={pos.x} y={pos.y} className="animate-pulse" style={{ animationDelay: `${i * 0.03}s` }} />
        ))}
        <g transform="translate(119, 67) rotate(-45)" stroke={mainColor} strokeWidth="7.5" strokeLinecap="round" fill="none">
          <path d="M 6 -12 A 13 13 0 0 1 6 12" opacity="0.4" />
          <path d="M 20 -23 A 29 29 0 0 1 20 23" opacity="0.7" />
          <path d="M 34 -36 A 48 48 0 0 1 34 36" />
        </g>
      </g>
    </svg>
  );
});

export const CyberBadge = ({ label, color }: { label: string, color: string }) => (
  <span className="px-2 py-0.5 text-xs font-rajdhani font-bold border border-current rounded tracking-widest uppercase backdrop-blur-sm" style={{ color: color, boxShadow: `0 0 8px ${color}, inset 0 0 5px ${color}33` }}>{label}</span>
);

export const SectionHeader = ({ title, subtitle }: { title: string, subtitle?: string }) => (
  <div className="mb-6 relative">
    <h2 className="text-2xl font-orbitron font-bold text-white drop-shadow-[0_0_5px_#ffffff80]">{title}</h2>
    {subtitle && <p className="text-gray-400 text-sm font-sans">{subtitle}</p>}
    <div className="h-[2px] w-full bg-gradient-to-r from-cyber-cyan via-cyber-purple to-transparent mt-2 shadow-[0_0_10px_#00ffff]"></div>
  </div>
);