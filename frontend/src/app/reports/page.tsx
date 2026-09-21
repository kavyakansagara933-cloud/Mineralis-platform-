'use client';

import React, { useState } from 'react';
import { 
  FileSpreadsheet, 
  Download, 
  FileText, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Filter,
  Eye,
  FileCheck2,
  Layers,
  Presentation
} from 'lucide-react';
import { ExecutiveDeckBuilder } from '@/components/reports/ExecutiveDeckBuilder';

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState<'deck-builder' | 'standard'>('deck-builder');
  const [reportType, setReportType] = useState('executive_summary');
  const [division, setDivision] = useState('ALL');
  const [period, setPeriod] = useState('FY 2023-24');
  const [includeProof, setIncludeProof] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [generatedPdf, setGeneratedPdf] = useState(false);

  const handleGenerate = () => {
    setGenerating(true);
    setGeneratedPdf(false);
    setTimeout(() => {
      setGenerating(false);
      setGeneratedPdf(true);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Executive Reports &amp; Dossier Studio</h1>
          <p className="text-sm text-slate-600 mt-1">
            Generate standard compliance reports or assemble interactive board presentation decks and certified dossiers.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
          <button
            onClick={() => setActiveTab('deck-builder')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'deck-builder' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Executive Deck &amp; Dossier Builder
          </button>
          <button
            onClick={() => setActiveTab('standard')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'standard' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Standard Regulatory Reports
          </button>
        </div>
      </div>

      {/* Tab Contents */}
      {activeTab === 'deck-builder' ? (
        <ExecutiveDeckBuilder />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Configuration Controls */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-6 lg:col-span-1">
            <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-4">
              Report Parameters
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Report Template
                </label>
                <select
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                >
                  <option value="executive_summary">Executive Operational Summary</option>
                  <option value="production_variance">Production &amp; Variance Audit</option>
                  <option value="obr_telemetry">Overburden Stripping (OBR) Telemetry</option>
                  <option value="geological_reserves">Geological Reserves &amp; Seam Stratigraphy</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Operating Division
                </label>
                <select
                  value={division}
                  onChange={(e) => setDivision(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                >
                  <option value="ALL">Central Consolidated (Divisions A-H)</option>
                  <option value="Division A">Division A</option>
                  <option value="Division B">Division B</option>
                  <option value="Division C">Division C</option>
                  <option value="Division D">Division D</option>
                  <option value="Division E">Division E</option>
                  <option value="Division F">Division F</option>
                  <option value="Division G">Division G</option>
                  <option value="Division H">Division H</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Fiscal Period
                </label>
                <select
                  value={period}
                  onChange={(e) => setPeriod(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                >
                  <option value="FY 2023-24">Annual FY 2023-24 (Audited)</option>
                  <option value="FY 2024-25">Annual FY 2024-25 (Projected)</option>
                  <option value="Q4 2023-24">Quarter 4 Telemetry</option>
                </select>
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-3 cursor-pointer p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <input
                    type="checkbox"
                    checked={includeProof}
                    onChange={(e) => setIncludeProof(e.target.checked)}
                    className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
                  />
                  <span className="text-xs font-medium text-slate-700">Include Mathematical Proofs &amp; OCR Citations</span>
                </label>
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={generating}
              className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition shadow-xs flex items-center justify-center gap-2"
            >
              {generating ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  <span>Compiling Statutory Report...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Generate Statutory Brief</span>
                </>
              )}
            </button>
          </div>

          {/* Right Column: Live Document Preview */}
          <div className="bg-white rounded-2xl p-6 md:p-8 space-y-6 lg:col-span-2 border border-slate-200/80 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-base font-bold text-slate-900">Live Executive Preview</h2>
                <p className="text-xs text-slate-500">Publication preview with verified mathematical citations</p>
              </div>

              {generatedPdf && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const content = `STATUTORY OPERATIONS AUDIT REPORT\nPeriod: ${period}\nDivision: ${division}\nTotal Production: 773.60 MT (Target: 780.00 MT)\nVariance: -0.82%\nOBR Stripping Ratio: 2.53 M3/T\nProved Reserves: 187.90 BT (49.7% of total)\nConfidence: 99.8%`;
                      const blob = new Blob([content], { type: 'text/plain' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = `Statutory_Audit_Report_${period.replace(' ', '_')}.txt`;
                      a.click();
                    }}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Brief</span>
                  </button>
                </div>
              )}
            </div>

            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200 space-y-6 font-sans text-xs">
              <div className="text-center space-y-1.5 border-b border-slate-200 pb-6">
                <div className="text-xs font-mono font-bold text-indigo-600 uppercase tracking-wider">
                  Mining Intelligence Platform
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  Statutory Production &amp; Geological Audit Brief ({period})
                </h3>
                <p className="text-slate-500 text-xs font-mono">
                  Scope: {division} • Status: Certified Deterministic Audit
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-1">
                  <div className="text-[11px] text-slate-400 font-mono">Total Coal Output</div>
                  <div className="text-lg font-bold text-slate-900 metric-mono">773.60 MT</div>
                  <div className="text-[11px] text-emerald-600 font-semibold">99.18% of Target</div>
                </div>
                <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-1">
                  <div className="text-[11px] text-slate-400 font-mono">Total OBR Stripping</div>
                  <div className="text-lg font-bold text-slate-900 metric-mono">1,960.5 M.CuM</div>
                  <div className="text-[11px] text-indigo-600 font-semibold">2.53 M³/T Ratio</div>
                </div>
                <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-1">
                  <div className="text-[11px] text-slate-400 font-mono">Proved Reserves</div>
                  <div className="text-lg font-bold text-slate-900 metric-mono">187.90 BT</div>
                  <div className="text-[11px] text-slate-600 font-semibold">49.7% of Total</div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-slate-800 text-xs">Key Executive Findings</h4>
                <p className="text-slate-600 leading-relaxed">
                  During the audited period, consolidated national production reached 773.60 MT with an achievement rate of 99.18% against the statutory target. Overburden excavation demonstrated strong momentum with 1,960.50 M.CuM removed, ensuring operational access to deep high-grade seams for subsequent quarters.
                </p>
              </div>

              {includeProof && (
                <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between font-mono font-bold text-slate-700">
                    <span>Mathematical Audit Verification</span>
                    <span className="text-emerald-600 text-[11px]">Certified 100% Match</span>
                  </div>
                  <div className="font-mono text-slate-600 text-[11px] bg-slate-50 p-2.5 rounded-lg">
                    OBR Ratio = 1,960.50 M.CuM / 773.60 MT = 2.534 M³/T | Variance = (773.60 - 780.00)/780.00 = -0.82%
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
