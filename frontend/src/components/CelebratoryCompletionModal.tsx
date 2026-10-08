import React, { useEffect, useRef, useState } from 'react';
import { Award, CheckCircle2, QrCode, Smartphone, X, Sparkles } from 'lucide-react';
import { SdsButton } from './ui/SdsButton';

interface CelebratoryCompletionModalProps {
  isOpen: boolean;
  onClose: () => void;
  candidateName?: string;
  courseTitle?: string;
  grade?: string;
}

export const CelebratoryCompletionModal: React.FC<CelebratoryCompletionModalProps> = ({
  isOpen,
  onClose,
  candidateName = 'Ramesh Kumar Patel',
  courseTitle = 'PACS Computerization & CAS Accounting',
  grade = 'A+',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isExportedToDigiLocker, setIsExportedToDigiLocker] = useState(false);

  // Confetti particle simulation on canvas
  useEffect(() => {
    if (!isOpen || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const particles: { x: number; y: number; size: number; color: string; vx: number; vy: number }[] = [];
    const colors = ['#f59e0b', '#6366f1', '#10b981', '#ec4899', '#3b82f6'];

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height * 0.4,
        size: Math.random() * 6 + 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 4,
        vy: Math.random() * 3 + 2,
      });
    }

    let animationFrameId: number;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y > canvas.height) p.y = 0;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleExportDigiLocker = () => {
    setIsExportedToDigiLocker(true);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in">
      <div className="relative bg-slate-900 border border-amber-500/40 w-full max-w-lg rounded-3xl p-6 shadow-2xl space-y-5 text-center overflow-hidden">
        {/* Background Confetti Canvas */}
        <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none w-full h-full" />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Celebratory Icon */}
        <div className="relative mx-auto w-16 h-16 rounded-full bg-gradient-to-tr from-amber-500 to-indigo-600 flex items-center justify-center shadow-xl shadow-amber-500/30">
          <Award className="w-8 h-8 text-white" />
          <Sparkles className="w-5 h-5 text-amber-300 absolute -top-1 -right-1 animate-spin" />
        </div>

        <div>
          <span className="bg-amber-500/20 text-amber-300 text-xs font-mono font-bold px-3 py-1 rounded-full border border-amber-500/30">
            Assessment Passed & Criteria Fulfilled!
          </span>
          <h2 className="text-xl font-extrabold text-white tracking-tight mt-2">
            Congratulations, {candidateName}! 🎉
          </h2>
          <p className="text-slate-400 text-xs mt-1">
            You have successfully completed <strong className="text-slate-200">{courseTitle}</strong> with Grade <strong className="text-emerald-400">{grade}</strong>.
          </p>
        </div>

        {/* W3C Verified Certificate Showcase Card */}
        <div className="relative bg-slate-950 border-2 border-amber-500/30 rounded-2xl p-4 text-left space-y-3 font-mono shadow-inner">
          <div className="flex justify-between items-center border-b border-slate-800 pb-2">
            <div>
              <span className="text-[10px] text-amber-400 font-bold block">MINISTRY OF COOPERATION</span>
              <span className="text-[11px] text-white font-bold block">National Council for Cooperative Training (NCCT)</span>
            </div>
            <div className="bg-indigo-950 p-1.5 rounded-lg border border-indigo-800">
              <QrCode className="w-8 h-8 text-indigo-300" />
            </div>
          </div>

          <div className="text-[11px] space-y-1 text-slate-300 font-sans">
            <p>Trainee: <strong className="text-white">{candidateName}</strong></p>
            <p>Certificate URN: <span className="text-amber-300 font-mono text-[10px]">urn:uuid:8f14b3d7-2194-4e4b-97e3-0d319e7a9c21</span></p>
            <p>Issuer DID: <span className="text-slate-400 font-mono text-[10px]">did:ncct:vamnicom:pune:2026</span></p>
          </div>

          <div className="flex items-center justify-between text-[10px] text-emerald-400 pt-1 border-t border-slate-800 font-mono">
            <span className="flex items-center space-x-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Ed25519 HSM Cryptographically Signed</span>
            </span>
            <span>Grade {grade}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 pt-2">
          {isExportedToDigiLocker ? (
            <div className="bg-emerald-950/80 border border-emerald-800 p-3 rounded-xl text-emerald-300 text-xs font-bold flex items-center justify-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Pushed to Citizen DigiLocker Wallet via API Setu!</span>
            </div>
          ) : (
            <SdsButton
              variant="voice"
              size="lg"
              className="w-full"
              onClick={handleExportDigiLocker}
              icon={<Smartphone className="w-4 h-4" />}
            >
              Add Certificate to DigiLocker
            </SdsButton>
          )}

          <SdsButton variant="secondary" size="md" className="w-full" onClick={onClose}>
            Close & Return to Learning Dashboard
          </SdsButton>
        </div>
      </div>
    </div>
  );
};
