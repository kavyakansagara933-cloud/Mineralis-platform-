'use client';

import React, { useState } from 'react';
import { 
  Compass, 
  X, 
  ChevronRight, 
  ChevronLeft, 
  Sparkles, 
  Layers, 
  Bot, 
  FileSpreadsheet, 
  ShieldCheck, 
  ExternalLink,
  CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface TourStep {
  title: string;
  badge: string;
  description: string;
  highlight: string;
  linkText: string;
  href: string;
  icon: any;
}

const TOUR_STEPS: TourStep[] = [
  {
    title: "Operational Command Center",
    badge: "Step 1 of 4 • Executive Overview",
    description: "Real-time production KPIs, OBR stripping ratios, YoY variance analytics, and live telematics across 315 operating mines.",
    highlight: "Key feature: Real-time calculation engine with automatic variance alerts and drill-down OCR proof links.",
    linkText: "Explore Dashboard",
    href: "/dashboard",
    icon: ShieldCheck
  },
  {
    title: "MIRA AI Statutory Copilot",
    badge: "Step 2 of 4 • Deterministic AI",
    description: "Conversational assistant grounded directly in statutory reports with mathematical algebraic proofs and zero hallucinations.",
    highlight: "Key feature: Full algebraic proofs, voice queries, and 1-click statutory brief exports.",
    linkText: "Try MIRA Query",
    href: "/ai-query",
    icon: Bot
  },
  {
    title: "Geological GIS & Seam Analytics",
    badge: "Step 3 of 4 • Spatial Intelligence",
    description: "Multi-layered interactive GIS map with topographical contours, fault line hazards, live GPS machinery tracking, and seam GCV data.",
    highlight: "Key feature: Toggle between Topographical, Geological, and Live Telematics GPS pulsating views.",
    linkText: "Open GIS Analytics",
    href: "/analytics",
    icon: Layers
  },
  {
    title: "Dossier & Executive Deck Studio",
    badge: "Step 4 of 4 • Board Reporting",
    description: "Compose certified board-ready presentation slide decks and statutory executive audit dossiers with 1-click downloads.",
    highlight: "Key feature: Drag-and-drop slide ordering, instant presentation mode, and verified provenance seals.",
    linkText: "View Report Studio",
    href: "/reports",
    icon: FileSpreadsheet
  }
];

export function GuidedPortfolioTour({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [currentStep, setCurrentStep] = useState(0);

  if (!isOpen) return null;

  const step = TOUR_STEPS[currentStep];
  const Icon = step.icon;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.25 }}
          className="w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden"
        >
          {/* Top Banner */}
          <div className="p-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                <Compass className="w-5 h-5 text-amber-300" />
              </div>
              <div>
                <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-blue-100">
                  Interactive Portfolio Tour
                </div>
                <h3 className="text-base font-bold text-white leading-tight">
                  MINERALIS Architecture & Features
                </h3>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-white/10 text-white/80 hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="p-6 sm:p-8 space-y-6">
            {/* Step Header */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-semibold font-mono">
                  {step.badge}
                </span>
                <span className="text-xs font-mono font-bold text-slate-400">
                  {currentStep + 1} / {TOUR_STEPS.length}
                </span>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <div className="w-10 h-10 rounded-2xl bg-slate-100 text-blue-600 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-bold text-slate-900">{step.title}</h4>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed pt-1">
                {step.description}
              </p>
            </div>

            {/* Highlight Box */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
              <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <p className="text-xs font-medium text-slate-700 leading-relaxed">
                {step.highlight}
              </p>
            </div>

            {/* Navigation & Actions */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
                  disabled={currentStep === 0}
                  className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 disabled:opacity-30 text-slate-600 transition"
                  title="Previous Step"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    if (currentStep < TOUR_STEPS.length - 1) {
                      setCurrentStep(prev => prev + 1);
                    } else {
                      onClose();
                    }
                  }}
                  className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
                >
                  <span>{currentStep === TOUR_STEPS.length - 1 ? 'Finish Tour' : 'Next Feature'}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <Link
                href={step.href}
                onClick={onClose}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition"
              >
                <span>{step.linkText}</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
