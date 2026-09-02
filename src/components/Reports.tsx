import React, { useState } from 'react';
import { 
  FileSpreadsheet, 
  FileText, 
  Download, 
  Share2, 
  Printer, 
  CheckCircle2, 
  Sparkles, 
  Building2, 
  Calendar, 
  ShieldCheck, 
  AlertTriangle,
  ArrowRight,
  Eye
} from 'lucide-react';
import { ReportTemplate, Project } from '../types';
import { REPORT_TEMPLATES } from '../data/mockData';

interface ReportsProps {
  projects: Project[];
  onSelectProject: (projectId: string) => void;
}

export const Reports: React.FC<ReportsProps> = ({
  projects,
  onSelectProject
}) => {
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('critical-projects');
  const [isPreviewOpen, setIsPreviewOpen] = useState<boolean>(true);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [shareSuccess, setShareSuccess] = useState<boolean>(false);

  const selectedTemplate = REPORT_TEMPLATES.find(t => t.id === selectedTemplateId) || REPORT_TEMPLATES[2];
  const priorityProject = projects.find(p => p.id === 'nh-48-expansion') || projects[0];

  const handleExportPDF = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      window.print();
    }, 600);
  };

  const handleShare = () => {
    setShareSuccess(true);
    setTimeout(() => setShareSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Screen Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200 flex items-center gap-1 font-mono">
              <FileSpreadsheet className="w-3.5 h-3.5 text-blue-600" />
              Statutory Reporting Engine
            </span>
            <span className="text-xs text-slate-500 font-mono">
              RFCTLARR 2013 Formats &bull; Automated Generation
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-1">
            Executive Risk Dossiers &amp; Reports
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Generate formal decision-support reports for Chief Secretary review, District Collector meetings, and Ministry review.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleExportPDF}
            disabled={isExporting}
            className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs sm:text-sm font-semibold shadow-xs transition cursor-pointer"
          >
            {isExporting ? (
              <span>Preparing PDF...</span>
            ) : (
              <>
                <Download className="w-4 h-4 text-slate-300" />
                <span>Export PDF</span>
              </>
            )}
          </button>

          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs sm:text-sm font-semibold border border-slate-300 transition cursor-pointer"
          >
            <Share2 className="w-4 h-4 text-slate-600" />
            <span>Share Report</span>
          </button>
        </div>
      </div>

      {shareSuccess && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-950 text-xs font-medium rounded-lg flex items-center gap-2 animate-fade-in shadow-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-700" />
          <span>Report link copied to clipboard &amp; encrypted copy dispatched to State Infrastructure Cell.</span>
        </div>
      )}

      {/* 4 Report Template Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {REPORT_TEMPLATES.map((template) => {
          const isSelected = template.id === selectedTemplateId;
          return (
            <div
              key={template.id}
              onClick={() => {
                setSelectedTemplateId(template.id);
                setIsPreviewOpen(true);
              }}
              className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                isSelected
                  ? 'border-slate-800 bg-slate-50/70 shadow-xs ring-1 ring-slate-800'
                  : 'border-slate-200 bg-white hover:border-slate-300 shadow-xs'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center border border-slate-200">
                    <FileText className="w-4 h-4" />
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 font-semibold">
                    {template.pages} pages
                  </span>
                </div>

                <h3 className="font-bold text-sm text-slate-900 leading-snug">
                  {template.title}
                </h3>
                <div className="text-[11px] font-semibold text-slate-600 mt-1 font-mono">
                  {template.category}
                </div>

                <p className="text-xs text-slate-500 mt-2 line-clamp-3">
                  {template.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400 text-[11px] font-mono">{template.frequency}</span>
                <button
                  className={`text-xs font-semibold flex items-center gap-1 cursor-pointer ${
                    isSelected ? 'text-slate-900 underline' : 'text-slate-600'
                  }`}
                >
                  <span>{isSelected ? 'Previewing' : 'Generate'}</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Generated Official Government Dossier Preview */}
      {isPreviewOpen && (
        <div className="bg-white border-2 border-slate-300 rounded-xl p-6 sm:p-8 shadow-md">
          
          {/* Official Dossier Header */}
          <div className="border-b-2 border-slate-900 pb-5 mb-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              
              {/* National Emblem Concept & Header */}
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-lg bg-[#0B192C] text-amber-400 flex flex-col items-center justify-center p-1 font-bold text-center border border-amber-400/40">
                  <span className="text-[9px] uppercase tracking-tighter">GOVT OF</span>
                  <span className="text-xs">KARNATAKA</span>
                </div>
                <div>
                  <div className="text-xs font-bold tracking-widest text-slate-500 uppercase">
                    GOVERNMENT OF KARNATAKA &bull; REVENUE &amp; INFRASTRUCTURE SECRETARIAT
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                    {selectedTemplate.title}
                  </h3>
                  <div className="text-xs text-slate-600 font-mono">
                    Ref ID: DOS-2026-RFCTLARR-0042 &bull; Classification: CONFIDENTIAL / DECISION SUPPORT
                  </div>
                </div>
              </div>

              {/* Date & Badge */}
              <div className="text-left sm:text-right text-xs">
                <div className="font-semibold text-slate-800">Date: 26 July 2026</div>
                <div className="text-slate-500 font-mono">Bhoomi Spatial Engine</div>
                <span className="inline-block mt-1 px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold text-[10px] uppercase font-mono border border-slate-200">
                  Statutory Briefing
                </span>
              </div>

            </div>
          </div>

          {/* Dossier Body Content */}
          <div className="space-y-6">
            
            {/* Executive Summary Table */}
            <div>
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
                1. Critical Monitored Project Briefing
              </h4>
              
              <div className="overflow-x-auto border border-slate-200 rounded-lg">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                    <tr>
                      <th className="p-3">Project</th>
                      <th className="p-3">Risk Level</th>
                      <th className="p-3">Primary Cause (SHAP)</th>
                      <th className="p-3">Recommended Action</th>
                      <th className="p-3 text-right">Cost of Inaction</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-slate-800 font-medium">
                    
                    {/* Row 1: NH-48 */}
                    <tr className="bg-rose-50/30">
                      <td className="p-3">
                        <div className="font-bold text-slate-900">{priorityProject.name}</div>
                        <div className="text-[11px] text-slate-500 font-mono">{priorityProject.district} &bull; {priorityProject.code}</div>
                      </td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded bg-rose-600 text-white font-bold font-mono text-[11px]">
                          82% Critical
                        </span>
                      </td>
                      <td className="p-3">
                        <div className="font-semibold text-slate-900">43 pending claims (+24%)</div>
                        <div className="text-[11px] text-slate-500">74 days avg payment delay</div>
                      </td>
                      <td className="p-3 text-slate-700">
                        Convene Special Lok Adalat Camp and deploy fast-track SLAO verification squad.
                      </td>
                      <td className="p-3 text-right font-bold text-rose-700 font-mono">
                        ₹28.3 Cr
                      </td>
                    </tr>

                    {/* Row 2: Dharwad */}
                    <tr>
                      <td className="p-3">
                        <div className="font-bold text-slate-900">Dharwad-Kittur Industrial Corridor</div>
                        <div className="text-[11px] text-slate-500 font-mono">Dharwad &bull; BH-2026-0087</div>
                      </td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded bg-amber-500 text-white font-bold font-mono text-[11px]">
                          74% High
                        </span>
                      </td>
                      <td className="p-3">
                        <div className="font-semibold text-slate-900">R&amp;R civil works lag (+23%)</div>
                        <div className="text-[11px] text-slate-500">62 artisan families pending stipend</div>
                      </td>
                      <td className="p-3 text-slate-700">
                        Direct KIADB contractor for water infrastructure handover.
                      </td>
                      <td className="p-3 text-right font-bold text-slate-900 font-mono">
                        ₹23.1 Cr
                      </td>
                    </tr>

                    {/* Row 3: Bengaluru Ring Road */}
                    <tr>
                      <td className="p-3">
                        <div className="font-bold text-slate-900">Bengaluru Satellite Town Ring Road</div>
                        <div className="text-[11px] text-slate-500 font-mono">Bengaluru Urban &bull; BH-2026-0019</div>
                      </td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded bg-amber-500 text-white font-bold font-mono text-[11px]">
                          67% High
                        </span>
                      </td>
                      <td className="p-3">
                        <div className="font-semibold text-slate-900">Guidance valuation objections (+21%)</div>
                        <div className="text-[11px] text-slate-500">Sec 19 declaration hold</div>
                      </td>
                      <td className="p-3 text-slate-700">
                        Approve special commercial multiplier for peri-urban parcels.
                      </td>
                      <td className="p-3 text-right font-bold text-slate-900 font-mono">
                        ₹49.5 Cr
                      </td>
                    </tr>

                  </tbody>
                </table>
              </div>
            </div>

            {/* Delay Story & Counterfactual Findings */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                2. Explainable Delay Narrative &amp; ROI Justification
              </h4>
              <p className="text-xs text-slate-700 leading-relaxed italic">
                &ldquo;Compensation is currently the highest-risk stage on the NH-48 Tumakuru package because 43 claims remain unresolved and average payment delay is 74 days. Counterfactual simulation demonstrates that a targeted administrative outlay of ₹1.2 Cr will compress lead time by 4.7 months and avoid ₹14.6 Cr in compound price escalation.&rdquo;
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-3 border-t border-slate-200 text-xs">
                <div>
                  <div className="text-slate-500 text-[11px]">Expected Delay</div>
                  <div className="font-bold text-slate-900 font-mono">7.8 Months</div>
                </div>
                <div>
                  <div className="text-slate-500 text-[11px]">Do Nothing Cost</div>
                  <div className="font-bold text-rose-700 font-mono">₹28.3 Cr</div>
                </div>
                <div>
                  <div className="text-slate-500 text-[11px]">Intervention Cost</div>
                  <div className="font-bold text-emerald-700 font-mono">₹1.2 Cr</div>
                </div>
                <div>
                  <div className="text-slate-500 text-[11px]">Net Avoided Loss</div>
                  <div className="font-bold text-blue-700 font-mono">₹14.6 Cr</div>
                </div>
              </div>
            </div>

            {/* Signature Block */}
            <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-slate-600 gap-4">
              <div>
                <div className="font-bold text-slate-900">Dr. S. K. Hiremath, IAS</div>
                <div className="text-slate-500">Special Land Acquisition Officer &amp; District Collectorate, Tumakuru</div>
                <div className="text-[10px] font-mono text-emerald-600">Digitally Verified via BhoomiSetu e-Sign</div>
              </div>

              <div className="text-left sm:text-right">
                <div className="font-bold text-slate-900">State Infrastructure Review Committee</div>
                <div className="text-slate-500">Department of Infrastructure Development (IDD)</div>
                <div className="text-[10px] font-mono text-slate-400">Govt. of Karnataka &bull; 2026</div>
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};
