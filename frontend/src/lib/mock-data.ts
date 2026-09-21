import { 
  MineMetric, 
  DocumentItem, 
  ActivityItem, 
  InsightItem, 
  ValidationRuleItem, 
  TopicItem, 
  KnowledgeItem,
  Evidence 
} from '@/types';

export const MOCK_KPIS = [
  { label: 'Total Reports', value: '1,428', change: '+14.2% MoM', tone: 'positive' as const, subtext: '98.6% automated ingestion' },
  { label: 'Processed Documents', value: '3,892', change: '+342 this week', tone: 'positive' as const, subtext: 'PDF, DOCX, XLSX, CSV' },
  { label: 'AI Queries Executed', value: '18,650', change: '99.4% confidence', tone: 'positive' as const, subtext: 'Avg latency: 180ms' },
  { label: 'Data Quality Score', value: '99.2%', change: '+0.4% audited', tone: 'positive' as const, subtext: '14,820 rules evaluated' },
];

export const MOCK_PRODUCTION_TRENDS = [
  { period: 'Apr', actual: 61.2, target: 60.0, dispatch: 59.8, variance: 2.0 },
  { period: 'May', actual: 64.8, target: 63.5, dispatch: 63.1, variance: 2.05 },
  { period: 'Jun', actual: 58.4, target: 61.0, dispatch: 57.0, variance: -4.26 },
  { period: 'Jul', actual: 52.1, target: 55.0, dispatch: 51.2, variance: -5.27 },
  { period: 'Aug', actual: 54.3, target: 56.0, dispatch: 53.0, variance: -3.04 },
  { period: 'Sep', actual: 59.7, target: 60.0, dispatch: 58.5, variance: -0.50 },
  { period: 'Oct', actual: 66.2, target: 65.0, dispatch: 65.0, variance: 1.85 },
  { period: 'Nov', actual: 72.4, target: 70.0, dispatch: 71.2, variance: 3.43 },
  { period: 'Dec', actual: 78.5, target: 75.0, dispatch: 77.0, variance: 4.67 },
  { period: 'Jan', actual: 84.1, target: 82.0, dispatch: 82.5, variance: 2.56 },
  { period: 'Feb', actual: 88.0, target: 85.0, dispatch: 86.4, variance: 3.53 },
  { period: 'Mar', actual: 93.9, target: 90.0, dispatch: 91.8, variance: 4.33 },
];

export const MOCK_TRENDS = MOCK_PRODUCTION_TRENDS;

export const MOCK_DIVISION_COMPARISON = [
  { division: 'Division A (Eastern)', name: 'Division A', actual: 206.8, target: 204.0, achievement: 101.4, color: '#f59e0b' },
  { division: 'Division B (South-East)', name: 'Division B', actual: 187.5, target: 185.0, achievement: 101.4, color: '#38bdf8' },
  { division: 'Division C (Northern)', name: 'Division C', actual: 136.2, target: 133.0, achievement: 102.4, color: '#10b981' },
  { division: 'Division D (Central)', name: 'Division D', actual: 86.4, target: 84.0, achievement: 102.9, color: '#6366f1' },
  { division: 'Division E (Southern)', name: 'Division E', actual: 70.0, target: 72.0, achievement: 97.2, color: '#ec4899' },
  { division: 'Division F (Western)', name: 'Division F', actual: 68.3, target: 67.5, achievement: 101.2, color: '#8b5cf6' },
  { division: 'Division G (North-East)', name: 'Division G', actual: 45.6, target: 44.0, achievement: 103.6, color: '#14b8a6' },
  { division: 'Division H (Coking Coal)', name: 'Division H', actual: 41.2, target: 43.5, achievement: 94.7, color: '#f43f5e' },
];

export const MOCK_SUBSIDIARIES = MOCK_DIVISION_COMPARISON;

