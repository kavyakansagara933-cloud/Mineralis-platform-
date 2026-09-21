'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  BarChart3, 
  FileText, 
  Bot, 
  FileSpreadsheet, 
  Tags, 
  ShieldCheck, 
  Database, 
  Settings,
  Layers,
  Sparkles,
  ChevronRight,
  TrendingUp
} from 'lucide-react';
import { MineralisLogo } from '@/components/brand/MineralisLogo';

const NAV_ITEMS = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Documents', href: '/documents', icon: FileText },
  { name: 'MIRA Query', href: '/ai-query', icon: Bot, badge: 'MIRA' },
  { name: 'Report Generator', href: '/reports', icon: FileSpreadsheet },
  { name: 'Topic Explorer', href: '/topics', icon: Tags },
  { name: 'Data Validation', href: '/validation', icon: ShieldCheck, badge: '99.2%' },
  { name: 'Knowledge Base', href: '/knowledge-base', icon: Database },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-72 bg-white border-r border-slate-200/90 flex flex-col justify-between shrink-0 shadow-xs z-30">
      <div className="flex flex-col h-full">
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <MineralisLogo size="sm" showTagline={true} />
          </Link>
        </div>

        {/* Live Engine Status Pill */}
        <div className="px-6 pt-5 pb-2">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs font-semibold text-slate-700">Deterministic Engine</span>
            </div>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
              ACTIVE
            </span>
          </div>
        </div>

        {/* Navigation Rail */}
        <div className="flex-1 px-4 py-3 space-y-1.5 overflow-y-auto">
          <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Platform Modules
          </div>

          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href === '/dashboard' && pathname === '/');

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 font-semibold shadow-xs border border-blue-200/80'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-600'}`} />
                  <span>{item.name}</span>
                </div>

                {item.badge && (
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                    item.badge === 'MIRA'
                      ? 'bg-indigo-100 text-indigo-700 border border-indigo-200'
                      : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* User / Division Footer */}
        <div className="p-4 border-t border-slate-100">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shadow-xs">
              CO
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-semibold text-slate-800 truncate">Central Operations</div>
              <div className="text-[11px] text-slate-400 truncate">Senior Mining Officer</div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
