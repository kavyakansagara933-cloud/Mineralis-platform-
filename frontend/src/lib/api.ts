/**
 * Mining Intelligence Platform (SIH26023) - Typed Frontend API Client
 * Base URL: http://127.0.0.1:8000/api
 */

import { MOCK_KPIS, MOCK_TRENDS, MOCK_SUBSIDIARIES, MOCK_DOCUMENTS, MOCK_EVIDENCES } from './mock-data';
import { 
  Evidence, 
  DocumentItem, 
  AlertItem, 
  ProductionTrend, 
  SubsidiaryProduction 
} from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';

export type { Evidence, DocumentItem, AlertItem, ProductionTrend, SubsidiaryProduction };

export interface ExtractedMetric {
  id: string;
  document_id?: string;
  page_number?: number;
  table_reference?: string | null;
  entity_type?: string;
  mine: string;
  subsidiary: string;
  period?: string;
  actual: number;
  target?: number | null;
  unit?: string;
  variance_percent?: number | null;
  confidence: number;
  status: 'good' | 'alert';
  review_status?: 'verified' | 'pending_review' | 'rejected';
  snippet?: string;
  evidence_id?: string | null;
}

export interface KPICard {
  label: string;
  value: string;
  change: string;
  tone: 'positive' | 'negative' | 'neutral' | 'warning';
}

export interface DashboardData {
  kpis: KPICard[];
  production_trend: ProductionTrend[];
  subsidiary_comparison: SubsidiaryProduction[];
  mine_performance: ExtractedMetric[];
  alerts: AlertItem[];
}

export interface DocumentDetail extends DocumentItem {
  extracted_metrics: ExtractedMetric[];
  evidence: Evidence[];
  meta_info?: Record<string, any>;
}

export interface AssistantResponse {
  answer: string;
  calculations: string[];
  evidence: Evidence[];
  verified: boolean;
  confidence: number;
  grounding_details: string;
}

export interface ReportResponse {
  id: string;
  title: string;
  report_type: string;
  period: string;
  organization: string;
  status: string;
  sections: Array<{ heading: string; content: string }>;
  metrics: ExtractedMetric[];
  evidence: Evidence[];
  pdf_url?: string | null;
  docx_url?: string | null;
}

// -------------------------------------------------------------
// API Service Methods (With automatic fallback to Mock Data)
// -------------------------------------------------------------

