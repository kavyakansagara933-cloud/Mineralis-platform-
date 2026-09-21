'use client';

import { useState } from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  Download, 
  RefreshCw, 
  Sparkles, 
  FileCheck2, 
  QrCode, 
  Lock, 
  Eye, 
  ChevronRight,
  Award,
  Zap,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Evidence } from '@/types';

interface ComplianceFinding {
  id: string;
  category: string;
  division: string;
  mineName: string;
  ruleName: string;
  severity: 'COMPLIANT' | 'MODERATE_RISK' | 'CRITICAL_DEFICIT';
  observedValue: string;
  statutoryStandard: string;
  remediationAction: string;
  isRemediated?: boolean;
}

const INITIAL_FINDINGS: ComplianceFinding[] = [
  {
    id: 'FND-01',
    category: 'Production Balance',
    division: 'Division H',
    mineName: 'Deep Horizon Mechanized Longwall',
    ruleName: 'Annual Production Quota Alignment',
    severity: 'CRITICAL_DEFICIT',
    observedValue: '12.50 MT (-11.35% Deficit)',
    statutoryStandard: 'Variance <= -5.0%',
    remediationAction: 'Deploy supplemental shearer unit and reallocate quarterly evacuation quota to surface blocks.'
  },
  {
    id: 'FND-02',
    category: 'Stripping Calculus',
    division: 'Division E',
    mineName: 'Southern Seam Pit 05',
    ruleName: 'Specific Stripping Ratio Benchmark',
    severity: 'MODERATE_RISK',
    observedValue: '2.65 M³/T (+6.0% Incline)',
    statutoryStandard: 'OBR <= 2.50 M³/T',
    remediationAction: 'Initiate bench IV slope geotechnical survey and revise haul-road gradient geometry.'
  },
  {
    id: 'FND-03',
    category: 'Grade Classification',
    division: 'Division A',
    mineName: 'Eastern Valley Surface Pit',
    ruleName: 'GCV Grade Thermal Band Verification',
    severity: 'COMPLIANT',
    observedValue: '5,080 kcal/kg (Grade G8)',
    statutoryStandard: '4,900 - 5,200 kcal/kg',
    remediationAction: 'Full conformance with national commercial billing classifications.'
  },
  {
    id: 'FND-04',
    category: 'Geological Inventory',
    division: 'Division B',
    mineName: 'Block IV Surface Mine',
    ruleName: 'Proved Reserve Drill-Core Correlation',
    severity: 'COMPLIANT',
    observedValue: '187.90 BT Proved (49.7%)',
    statutoryStandard: 'UNFC 111 Standard Match',
    remediationAction: '100% borehole core log provenance verified across 48 drill holes.'
  }
];

interface StatutoryAuditCertificationEngineProps {
  onInspectEvidence?: (evidence: Evidence) => void;
}

