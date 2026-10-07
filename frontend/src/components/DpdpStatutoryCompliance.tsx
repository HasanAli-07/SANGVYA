import React, { useState } from 'react';
import { ShieldCheck, Trash2, AlertTriangle, RefreshCw, CheckCircle2, Lock, FileText } from 'lucide-react';
import type { DpdpConsentRecord, CertInIncidentReport } from '../types/analytics';

interface DpdpStatutoryComplianceProps {
  consents: DpdpConsentRecord[];
  incidents: CertInIncidentReport[];
  onTriggerPurge: (consentId: string) => void;
  onReportIncident: (incident: CertInIncidentReport) => void;
}

export const DpdpStatutoryCompliance: React.FC<DpdpStatutoryComplianceProps> = ({
  consents,
  incidents,
  onTriggerPurge,
  onReportIncident,
}) => {
  const [isPurging, setIsPurging] = useState(false);
  const [purgeSuccess, setPurgeSuccess] = useState<string | null>(null);

  const handleRunStatutoryPurge = (id: string) => {
    setIsPurging(true);
    setTimeout(() => {
      onTriggerPurge(id);
      setIsPurging(false);
      setPurgeSuccess('DPDP Act 2023 Sec 12 Cryptographic Purge Executed: Zeroed biometrics and masked Aadhaar cryptogram.');
      setTimeout(() => setPurgeSuccess(null), 4000);
    }, 1000);
  };

  const handleCreateMockIncident = () => {
    onReportIncident({
      incidentId: `CERTIN-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      severity: 'LOW',
      incidentType: 'Routine Security Vulnerability Scan Routine Log Check',
      affectedSubsystem: 'DigiLocker API Gateway',
      detectedAt: new Date().toISOString(),
      reportedToCertInAt: new Date().toISOString(),
      status: 'CONTAINED',
      remediationSummary: 'Patched SSL/TLS certificate rotation and re-signed HSM keys.',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-slate-900 border border-slate-800 p-5 rounded-2xl gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="bg-indigo-500/20 text-indigo-300 text-xs font-bold px-2.5 py-1 rounded-md border border-indigo-500/30">
              Section 7.2
            </span>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Digital Personal Data Protection (DPDP) Act 2023 & CERT-In Subsystem
            </h2>
          </div>
          <p className="text-slate-400 text-xs mt-1">
            Enforces explicit granular consent, Right to Erasure, 90-day retention purging, and mandatory CERT-In data breach notifications.
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-emerald-950/60 border border-emerald-800/60 text-emerald-300 text-xs px-3.5 py-2 rounded-xl font-mono">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>DPDP 2023 Statutora Enforced</span>
        </div>
      </div>

      {purgeSuccess && (
        <div className="bg-emerald-950/80 border border-emerald-800 p-4 rounded-xl text-xs flex items-center space-x-3 text-emerald-200">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <span className="font-semibold">{purgeSuccess}</span>
        </div>
      )}

      {/* Citizen Consent & Retention Purge Table */}
      <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4 text-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-white font-bold text-sm">
            <Lock className="w-4 h-4 text-indigo-400" />
            <span>Citizen Granular Consent & 90-Day Retention Purge Ledger</span>
          </div>

          <span className="text-slate-400 font-mono text-xs">Section 12 Statutory Mandate</span>
        </div>

        <div className="space-y-3">
          {consents.map((c) => (
            <div
              key={c.consentId}
              className="bg-slate-850 p-4 rounded-xl border border-slate-800 space-y-3"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-white">{c.traineeName}</h4>
                  <p className="text-[11px] text-slate-400">Purpose: {c.purpose}</p>
                </div>

                <div className="flex items-center space-x-2">
                  <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold font-mono ${
                    c.status === 'ACTIVE'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                  }`}>
                    {c.status}
                  </span>

                  {c.status === 'ACTIVE' && (
                    <button
                      onClick={() => handleRunStatutoryPurge(c.consentId)}
                      disabled={isPurging}
                      className="flex items-center space-x-1 bg-rose-600/80 hover:bg-rose-600 text-white px-2.5 py-1 rounded transition text-[10px] font-semibold"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>{isPurging ? 'Purging...' : 'Execute Erasure (Forget Me)'}</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Checkboxes Granular Consent */}
              <div className="grid grid-cols-3 gap-2 text-[11px] font-mono bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                <div className="flex items-center space-x-1.5">
                  <span className={`w-2 h-2 rounded-full ${c.aadhaarConsentGranted ? 'bg-emerald-400' : 'bg-rose-500'}`}></span>
                  <span className="text-slate-300">Aadhaar Vault: {c.aadhaarConsentGranted ? 'GRANTED' : 'DENIED'}</span>
                </div>

                <div className="flex items-center space-x-1.5">
                  <span className={`w-2 h-2 rounded-full ${c.biometricConsentGranted ? 'bg-emerald-400' : 'bg-rose-500'}`}></span>
                  <span className="text-slate-300">Biometrics Kiosk: {c.biometricConsentGranted ? 'GRANTED' : 'DENIED'}</span>
                </div>

                <div className="flex items-center space-x-1.5">
                  <span className={`w-2 h-2 rounded-full ${c.placementProfileConsentGranted ? 'bg-emerald-400' : 'bg-rose-500'}`}></span>
                  <span className="text-slate-300">Job Profile Sharing: {c.placementProfileConsentGranted ? 'GRANTED' : 'DENIED'}</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                <span className="truncate">Aadhaar Cryptogram: {c.citizenAadhaarHash}</span>
                <span>Retention Days Remaining: {c.retentionDaysRemaining} Days</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CERT-In Incident Response Protocol Emulator */}
      <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4 text-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-white font-bold text-sm">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <span>CERT-In Mandatory Security Incident Disclosure Register</span>
          </div>

          <button
            onClick={handleCreateMockIncident}
            className="flex items-center space-x-1 bg-amber-600 hover:bg-amber-500 text-white px-3 py-1.5 rounded-lg transition font-semibold"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Dispatch CERT-In Audit Notice</span>
          </button>
        </div>

        <div className="space-y-3">
          {incidents.map((inc) => (
            <div key={inc.incidentId} className="bg-slate-850 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="bg-amber-500/20 text-amber-300 text-[10px] font-bold font-mono px-2 py-0.5 rounded border border-amber-500/30">
                    {inc.severity} SEVERITY
                  </span>
                  <h4 className="font-bold text-white text-sm">{inc.incidentType}</h4>
                </div>
                <span className="text-[10px] font-mono text-slate-400">ID: {inc.incidentId}</span>
              </div>

              <p className="text-slate-300 text-xs">Subsystem: <code className="text-indigo-300">{inc.affectedSubsystem}</code></p>
              <p className="text-slate-400 text-[11px] bg-slate-950 p-2 rounded border border-slate-800 font-mono">
                Remediation: {inc.remediationSummary}
              </p>

              <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono pt-1">
                <span>Detected: {new Date(inc.detectedAt).toLocaleString()}</span>
                <span>Reported to CERT-In: {new Date(inc.reportedToCertInAt).toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
