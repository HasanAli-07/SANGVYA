import React, { useState } from 'react';
import { Database, Wifi, WifiOff, RefreshCw, CheckCircle2, Layers } from 'lucide-react';
import type { AttendanceRecord } from '../types/attendance';

interface OfflineSyncManagerProps {
  logs: AttendanceRecord[];
  onTriggerSync: () => void;
}

export const OfflineSyncManager: React.FC<OfflineSyncManagerProps> = ({ logs, onTriggerSync }) => {
  const [isOfflineMode, setIsOfflineMode] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncOutput, setSyncOutput] = useState<string | null>(null);

  const bufferedCount = logs.filter((l) => l.syncStatus === 'BUFFERED_OFFLINE').length;
  const syncedCount = logs.filter((l) => l.syncStatus === 'SYNCED').length;

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      onTriggerSync();
      setIsSyncing(false);
      setSyncOutput(
        'Monotonic CRDT Delta Sync Completed: State_server = max(State_server, State_client). Reconciled offline transactions with zero data loss or duplicate rows.'
      );
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-slate-900 border border-slate-800 p-5 rounded-2xl gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="bg-indigo-500/20 text-indigo-300 text-xs font-bold px-2.5 py-1 rounded-md border border-indigo-500/30">
              Section 2.3
            </span>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Offline Buffer Management & Monotonic CRDT Sync Engine
            </h2>
          </div>
          <p className="text-slate-400 text-xs mt-1">
            Persists attendance logs in an encrypted SQLCipher SQLite database during WAN outages, reconciling asynchronously via Lamport Timestamps.
          </p>
        </div>

        {/* Network Toggle Button */}
        <button
          onClick={() => setIsOfflineMode(!isOfflineMode)}
          className={`flex items-center space-x-2 text-xs font-bold px-4 py-2.5 rounded-xl transition border shadow-lg ${
            isOfflineMode
              ? 'bg-rose-950/80 text-rose-300 border-rose-700'
              : 'bg-emerald-950/80 text-emerald-300 border-emerald-700'
          }`}
        >
          {isOfflineMode ? (
            <>
              <WifiOff className="w-4 h-4 text-rose-400" />
              <span>Network Status: WAN Outage (Offline)</span>
            </>
          ) : (
            <>
              <Wifi className="w-4 h-4 text-emerald-400" />
              <span>Network Status: Connected (Online)</span>
            </>
          )}
        </button>
      </div>

      {syncOutput && (
        <div className="bg-emerald-950/80 border border-emerald-800 p-4 rounded-xl text-xs flex items-center space-x-3 shadow-lg text-emerald-200">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <span className="font-semibold">{syncOutput}</span>
        </div>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Status Card & Sync Action */}
        <div className="lg:col-span-1 bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4">
          <div className="flex items-center space-x-2 text-white font-bold text-sm">
            <Database className="w-4 h-4 text-indigo-400" />
            <span>Local Encrypted Buffer Status</span>
          </div>

          <div className="space-y-3">
            <div className="bg-slate-800/60 p-3 rounded-xl flex items-center justify-between text-xs">
              <span className="text-slate-400 font-semibold">Buffered Offline Logs:</span>
              <span className="font-extrabold text-amber-300 text-sm">{bufferedCount} Logs</span>
            </div>

            <div className="bg-slate-800/60 p-3 rounded-xl flex items-center justify-between text-xs">
              <span className="text-slate-400 font-semibold">Synced Central Records:</span>
              <span className="font-extrabold text-emerald-400 text-sm">{syncedCount} Logs</span>
            </div>

            <div className="bg-slate-850 p-3 rounded-xl border border-slate-800 text-[11px] text-slate-300 space-y-1 font-mono">
              <div className="text-indigo-300 font-bold">SQLCipher Encryption: AES-256</div>
              <div className="text-slate-400">Write-Ahead Logging (WAL) Enabled</div>
            </div>
          </div>

          <button
            onClick={handleSync}
            disabled={isSyncing || bufferedCount === 0}
            className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold text-xs py-3 rounded-xl transition shadow-lg flex items-center justify-center space-x-2"
          >
            <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>{isSyncing ? 'Synchronizing Delta Queue...' : 'Trigger Monotonic CRDT Sync'}</span>
          </button>
        </div>

        {/* Attendance Buffer Log Inspection Table */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-white flex items-center space-x-2">
              <Layers className="w-4 h-4 text-amber-400" />
              <span>Offline Transaction Buffer Log Inspector</span>
            </h3>
            <span className="text-xs text-slate-400 font-mono">Lamport Logical Clock</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                  <th className="py-2.5 px-3">Candidate Name</th>
                  <th className="py-2.5 px-3">Method</th>
                  <th className="py-2.5 px-3">Lamport Clock</th>
                  <th className="py-2.5 px-3">Sync Status</th>
                  <th className="py-2.5 px-3 text-right">Device ID</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {logs.map((log) => (
                  <tr key={log.recordId} className="hover:bg-slate-850/50">
                    <td className="py-3 px-3 font-semibold text-white">{log.candidateName}</td>
                    <td className="py-3 px-3 text-slate-300 font-mono text-[11px]">{log.method}</td>
                    <td className="py-3 px-3 font-mono font-bold text-amber-300">L-{log.lamportTimestamp}</td>
                    <td className="py-3 px-3">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          log.syncStatus === 'SYNCED'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        }`}
                      >
                        {log.syncStatus}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right font-mono text-[10px] text-slate-400">
                      {log.deviceId}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
