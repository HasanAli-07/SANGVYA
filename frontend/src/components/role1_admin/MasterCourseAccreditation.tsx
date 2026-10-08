import React, { useState } from 'react';
import { BookOpen, Plus, Award, CheckCircle2, FileText } from 'lucide-react';
import { LightCard } from '../light_ui/LightCard';
import { LightButton } from '../light_ui/LightButton';
import { LightBadge } from '../light_ui/LightBadge';
import type { Course } from '../../types/erp';

interface MasterCourseAccreditationProps {
  courses: Course[];
  onAddCourse: (course: Course) => void;
}

export const MasterCourseAccreditation: React.FC<MasterCourseAccreditationProps> = ({
  courses,
  onAddCourse,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('Advanced PACS Cyber & Financial Audit');
  const [code, setCode] = useState('PACS-AUDIT-301');
  const [nosCode, setNosCode] = useState('NOS-COOP-8821');
  const [abcCreditHours, setAbcCreditHours] = useState(4);
  const [durationWeeks, setDurationWeeks] = useState(12);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    onAddCourse({
      id: `course-${Date.now()}`,
      title,
      code,
      nosCode,
      abcCreditHours: Number(abcCreditHours),
      durationWeeks: Number(durationWeeks),
      targetAudience: 'PACS Secretaries & DCCB Auditors',
      minAttendancePercent: 80,
      passMarkPercent: 75,
      isNcctAccredited: true,
    });
    setShowModal(false);
  };

  return (
    <div className="space-y-6 text-slate-900">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white border border-slate-200 p-5 rounded-2xl gap-4 shadow-sm">
        <div>
          <div className="flex items-center space-x-2">
            <span className="bg-amber-100 text-amber-900 text-xs font-extrabold px-2.5 py-1 rounded-md border border-amber-300">
              Role 1 • Section 1.2
            </span>
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
              Master Course Catalog & NOS Credit Accreditation
            </h2>
          </div>
          <p className="text-slate-500 text-xs mt-1">
            Standardizes cooperative curriculum across all 20 NCCT institutions with National Occupational Standards (NOS) & Academic Bank of Credits (ABC) hours.
          </p>
        </div>

        <LightButton
          variant="saffron"
          onClick={() => setShowModal(true)}
          icon={<Plus className="w-4 h-4" />}
        >
          Accredit New Course
        </LightButton>
      </div>

      {/* Course Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {courses.map((course) => (
          <LightCard key={course.id} className="space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <LightBadge variant="navy">{course.code}</LightBadge>
                <LightBadge variant="emerald" icon={<CheckCircle2 className="w-3 h-3" />}>
                  NOS Accredited
                </LightBadge>
              </div>

              <h3 className="font-bold text-sm text-slate-900 leading-snug">{course.title}</h3>

              <div className="text-xs text-slate-500 space-y-1">
                <p>NOS Code: <code className="text-amber-800 font-bold">{course.nosCode}</code></p>
                <p>Target: <span className="text-slate-700 font-medium">{course.targetAudience}</span></p>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-3 flex items-center justify-between text-xs font-mono">
              <span className="text-indigo-900 font-bold">{course.abcCreditHours} ABC Credit Hours</span>
              <span className="text-slate-500">{course.durationWeeks} Weeks</span>
            </div>
          </LightCard>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white border border-slate-200 w-full max-w-md rounded-2xl p-6 shadow-2xl space-y-4 text-xs">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Accredit NCCT Course</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-900">
                ✕
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Course Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Course Code</label>
                  <input
                    type="text"
                    required
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-slate-900 font-mono"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">NOS Code</label>
                  <input
                    type="text"
                    required
                    value={nosCode}
                    onChange={(e) => setNosCode(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-slate-900 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">ABC Credit Hours</label>
                  <input
                    type="number"
                    min="1"
                    value={abcCreditHours}
                    onChange={(e) => setAbcCreditHours(Number(e.target.value))}
                    className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-slate-900 font-mono"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Duration (Weeks)</label>
                  <input
                    type="number"
                    min="1"
                    value={durationWeeks}
                    onChange={(e) => setDurationWeeks(Number(e.target.value))}
                    className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-slate-900 font-mono"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-3 border-t border-slate-100">
                <LightButton variant="outline" type="button" onClick={() => setShowModal(false)}>
                  Cancel
                </LightButton>
                <LightButton variant="saffron" type="submit">
                  Accredit & Publish to National Registry
                </LightButton>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
