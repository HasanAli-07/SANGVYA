import React from 'react';
import { 
  Building2, 
  BookOpen, 
  UserPlus, 
  CalendarDays, 
  Hotel, 
  CheckCircle2, 
  Layers
} from 'lucide-react';

export type Module1Tab = 'tenant' | 'catalog' | 'nominations' | 'timetable' | 'hostel';

interface SidebarProps {
  activeTab: Module1Tab;
  onTabChange: (tab: Module1Tab) => void;
  stats: {
    totalCourses: number;
    totalNominations: number;
    conflictCount: number;
    hostelOccupancyPercent: number;
  };
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange, stats }) => {
  const navItems = [
    {
      id: 'tenant' as Module1Tab,
      label: 'Multi-Tenant Governance',
      section: 'Section 1.1',
      icon: Building2,
      badge: 'APEX / RICM / ICM',
    },
    {
      id: 'catalog' as Module1Tab,
      label: 'Course & Curriculum Catalog',
      section: 'Section 1.2',
      icon: BookOpen,
      count: stats.totalCourses,
    },
    {
      id: 'nominations' as Module1Tab,
      label: 'Bulk Society Nominations',
      section: 'Section 1.3',
      icon: UserPlus,
      count: stats.totalNominations,
    },
    {
      id: 'timetable' as Module1Tab,
      label: 'Conflict-Free Timetabling',
      section: 'Section 1.4',
      icon: CalendarDays,
      alertCount: stats.conflictCount > 0 ? stats.conflictCount : undefined,
    },
    {
      id: 'hostel' as Module1Tab,
      label: 'Hostel & Mess Operations',
      section: 'Section 1.5',
      icon: Hotel,
      badge: `${stats.hostelOccupancyPercent}% Occupied`,
    },
  ];

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 p-4 text-slate-300 flex flex-col justify-between min-h-[calc(100vh-4rem)]">
      <div className="space-y-6">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 px-3">
            <Layers className="w-4 h-4 text-indigo-400" />
            <span>Module 1 Sections</span>
          </div>

          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`w-full text-left flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-indigo-600 text-white font-semibold shadow-lg shadow-indigo-600/30'
                      : 'hover:bg-slate-800 text-slate-300 hover:text-white'
                  }`}
                >
                  <div className="flex items-center space-x-3 truncate">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-indigo-400'}`} />
                    <div className="truncate">
                      <span className="block truncate">{item.label}</span>
                      <span className={`text-[10px] block ${isActive ? 'text-indigo-200' : 'text-slate-500'}`}>
                        {item.section}
                      </span>
                    </div>
                  </div>

                  {item.count !== undefined && (
                    <span className={`text-[11px] px-2 py-0.5 rounded-full font-bold ${
                      isActive ? 'bg-indigo-700 text-white' : 'bg-slate-800 text-slate-300'
                    }`}>
                      {item.count}
                    </span>
                  )}

                  {item.alertCount !== undefined && (
                    <span className="bg-rose-500 text-white text-[11px] font-bold px-2 py-0.5 rounded-full animate-pulse">
                      {item.alertCount} Alert
                    </span>
                  )}

                  {item.badge && !item.count && !item.alertCount && (
                    <span className={`text-[10px] px-2 py-0.5 rounded-md font-semibold ${
                      isActive ? 'bg-indigo-700 text-white' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Operational Scope Banner */}
        <div className="bg-slate-800/80 border border-slate-700/60 rounded-xl p-3 text-xs space-y-2">
          <div className="flex items-center space-x-2 text-emerald-400 font-semibold">
            <CheckCircle2 className="w-4 h-4" />
            <span>Academic ERP Status</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Module 1 governs 20 NCCT institutions, ~109 JCTCs, and PACS computerization training.
          </p>
        </div>
      </div>

      {/* Footer Info */}
      <div className="text-[11px] text-slate-500 border-t border-slate-800 pt-3">
        <p className="font-semibold text-slate-400">SIH 2026 Baseline</p>
        <p>Branch: <code className="text-indigo-400">feature/module-1</code></p>
      </div>
    </aside>
  );
};
