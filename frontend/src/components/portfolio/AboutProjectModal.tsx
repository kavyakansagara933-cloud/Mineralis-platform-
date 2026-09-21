'use client';

import React from 'react';
import { 
  X, 
  Code2, 
  Server, 
  Layers, 
  Sparkles, 
  Github, 
  Linkedin, 
  Globe, 
  Cpu, 
  CheckCircle2, 
  Database,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AboutProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AboutProjectModal({ isOpen, onClose }: AboutProjectModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.25 }}
          className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="p-6 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-950 text-white flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center">
                <Cpu className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white leading-tight">
                  About MINERALIS
                </h3>
                <p className="text-xs text-slate-300">
                  Engineering Architecture & Developer Portfolio Showcase
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-white/10 text-slate-400 hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6 sm:p-8 space-y-6 overflow-y-auto">
            {/* Project Overview */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                System Overview
              </h4>
              <p className="text-sm text-slate-700 leading-relaxed">
                <strong className="text-slate-900">MINERALIS</strong> is an enterprise-grade AI intelligence and statutory telemetry platform built for high-stakes geological engineering, coal production auditing, and executive operations.
              </p>
            </div>

            {/* Core Tech Stack Badges */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                Full-Stack Architecture
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                    <Code2 className="w-4 h-4 text-blue-600" />
                    <span>Frontend & UI Architecture</span>
                  </div>
                  <p className="text-xs text-slate-500">
                    Next.js 14 App Router, TypeScript, Tailwind CSS, Framer Motion, Lucide Icons.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                    <Server className="w-4 h-4 text-emerald-600" />
                    <span>Backend & APIs</span>
                  </div>
                  <p className="text-xs text-slate-500">
                    FastAPI, Python 3.11, WebSocket Telematics Stream, SQLAlchemy, Pydantic v2.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                    <Sparkles className="w-4 h-4 text-indigo-600" />
                    <span>Deterministic AI & RAG</span>
                  </div>
                  <p className="text-xs text-slate-500">
                    MIRA Engine, Docling PDF parser, algebraic proof verification, zero hallucination guard.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                    <Layers className="w-4 h-4 text-amber-600" />
                    <span>Spatial & GIS Engine</span>
                  </div>
                  <p className="text-xs text-slate-500">
                    Interactive multi-layer SVG map, topological fault hazard line, GPS pulsating telematics.
                  </p>
                </div>
              </div>
            </div>

            {/* Key Engineering Highlights */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                Key Engineering Highlights
              </h4>
              <div className="space-y-2 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span><strong>Deterministic Citation Proofs:</strong> Exact PDF page bounding boxes with OCR confidence ratings.</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span><strong>Mathematical Audit Guard:</strong> Formulated algebraic verification for all production variances and OBR stripping ratios.</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span><strong>Executive Presentation Studio:</strong> Built-in drag-and-drop presentation deck and dossier composer.</span>
                </div>
              </div>
            </div>

            {/* Footer / Connect */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
                <Zap className="w-4 h-4 text-amber-500" />
                <span>Crafted by Kavya Kansagara</span>
              </div>

              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition shadow-xs self-end sm:self-auto"
              >
                Close Window
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
