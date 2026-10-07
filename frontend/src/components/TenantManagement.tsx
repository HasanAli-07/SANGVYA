import React, { useState } from 'react';
import { Building2, MapPin, Users, Hotel, Layers, Plus, CheckCircle } from 'lucide-react';
import type { Institution } from '../types/erp';

interface TenantManagementProps {
  institutions: Institution[];
  selectedInstitution: Institution;
  onSelectInstitution: (inst: Institution) => void;
  onAddInstitution: (inst: Institution) => void;
}

export const TenantManagement: React.FC<TenantManagementProps> = ({
  institutions,
  selectedInstitution,
  onSelectInstitution,
  onAddInstitution,
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newInst, setNewInst] = useState<{
    name: string;
    code: string;
    location: string;
    state: string;
    tier: 'RICM' | 'ICM' | 'JCTC';
    capacity: number;
    hostelBeds: number;
  }>({
    name: '',
    code: '',
    location: '',
    state: '',
    tier: 'RICM',
    capacity: 300,
    hostelBeds: 100,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newInst.name || !newInst.code) return;
    onAddInstitution({
      id: `inst-${Date.now()}`,
      ...newInst,
      activeBatches: 0,
    });
    setShowAddModal(false);
    setNewInst({
      name: '',
      code: '',
      location: '',
      state: '',
      tier: 'RICM',
      capacity: 300,
      hostelBeds: 100,
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-slate-900 border border-slate-800 p-5 rounded-2xl gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="bg-indigo-500/20 text-indigo-300 text-xs font-bold px-2.5 py-1 rounded-md border border-indigo-500/30">
              Section 1.1
            </span>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Institutional Multi-Tenant Governance & Asset Registry
            </h2>
          </div>
          <p className="text-slate-400 text-xs mt-1">
            Provisions isolated tenant boundaries for VAMNICOM Pune, 5 RICMs, 14 ICMs, and ~109 Junior Training Centers.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition shadow-lg shadow-indigo-600/30"
        >
          <Plus className="w-4 h-4" />
          <span>Provision New Institute Tenant</span>
        </button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">Apex & Regional Centers</span>
            <Building2 className="w-4 h-4 text-indigo-400" />
          </div>
          <p className="text-2xl font-extrabold text-white">{institutions.length}</p>
          <p className="text-[11px] text-slate-500 mt-1">1 Apex + 5 RICMs + 14 ICMs</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">Total Trainee Capacity</span>
            <Users className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-extrabold text-white">
            {institutions.reduce((acc, i) => acc + i.capacity, 0).toLocaleString()}
          </p>
          <p className="text-[11px] text-slate-500 mt-1">Seats across active campuses</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">Residential Hostel Beds</span>
            <Hotel className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-2xl font-extrabold text-white">
            {institutions.reduce((acc, i) => acc + i.hostelBeds, 0).toLocaleString()}
          </p>
          <p className="text-[11px] text-slate-500 mt-1">Optimized residential inventory</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">Active Training Batches</span>
            <Layers className="w-4 h-4 text-purple-400" />
          </div>
          <p className="text-2xl font-extrabold text-white">
            {institutions.reduce((acc, i) => acc + i.activeBatches, 0)}
          </p>
          <p className="text-[11px] text-slate-500 mt-1">Synchronized training cohorts</p>
        </div>
      </div>

      {/* Grid of Tenants */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {institutions.map((inst) => {
          const isSelected = selectedInstitution.id === inst.id;
          return (
            <div
              key={inst.id}
              onClick={() => onSelectInstitution(inst)}
              className={`cursor-pointer bg-slate-900 border p-5 rounded-2xl transition-all duration-200 relative ${
                isSelected
                  ? 'border-indigo-500 ring-2 ring-indigo-500/20 shadow-xl bg-slate-900/90'
                  : 'border-slate-800 hover:border-slate-700 hover:bg-slate-850'
              }`}
            >
              {isSelected && (
                <span className="absolute top-4 right-4 flex items-center space-x-1 bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  <CheckCircle className="w-3 h-3 text-indigo-400" />
                  <span>Selected Tenant</span>
                </span>
              )}

              <div className="flex items-center space-x-3 mb-3">
                <div className={`p-2.5 rounded-xl font-bold text-xs ${
                  inst.tier === 'APEX' 
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' 
                    : inst.tier === 'RICM'
                    ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                    : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                }`}>
                  {inst.tier}
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white line-clamp-1">{inst.code}</h3>
                  <div className="flex items-center space-x-1 text-slate-400 text-xs">
                    <MapPin className="w-3 h-3 text-slate-500" />
                    <span>{inst.location}, {inst.state}</span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-300 line-clamp-2 mb-4 leading-relaxed font-medium">
                {inst.name}
              </p>

              <div className="border-t border-slate-800/80 pt-3 grid grid-cols-3 gap-2 text-center text-xs">
                <div className="bg-slate-800/50 p-2 rounded-lg">
                  <span className="text-[10px] text-slate-400 block font-semibold">Capacity</span>
                  <span className="font-bold text-white">{inst.capacity}</span>
                </div>

                <div className="bg-slate-800/50 p-2 rounded-lg">
                  <span className="text-[10px] text-slate-400 block font-semibold">Hostel Beds</span>
                  <span className="font-bold text-amber-300">{inst.hostelBeds}</span>
                </div>

                <div className="bg-slate-800/50 p-2 rounded-lg">
                  <span className="text-[10px] text-slate-400 block font-semibold">Batches</span>
                  <span className="font-bold text-indigo-300">{inst.activeBatches}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal for adding institution */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-lg rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">Provision New Institution Tenant</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Full Institution Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Institute of Cooperative Management (ICM)"
                  value={newInst.name}
                  onChange={(e) => setNewInst({ ...newInst, name: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Short Code</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. ICM-NAGPUR"
                    value={newInst.code}
                    onChange={(e) => setNewInst({ ...newInst, code: e.target.value.toUpperCase() })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Tier</label>
                  <select
                    value={newInst.tier}
                    onChange={(e) => setNewInst({ ...newInst, tier: e.target.value as 'RICM' | 'ICM' | 'JCTC' })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white"
                  >
                    <option value="RICM">RICM (Regional Institute)</option>
                    <option value="ICM">ICM (State Institute)</option>
                    <option value="JCTC">JCTC (Junior Training Centre)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">City / Location</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Nagpur"
                    value={newInst.location}
                    onChange={(e) => setNewInst({ ...newInst, location: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">State</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Maharashtra"
                    value={newInst.state}
                    onChange={(e) => setNewInst({ ...newInst, state: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Campus Intake Capacity</label>
                  <input
                    type="number"
                    min="50"
                    max="2000"
                    value={newInst.capacity}
                    onChange={(e) => setNewInst({ ...newInst, capacity: parseInt(e.target.value) || 0 })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Hostel Bed Capacity</label>
                  <input
                    type="number"
                    min="10"
                    max="1000"
                    value={newInst.hostelBeds}
                    onChange={(e) => setNewInst({ ...newInst, hostelBeds: parseInt(e.target.value) || 0 })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 font-semibold hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-500 shadow-md"
                >
                  Provision Tenant
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
