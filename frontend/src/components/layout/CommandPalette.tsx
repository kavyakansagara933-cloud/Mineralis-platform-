'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Search, 
  MapPin, 
  BarChart3, 
  Layers, 
  Truck, 
  FileText, 
  ShieldCheck, 
  Bot, 
  HardHat, 
  Presentation, 
  Sliders, 
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CommandItem {
  id: string;
  title: string;
  category: 'Navigation' | 'Divisions & Mines' | 'Quick Actions';
  subtitle?: string;
  icon: React.ElementType;
  action: () => void;
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const commands: CommandItem[] = [
    { id: 'nav-dash', title: 'Executive Overview Dashboard', category: 'Navigation', subtitle: 'View national KPIs, variances & MIRA insights', icon: BarChart3, action: () => { router.push('/dashboard'); onClose(); } },
    { id: 'nav-analytics', title: 'Deep Mining Analytics', category: 'Navigation', subtitle: 'Production trajectories, GCV grades & reserve life', icon: BarChart3, action: () => { router.push('/analytics'); onClose(); } },
    { id: 'nav-gis', title: 'GIS Spatial Map (315 Mines)', category: 'Navigation', subtitle: 'Georeferenced cluster map of all operating pits', icon: MapPin, action: () => { router.push('/analytics'); onClose(); } },
    { id: 'nav-fleet', title: 'HEMM Fleet Telematics & Digital Twin', category: 'Navigation', subtitle: 'Draglines, Shovels, 240T Dumpers live telemetry', icon: Truck, action: () => { router.push('/analytics'); onClose(); } },
    { id: 'nav-geology', title: 'Subsurface Seam Stratigraphy', category: 'Navigation', subtitle: 'Borehole core lithology column & proximate assays', icon: Layers, action: () => { router.push('/analytics'); onClose(); } },
    { id: 'nav-simulator', title: 'Operational Scenario Simulator', category: 'Navigation', subtitle: 'What-If sliders for HEMM availability & monsoon', icon: Sliders, action: () => { router.push('/analytics'); onClose(); } },
    { id: 'nav-docs', title: 'Document Vault & Universal Uploader', category: 'Navigation', subtitle: 'Ingest PC files & view OCR bounding boxes', icon: FileText, action: () => { router.push('/documents'); onClose(); } },
    { id: 'nav-mira', title: 'MIRA AI Query Console', category: 'Navigation', subtitle: 'Speech-to-text voice questions with algebraic proofs', icon: Bot, action: () => { router.push('/ai-query'); onClose(); } },
    { id: 'nav-reports', title: 'Executive Presentation Deck & Dossier', category: 'Navigation', subtitle: 'Assemble board slides & enter fullscreen presenter', icon: Presentation, action: () => { router.push('/reports'); onClose(); } },
    { id: 'nav-validation', title: 'Autonomous Statutory Audit Engine', category: 'Navigation', subtitle: 'Generate SHA-256 sealed digital certificates', icon: ShieldCheck, action: () => { router.push('/validation'); onClose(); } },

    { id: 'div-a', title: 'Division A — Northern Horizon OpenCast', category: 'Divisions & Mines', subtitle: '52 Mines • 206.8 MT Actual • Seam G8/G5', icon: MapPin, action: () => { router.push('/analytics'); onClose(); } },
    { id: 'div-b', title: 'Division B — Eastern Ridge Deep Sector', category: 'Divisions & Mines', subtitle: '48 Mines • 187.5 MT Actual • Seam G8/G4', icon: MapPin, action: () => { router.push('/analytics'); onClose(); } },
    { id: 'div-c', title: 'Division C — Central Quarry Mega Pit', category: 'Divisions & Mines', subtitle: '44 Mines • 154.2 MT Actual • Seam G11', icon: MapPin, action: () => { router.push('/analytics'); onClose(); } },
    { id: 'div-d', title: 'Division D — Southern Plateau Surface Miner', category: 'Divisions & Mines', subtitle: '38 Mines • 118.5 MT Actual • Seam G8', icon: MapPin, action: () => { router.push('/analytics'); onClose(); } },

    { id: 'act-certify', title: 'Run Autonomous Statutory Audit Seal', category: 'Quick Actions', subtitle: 'Execute 14-rule mass-balance & ledger certification', icon: ShieldCheck, action: () => { router.push('/validation'); onClose(); } },
    { id: 'act-upload', title: 'Upload Document from Local PC', category: 'Quick Actions', subtitle: 'Upload PDF, Excel, CSV, or scanned doc', icon: FileText, action: () => { router.push('/documents'); onClose(); } },
    { id: 'act-muster', title: 'Open Pithead Shift Muster Roll', category: 'Quick Actions', subtitle: 'Pre-shift blasting clearance & shovel-dumper matching', icon: HardHat, action: () => { router.push('/dashboard'); onClose(); } }
  ];

  const filtered = commands.filter(cmd => 
    cmd.title.toLowerCase().includes(query.toLowerCase()) || 
    (cmd.subtitle && cmd.subtitle.toLowerCase().includes(query.toLowerCase())) ||
    cmd.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % Math.max(1, filtered.length));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + filtered.length) % Math.max(1, filtered.length));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filtered[selectedIndex]) {
          filtered[selectedIndex].action();
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filtered, selectedIndex, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-slate-900/40 backdrop-blur-xs">
        <motion.div 
          initial={{ opacity: 0, scale: 0.96, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -10 }}
          transition={{ duration: 0.2 }}
          className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col"
          onClick={e => e.stopPropagation()}
        >
          {/* Search Input Bar */}
          <div className="flex items-center px-4 py-3.5 border-b border-slate-100 gap-3 bg-slate-50/50">
            <Search className="w-5 h-5 text-slate-400 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={e => { setQuery(e.target.value); setSelectedIndex(0); }}
              placeholder="Search across 315 mines, tools, MIRA actions, formulas... (↑↓ to navigate)"
              className="w-full bg-transparent text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden font-medium"
            />
            <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-semibold bg-slate-200/80 text-slate-600">
              ESC
            </span>
          </div>

          {/* Results List */}
          <div className="max-h-96 overflow-y-auto p-2 space-y-1">
            {filtered.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-400">
                No matching mine, tool, or action found for &ldquo;{query}&rdquo;
              </div>
            ) : (
              filtered.map((cmd, idx) => {
                const Icon = cmd.icon;
                const isSelected = idx === selectedIndex;
                return (
                  <div
                    key={cmd.id}
                    onClick={cmd.action}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`p-3 rounded-xl flex items-center justify-between cursor-pointer transition-all ${
                      isSelected 
                        ? 'bg-sky-50/80 text-slate-900 ring-1 ring-sky-300 shadow-2xs' 
                        : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-sky-500 text-white shadow-xs' : 'bg-slate-100 text-slate-600'
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-xs font-semibold">{cmd.title}</p>
                          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wide">
                            {cmd.category}
                          </span>
                        </div>
                        {cmd.subtitle && (
                          <p className="text-[11px] text-slate-500 mt-0.5 truncate max-w-md">
                            {cmd.subtitle}
                          </p>
                        )}
                      </div>
                    </div>

                    <ArrowRight className={`w-3.5 h-3.5 ${isSelected ? 'text-sky-600' : 'text-slate-300'}`} />
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Shortcuts */}
          <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
            <div className="flex items-center gap-3">
              <span><strong className="text-slate-600">↑↓</strong> Navigate</span>
              <span><strong className="text-slate-600">↵</strong> Select</span>
              <span><strong className="text-slate-600">ESC</strong> Close</span>
            </div>
            <span className="font-mono text-slate-400">MINERALIS Global Command Engine</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
