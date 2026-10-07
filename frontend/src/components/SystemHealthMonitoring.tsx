import React from 'react';
import { Activity, Server, Cpu, HardDrive, Zap, CheckCircle2 } from 'lucide-react';
import type { MicroserviceHealth } from '../types/analytics';

interface SystemHealthMonitoringProps {
  services: MicroserviceHealth[];
}

export const SystemHealthMonitoring: React.FC<SystemHealthMonitoringProps> = ({ services }) => {
  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-slate-900 border border-slate-800 p-5 rounded-2xl gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="bg-indigo-500/20 text-indigo-300 text-xs font-bold px-2.5 py-1 rounded-md border border-indigo-500/30">
              Section 7.4
            </span>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Microservices System Health & Latency SLA Monitoring Console
            </h2>
          </div>
          <p className="text-slate-400 text-xs mt-1">
            Real-time telemetry and API performance monitoring for Edge Face Kiosks, Bhashini NMT, DigiLocker HSM, pgvector RAG, and NCS Bridge.
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-emerald-950/60 border border-emerald-800/60 text-emerald-300 text-xs px-3.5 py-2 rounded-xl font-mono">
          <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span>All 5 Microservices Operating Normally</span>
        </div>
      </div>

      {/* Microservice Health Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {services.map((svc) => (
          <div
            key={svc.serviceId}
            className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-500/30 flex items-center space-x-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  <span>{svc.status}</span>
                </span>
                <span className="text-[10px] font-mono text-slate-400">Uptime: {svc.uptimePercentage}%</span>
              </div>

              <div className="flex items-start space-x-2">
                <Server className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
                <h3 className="font-bold text-sm text-white leading-snug">{svc.serviceName}</h3>
              </div>

              {/* Latency & Connections */}
              <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-1">
                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-500 block">API Latency SLA</span>
                  <span className="font-bold text-amber-300">{svc.latencyMs} ms</span>
                </div>

                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-500 block">Active Streams</span>
                  <span className="font-bold text-indigo-300">{svc.activeConnections} gRPC/WS</span>
                </div>
              </div>

              {/* Resource Utilization */}
              <div className="space-y-2 pt-1">
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between text-[11px] text-slate-400">
                    <span className="flex items-center space-x-1">
                      <Cpu className="w-3 h-3 text-indigo-400" />
                      <span>CPU Utilization</span>
                    </span>
                    <span className="font-mono text-slate-200">{svc.cpuUsagePct}%</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-indigo-500 h-full rounded-full" style={{ width: `${svc.cpuUsagePct}%` }}></div>
                  </div>
                </div>

                <div className="space-y-1 text-xs">
                  <div className="flex justify-between text-[11px] text-slate-400">
                    <span className="flex items-center space-x-1">
                      <HardDrive className="w-3 h-3 text-purple-400" />
                      <span>RAM Footprint</span>
                    </span>
                    <span className="font-mono text-slate-200">{svc.memoryUsageMB} MB</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-purple-500 h-full rounded-full" style={{ width: '35%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-800 pt-3 text-[10px] text-slate-500 font-mono flex justify-between items-center">
              <span>Service ID: {svc.serviceId}</span>
              <span>Checked: {new Date(svc.lastChecked).toLocaleTimeString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
