import React, { useState } from 'react';
import { Award, Zap, Sliders } from 'lucide-react';
import type { JobPosting, CandidateTalentProfile, MatchScoreBreakdown } from '../types/recruitment';

interface SemanticJobMatcherProps {
  jobPostings: JobPosting[];
  candidates: CandidateTalentProfile[];
}

export const SemanticJobMatcher: React.FC<SemanticJobMatcherProps> = ({ jobPostings, candidates }) => {
  const [selectedJobId, setSelectedJobId] = useState(jobPostings[0]?.jobId || '');
  const [weights, setWeights] = useState({
    skill: 0.35,
    cert: 0.30,
    exp: 0.15,
    geo: 0.20,
  });

  const selectedJob = jobPostings.find((j) => j.jobId === selectedJobId) || jobPostings[0];

  // Compute live match score breakdown for each candidate against selected job
  const computeMatch = (cand: CandidateTalentProfile): MatchScoreBreakdown => {
    // 1. Skill overlap (Jaccard similarity)
    const candSkillSet = new Set(cand.skills.map((s) => s.toLowerCase()));
    const reqSkillSet = new Set(selectedJob.requiredSkills.map((s) => s.toLowerCase()));
    const overlap = Array.from(candSkillSet).filter((s) => reqSkillSet.has(s));
    const sSemantic = reqSkillSet.size > 0 ? overlap.length / reqSkillSet.size : 1.0;

    // 2. Certificate match factor C(c, j)
    const candCertCodes = cand.verifiedCertificates.map((c) => c.courseCode.toLowerCase());
    const reqCertCodes = selectedJob.requiredCourseCodes.map((c) => c.toLowerCase());
    const certOverlap = candCertCodes.filter((c) => reqCertCodes.includes(c));
    const cCert = reqCertCodes.length > 0 ? certOverlap.length / reqCertCodes.length : 1.0;

    // 3. Experience match factor E(c, j)
    const eExp = selectedJob.minExperienceYears <= 0 ? 1.0 : Math.min(1.0, cand.experienceYears / selectedJob.minExperienceYears);

    // 4. Geographic distance decay G(c, j) = exp(-0.02 * d_km)
    // Haversine approx
    const dKm = Number(
      (
        Math.sqrt(
          Math.pow((cand.lat - selectedJob.lat) * 111, 2) +
          Math.pow((cand.lng - selectedJob.lng) * 111, 2)
        )
      ).toFixed(1)
    );

    const gGeo = Number(Math.exp(-0.02 * dKm).toFixed(3));

    const totalScore = Number(
      (
        weights.skill * sSemantic +
        weights.cert * cCert +
        weights.exp * eExp +
        weights.geo * gGeo
      ).toFixed(3)
    );

    return {
      totalMatchScore: totalScore,
      semanticSkillScore: Number(sSemantic.toFixed(3)),
      certificationScore: Number(cCert.toFixed(3)),
      experienceScore: Number(eExp.toFixed(3)),
      geographicScore: gGeo,
      distanceKm: dKm,
      explanation: `Skill Match: ${Math.round(sSemantic * 100)}% | Certs Verified: ${Math.round(cCert * 100)}% | Experience: ${Math.round(eExp * 100)}% | Distance: ${dKm}km (Decay: ${gGeo})`,
    };
  };

  const rankedCandidates = candidates
    .map((c) => ({ ...c, matchBreakdown: computeMatch(c) }))
    .sort((a, b) => (b.matchBreakdown?.totalMatchScore || 0) - (a.matchBreakdown?.totalMatchScore || 0));

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-slate-900 border border-slate-800 p-5 rounded-2xl gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="bg-indigo-500/20 text-indigo-300 text-xs font-bold px-2.5 py-1 rounded-md border border-indigo-500/30">
              Section 6.2
            </span>
            <h2 className="text-xl font-bold text-white tracking-tight">
              AI Multi-Factor Candidate-Job Semantic Matching Engine
            </h2>
          </div>
          <p className="text-slate-400 text-xs mt-1">
            Calculates multi-factor candidate match score S(c, j) = w_skill * S_semantic + w_cert * C + w_exp * E + w_geo * exp(-λd).
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-amber-950/60 border border-amber-800/60 text-amber-300 text-xs px-3.5 py-2 rounded-xl font-mono">
          <Zap className="w-4 h-4 text-amber-400 fill-current" />
          <span>Multi-Factor AI Matcher</span>
        </div>
      </div>

      {/* Mathematical Formula & Configurable Weights */}
      <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-white font-bold text-sm">
            <Sliders className="w-4 h-4 text-indigo-400" />
            <span>Configurable Ranking Weights & Equation Parameters</span>
          </div>

          <div className="flex items-center space-x-2 text-xs font-mono text-slate-300">
            <span className="text-slate-400">Target Job Requisition:</span>
            <select
              value={selectedJobId}
              onChange={(e) => setSelectedJobId(e.target.value)}
              className="bg-slate-800 border border-slate-700 text-white rounded-lg px-2.5 py-1 font-semibold"
            >
              {jobPostings.map((j) => (
                <option key={j.jobId} value={j.jobId}>
                  [{j.societyType}] {j.title} ({j.societyName})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Formula Box */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-amber-300 space-y-1">
          <div className="font-bold">
            S(c, j) = ({weights.skill.toFixed(2)} × S_semantic) + ({weights.cert.toFixed(2)} × C_cert) + ({weights.exp.toFixed(2)} × E_exp) + ({weights.geo.toFixed(2)} × exp(-0.02 × d_km))
          </div>
        </div>

        {/* Weight Sliders */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-semibold">
          <div className="bg-slate-850 p-3 rounded-xl border border-slate-800 space-y-1">
            <div className="flex justify-between text-slate-300">
              <span>Skill Match (w_skill)</span>
              <span className="font-mono text-indigo-400">{weights.skill.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min="0.05"
              max="0.60"
              step="0.05"
              value={weights.skill}
              onChange={(e) => setWeights({ ...weights, skill: parseFloat(e.target.value) })}
              className="w-full accent-indigo-500"
            />
          </div>

          <div className="bg-slate-850 p-3 rounded-xl border border-slate-800 space-y-1">
            <div className="flex justify-between text-slate-300">
              <span>NCCT Certs (w_cert)</span>
              <span className="font-mono text-amber-400">{weights.cert.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min="0.05"
              max="0.60"
              step="0.05"
              value={weights.cert}
              onChange={(e) => setWeights({ ...weights, cert: parseFloat(e.target.value) })}
              className="w-full accent-amber-500"
            />
          </div>

          <div className="bg-slate-850 p-3 rounded-xl border border-slate-800 space-y-1">
            <div className="flex justify-between text-slate-300">
              <span>Experience (w_exp)</span>
              <span className="font-mono text-emerald-400">{weights.exp.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min="0.05"
              max="0.60"
              step="0.05"
              value={weights.exp}
              onChange={(e) => setWeights({ ...weights, exp: parseFloat(e.target.value) })}
              className="w-full accent-emerald-500"
            />
          </div>

          <div className="bg-slate-850 p-3 rounded-xl border border-slate-800 space-y-1">
            <div className="flex justify-between text-slate-300">
              <span>Geographic Decay (w_geo)</span>
              <span className="font-mono text-purple-400">{weights.geo.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min="0.05"
              max="0.60"
              step="0.05"
              value={weights.geo}
              onChange={(e) => setWeights({ ...weights, geo: parseFloat(e.target.value) })}
              className="w-full accent-purple-500"
            />
          </div>
        </div>
      </div>

      {/* Ranked Candidate List */}
      <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4">
        <h3 className="font-bold text-sm text-white flex items-center space-x-2">
          <Award className="w-4 h-4 text-emerald-400" />
          <span>Ranked Candidates for "{selectedJob.title}" ({rankedCandidates.length})</span>
        </h3>

        <div className="space-y-4">
          {rankedCandidates.map((cand, rankIdx) => {
            const mb = cand.matchBreakdown!;
            const totalPct = Math.round(mb.totalMatchScore * 100);

            return (
              <div
                key={cand.candidateId}
                className="bg-slate-850 border border-slate-800 p-4 rounded-xl space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="w-7 h-7 rounded-full bg-indigo-600 font-extrabold text-white text-xs flex items-center justify-center">
                      #{rankIdx + 1}
                    </span>
                    <div>
                      <h4 className="font-bold text-sm text-white">{cand.traineeName}</h4>
                      <p className="text-[11px] text-slate-400">{cand.district}, {cand.state} • {cand.experienceYears} Years Exp</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xl font-extrabold text-emerald-400 font-mono">{totalPct}% Match</span>
                    <span className="text-[10px] text-slate-500 block">S(c, j) = {mb.totalMatchScore}</span>
                  </div>
                </div>

                {/* Score Factor Component Breakdown Grid */}
                <div className="grid grid-cols-4 gap-2 text-center text-xs pt-1">
                  <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
                    <span className="text-[10px] text-slate-400 block font-semibold">Semantic Skill</span>
                    <span className="font-mono font-bold text-indigo-300">{Math.round(mb.semanticSkillScore * 100)}%</span>
                  </div>

                  <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
                    <span className="text-[10px] text-slate-400 block font-semibold">NCCT Certs</span>
                    <span className="font-mono font-bold text-amber-300">{Math.round(mb.certificationScore * 100)}%</span>
                  </div>

                  <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
                    <span className="text-[10px] text-slate-400 block font-semibold">Experience</span>
                    <span className="font-mono font-bold text-emerald-300">{Math.round(mb.experienceScore * 100)}%</span>
                  </div>

                  <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
                    <span className="text-[10px] text-slate-400 block font-semibold">Geo Decay ({mb.distanceKm}km)</span>
                    <span className="font-mono font-bold text-purple-300">{mb.geographicScore}</span>
                  </div>
                </div>

                <p className="text-[11px] text-slate-400 font-mono bg-slate-950 p-2 rounded border border-slate-800">
                  Explanation: {mb.explanation}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
