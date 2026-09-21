'use client';

import React from 'react';

interface MineralisLogoProps {
  variant?: 'full' | 'mark-only' | 'horizontal' | 'stacked';
  theme?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
}

export const MineralisLogo: React.FC<MineralisLogoProps> = ({
  variant = 'horizontal',
  theme = 'light',
  size = 'md',
  showTagline = true
}) => {
  const isDark = theme === 'dark';
  const textColor = isDark ? '#FFFFFF' : '#0F172A';
  const subTextColor = isDark ? '#94A3B8' : '#64748B';

  const markDimensions = 
    size === 'sm' ? { width: 34, height: 27 } :
    size === 'md' ? { width: 46, height: 37 } :
    size === 'lg' ? { width: 62, height: 49 } : 
    { width: 80, height: 64 };

  const LogoMark = (
    <div 
      className="relative shrink-0 transition-transform duration-200 hover:scale-105"
      style={{ width: markDimensions.width, height: markDimensions.height }}
    >
      <img
        src="/mineralis_mark.png"
        alt="MINERALIS Emblem"
        className="w-full h-full object-contain drop-shadow-2xs"
      />
    </div>
  );

  if (variant === 'mark-only') {
    return LogoMark;
  }

  return (
    <div className={`inline-flex items-center gap-3.5 ${variant === 'stacked' ? 'flex-col text-center' : ''} select-none`}>
      {LogoMark}
      <div className="flex flex-col justify-center">
        {/* Exact MINERALIS Wordmark Typography */}
        <div className="flex items-center tracking-[0.20em] font-extrabold text-slate-900 leading-none">
          <span className="text-lg sm:text-xl font-black" style={{ color: textColor }}>MINERALIS</span>
        </div>

        {/* Subtitle with High-End Letter-Spacing */}
        {showTagline && (
          <span 
            className="text-[9px] sm:text-[9.5px] font-bold uppercase tracking-[0.26em] leading-tight mt-1 text-slate-500"
            style={{ color: subTextColor }}
          >
            Mining Intelligence Platform
          </span>
        )}
      </div>
    </div>
  );
};
