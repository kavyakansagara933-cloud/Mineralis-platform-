'use client';

import { useState } from 'react';
import { 
  AlertTriangle, 
  CheckCircle2, 
  ShieldAlert, 
  Filter, 
  Search, 
  Clock, 
  UserCheck, 
  Eye, 
  Download, 
  Check,
  Send,
  Sparkles,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { EvidenceDrawer } from '@/components/evidence/EvidenceDrawer';
import { Evidence } from '@/types';

interface OperationalAlert {
  id: string;
  title: string;
  severity: 'CRITICAL' | 'WARNING' | 'INFO' | 'RESOLVED';
  division: string;
  mineName: string;
  detectedAt: string;
  metricImpact: string;
  description: string;
  assignedEngineer?: string;
  status: 'OPEN' | 'IN_REVIEW' | 'RESOLVED';
  resolutionNotes?: string;
  evidence: Evidence;
}

const INITIAL_ALERTS: OperationalAlert[] = [
  {
    id: 'ALT-101',
    title: 'Underground Longwall Strata Deficit (-11.35% Variance)',
    severity: 'CRITICAL',
    division: 'Division H',
    mineName: 'Deep Horizon Mechanized Longwall',
    detectedAt: '18 mins ago',
    metricImpact: '-1.60 MT Production Deficit',
    description: 'Hydraulic support maintenance in mechanized longwall seam restricted raw coal evacuation below statutory target.',
    assignedEngineer: 'Chief Mining Engineer (Division H)',
    status: 'IN_REVIEW',
    evidence: {
      id: 'ev-alt-1',
      document_id: 'doc-001',
      document_name: 'Annual_Mining_Directory_2024-25.pdf',
      page_number: 44,
      table_reference: 'Table 4.3: Underground Seam Performance',
      snippet: 'Deep Horizon Mechanized Longwall recorded 12.50 MT raw coal against statutory quota 14.10 MT (-11.35%).',
      confidence: 98.9
    }
  },
  {
    id: 'ALT-102',
    title: 'Stripping Ratio Escalation (+6.0% OBR Incline)',
    severity: 'WARNING',
    division: 'Division E',
    mineName: 'Southern Seam Pit 05',
    detectedAt: '2 hours ago',
    metricImpact: '2.65 M³/T (Target: 2.50 M³/T)',
    description: 'Unexpected footwall strata incline in deep bench IV increased overburden volume required to expose coal seam.',
    assignedEngineer: 'Senior Surveyor (Division E)',
    status: 'OPEN',
    evidence: {
      id: 'ev-alt-2',
      document_id: 'doc-001',
      document_name: 'Annual_Mining_Directory_2024-25.pdf',
      page_number: 43,
      snippet: 'Southern Seam Pit 05 stripping ratio increased to 2.65 M3/T due to structural geological benching.',
      confidence: 99.1
    }
  },
  {
    id: 'ALT-103',
    title: 'Monsoon Haul-Road Saturation Alert',
    severity: 'WARNING',
    division: 'Division F',
    mineName: 'Western Valley Surface Pit 03',
    detectedAt: '5 hours ago',
    metricImpact: 'Dumper Cycle Time +18%',
    description: 'Heavy precipitation reduced heavy hauler transport speeds between active pit bench and regional surface crusher.',
    status: 'OPEN',
    evidence: {
      id: 'ev-alt-3',
      document_id: 'doc-001',
      document_name: 'Annual_Mining_Directory_2024-25.pdf',
      page_number: 44,
      snippet: 'Western Valley Pit 03 haul-road maintenance undertaken following seasonal monsoon rain events.',
      confidence: 98.7
    }
  },
  {
    id: 'ALT-104',
    title: 'Automated Seam Thickness Reconciliation Completed',
    severity: 'INFO',
    division: 'Division B',
    mineName: 'Block IV Surface Mine',
    detectedAt: '1 day ago',
    metricImpact: '+1.60 MT Upward Reconciliation',
    description: 'Provisional production figures adjusted upwards following certified statutory survey directory audit.',
    status: 'RESOLVED',
    resolutionNotes: 'Statutory reconciliation signed off by Chief Audit Directorate.',
    evidence: {
      id: 'ev-alt-4',
      document_id: 'doc-001',
      document_name: 'Annual_Mining_Directory_2024-25.pdf',
      page_number: 42,
      snippet: 'Block IV final production audit certified at 59.80 MT.',
      confidence: 100.0
    }
  }
];

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<OperationalAlert[]>(INITIAL_ALERTS);
  const [severityFilter, setSeverityFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedAlert, setSelectedAlert] = useState<OperationalAlert | null>(null);
  const [activeEvidence, setActiveEvidence] = useState<Evidence | null>(null);
  const [resolutionInput, setResolutionInput] = useState<string>('');

  const filteredAlerts = alerts.filter((a) => {
    const matchSev = severityFilter === 'ALL' || a.severity === severityFilter;
    const matchSearch = searchQuery === '' || 
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.mineName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.division.toLowerCase().includes(searchQuery.toLowerCase());
    return matchSev && matchSearch;
  });

  const handleResolveAlert = (alertId: string) => {
    setAlerts(prev => prev.map(a => {
      if (a.id === alertId) {
        return {
          ...a,
          severity: 'RESOLVED',
          status: 'RESOLVED',
          resolutionNotes: resolutionInput || 'Action plan initiated and verified against statutory benchmarks.'
        };
      }
      return a;
    }));
    setSelectedAlert(null);
    setResolutionInput('');
  };

  const handleExportIncidentLog = () => {
    const header = "Alert ID,Title,Severity,Division,Mine Name,Detected At,Metric Impact,Status,Resolution Notes\n";
    const rows = alerts.map(a => 
      `"${a.id}","${a.title}","${a.severity}","${a.division}","${a.mineName}","${a.detectedAt}","${a.metricImpact}","${a.status}","${a.resolutionNotes || 'N/A'}"`
    ).join("\n");
    const blob = new Blob([header + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Statutory_Alert_Incident_Log_${Date.now()}.csv`;
    a.click();
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
            <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
            <span>Statutory Compliance & Operational Alert Triage</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
            Operational Alert Triage Center
          </h1>
          <p className="text-sm text-slate-500 leading-relaxed">
            Real-time variance alerts, OBR stripping spikes, and statutory incident workflows across 315 operating mines.
          </p>
        </div>

        <button
          onClick={handleExportIncidentLog}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition shadow-md shadow-blue-500/20 self-start md:self-auto"
        >
          <Download className="w-4 h-4" />
          <span>Export Incident Log</span>
        </button>
      </motion.div>

      {/* 4 Summary Counters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="ambient-card p-6 space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Active Incidents</div>
          <div className="text-3xl font-bold text-slate-900 metric-mono">
            {alerts.filter(a => a.status !== 'RESOLVED').length}
          </div>
          <div className="text-xs text-slate-500">Under active operational review</div>
        </div>

        <div className="ambient-card p-6 space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Critical Deficits</div>
          <div className="text-3xl font-bold text-rose-600 metric-mono">
            {alerts.filter(a => a.severity === 'CRITICAL').length}
          </div>
          <div className="text-xs text-rose-600 font-semibold">&gt;10% variance breach</div>
        </div>

        <div className="ambient-card p-6 space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400">OBR & Weather Warnings</div>
          <div className="text-3xl font-bold text-amber-600 metric-mono">
            {alerts.filter(a => a.severity === 'WARNING').length}
          </div>
          <div className="text-xs text-slate-500">Stripping ratio anomalies</div>
        </div>

        <div className="ambient-card p-6 space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Resolved Audit Actions</div>
          <div className="text-3xl font-bold text-emerald-600 metric-mono">
            {alerts.filter(a => a.status === 'RESOLVED').length}
          </div>
          <div className="text-xs text-emerald-600 font-semibold">100% Mitigation rate</div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="ambient-card p-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search incident by mine, title, or division..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 border border-slate-200 text-xs">
          {(['ALL', 'CRITICAL', 'WARNING', 'INFO', 'RESOLVED'] as const).map((sev) => (
            <button
              key={sev}
              onClick={() => setSeverityFilter(sev)}
              className={`px-3 py-1.5 rounded-lg transition text-xs font-medium ${
                severityFilter === sev 
                  ? 'bg-white text-blue-700 font-bold shadow-xs' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {sev}
            </button>
          ))}
        </div>
      </div>

      {/* Alerts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredAlerts.map((alert) => {
          const isCritical = alert.severity === 'CRITICAL';
          const isWarning = alert.severity === 'WARNING';
          const isResolved = alert.severity === 'RESOLVED';

          return (
            <div 
              key={alert.id}
              className={`ambient-card p-7 space-y-4 border-l-4 transition-all hover:-translate-y-1 ${
                isCritical ? 'border-l-rose-500' :
                isWarning ? 'border-l-amber-500' :
                isResolved ? 'border-l-emerald-500' : 'border-l-blue-500'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border ${
                      isCritical ? 'bg-rose-50 text-rose-700 border-rose-200' :
                      isWarning ? 'bg-amber-50 text-amber-700 border-amber-200' :
                      isResolved ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                      'bg-blue-50 text-blue-700 border-blue-200'
                    }`}>
                      {alert.severity}
                    </span>
                    <span className="text-xs font-mono text-slate-400 font-medium">
                      {alert.division} • {alert.mineName}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 pt-1">{alert.title}</h3>
                </div>

                <span className="text-[11px] font-mono text-slate-400 shrink-0">
                  {alert.detectedAt}
                </span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {alert.description}
              </p>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-500">Statutory Metric Impact:</span>
                <span className="font-bold text-slate-900">{alert.metricImpact}</span>
              </div>

              {alert.resolutionNotes && (
                <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-200 text-xs font-mono text-emerald-800">
                  Resolution: {alert.resolutionNotes}
                </div>
              )}

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => setActiveEvidence(alert.evidence)}
                  className="flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 transition"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Inspect OCR Evidence</span>
                </button>

                {!isResolved && (
                  <button
                    onClick={() => setSelectedAlert(alert)}
                    className="px-4 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition shadow-xs"
                  >
                    Triage Incident
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Incident Triage Modal */}
      <AnimatePresence>
        {selectedAlert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg bg-white p-8 space-y-6 rounded-3xl shadow-2xl border border-slate-200"
            >
              <div className="space-y-1 border-b border-slate-100 pb-4">
                <div className="text-xs font-mono font-bold text-blue-600 uppercase">
                  Incident Resolution Workflow
                </div>
                <h3 className="text-base font-bold text-slate-900">{selectedAlert.title}</h3>
                <p className="text-xs text-slate-400 font-mono">
                  {selectedAlert.mineName} • {selectedAlert.division}
                </p>
              </div>

              <div className="space-y-3">
                <label className="block text-xs font-bold text-slate-700 uppercase">
                  Statutory Mitigation & Audit Action Note
                </label>
                <textarea
                  rows={3}
                  placeholder="Enter corrective actions taken (e.g. supplemental excavator deployment, bench drainage)..."
                  value={resolutionInput}
                  onChange={(e) => setResolutionInput(e.target.value)}
                  className="w-full p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-500 font-medium"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  onClick={() => setSelectedAlert(null)}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleResolveAlert(selectedAlert.id)}
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-md shadow-emerald-500/20 flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Mark Incident as Resolved</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Evidence Drawer */}
      <EvidenceDrawer evidence={activeEvidence} onClose={() => setActiveEvidence(null)} />
    </div>
  );
}
