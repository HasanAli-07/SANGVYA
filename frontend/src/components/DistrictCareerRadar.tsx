import React, { useEffect, useRef } from 'react';
import { Target, TrendingUp } from 'lucide-react';
import { SdsCard } from './ui/SdsCard';

interface DistrictCareerRadarProps {
  districtName?: string;
  candidateSkills?: string[];
}

export const DistrictCareerRadar: React.FC<DistrictCareerRadarProps> = ({
  districtName = 'Pune District',
  candidateSkills = ['PACS Accounting', 'CAS Ledger Reconciliation', 'MIS Reporting'],
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 300;
    canvas.height = 240;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 80;

    const dimensions = [
      { name: 'PACS CAS', candidate: 0.9, demand: 0.8 },
      { name: 'Coop Audit', candidate: 0.6, demand: 0.9 },
      { name: 'Dairy QC', candidate: 0.4, demand: 0.7 },
      { name: 'MIS Data', candidate: 0.95, demand: 0.85 },
      { name: 'Cyber Sec', candidate: 0.5, demand: 0.6 },
    ];

    const numPoints = dimensions.length;

    // Draw background spider web rings
    ctx.strokeStyle = 'rgba(51, 65, 85, 0.4)';
    ctx.lineWidth = 1;
    for (let r = 0.25; r <= 1.0; r += 0.25) {
      ctx.beginPath();
      for (let i = 0; i < numPoints; i++) {
        const angle = (Math.PI * 2 * i) / numPoints - Math.PI / 2;
        const x = centerX + radius * r * Math.cos(angle);
        const y = centerY + radius * r * Math.sin(angle);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();
    }

    // Draw axes
    ctx.font = '10px sans-serif';
    ctx.fillStyle = '#94a3b8';
    ctx.textAlign = 'center';

    for (let i = 0; i < numPoints; i++) {
      const angle = (Math.PI * 2 * i) / numPoints - Math.PI / 2;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(x, y);
      ctx.stroke();

      // Text labels
      const labelX = centerX + (radius + 20) * Math.cos(angle);
      const labelY = centerY + (radius + 15) * Math.sin(angle) + 4;
      ctx.fillText(dimensions[i].name, labelX, labelY);
    }

    // Draw Employer District Demand Polygon (Amber)
    ctx.beginPath();
    ctx.fillStyle = 'rgba(245, 158, 11, 0.2)';
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 1.5;
    for (let i = 0; i < numPoints; i++) {
      const angle = (Math.PI * 2 * i) / numPoints - Math.PI / 2;
      const rVal = radius * dimensions[i].demand;
      const x = centerX + rVal * Math.cos(angle);
      const y = centerY + rVal * Math.sin(angle);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Draw Candidate Verified Skill Polygon (Indigo)
    ctx.beginPath();
    ctx.fillStyle = 'rgba(99, 102, 241, 0.35)';
    ctx.strokeStyle = '#6366f1';
    ctx.lineWidth = 2;
    for (let i = 0; i < numPoints; i++) {
      const angle = (Math.PI * 2 * i) / numPoints - Math.PI / 2;
      const rVal = radius * dimensions[i].candidate;
      const x = centerX + rVal * Math.cos(angle);
      const y = centerY + rVal * Math.sin(angle);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }, [candidateSkills]);

  return (
    <SdsCard elevation="hover" className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Target className="w-4 h-4 text-amber-400" />
          <h3 className="font-bold text-sm text-white">{districtName} Cooperative Career Radar</h3>
        </div>
        <span className="bg-indigo-500/20 text-indigo-300 text-[10px] font-bold font-mono px-2.5 py-0.5 rounded-full">
          AI Skill vs Job Matching
        </span>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Canvas Radar */}
        <div className="relative flex justify-center items-center">
          <canvas ref={canvasRef} className="w-[300px] h-[240px]" />
        </div>

        {/* Legend & Proximity Breakdown */}
        <div className="space-y-3 text-xs w-full sm:w-48 font-sans">
          <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-indigo-500"></span>
              <span className="text-slate-300 font-semibold">Trainee Certified Skills</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-amber-500"></span>
              <span className="text-slate-300 font-semibold">{districtName} PACS Demand</span>
            </div>
          </div>

          <div className="bg-emerald-950/60 border border-emerald-800 p-2.5 rounded-xl text-emerald-200 text-[11px] space-y-1">
            <div className="flex items-center space-x-1 font-bold">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
              <span>High Match Index: 92%</span>
            </div>
            <p className="text-[10px] text-slate-300">
              3 PACS Requisitions open within 5km radius matching your verified CAS certificate.
            </p>
          </div>
        </div>
      </div>
    </SdsCard>
  );
};
