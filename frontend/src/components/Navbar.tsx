import React from 'react';
import { Building2, Bell, Monitor, Tablet, Smartphone, Type } from 'lucide-react';
import type { Institution } from '../types/erp';
import { SahkarSurakshaPill } from './SahkarSurakshaPill';

interface NavbarProps {
  institutions: Institution[];
  selectedInstitution: Institution;
  onSelectInstitution: (inst: Institution) => void;
  activeRole: string;
  onSelectRole: (role: string) => void;
  deviceView: 'web' | 'tablet' | 'mobile';
  onChangeDeviceView: (view: 'web' | 'tablet' | 'mobile') => void;
  fontScale: 100 | 115 | 130;
  onChangeFontScale: (scale: 100 | 115 | 130) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  institutions,
  selectedInstitution,
  onSelectInstitution,
  activeRole,
  onSelectRole,
  deviceView,
  onChangeDeviceView,
  fontScale,
  onChangeFontScale,
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
                <span className="bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full">
                  SIH #26087
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">
                National Cooperative Capacity Building ERP & LMS
              </p>
            </div>
          </div>

          {/* Right Controls: Device Mode, Font Scale, Network Pill, Tenant & Role */}
          <div className="flex items-center space-x-3">
            {/* Sahkar Suraksha Pill */}
            <div className="hidden lg:block">
              <SahkarSurakshaPill />
            </div>

            {/* Device View Mode Switcher */}
            <div className="hidden sm:flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
              <button
                title="Web Desktop View"
                onClick={() => onChangeDeviceView('web')}
                className={`p-1.5 rounded-lg transition ${
                  deviceView === 'web' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Monitor className="w-4 h-4" />
              </button>
              <button
                title="Tablet View"
                onClick={() => onChangeDeviceView('tablet')}
                className={`p-1.5 rounded-lg transition ${
                  deviceView === 'tablet' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Tablet className="w-4 h-4" />
              </button>
              <button
                title="Mobile App Engine View"
                onClick={() => onChangeDeviceView('mobile')}
                className={`p-1.5 rounded-lg transition ${
                  deviceView === 'mobile' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Smartphone className="w-4 h-4" />
              </button>
            </div>

            {/* Typography Font Scale Toggle */}
            <div className="hidden md:flex items-center bg-slate-950 px-2 py-1 rounded-xl border border-slate-800 text-[10px] font-mono font-bold space-x-1">
              <Type className="w-3.5 h-3.5 text-slate-400" />
              <button
                onClick={() => onChangeFontScale(100)}
                className={`px-1.5 py-0.5 rounded ${fontScale === 100 ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
              >
                100%
              </button>
              <button
                onClick={() => onChangeFontScale(115)}
                className={`px-1.5 py-0.5 rounded ${fontScale === 115 ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
              >
                115%
              </button>
              <button
                onClick={() => onChangeFontScale(130)}
                className={`px-1.5 py-0.5 rounded ${fontScale === 130 ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
              >
                130%
              </button>
            </div>

            {/* Tenant Selector */}
            <div className="relative hidden xl:block">
              <select
                value={selectedInstitution.id}
                onChange={(e) => {
                  const inst = institutions.find((i) => i.id === e.target.value);
                  if (inst) onSelectInstitution(inst);
                }}
                className="bg-slate-800 border border-slate-700 text-slate-100 text-xs rounded-lg px-2.5 py-1.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-medium max-w-xs truncate"
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
              <select
                value={activeRole}
                onChange={(e) => onSelectRole(e.target.value)}
                className="bg-slate-800 border border-slate-700 text-amber-300 text-xs rounded-lg px-2.5 py-1.5 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 font-semibold"
              >
                <option value="Central Ministry Admin">Ministry Admin (NCCT HQ)</option>
                <option value="Institutional Director">Institute Director</option>
                <option value="PACS Secretary">PACS Secretary</option>
                <option value="Rural Trainee">Rural Trainee / Learner</option>
              </select>
            </div>

            {/* Notifications & Badge */}
            <div className="flex items-center space-x-2 border-l border-slate-800 pl-2">
              <button className="relative p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-500 rounded-full ring-2 ring-slate-900"></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
