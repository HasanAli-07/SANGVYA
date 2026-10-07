import React, { useState } from 'react';
import { QrCode, ShieldCheck, Search, CheckCircle2, AlertTriangle, FileCode } from 'lucide-react';
import type { VerifiableCredential } from '../types/credentials';

interface PublicCertificateVerifierProps {
  credentials: VerifiableCredential[];
}

export const PublicCertificateVerifier: React.FC<PublicCertificateVerifierProps> = ({ credentials }) => {
  const [lookupUrn, setLookupUrn] = useState(credentials[0]?.id || '');
  const [scannedResult, setScannedResult] = useState<VerifiableCredential | null>(credentials[0] || null);
  const [isSearching, setIsSearching] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleVerify = () => {
    setIsSearching(true);
    setErrorMsg(null);
    setScannedResult(null);

    setTimeout(() => {
      setIsSearching(false);
      const match = credentials.find(
        (c) => c.id.toLowerCase() === lookupUrn.toLowerCase() || c.digilockerUri === lookupUrn
      );

      if (match) {
        setScannedResult(match);
      } else {
        setErrorMsg(`Certificate URN '${lookupUrn}' not found in NCCT Decentralized Identifier (DID) Registry.`);
      }
    }, 800);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-slate-900 border border-slate-800 p-5 rounded-2xl gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="bg-indigo-500/20 text-indigo-300 text-xs font-bold px-2.5 py-1 rounded-md border border-indigo-500/30">
              Section 4.4
            </span>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Public Decentralized Verification & Cryptographic 2D QR Scanner
            </h2>
          </div>
          <p className="text-slate-400 text-xs mt-1">
            Allows external employers and inspecting officers to scan printed certificate 2D QR codes and verify authenticity against NCCT DID registry without exposing PII.
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-emerald-950/60 border border-emerald-800/60 text-emerald-300 text-xs px-3.5 py-2 rounded-xl font-mono">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Privacy-Preserving Verification</span>
        </div>
      </div>

      {/* Lookup & Scanner Simulator Bar */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-3">
        <span className="text-xs font-bold text-white block">
          Scan 2D QR Code or Enter Certificate URN / DigiLocker URI:
        </span>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
            <input
              type="text"
              placeholder="e.g. urn:uuid:8f14b3d7-2194-4e4b-97e3-0d319e7a9c21"
              value={lookupUrn}
              onChange={(e) => setLookupUrn(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-xl pl-9 pr-3 py-2.5 font-mono"
            />
          </div>

          <button
            onClick={handleVerify}
            disabled={isSearching || !lookupUrn}
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs px-6 py-2.5 rounded-xl transition shadow-lg flex items-center justify-center space-x-2 whitespace-nowrap"
          >
            <QrCode className="w-4 h-4" />
            <span>{isSearching ? 'Querying DID Registry...' : 'Verify Cryptographic QR'}</span>
          </button>
        </div>
      </div>

      {errorMsg && (
        <div className="bg-rose-950/80 border border-rose-800 p-4 rounded-xl text-xs flex items-center space-x-3 text-rose-200">
          <AlertTriangle className="w-5 h-5 text-rose-400 flex-shrink-0" />
          <span className="font-semibold">{errorMsg}</span>
        </div>
      )}

      {/* Scanned Certificate Verification Result */}
      {scannedResult && (
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center space-x-3">
              <div
                className={`p-3 rounded-xl ${
                  scannedResult.status === 'ACTIVE'
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                }`}
              >
                {scannedResult.status === 'ACTIVE' ? (
                  <CheckCircle2 className="w-6 h-6" />
                ) : (
                  <AlertTriangle className="w-6 h-6" />
                )}
              </div>

              <div>
                <h3 className="text-base font-extrabold text-white">
                  {scannedResult.status === 'ACTIVE' ? 'AUTHENTIC VERIFIED CREDENTIAL' : 'CERTIFICATE REVOKED'}
                </h3>
                <p className="text-xs text-slate-400 font-mono">
                  Issuer DID: {scannedResult.issuer}
                </p>
              </div>
            </div>

            <span
              className={`text-xs font-mono font-bold px-3 py-1 rounded-full ${
                scannedResult.status === 'ACTIVE'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
              }`}
            >
              STATUS: {scannedResult.status}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="bg-slate-850 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider block">
                Trainee Skill & Competency Proof
              </span>
              <p className="font-bold text-white text-sm">
                {scannedResult.credentialSubject.traineeName}
              </p>
              <p className="text-slate-300 font-medium leading-relaxed">
                {scannedResult.credentialSubject.programmeTitle}
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {scannedResult.credentialSubject.competencies.map((comp, i) => (
                  <span key={i} className="bg-slate-800 text-slate-300 text-[10px] px-2 py-0.5 rounded border border-slate-700 font-semibold">
                    {comp}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-slate-850 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
                Cryptographic Signature Proof
              </span>
              <div className="space-y-1 font-mono text-[11px] text-slate-300">
                <div>Signature Type: <span className="text-amber-300 font-bold">{scannedResult.proof.type}</span></div>
                <div>Verification Method: <span className="text-slate-400">{scannedResult.proof.verificationMethod}</span></div>
                <div>Issued At: <span className="text-slate-400">{new Date(scannedResult.issuanceDate).toLocaleDateString()}</span></div>
              </div>
            </div>
          </div>

          {/* Scanned 2D QR Signature Hex */}
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs font-mono text-slate-400 flex items-center justify-between">
            <div className="flex items-center space-x-2 truncate">
              <FileCode className="w-4 h-4 text-indigo-400 flex-shrink-0" />
              <span className="truncate">2D QR Signature Hex: {scannedResult.qrCodeSignatureHex}</span>
            </div>
            <span className="text-[10px] text-emerald-400 font-bold whitespace-nowrap pl-2">ECDSA SHA-256</span>
          </div>
        </div>
      )}
    </div>
  );
};
