'use client';

import React, { useState, useEffect } from 'react';
import { 
  Truck, 
  Activity, 
  Cpu, 
  AlertTriangle, 
  CheckCircle2, 
  Zap, 
  Gauge, 
  Flame, 
  RotateCcw, 
  Play, 
  Pause, 
  Sliders, 
  Layers, 
  ShieldAlert, 
  RefreshCw,
  TrendingUp,
  Download,
  Fuel,
  Clock,
  Radio,
  Search,
  Check
} from 'lucide-react';

interface FleetUnit {
  id: string;
  code: string;
  name: string;
  type: 'Dragline' | 'Electric Shovel' | 'Hydraulic Shovel' | 'Dumper 240T' | 'Dumper 150T' | 'Surface Miner' | 'Blast Drill';
  division: string;
  mine: string;
  status: 'Operating' | 'Idling' | 'Under Maintenance' | 'Fault Tripped';
  healthScore: number;
  availabilityPct: number;
  utilizationPct: number;
  fuelBurnLph: number;
  payloadTonnes: number;
  maxCapacityTonnes: number;
  engineRpm: number;
  coolantTempC: number;
  hydraulicPressureBar: number;
  vibrationMmSec: number;
  subsystems: {
    engine: number;
    hydraulics: number;
    transmission: number;
    undercarriage: number;
    bucketTool: number;
  };
  telemetryLog: string[];
}

