'use client';

import { useState } from 'react';
import { 
  Layers, 
  ChevronRight, 
  Eye, 
  Flame, 
  Droplets, 
  Sparkles, 
  ShieldCheck, 
  Database,
  Compass
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Evidence } from '@/types';

interface SeamLayer {
  id: string;
  name: string;
  type: 'soil' | 'rock' | 'coal' | 'basement';
  depthRange: string;
  thickness: number; // meters
  color: string;
  gcv?: string;
  gcvKcal?: number;
  ashPct?: number;
  moisturePct?: number;
  volatileMatterPct?: number;
  provedReservesMt?: number;
  geologicalDescription: string;
  drillHoleRef: string;
  evidenceSnippet: string;
}

const STRATIGRAPHY_LAYERS: SeamLayer[] = [
  {
    id: 'layer-0',
    name: 'Topsoil & Alluvial Sediments',
    type: 'soil',
    depthRange: '0.0m - 12.0m',
    thickness: 12.0,
    color: 'bg-amber-100 border-amber-300 text-amber-900',
    geologicalDescription: 'Quaternary un-consolidated topsoil and weathered silt layer required for post-mining reclamation.',
    drillHoleRef: 'BH-B4-01 (0.0 - 12.0m)',
    evidenceSnippet: 'Topsoil preservation layer surveyed at 12.0m average depth for statutory environmental compliance.'
  },
  {
    id: 'layer-1',
    name: 'Upper Sandstone Overburden',
    type: 'rock',
    depthRange: '12.0m - 45.0m',
    thickness: 33.0,
    color: 'bg-stone-200 border-stone-400 text-stone-800',
    geologicalDescription: 'Medium-grained massive feldspathic sandstone forming the competent overburden bench.',
    drillHoleRef: 'BH-B4-01 (12.0 - 45.0m)',
    evidenceSnippet: 'Competent sandstone strata excavated via dragline operations; average stripping ratio factor 2.53 M3/T.'
  },
  {
    id: 'layer-2',
    name: 'Seam I (Main Thermal Horizon - G8)',
    type: 'coal',
    depthRange: '45.0m - 58.2m',
    thickness: 13.2,
    color: 'bg-slate-900 border-blue-500 text-white shadow-lg ring-2 ring-blue-500/30',
    gcv: 'Grade G8 (4,900 - 5,200 kcal/kg)',
    gcvKcal: 5080,
    ashPct: 18.5,
    moisturePct: 7.2,
    volatileMatterPct: 28.4,
    provedReservesMt: 124.50,
    geologicalDescription: 'Continuous, high-grade non-coking coal seam with low sulphur content, primary feed for thermal power stations.',
    drillHoleRef: 'BH-B4-01 (45.0 - 58.2m) • Core Recovery 98.4%',
    evidenceSnippet: 'Seam I intercepted at 45.0m depth with 13.2m clean coal thickness. Average GCV verified at 5,080 kcal/kg.'
  },
  {
    id: 'layer-3',
    name: 'Interburden Sandstone & Carbonaceous Shale',
    type: 'rock',
    depthRange: '58.2m - 92.0m',
    thickness: 33.8,
    color: 'bg-stone-300 border-stone-400 text-stone-800',
    geologicalDescription: 'Interbedded grey shale and fine-grained sandstone separating upper and lower seam complexes.',
    drillHoleRef: 'BH-B4-01 (58.2 - 92.0m)',
    evidenceSnippet: 'Interburden parting verified by wireline gamma-ray logs; required hydraulic shovel benching.'
  },
  {
    id: 'layer-4',
    name: 'Seam II (Deep Coking Horizon - G5/Steel Blend)',
    type: 'coal',
    depthRange: '92.0m - 100.8m',
    thickness: 8.8,
    color: 'bg-slate-950 border-indigo-500 text-white shadow-lg ring-2 ring-indigo-500/30',
    gcv: 'Grade G5 (5,800 - 6,100 kcal/kg)',
    gcvKcal: 5920,
    ashPct: 13.8,
    moisturePct: 4.6,
    volatileMatterPct: 24.1,
    provedReservesMt: 63.40,
    geologicalDescription: 'High-rank semi-coking coal seam suitable for metallurgical blend and direct steel processing.',
    drillHoleRef: 'BH-B4-01 (92.0 - 100.8m) • Core Recovery 99.1%',
    evidenceSnippet: 'Seam II deep horizon contains 63.40 MT proved metallurgical coking reserves with 13.8% ash content.'
  },
  {
    id: 'layer-5',
    name: 'Basement Archaean Granite Bedrock',
    type: 'basement',
    depthRange: '100.8m+',
    thickness: 50.0,
    color: 'bg-zinc-400 border-zinc-500 text-zinc-900',
    geologicalDescription: 'Crystalline basement metamorphic rock defining the structural base of the coal basin.',
    drillHoleRef: 'BH-B4-01 (100.8m termination)',
    evidenceSnippet: 'Borehole terminated in impermeable basement granite, establishing the floor depth.'
  }
];

interface SeamStratigraphyVisualizerProps {
  onInspectEvidence?: (evidence: Evidence) => void;
}