export const MOCK_MINES: MineMetric[] = [
  {
    id: 'M-101',
    mine_name: 'Block IV Surface Mine',
    division: 'Division B (South-East)',
    subsidiary: 'Division B',
    region: 'Central Basin',
    mining_type: 'Opencast (OC)',
    actual_production: 59.80,
    target_production: 55.00,
    variance_pct: 8.73,
    strip_ratio: 2.14,
    quality_score: 99.4,
    status: 'optimal',
    evidence: {
      id: 'ev-101',
      document_id: 'doc-ann-rep-2024',
      document_name: 'Annual_Mining_Directory_2024-25.pdf',
      page_number: 42,
      table_reference: 'Table 4.1',
      snippet: 'Block IV Surface Mine produced 59.80 MT raw coal exceeding targeted 55.00 MT allocation (+8.73% variance).',
      confidence: 99.4
    }
  },
  {
    id: 'M-102',
    mine_name: 'Central Seam Opencast Block',
    division: 'Division B (South-East)',
    subsidiary: 'Division B',
    region: 'Central Basin',
    mining_type: 'Opencast (OC)',
    actual_production: 48.50,
    target_production: 45.00,
    variance_pct: 7.78,
    strip_ratio: 2.30,
    quality_score: 98.9,
    status: 'optimal',
    evidence: {
      id: 'ev-102',
      document_id: 'doc-ann-rep-2024',
      document_name: 'Annual_Mining_Directory_2024-25.pdf',
      page_number: 42,
      table_reference: 'Table 4.1',
      snippet: 'Central Seam Opencast delivered 48.50 MT raw coal with dragline availability index at 88.4%.',
      confidence: 99.1
    }
  },
  {
    id: 'M-103',
    mine_name: 'Eastern Valley Surface Pit',
    division: 'Division A (Eastern)',
    subsidiary: 'Division A',
    region: 'Eastern Valley',
    mining_type: 'Opencast (OC)',
    actual_production: 32.40,
    target_production: 30.00,
    variance_pct: 8.00,
    strip_ratio: 1.95,
    quality_score: 99.2,
    status: 'optimal',
    evidence: {
      id: 'ev-103',
      document_id: 'doc-ann-rep-2024',
      document_name: 'Annual_Mining_Directory_2024-25.pdf',
      page_number: 43,
      table_reference: 'Table 4.2',
      snippet: 'Eastern Valley Surface Pit achieved 32.40 MT vs planned 30.00 MT target.',
      confidence: 99.5
    }
  },
  {
    id: 'M-104',
    mine_name: 'Northern Ridge Continuous Pit',
    division: 'Division C (Northern)',
    subsidiary: 'Division C',
    region: 'Northern Ridge',
    mining_type: 'Opencast (OC)',
    actual_production: 25.10,
    target_production: 24.50,
    variance_pct: 2.45,
    strip_ratio: 2.65,
    quality_score: 99.0,
    status: 'optimal',
    evidence: {
      id: 'ev-104',
      document_id: 'doc-ann-rep-2024',
      document_name: 'Annual_Mining_Directory_2024-25.pdf',
      page_number: 43,
      table_reference: 'Table 4.2',
      snippet: 'Northern Ridge continuous pit delivered 25.10 MT with steady conveyor extraction.',
      confidence: 98.9
    }
  },
  {
    id: 'M-105',
    mine_name: 'Deep Horizon Mechanized Underground',
    division: 'Division H (Coking Coal)',
    subsidiary: 'Division H',
    region: 'Deep Basin',
    mining_type: 'Underground (UG)',
    actual_production: 1.85,
    target_production: 2.10,
    variance_pct: -11.90,
    strip_ratio: 0.00,
    quality_score: 96.8,
    status: 'warning',
    evidence: {
      id: 'ev-105',
      document_id: 'doc-ann-rep-2024',
      document_name: 'Annual_Mining_Directory_2024-25.pdf',
      page_number: 44,
      table_reference: 'Table 4.3',
      snippet: 'Deep Horizon longwall output impacted by hydraulic support strata adjustments (-11.90% deficit).',
      confidence: 98.4
    }
  },
  {
    id: 'M-106',
    mine_name: 'North Plateau Surface Mine',
    division: 'Division D (Central)',
    subsidiary: 'Division D',
    region: 'Central Basin',
    mining_type: 'Opencast (OC)',
    actual_production: 18.20,
    target_production: 17.50,
    variance_pct: 4.00,
    strip_ratio: 2.45,
    quality_score: 99.3,
    status: 'optimal',
    evidence: {
      id: 'ev-106',
      document_id: 'doc-ann-rep-2024',
      document_name: 'Annual_Mining_Directory_2024-25.pdf',
      page_number: 43,
      table_reference: 'Table 4.2',
      snippet: 'North Plateau Surface Mine recorded 18.20 MT production with dispatch adherence at 98.2%.',
      confidence: 99.2
    }
  },
  {
    id: 'M-107',
    mine_name: 'Western Valley Pit 03',
    division: 'Division F (Western)',
    subsidiary: 'Division F',
    region: 'Western Belt',
    mining_type: 'Opencast (OC)',
    actual_production: 4.10,
    target_production: 4.50,
    variance_pct: -8.89,
    strip_ratio: 3.10,
    quality_score: 97.5,
    status: 'warning',
    evidence: {
      id: 'ev-107',
      document_id: 'doc-ann-rep-2024',
      document_name: 'Annual_Mining_Directory_2024-25.pdf',
      page_number: 44,
      table_reference: 'Table 4.3',
      snippet: 'Western Valley Pit 03 achieved 4.10 MT against 4.50 MT target due to heavy monsoon haul-road maintenance.',
      confidence: 98.7
    }
  },
  {
    id: 'M-108',
    mine_name: 'Eastern Sub-Basin Pit 01',
    division: 'Division G (North-East)',
    subsidiary: 'Division G',
    region: 'Eastern Valley',
    mining_type: 'Opencast (OC)',
    actual_production: 16.80,
    target_production: 16.00,
    variance_pct: 5.00,
    strip_ratio: 2.20,
    quality_score: 99.1,
    status: 'optimal',
    evidence: {
      id: 'ev-108',
      document_id: 'doc-ann-rep-2024',
      document_name: 'Annual_Mining_Directory_2024-25.pdf',
      page_number: 42,
      table_reference: 'Table 4.1',
      snippet: 'Eastern Sub-Basin Pit 01 fulfilled rapid evacuation to regional thermal utilities (16.80 MT).',
      confidence: 99.3
    }
  }
];

