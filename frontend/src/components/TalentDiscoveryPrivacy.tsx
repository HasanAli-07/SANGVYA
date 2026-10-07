import React, { useState } from 'react';
import { Search, Eye, Lock, ShieldCheck, CheckCircle2, Phone, Mail, MapPin } from 'lucide-react';
import type { CandidateTalentProfile } from '../types/recruitment';

interface TalentDiscoveryPrivacyProps {
  candidates: CandidateTalentProfile[];
  onRevealContactInfo: (id: string) => void;
}

export const TalentDiscoveryPrivacy: React.FC<TalentDiscoveryPrivacyProps> = ({
  candidates,
  onRevealContactInfo,
}) => {
  const [search, setSearch] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('ALL');

  const filteredCandidates = candidates.filter((c) => {
    const matchesSearch =
      c.traineeName.toLowerCase().includes(search.toLowerCase()) ||
      c.skills.some((s) => s.toLowerCase().includes(search.toLowerCase()));
    const matchesDistrict = selectedDistrict === 'ALL' || c.district === selectedDistrict;
    return matchesSearch && matchesDistrict;
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-slate-900 border border-slate-800 p-5 rounded-2xl gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="bg-indigo-500/20 text-indigo-300 text-xs font-bold px-2.5 py-1 rounded-md border border-indigo-500/30">
              Section 6.3
            </span>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Privacy-Preserving Talent Discovery & Candidate Search Portal
            </h2>
          </div>
          <p className="text-slate-400 text-xs mt-1">
            Displays verified skills and certificates while keeping candidate contact information masked until an interview invitation is accepted.
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-emerald-950/60 border border-emerald-800/60 text-emerald-300 text-xs px-3.5 py-2 rounded-xl font-mono">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Contact Privacy Enforced</span>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-3.5 rounded-xl text-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
          <input
            type="text"
            placeholder="Search candidate by name or skill..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 text-slate-200 rounded-lg pl-9 pr-3 py-2 focus:outline-none focus:border-indigo-500 font-medium"
          />
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <span className="text-slate-400 font-semibold whitespace-nowrap">District Radius Filter:</span>
          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="bg-slate-800 border border-slate-700 text-white text-xs rounded-lg px-3 py-2 font-medium"
          >
            <option value="ALL">All Districts</option>
            <option value="Pune">Pune District</option>
            <option value="Baramati">Baramati District</option>
          </select>
        </div>
      </div>

      {/* Candidate Profile Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredCandidates.map((cand) => (
          <div
            key={cand.candidateId}
            className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-base text-white">{cand.traineeName}</h3>
                <span className="bg-indigo-500/20 text-indigo-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-indigo-500/30">
                  {cand.experienceYears} Years Experience
                </span>
              </div>

              <div className="flex items-center space-x-2 text-xs text-slate-400">
                <MapPin className="w-3.5 h-3.5 text-slate-500" />
                <span>{cand.district}, {cand.state}</span>
              </div>

              {/* Skills Tags */}
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Verified Skills:</span>
                <div className="flex flex-wrap gap-1.5">
                  {cand.skills.map((skill, i) => (
                    <span key={i} className="bg-slate-800 text-slate-300 border border-slate-700 text-[11px] px-2.5 py-0.5 rounded-md font-semibold">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Verified Certificates */}
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">Verified NCCT Certificates:</span>
                {cand.verifiedCertificates.map((cert) => (
                  <div key={cert.certificateUrn} className="bg-slate-850 p-2.5 rounded-xl border border-slate-800 text-xs flex items-center justify-between">
                    <div>
                      <span className="font-bold text-white block">{cert.courseTitle}</span>
                      <span className="text-[10px] font-mono text-indigo-300">[{cert.courseCode}] • Grade {cert.grade}</span>
                    </div>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  </div>
                ))}
              </div>
            </div>

            {/* Privacy Masked Contact Information Box */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center space-x-1">
                  <Lock className="w-3 h-3 text-amber-400" />
                  <span>Contact Info Privacy Status:</span>
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                  cand.isContactInfoRevealed ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                }`}>
                  {cand.isContactInfoRevealed ? 'REVEALED (ACCEPTED)' : 'MASKED (PRIVACY ENABLED)'}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 font-mono text-[11px]">
                <div className="flex items-center space-x-1.5 text-slate-300">
                  <Phone className="w-3.5 h-3.5 text-slate-500" />
                  <span>{cand.isContactInfoRevealed ? cand.phoneActual : cand.phoneMasked}</span>
                </div>

                <div className="flex items-center space-x-1.5 text-slate-300 truncate">
                  <Mail className="w-3.5 h-3.5 text-slate-500" />
                  <span className="truncate">{cand.isContactInfoRevealed ? cand.emailActual : cand.emailMasked}</span>
                </div>
              </div>

              {!cand.isContactInfoRevealed && (
                <button
                  onClick={() => onRevealContactInfo(cand.candidateId)}
                  className="w-full mt-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 rounded-lg transition text-[11px] shadow-sm flex items-center justify-center space-x-1"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Send Interview Invitation (Request Contact Reveal)</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
