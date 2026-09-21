import { PitheadMusterPanel } from '@/components/dashboard/PitheadMusterPanel';
'use client';

import { useState } from 'react';
import { 
  TrendingUp, 
  FileSpreadsheet, 
  ShieldCheck, 
  Sparkles, 
  Eye, 
  ChevronRight, 
  CheckCircle2, 
  AlertTriangle 
} from 'lucide-react';
import { motion } from 'framer-motion';
import { MOCK_MINES, MOCK_INSIGHTS } from '@/lib/mock-data';
import { OverviewCharts } from '@/components/dashboard/OverviewCharts';
import { EvidenceDrawer } from '@/components/evidence/EvidenceDrawer';
import { Evidence } from '@/types';

export default function DashboardPage() {
  const [activeEvidence, setActiveEvidence] = useState<Evidence | null>(null);
  const [filterDivision, setFilterDivision] = useState('ALL');

  const filteredMines = MOCK_MINES.filter((mine) => {
    if (filterDivision === 'ALL') return true;
    return (mine.division || '').toLowerCase().includes(filterDivision.toLowerCase()) ||
           (mine.subsidiary || '').toLowerCase().includes(filterDivision.toLowerCase());
  });

  return (
    <div className="space-y-12 pb-24 max-w-7xl mx-auto">
      {/* Top Banner - Spacious & Airy */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="ambient-card p-8 md:p-10 lg:p-12 relative overflow-hidden bg-gradient-to-r from-white via-slate-50 to-blue-50/20"
      >
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-blue-600 animate-spin" style={{ animationDuration: '6s' }} />
              <span>National Operations Intelligence & Statutory Telemetry</span>
            </div>
            <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-slate-900">
              Operational Command Center
            </h1>
            <p className="text-sm text-slate-500 leading-relaxed">
              Consolidated production telemetry, stripping ratios, and deterministic statutory audits across 315 operating mines and 8 regional divisions.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3.5 shrink-0">
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="/reports"
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition shadow-md shadow-blue-500/20"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Generate Audit Brief</span>
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="/ai-query"
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition shadow-xs"
            >
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span>Ask MIRA AI</span>
            </motion.a>
          </div>
        </div>
      </motion.div>

      {/* 4 Hero KPI Metric Cards - Spacious & Well-Padded */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Coal Output */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="ambient-card p-7 space-y-4 hover:-translate-y-1 transition-all duration-300"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">Total Coal Output</span>
            <span className="inline-flex items-center gap-1 text-xs font-mono font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              <TrendingUp className="w-3 h-3" />
              +5.2% YoY
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl lg:text-4xl font-bold text-slate-900 metric-mono">773.60</span>
            <span className="text-xs font-bold text-slate-400 font-mono">MT</span>
          </div>
          <div className="space-y-1.5">
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '99.18%' }}
                transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
                className="bg-blue-600 h-full rounded-full"
              />
            </div>
            <div className="flex justify-between text-[11px] text-slate-400 font-mono">
              <span>Target: 780.00 MT</span>
              <span className="text-blue-600 font-bold">99.18% Achieved</span>
            </div>
          </div>
        </motion.div>

        {/* Total Offtake / Dispatch */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="ambient-card p-7 space-y-4 hover:-translate-y-1 transition-all duration-300"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">Coal Offtake / Dispatch</span>
            <span className="inline-flex items-center gap-1 text-xs font-mono font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              <TrendingUp className="w-3 h-3" />
              +4.8% YoY
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl lg:text-4xl font-bold text-slate-900 metric-mono">754.40</span>
            <span className="text-xs font-bold text-slate-400 font-mono">MT</span>
          </div>
          <div className="space-y-1.5">
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '97.5%' }}
                transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
                className="bg-emerald-600 h-full rounded-full"
              />
            </div>
            <div className="flex justify-between text-[11px] text-slate-400 font-mono">
              <span>Target: 773.00 MT</span>
              <span className="text-emerald-600 font-bold">97.5% Dispatched</span>
            </div>
          </div>
        </motion.div>

        {/* Overburden Removal (OBR) */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="ambient-card p-7 space-y-4 hover:-translate-y-1 transition-all duration-300"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">OBR Stripping Ratio</span>
            <span className="inline-flex items-center gap-1 text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
              2.53 M³/T
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl lg:text-4xl font-bold text-slate-900 metric-mono">1,960.5</span>
            <span className="text-xs font-bold text-slate-400 font-mono">M.CuM</span>
          </div>
          <div className="space-y-1.5">
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '102.4%' }}
                transition={{ duration: 1.2, ease: 'easeOut', delay: 0.4 }}
                className="bg-indigo-600 h-full rounded-full"
              />
            </div>
            <div className="flex justify-between text-[11px] text-slate-400 font-mono">
              <span>Target: 1,914.0 M.CuM</span>
              <span className="text-indigo-600 font-bold">102.4% Stripped</span>
            </div>
          </div>
        </motion.div>

        {/* Geological Proved Reserves */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="ambient-card p-7 space-y-4 hover:-translate-y-1 transition-all duration-300"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">Geological Reserves</span>
            <span className="inline-flex items-center gap-1 text-xs font-mono font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              <ShieldCheck className="w-3 h-3" />
              Proved & Audited
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl lg:text-4xl font-bold text-slate-900 metric-mono">187.90</span>
            <span className="text-xs font-bold text-slate-400 font-mono">BT</span>
          </div>
          <div className="space-y-1.5">
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.2, ease: 'easeOut', delay: 0.5 }}
                className="bg-slate-700 h-full rounded-full"
              />
            </div>
            <div className="flex justify-between text-[11px] text-slate-400 font-mono">
              <span>Total Inventory: 378.2 BT</span>
              <span className="text-slate-600 font-bold">49.7% Proved</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Interactive Telemetry & Production Charts - Spacious */}
      <OverviewCharts />

      {/* MIRA AI Operational Insights - Spacious Card */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.25 }}
        className="copilot-card p-8 md:p-10 space-y-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">MIRA Strategic Observations</h2>
              <p className="text-xs text-slate-500">Autonomous analysis grounded in verified statutory reports</p>
            </div>
          </div>
          <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200 self-start sm:self-auto">
            {MOCK_INSIGHTS.length} Critical Observations
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_INSIGHTS.map((insight) => (
            <motion.div 
              key={insight.id}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
              className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-blue-400 transition space-y-3.5 shadow-xs flex flex-col justify-between"
            >
              <div className="space-y-2.5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                      insight.severity === 'warning' || insight.severity === 'critical' ? 'bg-amber-500' : 'bg-emerald-500'
                    }`} />
                    <span className="text-xs font-bold text-slate-800 line-clamp-1">{insight.title}</span>
                  </div>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">{insight.description}</p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs mt-2">
                <span className="text-[11px] font-mono text-slate-400">{insight.division}</span>
                <button
                  onClick={() => setActiveEvidence(insight.evidence || null)}
                  className="flex items-center gap-1 font-semibold text-blue-600 hover:text-blue-700 transition text-xs"
                >
                  <span>Verify Evidence</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Production Telemetry Table - Airy & Roomy */}
      <div className="ambient-card overflow-hidden">
        <div className="p-7 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">Mine-Wise Production Telemetry</h2>
            <p className="text-xs text-slate-500 mt-0.5">Audited performance metrics with verified variance tracking</p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-slate-400">Division:</span>
            <select
              value={filterDivision}
              onChange={(e) => setFilterDivision(e.target.value)}
              className="px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
            >
              <option value="ALL">All Divisions (A-H)</option>
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
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/60 text-slate-400 font-mono uppercase text-[11px]">
                <th className="px-6 py-4 font-bold">Mine Name</th>
                <th className="px-6 py-4 font-bold">Division</th>
                <th className="px-6 py-4 font-bold">Mining Type</th>
                <th className="px-6 py-4 font-bold text-right">Actual (MT)</th>
                <th className="px-6 py-4 font-bold text-right">Target (MT)</th>
                <th className="px-6 py-4 font-bold text-right">Variance %</th>
                <th className="px-6 py-4 font-bold text-center">Status</th>
                <th className="px-6 py-4 font-bold text-center">Evidence</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredMines.map((mine, idx) => (
                <tr key={mine.id || idx} className="hover:bg-blue-50/30 transition">
                  <td className="px-6 py-5 font-bold text-slate-900">{mine.mine_name}</td>
                  <td className="px-6 py-5 text-slate-600 font-medium">{mine.division || mine.subsidiary}</td>
                  <td className="px-6 py-5 font-mono text-slate-500">{mine.mining_type || 'Surface'}</td>
                  <td className="px-6 py-5 text-right font-mono font-bold text-slate-900">{mine.actual_production.toFixed(2)}</td>
                  <td className="px-6 py-5 text-right font-mono text-slate-500">{mine.target_production.toFixed(2)}</td>
                  <td className={`px-6 py-5 text-right font-mono font-bold ${
                    mine.variance_pct >= 0 ? 'text-emerald-600' : 'text-rose-600'
                  }`}>
                    {mine.variance_pct > 0 ? `+${mine.variance_pct.toFixed(1)}%` : `${mine.variance_pct.toFixed(1)}%`}
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold ${
                      mine.variance_pct >= 0 
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                        : 'bg-rose-50 text-rose-700 border border-rose-200'
                    }`}>
                      {mine.variance_pct >= 0 ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />}
                      {mine.variance_pct >= 0 ? 'Optimal' : 'Variance Alert'}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <button
                      onClick={() => setActiveEvidence(mine.evidence || null)}
                      className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-blue-600 transition"
                      title="View OCR Citation"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Evidence Drawer */}
      <EvidenceDrawer evidence={activeEvidence} onClose={() => setActiveEvidence(null)} />
    </div>
  );
}