export const MOCK_DOCUMENTS: DocumentItem[] = [
  {
    id: 'doc-001',
    name: 'Annual_Mining_Directory_2024-25_Comprehensive.pdf',
    type: 'PDF',
    pages: 266,
    size: '14.3 MB',
    confidence: 99.4,
    status: 'Processed',
    source_division: 'National Mining Registry (Central)',
    uploaded_at: '2025-03-10 14:32',
    period: 'FY 2024-25',
    topics: ['Production', 'Geological Reserves', 'Equipment Telemetry', 'Financials'],
    extracted_records: 14820,
    checksum: 'sha256:7f4a9b2c881e...'
  },
  {
    id: 'doc-002',
    name: 'National_Mine_Performance_Master_Dataset.csv',
    type: 'CSV',
    pages: 1,
    size: '1.2 MB',
    confidence: 100.0,
    status: 'Processed',
    source_division: 'Operations Analytics Group',
    uploaded_at: '2025-03-10 16:15',
    period: 'FY 2024-25',
    topics: ['Mine Production', 'Strip Ratios', 'Coordinates', 'Seam Thickness'],
    extracted_records: 315,
    checksum: 'sha256:3d11ef84992a...'
  },
  {
    id: 'doc-003',
    name: 'Geological_Exploration_Block_IV_Dossier.pdf',
    type: 'PDF',
    pages: 48,
    size: '8.4 MB',
    confidence: 98.6,
    status: 'Processed',
    source_division: 'Geological Exploration Bureau',
    uploaded_at: '2025-03-08 11:20',
    period: 'Q3 2024-25',
    topics: ['Core Drilling', 'Reserve Classification', 'Grade Analysis'],
    extracted_records: 420,
    checksum: 'sha256:1a88cb39d44e...'
  },
  {
    id: 'doc-004',
    name: 'Heavy_Earth_Moving_Machinery_Fleet_Audit.xlsx',
    type: 'XLSX',
    pages: 12,
    size: '4.8 MB',
    confidence: 99.1,
    status: 'Processed',
    source_division: 'Engineering & HEMM Directorate',
    uploaded_at: '2025-03-05 09:45',
    period: 'FY 2024-25',
    topics: ['Draglines', 'Shovel Availability', 'Dumper Utilization'],
    extracted_records: 1150,
    checksum: 'sha256:9c77ef12ab56...'
  },
  {
    id: 'doc-005',
    name: 'Statutory_Safety_and_DGMS_Compliance_Review.docx',
    type: 'DOCX',
    pages: 34,
    size: '3.1 MB',
    confidence: 97.8,
    status: 'Processed',
    source_division: 'Safety & Regulatory Board',
    uploaded_at: '2025-03-02 17:00',
    period: 'Annual Review',
    topics: ['Safety Standards', 'Gas Monitoring', 'Ventilation Audits'],
    extracted_records: 180,
    checksum: 'sha256:5b22aa89ff11...'
  },
  {
    id: 'doc-006',
    name: 'Washery_Yield_and_Beneficiation_Telemetry.xlsx',
    type: 'XLSX',
    pages: 8,
    size: '2.4 MB',
    confidence: 98.9,
    status: 'Processed',
    source_division: 'Coal Preparation & Washeries',
    uploaded_at: '2025-02-28 13:10',
    period: 'Q3 2024-25',
    topics: ['Washery Efficiency', 'Clean Coal Yield', 'Middlings'],
    extracted_records: 290,
    checksum: 'sha256:4f19ee67bb33...'
  }
];

