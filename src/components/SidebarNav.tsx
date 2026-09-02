import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Layers, 
  BrainCircuit, 
  MapPin, 
  SlidersHorizontal, 
  FileSpreadsheet, 
  TrendingDown,
  Sparkles,
  ChevronDown,
  Check,
  Building2,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Cpu,
  PanelLeftClose,
  PanelLeft,
  Search,
  LayoutTemplate
} from 'lucide-react';
import { NavTab, Project } from '../types';
import { useProjectContext } from '../context/ProjectContext';

interface SidebarNavProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  criticalCount?: number;
  onOpenCommandPalette?: () => void;
  onOpenArchitecture?: () => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  navLayout: 'left' | 'top';
  onToggleNavLayout: () => void;
}

export const SidebarNav: React.FC<SidebarNavProps> = ({
  activeTab,
  onSelectTab,
  criticalCount = 8,
  onOpenCommandPalette,
  onOpenArchitecture,
  isCollapsed,
  onToggleCollapse,
  navLayout,
  onToggleNavLayout
}) => {
  const { projects, selectedProjectId, currentProject, setSelectedProjectId, lastUpdatedTimestamp } = useProjectContext();
  const [isProjectDropdownOpen, setIsProjectDropdownOpen] = useState(false);

  const navGroups: {
    category: string;
    items: {
      id: NavTab;
      label: string;
      icon: React.ComponentType<{ className?: string }>;
      count?: number;
      badge?: string;
      highlight?: boolean;
    }[];
  }[] = [
    {
      category: 'Core Operations',
      items: [
        {
          id: 'overview',
          label: 'Executive Overview',
          icon: LayoutDashboard,
        },
        {
          id: 'intelligence',
          label: 'Intelligence Center',
          icon: Sparkles,
          badge: 'AI ML',
          highlight: true
        },
        {
          id: 'projects',
          label: 'Project Corridors',
          icon: Layers,
        },
      ]
    },
    {
      category: 'Analytics & GIS',
      items: [
        {
          id: 'risk-analysis',
          label: 'Risk Analytics (SHAP)',
          icon: BrainCircuit,
        },
        {
          id: 'gis-map',
          label: 'Cadastral GIS Map',
          icon: MapPin,
          count: criticalCount,
        },
      ]
    },
    {
      category: 'Decision Support',
      items: [
        {
          id: 'simulator',
          label: 'What-If Delay Simulator',
          icon: SlidersHorizontal,
        },
        {
          id: 'inaction-cost',
          label: 'Financial Cost of Inaction',
          icon: TrendingDown,
        },
        {
          id: 'reports',
          label: 'Statutory Reports',
          icon: FileSpreadsheet,
        },
      ]
    }
  ];

  const getRiskBorder = (risk: number) => {
    if (risk >= 80) return 'border-rose-300 text-rose-700 bg-rose-50';
    if (risk >= 60) return 'border-amber-300 text-amber-700 bg-amber-50';
    return 'border-emerald-300 text-emerald-700 bg-emerald-50';
  };

  return (
    <aside 
      className={`hidden md:flex flex-col bg-slate-900 text-slate-200 border-r border-slate-800 transition-all duration-300 z-30 shrink-0 sticky top-0 h-screen ${
        isCollapsed ? 'w-[72px]' : 'w-64'
      }`}
    >
      {/* Top Tricolor Accent Line */}
      <div className="h-1 w-full flex opacity-90">
        <div className="h-full w-1/3 bg-[#FF9933]"></div>
        <div className="h-full w-1/3 bg-slate-200"></div>
        <div className="h-full w-1/3 bg-[#138808]"></div>
      </div>

      {/* Brand Header */}
      <div className="p-3.5 border-b border-slate-800 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5 overflow-hidden">
          <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-blue-600/20 border border-blue-500/40 text-blue-400 shadow-xs shrink-0">
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 19h18M4 19c0-6 3-10 8-10s8 4 8 10" strokeLinecap="round" />
              <path d="M8 19v-4M16 19v-4M12 9v10" strokeLinecap="round" />
              <circle cx="12" cy="5" r="2" fill="currentColor" />
            </svg>
            <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-emerald-400 rounded-full border border-slate-900"></div>
          </div>

          {!isCollapsed && (
            <div className="animate-fade-in overflow-hidden">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sm text-white tracking-tight leading-none">BhoomiSetu</span>
                <span className="text-[9px] font-mono font-semibold px-1 py-0.2 bg-slate-800 text-blue-300 rounded border border-slate-700">v2.4</span>
              </div>
              <div className="text-[10px] text-slate-400 truncate mt-0.5 font-normal">
                Land Acquisition ML EWS
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Collapse Toggle Button */}
        <button
          onClick={onToggleCollapse}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer shrink-0"
          title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? <PanelLeft className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
        </button>
      </div>

      {/* Quick Search / Command Button */}
      <div className="px-3 pt-3 pb-1">
        {isCollapsed ? (
          <button
            onClick={onOpenCommandPalette}
            className="w-full flex items-center justify-center p-2 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-700/60 transition cursor-pointer"
            title="Search or ⌘K"
          >
            <Search className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={onOpenCommandPalette}
            className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-700/60 transition text-xs cursor-pointer group"
          >
            <div className="flex items-center gap-2">
              <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-400 transition" />
              <span>Search or Command...</span>
            </div>
            <kbd className="text-[10px] font-mono text-slate-400 bg-slate-700 px-1.5 py-0.5 rounded border border-slate-600">⌘K</kbd>
          </button>
        )}
      </div>

      {/* Active Corridor Selector inside Sidebar */}
      {!isCollapsed && (
        <div className="px-3 py-2">
          <div className="relative">
            <button
              onClick={() => setIsProjectDropdownOpen(!isProjectDropdownOpen)}
              className="w-full flex items-center justify-between p-2 rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700/80 transition text-left cursor-pointer"
            >
              <div className="flex items-center gap-2 min-w-0 pr-1">
                <div className={`w-2 h-2 rounded-full shrink-0 ${
                  currentProject.overallRisk >= 80 ? 'bg-rose-500 animate-pulse' : currentProject.overallRisk >= 60 ? 'bg-amber-500' : 'bg-emerald-500'
                }`} />
                <div className="min-w-0">
                  <div className="text-[11px] font-bold text-slate-200 truncate">{currentProject.name}</div>
                  <div className="text-[9px] font-mono text-slate-400">{currentProject.district} &bull; {currentProject.code}</div>
                </div>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <span className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded border ${getRiskBorder(currentProject.overallRisk)}`}>
                  {currentProject.overallRisk}%
                </span>
                <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform ${isProjectDropdownOpen ? 'rotate-180' : ''}`} />
              </div>
            </button>

            {/* Dropdown list */}
            {isProjectDropdownOpen && (
              <div className="absolute left-0 right-0 top-full mt-1.5 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl py-1 z-50 max-h-60 overflow-y-auto divide-y divide-slate-800">
                <div className="px-3 py-1.5 text-[10px] font-bold font-mono text-slate-400 uppercase tracking-wider">
                  Select Project Corridor
                </div>
                {projects.map((p) => {
                  const isSelected = p.id === selectedProjectId;
                  return (
                    <button
                      key={p.id}
                      onClick={() => {
                        setSelectedProjectId(p.id);
                        setIsProjectDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 hover:bg-slate-800 transition flex items-center justify-between text-xs cursor-pointer ${
                        isSelected ? 'bg-blue-900/40 font-semibold text-blue-200' : 'text-slate-300'
                      }`}
                    >
                      <div className="min-w-0 pr-2">
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold truncate text-[11px]">{p.name}</span>
                          {isSelected && <Check className="w-3 h-3 text-blue-400 shrink-0" />}
                        </div>
                        <div className="text-[9px] font-mono text-slate-400">{p.district} &bull; {p.code}</div>
                      </div>
                      <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded ${
                        p.overallRisk >= 80 ? 'bg-rose-900/60 text-rose-300' : 'bg-slate-800 text-slate-300'
                      }`}>
                        {p.overallRisk}%
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Main Navigation Items */}
      <div className="flex-1 overflow-y-auto px-2 py-2 space-y-4">
        {navGroups.map((group) => (
          <div key={group.category}>
            {!isCollapsed && (
              <div className="px-3 mb-1.5 text-[9px] font-bold font-mono uppercase tracking-wider text-slate-300">
                {group.category}
              </div>
            )}

            <div className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;

                return (
                  <button
                    key={item.id}
                    id={`sidebar-nav-${item.id}`}
                    onClick={() => onSelectTab(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-150 cursor-pointer select-none relative group ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-900/30'
                        : item.highlight
                          ? 'text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30'
                          : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/70'
                    } ${isCollapsed ? 'justify-center px-0' : ''}`}
                    title={isCollapsed ? item.label : undefined}
                  >
                    <Icon className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 duration-150 ${
                      isActive 
                        ? 'text-white' 
                        : item.highlight 
                          ? 'text-amber-400' 
                          : 'text-slate-400 group-hover:text-slate-200'
                    }`} />

                    {!isCollapsed && (
                      <div className="flex-1 flex items-center justify-between min-w-0">
                        <span className="truncate tracking-tight">{item.label}</span>

                        {/* AI / ML Pulsing Badge */}
                        {item.badge && !isActive && (
                          <span className="flex items-center gap-1 px-1.5 py-0.2 rounded-full text-[9px] font-mono font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                            {item.badge}
                          </span>
                        )}

                        {/* Count Badge (e.g. Critical Alerts count) */}
                        {item.count !== undefined && item.count > 0 && (
                          <span
                            className={`text-[9px] font-bold font-mono px-1.5 py-0.2 rounded-full ${
                              isActive
                                ? 'bg-white text-blue-900'
                                : 'bg-rose-500/30 text-rose-300 border border-rose-500/40'
                            }`}
                          >
                            {item.count}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Left Active Indicator Bar */}
                    {isActive && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-amber-400 rounded-r-full" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Actions: Layout Toggle & Specs */}
      <div className="p-3 border-t border-slate-800 bg-slate-950/40 space-y-1">
        
        {/* Switch Nav Layout Button */}
        <button
          onClick={onToggleNavLayout}
          className={`w-full flex items-center gap-2 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 text-xs transition cursor-pointer ${
            isCollapsed ? 'justify-center' : 'justify-between'
          }`}
          title="Switch to Top Navigation Bar"
        >
          <div className="flex items-center gap-2">
            <LayoutTemplate className="w-4 h-4 text-slate-400" />
            {!isCollapsed && <span className="text-[11px]">Nav: Left Sidebar</span>}
          </div>
          {!isCollapsed && (
            <span className="text-[9px] font-mono text-blue-400 bg-blue-950/80 px-1.5 py-0.2 rounded border border-blue-800/60">
              Switch to Top
            </span>
          )}
        </button>

        {/* System Specs Modal trigger */}
        {onOpenArchitecture && (
          <button
            onClick={onOpenArchitecture}
            className={`w-full flex items-center gap-2 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 text-xs transition cursor-pointer ${
              isCollapsed ? 'justify-center' : ''
            }`}
            title="System Specifications & ML Pipeline"
          >
            <Cpu className="w-4 h-4 text-blue-400 shrink-0" />
            {!isCollapsed && <span className="text-[11px] truncate">System Specifications</span>}
          </button>
        )}

        {!isCollapsed && (
          <div className="pt-1 text-[9px] font-mono text-slate-300 text-center flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            <span>Bhoomi Cadastre ML Live</span>
          </div>
        )}
      </div>

    </aside>
  );
};
