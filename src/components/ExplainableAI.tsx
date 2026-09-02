import React, { useState } from 'react';
import { 
  BrainCircuit, 
  TrendingUp, 
  TrendingDown, 
  SlidersHorizontal, 
  Info, 
  ArrowRight,
  Database
} from 'lucide-react';
import { Project, ShapFactor } from '../types';

interface ExplainableAIProps {
  project: Project;
  allProjects: Project[];
  onSelectProject: (projectId: string) => void;
  onNavigateToSimulator: (projectId: string) => void;
  onNavigateToInactionCost: (projectId: string) => void;
}

export const ExplainableAI: React.FC<ExplainableAIProps> = ({
  project,
  allProjects,
  onSelectProject,
  onNavigateToSimulator,
  onNavigateToInactionCost
}) => {
  const [selectedFactor, setSelectedFactor] = useState<ShapFactor | null>(project.shapFactors[0]);

  const increasingFactors = project.shapFactors.filter(f => f.type === 'increase');
  const reducingFactors = project.shapFactors.filter(f => f.type === 'reduce');

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="text-xs font-mono font-medium px-2 py-0.5 rounded bg-slate-900 text-white">
              {project.code}
            </span>
            <span className="text-xs font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
              SHAP TreeExplainer Analysis
            </span>
          </div>

          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Root-Cause Delay Analysis &bull; {project.name}
          </h2>
          <p className="text-xs text-slate-500">
            {project.district} District &bull; Compensation Stage (Section 77)
          </p>
        </div>

        {/* Project Selector & Actions */}
        <div className="flex items-center gap-2.5 flex-wrap">
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

          <button
            onClick={() => onNavigateToSimulator(project.id)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-medium transition cursor-pointer"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Simulate Interventions</span>
          </button>
        </div>
      </div>

      {/* Delay Story Narrative Box */}
      <div className="bg-slate-900 text-white rounded-xl p-6 shadow-xs border border-slate-800">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xs font-medium text-slate-400 uppercase tracking-wider">
            Automated Executive Narrative
          </h3>
          <span className="text-xs font-mono text-slate-400">
            RFCTLARR Sec 77
          </span>
        </div>

        <p className="text-sm text-slate-200 leading-relaxed">
          &ldquo;{project.delayStory}&rdquo;
        </p>

        <div className="mt-4 pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between text-xs text-slate-400">
          <span>Target SLA: <strong>45 days for award disbursement</strong></span>
          <span className="font-mono text-slate-300">Baseline Risk (35%) + Factors (+47%) = {project.overallRisk}%</span>
        </div>
      </div>

      {/* Main Feature-Impact Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: SHAP Factors List */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Feature Importance &amp; Impact Weights
              </h3>
              <p className="text-xs text-slate-500">
                Percentage contribution of individual variables to the overall risk score
              </p>
            </div>
          </div>

          {/* Increasing Factors */}
          <div className="space-y-2.5">
            <div className="text-xs font-medium text-rose-700 flex items-center gap-1.5 pt-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Delay Accelerators (Increases Risk)</span>
            </div>

            {increasingFactors.map((factor, idx) => {
              const isSelected = selectedFactor?.name === factor.name;
              return (
                <div
                  key={idx}
                  onClick={() => setSelectedFactor(factor)}
                  className={`p-3 rounded-lg border cursor-pointer transition ${
                    isSelected ? 'border-slate-900 bg-slate-50' : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-medium text-slate-900">
                      {factor.name}
                    </span>
                    <span className="font-mono font-bold text-rose-600">
                      +{factor.impact}%
                    </span>
                  </div>

                  {/* Horizontal Bar */}
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-rose-500 rounded-full transition-all"
                      style={{ width: `${(factor.impact / 30) * 100}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 mt-1.5">
                    <span>Observed: <strong className="text-slate-800 font-mono">{factor.metricValue}</strong></span>
                    <span className="text-slate-400">Select for details &rarr;</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Reducing Factors */}
          <div className="space-y-2.5 mt-5 pt-4 border-t border-slate-100">
            <div className="text-xs font-medium text-emerald-700 flex items-center gap-1.5">
              <TrendingDown className="w-3.5 h-3.5" />
              <span>Risk Buffers (Mitigates Delay)</span>
            </div>

            {reducingFactors.map((factor, idx) => {
              const isSelected = selectedFactor?.name === factor.name;
              return (
                <div
                  key={idx}
                  onClick={() => setSelectedFactor(factor)}
                  className={`p-3 rounded-lg border cursor-pointer transition ${
                    isSelected ? 'border-slate-900 bg-slate-50' : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-medium text-slate-900">
                      {factor.name}
                    </span>
                    <span className="font-mono font-bold text-emerald-600">
                      {factor.impact}%
                    </span>
                  </div>

                  {/* Horizontal Bar */}
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full transition-all"
                      style={{ width: `${(Math.abs(factor.impact) / 30) * 100}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 mt-1.5">
                    <span>Observed: <strong className="text-slate-800 font-mono">{factor.metricValue}</strong></span>
                    <span className="text-slate-400">Select for details &rarr;</span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Right Col: Factor Drill-Down */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <Info className="w-4 h-4 text-slate-500" />
                Factor Breakdown
              </h3>
            </div>

            {selectedFactor ? (
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <div>
                  <div className="text-[10px] uppercase font-medium text-slate-400">
                    Feature Parameter
                  </div>
                  <div className="text-sm font-bold text-slate-900 mt-0.5">
                    {selectedFactor.name}
                  </div>
                </div>

                <div>
                  <div className="text-[10px] uppercase font-medium text-slate-400">
                    Net Impact
                  </div>
                  <div className={`text-2xl font-bold font-mono mt-0.5 ${
                    selectedFactor.type === 'increase' ? 'text-rose-600' : 'text-emerald-600'
                  }`}>
                    {selectedFactor.impact > 0 ? `+${selectedFactor.impact}%` : `${selectedFactor.impact}%`}
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    Metric Value: <strong className="text-slate-800 font-mono">{selectedFactor.metricValue}</strong>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200">
                  <div className="text-[10px] uppercase font-medium text-slate-400">
                    Context &amp; Root Cause
                  </div>
                  <p className="text-xs text-slate-700 mt-1 leading-relaxed">
                    {selectedFactor.description}
                  </p>
                </div>

                <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-900">
                  <strong>Recommended Action:</strong> Deploy Special Lok Adalat bench to resolve title disputes and clear treasury disbursement backlog.
                </div>
              </div>
            ) : (
              <div className="p-6 text-center text-xs text-slate-400">
                Select a factor on the left to inspect details.
              </div>
            )}
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 space-y-2">
            <button
              onClick={() => onNavigateToSimulator(project.id)}
              className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-medium transition flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Simulate Mitigation Scenarios</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => onNavigateToInactionCost(project.id)}
              className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-medium transition cursor-pointer"
            >
              Financial Cost of Inaction (₹28.3 Cr)
            </button>
          </div>
        </div>

      </div>

      {/* Technical Note */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <Database className="w-4 h-4 text-slate-400" />
          <span>
            Stage delay models are evaluated against RFCTLARR statutory lead-time baselines using Shapley additive values.
          </span>
        </div>
      </div>

    </div>
  );
};

