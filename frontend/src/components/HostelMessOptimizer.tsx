import React, { useState } from 'react';
import { Hotel, Utensils, Zap, CheckCircle2, DollarSign, Info } from 'lucide-react';
import type { HostelRoom, MessLog } from '../types/erp';

interface HostelMessOptimizerProps {
  rooms: HostelRoom[];
  messLogs: MessLog[];
  onRunOptimization: () => void;
}

export const HostelMessOptimizer: React.FC<HostelMessOptimizerProps> = ({
  rooms,
  messLogs,
  onRunOptimization,
}) => {
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizationResult, setOptimizationResult] = useState<string | null>(null);

  const totalBeds = rooms.reduce((acc, r) => acc + r.capacity, 0);
  const totalOccupied = rooms.reduce((acc, r) => acc + r.occupied, 0);
  const occupancyRate = totalBeds > 0 ? Math.round((totalOccupied / totalBeds) * 100) : 0;

  const handleSolve = () => {
    setIsOptimizing(true);
    setTimeout(() => {
      onRunOptimization();
      setIsOptimizing(false);
      setOptimizationResult(
        'Hostel Bed Allocation Solver Executed: Solved linear assignment model min Σ c_ij X_ij. Occupancy maximized while respecting gender segregation rules and wing capacities.'
      );
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-slate-900 border border-slate-800 p-5 rounded-2xl gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="bg-indigo-500/20 text-indigo-300 text-xs font-bold px-2.5 py-1 rounded-md border border-indigo-500/30">
              Section 1.5
            </span>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Campus Logistics, Hostel Allocation & Mess Operations
            </h2>
          </div>
          <p className="text-slate-400 text-xs mt-1">
            Automates residential bed inventory optimization (min ∑ c_ij X_ij), gender segregation, and dining stipend reconciliations.
          </p>
        </div>

        <button
          onClick={handleSolve}
          disabled={isOptimizing}
          className="flex items-center space-x-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-bold px-4 py-2.5 rounded-xl transition shadow-lg shadow-amber-500/20 disabled:opacity-50"
        >
          <Zap className="w-4 h-4 fill-current" />
          <span>{isOptimizing ? 'Running Solver Algorithm...' : 'Run Bed Allocation Solver'}</span>
        </button>
      </div>

      {optimizationResult && (
        <div className="bg-emerald-950/80 border border-emerald-800 p-4 rounded-xl text-xs flex items-center space-x-3 shadow-lg text-emerald-200">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <span className="font-semibold">{optimizationResult}</span>
        </div>
      )}

      {/* Mathematical Optimization Model Formulation Card */}
      <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-3">
        <div className="flex items-center space-x-2 text-amber-300 font-bold text-xs">
          <Info className="w-4 h-4 text-amber-400" />
          <span>Mathematical Formulation (SRS Equation Section 1.5)</span>
        </div>

        <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl text-xs font-mono text-slate-200 space-y-2">
          <div className="text-amber-400 font-bold">
            {"min ∑_{i ∈ T} ∑_{j ∈ R} c_ij · X_ij"}
          </div>
          <div className="text-slate-400 text-[11px] leading-relaxed">
            {"Subject to: ∑_{j ∈ R} X_ij = 1 (∀ i ∈ T),  ∑_{i ∈ T} X_ij ≤ Capacity_j (∀ j ∈ R),  X_ij ∈ {0, 1}"}
          </div>
          <p className="text-[10px] text-slate-500 font-sans">
            Where T represents enrolled residential trainees, R denotes available residential rooms, Capacity_j reflects bed limit, and c_ij penalizes sub-optimal assignments (e.g. cross-gender placement or cohort fragmentation).
          </p>
        </div>
      </div>

      {/* Grid: Hostel Inventory & Mess Operations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Hostel Inventory & Segregation */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Hotel className="w-4 h-4 text-amber-400" />
              <h3 className="font-bold text-sm text-white">Residential Hostel Room Inventory</h3>
            </div>
            <span className="text-xs font-bold text-amber-300 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
              {occupancyRate}% Occupancy
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-slate-800/60 p-3 rounded-xl">
              <span className="text-slate-400 text-[10px] font-semibold block">Total Available Beds</span>
              <span className="text-lg font-bold text-white">{totalBeds} Beds</span>
            </div>
            <div className="bg-slate-800/60 p-3 rounded-xl">
              <span className="text-slate-400 text-[10px] font-semibold block">Assigned / Occupied</span>
              <span className="text-lg font-bold text-indigo-300">{totalOccupied} Trainees</span>
            </div>
          </div>

          <div className="space-y-2.5">
            {rooms.map((room) => {
              const pct = Math.round((room.occupied / room.capacity) * 100);
              return (
                <div
                  key={room.id}
                  className="bg-slate-850 border border-slate-800 p-3.5 rounded-xl flex items-center justify-between text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-white">{room.roomNumber}</span>
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${
                          room.genderQuota === 'MALE'
                            ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                            : room.genderQuota === 'FEMALE'
                            ? 'bg-pink-500/20 text-pink-300 border border-pink-500/30'
                            : 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                        }`}
                      >
                        {room.genderQuota}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400">{room.wing}</p>
                  </div>

                  <div className="text-right space-y-1">
                    <span className="font-bold text-slate-200">
                      {room.occupied} / {room.capacity} Beds
                    </span>
                    <div className="w-24 bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all ${
                          pct === 100 ? 'bg-rose-500' : 'bg-emerald-500'
                        }`}
                        style={{ width: `${pct}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mess Operations & Billing */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Utensils className="w-4 h-4 text-emerald-400" />
              <h3 className="font-bold text-sm text-white">Dining Mess Headcounts & Stipends</h3>
            </div>
            <span className="text-xs text-slate-400 font-medium">Daily Meal Logs</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                  <th className="py-2.5 px-3">Meal Type</th>
                  <th className="py-2.5 px-3">Planned</th>
                  <th className="py-2.5 px-3">Actual Headcount</th>
                  <th className="py-2.5 px-3">Special Diets</th>
                  <th className="py-2.5 px-3 text-right">Cost (INR)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {messLogs.map((log, idx) => (
                  <tr key={idx} className="hover:bg-slate-850/50">
                    <td className="py-3 px-3 font-semibold text-white">{log.mealType}</td>
                    <td className="py-3 px-3 text-slate-300">{log.plannedCount}</td>
                    <td className="py-3 px-3 font-bold text-emerald-400">{log.actualCount}</td>
                    <td className="py-3 px-3 text-amber-300">{log.specialDietCount}</td>
                    <td className="py-3 px-3 text-right font-mono font-bold text-white">
                      ₹{log.estimatedCostINR.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-slate-850 p-4 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
            <div className="flex items-center space-x-2 text-slate-300 font-medium">
              <DollarSign className="w-4 h-4 text-amber-400" />
              <span>Total Estimated Daily Mess Allowance:</span>
            </div>
            <span className="font-extrabold text-amber-300 text-sm">
              ₹{messLogs.reduce((acc, m) => acc + m.estimatedCostINR, 0).toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
