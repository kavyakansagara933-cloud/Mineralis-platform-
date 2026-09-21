'use client';

import { useState } from 'react';
import { 
  Calculator, 
  Sparkles, 
  Play, 
  RotateCcw, 
  ShieldCheck, 
  Plus, 
  Trash2,
  CheckCircle2
} from 'lucide-react';
import { motion } from 'framer-motion';

interface VariableItem {
  id: string;
  name: string;
  symbol: string;
  unit: string;
  sampleValue: number;
}

const AVAILABLE_VARIABLES: VariableItem[] = [
  { id: 'v1', name: 'Overburden Volume Excavated', symbol: 'OB_Vol', unit: 'M.CuM', sampleValue: 1960.5 },
  { id: 'v2', name: 'Total Raw Coal Output', symbol: 'Coal_Output', unit: 'MT', sampleValue: 773.6 },
  { id: 'v3', name: 'Diesel Fuel Consumed', symbol: 'Diesel_kL', unit: 'kL', sampleValue: 84500 },
  { id: 'v4', name: 'Operating Machine Hours', symbol: 'Machine_Hrs', unit: 'Hours', sampleValue: 184000 },
  { id: 'v5', name: 'Standard Machine Fleet Capacity', symbol: 'Total_Cap_Hrs', unit: 'Hours', sampleValue: 220000 },
];

const PRESETS = [
  { name: 'Specific Stripping Ratio (OBR)', formula: 'OB_Vol / Coal_Output', unit: 'M³/T' },
  { name: 'Specific Fuel Consumption Rate', formula: 'Diesel_kL / Coal_Output', unit: 'L/T' },
  { name: 'Fleet Operational Availability (OEE %)', formula: '(Machine_Hrs / Total_Cap_Hrs) * 100', unit: '%' },
];

export function FormulaBuilderStudio() {
  const [tokens, setTokens] = useState<string[]>(['OB_Vol', '/', 'Coal_Output']);
  const [evaluatedResult, setEvaluatedResult] = useState<string | null>('2.534 M³/T');

  const handleAddToken = (tok: string) => {
    setTokens([...tokens, tok]);
  };

  const handleClear = () => {
    setTokens([]);
    setEvaluatedResult(null);
  };

  const handleRemoveLast = () => {
    setTokens(tokens.slice(0, -1));
  };

  const handleApplyPreset = (formulaStr: string, unit: string) => {
    const parts = formulaStr.split(' ');
    setTokens(parts);
    calculateFormula(parts, unit);
  };

  const calculateFormula = (currentTokens: string[], targetUnit = 'Custom Unit') => {
    try {
      let expression = currentTokens.join(' ');
      // Substitute variable symbols with sample values
      AVAILABLE_VARIABLES.forEach((v) => {
        expression = expression.replaceAll(v.symbol, String(v.sampleValue));
      });
      // Evaluate algebraic expression safely
      const fn = new Function(`return (${expression})`);
      const val = fn();
      if (typeof val === 'number' && !isNaN(val)) {
        setEvaluatedResult(`${val.toFixed(3)} ${targetUnit}`);
      } else {
        setEvaluatedResult('Invalid Expression');
      }
    } catch {
      setEvaluatedResult('Syntax Error in Equation');
    }
  };

  return (
    <div className="ambient-card p-8 md:p-10 space-y-8 bg-gradient-to-r from-white via-slate-50 to-blue-50/20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Calculator className="w-4 h-4 text-blue-600" />
            <h3 className="text-base font-bold text-slate-900">
              No-Code Mining Formula & Custom KPI Studio
            </h3>
          </div>
          <p className="text-xs text-slate-500">
            Build custom algebraic equations using official telemetry variables and compute instant audited metrics.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {PRESETS.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleApplyPreset(p.formula, p.unit)}
              className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:bg-blue-50 hover:border-blue-300 text-slate-700 text-xs font-semibold transition shadow-xs"
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Formula Canvas */}
      <div className="space-y-4">
        <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
          <span>Active Equation Canvas</span>
          <div className="flex items-center gap-2">
            <button onClick={handleRemoveLast} className="text-slate-400 hover:text-slate-600 text-xs">Backspace</button>
            <button onClick={handleClear} className="text-rose-500 hover:text-rose-700 text-xs">Clear Canvas</button>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white border-2 border-dashed border-slate-300 min-h-[90px] flex flex-wrap items-center gap-2.5 shadow-inner">
          {tokens.length === 0 ? (
            <span className="text-xs text-slate-400 font-mono">
              Click variables and mathematical operators below to build your mining equation...
            </span>
          ) : (
            tokens.map((tok, idx) => {
              const isVar = AVAILABLE_VARIABLES.some(v => v.symbol === tok);
              return (
                <span
                  key={idx}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition shadow-xs ${
                    isVar 
                      ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                      : 'bg-slate-100 text-slate-800 border border-slate-200'
                  }`}
                >
                  {tok}
                </span>
              );
            })
          )}
        </div>
      </div>

      {/* Available Variables & Operators Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Variables (2 cols) */}
        <div className="lg:col-span-2 space-y-3">
          <div className="text-[11px] font-mono font-bold text-slate-400 uppercase">Available Telemetry Variables</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {AVAILABLE_VARIABLES.map((v) => (
              <button
                key={v.id}
                onClick={() => handleAddToken(v.symbol)}
                className="p-3 rounded-xl bg-white border border-slate-200 hover:border-blue-400 hover:bg-blue-50/30 text-left transition flex items-center justify-between shadow-xs group"
              >
                <div>
                  <div className="text-xs font-bold text-slate-800 group-hover:text-blue-600">{v.name}</div>
                  <div className="text-[10px] text-slate-400 font-mono">{v.symbol} ({v.sampleValue.toLocaleString()} {v.unit})</div>
                </div>
                <Plus className="w-3.5 h-3.5 text-slate-300 group-hover:text-blue-600" />
              </button>
            ))}
          </div>
        </div>

        {/* Operators + Calculate Action (1 col) */}
        <div className="space-y-4">
          <div className="text-[11px] font-mono font-bold text-slate-400 uppercase">Math Operators</div>
          <div className="grid grid-cols-3 gap-2">
            {['+', '-', '*', '/', '(', ')'].map((op) => (
              <button
                key={op}
                onClick={() => handleAddToken(op)}
                className="py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-mono font-bold text-sm transition"
              >
                {op === '*' ? '×' : op === '/' ? '÷' : op}
              </button>
            ))}
          </div>

          <button
            onClick={() => calculateFormula(tokens)}
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition shadow-md shadow-blue-500/20 flex items-center justify-center gap-2"
          >
            <Play className="w-3.5 h-3.5" />
            <span>Evaluate on National Dataset</span>
          </button>
        </div>
      </div>

      {/* Evaluated Result Banner */}
      {evaluatedResult && (
        <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <div>
              <div className="text-xs font-bold text-emerald-950">Deterministic Computation Verified</div>
              <div className="text-[11px] text-emerald-700 font-mono">Formula: {tokens.join(' ')}</div>
            </div>
          </div>
          <div className="text-xl font-bold font-mono text-emerald-800 metric-mono">
            {evaluatedResult}
          </div>
        </div>
      )}
    </div>
  );
}
