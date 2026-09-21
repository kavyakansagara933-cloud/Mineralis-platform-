'use client';

import Link from 'next/link';
import { 
  Layers, 
  ShieldCheck, 
  Calculator, 
  FileSpreadsheet, 
  Bot, 
  Sparkles, 
  ArrowRight, 
  TrendingUp, 
  CheckCircle2, 
  FileText,
  Activity,
  Database
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="space-y-16 pb-24">
      {/* Hero Section */}
      <div className="text-center space-y-6 pt-8 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold shadow-xs">
          <Sparkles className="w-4 h-4 text-blue-600" />
          <span>Next-Generation Mining & Geological Intelligence</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
          Deterministic Mining Telemetry & Statutory Audit Vault
        </h1>

        <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
          Ingest multi-source statutory records, verify seam depth arithmetic, track real-time stripping ratios, and query with zero-hallucination mathematical citations.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-xl shadow-blue-500/20 transition group"
          >
            <span>Launch Operational Command</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
          </Link>
          <Link
            href="/ai-query"
            className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 font-bold text-sm shadow-xs transition"
          >
            <Bot className="w-4 h-4 text-indigo-600" />
            <span>Interactive MIRA AI</span>
          </Link>
        </div>
      </div>

      {/* Feature Showcase Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="ambient-card p-8 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
            <Calculator className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Deterministic Mathematical Proofs</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Every production variance, stripping ratio, and quota shortfall is evaluated by a verifiable arithmetic solver before presentation.
          </p>
        </div>

        <div className="ambient-card p-8 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Statutory Document Provenance</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Direct page-level citations with OCR bounding boxes link every AI answer to official directory tables and boreholes.
          </p>
        </div>

        <div className="ambient-card p-8 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
            <FileSpreadsheet className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Instant PDF & DOCX Briefs</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Generate formal executive briefings, safety reports, and multi-division performance briefs with one click.
          </p>
        </div>
      </div>
    </div>
  );
}