export function SeamStratigraphyVisualizer({ onInspectEvidence }: SeamStratigraphyVisualizerProps) {
  const [selectedLayer, setSelectedLayer] = useState<SeamLayer>(STRATIGRAPHY_LAYERS[2]);

  return (
    <div className="ambient-card p-8 md:p-10 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-blue-600" />
            <h3 className="text-base font-bold text-slate-900">
              Subsurface Geological Seam Stratigraphy & Borehole Core Log
            </h3>
            <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-mono font-bold border border-blue-200">
              Borehole: BH-B4-01
            </span>
          </div>
          <p className="text-xs text-slate-500">
            Interactive vertical core lithology, seam thicknesses, proximate quality metrics, and proved reserve inventory.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
          <span>Depth: 0m → 100.8m</span>
        </div>
      </div>

      {/* 2-Column Lithology Column + Seam Inspection Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Interactive Vertical Core Column (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
            <span>Stratigraphic Column</span>
            <span>Depth (m)</span>
          </div>

          <div className="space-y-2 select-none">
            {STRATIGRAPHY_LAYERS.map((layer) => {
              const isSelected = selectedLayer.id === layer.id;
              const isCoal = layer.type === 'coal';

              return (
                <motion.div
                  key={layer.id}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => setSelectedLayer(layer)}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${layer.color} ${
                    isSelected ? 'ring-4 ring-blue-500/20 scale-[1.02]' : 'opacity-85 hover:opacity-100'
                  }`}
                  style={{ minHeight: `${Math.max(54, layer.thickness * 2.8)}px` }}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      {isCoal && <Flame className="w-3.5 h-3.5 text-amber-400 animate-pulse" />}
                      <span className={`text-xs font-bold ${isCoal ? 'text-white' : 'text-slate-900'}`}>
                        {layer.name}
                      </span>
                    </div>
                    <div className={`text-[11px] font-mono ${isCoal ? 'text-slate-300' : 'text-slate-500'}`}>
                      Thickness: {layer.thickness}m • {layer.type.toUpperCase()}
                    </div>
                  </div>

                  <div className={`text-right font-mono text-xs font-bold ${isCoal ? 'text-blue-300' : 'text-slate-600'}`}>
                    {layer.depthRange}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Right: Selected Layer Detailed Proximate Analysis Card (7 cols) */}
        <div className="lg:col-span-7 ambient-card p-7 space-y-6 bg-slate-50/50 border border-slate-200">
          <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <span className="text-[10px] font-mono font-bold text-blue-600 uppercase bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                {selectedLayer.type.toUpperCase()} HORIZON
              </span>
              <h4 className="text-base font-bold text-slate-900 mt-1.5">{selectedLayer.name}</h4>
              <p className="text-xs text-slate-500 font-mono mt-0.5">
                Borehole Reference: {selectedLayer.drillHoleRef}
              </p>
            </div>

            <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-mono font-bold">
              Proved Horizon
            </span>
          </div>

          <div className="space-y-2">
            <span className="text-[11px] font-mono font-bold text-slate-400 uppercase">Geological Lithology Notes</span>
            <p className="text-xs text-slate-700 leading-relaxed bg-white p-4 rounded-xl border border-slate-200">
              {selectedLayer.geologicalDescription}
            </p>
          </div>

          {/* Proximate Quality Metrics (If Coal Seam) */}
          {selectedLayer.type === 'coal' ? (
            <div className="space-y-3">
              <div className="text-[11px] font-mono font-bold text-slate-400 uppercase">
                Proximate Quality Analysis & Energy Content
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                <div className="p-3.5 rounded-xl bg-white border border-slate-200 text-center">
                  <div className="text-slate-400 text-[10px]">Gross Calorific (GCV)</div>
                  <div className="font-bold text-blue-600 text-sm mt-0.5">{selectedLayer.gcvKcal} kcal/kg</div>
                </div>
                <div className="p-3.5 rounded-xl bg-white border border-slate-200 text-center">
                  <div className="text-slate-400 text-[10px]">Ash Content</div>
                  <div className="font-bold text-slate-900 text-sm mt-0.5">{selectedLayer.ashPct}%</div>
                </div>
                <div className="p-3.5 rounded-xl bg-white border border-slate-200 text-center">
                  <div className="text-slate-400 text-[10px]">Moisture %</div>
                  <div className="font-bold text-slate-900 text-sm mt-0.5">{selectedLayer.moisturePct}%</div>
                </div>
                <div className="p-3.5 rounded-xl bg-white border border-slate-200 text-center">
                  <div className="text-slate-400 text-[10px]">Proved Reserves</div>
                  <div className="font-bold text-emerald-600 text-sm mt-0.5">{selectedLayer.provedReservesMt} MT</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-white border border-slate-200 text-xs font-mono text-slate-500">
              Non-coal lithology strata. Density: 2.45 g/cm³ • Compressive Strength: 42.5 MPa.
            </div>
          )}

          <div className="pt-2 flex items-center justify-between border-t border-slate-200">
            <span className="text-xs text-slate-500 font-mono">
              Drill-Core Recovery Index: 98.8%
            </span>

            <button
              onClick={() => onInspectEvidence?.({
                id: `ev-${selectedLayer.id}`,
                document_id: 'doc-003',
                document_name: 'Geological_Exploration_Block_IV_Dossier.pdf',
                page_number: 14,
                table_reference: 'Borehole Log Sheet 2.1: BH-B4-01',
                snippet: selectedLayer.evidenceSnippet,
                confidence: 99.4
              })}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition shadow-xs"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Inspect Drill-Hole Citation</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
