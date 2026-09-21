'use client';

import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend
} from 'recharts';
import { motion } from 'framer-motion';

const PRODUCTION_TREND_DATA = [
  { year: 'FY 2020-21', production: 716.08, target: 710.00, dispatch: 690.45 },
  { year: 'FY 2021-22', production: 778.19, target: 750.00, dispatch: 754.50 },
  { year: 'FY 2022-23', production: 893.19, target: 870.00, dispatch: 877.90 },
  { year: 'FY 2023-24', production: 997.25, target: 1000.00, dispatch: 978.40 },
  { year: 'FY 2024-25 (Est)', production: 1040.00, target: 1050.00, dispatch: 1015.00 },
];

const DIVISION_PERFORMANCE_DATA = [
  { division: 'Div A', actual: 206.8, target: 204.0, achievement: 101.4 },
  { division: 'Div B', actual: 187.5, target: 185.0, achievement: 101.4 },
  { division: 'Div C', actual: 136.2, target: 133.0, achievement: 102.4 },
  { division: 'Div D', actual: 86.4, target: 84.0, achievement: 102.9 },
  { division: 'Div E', actual: 70.0, target: 72.0, achievement: 97.2 },
  { division: 'Div F', actual: 68.3, target: 67.5, achievement: 101.2 },
  { division: 'Div G', actual: 45.6, target: 44.0, achievement: 103.6 },
  { division: 'Div H', actual: 41.2, target: 43.5, achievement: 94.7 },
];

export function OverviewCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* 5-Year Production & Dispatch Curve */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        className="ambient-card p-8 md:p-10 space-y-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">National Production & Dispatch Curve</h3>
            <p className="text-xs text-slate-500 mt-0.5">5-Year multi-period trajectory (Million Tonnes)</p>
          </div>
          <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200 self-start sm:self-auto">
            Annual Directory
          </span>
        </div>

        <div className="h-80 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={PRODUCTION_TREND_DATA} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
              <defs>
                <linearGradient id="colorProd" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.25}/>
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0.0}/>
                </linearGradient>
                <linearGradient id="colorDisp" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.25}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="year" stroke="#94a3b8" fontSize={11} tickLine={false} />
              <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} domain={[600, 1100]} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#ffffff', 
                  borderColor: '#e2e8f0', 
                  borderRadius: '16px',
                  boxShadow: '0 10px 25px -5px rgba(15, 23, 42, 0.08)',
                  fontSize: '12px' 
                }} 
              />
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '16px' }} />
              <Area 
                type="monotone" 
                dataKey="production" 
                stroke="#2563eb" 
                strokeWidth={2.5}
                fillOpacity={1} 
                fill="url(#colorProd)" 
                name="Actual Production (MT)" 
                isAnimationActive={true}
                animationDuration={1200}
              />
              <Area 
                type="monotone" 
                dataKey="dispatch" 
                stroke="#10b981" 
                strokeWidth={2.5}
                fillOpacity={1} 
                fill="url(#colorDisp)" 
                name="Dispatch / Offtake (MT)" 
                isAnimationActive={true}
                animationDuration={1400}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Division Achievement Benchmark */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="ambient-card p-8 md:p-10 space-y-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">Division Output vs Annual Target</h3>
            <p className="text-xs text-slate-500 mt-0.5">Performance achievement breakdown across 8 regional divisions</p>
          </div>
          <span className="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 self-start sm:self-auto">
            Target Tracking
          </span>
        </div>

        <div className="h-80 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={DIVISION_PERFORMANCE_DATA} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="division" stroke="#94a3b8" fontSize={11} tickLine={false} />
              <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#ffffff', 
                  borderColor: '#e2e8f0', 
                  borderRadius: '16px',
                  boxShadow: '0 10px 25px -5px rgba(15, 23, 42, 0.08)',
                  fontSize: '12px' 
                }} 
              />
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '16px' }} />
              <Bar 
                dataKey="actual" 
                fill="#2563eb" 
                radius={[6, 6, 0, 0]} 
                name="Actual Output (MT)" 
                isAnimationActive={true}
                animationDuration={1200}
              />
              <Bar 
                dataKey="target" 
                fill="#cbd5e1" 
                radius={[6, 6, 0, 0]} 
                name="Statutory Target (MT)" 
                isAnimationActive={true}
                animationDuration={1400}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
}