export const MOCK_ACTIVITIES: ActivityItem[] = [
  {
    id: 'act-01',
    type: 'validation',
    title: 'Automated Arithmetic Balance Check Passed',
    timestamp: '2 mins ago',
    user: 'System Math Verifier',
    status: 'success',
    details: 'Verified 14,820 balance equations across all division production tables. Deviation: 0.00%.'
  },
  {
    id: 'act-02',
    type: 'query',
    title: 'AI Query: Division B vs Division A Variance Analysis',
    timestamp: '14 mins ago',
    user: 'Senior Analyst (HQ)',
    status: 'info',
    details: 'Grounded against Annual Directory Table 4.1. Confidence: 99.4%.'
  },
  {
    id: 'act-03',
    type: 'report',
    title: 'Verified Executive Production Summary Exported (PDF)',
    timestamp: '42 mins ago',
    user: 'Director of Planning',
    status: 'success',
    details: 'Formal report compiled with 5 key findings and audited formula proofs.'
  },
  {
    id: 'act-04',
    type: 'ingestion',
    title: 'New Document Ingested: HEMM Fleet Audit 2024-25',
    timestamp: '2 hours ago',
    user: 'Data Ingestion Service',
    status: 'success',
    details: 'Extracted 1,150 equipment records across 315 mines with 99.1% OCR confidence.'
  },
  {
    id: 'act-05',
    type: 'alert',
    title: 'Production Anomaly Detected in Deep Horizon Underground',
    timestamp: '4 hours ago',
    user: 'Telemetry Rule Engine',
    status: 'warning',
    details: 'Variance (-11.90%) exceeded statutory threshold of -10.0%.'
  }
];

export const MOCK_INSIGHTS: InsightItem[] = [
  {
    id: 'ins-01',
    severity: 'positive',
    title: 'Surface Extraction Capacity Achieved 101.8% of National Target',
    description: 'Opencast production reached 725.60 MT against a planned 712.80 MT, offsetting underground longwall deficits.',
    division: 'All Surface Divisions',
    metric_impact: '+12.80 MT Net Surplus',
    timestamp: 'Today, 08:30',
    evidence: {
      id: 'ev-ins-01',
      document_id: 'doc-001',
      document_name: 'Annual_Mining_Directory_2024-25.pdf',
      page_number: 42,
      snippet: 'Total opencast output reached 725.60 MT representing 93.8% of aggregate national production.',
      confidence: 99.4
    }
  },
  {
    id: 'ins-02',
    severity: 'warning',
    title: 'Underground Longwall Strata Delays in Division H (-11.90%)',
    description: 'Hydraulic support maintenance in mechanized seams restricted output to 1.85 MT vs 2.10 MT target quota.',
    division: 'Division H (Coking Coal)',
    metric_impact: '-0.25 MT Deficit',
    timestamp: 'Today, 07:15',
    evidence: {
      id: 'ev-ins-02',
      document_id: 'doc-001',
      document_name: 'Annual_Mining_Directory_2024-25.pdf',
      page_number: 44,
      snippet: 'Underground mechanized extraction impacted by deep-seam geo-technical conditions.',
      confidence: 98.4
    }
  },
  {
    id: 'ins-03',
    severity: 'info',
    title: 'HEMM Fleet Availability Exceeds Enterprise Benchmark at 84.2%',
    description: 'High-capacity shovel and 240T dumper availability increased by 3.4% YoY following preventative telematics.',
    division: 'Engineering & HEMM',
    metric_impact: '+3.4% Availability',
    timestamp: 'Yesterday',
    evidence: {
      id: 'ev-ins-03',
      document_id: 'doc-004',
      document_name: 'HEMM_Fleet_Audit.xlsx',
      page_number: 4,
      snippet: 'Overall HEMM availability reached 84.2% across major opencast fleets.',
      confidence: 99.1
    }
  }
];

