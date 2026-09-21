'use client';

import { useEffect, useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line 
} from 'recharts';

export function AnalyticsCharts({ gradeData, ratioData }: { gradeData: any[]; ratioData: any[] }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="h-64 flex items-center justify-center text-xs text-muted-foreground">Loading analytics charts...</div>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Coal Grade Distribution */}
      <div className="tech-card rounded-xl p-5">
        <h3 className="text-sm font-semibold text-white mb-1">Coal Grade & GCV Caloric Share</h3>
        <p className="text-[11px] text-muted-foreground mb-4">Classified under Ministry Coal Directory Standards</p>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={gradeData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis type="number" stroke="#64748b" fontSize={11} domain={[0, 40]} unit="%" />
              <YAxis dataKey="grade" type="category" stroke="#64748b" fontSize={10} width={130} />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', fontSize: 12 }} />
              <Bar dataKey="share" name="Production Share (%)" fill="#f59e0b" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Stripping Ratio Trends */}
      <div className="tech-card rounded-xl p-5">
        <h3 className="text-sm font-semibold text-white mb-1">Stripping Ratio Progression (Cu.M/Tonne)</h3>
        <p className="text-[11px] text-muted-foreground mb-4">Formula: Overburden Removal (M.Cu.M) / Coal Production (MT)</p>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={ratioData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="period" stroke="#64748b" fontSize={11} />
              <YAxis stroke="#64748b" fontSize={11} domain={[2.5, 4.0]} />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', fontSize: 12 }} />
              <Line type="monotone" dataKey="ratio" name="Stripping Ratio (Cu.M/T)" stroke="#38bdf8" strokeWidth={3} dot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
