import React, { useState } from 'react';
import { Layers, RefreshCw, CheckCircle2, ExternalLink } from 'lucide-react';
import type { CandidateTalentProfile, PipelineStage, NcsJobImport } from '../types/recruitment';

interface RecruitmentPipelineNcsProps {
  candidates: CandidateTalentProfile[];
  ncsJobs: NcsJobImport[];
  onUpdateStage: (candidateId: string, stage: PipelineStage) => void;
  onSyncNcs: () => void;
}

export const RecruitmentPipelineNcs: React.FC<RecruitmentPipelineNcsProps> = ({
  candidates,
  ncsJobs,
  onUpdateStage,
  onSyncNcs,
}) => {
  const [isSyncingNcs, setIsSyncingNcs] = useState(false);
  const [syncMessage, setSyncMessage] = useState<string | null>(null);

  const stages: PipelineStage[] = [
    'APPLIED',
    'SHORTLISTED',
    'INTERVIEW_SCHEDULED',
    'OFFERED',
    'PLACED',
    'REJECTED',
  ];

  const handleRunNcsSync = () => {
    setIsSyncingNcs(true);
    setTimeout(() => {
      onSyncNcs();
      setIsSyncingNcs(false);
      setSyncMessage('National Career Service (NCS) Bridge Synced: Ingested rural vacancies and pushed verified candidate profiles to national portal.');
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-slate-900 border border-slate-800 p-5 rounded-2xl gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="bg-indigo-500/20 text-indigo-300 text-xs font-bold px-2.5 py-1 rounded-md border border-indigo-500/30">
              Section 6.4
            </span>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Recruitment Pipeline Management & National Career Service (NCS) Bridge
            </h2>
          </div>
          <p className="text-slate-400 text-xs mt-1">
            Tracks candidates through hiring stages (`APPLIED` $\rightarrow$ `PLACED`), syncing bidirectionally with the National Career Service (NCS) API.
          </p>
        </div>

        <button
          onClick={handleRunNcsSync}
          disabled={isSyncingNcs}
          className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition shadow-lg shadow-indigo-600/30"
        >
          <RefreshCw className={`w-4 h-4 ${isSyncingNcs ? 'animate-spin' : ''}`} />
          <span>{isSyncingNcs ? 'Syncing NCS Gateway...' : 'Sync NCS Portal Bridge'}</span>
        </button>
      </div>

      {syncMessage && (
        <div className="bg-emerald-950/80 border border-emerald-800 p-4 rounded-xl text-xs flex items-center space-x-3 shadow-lg text-emerald-200">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <span className="font-semibold">{syncMessage}</span>
        </div>
      )}

      {/* Candidate Pipeline Kanban Board */}
      <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-sm text-white flex items-center space-x-2">
            <Layers className="w-4 h-4 text-indigo-400" />
            <span>Recruitment Pipeline Kanban Board</span>
          </h3>
          <span className="text-xs text-slate-400 font-mono">Stage Lifecycle Automation</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
          {stages.map((stg) => {
            const stageCandidates = candidates.filter((c) => (c.currentPipelineStage || 'APPLIED') === stg);
            return (
              <div key={stg} className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="font-bold text-[10px] text-amber-300 font-mono truncate">{stg}</span>
                  <span className="bg-slate-800 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {stageCandidates.length}
                  </span>
                </div>

                <div className="space-y-2">
                  {stageCandidates.map((cand) => (
                    <div key={cand.candidateId} className="bg-slate-850 p-3 rounded-lg border border-slate-800 space-y-1.5">
                      <span className="font-bold text-white block truncate">{cand.traineeName}</span>
                      <span className="text-[10px] text-slate-400 block">{cand.district}</span>

                      {/* Advance Stage Selector */}
                      <select
                        value={stg}
                        onChange={(e) => onUpdateStage(cand.candidateId, e.target.value as PipelineStage)}
                        className="w-full bg-slate-900 border border-slate-700 text-slate-200 text-[10px] rounded p-1 font-semibold"
                      >
                        {stages.map((s) => (
                          <option key={s} value={s}>
                            Move: {s}
                          </option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* NCS Ingested Jobs Table */}
      <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4 text-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-white font-bold text-sm">
            <ExternalLink className="w-4 h-4 text-indigo-400" />
            <span>National Career Service (NCS) Ingested Vacancy Directory</span>
          </div>

          <span className="text-emerald-400 font-mono font-bold text-xs bg-emerald-950/60 px-2.5 py-1 rounded border border-emerald-800">
            NCS Pub/Sub Sync Active
          </span>
        </div>

        <div className="space-y-2">
          {ncsJobs.map((job) => (
            <div key={job.ncsJobId} className="bg-slate-850 p-3.5 rounded-xl border border-slate-800 flex items-center justify-between">
              <div>
                <span className="font-bold text-white text-sm block">{job.jobTitle}</span>
                <span className="text-slate-400 text-[11px]">{job.employerName} • {job.location}</span>
              </div>

              <div className="text-right">
                <span className="font-bold text-amber-300 text-xs block">{job.vacancies} Vacancies</span>
                <span className="text-[10px] text-slate-500 font-mono">ID: {job.ncsJobId}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
