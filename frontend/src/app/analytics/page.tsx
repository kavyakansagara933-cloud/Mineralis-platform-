'use client';

import React, { useState } from 'react';
import { 
  BarChart3, 
  MapPin, 
  Sliders, 
  Layers, 
  Cpu, 
  Download, 
  Calendar,
  Filter,
  RefreshCw
} from 'lucide-react';
import { AnalyticsCharts } from '@/components/analytics/AnalyticsCharts';
import { MiningGisMap } from '@/components/analytics/MiningGisMap';
import { ScenarioSimulator } from '@/components/analytics/ScenarioSimulator';
import { SeamStratigraphyVisualizer } from '@/components/analytics/SeamStratigraphyVisualizer';
import { FormulaBuilderStudio } from '@/components/analytics/FormulaBuilderStudio';
import { FleetTelematicsDigitalTwin } from '@/components/analytics/FleetTelematicsDigitalTwin';

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState<'trends' | 'gis' | 'simulator' | 'geology' | 'fleet' | 'formula'>('trends');

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Advanced Analytics &amp; Operations Intelligence</h1>
          <p className="text-sm text-slate-600 mt-1">
            Spatial GIS mapping, subsurface seam stratigraphy, HEMM fleet digital twins, and predictive operational scenario forecasting.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
          <button
            onClick={() => setActiveTab('trends')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'trends' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Production Analytics
          </button>
          <button
            onClick={() => setActiveTab('gis')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'gis' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            GIS Spatial Map
          </button>
          <button
            onClick={() => setActiveTab('simulator')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'simulator' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Scenario Simulator
          </button>
          <button
            onClick={() => setActiveTab('geology')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'geology' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Seam Stratigraphy
          </button>
          <button
            onClick={() => setActiveTab('fleet')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'fleet' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Fleet Telematics Twin
          </button>
          <button
            onClick={() => setActiveTab('formula')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'formula' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Formula Studio
          </button>
        </div>
      </div>

      {/* Tab Contents */}
      {activeTab === 'trends' && <AnalyticsCharts />}

      {activeTab === 'gis' && <MiningGisMap />}

      {activeTab === 'simulator' && <ScenarioSimulator />}

      {activeTab === 'geology' && <SeamStratigraphyVisualizer />}

      {activeTab === 'fleet' && <FleetTelematicsDigitalTwin />}

      {activeTab === 'formula' && <FormulaBuilderStudio />}
    </div>
  );
}
