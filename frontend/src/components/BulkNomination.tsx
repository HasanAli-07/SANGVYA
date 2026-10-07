import React, { useState } from 'react';
import { UserPlus, Upload, ShieldCheck, CheckCircle2, XCircle, AlertTriangle, Fingerprint, FileSpreadsheet } from 'lucide-react';
import type { CandidateNomination, Course } from '../types/erp';

interface BulkNominationProps {
  nominations: CandidateNomination[];
  courses: Course[];
  onAddNomination: (nomination: CandidateNomination) => void;
  onUpdateStatus: (id: string, status: CandidateNomination['status']) => void;
}

export const BulkNomination: React.FC<BulkNominationProps> = ({
  nominations,
  courses,
  onAddNomination,
  onUpdateStatus,
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState(courses[0]?.id || '');
  const [sponsoringSociety, setSponsoringSociety] = useState('Khed Primary Agricultural Credit Society');
  const [societyRegId, setSocietyRegId] = useState('PACS-MH-PUNE-8842');
  const [notification, setNotification] = useState<string | null>(null);

  // Simulated bulk upload parser
  const handleSimulatedUpload = () => {
    const sampleBatch = [
      {
        name: 'Sunita Patil',
        aadhaar: 'aadhaar-9988-7766-1122',
        hash: 'a94a8fe5ccb19ba61c4c0873d391e987982fbbd3',
        phone: '+91 9422334455',
        email: 'sunita.patil@pacs.org',
        district: 'Pune',
      },
      {
        name: 'Ramesh Kumar Patel', // Intentional duplicate test
        aadhaar: 'aadhaar-1122-3344-5566',
        hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', // matches Ramesh
        phone: '+91 9876543210',
        email: 'ramesh.p@khedpacs.org',
        district: 'Pune',
      }
    ];

    let addedCount = 0;
    let duplicateCount = 0;

    sampleBatch.forEach((cand) => {
      // Check for existing Aadhaar hash
      const isDup = nominations.some((n) => n.aadhaarHash === cand.hash);

      const newNom: CandidateNomination = {
        id: `nom-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        sponsoringSociety,
        societyRegistrationId: societyRegId,
        candidateName: isDup ? `${cand.name} (DUPLICATE DETECTED)` : cand.name,
        aadhaarHash: cand.hash,
        phone: cand.phone,
        email: cand.email,
        district: cand.district,
        state: 'Maharashtra',
        courseId: selectedCourseId,
        submittedAt: new Date().toISOString(),
        status: isDup ? 'REJECTED' : 'SPONSOR_VERIFIED',
        isDuplicate: isDup,
      };

      onAddNomination(newNom);
      if (isDup) duplicateCount++;
      else addedCount++;
    });

    setNotification(
      `Processed Roster: ${addedCount} nominations verified & accepted. ${duplicateCount} duplicate SHA-256 Aadhaar record flagged and rejected.`
    );
    setTimeout(() => setNotification(null), 6000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-slate-900 border border-slate-800 p-5 rounded-2xl gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="bg-indigo-500/20 text-indigo-300 text-xs font-bold px-2.5 py-1 rounded-md border border-indigo-500/30">
              Section 1.3
            </span>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Sponsoring Society Bulk Nomination & Registration Engine
            </h2>
          </div>
          <p className="text-slate-400 text-xs mt-1">
            Enables PACS, DCCBs, and Milk Unions to upload candidate rosters in bulk with Aadhaar/APAAR SHA-256 deduplication.
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-emerald-950/60 border border-emerald-800/60 text-emerald-300 text-xs px-3.5 py-2 rounded-xl">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span className="font-semibold">SHA-256 Privacy Preserved</span>
        </div>
      </div>

      {notification && (
        <div className="bg-amber-950/80 border border-amber-800 text-amber-200 p-4 rounded-xl text-xs flex items-center space-x-3 shadow-lg">
          <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0" />
          <span className="font-medium leading-relaxed">{notification}</span>
        </div>
      )}

      {/* Upload Zone & Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upload Portal */}
        <div className="lg:col-span-1 bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4">
          <div className="flex items-center space-x-2 text-white font-bold text-sm">
            <FileSpreadsheet className="w-4 h-4 text-indigo-400" />
            <span>Upload Roster (CSV / XLSX)</span>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Sponsoring Society Name</label>
              <input
                type="text"
                value={sponsoringSociety}
                onChange={(e) => setSponsoringSociety(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg p-2.5 font-medium"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Society Reg Identifier (NCD ID)</label>
              <input
                type="text"
                value={societyRegId}
                onChange={(e) => setSocietyRegId(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 text-amber-300 font-mono rounded-lg p-2.5 font-semibold"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Target Training Course</label>
              <select
                value={selectedCourseId}
                onChange={(e) => setSelectedCourseId(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg p-2.5 font-medium"
              >
                {courses.map((c) => (
                  <option key={c.id} value={c.id}>
                    [{c.code}] {c.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Drag & Drop Area */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragActive(true);
            }}
            onDragLeave={() => setDragActive(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragActive(false);
              handleSimulatedUpload();
            }}
            className={`border-2 border-dashed rounded-xl p-6 text-center transition flex flex-col items-center justify-center cursor-pointer ${
              dragActive
                ? 'border-indigo-500 bg-indigo-500/10'
                : 'border-slate-700 hover:border-slate-600 bg-slate-850'
            }`}
            onClick={handleSimulatedUpload}
          >
            <Upload className="w-8 h-8 text-indigo-400 mb-2 animate-bounce" />
            <p className="text-xs font-semibold text-white">Click to Upload Candidate Roster CSV</p>
            <p className="text-[10px] text-slate-400 mt-1">or drag & drop PACS member spreadsheet</p>
            <span className="mt-3 inline-block bg-indigo-600 hover:bg-indigo-500 text-white text-[11px] font-semibold px-3 py-1.5 rounded-lg shadow-md">
              Simulate Bulk Nomination Upload
            </span>
          </div>
        </div>

        {/* Nominations Roster Table */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-white flex items-center space-x-2">
              <UserPlus className="w-4 h-4 text-emerald-400" />
              <span>Active Nominations & Duplicate Audit Roster ({nominations.length})</span>
            </h3>
            <span className="text-xs text-slate-400 font-medium">Auto-deduplicated by SHA-256</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                  <th className="py-2.5 px-3">Candidate Name</th>
                  <th className="py-2.5 px-3">Sponsoring Society</th>
                  <th className="py-2.5 px-3">Aadhaar Hash</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {nominations.map((nom) => (
                  <tr
                    key={nom.id}
                    className={`hover:bg-slate-850/50 transition ${
                      nom.isDuplicate ? 'bg-rose-950/20' : ''
                    }`}
                  >
                    <td className="py-3 px-3 font-semibold text-white">
                      <div>
                        <span>{nom.candidateName}</span>
                        <span className="block text-[10px] text-slate-400 font-normal">
                          {nom.phone} • {nom.district}
                        </span>
                      </div>
                    </td>

                    <td className="py-3 px-3 text-slate-300">
                      <div>
                        <span className="line-clamp-1">{nom.sponsoringSociety}</span>
                        <span className="text-[10px] font-mono text-amber-300 block">
                          {nom.societyRegistrationId}
                        </span>
                      </div>
                    </td>

                    <td className="py-3 px-3 font-mono text-[10px] text-slate-400">
                      <div className="flex items-center space-x-1">
                        <Fingerprint className="w-3 h-3 text-indigo-400 flex-shrink-0" />
                        <span className="truncate max-w-[100px]">{nom.aadhaarHash}</span>
                      </div>
                    </td>

                    <td className="py-3 px-3">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full inline-flex items-center space-x-1 ${
                          nom.status === 'ENROLLED'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : nom.status === 'ACCEPTED'
                            ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                            : nom.status === 'REJECTED'
                            ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                            : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        }`}
                      >
                        {nom.status === 'REJECTED' ? (
                          <XCircle className="w-3 h-3 text-rose-400" />
                        ) : (
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        )}
                        <span>{nom.status}</span>
                      </span>
                    </td>

                    <td className="py-3 px-3 text-right">
                      {nom.status !== 'REJECTED' && (
                        <div className="flex items-center justify-end space-x-1">
                          {nom.status !== 'ENROLLED' && (
                            <button
                              onClick={() => onUpdateStatus(nom.id, 'ENROLLED')}
                              className="bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-semibold px-2 py-1 rounded-md transition"
                            >
                              Enroll
                            </button>
                          )}
                        </div>
                      )}
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
