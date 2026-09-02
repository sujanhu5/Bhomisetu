import React, { useState } from 'react';
import { 
  SlidersHorizontal, 
  Play, 
  RotateCcw, 
  ArrowRight, 
  TrendingDown, 
  CheckCircle2, 
  CheckCheck,
  ShieldAlert
} from 'lucide-react';
import { Project } from '../types';

interface WhatIfSimulatorProps {
  project: Project;
  allProjects: Project[];
  onSelectProject: (projectId: string) => void;
  onNavigateToCostOfInaction: (projectId: string) => void;
  onApplyIntervention: (planSummary: string) => void;
}

export const WhatIfSimulator: React.FC<WhatIfSimulatorProps> = ({
  project,
  allProjects,
  onSelectProject,
  onNavigateToCostOfInaction,
  onApplyIntervention
}) => {
  const [processingTimeDays, setProcessingTimeDays] = useState<number>(60);
  const [pendingClaims, setPendingClaims] = useState<number>(20);
  const [familyVerificationPct, setFamilyVerificationPct] = useState<number>(95);
  const [disputesResolved, setDisputesResolved] = useState<number>(10);

  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [appliedToast, setAppliedToast] = useState<boolean>(false);

  const baseline = project.simulationBaseline;
  const baselineRisk = project.overallRisk;
  const baselineDelay = project.expectedDelayMonths;

  const daysDiff = baseline.avgProcessingDays - processingTimeDays;
  const claimsDiff = baseline.pendingClaims - pendingClaims;
  const verifDiff = familyVerificationPct - baseline.familyVerificationPct;
  const disputeFactor = disputesResolved * 0.8;

  const simulatedRiskDelta = Math.round(
    (daysDiff * 0.7) + (claimsDiff * 0.65) + (verifDiff * 0.5) + (disputeFactor)
  );

  const currentSimulatedRisk = Math.max(18, Math.min(95, baselineRisk - simulatedRiskDelta));
  const currentSimulatedDelay = Math.max(
    0.8,
    Number((baselineDelay - (simulatedRiskDelta * 0.098)).toFixed(1))
  );

  const riskReductionPoints = baselineRisk - currentSimulatedRisk;
  const delayReductionMonths = Number((baselineDelay - currentSimulatedDelay).toFixed(1));
  const avoidedImpactCr = Number(((delayReductionMonths / baselineDelay) * project.costImpact.totalImpactCr).toFixed(1));

  const handleRunSimulation = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
    }, 350);
  };

  const handleReset = () => {
    setProcessingTimeDays(74);
    setPendingClaims(43);
    setFamilyVerificationPct(82);
    setDisputesResolved(0);
  };

  const handleApplyActionPlan = () => {
    setAppliedToast(true);
    onApplyIntervention(
      `Intervention: Reduce processing to ${processingTimeDays}d, resolve ${disputesResolved} disputes, boost verification to ${familyVerificationPct}%. Predicted delay cut by ${delayReductionMonths} months.`
    );
    setTimeout(() => setAppliedToast(false), 4000);
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
              Scenario Simulation
            </span>
          </div>

          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Intervention &amp; Mitigation Simulator
          </h2>
          <p className="text-xs text-slate-500">
            {project.name} &bull; Adjust operational parameters to calculate projected schedule recovery
          </p>
        </div>

        {/* Project Selector */}
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

      {/* Baseline Conditions vs Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Baseline Conditions */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-slate-500" />
                Current Baseline State
              </h3>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-rose-50 border border-rose-200 text-rose-700">
                {baselineRisk}% Risk
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <div className="text-xs text-slate-500">Pending Claims</div>
                <div className="text-xl font-bold text-slate-900 font-mono mt-0.5">
                  {baseline.pendingClaims}
                </div>
                <div className="text-[11px] text-slate-400">Unverified titles</div>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <div className="text-xs text-slate-500">Avg Processing Time</div>
                <div className="text-xl font-bold text-slate-900 font-mono mt-0.5">
                  {baseline.avgProcessingDays} <span className="text-xs font-normal text-slate-500">days</span>
                </div>
                <div className="text-[11px] text-slate-400">Target SLA: 45 days</div>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <div className="text-xs text-slate-500">Active Disputes</div>
                <div className="text-xl font-bold text-slate-900 font-mono mt-0.5">
                  {baseline.activeDisputes}
                </div>
                <div className="text-[11px] text-slate-400">Court reference petitions</div>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <div className="text-xs text-slate-500">Family Verification</div>
                <div className="text-xl font-bold text-slate-900 font-mono mt-0.5">
                  {baseline.familyVerificationPct}%
                </div>
                <div className="text-[11px] text-slate-400">Aadhaar &amp; Khata linked</div>
              </div>
            </div>

            <div className="mt-4 p-3 rounded-lg bg-rose-50/30 border border-rose-200 text-xs">
              <div className="flex items-center justify-between text-rose-900 font-medium mb-0.5">
                <span>Baseline Delay Estimate:</span>
                <span className="font-mono font-bold text-sm">{baselineDelay} Months</span>
              </div>
              <div className="text-rose-700">
                Projected exposure: <strong className="font-mono">₹{project.costImpact.totalImpactCr} Cr</strong>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>District: {project.district}</span>
            <span>RFCTLARR Sec 77</span>
          </div>
        </div>

        {/* Simulation Sliders */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-slate-500" />
                Intervention Parameters
              </h3>
              <button
                onClick={handleReset}
                className="text-xs text-slate-500 hover:text-slate-900 flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>

            <div className="space-y-3 mt-4">
              
              {/* Processing Time */}
              <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-medium text-slate-800">Processing Time</span>
                  <span className="font-mono font-bold text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200">
                    {processingTimeDays} days
                  </span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="90"
                  step="1"
                  value={processingTimeDays}
                  onChange={(e) => setProcessingTimeDays(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-900"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                  <span>Fast-Track (20d)</span>
                  <span>SLA (60d)</span>
                  <span>Lagging (90d)</span>
                </div>
              </div>

              {/* Pending Claims */}
              <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-medium text-slate-800">Pending Claims Remaining</span>
                  <span className="font-mono font-bold text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200">
                    {pendingClaims} claims
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="50"
                  step="1"
                  value={pendingClaims}
                  onChange={(e) => setPendingClaims(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-900"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                  <span>0 Cleared</span>
                  <span>Target: ≤20</span>
                  <span>50 Backlog</span>
                </div>
              </div>

              {/* Family Verification */}
              <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-medium text-slate-800">Family Verification Level</span>
                  <span className="font-mono font-bold text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200">
                    {familyVerificationPct}%
                  </span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="100"
                  step="1"
                  value={familyVerificationPct}
                  onChange={(e) => setFamilyVerificationPct(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-900"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                  <span>50%</span>
                  <span>Norm: ≥95%</span>
                  <span>100%</span>
                </div>
              </div>

              {/* Disputes Resolved */}
              <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-medium text-slate-800">Disputes Resolved via Lok Adalat</span>
                  <span className="font-mono font-bold text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200">
                    {disputesResolved} / 17
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="17"
                  step="1"
                  value={disputesResolved}
                  onChange={(e) => setDisputesResolved(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-900"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                  <span>0</span>
                  <span>Target: ≥10</span>
                  <span>17 All</span>
                </div>
              </div>

            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100">
            <button
              onClick={handleRunSimulation}
              disabled={isSimulating}
              className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-medium transition flex items-center justify-center gap-1.5 cursor-pointer"
            >
              {isSimulating ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Calculating...</span>
                </>
              ) : (
                <>
                  <Play className="w-3 h-3 fill-white" />
                  <span>Update Projection</span>
                </>
              )}
            </button>
          </div>

        </div>

      </div>

      {/* Output Comparison */}
      <div className={`bg-white rounded-xl border border-slate-200 p-5 shadow-xs transition-all ${
        isSimulating ? 'opacity-50' : 'opacity-100'
      }`}>
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Projected Simulation Output
            </h3>
            <p className="text-xs text-slate-500">
              Comparison between current trajectory and simulated intervention scenario
            </p>
          </div>
        </div>

        {/* 3 Col Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          
          {/* BEFORE */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-slate-200 text-slate-700">
                Baseline (Do Nothing)
              </span>
              <div className="text-3xl font-bold text-rose-700 font-mono mt-3">
                {baselineRisk}%
              </div>
              <div className="text-xs text-slate-500 mt-0.5">
                Delay Risk Score
              </div>
            </div>

            <div className="mt-3 pt-2 border-t border-slate-200 text-xs text-slate-600 font-mono">
              Expected Delay: <strong>{baselineDelay}m</strong>
            </div>
          </div>

          {/* DELTA */}
          <div className="p-4 rounded-xl bg-slate-900 text-white flex flex-col items-center justify-center text-center">
            <span className="text-xs text-slate-400 font-medium">
              Net Impact
            </span>

            <div className="text-3xl font-bold text-emerald-400 font-mono mt-1.5 flex items-center gap-1">
              <TrendingDown className="w-5 h-5 text-emerald-400" />
              <span>-{riskReductionPoints}</span>
              <span className="text-xs text-slate-400 font-normal">pts</span>
            </div>

            <div className="text-xs text-slate-300 mt-1">
              Risk Reduction
            </div>

            <div className="mt-3 pt-2 border-t border-slate-800 w-full text-center text-xs">
              <span className="text-slate-400">Recovers <strong>{delayReductionMonths} months</strong> &bull; Avoids <strong>₹{avoidedImpactCr} Cr</strong></span>
            </div>
          </div>

          {/* AFTER */}
          <div className="p-4 rounded-xl bg-emerald-50/40 border border-emerald-200 text-center flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                With Proposed Interventions
              </span>
              <div className="text-3xl font-bold text-emerald-800 font-mono mt-3">
                {currentSimulatedRisk}%
              </div>
              <div className="text-xs text-emerald-700 mt-0.5">
                Mitigated Delay Risk
              </div>
            </div>

            <div className="mt-3 pt-2 border-t border-emerald-200 text-xs text-emerald-900 font-mono">
              Expected Delay: <strong>{currentSimulatedDelay}m</strong>
            </div>
          </div>

        </div>

        {/* Action Trigger */}
        <div className="mt-4 p-3 rounded-lg bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <div className="text-xs font-semibold text-slate-800 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Recommended Directive
            </div>
            <p className="text-xs text-slate-600 mt-0.5">
              Expedite 43 unverified claims and deploy special Revenue team for Tumakuru Section 77 awards.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleApplyActionPlan}
              className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-medium transition flex items-center gap-1 cursor-pointer"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span>Prioritize Plan</span>
            </button>

            <button
              onClick={() => onNavigateToCostOfInaction(project.id)}
              className="px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 rounded-lg text-xs font-medium transition flex items-center gap-1 cursor-pointer"
            >
              <span>Financial Impact</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Confirmation Toast */}
        {appliedToast && (
          <div className="mt-3 p-2.5 rounded-lg bg-slate-900 text-white text-xs flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Intervention strategy added to priority actions.</span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">Saved</span>
          </div>
        )}

      </div>

    </div>
  );
};

