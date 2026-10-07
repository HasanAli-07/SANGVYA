import React, { useState, useEffect } from 'react';
import { QrCode, MapPin, Clock, Smartphone, CheckCircle2, AlertTriangle, RefreshCw } from 'lucide-react';
import type { DynamicQrPayload, AttendanceRecord } from '../types/attendance';

interface DynamicQrAttendanceProps {
  initialPayload: DynamicQrPayload;
  onMarkAttendance: (record: AttendanceRecord) => void;
}

export const DynamicQrAttendance: React.FC<DynamicQrAttendanceProps> = ({
  initialPayload,
  onMarkAttendance,
}) => {
  const [countdown, setCountdown] = useState(15);
  const [timeStep, setTimeStep] = useState(initialPayload.timeStep);
  const [hmacSig, setHmacSig] = useState(initialPayload.hmacSignature);
  const [scannedResult, setScannedResult] = useState<{
    verified: boolean;
    distanceMeters: number;
    message: string;
  } | null>(null);

  // 15-second ticker simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          const nextStep = Math.floor(Date.now() / 1000 / 15);
          setTimeStep(nextStep);
          setHmacSig(`hmac-${Math.random().toString(36).substring(2, 12)}`);
          return 15;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSimulateScan = (distance: number) => {
    const isWithinGeofence = distance <= 50.0;
    if (isWithinGeofence) {
      setScannedResult({
        verified: true,
        distanceMeters: distance,
        message: `Attendance Confirmed! Scanned within venue geofence (${distance}m away). HMAC TOTP verified.`,
      });

      onMarkAttendance({
        recordId: `rec-qr-${Date.now()}`,
        batchId: initialPayload.batchId,
        batchCode: 'PACS-BATCH-A',
        traineeId: 'nom-102',
        candidateName: 'Priya Sharma',
        sessionId: initialPayload.sessionId,
        recordedAt: new Date().toISOString(),
        method: 'DYNAMIC_QR',
        geofenceVerified: true,
        deviceId: 'M-APP-AND-9921',
        syncStatus: 'SYNCED',
        lamportTimestamp: Date.now(),
      });
    } else {
      setScannedResult({
        verified: false,
        distanceMeters: distance,
        message: `Attendance Rejected: Outside Geofence! Device is ${distance}m away from venue (max allowed: 50m).`,
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-slate-900 border border-slate-800 p-5 rounded-2xl gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="bg-indigo-500/20 text-indigo-300 text-xs font-bold px-2.5 py-1 rounded-md border border-indigo-500/30">
              Section 2.2
            </span>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Geofenced Dynamic TOTP QR Code Verification Subsystem
            </h2>
          </div>
          <p className="text-slate-400 text-xs mt-1">
            Instructor terminal renders a 15-second refreshing HMAC-SHA256 signed TOTP QR code, validated within 50m GPS/NavIC geofencing.
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-amber-950/60 border border-amber-800/60 text-amber-300 text-xs px-3.5 py-2 rounded-xl font-mono">
          <Clock className="w-4 h-4 text-amber-400" />
          <span>Refresh: 15s | Geofence: 50m</span>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Instructor Terminal Display */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-white font-bold text-sm">
              <QrCode className="w-4 h-4 text-amber-400" />
              <span>Instructor Classroom Display Terminal</span>
            </div>
            <div className="flex items-center space-x-2 text-xs font-bold text-amber-300 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-400" />
              <span>Refreshes in {countdown}s</span>
            </div>
          </div>

          {/* QR Canvas Container */}
          <div className="bg-slate-950 border-2 border-slate-800 p-6 rounded-2xl flex flex-col items-center justify-center space-y-4">
            {/* Visual Mock QR */}
            <div className="bg-white p-4 rounded-xl shadow-2xl relative border-4 border-indigo-600">
              <div className="w-44 h-44 grid grid-cols-6 gap-1 bg-slate-900 p-2 rounded-lg">
                {Array.from({ length: 36 }).map((_, i) => (
                  <div
                    key={i}
                    className={`rounded-xs ${
                      (i + timeStep) % 3 === 0 || i % 7 === 0 ? 'bg-indigo-600' : 'bg-slate-100'
                    }`}
                  ></div>
                ))}
              </div>
            </div>

            <div className="text-center space-y-1">
              <p className="text-xs font-mono font-bold text-slate-200">
                TimeStep $T_k$: {timeStep}
              </p>
              <p className="text-[10px] font-mono text-amber-300 truncate max-w-xs">
                HMAC-SHA256: {hmacSig}
              </p>
            </div>
          </div>
        </div>

        {/* Trainee Mobile Scanner Simulator */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-white flex items-center space-x-2">
              <Smartphone className="w-4 h-4 text-indigo-400" />
              <span>Trainee Mobile App Scanner & Geofence Simulator</span>
            </h3>
            <span className="text-xs text-slate-400 font-medium">GPS / NavIC Sync</span>
          </div>

          <div className="bg-slate-850 p-4 rounded-xl border border-slate-800 space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-slate-300 font-semibold">
                <MapPin className="w-4 h-4 text-emerald-400" />
                <span>Classroom Geofence Center (VAMNICOM):</span>
              </div>
              <span className="font-mono text-emerald-300">18.5204° N, 73.8567° E</span>
            </div>
            <p className="text-[11px] text-slate-400">
              Scans are validated against device coordinates to ensure physical attendance within the 50m radius.
            </p>
          </div>

          {/* Test Buttons */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-300 block">Simulate Trainee Mobile Scan:</span>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => handleSimulateScan(15)}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs p-3 rounded-xl transition text-center shadow-lg"
              >
                Scan Inside Venue (15m Away)
              </button>

              <button
                onClick={() => handleSimulateScan(120)}
                className="bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs p-3 rounded-xl transition text-center shadow-lg"
              >
                Scan Outside Venue (120m Away)
              </button>
            </div>
          </div>

          {/* Scan Result */}
          {scannedResult && (
            <div
              className={`p-4 rounded-xl border text-xs flex items-center space-x-3 transition ${
                scannedResult.verified
                  ? 'bg-emerald-950/80 border-emerald-800 text-emerald-200'
                  : 'bg-rose-950/80 border-rose-800 text-rose-200'
              }`}
            >
              {scannedResult.verified ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-rose-400 flex-shrink-0" />
              )}
              <span className="font-semibold leading-relaxed">{scannedResult.message}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
