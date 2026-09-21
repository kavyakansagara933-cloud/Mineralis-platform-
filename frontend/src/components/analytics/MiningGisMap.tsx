'use client';

import { useState, useEffect } from 'react';
import { 
  MapPin, 
  Layers, 
  Search, 
  Filter, 
  CheckCircle2, 
  AlertTriangle, 
  Eye, 
  Maximize2,
  TrendingUp,
  Compass,
  Truck,
  Activity,
  ShieldCheck,
  Radio,
  ExternalLink,
  ChevronRight,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Evidence } from '@/types';

interface MinePin {
  id: string;
  name: string;
  division: string;
  x: number; // percentage on map X
  y: number; // percentage on map Y
  type: 'Opencast' | 'Underground' | 'Mixed';
  output: number; // MT
  target: number; // MT
  variance: number; // %
  obr: number; // M3/T
  status: 'optimal' | 'alert' | 'pending';
  lat: string;
  long: string;
  seamDepthM: number;
  gcvKcalKg: number;
  activeEquipment: string;
  slopeFactor: number;
}

const MINE_PINS: MinePin[] = [
  { id: 'M-101', name: 'Block IV Surface Mine', division: 'Division B', x: 52, y: 46, type: 'Opencast', output: 59.8, target: 55.0, variance: 8.7, obr: 2.14, status: 'optimal', lat: '22.35° N', long: '82.68° E', seamDepthM: 145, gcvKcalKg: 4650, activeEquipment: '1x Dragline, 3x Shovels 42m³, 18x Dumpers 240T', slopeFactor: 1.45 },
  { id: 'M-102', name: 'Central Seam Opencast Block', division: 'Division B', x: 58, y: 52, type: 'Opencast', output: 48.5, target: 45.0, variance: 7.8, obr: 2.30, status: 'optimal', lat: '22.41° N', long: '83.12° E', seamDepthM: 180, gcvKcalKg: 4800, activeEquipment: '2x Surface Miners, 12x Dumpers 150T', slopeFactor: 1.38 },
  { id: 'M-103', name: 'Eastern Valley Surface Pit', division: 'Division A', x: 68, y: 40, type: 'Opencast', output: 34.2, target: 32.0, variance: 6.9, obr: 1.95, status: 'optimal', lat: '23.75° N', long: '86.42° E', seamDepthM: 110, gcvKcalKg: 5200, activeEquipment: '2x Rope Shovels, 14x Dumpers 240T', slopeFactor: 1.52 },
  { id: 'M-104', name: 'Northern Horizon Pit 02', division: 'Division C', x: 48, y: 30, type: 'Opencast', output: 42.1, target: 40.0, variance: 5.2, obr: 2.40, status: 'optimal', lat: '24.18° N', long: '82.65° E', seamDepthM: 210, gcvKcalKg: 4300, activeEquipment: '1x Dragline 24/96, 4x Hydraulic Excavators', slopeFactor: 1.41 },
  { id: 'M-105', name: 'Central Basin Underground Complex', division: 'Division D', x: 42, y: 48, type: 'Underground', output: 14.2, target: 15.0, variance: -5.3, obr: 0.0, status: 'alert', lat: '23.24° N', long: '79.95° E', seamDepthM: 320, gcvKcalKg: 5800, activeEquipment: '1x Continuous Miner (Joy), 2x Shuttle Cars', slopeFactor: 1.65 },
  { id: 'M-106', name: 'Southern Seam Pit 05', division: 'Division E', x: 46, y: 68, type: 'Opencast', output: 28.4, target: 30.0, variance: -5.3, obr: 2.65, status: 'alert', lat: '17.85° N', long: '80.55° E', seamDepthM: 165, gcvKcalKg: 3950, activeEquipment: '2x Shovels 20m³, 10x Dumpers 100T', slopeFactor: 1.29 },
  { id: 'M-107', name: 'Western Valley Surface Pit 03', division: 'Division F', x: 36, y: 56, type: 'Opencast', output: 22.8, target: 22.0, variance: 3.6, obr: 2.20, status: 'optimal', lat: '20.95° N', long: '79.10° E', seamDepthM: 130, gcvKcalKg: 4400, activeEquipment: '1x Surface Miner, 8x Dumpers 150T', slopeFactor: 1.48 },
  { id: 'M-108', name: 'Eastern Sub-Basin Pit 01', division: 'Division G', x: 76, y: 36, type: 'Opencast', output: 16.8, target: 16.0, variance: 5.0, obr: 2.20, status: 'optimal', lat: '26.85° N', long: '93.40° E', seamDepthM: 95, gcvKcalKg: 5900, activeEquipment: '1x Rope Shovel 10m³, 6x Dumpers 85T', slopeFactor: 1.55 },
  { id: 'M-109', name: 'Deep Horizon Mechanized Longwall', division: 'Division H', x: 64, y: 48, type: 'Underground', output: 12.5, target: 14.2, variance: -11.9, obr: 0.0, status: 'alert', lat: '23.80° N', long: '86.25° E', seamDepthM: 410, gcvKcalKg: 6200, activeEquipment: '1x Powered Roof Supports (2x1750T), Shearer', slopeFactor: 1.72 },
];

