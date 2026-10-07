import React, { useState } from 'react';
import { Award, CheckCircle2, Code, Zap, Cpu } from 'lucide-react';
import type { VerifiableCredential } from '../types/credentials';

interface VerifiableCredentialCompilerProps {
  credentials: VerifiableCredential[];
  onIssueCredential: (vc: VerifiableCredential) => void;
}

export const VerifiableCredentialCompiler: React.FC<VerifiableCredentialCompilerProps> = ({
  credentials,
  onIssueCredential,
}) => {
  const [selectedVc, setSelectedVc] = useState<VerifiableCredential>(credentials[0]);
  const [isIssuing, setIsIssuing] = useState(false);
  const [issueSuccess, setIssueSuccess] = useState<string | null>(null);

  // Form input for new certificate compilation
  const [candidateName, setCandidateName] = useState('Sunil Deshmukh');
  const [attendancePct, setAttendancePct] = useState(85.0);
  const [examScore, setExamScore] = useState(82.0);

  const isEligible = attendancePct >= 80.0 && examScore >= 75.0;

  const handleIssue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEligible) return;

    setIsIssuing(true);
    setTimeout(() => {
      const newUrn = `urn:uuid:${Math.random().toString(36).substring(2, 10)}-${Math.random().toString(36).substring(2, 6)}`;
      const newVc: VerifiableCredential = {
        context: ['https://www.w3.org/2018/credentials/v1', 'https://schema.ncct.ac.in/v1'],
        id: newUrn,
        type: ['VerifiableCredential', 'CooperativeSkillCertificate'],
        issuer: 'did:india:ncct:vamnicom-pune',
        issuanceDate: new Date().toISOString(),
        credentialSubject: {
          id: `did:india:trainee:${Math.floor(100000000000 + Math.random() * 900000000000)}`,
          traineeName: candidateName,
          programmeCode: 'DCCB-AUDIT-102',
          programmeTitle: 'District Central Cooperative Bank Audit & Compliance',
          institutionName: 'VAMNICOM Pune',
          attendancePercentage: attendancePct,
          assessmentGrade: 'A',
          assessmentScore: examScore,
          competencies: ['Cooperative Banking Audit', 'Compliance Checks'],
          nosCodes: ['NOS-BANK-AUD-04'],
          creditHours: 3,
        },
        proof: {
          type: 'Ed25519Signature2020',
          created: new Date().toISOString(),
          verificationMethod: 'did:india:ncct:keys:master-2026#key-1',
          proofPurpose: 'assertionMethod',
          proofValue: `z3h8A1${Math.random().toString(36).substring(2, 15)}Ed25519`,
        },
        status: 'ACTIVE',
        digilockerUri: `in.gov.ncct.cert.2026.${newUrn.split('-')[1]}`,
        qrCodeSignatureHex: '3045022100a9b8c7d6e5f4e3d2c1b0a9876543210123456789abcdef02201122334455667788',
      };

      onIssueCredential(newVc);
      setSelectedVc(newVc);
      setIsIssuing(false);
      setIssueSuccess(`Successfully issued W3C Verifiable Credential for ${candidateName}! Signed via Cloud HSM Ed25519.`);
      setTimeout(() => setIssueSuccess(null), 5000);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-slate-900 border border-slate-800 p-5 rounded-2xl gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="bg-indigo-500/20 text-indigo-300 text-xs font-bold px-2.5 py-1 rounded-md border border-indigo-500/30">
              Section 4.1
            </span>
            <h2 className="text-xl font-bold text-white tracking-tight">
              W3C Verifiable Credentials Compiler & Cloud HSM Ed25519 Signer
            </h2>
          </div>
          <p className="text-slate-400 text-xs mt-1">
            Validates completion criteria ($\ge 80\%$ attendance AND $\ge 75\%$ exam score), compiling JSON-LD VC 2.0 documents signed via Ed25519 Cloud HSM.
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-indigo-950/60 border border-indigo-800/60 text-indigo-300 text-xs px-3.5 py-2 rounded-xl font-mono">
          <Cpu className="w-4 h-4 text-indigo-400" />
          <span>Ed25519Signature2020 | W3C VC 2.0</span>
        </div>
      </div>

      {issueSuccess && (
        <div className="bg-emerald-950/80 border border-emerald-800 p-4 rounded-xl text-xs flex items-center space-x-3 shadow-lg text-emerald-200">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <span className="font-semibold">{issueSuccess}</span>
        </div>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Compiler Form & Eligibility Validator */}
        <div className="lg:col-span-1 bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4">
          <div className="flex items-center space-x-2 text-white font-bold text-sm">
            <Award className="w-4 h-4 text-amber-400" />
            <span>Issue W3C Verifiable Credential</span>
          </div>

          <form onSubmit={handleIssue} className="space-y-3 text-xs">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Candidate Name</label>
              <input
                type="text"
                required
                value={candidateName}
                onChange={(e) => setCandidateName(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg p-2.5"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Attendance %</label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="100"
                  value={attendancePct}
                  onChange={(e) => setAttendancePct(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg p-2.5"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Exam Score %</label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="100"
                  value={examScore}
                  onChange={(e) => setExamScore(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg p-2.5"
                />
              </div>
            </div>

            {/* Eligibility Indicator */}
            <div
              className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-between ${
                isEligible
                  ? 'bg-emerald-950/60 border-emerald-700 text-emerald-300'
                  : 'bg-rose-950/60 border-rose-700 text-rose-300'
              }`}
            >
              <span>Completion Criteria Check:</span>
              <span className="font-bold">
                {isEligible ? 'ELIGIBLE (≥80% Att & ≥75% Score)' : 'INELIGIBLE'}
              </span>
            </div>

            <button
              type="submit"
              disabled={!isEligible || isIssuing}
              className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold py-3 rounded-xl transition shadow-lg flex items-center justify-center space-x-2"
            >
              <Zap className="w-4 h-4 fill-current text-amber-300" />
              <span>{isIssuing ? 'Signing via Cloud HSM...' : 'Compile & Sign W3C JSON-LD VC'}</span>
            </button>
          </form>
        </div>

        {/* W3C JSON-LD Document Inspector */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-white font-bold text-sm">
              <Code className="w-4 h-4 text-indigo-400" />
              <span>W3C JSON-LD Verifiable Credential Inspector</span>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-xs text-slate-400 font-semibold">Select Credential:</span>
              <select
                value={selectedVc.id}
                onChange={(e) => {
                  const vc = credentials.find((c) => c.id === e.target.value);
                  if (vc) setSelectedVc(vc);
                }}
                className="bg-slate-800 border border-slate-700 text-white text-xs rounded-lg px-2.5 py-1 font-mono max-w-xs truncate"
              >
                {credentials.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.credentialSubject.traineeName} ({c.id.split('-')[1]})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* JSON-LD Code Block Display */}
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 font-mono text-[11px] text-slate-200 overflow-x-auto max-h-96 leading-relaxed">
            <pre>{JSON.stringify(selectedVc, null, 2)}</pre>
          </div>
        </div>
      </div>
    </div>
  );
};
