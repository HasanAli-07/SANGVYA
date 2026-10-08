import React from 'react';
import { Building2, BookOpen, BarChart3, ShieldCheck, LogOut, User } from 'lucide-react';
import type { UserProfile } from '../../types/auth';

export type Role1TabId = 'r1_governance' | 'r1_catalog' | 'r1_mis' | 'r1_audit';

interface Role1SidebarProps {
  user: UserProfile;
  activeTab: Role1TabId;
  onSelectTab: (tab: Role1TabId) => void;
  onLogout: () => void;
  stats: {
    totalInstitutions: number;
    totalCourses: number;
    pacsComputerisedCount: number;
    auditBlocksCount: number;
  };
}

export const Role1Sidebar: React.FC<Role1SidebarProps> = ({
  user,
  activeTab,
  onSelectTab,
  onLogout,
  stats,
}) => {
  const navItems = [
    { id: 'r1_governance' as Role1TabId, label: 'Apex Governance & Tenants', section: 'Section 1.1', icon: Building2, count: stats.totalInstitutions },
    { id: 'r1_catalog' as Role1TabId, label: 'Course Accreditation & NOS', section: 'Section 1.2', icon: BookOpen, count: stats.totalCourses },
    { id: 'r1_mis' as Role1TabId, label: 'National PACS Computerization MIS', section: 'Section 7.1', icon: BarChart3, badge: `${stats.pacsComputerisedCount.toLocaleString()} PACS` },
    { id: 'r1_audit' as Role1TabId, label: 'Cryptographic Audit & DPDP', section: 'Section 7.3', icon: ShieldCheck, count: stats.auditBlocksCount },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 p-4 text-slate-800 flex flex-col justify-between min-h-[calc(100vh-4rem)] shadow-sm">
      <div className="space-y-6">
        {/* User Role Card */}
        <div className="bg-slate-900 text-white p-3.5 rounded-2xl space-y-1 shadow-md">
          <div className="flex items-center space-x-2">
            <User className="w-4 h-4 text-amber-400" />
            <span className="font-extrabold text-xs text-amber-300">ROLE 1 • APEX ADMIN</span>
          </div>
          <p className="font-bold text-xs truncate">{user.fullName}</p>
          <p className="text-[10px] text-slate-400 truncate">{user.institutionName}</p>
        </div>

        {/* Navigation Section */}
        <div className="space-y-2">
          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block px-2">
            Role 1 Subsystem Modules
          </span>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`w-full text-left flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-bold'
                      : 'hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <div className="flex items-center space-x-2.5 truncate">
                    <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-slate-950' : 'text-slate-500'}`} />
                    <div className="truncate">
                      <span className="block truncate">{item.label}</span>
                      <span className={`text-[10px] block font-mono ${isActive ? 'text-slate-900' : 'text-slate-400'}`}>
                        {item.section}
                      </span>
                    </div>
                  </div>

                  {item.count !== undefined && (
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                      isActive ? 'bg-slate-950 text-white' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {item.count}
                    </span>
                  )}

                  {item.badge && !item.count && (
                    <span className={`text-[9px] px-1.5 py-0.5 rounded font-mono font-bold ${
                      isActive ? 'bg-slate-950 text-amber-300' : 'bg-slate-100 text-slate-600'
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

      {/* Logout Footer */}
      <div className="border-t border-slate-100 pt-3">
        <button
          onClick={onLogout}
          className="w-full text-left flex items-center space-x-2 px-3 py-2 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 transition"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out / Change Role</span>
        </button>
      </div>
    </aside>
  );
};
