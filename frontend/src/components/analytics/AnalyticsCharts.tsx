'use client';

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

const STRIPPING_RATIO_DATA = [
  { quarter: 'Q1 2024-25', opencast: 2.38, underground: 0.12, target: 2.45 },
  { quarter: 'Q2 2024-25', opencast: 2.41, underground: 0.14, target: 2.45 },
  { quarter: 'Q3 2024-25', opencast: 2.48, underground: 0.11, target: 2.45 },
  { quarter: 'Q4 2024-25', opencast: 2.42, underground: 0.13, target: 2.45 },
];

const COAL_GRADE_DATA = [
  { name: 'Grade G1-G4 (High GCV)', value: 18, color: '#2563eb' },
  { name: 'Grade G5-G8 (Medium GCV)', value: 42, color: '#3b82f6' },
  { name: 'Grade G9-G13 (Power Grade)', value: 32, color: '#f59e0b' },
  { name: 'Grade G14-G17 (Low Ash Blend)', value: 8, color: '#94a3b8' },
];

const MINE_TYPE_DATA = [
  { type: 'Opencast Surface Pits', output: 725.60, target: 720.00, color: '#2563eb' },
  { type: 'Mechanized Longwall UG', output: 34.20, target: 42.00, color: '#f59e0b' },
  { type: 'Conventional Bord & Pillar UG', output: 13.80, target: 18.00, color: '#64748b' },
];

export function AnalyticsCharts() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Stripping Ratio & Overburden Removal */}
        <div className="ambient-card p-6 sm:p-8 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono">
                Quarterly Stripping Ratio (OBR / Coal)
              </h3>
              <p className="text-xs text-slate-500 font-sans mt-0.5">
                Composite overburden removal ratio (M.Cu.M per tonne extracted).
              </p>
            </div>
            <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
              Avg: 2.42
            </span>
          </div>

          <div className="h-80 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={STRIPPING_RATIO_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis dataKey="quarter" stroke="#64748b" fontSize={11} tickLine={false} fontFamily="JetBrains Mono" />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} fontFamily="JetBrains Mono" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#ffffff', 
                    borderColor: '#cbd5e1', 
                    borderRadius: '12px',
                    color: '#0f172a',
                    boxShadow: '0 10px 25px -5px rgba(15, 23, 42, 0.1)',
                    fontSize: '12px',
                    fontFamily: 'JetBrains Mono'
                  }} 
                />
                <Bar dataKey="opencast" name="Opencast Strip Ratio" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                <Line type="monotone" dataKey="target" name="Statutory Benchmark" stroke="#f59e0b" strokeWidth={2} strokeDasharray="4 4" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Coal Grade Distribution */}
        <div className="ambient-card p-6 sm:p-8 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono">
                Coal Grade (GCV) & Ash Distribution
              </h3>
              <p className="text-xs text-slate-500 font-sans mt-0.5">
                Proportion of non-coking and metallurgical coal grades.
              </p>
            </div>
            <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
              Grade G1 to G17
            </span>
          </div>

          <div className="h-80 w-full flex items-center justify-center pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={COAL_GRADE_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={105}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {COAL_GRADE_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#ffffff', 
                    borderColor: '#cbd5e1', 
                    borderRadius: '12px',
                    color: '#0f172a',
                    boxShadow: '0 10px 25px -5px rgba(15, 23, 42, 0.1)',
                    fontSize: '12px',
                    fontFamily: 'JetBrains Mono'
                  }} 
                />
                <Legend verticalAlign="bottom" height={36} wrapperStyle={{ fontSize: '11px', fontFamily: 'Inter' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Opencast vs Underground Stratigraphy Breakdown */}
      <div className="ambient-card p-6 sm:p-8 space-y-4">
        <div className="border-b border-slate-100 pb-4">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono">
            Mining Methodology & Seam Depth Stratigraphy
          </h3>
          <p className="text-xs text-slate-500 font-sans mt-0.5">
            Production output compared across surface mining vs deep horizon longwall operations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          {MINE_TYPE_DATA.map((item, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-xs font-bold text-slate-700 font-sans">{item.type}</span>
              <div className="text-2xl font-bold text-slate-900 metric-mono">
                {item.output.toFixed(2)} <span className="text-xs font-normal text-slate-500 font-mono">MT</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                <div className="h-full rounded-full" style={{ backgroundColor: item.color, width: `${(item.output / item.target) * 100}%` }}></div>
              </div>
              <div className="text-[11px] text-slate-500 font-sans flex justify-between">
                <span>Target: {item.target.toFixed(2)} MT</span>
                <span className="font-semibold text-slate-700">{((item.output / item.target) * 100).toFixed(1)}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
