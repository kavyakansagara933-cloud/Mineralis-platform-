'use client';

import { useState } from 'react';
import { 
  Database, 
  Search, 
  FileText, 
  Layers, 
  CheckCircle2, 
  ExternalLink,
  ChevronRight,
  HardDrive
} from 'lucide-react';
import { motion } from 'framer-motion';

const KB_ITEMS = [
  { title: 'Statutory Mining Directory (Consolidated)', category: 'Annual Compendiums', records: 1240, pages: 180, confidence: 99.8 },
  { title: 'Seam Stratigraphy & Geological Logs', category: 'Drill Hole Surveys', records: 890, pages: 95, confidence: 99.2 },
  { title: 'Overburden Removal Telemetry (OBR)', category: 'Operational Records', records: 1650, pages: 120, confidence: 99.5 },
  { title: 'Coal Quality & GCV Grade Distribution', category: 'Quality Certifications', records: 640, pages: 45, confidence: 98.9 },
];

export default function KnowledgeBasePage() {
  const [search, setSearch] = useState('');

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
            <Database className="w-3.5 h-3.5 text-blue-600" />
            <span>Structured Vector Vault & Schema Catalog</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
            Mining Knowledge Base
          </h1>
          <p className="text-sm text-slate-500 leading-relaxed">
            Central repository of structured geological schemas, tabular vectors, and indexed statutory compendiums.
          </p>
        </div>

        <div className="relative w-full md:w-80 shrink-0">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search schemas & compendiums..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500 shadow-xs transition"
          />
        </div>
      </motion.div>

      {/* Grid of Knowledge Repositories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {KB_ITEMS.map((item, idx) => (
          <div key={idx} className="ambient-card p-8 space-y-5 hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-md">
                  {item.category}
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-2">{item.title}</h3>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-mono font-bold">
                {item.confidence}% Verified
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs font-mono text-slate-600 pt-2">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                <div className="text-slate-400 text-[11px]">Indexed Tables</div>
                <div className="font-bold text-slate-900 text-sm mt-0.5">{item.records} Records</div>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                <div className="text-slate-400 text-[11px]">Total Volume</div>
                <div className="font-bold text-slate-900 text-sm mt-0.5">{item.pages} Pages</div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-400 font-mono">Vector Storage: Active</span>
              <a href="/documents" className="flex items-center gap-1 font-bold text-blue-600 hover:text-blue-700 transition">
                <span>Access Compendium</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
