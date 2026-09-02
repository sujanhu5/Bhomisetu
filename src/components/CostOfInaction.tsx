import React, { useState } from 'react';
import { 
  TrendingDown, 
  CheckCircle2, 
  ArrowRight, 
  Zap
} from 'lucide-react';
import { Project } from '../types';

interface CostOfInactionProps {
  project: Project;
  allProjects: Project[];
  onSelectProject: (projectId: string) => void;
  onNavigateToSimulator: (projectId: string) => void;
  onNavigateToReports: () => void;
}

export const CostOfInaction: React.FC<CostOfInactionProps> = ({
  project,
  allProjects,
  onSelectProject,
  onNavigateToSimulator,
  onNavigateToReports
}) => {
  const [isPrioritized, setIsPrioritized] = useState<boolean>(false);
  const cost = project.costImpact;

  const handlePrioritize = () => {
    setIsPrioritized(true);
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-medium px-2 py-0.5 rounded bg-slate-900 text-white">
              {project.code}
            </span>
            <span className="text-xs font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
              Financial Exposure
            </span>
          </div>

          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Cost of Inaction Analysis
          </h2>
          <p className="text-xs text-slate-500">
            {project.name} &bull; Quantifying financial liabilities, equipment idle cost, and contractor delay claims
          </p>
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
                {p.name} ({p.district})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Financial Impact */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Projected Financial Liabilities (Without Intervention)
                </h3>
                <p className="text-xs text-slate-500">
                  Estimated delay: <span className="font-mono font-semibold text-rose-700">{project.expectedDelayMonths} months</span>
                </p>
              </div>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-rose-50 border border-rose-200 text-rose-700">
                {project.overallRisk}% Risk
              </span>
            </div>

            {/* 3 Component Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
              
              <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
                <div className="text-xs text-slate-500">Price Escalation</div>
                <div className="text-xl font-bold text-slate-900 font-mono mt-1">
                  ₹{cost.constructionEscalationCr} <span className="text-xs font-normal text-slate-500">Cr</span>
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  WPI inflation on materials
                </div>
              </div>

              <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
                <div className="text-xs text-slate-500">Idle Resources</div>
                <div className="text-xl font-bold text-slate-900 font-mono mt-1">
                  ₹{cost.idleResourcesCr} <span className="text-xs font-normal text-slate-500">Cr</span>
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  Machinery and site costs
                </div>
              </div>

              <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
                <div className="text-xs text-slate-500">Contractual Overhead</div>
                <div className="text-xl font-bold text-slate-900 font-mono mt-1">
                  ₹{cost.contractualImpactCr} <span className="text-xs font-normal text-slate-500">Cr</span>
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  Extension of Time claims
                </div>
              </div>

            </div>

            {/* Total Banner */}
            <div className="mt-4 p-4 rounded-xl bg-slate-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <div className="text-xs text-slate-400 font-medium">
                  Total Financial Exposure
                </div>
                <div className="text-2xl font-bold text-white font-mono mt-0.5">
                  ₹{cost.totalImpactCr} Crores
                </div>
              </div>

              <div className="text-right shrink-0 bg-slate-800 px-3 py-2 rounded-lg border border-slate-700">
                <div className="text-[10px] text-slate-400">Delay Period</div>
                <div className="text-sm font-bold text-rose-300 font-mono">{project.expectedDelayMonths} Months</div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>{project.name}</span>
            <span>RFCTLARR Section 77</span>
          </div>
        </div>

        {/* Right Col: ROI & Action */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">
                Intervention Benefit
              </h3>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200 text-emerald-800">
                {cost.roiMultiplier}x ROI
              </span>
            </div>

            <div className="space-y-3 mt-4 text-xs">
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <div className="text-slate-500">Targeted Intervention Outlay</div>
                <div className="text-xl font-bold text-slate-900 font-mono mt-0.5">
                  ₹{cost.interventionCostCr} Cr
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  Revenue verification camps &amp; fast-track dispute panels
                </div>
              </div>

              <div className="p-3 rounded-lg bg-emerald-50/50 border border-emerald-200">
                <div className="text-emerald-900 font-medium">Estimated Saved Capital</div>
                <div className="text-xl font-bold text-emerald-800 font-mono mt-0.5">
                  ₹{cost.potentialAvoidedImpactCr} Cr
                </div>
                <div className="text-[11px] text-emerald-700 mt-0.5">
                  Direct savings through 4.7 months schedule recovery
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-4 pt-3 border-t border-slate-100 space-y-2">
            <button
              onClick={handlePrioritize}
              className={`w-full py-2 rounded-lg text-xs font-medium transition flex items-center justify-center gap-1.5 cursor-pointer ${
                isPrioritized
                  ? 'bg-emerald-700 text-white'
                  : 'bg-slate-900 text-white hover:bg-slate-800'
              }`}
            >
              {isPrioritized ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Directive Dispatched</span>
                </>
              ) : (
                <>
                  <Zap className="w-3.5 h-3.5" />
                  <span>Prioritize Mitigation</span>
                </>
              )}
            </button>

            <button
              onClick={() => onNavigateToSimulator(project.id)}
              className="w-full py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-lg text-xs font-medium transition flex items-center justify-center gap-1 cursor-pointer"
            >
              <span>Explore Scenarios</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

      </div>

      {/* Comparison: Do Nothing vs Intervene */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
        <h3 className="text-sm font-bold text-slate-900 mb-0.5">
          Strategic Assessment: Do Nothing vs. Intervene
        </h3>
        <p className="text-xs text-slate-500 mb-4">
          Cost-benefit evaluation comparing administrative delay against proactive mitigation
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/20 flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-rose-100 text-rose-800">
                Option A: Baseline (Do Nothing)
              </span>
              <div className="text-2xl font-bold text-rose-800 font-mono mt-2.5">
                ₹{cost.totalImpactCr} Cr
              </div>
              <div className="text-xs text-rose-700 mt-0.5">
                Total Unmitigated Loss
              </div>
            </div>

            <ul className="text-xs text-rose-900 space-y-1 text-left mt-3 pt-2.5 border-t border-rose-200">
              <li>&bull; 7.8 months delivery delay</li>
              <li>&bull; 43 pending title claims remain unresolved</li>
              <li>&bull; Continuous statutory interest compounding</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/20 flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                Option B: Proactive Intervention
              </span>
              <div className="text-2xl font-bold text-emerald-800 font-mono mt-2.5">
                ₹{cost.interventionCostCr} Cr
              </div>
              <div className="text-xs text-emerald-700 mt-0.5">
                Estimated Mitigation Outlay
              </div>
            </div>

            <ul className="text-xs text-emerald-900 space-y-1 text-left mt-3 pt-2.5 border-t border-emerald-200">
              <li>&bull; Saves <strong className="font-mono">₹{cost.potentialAvoidedImpactCr} Cr</strong> in avoided losses</li>
              <li>&bull; 4.7 months recovered on statutory timeline</li>
              <li>&bull; Streamlined Section 77 award distribution</li>
            </ul>
          </div>

        </div>

        {isPrioritized && (
          <div className="mt-4 p-3 rounded-lg bg-slate-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <div className="text-xs">
                Directives queued for Special Land Acquisition Officer (SLAO).
              </div>
            </div>

            <button
              onClick={onNavigateToReports}
              className="px-3 py-1 bg-white text-slate-900 hover:bg-slate-100 rounded text-xs font-medium shrink-0 cursor-pointer"
            >
              Export Report
            </button>
          </div>
        )}

      </div>

    </div>
  );
};

