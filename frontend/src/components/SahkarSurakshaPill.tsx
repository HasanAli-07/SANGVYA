import React, { useState } from 'react';
import { Wifi, WifiOff, RefreshCw, CheckCircle2 } from 'lucide-react';

interface SahkarSurakshaPillProps {
  bufferedRecordsCount?: number;
}

export const SahkarSurakshaPill: React.FC<SahkarSurakshaPillProps> = ({
  bufferedRecordsCount = 14,
}) => {
  const [isOnline, setIsOnline] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncNotice, setSyncNotice] = useState<string | null>(null);

  const toggleNetworkMode = () => {
    if (isOnline) {
      // Go Offline
      setIsOnline(false);
      setSyncNotice(null);
    } else {
      // Go Online & Trigger CRDT Monotonic Sync
      setIsOnline(true);
      setIsSyncing(true);
      setTimeout(() => {
        setIsSyncing(false);
        setSyncNotice(`Synchronized ${bufferedRecordsCount} records with Central NCCT Portal.`);
        setTimeout(() => setSyncNotice(null), 4000);
      }, 1500);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={toggleNetworkMode}
        className={`flex items-center space-x-2 px-3 py-1.5 rounded-full text-xs font-mono font-bold transition-all duration-300 border ${
          isOnline
            ? 'bg-emerald-950/80 text-emerald-300 border-emerald-800 hover:bg-emerald-900/80 shadow-md shadow-emerald-950/40'
            : 'bg-slate-900 text-amber-300 border-amber-800 hover:bg-slate-850 shadow-md shadow-amber-950/40'
        }`}
      >
        {isSyncing ? (
          <RefreshCw className="w-3.5 h-3.5 text-indigo-400 animate-spin" />
        ) : isOnline ? (
          <Wifi className="w-3.5 h-3.5 text-emerald-400" />
        ) : (
          <WifiOff className="w-3.5 h-3.5 text-amber-400" />
        )}

        <span>
          {isSyncing
            ? 'Syncing CRDT Ledger...'
            : isOnline
            ? 'Sahkar Suraksha: Online'
            : 'Offline Mode Active • Saved Locally'}
        </span>
      </button>

      {syncNotice && (
        <span className="hidden md:inline-flex items-center space-x-1 bg-emerald-900/80 text-emerald-200 border border-emerald-700 text-[10px] font-mono px-2.5 py-1 rounded-full animate-in fade-in">
          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
          <span>{syncNotice}</span>
        </span>
      )}
    </div>
  );
};
