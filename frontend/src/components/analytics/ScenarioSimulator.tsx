'use client';

import { useState, useMemo } from 'react';
import { 
  Sparkles, 
  Sliders, 
  TrendingUp, 
  RefreshCw, 
  Calculator, 
  ShieldCheck,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { motion } from 'framer-motion';

export function ScenarioSimulator() {
  const [hemmAvailability, setHemmAvailability] = useState(84); // baseline 84%
  const [obrTarget, setObrTarget] = useState(2.53); // baseline 2.53 M3/T
  const [monsoonDelayWeeks, setMonsoonDelayWeeks] = useState(2); // baseline 2 weeks

  // Mathematical Forecasting Calculation
  const simulation = useMemo(() => {
    const baseOutput = 773.60; // MT baseline
    const baseTarget = 780.00; // MT statutory target

    // Factor 1: HEMM availability impact (each +1% adds approx +0.85% output)
    const hemmDelta = (hemmAvailability - 84) * 0.0085;

    // Factor 2: Stripping ratio impact (lower OBR means faster coal seam exposure)
    const obrDelta = (2.53 - obrTarget) * 0.025;

    // Factor 3: Monsoon disruption (each week delay reduces output by ~0.9%)
    const monsoonDelta = (2 - monsoonDelayWeeks) * 0.009;

    const projectedMultiplier = 1 + hemmDelta + obrDelta + monsoonDelta;
    const projectedOutput = baseOutput * projectedMultiplier;
    const projectedVariance = ((projectedOutput - baseTarget) / baseTarget) * 100;
    const diffFromBaseline = projectedOutput - baseOutput;
    const revenueImpactCr = (diffFromBaseline * 1000000 * 3200) / 10000000; // approx ₹3200/T in Crores

    return {
      projectedOutput: Number(projectedOutput.toFixed(2)),
      projectedVariance: Number(projectedVariance.toFixed(2)),
      diffFromBaseline: Number(diffFromBaseline.toFixed(2)),
      revenueImpactCr: Number(revenueImpactCr.toFixed(0)),
      achievementRate: Number(((projectedOutput / baseTarget) * 100).toFixed(1))
    };
  }, [hemmAvailability, obrTarget, monsoonDelayWeeks]);

  const handleReset = () => {
    setHemmAvailability(84);
    setObrTarget(2.53);
    setMonsoonDelayWeeks(2);
  };

  return (
    <div className="ambient-card p-8 md:p-10 space-y-8 bg-gradient-to-r from-white via-slate-50 to-blue-50/20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-blue-600" />
            <h3 className="text-base font-bold text-slate-900">
              "What-If" Operational Scenario Simulator & Forecasting Engine
            </h3>
          </div>
          <p className="text-xs text-slate-500">
            Simulate the mathematical impact of fleet availability, stripping ratios, and monsoon disruptions in real time.
          </p>
        </div>

        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-semibold transition shadow-xs self-start sm:self-auto"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reset Baselines</span>
        </button>
      </div>

      {/* Sliders + Projected Result Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Interactive Control Sliders */}
        <div className="space-y-6">
          {/* Slider 1: HEMM Availability */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold text-slate-800">
              <span>HEMM Heavy Fleet Availability</span>
              <span className="font-mono text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                {hemmAvailability}% (Baseline: 84%)
              </span>
            </div>
            <input
              type="range"
              min="70"
              max="95"
              value={hemmAvailability}
              onChange={(e) => setHemmAvailability(Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>70% (Degraded)</span>
              <span>84% (Standard)</span>
              <span>95% (Peak Automated)</span>
            </div>
          </div>

          {/* Slider 2: OBR Stripping Ratio */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold text-slate-800">
              <span>Target Stripping Ratio (OBR)</span>
              <span className="font-mono text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                {obrTarget.toFixed(2)} M³/T (Baseline: 2.53)
              </span>
            </div>
            <input
              type="range"
              min="1.8"
              max="3.2"
              step="0.05"
              value={obrTarget}
              onChange={(e) => setObrTarget(Number(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>1.80 M³/T (Shallow Seams)</span>
              <span>2.53 M³/T</span>
              <span>3.20 M³/T (Deep Horizon)</span>
            </div>
          </div>

          {/* Slider 3: Monsoon Weather Downtime */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold text-slate-800">
              <span>Monsoon Season Haul-Road Disruption</span>
              <span className="font-mono text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                {monsoonDelayWeeks} Weeks (Baseline: 2)
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="6"
              value={monsoonDelayWeeks}
              onChange={(e) => setMonsoonDelayWeeks(Number(e.target.value))}
              className="w-full accent-amber-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>0 Wks (Zero Impact)</span>
              <span>2 Wks (Normal)</span>
              <span>6 Wks (Severe Flooding)</span>
            </div>
          </div>
        </div>

        {/* Right: Real-time Mathematical Forecast Card */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs font-bold font-mono text-slate-400 uppercase">
              <span>Simulated Projection (FY 2024-25)</span>
              <span className="text-blue-600">Deterministic Model</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                <div className="text-[11px] text-slate-400 font-mono">Projected Coal Output</div>
                <div className="text-2xl font-bold text-slate-900 metric-mono">
                  {simulation.projectedOutput} <span className="text-xs text-slate-400">MT</span>
                </div>
                <div className={`text-[11px] font-mono font-bold flex items-center gap-1 ${
                  simulation.diffFromBaseline >= 0 ? 'text-emerald-600' : 'text-rose-600'
                }`}>
                  {simulation.diffFromBaseline >= 0 ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                  <span>{simulation.diffFromBaseline > 0 ? `+${simulation.diffFromBaseline}` : simulation.diffFromBaseline} MT vs Baseline</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                <div className="text-[11px] text-slate-400 font-mono">Target Achievement</div>
                <div className="text-2xl font-bold text-blue-600 metric-mono">
                  {simulation.achievementRate}%
                </div>
                <div className="text-[11px] text-slate-500 font-mono">
                  Variance: {simulation.projectedVariance}%
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-100 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-800">Estimated Fiscal Impact:</span>
                <span className={`font-mono font-bold ${simulation.revenueImpactCr >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {simulation.revenueImpactCr >= 0 ? `+₹${simulation.revenueImpactCr.toLocaleString()} Cr` : `-₹${Math.abs(simulation.revenueImpactCr).toLocaleString()} Cr`}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed font-mono">
                Formula: ΔOutput(MT) × ₹3,200/T benchmark realization rate.
              </p>
            </div>
          </div>

          <div className="text-[11px] text-slate-400 font-mono text-center pt-2 border-t border-slate-100">
            Projections update deterministically as parameter sliders move
          </div>
        </div>
      </div>
    </div>
  );
}
