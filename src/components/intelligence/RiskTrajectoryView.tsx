import React, { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  AlertOctagon, 
  Clock, 
  Activity, 
  ArrowUpRight, 
  ArrowDownRight, 
  Info,
  Calendar,
  Layers,
  ChevronRight,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { Project, TrendDirection } from '../../types';

interface RiskTrajectoryViewProps {
  project: Project;
  allProjects: Project[];
  onSelectProject: (projectId: string) => void;
  onNavigateToGis?: (projectId: string) => void;
  onNavigateToIntervention?: (projectId: string) => void;
}

export const RiskTrajectoryView: React.FC<RiskTrajectoryViewProps> = ({
  project,
  allProjects,
  onSelectProject,
  onNavigateToGis,
  onNavigateToIntervention
}) => {
  const [hoveredPointIndex, setHoveredPointIndex] = useState<number | null>(null);
  const trajectory = project.riskTrajectory;

  const getTrendBadge = (direction: TrendDirection) => {
    switch (direction) {
      case 'rapidly-increasing':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-300">
            <span className="w-2 h-2 rounded-full bg-rose-600 animate-pulse"></span>
            &uarr; Rapidly Increasing
          </span>
        );
      case 'worsening':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            &uarr; Worsening
          </span>
        );
      case 'improving':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            &darr; Improving
          </span>
        );
      case 'stable':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-300">
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            &rarr; Stable
          </span>
        );
    }
  };

  // Rank all projects by 30-day velocity
  const velocityRanking = [...allProjects].sort((a, b) => {
    return b.riskTrajectory.change30d - a.riskTrajectory.change30d;
  });

  const points = trajectory.points;
  const maxRisk = 100;
  const minRisk = 0;
  const svgWidth = 640;
  const svgHeight = 220;
  const paddingX = 50;
  const paddingY = 30;
  const graphWidth = svgWidth - paddingX * 2;
  const graphHeight = svgHeight - paddingY * 2;

  // Calculate SVG Coordinates
  const coordinates = points.map((p, idx) => {
    const x = paddingX + (idx / Math.max(1, points.length - 1)) * graphWidth;
    const y = paddingY + graphHeight - ((p.risk - minRisk) / (maxRisk - minRisk)) * graphHeight;
    return { x, y, point: p };
  });

  const pathD = coordinates.reduce((acc, curr, idx) => {
    if (idx === 0) return `M ${curr.x} ${curr.y}`;
    // Curved spline
    const prev = coordinates[idx - 1];
    const cpX1 = prev.x + (curr.x - prev.x) * 0.5;
    const cpY1 = prev.y;
    const cpX2 = prev.x + (curr.x - prev.x) * 0.5;
    const cpY2 = curr.y;
    return `${acc} C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${curr.x} ${curr.y}`;
  }, '');

  const areaD = `${pathD} L ${coordinates[coordinates.length - 1].x} ${paddingY + graphHeight} L ${coordinates[0].x} ${paddingY + graphHeight} Z`;

  return (
    <div className="space-y-6">
      
      {/* Top Banner with Project Context */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-mono font-medium px-2 py-0.5 rounded bg-slate-900 text-white">
                {project.code}
              </span>
              <span className="text-xs font-medium px-2.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                Predictive Risk Trajectory
              </span>
              {getTrendBadge(trajectory.trendDirection)}
            </div>

            <h3 className="text-xl font-bold text-slate-900 tracking-tight mt-1.5">
              {project.name}
            </h3>
            <p className="text-xs text-slate-500">
              Historical Risk Evolution &bull; 30-Day Velocity Analysis &bull; RFCTLARR Early Warning
            </p>
          </div>

          {/* Project Switcher */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-medium">Switch Project:</span>
            <select
              value={project.id}
              onChange={(e) => onSelectProject(e.target.value)}
              className="text-xs rounded-lg border border-slate-300 bg-slate-50 px-3 py-1.5 font-medium text-slate-800 focus:outline-hidden"
            >
              {allProjects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.district}) &bull; {p.overallRisk}% Risk ({p.riskTrajectory.change30d > 0 ? `+${p.riskTrajectory.change30d}%` : `${p.riskTrajectory.change30d}%`})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 4 Core Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mt-5 pt-4 border-t border-slate-100">
          
          {/* Current Risk */}
          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="font-medium">Current Risk</span>
              <AlertOctagon className="w-4 h-4 text-rose-600" />
            </div>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-slate-900 font-mono">
                {trajectory.currentRisk}%
              </span>
              <span className="text-xs font-semibold text-rose-700">
                {project.overallRiskLevel.toUpperCase()}
              </span>
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              Active Stage: <strong className="capitalize">{project.currentStageId}</strong>
            </div>
          </div>

          {/* Previous Risk (30d Ago) */}
          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="font-medium">30 Days Ago</span>
              <Calendar className="w-4 h-4 text-slate-400" />
            </div>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-slate-700 font-mono">
                {trajectory.previousRisk}%
              </span>
              <span className="text-xs text-slate-500">
                baseline
              </span>
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              Initial Stage-Wise Scan
            </div>
          </div>

          {/* 30-Day Change */}
          <div className={`p-4 rounded-lg border ${
            trajectory.change30d > 0 
              ? 'bg-rose-50/50 border-rose-200' 
              : 'bg-emerald-50/50 border-emerald-200'
          }`}>
            <div className="flex items-center justify-between text-xs font-medium text-slate-600">
              <span>30-Day Risk Delta</span>
              {trajectory.change30d > 0 ? (
                <ArrowUpRight className="w-4 h-4 text-rose-600" />
              ) : (
                <ArrowDownRight className="w-4 h-4 text-emerald-600" />
              )}
            </div>
            <div className="mt-1 flex items-baseline gap-2">
              <span className={`text-3xl font-extrabold font-mono ${
                trajectory.change30d > 0 ? 'text-rose-700' : 'text-emerald-700'
              }`}>
                {trajectory.change30d > 0 ? `+${trajectory.change30d}` : trajectory.change30d}%
              </span>
              <span className="text-xs text-slate-600 font-medium">
                pts in 30 days
              </span>
            </div>
            <div className="text-[11px] text-slate-600 mt-1">
              {trajectory.change30d > 0 ? 'Risk accelerating' : 'Risk de-escalating'}
            </div>
          </div>

          {/* Risk Velocity */}
          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="font-medium">Risk Velocity</span>
              <Activity className="w-4 h-4 text-blue-600" />
            </div>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-slate-900 font-mono">
                {trajectory.riskVelocity > 0 ? `+${trajectory.riskVelocity.toFixed(2)}` : trajectory.riskVelocity.toFixed(2)}
              </span>
              <span className="text-xs text-slate-500 font-mono">
                pts / day
              </span>
            </div>
            <div className="text-[11px] text-slate-500 mt-1 font-mono">
              = &Delta;Risk ({trajectory.change30d}%) / 30 Days
            </div>
          </div>

        </div>

        {/* Official Trend Explanation Note */}
        <div className="mt-4 p-3.5 rounded-lg bg-slate-900 text-slate-100 flex items-start gap-3 text-xs leading-relaxed">
          <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <div className="font-bold text-amber-300 font-mono text-[11px] uppercase tracking-wider">
              Diagnostic Trajectory Assessment &bull; {trajectory.trendDirection.toUpperCase().replace('-', ' ')}
            </div>
            <p className="mt-0.5 text-slate-200">
              "{trajectory.trendExplanation}"
            </p>
          </div>
        </div>

      </div>

      {/* Main Interactive Trajectory Graph */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Trajectory Visual Chart */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-sm font-bold text-slate-900">
                Interactive Risk Timeline (30-Day Trajectory)
              </h4>
              <p className="text-xs text-slate-500">
                Hover over data points to inspect statutory milestones and delay projections
              </p>
            </div>
            <div className="flex items-center gap-3 text-[11px] font-mono text-slate-500">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-600"></span> Risk %
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-0.5 bg-slate-300"></span> Expected Delay
              </span>
            </div>
          </div>

          {/* SVG Chart Container */}
          <div className="relative w-full overflow-x-auto">
            <svg 
              viewBox={`0 0 ${svgWidth} ${svgHeight}`} 
              className="w-full h-auto min-w-[500px]"
            >
              <defs>
                <linearGradient id="riskGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#E11D48" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#E11D48" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              {[20, 40, 60, 80, 100].map((val) => {
                const y = paddingY + graphHeight - (val / 100) * graphHeight;
                return (
                  <g key={val}>
                    <line
                      x1={paddingX}
                      y1={y}
                      x2={svgWidth - paddingX}
                      y2={y}
                      stroke="#E2E8F0"
                      strokeDasharray="4 4"
                      strokeWidth="1"
                    />
                    <text
                      x={paddingX - 10}
                      y={y + 3}
                      textAnchor="end"
                      fontSize="10"
                      fill="#94A3B8"
                      fontFamily="monospace"
                    >
                      {val}%
                    </text>
                  </g>
                );
              })}

              {/* Area Fill */}
              <path d={areaD} fill="url(#riskGradient)" />

              {/* Trajectory Line */}
              <path
                d={pathD}
                fill="none"
                stroke="#E11D48"
                strokeWidth="3"
                strokeLinecap="round"
              />

              {/* Interactive Point Markers */}
              {coordinates.map((coord, idx) => {
                const isHovered = hoveredPointIndex === idx;
                const isLast = idx === coordinates.length - 1;
                return (
                  <g 
                    key={idx}
                    className="cursor-pointer transition-all duration-200"
                    onMouseEnter={() => setHoveredPointIndex(idx)}
                    onMouseLeave={() => setHoveredPointIndex(null)}
                  >
                    {/* Pulsing ring for current risk */}
                    {isLast && (
                      <circle
                        cx={coord.x}
                        cy={coord.y}
                        r="10"
                        fill="#E11D48"
                        opacity="0.2"
                        className="animate-ping"
                      />
                    )}

                    {/* Point Circle */}
                    <circle
                      cx={coord.x}
                      cy={coord.y}
                      r={isHovered ? 6.5 : 4.5}
                      fill={isLast ? '#E11D48' : '#0F172A'}
                      stroke="#FFFFFF"
                      strokeWidth="2"
                    />

                    {/* Risk % Label */}
                    <text
                      x={coord.x}
                      y={coord.y - 10}
                      textAnchor="middle"
                      fontSize="11"
                      fontWeight="bold"
                      fill={isLast ? '#E11D48' : '#0F172A'}
                      fontFamily="monospace"
                    >
                      {coord.point.risk}%
                    </text>

                    {/* X-Axis Date Label */}
                    <text
                      x={coord.x}
                      y={paddingY + graphHeight + 18}
                      textAnchor="middle"
                      fontSize="10"
                      fill="#64748B"
                      fontWeight={isLast ? 'bold' : 'normal'}
                    >
                      {coord.point.dateLabel}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Historical Points Detail List */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4 pt-4 border-t border-slate-100">
            {points.map((pt, i) => (
              <div 
                key={i} 
                className={`p-2.5 rounded-lg border text-xs transition ${
                  hoveredPointIndex === i ? 'bg-slate-900 text-white border-slate-900' : 'bg-slate-50 border-slate-200'
                }`}
                onMouseEnter={() => setHoveredPointIndex(i)}
                onMouseLeave={() => setHoveredPointIndex(null)}
              >
                <div className={`text-[10px] font-mono ${hoveredPointIndex === i ? 'text-slate-400' : 'text-slate-500'}`}>
                  {pt.dateLabel}
                </div>
                <div className="flex items-baseline gap-1.5 mt-0.5">
                  <span className={`text-base font-bold font-mono ${
                    hoveredPointIndex === i ? 'text-white' : 'text-slate-900'
                  }`}>
                    {pt.risk}%
                  </span>
                  <span className={`text-[10px] ${hoveredPointIndex === i ? 'text-slate-300' : 'text-slate-500'}`}>
                    ({pt.delayMonths} mo delay)
                  </span>
                </div>
                {pt.milestone && (
                  <div className={`text-[10px] truncate mt-1 ${hoveredPointIndex === i ? 'text-amber-300' : 'text-slate-600'}`}>
                    {pt.milestone}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Quick Action Navigation Buttons */}
          <div className="flex items-center justify-between gap-3 mt-4 pt-3 border-t border-slate-100 text-xs">
            <span className="text-slate-500">
              Downstream Intelligence Actions:
            </span>
            <div className="flex items-center gap-2">
              {onNavigateToGis && (
                <button
                  onClick={() => onNavigateToGis(project.id)}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium transition cursor-pointer flex items-center gap-1"
                >
                  <Layers className="w-3.5 h-3.5 text-slate-600" />
                  <span>Locate in GIS ({project.parcelSummary.criticalCount} Critical Parcels)</span>
                </button>
              )}
              {onNavigateToIntervention && (
                <button
                  onClick={() => onNavigateToIntervention(project.id)}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-medium shadow-xs transition cursor-pointer flex items-center gap-1"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Find Optimal Intervention</span>
                </button>
              )}
            </div>
          </div>

        </div>

        {/* Portfolio Risk Velocity Ranking Table Widget */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h4 className="text-sm font-bold text-slate-900">
                Projects With Accelerating Risk
              </h4>
              <p className="text-xs text-slate-500">
                Sorted by 30-Day Risk Delta &amp; Velocity
              </p>
            </div>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200 font-bold">
              Early Warning
            </span>
          </div>

          {/* Table */}
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 uppercase font-mono text-[10px]">
                  <th className="pb-2">Project</th>
                  <th className="pb-2 text-right">Risk</th>
                  <th className="pb-2 text-right">30d &Delta;</th>
                  <th className="pb-2 text-center">Trend</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {velocityRanking.map((p) => {
                  const isSelected = p.id === project.id;
                  const d = p.riskTrajectory.change30d;
                  return (
                    <tr 
                      key={p.id}
                      onClick={() => onSelectProject(p.id)}
                      className={`cursor-pointer transition ${
                        isSelected 
                          ? 'bg-slate-900 text-white' 
                          : 'hover:bg-slate-50 text-slate-800'
                      }`}
                    >
                      <td className="py-2.5 pr-2">
                        <div className="font-semibold truncate max-w-[130px]">
                          {p.name}
                        </div>
                        <div className={`text-[10px] ${isSelected ? 'text-slate-400' : 'text-slate-400'}`}>
                          {p.district} &bull; {p.type}
                        </div>
                      </td>

                      <td className="py-2.5 text-right font-mono font-bold">
                        <span className={
                          p.overallRisk >= 80 ? (isSelected ? 'text-rose-300' : 'text-rose-600') :
                          p.overallRisk >= 60 ? (isSelected ? 'text-amber-300' : 'text-amber-600') :
                          (isSelected ? 'text-emerald-300' : 'text-emerald-600')
                        }>
                          {p.overallRisk}%
                        </span>
                      </td>

                      <td className="py-2.5 text-right font-mono font-semibold">
                        <span className={
                          d > 10 ? (isSelected ? 'text-rose-300' : 'text-rose-700') :
                          d > 0 ? (isSelected ? 'text-amber-300' : 'text-amber-700') :
                          (isSelected ? 'text-emerald-300' : 'text-emerald-700')
                        }>
                          {d > 0 ? `+${d}%` : `${d}%`}
                        </span>
                      </td>

                      <td className="py-2.5 text-center">
                        {p.riskTrajectory.trendDirection === 'rapidly-increasing' && (
                          <span className="inline-block w-2.5 h-2.5 rounded-full bg-rose-600" title="Rapidly Increasing" />
                        )}
                        {p.riskTrajectory.trendDirection === 'worsening' && (
                          <span className="inline-block w-2.5 h-2.5 rounded-full bg-amber-500" title="Worsening" />
                        )}
                        {p.riskTrajectory.trendDirection === 'stable' && (
                          <span className="inline-block w-2.5 h-2.5 rounded-full bg-blue-500" title="Stable" />
                        )}
                        {p.riskTrajectory.trendDirection === 'improving' && (
                          <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500" title="Improving" />
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="mt-3 pt-2 text-[10px] text-slate-400 border-t border-slate-100 flex items-center justify-between">
            <span>Click any project to inspect its historical risk trajectory</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          </div>

        </div>

      </div>

    </div>
  );
};
