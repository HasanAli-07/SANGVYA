import React, { useState } from 'react';
import { BarChart3, Download, Building2, Users, Award, CheckCircle2, TrendingUp } from 'lucide-react';
import { LightCard } from '../light_ui/LightCard';
import { LightButton } from '../light_ui/LightButton';
import { LightBadge } from '../light_ui/LightBadge';
import type { MisKpiMetrics, RegionalSkillGapMetric } from '../../types/analytics';

interface NationalPacsMisReportingProps {
  kpis: MisKpiMetrics;
  skillGaps: RegionalSkillGapMetric[];
}

export const NationalPacsMisReporting: React.FC<NationalPacsMisReportingProps> = ({ kpis, skillGaps }) => {
  const [downloadNotice, setDownloadNotice] = useState<string | null>(null);

  const handleExport = (format: string) => {
    setDownloadNotice(`Generated Statutory NCCT Apex Report in ${format} format.`);
    setTimeout(() => setDownloadNotice(null), 3500);
  };

  const pacsPct = Math.round((kpis.totalPacsComputerised / kpis.targetPacs) * 100);

  return (
    <div className="space-y-6 text-slate-900">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white border border-slate-200 p-5 rounded-2xl gap-4 shadow-sm">
        <div>
          <div className="flex items-center space-x-2">
            <span className="bg-amber-100 text-amber-900 text-xs font-extrabold px-2.5 py-1 rounded-md border border-amber-300">
              Role 1 • Section 7.1
            </span>
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
              National PACS Computerization & Executive MIS Reporting
            </h2>
          </div>
          <p className="text-slate-500 text-xs mt-1">
            Aggregates Ministry of Cooperation targets across 100,000 PACS, 148,500 trainees, and 20 NCCT training hubs.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <LightButton variant="outline" size="sm" onClick={() => handleExport('PDF')}>
            PDF Report
          </LightButton>
          <LightButton variant="saffron" size="sm" onClick={() => handleExport('Excel')} icon={<Download className="w-3.5 h-3.5" />}>
            Export Apex MIS
          </LightButton>
        </div>
      </div>

      {downloadNotice && (
        <div className="bg-emerald-50 border border-emerald-300 p-4 rounded-xl text-xs flex items-center space-x-3 text-emerald-900 font-semibold">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <span>{downloadNotice}</span>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <LightCard className="space-y-2">
          <div className="flex justify-between items-center text-xs font-semibold text-slate-500">
            <span>PACS Computerised</span>
            <Building2 className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 font-mono">
            {kpis.totalPacsComputerised.toLocaleString()}
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden border border-slate-200">
            <div className="bg-amber-500 h-full rounded-full" style={{ width: `${pacsPct}%` }}></div>
          </div>
          <span className="text-[10px] text-amber-800 font-mono font-bold block">{pacsPct}% Target Achieved</span>
        </LightCard>

        <LightCard className="space-y-2">
          <div className="flex justify-between items-center text-xs font-semibold text-slate-500">
            <span>Trainees Enrolled</span>
            <Users className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 font-mono">
            {kpis.totalTraineesEnrolled.toLocaleString()}
          </div>
          <div className="flex items-center space-x-1 text-emerald-700 text-[11px] font-bold">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+14.2% Capacity Expansion</span>
          </div>
        </LightCard>

        <LightCard className="space-y-2">
          <div className="flex justify-between items-center text-xs font-semibold text-slate-500">
            <span>Certified Candidates</span>
            <Award className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-extrabold text-emerald-700 font-mono">
            {kpis.totalCertifiedCandidates.toLocaleString()}
          </div>
          <span className="text-[10px] text-slate-500 font-mono block">Pass Rate: 83.6%</span>
        </LightCard>

        <LightCard className="space-y-2">
          <div className="flex justify-between items-center text-xs font-semibold text-slate-500">
            <span>National Placement Ratio</span>
            <BarChart3 className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl font-extrabold text-purple-900 font-mono">
            {kpis.overallPlacementRatePct}%
          </div>
          <span className="text-[10px] text-slate-500 font-mono block">{kpis.totalPlacements.toLocaleString()} Placed</span>
        </LightCard>
      </div>

      {/* Heatmap Table */}
      <LightCard className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-sm text-slate-900 flex items-center space-x-2">
            <BarChart3 className="w-4 h-4 text-amber-600" />
            <span>Regional Cooperative Skill Gap & Capacity Heatmap</span>
          </h3>
          <LightBadge variant="saffron">5 Regional Zones</LightBadge>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-semibold text-[11px]">
                <th className="py-2.5 px-3">Region Code & Name</th>
                <th className="py-2.5 px-3">Apex Unit</th>
                <th className="py-2.5 px-3 text-right">Enrolled</th>
                <th className="py-2.5 px-3 text-right">Certified</th>
                <th className="py-2.5 px-3 text-right">Placed</th>
                <th className="py-2.5 px-3 text-center">Demand-Supply Gap</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {skillGaps.map((sg) => (
                <tr key={sg.regionCode} className="hover:bg-slate-50 transition">
                  <td className="py-3 px-3">
                    <span className="font-bold text-slate-900 block">{sg.regionCode}</span>
                    <span className="text-[10px] text-slate-500">{sg.regionName}</span>
                  </td>
                  <td className="py-3 px-3 text-slate-700 font-semibold max-w-xs truncate">{sg.instituteName}</td>
                  <td className="py-3 px-3 text-right font-mono">{sg.enrolledCount.toLocaleString()}</td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-emerald-700">{sg.certifiedCount.toLocaleString()}</td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-purple-700">{sg.placedCount.toLocaleString()}</td>
                  <td className="py-3 px-3 text-center">
                    <LightBadge variant={sg.demandSupplyGapRatio >= 1.3 ? 'saffron' : 'emerald'}>
                      {sg.demandSupplyGapRatio}x {sg.demandSupplyGapRatio >= 1.3 ? 'HIGH DEMAND' : 'BALANCED'}
                    </LightBadge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </LightCard>
    </div>
  );
};
