import React, { useState } from 'react';
import { ShieldAlert, CheckCircle2, Plus, Lock } from 'lucide-react';
import type { AttendanceException } from '../types/attendance';

interface AttendanceExceptionsProps {
  exceptions: AttendanceException[];
  onAddException: (exc: AttendanceException) => void;
  onApproveException: (id: string, approver: string) => void;
}

export const AttendanceExceptions: React.FC<AttendanceExceptionsProps> = ({
  exceptions,
  onAddException,
  onApproveException,
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newExc, setNewExc] = useState<Partial<AttendanceException>>({
    candidateName: 'Vijay Singh',
    traineeId: 'nom-104',
    batchCode: 'PACS-BATCH-A',
    requestedBy: 'Prof. Ananya Iyer',
    reasonCategory: 'TECHNICAL_FAIL',
    justificationNotes: 'Camera lens smudge on edge kiosk caused false rejection (FRR). Identity physically verified.',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExc.candidateName || !newExc.justificationNotes) return;

    onAddException({
      id: `exc-${Date.now()}`,
      traineeId: newExc.traineeId || 'nom-100',
      candidateName: newExc.candidateName,
      batchCode: newExc.batchCode || 'PACS-BATCH-A',
      requestedBy: newExc.requestedBy || 'Faculty',
      reasonCategory: newExc.reasonCategory as any,
      justificationNotes: newExc.justificationNotes,
      status: 'PENDING_APPROVAL',
      timestamp: new Date().toISOString(),
    });
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-slate-900 border border-slate-800 p-5 rounded-2xl gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="bg-indigo-500/20 text-indigo-300 text-xs font-bold px-2.5 py-1 rounded-md border border-indigo-500/30">
              Section 2.4
            </span>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Attendance Override & Exception Management Subsystem
            </h2>
          </div>
          <p className="text-slate-400 text-xs mt-1">
            Enables justified manual attendance overrides with mandatory secondary Training Coordinator approval and tamper-evident audit logging.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition shadow-lg shadow-indigo-600/30"
        >
          <Plus className="w-4 h-4" />
          <span>Request Exception Override</span>
        </button>
      </div>

      {/* Exception Audit Roster */}
      <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-sm text-white flex items-center space-x-2">
            <ShieldAlert className="w-4 h-4 text-amber-400" />
            <span>Attendance Exception Override Roster ({exceptions.length})</span>
          </h3>
          <span className="text-xs text-slate-400 font-mono">Immutable Cryptographic Audit Trail</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                <th className="py-2.5 px-3">Candidate & Batch</th>
                <th className="py-2.5 px-3">Requested By</th>
                <th className="py-2.5 px-3">Category</th>
                <th className="py-2.5 px-3">Justification Notes</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3 text-right">Secondary Approval</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {exceptions.map((exc) => (
                <tr key={exc.id} className="hover:bg-slate-850/50">
                  <td className="py-3 px-3 font-semibold text-white">
                    <div>
                      <span>{exc.candidateName}</span>
                      <span className="block text-[10px] text-indigo-300 font-mono">
                        {exc.batchCode}
                      </span>
                    </div>
                  </td>

                  <td className="py-3 px-3 text-slate-300">{exc.requestedBy}</td>

                  <td className="py-3 px-3">
                    <span className="bg-slate-800 border border-slate-700 text-amber-300 text-[10px] font-mono font-bold px-2 py-0.5 rounded">
                      {exc.reasonCategory}
                    </span>
                  </td>

                  <td className="py-3 px-3 text-slate-300 max-w-xs leading-relaxed text-[11px]">
                    {exc.justificationNotes}
                  </td>

                  <td className="py-3 px-3">
                    <span
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full inline-flex items-center space-x-1 ${
                        exc.status === 'APPROVED'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : exc.status === 'REJECTED'
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}
                    >
                      {exc.status === 'APPROVED' ? (
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      ) : (
                        <Lock className="w-3 h-3 text-amber-400" />
                      )}
                      <span>{exc.status}</span>
                    </span>
                  </td>

                  <td className="py-3 px-3 text-right">
                    {exc.status === 'PENDING_APPROVAL' ? (
                      <button
                        onClick={() => onApproveException(exc.id, 'Dr. V. K. Patil (Coordinator)')}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px] px-3 py-1 rounded-md transition shadow-sm"
                      >
                        Approve Override
                      </button>
                    ) : (
                      <span className="text-[10px] text-slate-400 font-mono">
                        Approved by {exc.approvedBy}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Exception Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-2xl p-6 shadow-2xl space-y-4 text-xs">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">Submit Attendance Override Request</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white">
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Candidate Name</label>
                <input
                  type="text"
                  required
                  value={newExc.candidateName}
                  onChange={(e) => setNewExc({ ...newExc, candidateName: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Batch Code</label>
                <input
                  type="text"
                  required
                  value={newExc.batchCode}
                  onChange={(e) => setNewExc({ ...newExc, batchCode: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Override Reason Category</label>
                <select
                  value={newExc.reasonCategory}
                  onChange={(e) => setNewExc({ ...newExc, reasonCategory: e.target.value as any })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white font-mono"
                >
                  <option value="TECHNICAL_FAIL">TECHNICAL_FAIL (Kiosk Camera Lens Smudge / FRR)</option>
                  <option value="MEDICAL">MEDICAL (Trainee Medical Leave)</option>
                  <option value="FIELD_DUTY">FIELD_DUTY (PACS Field Duty Assignment)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Mandatory Justification Notes</label>
                <textarea
                  required
                  rows={3}
                  value={newExc.justificationNotes}
                  onChange={(e) => setNewExc({ ...newExc, justificationNotes: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 font-semibold hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-500 shadow-md"
                >
                  Submit for Coordinator Approval
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