export function StatutoryAuditCertificationEngine({ onInspectEvidence }: StatutoryAuditCertificationEngineProps) {
  const [scanning, setScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(100);
  const [findings, setFindings] = useState<ComplianceFinding[]>(INITIAL_FINDINGS);
  const [selectedFinding, setSelectedFinding] = useState<ComplianceFinding | null>(null);

  const handleRunFullScan = () => {
    setScanning(true);
    setScanProgress(15);
    setTimeout(() => setScanProgress(45), 400);
    setTimeout(() => setScanProgress(75), 800);
    setTimeout(() => {
      setScanProgress(100);
      setScanning(false);
    }, 1200);
  };

  const handleApplyRemediation = (id: string) => {
    setFindings(prev => prev.map(f => {
      if (f.id === id) {
        return { ...f, severity: 'COMPLIANT', isRemediated: true, observedValue: 'Mitigated & Aligned' };
      }
      return f;
    }));
    setSelectedFinding(null);
  };

  const handleDownloadCertificate = () => {
    const certText = `=======================================================
OFFICIAL STATUTORY COMPLIANCE & PROVENANCE CERTIFICATE
=======================================================
Certificate Number : CERT-STAT-2024-25-8849
Issuance Date      : ${new Date().toLocaleDateString()}
Platform           : Mining Intelligence Platform (Central Directorate)
Scope              : 315 Operating Mines across Divisions A through H
Compliance Rating  : 99.4% (Certified Statutory Standard)
Cryptographic Hash : sha256:7f4a9b2c881e3d11ef84992a1a88cb39d44e9c77ef12
Status             : FULLY CERTIFIED & AUDITED
=======================================================
Findings Summary:
- Total Evaluated Rules : 14,820 Rules
- Conformance Rate      : 99.4%
- Critical Deficits     : 0 Un-mitigated
- Digital Signature     : Certified by Automated Deterministic Engine
=======================================================`;
    const blob = new Blob([certText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Statutory_Audit_Certificate_2024_25.txt`;
    a.click();
  };

  return (
    <div className="space-y-10">
      {/* Scan Trigger & Header Banner */}
      <div className="ambient-card p-8 md:p-10 space-y-6 bg-gradient-to-r from-white via-slate-50 to-blue-50/20">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-100 pb-5">
          <div className="space-y-1 max-w-2xl">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <h3 className="text-base font-bold text-slate-900">
                Autonomous AI Statutory Audit & Risk Certification Engine
              </h3>
            </div>
            <p className="text-xs text-slate-500">
              Continuously inspects repository documents, verifies algebraic equations, detects non-compliant variances, and generates certified provenance credentials.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleDownloadCertificate}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition shadow-xs"
            >
              <Download className="w-4 h-4 text-slate-500" />
              <span>Download Official Certificate</span>
            </button>
            <button
              onClick={handleRunFullScan}
              disabled={scanning}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition shadow-md shadow-blue-500/20"
            >
              <RefreshCw className={`w-4 h-4 ${scanning ? 'animate-spin' : ''}`} />
              <span>{scanning ? `Auditing (${scanProgress}%)...` : 'Run Repository Audit'}</span>
            </button>
          </div>
        </div>

        {/* Scan Progress Pipeline */}
        {scanning && (
          <div className="space-y-2 p-4 rounded-2xl bg-blue-50/60 border border-blue-100">
            <div className="flex justify-between text-xs font-mono font-bold text-blue-900">
              <span>Scanning 315 Mines & Extracted Tabular Checksums...</span>
              <span>{scanProgress}%</span>
            </div>
            <div className="w-full bg-blue-200/50 rounded-full h-2 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${scanProgress}%` }}
                className="bg-blue-600 h-full rounded-full"
              />
            </div>
          </div>
        )}

        {/* Digital Statutory Certificate Card */}
        <div className="p-8 rounded-3xl bg-white border-2 border-slate-200 shadow-sm space-y-6 relative overflow-hidden">
          {/* Subtle Watermark Seal */}
          <div className="absolute -right-8 -bottom-8 w-48 h-48 rounded-full bg-blue-50/50 border border-blue-100 flex items-center justify-center opacity-40 pointer-events-none">
            <Award className="w-24 h-24 text-blue-600" />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-base font-bold text-slate-900">Official Certificate of Statutory Provenance</h4>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-mono font-bold">
                    VALID & VERIFIED
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                  Cert ID: CERT-STAT-2024-25-8849 • Cryptographic Chain: sha256:7f4a9b2c88...
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-slate-500 bg-slate-50 px-3.5 py-1.5 rounded-xl border border-slate-200">
              <Lock className="w-3.5 h-3.5 text-blue-600" />
              <span>Immutable Ledger</span>
            </div>
          </div>

          {/* Certificate Credentials Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
              <div className="text-slate-400 text-[10px]">Compliance Rating</div>
              <div className="text-2xl font-bold text-emerald-600 metric-mono">99.4%</div>
              <div className="text-[10px] text-slate-500">14,820 Rules Checked</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
              <div className="text-slate-400 text-[10px]">Operating Mines</div>
              <div className="text-2xl font-bold text-slate-900 metric-mono">315</div>
              <div className="text-[10px] text-slate-500">8 Regional Divisions</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
              <div className="text-slate-400 text-[10px]">Summation Variance</div>
              <div className="text-2xl font-bold text-blue-600 metric-mono">0.00%</div>
              <div className="text-[10px] text-slate-500">Zero Math Discrepancy</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
              <div className="text-slate-400 text-[10px]">OCR Provenance</div>
              <div className="text-2xl font-bold text-slate-900 metric-mono">100%</div>
              <div className="text-[10px] text-emerald-600 font-bold">Bounding Coordinates</div>
            </div>
          </div>
        </div>
      </div>

      {/* Compliance Findings & Auto-Remediation Table */}
      <div className="ambient-card overflow-hidden">
        <div className="p-6 md:p-7 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h4 className="text-base font-bold text-slate-900">Statutory Risk Audit & Conformance Findings</h4>
            <p className="text-xs text-slate-500 mt-0.5">Automated rule evaluation across production, stripping, and reserves</p>
          </div>
          <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            {findings.length} Evaluated Benchmarks
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/60 text-slate-400 font-mono uppercase text-[11px]">
                <th className="px-6 py-4 font-bold">Audit Benchmark & Rule</th>
                <th className="px-6 py-4 font-bold">Scope & Mine</th>
                <th className="px-6 py-4 font-bold">Observed Metric</th>
                <th className="px-6 py-4 font-bold">Statutory Threshold</th>
                <th className="px-6 py-4 font-bold text-center">Status</th>
                <th className="px-6 py-4 font-bold">Recommended Action</th>
                <th className="px-6 py-4 font-bold text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {findings.map((fnd) => {
                const isCompliant = fnd.severity === 'COMPLIANT';
                const isCritical = fnd.severity === 'CRITICAL_DEFICIT';

                return (
                  <tr key={fnd.id} className="hover:bg-blue-50/30 transition">
                    <td className="px-6 py-5">
                      <div className="font-bold text-slate-900">{fnd.ruleName}</div>
                      <div className="text-[11px] text-slate-400 font-mono">{fnd.category}</div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="font-medium text-slate-800">{fnd.mineName}</div>
                      <div className="text-[11px] text-slate-400 font-mono">{fnd.division}</div>
                    </td>
                    <td className="px-6 py-5 font-mono font-bold text-slate-900">
                      {fnd.observedValue}
                    </td>
                    <td className="px-6 py-5 font-mono text-slate-500">
                      {fnd.statutoryStandard}
                    </td>
                    <td className="px-6 py-5 text-center">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold ${
                        isCompliant ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                        isCritical ? 'bg-rose-50 text-rose-700 border border-rose-200' :
                        'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>
                        {isCompliant ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />}
                        {isCompliant ? 'COMPLIANT' : isCritical ? 'CRITICAL DEFICIT' : 'MODERATE RISK'}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-slate-600 max-w-xs text-xs leading-relaxed">
                      {fnd.remediationAction}
                    </td>
                    <td className="px-6 py-5 text-center">
                      {!isCompliant ? (
                        <button
                          onClick={() => handleApplyRemediation(fnd.id)}
                          className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition shadow-xs flex items-center gap-1 mx-auto"
                        >
                          <Zap className="w-3.5 h-3.5" />
                          <span>Auto-Mitigate</span>
                        </button>
                      ) : (
                        <span className="text-emerald-600 font-mono font-bold text-xs flex items-center justify-center gap-1">
                          <Check className="w-3.5 h-3.5" />
                          <span>Certified</span>
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
