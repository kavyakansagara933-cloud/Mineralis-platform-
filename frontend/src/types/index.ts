export interface Evidence {
  id: string;
  document_id: string;
  document_name: string;
  page_number: number;
  table_reference?: string | null;
  snippet: string;
  confidence: number;
  math_formula?: string;
  bounding_box?: { x: number; y: number; width: number; height: number };
}

export interface Metric {
  id: string;
  mine: string;
  subsidiary: string;
  period: string;
  actual: number;
  target?: number | null;
  unit: string;
  variance_percent?: number | null;
  confidence: number;
  status: 'good' | 'alert' | 'optimal' | 'warning';
  review_status: 'verified' | 'pending_review' | 'rejected';
  snippet: string;
  evidence_id?: string | null;
}

export interface MineMetric {
  id?: string;
  mine_name: string;
  subsidiary: string;
  division?: string;
  region?: string;
  state?: string;
  mining_type?: string;
  actual_production: number;
  target_production: number;
  variance_pct: number;
  strip_ratio?: number;
  quality_score?: number;
  status?: string;
  evidence?: Evidence | null;
}

export interface DocumentItem {
  id: string;
  name: string;
  type: string;
  pages: number;
  size?: string;
  confidence: number;
  status: string;
  subsidiary?: string;
  source_division?: string;
  uploaded_at: string;
  period?: string;
  source_provenance?: string;
  topics?: string[];
  extracted_records?: number;
  checksum?: string;
}

export interface AlertItem {
  id: string;
  severity: 'high' | 'medium' | 'low' | 'info' | 'warning' | 'positive' | 'critical';
  title: string;
  detail?: string;
  message?: string;
  mine?: string;
  evidence?: Evidence | null;
  status?: string;
  created_at?: string;
}

export interface ProductionTrend {
  period?: string;
  month?: string;
  actual?: number;
  target?: number | null;
  production?: number;
  dispatch?: number | null;
  variance?: number;
}

export interface SubsidiaryProduction {
  subsidiary?: string;
  division?: string;
  name?: string;
  actual: number;
  target: number;
  achievement?: number;
  color?: string;
}

export interface ActivityItem {
  id: string;
  type: 'validation' | 'query' | 'report' | 'ingestion' | 'alert' | string;
  title: string;
  timestamp: string;
  user: string;
  status: 'success' | 'info' | 'warning' | 'error' | string;
  details: string;
}

export interface InsightItem {
  id: string;
  severity: 'positive' | 'warning' | 'info' | 'critical';
  title: string;
  description: string;
  division: string;
  metric_impact: string;
  timestamp: string;
  evidence?: Evidence | null;
}

export interface ValidationRuleItem {
  id: string;
  rule_name: string;
  category: string;
  entity?: string;
  target_entity?: string;
  expected_value: string;
  actual_value: string;
  deviation: string;
  status: 'Passed' | 'Critical' | 'Warning' | 'Pending' | string;
  last_audited: string;
  formula: string;
  evidence?: Evidence | null;
}

export interface TopicItem {
  id: string;
  name: string;
  category: string;
  frequency: number;
  growth_rate: string;
  document_count: number;
  related_topics: string[];
  recent_documents: string[];
  description: string;
}

export interface KnowledgeItem {
  id: string;
  title: string;
  type: 'Document' | 'Dataset' | 'Report' | 'Audit' | string;
  division: string;
  date: string;
  summary: string;
  tags: string[];
  author: string;
  verified: boolean;
}
