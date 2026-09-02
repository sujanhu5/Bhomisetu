import React, { useState } from 'react';
import { 
  MapPin, 
  Layers, 
  Filter, 
  Search, 
  ZoomIn, 
  ZoomOut, 
  Eye, 
  SlidersHorizontal, 
  BrainCircuit, 
  Compass, 
  ShieldAlert, 
  Building2, 
  CheckCircle2, 
  ArrowRight,
  TrendingDown,
  Sparkles
} from 'lucide-react';
import { Project, RiskLevel, StageId } from '../types';
import { DISTRICT_MAP_POINTS } from '../data/mockData';

interface GisRiskMapProps {
  projects: Project[];
  onSelectProject: (projectId: string) => void;
  onOpenExplainableAI: (projectId: string) => void;
  onOpenSimulator: (projectId: string) => void;
}

export const GisRiskMap: React.FC<GisRiskMapProps> = ({
  projects,
  onSelectProject,
  onOpenExplainableAI,
  onOpenSimulator
}) => {
  const [selectedDistrict, setSelectedDistrict] = useState<string>('Tumakuru');
  const [riskFilter, setRiskFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [stageFilter, setStageFilter] = useState<string>('all');
  const [activeLayer, setActiveLayer] = useState<'standard' | 'satellite' | 'heatmap'>('standard');
  const [selectedProjectId, setSelectedProjectId] = useState<string>('nh-48-expansion');

  // Selected project details
  const activeProject = projects.find(p => p.id === selectedProjectId) || projects[0];

  // Filter projects for map markers
  const filteredProjects = projects.filter(p => {
    const matchRisk = riskFilter === 'all' || p.overallRiskLevel === riskFilter;
    const matchType = typeFilter === 'all' || p.type === typeFilter;
    const matchStage = stageFilter === 'all' || p.currentStageId === stageFilter;
    return matchRisk && matchType && matchStage;
  });

  const getMarkerColor = (level: RiskLevel) => {
    switch (level) {
      case 'critical':
        return '#E11D48'; // Rose-600
      case 'high':
        return '#F59E0B'; // Amber-500
      case 'moderate':
        return '#EAB308'; // Yellow-500
      case 'low':
      default:
        return '#10B981'; // Emerald-500
    }
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Top Banner & Filter Controls */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200 font-mono">
                GIS Spatial Engine
              </span>
              <span className="text-xs text-slate-500 font-mono">
                State Cadastral &amp; Corridor Overlay &bull; Karnataka
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-1">
              Geospatial Land Acquisition Risk Map
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Interactive spatial decision-support for District Collectors &amp; State Infrastructure Steering Committee
            </p>
          </div>

          {/* Map Layer Mode Switcher */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-lg border border-slate-200 self-start">
            <button
              onClick={() => setActiveLayer('standard')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition cursor-pointer ${
                activeLayer === 'standard' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Administrative Vector
            </button>
            <button
              onClick={() => setActiveLayer('satellite')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition cursor-pointer ${
                activeLayer === 'satellite' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Satellite Imagery
            </button>
            <button
              onClick={() => setActiveLayer('heatmap')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition cursor-pointer ${
                activeLayer === 'heatmap' ? 'bg-rose-700 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Delay Heatmap
            </button>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 mt-4 pt-4 border-t border-slate-100 text-xs">
          
          {/* State Selector */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 uppercase mb-1">State</label>
            <select className="w-full rounded-lg border border-slate-300 bg-slate-50 p-2 font-medium text-slate-800 focus:outline-hidden">
              <option value="KA">Karnataka (127 Projects)</option>
              <option value="MH" disabled>Maharashtra (Upcoming)</option>
              <option value="TN" disabled>Tamil Nadu (Upcoming)</option>
            </select>
          </div>

          {/* District Selector */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 uppercase mb-1">District</label>
            <select
              value={selectedDistrict}
              onChange={(e) => {
                setSelectedDistrict(e.target.value);
                const p = projects.find(proj => proj.district.toLowerCase().includes(e.target.value.toLowerCase()));
                if (p) setSelectedProjectId(p.id);
              }}
              className="w-full rounded-lg border border-slate-300 bg-slate-50 p-2 font-medium text-slate-800 focus:outline-hidden"
            >
              <option value="All">All 31 Districts</option>
              <option value="Tumakuru">Tumakuru (14 Packages - Critical)</option>
              <option value="Bengaluru Urban">Bengaluru Urban (32 Packages - High)</option>
              <option value="Dharwad">Dharwad (11 Packages - High)</option>
              <option value="Mysuru">Mysuru (18 Packages - Moderate)</option>
              <option value="Belagavi">Belagavi (16 Packages - High)</option>
              <option value="Dakshina Kannada">Dakshina Kannada / Mangaluru (15 Packages - Low)</option>
            </select>
          </div>

          {/* Project Type */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 uppercase mb-1">Project Type</label>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-slate-50 p-2 font-medium text-slate-800 focus:outline-hidden"
            >
              <option value="all">All Infrastructure Types</option>
              <option value="Highway">Highways (NHAI/KSHIP)</option>
              <option value="Industrial">Industrial (KIADB)</option>
              <option value="Irrigation">Irrigation (CNNL)</option>
              <option value="Urban Infra">Urban Infra &amp; Metro</option>
            </select>
          </div>

          {/* Stage */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 uppercase mb-1">Acquisition Stage</label>
            <select
              value={stageFilter}
              onChange={(e) => setStageFilter(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-slate-50 p-2 font-medium text-slate-800 focus:outline-hidden"
            >
              <option value="all">All 7 Stages (RFCTLARR)</option>
              <option value="sia">Stage 1: SIA (Sec 4)</option>
              <option value="notification">Stage 2: Notification (Sec 11)</option>
              <option value="consent">Stage 3: Consent (Sec 19)</option>
              <option value="award">Stage 4: Award (Sec 23)</option>
              <option value="compensation">Stage 5: Compensation (Sec 77)</option>
              <option value="possession">Stage 6: Possession (Sec 38)</option>
              <option value="rr">Stage 7: R&amp;R (Sec 31)</option>
            </select>
          </div>

          {/* Risk Level */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 uppercase mb-1">Risk Level</label>
            <select
              value={riskFilter}
              onChange={(e) => setRiskFilter(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-slate-50 p-2 font-medium text-slate-800 focus:outline-hidden"
            >
              <option value="all">All Risk Levels</option>
              <option value="critical">Critical (&gt;80%)</option>
              <option value="high">High (60-80%)</option>
              <option value="moderate">Moderate (30-60%)</option>
              <option value="low">Low (&lt;30%)</option>
            </select>
          </div>

        </div>
      </div>

      {/* Main Map + Selected Inspector Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Interactive Map Canvas */}
        <div className={`lg:col-span-2 rounded-xl border shadow-sm overflow-hidden relative min-h-[540px] flex flex-col justify-between ${
          activeLayer === 'satellite' ? 'bg-slate-900 border-slate-700' : 'bg-slate-100 border-slate-300'
        }`}>
          
          {/* Map Top Floating Header & Legend */}
          <div className="absolute top-4 left-4 z-20 bg-white/95 backdrop-blur-xs p-3 rounded-lg shadow-md border border-slate-200 max-w-xs text-xs">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-rose-600" />
              <span>Karnataka Spatial Risk Grid</span>
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">
              Showing {filteredProjects.length} geo-referenced packages
            </div>

            {/* Risk Legend */}
            <div className="flex items-center gap-3 mt-2.5 pt-2 border-t border-slate-200 text-[10px] font-semibold">
              <span className="flex items-center gap-1 text-emerald-700">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Low
              </span>
              <span className="flex items-center gap-1 text-yellow-700">
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500"></span> Mod
              </span>
              <span className="flex items-center gap-1 text-amber-700">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> High
              </span>
              <span className="flex items-center gap-1 text-rose-700">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-600 animate-pulse"></span> Critical
              </span>
            </div>
          </div>

          {/* Map Compass & Zoom Controls */}
          <div className="absolute top-4 right-4 z-20 flex flex-col gap-1.5">
            <div className="w-8 h-8 rounded-lg bg-white/90 shadow-md border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-white cursor-pointer">
              <Compass className="w-4 h-4 text-blue-600" />
            </div>
            <div className="w-8 h-8 rounded-lg bg-white/90 shadow-md border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-white cursor-pointer">
              <ZoomIn className="w-4 h-4" />
            </div>
            <div className="w-8 h-8 rounded-lg bg-white/90 shadow-md border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-white cursor-pointer">
              <ZoomOut className="w-4 h-4" />
            </div>
          </div>

          {/* SVG Map of Karnataka with Districts & Corridors */}
          <div className="w-full h-full min-h-[500px] flex items-center justify-center p-4 relative overflow-hidden">
            <svg 
              viewBox="0 0 800 680" 
              className="w-full h-full max-h-[520px] drop-shadow-md select-none"
              style={{
                filter: activeLayer === 'satellite' ? 'brightness(0.9) contrast(1.1)' : 'none'
              }}
            >
              {/* Karnataka State Boundary Fill */}
              <defs>
                <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={activeLayer === 'satellite' ? '#1E293B' : '#E2E8F0'} />
                  <stop offset="100%" stopColor={activeLayer === 'satellite' ? '#0F172A' : '#CBD5E1'} />
                </linearGradient>

                <linearGradient id="heatGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FB7185" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#E11D48" stopOpacity="0.8" />
                </linearGradient>
              </defs>

              {/* State Outline Polygon */}
              <path
                d="M 180,80 
                   L 320,60 
                   L 460,70 
                   L 580,90 
                   L 640,140 
                   L 620,240 
                   L 570,320 
                   L 620,440 
                   L 640,540 
                   L 580,620 
                   L 420,640 
                   L 340,600 
                   L 260,560 
                   L 200,480 
                   L 240,380 
                   L 220,280 
                   L 160,180 Z"
                fill="url(#mapGradient)"
                stroke={activeLayer === 'satellite' ? '#475569' : '#94A3B8'}
                strokeWidth="2.5"
                className="transition-colors"
              />

              {/* Major Highway Corridors (NH-48, NH-44, NH-75) */}
              <path
                d="M 210,160 Q 360,300 520,420 T 580,510"
                fill="none"
                stroke={activeLayer === 'satellite' ? '#38BDF8' : '#2563EB'}
                strokeWidth="3.5"
                strokeDasharray="6,4"
                className="opacity-80"
              />
              <path
                d="M 430,570 L 580,510 L 620,240"
                fill="none"
                stroke={activeLayer === 'satellite' ? '#F43F5E' : '#DC2626'}
                strokeWidth="2.5"
                className="opacity-60"
              />

              {/* District Regions & Circles */}
              {DISTRICT_MAP_POINTS.map((d) => {
                const isSelected = activeProject.district.toLowerCase().includes(d.name.toLowerCase());
                const color = getMarkerColor(d.riskLevel);

                return (
                  <g 
                    key={d.name} 
                    className="cursor-pointer group"
                    onClick={() => {
                      setSelectedDistrict(d.name);
                      const matched = projects.find(p => p.district.toLowerCase().includes(d.name.toLowerCase()));
                      if (matched) setSelectedProjectId(matched.id);
                    }}
                  >
                    {/* District Area Glow */}
                    <circle
                      cx={d.svgX}
                      cy={d.svgY}
                      r={d.riskLevel === 'critical' ? 36 : 28}
                      fill={color}
                      fillOpacity={d.riskLevel === 'critical' ? 0.25 : 0.15}
                      className={d.riskLevel === 'critical' ? 'animate-pulse' : ''}
                    />

                    {/* Outer Ring */}
                    <circle
                      cx={d.svgX}
                      cy={d.svgY}
                      r={isSelected ? 18 : 14}
                      fill="white"
                      stroke={color}
                      strokeWidth={isSelected ? 4 : 2.5}
                      className="transition-all"
                    />

                    {/* Center Pin */}
                    <circle
                      cx={d.svgX}
                      cy={d.svgY}
                      r={isSelected ? 8 : 6}
                      fill={color}
                    />

                    {/* District Label */}
                    <text
                      x={d.svgX}
                      y={d.svgY + 28}
                      textAnchor="middle"
                      className={`text-[12px] font-bold select-none ${
                        activeLayer === 'satellite' ? 'fill-white' : 'fill-slate-900'
                      }`}
                    >
                      {d.name}
                    </text>

                    {/* Risk Badge on Map */}
                    <text
                      x={d.svgX}
                      y={d.svgY + 41}
                      textAnchor="middle"
                      className="text-[10px] font-mono font-bold fill-rose-600"
                    >
                      {d.topRisk}% Risk
                    </text>
                  </g>
                );
              })}

              {/* Pulsating Spotlight on Selected Tumakuru Node */}
              <circle
                cx={520}
                cy={420}
                r={44}
                fill="none"
                stroke="#E11D48"
                strokeWidth="2"
                strokeDasharray="4,4"
                className="animate-spin"
                style={{ transformOrigin: '520px 420px', animationDuration: '8s' }}
              />
            </svg>
          </div>

          {/* Map Footer Helper Bar */}
          <div className="bg-white/90 backdrop-blur-xs p-3 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-600 gap-2 z-10">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-600 animate-ping"></span>
              <span><strong>Hotspot Detected:</strong> Tumakuru Division (82% Compensation Risk on NH-48)</span>
            </div>
            <span className="text-[11px] font-mono text-slate-500">
              Co-ordinates: 13.3409° N, 77.1010° E
            </span>
          </div>

        </div>

        {/* Right Col: Selected Project Inspector Card */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] uppercase font-bold text-slate-500 font-mono tracking-wider">
                Geographic Inspector
              </span>
              <span
                className={`text-xs font-bold px-2 py-0.5 rounded font-mono ${
                  activeProject.overallRiskLevel === 'critical'
                    ? 'bg-rose-100 text-rose-800'
                    : 'bg-amber-100 text-amber-800'
                }`}
              >
                {activeProject.overallRisk}% Risk ({activeProject.overallRiskLevel.toUpperCase()})
              </span>
            </div>

            <h3 className="text-lg font-bold text-slate-900 leading-tight">
              {activeProject.name}
            </h3>
            
            <div className="text-xs text-slate-500 mt-1 flex items-center gap-1 font-semibold">
              <MapPin className="w-3.5 h-3.5 text-rose-500" />
              {activeProject.district} District &bull; ID: {activeProject.code}
            </div>

            {/* Stage and Delay Stats */}
            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <div className="text-[11px] text-slate-500 font-medium">Current Stage</div>
                <div className="text-sm font-bold text-slate-900 mt-0.5 capitalize">
                  {activeProject.currentStageId}
                </div>
                <div className="text-[10px] text-slate-400 font-mono">Sec 77 RFCTLARR</div>
              </div>

              <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
                <div className="text-[11px] text-amber-800 font-medium">Expected Delay</div>
                <div className="text-sm font-extrabold text-amber-950 mt-0.5 font-mono">
                  {activeProject.expectedDelayMonths} months
                </div>
                <div className="text-[10px] text-amber-800 font-mono">₹{activeProject.costImpact.totalImpactCr} Cr impact</div>
              </div>
            </div>

            {/* Key Bottleneck Factors */}
            <div className="mt-4 pt-3 border-t border-slate-100 space-y-2">
              <div className="text-xs font-bold text-slate-800">
                Primary Ground Bottlenecks:
              </div>
              <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-4">
                <li>43 pending compensation disbursement claims in Sira Taluk</li>
                <li>Average payment cycle running at 74 days (norm: 45 days)</li>
                <li>17 active title partition disputes pending under Section 64</li>
              </ul>
            </div>

            {/* Delay Story Quote */}
            <div className="mt-3 p-3 bg-blue-50/60 rounded-lg border border-blue-100 text-xs text-blue-950 italic">
              &ldquo;{activeProject.delayStory}&rdquo;
            </div>
          </div>

          {/* Action CTAs */}
          <div className="mt-5 pt-4 border-t border-slate-100 space-y-2">
            <button
              onClick={() => onSelectProject(activeProject.id)}
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold shadow-xs transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Inspect Full Project Timeline</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => onOpenExplainableAI(activeProject.id)}
                className="py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 rounded-lg text-xs font-semibold transition flex items-center justify-center gap-1 cursor-pointer"
              >
                <BrainCircuit className="w-3.5 h-3.5 text-blue-600" />
                <span>Explain (SHAP)</span>
              </button>

              <button
                onClick={() => onOpenSimulator(activeProject.id)}
                className="py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-lg text-xs font-semibold transition flex items-center justify-center gap-1 cursor-pointer"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-emerald-600" />
                <span>What-If Sim</span>
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
