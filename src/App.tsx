import React, { useState, useEffect } from 'react';
import { NavTab, StageId, IntelligenceSubTab } from './types';
import { ProjectProvider, useProjectContext } from './context/ProjectContext';
import { Header } from './components/Header';
import { Navbar } from './components/Navbar';
import { SidebarNav } from './components/SidebarNav';
import { ExecutiveOverview } from './components/ExecutiveOverview';
import { ProjectDetails } from './components/ProjectDetails';
import { ExplainableAI } from './components/ExplainableAI';
import { GisRiskMap } from './components/GisRiskMap';
import { WhatIfSimulator } from './components/WhatIfSimulator';
import { CostOfInaction } from './components/CostOfInaction';
import { Reports } from './components/Reports';
import { IntelligenceCenter } from './components/IntelligenceCenter';
import { ArchitectureModal } from './components/ArchitectureModal';
import { CommandPaletteModal } from './components/CommandPaletteModal';
import { CheckCircle2, AlertCircle, X, Layers, LayoutDashboard, Sparkles, BrainCircuit, MapPin, SlidersHorizontal, TrendingDown, FileSpreadsheet } from 'lucide-react';

const TAB_TITLES: Record<NavTab, string> = {
  'overview': 'Executive Overview',
  'intelligence': 'Intelligence Center',
  'intelligence-center': 'Intelligence Center',
  'projects': 'Project Corridors',
  'risk-analysis': 'Risk Analytics (TreeSHAP)',
  'gis-map': 'Cadastral GIS Map',
  'simulator': 'What-If Delay Simulator',
  'inaction-cost': 'Financial Cost of Inaction',
  'reports': 'Statutory Reports & Cabinet Notes'
};