const INITIAL_FLEET: FleetUnit[] = [
  {
    id: 'unit-dl-01',
    code: 'DL-2496-01',
    name: 'Walking Dragline 24/96 Heavy Rig',
    type: 'Dragline',
    division: 'Division A',
    mine: 'Northern Horizon Open Cast',
    status: 'Operating',
    healthScore: 94,
    availabilityPct: 88.5,
    utilizationPct: 82.1,
    fuelBurnLph: 0, // Electric powered
    payloadTonnes: 54,
    maxCapacityTonnes: 60,
    engineRpm: 1200,
    coolantTempC: 68,
    hydraulicPressureBar: 310,
    vibrationMmSec: 1.8,
    subsystems: { engine: 96, hydraulics: 92, transmission: 95, undercarriage: 90, bucketTool: 91 },
    telemetryLog: ['Hoist motor inverter in sync', 'Swing gear vibration normal (1.8 mm/s)', 'Tub pressure balanced at 310 bar']
  },
  {
    id: 'unit-es-02',
    code: 'SH-4200-03',
    name: 'Electric Rope Shovel 42m³ Ultra',
    type: 'Electric Shovel',
    division: 'Division B',
    mine: 'Eastern Ridge Deep Mine',
    status: 'Operating',
    healthScore: 89,
    availabilityPct: 84.2,
    utilizationPct: 79.4,
    fuelBurnLph: 0,
    payloadTonnes: 92,
    maxCapacityTonnes: 100,
    engineRpm: 1450,
    coolantTempC: 72,
    hydraulicPressureBar: 295,
    vibrationMmSec: 2.4,
    subsystems: { engine: 92, hydraulics: 86, transmission: 88, undercarriage: 85, bucketTool: 87 },
    telemetryLog: ['Crowd motor thermal gradient +1.2°C/hr', 'Dipper teeth wear level 18% (Acceptable)', 'Auto-lube cycle executed']
  },
  {
    id: 'unit-dp-03',
    code: 'DP-240T-14',
    name: 'Heavy Hauler Cat 793F 240-Tonne',
    type: 'Dumper 240T',
    division: 'Division A',
    mine: 'Northern Horizon Open Cast',
    status: 'Operating',
    healthScore: 91,
    availabilityPct: 86.8,
    utilizationPct: 81.0,
    fuelBurnLph: 142,
    payloadTonnes: 236,
    maxCapacityTonnes: 240,
    engineRpm: 1850,
    coolantTempC: 86,
    hydraulicPressureBar: 215,
    vibrationMmSec: 2.1,
    subsystems: { engine: 93, hydraulics: 90, transmission: 91, undercarriage: 88, bucketTool: 95 },
    telemetryLog: ['Grade resistance 8.4% on In-Pit Ramp 3', 'Brake cooling oil temperature 78°C', 'Payload weight verified at 236.4 T']
  },
  {
    id: 'unit-dp-04',
    code: 'DP-240T-19',
    name: 'Heavy Hauler Komatsu 930E 240-Tonne',
    type: 'Dumper 240T',
    division: 'Division C',
    mine: 'Central Quarry Block 4',
    status: 'Fault Tripped',
    healthScore: 61,
    availabilityPct: 62.0,
    utilizationPct: 44.5,
    fuelBurnLph: 178,
    payloadTonnes: 0,
    maxCapacityTonnes: 240,
    engineRpm: 950,
    coolantTempC: 104,
    hydraulicPressureBar: 165,
    vibrationMmSec: 6.8,
    subsystems: { engine: 54, hydraulics: 62, transmission: 68, undercarriage: 70, bucketTool: 90 },
    telemetryLog: ['CRITICAL: Coolant temp spike 104°C (Limit: 98°C)', 'Hydraulic manifold delta-P warning', 'Auto-shutdown interlock triggered']
  },
  {
    id: 'unit-sm-05',
    code: 'SM-2200-02',
    name: 'Wirtgen 2200 Surface Continuous Miner',
    type: 'Surface Miner',
    division: 'Division D',
    mine: 'Southern Plateau Section 2',
    status: 'Operating',
    healthScore: 95,
    availabilityPct: 91.2,
    utilizationPct: 87.6,
    fuelBurnLph: 88,
    payloadTonnes: 450, // Output tph
    maxCapacityTonnes: 500,
    engineRpm: 2100,
    coolantTempC: 81,
    hydraulicPressureBar: 280,
    vibrationMmSec: 1.4,
    subsystems: { engine: 97, hydraulics: 94, transmission: 96, undercarriage: 93, bucketTool: 94 },
    telemetryLog: ['Cutting drum rotational torque steady at 9,400 Nm', 'Dust suppression spray active at 4.2 bar', 'Clean coal discharge to conveyor']
  },
  {
    id: 'unit-dr-06',
    code: 'DR-SKS-07',
    name: 'Sandvik SKS-115 Rotary Blast Hole Drill',
    type: 'Blast Drill',
    division: 'Division E',
    mine: 'Western Valley Basin B',
    status: 'Under Maintenance',
    healthScore: 78,
    availabilityPct: 71.0,
    utilizationPct: 58.0,
    fuelBurnLph: 45,
    payloadTonnes: 0,
    maxCapacityTonnes: 0,
    engineRpm: 1500,
    coolantTempC: 75,
    hydraulicPressureBar: 210,
    vibrationMmSec: 3.2,
    subsystems: { engine: 82, hydraulics: 74, transmission: 80, undercarriage: 78, bucketTool: 72 },
    telemetryLog: ['Scheduled 250-hr drill rod & pull-down chain servicing', 'Compressor oil filter replaced', 'Pending calibration check']
  }
];

