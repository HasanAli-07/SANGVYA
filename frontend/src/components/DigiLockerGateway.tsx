import React, { useState } from 'react';
import { Smartphone, RefreshCw, CheckCircle2, ShieldAlert, ArrowUpRight, ArrowDownLeft, FileText } from 'lucide-react';
import type { VerifiableCredential, DigiLockerCallbackLog } from '../types/credentials';

interface DigiLockerGatewayProps {
  credentials: VerifiableCredential[];
  logs: DigiLockerCallbackLog[];
  onTriggerPush: (urn: string) => void;
  onTriggerPull: (urn: string) => void;
  onRevokeCertificate: (urn: string) => void;
}

export const DigiLockerGateway: React.FC<DigiLockerGatewayProps> = ({
  credentials,
  logs,
  onTriggerPush,
  onTriggerPull,
  onRevokeCertificate,
}) => {
  const [selectedUrn, setSelectedUrn] = useState(credentials[0]?.id || '');
  const [actionOutput, setActionOutput] = useState<string | null>(null);

  const selectedVc = credentials.find((c) => c.id === selectedUrn) || credentials[0];

  const handlePush = () => {
    onTriggerPush(selectedUrn);
    setActionOutput(`API Setu Push URI Handshake Completed: Registered certificate metadata with DigiLocker central directory for URN: ${selectedUrn}`);
  };

  const handlePull = () => {
    onTriggerPull(selectedUrn);
    setActionOutput(`DigiLocker Pull URI Handshake Executed: Generated Base64-encoded signed XML certificate payload for citizen wallet request.`);
  };

  const handleRevoke = () => {
    onRevokeCertificate(selectedUrn);
    setActionOutput(`Certificate Revoked: URN ${selectedUrn} has been added to the public Certificate Revocation List (CRL).`);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-slate-900 border border-slate-800 p-5 rounded-2xl gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="bg-indigo-500/20 text-indigo-300 text-xs font-bold px-2.5 py-1 rounded-md border border-indigo-500/30">
              Section 4.2
            </span>
            <h2 className="text-xl font-bold text-white tracking-tight">
              DigiLocker & API Setu Issuer Integration Gateway
            </h2>
          </div>
          <p className="text-slate-400 text-xs mt-1">
            Hosts standard Push URI & Pull URI callback endpoints for real-time certificate issuance to citizen DigiLocker wallets.
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-emerald-950/60 border border-emerald-800/60 text-emerald-300 text-xs px-3.5 py-2 rounded-xl font-mono">
          <Smartphone className="w-4 h-4 text-emerald-400" />
          <span>DigiLocker API v1.3 Compliant</span>
        </div>
      </div>

      {actionOutput && (
        <div className="bg-emerald-950/80 border border-emerald-800 p-4 rounded-xl text-xs flex items-center space-x-3 shadow-lg text-emerald-200">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <span className="font-semibold">{actionOutput}</span>
        </div>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Endpoint Testing & Actions */}
        <div className="lg:col-span-1 bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4 text-xs">
          <div className="flex items-center space-x-2 text-white font-bold text-sm">
            <RefreshCw className="w-4 h-4 text-indigo-400" />
            <span>DigiLocker Callback Tester</span>
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1">Target Credential URN</label>
            <select
              value={selectedUrn}
              onChange={(e) => setSelectedUrn(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg p-2.5 font-mono max-w-xs truncate"
            >
              {credentials.map((c) => (
                <option key={c.id} value={c.id}>
                  [{c.status}] {c.credentialSubject.traineeName}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2 pt-2">
            <button
              onClick={handlePush}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2.5 rounded-xl transition shadow-md flex items-center justify-center space-x-2"
            >
              <ArrowUpRight className="w-4 h-4" />
              <span>Test Push URI (Directory Push)</span>
            </button>

            <button
              onClick={handlePull}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 rounded-xl transition shadow-md flex items-center justify-center space-x-2"
            >
              <ArrowDownLeft className="w-4 h-4" />
              <span>Test Pull URI (Generate Signed XML)</span>
            </button>

            <button
              onClick={handleRevoke}
              disabled={selectedVc.status === 'REVOKED'}
              className="w-full bg-rose-600 hover:bg-rose-500 disabled:opacity-50 text-white font-bold py-2.5 rounded-xl transition shadow-md flex items-center justify-center space-x-2"
            >
              <ShieldAlert className="w-4 h-4" />
              <span>{selectedVc.status === 'REVOKED' ? 'Certificate Revoked' : 'Revoke Certificate (Add to CRL)'}</span>
            </button>
          </div>
        </div>

        {/* Citizen DigiLocker Mobile Wallet Simulation */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-white flex items-center space-x-2">
              <Smartphone className="w-4 h-4 text-emerald-400" />
              <span>Citizen DigiLocker Mobile Wallet Certificate Render</span>
            </h3>

            <span
              className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                selectedVc.status === 'ACTIVE'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
              }`}
            >
              {selectedVc.status}
            </span>
          </div>

          <div className="bg-slate-950 p-5 rounded-2xl border-2 border-indigo-600/40 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider block">
                  Ministry of Cooperation • NCCT Issued
                </span>
                <h4 className="text-base font-extrabold text-white">
                  {selectedVc.credentialSubject.programmeTitle}
                </h4>
              </div>
              <FileText className="w-8 h-8 text-amber-400" />
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs pt-1">
              <div>
                <span className="text-slate-400 text-[10px] block font-semibold">Certified Trainee:</span>
                <span className="font-bold text-white text-sm">{selectedVc.credentialSubject.traineeName}</span>
              </div>

              <div>
                <span className="text-slate-400 text-[10px] block font-semibold">Issuing Institute:</span>
                <span className="font-bold text-slate-200">{selectedVc.credentialSubject.institutionName}</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-xs pt-2">
              <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
                <span className="text-[10px] text-slate-400 block font-semibold">Attendance</span>
                <span className="font-bold text-emerald-400">{selectedVc.credentialSubject.attendancePercentage}%</span>
              </div>

              <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
                <span className="text-[10px] text-slate-400 block font-semibold">Exam Grade</span>
                <span className="font-bold text-amber-300">{selectedVc.credentialSubject.assessmentGrade} ({selectedVc.credentialSubject.assessmentScore}%)</span>
              </div>

              <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
                <span className="text-[10px] text-slate-400 block font-semibold">Credit Hours</span>
                <span className="font-bold text-indigo-300">{selectedVc.credentialSubject.creditHours} Credits</span>
              </div>
            </div>

            <div className="border-t border-slate-800 pt-3 flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>DigiLocker URI: {selectedVc.digilockerUri}</span>
              <span>Signed: Ed25519</span>
            </div>
          </div>

          {/* DigiLocker Callback API Logs Table */}
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-2 text-xs">
            <span className="font-bold text-white block">API Setu / DigiLocker Issuer Callback Audit Log ({logs.length})</span>
            <div className="space-y-1.5 font-mono text-[11px]">
              {logs.map((log) => (
                <div key={log.id} className="bg-slate-950 p-2.5 rounded-lg flex items-center justify-between text-slate-300">
                  <span>[{log.endpointType}] URN: {log.certificateUrn.split(':')[2].substring(0, 8)}...</span>
                  <span className="text-emerald-400 font-bold">HTTP {log.httpStatus} ({log.responsePayloadSizeKB} KB)</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
