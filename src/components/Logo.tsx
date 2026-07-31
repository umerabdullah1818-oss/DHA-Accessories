import React from 'react';

interface LogoProps {
  variant?: 'light' | 'dark' | 'color';
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ variant = 'dark', size = 'md', showTagline = true }) => {
  const sizeClasses = {
    sm: { phone: 'w-8 h-9', text: 'text-base sm:text-lg', sub: 'text-[8px]' },
    md: { phone: 'w-10 h-11', text: 'text-xl sm:text-2xl', sub: 'text-[9px]' },
    lg: { phone: 'w-14 h-16', text: 'text-2xl sm:text-3xl', sub: 'text-[11px]' },
  }[size];

  const isLight = variant === 'light';

  return (
    <div className="flex items-center gap-2.5 sm:gap-3 group select-none">
      {/* Phone Icon with Magical Jadugar Wand & Star emblem inside */}
      <div className={`relative ${sizeClasses.phone} flex items-center justify-center shrink-0`}>
        <svg viewBox="0 0 100 120" className="w-full h-full drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Outer Phone Shell */}
          <rect
            x="12"
            y="10"
            width="76"
            height="100"
            rx="18"
            fill="#0F172A"
            stroke="#2563EB"
            strokeWidth="5"
          />
          {/* Screen Inner Glass */}
          <rect
            x="20"
            y="22"
            width="60"
            height="76"
            rx="10"
            fill="#FFFFFF"
          />
          {/* Top Speaker Notch */}
          <rect x="40" y="15" width="20" height="3" rx="1.5" fill="#38BDF8" />
          
          {/* Jadugar Magic Hat & Wand Icon inside Screen */}
          {/* Wizard Hat Base */}
          <path
            d="M 28,68 L 72,68 C 70,68 64,64 60,60 L 56,34 L 44,34 L 40,60 C 36,64 30,68 28,68 Z"
            fill="#2563EB"
          />
          {/* Hat Ribbon */}
          <path d="M 38,58 L 62,58" stroke="#EA580C" strokeWidth="4" strokeLinecap="round" />
          {/* Magic Wand */}
          <line x1="30" y1="78" x2="68" y2="38" stroke="#0F172A" strokeWidth="4.5" strokeLinecap="round" />
          {/* Wand Tip Sparkle */}
          <circle cx="68" cy="38" r="3" fill="#EA580C" />
          
          {/* Magic Sparkle Stars */}
          <path d="M 72,28 L 74,33 L 79,35 L 74,37 L 72,42 L 70,37 L 65,35 L 70,33 Z" fill="#EA580C" />
          <path d="M 26,32 L 27,35 L 30,36 L 27,37 L 26,40 L 25,37 L 22,36 L 25,35 Z" fill="#2563EB" />
          <path d="M 32,82 L 33,85 L 36,86 L 33,87 L 32,90 L 31,87 L 28,86 L 31,85 Z" fill="#38BDF8" />

          {/* Bottom Home Indicator */}
          <line x1="42" y1="92" x2="58" y2="92" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col justify-center leading-tight">
        <div className={`font-black tracking-tight ${sizeClasses.text} font-sans flex items-baseline gap-1`}>
          <span className={`${isLight ? 'text-white group-hover:text-white/90' : 'text-slate-900 group-hover:text-blue-600'} transition-colors`}>
            Mobile
          </span>
          <span className={`${isLight ? 'text-orange-400' : 'text-orange-600'} font-extrabold hidden sm:inline`}>Accessories DHA</span>
          <span className={`${isLight ? 'text-cyan-400' : 'text-blue-600'} font-black hidden sm:inline`}>.</span>
        </div>
        {showTagline && (
          <div className="hidden sm:flex items-center gap-1.5 mt-0.5">
            <span className={`uppercase font-bold tracking-[0.18em] ${isLight ? 'text-cyan-400/80' : 'text-blue-600'} ${sizeClasses.sub}`}>
              Premium Quality
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