export const FleetTelematicsDigitalTwin: React.FC = () => {
  const [fleet, setFleet] = useState<FleetUnit[]>(INITIAL_FLEET);
  const [selectedUnitId, setSelectedUnitId] = useState<string>('unit-dl-01');
  const [activeTab, setActiveTab] = useState<'grid' | 'digital-twin' | 'telemetry-stream'>('digital-twin');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('ALL');
  const [isLiveSimulating, setIsLiveSimulating] = useState<boolean>(true);
  const [simulatedTick, setSimulatedTick] = useState<number>(0);
  const [faultInjected, setFaultInjected] = useState<string | null>(null);

  const selectedUnit = fleet.find(u => u.id === selectedUnitId) || fleet[0];

  // Live simulation ticker for realistic industrial IoT data streaming
  useEffect(() => {
    if (!isLiveSimulating) return;
    const interval = setInterval(() => {
      setSimulatedTick(prev => prev + 1);
      setFleet(prevFleet =>
        prevFleet.map(unit => {
          if (unit.status === 'Operating') {
            const rpmJitter = Math.floor((Math.random() - 0.5) * 30);
            const tempJitter = (Math.random() - 0.5) * 0.4;
            const vibJitter = (Math.random() - 0.5) * 0.1;
            return {
              ...unit,
              engineRpm: Math.max(800, unit.engineRpm + rpmJitter),
              coolantTempC: +(unit.coolantTempC + tempJitter).toFixed(1),
              vibrationMmSec: +Math.max(0.8, unit.vibrationMmSec + vibJitter).toFixed(2)
            };
          }
          return unit;
        })
      );
    }, 2500);

    return () => clearInterval(interval);
  }, [isLiveSimulating]);

  // Inject subsystem fault for interactive demonstration
  const handleInjectFault = (subsystemName: keyof FleetUnit['subsystems']) => {
    setFleet(prev =>
      prev.map(u => {
        if (u.id === selectedUnit.id) {
          const updatedSubsystems = { ...u.subsystems, [subsystemName]: Math.max(25, u.subsystems[subsystemName] - 35) };
          const avgHealth = Math.round(
            (updatedSubsystems.engine + updatedSubsystems.hydraulics + updatedSubsystems.transmission + updatedSubsystems.undercarriage + updatedSubsystems.bucketTool) / 5
          );
          return {
            ...u,
            status: avgHealth < 70 ? 'Fault Tripped' : 'Operating',
            healthScore: avgHealth,
            coolantTempC: subsystemName === 'engine' ? 106.5 : u.coolantTempC,
            hydraulicPressureBar: subsystemName === 'hydraulics' ? 140 : u.hydraulicPressureBar,
            telemetryLog: [
              `[SIMULATED FAULT]: High stress warning on ${subsystemName.toUpperCase()} subsystem!`,
              ...u.telemetryLog.slice(0, 4)
            ]
          };
        }
        return u;
      })
    );
    setFaultInjected(subsystemName);
  };

  const handleResetHealth = () => {
    const initialUnit = INITIAL_FLEET.find(u => u.id === selectedUnit.id);
    if (initialUnit) {
      setFleet(prev => prev.map(u => (u.id === selectedUnit.id ? { ...initialUnit } : u)));
    }
    setFaultInjected(null);
  };

  const filteredFleet = fleet.filter(u => {
    const matchesSearch = u.code.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          u.division.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'ALL' || u.type === filterType;
    return matchesSearch && matchesType;
  });

  // Calculate fleet stats
  const totalUnits = fleet.length;
  const operatingUnits = fleet.filter(u => u.status === 'Operating').length;
  const avgAvailability = (fleet.reduce((acc, u) => acc + u.availabilityPct, 0) / totalUnits).toFixed(1);
  const avgHealth = Math.round(fleet.reduce((acc, u) => acc + u.healthScore, 0) / totalUnits);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <Cpu className="w-4 h-4" />
            </div>
            <h2 className="text-xl font-semibold text-slate-900 tracking-tight">
              HEMM Fleet Telematics &amp; Digital Twin Simulator
            </h2>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100/70 text-emerald-800">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live IoT Edge Feed
            </span>
          </div>
          <p className="text-sm text-slate-600">
            Real-time digital twin telemetry, subsystem thermal-vibration degradation models, and predictive maintenance dispatch for mining heavy machinery across Divisions A–H.
          </p>
        </div>

        {/* Live Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsLiveSimulating(!isLiveSimulating)}
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all border ${
              isLiveSimulating 
                ? 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100' 
                : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {isLiveSimulating ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            {isLiveSimulating ? 'Streaming Active' : 'Simulation Paused'}
          </button>
          
          <button
            onClick={handleResetHealth}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-600 bg-slate-50 border border-slate-200 hover:bg-slate-100 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Twin
          </button>
        </div>
      </div>

      {/* Top High-Level Telemetry Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Fleet Availability</span>
            <Gauge className="w-4 h-4 text-sky-500" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">{avgAvailability}%</span>
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">+1.4% vs FY Plan</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">{operatingUnits} of {totalUnits} primary heavy units deployed</p>
        </div>

        <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Average Health Index</span>
            <Activity className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">{avgHealth}/100</span>
            <span className="text-xs font-semibold text-sky-600 bg-sky-50 px-1.5 py-0.5 rounded">Nominal</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Weighted mechanical &amp; thermal score</p>
        </div>

        <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Fuel / Power Burn Rate</span>
            <Fuel className="w-4 h-4 text-amber-500" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">453 L/hr</span>
            <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded">+ 1.8 MW Grid</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Real-time aggregate consumption</p>
        </div>

        <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Critical Tripped Alarms</span>
            <AlertTriangle className="w-4 h-4 text-rose-500" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-rose-600">
              {fleet.filter(u => u.status === 'Fault Tripped').length}
            </span>
            <span className="text-xs font-semibold text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded">Action Required</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Interlock shutdown on DP-240T-19</p>
        </div>
      </div>

      {/* Main Interactive Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Equipment Selector List (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-900">Active Heavy Fleet</h3>
              <span className="text-xs font-medium text-slate-500">{filteredFleet.length} units</span>
            </div>

            {/* Search and Filters */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Search equipment code, mine..."
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-slate-400"
              />
            </div>

            <div className="flex flex-wrap gap-1">
              {['ALL', 'Dragline', 'Electric Shovel', 'Dumper 240T', 'Surface Miner'].map(t => (
                <button
                  key={t}
                  onClick={() => setFilterType(t)}
                  className={`px-2 py-1 rounded-md text-[11px] font-medium transition-colors ${
                    filterType === t 
                      ? 'bg-slate-900 text-white' 
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Equipment Items */}
            <div className="space-y-2 max-h-[520px] overflow-y-auto pr-1">
              {filteredFleet.map(unit => {
                const isSelected = unit.id === selectedUnit.id;
                const statusColor = 
                  unit.status === 'Operating' ? 'bg-emerald-500' :
                  unit.status === 'Fault Tripped' ? 'bg-rose-500' :
                  unit.status === 'Under Maintenance' ? 'bg-amber-500' : 'bg-slate-400';

                return (
                  <div
                    key={unit.id}
                    onClick={() => setSelectedUnitId(unit.id)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer ${
                      isSelected 
                        ? 'bg-sky-50/50 border-sky-300 ring-1 ring-sky-300 shadow-xs' 
                        : 'bg-white border-slate-200/80 hover:border-slate-300 hover:bg-slate-50/50'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className={`w-2 h-2 rounded-full ${statusColor}`} />
                          <span className="font-semibold text-xs text-slate-900">{unit.code}</span>
                          <span className="text-[10px] text-slate-500 font-mono">({unit.type})</span>
                        </div>
                        <p className="text-xs text-slate-700 font-medium mt-0.5">{unit.name}</p>
                        <p className="text-[11px] text-slate-500">{unit.division} • {unit.mine}</p>
                      </div>
                      <div className="text-right">
                        <span className={`text-xs font-bold ${
                          unit.healthScore >= 90 ? 'text-emerald-600' :
                          unit.healthScore >= 75 ? 'text-amber-600' : 'text-rose-600'
                        }`}>
                          {unit.healthScore}%
                        </span>
                        <p className="text-[10px] text-slate-400">Health</p>
                      </div>
                    </div>

                    <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                      <span>Avail: <strong className="text-slate-700">{unit.availabilityPct}%</strong></span>
                      <span>RPM: <strong className="text-slate-700">{unit.engineRpm}</strong></span>
                      <span>Temp: <strong className={unit.coolantTempC > 95 ? 'text-rose-600 font-bold' : 'text-slate-700'}>{unit.coolantTempC}°C</strong></span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Digital Twin Inspection & Control Panel (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-6">
            
            {/* Header of Selected Unit */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-slate-900">{selectedUnit.name}</h3>
                  <span className="px-2 py-0.5 rounded-full text-xs font-mono font-semibold bg-slate-100 text-slate-700">
                    {selectedUnit.code}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                    selectedUnit.status === 'Operating' ? 'bg-emerald-100 text-emerald-800' :
                    selectedUnit.status === 'Fault Tripped' ? 'bg-rose-100 text-rose-800 animate-pulse' :
                    'bg-amber-100 text-amber-800'
                  }`}>
                    {selectedUnit.status}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Assigned to <strong className="text-slate-700">{selectedUnit.mine}</strong> ({selectedUnit.division}) • Model Telemetry Stream #T-{selectedUnit.id.slice(-4)}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500">Subsystem Health:</span>
                <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex flex-col items-center justify-center font-mono">
                  <span className="text-base font-bold leading-none">{selectedUnit.healthScore}</span>
                  <span className="text-[9px] text-slate-400">/100</span>
                </div>
              </div>
            </div>

            {/* Digital Twin Subsystem Heatmap & Radar */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-sky-600" />
                  Digital Twin Subsystem Degradation Matrix
                </h4>
                <span className="text-xs text-slate-500">Click a subsystem to simulate field stress</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {[
                  { key: 'engine', label: 'Powertrain / Motor', val: selectedUnit.subsystems.engine, icon: Zap },
                  { key: 'hydraulics', label: 'Hydraulics Circuit', val: selectedUnit.subsystems.hydraulics, icon: Flame },
                  { key: 'transmission', label: 'Drivetrain / Gears', val: selectedUnit.subsystems.transmission, icon: Gauge },
                  { key: 'undercarriage', label: 'Crawler / Tires', val: selectedUnit.subsystems.undercarriage, icon: Truck },
                  { key: 'bucketTool', label: 'Dipper / Cutter Tool', val: selectedUnit.subsystems.bucketTool, icon: Sliders }
                ].map(item => {
                  const Icon = item.icon;
                  const isStressed = item.val < 75;
                  return (
                    <button
                      key={item.key}
                      onClick={() => handleInjectFault(item.key as any)}
                      className={`p-3 rounded-xl border text-left transition-all hover:scale-[1.02] active:scale-95 ${
                        isStressed 
                          ? 'bg-rose-50/60 border-rose-300 ring-1 ring-rose-200' 
                          : 'bg-slate-50 border-slate-200 hover:border-slate-300 hover:bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <Icon className={`w-4 h-4 ${isStressed ? 'text-rose-600' : 'text-slate-600'}`} />
                        <span className={`text-xs font-bold font-mono ${
                          item.val >= 90 ? 'text-emerald-600' :
                          item.val >= 75 ? 'text-amber-600' : 'text-rose-600'
                        }`}>
                          {item.val}%
                        </span>
                      </div>
                      <p className="text-[11px] font-semibold text-slate-800 leading-tight">{item.label}</p>
                      <div className="w-full bg-slate-200 h-1 rounded-full mt-2 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            item.val >= 90 ? 'bg-emerald-500' :
                            item.val >= 75 ? 'bg-amber-500' : 'bg-rose-500'
                          }`}
                          style={{ width: `${item.val}%` }}
                        />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Live Mechanical & Operating Telemetry Gauges */}
            <div className="bg-slate-50/80 rounded-xl p-4 border border-slate-200">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-1.5">
                <Gauge className="w-3.5 h-3.5 text-emerald-600" />
                Live Sensor Telemetry Readouts
              </h4>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-white p-3 rounded-lg border border-slate-200/80 shadow-2xs">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Engine / Motor RPM</span>
                  <p className="text-lg font-bold text-slate-900 font-mono mt-0.5">{selectedUnit.engineRpm}</p>
                  <span className="text-[10px] text-emerald-600 font-medium">Nominal Operating Band</span>
                </div>

                <div className="bg-white p-3 rounded-lg border border-slate-200/80 shadow-2xs">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Coolant Temp (°C)</span>
                  <p className={`text-lg font-bold font-mono mt-0.5 ${
                    selectedUnit.coolantTempC > 98 ? 'text-rose-600' : 'text-slate-900'
                  }`}>
                    {selectedUnit.coolantTempC}°C
                  </p>
                  <span className="text-[10px] text-slate-500">Limit: 98.0°C</span>
                </div>

                <div className="bg-white p-3 rounded-lg border border-slate-200/80 shadow-2xs">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Hydraulic Pressure</span>
                  <p className="text-lg font-bold text-slate-900 font-mono mt-0.5">{selectedUnit.hydraulicPressureBar} bar</p>
                  <span className="text-[10px] text-slate-500">Rated: 350 bar</span>
                </div>

                <div className="bg-white p-3 rounded-lg border border-slate-200/80 shadow-2xs">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Tri-Axial Vibration</span>
                  <p className={`text-lg font-bold font-mono mt-0.5 ${
                    selectedUnit.vibrationMmSec > 4.0 ? 'text-rose-600' : 'text-slate-900'
                  }`}>
                    {selectedUnit.vibrationMmSec} mm/s
                  </p>
                  <span className="text-[10px] text-slate-500">ISO 10816 Class IV</span>
                </div>
              </div>
            </div>

            {/* AI Predictive Maintenance Diagnostics & Log Stream */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <Radio className="w-3.5 h-3.5 text-sky-600" />
                  Predictive Diagnostic Log &amp; Edge Telemetry
                </h4>
                <span className="text-[11px] font-mono text-slate-400">Tick #{simulatedTick}</span>
              </div>

              <div className="bg-slate-900 text-slate-200 rounded-xl p-4 font-mono text-xs space-y-2 border border-slate-800 shadow-inner max-h-48 overflow-y-auto">
                {selectedUnit.telemetryLog.map((log, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span className="text-sky-400 select-none">[{new Date().toLocaleTimeString()}]</span>
                    <span className={
                      log.includes('CRITICAL') || log.includes('FAULT') 
                        ? 'text-rose-400 font-bold' 
                        : log.includes('warning') 
                        ? 'text-amber-300' 
                        : 'text-slate-300'
                    }>
                      {log}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Predictive Recommendation Box */}
            <div className="p-4 rounded-xl bg-sky-50 border border-sky-100 flex items-start gap-3">
              <div className="w-7 h-7 rounded-lg bg-sky-500 text-white flex items-center justify-center shrink-0 mt-0.5">
                <Activity className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <h5 className="text-xs font-bold text-sky-950">AI Maintenance Prognostics</h5>
                <p className="text-xs text-sky-800 leading-relaxed">
                  {selectedUnit.healthScore >= 90
                    ? `Unit ${selectedUnit.code} shows high kinematic integrity. Next planned turnaround window is scheduled in 142 operating hours.`
                    : selectedUnit.healthScore >= 75
                    ? `Moderate thermal gradient detected on hydraulic loop. Recommended action: inspect oil cooler bypass valve at end-of-shift muster.`
                    : `CRITICAL DEGRADATION: Immediate intervention advised. Subsystem health has dropped below safe operational threshold (Score: ${selectedUnit.healthScore}/100). Auto-dispatching field technician to ${selectedUnit.mine}.`}
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
