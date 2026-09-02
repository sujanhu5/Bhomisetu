import React from 'react';
import { Cpu, X, Database, BrainCircuit, SlidersHorizontal, ArrowDown, CheckCircle2, Sparkles, Layers } from 'lucide-react';

interface ArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ArchitectureModal: React.FC<ArchitectureModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-2xl border border-slate-300 shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                BhoomiSetu Technical &amp; ML Architecture
              </h3>
              <p className="text-xs text-slate-500 font-mono">
                XGBoost Stage Classifiers &bull; TreeSHAP Explainability &bull; DiCE Counterfactual Engine
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 4 Core Innovations */}
        <div className="mt-6">
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 font-mono">
            BhoomiSetu&apos;s 4 Core Innovations:
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
              <div className="font-bold text-slate-900 flex items-center gap-1.5 font-mono">
                <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                1. Stage-Wise Risk Scoring
              </div>
              <p className="text-slate-600 mt-1">
                Decoupled delay classifiers for each of the 7 RFCTLARR Act 2013 stages rather than an opaque single timeline score.
              </p>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
              <div className="font-bold text-slate-900 flex items-center gap-1.5 font-mono">
                <span className="w-2 h-2 rounded-full bg-slate-700"></span>
                2. Plain-Language Explainable AI
              </div>
              <p className="text-slate-600 mt-1">
                SHAP feature contributions translated directly into natural language Delay Stories for District Collectors.
              </p>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
              <div className="font-bold text-slate-900 flex items-center gap-1.5 font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                3. Counterfactual What-If Simulation
              </div>
              <p className="text-slate-600 mt-1">
                DiCE constrained optimization allowing officers to test policy interventions and preview risk reduction.
              </p>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
              <div className="font-bold text-slate-900 flex items-center gap-1.5 font-mono">
                <span className="w-2 h-2 rounded-full bg-rose-600"></span>
                4. Cost-of-Inaction Estimation
              </div>
              <p className="text-slate-600 mt-1">
                Monetizing escalation, idle equipment, and contractor claims to demonstrate tangible multi-crore ROI.
              </p>
            </div>
          </div>
        </div>

        {/* Conceptual ML Pipeline Flow */}
        <div className="mt-6 p-4 rounded-xl bg-slate-900 text-white shadow-inner">
          <div className="text-xs font-mono text-amber-300 font-bold uppercase tracking-wider mb-4 text-center">
            Conceptual End-to-End ML Pipeline
          </div>

          <div className="space-y-2 text-xs font-mono">
            
            <div className="p-2.5 rounded bg-white/5 border border-white/10 flex items-center justify-between">
              <span className="text-slate-300">1. Data Ingestion Layer</span>
              <span className="text-blue-300 font-semibold">Synthetic Administrative &amp; Bhoomi RTC Data</span>
            </div>

            <div className="flex justify-center text-slate-500">
              <ArrowDown className="w-4 h-4" />
            </div>

            <div className="p-2.5 rounded bg-white/5 border border-white/10 flex items-center justify-between">
              <span className="text-slate-300">2. Feature Engineering</span>
              <span className="text-indigo-300 font-semibold">Stage lead times, claim velocity, dispute density</span>
            </div>

            <div className="flex justify-center text-slate-500">
              <ArrowDown className="w-4 h-4" />
            </div>

            <div className="p-2.5 rounded bg-white/5 border border-white/10 flex items-center justify-between">
              <span className="text-slate-300">3. 7 Stage-Wise Risk Models</span>
              <span className="text-emerald-300 font-semibold">Multi-output XGBoost Gradient Boosted Trees</span>
            </div>

            <div className="flex justify-center text-slate-500">
              <ArrowDown className="w-4 h-4" />
            </div>

            <div className="p-2.5 rounded bg-white/5 border border-white/10 flex items-center justify-between">
              <span className="text-slate-300">4. Explainability &amp; Narrative</span>
              <span className="text-yellow-300 font-semibold">TreeSHAP + Rule-Based NLG Delay Story</span>
            </div>

            <div className="flex justify-center text-slate-500">
              <ArrowDown className="w-4 h-4" />
            </div>

            <div className="p-2.5 rounded bg-white/5 border border-white/10 flex items-center justify-between">
              <span className="text-slate-300">5. Counterfactual What-If Simulation</span>
              <span className="text-rose-300 font-semibold">DiCE (Diverse Counterfactual Explanations)</span>
            </div>

            <div className="flex justify-center text-slate-500">
              <ArrowDown className="w-4 h-4" />
            </div>

            <div className="p-2.5 rounded bg-blue-600/30 border border-blue-400/40 text-white font-bold flex items-center justify-between">
              <span>6. Decision Dashboard &amp; Directives</span>
              <span className="text-emerald-300 font-mono">React + Tailwind + GIS Spatial Grid</span>
            </div>

          </div>
        </div>

        {/* Technology Stack Tags */}
        <div className="mt-6 pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-slate-500">
            <strong>Target Production Stack:</strong> XGBoost, SHAP, DiCE, FastAPI, PostgreSQL, React, Tailwind CSS
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-slate-800 transition"
          >
            Close Inspector
          </button>
        </div>

      </div>
    </div>
  );
};
