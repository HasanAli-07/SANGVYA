import React, { useState } from 'react';
import { Camera, ShieldCheck, Zap, RefreshCw, AlertCircle, Fingerprint, Trash2, Eye } from 'lucide-react';
import type { BiometricTemplate, AttendanceRecord } from '../types/attendance';

interface FaceVerificationKioskProps {
  templates: BiometricTemplate[];
  onMarkAttendance: (record: AttendanceRecord) => void;
}

export const FaceVerificationKiosk: React.FC<FaceVerificationKioskProps> = ({
  templates,
  onMarkAttendance,
}) => {
  const [selectedTemplate, setSelectedTemplate] = useState<BiometricTemplate>(templates[0]);
  const [isScanning, setIsScanning] = useState(false);
  const [livenessStage, setLivenessStage] = useState<'IDLE' | 'TEXTURE_ANALYSIS' | 'BLINK_PROMPT' | 'VECTOR_EXTRACTION' | 'VERIFIED'>('IDLE');
  const [verificationResult, setVerificationResult] = useState<{
    similarityScore: number;
    matched: boolean;
    livenessScore: number;
    purged: boolean;
  } | null>(null);

  const runBiometricPipeline = () => {
    setIsScanning(true);
    setVerificationResult(null);

    // Stage 1: Texture analysis
    setLivenessStage('TEXTURE_ANALYSIS');
    setTimeout(() => {
      // Stage 2: Active challenge prompt
      setLivenessStage('BLINK_PROMPT');
      setTimeout(() => {
        // Stage 3: Vector extraction & immediate RAM purge
        setLivenessStage('VECTOR_EXTRACTION');
        setTimeout(() => {
          // Stage 4: Cosine matching score
          const simScore = Number((0.85 + Math.random() * 0.1).toFixed(3)); // > 0.68 match
          const matched = simScore >= 0.68;
          setLivenessStage('VERIFIED');
          setIsScanning(false);

          setVerificationResult({
            similarityScore: simScore,
            matched,
            livenessScore: 0.996,
            purged: true,
          });

          if (matched) {
            onMarkAttendance({
              recordId: `rec-${Date.now()}`,
              batchId: 'BATCH-PACS-OCT-01',
              batchCode: 'PACS-BATCH-A',
              traineeId: selectedTemplate.traineeId,
              candidateName: selectedTemplate.candidateName,
              sessionId: 'sess-01',
              recordedAt: new Date().toISOString(),
              method: 'FACE_RECOGNITION',
              similarityScore: simScore,
              livenessVerified: true,
              deviceId: 'KIOSK-ICM-AHM-002',
              syncStatus: 'SYNCED',
              lamportTimestamp: Date.now(),
            });
          }
        }, 800);
      }, 700);
    }, 600);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-slate-900 border border-slate-800 p-5 rounded-2xl gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="bg-indigo-500/20 text-indigo-300 text-xs font-bold px-2.5 py-1 rounded-md border border-indigo-500/30">
              Section 2.1
            </span>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Edge Facial Recognition & Anti-Spoofing Verification Kiosk
            </h2>
          </div>
          <p className="text-slate-400 text-xs mt-1">
            Executes MobileFaceNet with ArcFace margin loss directly on COTS hardware, extracting 512-D vectors with immediate RAM purging.
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-indigo-950/60 border border-indigo-800/60 text-indigo-300 text-xs px-3.5 py-2 rounded-xl font-mono">
          <Fingerprint className="w-4 h-4 text-indigo-400" />
          <span>S_cos ≥ 0.68 | 512-D Vector</span>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Kiosk Video Feed Simulation */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-white font-bold text-sm">
              <Camera className="w-4 h-4 text-indigo-400" />
              <span>Dual RGB + NIR Camera Kiosk Stream</span>
            </div>
            <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center space-x-1">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-ping"></span>
              <span>LIVE ON-DEVICE NPU</span>
            </span>
          </div>

          {/* Camera Viewfinder */}
          <div className="relative aspect-video bg-slate-950 rounded-xl overflow-hidden border-2 border-slate-800 flex items-center justify-center">
            {/* Simulated Face Outline Grid */}
            <div className="absolute inset-0 border-2 border-dashed border-indigo-500/40 rounded-full scale-75 animate-pulse flex items-center justify-center">
              <div className="w-48 h-56 border-2 border-indigo-400 rounded-full relative flex flex-col items-center justify-center">
                <Eye className="w-6 h-6 text-indigo-300 mb-1" />
                <span className="text-[10px] text-indigo-200 font-mono">POSITION FACE</span>
              </div>
            </div>

            {/* Liveness Stage Overlay */}
            {isScanning && (
              <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xs flex flex-col items-center justify-center space-y-3 p-4 text-center">
                <RefreshCw className="w-8 h-8 text-indigo-400 animate-spin" />
                <div>
                  <p className="text-sm font-bold text-white uppercase tracking-wider">
                    {livenessStage === 'TEXTURE_ANALYSIS' && '🔍 Dual RGB + NIR Micro-Texture Analysis'}
                    {livenessStage === 'BLINK_PROMPT' && '👁️ Active Liveness: Blink / Head Turn Prompt'}
                    {livenessStage === 'VECTOR_EXTRACTION' && '⚡ Extracting 512-D Embedding Vector'}
                  </p>
                  <p className="text-xs text-indigo-300 mt-1 font-mono">
                    Evaluating ArcFace margin loss & liveness score...
                  </p>
                </div>
              </div>
            )}

            {!isScanning && (
              <div className="z-10 text-center space-y-3">
                <p className="text-xs font-semibold text-slate-300">
                  Ready to verify trainee attendance
                </p>
                <button
                  onClick={runBiometricPipeline}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-lg shadow-indigo-600/30 transition flex items-center space-x-2 mx-auto"
                >
                  <Zap className="w-4 h-4 fill-current" />
                  <span>Scan Face & Mark Attendance</span>
                </button>
              </div>
            )}
          </div>

          {/* Purge Safety Guarantee */}
          <div className="bg-slate-850 border border-slate-800 p-3 rounded-xl flex items-center justify-between text-xs">
            <div className="flex items-center space-x-2 text-slate-300 font-semibold">
              <Trash2 className="w-4 h-4 text-rose-400" />
              <span>DPDP Volatile Memory Guarantee:</span>
            </div>
            <span className="text-emerald-400 font-mono font-bold text-[11px] bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/80">
              Raw Camera Frames Erased Immediately
            </span>
          </div>
        </div>

        {/* Verification Output & Vector Inspector */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-white flex items-center space-x-2">
              <Fingerprint className="w-4 h-4 text-amber-400" />
              <span>Biometric Vector Matcher & Result</span>
            </h3>

            <div className="flex items-center space-x-2">
              <span className="text-xs text-slate-400 font-semibold">Simulate Trainee:</span>
              <select
                value={selectedTemplate.templateId}
                onChange={(e) => {
                  const tmpl = templates.find((t) => t.templateId === e.target.value);
                  if (tmpl) setSelectedTemplate(tmpl);
                }}
                className="bg-slate-800 border border-slate-700 text-white text-xs rounded-lg px-2.5 py-1 font-medium"
              >
                {templates.map((t) => (
                  <option key={t.templateId} value={t.templateId}>
                    {t.candidateName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results Display */}
          {verificationResult ? (
            <div
              className={`p-5 rounded-2xl border space-y-3 transition ${
                verificationResult.matched
                  ? 'bg-emerald-950/60 border-emerald-700 text-emerald-100'
                  : 'bg-rose-950/60 border-rose-700 text-rose-100'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-base flex items-center space-x-2">
                  {verificationResult.matched ? (
                    <>
                      <ShieldCheck className="w-5 h-5 text-emerald-400" />
                      <span>ATTENDANCE VERIFIED & MARKED</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-5 h-5 text-rose-400" />
                      <span>BIOMETRIC MATCH REJECTED</span>
                    </>
                  )}
                </span>
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-slate-900/80">
                  {selectedTemplate.candidateName}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs pt-2">
                <div className="bg-slate-900/70 p-3 rounded-xl">
                  <span className="text-slate-400 text-[10px] font-semibold block">
                    Cosine Similarity Score (S_cos)
                  </span>
                  <span
                    className={`text-lg font-mono font-extrabold ${
                      verificationResult.similarityScore >= 0.68 ? 'text-emerald-400' : 'text-rose-400'
                    }`}
                  >
                    {verificationResult.similarityScore}
                  </span>
                  <span className="text-[10px] text-slate-500 block">Threshold: ≥ 0.680</span>
                </div>

                <div className="bg-slate-900/70 p-3 rounded-xl">
                  <span className="text-slate-400 text-[10px] font-semibold block">
                    Anti-Spoofing Liveness
                  </span>
                  <span className="text-lg font-mono font-extrabold text-amber-300">
                    {verificationResult.livenessScore * 100}%
                  </span>
                  <span className="text-[10px] text-slate-500 block">Passive NIR + Blink Passed</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-slate-850 p-8 rounded-2xl border border-slate-800 text-center text-slate-500 text-xs">
              Click "Scan Face & Mark Attendance" to run the edge biometric matching pipeline.
            </div>
          )}

          {/* 512-D Embedding Vector Sample */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-300 block">
              Extracted 512-Dimensional Vector Preview (||e||_2 = 1.000)
            </span>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-[10px] text-indigo-300 overflow-x-auto max-h-36 leading-relaxed">
              [{selectedTemplate.embeddingVector.slice(0, 32).join(', ')}, ... 480 more dimensions]
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
