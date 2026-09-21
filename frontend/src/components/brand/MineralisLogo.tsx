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
    size === 'sm' ? { width: 32, height: 32, svgSize: 32 } :
    size === 'md' ? { width: 40, height: 40, svgSize: 40 } :
    size === 'lg' ? { width: 56, height: 56, svgSize: 56 } : 
    { width: 72, height: 72, svgSize: 72 };

  // Pure Ultra-HD Vector Emblem (Zero pixelation at 4K / 8K Retina)
  const LogoMark = (
    <div 
      className="relative shrink-0 transition-transform duration-300 hover:scale-105"
      style={{ width: markDimensions.width, height: markDimensions.height }}
    >
      <svg
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-md"
      >
        <defs>
          <linearGradient id="shieldGrad" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#1E293B" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>

          <linearGradient id="blueGlow" x1="8" y1="8" x2="56" y2="56" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#60A5FA" />
            <stop offset="50%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#1D4ED8" />
          </linearGradient>

          <linearGradient id="cyanFacet" x1="16" y1="12" x2="48" y2="52" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#0284C7" />
          </linearGradient>

          <linearGradient id="amberGold" x1="24" y1="20" x2="40" y2="44" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FCD34D" />
            <stop offset="60%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>

          <filter id="coreGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer Hexagonal Industrial Shield */}
        <path
          d="M32 4L54 16V40L32 58L10 40V16L32 4Z"
          fill="url(#shieldGrad)"
          stroke="#334155"
          strokeWidth="1.5"
        />

        {/* Outer Isometric Facets */}
        <path d="M32 4L54 16L32 26L10 16L32 4Z" fill="#1E293B" opacity="0.6" />
        <path d="M10 16L32 26V58L10 40V16Z" fill="#0F172A" opacity="0.9" />
        <path d="M54 16L32 26V58L54 40V16Z" fill="#1E293B" opacity="0.8" />

        {/* Primary Capital 'M' Architectural Geometry */}
        {/* Left 'M' Pillar */}
        <path
          d="M16 46V20L23 20V46H16Z"
          fill="url(#blueGlow)"
        />

        {/* Right 'M' Pillar */}
        <path
          d="M41 46V20L48 20V46H41Z"
          fill="url(#cyanFacet)"
        />

        {/* Left Diagonal 'M' Beam */}
        <path
          d="M23 20L32 35L27.5 38L19.5 24.5L23 20Z"
          fill="#93C5FD"
        />

        {/* Right Diagonal 'M' Beam */}
        <path
          d="M41 20L32 35L36.5 38L44.5 24.5L41 20Z"
          fill="#3B82F6"
        />

        {/* Center Golden Geological Crystal Core */}
        <polygon
          points="32,24 38.5,33 32,42 25.5,33"
          fill="url(#amberGold)"
          filter="url(#coreGlow)"
        />
        <polygon
          points="32,27 36,33 32,39 28,33"
          fill="#FFFBEB"
          opacity="0.8"
        />
        <circle cx="32" cy="33" r="1.5" fill="#FFFFFF" />
      </svg>
    </div>
  );

  if (variant === 'mark-only') {
    return LogoMark;
  }

  return (
    <div className={`inline-flex items-center gap-3.5 ${variant === 'stacked' ? 'flex-col text-center' : ''} select-none`}>
      {LogoMark}
      <div className="flex flex-col justify-center">
        {/* Crisp Architectural MINERALIS Wordmark */}
        <div className="flex items-center tracking-[0.22em] font-extrabold text-slate-900 leading-none">
          <span className="text-lg sm:text-xl font-black" style={{ color: textColor }}>MINERALIS</span>
        </div>

        {/* High-End Subtitle */}
        {showTagline && (
          <span 
            className="text-[9px] sm:text-[9.5px] font-bold uppercase tracking-[0.28em] leading-tight mt-1 text-slate-500"
            style={{ color: subTextColor }}
          >
            Mining Intelligence Platform
          </span>
        )}
      </div>
    </div>
  );
};
