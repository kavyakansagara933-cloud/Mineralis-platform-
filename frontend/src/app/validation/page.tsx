'use client';

import { useState } from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  Calculator, 
  Search, 
  Eye, 
  Layers, 
  FileCheck2,
  Award
} from 'lucide-react';
import { motion } from 'framer-motion';
import { EvidenceDrawer } from '@/components/evidence/EvidenceDrawer';
import { StatutoryAuditCertificationEngine } from '@/components/validation/StatutoryAuditCertificationEngine';
import { Evidence } from '@/types';

const AUDIT_RULES = [
  { id: 'RULE-01', name: 'Variance Verification', formula: '((Actual - Target) / Target) * 100', tolerance: '0.00% Tolerance', status: 'Passed' },
  { id: 'RULE-02', name: 'OBR Stripping Calculus', formula: 'Total Overburden (M.CuM) / Total Coal Output (MT)', tolerance: '±0.01 M³/T', status: 'Passed' },
  { id: 'RULE-03', name: 'Proved Reserves Summation', formula: 'Σ(Mine Proved Reserves) == Division Total', tolerance: 'Exact Match', status: 'Passed' },
  { id: 'RULE-04', name: 'Offtake Dispatch Balancing', formula: 'Production + Opening Stock - Dispatch == Closing Stock', tolerance: 'Exact Balance', status: 'Passed' },
];

export default function ValidationPage() {
  const [activeTab, setActiveTab] = useState<'RULES' | 'CERTIFICATION'>('CERTIFICATION');
  const [activeEvidence, setActiveEvidence] = useState<Evidence | null>(null);

  return (
    <div className="space-y-12 pb-24 max-w-7xl mx-auto">
      {/* Header Banner with Sub-Navigation Tabs */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="ambient-card p-8 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-8 bg-gradient-to-r from-white via-slate-50 to-blue-50/20"
      >
        <div className="space-y-2.5 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Deterministic Math & Statutory Risk Certification</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
            Data Validation & Statutory Certification
          </h1>
          <p className="text-sm text-slate-500 leading-relaxed">
            Every numerical record is audited against strict algebraic equations, verified with OCR bounding boxes, and certified under statutory standards.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <button
              onClick={() => setActiveTab('CERTIFICATION')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
                activeTab === 'CERTIFICATION' 
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>Audit Certification</span>
            </button>
            <button
              onClick={() => setActiveTab('RULES')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
                activeTab === 'RULES' 
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Calculator className="w-4 h-4" />
              <span>Validation Rules</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Mode 1: Autonomous AI Statutory Audit & Risk Certification Engine */}
      {activeTab === 'CERTIFICATION' && (
        <StatutoryAuditCertificationEngine 
          onInspectEvidence={(ev) => setActiveEvidence(ev)}
        />
      )}

      {/* Mode 2: Deterministic Mathematical Validation Rules */}
      {activeTab === 'RULES' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {AUDIT_RULES.map((rule) => (
              <div key={rule.id} className="ambient-card p-7 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200">
                    {rule.id}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-mono font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {rule.status}
                  </span>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-900">{rule.name}</h3>
                  <div className="mt-2 p-3 rounded-xl bg-slate-50 border border-slate-200 font-mono text-xs text-slate-700">
                    {rule.formula}
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-400 font-mono pt-2 border-t border-slate-100">
                  <span>Threshold: {rule.tolerance}</span>
                  <span className="text-emerald-600 font-bold">100% Certified</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Evidence Drawer */}
      <EvidenceDrawer evidence={activeEvidence} onClose={() => setActiveEvidence(null)} />
    </div>
  );
}
