import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Layers, 
  AlertOctagon, 
  SlidersHorizontal, 
  TrendingDown, 
  ArrowRight,
  BrainCircuit,
  TrendingUp,
  Sparkles,
  FileText,
  Activity,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  Send,
  Coins,
  Cpu
} from 'lucide-react';
import { Project, StageId, RiskLevel, IntelligenceSubTab } from '../types';

interface ProjectDetailsProps {
  project: Project;
  allProjects: Project[];
  onSelectProject: (projectId: string) => void;
  onOpenExplainableAI: (projectId: string, stageId?: StageId) => void;
  onOpenSimulator: (projectId: string) => void;
  onOpenCostOfInaction: (projectId: string) => void;
  onOpenIntelligenceCenter?: (projectId: string, subTab?: IntelligenceSubTab) => void;
}

export const ProjectDetails: React.FC<ProjectDetailsProps> = ({
  project,
  allProjects,
  onSelectProject,
  onOpenExplainableAI,
  onOpenSimulator,
  onOpenCostOfInaction,
  onOpenIntelligenceCenter
}) => {
  const [selectedStageId, setSelectedStageId] = useState<StageId>(project.currentStageId);

  const activeStage = project.stages.find(s => s.id === selectedStageId) || project.stages[4];

  const getStageCardBorder = (level: RiskLevel, isSelected: boolean) => {
    if (isSelected) return 'ring-2 ring-slate-900 border-slate-900 bg-slate-50';
    if (level === 'critical') return 'border-rose-200 bg-rose-50/20';
    if (level === 'high') return 'border-amber-200 bg-amber-50/20';
    if (level === 'moderate') return 'border-yellow-200 bg-yellow-50/10';
    return 'border-slate-200 bg-white';
  };

  const trajectory = project.riskTrajectory;
  const parcelSummary = project.parcelSummary;
  const optimal = project.optimalRecommendation;
  const docs = project.documents;

  return (
    <div className="space-y-6 pb-12">
      
      {/* Project Selector & Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="text-xs font-mono font-medium px-2 py-0.5 rounded bg-slate-900 text-white">
                {project.code}
              </span>
              <span className="text-xs font-medium px-2.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                {project.type} &bull; {project.executingAgency}
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-rose-50 border border-rose-200 text-rose-700 flex items-center gap-1 font-mono">
                <AlertOctagon className="w-3 h-3 text-rose-600" />
                {project.overallRisk}% Risk
              </span>
              {trajectory.change30d > 0 && (
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-rose-100 text-rose-800 border border-rose-300 font-mono">
                  +&Delta;{trajectory.change30d}% (30d)
                </span>
              )}
            </div>
            
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              {project.name}
            </h2>
            
            <div className="flex items-center gap-3 text-xs text-slate-500 mt-1 flex-wrap">
              <span className="flex items-center gap-1 text-slate-700 font-medium">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                {project.district}, {project.state}
              </span>
              <span>&bull;</span>
              <span>Officer: <strong>{project.nodalOfficer}</strong></span>
              <span>&bull;</span>
              <span>Area: <strong>{project.totalLandAreaHa} Ha</strong></span>
            </div>
          </div>

          {/* Project Switcher */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-medium">Select:</span>
            <select
              value={project.id}
              onChange={(e) => onSelectProject(e.target.value)}
              className="text-xs rounded-lg border border-slate-300 bg-slate-50 px-3 py-1.5 font-medium text-slate-800 focus:outline-hidden"
            >
              {allProjects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.district}) &bull; {p.overallRisk}% Risk
                </option>
              ))}
            </select>
          </div>

        </div>

        {/* 4 Summary Stat Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4 border-t border-slate-100">
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
            <div className="text-xs text-slate-500">Total Land Parcels</div>
            <div className="text-xl font-bold text-slate-900 font-mono mt-0.5">{project.totalParcels}</div>
            <div className="text-[11px] text-slate-400">
              {parcelSummary.criticalCount} Critical &bull; {parcelSummary.highCount} High
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
            <div className="text-xs text-slate-500">Affected Families</div>
            <div className="text-xl font-bold text-slate-900 font-mono mt-0.5">{project.affectedFamilies}</div>
            <div className="text-[11px] text-slate-400">Beneficiaries</div>
          </div>

          <div className="p-3 bg-rose-50/40 rounded-lg border border-rose-200">
            <div className="text-xs text-rose-800 font-medium">Active Milestone</div>
            <div className="text-xl font-bold text-rose-900 mt-0.5 capitalize">{project.currentStageId}</div>
            <div className="text-[11px] text-rose-700 font-mono">RFCTLARR Sec 77</div>
          </div>

          <div className="p-3 bg-amber-50/40 rounded-lg border border-amber-200">
            <div className="text-xs text-amber-800 font-medium">Days in Stage</div>
            <div className="text-xl font-bold text-amber-950 font-mono mt-0.5">{project.daysInCurrentStage} days</div>
            <div className="text-[11px] text-amber-700 font-medium">+29d over standard SLA</div>
          </div>
        </div>

      </div>

      {/* NEW: 4 Advanced Predictive Intelligence Feature Modules Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <h3 className="text-sm font-bold text-slate-900">
              Advanced Predictive Intelligence Matrix
            </h3>
          </div>
          {onOpenIntelligenceCenter && (
            <button
              onClick={() => onOpenIntelligenceCenter(project.id, 'trajectory')}
              className="text-xs font-semibold text-blue-700 hover:text-blue-900 flex items-center gap-1 cursor-pointer"
            >
              <span>Open Full Intelligence Center</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Module 1: Risk Trajectory Card */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-rose-600" />
                  1. Risk Trajectory &amp; Velocity
                </span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200 font-bold">
                  {trajectory.riskVelocity > 0 ? `+${trajectory.riskVelocity.toFixed(2)}/day` : `${trajectory.riskVelocity.toFixed(2)}/day`}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 mt-3 text-center text-xs">
                <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
                  <div className="text-[10px] text-slate-400 font-mono">Current</div>
                  <div className="text-lg font-bold text-rose-600 font-mono">{trajectory.currentRisk}%</div>
                </div>
                <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
                  <div className="text-[10px] text-slate-400 font-mono">30d Ago</div>
                  <div className="text-lg font-bold text-slate-700 font-mono">{trajectory.previousRisk}%</div>
                </div>
                <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
                  <div className="text-[10px] text-slate-400 font-mono">30d Delta</div>
                  <div className="text-lg font-bold text-rose-700 font-mono">+{trajectory.change30d}%</div>
                </div>
              </div>

              <p className="text-xs text-slate-600 mt-2.5 line-clamp-2">
                "{trajectory.trendExplanation}"
              </p>
            </div>

            <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-400 font-mono capitalize">
                Trend: <strong>{trajectory.trendDirection.replace('-', ' ')}</strong>
              </span>
              {onOpenIntelligenceCenter && (
                <button
                  onClick={() => onOpenIntelligenceCenter(project.id, 'trajectory')}
                  className="text-xs font-semibold text-slate-900 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
                >
                  <span>Detailed Trajectory</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>

          {/* Module 2: GIS Parcel Intelligence Card */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-blue-600" />
                  2. GIS Parcel-Level Heatmap
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300 font-bold">
                  Simulated Cadastre
                </span>
              </div>

              <div className="grid grid-cols-4 gap-1.5 mt-3 text-center text-xs">
                <div className="p-2 bg-emerald-50 rounded-lg border border-emerald-200">
                  <div className="text-[9px] text-emerald-800 font-bold">LOW</div>
                  <div className="text-base font-extrabold text-emerald-900 font-mono">{parcelSummary.lowCount}</div>
                </div>
                <div className="p-2 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="text-[9px] text-yellow-800 font-bold">MED</div>
                  <div className="text-base font-extrabold text-yellow-900 font-mono">{parcelSummary.mediumCount}</div>
                </div>
                <div className="p-2 bg-orange-50 rounded-lg border border-orange-200">
                  <div className="text-[9px] text-orange-800 font-bold">HIGH</div>
                  <div className="text-base font-extrabold text-orange-900 font-mono">{parcelSummary.highCount}</div>
                </div>
                <div className="p-2 bg-rose-50 rounded-lg border border-rose-300">
                  <div className="text-[9px] text-rose-800 font-bold">CRIT</div>
                  <div className="text-base font-extrabold text-rose-900 font-mono">{parcelSummary.criticalCount}</div>
                </div>
              </div>

              <div className="text-xs text-slate-600 mt-2.5 flex items-center justify-between">
                <span>Top Hotspot: <strong>Rampura Village (Sy.140-144)</strong></span>
                <span className="font-mono text-rose-600 font-bold">91% Risk</span>
              </div>
            </div>

            <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-400 font-mono">
                {parcelSummary.totalParcels} Total Survey Plots
              </span>
              {onOpenIntelligenceCenter && (
                <button
                  onClick={() => onOpenIntelligenceCenter(project.id, 'gis-parcels')}
                  className="text-xs font-semibold text-slate-900 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
                >
                  <span>Open Parcel Grid</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>

          {/* Module 3: Document AI Card */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-indigo-600" />
                  3. AI Document Intelligence
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200 font-bold">
                  OCR &bull; 94.8% Conf
                </span>
              </div>

              <div className="mt-3 space-y-1.5 text-xs">
                <div className="p-2 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
                  <span className="text-slate-700 font-medium truncate max-w-[200px]">
                    {docs[0]?.documentTitle || 'Section 11(1) Gazette Notification'}
                  </span>
                  <span className="text-[10px] font-mono text-emerald-700 font-bold">Verified</span>
                </div>
                <div className="p-2 bg-rose-50 rounded-lg border border-rose-200 text-[11px] text-rose-900 flex items-center justify-between">
                  <span>⚠ 12 ownership records require verification</span>
                  <span className="font-mono font-bold">+6% Risk</span>
                </div>
              </div>
            </div>

            <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-400 font-mono">
                {project.documentIntelligenceApplied ? 'Status: Ingested in ML' : 'Status: Ready to Ingest'}
              </span>
              {onOpenIntelligenceCenter && (
                <button
                  onClick={() => onOpenIntelligenceCenter(project.id, 'document-ai')}
                  className="text-xs font-semibold text-slate-900 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
                >
                  <span>Upload &amp; Parse</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>

          {/* Module 4: Optimal Intervention Engine Card */}
          <div className="bg-slate-900 text-white rounded-xl p-4 shadow-xs flex flex-col justify-between border border-slate-800">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5 font-mono">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  4. Optimal Intervention Engine
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold">
                  Option B + C Synergy
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-3">
                <div className="p-2 bg-slate-800 rounded-lg border border-slate-700">
                  <div className="text-[10px] text-slate-400 font-mono">Risk Reduction</div>
                  <div className="text-base font-extrabold text-emerald-400 font-mono mt-0.5">
                    {project.overallRisk}% &rarr; {optimal.projectedRisk}%
                  </div>
                  <div className="text-[10px] text-emerald-300 font-mono">-{optimal.riskReductionPts}% pts</div>
                </div>

                <div className="p-2 bg-slate-800 rounded-lg border border-slate-700">
                  <div className="text-[10px] text-slate-400 font-mono">Cost Avoided</div>
                  <div className="text-base font-extrabold text-white font-mono mt-0.5">
                    ₹{optimal.estimatedCostAvoidedCr} Cr
                  </div>
                  <div className="text-[10px] text-amber-300 font-mono">50-60 Days Saved</div>
                </div>
              </div>

              <div className="text-[11px] text-slate-300 mt-2.5 truncate">
                ✓ Accelerate Compensation + Resolve Ownership Disputes
              </div>
            </div>

            <div className="mt-3 pt-2.5 border-t border-slate-800 flex items-center justify-between">
              <span className="text-[10px] text-slate-400 font-mono">
                ROI: {optimal.roiMultiplier}x &bull; Outlay: ₹{optimal.totalOutlayCr}Cr
              </span>
              {onOpenIntelligenceCenter && (
                <button
                  onClick={() => onOpenIntelligenceCenter(project.id, 'optimal-intervention')}
                  className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer"
                >
                  <span>Run Optimizer</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Central Risk Card & Action Triggers */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Large Central Risk Card */}
        <div className="lg:col-span-2 bg-slate-900 text-white rounded-xl p-6 shadow-xs border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-medium px-2.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 uppercase">
                Predictive Risk Profile
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Statutory Milestone Sec 77
              </span>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div>
                <div className="text-xs font-medium text-rose-400 uppercase tracking-wider">
                  Overall Delay Vulnerability
                </div>
                <div className="flex items-baseline gap-3 mt-1">
                  <span className="text-5xl font-bold text-rose-400 font-mono">
                    {project.overallRisk}%
                  </span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-rose-950/80 text-rose-200 border border-rose-800 uppercase font-mono">
                    {project.overallRiskLevel}
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-2 max-w-md">
                  Vulnerable to schedule slippage during <strong className="text-white capitalize">{project.currentStageId}</strong>. Early administrative intervention is recommended.
                </p>
              </div>

              {/* Expected Delay Box */}
              <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 text-center min-w-[180px]">
                <div className="text-xs text-slate-400 uppercase tracking-wider">
                  Projected Delay
                </div>
                <div className="text-3xl font-bold text-amber-300 font-mono mt-1">
                  {project.expectedDelayMonths} <span className="text-sm font-normal text-slate-300">months</span>
                </div>
                <div className="text-xs text-slate-300 mt-1 font-mono">
                  Impact: ₹{project.costImpact.totalImpactCr} Cr
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 pt-5 border-t border-slate-800 flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => onOpenExplainableAI(project.id, selectedStageId)}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-medium transition cursor-pointer"
            >
              <BrainCircuit className="w-3.5 h-3.5" />
              <span>Root-Cause Analysis</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => onOpenSimulator(project.id)}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-emerald-700 hover:bg-emerald-600 text-white rounded-lg text-xs font-medium transition cursor-pointer"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>What-If Simulator</span>
            </button>

            <button
              onClick={() => onOpenCostOfInaction(project.id)}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium border border-slate-700 transition cursor-pointer"
            >
              <TrendingDown className="w-3.5 h-3.5 text-amber-400" />
              <span>Cost of Inaction</span>
            </button>
          </div>

        </div>

        {/* Right Col: Cost Impact */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <TrendingDown className="w-4 h-4 text-rose-600" />
                Financial Exposure
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-50 border border-rose-200 text-rose-700 font-semibold">
                ₹{project.costImpact.totalImpactCr} Cr
              </span>
            </div>
            <p className="text-xs text-slate-500 mb-3">
              Cost escalation if +{project.expectedDelayMonths} months delay occurs
            </p>

            <div className="space-y-1.5 text-xs">
              <div className="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-100">
                <span className="text-slate-600">Material Escalation:</span>
                <span className="font-mono font-medium text-slate-900">₹{project.costImpact.constructionEscalationCr} Cr</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-100">
                <span className="text-slate-600">Idle Machinery &amp; Labor:</span>
                <span className="font-mono font-medium text-slate-900">₹{project.costImpact.idleResourcesCr} Cr</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-100">
                <span className="text-slate-600">Right-of-Way Overhead:</span>
                <span className="font-mono font-medium text-slate-900">₹{project.costImpact.contractualImpactCr} Cr</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100">
            <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs">
              <div className="flex items-center justify-between text-emerald-800 font-medium">
                <span>Intervention Budget:</span>
                <span className="font-mono font-bold">₹{project.costImpact.interventionCostCr} Cr</span>
              </div>
              <div className="flex items-center justify-between text-emerald-950 font-medium mt-1">
                <span>Avoidable Escalation:</span>
                <span className="font-mono font-bold text-emerald-700">₹{project.costImpact.potentialAvoidedImpactCr} Cr</span>
              </div>
            </div>

            <button
              onClick={() => onOpenCostOfInaction(project.id)}
              className="mt-3 w-full py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-medium transition cursor-pointer text-center"
            >
              Inspect Financial Breakdown
            </button>
          </div>
        </div>

      </div>

      {/* 7 Land Acquisition Stages */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Layers className="w-4 h-4 text-slate-500" />
              Statutory Stage Timeline
            </h3>
            <p className="text-xs text-slate-500">
              Select a stage to inspect statutory progress and specific risks
            </p>
          </div>
        </div>

        {/* 7 Stages Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2.5">
          {project.stages.map((stage, idx) => {
            const isCurrent = stage.id === project.currentStageId;
            const isSelected = stage.id === selectedStageId;
            const isCompleted = stage.status === 'completed';

            return (
              <div
                key={stage.id}
                onClick={() => setSelectedStageId(stage.id)}
                className={`p-3 rounded-xl border transition cursor-pointer text-left ${
                  getStageCardBorder(stage.riskLevel, isSelected)
                }`}
              >
                <div className="flex items-center justify-between mb-1 text-[10px]">
                  <span className="text-slate-400 font-mono">0{idx + 1}</span>
                  {isCurrent ? (
                    <span className="font-semibold text-rose-700 bg-rose-50 px-1 py-0.2 rounded border border-rose-200">
                      Active
                    </span>
                  ) : isCompleted ? (
                    <span className="font-semibold text-emerald-700 bg-emerald-50 px-1 py-0.2 rounded">
                      Done
                    </span>
                  ) : (
                    <span className="text-slate-400">Upcoming</span>
                  )}
                </div>

                <div className="font-semibold text-xs text-slate-900">
                  {stage.shortCode}
                </div>

                <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                  {stage.rfctlarrSec}
                </div>

                <div className="mt-2 pt-1.5 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-400 text-[10px]">Risk:</span>
                  <span className="font-mono font-bold text-slate-800">{stage.riskScore}%</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Stage Detail Panel */}
        <div className="mt-4 p-3.5 rounded-lg bg-slate-50 border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-900">
                {activeStage.name} ({activeStage.rfctlarrSec})
              </span>
              <span className="text-xs font-semibold px-2 py-0.2 rounded bg-slate-200 text-slate-800 font-mono">
                {activeStage.riskScore}% Risk
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-0.5">
              {activeStage.description}
            </p>
          </div>

          <button
            onClick={() => onOpenExplainableAI(project.id, activeStage.id)}
            className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-medium transition flex items-center gap-1.5 shrink-0 cursor-pointer"
          >
            <BrainCircuit className="w-3.5 h-3.5" />
            <span>Root Causes</span>
          </button>
        </div>

      </div>

      {/* Stage Risk Trend Chart */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-slate-500" />
              6-Month Risk Trajectory
            </h3>
            <p className="text-xs text-slate-500">
              Risk score and delay evolution over time
            </p>
          </div>
        </div>

        {/* Visual Bar Chart */}
        <div className="grid grid-cols-6 gap-3 pt-4 pb-2 border-b border-slate-100">
          {project.riskTrend.map((t, idx) => {
            const isLatest = idx === project.riskTrend.length - 1;
            return (
              <div key={t.month} className="flex flex-col items-center">
                <div className="text-xs font-bold text-slate-800 font-mono mb-1.5">
                  {t.risk}%
                </div>

                <div className="w-full max-w-[40px] h-28 bg-slate-100 rounded-t-md flex flex-col justify-end p-1">
                  <div
                    className={`w-full rounded-t transition-all ${
                      isLatest ? 'bg-rose-600' : t.risk > 60 ? 'bg-amber-500' : 'bg-slate-600'
                    }`}
                    style={{ height: `${t.risk}%` }}
                  />
                </div>

                <div className="text-[11px] font-medium text-slate-700 mt-2 font-mono">
                  {t.month}
                </div>
                <div className="text-[10px] text-slate-400 font-mono">
                  +{t.delayMonths}m
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
          <span>Key driver: <strong>43 unverified compensation claims in Sira &amp; Tumakuru</strong></span>
          <button
            onClick={() => onOpenExplainableAI(project.id)}
            className="text-slate-900 hover:underline font-medium flex items-center gap-1 cursor-pointer"
          >
            <span>Analyze with XAI</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

    </div>
  );
};

