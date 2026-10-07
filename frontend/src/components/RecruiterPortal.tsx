import React, { useState } from 'react';
import { Plus, Building2, MapPin, DollarSign, CheckCircle2 } from 'lucide-react';
import type { JobPosting, SocietyType } from '../types/recruitment';
import type { Course } from '../types/erp';

interface RecruiterPortalProps {
  jobPostings: JobPosting[];
  courses: Course[];
  onAddJobPosting: (job: JobPosting) => void;
}

export const RecruiterPortal: React.FC<RecruiterPortalProps> = ({
  jobPostings,
  courses,
  onAddJobPosting,
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newJob, setNewJob] = useState<Partial<JobPosting>>({
    societyName: 'Baramati Farmer Dairy Cooperative',
    societyType: 'MILK_UNION',
    societyRegId: 'MILK-MH-PUNE-1024',
    title: 'Assistant Dairy Operations Officer',
    requiredSkills: ['Milk Testing & Quality Control', 'Cold Chain Logistics'],
    requiredCourseCodes: ['DAIRY-FED-201'],
    minExperienceYears: 1,
    district: 'Pune',
    state: 'Maharashtra',
    vacanciesCount: 2,
    salaryMinINR: 25000,
    salaryMaxINR: 32000,
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newJob.title || !newJob.societyName) return;

    onAddJobPosting({
      jobId: `job-${Date.now()}`,
      recruiterId: `rec-${Date.now()}`,
      societyName: newJob.societyName,
      societyType: newJob.societyType as SocietyType,
      societyRegId: newJob.societyRegId || 'PACS-REG-9901',
      title: newJob.title,
      requiredSkills: newJob.requiredSkills || ['PACS Accounting'],
      requiredCourseCodes: newJob.requiredCourseCodes || ['PACS-CAS-2026'],
      minExperienceYears: Number(newJob.minExperienceYears) || 0,
      district: newJob.district || 'Pune',
      state: 'Maharashtra',
      lat: 18.5204,
      lng: 73.8567,
      vacanciesCount: Number(newJob.vacanciesCount) || 1,
      salaryMinINR: Number(newJob.salaryMinINR) || 20000,
      salaryMaxINR: Number(newJob.salaryMaxINR) || 30000,
      postedAt: new Date().toISOString(),
      status: 'OPEN',
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
              Section 6.1
            </span>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Verified Cooperative Employer Portal & Vacancy Management
            </h2>
          </div>
          <p className="text-slate-400 text-xs mt-1">
            Enables PACS, DCCBs, State Cooperative Banks, and Milk Unions to publish verified requisitions and prerequisite NCCT skill certificates.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition shadow-lg shadow-indigo-600/30"
        >
          <Plus className="w-4 h-4" />
          <span>Publish Job Requisition</span>
        </button>
      </div>

      {/* Vacancy List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {jobPostings.map((job) => (
          <div
            key={job.jobId}
            className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4 flex flex-col justify-between hover:border-slate-700 transition"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="bg-amber-500/10 text-amber-300 text-[10px] font-mono font-bold px-2.5 py-0.5 rounded border border-amber-500/20">
                  {job.societyType}
                </span>
                <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center space-x-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  <span>{job.vacanciesCount} Vacancies</span>
                </span>
              </div>

              <h3 className="font-bold text-sm text-white leading-snug">{job.title}</h3>

              <div className="flex items-center space-x-1 text-slate-400 text-xs font-medium">
                <Building2 className="w-3.5 h-3.5 text-indigo-400" />
                <span className="line-clamp-1">{job.societyName}</span>
              </div>

              <div className="flex items-center space-x-1 text-slate-400 text-xs">
                <MapPin className="w-3.5 h-3.5 text-slate-500" />
                <span>{job.district}, {job.state}</span>
              </div>

              <div className="pt-2 flex flex-wrap gap-1.5">
                {job.requiredCourseCodes.map((code) => (
                  <span
                    key={code}
                    className="bg-indigo-950/80 text-indigo-300 border border-indigo-800 text-[10px] font-mono font-bold px-2 py-0.5 rounded"
                  >
                    Req: {code}
                  </span>
                ))}
              </div>
            </div>

            <div className="border-t border-slate-800 pt-3 flex items-center justify-between text-xs">
              <div className="flex items-center space-x-1 text-emerald-400 font-mono font-bold">
                <DollarSign className="w-3.5 h-3.5" />
                <span>₹{job.salaryMinINR.toLocaleString()} - ₹{job.salaryMaxINR.toLocaleString()}</span>
              </div>
              <span className="text-[10px] text-slate-500 font-mono">
                {new Date(job.postedAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Add Job Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-lg rounded-2xl p-6 shadow-2xl space-y-4 text-xs">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">Publish Cooperative Job Requisition</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white">
                ✕
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-3">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Job Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. PACS Senior Accountant"
                  value={newJob.title}
                  onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Sponsoring Society</label>
                  <input
                    type="text"
                    required
                    value={newJob.societyName}
                    onChange={(e) => setNewJob({ ...newJob, societyName: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Society Type</label>
                  <select
                    value={newJob.societyType}
                    onChange={(e) => setNewJob({ ...newJob, societyType: e.target.value as SocietyType })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white"
                  >
                    <option value="PACS">PACS (Credit Society)</option>
                    <option value="DCCB">DCCB (District Central Coop Bank)</option>
                    <option value="MILK_UNION">MILK_UNION (Dairy Federation)</option>
                    <option value="FPO">FPO (Farmer Producer Org)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Prerequisite NCCT Course</label>
                  <select
                    value={newJob.requiredCourseCodes?.[0]}
                    onChange={(e) => setNewJob({ ...newJob, requiredCourseCodes: [e.target.value] })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white font-mono"
                  >
                    {courses.map((c) => (
                      <option key={c.id} value={c.code}>
                        [{c.code}] {c.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Vacancies Count</label>
                  <input
                    type="number"
                    min="1"
                    value={newJob.vacanciesCount}
                    onChange={(e) => setNewJob({ ...newJob, vacanciesCount: parseInt(e.target.value) || 1 })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white"
                  />
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
                  Publish Requisition
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
