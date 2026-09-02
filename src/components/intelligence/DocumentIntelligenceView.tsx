import React, { useState } from 'react';
import { 
  FileText, 
  UploadCloud, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  Sparkles, 
  RefreshCw, 
  FileCheck, 
  ShieldAlert, 
  Database, 
  Scale, 
  Cpu, 
  Info,
  Calendar,
  Layers,
  CheckCircle,
  Clock,
  RotateCcw
} from 'lucide-react';
import { Project, DocumentAnalysisResult } from '../../types';
import { SAMPLE_DOCUMENTS } from '../../data/intelligenceData';

interface DocumentIntelligenceViewProps {
  project: Project;
  allProjects: Project[];
  onSelectProject: (projectId: string) => void;
  onApplyDocumentData: (doc: DocumentAnalysisResult) => void;
  onResetDocumentData: () => void;
  onNavigateToIntervention?: () => void;
  onNavigateToGis?: () => void;
}

export const DocumentIntelligenceView: React.FC<DocumentIntelligenceViewProps> = ({
  project,
  allProjects,
  onSelectProject,
  onApplyDocumentData,
  onResetDocumentData,
  onNavigateToIntervention,
  onNavigateToGis
}) => {
  const [selectedDoc, setSelectedDoc] = useState<DocumentAnalysisResult>(
    project.documents[0] || SAMPLE_DOCUMENTS[0]
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);
  const [activeTab, setActiveTab] = useState<'extracted' | 'issues' | 'cadastre'>('extracted');

  const processingStages = [
    'Document Type & Layout Classification',
    'High-Resolution Kannada & English OCR Extraction',
    'Named Entity Recognition (NER) & RFCTLARR Legal Parser',
    'Cadastral Cross-Validation with Bhoomi Land Registry',
    'TreeSHAP Risk Engine Re-computation'
  ];

  const handleSimulateUpload = (doc: DocumentAnalysisResult) => {
    setSelectedDoc(doc);
    setIsProcessing(true);
    setProcessingStep(1);

    // Progressive animation through the 5 extraction stages
    const timer1 = setTimeout(() => setProcessingStep(2), 600);
    const timer2 = setTimeout(() => setProcessingStep(3), 1200);
    const timer3 = setTimeout(() => setProcessingStep(4), 1800);
    const timer4 = setTimeout(() => {
      setProcessingStep(5);
      setIsProcessing(false);
    }, 2400);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  };

  const handleApplyToEngine = () => {
    onApplyDocumentData(selectedDoc);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-mono font-medium px-2 py-0.5 rounded bg-slate-900 text-white">
                Module 3
              </span>
              <span className="text-xs font-medium px-2.5 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200 font-mono flex items-center gap-1">
                <Cpu className="w-3 h-3 text-blue-600" />
                AI Document Intelligence Pipeline
              </span>
              {project.documentIntelligenceApplied && (
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-300 flex items-center gap-1 font-mono">
                  <ShieldAlert className="w-3 h-3 text-rose-600" />
                  +6% Risk Ingested (82% &rarr; 88%)
                </span>
              )}
            </div>

            <h3 className="text-xl font-bold text-slate-900 tracking-tight mt-1.5">
              Automated Statutory Document Parsing &amp; Risk Ingestion
            </h3>
            <p className="text-xs text-slate-500">
              Converts unstructured Section 11/19 Gazette notifications, Award files &amp; RTC Khata records into structured GIS &amp; ML risk indicators
            </p>
          </div>

          {/* Project Switcher */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-medium">Project:</span>
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

        {/* Workflow Breadcrumb Indicator */}
        <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 mt-4 pt-4 border-t border-slate-100 text-[11px] font-mono text-center">
          <div className="p-2 rounded bg-slate-50 border border-slate-200 text-slate-700 font-medium">
            1. Document Upload
          </div>
          <div className="p-2 rounded bg-slate-50 border border-slate-200 text-slate-700 font-medium">
            2. OCR Extraction
          </div>
          <div className="p-2 rounded bg-slate-50 border border-slate-200 text-slate-700 font-medium">
            3. Legal Field Parser
          </div>
          <div className="p-2 rounded bg-slate-50 border border-slate-200 text-slate-700 font-medium">
            4. Cadastral Check
          </div>
          <div className="p-2 rounded bg-slate-50 border border-slate-200 text-slate-700 font-medium">
            5. Risk Re-scoring
          </div>
          <div className="p-2 rounded bg-slate-900 text-white font-bold">
            6. Decision Support
          </div>
        </div>

      </div>

      {/* Main 2-Column Grid: Upload Zone + Extraction Workbench */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left 5 Columns: Document Selector & Upload Interface */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Drag & Drop Upload Zone */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
            <h4 className="text-sm font-bold text-slate-900 mb-1">
              Upload Land Acquisition Document
            </h4>
            <p className="text-xs text-slate-500 mb-3">
              Accepted formats: PDF / JPG / PNG (Gazette notices, Khata deeds, Award sheets)
            </p>

            <div 
              onClick={() => handleSimulateUpload(SAMPLE_DOCUMENTS[0])}
              className="border-2 border-dashed border-slate-300 hover:border-slate-800 rounded-xl p-6 text-center bg-slate-50 hover:bg-slate-100 transition cursor-pointer flex flex-col items-center justify-center gap-2"
            >
              <div className="w-10 h-10 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center">
                <UploadCloud className="w-5 h-5" />
              </div>
              <div className="text-xs font-semibold text-slate-800">
                Drag &amp; drop document or click to scan
              </div>
              <div className="text-[11px] text-slate-400">
                Automatic OCR &amp; RFCTLARR 2013 entity extraction
              </div>
            </div>

            {/* Pre-loaded Sample Gazette Documents for Demo */}
            <div className="mt-4 pt-3 border-t border-slate-100">
              <div className="text-xs font-semibold text-slate-700 mb-2">
                Or Select Sample Pre-Parsed Acquisition Files:
              </div>
              <div className="space-y-2">
                {SAMPLE_DOCUMENTS.map((doc) => {
                  const isSelected = selectedDoc.id === doc.id;
                  return (
                    <button
                      key={doc.id}
                      onClick={() => handleSimulateUpload(doc)}
                      className={`w-full text-left p-3 rounded-lg border text-xs transition cursor-pointer flex items-start justify-between gap-3 ${
                        isSelected 
                          ? 'bg-slate-900 text-white border-slate-900 shadow-xs' 
                          : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800'
                      }`}
                    >
                      <div className="flex items-start gap-2.5">
                        <FileText className={`w-4 h-4 shrink-0 mt-0.5 ${isSelected ? 'text-blue-400' : 'text-slate-500'}`} />
                        <div>
                          <div className="font-semibold truncate max-w-[200px]">
                            {doc.documentTitle}
                          </div>
                          <div className={`text-[10px] ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                            {doc.documentType} &bull; {doc.fileSize}
                          </div>
                        </div>
                      </div>

                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                        isSelected ? 'bg-slate-800 text-slate-200' : 'bg-slate-100 text-slate-600'
                      }`}>
                        Analyze
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Extraction Pipeline Progress Box */}
          {isProcessing && (
            <div className="bg-slate-900 text-white rounded-xl p-5 shadow-lg border border-slate-800 animate-fade-in space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 text-blue-400 animate-spin" />
                  <span className="text-xs font-bold font-mono">
                    PROCESSING DOCUMENT...
                  </span>
                </div>
                <span className="text-xs font-mono text-blue-400 font-bold">
                  Step {processingStep}/5
                </span>
              </div>

              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-blue-500 h-full transition-all duration-500"
                  style={{ width: `${(processingStep / 5) * 100}%` }}
                />
              </div>

              <div className="space-y-1 text-[11px] font-mono text-slate-300">
                {processingStages.map((stg, i) => (
                  <div key={i} className="flex items-center gap-2">
                    {processingStep > i ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    ) : processingStep === i + 1 ? (
                      <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping shrink-0" />
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-slate-700 shrink-0" />
                    )}
                    <span className={processingStep === i + 1 ? 'text-white font-bold' : processingStep > i ? 'text-emerald-300' : 'text-slate-500'}>
                      {stg}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Right 7 Columns: Extracted Intelligence & Actionable Risk Ingestion */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col justify-between">
          
          <div className="space-y-4">
            
            {/* Header with Document Status */}
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
                    Analysis Complete
                  </span>
                  <span className="text-xs text-slate-500 font-mono">
                    OCR Engine: Bilingual Tesseract + LayoutLMv3
                  </span>
                </div>
                <h4 className="text-base font-bold text-slate-900 mt-1">
                  {selectedDoc.documentTitle}
                </h4>
                <div className="text-xs text-slate-500">
                  {selectedDoc.documentType} &bull; Uploaded {selectedDoc.uploadedAt}
                </div>
              </div>

              <div className="text-right font-mono text-xs">
                <div className="text-slate-400 text-[10px]">Avg Confidence</div>
                <div className="text-base font-bold text-emerald-600">94.8%</div>
              </div>
            </div>

            {/* 3 Sub-tabs */}
            <div className="flex items-center gap-2 border-b border-slate-100 pb-2 text-xs">
              <button
                onClick={() => setActiveTab('extracted')}
                className={`px-3 py-1 rounded-md font-medium transition cursor-pointer ${
                  activeTab === 'extracted' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                Extracted Fields ({selectedDoc.fields.length})
              </button>
              <button
                onClick={() => setActiveTab('issues')}
                className={`px-3 py-1 rounded-md font-medium transition cursor-pointer flex items-center gap-1 ${
                  activeTab === 'issues' ? 'bg-rose-900 text-white' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <span>Potential Risk Issues</span>
                <span className="text-[10px] px-1.5 rounded-full bg-rose-500 text-white font-mono">
                  {selectedDoc.potentialIssues.length}
                </span>
              </button>
              <button
                onClick={() => setActiveTab('cadastre')}
                className={`px-3 py-1 rounded-md font-medium transition cursor-pointer ${
                  activeTab === 'cadastre' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                Corridor Overview
              </button>
            </div>

            {/* Tab 1: Extracted Fields List with Confidence Scores */}
            {activeTab === 'extracted' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[300px] overflow-y-auto pr-1">
                {selectedDoc.fields.map((field) => (
                  <div key={field.key} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs">
                    <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                      <span>{field.label}</span>
                      <span className={`font-bold ${
                        field.confidence >= 90 ? 'text-emerald-600' : 'text-amber-600'
                      }`}>
                        {field.confidence}%
                      </span>
                    </div>

                    <div className="font-semibold text-slate-900 mt-1 truncate">
                      {field.value}
                    </div>

                    {field.needsVerification && (
                      <div className="mt-1 flex items-center gap-1 text-[10px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200">
                        <AlertTriangle className="w-3 h-3 text-amber-600 shrink-0" />
                        <span>⚠ Requires verification</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Tab 2: Potential Issues Flagged */}
            {activeTab === 'issues' && (
              <div className="space-y-2.5">
                {selectedDoc.potentialIssues.map((issue, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-900">
                    <div className="flex items-center justify-between font-bold font-mono text-[11px] uppercase">
                      <span className="flex items-center gap-1.5 text-rose-700">
                        <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                        {issue.type} Conflict Detected ({issue.severity.toUpperCase()})
                      </span>
                      <span className="text-rose-700 font-mono">
                        +{issue.impactRiskPct}% ML Risk Weight
                      </span>
                    </div>
                    <p className="mt-1 text-slate-800 text-xs leading-relaxed">
                      {issue.message}
                    </p>
                  </div>
                ))}

                <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-900">
                  <div className="font-bold font-mono text-[11px]">
                    Cadastral Synchronization Note:
                  </div>
                  <p className="mt-0.5 text-slate-700 text-xs">
                    "12 ownership conflicts identified in Rampura village (Sy.Nos 140/1, 142/2A) require Tahsildar genealogy certification prior to Section 77 DBT payout."
                  </p>
                </div>
              </div>
            )}

            {/* Tab 3: Corridor Summary */}
            {activeTab === 'cadastre' && (
              <div className="space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="text-slate-400 font-mono text-[10px]">Project Corridor</div>
                    <div className="font-bold text-slate-900 mt-0.5">{selectedDoc.projectName}</div>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="text-slate-400 font-mono text-[10px]">District &amp; Village</div>
                    <div className="font-bold text-slate-900 mt-0.5">{selectedDoc.district} / {selectedDoc.village}</div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-center">
                    <div className="text-slate-400 font-mono text-[10px]">Land Area</div>
                    <div className="font-bold text-slate-900 text-sm mt-0.5 font-mono">{selectedDoc.landAreaHa} Ha</div>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-center">
                    <div className="text-slate-400 font-mono text-[10px]">Parcels Detected</div>
                    <div className="font-bold text-slate-900 text-sm mt-0.5 font-mono">{selectedDoc.parcelNumber}</div>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-center">
                    <div className="text-slate-400 font-mono text-[10px]">Compensation</div>
                    <div className="font-bold text-slate-900 text-sm mt-0.5 font-mono">₹{selectedDoc.compensationAmountCr} Cr</div>
                  </div>
                </div>

                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="text-slate-400 font-mono text-[10px]">Statutory Authority</div>
                  <div className="font-medium text-slate-800 text-xs mt-0.5">{selectedDoc.authority}</div>
                </div>
              </div>
            )}

            {/* Interactive Risk Delta Banner */}
            <div className="p-3 rounded-lg bg-slate-900 text-white text-xs space-y-1">
              <div className="flex items-center justify-between font-mono">
                <span className="text-amber-300 font-bold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  Predictive Risk Impact of Ingested Document
                </span>
                <span className="text-rose-400 font-bold">
                  {project.documentIntelligenceApplied ? 'Applied: 82% → 88% (+6%)' : 'Simulated Delta: +6% Risk'}
                </span>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                "{selectedDoc.riskDeltaExplanation}"
              </p>
            </div>

          </div>

          {/* Action CTAs */}
          <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 mt-4">
            
            {project.documentIntelligenceApplied ? (
              <button
                onClick={onResetDocumentData}
                className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition cursor-pointer flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
                <span>Reset to Baseline (82% Risk)</span>
              </button>
            ) : (
              <span className="text-xs text-slate-400 font-mono">
                Ready to commit to project state
              </span>
            )}

            <div className="flex items-center gap-2">
              {!project.documentIntelligenceApplied ? (
                <button
                  onClick={handleApplyToEngine}
                  className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md transition cursor-pointer flex items-center gap-2"
                >
                  <ShieldAlert className="w-4 h-4 text-white" />
                  <span>Ingest Findings (+6% Risk &rarr; 88%)</span>
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  {onNavigateToGis && (
                    <button
                      onClick={onNavigateToGis}
                      className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-medium transition cursor-pointer flex items-center gap-1"
                    >
                      <Layers className="w-3.5 h-3.5 text-slate-600" />
                      <span>View Rampura in GIS</span>
                    </button>
                  )}
                  {onNavigateToIntervention && (
                    <button
                      onClick={onNavigateToIntervention}
                      className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-md transition cursor-pointer flex items-center gap-1.5"
                    >
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      <span>Run Optimal Mitigation (88% &rarr; 31%)</span>
                    </button>
                  )}
                </div>
              )}
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
