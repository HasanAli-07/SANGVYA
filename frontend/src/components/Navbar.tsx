import React from 'react';
import { Building2, ShieldCheck, Bell } from 'lucide-react';
import type { Institution } from '../types/erp';

interface NavbarProps {
  institutions: Institution[];
  selectedInstitution: Institution;
  onSelectInstitution: (inst: Institution) => void;
  activeRole: string;
  onSelectRole: (role: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  institutions,
  selectedInstitution,
  onSelectInstitution,
  activeRole,
  onSelectRole,
}) => {
  return (
    <header className="bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Title */}
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-tr from-indigo-600 via-indigo-500 to-amber-500 p-2.5 rounded-xl shadow-lg shadow-indigo-500/20">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-white via-indigo-100 to-amber-200 bg-clip-text text-transparent">
                  SANGVYA
                </span>
                <span className="bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-semibold px-2 py-0.5 rounded-full">
                  SIH #26087
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">
                National Cooperative Capacity Building ERP
              </p>
            </div>
          </div>

          {/* Tenant Selector & User Role */}
          <div className="flex items-center space-x-4">
            {/* Institution Switcher */}
            <div className="relative">
              <label className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold mb-0.5">
                Active Tenant / Institute
              </label>
              <select
                value={selectedInstitution.id}
                onChange={(e) => {
                  const inst = institutions.find((i) => i.id === e.target.value);
                  if (inst) onSelectInstitution(inst);
                }}
                className="bg-slate-800 border border-slate-700 text-slate-100 text-xs rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-medium max-w-xs truncate"
              >
                {institutions.map((inst) => (
                  <option key={inst.id} value={inst.id}>
                    [{inst.tier}] {inst.code} ({inst.location})
                  </option>
                ))}
              </select>
            </div>

            {/* Role Switcher */}
            <div className="relative">
              <label className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold mb-0.5">
                Role Context
              </label>
              <select
                value={activeRole}
                onChange={(e) => onSelectRole(e.target.value)}
                className="bg-slate-800 border border-slate-700 text-amber-300 text-xs rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 font-semibold"
              >
                <option value="Central Ministry Admin">Ministry Admin (NCCT HQ)</option>
                <option value="Institutional Director">Institute Director</option>
                <option value="Training Coordinator">Training Coordinator</option>
                <option value="Society Admin (PACS/DCCB)">Society Admin (PACS/DCCB)</option>
                <option value="Hostel Warden">Hostel Warden</option>
              </select>
            </div>

            {/* Notifications & Badge */}
            <div className="flex items-center space-x-2 pl-2 border-l border-slate-800">
              <button className="relative p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-500 rounded-full ring-2 ring-slate-900"></span>
              </button>

              <div className="hidden sm:flex items-center space-x-2 bg-indigo-950/60 border border-indigo-800/50 text-indigo-200 text-xs px-3 py-1.5 rounded-lg">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="font-semibold">{selectedInstitution.tier} Tier</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
