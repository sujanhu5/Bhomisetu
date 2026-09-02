import React, { useState, useMemo } from 'react';
import { 
  MapPin, 
  Layers, 
  Filter, 
  Search, 
  AlertOctagon, 
  CheckCircle2, 
  SlidersHorizontal, 
  Compass, 
  Info,
  Building,
  UserCheck,
  FileText,
  Scale,
  Sparkles,
  ArrowRight,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Maximize2
} from 'lucide-react';
import { Project, ParcelData, RiskLevel } from '../../types';

interface GisParcelHeatmapViewProps {
  project: Project;
  allProjects: Project[];
  onSelectProject: (projectId: string) => void;
  onNavigateToDocAi?: () => void;
  onNavigateToIntervention?: () => void;
}

export const GisParcelHeatmapView: React.FC<GisParcelHeatmapViewProps> = ({
  project,
  allProjects,
  onSelectProject,
  onNavigateToDocAi,
  onNavigateToIntervention
}) => {
  const [selectedVillage, setSelectedVillage] = useState<string>('all');
  const [selectedRiskFilter, setSelectedRiskFilter] = useState<string>('all');
  const [selectedParcelId, setSelectedParcelId] = useState<string>(
    project.parcels.length > 0 ? project.parcels[0].id : ''
  );
  
  // Layer toggles
  const [filterOwnershipConflict, setFilterOwnershipConflict] = useState(false);
  const [filterLegalDispute, setFilterLegalDispute] = useState(false);
  const [filterCompensationPending, setFilterCompensationPending] = useState(false);
  const [filterDocIncomplete, setFilterDocIncomplete] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  // Available unique villages
  const villages = useMemo(() => {
    const set = new Set<string>();
    project.parcels.forEach(p => set.add(p.village));
    return Array.from(set);
  }, [project.parcels]);

  // Filtered parcels
  const filteredParcels = useMemo(() => {
    return project.parcels.filter(p => {
      const matchVillage = selectedVillage === 'all' || p.village === selectedVillage;
      const matchRisk = selectedRiskFilter === 'all' || p.riskLevel === selectedRiskFilter;
      const matchSearch = p.parcelNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.surveyNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.ownerName.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchOwnership = !filterOwnershipConflict || p.ownership !== 'Single Owner';
      const matchLegal = !filterLegalDispute || p.legalStatus !== 'No Legal Dispute';
      const matchComp = !filterCompensationPending || p.compensationStatus.includes('Pending') || p.compensationStatus.includes('Clearance');
      const matchDoc = !filterDocIncomplete || p.documentationStatus.includes('Incomplete') || p.documentationStatus.includes('Mismatch');

      return matchVillage && matchRisk && matchSearch && matchOwnership && matchLegal && matchComp && matchDoc;
    });
  }, [
    project.parcels, 
    selectedVillage, 
    selectedRiskFilter, 
    searchTerm, 
    filterOwnershipConflict, 
    filterLegalDispute, 
    filterCompensationPending, 
    filterDocIncomplete
  ]);

  // Selected Parcel object
  const activeParcel = useMemo(() => {
    return project.parcels.find(p => p.id === selectedParcelId) || project.parcels[0] || null;
  }, [project.parcels, selectedParcelId]);

  const summary = project.parcelSummary;

  const getRiskColor = (level: RiskLevel) => {
    switch (level) {
      case 'critical':
        return '#E11D48'; // Rose-600
      case 'high':
        return '#F97316'; // Orange-500
      case 'moderate':
        return '#EAB308'; // Yellow-500
      case 'low':
      default:
        return '#10B981'; // Emerald-500
    }
  };

  const getRiskBg = (level: RiskLevel) => {
    switch (level) {
      case 'critical':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'high':
        return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'moderate':
        return 'bg-yellow-50 text-yellow-800 border-yellow-200';
      case 'low':
      default:
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner & Multi-Level Hierarchy Breadcrumb */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            {/* Multi-level Navigation Breadcrumb */}
            <div className="flex items-center gap-1.5 text-xs text-slate-500 flex-wrap font-mono">
              <span className="font-semibold text-slate-800">State: Karnataka</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="font-semibold text-slate-800">District: {project.district}</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="px-2 py-0.5 rounded bg-slate-900 text-white font-bold text-[11px]">
                Project: {project.name}
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-slate-600">
                Village: {selectedVillage === 'all' ? 'All 7 Villages' : selectedVillage}
              </span>
            </div>

            <div className="flex items-center gap-3 mt-2">
              <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                Cadastral Parcel-Level Risk Heatmap
              </h3>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-100 text-amber-900 border border-amber-300">
                Simulated / Prototype Data
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Micro-spatial bottleneck localization &bull; Individual survey parcel legal &amp; compensation status
            </p>
          </div>

          {/* Project Switcher */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-medium">Switch Corridor:</span>
            <select
              value={project.id}
              onChange={(e) => onSelectProject(e.target.value)}
              className="text-xs rounded-lg border border-slate-300 bg-slate-50 px-3 py-1.5 font-medium text-slate-800 focus:outline-hidden"
            >
              {allProjects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.district}) &bull; {p.totalParcels} Parcels
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Corridor Parcel Summary Breakdown Counter */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-4 pt-4 border-t border-slate-100">
          
          <div className="p-3 rounded-lg bg-slate-900 text-white">
            <div className="text-[11px] text-slate-400 font-mono">Total Parcels</div>
            <div className="text-2xl font-extrabold font-mono mt-0.5">
              {summary.totalParcels.toLocaleString()}
            </div>
            <div className="text-[10px] text-slate-300">
              Corridor Length: 142.5 Ha
            </div>
          </div>

          {/* Low Risk 0-30% */}
          <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200">
            <div className="text-[11px] text-emerald-800 font-semibold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Low (0–30%)
            </div>
            <div className="text-2xl font-extrabold text-emerald-900 font-mono mt-0.5">
              {summary.lowCount}
            </div>
            <div className="text-[10px] text-emerald-700 font-mono">
              {Math.round((summary.lowCount / summary.totalParcels) * 100)}% of corridor
            </div>
          </div>

          {/* Medium Risk 31-60% */}
          <div className="p-3 rounded-lg bg-yellow-50 border border-yellow-200">
            <div className="text-[11px] text-yellow-800 font-semibold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
              Medium (31–60%)
            </div>
            <div className="text-2xl font-extrabold text-yellow-900 font-mono mt-0.5">
              {summary.mediumCount}
            </div>
            <div className="text-[10px] text-yellow-700 font-mono">
              {Math.round((summary.mediumCount / summary.totalParcels) * 100)}% of corridor
            </div>
          </div>

          {/* High Risk 61-80% */}
          <div className="p-3 rounded-lg bg-orange-50 border border-orange-200">
            <div className="text-[11px] text-orange-800 font-semibold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-orange-500"></span>
              High (61–80%)
            </div>
            <div className="text-2xl font-extrabold text-orange-900 font-mono mt-0.5">
              {summary.highCount}
            </div>
            <div className="text-[10px] text-orange-700 font-mono">
              {Math.round((summary.highCount / summary.totalParcels) * 100)}% of corridor
            </div>
          </div>

          {/* Critical Risk 81-100% */}
          <div className="p-3 rounded-lg bg-rose-50 border border-rose-300">
            <div className="text-[11px] text-rose-800 font-bold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-rose-600 animate-pulse"></span>
              Critical (81–100%)
            </div>
            <div className="text-2xl font-extrabold text-rose-900 font-mono mt-0.5">
              {summary.criticalCount}
            </div>
            <div className="text-[10px] text-rose-700 font-mono font-bold">
              Immediate action focus
            </div>
          </div>

        </div>

        {/* Filter Controls & Layer Toggles Bar */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
          
          {/* Left filters: Village & Risk */}
          <div className="flex flex-wrap items-center gap-2">
            
            {/* Search */}
            <div className="relative min-w-[160px]">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2" />
              <input
                type="text"
                placeholder="Search Parcel / Sy.No..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-slate-300 bg-slate-50 text-xs font-medium text-slate-800 focus:outline-hidden"
              />
            </div>

            {/* Village Selector */}
            <select
              value={selectedVillage}
              onChange={(e) => setSelectedVillage(e.target.value)}
              className="rounded-lg border border-slate-300 bg-slate-50 px-3 py-1.5 font-medium text-slate-800 focus:outline-hidden text-xs"
            >
              <option value="all">All Villages ({villages.length})</option>
              {villages.map(v => (
                <option key={v} value={v}>{v} Village</option>
              ))}
            </select>

            {/* Risk Category Selector */}
            <select
              value={selectedRiskFilter}
              onChange={(e) => setSelectedRiskFilter(e.target.value)}
              className="rounded-lg border border-slate-300 bg-slate-50 px-3 py-1.5 font-medium text-slate-800 focus:outline-hidden text-xs"
            >
              <option value="all">All Risk Levels</option>
              <option value="critical">🔴 Critical Risk (81-100%)</option>
              <option value="high">🟠 High Risk (61-80%)</option>
              <option value="moderate">🟡 Medium Risk (31-60%)</option>
              <option value="low">🟢 Low Risk (0-30%)</option>
            </select>

          </div>

          {/* Right Layer Switches: Specific Risk Contributors */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-semibold text-slate-400 uppercase font-mono mr-1">
              GIS Layers:
            </span>
            
            <button
              onClick={() => setFilterOwnershipConflict(!filterOwnershipConflict)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-medium border transition cursor-pointer ${
                filterOwnershipConflict 
                  ? 'bg-rose-900 text-white border-rose-900' 
                  : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
              }`}
            >
              Ownership Conflict
            </button>

            <button
              onClick={() => setFilterLegalDispute(!filterLegalDispute)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-medium border transition cursor-pointer ${
                filterLegalDispute 
                  ? 'bg-amber-900 text-white border-amber-900' 
                  : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
              }`}
            >
              Legal Dispute (Sec 64)
            </button>

            <button
              onClick={() => setFilterCompensationPending(!filterCompensationPending)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-medium border transition cursor-pointer ${
                filterCompensationPending 
                  ? 'bg-blue-900 text-white border-blue-900' 
                  : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
              }`}
            >
              Compensation Pending
            </button>

            <button
              onClick={() => setFilterDocIncomplete(!filterDocIncomplete)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-medium border transition cursor-pointer ${
                filterDocIncomplete 
                  ? 'bg-slate-900 text-white border-slate-900' 
                  : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
              }`}
            >
              Incomplete Docs
            </button>
          </div>

        </div>

      </div>

      {/* Main Map & Parcel Inspection Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left 7 Columns: Spatial Cadastral Grid & Corridor Map */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col">
          
          <div className="flex items-center justify-between mb-3">
            <div>
              <h4 className="text-sm font-bold text-slate-900">
                Corridor Cadastral Plot Array ({filteredParcels.length} Parcels Displayed)
              </h4>
              <p className="text-xs text-slate-500">
                Click any parcel node to open the full RFCTLARR diagnostic profile
              </p>
            </div>

            <div className="flex items-center gap-1">
              <button 
                onClick={() => setZoomLevel(prev => Math.max(0.8, prev - 0.2))}
                className="p-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-600 transition cursor-pointer"
                title="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="text-[10px] font-mono px-1.5 text-slate-500">{Math.round(zoomLevel * 100)}%</span>
              <button 
                onClick={() => setZoomLevel(prev => Math.min(1.6, prev + 0.2))}
                className="p-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-600 transition cursor-pointer"
                title="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Interactive Cadastral Corridor Canvas / SVG */}
          <div className="relative border border-slate-200 rounded-lg bg-slate-950 p-4 min-h-[380px] overflow-hidden flex flex-col justify-between">
            
            {/* Overlay Map Badge */}
            <div className="flex items-center justify-between z-10">
              <div className="flex items-center gap-2 bg-slate-900/80 backdrop-blur-xs px-2.5 py-1 rounded text-[11px] text-slate-300 font-mono border border-slate-800">
                <Compass className="w-3.5 h-3.5 text-blue-400 animate-spin" style={{ animationDuration: '12s' }} />
                <span>NH-48 Right-of-Way Alignment &bull; Ch: 42+000 to 74+500</span>
              </div>
              <div className="text-[10px] text-slate-400 font-mono bg-slate-900/80 px-2 py-0.5 rounded">
                DGPS Cadastral Grid
              </div>
            </div>

            {/* Simulated Road Corridor Centerline */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30">
              <div className="w-full h-12 bg-slate-800 border-y border-dashed border-slate-600 transform -rotate-6"></div>
            </div>

            {/* Interactive Grid of Cadastral Parcels */}
            <div 
              className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-2.5 my-6 py-4 z-10 overflow-y-auto max-h-[320px] pr-1"
              style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'top left' }}
            >
              {filteredParcels.map((parcel) => {
                const isSelected = activeParcel?.id === parcel.id;
                const color = getRiskColor(parcel.riskLevel);
                const isCritical = parcel.riskLevel === 'critical';

                return (
                  <button
                    key={parcel.id}
                    onClick={() => setSelectedParcelId(parcel.id)}
                    className={`relative p-2 rounded-lg border flex flex-col items-center justify-between text-center transition cursor-pointer ${
                      isSelected 
                        ? 'ring-2 ring-white ring-offset-2 ring-offset-slate-950 bg-slate-800 border-white scale-105 z-20 shadow-lg' 
                        : 'bg-slate-900/90 hover:bg-slate-800 border-slate-700/80 hover:border-slate-500'
                    }`}
                    title={`${parcel.parcelNumber} (${parcel.surveyNumber}) - ${parcel.village} - ${parcel.riskScore}% Risk`}
                  >
                    {/* Status Dot / Flag */}
                    <div className="w-full flex items-center justify-between">
                      <span 
                        className="w-2 h-2 rounded-full shrink-0"
                        style={{ backgroundColor: color }}
                      />
                      <span className="text-[9px] font-mono text-slate-400">
                        {parcel.areaHa}Ha
                      </span>
                    </div>

                    <div className="text-[11px] font-mono font-bold text-white mt-1">
                      {parcel.parcelNumber}
                    </div>

                    <div className="text-[9px] text-slate-400 truncate max-w-full mt-0.5">
                      {parcel.village}
                    </div>

                    <div 
                      className="text-[10px] font-mono font-bold mt-1 px-1.5 py-0.2 rounded w-full"
                      style={{ 
                        backgroundColor: `${color}25`, 
                        color: color 
                      }}
                    >
                      {parcel.riskScore}%
                    </div>

                    {isCritical && (
                      <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-rose-600 animate-ping" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Bottom Legend */}
            <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800 z-10 font-mono">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> 0–30% Low
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500"></span> 31–60% Med
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span> 61–80% High
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-600"></span> 81–100% Critical
                </span>
              </div>
              <span className="text-amber-400 font-bold">
                Hotspot: Rampura Village (Sy.140-144)
              </span>
            </div>

          </div>

          {/* Quick Notice */}
          <div className="mt-3 p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Info className="w-4 h-4 text-slate-400" />
              <span>Simulated prototype boundary data generated for Tumakuru alignment package.</span>
            </span>
            {onNavigateToDocAi && (
              <button
                onClick={onNavigateToDocAi}
                className="text-xs font-semibold text-blue-700 hover:text-blue-900 underline flex items-center gap-1 cursor-pointer"
              >
                <span>Upload Acquisition Notice</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

        </div>

        {/* Right 5 Columns: Interactive Selected Parcel Profile Card */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col justify-between">
          
          {activeParcel ? (
            <div className="space-y-4">
              
              {/* Card Header */}
              <div className="flex items-start justify-between border-b border-slate-100 pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-base font-extrabold font-mono text-slate-900">
                      {activeParcel.parcelNumber}
                    </span>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                      {activeParcel.surveyNumber}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    Village: <strong>{activeParcel.village}</strong> &bull; District: {activeParcel.district}
                  </div>
                </div>

                <div className="text-right">
                  <div className={`px-2.5 py-1 rounded-md text-xs font-bold border font-mono ${getRiskBg(activeParcel.riskLevel)}`}>
                    {activeParcel.riskScore}% {activeParcel.riskLevel.toUpperCase()}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5 font-mono">
                    Area: {activeParcel.areaHa} Ha
                  </div>
                </div>
              </div>

              {/* Ownership & Legal Metadata */}
              <div className="space-y-2 text-xs">
                
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex items-start justify-between">
                  <div>
                    <div className="text-[10px] font-semibold text-slate-400 uppercase font-mono">
                      Khatedar / Title Holder
                    </div>
                    <div className="font-semibold text-slate-900 mt-0.5">
                      {activeParcel.ownerName}
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-200 text-slate-700">
                    {activeParcel.ownership}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                    <div className="text-[10px] font-semibold text-slate-400 uppercase font-mono">
                      Legal Status
                    </div>
                    <div className="font-medium text-slate-800 mt-0.5 text-[11px]">
                      {activeParcel.legalStatus}
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                    <div className="text-[10px] font-semibold text-slate-400 uppercase font-mono">
                      Compensation Status
                    </div>
                    <div className="font-medium text-slate-800 mt-0.5 text-[11px]">
                      {activeParcel.compensationStatus}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                    <div className="text-[10px] font-semibold text-slate-400 uppercase font-mono">
                      Documentation
                    </div>
                    <div className="font-medium text-slate-800 mt-0.5 text-[11px]">
                      {activeParcel.documentationStatus}
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                    <div className="text-[10px] font-semibold text-slate-400 uppercase font-mono">
                      Affected Family
                    </div>
                    <div className="font-medium text-slate-800 mt-0.5 text-[11px]">
                      {activeParcel.affectedFamily ? `Yes (${activeParcel.familyCount} families)` : 'No (Non-residential)'}
                    </div>
                  </div>
                </div>

              </div>

              {/* Risk Contributors (+% Breakdown) */}
              <div className="border-t border-slate-100 pt-3">
                <div className="flex items-center justify-between text-xs font-bold text-slate-900 mb-2">
                  <span>Risk Contributors</span>
                  <span className="text-[10px] font-mono text-slate-400">SHAP Attributions</span>
                </div>

                <div className="space-y-1.5">
                  {activeParcel.riskContributors.map((c, i) => (
                    <div key={i} className="flex items-center justify-between text-xs p-1.5 rounded bg-slate-50 border border-slate-200">
                      <span className="text-slate-700">{c.name}</span>
                      <span className="font-mono font-bold text-rose-600">
                        +{c.impactPct}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommended Actions */}
              <div className="border-t border-slate-100 pt-3">
                <div className="text-xs font-bold text-slate-900 mb-2">
                  Recommended Ground Mitigation Actions
                </div>
                <ul className="space-y-1.5 text-xs text-slate-700">
                  {activeParcel.recommendedActions.map((action, i) => (
                    <li key={i} className="flex items-start gap-2 bg-amber-50/50 p-2 rounded border border-amber-200/60">
                      <span className="w-4 h-4 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px] font-mono shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <span>{action}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          ) : (
            <div className="text-center py-12 text-slate-400 text-xs">
              Select a parcel from the map to inspect its diagnostic risk profile.
            </div>
          )}

          {/* Action CTAs */}
          {activeParcel && (
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2 mt-4">
              <span className="text-[11px] text-slate-400 font-mono">
                Updated {activeParcel.lastUpdated}
              </span>
              {onNavigateToIntervention && (
                <button
                  onClick={onNavigateToIntervention}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs shadow-xs transition cursor-pointer flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Resolve via Optimal Engine</span>
                </button>
              )}
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
