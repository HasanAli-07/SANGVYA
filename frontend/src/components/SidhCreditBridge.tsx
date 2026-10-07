import React, { useState } from 'react';
import { Award, CheckCircle2, RefreshCw } from 'lucide-react';
import type { SidhAbcRecord } from '../types/credentials';

interface SidhCreditBridgeProps {
  records: SidhAbcRecord[];
  onTriggerAbcSync: () => void;
}

export const SidhCreditBridge: React.FC<SidhCreditBridgeProps> = ({ records, onTriggerAbcSync }) => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncMessage, setSyncMessage] = useState<string | null>(null);

  const totalCredits = records.reduce((acc, r) => acc + r.creditsEarned, 0);

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      onTriggerAbcSync();
      setIsSyncing(false);
      setSyncMessage(
        'Skill India Digital Hub (SIDH) & Academic Bank of Credits (ABC) Sync Completed: Synchronized NCVET course codes and credit hours to national skilling repository via API Setu.'
      );
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-slate-900 border border-slate-800 p-5 rounded-2xl gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="bg-indigo-500/20 text-indigo-300 text-xs font-bold px-2.5 py-1 rounded-md border border-indigo-500/30">
              Section 4.3
            </span>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Skill India Digital Hub (SIDH) & Academic Bank of Credits (ABC) Bridge
            </h2>
          </div>
          <p className="text-slate-400 text-xs mt-1">
            Exports NCVET course codes, NOS competencies, and earned credit hours to citizen APAAR IDs in the national Academic Bank of Credits.
          </p>
        </div>

        <button
          onClick={handleSync}
          disabled={isSyncing}
          className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition shadow-lg shadow-indigo-600/30"
        >
          <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
          <span>{isSyncing ? 'Exporting Credits to ABC...' : 'Sync Credits to SIDH / ABC'}</span>
        </button>
      </div>

      {syncMessage && (
        <div className="bg-emerald-950/80 border border-emerald-800 p-4 rounded-xl text-xs flex items-center space-x-3 shadow-lg text-emerald-200">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <span className="font-semibold">{syncMessage}</span>
        </div>
      )}

      {/* Main Table */}
      <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-sm text-white flex items-center space-x-2">
            <Award className="w-4 h-4 text-amber-400" />
            <span>National Skilling Credit Transfer Roster ({records.length} Trainees)</span>
          </h3>

          <span className="text-xs font-bold text-amber-300 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
            Total Academic Credits Exported: {totalCredits} Credits
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                <th className="py-2.5 px-3">Candidate & APAAR ID</th>
                <th className="py-2.5 px-3">NCVET Course Code</th>
                <th className="py-2.5 px-3">NOS Competency Standard</th>
                <th className="py-2.5 px-3">ABC Credits</th>
                <th className="py-2.5 px-3 text-right">ABC Sync Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {records.map((rec, idx) => (
                <tr key={idx} className="hover:bg-slate-850/50">
                  <td className="py-3 px-3 font-semibold text-white">
                    <div>
                      <span>{rec.candidateName}</span>
                      <span className="block text-[10px] text-amber-300 font-mono font-bold">
                        {rec.apaarId}
                      </span>
                    </div>
                  </td>

                  <td className="py-3 px-3 font-mono text-slate-300">{rec.ncvetCourseCode}</td>

                  <td className="py-3 px-3">
                    <span className="bg-slate-800 border border-slate-700 text-indigo-300 text-[10px] font-mono px-2 py-0.5 rounded font-bold">
                      {rec.nosCode}
                    </span>
                  </td>

                  <td className="py-3 px-3 font-bold text-amber-300 text-sm">
                    {rec.creditsEarned} Credits
                  </td>

                  <td className="py-3 px-3 text-right">
                    <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold px-2.5 py-0.5 rounded-full inline-flex items-center space-x-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      <span>{rec.abcSyncStatus}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
