'use client';

import { useState } from 'react';
import { 
  Tags, 
  Search, 
  Layers, 
  ChevronRight, 
  FileText, 
  Sparkles,
  Database,
  TrendingUp,
  ShieldCheck
} from 'lucide-react';
import { motion } from 'framer-motion';

const TOPIC_CLUSTERS = [
  {
    name: 'Operational Production Telemetry',
    count: 142,
    records: 4890,
    description: 'Statutory mine-by-mine output, daily dispatch tracking, and target variance audits.',
    keywords: ['Production', 'Offtake', 'Variance', 'Achievement', 'Dispatch'],
    color: 'border-blue-200 bg-blue-50/40 text-blue-700'
  },
  {
    name: 'Overburden Removal & Stripping Ratios',
    count: 98,
    records: 3120,
    description: 'Excavation volumes, bench design, stripping ratio (OBR M³/T) mathematics, and equipment telematics.',
    keywords: ['OBR', 'Stripping Ratio', 'M.CuM', 'Dragline', 'Shovel-Dumper'],
    color: 'border-indigo-200 bg-indigo-50/40 text-indigo-700'
  },
  {
    name: 'Geological Reserves & Seam Stratigraphy',
    count: 114,
    records: 3870,
    description: 'UNFC/JORC reserve categorization (Proved, Indicated, Inferred), seam depths, and drill-hole logs.',
    keywords: ['Proved Reserves', 'Stratigraphy', 'Seam Thickness', 'Drill Hole', 'GCV'],
    color: 'border-emerald-200 bg-emerald-50/40 text-emerald-700'
  },
  {
    name: 'Coal Quality & Grade Distribution (GCV)',
    count: 76,
    records: 2450,
    description: 'Gross Calorific Value classifications (G1 to G17), moisture content, and ash percentage.',
    keywords: ['GCV', 'Calorific Value', 'Grade G8-G13', 'Ash Content', 'Moisture'],
    color: 'border-amber-200 bg-amber-50/40 text-amber-700'
  },
  {
    name: 'Heavy Earth Moving Machinery (HEMM)',
    count: 64,
    records: 1890,
    description: 'Equipment availability, utilization percentages, maintenance cycles, and telematic health logs.',
    keywords: ['HEMM', 'Equipment Availability', 'Utilization %', 'Telemetry', 'Maintenance'],
    color: 'border-purple-200 bg-purple-50/40 text-purple-700'
  },
  {
    name: 'Statutory Safety & Environmental Compliance',
    count: 52,
    records: 1340,
    description: 'Environmental clearance parameters, mine water treatment, reclamation, and safety audit logs.',
    keywords: ['Safety Audit', 'Environmental Clearance', 'Air Quality', 'Reclamation'],
    color: 'border-slate-200 bg-slate-50/60 text-slate-700'
  }
];

export default function TopicsPage() {
  const [search, setSearch] = useState('');

  const filtered = TOPIC_CLUSTERS.filter(c => 
    search === '' || 
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.keywords.some(k => k.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-12 pb-24 max-w-7xl mx-auto">
      {/* Header Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="ambient-card p-8 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-gradient-to-r from-white via-slate-50 to-blue-50/20"
      >
        <div className="space-y-2.5 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold">
            <Tags className="w-3.5 h-3.5 text-blue-600" />
            <span>Semantic Ontology & Geological Taxonomy</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
            Geological & Mining Topic Explorer
          </h1>
          <p className="text-sm text-slate-500 leading-relaxed">
            Explore indexed knowledge domains across production, stripping ratios, seam stratigraphy, and equipment telemetry.
          </p>
        </div>

        <div className="relative w-full md:w-80 shrink-0">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search topic ontology..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500 shadow-xs transition"
          />
        </div>
      </motion.div>

      {/* 2-Column Spacious Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filtered.map((cluster, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.05 }}
            className="ambient-card p-8 space-y-6 hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1.5">
                <h3 className="text-base font-bold text-slate-900">{cluster.name}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{cluster.description}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold border shrink-0 ${cluster.color}`}>
                {cluster.count} Docs
              </span>
            </div>

            <div className="space-y-2">
              <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">
                Key Domain Concepts
              </div>
              <div className="flex flex-wrap gap-2">
                {cluster.keywords.map((kw, kIdx) => (
                  <span key={kIdx} className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200 text-xs font-medium">
                    {kw}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="font-mono text-slate-500">
                {cluster.records.toLocaleString()} Verified Records
              </span>
              <a
                href="/documents"
                className="flex items-center gap-1 font-bold text-blue-600 hover:text-blue-700 transition"
              >
                <span>Browse Repository</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
