'use client';

import { useState } from 'react';
import { 
  Settings, 
  Cpu, 
  ShieldCheck, 
  Database, 
  CheckCircle2, 
  HardDrive,
  Save
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function SettingsPage() {
  const [ocrThreshold, setOcrThreshold] = useState(85);
  const [autoVerify, setAutoVerify] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

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
            <Settings className="w-3.5 h-3.5 text-blue-600" />
            <span>Platform Configuration & Engine Parameters</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
            System Settings
          </h1>
          <p className="text-sm text-slate-500 leading-relaxed">
            Configure deterministic OCR confidence thresholds, RAG embedding parameters, and automated mathematical audit tolerances.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition shadow-md shadow-blue-500/20 self-start md:self-auto"
        >
          <Save className="w-4 h-4" />
          <span>{saved ? 'Saved Successfully!' : 'Save Configuration'}</span>
        </button>
      </motion.div>

      {/* Settings Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="ambient-card p-8 space-y-6">
          <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-4">
            Deterministic Engine Parameters
          </h2>

          <div className="space-y-5">
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-800 mb-2">
                <span>Minimum OCR Confidence Threshold</span>
                <span className="font-mono text-blue-600">{ocrThreshold}%</span>
              </div>
              <input
                type="range"
                min="70"
                max="99"
                value={ocrThreshold}
                onChange={(e) => setOcrThreshold(Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
              <p className="text-[11px] text-slate-400 mt-1.5">
                Extractions scoring below this threshold will require human review.
              </p>
            </div>

            <div className="pt-2">
              <label className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer">
                <div>
                  <div className="text-xs font-bold text-slate-800">Auto-Verify Mathematical Proofs</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Validate OBR & variance equations automatically upon ingestion</div>
                </div>
                <input
                  type="checkbox"
                  checked={autoVerify}
                  onChange={(e) => setAutoVerify(e.target.checked)}
                  className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
                />
              </label>
            </div>
          </div>
        </div>

        <div className="ambient-card p-8 space-y-6">
          <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-4">
            Vault & Storage Architecture
          </h2>

          <div className="space-y-4 text-xs font-mono">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <div className="font-bold text-slate-800">Local Vector Index</div>
                <div className="text-[11px] text-slate-400">FAISS / SQLite Deterministic Store</div>
              </div>
              <span className="text-emerald-600 font-bold">ONLINE</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <div className="font-bold text-slate-800">AI Reasoning Provider</div>
                <div className="text-[11px] text-slate-400">Deterministic Rule Engine & Embeddings</div>
              </div>
              <span className="text-blue-600 font-bold">ACTIVE</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
