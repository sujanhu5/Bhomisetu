import React, { useState } from 'react';
import { 
  AlertOctagon, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Building2, 
  MapPin, 
  Search, 
  ChevronRight,
  ShieldAlert,
  ArrowRight,
  TrendingUp,
  Activity,
  Sparkles
} from 'lucide-react';
import { Project, PriorityAlert, RiskLevel } from '../types';

interface ExecutiveOverviewProps {
  projects: Project[];
  alerts: PriorityAlert[];
  onSelectProject: (projectId: string) => void;
  onNavigateToRiskAnalysis: (projectId: string) => void;
  onNavigateToSimulator: (projectId: string) => void;
  onNavigateToIntelligence?: (projectId: string) => void;
}

export const ExecutiveOverview: React.FC<ExecutiveOverviewProps> = ({
  projects,
  alerts,
  onSelectProject,
  onNavigateToRiskAnalysis,
  onNavigateToSimulator,
  onNavigateToIntelligence
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRiskFilter, setSelectedRiskFilter] = useState<string>('all');
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<string>('all');

  const totalActive = 127;
  const highRiskCount = 23;
  const criticalCount = 8;
  const requiringActionCount = 17;

  // Projects sorted by accelerating risk
  const acceleratingProjects = [...projects]
    .filter(p => (p.riskTrajectory?.change30d ?? 0) > 0)
    .sort((a, b) => (b.riskTrajectory?.change30d ?? 0) - (a.riskTrajectory?.change30d ?? 0));

  // Filter projects for table
  const filteredProjects = projects.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRisk = selectedRiskFilter === 'all' || p.overallRiskLevel === selectedRiskFilter;
    const matchesType = selectedTypeFilter === 'all' || p.type === selectedTypeFilter;
    return matchesSearch && matchesRisk && matchesType;
  });

  const getRiskBadge = (level: RiskLevel, score: number) => {
    switch (level) {
      case 'critical':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-600"></span>
            {score}% Critical
          </span>
        );
      case 'high':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
            {score}% High
          </span>
        );
      case 'moderate':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-yellow-50 text-yellow-800 border border-yellow-200">
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-500"></span>
            {score}% Moderate
          </span>
        );
      case 'low':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            {score}% Low
          </span>
        );
    }
  };

  const getStageBadge = (stageId: string) => {
    const stageNames: Record<string, string> = {
      sia: '1. SIA (Sec 4)',
      notification: '2. Notification (Sec 11)',
      consent: '3. Consent (Sec 19)',
      award: '4. Award (Sec 23)',
      compensation: '5. Compensation (Sec 77)',
      possession: '6. Possession (Sec 38)',
      rr: '7. R&R (Sec 31)'
    };
    return (
      <span className="inline-block px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200 font-mono">
        {stageNames[stageId] || stageId}
      </span>
    );
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Screen Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Portfolio Overview
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time statutory delay predictions across 127 monitored land acquisition packages
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onSelectProject('nh-48-expansion')}
            className="flex items-center gap-2 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-medium shadow-xs transition cursor-pointer"
          >
            <span>Priority Project: NH-48 Expansion</span>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>
        </div>
      </div>

      {/* Top 4 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between text-xs font-medium text-slate-500">
            <span>Total Monitored Packages</span>
            <Building2 className="w-4 h-4 text-slate-400" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900 font-mono">
              {totalActive}
            </span>
            <span className="text-xs text-emerald-700 font-medium">
              Across 31 districts
            </span>
          </div>
          <div className="mt-1 text-xs text-slate-400">
            Total capital outlay: ₹48,200 Cr
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between text-xs font-medium text-slate-500">
            <span>High Risk Packages</span>
            <AlertTriangle className="w-4 h-4 text-amber-500" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-amber-900 font-mono">
              {highRiskCount}
            </span>
            <span className="text-xs text-amber-700 font-medium">
              18.1% of portfolio
            </span>
          </div>
          <div className="mt-1 text-xs text-slate-400">
            Projected delay &gt; 4.5 months
          </div>
        </div>

        <div className="bg-white rounded-xl border border-rose-200 p-5 shadow-xs">
          <div className="flex items-center justify-between text-xs font-medium text-rose-700">
            <span>Critical Attention Needed</span>
            <AlertOctagon className="w-4 h-4 text-rose-600" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-rose-900 font-mono">
              {criticalCount}
            </span>
            <span className="text-xs font-medium text-rose-700 bg-rose-50 px-1.5 py-0.2 rounded border border-rose-200">
              Immediate
            </span>
          </div>
          <div className="mt-1 text-xs text-slate-400">
            Bottlenecks in Compensation &amp; R&amp;R
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between text-xs font-medium text-slate-500">
            <span>Action Plans Ready</span>
            <CheckCircle className="w-4 h-4 text-slate-400" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900 font-mono">
              {requiringActionCount}
            </span>
            <span className="text-xs text-slate-600 font-medium">
              Mitigations available
            </span>
          </div>
          <div className="mt-1 text-xs text-slate-400">
            Counterfactual interventions ready
          </div>
        </div>

      </div>

      {/* NEW: Projects With Rapidly Increasing Risk (Early Warning Block) */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-rose-600 animate-pulse" />
            <h3 className="text-sm font-bold text-slate-900">
              Early Warning: Corridors With Rapidly Increasing Risk (30-Day Velocity)
            </h3>
          </div>
          {onNavigateToIntelligence && (
            <button
              onClick={() => onNavigateToIntelligence('nh-48-expansion')}
              className="text-xs font-semibold text-blue-700 hover:text-blue-900 flex items-center gap-1 cursor-pointer"
            >
              <span>Explore Intelligence Trajectory</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {acceleratingProjects.slice(0, 4).map((p) => {
            const d = p.riskTrajectory?.change30d ?? 0;
            const velocity = p.riskTrajectory?.riskVelocity ?? 0.45;
            const isCritical = p.overallRisk >= 80;
            return (
              <div 
                key={p.id}
                onClick={() => onSelectProject(p.id)}
                className="p-3.5 rounded-lg border border-slate-200 hover:border-slate-400 bg-slate-50/70 hover:bg-white transition cursor-pointer flex flex-col justify-between text-xs"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] text-slate-500 font-bold px-1.5 py-0.2 rounded bg-slate-200">
                      {p.code}
                    </span>
                    <span className={`font-mono font-bold text-xs px-2 py-0.5 rounded-full ${
                      isCritical ? 'bg-rose-100 text-rose-800 border border-rose-300' : 'bg-amber-100 text-amber-800'
                    }`}>
                      +{d}% in 30d
                    </span>
                  </div>

                  <div className="font-bold text-slate-900 mt-2 truncate">
                    {p.name}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {p.district} &bull; Stage: <span className="capitalize">{p.currentStageId}</span>
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-[10px] text-slate-400">Current:</span>
                    <span className="font-mono font-extrabold text-sm text-slate-900">{p.overallRisk}%</span>
                  </div>
                  <span className="text-[10px] font-mono text-rose-700 font-bold">
                    &uarr; {velocity.toFixed(2)} pts/d
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Risk Distribution Overview & Priority Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Risk Distribution Bar */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Portfolio Risk Distribution
                </h3>
                <p className="text-xs text-slate-500">
                  Classification across all active land acquisition packages
                </p>
              </div>
            </div>

            {/* Stacked Risk Distribution Bar */}
            <div className="space-y-3">
              <div className="h-4 w-full rounded-full bg-slate-100 flex overflow-hidden border border-slate-200 p-0.5 gap-0.5">
                <div 
                  className="bg-emerald-600 h-full rounded-l-full transition-all"
                  style={{ width: '48%' }}
                  title="Low Risk: 61 projects (48%)"
                />
                <div 
                  className="bg-yellow-500 h-full transition-all"
                  style={{ width: '28%' }}
                  title="Moderate Risk: 35 projects (28%)"
                />
                <div 
                  className="bg-amber-600 h-full transition-all"
                  style={{ width: '18%' }}
                  title="High Risk: 23 projects (18%)"
                />
                <div 
                  className="bg-rose-600 h-full rounded-r-full transition-all"
                  style={{ width: '6%' }}
                  title="Critical Risk: 8 projects (6%)"
                />
              </div>

              {/* Legend */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs">
                  <div className="flex items-center gap-1.5 font-medium text-emerald-800">
                    <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                    Low (&lt;30%)
                  </div>
                  <div className="mt-1 text-sm font-bold text-slate-900 font-mono">61 packages</div>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs">
                  <div className="flex items-center gap-1.5 font-medium text-yellow-800">
                    <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                    Moderate (30-60%)
                  </div>
                  <div className="mt-1 text-sm font-bold text-slate-900 font-mono">35 packages</div>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs">
                  <div className="flex items-center gap-1.5 font-medium text-amber-800">
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                    High (61-80%)
                  </div>
                  <div className="mt-1 text-sm font-bold text-slate-900 font-mono">23 packages</div>
                </div>

                <div className="p-2.5 rounded-lg bg-rose-50/50 border border-rose-200 text-xs">
                  <div className="flex items-center gap-1.5 font-medium text-rose-800">
                    <span className="w-2 h-2 rounded-full bg-rose-600"></span>
                    Critical (&gt;80%)
                  </div>
                  <div className="mt-1 text-sm font-bold text-rose-950 font-mono">8 packages</div>
                </div>
              </div>
            </div>
          </div>

          {/* Stage Bottlenecks Footer */}
          <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Primary Bottlenecks: <strong className="text-slate-800">Stage 5 (Compensation)</strong> &amp; <strong className="text-slate-800">Stage 7 (R&amp;R)</strong></span>
            <span className="font-mono text-slate-400">31 Districts Monitored</span>
          </div>
        </div>

        {/* Right Col: Priority Alerts Panel */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-rose-600" />
                <h3 className="text-sm font-bold text-slate-900">Priority Alerts</h3>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-50 border border-rose-200 text-rose-700 font-semibold font-mono">
                3 Active
              </span>
            </div>

            <div className="space-y-2.5">
              {alerts.map((alert) => {
                const isCritical = alert.riskLevel === 'critical';
                const isHigh = alert.riskLevel === 'high';

                return (
                  <div
                    key={alert.id}
                    onClick={() => onSelectProject(alert.projectId)}
                    className={`p-3 rounded-lg border text-left cursor-pointer transition ${
                      isCritical
                        ? 'bg-rose-50/20 border-rose-200 hover:border-rose-300'
                        : isHigh
                        ? 'bg-amber-50/20 border-amber-200 hover:border-amber-300'
                        : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-semibold text-slate-900">{alert.projectName}</span>
                      <span className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded ${
                        isCritical ? 'text-rose-700 bg-rose-50' : 'text-amber-700 bg-amber-50'
                      }`}>
                        {alert.riskScore}%
                      </span>
                    </div>
                    <div className="text-xs text-slate-600 line-clamp-2">
                      {alert.recommendedAction}
                    </div>
                    <div className="mt-2 text-[10px] text-slate-400 font-mono flex items-center justify-between">
                      <span>{alert.district} &bull; {alert.stageName}</span>
                      <span className="text-slate-700 font-medium hover:underline">Inspect &rarr;</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-3 pt-2 text-center text-[10px] text-slate-400 font-mono">
            Directly mapped to District Revenue Cells
          </div>
        </div>

      </div>

      {/* Project Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        
        {/* Table Header & Controls */}
        <div className="p-4 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Active Acquisition Packages
            </h3>
            <p className="text-xs text-slate-500">
              Filter by risk tier, sector, or district
            </p>
          </div>

          {/* Search and Filters */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search packages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-slate-50 focus:bg-white focus:outline-hidden focus:border-slate-500 w-44 sm:w-56"
              />
            </div>

            <select
              value={selectedRiskFilter}
              onChange={(e) => setSelectedRiskFilter(e.target.value)}
              className="text-xs rounded-lg border border-slate-300 bg-slate-50 px-2.5 py-1.5 font-medium text-slate-700 focus:outline-hidden"
            >
              <option value="all">All Risks</option>
              <option value="critical">Critical (&gt;80%)</option>
              <option value="high">High (60-80%)</option>
              <option value="moderate">Moderate (30-60%)</option>
              <option value="low">Low (&lt;30%)</option>
            </select>

            <select
              value={selectedTypeFilter}
              onChange={(e) => setSelectedTypeFilter(e.target.value)}
              className="text-xs rounded-lg border border-slate-300 bg-slate-50 px-2.5 py-1.5 font-medium text-slate-700 focus:outline-hidden"
            >
              <option value="all">All Sectors</option>
              <option value="Highway">Highways</option>
              <option value="Industrial">Industrial</option>
              <option value="Irrigation">Irrigation</option>
              <option value="Urban Infra">Urban Infra</option>
            </select>
          </div>
        </div>

        {/* Table View */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-4">Package</th>
                <th className="py-2.5 px-4">District</th>
                <th className="py-2.5 px-4">Sector</th>
                <th className="py-2.5 px-4">Current Stage</th>
                <th className="py-2.5 px-4">Risk Level</th>
                <th className="py-2.5 px-4">Est. Delay</th>
                <th className="py-2.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800">
              {filteredProjects.map((project) => {
                return (
                  <tr
                    key={project.id}
                    className="hover:bg-slate-50/80 transition-colors"
                  >
                    <td className="py-3 px-4">
                      <div>
                        <div 
                          onClick={() => onSelectProject(project.id)}
                          className="font-semibold text-slate-900 hover:text-blue-700 cursor-pointer"
                        >
                          {project.name}
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono">
                          {project.code} &bull; {project.totalParcels} parcels
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4 font-medium text-slate-700">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        {project.district}
                      </div>
                    </td>

                    <td className="py-3 px-4 text-slate-600">
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[11px] border border-slate-200">
                        {project.type}
                      </span>
                    </td>

                    <td className="py-3 px-4">
                      {getStageBadge(project.currentStageId)}
                    </td>

                    <td className="py-3 px-4">
                      {getRiskBadge(project.overallRiskLevel, project.overallRisk)}
                    </td>

                    <td className="py-3 px-4">
                      <div className="font-mono font-bold text-slate-900">
                        +{project.expectedDelayMonths} mo
                      </div>
                      <div className="text-[10px] text-slate-400">
                        ₹{project.costImpact.totalImpactCr} Cr impact
                      </div>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => onSelectProject(project.id)}
                        className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium transition cursor-pointer"
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <div>
            Showing <span className="font-semibold text-slate-800">{filteredProjects.length}</span> of {totalActive} packages
          </div>
          <div className="text-[11px] text-slate-400 font-mono">
            Updated today, 10:30 IST
          </div>
        </div>

      </div>

    </div>
  );
};

