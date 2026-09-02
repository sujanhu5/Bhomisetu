import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  Layers, 
  MapPin, 
  SlidersHorizontal, 
  FileSpreadsheet, 
  Sparkles, 
  BrainCircuit, 
  TrendingDown, 
  Cpu, 
  ArrowRight, 
  X, 
  Building2,
  FileText,
  CornerDownLeft
} from 'lucide-react';
import { NavTab, IntelligenceSubTab, Project } from '../types';

interface CommandPaletteModalProps {
  isOpen: boolean;
  onClose: () => void;
  projects: Project[];
  onSelectProject: (projectId: string) => void;
  onNavigateToTab: (tab: NavTab) => void;
  onNavigateToIntelligence?: (projectId: string, subTab?: IntelligenceSubTab) => void;
  onOpenArchitecture?: () => void;
}

interface CommandItem {
  id: string;
  category: 'Corridors' | 'Intelligence' | 'Decision Engines' | 'Statutory RFCTLARR';
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  action: () => void;
}

export const CommandPaletteModal: React.FC<CommandPaletteModalProps> = ({
  isOpen,
  onClose,
  projects,
  onSelectProject,
  onNavigateToTab,
  onNavigateToIntelligence,
  onOpenArchitecture
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Global hotkey listener (Escape to close, Cmd+K to open handled in parent)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Build command list
  const commands: CommandItem[] = [
    // Intelligence Sub-tools
    {
      id: 'cmd-intel-trajectory',
      category: 'Intelligence',
      title: 'Temporal Risk Trajectory & Early Warning',
      subtitle: '90-day retrospective and 60-day predictive risk curves',
      icon: Sparkles,
      badge: 'ML Engine',
      action: () => {
        if (onNavigateToIntelligence) onNavigateToIntelligence('nh-48-expansion', 'trajectory');
        else onNavigateToTab('intelligence');
        onClose();
      }
    },
    {
      id: 'cmd-intel-gis',
      category: 'Intelligence',
      title: 'Cadastral Parcel GIS Heatmap & Micro-Delay',
      subtitle: 'Interactive village-level survey parcel inspection',
      icon: MapPin,
      badge: 'Spatial GIS',
      action: () => {
        if (onNavigateToIntelligence) onNavigateToIntelligence('nh-48-expansion', 'parcels');
        else onNavigateToTab('intelligence');
        onClose();
      }
    },
    {
      id: 'cmd-intel-doc',
      category: 'Intelligence',
      title: 'Document AI & OCR Ingestion',
      subtitle: 'Extract Gazette notifications, Solatium claims, Court orders',
      icon: FileText,
      badge: 'NLP OCR',
      action: () => {
        if (onNavigateToIntelligence) onNavigateToIntelligence('nh-48-expansion', 'documents');
        else onNavigateToTab('intelligence');
        onClose();
      }
    },
    {
      id: 'cmd-intel-optimal',
      category: 'Intelligence',
      title: 'Optimal Statutory Interventions Engine',
      subtitle: 'Combinatorial optimization for cost, delay, and legal ROI',
      icon: SlidersHorizontal,
      badge: 'Optimizer',
      action: () => {
        if (onNavigateToIntelligence) onNavigateToIntelligence('nh-48-expansion', 'interventions');
        else onNavigateToTab('intelligence');
        onClose();
      }
    },

    // Decision Modules
    {
      id: 'cmd-view-overview',
      category: 'Decision Engines',
      title: 'Executive Portfolio Overview',
      subtitle: 'Cross-corridor KPI benchmarks and priority critical alerts',
      icon: Layers,
      action: () => { onNavigateToTab('overview'); onClose(); }
    },
    {
      id: 'cmd-view-simulator',
      category: 'Decision Engines',
      title: 'What-If Delay Simulator',
      subtitle: 'Simulate legal objections, solatium escalations, and timeline risk',
      icon: SlidersHorizontal,
      action: () => { onNavigateToTab('simulator'); onClose(); }
    },
    {
      id: 'cmd-view-cost',
      category: 'Decision Engines',
      title: 'Financial Cost of Inaction & Escalation Matrix',
      subtitle: 'Compounded idle capital, daily cost escalation, and contractor claims',
      icon: TrendingDown,
      action: () => { onNavigateToTab('inaction-cost'); onClose(); }
    },
    {
      id: 'cmd-view-reports',
      category: 'Decision Engines',
      title: 'Statutory Reports & Cabinet Notes Generator',
      subtitle: 'Export executive memos, SLAO compliance sheets, and gazette summaries',
      icon: FileSpreadsheet,
      action: () => { onNavigateToTab('reports'); onClose(); }
    },
    {
      id: 'cmd-view-specs',
      category: 'Decision Engines',
      title: 'System Architecture & ML Specifications',
      subtitle: 'TreeSHAP, DiCE counterfactuals, Bhoomi cadastre sync engine specs',
      icon: Cpu,
      action: () => { if (onOpenArchitecture) onOpenArchitecture(); onClose(); }
    },

    // All Project Corridors
    ...projects.map((p) => ({
      id: `cmd-project-${p.id}`,
      category: 'Corridors' as const,
      title: `${p.name} (${p.code})`,
      subtitle: `${p.district} &bull; Stage: ${p.currentStageId.toUpperCase()} &bull; ${p.overallRisk}% Risk &bull; +${p.expectedDelayMonths}m delay`,
      icon: Building2,
      badge: `${p.overallRisk}% Risk`,
      action: () => {
        onSelectProject(p.id);
        onClose();
      }
    }))
  ];

  // Filter commands by query
  const filteredCommands = query.trim()
    ? commands.filter(c => 
        c.title.toLowerCase().includes(query.toLowerCase()) ||
        c.subtitle.toLowerCase().includes(query.toLowerCase()) ||
        c.category.toLowerCase().includes(query.toLowerCase())
      )
    : commands;

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % Math.max(1, filteredCommands.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + filteredCommands.length) % Math.max(1, filteredCommands.length));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        filteredCommands[selectedIndex].action();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
      <div 
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[80vh] animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="relative border-b border-slate-200 p-4 bg-slate-50/70 flex items-center gap-3">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a corridor name, RFCTLARR stage, GIS tool, or report..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            className="w-full bg-transparent text-sm sm:text-base text-slate-900 placeholder-slate-400 focus:outline-hidden font-medium"
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600 rounded-md"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button 
            onClick={onClose}
            className="px-2 py-1 text-xs font-mono text-slate-400 bg-white border border-slate-200 rounded-md shadow-2xs hover:bg-slate-50 cursor-pointer"
          >
            ESC
          </button>
        </div>

        {/* Results List */}
        <div 
          ref={listRef}
          className="flex-1 overflow-y-auto p-2 divide-y divide-slate-100 max-h-[60vh]"
        >
          {filteredCommands.length > 0 ? (
            filteredCommands.map((cmd, idx) => {
              const Icon = cmd.icon;
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={cmd.id}
                  onClick={() => cmd.action()}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full text-left p-3 rounded-xl transition cursor-pointer flex items-center justify-between gap-3 ${
                    isSelected ? 'bg-blue-50/80 text-blue-950 border border-blue-200/80' : 'hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <div className={`p-2 rounded-lg shrink-0 mt-0.5 ${
                      isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900 truncate">
                          {cmd.title}
                        </span>
                        {cmd.badge && (
                          <span className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded-full ${
                            cmd.badge.includes('Risk') && parseInt(cmd.badge) >= 80 
                              ? 'bg-rose-100 text-rose-800' 
                              : 'bg-slate-200 text-slate-700'
                          }`}>
                            {cmd.badge}
                          </span>
                        )}
                      </div>
                      <div 
                        className="text-[11px] text-slate-500 truncate mt-0.5"
                        dangerouslySetInnerHTML={{ __html: cmd.subtitle }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[10px] font-mono text-slate-400 px-2 py-0.5 rounded bg-slate-100 border border-slate-200 hidden sm:inline-block">
                      {cmd.category}
                    </span>
                    {isSelected && (
                      <CornerDownLeft className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="py-12 text-center text-slate-400">
              <Search className="w-8 h-8 mx-auto text-slate-300 mb-2" />
              <div className="text-sm font-semibold text-slate-600">No matching tools or corridors found</div>
              <div className="text-xs text-slate-400 mt-1">Try searching for "NH-48", "GIS", "Simulator", or "Intervention"</div>
            </div>
          )}
        </div>

        {/* Footer Quick Shortcuts */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 font-mono text-[11px]">
              <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-300 shadow-2xs">↑</kbd>
              <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-300 shadow-2xs">↓</kbd>
              Navigate
            </span>
            <span className="flex items-center gap-1 font-mono text-[11px]">
              <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-300 shadow-2xs">↵</kbd>
              Select
            </span>
          </div>
          <span className="font-mono text-[10px] text-slate-400">
            RFCTLARR Act 2013 Decision Engine
          </span>
        </div>

      </div>
    </div>
  );
};
