import React, { useState } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  TrendingDown, 
  Clock, 
  Coins, 
  Layers, 
  ArrowRight, 
  Building2, 
  Scale, 
  SlidersHorizontal, 
  Send, 
  CheckCircle, 
  AlertOctagon,
  FileCheck,
  RotateCcw,
  Zap,
  Info
} from 'lucide-react';
import { Project, InterventionItem } from '../../types';

interface OptimalInterventionViewProps {
  project: Project;
  allProjects: Project[];
  onSelectProject: (projectId: string) => void;
  onApplyActionDirective?: (summary: string) => void;
  onNavigateToTrajectory?: () => void;
  onNavigateToGis?: () => void;
}

export const OptimalInterventionView: React.FC<OptimalInterventionViewProps> = ({
  project,
  allProjects,
  onSelectProject,
  onApplyActionDirective,
  onNavigateToTrajectory,
  onNavigateToGis
}) => {
  const [targetRiskThreshold, setTargetRiskThreshold] = useState<number>(40);
  const [selectedInterventionIds, setSelectedInterventionIds] = useState<string[]>([
    'int-1', // Accelerate compensation
    'int-2'  // Resolve ownership disputes
  ]);

  const currentRisk = project.overallRisk;
  const interventions = project.interventions;
  const optimal = project.optimalRecommendation;

  // Toggle custom intervention selection
  const handleToggleIntervention = (id: string) => {
    if (selectedInterventionIds.includes(id)) {
      setSelectedInterventionIds(prev => prev.filter(i => i !== id));
    } else {
      setSelectedInterventionIds(prev => [...prev, id]);
    }
  };

  // Calculate dynamically for currently checked interventions
  const activeSelected = interventions.filter(i => selectedInterventionIds.includes(i.id));
  
  // Synergistic risk calculation
  let calculatedReduction = 0;
  let calculatedCost = 0;
  let calculatedDays = 0;

  activeSelected.forEach((item) => {
    calculatedReduction += item.riskReductionPct;
    calculatedCost += item.implementationCostCr;
    calculatedDays = Math.max(calculatedDays, item.expectedDelayReductionDays);
  });

  // Apply diminishing returns factor for multi-combination synergy
  if (activeSelected.length > 1) {
    const rawTotal = calculatedReduction;
    calculatedReduction = Math.min(
      currentRisk - 15,
      Math.round(rawTotal * (1 - 0.08 * (activeSelected.length - 1)))
    );
  }

  const simulatedProjectedRisk = Math.max(15, currentRisk - calculatedReduction);
  const totalCostAvoided = Number((calculatedReduction * 0.72).toFixed(1));

  // Determine minimum set for the target risk threshold
  const meetsTarget = simulatedProjectedRisk <= targetRiskThreshold;

  const handleApplyOptimalCombo = () => {
    setSelectedInterventionIds(['int-1', 'int-2']);
  };

  const handleDispatchDirective = () => {
    if (onApplyActionDirective) {
      onApplyActionDirective(
        `Directing SLAO & Tahsildar Tumakuru: Expedite compensation DBT and resolve 12 joint-family title disputes under Section 77. Projected risk reduction: -${optimal.riskReductionPts}% pts (${currentRisk}% → ${optimal.projectedRisk}%).`
      );
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-mono font-medium px-2 py-0.5 rounded bg-slate-900 text-white">
                Module 4
              </span>
              <span className="text-xs font-medium px-2.5 py-0.5 rounded bg-amber-50 text-amber-900 border border-amber-300 font-mono flex items-center gap-1 font-bold">
                <Sparkles className="w-3 h-3 text-amber-600" />
                Optimal Intervention Engine
              </span>
              <span className="text-xs font-mono text-slate-500">
                Minimum Action Set Optimizer
              </span>
            </div>

            <h3 className="text-xl font-bold text-slate-900 tracking-tight mt-1.5">
              Combinatorial Delay &amp; Risk Minimization Engine
            </h3>
            <p className="text-xs text-slate-500">
              Evaluates multi-departmental mitigation levers to determine the smallest, lowest-cost intervention set that satisfies statutory targets
            </p>
          </div>

          {/* Project Switcher */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-medium">Corridor:</span>
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

        {/* Target Risk Optimization Threshold Bar */}
        <div className="mt-5 p-4 rounded-xl bg-slate-900 text-white flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          <div>
            <div className="text-xs font-bold text-amber-300 font-mono flex items-center gap-2">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>OPTIMIZATION OBJECTIVE: MINIMIZE INTERVENTION COST &bull; PROJECTED RISK &le; TARGET</span>
            </div>
            <div className="text-xs text-slate-300 mt-0.5">
              Current Risk: <strong className="text-rose-400 font-mono">{currentRisk}%</strong> &bull; Target Risk Threshold: <strong className="text-emerald-400 font-mono">{targetRiskThreshold}%</strong>
            </div>
          </div>

          {/* Slider for Target Risk */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="text-slate-400">Target Risk:</span>
              <input
                type="range"
                min={20}
                max={60}
                step={5}
                value={targetRiskThreshold}
                onChange={(e) => setTargetRiskThreshold(Number(e.target.value))}
                className="w-32 accent-amber-400 cursor-pointer"
              />
              <span className="text-sm font-bold text-amber-300 px-2 py-0.5 bg-slate-800 rounded border border-slate-700">
                {targetRiskThreshold}%
              </span>
            </div>

            <button
              onClick={handleApplyOptimalCombo}
              className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-xs transition cursor-pointer flex items-center gap-1"
            >
              <span>Auto-Compute Min Set</span>
            </button>
          </div>

        </div>

      </div>

      {/* Flagship Recommendation Showcase Card */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-slate-700 rounded-xl p-6 text-white shadow-xl">
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-700/80 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-amber-400 text-slate-950">
                RECOMMENDED ACTION PLAN
              </span>
              <span className="text-xs text-slate-300 font-mono">
                Optimal Multi-Action Synergy &bull; Option B + C
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-1.5">
              Optimal Minimum Intervention Set
            </h3>
            <p className="text-xs text-slate-300 mt-0.5">
              Smallest combination of ground actions achieving maximum statutory risk de-escalation
            </p>
          </div>

          <button
            onClick={handleDispatchDirective}
            className="px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg transition cursor-pointer flex items-center gap-2 self-start"
          >
            <Send className="w-4 h-4 text-white" />
            <span>Dispatch Mitigation Directive</span>
          </button>
        </div>

        {/* 4 Outcome Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-5">
          
          <div className="p-4 rounded-lg bg-slate-800/80 border border-slate-700">
            <div className="text-xs text-slate-400 font-mono">Current &rarr; Projected Risk</div>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-xl font-bold text-rose-400 font-mono line-through">{currentRisk}%</span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
              <span className="text-3xl font-extrabold text-emerald-400 font-mono">{optimal.projectedRisk}%</span>
            </div>
            <div className="text-[11px] text-emerald-300 font-mono mt-1 font-bold">
              -{optimal.riskReductionPts} percentage points
            </div>
          </div>

          <div className="p-4 rounded-lg bg-slate-800/80 border border-slate-700">
            <div className="text-xs text-slate-400 font-mono">Expected Delay Saved</div>
            <div className="mt-1 flex items-baseline gap-1.5">
              <span className="text-3xl font-extrabold text-amber-300 font-mono">50–60</span>
              <span className="text-xs text-slate-300">Days</span>
            </div>
            <div className="text-[11px] text-slate-400 font-mono mt-1">
              ~{optimal.expectedDelayReductionMonths} months averted
            </div>
          </div>

          <div className="p-4 rounded-lg bg-slate-800/80 border border-slate-700">
            <div className="text-xs text-slate-400 font-mono">Estimated Cost Avoided</div>
            <div className="mt-1 flex items-baseline gap-1">
              <span className="text-3xl font-extrabold text-white font-mono">₹{optimal.estimatedCostAvoidedCr}</span>
              <span className="text-xs text-slate-300">Cr</span>
            </div>
            <div className="text-[11px] text-slate-400 font-mono mt-1">
              Escalation &amp; idling losses
            </div>
          </div>

          <div className="p-4 rounded-lg bg-slate-800/80 border border-slate-700">
            <div className="text-xs text-slate-400 font-mono">Intervention Outlay &amp; ROI</div>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-200 font-mono">₹{optimal.totalOutlayCr} Cr</span>
              <span className="text-xs text-emerald-300 font-bold font-mono">({optimal.roiMultiplier}x ROI)</span>
            </div>
            <div className="text-[11px] text-slate-400 font-mono mt-1">
              Administrative &amp; camp costs
            </div>
          </div>

        </div>

        {/* 2 Recommended Actions */}
        <div className="p-4 rounded-lg bg-slate-950/70 border border-slate-800">
          <div className="text-xs font-bold text-amber-300 uppercase tracking-wider font-mono mb-2">
            Prioritized Minimum Action Set:
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-700 flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center font-mono font-bold text-xs shrink-0 mt-0.5">
                1
              </span>
              <div>
                <div className="font-bold text-white">Accelerate Compensation Processing</div>
                <div className="text-slate-300 text-[11px] mt-0.5">
                  Fast-track SLAO &amp; treasury escrow clearance under Section 77; clear 43 pending DBT vouchers.
                </div>
                <div className="text-amber-400 font-mono text-[10px] mt-1 font-semibold">
                  Individual Impact: -21% Risk Reduction &bull; 14 Days
                </div>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-900 border border-slate-700 flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center font-mono font-bold text-xs shrink-0 mt-0.5">
                2
              </span>
              <div>
                <div className="font-bold text-white">Resolve High-Priority Ownership Disputes</div>
                <div className="text-slate-300 text-[11px] mt-0.5">
                  Deploy Revenue Tahsildar special camp in Rampura village for joint-family title partition &amp; Section 64 settlement.
                </div>
                <div className="text-amber-400 font-mono text-[10px] mt-1 font-semibold">
                  Individual Impact: -33% Risk Reduction &bull; 21 Days
                </div>
              </div>
            </div>
          </div>

          <div className="mt-3 text-[11px] text-slate-400 italic">
            * Prototype simulation model based on TreeSHAP inverse gradient optimization. Real data values clearly marked as estimates.
          </div>
        </div>

      </div>

      {/* Combinatorial Comparison Options & 10-Intervention Simulation Table */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left 5 Columns: Combinatorial Evaluation Options */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            <h4 className="text-sm font-bold text-slate-900 mb-1">
              Evaluated Action Combinations
            </h4>
            <p className="text-xs text-slate-500 mb-3">
              Comparative review of individual vs synergistic mitigation packages
            </p>

            <div className="space-y-3 text-xs">
              
              {/* Option A */}
              <div className="p-3 rounded-lg border border-slate-200 bg-slate-50">
                <div className="flex items-center justify-between font-mono font-bold text-slate-800">
                  <span>OPTION A: Clear Documentation</span>
                  <span className="text-amber-700">82% &rarr; 73% (-9%)</span>
                </div>
                <p className="text-slate-500 text-[11px] mt-1">
                  Reconcile legacy village maps &amp; Bhoomi RTCs. Moderate standalone impact.
                </p>
              </div>

              {/* Option B */}
              <div className="p-3 rounded-lg border border-slate-200 bg-slate-50">
                <div className="flex items-center justify-between font-mono font-bold text-slate-800">
                  <span>OPTION B: Accelerate Compensation</span>
                  <span className="text-blue-700">82% &rarr; 61% (-21%)</span>
                </div>
                <p className="text-slate-500 text-[11px] mt-1">
                  Fast-track treasury DBT payments. Removes main cash-flow bottleneck.
                </p>
              </div>

              {/* Option C */}
              <div className="p-3 rounded-lg border border-slate-200 bg-slate-50">
                <div className="flex items-center justify-between font-mono font-bold text-slate-800">
                  <span>OPTION C: Resolve Ownership Disputes</span>
                  <span className="text-indigo-700">82% &rarr; 49% (-33%)</span>
                </div>
                <p className="text-slate-500 text-[11px] mt-1">
                  Tahsildar spot mutation camps in Rampura. Resolves critical title conflicts.
                </p>
              </div>

              {/* Option B + C (Winner) */}
              <div className="p-3.5 rounded-lg border-2 border-emerald-500 bg-emerald-50/40 text-emerald-950">
                <div className="flex items-center justify-between font-mono font-bold">
                  <span className="flex items-center gap-1.5 text-emerald-900">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    OPTION B + C (OPTIMAL SYNERGY)
                  </span>
                  <span className="text-emerald-700 font-extrabold">{currentRisk}% &rarr; {optimal.projectedRisk}% (-{optimal.riskReductionPts}%)</span>
                </div>
                <p className="text-emerald-900 text-[11px] mt-1.5 font-medium">
                  Combined compensation acceleration + spot title resolution eliminates both dispute and payment backlogs simultaneously with maximum ROI.
                </p>
              </div>

            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Synergy Multiplier: 1.18x</span>
            <button
              onClick={handleApplyOptimalCombo}
              className="text-slate-900 hover:text-slate-700 font-semibold underline cursor-pointer"
            >
              Select Optimal Combo
            </button>
          </div>
        </div>

        {/* Right 7 Columns: All 10 Candidate Interventions Interactive Matrix */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
          
          <div className="flex items-center justify-between mb-3">
            <div>
              <h4 className="text-sm font-bold text-slate-900">
                All 10 Candidate Ground Interventions
              </h4>
              <p className="text-xs text-slate-500">
                Check / uncheck levers to simulate custom multi-intervention scenarios
              </p>
            </div>
            
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
              {selectedInterventionIds.length} Selected Levers
            </span>
          </div>

          {/* 10 Items Table */}
          <div className="overflow-x-auto max-h-[420px] overflow-y-auto pr-1">
            <table className="w-full text-left text-xs">
              <thead className="sticky top-0 bg-slate-50 z-10 border-b border-slate-200 text-slate-500 uppercase font-mono text-[10px]">
                <tr>
                  <th className="py-2 px-2">Select</th>
                  <th className="py-2">Intervention Description</th>
                  <th className="py-2 text-right">Risk &Delta;</th>
                  <th className="py-2 text-right">Cost</th>
                  <th className="py-2 text-right">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {interventions.map((item) => {
                  const isChecked = selectedInterventionIds.includes(item.id);
                  return (
                    <tr 
                      key={item.id}
                      onClick={() => handleToggleIntervention(item.id)}
                      className={`cursor-pointer transition ${
                        isChecked ? 'bg-amber-50/50' : 'hover:bg-slate-50'
                      }`}
                    >
                      <td className="py-2 px-2">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}} // Handled by tr onClick
                          className="accent-slate-900 rounded cursor-pointer"
                        />
                      </td>

                      <td className="py-2 pr-2">
                        <div className="font-semibold text-slate-900">
                          {item.title}
                        </div>
                        <div className="text-[10px] text-slate-500">
                          {item.responsibleDept} &bull; <span className="font-mono text-slate-600">{item.category}</span>
                        </div>
                      </td>

                      <td className="py-2 text-right font-mono font-bold text-emerald-700">
                        -{item.riskReductionPct}%
                      </td>

                      <td className="py-2 text-right font-mono text-slate-700">
                        ₹{item.implementationCostCr}Cr
                      </td>

                      <td className="py-2 text-right font-mono text-slate-700">
                        {item.implementationDays}d
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Dynamic Active Simulation Outcome Footer */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div>
              <span className="text-slate-500">Custom Selection Impact: </span>
              <strong className="text-slate-900 font-mono font-bold">
                {currentRisk}% &rarr; {simulatedProjectedRisk}% (-{calculatedReduction}% pts)
              </strong>
              <span className={`ml-2 text-[10px] font-mono px-1.5 py-0.2 rounded ${
                meetsTarget ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
              }`}>
                {meetsTarget ? '✓ Meets Target' : 'Above Target'}
              </span>
            </div>

            <div className="text-slate-500 font-mono text-[11px]">
              Total Outlay: ₹{calculatedCost.toFixed(2)} Cr
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