function AppContent() {
  const [activeTab, setActiveTab] = useState<NavTab>('overview');
  const [intelligenceSubTab, setIntelligenceSubTab] = useState<IntelligenceSubTab>('trajectory');
  const [isArchitectureModalOpen, setIsArchitectureModalOpen] = useState<boolean>(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState<boolean>(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState<boolean>(false);

  // Layout preference: 'left' (sidebar) or 'top' (top navbar) - default to 'left' as requested
  const [navLayout, setNavLayout] = useState<'left' | 'top'>(() => {
    const saved = localStorage.getItem('bhoomi_nav_layout');
    return saved === 'top' ? 'top' : 'left';
  });

  // Left sidebar collapsed state
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(() => {
    const saved = localStorage.getItem('bhoomi_sidebar_collapsed');
    return saved === 'true';
  });

  const {
    projects,
    alerts,
    selectedProjectId,
    currentProject,
    setSelectedProjectId,
    toastMessage,
    setToastMessage
  } = useProjectContext();

  const toggleNavLayout = () => {
    setNavLayout(prev => {
      const next = prev === 'left' ? 'top' : 'left';
      localStorage.setItem('bhoomi_nav_layout', next);
      return next;
    });
  };

  const toggleSidebarCollapse = () => {
    setIsSidebarCollapsed(prev => {
      const next = !prev;
      localStorage.setItem('bhoomi_sidebar_collapsed', String(next));
      return next;
    });
  };

  // Listen for global Cmd+K or Ctrl+K or '/' shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      } else if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        e.preventDefault();
        setIsCommandPaletteOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSelectProject = (projectId: string) => {
    setSelectedProjectId(projectId);
    setActiveTab('projects');
  };

  const handleNavigateToIntelligence = (projectId: string, subTab: IntelligenceSubTab = 'trajectory') => {
    setSelectedProjectId(projectId);
    setIntelligenceSubTab(subTab);
    setActiveTab('intelligence');
  };

  const handleNavigateToRiskAnalysis = (projectId: string, stageId?: StageId) => {
    setSelectedProjectId(projectId);
    setActiveTab('risk-analysis');
  };

  const handleNavigateToSimulator = (projectId: string) => {
    setSelectedProjectId(projectId);
    setActiveTab('simulator');
  };

  const handleNavigateToInactionCost = (projectId: string) => {
    setSelectedProjectId(projectId);
    setActiveTab('inaction-cost');
  };

  const handleApplyIntervention = (summary: string) => {
    setToastMessage(summary);
    setTimeout(() => setToastMessage(null), 6000);
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex font-sans selection:bg-blue-600 selection:text-white">
      
      {/* Left Sidebar Navigation (Rendered if navLayout === 'left') */}
      {navLayout === 'left' && (
        <SidebarNav
          activeTab={activeTab}
          onSelectTab={(tab) => {
            setActiveTab(tab);
            setIsMobileNavOpen(false);
          }}
          criticalCount={8}
          onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
          onOpenArchitecture={() => setIsArchitectureModalOpen(true)}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={toggleSidebarCollapse}
          navLayout={navLayout}
          onToggleNavLayout={toggleNavLayout}
        />
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen overflow-x-hidden">
        
        {/* Global Header */}
        <Header 
          onOpenArchitecture={() => setIsArchitectureModalOpen(true)}
          projects={projects}
          alerts={alerts}
          onSelectProject={handleSelectProject}
          onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
          navLayout={navLayout}
          onToggleNavLayout={toggleNavLayout}
          onOpenMobileNav={() => setIsMobileNavOpen(true)}
          activeTabTitle={TAB_TITLES[activeTab]}
        />

        {/* Top Navbar (Rendered only if navLayout === 'top') */}
        {navLayout === 'top' && (
          <Navbar 
            activeTab={activeTab}
            onSelectTab={setActiveTab}
            criticalCount={8}
            onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
            navLayout={navLayout}
            onToggleNavLayout={toggleNavLayout}
          />
        )}

        {/* Global Toast Notification */}
        {toastMessage && (
          <div className="fixed bottom-5 right-5 z-50 max-w-md p-4 rounded-xl bg-slate-900 text-white border border-emerald-500/50 shadow-2xl animate-fade-in flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider font-mono">
                System State Synchronized
              </div>
              <div className="text-xs text-slate-200 mt-0.5 leading-snug">
                {toastMessage}
              </div>
              <div className="text-[10px] text-slate-400 mt-1 font-mono">
                Logged to: SLAO Tumakuru &bull; Bhoomi Land Cadastre ML Engine
              </div>
            </div>
          </div>
        )}

        {/* Main Screen Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full">
          {activeTab === 'overview' && (
            <ExecutiveOverview
              projects={projects}
              alerts={alerts}
              onSelectProject={handleSelectProject}
              onNavigateToRiskAnalysis={handleNavigateToRiskAnalysis}
              onNavigateToSimulator={handleNavigateToSimulator}
              onNavigateToIntelligence={(pid) => handleNavigateToIntelligence(pid, 'trajectory')}
            />
          )}

          {activeTab === 'intelligence' && (
            <IntelligenceCenter
              initialSubTab={intelligenceSubTab}
              onNavigateToTab={(t) => setActiveTab(t)}
            />
          )}

          {activeTab === 'projects' && (
            <ProjectDetails
              project={currentProject}
              allProjects={projects}
              onSelectProject={setSelectedProjectId}
              onOpenExplainableAI={(pid) => handleNavigateToRiskAnalysis(pid)}
              onOpenSimulator={(pid) => handleNavigateToSimulator(pid)}
              onOpenCostOfInaction={(pid) => handleNavigateToInactionCost(pid)}
              onOpenIntelligenceCenter={(pid, subTab) => handleNavigateToIntelligence(pid, subTab || 'trajectory')}
            />
          )}

          {activeTab === 'risk-analysis' && (
            <ExplainableAI
              project={currentProject}
              allProjects={projects}
              onSelectProject={setSelectedProjectId}
              onNavigateToSimulator={(pid) => handleNavigateToSimulator(pid)}
              onNavigateToInactionCost={(pid) => handleNavigateToInactionCost(pid)}
            />
          )}

          {activeTab === 'gis-map' && (
            <GisRiskMap
              projects={projects}
              onSelectProject={handleSelectProject}
              onOpenExplainableAI={(pid) => handleNavigateToRiskAnalysis(pid)}
              onOpenSimulator={(pid) => handleNavigateToSimulator(pid)}
            />
          )}

          {activeTab === 'simulator' && (
            <WhatIfSimulator
              project={currentProject}
              allProjects={projects}
              onSelectProject={setSelectedProjectId}
              onNavigateToCostOfInaction={(pid) => handleNavigateToInactionCost(pid)}
              onApplyIntervention={handleApplyIntervention}
            />
          )}

          {activeTab === 'inaction-cost' && (
            <CostOfInaction
              project={currentProject}
              allProjects={projects}
              onSelectProject={setSelectedProjectId}
              onNavigateToSimulator={(pid) => handleNavigateToSimulator(pid)}
              onNavigateToReports={() => setActiveTab('reports')}
            />
          )}

          {activeTab === 'reports' && (
            <Reports
              projects={projects}
              onSelectProject={handleSelectProject}
            />
          )}
        </main>

        {/* Professional Footer */}
        <footer className="bg-white border-t border-slate-200 py-4 text-xs text-slate-500 mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-slate-800">BhoomiSetu</span>
              <span>&bull;</span>
              <span>Land Acquisition Decision Support &amp; Early Warning System</span>
              <span>&bull;</span>
              <span className="text-slate-600">Revenue Department, Government of Karnataka</span>
            </div>

            <div className="flex items-center gap-3 font-mono text-[11px] text-slate-400">
              <span>RFCTLARR Act 2013</span>
              <span>&bull;</span>
              <span>TreeSHAP + DiCE ML Models</span>
              <span>&bull;</span>
              <button 
                onClick={() => setIsArchitectureModalOpen(true)}
                className="text-slate-700 hover:text-slate-900 underline font-medium cursor-pointer"
              >
                System Specifications
              </button>
            </div>
          </div>
        </footer>

      </div>

      {/* Mobile Drawer (Left Mode) */}
      {isMobileNavOpen && navLayout === 'left' && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div 
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
            onClick={() => setIsMobileNavOpen(false)}
          />
          <div className="relative w-72 max-w-[80vw] bg-slate-900 text-white h-full shadow-2xl flex flex-col z-10 animate-slide-in">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                  BS
                </div>
                <div>
                  <div className="font-bold text-sm">BhoomiSetu</div>
                  <div className="text-[10px] text-slate-400">Navigation Menu</div>
                </div>
              </div>
              <button 
                onClick={() => setIsMobileNavOpen(false)}
                className="p-1 rounded-md text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-3 space-y-2">
              <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 px-2">Navigation</div>
              {[
                { id: 'overview' as NavTab, label: 'Executive Overview', icon: LayoutDashboard },
                { id: 'intelligence' as NavTab, label: 'Intelligence Center', icon: Sparkles },
                { id: 'projects' as NavTab, label: 'Project Corridors', icon: Layers },
                { id: 'risk-analysis' as NavTab, label: 'Risk Analytics (TreeSHAP)', icon: BrainCircuit },
                { id: 'gis-map' as NavTab, label: 'Cadastral GIS Map', icon: MapPin },
                { id: 'simulator' as NavTab, label: 'What-If Simulator', icon: SlidersHorizontal },
                { id: 'inaction-cost' as NavTab, label: 'Financial Impact', icon: TrendingDown },
                { id: 'reports' as NavTab, label: 'Statutory Reports', icon: FileSpreadsheet }
              ].map(item => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsMobileNavOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold cursor-pointer ${
                      isActive ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="p-3 border-t border-slate-800">
              <button
                onClick={() => {
                  toggleNavLayout();
                  setIsMobileNavOpen(false);
                }}
                className="w-full py-2 px-3 text-xs rounded-lg bg-slate-800 text-slate-300 hover:text-white"
              >
                Switch to Top Navbar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Architecture & ML Pipeline Modal */}
      <ArchitectureModal
        isOpen={isArchitectureModalOpen}
        onClose={() => setIsArchitectureModalOpen(false)}
      />

      {/* Interactive Command Palette Modal (Cmd+K / Search) */}
      <CommandPaletteModal
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        projects={projects}
        onSelectProject={(pid) => {
          setSelectedProjectId(pid);
          setActiveTab('projects');
        }}
        onNavigateToTab={(t) => setActiveTab(t)}
        onNavigateToIntelligence={(pid, subTab) => handleNavigateToIntelligence(pid, subTab)}
        onOpenArchitecture={() => setIsArchitectureModalOpen(true)}
      />

    </div>
  );
}

export default function App() {
  return (
    <ProjectProvider>
      <AppContent />
    </ProjectProvider>
  );
}