interface MiningGisMapProps {
  onInspectEvidence?: (evidence: Evidence) => void;
}

export function MiningGisMap({ onInspectEvidence }: MiningGisMapProps) {
  const [selectedDivision, setSelectedDivision] = useState<string>('ALL');
  const [selectedMine, setSelectedMine] = useState<MinePin | null>(MINE_PINS[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [mapLayer, setMapLayer] = useState<'topo' | 'geology' | 'telematics'>('topo');
  const [pulseTick, setPulseTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulseTick((p) => (p + 1) % 100);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const filteredPins = MINE_PINS.filter((pin) => {
    const matchDiv = selectedDivision === 'ALL' || pin.division === selectedDivision;
    const matchSearch = searchQuery === '' || pin.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchDiv && matchSearch;
  });

  const divisions = ['ALL', 'Division A', 'Division B', 'Division C', 'Division D', 'Division E', 'Division F', 'Division G', 'Division H'];

  return (
    <div className="ambient-card overflow-hidden border border-slate-200/90 shadow-xs bg-white rounded-3xl">
      {/* Header Bar */}
      <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50/50">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shadow-2xs">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <span>Geospatial Pit GIS & Strata Spatial Map</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-mono font-bold border border-emerald-200">
                  Live GPS
                </span>
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Interactive 315-mine telemetry coordinates, open-cast benches, and longwall seam telemetry.
              </p>
            </div>
          </div>
        </div>

        {/* Layer Controls & Search */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center bg-slate-200/70 p-1 rounded-xl text-xs font-semibold">
            <button 
              onClick={() => setMapLayer('topo')}
              className={`px-3 py-1.5 rounded-lg transition ${mapLayer === 'topo' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'}`}
            >
              Topographical
            </button>
            <button 
              onClick={() => setMapLayer('geology')}
              className={`px-3 py-1.5 rounded-lg transition ${mapLayer === 'geology' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'}`}
            >
              Strata Seams
            </button>
            <button 
              onClick={() => setMapLayer('telematics')}
              className={`px-3 py-1.5 rounded-lg transition ${mapLayer === 'telematics' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'}`}
            >
              Fleet GPS
            </button>
          </div>

          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text"
              placeholder="Filter mine pit..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
        </div>
      </div>

      {/* Division Selector Pills */}
      <div className="px-6 py-2.5 bg-slate-50/80 border-b border-slate-100 flex items-center gap-2 overflow-x-auto text-xs font-medium text-slate-600 scrollbar-none">
        <span className="text-slate-400 font-mono text-[11px] shrink-0">Filter Division:</span>
        {divisions.map((div) => (
          <button
            key={div}
            onClick={() => setSelectedDivision(div)}
            className={`px-3 py-1 rounded-lg text-xs shrink-0 transition ${
              selectedDivision === div 
                ? 'bg-blue-600 text-white font-bold shadow-xs' 
                : 'bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-100'
            }`}
          >
            {div}
          </button>
        ))}
      </div>

      {/* Main Split Grid: Map Canvas + Telemetry Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[480px]">
        {/* Left Side: Interactive SVG Map Canvas */}
        <div className="lg:col-span-8 relative bg-slate-900 p-6 flex items-center justify-center overflow-hidden select-none">
          {/* Subtle Grid Lines & Background */}
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>

          {/* SVG Map Canvas */}
          <svg className="w-full h-full max-h-[440px]" viewBox="0 0 1000 600" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Topographical Contour Elevation Lines */}
            <g opacity="0.25" stroke="#38BDF8" strokeWidth="1" strokeDasharray="4 4">
              <ellipse cx="520" cy="300" rx="440" ry="240" />
              <ellipse cx="530" cy="290" rx="350" ry="190" />
              <ellipse cx="540" cy="280" rx="260" ry="140" />
              <ellipse cx="550" cy="270" rx="160" ry="90" />
            </g>

            {/* Geological Fault Line */}
            <path 
              d="M 120 180 Q 300 240 480 200 T 880 340" 
              stroke="#0EA5E9" 
              strokeWidth="2" 
              opacity="0.4" 
              fill="none" 
            />

            {/* Haul Roads & Track Infrastructure */}
            <g opacity="0.3" stroke="#F59E0B" strokeWidth="1.5">
              <path d="M 480 300 L 520 460 L 580 520" />
              <path d="M 520 460 L 680 400 L 760 360" />
              <path d="M 480 300 L 420 480 L 460 680" />
            </g>

            {/* Geological Seam Shading Overlay */}
            {mapLayer === 'geology' && (
              <g opacity="0.25">
                <polygon points="450,220 620,240 680,380 480,340" fill="#10B981" />
                <polygon points="320,380 480,410 460,540 300,500" fill="#6366F1" />
                <text x="500" y="280" fill="#10B981" fontSize="16" fontFamily="monospace" fontWeight="bold">Seam V-VII High-GCV Basin</text>
              </g>
            )}

            {/* Dynamic Fleet Haulage Markers */}
            {mapLayer === 'telematics' && (
              <g>
                <circle cx={520 + Math.sin(pulseTick * 0.1) * 20} cy={460 + Math.cos(pulseTick * 0.1) * 15} r="5" fill="#F59E0B" className="animate-pulse" />
                <circle cx={680 + Math.cos(pulseTick * 0.1) * 25} cy={400 + Math.sin(pulseTick * 0.1) * 15} r="5" fill="#38BDF8" className="animate-pulse" />
                <circle cx={420 - Math.sin(pulseTick * 0.1) * 15} cy={480 + Math.cos(pulseTick * 0.1) * 20} r="5" fill="#10B981" className="animate-pulse" />
              </g>
            )}

            {/* Mine Location Pins */}
            {filteredPins.map((pin) => {
              const cx = (pin.x / 100) * 1000;
              const cy = (pin.y / 100) * 600;
              const isSelected = selectedMine?.id === pin.id;
              const isAlert = pin.status === 'alert';

              return (
                <g 
                  key={pin.id} 
                  onClick={() => setSelectedMine(pin)}
                  className="cursor-pointer transition-transform hover:scale-110"
                >
                  {(isSelected || isAlert) && (
                    <circle
                      cx={cx}
                      cy={cy}
                      r={isSelected ? "26" : "18"}
                      fill={isAlert ? "#EF4444" : "#38BDF8"}
                      opacity="0.2"
                      className="animate-ping"
                    />
                  )}

                  <circle
                    cx={cx}
                    cy={cy}
                    r={isSelected ? "16" : "12"}
                    fill={isSelected ? "#2563EB" : isAlert ? "#DC2626" : "#0F172A"}
                    stroke={isSelected ? "#FFFFFF" : isAlert ? "#FCA5A5" : "#38BDF8"}
                    strokeWidth="2.5"
                  />

                  <circle
                    cx={cx}
                    cy={cy}
                    r="4"
                    fill="#FFFFFF"
                  />

                  <text
                    x={cx}
                    y={cy - 22}
                    textAnchor="middle"
                    fill={isSelected ? "#38BDF8" : "#E2E8F0"}
                    fontSize="12"
                    fontFamily="monospace"
                    fontWeight="bold"
                    className="drop-shadow-md"
                  >
                    {pin.name}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Map Legend Overlay */}
          <div className="absolute bottom-4 left-4 bg-slate-900/80 backdrop-blur-md border border-slate-700/70 p-3 rounded-2xl flex items-center gap-4 text-[11px] font-mono text-slate-300">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
              <span>Selected Pit</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <span>Optimal (+Output)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
              <span>Target Alert</span>
            </div>
          </div>
        </div>

        {/* Right Side: Selected Mine Inspector Card */}
        <div className="lg:col-span-4 p-6 bg-slate-50 border-t lg:border-t-0 lg:border-l border-slate-200 flex flex-col justify-between">
          {selectedMine ? (
            <div className="space-y-5">
              <div>
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-mono font-bold uppercase tracking-wider">
                    {selectedMine.division}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                    selectedMine.status === 'optimal' 
                      ? 'bg-emerald-100 text-emerald-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {selectedMine.type} • {selectedMine.variance > 0 ? `+${selectedMine.variance}%` : `${selectedMine.variance}%`}
                  </span>
                </div>

                <h4 className="text-lg font-bold text-slate-900 mt-2">
                  {selectedMine.name}
                </h4>
                <p className="text-xs text-slate-500 font-mono mt-0.5">
                  GPS: {selectedMine.lat}, {selectedMine.long} • ID: {selectedMine.id}
                </p>
              </div>

              {/* Core Telemetry Metrics */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs">
                  <div className="text-[11px] font-medium text-slate-500">Annual Output</div>
                  <div className="text-lg font-extrabold text-slate-900 font-mono mt-0.5">
                    {selectedMine.output} <span className="text-xs font-normal text-slate-400">MT</span>
                  </div>
                  <div className="text-[10px] text-slate-400">Target: {selectedMine.target} MT</div>
                </div>

                <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs">
                  <div className="text-[11px] font-medium text-slate-500">Stripping Ratio</div>
                  <div className="text-lg font-extrabold text-slate-900 font-mono mt-0.5">
                    {selectedMine.obr} <span className="text-xs font-normal text-slate-400">m³/t</span>
                  </div>
                  <div className="text-[10px] text-emerald-600 font-semibold">Seam: {selectedMine.seamDepthM}m RL</div>
                </div>
              </div>

              {/* Geological & Heavy Machinery Spec */}
              <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-2.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Gross Calorific Value:</span>
                  <span className="font-bold text-slate-800 font-mono">{selectedMine.gcvKcalKg} kcal/kg (G5)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">DGMS Slope Stability Factor:</span>
                  <span className="font-bold text-emerald-700 font-mono">FoSL {selectedMine.slopeFactor} (Safe)</span>
                </div>
                <div className="pt-2 border-t border-slate-100">
                  <span className="text-slate-500 block mb-1 font-medium">Deployed Machinery:</span>
                  <span className="font-mono text-[11px] text-slate-700 leading-snug block bg-slate-50 p-2 rounded-lg border border-slate-100">
                    {selectedMine.activeEquipment}
                  </span>
                </div>
              </div>

              {/* Action: View Provenance & Evidence */}
              {onInspectEvidence && (
                <button
                  onClick={() => onInspectEvidence({
                    id: `ev-${selectedMine.id}`,
                    document_id: 'doc-annual-ops-2024',
                    document_name: `Statutory_Mine_Compliance_${selectedMine.division.replace(' ', '_')}.pdf`,
                    page_number: 14,
                    table_reference: `Table 3.1: ${selectedMine.name} Geotechnical Log`,
                    snippet: `${selectedMine.name} (${selectedMine.division}): Actual Output ${selectedMine.output} MT vs Target ${selectedMine.target} MT (Variance ${selectedMine.variance}%). Stripping Ratio ${selectedMine.obr} m3/t, GCV ${selectedMine.gcvKcalKg} kcal/kg.`,
                    confidence: 99
                  })}
                  className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition shadow-xs"
                >
                  <Eye className="w-4 h-4" />
                  <span>Inspect Official Evidence & Citations</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
              <MapPin className="w-8 h-8 mb-2 opacity-50" />
              <p className="text-xs">Select any mine pin on the GIS map to inspect live telematics, geological strata, and provenance.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
