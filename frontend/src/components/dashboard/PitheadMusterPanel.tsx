'use client';

import React, { useState } from 'react';
import { 
  HardHat, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Truck, 
  Radio, 
  Flame, 
  ShieldCheck, 
  Send, 
  RefreshCw, 
  Droplets, 
  Zap 
} from 'lucide-react';

export const PitheadMusterPanel: React.FC = () => {
  const [shift, setShift] = useState<'Shift A (06:00 - 14:00)' | 'Shift B (14:00 - 22:00)' | 'Shift C (22:00 - 06:00)'>('Shift A (06:00 - 14:00)');
  const [blastingCleared, setBlastingCleared] = useState<boolean>(true);
  const [dewateringActive, setDewateringActive] = useState<boolean>(true);
  const [radioCheckDone, setRadioCheckDone] = useState<boolean>(true);
  const [logSubmitted, setLogSubmitted] = useState<boolean>(false);
  const [managerLog, setManagerLog] = useState<string>('Bench 4 haul ramp widened by 2.4m for 240T Cat fleet turnaround. Dewatering pump #3 running continuous.');

  const handleSubmitMuster = (e: React.FormEvent) => {
    e.preventDefault();
    setLogSubmitted(true);
    setTimeout(() => setLogSubmitted(false), 3500);
  };

  return (
    <div className="bg-white rounded-2xl p-6 border-2 border-amber-300/80 shadow-xs space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
            <HardHat className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-slate-900">
                Pithead Shift Muster &amp; Operations Command
              </h3>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-900">
                Field Manager Active
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Northern Horizon Open Cast • Shift Roster &amp; DGMS Pre-Shift Statutory Clearance
            </p>
          </div>
        </div>

        <select
          value={shift}
          onChange={(e) => setShift(e.target.value as any)}
          className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 focus:outline-hidden focus:ring-1 focus:ring-amber-500"
        >
          <option value="Shift A (06:00 - 14:00)">Shift A (06:00 - 14:00)</option>
          <option value="Shift B (14:00 - 22:00)">Shift B (14:00 - 22:00)</option>
          <option value="Shift C (22:00 - 06:00)">Shift C (22:00 - 06:00)</option>
        </select>
      </div>

      {/* Quick Status Pill Checkers */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <button
          onClick={() => setBlastingCleared(!blastingCleared)}
          className={`p-3 rounded-xl border flex items-center justify-between text-left transition-all ${
            blastingCleared 
              ? 'bg-emerald-50/80 border-emerald-200 text-emerald-900' 
              : 'bg-rose-50/80 border-rose-200 text-rose-900'
          }`}
        >
          <div className="flex items-center gap-2">
            <Flame className={`w-4 h-4 ${blastingCleared ? 'text-emerald-600' : 'text-rose-600'}`} />
            <div>
              <p className="text-xs font-bold">Blasting Window Clearance</p>
              <span className="text-[10px] opacity-80">{blastingCleared ? 'Safe to Operate' : 'Exclusion Zone Active'}</span>
            </div>
          </div>
          <span className="text-xs font-bold">{blastingCleared ? 'CLEARED' : 'LOCKED'}</span>
        </button>

        <button
          onClick={() => setDewateringActive(!dewateringActive)}
          className={`p-3 rounded-xl border flex items-center justify-between text-left transition-all ${
            dewateringActive 
              ? 'bg-sky-50/80 border-sky-200 text-sky-900' 
              : 'bg-amber-50/80 border-amber-200 text-amber-900'
          }`}
        >
          <div className="flex items-center gap-2">
            <Droplets className={`w-4 h-4 ${dewateringActive ? 'text-sky-600' : 'text-amber-600'}`} />
            <div>
              <p className="text-xs font-bold">In-Pit Dewatering Sump</p>
              <span className="text-[10px] opacity-80">{dewateringActive ? 'Pumps 1, 2, 3 Active (450 GPM)' : 'Pump Offline'}</span>
            </div>
          </div>
          <span className="text-xs font-bold">{dewateringActive ? 'RUNNING' : 'CHECK'}</span>
        </button>

        <button
          onClick={() => setRadioCheckDone(!radioCheckDone)}
          className={`p-3 rounded-xl border flex items-center justify-between text-left transition-all ${
            radioCheckDone 
              ? 'bg-emerald-50/80 border-emerald-200 text-emerald-900' 
              : 'bg-slate-100 border-slate-200 text-slate-700'
          }`}
        >
          <div className="flex items-center gap-2">
            <Radio className={`w-4 h-4 ${radioCheckDone ? 'text-emerald-600' : 'text-slate-500'}`} />
            <div>
              <p className="text-xs font-bold">Pit Radio Channel 4</p>
              <span className="text-[10px] opacity-80">{radioCheckDone ? 'All 18 operators verified' : 'Pending roll call'}</span>
            </div>
          </div>
          <span className="text-xs font-bold">{radioCheckDone ? '100% OK' : 'PENDING'}</span>
        </button>
      </div>

      {/* Shovel-Dumper Pairing Live Status */}
      <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-3">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
          <Truck className="w-3.5 h-3.5 text-amber-600" />
          Shift Shovel-to-Dumper Haul Matching (Current Pit: Northern Horizon Pit 1)
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 bg-white rounded-lg border border-slate-200">
            <div className="flex items-center justify-between text-[11px] font-bold text-slate-700">
              <span>Shovel SH-4200-03 (42m³)</span>
              <span className="text-emerald-600">Paired</span>
            </div>
            <p className="text-slate-500 text-[11px] mt-1">Matched to 5x 240T Dumpers (Avg cycle: 14.2 min)</p>
          </div>

          <div className="p-3 bg-white rounded-lg border border-slate-200">
            <div className="flex items-center justify-between text-[11px] font-bold text-slate-700">
              <span>Dragline DL-2496-01</span>
              <span className="text-emerald-600">Active</span>
            </div>
            <p className="text-slate-500 text-[11px] mt-1">Direct cast stripping on Bench 3 (Tub pressure normal)</p>
          </div>

          <div className="p-3 bg-white rounded-lg border border-slate-200">
            <div className="flex items-center justify-between text-[11px] font-bold text-slate-700">
              <span>Surface Miner SM-2200-02</span>
              <span className="text-emerald-600">Active</span>
            </div>
            <p className="text-slate-500 text-[11px] mt-1">Continuous cutting on Seam I (Conveyor belt loading)</p>
          </div>
        </div>
      </div>

      {/* Manager Shift Handover Log & Submission */}
      <form onSubmit={handleSubmitMuster} className="space-y-3">
        <label className="text-xs font-semibold text-slate-700 flex items-center justify-between">
          <span>Shift Manager Handover Observation Log</span>
          <span className="text-[10px] text-slate-400">DGMS Statutory Shift Book Record</span>
        </label>
        <textarea
          rows={2}
          value={managerLog}
          onChange={(e) => setManagerLog(e.target.value)}
          className="w-full text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-xl p-3 focus:outline-hidden focus:ring-1 focus:ring-amber-500"
          placeholder="Log any haul road abnormalities, shovel repositioning, or geological shifts..."
        />

        <div className="flex items-center justify-between">
          <span className="text-[11px] text-slate-500">
            {logSubmitted ? '✓ Statutory muster record logged to database' : 'Ready to sign off shift'}
          </span>
          <button
            type="submit"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-600 text-slate-950 transition shadow-xs"
          >
            <Send className="w-3.5 h-3.5" />
            Sign &amp; Commit Shift Log
          </button>
        </div>
      </form>
    </div>
  );
};