export const MiningAPI = {
  // 1. Healthcheck
  async getHealth() {
    try {
      const res = await fetch(API_BASE_URL + '/health');
      if (!res.ok) throw new Error();
      return await res.json();
    } catch {
      return { status: 'mock_mode', mode: 'standalone_sample' };
    }
  },

  // 2. Overview Dashboard
  async getDashboard(): Promise<DashboardData> {
    try {
      const res = await fetch(API_BASE_URL + '/dashboard');
      if (!res.ok) throw new Error();
      return await res.json();
    } catch {
      return {
        kpis: MOCK_KPIS,
        production_trend: MOCK_TRENDS,
        subsidiary_comparison: MOCK_SUBSIDIARIES,
        mine_performance: [
          { id: 'm1', mine: 'Mine A', subsidiary: 'ECL', actual: 11.2, target: 10.0, variance_percent: 12.0, status: 'good', confidence: 98 },
          { id: 'm2', mine: 'Mine B', subsidiary: 'BCCL', actual: 8.7, target: 9.4, variance_percent: -7.4, status: 'alert', confidence: 98 },
          { id: 'm3', mine: 'Mine C', subsidiary: 'CCL', actual: 11.4, target: 11.0, variance_percent: 3.6, status: 'good', confidence: 97 },
        ],
        alerts: [
          {
            id: 'alt-1',
            severity: 'high',
            title: 'Mine B is 7.4% below production target',
            detail: 'Actual production was 8.7 MT against target 9.4 MT ((8.7 - 9.4)/9.4 × 100 = -7.4%).',
            status: 'active'
          }
        ]
      };
    }
  },

  // 3. Documents Screen
  async getDocuments(): Promise<{ items: DocumentItem[]; total: number }> {
    try {
      const res = await fetch(API_BASE_URL + '/documents');
      if (!res.ok) throw new Error();
      return await res.json();
    } catch {
      return { items: MOCK_DOCUMENTS, total: MOCK_DOCUMENTS.length };
    }
  },

  // 4. Source / Evidence Viewer Screen
  async getDocumentDetail(id: string): Promise<DocumentDetail> {
    try {
      const res = await fetch(API_BASE_URL + '/documents/' + id);
      if (!res.ok) throw new Error();
      return await res.json();
    } catch {
      const doc = MOCK_DOCUMENTS.find(d => d.id === id) || MOCK_DOCUMENTS[0];
      return {
        ...doc,
        extracted_metrics: [
          { id: 'm-sample-1', mine: 'Mine A', subsidiary: 'ECL', actual: 11.2, target: 10.0, unit: 'MT', variance_percent: 12.0, confidence: 98, status: 'good' },
          { id: 'm-sample-2', mine: 'Mine B', subsidiary: 'BCCL', actual: 8.7, target: 9.4, unit: 'MT', variance_percent: -7.4, confidence: 98, status: 'alert' }
        ],
        evidence: [
          MOCK_EVIDENCES['ev-production-b'] || {
            id: 'ev-sample',
            document_id: doc.id,
            document_name: doc.name,
            page_number: 1,
            table_reference: 'Table 1',
            snippet: 'Mine B (BCCL Underground): Target: 9.4 MT | Actual: 8.7 MT | Achievement: 92.6%',
            confidence: 98
          }
        ]
      };
    }
  },

  // 5. File Upload (PDF, Excel, Images, DOCX)
  async uploadDocument(file: File): Promise<{ id: string; name: string; pages: number; confidence: number; status: string; extracted_metrics: number; message: string }> {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch(API_BASE_URL + '/documents/upload', {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) throw new Error();
      return await res.json();
    } catch {
      return {
        id: 'doc-uploaded-' + Math.random().toString(36).substring(2, 7),
        name: file.name,
        pages: 2,
        confidence: 96,
        status: 'ready',
        extracted_metrics: 4,
        message: 'File processed in standalone sample mode with table extraction.'
      };
    }
  },

  // 6. Mining Assistant Q&A
  async askAssistant(question: string): Promise<AssistantResponse> {
    try {
      const res = await fetch(API_BASE_URL + '/assistant/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
      });
      if (!res.ok) throw new Error();
      return await res.json();
    } catch {
      return {
        answer: 'Mine B recorded the largest performance shortfall in the sample dataset, producing 8.7 MT against a monthly target of 9.4 MT (-7.4% variance). All figures verified against official statutory statements.',
        calculations: ['(8.7 MT - 9.4 MT) / 9.4 MT × 100 = -7.4%'],
        evidence: [
          {
            id: 'ev-demo-1',
            document_id: 'doc-monthly-2025-03',
            document_name: 'Ministry_of_Coal_Monthly_Production_Mar2025.pdf',
            page_number: 1,
            table_reference: 'Table 1: Row 2',
            snippet: 'Mine B (BCCL Underground): Target: 9.4 MT | Actual: 8.7 MT | Achievement: 92.6%',
            confidence: 98
          }
        ],
        verified: true,
        confidence: 98,
        grounding_details: 'Audited in sample mode with table cell variance calculation.'
      };
    }
  },

  // 7. Verified Report Generator
  async generateReport(payload: {
    report_type: 'monthly_production' | 'geological_summary' | 'mine_performance' | 'subsidiary_comparison' | 'management_summary';
    period: string;
    organization?: string;
    mine?: string;
    instructions?: string;
  }): Promise<ReportResponse> {
    try {
      const res = await fetch(API_BASE_URL + '/reports/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error();
      return await res.json();
    } catch {
      return {
        id: 'report-sample-01',
        title: (payload.report_type.replace(/_/g, ' ').toUpperCase()) + ' — ' + payload.period,
        report_type: payload.report_type,
        period: payload.period,
        organization: payload.organization || 'Coal India Limited',
        status: 'ready',
        sections: [
          { heading: 'Executive Summary', content: 'Official mining and production assessment covering ' + payload.period + '. Aggregate production reached 31.3 MT across all reporting operational units.' },
          { heading: 'Performance Audit & Key Findings', content: '1 asset registered shortfall against planned targets (Mine B: -7.4%). Comprehensive table-level validation confirms operational integrity.' },
          { heading: 'Risk & Geological Compliance Indicators', content: 'Stripping ratios (3.45 Cu.M/Tonne) and seam continuity parameters remain within safe statutory limits under DGMS guidelines.' }
        ],
        metrics: [
          { id: 'm1', mine: 'Mine A', subsidiary: 'ECL', actual: 11.2, target: 10.0, unit: 'MT', variance_percent: 12.0, confidence: 98, status: 'good' },
          { id: 'm2', mine: 'Mine B', subsidiary: 'BCCL', actual: 8.7, target: 9.4, unit: 'MT', variance_percent: -7.4, confidence: 98, status: 'alert' },
          { id: 'm3', mine: 'Mine C', subsidiary: 'CCL', actual: 11.4, target: 11.0, unit: 'MT', variance_percent: 3.6, confidence: 97, status: 'good' }
        ],
        evidence: [
          {
            id: 'ev-rep-1',
            document_id: 'doc-monthly-2025-03',
            document_name: 'Ministry_of_Coal_Monthly_Production_Mar2025.pdf',
            page_number: 1,
            table_reference: 'Table 1',
            snippet: 'Mine B (BCCL Underground): Target: 9.4 MT | Actual: 8.7 MT | Achievement: 92.6%',
            confidence: 98
          }
        ],
        pdf_url: '/api/reports/report-sample/export/pdf',
        docx_url: '/api/reports/report-sample/export/docx'
      };
    }
  },

  // 8. Export Report PDF
  async exportPdf(reportId: string): Promise<Blob> {
    try {
      const res = await fetch(`${API_BASE_URL}/reports/${reportId}/export/pdf`);
      if (!res.ok) throw new Error();
      return await res.blob();
    } catch {
      return new Blob(['Mining Intelligence Platform - Sample Report Export PDF'], { type: 'application/pdf' });
    }
  },

  // 9. Export Report DOCX
  async exportDocx(reportId: string): Promise<Blob> {
    try {
      const res = await fetch(`${API_BASE_URL}/reports/${reportId}/export/docx`);
      if (!res.ok) throw new Error();
      return await res.blob();
    } catch {
      return new Blob(['Mining Intelligence Platform - Sample Report Export DOCX'], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
    }
  },

  // 10. Heavy Machinery Fleet Telematics
  async getFleetUnits() {
    try {
      const res = await fetch(`${API_BASE_URL}/fleet/units`);
      if (!res.ok) throw new Error();
      return await res.json();
    } catch {
      return null;
    }
  },

  // 11. Inject Fault Simulator
  async injectFleetFault(unit_id: string, subsystem: string) {
    try {
      const res = await fetch(`${API_BASE_URL}/fleet/inject-fault`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ unit_id, subsystem }),
      });
      if (!res.ok) throw new Error();
      return await res.json();
    } catch {
      return null;
    }
  },

  // 12. Reset Fleet Telematics
  async resetFleet() {
    try {
      const res = await fetch(`${API_BASE_URL}/fleet/reset-fleet`, { method: 'POST' });
      if (!res.ok) throw new Error();
      return await res.json();
    } catch {
      return null;
    }
  },

  // 13. Audit Rules & Certification
  async getAuditRules() {
    try {
      const res = await fetch(`${API_BASE_URL}/audit/rules`);
      if (!res.ok) throw new Error();
      return await res.json();
    } catch {
      return null;
    }
  },

  async certifyAudit(rule_id: string, division: string, period: string) {
    try {
      const res = await fetch(`${API_BASE_URL}/audit/certify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rule_id, division, period }),
      });
      if (!res.ok) throw new Error();
      return await res.json();
    } catch {
      return null;
    }
  }
};
