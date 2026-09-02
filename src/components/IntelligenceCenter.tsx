import React, { useState } from 'react';
import { 
  TrendingUp, 
  MapPin, 
  FileText, 
  Sparkles, 
  Activity, 
  Layers, 
  Cpu, 
  CheckCircle2, 
  ArrowRight,
  ShieldAlert,
  Info
} from 'lucide-react';
import { IntelligenceSubTab, DocumentAnalysisResult } from '../types';
import { useProjectContext } from '../context/ProjectContext';
import { RiskTrajectoryView } from './intelligence/RiskTrajectoryView';
import { GisParcelHeatmapView } from './intelligence/GisParcelHeatmapView';
import { DocumentIntelligenceView } from './intelligence/DocumentIntelligenceView';
import { OptimalInterventionView } from './intelligence/OptimalInterventionView';

interface IntelligenceCenterProps {
  initialSubTab?: IntelligenceSubTab;
  onNavigateToTab?: (tab: any) => void;
}

export const IntelligenceCenter: React.FC<IntelligenceCenterProps> = ({
  initialSubTab = 'trajectory',
  onNavigateToTab
}) => {
  const [activeSubTab, setActiveSubTab] = useState<IntelligenceSubTab>(initialSubTab);

  const {
    projects,
    currentProject,
    setSelectedProjectId,
    applyDocumentIntelligence,
    resetDocumentIntelligence,
    setToastMessage
  } = useProjectContext();

  const handleApplyActionDirective = (summary: string) => {
    setToastMessage(summary);
  };

  const tabs: { id: IntelligenceSubTab; label: string; stageName: string; icon: React.ComponentType<{ className?: string }>; badge?: string }[] = [
    {
      id: 'trajectory',
      label: '1. Risk Trajectory',
      stageName: 'PREDICT',
      icon: TrendingUp,
      badge: currentProject.riskTrajectory.trendDirection === 'rapidly-increasing' ? 'Velocity: +0.70/d' : undefined
    },
    {
      id: 'gis-parcels',
      label: '2. GIS Parcel Heatmap',
      stageName: 'LOCATE',
      icon: MapPin,
      badge: `${currentProject.parcelSummary.criticalCount} Critical`
    },
    {
      id: 'document-ai',
      label: '3. Document AI',
      stageName: 'UNDERSTAND',
      icon: FileText,
      badge: currentProject.documentIntelligenceApplied ? 'Applied (+6%)' : 'Gazette OCR'
    },
    {
      id: 'optimal-intervention',
      label: '4. Optimal Intervention',
      stageName: 'OPTIMIZE',
      icon: Sparkles,
      badge: 'Min Set (55-57% Saved)'
    }
  ];

  return (
    <div className="space-y-6 pb-12">
      
      {/* Top Intelligence Center Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-slate-900 text-white">
                BhoomiSetu Core
              </span>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200 font-mono">
                Predictive Governance Engine
              </span>
              <span className="text-xs text-slate-500 font-mono">
                5-Stage Integrated Decision Loop
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1.5">
              Predictive Intelligence Center
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Proactive statutory delay forecasting &bull; Micro-cadastral hotspot localization &bull; Document parsing &bull; Combinatorial action optimization
            </p>
          </div>

          {/* Quick Active Project Card */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-3 self-start">
            <div className="w-9 h-9 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold font-mono text-xs shrink-0">
              {currentProject.overallRisk}%
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900 truncate max-w-[200px]">
                {currentProject.name}
              </div>
              <div className="text-[11px] text-slate-500 font-mono">
                {currentProject.district} &bull; {currentProject.parcelSummary.totalParcels} Parcels
              </div>
            </div>
          </div>
        </div>

        {/* 5-Step Connected Framework Banner */}
        <div className="mt-5 p-3.5 rounded-xl bg-slate-900 text-white flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 font-mono font-bold text-amber-300">
            <Activity className="w-4 h-4 text-amber-400 shrink-0" />
            <span>INTELLIGENCE WORKFLOW:</span>
          </div>

          <div className="flex items-center gap-2 flex-wrap font-mono text-[11px]">
            <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-200">
              <strong>PREDICT</strong> (Trajectory)
            </span>
            <span className="text-slate-500">&rarr;</span>
            <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-200">
              <strong>LOCATE</strong> (GIS Parcels)
            </span>
            <span className="text-slate-500">&rarr;</span>
            <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-200">
              <strong>UNDERSTAND</strong> (Document AI)
            </span>
            <span className="text-slate-500">&rarr;</span>
            <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-200">
              <strong>OPTIMIZE</strong> (Min Action Set)
            </span>
            <span className="text-slate-500">&rarr;</span>
            <span className="px-2 py-0.5 rounded bg-emerald-700 text-white font-bold">
              <strong>ACT</strong> (Directive)
            </span>
          </div>
        </div>

        {/* 4 Main Tabs */}
        <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-100 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition cursor-pointer shrink-0 ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-500'}`} />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-slate-800 text-slate-200' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

      </div>

      {/* Sub-view Content */}
      {activeSubTab === 'trajectory' && (
        <RiskTrajectoryView
          project={currentProject}
          allProjects={projects}
          onSelectProject={setSelectedProjectId}
          onNavigateToGis={() => setActiveSubTab('gis-parcels')}
          onNavigateToIntervention={() => setActiveSubTab('optimal-intervention')}
        />
      )}

      {activeSubTab === 'gis-parcels' && (
        <GisParcelHeatmapView
          project={currentProject}
          allProjects={projects}
          onSelectProject={setSelectedProjectId}
          onNavigateToDocAi={() => setActiveSubTab('document-ai')}
          onNavigateToIntervention={() => setActiveSubTab('optimal-intervention')}
        />
      )}

      {activeSubTab === 'document-ai' && (
        <DocumentIntelligenceView
          project={currentProject}
          allProjects={projects}
          onSelectProject={setSelectedProjectId}
          onApplyDocumentData={(doc) => applyDocumentIntelligence(currentProject.id, doc)}
          onResetDocumentData={() => resetDocumentIntelligence(currentProject.id)}
          onNavigateToGis={() => setActiveSubTab('gis-parcels')}
          onNavigateToIntervention={() => setActiveSubTab('optimal-intervention')}
        />
      )}

      {activeSubTab === 'optimal-intervention' && (
        <OptimalInterventionView
          project={currentProject}
          allProjects={projects}
          onSelectProject={setSelectedProjectId}
          onApplyActionDirective={handleApplyActionDirective}
          onNavigateToTrajectory={() => setActiveSubTab('trajectory')}
          onNavigateToGis={() => setActiveSubTab('gis-parcels')}
        />
      )}

    </div>
  );
};
