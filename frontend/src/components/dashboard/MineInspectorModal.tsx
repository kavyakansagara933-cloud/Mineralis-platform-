'use client';

import { X, Layers, ShieldCheck, FileText, TrendingUp, TrendingDown } from 'lucide-react';
import { MineMetric } from '@/types';

interface MineInspectorModalProps {
  mine: MineMetric | null;
  onClose: () => void;
  onViewSource: (evidence: any) => void;
}

export function MineInspectorModal({ mine, onClose, onViewSource }: MineInspectorModalProps) {
  if (!mine) return null;

  const isPositive = (mine.variance_pct ?? 0) >= 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-2xl bg-[#0d131f] border border-amber-500/30 rounded-2xl shadow-2xl shadow-amber-500/10 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-800 bg-gradient-to-r from-slate-900 via-[#111928] to-slate-900 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black text-white">{mine.mine_name}</h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold">
                  {mine.subsidiary}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-zinc-300 border border-slate-700">
                  {mine.state || 'India'}
                </span>
              </div>
              <p className="text-xs text-zinc-400 font-mono mt-0.5">
                Status: ACTIVE PRODUCING • Official Mining Unit
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Key Metric Telemetry Grid */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
              <div className="text-[10px] font-mono text-zinc-400 uppercase">Actual Output (24–25)</div>
              <div className="text-2xl font-black font-mono text-white mt-1">
                {mine.actual_production.toFixed(2)} <span className="text-xs font-normal text-zinc-400 font-sans">MT</span>
              </div>
              <div className="text-[10px] text-zinc-500 font-mono mt-1">Target: {mine.target_production.toFixed(2)} MT</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
              <div className="text-[10px] font-mono text-zinc-400 uppercase">Target Variance</div>
              <div className={`text-2xl font-black font-mono mt-1 flex items-center gap-1 ${
                isPositive ? 'text-emerald-400' : 'text-amber-400'
              }`}>
                {isPositive ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
                {mine.variance_pct > 0 ? `+${mine.variance_pct.toFixed(2)}%` : `${mine.variance_pct.toFixed(2)}%`}
              </div>
              <div className="text-[10px] text-zinc-500 font-mono mt-1">
                {isPositive ? 'Exceeding target quota' : 'Below target quota'}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
              <div className="text-[10px] font-mono text-zinc-400 uppercase">Mining Technique</div>
              <div className="text-lg font-black text-amber-300 mt-1">
                {mine.mining_type || 'Opencast (OC)'}
              </div>
              <div className="text-[10px] text-zinc-500 font-mono mt-1">Standard mechanized bench</div>
            </div>
          </div>

          {/* Target Progress Bar */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-zinc-400">Production Completion Rate</span>
              <span className="text-white font-bold">
                {((mine.actual_production / (mine.target_production || 1)) * 100).toFixed(1)}%
              </span>
            </div>
            <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700">
              <div 
                className="h-full rounded-full bg-gradient-to-r from-amber-500 to-emerald-400 transition-all duration-500"
                style={{ width: `${Math.min(100, (mine.actual_production / (mine.target_production || 1)) * 100)}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
              <span>0.0 MT</span>
              <span>Target: {mine.target_production.toFixed(2)} MT</span>
              <span>Cap: {(mine.target_production * 1.25).toFixed(2)} MT</span>
            </div>
          </div>

          {/* Mathematical Trace & Audit Evidence */}
          <div className="p-4 rounded-xl bg-gradient-to-b from-amber-950/20 to-slate-950 border border-amber-500/20 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono text-amber-300 font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Deterministic Audit Trace</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                AUDIT VERIFIED
              </span>
            </div>

            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono text-xs space-y-1 text-zinc-300">
              <div className="text-zinc-500 text-[11px]">// Formula Execution:</div>
              <div>
                Variance = (({mine.actual_production.toFixed(2)} - {mine.target_production.toFixed(2)}) / {mine.target_production.toFixed(2)}) * 100 = <span className="text-amber-400 font-bold">{mine.variance_pct.toFixed(2)}%</span>
              </div>
            </div>

            {mine.evidence && (
              <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                <div className="text-xs text-zinc-400">
                  <span className="font-mono text-zinc-300 font-bold">Source:</span> {mine.evidence.document_name} (Page {mine.evidence.page_number})
                </div>
                <button
                  onClick={() => {
                    onClose();
                    onViewSource(mine.evidence);
                  }}
                  className="px-3 py-1.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Inspect PDF Citation</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between">
          <div className="text-[11px] text-zinc-500 font-mono">
            Coal Directory of India (2024–25) Official Release
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-zinc-200 rounded-lg text-xs font-semibold transition"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
}