export const MOCK_VALIDATION_RULES: ValidationRuleItem[] = [
  {
    id: 'VAL-001',
    rule_name: 'Subsidiary Sum-Total Production Balance',
    category: 'Arithmetic Balance',
    entity: 'National Production Matrix',
    expected_value: '773.60 MT',
    actual_value: '773.60 MT',
    deviation: '0.00%',
    status: 'Passed',
    last_audited: 'Just now',
    formula: 'Sum(Div_A...Div_H) == National_Total',
    evidence: {
      id: 'ev-val-01',
      document_id: 'doc-001',
      document_name: 'Annual_Mining_Directory_2024-25.pdf',
      page_number: 42,
      snippet: 'Sum of all 8 divisions equals exactly 773.60 MT.',
      confidence: 100.0
    }
  },
  {
    id: 'VAL-002',
    rule_name: 'Opencast vs Underground Ratio Partition',
    category: 'Arithmetic Balance',
    entity: 'Mining Method Breakdown',
    expected_value: '725.60 MT + 48.00 MT = 773.60 MT',
    actual_value: '773.60 MT',
    deviation: '0.00%',
    status: 'Passed',
    last_audited: '3 mins ago',
    formula: 'Total_OC + Total_UG == Total_Production',
    evidence: {
      id: 'ev-val-02',
      document_id: 'doc-001',
      document_name: 'Annual_Mining_Directory_2024-25.pdf',
      page_number: 42,
      snippet: 'OC (725.60 MT) + UG (48.00 MT) = 773.60 MT.',
      confidence: 99.9
    }
  },
  {
    id: 'VAL-003',
    rule_name: 'Strip Ratio Physical Boundary Check',
    category: 'Geological Threshold',
    entity: 'Block IV Surface Mine',
    expected_value: '1.50 - 4.50 M.Cu.M/T',
    actual_value: '2.14 M.Cu.M/T',
    deviation: 'Within Bounds',
    status: 'Passed',
    last_audited: '10 mins ago',
    formula: '1.50 <= OBR_Volume / Coal_Extracted <= 4.50',
    evidence: {
      id: 'ev-val-03',
      document_id: 'doc-002',
      document_name: 'National_Mine_Performance_Master_Dataset.csv',
      page_number: 1,
      snippet: 'Strip ratio verified at 2.14 for Block IV.',
      confidence: 99.2
    }
  },
  {
    id: 'VAL-004',
    rule_name: 'Statutory Variance Notification Threshold',
    category: 'Statutory Compliance',
    entity: 'Deep Horizon Underground',
    expected_value: 'Variance >= -10.0%',
    actual_value: '-11.90%',
    deviation: '-1.90% below limit',
    status: 'Critical',
    last_audited: '15 mins ago',
    formula: '((Actual - Target) / Target) * 100 >= -10.0',
    evidence: {
      id: 'ev-val-04',
      document_id: 'doc-001',
      document_name: 'Annual_Mining_Directory_2024-25.pdf',
      page_number: 44,
      snippet: 'Variance flagged at -11.90% requiring managerial review.',
      confidence: 98.4
    }
  },
  {
    id: 'VAL-005',
    rule_name: 'OCR Confidence Table Extraction Threshold',
    category: 'OCR Integrity',
    entity: 'Geological Exploration Dossier Table 3',
    expected_value: 'Confidence >= 95.0%',
    actual_value: '98.6%',
    deviation: '+3.6% above baseline',
    status: 'Passed',
    last_audited: '1 hour ago',
    formula: 'Avg_Cell_Confidence >= 0.95',
    evidence: {
      id: 'ev-val-05',
      document_id: 'doc-003',
      document_name: 'Geological_Exploration_Block_IV_Dossier.pdf',
      page_number: 18,
      snippet: 'Cell OCR verification score: 0.986.',
      confidence: 98.6
    }
  }
];

