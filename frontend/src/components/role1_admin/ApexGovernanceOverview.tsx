import React, { useState } from 'react';
import { Building2, Plus, ShieldCheck, CheckCircle2, Users, Layers } from 'lucide-react';
import { LightCard } from '../light_ui/LightCard';
import { LightButton } from '../light_ui/LightButton';
import { LightBadge } from '../light_ui/LightBadge';
import type { Institution } from '../../types/erp';

interface ApexGovernanceOverviewProps {
  institutions: Institution[];
  onAddInstitution: (inst: Institution) => void;
}

export const ApexGovernanceOverview: React.FC<ApexGovernanceOverviewProps> = ({
  institutions,
  onAddInstitution,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('Sub-Regional Cooperative Training Center');
  const [code, setCode] = useState('JCTC-MH-SATARA');
  const [tier, setTier] = useState<Institution['tier']>('ICM');
  const [state, setState] = useState('Maharashtra');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    onAddInstitution({
      id: `inst-${Date.now()}`,
      name,
      code,
      tier,
      state,
      district: 'Satara',
      location: `${state} Zone`,
      adminName: 'Director Admin',
      contactPhone: '+91 9822001122',
      studentCapacity: 450,
      activeCoursesCount: 8,
    });
    setShowModal(false);
  };

  return (
    <div className="space-y-6 text-slate-900">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white border border-slate-200 p-5 rounded-2xl gap-4 shadow-sm">
        <div>
          <div className="flex items-center space-x-2">
            <span className="bg-amber-100 text-amber-900 text-xs font-extrabold px-2.5 py-1 rounded-md border border-amber-300">
              Role 1 • Central Ministry / Apex Admin
            </span>
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
              Apex Multi-Tenant Governance & Institution Registry
            </h2>
          </div>
          <p className="text-slate-500 text-xs mt-1">
            Governs NCCT Apex Headquarters, VAMNICOM, 5 Regional Institutes (RICMs), 14 Institutes (ICMs), and Junior Cooperative Training Centers (JCTCs).
          </p>
        </div>

        <LightButton
          variant="saffron"
          onClick={() => setShowModal(true)}
          icon={<Plus className="w-4 h-4" />}
        >
          Add Apex Institute
        </LightButton>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <LightCard className="space-y-1">
          <span className="text-xs text-slate-500 font-medium">Total Registered Institutions</span>
          <div className="text-2xl font-extrabold text-slate-900">{institutions.length}</div>
          <span className="text-[10px] text-emerald-600 font-bold font-mono">1 Apex + 5 RICMs + 14 ICMs</span>
        </LightCard>

        <LightCard className="space-y-1">
          <span className="text-xs text-slate-500 font-medium">Apex Seat Capacity</span>
          <div className="text-2xl font-extrabold text-amber-600 font-mono">
            {institutions.reduce((acc, i) => acc + i.studentCapacity, 0).toLocaleString()} Seats
          </div>
          <span className="text-[10px] text-slate-400 font-mono">Across All 20 Units</span>
        </LightCard>

        <LightCard className="space-y-1">
          <span className="text-xs text-slate-500 font-medium">Active NOS Courses</span>
          <div className="text-2xl font-extrabold text-slate-900 font-mono">148 Courses</div>
          <span className="text-[10px] text-slate-400 font-mono">NCCT Approved</span>
        </LightCard>

        <LightCard className="space-y-1">
          <span className="text-xs text-slate-500 font-medium">Active Tenant Status</span>
          <div className="text-2xl font-extrabold text-emerald-600 font-mono">100% Online</div>
          <span className="text-[10px] text-emerald-700 font-bold font-mono">Isolated Schemas Verified</span>
        </LightCard>
      </div>

      {/* Institution Table */}
      <LightCard className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-sm text-slate-900 flex items-center space-x-2">
            <Building2 className="w-4 h-4 text-amber-600" />
            <span>Apex Institution Directory & Multitenancy Matrix</span>
          </h3>
          <LightBadge variant="navy">{institutions.length} Units</LightBadge>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-semibold text-[11px]">
                <th className="py-2.5 px-3">Tier</th>
                <th className="py-2.5 px-3">Institute Name & Code</th>
                <th className="py-2.5 px-3">Location & State</th>
                <th className="py-2.5 px-3">Director Admin</th>
                <th className="py-2.5 px-3 text-right">Student Capacity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {institutions.map((inst) => (
                <tr key={inst.id} className="hover:bg-slate-50 transition">
                  <td className="py-3 px-3">
                    <LightBadge variant={inst.tier === 'APEX' ? 'saffron' : inst.tier === 'RICM' ? 'navy' : 'emerald'}>
                      {inst.tier}
                    </LightBadge>
                  </td>
                  <td className="py-3 px-3">
                    <span className="font-bold text-slate-900 block">{inst.name}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{inst.code}</span>
                  </td>
                  <td className="py-3 px-3 text-slate-600">{inst.location}, {inst.state}</td>
                  <td className="py-3 px-3 text-slate-700">{inst.adminName}</td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-slate-900">
                    {inst.studentCapacity} Seats
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </LightCard>

      {/* Add Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white border border-slate-200 w-full max-w-md rounded-2xl p-6 shadow-2xl space-y-4 text-xs">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Register Apex Institution</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-900">
                ✕
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Institute Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Code</label>
                  <input
                    type="text"
                    required
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-slate-900 font-mono"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Governance Tier</label>
                  <select
                    value={tier}
                    onChange={(e) => setTier(e.target.value as Institution['tier'])}
                    className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-slate-900"
                  >
                    <option value="RICM">RICM (Regional Institute)</option>
                    <option value="ICM">ICM (Institute of Coop Mgmt)</option>
                    <option value="JCTC">JCTC (Junior Center)</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-3 border-t border-slate-100">
                <LightButton variant="outline" type="button" onClick={() => setShowModal(false)}>
                  Cancel
                </LightButton>
                <LightButton variant="saffron" type="submit">
                  Save & Issue Multitenant Credentials
                </LightButton>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
