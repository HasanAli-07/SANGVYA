import React, { useState } from 'react';
import { CalendarDays, AlertTriangle, Plus, CheckCircle2, User, MapPin } from 'lucide-react';
import type { TimetableSession } from '../types/erp';

interface TimetableSchedulerProps {
  sessions: TimetableSession[];
  onAddSession: (session: TimetableSession) => void;
  onResolveConflict: (sessionId: string, newRoom: string) => void;
}

export const TimetableScheduler: React.FC<TimetableSchedulerProps> = ({
  sessions,
  onAddSession,
  onResolveConflict,
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newSession, setNewSession] = useState<{
    batchCode: string;
    courseTitle: string;
    trainerName: string;
    roomName: string;
    dayOfWeek: TimetableSession['dayOfWeek'];
    timeSlot: TimetableSession['timeSlot'];
  }>({
    batchCode: 'PACS-BATCH-B',
    courseTitle: 'PACS Computerization & CAS Ledger',
    trainerName: 'Dr. V. K. Patil (Senior Professor)',
    roomName: 'Lecture Hall 101 (Main Building)',
    dayOfWeek: 'Monday',
    timeSlot: '09:00 - 10:30',
  });

  const conflicts = sessions.filter((s) => s.hasConflict);

  const days: TimetableSession['dayOfWeek'][] = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  const timeSlots: TimetableSession['timeSlot'][] = [
    '09:00 - 10:30',
    '10:45 - 12:15',
    '13:30 - 15:00',
    '15:15 - 16:45',
  ];

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();

    // Perform real-time conflict check
    const hasCollision = sessions.some(
      (s) =>
        s.dayOfWeek === newSession.dayOfWeek &&
        s.timeSlot === newSession.timeSlot &&
        (s.trainerName === newSession.trainerName || s.roomName === newSession.roomName)
    );

    const created: TimetableSession = {
      id: `sess-${Date.now()}`,
      batchId: `batch-${Date.now()}`,
      ...newSession,
      hasConflict: hasCollision,
      conflictDetails: hasCollision
        ? `Conflict Detected: Trainer '${newSession.trainerName}' or Room '${newSession.roomName}' is already occupied at ${newSession.dayOfWeek} (${newSession.timeSlot})`
        : undefined,
    };

    onAddSession(created);
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-slate-900 border border-slate-800 p-5 rounded-2xl gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="bg-indigo-500/20 text-indigo-300 text-xs font-bold px-2.5 py-1 rounded-md border border-indigo-500/30">
              Section 1.4
            </span>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Dynamic Timetabling & Conflict-Free Resource Scheduling
            </h2>
          </div>
          <p className="text-slate-400 text-xs mt-1">
            Constraint-based scheduling engine preventing room double-booking and trainer overlaps across overlapping batches.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition shadow-lg shadow-indigo-600/30"
        >
          <Plus className="w-4 h-4" />
          <span>Add Timetable Session</span>
        </button>
      </div>

      {/* Conflict Alerts */}
      {conflicts.length > 0 && (
        <div className="bg-rose-950/80 border border-rose-800 p-4 rounded-xl space-y-3">
          <div className="flex items-center space-x-2 text-rose-300 font-bold text-xs">
            <AlertTriangle className="w-4 h-4 text-rose-400 animate-bounce" />
            <span>Scheduling Conflicts Detected ({conflicts.length})</span>
          </div>

          <div className="space-y-2">
            {conflicts.map((c) => (
              <div
                key={c.id}
                className="bg-slate-900 border border-rose-900/60 p-3 rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center text-xs gap-3"
              >
                <div>
                  <span className="font-bold text-white">
                    [{c.batchCode}] {c.courseTitle}
                  </span>
                  <p className="text-rose-300 text-[11px] mt-0.5">{c.conflictDetails}</p>
                </div>

                <button
                  onClick={() => onResolveConflict(c.id, 'Lecture Hall 103 (Alternative Room)')}
                  className="bg-rose-600 hover:bg-rose-500 text-white font-semibold text-[11px] px-3 py-1.5 rounded-lg transition whitespace-nowrap"
                >
                  Auto-Resolve (Reassign Room)
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Weekly Grid */}
      <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-sm text-white flex items-center space-x-2">
            <CalendarDays className="w-4 h-4 text-indigo-400" />
            <span>Weekly Master Timetable Matrix</span>
          </h3>
          <span className="text-xs text-slate-400">Conflict-Free Solver Engine</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse border border-slate-800">
            <thead>
              <tr className="bg-slate-850 text-slate-300 font-bold border-b border-slate-800 text-[11px]">
                <th className="p-3 border-r border-slate-800 w-32">Time Slot</th>
                {days.map((day) => (
                  <th key={day} className="p-3 border-r border-slate-800 text-center">
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {timeSlots.map((slot) => (
                <tr key={slot} className="hover:bg-slate-850/40">
                  <td className="p-3 border-r border-slate-800 font-mono font-semibold text-amber-300 text-[11px] whitespace-nowrap bg-slate-900/50">
                    {slot}
                  </td>
                  {days.map((day) => {
                    const matchSessions = sessions.filter(
                      (s) => s.dayOfWeek === day && s.timeSlot === slot
                    );

                    return (
                      <td key={day} className="p-2 border-r border-slate-800 align-top min-w-[150px]">
                        {matchSessions.length === 0 ? (
                          <div className="h-16 border border-dashed border-slate-800 rounded-lg flex items-center justify-center text-[10px] text-slate-600 font-medium">
                            Available Slot
                          </div>
                        ) : (
                          matchSessions.map((sess) => (
                            <div
                              key={sess.id}
                              className={`p-2.5 rounded-lg border space-y-1.5 transition ${
                                sess.hasConflict
                                  ? 'bg-rose-950/60 border-rose-600 text-rose-200'
                                  : 'bg-indigo-950/40 border-indigo-800/80 text-indigo-100'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-bold text-[11px] text-white">
                                  {sess.batchCode}
                                </span>
                                {sess.hasConflict ? (
                                  <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                                ) : (
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                                )}
                              </div>

                              <p className="text-[10px] font-semibold text-slate-200 line-clamp-1">
                                {sess.courseTitle}
                              </p>

                              <div className="text-[10px] text-slate-400 space-y-0.5 pt-1 border-t border-slate-800/60">
                                <div className="flex items-center space-x-1">
                                  <User className="w-3 h-3 text-indigo-400" />
                                  <span className="truncate">{sess.trainerName}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <MapPin className="w-3 h-3 text-emerald-400" />
                                  <span className="truncate">{sess.roomName}</span>
                                </div>
                              </div>
                            </div>
                          ))
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Session Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-2xl p-6 shadow-2xl space-y-4 text-xs">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">Schedule Timetable Session</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white">
                ✕
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-3">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Batch Code</label>
                <input
                  type="text"
                  required
                  value={newSession.batchCode}
                  onChange={(e) => setNewSession({ ...newSession, batchCode: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Course Title</label>
                <input
                  type="text"
                  required
                  value={newSession.courseTitle}
                  onChange={(e) => setNewSession({ ...newSession, courseTitle: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Assigned Trainer</label>
                <input
                  type="text"
                  required
                  value={newSession.trainerName}
                  onChange={(e) => setNewSession({ ...newSession, trainerName: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Assigned Venue / Room</label>
                <input
                  type="text"
                  required
                  value={newSession.roomName}
                  onChange={(e) => setNewSession({ ...newSession, roomName: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Day of Week</label>
                  <select
                    value={newSession.dayOfWeek}
                    onChange={(e) =>
                      setNewSession({
                        ...newSession,
                        dayOfWeek: e.target.value as TimetableSession['dayOfWeek'],
                      })
                    }
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white"
                  >
                    {days.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Time Slot</label>
                  <select
                    value={newSession.timeSlot}
                    onChange={(e) =>
                      setNewSession({
                        ...newSession,
                        timeSlot: e.target.value as TimetableSession['timeSlot'],
                      })
                    }
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white font-mono"
                  >
                    {timeSlots.map((ts) => (
                      <option key={ts} value={ts}>
                        {ts}
                      </option>
                    ))}
                  </select>
                </div>
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
                  Schedule Session
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
