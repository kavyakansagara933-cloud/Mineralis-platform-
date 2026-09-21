'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Bell, 
  Search, 
  ChevronDown, 
  ShieldCheck, 
  HardHat, 
  User,
  Compass,
  Info
} from 'lucide-react';
import { CommandPalette } from '@/components/layout/CommandPalette';
import { MineralisLogo } from '@/components/brand/MineralisLogo';
import { GuidedPortfolioTour } from '@/components/portfolio/GuidedPortfolioTour';
import { AboutProjectModal } from '@/components/portfolio/AboutProjectModal';

export function TopNavbar() {
  const [selectedRole, setSelectedRole] = useState<'Director' | 'Manager' | 'Auditor'>('Director');
  const [selectedFY, setSelectedFY] = useState<'FY 2023-24' | 'FY 2024-25'>('FY 2023-24');
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [isTourOpen, setIsTourOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  // Global Command+K shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const roles = [
    { id: 'Director', label: 'Executive Director', desc: 'Board scorecards & national forecasts', icon: User, color: 'text-sky-600 bg-sky-50' },
    { id: 'Manager', label: 'Field Mine Manager', desc: 'Pithead muster, haul trucks & blasting', icon: HardHat, color: 'text-amber-600 bg-amber-50' },
    { id: 'Auditor', label: 'Statutory Auditor', desc: 'Risk certification & ledger seals', icon: ShieldCheck, color: 'text-emerald-600 bg-emerald-50' }
  ];

  const currentRole = roles.find(r => r.id === selectedRole) || roles[0];
  const RoleIcon = currentRole.icon;

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          
          {/* Official MINERALIS Brand Logo */}
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="flex items-center gap-2 group">
              <MineralisLogo variant="horizontal" size="md" showTagline={true} />
            </Link>
          </div>

          {/* Center Search Bar Trigger (⌘K) */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <button
              onClick={() => setIsCommandOpen(true)}
              className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl bg-slate-100/80 hover:bg-slate-100 border border-slate-200/80 text-xs text-slate-500 transition-colors shadow-2xs group"
            >
              <div className="flex items-center gap-2">
                <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600" />
                <span>Search 315 mines, tools, MIRA actions...</span>
              </div>
              <kbd className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-[10px] font-mono text-slate-500 shadow-2xs">
                ⌘K
              </kbd>
            </button>
          </div>

          {/* Right Action Controls: Role Switcher & Fiscal Period */}
          <div className="flex items-center gap-3">
            
            {/* Fiscal Period Selector */}
            <div className="hidden sm:flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
              <button
                onClick={() => setSelectedFY('FY 2023-24')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                  selectedFY === 'FY 2023-24' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                FY 23-24 (Audited)
              </button>
              <button
                onClick={() => setSelectedFY('FY 2024-25')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                  selectedFY === 'FY 2024-25' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                FY 24-25 (Live)
              </button>
            </div>

            {/* Role Persona Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 transition shadow-2xs"
              >
                <div className={`w-5 h-5 rounded-md flex items-center justify-center ${currentRole.color}`}>
                  <RoleIcon className="w-3.5 h-3.5" />
                </div>
                <div className="text-left hidden sm:block">
                  <span className="text-xs font-bold text-slate-900 block leading-tight">{currentRole.label}</span>
                </div>
                <ChevronDown className="w-3 h-3 text-slate-400 ml-0.5" />
              </button>

              {roleDropdownOpen && (
                <div 
                  className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-50 space-y-1 animate-fadeIn"
                  onMouseLeave={() => setRoleDropdownOpen(false)}
                >
                  <div className="px-3 py-2 border-b border-slate-100">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Switch Role Persona
                    </span>
                  </div>

                  {roles.map((r) => {
                    const Icon = r.icon;
                    const isCurrent = r.id === selectedRole;
                    return (
                      <div
                        key={r.id}
                        onClick={() => {
                          setSelectedRole(r.id as any);
                          setRoleDropdownOpen(false);
                        }}
                        className={`p-2.5 rounded-xl flex items-start gap-2.5 cursor-pointer transition ${
                          isCurrent ? 'bg-slate-100/90 text-slate-900' : 'hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${r.color}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold">{r.label}</p>
                          <p className="text-[10px] text-slate-500 leading-tight mt-0.5">{r.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Guided Tour & About Project Buttons */}
            <button
              onClick={() => setIsTourOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold transition shadow-xs"
              title="Interactive Platform Tour"
            >
              <Compass className="w-3.5 h-3.5 text-amber-300" />
              <span className="hidden md:inline">Tour</span>
            </button>

            <button
              onClick={() => setIsAboutOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition"
              title="About Architecture & Author"
            >
              <Info className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden md:inline">About</span>
            </button>

            {/* Notifications Bell */}
            <Link 
              href="/alerts"
              className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900 transition relative"
              title="Statutory Alerts"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500" />
            </Link>

          </div>

        </div>
      </header>

      {/* Global Command Palette Modal */}
      <CommandPalette isOpen={isCommandOpen} onClose={() => setIsCommandOpen(false)} />

      {/* Guided Portfolio Tour Modal */}
      <GuidedPortfolioTour isOpen={isTourOpen} onClose={() => setIsTourOpen(false)} />

      {/* About Project & Author Modal */}
      <AboutProjectModal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
    </>
  );
}

export default TopNavbar;
