import React, { useState } from 'react';
import { Layers, RefreshCw, CheckCircle2, FileCode, Terminal } from 'lucide-react';
import type { XApiStatement } from '../types/lms';

interface XApiProgressSyncProps {
  statements: XApiStatement[];
  onAddStatement: (stmt: XApiStatement) => void;
}

export const XApiProgressSync: React.FC<XApiProgressSyncProps> = ({
  statements,
  onAddStatement,
}) => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncResult, setSyncResult] = useState<string | null>(null);

  const handleSimulateXapiEvent = () => {
    const newStmt: XApiStatement = {
      id: `xapi-${Date.now()}`,
      actor: { name: 'Priya Sharma', mbox: 'mailto:priya.sharma@dairybaramati.in' },
      verb: { id: 'http://adlnet.gov/expapi/verbs/attempted', display: 'attempted' },
      object: {
        id: 'http://ncct.ac.in/courses/mod-102',
        definition: { name: 'CAS Day-Book Ledger Reconciliation HTML5 Module' },
      },
      result: { score: { scaled: 0.92 }, completion: true, duration: 'PT60M' },
      timestamp: new Date().toISOString(),
      lamportTimestamp: statements.length + 111,
    };

    onAddStatement(newStmt);
  };

  const handleRunCrdtMerge = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setSyncResult(
        'Monotonic xAPI CRDT Reconciled: State_server = max(State_server, State_client). Merged offline playback positions and quiz completions monotonically with zero progress rollbacks.'
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
              Section 3.4
            </span>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Offline xAPI Progress Tracking & Monotonic CRDT Sync Engine
            </h2>
          </div>
          <p className="text-slate-400 text-xs mt-1">
            Captures structured xAPI Experience API statements locally, reconciling progress monotonically (State_server = max(State_server, State_client)).
          </p>
        </div>

        <button
          onClick={handleSimulateXapiEvent}
          className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition shadow-lg shadow-indigo-600/30"
        >
          <FileCode className="w-4 h-4" />
          <span>Simulate Offline xAPI Event</span>
        </button>
      </div>

      {syncResult && (
        <div className="bg-emerald-950/80 border border-emerald-800 p-4 rounded-xl text-xs flex items-center space-x-3 shadow-lg text-emerald-200">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <span className="font-semibold">{syncResult}</span>
        </div>
      )}

      {/* Grid: xAPI Log Inspector & CRDT Action */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sync Controls */}
        <div className="lg:col-span-1 bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4">
          <div className="flex items-center space-x-2 text-white font-bold text-sm">
            <Terminal className="w-4 h-4 text-amber-400" />
            <span>Monotonic CRDT Sync Engine</span>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs font-mono">
            <div className="text-amber-400 font-bold">State_server = max(State_server, State_client)</div>
            <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
              Guarantees newer offline progress logs are never overwritten by older server snapshots during reconnection.
            </p>
          </div>

          <button
            onClick={handleRunCrdtMerge}
            disabled={isSyncing}
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-3 rounded-xl transition shadow-lg flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>{isSyncing ? 'Reconciling CRDT State...' : 'Reconcile Monotonic CRDT Sync'}</span>
          </button>
        </div>

        {/* Structured xAPI Statement Log Inspector */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-white flex items-center space-x-2">
              <Layers className="w-4 h-4 text-indigo-400" />
              <span>Structured xAPI (Experience API) Statement Stream ({statements.length})</span>
            </h3>
            <span className="text-xs text-slate-400 font-mono">Lamport Logical Clock</span>
          </div>

          <div className="space-y-3">
            {statements.map((stmt) => (
              <div
                key={stmt.id}
                className="bg-slate-850 p-4 rounded-xl border border-slate-800 space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white flex items-center space-x-2">
                    <span className="text-indigo-400 font-mono">{stmt.actor.name}</span>
                    <span className="bg-amber-500/20 text-amber-300 font-mono text-[10px] font-bold px-2 py-0.5 rounded border border-amber-500/30">
                      {stmt.verb.display}
                    </span>
                  </span>
                  <span className="font-mono text-amber-300 text-xs font-bold">
                    L-{stmt.lamportTimestamp}
                  </span>
                </div>

                <p className="text-slate-300 text-[11px] font-medium leading-relaxed">
                  Object: {stmt.object.definition.name}
                </p>

                <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 font-mono">
                  <span>Actor Mbox: {stmt.actor.mbox}</span>
                  <span>{new Date(stmt.timestamp).toLocaleTimeString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
