import React, { useState, useRef, useEffect } from 'react';
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
  Activity,
  Compass,
  Menu,
  X,
  Search,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  LayoutTemplate,
  PanelLeft
} from 'lucide-react';
import { NavTab, Project } from '../types';
import { useProjectContext } from '../context/ProjectContext';

interface NavbarProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  criticalCount?: number;
  onOpenCommandPalette?: () => void;
  navLayout?: 'left' | 'top';
  onToggleNavLayout?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  criticalCount = 8,
  onOpenCommandPalette,
  navLayout = 'top',
  onToggleNavLayout
}) => {
  const { projects, selectedProjectId, currentProject, setSelectedProjectId, lastUpdatedTimestamp } = useProjectContext();
  const [isProjectDropdownOpen, setIsProjectDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsProjectDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Check scroll container overflow
  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -240 : 240;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      setTimeout(checkScroll, 300);
    }
  };

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
      category: 'Core',
      items: [
        {
          id: 'overview',
          label: 'Overview',
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
          label: 'Projects',
          icon: Layers,
        },
      ]
    },
    {
      category: 'Analytics',
      items: [
        {
          id: 'risk-analysis',
          label: 'Risk Analytics',
          icon: BrainCircuit,
        },
        {
          id: 'gis-map',
          label: 'GIS Map',
          icon: MapPin,
          count: criticalCount,
        },
      ]
    },
    {
      category: 'Decisions',
      items: [
        {
          id: 'simulator',
          label: 'What-If Simulator',
          icon: SlidersHorizontal,
        },
        {
          id: 'inaction-cost',
          label: 'Financial Impact',
          icon: TrendingDown,
        },
        {
          id: 'reports',
          label: 'Reports',
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
    <nav className="bg-white/95 backdrop-blur-md border-b border-slate-200/90 sticky top-0 z-30 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Main Nav Bar Content */}
        <div className="flex items-center justify-between h-14 gap-2 sm:gap-4">
          
          {/* Left: Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Center/Left: Desktop Navigation Tabs with Smooth Horizontal Carousel */}
          <div className="relative flex-1 hidden lg:flex items-center min-w-0">
            
            {/* Left Scroll Cue */}
            {canScrollLeft && (
              <button
                onClick={() => scroll('left')}
                className="absolute left-0 z-10 w-7 h-7 rounded-full bg-white/95 shadow-md border border-slate-200 flex items-center justify-center text-slate-700 hover:text-slate-900 cursor-pointer -ml-1"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            )}

            {/* Scrollable Nav Container */}
            <div 
              ref={scrollContainerRef}
              onScroll={checkScroll}
              className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 px-1 scroll-smooth w-full"
            >
              {navGroups.map((group, groupIdx) => (
                <React.Fragment key={group.category}>
                  {groupIdx > 0 && (
                    <div className="h-5 w-px bg-slate-200 mx-1 shrink-0" />
                  )}

                  <div className="flex items-center gap-1 shrink-0">
                    {group.items.map((item) => {
                      const Icon = item.icon;
                      const isActive = activeTab === item.id;
                      
                      return (
                        <button
                          key={item.id}
                          id={`nav-tab-${item.id}`}
                          onClick={() => {
                            onSelectTab(item.id);
                            setIsMobileMenuOpen(false);
                          }}
                          className={`relative group flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 cursor-pointer select-none shrink-0 ${
                            isActive
                              ? 'bg-slate-900 text-white shadow-xs'
                              : item.highlight
                                ? 'text-amber-900 bg-amber-50/80 hover:bg-amber-100/90 border border-amber-200/70 hover:shadow-2xs'
                                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                          }`}
                        >
                          <Icon className={`w-3.5 h-3.5 transition-transform group-hover:scale-110 duration-150 ${
                            isActive 
                              ? 'text-amber-400' 
                              : item.highlight 
                                ? 'text-amber-600' 
                                : 'text-slate-400 group-hover:text-slate-600'
                          }`} />
                          
                          <span className="tracking-tight whitespace-nowrap">{item.label}</span>

                          {/* AI / ML Pulsing Badge */}
                          {item.badge && !isActive && (
                            <span className="flex items-center gap-1 px-1.5 py-0.2 rounded-full text-[9px] font-mono font-bold bg-amber-200 text-amber-900 border border-amber-300">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                              {item.badge}
                            </span>
                          )}

                          {/* Count Badge (e.g. Critical Alerts count) */}
                          {item.count !== undefined && item.count > 0 && (
                            <span
                              className={`text-[10px] font-bold font-mono px-1.5 py-0.2 rounded-full transition-colors ${
                                isActive
                                  ? 'bg-rose-500 text-white'
                                  : 'bg-rose-100 text-rose-700'
                              }`}
                            >
                              {item.count}
                            </span>
                          )}

                          {/* Subtle active underline indicator */}
                          {isActive && (
                            <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-amber-400 rounded-full" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </React.Fragment>
              ))}
            </div>

            {/* Right Scroll Cue */}
            {canScrollRight && (
              <button
                onClick={() => scroll('right')}
                className="absolute right-0 z-10 w-7 h-7 rounded-full bg-white/95 shadow-md border border-slate-200 flex items-center justify-center text-slate-700 hover:text-slate-900 cursor-pointer -mr-1"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            )}

          </div>

          {/* Right Side: Active Project Quick Switcher, Layout Toggle & Commands */}
          <div className="flex items-center gap-2 shrink-0">
            
            {/* Quick Command Trigger */}
            {onOpenCommandPalette && (
              <button
                onClick={onOpenCommandPalette}
                className="hidden xl:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-50 text-xs font-medium transition cursor-pointer"
                title="Quick search (Ctrl+K)"
              >
                <Search className="w-3.5 h-3.5" />
                <span className="text-[11px] font-mono text-slate-400 bg-slate-100 px-1.5 py-0.2 rounded border border-slate-200">⌘K</span>
              </button>
            )}

            {/* Layout Mode Toggle (Switch to Left Sidebar) */}
            {onToggleNavLayout && (
              <button
                onClick={onToggleNavLayout}
                className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-900 text-xs font-medium transition cursor-pointer"
                title="Switch to Left Sidebar layout"
              >
                <PanelLeft className="w-3.5 h-3.5 text-blue-600" />
                <span className="hidden md:inline text-[11px] font-semibold">Sidebar Mode</span>
              </button>
            )}

            {/* Active Corridor Selector Pill Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsProjectDropdownOpen(!isProjectDropdownOpen)}
                className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-white hover:border-slate-300 text-slate-800 text-xs font-semibold transition shadow-2xs cursor-pointer"
                title="Switch active project corridor"
              >
                <div className="flex items-center gap-1.5 max-w-[140px] sm:max-w-[180px] md:max-w-[220px] truncate">
                  <div className={`w-2 h-2 rounded-full shrink-0 ${
                    currentProject.overallRisk >= 80 ? 'bg-rose-500 animate-pulse' : currentProject.overallRisk >= 60 ? 'bg-amber-500' : 'bg-emerald-500'
                  }`} />
                  <span className="truncate text-slate-900">{currentProject.name}</span>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <span className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded border ${getRiskBorder(currentProject.overallRisk)}`}>
                    {currentProject.overallRisk}%
                  </span>
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${isProjectDropdownOpen ? 'rotate-180' : ''}`} />
                </div>
              </button>

              {/* Corridor Selection Menu Dropdown */}
              {isProjectDropdownOpen && (
                <div className="absolute right-0 top-full mt-1.5 w-80 sm:w-96 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-fade-in divide-y divide-slate-100">
                  
                  <div className="px-3.5 py-2 flex items-center justify-between bg-slate-50/70">
                    <div className="flex items-center gap-1.5 text-slate-700 font-bold text-xs">
                      <Building2 className="w-3.5 h-3.5 text-slate-500" />
                      <span>Select Project Corridor</span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-500">
                      {projects.length} Active Corridors
                    </span>
                  </div>

                  <div className="max-h-72 overflow-y-auto py-1 divide-y divide-slate-50">
                    {projects.map((proj) => {
                      const isSelected = proj.id === selectedProjectId;
                      const risk = proj.overallRisk;
                      return (
                        <button
                          key={proj.id}
                          onClick={() => {
                            setSelectedProjectId(proj.id);
                            setIsProjectDropdownOpen(false);
                          }}
                          className={`w-full text-left px-3.5 py-2.5 hover:bg-slate-50 transition flex items-center justify-between text-xs cursor-pointer ${
                            isSelected ? 'bg-blue-50/60 font-semibold' : ''
                          }`}
                        >
                          <div className="min-w-0 pr-2">
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-[10px] font-bold text-slate-500 bg-slate-100 px-1.5 py-0.2 rounded border border-slate-200">
                                {proj.code}
                              </span>
                              <span className="font-bold text-slate-900 truncate">
                                {proj.name}
                              </span>
                              {isSelected && (
                                <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                              )}
                            </div>

                            <div className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-2">
                              <span>{proj.district}</span>
                              <span>&bull;</span>
                              <span className="capitalize">{proj.currentStageId} Stage</span>
                              <span>&bull;</span>
                              <span>{proj.totalParcels} Parcels</span>
                            </div>
                          </div>

                          <div className="text-right shrink-0">
                            <div className={`font-mono text-xs font-extrabold px-2 py-0.5 rounded-full ${
                              risk >= 80 ? 'bg-rose-100 text-rose-800' : risk >= 60 ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                            }`}>
                              {risk}%
                            </div>
                            <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                              +{proj.expectedDelayMonths}m delay
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <div className="px-3.5 py-2 bg-slate-50/90 flex items-center justify-between text-[11px] text-slate-500">
                    <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-700">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      Cadastre Verified
                    </span>
                    <span className="font-mono text-[10px] text-slate-400">
                      Sync: {lastUpdatedTimestamp}
                    </span>
                  </div>

                </div>
              )}
            </div>

          </div>

        </div>

      </div>

      {/* Mobile Drawer / Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-2 pb-4 shadow-lg animate-fade-in">
          <div className="space-y-4">
            {navGroups.map((group) => (
              <div key={group.category}>
                <div className="text-[10px] font-bold font-mono uppercase tracking-wider text-slate-400 mb-1 px-2">
                  {group.category}
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          onSelectTab(item.id);
                          setIsMobileMenuOpen(false);
                        }}
                        className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition cursor-pointer ${
                          isActive
                            ? 'bg-slate-900 text-white'
                            : item.highlight
                              ? 'bg-amber-50 text-amber-900 border border-amber-200'
                              : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-500'}`} />
                          <span className="truncate">{item.label}</span>
                        </div>
                        {item.count !== undefined && item.count > 0 && (
                          <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-rose-500 text-white">
                            {item.count}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};
