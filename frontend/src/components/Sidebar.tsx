import React from 'react';
import { 
  Building2, 
  BookOpen, 
  UserPlus, 
  CalendarDays, 
  Hotel, 
  Layers,
  Camera,
  QrCode,
  Database,
  ShieldAlert
} from 'lucide-react';

export type ActiveModule = 'module1' | 'module2';
export type TabId = 
  // Module 1
  | 'tenant' | 'catalog' | 'nominations' | 'timetable' | 'hostel'
  // Module 2
  | 'face_kiosk' | 'dynamic_qr' | 'offline_sync' | 'exceptions';

interface SidebarProps {
  activeModule: ActiveModule;
  onModuleChange: (mod: ActiveModule) => void;
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
  stats: {
    totalCourses: number;
    totalNominations: number;
    conflictCount: number;
    hostelOccupancyPercent: number;
    bufferedSyncCount: number;
    pendingExceptionsCount: number;
  };
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeModule,
  onModuleChange,
  activeTab,
  onTabChange,
  stats,
}) => {
  const module1Items = [
    { id: 'tenant' as TabId, label: 'Multi-Tenant Governance', section: 'Section 1.1', icon: Building2, badge: 'APEX / RICM / ICM' },
    { id: 'catalog' as TabId, label: 'Course & Curriculum Catalog', section: 'Section 1.2', icon: BookOpen, count: stats.totalCourses },
    { id: 'nominations' as TabId, label: 'Bulk Society Nominations', section: 'Section 1.3', icon: UserPlus, count: stats.totalNominations },
    { id: 'timetable' as TabId, label: 'Conflict-Free Timetabling', section: 'Section 1.4', icon: CalendarDays, alertCount: stats.conflictCount > 0 ? stats.conflictCount : undefined },
    { id: 'hostel' as TabId, label: 'Hostel & Mess Operations', section: 'Section 1.5', icon: Hotel, badge: `${stats.hostelOccupancyPercent}% Occupied` },
  ];

  const module2Items = [
    { id: 'face_kiosk' as TabId, label: 'Edge Face Verification Kiosk', section: 'Section 2.1', icon: Camera, badge: '512-D Vector' },
    { id: 'dynamic_qr' as TabId, label: 'Geofenced Dynamic QR TOTP', section: 'Section 2.2', icon: QrCode, badge: '15s Refresh' },
    { id: 'offline_sync' as TabId, label: 'Offline Buffer & CRDT Sync', section: 'Section 2.3', icon: Database, alertCount: stats.bufferedSyncCount > 0 ? stats.bufferedSyncCount : undefined },
    { id: 'exceptions' as TabId, label: 'Attendance Overrides & Audit', section: 'Section 2.4', icon: ShieldAlert, count: stats.pendingExceptionsCount },
  ];

  const currentItems = activeModule === 'module1' ? module1Items : module2Items;

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 p-4 text-slate-300 flex flex-col justify-between min-h-[calc(100vh-4rem)]">
      <div className="space-y-5">
        {/* Module Switcher Buttons */}
        <div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2 px-1">
            Active Ecosystem Module
          </span>
          <div className="grid grid-cols-2 gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => {
                onModuleChange('module1');
                onTabChange('tenant');
              }}
              className={`py-2 px-2 text-[11px] font-bold rounded-lg transition text-center ${
                activeModule === 'module1'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Module 1: ERP
            </button>
            <button
              onClick={() => {
                onModuleChange('module2');
                onTabChange('face_kiosk');
              }}
              className={`py-2 px-2 text-[11px] font-bold rounded-lg transition text-center ${
                activeModule === 'module2'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Module 2: Attendance
            </button>
          </div>
        </div>

        {/* Navigation Section */}
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 px-2">
            <Layers className="w-4 h-4 text-indigo-400" />
            <span>
              {activeModule === 'module1' ? 'Module 1 Sections' : 'Module 2 Sections'}
            </span>
          </div>

          <nav className="space-y-1.5">
            {currentItems.map((item) => {
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
                      {item.alertCount}
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
      </div>

      {/* Footer Info */}
      <div className="text-[11px] text-slate-500 border-t border-slate-800 pt-3">
        <p className="font-semibold text-slate-400">SIH #26087</p>
        <p>Active Branch: <code className="text-indigo-400">feature/module-2</code></p>
      </div>
    </aside>
  );
};
