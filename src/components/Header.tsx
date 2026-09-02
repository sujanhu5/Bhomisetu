import React, { useState, useRef, useEffect } from 'react';
import { 
  Shield, 
  Bell, 
  Search, 
  Cpu, 
  CheckCircle2, 
  AlertTriangle, 
  ExternalLink, 
  X, 
  ChevronDown, 
  User,
  Command,
  Sparkles,
  Database,
  LayoutTemplate,
  PanelLeft,
  Menu
} from 'lucide-react';
import { Project, PriorityAlert, NavTab } from '../types';

interface HeaderProps {
  onOpenArchitecture: () => void;
  projects?: Project[];
  alerts?: PriorityAlert[];
  onSelectProject?: (projectId: string) => void;
  onOpenCommandPalette?: () => void;
  navLayout?: 'left' | 'top';
  onToggleNavLayout?: () => void;
  onOpenMobileNav?: () => void;
  activeTabTitle?: string;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenArchitecture,
  projects = [],
  alerts = [],
  onSelectProject,
  onOpenCommandPalette,
  navLayout = 'left',
  onToggleNavLayout,
  onOpenMobileNav,
  activeTabTitle
}) => {
  const [isAlertsOpen, setIsAlertsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const alertsRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (alertsRef.current && !alertsRef.current.contains(event.target as Node)) {
        setIsAlertsOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredProjects = searchQuery.trim()
    ? projects.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.code.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <header className="bg-slate-900 text-white border-b border-slate-800 shadow-xs relative z-20">
      {/* Top Tricolor Accent Bar (shown on header if in top nav mode or as top banner) */}
      {navLayout === 'top' && (
        <div className="h-1 w-full flex opacity-90">
          <div className="h-full w-1/3 bg-[#FF9933]"></div>
          <div className="h-full w-1/3 bg-slate-200"></div>
          <div className="h-full w-1/3 bg-[#138808]"></div>
        </div>
      )}

      <div className="px-4 sm:px-6 lg:px-8 py-2.5">
        <div className="flex items-center justify-between gap-3 sm:gap-4">
          
          {/* Left: Mobile Nav Button / Brand / Breadcrumb */}
          <div className="flex items-center gap-3">
            {/* Mobile Sidebar Hamburger (in left mode) */}
            {navLayout === 'left' && onOpenMobileNav && (
              <button
                onClick={onOpenMobileNav}
                className="md:hidden p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition cursor-pointer"
                title="Open Navigation"
              >
                <Menu className="w-4 h-4" />
              </button>
            )}

            {/* In top nav mode or on mobile, show the brand mark */}
            <div className={`flex items-center gap-2.5 ${navLayout === 'left' ? 'hidden md:flex' : 'flex'}`}>
              {navLayout === 'left' ? (
                <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                  <span className="text-slate-200 font-semibold">{activeTabTitle || 'Executive Portal'}</span>
                  <span>&bull;</span>
                  <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    Live EWS Active
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 text-blue-400 shadow-xs shrink-0">
                    <svg viewBox="0 0 24 24" className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 19h18M4 19c0-6 3-10 8-10s8 4 8 10" strokeLinecap="round" />
                      <path d="M8 19v-4M16 19v-4M12 9v10" strokeLinecap="round" />
                      <circle cx="12" cy="5" r="2" fill="currentColor" />
                    </svg>
                    <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-emerald-400 rounded-full border border-slate-900"></div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-base font-bold tracking-tight text-white flex items-center gap-2">
                        BhoomiSetu
                      </span>
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 font-mono">
                        RFCTLARR 2013
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Fallback Title if left sidebar is active */}
            {navLayout === 'left' && (
              <div className="md:hidden flex items-center gap-2">
                <span className="text-sm font-bold text-white">BhoomiSetu</span>
                <span className="text-[10px] text-slate-400">&bull; {activeTabTitle}</span>
              </div>
            )}
          </div>

          {/* Quick Search & Command Palette Bar */}
          <div className="relative hidden md:block flex-1 max-w-sm" ref={searchRef}>
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search corridors, parcels, stages or press ⌘K..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsSearchOpen(true);
                }}
                onFocus={() => setIsSearchOpen(true)}
                className="w-full bg-slate-800/90 border border-slate-700 rounded-lg pl-8 pr-12 py-1.5 text-xs text-slate-200 placeholder-slate-400 focus:outline-hidden focus:border-slate-500 transition"
              />
              
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                {searchQuery ? (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="text-slate-400 hover:text-white p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                ) : (
                  <button
                    onClick={onOpenCommandPalette}
                    className="text-[10px] font-mono text-slate-400 bg-slate-700/80 px-1.5 py-0.5 rounded border border-slate-600 hover:bg-slate-600 hover:text-slate-200 cursor-pointer"
                    title="Open Command Palette"
                  >
                    ⌘K
                  </button>
                )}
              </div>
            </div>

            {/* Search Results Dropdown */}
            {isSearchOpen && searchQuery.trim() && (
              <div className="absolute top-full left-0 right-0 mt-1.5 bg-slate-900 border border-slate-700 rounded-lg shadow-xl py-1 z-50 max-h-64 overflow-y-auto">
                {filteredProjects.length > 0 ? (
                  filteredProjects.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        if (onSelectProject) onSelectProject(p.id);
                        setIsSearchOpen(false);
                        setSearchQuery('');
                      }}
                      className="w-full text-left px-3 py-2 hover:bg-slate-800 transition flex items-center justify-between text-xs cursor-pointer"
                    >
                      <div>
                        <div className="font-semibold text-slate-200">{p.name}</div>
                        <div className="text-[10px] text-slate-400 font-mono">{p.district} &bull; {p.code}</div>
                      </div>
                      <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                        p.overallRiskLevel === 'critical' ? 'bg-rose-900/60 text-rose-300' : 'bg-slate-800 text-slate-300'
                      }`}>
                        {p.overallRisk}% Risk
                      </span>
                    </button>
                  ))
                ) : (
                  <div className="px-3 py-2 text-xs text-slate-400 text-center">
                    No matching land acquisition projects
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Header Controls */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            
            {/* Quick Command Palette Button for small screens */}
            {onOpenCommandPalette && (
              <button
                onClick={onOpenCommandPalette}
                className="flex md:hidden p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition cursor-pointer"
                title="Command Palette (⌘K)"
              >
                <Search className="w-4 h-4" />
              </button>
            )}

            {/* Layout Mode Switcher Toggle (Top vs Left Sidebar) */}
            {onToggleNavLayout && (
              <button
                onClick={onToggleNavLayout}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition cursor-pointer"
                title={`Switch layout to ${navLayout === 'left' ? 'Top Navigation Bar' : 'Left Sidebar'}`}
              >
                <LayoutTemplate className="w-3.5 h-3.5 text-blue-400" />
                <span className="hidden sm:inline">
                  {navLayout === 'left' ? 'Top Nav' : 'Left Nav'}
                </span>
              </button>
            )}

            {/* Model Specs / Architecture */}
            <button
              id="btn-architecture-modal"
              onClick={onOpenArchitecture}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition cursor-pointer"
              title="Inspect System Architecture & ML Specifications"
            >
              <Cpu className="w-3.5 h-3.5 text-blue-400" />
              <span className="hidden sm:inline">Specs</span>
            </button>

            {/* Notifications Bell with Dropdown */}
            <div className="relative" ref={alertsRef}>
              <button
                onClick={() => setIsAlertsOpen(!isAlertsOpen)}
                className="relative p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition cursor-pointer"
                title="View critical delay alerts"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-600 text-white rounded-full text-[9px] font-bold flex items-center justify-center font-mono">
                  8
                </span>
              </button>

              {/* Alerts Dropdown */}
              {isAlertsOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-white text-slate-900 rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-fade-in">
                  <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-rose-600" />
                      <span className="font-bold text-xs uppercase tracking-wider text-slate-800">Critical Priority Alerts</span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">8 Active</span>
                  </div>

                  <div className="max-h-72 overflow-y-auto divide-y divide-slate-100 text-xs">
                    <div className="p-3 hover:bg-slate-50 transition cursor-pointer" onClick={() => { if (onSelectProject) onSelectProject('nh-48-expansion'); setIsAlertsOpen(false); }}>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900">NH-48 Corridor Expansion</span>
                        <span className="text-[10px] font-mono text-rose-700 font-bold px-1.5 py-0.5 rounded bg-rose-50 border border-rose-200">82% Risk</span>
                      </div>
                      <div className="text-[11px] text-slate-600 mt-1">Section 77 Compensation stalled: 20 unverified title claims in Tumakuru.</div>
                      <div className="text-[10px] text-slate-400 mt-1 font-mono">Projected delay: +5.2 months</div>
                    </div>

                    <div className="p-3 hover:bg-slate-50 transition cursor-pointer" onClick={() => { if (onSelectProject) onSelectProject('tumakuru-industrial'); setIsAlertsOpen(false); }}>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900">Tumakuru Industrial Node</span>
                        <span className="text-[10px] font-mono text-rose-700 font-bold px-1.5 py-0.5 rounded bg-rose-50 border border-rose-200">76% Risk</span>
                      </div>
                      <div className="text-[11px] text-slate-600 mt-1">Section 31 R&amp;R package pending gram sabha quorum in Vasanthanarasapura.</div>
                      <div className="text-[10px] text-slate-400 mt-1 font-mono">Projected delay: +4.8 months</div>
                    </div>

                    <div className="p-3 hover:bg-slate-50 transition cursor-pointer" onClick={() => { if (onSelectProject) onSelectProject('sh-17-corridor'); setIsAlertsOpen(false); }}>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900">SH-17 Bypass Alignment</span>
                        <span className="text-[10px] font-mono text-amber-700 font-bold px-1.5 py-0.5 rounded bg-amber-50 border border-amber-200">64% Risk</span>
                      </div>
                      <div className="text-[11px] text-slate-600 mt-1">Section 19 Declaration publication deadline approaching in Ramanagara.</div>
                      <div className="text-[10px] text-slate-400 mt-1 font-mono">Projected delay: +3.1 months</div>
                    </div>
                  </div>

                  <div className="p-2 border-t border-slate-100 bg-slate-50 text-center">
                    <span className="text-[11px] font-medium text-slate-600">All alerts verified against statutory timeline rules</span>
                  </div>
                </div>
              )}
            </div>

            {/* Officer Profile Badge */}
            <div className="flex items-center gap-2 pl-2 border-l border-slate-800 text-xs">
              <div className="w-7 h-7 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300">
                <User className="w-3.5 h-3.5" />
              </div>
              <div className="text-left hidden lg:block">
                <div className="text-slate-200 font-semibold text-[11px] leading-tight">Revenue &amp; Land Cell</div>
                <div className="text-[10px] text-slate-400 font-mono">SLAO / District Authority</div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </header>
  );
};
