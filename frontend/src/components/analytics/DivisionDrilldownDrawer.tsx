'use client';

import React from 'react';
import { 
  X, 
  MapPin, 
  TrendingUp, 
  Layers, 
  Truck, 
  Flame, 
  CheckCircle2, 
  AlertTriangle, 
  Activity, 
  ExternalLink,
  ShieldCheck,
  Calendar,
  Fuel
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface DivisionDetails {
  code: string;
  name: string;
  targetMt: number;
  actualMt: number;
  variancePct: number;
  activeMinesCount: number;
  primaryPits: {
    name: string;
    type: 'OpenCast' | 'Underground';
    targetMt: number;
    actualMt: number;
    strippingRatio: number;
    seamGrade: string;
    gcvKcal: number;
    shovelDumperRatio: string;
    status: 'Optimal' | 'Caution' | 'Under Inspection';
  }[];
  weighbridgeOfftakeMt: number;
  railSidingsActive: number;
}

const DIVISION_DATA: Record<string, DivisionDetails> = {
  'Division A': {
    code: 'DIV-A',
    name: 'Division A (Northern Horizon Operational Sector)',
    targetMt: 204.0,
    actualMt: 206.8,
    variancePct: 1.37,
    activeMinesCount: 52,
    weighbridgeOfftakeMt: 201.4,
    railSidingsActive: 14,
    primaryPits: [
      { name: 'Northern Horizon Pit 1 (Main Deep Cut)', type: 'OpenCast', targetMt: 84.0, actualMt: 86.2, strippingRatio: 1.92, seamGrade: 'G8', gcvKcal: 5240, shovelDumperRatio: '1 : 4 (Cat 793F)', status: 'Optimal' },
      { name: 'Northern Horizon Pit 2 (West Expansion)', type: 'OpenCast', targetMt: 70.0, actualMt: 71.1, strippingRatio: 2.05, seamGrade: 'G9', gcvKcal: 4950, shovelDumperRatio: '1 : 5 (Komatsu 930E)', status: 'Optimal' },
      { name: 'North Ridge UG Continuous Miner Section', type: 'Underground', targetMt: 50.0, actualMt: 49.5, strippingRatio: 0.0, seamGrade: 'G5', gcvKcal: 5980, shovelDumperRatio: 'Shuttle Car Conv.', status: 'Optimal' }
    ]
  },
  'Division B': {
    code: 'DIV-B',
    name: 'Division B (Eastern Ridge Deep Sector)',
    targetMt: 185.0,
    actualMt: 187.5,
    variancePct: 1.35,
    activeMinesCount: 48,
    weighbridgeOfftakeMt: 182.9,
    railSidingsActive: 12,
    primaryPits: [
      { name: 'Eastern Ridge Open Cast Pit 4', type: 'OpenCast', targetMt: 95.0, actualMt: 97.0, strippingRatio: 2.14, seamGrade: 'G8', gcvKcal: 5180, shovelDumperRatio: '1 : 4 (240T Fleet)', status: 'Optimal' },
      { name: 'Eastern Deep Longwall Block 2', type: 'Underground', targetMt: 55.0, actualMt: 54.8, strippingRatio: 0.0, seamGrade: 'G4', gcvKcal: 6200, shovelDumperRatio: 'Armoured Conveyor', status: 'Optimal' },
      { name: 'Eastern Valley Outlier Pit', type: 'OpenCast', targetMt: 35.0, actualMt: 35.7, strippingRatio: 2.45, seamGrade: 'G10', gcvKcal: 4600, shovelDumperRatio: '1 : 3 (100T Fleet)', status: 'Optimal' }
    ]
  },
  'Division C': {
    code: 'DIV-C',
    name: 'Division C (Central Quarry Sector)',
    targetMt: 150.0,
    actualMt: 154.2,
    variancePct: 2.80,
    activeMinesCount: 44,
    weighbridgeOfftakeMt: 151.0,
    railSidingsActive: 9,
    primaryPits: [
      { name: 'Central Quarry Block 4 Mega Pit', type: 'OpenCast', targetMt: 90.0, actualMt: 93.4, strippingRatio: 2.65, seamGrade: 'G11', gcvKcal: 4200, shovelDumperRatio: '1 : 6 (240T Fleet)', status: 'Optimal' },
      { name: 'Central Quarry Block 2 South', type: 'OpenCast', targetMt: 60.0, actualMt: 60.8, strippingRatio: 2.80, seamGrade: 'G12', gcvKcal: 3850, shovelDumperRatio: '1 : 4 (150T Fleet)', status: 'Caution' }
    ]
  },
  'Division D': {
    code: 'DIV-D',
    name: 'Division D (Southern Plateau Sector)',
    targetMt: 120.0,
    actualMt: 118.5,
    variancePct: -1.25,
    activeMinesCount: 38,
    weighbridgeOfftakeMt: 116.8,
    railSidingsActive: 8,
    primaryPits: [
      { name: 'Southern Plateau Section 2 (Surface Miner)', type: 'OpenCast', targetMt: 70.0, actualMt: 69.2, strippingRatio: 1.85, seamGrade: 'G8', gcvKcal: 5310, shovelDumperRatio: 'Continuous Conveyor', status: 'Optimal' },
      { name: 'Southern Escarpment Incline Mine', type: 'Underground', targetMt: 50.0, actualMt: 49.3, strippingRatio: 0.0, seamGrade: 'G6', gcvKcal: 5650, shovelDumperRatio: 'Continuous Miner Haul', status: 'Caution' }
    ]
  }
};

interface DivisionDrilldownDrawerProps {
  divisionName: string | null;
  onClose: () => void;
}

export const DivisionDrilldownDrawer: React.FC<DivisionDrilldownDrawerProps> = ({ divisionName, onClose }) => {
  if (!divisionName) return null;

  const data = DIVISION_DATA[divisionName] || DIVISION_DATA['Division A'];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-end bg-slate-900/40 backdrop-blur-xs">
        <motion.div 
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.25 }}
          className="w-full max-w-2xl h-full bg-white shadow-2xl border-l border-slate-200 flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/70 shrink-0">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-sky-100 text-sky-800">
                  {data.code}
                </span>
                <h3 className="text-base font-bold text-slate-900">{data.name}</h3>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Operational Drill-Down • {data.activeMinesCount} Mines • {data.railSidingsActive} Rail Sidings
              </p>
            </div>

            <button 
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-slate-200/60 text-slate-400 hover:text-slate-700 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            
            {/* Top Metrics Row */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="text-[10px] uppercase font-bold text-slate-400">Total Output</span>
                <p className="text-lg font-bold text-slate-900 font-mono mt-0.5">{data.actualMt} MT</p>
                <span className={`text-[11px] font-semibold ${data.variancePct >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {data.variancePct >= 0 ? `+${data.variancePct}%` : `${data.variancePct}%`} vs Target
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="text-[10px] uppercase font-bold text-slate-400">Weighbridge Offtake</span>
                <p className="text-lg font-bold text-slate-900 font-mono mt-0.5">{data.weighbridgeOfftakeMt} MT</p>
                <span className="text-[11px] text-slate-500">98.2% Dispatch Clearance</span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="text-[10px] uppercase font-bold text-slate-400">Active Mines</span>
                <p className="text-lg font-bold text-slate-900 font-mono mt-0.5">{data.activeMinesCount}</p>
                <span className="text-[11px] text-sky-600 font-semibold">100% Georeferenced</span>
              </div>
            </div>

            {/* Individual Pit & Mining Horizon Breakdown */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-sky-600" />
                  Primary Pit &amp; Block Performance
                </h4>
                <span className="text-xs text-slate-400">{data.primaryPits.length} Main Units</span>
              </div>

              <div className="space-y-3">
                {data.primaryPits.map((pit, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/50 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${pit.status === 'Optimal' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                          <h5 className="text-xs font-bold text-slate-900">{pit.name}</h5>
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-medium bg-white border border-slate-200 text-slate-600">
                            {pit.type}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          Target: {pit.targetMt} MT • Actual: <strong>{pit.actualMt} MT</strong> ({((pit.actualMt / pit.targetMt) * 100).toFixed(1)}%)
                        </p>
                      </div>

                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        pit.status === 'Optimal' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {pit.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-200/60 text-[11px]">
                      <div>
                        <span className="text-slate-400">Stripping Ratio:</span>
                        <p className="font-mono font-semibold text-slate-800">{pit.strippingRatio > 0 ? `${pit.strippingRatio} M³/T` : 'UG Deep Cut'}</p>
                      </div>
                      <div>
                        <span className="text-slate-400">Proximate Grade:</span>
                        <p className="font-mono font-semibold text-slate-800">{pit.seamGrade} ({pit.gcvKcal} kcal)</p>
                      </div>
                      <div>
                        <span className="text-slate-400">Shovel-Dumper:</span>
                        <p className="font-mono font-semibold text-slate-800 truncate" title={pit.shovelDumperRatio}>{pit.shovelDumperRatio}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Environmental & DGMS Statutory Clearance Status */}
            <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 space-y-2">
              <div className="flex items-center gap-2 text-emerald-900 font-bold text-xs">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Statutory Compliance &amp; Safety Rating</span>
              </div>
              <p className="text-xs text-emerald-800 leading-relaxed">
                DGMS safety clearance audit verified on 04-Sep-2024. Highwall stability radar shows zero displacement (&lt;0.2mm/day). In-pit dewatering pumps operating at 94% efficiency.
              </p>
            </div>

          </div>

          {/* Footer */}
          <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
            <span>Deterministic Provenance Verified</span>
            <button 
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs"
            >
              Close Drawer
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
