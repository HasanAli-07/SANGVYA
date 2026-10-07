import React, { useState } from 'react';
import { BarChart3, Download, TrendingUp, Building2, Users, Award, CheckCircle2, Globe } from 'lucide-react';
import type { MisKpiMetrics, RegionalSkillGapMetric } from '../types/analytics';

interface ExecutiveMisDashboardsProps {
  kpis: MisKpiMetrics;
  skillGaps: RegionalSkillGapMetric[];
}

export const ExecutiveMisDashboards: React.FC<ExecutiveMisDashboardsProps> = ({ kpis, skillGaps }) => {
  const [selectedFormat, setSelectedFormat] = useState<'CSV' | 'EXCEL' | 'PDF'>('PDF');
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const handleExportReport = () => {
    setDownloadSuccess(`Exported Statutory NCCT MIS Report in ${selectedFormat} format successfully.`);
    setTimeout(() => setDownloadSuccess(null), 3500);
  };

  const pacsProgressPct = Math.round((kpis.totalPacsComputerised / kpis.targetPacs) * 100);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-slate-900 border border-slate-800 p-5 rounded-2xl gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="bg-indigo-500/20 text-indigo-300 text-xs font-bold px-2.5 py-1 rounded-md border border-indigo-500/30">
              Section 7.1
            </span>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Apex Executive MIS Analytics & Capacity Building Reporting
            </h2>
          </div>
          <p className="text-slate-400 text-xs mt-1">
            Aggregates live KPIs across 20 NCCT institutions (VAMNICOM, 5 RICMs, 14 ICMs) for Ministry of Cooperation oversight.
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs">
          <select
            value={selectedFormat}
            onChange={(e) => setSelectedFormat(e.target.value as 'CSV' | 'EXCEL' | 'PDF')}
            className="bg-slate-800 border border-slate-700 text-white rounded-xl px-3 py-2 font-semibold"
          >
            <option value="PDF">PDF Statutory Report</option>
            <option value="EXCEL">Excel Data Workbook</option>
            <option value="CSV">Raw CSV Dump</option>
          </select>

          <button
            onClick={handleExportReport}
            className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-4 py-2 rounded-xl transition shadow-lg shadow-indigo-600/30"
          >
            <Download className="w-4 h-4" />
            <span>Export Apex MIS Report</span>
          </button>
        </div>
      </div>

      {downloadSuccess && (
        <div className="bg-emerald-950/80 border border-emerald-800 p-4 rounded-xl text-xs flex items-center space-x-3 text-emerald-200">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <span className="font-semibold">{downloadSuccess}</span>
        </div>
      )}

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* PACS Computerization */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
          <div className="flex justify-between items-center text-slate-400 text-xs font-semibold">
            <span>PACS Computerised</span>
            <Building2 className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-extrabold text-white font-mono">{kpis.totalPacsComputerised.toLocaleString()}</span>
            <span className="text-xs text-slate-400 font-mono">/ {kpis.targetPacs.toLocaleString()}</span>
          </div>
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div className="bg-indigo-500 h-full rounded-full" style={{ width: `${pacsProgressPct}%` }}></div>
          </div>
          <span className="text-[10px] text-indigo-300 font-mono block">{pacsProgressPct}% National Target Achieved</span>
        </div>

        {/* Total Trainees Enrolled */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
          <div className="flex justify-between items-center text-slate-400 text-xs font-semibold">
            <span>Trainees Enrolled</span>
            <Users className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-extrabold text-white font-mono">{kpis.totalTraineesEnrolled.toLocaleString()}</div>
          <div className="flex items-center space-x-1 text-emerald-400 text-[11px] font-semibold">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+14.2% YoY Capacity Expansion</span>
          </div>
        </div>

        {/* Total Certified Candidates */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
          <div className="flex justify-between items-center text-slate-400 text-xs font-semibold">
            <span>Certified Candidates</span>
            <Award className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-extrabold text-emerald-400 font-mono">{kpis.totalCertifiedCandidates.toLocaleString()}</div>
          <span className="text-[10px] text-slate-400 font-mono block">Pass Rate: {Math.round((kpis.totalCertifiedCandidates / kpis.totalTraineesEnrolled) * 100)}%</span>
        </div>

        {/* National Placement Ratio */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
          <div className="flex justify-between items-center text-slate-400 text-xs font-semibold">
            <span>National Placement Rate</span>
            <Globe className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-extrabold text-purple-400 font-mono">{kpis.overallPlacementRatePct}%</div>
          <span className="text-[10px] text-slate-400 font-mono block">{kpis.totalPlacements.toLocaleString()} Placed in PACS & Cooperatives</span>
        </div>
      </div>

      {/* Regional Skill Gap Heatmap Table */}
      <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4 text-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-white font-bold text-sm">
            <BarChart3 className="w-4 h-4 text-indigo-400" />
            <span>Regional Cooperative Skill Gap & Demand-Supply Heatmap</span>
          </div>
          <span className="bg-indigo-950 text-indigo-300 text-[11px] font-mono px-2.5 py-1 rounded border border-indigo-800 font-bold">
            20 Apex Institutions Monitored
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-semibold text-[11px]">
                <th className="py-2.5 px-3">Region Code & Name</th>
                <th className="py-2.5 px-3">Apex Institute</th>
                <th className="py-2.5 px-3 text-right">Enrolled</th>
                <th className="py-2.5 px-3 text-right">Certified</th>
                <th className="py-2.5 px-3 text-right">Placed</th>
                <th className="py-2.5 px-3 text-center">Demand-Supply Ratio</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {skillGaps.map((sg) => (
                <tr key={sg.regionCode} className="hover:bg-slate-850 transition">
                  <td className="py-3 px-3">
                    <span className="font-bold text-white block">{sg.regionCode}</span>
                    <span className="text-[10px] text-slate-400">{sg.regionName}</span>
                  </td>
                  <td className="py-3 px-3 text-slate-300 font-medium max-w-xs truncate">{sg.instituteName}</td>
                  <td className="py-3 px-3 text-right font-mono text-slate-200">{sg.enrolledCount.toLocaleString()}</td>
                  <td className="py-3 px-3 text-right font-mono text-emerald-400 font-semibold">{sg.certifiedCount.toLocaleString()}</td>
                  <td className="py-3 px-3 text-right font-mono text-purple-400 font-semibold">{sg.placedCount.toLocaleString()}</td>
                  <td className="py-3 px-3 text-center">
                    <span className={`inline-block px-2.5 py-1 rounded-full font-mono font-bold text-[10px] ${
                      sg.demandSupplyGapRatio >= 1.3
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                        : sg.demandSupplyGapRatio >= 1.0
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    }`}>
                      {sg.demandSupplyGapRatio}x {sg.demandSupplyGapRatio >= 1.3 ? 'HIGH DEMAND GAP' : 'BALANCED'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