export const MOCK_TOPICS: TopicItem[] = [
  {
    id: 'top-01',
    name: 'Raw Coal Production & Quotas',
    category: 'Production',
    frequency: 1420,
    growth_rate: '+18.4% YoY',
    document_count: 6,
    related_topics: ['Monthly Variances', 'Division Allocations', 'Dispatch Adherence'],
    recent_documents: ['Annual_Mining_Directory_2024-25.pdf', 'National_Mine_Performance_Master_Dataset.csv'],
    description: 'National and division-level production volumes, target quotas, and month-on-month extraction telemetry.'
  },
  {
    id: 'top-02',
    name: 'Geological Reserves & Seam Thickness',
    category: 'Geology',
    frequency: 860,
    growth_rate: '+6.2% YoY',
    document_count: 4,
    related_topics: ['Core Drilling', 'Reserve Classification (Proved/Indicated)', 'Ash Content'],
    recent_documents: ['Geological_Exploration_Block_IV_Dossier.pdf', 'Annual_Mining_Directory_2024-25.pdf'],
    description: 'Proved and indicated coal inventories, seam depth profiles, and geo-technical exploration logs.'
  },
  {
    id: 'top-03',
    name: 'HEMM Heavy Machinery Telematics',
    category: 'Equipment',
    frequency: 740,
    growth_rate: '+22.5% YoY',
    document_count: 5,
    related_topics: ['Draglines', '240T Dumpers', 'Shovel-Dumper Matching', 'Availability Indices'],
    recent_documents: ['Heavy_Earth_Moving_Machinery_Fleet_Audit.xlsx'],
    description: 'Machine hours, breakdown frequencies, and utilization efficiency for primary earth moving fleets.'
  },
  {
    id: 'top-04',
    name: 'Statutory Safety & Mine Ventilation',
    category: 'Compliance',
    frequency: 520,
    growth_rate: '+4.1% YoY',
    document_count: 3,
    related_topics: ['Gas Monitoring', 'Fatal Accident Frequency Rates', 'DGMS Audits'],
    recent_documents: ['Statutory_Safety_and_DGMS_Compliance_Review.docx'],
    description: 'Mandatory environmental and workplace safety audits compliant with sovereign mining standards.'
  },
  {
    id: 'top-05',
    name: 'Coal Beneficiation & Washery Yields',
    category: 'Processing',
    frequency: 380,
    growth_rate: '+9.8% YoY',
    document_count: 3,
    related_topics: ['Clean Coal Recovery', 'Ash Reduction', 'Coking Coal Middlings'],
    recent_documents: ['Washery_Yield_and_Beneficiation_Telemetry.xlsx'],
    description: 'Heavy media cyclones, flotation yield parameters, and metallurgical grade enhancement statistics.'
  }
];

export const MOCK_KNOWLEDGE_BASE: KnowledgeItem[] = [
  {
    id: 'kb-01',
    title: 'National Mining Directory FY 2024-25 Official Ingested Archive',
    type: 'Document',
    division: 'National Registry',
    date: '2025-03-10',
    summary: '266-page comprehensive statutory directory detailing company-wise, method-wise, and state-wise production statistics with 14 verified tables.',
    tags: ['Directory', 'Production', 'National', 'Statutory'],
    author: 'Chief Mining Statistician',
    verified: true
  },
  {
    id: 'kb-02',
    title: '315 Operating Coal Mines Complete Dataset (CSV Matrix)',
    type: 'Dataset',
    division: 'Operations',
    date: '2025-03-10',
    summary: 'Structured registry containing geo-coordinates, mining method, annual actuals, target allocations, and strip ratios for 315 active mines.',
    tags: ['Mines', 'Dataset', 'Telemetry', 'Registry'],
    author: 'Data Operations Team',
    verified: true
  },
  {
    id: 'kb-03',
    title: 'Executive Production Summary FY 2024-25 (Formal Audit Report)',
    type: 'Report',
    division: 'Planning & Governance',
    date: '2025-03-10',
    summary: 'AI-generated verified brief with mathematical proofs, trend curves, and strategic division recommendations.',
    tags: ['Executive Report', 'Math Proof', 'Audit', 'Governance'],
    author: 'AI Report Generator',
    verified: true
  },
  {
    id: 'kb-04',
    title: 'Geological Reserve Assessment Protocol & Exploration Standards',
    type: 'Audit',
    division: 'Geological Bureau',
    date: '2025-03-08',
    summary: 'Standardized classification methodology for proved (198.5 BT) and indicated (139.2 BT) coal resources.',
    tags: ['Geology', 'Reserves', 'Exploration', 'Standards'],
    author: 'Geological Exploration Bureau',
    verified: true
  }
];

export const MOCK_EVIDENCES: Record<string, Evidence> = {
  'ev-101': MOCK_MINES[0].evidence!,
};

export const MOCK_MINE_METRICS = MOCK_MINES;
export const MOCK_SUBSIDIARY_PERFORMANCE = MOCK_DIVISION_COMPARISON;
